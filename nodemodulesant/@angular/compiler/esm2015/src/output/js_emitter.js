/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { EmitterVisitorContext } from './abstract_emitter';
import { AbstractJsEmitterVisitor } from './abstract_js_emitter';
import * as o from './output_ast';
export class JavaScriptEmitter {
    emitStatements(genFilePath, stmts, preamble = '') {
        const converter = new JsEmitterVisitor();
        const ctx = EmitterVisitorContext.createRoot();
        converter.visitAllStatements(stmts, ctx);
        const preambleLines = preamble ? preamble.split('\n') : [];
        converter.importsWithPrefixes.forEach((prefix, importedModuleName) => {
            // Note: can't write the real word for import as it screws up system.js auto detection...
            preambleLines.push(`var ${prefix} = req` +
                `uire('${importedModuleName}');`);
        });
        const sm = ctx.toSourceMapGenerator(genFilePath, preambleLines.length).toJsComment();
        const lines = [...preambleLines, ctx.toSource(), sm];
        if (sm) {
            // always add a newline at the end, as some tools have bugs without it.
            lines.push('');
        }
        return lines.join('\n');
    }
}
class JsEmitterVisitor extends AbstractJsEmitterVisitor {
    constructor() {
        super(...arguments);
        this.importsWithPrefixes = new Map();
    }
    visitExternalExpr(ast, ctx) {
        const { name, moduleName } = ast.value;
        if (moduleName) {
            let prefix = this.importsWithPrefixes.get(moduleName);
            if (prefix == null) {
                prefix = `i${this.importsWithPrefixes.size}`;
                this.importsWithPrefixes.set(moduleName, prefix);
            }
            ctx.print(ast, `${prefix}.`);
        }
        ctx.print(ast, name);
        return null;
    }
    visitDeclareVarStmt(stmt, ctx) {
        super.visitDeclareVarStmt(stmt, ctx);
        if (stmt.hasModifier(o.StmtModifier.Exported)) {
            ctx.println(stmt, exportVar(stmt.name));
        }
        return null;
    }
    visitDeclareFunctionStmt(stmt, ctx) {
        super.visitDeclareFunctionStmt(stmt, ctx);
        if (stmt.hasModifier(o.StmtModifier.Exported)) {
            ctx.println(stmt, exportVar(stmt.name));
        }
        return null;
    }
    visitDeclareClassStmt(stmt, ctx) {
        super.visitDeclareClassStmt(stmt, ctx);
        if (stmt.hasModifier(o.StmtModifier.Exported)) {
            ctx.println(stmt, exportVar(stmt.name));
        }
        return null;
    }
}
function exportVar(varName) {
    return `Object.defineProperty(exports, '${varName}', { get: function() { return ${varName}; }});`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNfZW1pdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9vdXRwdXQvanNfZW1pdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFNSCxPQUFPLEVBQUMscUJBQXFCLEVBQWdCLE1BQU0sb0JBQW9CLENBQUM7QUFDeEUsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0QsT0FBTyxLQUFLLENBQUMsTUFBTSxjQUFjLENBQUM7QUFFbEMsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixjQUFjLENBQUMsV0FBbUIsRUFBRSxLQUFvQixFQUFFLFdBQW1CLEVBQUU7UUFDN0UsTUFBTSxTQUFTLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sR0FBRyxHQUFHLHFCQUFxQixDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQy9DLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFekMsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDM0QsU0FBUyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxFQUFFO1lBQ25FLHlGQUF5RjtZQUN6RixhQUFhLENBQUMsSUFBSSxDQUNkLE9BQU8sTUFBTSxRQUFRO2dCQUNyQixTQUFTLGtCQUFrQixLQUFLLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JGLE1BQU0sS0FBSyxHQUFHLENBQUMsR0FBRyxhQUFhLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELElBQUksRUFBRSxFQUFFO1lBQ04sdUVBQXVFO1lBQ3ZFLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDaEI7UUFDRCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztDQUNGO0FBRUQsTUFBTSxnQkFBaUIsU0FBUSx3QkFBd0I7SUFBdkQ7O1FBQ0Usd0JBQW1CLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7SUFvQ2xELENBQUM7SUFsQ1UsaUJBQWlCLENBQUMsR0FBbUIsRUFBRSxHQUEwQjtRQUN4RSxNQUFNLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDckMsSUFBSSxVQUFVLEVBQUU7WUFDZCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3RELElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtnQkFDbEIsTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxDQUFDO2dCQUM3QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUNsRDtZQUNELEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUM5QjtRQUNELEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUssQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNRLG1CQUFtQixDQUFDLElBQXNCLEVBQUUsR0FBMEI7UUFDN0UsS0FBSyxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNyQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM3QyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDekM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDUSx3QkFBd0IsQ0FBQyxJQUEyQixFQUFFLEdBQTBCO1FBQ3ZGLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDMUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDN0MsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ1EscUJBQXFCLENBQUMsSUFBaUIsRUFBRSxHQUEwQjtRQUMxRSxLQUFLLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzdDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUN6QztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGO0FBRUQsU0FBUyxTQUFTLENBQUMsT0FBZTtJQUNoQyxPQUFPLG1DQUFtQyxPQUFPLGlDQUFpQyxPQUFPLFFBQVEsQ0FBQztBQUNwRyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cblxuaW1wb3J0IHtTdGF0aWNTeW1ib2x9IGZyb20gJy4uL2FvdC9zdGF0aWNfc3ltYm9sJztcbmltcG9ydCB7Q29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YX0gZnJvbSAnLi4vY29tcGlsZV9tZXRhZGF0YSc7XG5cbmltcG9ydCB7RW1pdHRlclZpc2l0b3JDb250ZXh0LCBPdXRwdXRFbWl0dGVyfSBmcm9tICcuL2Fic3RyYWN0X2VtaXR0ZXInO1xuaW1wb3J0IHtBYnN0cmFjdEpzRW1pdHRlclZpc2l0b3J9IGZyb20gJy4vYWJzdHJhY3RfanNfZW1pdHRlcic7XG5pbXBvcnQgKiBhcyBvIGZyb20gJy4vb3V0cHV0X2FzdCc7XG5cbmV4cG9ydCBjbGFzcyBKYXZhU2NyaXB0RW1pdHRlciBpbXBsZW1lbnRzIE91dHB1dEVtaXR0ZXIge1xuICBlbWl0U3RhdGVtZW50cyhnZW5GaWxlUGF0aDogc3RyaW5nLCBzdG10czogby5TdGF0ZW1lbnRbXSwgcHJlYW1ibGU6IHN0cmluZyA9ICcnKTogc3RyaW5nIHtcbiAgICBjb25zdCBjb252ZXJ0ZXIgPSBuZXcgSnNFbWl0dGVyVmlzaXRvcigpO1xuICAgIGNvbnN0IGN0eCA9IEVtaXR0ZXJWaXNpdG9yQ29udGV4dC5jcmVhdGVSb290KCk7XG4gICAgY29udmVydGVyLnZpc2l0QWxsU3RhdGVtZW50cyhzdG10cywgY3R4KTtcblxuICAgIGNvbnN0IHByZWFtYmxlTGluZXMgPSBwcmVhbWJsZSA/IHByZWFtYmxlLnNwbGl0KCdcXG4nKSA6IFtdO1xuICAgIGNvbnZlcnRlci5pbXBvcnRzV2l0aFByZWZpeGVzLmZvckVhY2goKHByZWZpeCwgaW1wb3J0ZWRNb2R1bGVOYW1lKSA9PiB7XG4gICAgICAvLyBOb3RlOiBjYW4ndCB3cml0ZSB0aGUgcmVhbCB3b3JkIGZvciBpbXBvcnQgYXMgaXQgc2NyZXdzIHVwIHN5c3RlbS5qcyBhdXRvIGRldGVjdGlvbi4uLlxuICAgICAgcHJlYW1ibGVMaW5lcy5wdXNoKFxuICAgICAgICAgIGB2YXIgJHtwcmVmaXh9ID0gcmVxYCArXG4gICAgICAgICAgYHVpcmUoJyR7aW1wb3J0ZWRNb2R1bGVOYW1lfScpO2ApO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgc20gPSBjdHgudG9Tb3VyY2VNYXBHZW5lcmF0b3IoZ2VuRmlsZVBhdGgsIHByZWFtYmxlTGluZXMubGVuZ3RoKS50b0pzQ29tbWVudCgpO1xuICAgIGNvbnN0IGxpbmVzID0gWy4uLnByZWFtYmxlTGluZXMsIGN0eC50b1NvdXJjZSgpLCBzbV07XG4gICAgaWYgKHNtKSB7XG4gICAgICAvLyBhbHdheXMgYWRkIGEgbmV3bGluZSBhdCB0aGUgZW5kLCBhcyBzb21lIHRvb2xzIGhhdmUgYnVncyB3aXRob3V0IGl0LlxuICAgICAgbGluZXMucHVzaCgnJyk7XG4gICAgfVxuICAgIHJldHVybiBsaW5lcy5qb2luKCdcXG4nKTtcbiAgfVxufVxuXG5jbGFzcyBKc0VtaXR0ZXJWaXNpdG9yIGV4dGVuZHMgQWJzdHJhY3RKc0VtaXR0ZXJWaXNpdG9yIHtcbiAgaW1wb3J0c1dpdGhQcmVmaXhlcyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG5cbiAgb3ZlcnJpZGUgdmlzaXRFeHRlcm5hbEV4cHIoYXN0OiBvLkV4dGVybmFsRXhwciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIGNvbnN0IHtuYW1lLCBtb2R1bGVOYW1lfSA9IGFzdC52YWx1ZTtcbiAgICBpZiAobW9kdWxlTmFtZSkge1xuICAgICAgbGV0IHByZWZpeCA9IHRoaXMuaW1wb3J0c1dpdGhQcmVmaXhlcy5nZXQobW9kdWxlTmFtZSk7XG4gICAgICBpZiAocHJlZml4ID09IG51bGwpIHtcbiAgICAgICAgcHJlZml4ID0gYGkke3RoaXMuaW1wb3J0c1dpdGhQcmVmaXhlcy5zaXplfWA7XG4gICAgICAgIHRoaXMuaW1wb3J0c1dpdGhQcmVmaXhlcy5zZXQobW9kdWxlTmFtZSwgcHJlZml4KTtcbiAgICAgIH1cbiAgICAgIGN0eC5wcmludChhc3QsIGAke3ByZWZpeH0uYCk7XG4gICAgfVxuICAgIGN0eC5wcmludChhc3QsIG5hbWUhKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBvdmVycmlkZSB2aXNpdERlY2xhcmVWYXJTdG10KHN0bXQ6IG8uRGVjbGFyZVZhclN0bXQsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICBzdXBlci52aXNpdERlY2xhcmVWYXJTdG10KHN0bXQsIGN0eCk7XG4gICAgaWYgKHN0bXQuaGFzTW9kaWZpZXIoby5TdG10TW9kaWZpZXIuRXhwb3J0ZWQpKSB7XG4gICAgICBjdHgucHJpbnRsbihzdG10LCBleHBvcnRWYXIoc3RtdC5uYW1lKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIG92ZXJyaWRlIHZpc2l0RGVjbGFyZUZ1bmN0aW9uU3RtdChzdG10OiBvLkRlY2xhcmVGdW5jdGlvblN0bXQsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICBzdXBlci52aXNpdERlY2xhcmVGdW5jdGlvblN0bXQoc3RtdCwgY3R4KTtcbiAgICBpZiAoc3RtdC5oYXNNb2RpZmllcihvLlN0bXRNb2RpZmllci5FeHBvcnRlZCkpIHtcbiAgICAgIGN0eC5wcmludGxuKHN0bXQsIGV4cG9ydFZhcihzdG10Lm5hbWUpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgb3ZlcnJpZGUgdmlzaXREZWNsYXJlQ2xhc3NTdG10KHN0bXQ6IG8uQ2xhc3NTdG10LCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgc3VwZXIudmlzaXREZWNsYXJlQ2xhc3NTdG10KHN0bXQsIGN0eCk7XG4gICAgaWYgKHN0bXQuaGFzTW9kaWZpZXIoby5TdG10TW9kaWZpZXIuRXhwb3J0ZWQpKSB7XG4gICAgICBjdHgucHJpbnRsbihzdG10LCBleHBvcnRWYXIoc3RtdC5uYW1lKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV4cG9ydFZhcih2YXJOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnJHt2YXJOYW1lfScsIHsgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuICR7dmFyTmFtZX07IH19KTtgO1xufVxuIl19