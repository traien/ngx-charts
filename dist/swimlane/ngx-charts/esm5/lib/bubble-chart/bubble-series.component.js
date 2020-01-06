import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { formatLabel, escapeLabel } from '../common/label.helper';
var BubbleSeriesComponent = /** @class */ (function () {
    function BubbleSeriesComponent() {
        this.tooltipDisabled = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
    }
    BubbleSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    BubbleSeriesComponent.prototype.update = function () {
        this.circles = this.getCircles();
    };
    BubbleSeriesComponent.prototype.getCircles = function () {
        var _this = this;
        var seriesName = this.data.name;
        return this.data.series
            .map(function (d, i) {
            if (typeof d.y !== 'undefined' && typeof d.x !== 'undefined') {
                var y = d.y;
                var x = d.x;
                var r = d.r;
                var radius = _this.rScale(r || 1);
                var tooltipLabel = formatLabel(d.name);
                var cx = _this.xScaleType === 'linear' ? _this.xScale(Number(x)) : _this.xScale(x);
                var cy = _this.yScaleType === 'linear' ? _this.yScale(Number(y)) : _this.yScale(y);
                var color = _this.colors.scaleType === 'linear' ? _this.colors.getColor(r) : _this.colors.getColor(seriesName);
                var isActive = !_this.activeEntries.length ? true : _this.isActive({ name: seriesName });
                var opacity = isActive ? 1 : 0.3;
                var data = Object.assign({}, d, {
                    series: seriesName,
                    name: d.name,
                    value: d.y,
                    x: d.x,
                    radius: d.r
                });
                return {
                    data: data,
                    x: x,
                    y: y,
                    r: r,
                    classNames: ["circle-data-" + i],
                    value: y,
                    label: x,
                    cx: cx,
                    cy: cy,
                    radius: radius,
                    tooltipLabel: tooltipLabel,
                    color: color,
                    opacity: opacity,
                    seriesName: seriesName,
                    isActive: isActive,
                    transform: "translate(" + cx + "," + cy + ")"
                };
            }
        })
            .filter(function (circle) { return circle !== undefined; });
    };
    BubbleSeriesComponent.prototype.getTooltipText = function (circle) {
        var hasRadius = typeof circle.r !== 'undefined';
        var hasTooltipLabel = circle.tooltipLabel && circle.tooltipLabel.length;
        var hasSeriesName = circle.seriesName && circle.seriesName.length;
        var radiusValue = hasRadius ? formatLabel(circle.r) : '';
        var xAxisLabel = this.xAxisLabel && this.xAxisLabel !== '' ? this.xAxisLabel + ":" : '';
        var yAxisLabel = this.yAxisLabel && this.yAxisLabel !== '' ? this.yAxisLabel + ":" : '';
        var x = formatLabel(circle.x);
        var y = formatLabel(circle.y);
        var name = hasSeriesName && hasTooltipLabel
            ? circle.seriesName + " \u2022 " + circle.tooltipLabel
            : circle.seriesName + circle.tooltipLabel;
        var tooltipTitle = hasSeriesName || hasTooltipLabel ? "<span class=\"tooltip-label\">" + escapeLabel(name) + "</span>" : '';
        return "\n      " + tooltipTitle + "\n      <span class=\"tooltip-label\">\n        <label>" + escapeLabel(xAxisLabel) + "</label> " + escapeLabel(x) + "<br />\n        <label>" + escapeLabel(yAxisLabel) + "</label> " + escapeLabel(y) + "\n      </span>\n      <span class=\"tooltip-val\">\n        " + escapeLabel(radiusValue) + "\n      </span>\n    ";
    };
    BubbleSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    BubbleSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    BubbleSeriesComponent.prototype.isVisible = function (circle) {
        if (this.activeEntries.length > 0) {
            return this.isActive({ name: circle.seriesName });
        }
        return circle.opacity !== 0;
    };
    BubbleSeriesComponent.prototype.activateCircle = function (circle) {
        circle.barVisible = true;
        this.activate.emit({ name: this.data.name });
    };
    BubbleSeriesComponent.prototype.deactivateCircle = function (circle) {
        circle.barVisible = false;
        this.deactivate.emit({ name: this.data.name });
    };
    BubbleSeriesComponent.prototype.trackBy = function (index, circle) {
        return circle.data.series + " " + circle.data.name;
    };
    __decorate([
        Input()
    ], BubbleSeriesComponent.prototype, "data", void 0);
    __decorate([
        Input()
    ], BubbleSeriesComponent.prototype, "xScale", void 0);
    __decorate([
        Input()
    ], BubbleSeriesComponent.prototype, "yScale", void 0);
    __decorate([
        Input()
    ], BubbleSeriesComponent.prototype, "rScale", void 0);
    __decorate([
        Input()
    ], BubbleSeriesComponent.prototype, "xScaleType", void 0);
    __decorate([
        Input()
    ], BubbleSeriesComponent.prototype, "yScaleType", void 0);
    __decorate([
        Input()
    ], BubbleSeriesComponent.prototype, "colors", void 0);
    __decorate([
        Input()
    ], BubbleSeriesComponent.prototype, "visibleValue", void 0);
    __decorate([
        Input()
    ], BubbleSeriesComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input()
    ], BubbleSeriesComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        Input()
    ], BubbleSeriesComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        Input()
    ], BubbleSeriesComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input()
    ], BubbleSeriesComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        Output()
    ], BubbleSeriesComponent.prototype, "select", void 0);
    __decorate([
        Output()
    ], BubbleSeriesComponent.prototype, "activate", void 0);
    __decorate([
        Output()
    ], BubbleSeriesComponent.prototype, "deactivate", void 0);
    BubbleSeriesComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-bubble-series]',
            template: "\n    <svg:g *ngFor=\"let circle of circles; trackBy: trackBy\">\n      <svg:g [attr.transform]=\"circle.transform\">\n        <svg:g\n          ngx-charts-circle\n          [@animationState]=\"'active'\"\n          class=\"circle\"\n          [cx]=\"0\"\n          [cy]=\"0\"\n          [r]=\"circle.radius\"\n          [fill]=\"circle.color\"\n          [style.opacity]=\"circle.opacity\"\n          [class.active]=\"circle.isActive\"\n          [pointerEvents]=\"'all'\"\n          [data]=\"circle.value\"\n          [classNames]=\"circle.classNames\"\n          (select)=\"onClick(circle.data)\"\n          (activate)=\"activateCircle(circle)\"\n          (deactivate)=\"deactivateCircle(circle)\"\n          ngx-tooltip\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipPlacement]=\"'top'\"\n          [tooltipType]=\"'tooltip'\"\n          [tooltipTitle]=\"tooltipTemplate ? undefined : getTooltipText(circle)\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [tooltipContext]=\"circle.data\"\n        />\n      </svg:g>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':enter', [
                        style({
                            opacity: 0,
                            transform: 'scale(0)'
                        }),
                        animate(250, style({ opacity: 1, transform: 'scale(1)' }))
                    ])
                ])
            ]
        })
    ], BubbleSeriesComponent);
    return BubbleSeriesComponent;
}());
export { BubbleSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnViYmxlLXNlcmllcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9idWJibGUtY2hhcnQvYnViYmxlLXNlcmllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFFTixZQUFZLEVBRVosdUJBQXVCLEVBRXhCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBK0NsRTtJQUFBO1FBWVcsb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFHaEMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUErSDVDLENBQUM7SUExSEMsMkNBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsc0NBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCwwQ0FBVSxHQUFWO1FBQUEsaUJBa0RDO1FBakRDLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRWxDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO2FBQ3BCLEdBQUcsQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDO1lBQ1IsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENB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Q0FBQyxDQUFDO3FCQUMzRCxDQUFDO2lCQUNILENBQUM7YUFDSDtTQUNGLENBQUM7T0FDVyxxQkFBcUIsQ0FnSmpDO0lBQUQsNEJBQUM7Q0FBQSxBQWhKRCxJQWdKQztTQWhKWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIFRlbXBsYXRlUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IHRyaWdnZXIsIHN0eWxlLCBhbmltYXRlLCB0cmFuc2l0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IGZvcm1hdExhYmVsLCBlc2NhcGVMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbC5oZWxwZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtYnViYmxlLXNlcmllc10nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8c3ZnOmcgKm5nRm9yPVwibGV0IGNpcmNsZSBvZiBjaXJjbGVzOyB0cmFja0J5OiB0cmFja0J5XCI+XHJcbiAgICAgIDxzdmc6ZyBbYXR0ci50cmFuc2Zvcm1dPVwiY2lyY2xlLnRyYW5zZm9ybVwiPlxyXG4gICAgICAgIDxzdmc6Z1xyXG4gICAgICAgICAgbmd4LWNoYXJ0cy1jaXJjbGVcclxuICAgICAgICAgIFtAYW5pbWF0aW9uU3RhdGVdPVwiJ2FjdGl2ZSdcIlxyXG4gICAgICAgICAgY2xhc3M9XCJjaXJjbGVcIlxyXG4gICAgICAgICAgW2N4XT1cIjBcIlxyXG4gICAgICAgICAgW2N5XT1cIjBcIlxyXG4gICAgICAgICAgW3JdPVwiY2lyY2xlLnJhZGl1c1wiXHJcbiAgICAgICAgICBbZmlsbF09XCJjaXJjbGUuY29sb3JcIlxyXG4gICAgICAgICAgW3N0eWxlLm9wYWNpdHldPVwiY2lyY2xlLm9wYWNpdHlcIlxyXG4gICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJjaXJjbGUuaXNBY3RpdmVcIlxyXG4gICAgICAgICAgW3BvaW50ZXJFdmVudHNdPVwiJ2FsbCdcIlxyXG4gICAgICAgICAgW2RhdGFdPVwiY2lyY2xlLnZhbHVlXCJcclxuICAgICAgICAgIFtjbGFzc05hbWVzXT1cImNpcmNsZS5jbGFzc05hbWVzXCJcclxuICAgICAgICAgIChzZWxlY3QpPVwib25DbGljayhjaXJjbGUuZGF0YSlcIlxyXG4gICAgICAgICAgKGFjdGl2YXRlKT1cImFjdGl2YXRlQ2lyY2xlKGNpcmNsZSlcIlxyXG4gICAgICAgICAgKGRlYWN0aXZhdGUpPVwiZGVhY3RpdmF0ZUNpcmNsZShjaXJjbGUpXCJcclxuICAgICAgICAgIG5neC10b29sdGlwXHJcbiAgICAgICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXHJcbiAgICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCIndG9wJ1wiXHJcbiAgICAgICAgICBbdG9vbHRpcFR5cGVdPVwiJ3Rvb2x0aXAnXCJcclxuICAgICAgICAgIFt0b29sdGlwVGl0bGVdPVwidG9vbHRpcFRlbXBsYXRlID8gdW5kZWZpbmVkIDogZ2V0VG9vbHRpcFRleHQoY2lyY2xlKVwiXHJcbiAgICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXHJcbiAgICAgICAgICBbdG9vbHRpcENvbnRleHRdPVwiY2lyY2xlLmRhdGFcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvc3ZnOmc+XHJcbiAgICA8L3N2ZzpnPlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgYW5pbWF0aW9uczogW1xyXG4gICAgdHJpZ2dlcignYW5pbWF0aW9uU3RhdGUnLCBbXHJcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcclxuICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMCknXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgYW5pbWF0ZSgyNTAsIHN0eWxlKHsgb3BhY2l0eTogMSwgdHJhbnNmb3JtOiAnc2NhbGUoMSknIH0pKVxyXG4gICAgICBdKVxyXG4gICAgXSlcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCdWJibGVTZXJpZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIGRhdGE7XHJcbiAgQElucHV0KCkgeFNjYWxlO1xyXG4gIEBJbnB1dCgpIHlTY2FsZTtcclxuICBASW5wdXQoKSByU2NhbGU7XHJcbiAgQElucHV0KCkgeFNjYWxlVHlwZTtcclxuICBASW5wdXQoKSB5U2NhbGVUeXBlO1xyXG4gIEBJbnB1dCgpIGNvbG9ycztcclxuICBASW5wdXQoKSB2aXNpYmxlVmFsdWU7XHJcbiAgQElucHV0KCkgYWN0aXZlRW50cmllczogYW55W107XHJcbiAgQElucHV0KCkgeEF4aXNMYWJlbDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHlBeGlzTGFiZWw6IHN0cmluZztcclxuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBhcmVhUGF0aDogYW55O1xyXG4gIGNpcmNsZXM6IGFueVtdO1xyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jaXJjbGVzID0gdGhpcy5nZXRDaXJjbGVzKCk7XHJcbiAgfVxyXG5cclxuICBnZXRDaXJjbGVzKCk6IGFueVtdIHtcclxuICAgIGNvbnN0IHNlcmllc05hbWUgPSB0aGlzLmRhdGEubmFtZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5kYXRhLnNlcmllc1xyXG4gICAgICAubWFwKChkLCBpKSA9PiB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkLnkgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkLnggIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICBjb25zdCB5ID0gZC55O1xyXG4gICAgICAgICAgY29uc3QgeCA9IGQueDtcclxuICAgICAgICAgIGNvbnN0IHIgPSBkLnI7XHJcblxyXG4gICAgICAgICAgY29uc3QgcmFkaXVzID0gdGhpcy5yU2NhbGUociB8fCAxKTtcclxuICAgICAgICAgIGNvbnN0IHRvb2x0aXBMYWJlbCA9IGZvcm1hdExhYmVsKGQubmFtZSk7XHJcblxyXG4gICAgICAgICAgY29uc3QgY3ggPSB0aGlzLnhTY2FsZVR5cGUgPT09ICdsaW5lYXInID8gdGhpcy54U2NhbGUoTnVtYmVyKHgpKSA6IHRoaXMueFNjYWxlKHgpO1xyXG4gICAgICAgICAgY29uc3QgY3kgPSB0aGlzLnlTY2FsZVR5cGUgPT09ICdsaW5lYXInID8gdGhpcy55U2NhbGUoTnVtYmVyKHkpKSA6IHRoaXMueVNjYWxlKHkpO1xyXG5cclxuICAgICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jb2xvcnMuc2NhbGVUeXBlID09PSAnbGluZWFyJyA/IHRoaXMuY29sb3JzLmdldENvbG9yKHIpIDogdGhpcy5jb2xvcnMuZ2V0Q29sb3Ioc2VyaWVzTmFtZSk7XHJcblxyXG4gICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSAhdGhpcy5hY3RpdmVFbnRyaWVzLmxlbmd0aCA/IHRydWUgOiB0aGlzLmlzQWN0aXZlKHsgbmFtZTogc2VyaWVzTmFtZSB9KTtcclxuICAgICAgICAgIGNvbnN0IG9wYWNpdHkgPSBpc0FjdGl2ZSA/IDEgOiAwLjM7XHJcblxyXG4gICAgICAgICAgY29uc3QgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGQsIHtcclxuICAgICAgICAgICAgc2VyaWVzOiBzZXJpZXNOYW1lLFxyXG4gICAgICAgICAgICBuYW1lOiBkLm5hbWUsXHJcbiAgICAgICAgICAgIHZhbHVlOiBkLnksXHJcbiAgICAgICAgICAgIHg6IGQueCxcclxuICAgICAgICAgICAgcmFkaXVzOiBkLnJcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRhdGEsXHJcbiAgICAgICAgICAgIHgsXHJcbiAgICAgICAgICAgIHksXHJcbiAgICAgICAgICAgIHIsXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZXM6IFtgY2lyY2xlLWRhdGEtJHtpfWBdLFxyXG4gICAgICAgICAgICB2YWx1ZTogeSxcclxuICAgICAgICAgICAgbGFiZWw6IHgsXHJcbiAgICAgICAgICAgIGN4LFxyXG4gICAgICAgICAgICBjeSxcclxuICAgICAgICAgICAgcmFkaXVzLFxyXG4gICAgICAgICAgICB0b29sdGlwTGFiZWwsXHJcbiAgICAgICAgICAgIGNvbG9yLFxyXG4gICAgICAgICAgICBvcGFjaXR5LFxyXG4gICAgICAgICAgICBzZXJpZXNOYW1lLFxyXG4gICAgICAgICAgICBpc0FjdGl2ZSxcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7Y3h9LCR7Y3l9KWBcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuZmlsdGVyKGNpcmNsZSA9PiBjaXJjbGUgIT09IHVuZGVmaW5lZCk7XHJcbiAgfVxyXG5cclxuICBnZXRUb29sdGlwVGV4dChjaXJjbGUpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgaGFzUmFkaXVzID0gdHlwZW9mIGNpcmNsZS5yICE9PSAndW5kZWZpbmVkJztcclxuICAgIGNvbnN0IGhhc1Rvb2x0aXBMYWJlbCA9IGNpcmNsZS50b29sdGlwTGFiZWwgJiYgY2lyY2xlLnRvb2x0aXBMYWJlbC5sZW5ndGg7XHJcbiAgICBjb25zdCBoYXNTZXJpZXNOYW1lID0gY2lyY2xlLnNlcmllc05hbWUgJiYgY2lyY2xlLnNlcmllc05hbWUubGVuZ3RoO1xyXG5cclxuICAgIGNvbnN0IHJhZGl1c1ZhbHVlID0gaGFzUmFkaXVzID8gZm9ybWF0TGFiZWwoY2lyY2xlLnIpIDogJyc7XHJcbiAgICBjb25zdCB4QXhpc0xhYmVsID0gdGhpcy54QXhpc0xhYmVsICYmIHRoaXMueEF4aXNMYWJlbCAhPT0gJycgPyBgJHt0aGlzLnhBeGlzTGFiZWx9OmAgOiAnJztcclxuICAgIGNvbnN0IHlBeGlzTGFiZWwgPSB0aGlzLnlBeGlzTGFiZWwgJiYgdGhpcy55QXhpc0xhYmVsICE9PSAnJyA/IGAke3RoaXMueUF4aXNMYWJlbH06YCA6ICcnO1xyXG4gICAgY29uc3QgeCA9IGZvcm1hdExhYmVsKGNpcmNsZS54KTtcclxuICAgIGNvbnN0IHkgPSBmb3JtYXRMYWJlbChjaXJjbGUueSk7XHJcbiAgICBjb25zdCBuYW1lID1cclxuICAgICAgaGFzU2VyaWVzTmFtZSAmJiBoYXNUb29sdGlwTGFiZWxcclxuICAgICAgICA/IGAke2NpcmNsZS5zZXJpZXNOYW1lfSDigKIgJHtjaXJjbGUudG9vbHRpcExhYmVsfWBcclxuICAgICAgICA6IGNpcmNsZS5zZXJpZXNOYW1lICsgY2lyY2xlLnRvb2x0aXBMYWJlbDtcclxuICAgIGNvbnN0IHRvb2x0aXBUaXRsZSA9XHJcbiAgICAgIGhhc1Nlcmllc05hbWUgfHwgaGFzVG9vbHRpcExhYmVsID8gYDxzcGFuIGNsYXNzPVwidG9vbHRpcC1sYWJlbFwiPiR7ZXNjYXBlTGFiZWwobmFtZSl9PC9zcGFuPmAgOiAnJztcclxuXHJcbiAgICByZXR1cm4gYFxyXG4gICAgICAke3Rvb2x0aXBUaXRsZX1cclxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLWxhYmVsXCI+XHJcbiAgICAgICAgPGxhYmVsPiR7ZXNjYXBlTGFiZWwoeEF4aXNMYWJlbCl9PC9sYWJlbD4gJHtlc2NhcGVMYWJlbCh4KX08YnIgLz5cclxuICAgICAgICA8bGFiZWw+JHtlc2NhcGVMYWJlbCh5QXhpc0xhYmVsKX08L2xhYmVsPiAke2VzY2FwZUxhYmVsKHkpfVxyXG4gICAgICA8L3NwYW4+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC12YWxcIj5cclxuICAgICAgICAke2VzY2FwZUxhYmVsKHJhZGl1c1ZhbHVlKX1cclxuICAgICAgPC9zcGFuPlxyXG4gICAgYDtcclxuICB9XHJcblxyXG4gIG9uQ2xpY2soZGF0YSk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3QuZW1pdChkYXRhKTtcclxuICB9XHJcblxyXG4gIGlzQWN0aXZlKGVudHJ5KTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIXRoaXMuYWN0aXZlRW50cmllcykgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3QgaXRlbSA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kKGQgPT4ge1xyXG4gICAgICByZXR1cm4gZW50cnkubmFtZSA9PT0gZC5uYW1lO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaXRlbSAhPT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgaXNWaXNpYmxlKGNpcmNsZSk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlRW50cmllcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmlzQWN0aXZlKHsgbmFtZTogY2lyY2xlLnNlcmllc05hbWUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNpcmNsZS5vcGFjaXR5ICE9PSAwO1xyXG4gIH1cclxuXHJcbiAgYWN0aXZhdGVDaXJjbGUoY2lyY2xlKTogdm9pZCB7XHJcbiAgICBjaXJjbGUuYmFyVmlzaWJsZSA9IHRydWU7XHJcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQoeyBuYW1lOiB0aGlzLmRhdGEubmFtZSB9KTtcclxuICB9XHJcblxyXG4gIGRlYWN0aXZhdGVDaXJjbGUoY2lyY2xlKTogdm9pZCB7XHJcbiAgICBjaXJjbGUuYmFyVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5kZWFjdGl2YXRlLmVtaXQoeyBuYW1lOiB0aGlzLmRhdGEubmFtZSB9KTtcclxuICB9XHJcblxyXG4gIHRyYWNrQnkoaW5kZXgsIGNpcmNsZSk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYCR7Y2lyY2xlLmRhdGEuc2VyaWVzfSAke2NpcmNsZS5kYXRhLm5hbWV9YDtcclxuICB9XHJcbn1cclxuIl19