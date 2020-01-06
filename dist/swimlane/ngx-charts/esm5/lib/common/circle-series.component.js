import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { formatLabel, escapeLabel } from '../common/label.helper';
import { id } from '../utils/id';
var CircleSeriesComponent = /** @class */ (function () {
    function CircleSeriesComponent() {
        this.type = 'standard';
        this.tooltipDisabled = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.barVisible = false;
    }
    CircleSeriesComponent.prototype.ngOnInit = function () {
        this.gradientId = 'grad' + id().toString();
        this.gradientFill = "url(#" + this.gradientId + ")";
    };
    CircleSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    CircleSeriesComponent.prototype.update = function () {
        this.circle = this.getActiveCircle();
    };
    CircleSeriesComponent.prototype.getActiveCircle = function () {
        var _this = this;
        var indexActiveDataPoint = this.data.series.findIndex(function (d) {
            var label = d.name;
            return label && _this.visibleValue && label.toString() === _this.visibleValue.toString() && d.value !== undefined;
        });
        if (indexActiveDataPoint === -1) {
            // No valid point is 'active/hovered over' at this moment.
            return undefined;
        }
        return this.mapDataPointToCircle(this.data.series[indexActiveDataPoint], indexActiveDataPoint);
    };
    CircleSeriesComponent.prototype.mapDataPointToCircle = function (d, i) {
        var seriesName = this.data.name;
        var value = d.value;
        var label = d.name;
        var tooltipLabel = formatLabel(label);
        var cx;
        if (this.scaleType === 'time') {
            cx = this.xScale(label);
        }
        else if (this.scaleType === 'linear') {
            cx = this.xScale(Number(label));
        }
        else {
            cx = this.xScale(label);
        }
        var cy = this.yScale(this.type === 'standard' ? value : d.d1);
        var radius = 5;
        var height = this.yScale.range()[0] - cy;
        var opacity = 1;
        var color;
        if (this.colors.scaleType === 'linear') {
            if (this.type === 'standard') {
                color = this.colors.getColor(value);
            }
            else {
                color = this.colors.getColor(d.d1);
            }
        }
        else {
            color = this.colors.getColor(seriesName);
        }
        var data = Object.assign({}, d, {
            series: seriesName,
            value: value,
            name: label
        });
        return {
            classNames: ["circle-data-" + i],
            value: value,
            label: label,
            data: data,
            cx: cx,
            cy: cy,
            radius: radius,
            height: height,
            tooltipLabel: tooltipLabel,
            color: color,
            opacity: opacity,
            seriesName: seriesName,
            gradientStops: this.getGradientStops(color),
            min: d.min,
            max: d.max
        };
    };
    CircleSeriesComponent.prototype.getTooltipText = function (_a) {
        var tooltipLabel = _a.tooltipLabel, value = _a.value, seriesName = _a.seriesName, min = _a.min, max = _a.max;
        return "\n      <span class=\"tooltip-label\">" + escapeLabel(seriesName) + " \u2022 " + escapeLabel(tooltipLabel) + "</span>\n      <span class=\"tooltip-val\">" + value.toLocaleString() + this.getTooltipMinMaxText(min, max) + "</span>\n    ";
    };
    CircleSeriesComponent.prototype.getTooltipMinMaxText = function (min, max) {
        if (min !== undefined || max !== undefined) {
            var result = ' (';
            if (min !== undefined) {
                if (max === undefined) {
                    result += '≥';
                }
                result += min.toLocaleString();
                if (max !== undefined) {
                    result += ' - ';
                }
            }
            else if (max !== undefined) {
                result += '≤';
            }
            if (max !== undefined) {
                result += max.toLocaleString();
            }
            result += ')';
            return result;
        }
        else {
            return '';
        }
    };
    CircleSeriesComponent.prototype.getGradientStops = function (color) {
        return [
            {
                offset: 0,
                color: color,
                opacity: 0.2
            },
            {
                offset: 100,
                color: color,
                opacity: 1
            }
        ];
    };
    CircleSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    CircleSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    CircleSeriesComponent.prototype.activateCircle = function () {
        this.barVisible = true;
        this.activate.emit({ name: this.data.name });
    };
    CircleSeriesComponent.prototype.deactivateCircle = function () {
        this.barVisible = false;
        this.circle.opacity = 0;
        this.deactivate.emit({ name: this.data.name });
    };
    __decorate([
        Input()
    ], CircleSeriesComponent.prototype, "data", void 0);
    __decorate([
        Input()
    ], CircleSeriesComponent.prototype, "type", void 0);
    __decorate([
        Input()
    ], CircleSeriesComponent.prototype, "xScale", void 0);
    __decorate([
        Input()
    ], CircleSeriesComponent.prototype, "yScale", void 0);
    __decorate([
        Input()
    ], CircleSeriesComponent.prototype, "colors", void 0);
    __decorate([
        Input()
    ], CircleSeriesComponent.prototype, "scaleType", void 0);
    __decorate([
        Input()
    ], CircleSeriesComponent.prototype, "visibleValue", void 0);
    __decorate([
        Input()
    ], CircleSeriesComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input()
    ], CircleSeriesComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input()
    ], CircleSeriesComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        Output()
    ], CircleSeriesComponent.prototype, "select", void 0);
    __decorate([
        Output()
    ], CircleSeriesComponent.prototype, "activate", void 0);
    __decorate([
        Output()
    ], CircleSeriesComponent.prototype, "deactivate", void 0);
    CircleSeriesComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-circle-series]',
            template: "\n    <svg:g *ngIf=\"circle\">\n      <defs>\n        <svg:g\n          ngx-charts-svg-linear-gradient\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"circle.gradientStops\"\n        />\n      </defs>\n      <svg:rect\n        *ngIf=\"barVisible && type === 'standard'\"\n        [@animationState]=\"'active'\"\n        [attr.x]=\"circle.cx - circle.radius\"\n        [attr.y]=\"circle.cy\"\n        [attr.width]=\"circle.radius * 2\"\n        [attr.height]=\"circle.height\"\n        [attr.fill]=\"gradientFill\"\n        class=\"tooltip-bar\"\n      />\n      <svg:g\n        ngx-charts-circle\n        class=\"circle\"\n        [cx]=\"circle.cx\"\n        [cy]=\"circle.cy\"\n        [r]=\"circle.radius\"\n        [fill]=\"circle.color\"\n        [class.active]=\"isActive({ name: circle.seriesName })\"\n        [pointerEvents]=\"circle.value === 0 ? 'none' : 'all'\"\n        [data]=\"circle.value\"\n        [classNames]=\"circle.classNames\"\n        (select)=\"onClick(circle.data)\"\n        (activate)=\"activateCircle()\"\n        (deactivate)=\"deactivateCircle()\"\n        ngx-tooltip\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipPlacement]=\"'top'\"\n        [tooltipType]=\"'tooltip'\"\n        [tooltipTitle]=\"tooltipTemplate ? undefined : getTooltipText(circle)\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipContext]=\"circle.data\"\n      />\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':enter', [
                        style({
                            opacity: 0
                        }),
                        animate(250, style({ opacity: 1 }))
                    ])
                ])
            ]
        })
    ], CircleSeriesComponent);
    return CircleSeriesComponent;
}());
export { CircleSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY2xlLXNlcmllcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vY2lyY2xlLXNlcmllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFFTixZQUFZLEVBR1osdUJBQXVCLEVBRXhCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxhQUFhLENBQUM7QUE2RGpDO0lBQUE7UUFFVyxTQUFJLEdBQUcsVUFBVSxDQUFDO1FBT2xCLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBR2hDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBSTFDLGVBQVUsR0FBWSxLQUFLLENBQUM7SUE0SjlCLENBQUM7SUF4SkMsd0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxHQUFHLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBUSxJQUFJLENBQUMsVUFBVSxNQUFHLENBQUM7SUFDakQsQ0FBQztJQUVELDJDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELHNDQUFNLEdBQU47UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFl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QUE5S0QsSUE4S0M7U0E5S1kscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkluaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgdHJpZ2dlciwgc3R5bGUsIGFuaW1hdGUsIHRyYW5zaXRpb24gfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgZm9ybWF0TGFiZWwsIGVzY2FwZUxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsLmhlbHBlcic7XHJcbmltcG9ydCB7IGlkIH0gZnJvbSAnLi4vdXRpbHMvaWQnO1xyXG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gJy4uL2NvbW1vbi9jb2xvci5oZWxwZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtY2lyY2xlLXNlcmllc10nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8c3ZnOmcgKm5nSWY9XCJjaXJjbGVcIj5cclxuICAgICAgPGRlZnM+XHJcbiAgICAgICAgPHN2ZzpnXHJcbiAgICAgICAgICBuZ3gtY2hhcnRzLXN2Zy1saW5lYXItZ3JhZGllbnRcclxuICAgICAgICAgIG9yaWVudGF0aW9uPVwidmVydGljYWxcIlxyXG4gICAgICAgICAgW25hbWVdPVwiZ3JhZGllbnRJZFwiXHJcbiAgICAgICAgICBbc3RvcHNdPVwiY2lyY2xlLmdyYWRpZW50U3RvcHNcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGVmcz5cclxuICAgICAgPHN2ZzpyZWN0XHJcbiAgICAgICAgKm5nSWY9XCJiYXJWaXNpYmxlICYmIHR5cGUgPT09ICdzdGFuZGFyZCdcIlxyXG4gICAgICAgIFtAYW5pbWF0aW9uU3RhdGVdPVwiJ2FjdGl2ZSdcIlxyXG4gICAgICAgIFthdHRyLnhdPVwiY2lyY2xlLmN4IC0gY2lyY2xlLnJhZGl1c1wiXHJcbiAgICAgICAgW2F0dHIueV09XCJjaXJjbGUuY3lcIlxyXG4gICAgICAgIFthdHRyLndpZHRoXT1cImNpcmNsZS5yYWRpdXMgKiAyXCJcclxuICAgICAgICBbYXR0ci5oZWlnaHRdPVwiY2lyY2xlLmhlaWdodFwiXHJcbiAgICAgICAgW2F0dHIuZmlsbF09XCJncmFkaWVudEZpbGxcIlxyXG4gICAgICAgIGNsYXNzPVwidG9vbHRpcC1iYXJcIlxyXG4gICAgICAvPlxyXG4gICAgICA8c3ZnOmdcclxuICAgICAgICBuZ3gtY2hhcnRzLWNpcmNsZVxyXG4gICAgICAgIGNsYXNzPVwiY2lyY2xlXCJcclxuICAgICAgICBbY3hdPVwiY2lyY2xlLmN4XCJcclxuICAgICAgICBbY3ldPVwiY2lyY2xlLmN5XCJcclxuICAgICAgICBbcl09XCJjaXJjbGUucmFkaXVzXCJcclxuICAgICAgICBbZmlsbF09XCJjaXJjbGUuY29sb3JcIlxyXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaXNBY3RpdmUoeyBuYW1lOiBjaXJjbGUuc2VyaWVzTmFtZSB9KVwiXHJcbiAgICAgICAgW3BvaW50ZXJFdmVudHNdPVwiY2lyY2xlLnZhbHVlID09PSAwID8gJ25vbmUnIDogJ2FsbCdcIlxyXG4gICAgICAgIFtkYXRhXT1cImNpcmNsZS52YWx1ZVwiXHJcbiAgICAgICAgW2NsYXNzTmFtZXNdPVwiY2lyY2xlLmNsYXNzTmFtZXNcIlxyXG4gICAgICAgIChzZWxlY3QpPVwib25DbGljayhjaXJjbGUuZGF0YSlcIlxyXG4gICAgICAgIChhY3RpdmF0ZSk9XCJhY3RpdmF0ZUNpcmNsZSgpXCJcclxuICAgICAgICAoZGVhY3RpdmF0ZSk9XCJkZWFjdGl2YXRlQ2lyY2xlKClcIlxyXG4gICAgICAgIG5neC10b29sdGlwXHJcbiAgICAgICAgW3Rvb2x0aXBEaXNhYmxlZF09XCJ0b29sdGlwRGlzYWJsZWRcIlxyXG4gICAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cIid0b3AnXCJcclxuICAgICAgICBbdG9vbHRpcFR5cGVdPVwiJ3Rvb2x0aXAnXCJcclxuICAgICAgICBbdG9vbHRpcFRpdGxlXT1cInRvb2x0aXBUZW1wbGF0ZSA/IHVuZGVmaW5lZCA6IGdldFRvb2x0aXBUZXh0KGNpcmNsZSlcIlxyXG4gICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcclxuICAgICAgICBbdG9vbHRpcENvbnRleHRdPVwiY2lyY2xlLmRhdGFcIlxyXG4gICAgICAvPlxyXG4gICAgPC9zdmc6Zz5cclxuICBgLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIGFuaW1hdGlvbnM6IFtcclxuICAgIHRyaWdnZXIoJ2FuaW1hdGlvblN0YXRlJywgW1xyXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXHJcbiAgICAgICAgc3R5bGUoe1xyXG4gICAgICAgICAgb3BhY2l0eTogMFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGFuaW1hdGUoMjUwLCBzdHlsZSh7IG9wYWNpdHk6IDEgfSkpXHJcbiAgICAgIF0pXHJcbiAgICBdKVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIENpcmNsZVNlcmllc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcclxuICBASW5wdXQoKSBkYXRhO1xyXG4gIEBJbnB1dCgpIHR5cGUgPSAnc3RhbmRhcmQnO1xyXG4gIEBJbnB1dCgpIHhTY2FsZTtcclxuICBASW5wdXQoKSB5U2NhbGU7XHJcbiAgQElucHV0KCkgY29sb3JzOiBDb2xvckhlbHBlcjtcclxuICBASW5wdXQoKSBzY2FsZVR5cGU7XHJcbiAgQElucHV0KCkgdmlzaWJsZVZhbHVlO1xyXG4gIEBJbnB1dCgpIGFjdGl2ZUVudHJpZXM6IGFueVtdO1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGFyZWFQYXRoOiBhbnk7XHJcbiAgY2lyY2xlOiBhbnk7IC8vIGFjdGl2ZSBjaXJjbGVcclxuICBiYXJWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgZ3JhZGllbnRJZDogc3RyaW5nO1xyXG4gIGdyYWRpZW50RmlsbDogc3RyaW5nO1xyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuZ3JhZGllbnRJZCA9ICdncmFkJyArIGlkKCkudG9TdHJpbmcoKTtcclxuICAgIHRoaXMuZ3JhZGllbnRGaWxsID0gYHVybCgjJHt0aGlzLmdyYWRpZW50SWR9KWA7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jaXJjbGUgPSB0aGlzLmdldEFjdGl2ZUNpcmNsZSgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0QWN0aXZlQ2lyY2xlKCk6IHt9IHtcclxuICAgIGNvbnN0IGluZGV4QWN0aXZlRGF0YVBvaW50ID0gdGhpcy5kYXRhLnNlcmllcy5maW5kSW5kZXgoZCA9PiB7XHJcbiAgICAgIGNvbnN0IGxhYmVsID0gZC5uYW1lO1xyXG4gICAgICByZXR1cm4gbGFiZWwgJiYgdGhpcy52aXNpYmxlVmFsdWUgJiYgbGFiZWwudG9TdHJpbmcoKSA9PT0gdGhpcy52aXNpYmxlVmFsdWUudG9TdHJpbmcoKSAmJiBkLnZhbHVlICE9PSB1bmRlZmluZWQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoaW5kZXhBY3RpdmVEYXRhUG9pbnQgPT09IC0xKSB7XHJcbiAgICAgIC8vIE5vIHZhbGlkIHBvaW50IGlzICdhY3RpdmUvaG92ZXJlZCBvdmVyJyBhdCB0aGlzIG1vbWVudC5cclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5tYXBEYXRhUG9pbnRUb0NpcmNsZSh0aGlzLmRhdGEuc2VyaWVzW2luZGV4QWN0aXZlRGF0YVBvaW50XSwgaW5kZXhBY3RpdmVEYXRhUG9pbnQpO1xyXG4gIH1cclxuXHJcbiAgbWFwRGF0YVBvaW50VG9DaXJjbGUoZDogYW55LCBpOiBudW1iZXIpOiBhbnkge1xyXG4gICAgY29uc3Qgc2VyaWVzTmFtZSA9IHRoaXMuZGF0YS5uYW1lO1xyXG5cclxuICAgIGNvbnN0IHZhbHVlID0gZC52YWx1ZTtcclxuICAgIGNvbnN0IGxhYmVsID0gZC5uYW1lO1xyXG4gICAgY29uc3QgdG9vbHRpcExhYmVsID0gZm9ybWF0TGFiZWwobGFiZWwpO1xyXG5cclxuICAgIGxldCBjeDtcclxuICAgIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ3RpbWUnKSB7XHJcbiAgICAgIGN4ID0gdGhpcy54U2NhbGUobGFiZWwpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ2xpbmVhcicpIHtcclxuICAgICAgY3ggPSB0aGlzLnhTY2FsZShOdW1iZXIobGFiZWwpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGN4ID0gdGhpcy54U2NhbGUobGFiZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGN5ID0gdGhpcy55U2NhbGUodGhpcy50eXBlID09PSAnc3RhbmRhcmQnID8gdmFsdWUgOiBkLmQxKTtcclxuICAgIGNvbnN0IHJhZGl1cyA9IDU7XHJcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLnlTY2FsZS5yYW5nZSgpWzBdIC0gY3k7XHJcbiAgICBjb25zdCBvcGFjaXR5ID0gMTtcclxuXHJcbiAgICBsZXQgY29sb3I7XHJcbiAgICBpZiAodGhpcy5jb2xvcnMuc2NhbGVUeXBlID09PSAnbGluZWFyJykge1xyXG4gICAgICBpZiAodGhpcy50eXBlID09PSAnc3RhbmRhcmQnKSB7XHJcbiAgICAgICAgY29sb3IgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcih2YWx1ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29sb3IgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcihkLmQxKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29sb3IgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcihzZXJpZXNOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZCwge1xyXG4gICAgICBzZXJpZXM6IHNlcmllc05hbWUsXHJcbiAgICAgIHZhbHVlLFxyXG4gICAgICBuYW1lOiBsYWJlbFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2xhc3NOYW1lczogW2BjaXJjbGUtZGF0YS0ke2l9YF0sXHJcbiAgICAgIHZhbHVlLFxyXG4gICAgICBsYWJlbCxcclxuICAgICAgZGF0YSxcclxuICAgICAgY3gsXHJcbiAgICAgIGN5LFxyXG4gICAgICByYWRpdXMsXHJcbiAgICAgIGhlaWdodCxcclxuICAgICAgdG9vbHRpcExhYmVsLFxyXG4gICAgICBjb2xvcixcclxuICAgICAgb3BhY2l0eSxcclxuICAgICAgc2VyaWVzTmFtZSxcclxuICAgICAgZ3JhZGllbnRTdG9wczogdGhpcy5nZXRHcmFkaWVudFN0b3BzKGNvbG9yKSxcclxuICAgICAgbWluOiBkLm1pbixcclxuICAgICAgbWF4OiBkLm1heFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGdldFRvb2x0aXBUZXh0KHsgdG9vbHRpcExhYmVsLCB2YWx1ZSwgc2VyaWVzTmFtZSwgbWluLCBtYXggfSk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtbGFiZWxcIj4ke2VzY2FwZUxhYmVsKHNlcmllc05hbWUpfSDigKIgJHtlc2NhcGVMYWJlbCh0b29sdGlwTGFiZWwpfTwvc3Bhbj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLXZhbFwiPiR7dmFsdWUudG9Mb2NhbGVTdHJpbmcoKX0ke3RoaXMuZ2V0VG9vbHRpcE1pbk1heFRleHQobWluLCBtYXgpfTwvc3Bhbj5cclxuICAgIGA7XHJcbiAgfVxyXG5cclxuICBnZXRUb29sdGlwTWluTWF4VGV4dChtaW46IGFueSwgbWF4OiBhbnkpIHtcclxuICAgIGlmIChtaW4gIT09IHVuZGVmaW5lZCB8fCBtYXggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBsZXQgcmVzdWx0ID0gJyAoJztcclxuICAgICAgaWYgKG1pbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKG1heCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICByZXN1bHQgKz0gJ+KJpSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc3VsdCArPSBtaW4udG9Mb2NhbGVTdHJpbmcoKTtcclxuICAgICAgICBpZiAobWF4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHJlc3VsdCArPSAnIC0gJztcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAobWF4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXN1bHQgKz0gJ+KJpCc7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG1heCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmVzdWx0ICs9IG1heC50b0xvY2FsZVN0cmluZygpO1xyXG4gICAgICB9XHJcbiAgICAgIHJlc3VsdCArPSAnKSc7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRHcmFkaWVudFN0b3BzKGNvbG9yKSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICB7XHJcbiAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgIGNvbG9yLFxyXG4gICAgICAgIG9wYWNpdHk6IDAuMlxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgb2Zmc2V0OiAxMDAsXHJcbiAgICAgICAgY29sb3IsXHJcbiAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICB9XHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgb25DbGljayhkYXRhKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdC5lbWl0KGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgaXNBY3RpdmUoZW50cnkpOiBib29sZWFuIHtcclxuICAgIGlmICghdGhpcy5hY3RpdmVFbnRyaWVzKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBpdGVtID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbmQoZCA9PiB7XHJcbiAgICAgIHJldHVybiBlbnRyeS5uYW1lID09PSBkLm5hbWU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpdGVtICE9PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBhY3RpdmF0ZUNpcmNsZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuYmFyVmlzaWJsZSA9IHRydWU7XHJcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQoeyBuYW1lOiB0aGlzLmRhdGEubmFtZSB9KTtcclxuICB9XHJcblxyXG4gIGRlYWN0aXZhdGVDaXJjbGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLmJhclZpc2libGUgPSBmYWxzZTtcclxuICAgIHRoaXMuY2lyY2xlLm9wYWNpdHkgPSAwO1xyXG4gICAgdGhpcy5kZWFjdGl2YXRlLmVtaXQoeyBuYW1lOiB0aGlzLmRhdGEubmFtZSB9KTtcclxuICB9XHJcbn1cclxuIl19