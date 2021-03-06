import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Inject, Optional, PLATFORM_ID, NgZone, NgModule } from '@angular/core';
import { asyncScheduler, Observable, of, merge } from 'rxjs';
import { map, share, switchMap, scan, distinctUntilChanged, withLatestFrom, skipWhile } from 'rxjs/operators';
import * as i1 from '@angular/fire';
import { ɵAngularFireSchedulers, ɵkeepUnstableUntilFirstFactory, ɵfirebaseAppFactory, ɵlogAuthEmulatorError, ɵfetchInstance, FIREBASE_OPTIONS, FIREBASE_APP_NAME } from '@angular/fire';
import 'firebase/database';
import * as i2 from '@angular/fire/auth';
import { USE_EMULATOR as USE_EMULATOR$1 } from '@angular/fire/auth';
import firebase from 'firebase/app';

function isString(value) {
    return typeof value === 'string';
}
function isFirebaseDataSnapshot(value) {
    return typeof value.exportVal === 'function';
}
function isNil(obj) {
    return obj === undefined || obj === null;
}
function isFirebaseRef(value) {
    return typeof value.set === 'function';
}
/**
 * Returns a database reference given a Firebase App and an
 * absolute or relative path.
 * @param database - Firebase Database
 * @param pathRef - Database path, relative or absolute
 */
function getRef(database, pathRef) {
    // if a db ref was passed in, just return it
    return isFirebaseRef(pathRef) ? pathRef
        : database.ref(pathRef);
}
function checkOperationCases(item, cases) {
    if (isString(item)) {
        return cases.stringCase();
    }
    else if (isFirebaseRef(item)) {
        return cases.firebaseCase();
    }
    else if (isFirebaseDataSnapshot(item)) {
        return cases.snapshotCase();
    }
    throw new Error(`Expects a string, snapshot, or reference. Got: ${typeof item}`);
}

/**
 * Create an observable from a Database Reference or Database Query.
 * @param ref Database Reference
 * @param event Listen event type ('value', 'added', 'changed', 'removed', 'moved')
 * @param listenType 'on' or 'once'
 * @param scheduler - Rxjs scheduler
 */
function fromRef(ref, event, listenType = 'on', scheduler = asyncScheduler) {
    return new Observable(subscriber => {
        let fn = null;
        fn = ref[listenType](event, (snapshot, prevKey) => {
            scheduler.schedule(() => {
                subscriber.next({ snapshot, prevKey });
            });
            if (listenType === 'once') {
                scheduler.schedule(() => subscriber.complete());
            }
        }, err => {
            scheduler.schedule(() => subscriber.error(err));
        });
        if (listenType === 'on') {
            return {
                unsubscribe() {
                    if (fn != null) {
                        ref.off(event, fn);
                    }
                }
            };
        }
        else {
            return {
                unsubscribe() {
                }
            };
        }
    }).pipe(map(payload => {
        const { snapshot, prevKey } = payload;
        let key = null;
        if (snapshot.exists()) {
            key = snapshot.key;
        }
        return { type: event, payload: snapshot, prevKey, key };
    }), share());
}

function listChanges(ref, events, scheduler) {
    return fromRef(ref, 'value', 'once', scheduler).pipe(switchMap(snapshotAction => {
        const childEvent$ = [of(snapshotAction)];
        events.forEach(event => childEvent$.push(fromRef(ref, event, 'on', scheduler)));
        return merge(...childEvent$).pipe(scan(buildView, []));
    }), distinctUntilChanged());
}
function positionFor(changes, key) {
    const len = changes.length;
    for (let i = 0; i < len; i++) {
        if (changes[i].payload.key === key) {
            return i;
        }
    }
    return -1;
}
function positionAfter(changes, prevKey) {
    if (isNil(prevKey)) {
        return 0;
    }
    else {
        const i = positionFor(changes, prevKey);
        if (i === -1) {
            return changes.length;
        }
        else {
            return i + 1;
        }
    }
}
function buildView(current, action) {
    const { payload, prevKey, key } = action;
    const currentKeyPosition = positionFor(current, key);
    const afterPreviousKeyPosition = positionAfter(current, prevKey);
    switch (action.type) {
        case 'value':
            if (action.payload && action.payload.exists()) {
                let prevKey = null;
                action.payload.forEach(payload => {
                    const action = { payload, type: 'value', prevKey, key: payload.key };
                    prevKey = payload.key;
                    current = [...current, action];
                    return false;
                });
            }
            return current;
        case 'child_added':
            if (currentKeyPosition > -1) {
                // check that the previouskey is what we expect, else reorder
                const previous = current[currentKeyPosition - 1];
                if ((previous && previous.key || null) !== prevKey) {
                    current = current.filter(x => x.payload.key !== payload.key);
                    current.splice(afterPreviousKeyPosition, 0, action);
                }
            }
            else if (prevKey == null) {
                return [action, ...current];
            }
            else {
                current = current.slice();
                current.splice(afterPreviousKeyPosition, 0, action);
            }
            return current;
        case 'child_removed':
            return current.filter(x => x.payload.key !== payload.key);
        case 'child_changed':
            return current.map(x => x.payload.key === key ? action : x);
        case 'child_moved':
            if (currentKeyPosition > -1) {
                const data = current.splice(currentKeyPosition, 1)[0];
                current = current.slice();
                current.splice(afterPreviousKeyPosition, 0, data);
                return current;
            }
            return current;
        // default will also remove null results
        default:
            return current;
    }
}

