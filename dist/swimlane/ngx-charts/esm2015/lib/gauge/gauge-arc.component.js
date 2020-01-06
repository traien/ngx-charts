import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { formatLabel, escapeLabel } from '../common/label.helper';
let GaugeArcComponent = class GaugeArcComponent {
    constructor() {
        this.isActive = false;
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
    }
    tooltipText(arc) {
        const label = formatLabel(arc.data.name);
        let val;
        if (this.valueFormatting) {
            val = this.valueFormatting(arc.data.value);
        }
        else {
            val = formatLabel(arc.data.value);
        }
        return `
      <span class="tooltip-label">${escapeLabel(label)}</span>
      <span class="tooltip-val">${val}</span>
    `;
    }
};
__decorate([
    Input()
], GaugeArcComponent.prototype, "backgroundArc", void 0);
__decorate([
    Input()
], GaugeArcComponent.prototype, "valueArc", void 0);
__decorate([
    Input()
], GaugeArcComponent.prototype, "cornerRadius", void 0);
__decorate([
    Input()
], GaugeArcComponent.prototype, "colors", void 0);
__decorate([
    Input()
], GaugeArcComponent.prototype, "isActive", void 0);
__decorate([
    Input()
], GaugeArcComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input()
], GaugeArcComponent.prototype, "valueFormatting", void 0);
__decorate([
    Input()
], GaugeArcComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    Input()
], GaugeArcComponent.prototype, "animations", void 0);
__decorate([
    Output()
], GaugeArcComponent.prototype, "select", void 0);
__decorate([
    Output()
], GaugeArcComponent.prototype, "activate", void 0);
__decorate([
    Output()
], GaugeArcComponent.prototype, "deactivate", void 0);
GaugeArcComponent = __decorate([
    Component({
        selector: 'g[ngx-charts-gauge-arc]',
        template: `
    <svg:g
      ngx-charts-pie-arc
      class="background-arc"
      [startAngle]="0"
      [endAngle]="backgroundArc.endAngle"
      [innerRadius]="backgroundArc.innerRadius"
      [outerRadius]="backgroundArc.outerRadius"
      [cornerRadius]="cornerRadius"
      [data]="backgroundArc.data"
      [animate]="false"
      [pointerEvents]="false"
    ></svg:g>
    <svg:g
      ngx-charts-pie-arc
      [startAngle]="0"
      [endAngle]="valueArc.endAngle"
      [innerRadius]="valueArc.innerRadius"
      [outerRadius]="valueArc.outerRadius"
      [cornerRadius]="cornerRadius"
      [fill]="colors.getColor(valueArc.data.name)"
      [data]="valueArc.data"
      [animate]="animations"
      [isActive]="isActive"
      (select)="select.emit($event)"
      (activate)="activate.emit($event)"
      (deactivate)="deactivate.emit($event)"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="'top'"
      [tooltipType]="'tooltip'"
      [tooltipTitle]="tooltipTemplate ? undefined : tooltipText(valueArc)"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipContext]="valueArc.data"
    ></svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], GaugeArcComponent);
export { GaugeArcComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F1Z2UtYXJjLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2dhdWdlL2dhdWdlLWFyYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsdUJBQXVCLEVBQWUsTUFBTSxlQUFlLENBQUM7QUFDN0csT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQTJDbEUsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFBOUI7UUFLVyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBR2pDLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFMUIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFpQjVDLENBQUM7SUFmQyxXQUFXLENBQUMsR0FBRztRQUNiLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLElBQUksR0FBRyxDQUFDO1FBRVIsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hCLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUM7YUFBTTtZQUNMLEdBQUcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQztRQUVELE9BQU87b0NBQ3lCLFdBQVcsQ0FBQyxLQUFLLENBQUM7a0NBQ3BCLEdBQUc7S0FDaEMsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBN0JVO0lBQVIsS0FBSyxFQUFFO3dEQUFvQjtBQUNuQjtJQUFSLEtBQUssRUFBRTttREFBZTtBQUNkO0lBQVIsS0FBSyxFQUFFO3VEQUFtQjtBQUNsQjtJQUFSLEtBQUssRUFBRTtpREFBcUI7QUFDcEI7SUFBUixLQUFLLEVBQUU7bURBQTJCO0FBQzFCO0lBQVIsS0FBSyxFQUFFOzBEQUFrQztBQUNqQztJQUFSLEtBQUssRUFBRTswREFBeUM7QUFDeEM7SUFBUixLQUFLLEVBQUU7MERBQW1DO0FBQ2xDO0lBQVIsS0FBSyxFQUFFO3FEQUE0QjtBQUUxQjtJQUFULE1BQU0sRUFBRTtpREFBNkI7QUFDNUI7SUFBVCxNQUFNLEVBQUU7bURBQStCO0FBQzlCO0lBQVQsTUFBTSxFQUFFO3FEQUFpQztBQWIvQixpQkFBaUI7SUF4QzdCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSx5QkFBeUI7UUFDbkMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DVDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO0tBQ2hELENBQUM7R0FDVyxpQkFBaUIsQ0E4QjdCO1NBOUJZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZm9ybWF0TGFiZWwsIGVzY2FwZUxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsLmhlbHBlcic7XHJcbmltcG9ydCB7IENvbG9ySGVscGVyIH0gZnJvbSAnLi4vY29tbW9uL2NvbG9yLmhlbHBlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1nYXVnZS1hcmNdJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHN2ZzpnXHJcbiAgICAgIG5neC1jaGFydHMtcGllLWFyY1xyXG4gICAgICBjbGFzcz1cImJhY2tncm91bmQtYXJjXCJcclxuICAgICAgW3N0YXJ0QW5nbGVdPVwiMFwiXHJcbiAgICAgIFtlbmRBbmdsZV09XCJiYWNrZ3JvdW5kQXJjLmVuZEFuZ2xlXCJcclxuICAgICAgW2lubmVyUmFkaXVzXT1cImJhY2tncm91bmRBcmMuaW5uZXJSYWRpdXNcIlxyXG4gICAgICBbb3V0ZXJSYWRpdXNdPVwiYmFja2dyb3VuZEFyYy5vdXRlclJhZGl1c1wiXHJcbiAgICAgIFtjb3JuZXJSYWRpdXNdPVwiY29ybmVyUmFkaXVzXCJcclxuICAgICAgW2RhdGFdPVwiYmFja2dyb3VuZEFyYy5kYXRhXCJcclxuICAgICAgW2FuaW1hdGVdPVwiZmFsc2VcIlxyXG4gICAgICBbcG9pbnRlckV2ZW50c109XCJmYWxzZVwiXHJcbiAgICA+PC9zdmc6Zz5cclxuICAgIDxzdmc6Z1xyXG4gICAgICBuZ3gtY2hhcnRzLXBpZS1hcmNcclxuICAgICAgW3N0YXJ0QW5nbGVdPVwiMFwiXHJcbiAgICAgIFtlbmRBbmdsZV09XCJ2YWx1ZUFyYy5lbmRBbmdsZVwiXHJcbiAgICAgIFtpbm5lclJhZGl1c109XCJ2YWx1ZUFyYy5pbm5lclJhZGl1c1wiXHJcbiAgICAgIFtvdXRlclJhZGl1c109XCJ2YWx1ZUFyYy5vdXRlclJhZGl1c1wiXHJcbiAgICAgIFtjb3JuZXJSYWRpdXNdPVwiY29ybmVyUmFkaXVzXCJcclxuICAgICAgW2ZpbGxdPVwiY29sb3JzLmdldENvbG9yKHZhbHVlQXJjLmRhdGEubmFtZSlcIlxyXG4gICAgICBbZGF0YV09XCJ2YWx1ZUFyYy5kYXRhXCJcclxuICAgICAgW2FuaW1hdGVdPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgIFtpc0FjdGl2ZV09XCJpc0FjdGl2ZVwiXHJcbiAgICAgIChzZWxlY3QpPVwic2VsZWN0LmVtaXQoJGV2ZW50KVwiXHJcbiAgICAgIChhY3RpdmF0ZSk9XCJhY3RpdmF0ZS5lbWl0KCRldmVudClcIlxyXG4gICAgICAoZGVhY3RpdmF0ZSk9XCJkZWFjdGl2YXRlLmVtaXQoJGV2ZW50KVwiXHJcbiAgICAgIG5neC10b29sdGlwXHJcbiAgICAgIFt0b29sdGlwRGlzYWJsZWRdPVwidG9vbHRpcERpc2FibGVkXCJcclxuICAgICAgW3Rvb2x0aXBQbGFjZW1lbnRdPVwiJ3RvcCdcIlxyXG4gICAgICBbdG9vbHRpcFR5cGVdPVwiJ3Rvb2x0aXAnXCJcclxuICAgICAgW3Rvb2x0aXBUaXRsZV09XCJ0b29sdGlwVGVtcGxhdGUgPyB1bmRlZmluZWQgOiB0b29sdGlwVGV4dCh2YWx1ZUFyYylcIlxyXG4gICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXHJcbiAgICAgIFt0b29sdGlwQ29udGV4dF09XCJ2YWx1ZUFyYy5kYXRhXCJcclxuICAgID48L3N2ZzpnPlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEdhdWdlQXJjQ29tcG9uZW50IHtcclxuICBASW5wdXQoKSBiYWNrZ3JvdW5kQXJjOiBhbnk7XHJcbiAgQElucHV0KCkgdmFsdWVBcmM6IGFueTtcclxuICBASW5wdXQoKSBjb3JuZXJSYWRpdXM6IGFueTtcclxuICBASW5wdXQoKSBjb2xvcnM6IENvbG9ySGVscGVyO1xyXG4gIEBJbnB1dCgpIGlzQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgdG9vbHRpcERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgdmFsdWVGb3JtYXR0aW5nOiAodmFsdWU6IGFueSkgPT4gc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICBASW5wdXQoKSBhbmltYXRpb25zOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHRvb2x0aXBUZXh0KGFyYyk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBsYWJlbCA9IGZvcm1hdExhYmVsKGFyYy5kYXRhLm5hbWUpO1xyXG4gICAgbGV0IHZhbDtcclxuXHJcbiAgICBpZiAodGhpcy52YWx1ZUZvcm1hdHRpbmcpIHtcclxuICAgICAgdmFsID0gdGhpcy52YWx1ZUZvcm1hdHRpbmcoYXJjLmRhdGEudmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFsID0gZm9ybWF0TGFiZWwoYXJjLmRhdGEudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBgXHJcbiAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC1sYWJlbFwiPiR7ZXNjYXBlTGFiZWwobGFiZWwpfTwvc3Bhbj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLXZhbFwiPiR7dmFsfTwvc3Bhbj5cclxuICAgIGA7XHJcbiAgfVxyXG59XHJcbiJdfQ==