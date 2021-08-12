import { ApplicationRef, Injectable } from '@angular/core';
import { first, tap } from 'rxjs/operators';
const IS_STABLE_START_MARK = '_isStableStart';
const IS_STABLE_END_MARK = '_isStableEnd';
function markStarts() {
    if (typeof (window) !== 'undefined' && window.performance) {
        window.performance.mark(IS_STABLE_START_MARK);
        return true;
    }
    else {
        return false;
    }
}
const started = markStarts();
export class PerformanceMonitoringService {
    constructor(appRef) {
        if (started) {
            this.disposable = appRef.isStable.pipe(first(it => it), tap(() => {
                window.performance.mark(IS_STABLE_END_MARK);
                window.performance.measure('isStable', IS_STABLE_START_MARK, IS_STABLE_END_MARK);
            })).subscribe();
        }
    }
    ngOnDestroy() {
        if (this.disposable) {
            this.disposable.unsubscribe();
        }
    }
}
PerformanceMonitoringService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PerformanceMonitoringService.ctorParameters = () => [
    { type: ApplicationRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyZm9ybWFuY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wZXJmb3JtYW5jZS9wZXJmb3JtYW5jZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBRXRFLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFNUMsTUFBTSxvQkFBb0IsR0FBRyxnQkFBZ0IsQ0FBQztBQUM5QyxNQUFNLGtCQUFrQixHQUFHLGNBQWMsQ0FBQztBQUUxQyxTQUFTLFVBQVU7SUFDZixJQUFJLE9BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxXQUFXLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRTtRQUN0RCxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzlDLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7U0FBTTtRQUNILE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0FBQ0wsQ0FBQztBQUVELE1BQU0sT0FBTyxHQUFHLFVBQVUsRUFBRSxDQUFDO0FBRzdCLE1BQU0sT0FBTyw0QkFBNEI7SUFJckMsWUFBWSxNQUFzQjtRQUM5QixJQUFJLE9BQU8sRUFBRTtZQUNULElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ2xDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUNmLEdBQUcsQ0FBQyxHQUFHLEVBQUU7Z0JBQ0wsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDNUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLG9CQUFvQixFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFDckYsQ0FBQyxDQUFDLENBQ0wsQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNqQjtJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUFFO0lBQzNELENBQUM7OztZQW5CSixVQUFVOzs7O1lBbEJGLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBsaWNhdGlvblJlZiwgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpcnN0LCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmNvbnN0IElTX1NUQUJMRV9TVEFSVF9NQVJLID0gJ19pc1N0YWJsZVN0YXJ0JztcbmNvbnN0IElTX1NUQUJMRV9FTkRfTUFSSyA9ICdfaXNTdGFibGVFbmQnO1xuXG5mdW5jdGlvbiBtYXJrU3RhcnRzKCkge1xuICAgIGlmICh0eXBlb2Yod2luZG93KSAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnBlcmZvcm1hbmNlKSB7XG4gICAgICAgIHdpbmRvdy5wZXJmb3JtYW5jZS5tYXJrKElTX1NUQUJMRV9TVEFSVF9NQVJLKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuY29uc3Qgc3RhcnRlZCA9IG1hcmtTdGFydHMoKTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBlcmZvcm1hbmNlTW9uaXRvcmluZ1NlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgcHJpdmF0ZSBkaXNwb3NhYmxlOiBTdWJzY3JpcHRpb258dW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IoYXBwUmVmOiBBcHBsaWNhdGlvblJlZikge1xuICAgICAgICBpZiAoc3RhcnRlZCkge1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NhYmxlID0gYXBwUmVmLmlzU3RhYmxlLnBpcGUoXG4gICAgICAgICAgICAgICAgZmlyc3QoaXQgPT4gaXQpLFxuICAgICAgICAgICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5wZXJmb3JtYW5jZS5tYXJrKElTX1NUQUJMRV9FTkRfTUFSSyk7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5wZXJmb3JtYW5jZS5tZWFzdXJlKCdpc1N0YWJsZScsIElTX1NUQUJMRV9TVEFSVF9NQVJLLCBJU19TVEFCTEVfRU5EX01BUkspO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApLnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc3Bvc2FibGUpIHsgdGhpcy5kaXNwb3NhYmxlLnVuc3Vic2NyaWJlKCk7IH1cbiAgICB9XG5cbn1cbiJdfQ==