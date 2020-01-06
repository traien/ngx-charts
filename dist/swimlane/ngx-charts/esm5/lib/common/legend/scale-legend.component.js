import { __decorate } from "tslib";
import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
var ScaleLegendComponent = /** @class */ (function () {
    function ScaleLegendComponent(sanitizer) {
        this.sanitizer = sanitizer;
        this.horizontal = false;
    }
    ScaleLegendComponent.prototype.ngOnChanges = function (changes) {
        var gradientValues = this.gradientString(this.colors.range(), this.colors.domain());
        var direction = this.horizontal ? 'right' : 'bottom';
        this.gradient = this.sanitizer.bypassSecurityTrustStyle("linear-gradient(to " + direction + ", " + gradientValues + ")");
    };
    /**
     * Generates the string used in the gradient stylesheet properties
     * @param colors array of colors
     * @param splits array of splits on a scale of (0, 1)
     */
    ScaleLegendComponent.prototype.gradientString = function (colors, splits) {
        // add the 100%
        splits.push(1);
        var pairs = [];
        colors.reverse().forEach(function (c, i) {
            pairs.push(c + " " + Math.round(splits[i] * 100) + "%");
        });
        return pairs.join(', ');
    };
    ScaleLegendComponent.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    __decorate([
        Input()
    ], ScaleLegendComponent.prototype, "valueRange", void 0);
    __decorate([
        Input()
    ], ScaleLegendComponent.prototype, "colors", void 0);
    __decorate([
        Input()
    ], ScaleLegendComponent.prototype, "height", void 0);
    __decorate([
        Input()
    ], ScaleLegendComponent.prototype, "width", void 0);
    __decorate([
        Input()
    ], ScaleLegendComponent.prototype, "horizontal", void 0);
    ScaleLegendComponent = __decorate([
        Component({
            selector: 'ngx-charts-scale-legend',
            template: "\n    <div\n      class=\"scale-legend\"\n      [class.horizontal-legend]=\"horizontal\"\n      [style.height.px]=\"horizontal ? undefined : height\"\n      [style.width.px]=\"width\"\n    >\n      <div class=\"scale-legend-label\">\n        <span>{{ valueRange[1].toLocaleString() }}</span>\n      </div>\n      <div class=\"scale-legend-wrap\" [style.background]=\"gradient\"></div>\n      <div class=\"scale-legend-label\">\n        <span>{{ valueRange[0].toLocaleString() }}</span>\n      </div>\n    </div>\n  ",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".chart-legend{display:inline-block;padding:0;width:auto!important}.chart-legend .scale-legend{text-align:center;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.chart-legend .scale-legend-wrap{display:inline-block;-webkit-box-flex:1;flex:1;width:30px;border-radius:5px;margin:0 auto}.chart-legend .scale-legend-label{font-size:12px}.chart-legend .horizontal-legend.scale-legend{-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}.chart-legend .horizontal-legend .scale-legend-wrap{width:auto;height:30px;margin:0 16px}"]
        })
    ], ScaleLegendComponent);
    return ScaleLegendComponent;
}());
export { ScaleLegendComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbGUtbGVnZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9sZWdlbmQvc2NhbGUtbGVnZW5kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsdUJBQXVCLEVBQWlCLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQXdCekQ7SUFTRSw4QkFBb0IsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUpsQyxlQUFVLEdBQUcsS0FBSyxDQUFDO0lBSWtCLENBQUM7SUFFL0MsMENBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDdEYsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDdkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDLHdCQUFzQixTQUFTLFVBQUssY0FBYyxNQUFHLENBQUMsQ0FBQztJQUNqSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILDZDQUFjLEdBQWQsVUFBZSxNQUFNLEVBQUUsTUFBTTtRQUMzQixlQUFlO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNmLElBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNqQixNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7WUFDNUIsS0FBSyxDQUFDLElBQUksQ0FBSSxDQUFDLFNBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQUcsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7O2dCQXRCOEIsWUFBWTs7SUFSbEM7UUFBUixLQUFLLEVBQUU7NERBQVk7SUFDWDtRQUFSLEtBQUssRUFBRTt3REFBUTtJQUNQO1FBQVIsS0FBSyxFQUFFO3dEQUFRO0lBQ1A7UUFBUixLQUFLLEVBQUU7dURBQU87SUFDTjtRQUFSLEtBQUssRUFBRTs0REFBb0I7SUFMakIsb0JBQW9CO1FBdEJoQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUseUJBQXlCO1lBQ25DLFFBQVEsRUFBRSxxZ0JBZVQ7WUFFRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtZQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7U0FDaEQsQ0FBQztPQUNXLG9CQUFvQixDQWdDaEM7SUFBRCwyQkFBQztDQUFBLEFBaENELElBZ0NDO1NBaENZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFNpbXBsZUNoYW5nZXMsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtY2hhcnRzLXNjYWxlLWxlZ2VuZCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXZcclxuICAgICAgY2xhc3M9XCJzY2FsZS1sZWdlbmRcIlxyXG4gICAgICBbY2xhc3MuaG9yaXpvbnRhbC1sZWdlbmRdPVwiaG9yaXpvbnRhbFwiXHJcbiAgICAgIFtzdHlsZS5oZWlnaHQucHhdPVwiaG9yaXpvbnRhbCA/IHVuZGVmaW5lZCA6IGhlaWdodFwiXHJcbiAgICAgIFtzdHlsZS53aWR0aC5weF09XCJ3aWR0aFwiXHJcbiAgICA+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJzY2FsZS1sZWdlbmQtbGFiZWxcIj5cclxuICAgICAgICA8c3Bhbj57eyB2YWx1ZVJhbmdlWzFdLnRvTG9jYWxlU3RyaW5nKCkgfX08L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwic2NhbGUtbGVnZW5kLXdyYXBcIiBbc3R5bGUuYmFja2dyb3VuZF09XCJncmFkaWVudFwiPjwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwic2NhbGUtbGVnZW5kLWxhYmVsXCI+XHJcbiAgICAgICAgPHNwYW4+e3sgdmFsdWVSYW5nZVswXS50b0xvY2FsZVN0cmluZygpIH19PC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGAsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc2NhbGUtbGVnZW5kLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2NhbGVMZWdlbmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIHZhbHVlUmFuZ2U7XHJcbiAgQElucHV0KCkgY29sb3JzO1xyXG4gIEBJbnB1dCgpIGhlaWdodDtcclxuICBASW5wdXQoKSB3aWR0aDtcclxuICBASW5wdXQoKSBob3Jpem9udGFsID0gZmFsc2U7XHJcblxyXG4gIGdyYWRpZW50OiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHt9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGNvbnN0IGdyYWRpZW50VmFsdWVzID0gdGhpcy5ncmFkaWVudFN0cmluZyh0aGlzLmNvbG9ycy5yYW5nZSgpLCB0aGlzLmNvbG9ycy5kb21haW4oKSk7XHJcbiAgICBjb25zdCBkaXJlY3Rpb24gPSB0aGlzLmhvcml6b250YWwgPyAncmlnaHQnIDogJ2JvdHRvbSc7XHJcbiAgICB0aGlzLmdyYWRpZW50ID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKGBsaW5lYXItZ3JhZGllbnQodG8gJHtkaXJlY3Rpb259LCAke2dyYWRpZW50VmFsdWVzfSlgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdlbmVyYXRlcyB0aGUgc3RyaW5nIHVzZWQgaW4gdGhlIGdyYWRpZW50IHN0eWxlc2hlZXQgcHJvcGVydGllc1xyXG4gICAqIEBwYXJhbSBjb2xvcnMgYXJyYXkgb2YgY29sb3JzXHJcbiAgICogQHBhcmFtIHNwbGl0cyBhcnJheSBvZiBzcGxpdHMgb24gYSBzY2FsZSBvZiAoMCwgMSlcclxuICAgKi9cclxuICBncmFkaWVudFN0cmluZyhjb2xvcnMsIHNwbGl0cyk6IHN0cmluZyB7XHJcbiAgICAvLyBhZGQgdGhlIDEwMCVcclxuICAgIHNwbGl0cy5wdXNoKDEpO1xyXG4gICAgY29uc3QgcGFpcnMgPSBbXTtcclxuICAgIGNvbG9ycy5yZXZlcnNlKCkuZm9yRWFjaCgoYywgaSkgPT4ge1xyXG4gICAgICBwYWlycy5wdXNoKGAke2N9ICR7TWF0aC5yb3VuZChzcGxpdHNbaV0gKiAxMDApfSVgKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBwYWlycy5qb2luKCcsICcpO1xyXG4gIH1cclxufVxyXG4iXX0=