import { __decorate } from "tslib";
import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
let ScaleLegendComponent = class ScaleLegendComponent {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.horizontal = false;
    }
    ngOnChanges(changes) {
        const gradientValues = this.gradientString(this.colors.range(), this.colors.domain());
        const direction = this.horizontal ? 'right' : 'bottom';
        this.gradient = this.sanitizer.bypassSecurityTrustStyle(`linear-gradient(to ${direction}, ${gradientValues})`);
    }
    /**
     * Generates the string used in the gradient stylesheet properties
     * @param colors array of colors
     * @param splits array of splits on a scale of (0, 1)
     */
    gradientString(colors, splits) {
        // add the 100%
        splits.push(1);
        const pairs = [];
        colors.reverse().forEach((c, i) => {
            pairs.push(`${c} ${Math.round(splits[i] * 100)}%`);
        });
        return pairs.join(', ');
    }
};
ScaleLegendComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
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
        template: `
    <div
      class="scale-legend"
      [class.horizontal-legend]="horizontal"
      [style.height.px]="horizontal ? undefined : height"
      [style.width.px]="width"
    >
      <div class="scale-legend-label">
        <span>{{ valueRange[1].toLocaleString() }}</span>
      </div>
      <div class="scale-legend-wrap" [style.background]="gradient"></div>
      <div class="scale-legend-label">
        <span>{{ valueRange[0].toLocaleString() }}</span>
      </div>
    </div>
  `,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".chart-legend{display:inline-block;padding:0;width:auto!important}.chart-legend .scale-legend{text-align:center;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.chart-legend .scale-legend-wrap{display:inline-block;-webkit-box-flex:1;flex:1;width:30px;border-radius:5px;margin:0 auto}.chart-legend .scale-legend-label{font-size:12px}.chart-legend .horizontal-legend.scale-legend{-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}.chart-legend .horizontal-legend .scale-legend-wrap{width:auto;height:30px;margin:0 16px}"]
    })
], ScaleLegendComponent);
export { ScaleLegendComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbGUtbGVnZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9sZWdlbmQvc2NhbGUtbGVnZW5kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsdUJBQXVCLEVBQWlCLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQXdCekQsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7SUFTL0IsWUFBb0IsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUpsQyxlQUFVLEdBQUcsS0FBSyxDQUFDO0lBSWtCLENBQUM7SUFFL0MsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDdEYsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDdkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDLHNCQUFzQixTQUFTLEtBQUssY0FBYyxHQUFHLENBQUMsQ0FBQztJQUNqSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGNBQWMsQ0FBQyxNQUFNLEVBQUUsTUFBTTtRQUMzQixlQUFlO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNmLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNqQixNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7Q0FDRixDQUFBOztZQXZCZ0MsWUFBWTs7QUFSbEM7SUFBUixLQUFLLEVBQUU7d0RBQVk7QUFDWDtJQUFSLEtBQUssRUFBRTtvREFBUTtBQUNQO0lBQVIsS0FBSyxFQUFFO29EQUFRO0FBQ1A7SUFBUixLQUFLLEVBQUU7bURBQU87QUFDTjtJQUFSLEtBQUssRUFBRTt3REFBb0I7QUFMakIsb0JBQW9CO0lBdEJoQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUseUJBQXlCO1FBQ25DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7O0dBZVQ7UUFFRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtRQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7S0FDaEQsQ0FBQztHQUNXLG9CQUFvQixDQWdDaEM7U0FoQ1ksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgU2ltcGxlQ2hhbmdlcywgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC1jaGFydHMtc2NhbGUtbGVnZW5kJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdlxyXG4gICAgICBjbGFzcz1cInNjYWxlLWxlZ2VuZFwiXHJcbiAgICAgIFtjbGFzcy5ob3Jpem9udGFsLWxlZ2VuZF09XCJob3Jpem9udGFsXCJcclxuICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJob3Jpem9udGFsID8gdW5kZWZpbmVkIDogaGVpZ2h0XCJcclxuICAgICAgW3N0eWxlLndpZHRoLnB4XT1cIndpZHRoXCJcclxuICAgID5cclxuICAgICAgPGRpdiBjbGFzcz1cInNjYWxlLWxlZ2VuZC1sYWJlbFwiPlxyXG4gICAgICAgIDxzcGFuPnt7IHZhbHVlUmFuZ2VbMV0udG9Mb2NhbGVTdHJpbmcoKSB9fTwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJzY2FsZS1sZWdlbmQtd3JhcFwiIFtzdHlsZS5iYWNrZ3JvdW5kXT1cImdyYWRpZW50XCI+PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJzY2FsZS1sZWdlbmQtbGFiZWxcIj5cclxuICAgICAgICA8c3Bhbj57eyB2YWx1ZVJhbmdlWzBdLnRvTG9jYWxlU3RyaW5nKCkgfX08L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgYCxcclxuICBzdHlsZVVybHM6IFsnLi9zY2FsZS1sZWdlbmQuY29tcG9uZW50LnNjc3MnXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTY2FsZUxlZ2VuZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgdmFsdWVSYW5nZTtcclxuICBASW5wdXQoKSBjb2xvcnM7XHJcbiAgQElucHV0KCkgaGVpZ2h0O1xyXG4gIEBJbnB1dCgpIHdpZHRoO1xyXG4gIEBJbnB1dCgpIGhvcml6b250YWwgPSBmYWxzZTtcclxuXHJcbiAgZ3JhZGllbnQ6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgY29uc3QgZ3JhZGllbnRWYWx1ZXMgPSB0aGlzLmdyYWRpZW50U3RyaW5nKHRoaXMuY29sb3JzLnJhbmdlKCksIHRoaXMuY29sb3JzLmRvbWFpbigpKTtcclxuICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuaG9yaXpvbnRhbCA/ICdyaWdodCcgOiAnYm90dG9tJztcclxuICAgIHRoaXMuZ3JhZGllbnQgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoYGxpbmVhci1ncmFkaWVudCh0byAke2RpcmVjdGlvbn0sICR7Z3JhZGllbnRWYWx1ZXN9KWApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2VuZXJhdGVzIHRoZSBzdHJpbmcgdXNlZCBpbiB0aGUgZ3JhZGllbnQgc3R5bGVzaGVldCBwcm9wZXJ0aWVzXHJcbiAgICogQHBhcmFtIGNvbG9ycyBhcnJheSBvZiBjb2xvcnNcclxuICAgKiBAcGFyYW0gc3BsaXRzIGFycmF5IG9mIHNwbGl0cyBvbiBhIHNjYWxlIG9mICgwLCAxKVxyXG4gICAqL1xyXG4gIGdyYWRpZW50U3RyaW5nKGNvbG9ycywgc3BsaXRzKTogc3RyaW5nIHtcclxuICAgIC8vIGFkZCB0aGUgMTAwJVxyXG4gICAgc3BsaXRzLnB1c2goMSk7XHJcbiAgICBjb25zdCBwYWlycyA9IFtdO1xyXG4gICAgY29sb3JzLnJldmVyc2UoKS5mb3JFYWNoKChjLCBpKSA9PiB7XHJcbiAgICAgIHBhaXJzLnB1c2goYCR7Y30gJHtNYXRoLnJvdW5kKHNwbGl0c1tpXSAqIDEwMCl9JWApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHBhaXJzLmpvaW4oJywgJyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==