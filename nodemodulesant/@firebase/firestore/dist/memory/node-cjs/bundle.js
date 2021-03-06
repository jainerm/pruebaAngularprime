'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var databaseB2a0ee8e = require('./database-b2a0ee8e-0d693c3f.js');
require('@firebase/util');
require('@firebase/logger');
require('util');
require('crypto');
require('@grpc/grpc-js');
require('@grpc/grpc-js/package.json');
require('path');
require('@grpc/proto-loader');

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function loadBundle(data) {
    return databaseB2a0ee8e.loadBundle(this._delegate, data);
}
function namedQuery(queryName) {
    return databaseB2a0ee8e.namedQuery(this._delegate, queryName).then(expQuery => {
        if (!expQuery) {
            return null;
        }
        return new databaseB2a0ee8e.Query(this, 
        // We can pass `expQuery` here directly since named queries don't have a UserDataConverter.
        // Otherwise, we would have to create a new ExpQuery and pass the old UserDataConverter.
        expQuery);
    });
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Prototype patches bundle loading to Firestore.
 */
function registerBundle(instance) {
    instance.prototype.loadBundle = loadBundle;
    instance.prototype.namedQuery = namedQuery;
}
registerBundle(databaseB2a0ee8e.Firestore);

exports.registerBundle = registerBundle;
//# sourceMappingURL=bundle.js.map
