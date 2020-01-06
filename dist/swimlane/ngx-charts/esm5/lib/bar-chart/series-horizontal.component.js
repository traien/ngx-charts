import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { formatLabel, escapeLabel } from '../common/label.helper';
import { D0Types } from './series-vertical.component';
var SeriesHorizontal = /** @class */ (function () {
    function SeriesHorizontal() {
        this.barsForDataLabels = [];
        this.type = 'standard';
        this.tooltipDisabled = false;
        this.animations = true;
        this.showDataLabel = false;
        this.noBarWhenZero = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.dataLabelWidthChanged = new EventEmitter();
    }
    SeriesHorizontal.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    SeriesHorizontal.prototype.update = function () {
        var _a;
        var _this = this;
        this.updateTooltipSettings();
        var d0 = (_a = {},
            _a[D0Types.positive] = 0,
            _a[D0Types.negative] = 0,
            _a);
        var d0Type;
        d0Type = D0Types.positive;
        var total;
        if (this.type === 'normalized') {
            total = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return sum + d; }, 0);
        }
        var xScaleMin = Math.max(this.xScale.domain()[0], 0);
        this.bars = this.series.map(function (d, index) {
            var value = d.value;
            var label = _this.getLabel(d);
            var formattedLabel = formatLabel(label);
            var roundEdges = _this.roundEdges;
            d0Type = value > 0 ? D0Types.positive : D0Types.negative;
            var bar = {
                value: value,
                label: label,
                roundEdges: roundEdges,
                data: d,
                formattedLabel: formattedLabel
            };
            bar.height = _this.yScale.bandwidth();
            if (_this.type === 'standard') {
                bar.width = Math.abs(_this.xScale(value) - _this.xScale(xScaleMin));
                if (value < 0) {
                    bar.x = _this.xScale(value);
                }
                else {
                    bar.x = _this.xScale(xScaleMin);
                }
                bar.y = _this.yScale(label);
            }
            else if (_this.type === 'stacked') {
                var offset0 = d0[d0Type];
                var offset1 = offset0 + value;
                d0[d0Type] += value;
                bar.width = _this.xScale(offset1) - _this.xScale(offset0);
                bar.x = _this.xScale(offset0);
                bar.y = 0;
                bar.offset0 = offset0;
                bar.offset1 = offset1;
            }
            else if (_this.type === 'normalized') {
                var offset0 = d0[d0Type];
                var offset1 = offset0 + value;
                d0[d0Type] += value;
                if (total > 0) {
                    offset0 = (offset0 * 100) / total;
                    offset1 = (offset1 * 100) / total;
                }
                else {
                    offset0 = 0;
                    offset1 = 0;
                }
                bar.width = _this.xScale(offset1) - _this.xScale(offset0);
                bar.x = _this.xScale(offset0);
                bar.y = 0;
                bar.offset0 = offset0;
                bar.offset1 = offset1;
                value = (offset1 - offset0).toFixed(2) + '%';
            }
            if (_this.colors.scaleType === 'ordinal') {
                bar.color = _this.colors.getColor(label);
            }
            else {
                if (_this.type === 'standard') {
                    bar.color = _this.colors.getColor(value);
                    bar.gradientStops = _this.colors.getLinearGradientStops(value);
                }
                else {
                    bar.color = _this.colors.getColor(bar.offset1);
                    bar.gradientStops = _this.colors.getLinearGradientStops(bar.offset1, bar.offset0);
                }
            }
            var tooltipLabel = formattedLabel;
            bar.ariaLabel = formattedLabel + ' ' + value.toLocaleString();
            if (_this.seriesName) {
                tooltipLabel = _this.seriesName + " \u2022 " + formattedLabel;
                bar.data.series = _this.seriesName;
                bar.ariaLabel = _this.seriesName + ' ' + bar.ariaLabel;
            }
            bar.tooltipText = _this.tooltipDisabled
                ? undefined
                : "\n        <span class=\"tooltip-label\">" + escapeLabel(tooltipLabel) + "</span>\n        <span class=\"tooltip-val\">" + value.toLocaleString() + "</span>\n      ";
            return bar;
        });
        this.updateDataLabels();
    };
    SeriesHorizontal.prototype.updateDataLabels = function () {
        var _this = this;
        if (this.type === 'stacked') {
            this.barsForDataLabels = [];
            var section = {};
            section.series = this.seriesName;
            var totalPositive = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return (d > 0 ? sum + d : sum); }, 0);
            var totalNegative = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return (d < 0 ? sum + d : sum); }, 0);
            section.total = totalPositive + totalNegative;
            section.x = 0;
            section.y = 0;
            // if total is positive then we show it on the right, otherwise on the left
            if (section.total > 0) {
                section.width = this.xScale(totalPositive);
            }
            else {
                section.width = this.xScale(totalNegative);
            }
            section.height = this.yScale.bandwidth();
            this.barsForDataLabels.push(section);
        }
        else {
            this.barsForDataLabels = this.series.map(function (d) {
                var section = {};
                section.series = _this.seriesName ? _this.seriesName : d.label;
                section.total = d.value;
                section.x = _this.xScale(0);
                section.y = _this.yScale(d.label);
                section.width = _this.xScale(section.total) - _this.xScale(0);
                section.height = _this.yScale.bandwidth();
                return section;
            });
        }
    };
    SeriesHorizontal.prototype.updateTooltipSettings = function () {
        this.tooltipPlacement = this.tooltipDisabled ? undefined : 'top';
        this.tooltipType = this.tooltipDisabled ? undefined : 'tooltip';
    };
    SeriesHorizontal.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    };
    SeriesHorizontal.prototype.getLabel = function (dataItem) {
        if (dataItem.label) {
            return dataItem.label;
        }
        return dataItem.name;
    };
    SeriesHorizontal.prototype.trackBy = function (index, bar) {
        return bar.label;
    };
    SeriesHorizontal.prototype.trackDataLabelBy = function (index, barLabel) {
        return index + '#' + barLabel.series + '#' + barLabel.total;
    };
    SeriesHorizontal.prototype.click = function (data) {
        this.select.emit(data);
    };
    __decorate([
        Input()
    ], SeriesHorizontal.prototype, "dims", void 0);
    __decorate([
        Input()
    ], SeriesHorizontal.prototype, "type", void 0);
    __decorate([
        Input()
    ], SeriesHorizontal.prototype, "series", void 0);
    __decorate([
        Input()
    ], SeriesHorizontal.prototype, "xScale", void 0);
    __decorate([
        Input()
    ], SeriesHorizontal.prototype, "yScale", void 0);
    __decorate([
        Input()
    ], SeriesHorizontal.prototype, "colors", void 0);
    __decorate([
        Input()
    ], SeriesHorizontal.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input()
    ], SeriesHorizontal.prototype, "gradient", void 0);
    __decorate([
        Input()
    ], SeriesHorizontal.prototype, "activeEntries", void 0);
    __decorate([
        Input()
    ], SeriesHorizontal.prototype, "seriesName", void 0);
    __decorate([
        Input()
    ], SeriesHorizontal.prototype, "tooltipTemplate", void 0);
    __decorate([
        Input()
    ], SeriesHorizontal.prototype, "roundEdges", void 0);
    __decorate([
        Input()
    ], SeriesHorizontal.prototype, "animations", void 0);
    __decorate([
        Input()
    ], SeriesHorizontal.prototype, "showDataLabel", void 0);
    __decorate([
        Input()
    ], SeriesHorizontal.prototype, "dataLabelFormatting", void 0);
    __decorate([
        Input()
    ], SeriesHorizontal.prototype, "noBarWhenZero", void 0);
    __decorate([
        Output()
    ], SeriesHorizontal.prototype, "select", void 0);
    __decorate([
        Output()
    ], SeriesHorizontal.prototype, "activate", void 0);
    __decorate([
        Output()
    ], SeriesHorizontal.prototype, "deactivate", void 0);
    __decorate([
        Output()
    ], SeriesHorizontal.prototype, "dataLabelWidthChanged", void 0);
    SeriesHorizontal = __decorate([
        Component({
            selector: 'g[ngx-charts-series-horizontal]',
            template: "\n    <svg:g\n      ngx-charts-bar\n      *ngFor=\"let bar of bars; trackBy: trackBy\"\n      [@animationState]=\"'active'\"\n      [width]=\"bar.width\"\n      [height]=\"bar.height\"\n      [x]=\"bar.x\"\n      [y]=\"bar.y\"\n      [fill]=\"bar.color\"\n      [stops]=\"bar.gradientStops\"\n      [data]=\"bar.data\"\n      [orientation]=\"'horizontal'\"\n      [roundEdges]=\"bar.roundEdges\"\n      (select)=\"click($event)\"\n      [gradient]=\"gradient\"\n      [isActive]=\"isActive(bar.data)\"\n      [ariaLabel]=\"bar.ariaLabel\"\n      [animations]=\"animations\"\n      (activate)=\"activate.emit($event)\"\n      (deactivate)=\"deactivate.emit($event)\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"tooltipPlacement\"\n      [tooltipType]=\"tooltipType\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : bar.tooltipText\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"bar.data\"\n      [noBarWhenZero]=\"noBarWhenZero\"\n    ></svg:g>\n    <svg:g *ngIf=\"showDataLabel\">\n      <svg:g\n        ngx-charts-bar-label\n        *ngFor=\"let b of barsForDataLabels; let i = index; trackBy: trackDataLabelBy\"\n        [barX]=\"b.x\"\n        [barY]=\"b.y\"\n        [barWidth]=\"b.width\"\n        [barHeight]=\"b.height\"\n        [value]=\"b.total\"\n        [valueFormatting]=\"dataLabelFormatting\"\n        [orientation]=\"'horizontal'\"\n        (dimensionsChanged)=\"dataLabelWidthChanged.emit({ size: $event, index: i })\"\n      />\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':leave', [
                        style({
                            opacity: 1
                        }),
                        animate(500, style({ opacity: 0 }))
                    ])
                ])
            ]
        })
    ], SeriesHorizontal);
    return SeriesHorizontal;
}());
export { SeriesHorizontal };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVzLWhvcml6b250YWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvYmFyLWNoYXJ0L3Nlcmllcy1ob3Jpem9udGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFHWix1QkFBdUIsRUFFeEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBOER0RDtJQUFBO1FBSUUsc0JBQWlCLEdBQWtHLEVBQUUsQ0FBQztRQUc3RyxTQUFJLEdBQUcsVUFBVSxDQUFDO1FBS2xCLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBTWpDLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0Isa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFFL0Isa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFFN0IsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEMsMEJBQXFCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQStLdkQsQ0FBQztJQTFLQyxzQ0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxpQ0FBTSxHQUFOOztRQUFBLGlCQXFHQztRQXBHQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixJ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LEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDcEMsQ0FBQztpQkFDSCxDQUFDO2FBQ0g7U0FDRixDQUFDO09BQ1csZ0JBQWdCLENBeU01QjtJQUFELHVCQUFDO0NBQUEsQUF6TUQsSUF5TUM7U0F6TVksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPbkNoYW5nZXMsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBUZW1wbGF0ZVJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyB0cmlnZ2VyLCBzdHlsZSwgYW5pbWF0ZSwgdHJhbnNpdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBmb3JtYXRMYWJlbCwgZXNjYXBlTGFiZWwgfSBmcm9tICcuLi9jb21tb24vbGFiZWwuaGVscGVyJztcclxuaW1wb3J0IHsgRDBUeXBlcyB9IGZyb20gJy4vc2VyaWVzLXZlcnRpY2FsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERhdGFJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL2NoYXJ0LWRhdGEubW9kZWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtc2VyaWVzLWhvcml6b250YWxdJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHN2ZzpnXHJcbiAgICAgIG5neC1jaGFydHMtYmFyXHJcbiAgICAgICpuZ0Zvcj1cImxldCBiYXIgb2YgYmFyczsgdHJhY2tCeTogdHJhY2tCeVwiXHJcbiAgICAgIFtAYW5pbWF0aW9uU3RhdGVdPVwiJ2FjdGl2ZSdcIlxyXG4gICAgICBbd2lkdGhdPVwiYmFyLndpZHRoXCJcclxuICAgICAgW2hlaWdodF09XCJiYXIuaGVpZ2h0XCJcclxuICAgICAgW3hdPVwiYmFyLnhcIlxyXG4gICAgICBbeV09XCJiYXIueVwiXHJcbiAgICAgIFtmaWxsXT1cImJhci5jb2xvclwiXHJcbiAgICAgIFtzdG9wc109XCJiYXIuZ3JhZGllbnRTdG9wc1wiXHJcbiAgICAgIFtkYXRhXT1cImJhci5kYXRhXCJcclxuICAgICAgW29yaWVudGF0aW9uXT1cIidob3Jpem9udGFsJ1wiXHJcbiAgICAgIFtyb3VuZEVkZ2VzXT1cImJhci5yb3VuZEVkZ2VzXCJcclxuICAgICAgKHNlbGVjdCk9XCJjbGljaygkZXZlbnQpXCJcclxuICAgICAgW2dyYWRpZW50XT1cImdyYWRpZW50XCJcclxuICAgICAgW2lzQWN0aXZlXT1cImlzQWN0aXZlKGJhci5kYXRhKVwiXHJcbiAgICAgIFthcmlhTGFiZWxdPVwiYmFyLmFyaWFMYWJlbFwiXHJcbiAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxyXG4gICAgICAoYWN0aXZhdGUpPVwiYWN0aXZhdGUuZW1pdCgkZXZlbnQpXCJcclxuICAgICAgKGRlYWN0aXZhdGUpPVwiZGVhY3RpdmF0ZS5lbWl0KCRldmVudClcIlxyXG4gICAgICBuZ3gtdG9vbHRpcFxyXG4gICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXHJcbiAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cInRvb2x0aXBQbGFjZW1lbnRcIlxyXG4gICAgICBbdG9vbHRpcFR5cGVdPVwidG9vbHRpcFR5cGVcIlxyXG4gICAgICBbdG9vbHRpcFRpdGxlXT1cInRvb2x0aXBUZW1wbGF0ZSA/IHVuZGVmaW5lZCA6IGJhci50b29sdGlwVGV4dFwiXHJcbiAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcclxuICAgICAgW3Rvb2x0aXBDb250ZXh0XT1cImJhci5kYXRhXCJcclxuICAgICAgW25vQmFyV2hlblplcm9dPVwibm9CYXJXaGVuWmVyb1wiXHJcbiAgICA+PC9zdmc6Zz5cclxuICAgIDxzdmc6ZyAqbmdJZj1cInNob3dEYXRhTGFiZWxcIj5cclxuICAgICAgPHN2ZzpnXHJcbiAgICAgICAgbmd4LWNoYXJ0cy1iYXItbGFiZWxcclxuICAgICAgICAqbmdGb3I9XCJsZXQgYiBvZiBiYXJzRm9yRGF0YUxhYmVsczsgbGV0IGkgPSBpbmRleDsgdHJhY2tCeTogdHJhY2tEYXRhTGFiZWxCeVwiXHJcbiAgICAgICAgW2JhclhdPVwiYi54XCJcclxuICAgICAgICBbYmFyWV09XCJiLnlcIlxyXG4gICAgICAgIFtiYXJXaWR0aF09XCJiLndpZHRoXCJcclxuICAgICAgICBbYmFySGVpZ2h0XT1cImIuaGVpZ2h0XCJcclxuICAgICAgICBbdmFsdWVdPVwiYi50b3RhbFwiXHJcbiAgICAgICAgW3ZhbHVlRm9ybWF0dGluZ109XCJkYXRhTGFiZWxGb3JtYXR0aW5nXCJcclxuICAgICAgICBbb3JpZW50YXRpb25dPVwiJ2hvcml6b250YWwnXCJcclxuICAgICAgICAoZGltZW5zaW9uc0NoYW5nZWQpPVwiZGF0YUxhYmVsV2lkdGhDaGFuZ2VkLmVtaXQoeyBzaXplOiAkZXZlbnQsIGluZGV4OiBpIH0pXCJcclxuICAgICAgLz5cclxuICAgIDwvc3ZnOmc+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBhbmltYXRpb25zOiBbXHJcbiAgICB0cmlnZ2VyKCdhbmltYXRpb25TdGF0ZScsIFtcclxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xyXG4gICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgICB9KSxcclxuICAgICAgICBhbmltYXRlKDUwMCwgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKVxyXG4gICAgICBdKVxyXG4gICAgXSlcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZXJpZXNIb3Jpem9udGFsIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBiYXJzOiBhbnk7XHJcbiAgeDogYW55O1xyXG4gIHk6IGFueTtcclxuICBiYXJzRm9yRGF0YUxhYmVsczogQXJyYXk8eyB4OiBudW1iZXI7IHk6IG51bWJlcjsgd2lkdGg6IG51bWJlcjsgaGVpZ2h0OiBudW1iZXI7IHRvdGFsOiBudW1iZXI7IHNlcmllczogc3RyaW5nIH0+ID0gW107XHJcblxyXG4gIEBJbnB1dCgpIGRpbXM7XHJcbiAgQElucHV0KCkgdHlwZSA9ICdzdGFuZGFyZCc7XHJcbiAgQElucHV0KCkgc2VyaWVzO1xyXG4gIEBJbnB1dCgpIHhTY2FsZTtcclxuICBASW5wdXQoKSB5U2NhbGU7XHJcbiAgQElucHV0KCkgY29sb3JzO1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGdyYWRpZW50OiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGFjdGl2ZUVudHJpZXM6IGFueVtdO1xyXG4gIEBJbnB1dCgpIHNlcmllc05hbWU6IHN0cmluZztcclxuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgQElucHV0KCkgcm91bmRFZGdlczogYm9vbGVhbjtcclxuICBASW5wdXQoKSBhbmltYXRpb25zOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSBzaG93RGF0YUxhYmVsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZGF0YUxhYmVsRm9ybWF0dGluZzogYW55O1xyXG4gIEBJbnB1dCgpIG5vQmFyV2hlblplcm86IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZGF0YUxhYmVsV2lkdGhDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICB0b29sdGlwUGxhY2VtZW50OiBzdHJpbmc7XHJcbiAgdG9vbHRpcFR5cGU6IHN0cmluZztcclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMudXBkYXRlVG9vbHRpcFNldHRpbmdzKCk7XHJcbiAgICBjb25zdCBkMCA9IHtcclxuICAgICAgW0QwVHlwZXMucG9zaXRpdmVdOiAwLFxyXG4gICAgICBbRDBUeXBlcy5uZWdhdGl2ZV06IDBcclxuICAgIH07XHJcbiAgICBsZXQgZDBUeXBlOiBEMFR5cGVzO1xyXG4gICAgZDBUeXBlID0gRDBUeXBlcy5wb3NpdGl2ZTtcclxuICAgIGxldCB0b3RhbDtcclxuICAgIGlmICh0aGlzLnR5cGUgPT09ICdub3JtYWxpemVkJykge1xyXG4gICAgICB0b3RhbCA9IHRoaXMuc2VyaWVzLm1hcChkID0+IGQudmFsdWUpLnJlZHVjZSgoc3VtLCBkKSA9PiBzdW0gKyBkLCAwKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHhTY2FsZU1pbiA9IE1hdGgubWF4KHRoaXMueFNjYWxlLmRvbWFpbigpWzBdLCAwKTtcclxuXHJcbiAgICB0aGlzLmJhcnMgPSB0aGlzLnNlcmllcy5tYXAoKGQsIGluZGV4KSA9PiB7XHJcbiAgICAgIGxldCB2YWx1ZSA9IGQudmFsdWU7XHJcbiAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5nZXRMYWJlbChkKTtcclxuICAgICAgY29uc3QgZm9ybWF0dGVkTGFiZWwgPSBmb3JtYXRMYWJlbChsYWJlbCk7XHJcbiAgICAgIGNvbnN0IHJvdW5kRWRnZXMgPSB0aGlzLnJvdW5kRWRnZXM7XHJcbiAgICAgIGQwVHlwZSA9IHZhbHVlID4gMCA/IEQwVHlwZXMucG9zaXRpdmUgOiBEMFR5cGVzLm5lZ2F0aXZlO1xyXG5cclxuICAgICAgY29uc3QgYmFyOiBhbnkgPSB7XHJcbiAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgbGFiZWwsXHJcbiAgICAgICAgcm91bmRFZGdlcyxcclxuICAgICAgICBkYXRhOiBkLFxyXG4gICAgICAgIGZvcm1hdHRlZExhYmVsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBiYXIuaGVpZ2h0ID0gdGhpcy55U2NhbGUuYmFuZHdpZHRoKCk7XHJcblxyXG4gICAgICBpZiAodGhpcy50eXBlID09PSAnc3RhbmRhcmQnKSB7XHJcbiAgICAgICAgYmFyLndpZHRoID0gTWF0aC5hYnModGhpcy54U2NhbGUodmFsdWUpIC0gdGhpcy54U2NhbGUoeFNjYWxlTWluKSk7XHJcbiAgICAgICAgaWYgKHZhbHVlIDwgMCkge1xyXG4gICAgICAgICAgYmFyLnggPSB0aGlzLnhTY2FsZSh2YWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGJhci54ID0gdGhpcy54U2NhbGUoeFNjYWxlTWluKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYmFyLnkgPSB0aGlzLnlTY2FsZShsYWJlbCk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSAnc3RhY2tlZCcpIHtcclxuICAgICAgICBjb25zdCBvZmZzZXQwID0gZDBbZDBUeXBlXTtcclxuICAgICAgICBjb25zdCBvZmZzZXQxID0gb2Zmc2V0MCArIHZhbHVlO1xyXG4gICAgICAgIGQwW2QwVHlwZV0gKz0gdmFsdWU7XHJcblxyXG4gICAgICAgIGJhci53aWR0aCA9IHRoaXMueFNjYWxlKG9mZnNldDEpIC0gdGhpcy54U2NhbGUob2Zmc2V0MCk7XHJcbiAgICAgICAgYmFyLnggPSB0aGlzLnhTY2FsZShvZmZzZXQwKTtcclxuICAgICAgICBiYXIueSA9IDA7XHJcbiAgICAgICAgYmFyLm9mZnNldDAgPSBvZmZzZXQwO1xyXG4gICAgICAgIGJhci5vZmZzZXQxID0gb2Zmc2V0MTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICdub3JtYWxpemVkJykge1xyXG4gICAgICAgIGxldCBvZmZzZXQwID0gZDBbZDBUeXBlXTtcclxuICAgICAgICBsZXQgb2Zmc2V0MSA9IG9mZnNldDAgKyB2YWx1ZTtcclxuICAgICAgICBkMFtkMFR5cGVdICs9IHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAodG90YWwgPiAwKSB7XHJcbiAgICAgICAgICBvZmZzZXQwID0gKG9mZnNldDAgKiAxMDApIC8gdG90YWw7XHJcbiAgICAgICAgICBvZmZzZXQxID0gKG9mZnNldDEgKiAxMDApIC8gdG90YWw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG9mZnNldDAgPSAwO1xyXG4gICAgICAgICAgb2Zmc2V0MSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBiYXIud2lkdGggPSB0aGlzLnhTY2FsZShvZmZzZXQxKSAtIHRoaXMueFNjYWxlKG9mZnNldDApO1xyXG4gICAgICAgIGJhci54ID0gdGhpcy54U2NhbGUob2Zmc2V0MCk7XHJcbiAgICAgICAgYmFyLnkgPSAwO1xyXG4gICAgICAgIGJhci5vZmZzZXQwID0gb2Zmc2V0MDtcclxuICAgICAgICBiYXIub2Zmc2V0MSA9IG9mZnNldDE7XHJcbiAgICAgICAgdmFsdWUgPSAob2Zmc2V0MSAtIG9mZnNldDApLnRvRml4ZWQoMikgKyAnJSc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLmNvbG9ycy5zY2FsZVR5cGUgPT09ICdvcmRpbmFsJykge1xyXG4gICAgICAgIGJhci5jb2xvciA9IHRoaXMuY29sb3JzLmdldENvbG9yKGxhYmVsKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAodGhpcy50eXBlID09PSAnc3RhbmRhcmQnKSB7XHJcbiAgICAgICAgICBiYXIuY29sb3IgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcih2YWx1ZSk7XHJcbiAgICAgICAgICBiYXIuZ3JhZGllbnRTdG9wcyA9IHRoaXMuY29sb3JzLmdldExpbmVhckdyYWRpZW50U3RvcHModmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBiYXIuY29sb3IgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcihiYXIub2Zmc2V0MSk7XHJcbiAgICAgICAgICBiYXIuZ3JhZGllbnRTdG9wcyA9IHRoaXMuY29sb3JzLmdldExpbmVhckdyYWRpZW50U3RvcHMoYmFyLm9mZnNldDEsIGJhci5vZmZzZXQwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCB0b29sdGlwTGFiZWwgPSBmb3JtYXR0ZWRMYWJlbDtcclxuICAgICAgYmFyLmFyaWFMYWJlbCA9IGZvcm1hdHRlZExhYmVsICsgJyAnICsgdmFsdWUudG9Mb2NhbGVTdHJpbmcoKTtcclxuICAgICAgaWYgKHRoaXMuc2VyaWVzTmFtZSkge1xyXG4gICAgICAgIHRvb2x0aXBMYWJlbCA9IGAke3RoaXMuc2VyaWVzTmFtZX0g4oCiICR7Zm9ybWF0dGVkTGFiZWx9YDtcclxuICAgICAgICBiYXIuZGF0YS5zZXJpZXMgPSB0aGlzLnNlcmllc05hbWU7XHJcbiAgICAgICAgYmFyLmFyaWFMYWJlbCA9IHRoaXMuc2VyaWVzTmFtZSArICcgJyArIGJhci5hcmlhTGFiZWw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGJhci50b29sdGlwVGV4dCA9IHRoaXMudG9vbHRpcERpc2FibGVkXHJcbiAgICAgICAgPyB1bmRlZmluZWRcclxuICAgICAgICA6IGBcclxuICAgICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtbGFiZWxcIj4ke2VzY2FwZUxhYmVsKHRvb2x0aXBMYWJlbCl9PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC12YWxcIj4ke3ZhbHVlLnRvTG9jYWxlU3RyaW5nKCl9PC9zcGFuPlxyXG4gICAgICBgO1xyXG5cclxuICAgICAgcmV0dXJuIGJhcjtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudXBkYXRlRGF0YUxhYmVscygpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlRGF0YUxhYmVscygpIHtcclxuICAgIGlmICh0aGlzLnR5cGUgPT09ICdzdGFja2VkJykge1xyXG4gICAgICB0aGlzLmJhcnNGb3JEYXRhTGFiZWxzID0gW107XHJcbiAgICAgIGNvbnN0IHNlY3Rpb246IGFueSA9IHt9O1xyXG4gICAgICBzZWN0aW9uLnNlcmllcyA9IHRoaXMuc2VyaWVzTmFtZTtcclxuICAgICAgY29uc3QgdG90YWxQb3NpdGl2ZSA9IHRoaXMuc2VyaWVzLm1hcChkID0+IGQudmFsdWUpLnJlZHVjZSgoc3VtLCBkKSA9PiAoZCA+IDAgPyBzdW0gKyBkIDogc3VtKSwgMCk7XHJcbiAgICAgIGNvbnN0IHRvdGFsTmVnYXRpdmUgPSB0aGlzLnNlcmllcy5tYXAoZCA9PiBkLnZhbHVlKS5yZWR1Y2UoKHN1bSwgZCkgPT4gKGQgPCAwID8gc3VtICsgZCA6IHN1bSksIDApO1xyXG4gICAgICBzZWN0aW9uLnRvdGFsID0gdG90YWxQb3NpdGl2ZSArIHRvdGFsTmVnYXRpdmU7XHJcbiAgICAgIHNlY3Rpb24ueCA9IDA7XHJcbiAgICAgIHNlY3Rpb24ueSA9IDA7XHJcbiAgICAgIC8vIGlmIHRvdGFsIGlzIHBvc2l0aXZlIHRoZW4gd2Ugc2hvdyBpdCBvbiB0aGUgcmlnaHQsIG90aGVyd2lzZSBvbiB0aGUgbGVmdFxyXG4gICAgICBpZiAoc2VjdGlvbi50b3RhbCA+IDApIHtcclxuICAgICAgICBzZWN0aW9uLndpZHRoID0gdGhpcy54U2NhbGUodG90YWxQb3NpdGl2ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2VjdGlvbi53aWR0aCA9IHRoaXMueFNjYWxlKHRvdGFsTmVnYXRpdmUpO1xyXG4gICAgICB9XHJcbiAgICAgIHNlY3Rpb24uaGVpZ2h0ID0gdGhpcy55U2NhbGUuYmFuZHdpZHRoKCk7XHJcbiAgICAgIHRoaXMuYmFyc0ZvckRhdGFMYWJlbHMucHVzaChzZWN0aW9uKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYmFyc0ZvckRhdGFMYWJlbHMgPSB0aGlzLnNlcmllcy5tYXAoZCA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2VjdGlvbjogYW55ID0ge307XHJcbiAgICAgICAgc2VjdGlvbi5zZXJpZXMgPSB0aGlzLnNlcmllc05hbWUgPyB0aGlzLnNlcmllc05hbWUgOiBkLmxhYmVsO1xyXG4gICAgICAgIHNlY3Rpb24udG90YWwgPSBkLnZhbHVlO1xyXG4gICAgICAgIHNlY3Rpb24ueCA9IHRoaXMueFNjYWxlKDApO1xyXG4gICAgICAgIHNlY3Rpb24ueSA9IHRoaXMueVNjYWxlKGQubGFiZWwpO1xyXG4gICAgICAgIHNlY3Rpb24ud2lkdGggPSB0aGlzLnhTY2FsZShzZWN0aW9uLnRvdGFsKSAtIHRoaXMueFNjYWxlKDApO1xyXG4gICAgICAgIHNlY3Rpb24uaGVpZ2h0ID0gdGhpcy55U2NhbGUuYmFuZHdpZHRoKCk7XHJcbiAgICAgICAgcmV0dXJuIHNlY3Rpb247XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlVG9vbHRpcFNldHRpbmdzKCkge1xyXG4gICAgdGhpcy50b29sdGlwUGxhY2VtZW50ID0gdGhpcy50b29sdGlwRGlzYWJsZWQgPyB1bmRlZmluZWQgOiAndG9wJztcclxuICAgIHRoaXMudG9vbHRpcFR5cGUgPSB0aGlzLnRvb2x0aXBEaXNhYmxlZCA/IHVuZGVmaW5lZCA6ICd0b29sdGlwJztcclxuICB9XHJcblxyXG4gIGlzQWN0aXZlKGVudHJ5KTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIXRoaXMuYWN0aXZlRW50cmllcykgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3QgaXRlbSA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kKGQgPT4ge1xyXG4gICAgICByZXR1cm4gZW50cnkubmFtZSA9PT0gZC5uYW1lICYmIGVudHJ5LnNlcmllcyA9PT0gZC5zZXJpZXM7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpdGVtICE9PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBnZXRMYWJlbChkYXRhSXRlbSk6IHN0cmluZyB7XHJcbiAgICBpZiAoZGF0YUl0ZW0ubGFiZWwpIHtcclxuICAgICAgcmV0dXJuIGRhdGFJdGVtLmxhYmVsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRhdGFJdGVtLm5hbWU7XHJcbiAgfVxyXG5cclxuICB0cmFja0J5KGluZGV4LCBiYXIpIHtcclxuICAgIHJldHVybiBiYXIubGFiZWw7XHJcbiAgfVxyXG5cclxuICB0cmFja0RhdGFMYWJlbEJ5KGluZGV4LCBiYXJMYWJlbCkge1xyXG4gICAgcmV0dXJuIGluZGV4ICsgJyMnICsgYmFyTGFiZWwuc2VyaWVzICsgJyMnICsgYmFyTGFiZWwudG90YWw7XHJcbiAgfVxyXG5cclxuICBjbGljayhkYXRhOiBEYXRhSXRlbSk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3QuZW1pdChkYXRhKTtcclxuICB9XHJcbn1cclxuIl19