function validateEventsArray(events) {
    if (isNil(events) || events.length === 0) {
        events = ['child_added', 'child_removed', 'child_changed', 'child_moved'];
    }
    return events;
}

function snapshotChanges(query, events, scheduler) {
    events = validateEventsArray(events);
    return listChanges(query, events, scheduler);
}

function stateChanges(query, events, scheduler) {
    events = validateEventsArray(events);
    const childEvent$ = events.map(event => fromRef(query, event, 'on', scheduler));
    return merge(...childEvent$);
}

function auditTrail(query, events, scheduler) {
    const auditTrail$ = stateChanges(query, events)
        .pipe(scan((current, action) => [...current, action], []));
    return waitForLoaded(query, auditTrail$, scheduler);
}
function loadedData(query, scheduler) {
    // Create an observable of loaded values to retrieve the
    // known dataset. This will allow us to know what key to
    // emit the "whole" array at when listening for child events.
    return fromRef(query, 'value', 'on', scheduler)
        .pipe(map(data => {
        // Store the last key in the data set
        let lastKeyToLoad;
        // Loop through loaded dataset to find the last key
        data.payload.forEach(child => {
            lastKeyToLoad = child.key;
            return false;
        });
        // return data set and the current last key loaded
        return { data, lastKeyToLoad };
    }));
}
function waitForLoaded(query, action$, scheduler) {
    const loaded$ = loadedData(query, scheduler);
    return loaded$
        .pipe(withLatestFrom(action$), 
    // Get the latest values from the "loaded" and "child" datasets
    // We can use both datasets to form an array of the latest values.
    map(([loaded, actions]) => {
        // Store the last key in the data set
        const lastKeyToLoad = loaded.lastKeyToLoad;
        // Store all child keys loaded at this point
        const loadedKeys = actions.map(snap => snap.key);
        return { actions, lastKeyToLoad, loadedKeys };
    }), 
    // This is the magical part, only emit when the last load key
    // in the dataset has been loaded by a child event. At this point
    // we can assume the dataset is "whole".
    skipWhile(meta => meta.loadedKeys.indexOf(meta.lastKeyToLoad) === -1), 
    // Pluck off the meta data because the user only cares
    // to iterate through the snapshots
    map(meta => meta.actions));
}

function createDataOperationMethod(ref, operation) {
    return function dataOperation(item, value) {
        return checkOperationCases(item, {
            stringCase: () => ref.child(item)[operation](value),
            firebaseCase: () => item[operation](value),
            snapshotCase: () => item.ref[operation](value)
        });
    };
}

// TODO(davideast): Find out why TS thinks this returns firebase.Primise
// instead of Promise.
function createRemoveMethod(ref) {
    return function remove(item) {
        if (!item) {
            return ref.remove();
        }
        return checkOperationCases(item, {
            stringCase: () => ref.child(item).remove(),
            firebaseCase: () => item.remove(),
            snapshotCase: () => item.ref.remove()
        });
    };
}

function createListReference(query, afDatabase) {
    const outsideAngularScheduler = afDatabase.schedulers.outsideAngular;
    const refInZone = afDatabase.schedulers.ngZone.run(() => query.ref);
    return {
        query,
        update: createDataOperationMethod(refInZone, 'update'),
        set: createDataOperationMethod(refInZone, 'set'),
        push: (data) => refInZone.push(data),
        remove: createRemoveMethod(refInZone),
        snapshotChanges(events) {
            return snapshotChanges(query, events, outsideAngularScheduler).pipe(afDatabase.keepUnstableUntilFirst);
        },
        stateChanges(events) {
            return stateChanges(query, events, outsideAngularScheduler).pipe(afDatabase.keepUnstableUntilFirst);
        },
        auditTrail(events) {
            return auditTrail(query, events, outsideAngularScheduler).pipe(afDatabase.keepUnstableUntilFirst);
        },
        valueChanges(events, options) {
            const snapshotChanges$ = snapshotChanges(query, events, outsideAngularScheduler);
            return snapshotChanges$.pipe(map(actions => actions.map(a => {
                if (options && options.idField) {
                    return Object.assign(Object.assign({}, a.payload.val()), {
                        [options.idField]: a.key
                    });
                }
                else {
                    return a.payload.val();
                }
            })), afDatabase.keepUnstableUntilFirst);
        }
    };
}

