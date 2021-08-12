/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertDefined } from '../../util/assert';
import { assertLView } from '../assert';
import { readPatchedLView } from '../context_discovery';
import { isLContainer, isLView } from '../interfaces/type_checks';
import { CHILD_HEAD, CONTEXT, FLAGS, NEXT, PARENT } from '../interfaces/view';
/**
 * Gets the parent LView of the passed LView, if the PARENT is an LContainer, will get the parent of
 * that LContainer, which is an LView
 * @param lView the lView whose parent to get
 */
export function getLViewParent(lView) {
    ngDevMode && assertLView(lView);
    const parent = lView[PARENT];
    return isLContainer(parent) ? parent[PARENT] : parent;
}
/**
 * Retrieve the root view from any component or `LView` by walking the parent `LView` until
 * reaching the root `LView`.
 *
 * @param componentOrLView any component or `LView`
 */
export function getRootView(componentOrLView) {
    ngDevMode && assertDefined(componentOrLView, 'component');
    let lView = isLView(componentOrLView) ? componentOrLView : readPatchedLView(componentOrLView);
    while (lView && !(lView[FLAGS] & 512 /* IsRoot */)) {
        lView = getLViewParent(lView);
    }
    ngDevMode && assertLView(lView);
    return lView;
}
/**
 * Returns the `RootContext` instance that is associated with
 * the application where the target is situated. It does this by walking the parent views until it
 * gets to the root view, then getting the context off of that.
 *
 * @param viewOrComponent the `LView` or component to get the root context for.
 */
export function getRootContext(viewOrComponent) {
    const rootView = getRootView(viewOrComponent);
    ngDevMode &&
        assertDefined(rootView[CONTEXT], 'RootView has no context. Perhaps it is disconnected?');
    return rootView[CONTEXT];
}
/**
 * Gets the first `LContainer` in the LView or `null` if none exists.
 */
export function getFirstLContainer(lView) {
    return getNearestLContainer(lView[CHILD_HEAD]);
}
/**
 * Gets the next `LContainer` that is a sibling of the given container.
 */
