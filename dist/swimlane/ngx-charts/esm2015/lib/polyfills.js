// The export is needed here to generate a valid polyfills.metadata.json file
export function ngxChartsPolyfills() {
    // IE11 fix
    // Ref: https://github.com/swimlane/ngx-charts/issues/386
    if (typeof SVGElement !== 'undefined' && typeof SVGElement.prototype.contains === 'undefined') {
        SVGElement.prototype.contains = HTMLDivElement.prototype.contains;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWZpbGxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvcG9seWZpbGxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDZFQUE2RTtBQUM3RSxNQUFNLFVBQVUsa0JBQWtCO0lBQ2hDLFdBQVc7SUFDWCx5REFBeUQ7SUFDekQsSUFBSSxPQUFPLFVBQVUsS0FBSyxXQUFXLElBQUksT0FBTyxVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsS0FBSyxXQUFXLEVBQUU7UUFDN0YsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7S0FDbkU7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIGV4cG9ydCBpcyBuZWVkZWQgaGVyZSB0byBnZW5lcmF0ZSBhIHZhbGlkIHBvbHlmaWxscy5tZXRhZGF0YS5qc29uIGZpbGVcclxuZXhwb3J0IGZ1bmN0aW9uIG5neENoYXJ0c1BvbHlmaWxscygpIHtcclxuICAvLyBJRTExIGZpeFxyXG4gIC8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL3N3aW1sYW5lL25neC1jaGFydHMvaXNzdWVzLzM4NlxyXG4gIGlmICh0eXBlb2YgU1ZHRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIFNWR0VsZW1lbnQucHJvdG90eXBlLmNvbnRhaW5zID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgU1ZHRWxlbWVudC5wcm90b3R5cGUuY29udGFpbnMgPSBIVE1MRGl2RWxlbWVudC5wcm90b3R5cGUuY29udGFpbnM7XHJcbiAgfVxyXG59XHJcbiJdfQ==