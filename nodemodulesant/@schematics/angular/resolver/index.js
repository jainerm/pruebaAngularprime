"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const parse_name_1 = require("../utility/parse-name");
const workspace_1 = require("../utility/workspace");
function default_1(options) {
    return async (host) => {
        if (options.path === undefined) {
            options.path = await workspace_1.createDefaultPath(host, options.project);
        }
        const parsedPath = parse_name_1.parseName(options.path, options.name);
        options.name = parsedPath.name;
        options.path = parsedPath.path;
        const templateSource = schematics_1.apply(schematics_1.url('./files'), [
            options.skipTests ? schematics_1.filter((path) => !path.endsWith('.spec.ts.template')) : schematics_1.noop(),
            schematics_1.applyTemplates({
                ...core_1.strings,
                ...options,
            }),
            schematics_1.move(parsedPath.path + (options.flat ? '' : '/' + core_1.strings.dasherize(options.name))),
        ]);
        return schematics_1.chain([schematics_1.mergeWith(templateSource)]);
    };
}
exports.default = default_1;