export function getNextLContainer(container) {
    return getNearestLContainer(container[NEXT]);
}
function getNearestLContainer(viewOrContainer) {
    while (viewOrContainer !== null && !isLContainer(viewOrContainer)) {
        viewOrContainer = viewOrContainer[NEXT];
    }
    return viewOrContainer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld190cmF2ZXJzYWxfdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL3V0aWwvdmlld190cmF2ZXJzYWxfdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFdEQsT0FBTyxFQUFDLFlBQVksRUFBRSxPQUFPLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQXFCLElBQUksRUFBRSxNQUFNLEVBQWMsTUFBTSxvQkFBb0IsQ0FBQztBQUc1Rzs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGNBQWMsQ0FBQyxLQUFZO0lBQ3pDLFNBQVMsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdCLE9BQU8sWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUN6RCxDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsV0FBVyxDQUFDLGdCQUEwQjtJQUNwRCxTQUFTLElBQUksYUFBYSxDQUFDLGdCQUFnQixFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzFELElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUUsQ0FBQztJQUMvRixPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxtQkFBb0IsQ0FBQyxFQUFFO1FBQ25ELEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFFLENBQUM7S0FDaEM7SUFDRCxTQUFTLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVEOzs7Ozs7R0FNRztBQUNILE1BQU0sVUFBVSxjQUFjLENBQUMsZUFBeUI7SUFDdEQsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzlDLFNBQVM7UUFDTCxhQUFhLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLHNEQUFzRCxDQUFDLENBQUM7SUFDN0YsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFnQixDQUFDO0FBQzFDLENBQUM7QUFHRDs7R0FFRztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxLQUFZO0lBQzdDLE9BQU8sb0JBQW9CLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxVQUFVLGlCQUFpQixDQUFDLFNBQXFCO0lBQ3JELE9BQU8sb0JBQW9CLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDL0MsQ0FBQztBQUVELFNBQVMsb0JBQW9CLENBQUMsZUFBc0M7SUFDbEUsT0FBTyxlQUFlLEtBQUssSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1FBQ2pFLGVBQWUsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekM7SUFDRCxPQUFPLGVBQWUsQ0FBQztBQUN6QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7YXNzZXJ0RGVmaW5lZH0gZnJvbSAnLi4vLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHthc3NlcnRMVmlld30gZnJvbSAnLi4vYXNzZXJ0JztcbmltcG9ydCB7cmVhZFBhdGNoZWRMVmlld30gZnJvbSAnLi4vY29udGV4dF9kaXNjb3ZlcnknO1xuaW1wb3J0IHtMQ29udGFpbmVyfSBmcm9tICcuLi9pbnRlcmZhY2VzL2NvbnRhaW5lcic7XG5pbXBvcnQge2lzTENvbnRhaW5lciwgaXNMVmlld30gZnJvbSAnLi4vaW50ZXJmYWNlcy90eXBlX2NoZWNrcyc7XG5pbXBvcnQge0NISUxEX0hFQUQsIENPTlRFWFQsIEZMQUdTLCBMVmlldywgTFZpZXdGbGFncywgTkVYVCwgUEFSRU5ULCBSb290Q29udGV4dH0gZnJvbSAnLi4vaW50ZXJmYWNlcy92aWV3JztcblxuXG4vKipcbiAqIEdldHMgdGhlIHBhcmVudCBMVmlldyBvZiB0aGUgcGFzc2VkIExWaWV3LCBpZiB0aGUgUEFSRU5UIGlzIGFuIExDb250YWluZXIsIHdpbGwgZ2V0IHRoZSBwYXJlbnQgb2ZcbiAqIHRoYXQgTENvbnRhaW5lciwgd2hpY2ggaXMgYW4gTFZpZXdcbiAqIEBwYXJhbSBsVmlldyB0aGUgbFZpZXcgd2hvc2UgcGFyZW50IHRvIGdldFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TFZpZXdQYXJlbnQobFZpZXc6IExWaWV3KTogTFZpZXd8bnVsbCB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRMVmlldyhsVmlldyk7XG4gIGNvbnN0IHBhcmVudCA9IGxWaWV3W1BBUkVOVF07XG4gIHJldHVybiBpc0xDb250YWluZXIocGFyZW50KSA/IHBhcmVudFtQQVJFTlRdISA6IHBhcmVudDtcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZSB0aGUgcm9vdCB2aWV3IGZyb20gYW55IGNvbXBvbmVudCBvciBgTFZpZXdgIGJ5IHdhbGtpbmcgdGhlIHBhcmVudCBgTFZpZXdgIHVudGlsXG4gKiByZWFjaGluZyB0aGUgcm9vdCBgTFZpZXdgLlxuICpcbiAqIEBwYXJhbSBjb21wb25lbnRPckxWaWV3IGFueSBjb21wb25lbnQgb3IgYExWaWV3YFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um9vdFZpZXcoY29tcG9uZW50T3JMVmlldzogTFZpZXd8e30pOiBMVmlldyB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnREZWZpbmVkKGNvbXBvbmVudE9yTFZpZXcsICdjb21wb25lbnQnKTtcbiAgbGV0IGxWaWV3ID0gaXNMVmlldyhjb21wb25lbnRPckxWaWV3KSA/IGNvbXBvbmVudE9yTFZpZXcgOiByZWFkUGF0Y2hlZExWaWV3KGNvbXBvbmVudE9yTFZpZXcpITtcbiAgd2hpbGUgKGxWaWV3ICYmICEobFZpZXdbRkxBR1NdICYgTFZpZXdGbGFncy5Jc1Jvb3QpKSB7XG4gICAgbFZpZXcgPSBnZXRMVmlld1BhcmVudChsVmlldykhO1xuICB9XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRMVmlldyhsVmlldyk7XG4gIHJldHVybiBsVmlldztcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBgUm9vdENvbnRleHRgIGluc3RhbmNlIHRoYXQgaXMgYXNzb2NpYXRlZCB3aXRoXG4gKiB0aGUgYXBwbGljYXRpb24gd2hlcmUgdGhlIHRhcmdldCBpcyBzaXR1YXRlZC4gSXQgZG9lcyB0aGlzIGJ5IHdhbGtpbmcgdGhlIHBhcmVudCB2aWV3cyB1bnRpbCBpdFxuICogZ2V0cyB0byB0aGUgcm9vdCB2aWV3LCB0aGVuIGdldHRpbmcgdGhlIGNvbnRleHQgb2ZmIG9mIHRoYXQuXG4gKlxuICogQHBhcmFtIHZpZXdPckNvbXBvbmVudCB0aGUgYExWaWV3YCBvciBjb21wb25lbnQgdG8gZ2V0IHRoZSByb290IGNvbnRleHQgZm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um9vdENvbnRleHQodmlld09yQ29tcG9uZW50OiBMVmlld3x7fSk6IFJvb3RDb250ZXh0IHtcbiAgY29uc3Qgcm9vdFZpZXcgPSBnZXRSb290Vmlldyh2aWV3T3JDb21wb25lbnQpO1xuICBuZ0Rldk1vZGUgJiZcbiAgICAgIGFzc2VydERlZmluZWQocm9vdFZpZXdbQ09OVEVYVF0sICdSb290VmlldyBoYXMgbm8gY29udGV4dC4gUGVyaGFwcyBpdCBpcyBkaXNjb25uZWN0ZWQ/Jyk7XG4gIHJldHVybiByb290Vmlld1tDT05URVhUXSBhcyBSb290Q29udGV4dDtcbn1cblxuXG4vKipcbiAqIEdldHMgdGhlIGZpcnN0IGBMQ29udGFpbmVyYCBpbiB0aGUgTFZpZXcgb3IgYG51bGxgIGlmIG5vbmUgZXhpc3RzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rmlyc3RMQ29udGFpbmVyKGxWaWV3OiBMVmlldyk6IExDb250YWluZXJ8bnVsbCB7XG4gIHJldHVybiBnZXROZWFyZXN0TENvbnRhaW5lcihsVmlld1tDSElMRF9IRUFEXSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbmV4dCBgTENvbnRhaW5lcmAgdGhhdCBpcyBhIHNpYmxpbmcgb2YgdGhlIGdpdmVuIGNvbnRhaW5lci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE5leHRMQ29udGFpbmVyKGNvbnRhaW5lcjogTENvbnRhaW5lcik6IExDb250YWluZXJ8bnVsbCB7XG4gIHJldHVybiBnZXROZWFyZXN0TENvbnRhaW5lcihjb250YWluZXJbTkVYVF0pO1xufVxuXG5mdW5jdGlvbiBnZXROZWFyZXN0TENvbnRhaW5lcih2aWV3T3JDb250YWluZXI6IExDb250YWluZXJ8TFZpZXd8bnVsbCkge1xuICB3aGlsZSAodmlld09yQ29udGFpbmVyICE9PSBudWxsICYmICFpc0xDb250YWluZXIodmlld09yQ29udGFpbmVyKSkge1xuICAgIHZpZXdPckNvbnRhaW5lciA9IHZpZXdPckNvbnRhaW5lcltORVhUXTtcbiAgfVxuICByZXR1cm4gdmlld09yQ29udGFpbmVyO1xufVxuIl19