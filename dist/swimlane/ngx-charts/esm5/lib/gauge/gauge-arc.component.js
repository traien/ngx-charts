import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { formatLabel, escapeLabel } from '../common/label.helper';
var GaugeArcComponent = /** @class */ (function () {
    function GaugeArcComponent() {
        this.isActive = false;
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
    }
    GaugeArcComponent.prototype.tooltipText = function (arc) {
        var label = formatLabel(arc.data.name);
        var val;
        if (this.valueFormatting) {
            val = this.valueFormatting(arc.data.value);
        }
        else {
            val = formatLabel(arc.data.value);
        }
        return "\n      <span class=\"tooltip-label\">" + escapeLabel(label) + "</span>\n      <span class=\"tooltip-val\">" + val + "</span>\n    ";
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
            template: "\n    <svg:g\n      ngx-charts-pie-arc\n      class=\"background-arc\"\n      [startAngle]=\"0\"\n      [endAngle]=\"backgroundArc.endAngle\"\n      [innerRadius]=\"backgroundArc.innerRadius\"\n      [outerRadius]=\"backgroundArc.outerRadius\"\n      [cornerRadius]=\"cornerRadius\"\n      [data]=\"backgroundArc.data\"\n      [animate]=\"false\"\n      [pointerEvents]=\"false\"\n    ></svg:g>\n    <svg:g\n      ngx-charts-pie-arc\n      [startAngle]=\"0\"\n      [endAngle]=\"valueArc.endAngle\"\n      [innerRadius]=\"valueArc.innerRadius\"\n      [outerRadius]=\"valueArc.outerRadius\"\n      [cornerRadius]=\"cornerRadius\"\n      [fill]=\"colors.getColor(valueArc.data.name)\"\n      [data]=\"valueArc.data\"\n      [animate]=\"animations\"\n      [isActive]=\"isActive\"\n      (select)=\"select.emit($event)\"\n      (activate)=\"activate.emit($event)\"\n      (deactivate)=\"deactivate.emit($event)\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"'top'\"\n      [tooltipType]=\"'tooltip'\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : tooltipText(valueArc)\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"valueArc.data\"\n    ></svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], GaugeArcComponent);
    return GaugeArcComponent;
}());
export { GaugeArcComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F1Z2UtYXJjLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2dhdWdlL2dhdWdlLWFyYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsdUJBQXVCLEVBQWUsTUFBTSxlQUFlLENBQUM7QUFDN0csT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQTJDbEU7SUFBQTtRQUtXLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFHakMsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUxQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1QixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQWlCNUMsQ0FBQztJQWZDLHVDQUFXLEdBQVgsVUFBWSxHQUFHO1FBQ2IsSUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsSUFBSSxHQUFHLENBQUM7UUFFUixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsR0FBRyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM1QzthQUFNO1lBQ0wsR0FBRyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25DO1FBRUQsT0FBTywyQ0FDeUIsV0FBVyxDQUFDLEtBQUssQ0FBQyxtREFDcEIsR0FBRyxrQkFDaEMsQ0FBQztJQUNKLENBQUM7SUE1QlE7UUFBUixLQUFLLEVBQUU7NERBQW9CO0lBQ25CO1FBQVIsS0FBSyxFQUFFO3VEQUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7MkRBQW1CO0lBQ2xCO1FBQVIsS0FBSyxFQUFFO3FEQUFxQjtJQUNwQjtRQUFSLEtBQUssRUFBRTt1REFBMkI7SUFDMUI7UUFBUixLQUFLLEVBQUU7OERBQWtDO0lBQ2pDO1FBQVIsS0FBSyxFQUFFOzhEQUF5QztJQUN4QztRQUFSLEtBQUssRUFBRTs4REFBbUM7SUFDbEM7UUFBUixLQUFLLEVBQUU7eURBQTRCO0lBRTFCO1FBQVQsTUFBTSxFQUFFO3FEQUE2QjtJQUM1QjtRQUFULE1BQU0sRUFBRTt1REFBK0I7SUFDOUI7UUFBVCxNQUFNLEVBQUU7eURBQWlDO0lBYi9CLGlCQUFpQjtRQXhDN0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHlCQUF5QjtZQUNuQyxRQUFRLEVBQUUsK3NDQW1DVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FDVyxpQkFBaUIsQ0E4QjdCO0lBQUQsd0JBQUM7Q0FBQSxBQTlCRCxJQThCQztTQTlCWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGZvcm1hdExhYmVsLCBlc2NhcGVMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbC5oZWxwZXInO1xyXG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gJy4uL2NvbW1vbi9jb2xvci5oZWxwZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtZ2F1Z2UtYXJjXScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxzdmc6Z1xyXG4gICAgICBuZ3gtY2hhcnRzLXBpZS1hcmNcclxuICAgICAgY2xhc3M9XCJiYWNrZ3JvdW5kLWFyY1wiXHJcbiAgICAgIFtzdGFydEFuZ2xlXT1cIjBcIlxyXG4gICAgICBbZW5kQW5nbGVdPVwiYmFja2dyb3VuZEFyYy5lbmRBbmdsZVwiXHJcbiAgICAgIFtpbm5lclJhZGl1c109XCJiYWNrZ3JvdW5kQXJjLmlubmVyUmFkaXVzXCJcclxuICAgICAgW291dGVyUmFkaXVzXT1cImJhY2tncm91bmRBcmMub3V0ZXJSYWRpdXNcIlxyXG4gICAgICBbY29ybmVyUmFkaXVzXT1cImNvcm5lclJhZGl1c1wiXHJcbiAgICAgIFtkYXRhXT1cImJhY2tncm91bmRBcmMuZGF0YVwiXHJcbiAgICAgIFthbmltYXRlXT1cImZhbHNlXCJcclxuICAgICAgW3BvaW50ZXJFdmVudHNdPVwiZmFsc2VcIlxyXG4gICAgPjwvc3ZnOmc+XHJcbiAgICA8c3ZnOmdcclxuICAgICAgbmd4LWNoYXJ0cy1waWUtYXJjXHJcbiAgICAgIFtzdGFydEFuZ2xlXT1cIjBcIlxyXG4gICAgICBbZW5kQW5nbGVdPVwidmFsdWVBcmMuZW5kQW5nbGVcIlxyXG4gICAgICBbaW5uZXJSYWRpdXNdPVwidmFsdWVBcmMuaW5uZXJSYWRpdXNcIlxyXG4gICAgICBbb3V0ZXJSYWRpdXNdPVwidmFsdWVBcmMub3V0ZXJSYWRpdXNcIlxyXG4gICAgICBbY29ybmVyUmFkaXVzXT1cImNvcm5lclJhZGl1c1wiXHJcbiAgICAgIFtmaWxsXT1cImNvbG9ycy5nZXRDb2xvcih2YWx1ZUFyYy5kYXRhLm5hbWUpXCJcclxuICAgICAgW2RhdGFdPVwidmFsdWVBcmMuZGF0YVwiXHJcbiAgICAgIFthbmltYXRlXT1cImFuaW1hdGlvbnNcIlxyXG4gICAgICBbaXNBY3RpdmVdPVwiaXNBY3RpdmVcIlxyXG4gICAgICAoc2VsZWN0KT1cInNlbGVjdC5lbWl0KCRldmVudClcIlxyXG4gICAgICAoYWN0aXZhdGUpPVwiYWN0aXZhdGUuZW1pdCgkZXZlbnQpXCJcclxuICAgICAgKGRlYWN0aXZhdGUpPVwiZGVhY3RpdmF0ZS5lbWl0KCRldmVudClcIlxyXG4gICAgICBuZ3gtdG9vbHRpcFxyXG4gICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXHJcbiAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cIid0b3AnXCJcclxuICAgICAgW3Rvb2x0aXBUeXBlXT1cIid0b29sdGlwJ1wiXHJcbiAgICAgIFt0b29sdGlwVGl0bGVdPVwidG9vbHRpcFRlbXBsYXRlID8gdW5kZWZpbmVkIDogdG9vbHRpcFRleHQodmFsdWVBcmMpXCJcclxuICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxyXG4gICAgICBbdG9vbHRpcENvbnRleHRdPVwidmFsdWVBcmMuZGF0YVwiXHJcbiAgICA+PC9zdmc6Zz5cclxuICBgLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYXVnZUFyY0NvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgYmFja2dyb3VuZEFyYzogYW55O1xyXG4gIEBJbnB1dCgpIHZhbHVlQXJjOiBhbnk7XHJcbiAgQElucHV0KCkgY29ybmVyUmFkaXVzOiBhbnk7XHJcbiAgQElucHV0KCkgY29sb3JzOiBDb2xvckhlbHBlcjtcclxuICBASW5wdXQoKSBpc0FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHZhbHVlRm9ybWF0dGluZzogKHZhbHVlOiBhbnkpID0+IHN0cmluZztcclxuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgQElucHV0KCkgYW5pbWF0aW9uczogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICB0b29sdGlwVGV4dChhcmMpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgbGFiZWwgPSBmb3JtYXRMYWJlbChhcmMuZGF0YS5uYW1lKTtcclxuICAgIGxldCB2YWw7XHJcblxyXG4gICAgaWYgKHRoaXMudmFsdWVGb3JtYXR0aW5nKSB7XHJcbiAgICAgIHZhbCA9IHRoaXMudmFsdWVGb3JtYXR0aW5nKGFyYy5kYXRhLnZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhbCA9IGZvcm1hdExhYmVsKGFyYy5kYXRhLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYFxyXG4gICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtbGFiZWxcIj4ke2VzY2FwZUxhYmVsKGxhYmVsKX08L3NwYW4+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC12YWxcIj4ke3ZhbH08L3NwYW4+XHJcbiAgICBgO1xyXG4gIH1cclxufVxyXG4iXX0=