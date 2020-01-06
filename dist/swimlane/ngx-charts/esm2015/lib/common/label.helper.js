/**
 * Formats a label given a date, number or string.
 *
 * @export
 */
export function formatLabel(label) {
    if (label instanceof Date) {
        label = label.toLocaleDateString();
    }
    else {
        label = label.toLocaleString();
    }
    return label;
}
/**
 * Escapes a label.
 *
 * @export
 */
export function escapeLabel(label) {
    return label.toLocaleString().replace(/[&'`"<>]/g, match => {
        return {
            '&': '&amp;',
            // tslint:disable-next-line: quotemark
            "'": '&#x27;',
            '`': '&#x60;',
            '"': '&quot;',
            '<': '&lt;',
            '>': '&gt;'
        }[match];
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwuaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL2xhYmVsLmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLFdBQVcsQ0FBQyxLQUFVO0lBQ3BDLElBQUksS0FBSyxZQUFZLElBQUksRUFBRTtRQUN6QixLQUFLLEdBQUcsS0FBSyxDQUFDLGtCQUFrQixFQUFFLENBQUM7S0FDcEM7U0FBTTtRQUNMLEtBQUssR0FBRyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDaEM7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLFdBQVcsQ0FBQyxLQUFVO0lBQ3BDLE9BQU8sS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEVBQUU7UUFDekQsT0FBTztZQUNMLEdBQUcsRUFBRSxPQUFPO1lBQ1osc0NBQXNDO1lBQ3RDLEdBQUcsRUFBRSxRQUFRO1lBQ2IsR0FBRyxFQUFFLFFBQVE7WUFDYixHQUFHLEVBQUUsUUFBUTtZQUNiLEdBQUcsRUFBRSxNQUFNO1lBQ1gsR0FBRyxFQUFFLE1BQU07U0FDWixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ1gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEZvcm1hdHMgYSBsYWJlbCBnaXZlbiBhIGRhdGUsIG51bWJlciBvciBzdHJpbmcuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRMYWJlbChsYWJlbDogYW55KTogc3RyaW5nIHtcclxuICBpZiAobGFiZWwgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICBsYWJlbCA9IGxhYmVsLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsYWJlbCA9IGxhYmVsLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbGFiZWw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFc2NhcGVzIGEgbGFiZWwuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVMYWJlbChsYWJlbDogYW55KTogc3RyaW5nIHtcclxuICByZXR1cm4gbGFiZWwudG9Mb2NhbGVTdHJpbmcoKS5yZXBsYWNlKC9bJidgXCI8Pl0vZywgbWF0Y2ggPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgJyYnOiAnJmFtcDsnLFxyXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHF1b3RlbWFya1xyXG4gICAgICBcIidcIjogJyYjeDI3OycsXHJcbiAgICAgICdgJzogJyYjeDYwOycsXHJcbiAgICAgICdcIic6ICcmcXVvdDsnLFxyXG4gICAgICAnPCc6ICcmbHQ7JyxcclxuICAgICAgJz4nOiAnJmd0OydcclxuICAgIH1bbWF0Y2hdO1xyXG4gIH0pO1xyXG59XHJcbiJdfQ==