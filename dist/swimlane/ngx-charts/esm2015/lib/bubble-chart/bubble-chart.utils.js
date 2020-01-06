import { scaleLinear, scalePoint, scaleTime } from 'd3-scale';
export function getDomain(values, scaleType, autoScale, minVal, maxVal) {
    let domain = [];
    if (scaleType === 'linear') {
        values = values.map(v => Number(v));
        if (!autoScale) {
            values.push(0);
        }
    }
    if (scaleType === 'time' || scaleType === 'linear') {
        const min = minVal ? minVal : Math.min(...values);
        const max = maxVal ? maxVal : Math.max(...values);
        domain = [min, max];
    }
    else {
        domain = values;
    }
    return domain;
}
export function getScale(domain, range, scaleType, roundDomains) {
    let scale;
    if (scaleType === 'time') {
        scale = scaleTime()
            .range(range)
            .domain(domain);
    }
    else if (scaleType === 'linear') {
        scale = scaleLinear()
            .range(range)
            .domain(domain);
        if (roundDomains) {
            scale = scale.nice();
        }
    }
    else if (scaleType === 'ordinal') {
        scale = scalePoint()
            .range([range[0], range[1]])
            .domain(domain);
    }
    return scale;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnViYmxlLWNoYXJ0LnV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvYnViYmxlLWNoYXJ0L2J1YmJsZS1jaGFydC51dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFOUQsTUFBTSxVQUFVLFNBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFPLEVBQUUsTUFBTztJQUN0RSxJQUFJLE1BQU0sR0FBYSxFQUFFLENBQUM7SUFDMUIsSUFBSSxTQUFTLEtBQUssUUFBUSxFQUFFO1FBQzFCLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEI7S0FDRjtJQUVELElBQUksU0FBUyxLQUFLLE1BQU0sSUFBSSxTQUFTLEtBQUssUUFBUSxFQUFFO1FBQ2xELE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7UUFDbEQsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztRQUVsRCxNQUFNLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDckI7U0FBTTtRQUNMLE1BQU0sR0FBRyxNQUFNLENBQUM7S0FDakI7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBZSxFQUFFLFNBQVMsRUFBRSxZQUFZO0lBQ3ZFLElBQUksS0FBVSxDQUFDO0lBRWYsSUFBSSxTQUFTLEtBQUssTUFBTSxFQUFFO1FBQ3hCLEtBQUssR0FBRyxTQUFTLEVBQUU7YUFDaEIsS0FBSyxDQUFDLEtBQUssQ0FBQzthQUNaLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNuQjtTQUFNLElBQUksU0FBUyxLQUFLLFFBQVEsRUFBRTtRQUNqQyxLQUFLLEdBQUcsV0FBVyxFQUFFO2FBQ2xCLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDWixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbEIsSUFBSSxZQUFZLEVBQUU7WUFDaEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN0QjtLQUNGO1NBQU0sSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO1FBQ2xDLEtBQUssR0FBRyxVQUFVLEVBQUU7YUFDakIsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzNCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNuQjtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNjYWxlTGluZWFyLCBzY2FsZVBvaW50LCBzY2FsZVRpbWUgfSBmcm9tICdkMy1zY2FsZSc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RG9tYWluKHZhbHVlcywgc2NhbGVUeXBlLCBhdXRvU2NhbGUsIG1pblZhbD8sIG1heFZhbD8pOiBudW1iZXJbXSB7XHJcbiAgbGV0IGRvbWFpbjogbnVtYmVyW10gPSBbXTtcclxuICBpZiAoc2NhbGVUeXBlID09PSAnbGluZWFyJykge1xyXG4gICAgdmFsdWVzID0gdmFsdWVzLm1hcCh2ID0+IE51bWJlcih2KSk7XHJcbiAgICBpZiAoIWF1dG9TY2FsZSkge1xyXG4gICAgICB2YWx1ZXMucHVzaCgwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChzY2FsZVR5cGUgPT09ICd0aW1lJyB8fCBzY2FsZVR5cGUgPT09ICdsaW5lYXInKSB7XHJcbiAgICBjb25zdCBtaW4gPSBtaW5WYWwgPyBtaW5WYWwgOiBNYXRoLm1pbiguLi52YWx1ZXMpO1xyXG4gICAgY29uc3QgbWF4ID0gbWF4VmFsID8gbWF4VmFsIDogTWF0aC5tYXgoLi4udmFsdWVzKTtcclxuXHJcbiAgICBkb21haW4gPSBbbWluLCBtYXhdO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBkb21haW4gPSB2YWx1ZXM7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZG9tYWluO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NhbGUoZG9tYWluLCByYW5nZTogbnVtYmVyW10sIHNjYWxlVHlwZSwgcm91bmREb21haW5zKTogYW55IHtcclxuICBsZXQgc2NhbGU6IGFueTtcclxuXHJcbiAgaWYgKHNjYWxlVHlwZSA9PT0gJ3RpbWUnKSB7XHJcbiAgICBzY2FsZSA9IHNjYWxlVGltZSgpXHJcbiAgICAgIC5yYW5nZShyYW5nZSlcclxuICAgICAgLmRvbWFpbihkb21haW4pO1xyXG4gIH0gZWxzZSBpZiAoc2NhbGVUeXBlID09PSAnbGluZWFyJykge1xyXG4gICAgc2NhbGUgPSBzY2FsZUxpbmVhcigpXHJcbiAgICAgIC5yYW5nZShyYW5nZSlcclxuICAgICAgLmRvbWFpbihkb21haW4pO1xyXG5cclxuICAgIGlmIChyb3VuZERvbWFpbnMpIHtcclxuICAgICAgc2NhbGUgPSBzY2FsZS5uaWNlKCk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChzY2FsZVR5cGUgPT09ICdvcmRpbmFsJykge1xyXG4gICAgc2NhbGUgPSBzY2FsZVBvaW50KClcclxuICAgICAgLnJhbmdlKFtyYW5nZVswXSwgcmFuZ2VbMV1dKVxyXG4gICAgICAuZG9tYWluKGRvbWFpbik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc2NhbGU7XHJcbn1cclxuIl19