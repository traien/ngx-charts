/**
 * Based on the data, return an array with unique values.
 *
 * @export
 * @returns array
 */
export function getUniqueXDomainValues(results) {
    const valueSet = new Set();
    for (const result of results) {
        for (const d of result.series) {
            valueSet.add(d.name);
        }
    }
    return Array.from(valueSet);
}
/**
 * Get the scaleType of enumerable of values.
 * @returns  'time', 'linear' or 'ordinal'
 */
export function getScaleType(values, checkDateType = true) {
    if (checkDateType) {
        const allDates = values.every(value => value instanceof Date);
        if (allDates) {
            return 'time';
        }
    }
    const allNumbers = values.every(value => typeof value === 'number');
    if (allNumbers) {
        return 'linear';
    }
    return 'ordinal';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLmhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9kb21haW4uaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLHNCQUFzQixDQUFDLE9BQWM7SUFDbkQsTUFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUMzQixLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRTtRQUM1QixLQUFLLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDN0IsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdEI7S0FDRjtJQUNELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM5QixDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLFlBQVksQ0FBQyxNQUFhLEVBQUUsYUFBYSxHQUFHLElBQUk7SUFDOUQsSUFBSSxhQUFhLEVBQUU7UUFDakIsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssWUFBWSxJQUFJLENBQUMsQ0FBQztRQUM5RCxJQUFJLFFBQVEsRUFBRTtZQUNaLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7S0FDRjtJQUVELE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQztJQUNwRSxJQUFJLFVBQVUsRUFBRTtRQUNkLE9BQU8sUUFBUSxDQUFDO0tBQ2pCO0lBRUQsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBCYXNlZCBvbiB0aGUgZGF0YSwgcmV0dXJuIGFuIGFycmF5IHdpdGggdW5pcXVlIHZhbHVlcy5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAcmV0dXJucyBhcnJheVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFVuaXF1ZVhEb21haW5WYWx1ZXMocmVzdWx0czogYW55W10pOiBhbnlbXSB7XHJcbiAgY29uc3QgdmFsdWVTZXQgPSBuZXcgU2V0KCk7XHJcbiAgZm9yIChjb25zdCByZXN1bHQgb2YgcmVzdWx0cykge1xyXG4gICAgZm9yIChjb25zdCBkIG9mIHJlc3VsdC5zZXJpZXMpIHtcclxuICAgICAgdmFsdWVTZXQuYWRkKGQubmFtZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBBcnJheS5mcm9tKHZhbHVlU2V0KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgc2NhbGVUeXBlIG9mIGVudW1lcmFibGUgb2YgdmFsdWVzLlxyXG4gKiBAcmV0dXJucyAgJ3RpbWUnLCAnbGluZWFyJyBvciAnb3JkaW5hbCdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTY2FsZVR5cGUodmFsdWVzOiBhbnlbXSwgY2hlY2tEYXRlVHlwZSA9IHRydWUpOiBzdHJpbmcge1xyXG4gIGlmIChjaGVja0RhdGVUeXBlKSB7XHJcbiAgICBjb25zdCBhbGxEYXRlcyA9IHZhbHVlcy5ldmVyeSh2YWx1ZSA9PiB2YWx1ZSBpbnN0YW5jZW9mIERhdGUpO1xyXG4gICAgaWYgKGFsbERhdGVzKSB7XHJcbiAgICAgIHJldHVybiAndGltZSc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBhbGxOdW1iZXJzID0gdmFsdWVzLmV2ZXJ5KHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpO1xyXG4gIGlmIChhbGxOdW1iZXJzKSB7XHJcbiAgICByZXR1cm4gJ2xpbmVhcic7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gJ29yZGluYWwnO1xyXG59XHJcbiJdfQ==