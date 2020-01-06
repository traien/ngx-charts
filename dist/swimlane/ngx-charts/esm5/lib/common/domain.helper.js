import { __values } from "tslib";
/**
 * Based on the data, return an array with unique values.
 *
 * @export
 * @returns array
 */
export function getUniqueXDomainValues(results) {
    var e_1, _a, e_2, _b;
    var valueSet = new Set();
    try {
        for (var results_1 = __values(results), results_1_1 = results_1.next(); !results_1_1.done; results_1_1 = results_1.next()) {
            var result = results_1_1.value;
            try {
                for (var _c = (e_2 = void 0, __values(result.series)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var d = _d.value;
                    valueSet.add(d.name);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (results_1_1 && !results_1_1.done && (_a = results_1.return)) _a.call(results_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return Array.from(valueSet);
}
/**
 * Get the scaleType of enumerable of values.
 * @returns  'time', 'linear' or 'ordinal'
 */
export function getScaleType(values, checkDateType) {
    if (checkDateType === void 0) { checkDateType = true; }
    if (checkDateType) {
        var allDates = values.every(function (value) { return value instanceof Date; });
        if (allDates) {
            return 'time';
        }
    }
    var allNumbers = values.every(function (value) { return typeof value === 'number'; });
    if (allNumbers) {
        return 'linear';
    }
    return 'ordinal';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLmhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9kb21haW4uaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxPQUFjOztJQUNuRCxJQUFNLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDOztRQUMzQixLQUFxQixJQUFBLFlBQUEsU0FBQSxPQUFPLENBQUEsZ0NBQUEscURBQUU7WUFBekIsSUFBTSxNQUFNLG9CQUFBOztnQkFDZixLQUFnQixJQUFBLG9CQUFBLFNBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQSxDQUFBLGdCQUFBLDRCQUFFO29CQUExQixJQUFNLENBQUMsV0FBQTtvQkFDVixRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDdEI7Ozs7Ozs7OztTQUNGOzs7Ozs7Ozs7SUFDRCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSxZQUFZLENBQUMsTUFBYSxFQUFFLGFBQW9CO0lBQXBCLDhCQUFBLEVBQUEsb0JBQW9CO0lBQzlELElBQUksYUFBYSxFQUFFO1FBQ2pCLElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLFlBQVksSUFBSSxFQUFyQixDQUFxQixDQUFDLENBQUM7UUFDOUQsSUFBSSxRQUFRLEVBQUU7WUFDWixPQUFPLE1BQU0sQ0FBQztTQUNmO0tBQ0Y7SUFFRCxJQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsT0FBTyxLQUFLLEtBQUssUUFBUSxFQUF6QixDQUF5QixDQUFDLENBQUM7SUFDcEUsSUFBSSxVQUFVLEVBQUU7UUFDZCxPQUFPLFFBQVEsQ0FBQztLQUNqQjtJQUVELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQmFzZWQgb24gdGhlIGRhdGEsIHJldHVybiBhbiBhcnJheSB3aXRoIHVuaXF1ZSB2YWx1ZXMuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQHJldHVybnMgYXJyYXlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRVbmlxdWVYRG9tYWluVmFsdWVzKHJlc3VsdHM6IGFueVtdKTogYW55W10ge1xyXG4gIGNvbnN0IHZhbHVlU2V0ID0gbmV3IFNldCgpO1xyXG4gIGZvciAoY29uc3QgcmVzdWx0IG9mIHJlc3VsdHMpIHtcclxuICAgIGZvciAoY29uc3QgZCBvZiByZXN1bHQuc2VyaWVzKSB7XHJcbiAgICAgIHZhbHVlU2V0LmFkZChkLm5hbWUpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gQXJyYXkuZnJvbSh2YWx1ZVNldCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHNjYWxlVHlwZSBvZiBlbnVtZXJhYmxlIG9mIHZhbHVlcy5cclxuICogQHJldHVybnMgICd0aW1lJywgJ2xpbmVhcicgb3IgJ29yZGluYWwnXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NhbGVUeXBlKHZhbHVlczogYW55W10sIGNoZWNrRGF0ZVR5cGUgPSB0cnVlKTogc3RyaW5nIHtcclxuICBpZiAoY2hlY2tEYXRlVHlwZSkge1xyXG4gICAgY29uc3QgYWxsRGF0ZXMgPSB2YWx1ZXMuZXZlcnkodmFsdWUgPT4gdmFsdWUgaW5zdGFuY2VvZiBEYXRlKTtcclxuICAgIGlmIChhbGxEYXRlcykge1xyXG4gICAgICByZXR1cm4gJ3RpbWUnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgYWxsTnVtYmVycyA9IHZhbHVlcy5ldmVyeSh2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKTtcclxuICBpZiAoYWxsTnVtYmVycykge1xyXG4gICAgcmV0dXJuICdsaW5lYXInO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuICdvcmRpbmFsJztcclxufVxyXG4iXX0=