"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.addError = exports.addWarning = void 0;
function addWarning(compilation, message) {
    compilation.warnings.push(new compilation.compiler.webpack.WebpackError(message));
}
exports.addWarning = addWarning;
function addError(compilation, message) {
    compilation.errors.push(new compilation.compiler.webpack.WebpackError(message));
}
exports.addError = addError;