function createObjectSnapshotChanges(query, scheduler) {
    return function snapshotChanges() {
        return fromRef(query, 'value', 'on', scheduler);
    };
}

function createObjectReference(query, afDatabase) {
    return {
        query,
        snapshotChanges() {
            return createObjectSnapshotChanges(query, afDatabase.schedulers.outsideAngular)().pipe(afDatabase.keepUnstableUntilFirst);
        },
        update(data) { return query.ref.update(data); },
        set(data) { return query.ref.set(data); },
        remove() { return query.ref.remove(); },
        valueChanges() {
            const snapshotChanges$ = createObjectSnapshotChanges(query, afDatabase.schedulers.outsideAngular)();
            return snapshotChanges$.pipe(afDatabase.keepUnstableUntilFirst, map(action => action.payload.exists() ? action.payload.val() : null));
        },
    };
}

const URL = new InjectionToken('angularfire2.realtimeDatabaseURL');
const USE_EMULATOR = new InjectionToken('angularfire2.database.use-emulator');
class AngularFireDatabase {
    constructor(options, nameOrConfig, databaseURL, 
    // tslint:disable-next-line:ban-types
    platformId, zone, _useEmulator, // tuple isn't working here
    useAuthEmulator) {
        this.schedulers = new ɵAngularFireSchedulers(zone);
        this.keepUnstableUntilFirst = ɵkeepUnstableUntilFirstFactory(this.schedulers);
        const useEmulator = _useEmulator;
        const app = ɵfirebaseAppFactory(options, zone, nameOrConfig);
        if (!firebase.auth && useAuthEmulator) {
            ɵlogAuthEmulatorError();
        }
        this.database = ɵfetchInstance(`${app.name}.database.${databaseURL}`, 'AngularFireDatabase', app, () => {
            const database = zone.runOutsideAngular(() => app.database(databaseURL || undefined));
            if (useEmulator) {
                database.useEmulator(...useEmulator);
            }
            return database;
        }, [useEmulator]);
    }
    list(pathOrRef, queryFn) {
        const ref = this.schedulers.ngZone.runOutsideAngular(() => getRef(this.database, pathOrRef));
        let query = ref;
        if (queryFn) {
            query = queryFn(ref);
        }
        return createListReference(query, this);
    }
    object(pathOrRef) {
        const ref = this.schedulers.ngZone.runOutsideAngular(() => getRef(this.database, pathOrRef));
        return createObjectReference(ref, this);
    }
    createPushId() {
        const ref = this.schedulers.ngZone.runOutsideAngular(() => this.database.ref());
        return ref.push().key;
    }
}
/** @nocollapse */ AngularFireDatabase.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularFireDatabase_Factory() { return new AngularFireDatabase(i0.ɵɵinject(i1.FIREBASE_OPTIONS), i0.ɵɵinject(i1.FIREBASE_APP_NAME, 8), i0.ɵɵinject(URL, 8), i0.ɵɵinject(i0.PLATFORM_ID), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(USE_EMULATOR, 8), i0.ɵɵinject(i2.USE_EMULATOR, 8)); }, token: AngularFireDatabase, providedIn: "any" });
AngularFireDatabase.decorators = [
    { type: Injectable, args: [{
                providedIn: 'any'
            },] }
];
/** @nocollapse */
AngularFireDatabase.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [FIREBASE_OPTIONS,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FIREBASE_APP_NAME,] }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [URL,] }] },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [USE_EMULATOR,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [USE_EMULATOR$1,] }] }
];

class AngularFireDatabaseModule {
}
AngularFireDatabaseModule.decorators = [
    { type: NgModule, args: [{
                providers: [AngularFireDatabase]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { AngularFireDatabase, AngularFireDatabaseModule, URL, USE_EMULATOR, auditTrail, createListReference, fromRef, listChanges, snapshotChanges, stateChanges };
//# sourceMappingURL=angular-fire-database.js.map
