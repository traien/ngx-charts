import { timeFormat } from 'd3-time-format';
export function tickFormat(fieldType, groupByType) {
    return function (label) {
        if (label === 'No Value' || label === 'Other') {
            return label;
        }
        if (fieldType === 'date' && groupByType === 'groupBy') {
            var formatter = timeFormat('MM/DD/YYYY');
            return formatter(label);
        }
        return label.toString();
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGljay1mb3JtYXQuaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL3RpY2stZm9ybWF0LmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFNUMsTUFBTSxVQUFVLFVBQVUsQ0FBQyxTQUFTLEVBQUUsV0FBVztJQUMvQyxPQUFPLFVBQVMsS0FBYTtRQUMzQixJQUFJLEtBQUssS0FBSyxVQUFVLElBQUksS0FBSyxLQUFLLE9BQU8sRUFBRTtZQUM3QyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsSUFBSSxTQUFTLEtBQUssTUFBTSxJQUFJLFdBQVcsS0FBSyxTQUFTLEVBQUU7WUFDckQsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzNDLE9BQU8sU0FBUyxDQUFNLEtBQUssQ0FBQyxDQUFDO1NBQzlCO1FBRUQsT0FBTyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRpbWVGb3JtYXQgfSBmcm9tICdkMy10aW1lLWZvcm1hdCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGlja0Zvcm1hdChmaWVsZFR5cGUsIGdyb3VwQnlUeXBlKTogKGxhYmVsOiBzdHJpbmcpID0+IHN0cmluZyB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uKGxhYmVsOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgaWYgKGxhYmVsID09PSAnTm8gVmFsdWUnIHx8IGxhYmVsID09PSAnT3RoZXInKSB7XHJcbiAgICAgIHJldHVybiBsYWJlbDtcclxuICAgIH1cclxuICAgIGlmIChmaWVsZFR5cGUgPT09ICdkYXRlJyAmJiBncm91cEJ5VHlwZSA9PT0gJ2dyb3VwQnknKSB7XHJcbiAgICAgIGNvbnN0IGZvcm1hdHRlciA9IHRpbWVGb3JtYXQoJ01NL0REL1lZWVknKTtcclxuICAgICAgcmV0dXJuIGZvcm1hdHRlcig8YW55PmxhYmVsKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbGFiZWwudG9TdHJpbmcoKTtcclxuICB9O1xyXG59XHJcbiJdfQ==