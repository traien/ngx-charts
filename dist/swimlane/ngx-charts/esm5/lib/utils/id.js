var cache = {};
/**
 * Generates a short id.
 *
 * Description:
 *   A 4-character alphanumeric sequence (364 = 1.6 million)
 *   This should only be used for JavaScript specific models.
 *   http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
 *
 *   Example: `ebgf`
 */
export function id() {
    var newId = ('0000' + ((Math.random() * Math.pow(36, 4)) << 0).toString(36)).slice(-4);
    // append a 'a' because neo gets mad
    newId = "a" + newId;
    // ensure not already used
    if (!cache[newId]) {
        cache[newId] = true;
        return newId;
    }
    return id();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi91dGlscy9pZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7QUFFakI7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxVQUFVLEVBQUU7SUFDaEIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXZGLG9DQUFvQztJQUNwQyxLQUFLLEdBQUcsTUFBSSxLQUFPLENBQUM7SUFFcEIsMEJBQTBCO0lBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDakIsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNwQixPQUFPLEtBQUssQ0FBQztLQUNkO0lBRUQsT0FBTyxFQUFFLEVBQUUsQ0FBQztBQUNkLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjYWNoZSA9IHt9O1xyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIHNob3J0IGlkLlxyXG4gKlxyXG4gKiBEZXNjcmlwdGlvbjpcclxuICogICBBIDQtY2hhcmFjdGVyIGFscGhhbnVtZXJpYyBzZXF1ZW5jZSAoMzY0ID0gMS42IG1pbGxpb24pXHJcbiAqICAgVGhpcyBzaG91bGQgb25seSBiZSB1c2VkIGZvciBKYXZhU2NyaXB0IHNwZWNpZmljIG1vZGVscy5cclxuICogICBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzYyNDg2NjYvaG93LXRvLWdlbmVyYXRlLXNob3J0LXVpZC1saWtlLWF4NGo5ei1pbi1qc1xyXG4gKlxyXG4gKiAgIEV4YW1wbGU6IGBlYmdmYFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlkKCk6IHN0cmluZyB7XHJcbiAgbGV0IG5ld0lkID0gKCcwMDAwJyArICgoTWF0aC5yYW5kb20oKSAqIE1hdGgucG93KDM2LCA0KSkgPDwgMCkudG9TdHJpbmcoMzYpKS5zbGljZSgtNCk7XHJcblxyXG4gIC8vIGFwcGVuZCBhICdhJyBiZWNhdXNlIG5lbyBnZXRzIG1hZFxyXG4gIG5ld0lkID0gYGEke25ld0lkfWA7XHJcblxyXG4gIC8vIGVuc3VyZSBub3QgYWxyZWFkeSB1c2VkXHJcbiAgaWYgKCFjYWNoZVtuZXdJZF0pIHtcclxuICAgIGNhY2hlW25ld0lkXSA9IHRydWU7XHJcbiAgICByZXR1cm4gbmV3SWQ7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gaWQoKTtcclxufVxyXG4iXX0=