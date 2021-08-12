import { listChanges } from './changes';
import { validateEventsArray } from './utils';
export function snapshotChanges(query, events, scheduler) {
    events = validateEventsArray(events);
    return listChanges(query, events, scheduler);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcHNob3QtY2hhbmdlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9kYXRhYmFzZS9saXN0L3NuYXBzaG90LWNoYW5nZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUV4QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFOUMsTUFBTSxVQUFVLGVBQWUsQ0FDN0IsS0FBb0IsRUFDcEIsTUFBcUIsRUFDckIsU0FBeUI7SUFFekIsTUFBTSxHQUFHLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JDLE9BQU8sV0FBVyxDQUFJLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDbEQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIFNjaGVkdWxlckxpa2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGxpc3RDaGFuZ2VzIH0gZnJvbSAnLi9jaGFuZ2VzJztcbmltcG9ydCB7IENoaWxkRXZlbnQsIERhdGFiYXNlUXVlcnksIFNuYXBzaG90QWN0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyB2YWxpZGF0ZUV2ZW50c0FycmF5IH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzbmFwc2hvdENoYW5nZXM8VD4oXG4gIHF1ZXJ5OiBEYXRhYmFzZVF1ZXJ5LFxuICBldmVudHM/OiBDaGlsZEV2ZW50W10sXG4gIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2Vcbik6IE9ic2VydmFibGU8U25hcHNob3RBY3Rpb248VD5bXT4ge1xuICBldmVudHMgPSB2YWxpZGF0ZUV2ZW50c0FycmF5KGV2ZW50cyk7XG4gIHJldHVybiBsaXN0Q2hhbmdlczxUPihxdWVyeSwgZXZlbnRzLCBzY2hlZHVsZXIpO1xufVxuIl19