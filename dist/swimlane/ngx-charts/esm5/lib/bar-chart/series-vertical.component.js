import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { formatLabel, escapeLabel } from '../common/label.helper';
export var D0Types;
(function (D0Types) {
    D0Types["positive"] = "positive";
    D0Types["negative"] = "negative";
})(D0Types || (D0Types = {}));
var SeriesVerticalComponent = /** @class */ (function () {
    function SeriesVerticalComponent() {
        this.type = 'standard';
        this.tooltipDisabled = false;
        this.animations = true;
        this.showDataLabel = false;
        this.noBarWhenZero = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.dataLabelHeightChanged = new EventEmitter();
        this.barsForDataLabels = [];
    }
    SeriesVerticalComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    SeriesVerticalComponent.prototype.update = function () {
        var _a;
        var _this = this;
        this.updateTooltipSettings();
        var width;
        if (this.series.length) {
            width = this.xScale.bandwidth();
        }
        width = Math.round(width);
        var yScaleMin = Math.max(this.yScale.domain()[0], 0);
        var d0 = (_a = {},
            _a[D0Types.positive] = 0,
            _a[D0Types.negative] = 0,
            _a);
        var d0Type = D0Types.positive;
        var total;
        if (this.type === 'normalized') {
            total = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return sum + d; }, 0);
        }
        this.bars = this.series.map(function (d, index) {
            var value = d.value;
            var oldValue = d.value;
            if (_this.scaleType === 'log') {
                var e = {};
                Object.assign(e, d);
                e.value = Math.log10(Number(value));
                value = e.value;
            }
            else {
            }
            var label = _this.getLabel(d);
            var formattedLabel = formatLabel(label);
            var roundEdges = _this.roundEdges;
            d0Type = value > 0 ? D0Types.positive : D0Types.negative;
            var bar = {
                value: value,
                label: label,
                roundEdges: roundEdges,
                data: d,
                width: width,
                formattedLabel: formattedLabel,
                height: 0,
                x: 0,
                y: 0
            };
            if (_this.type === 'standard') {
                bar.height = Math.abs(_this.yScale(value) - _this.yScale(yScaleMin));
                bar.x = _this.xScale(label);
                if (value < 0) {
                    bar.y = _this.yScale(0);
                }
                else {
                    bar.y = _this.yScale(value);
                }
            }
            else if (_this.type === 'stacked') {
                var offset0 = d0[d0Type];
                var offset1 = offset0 + value;
                d0[d0Type] += value;
                bar.height = _this.yScale(offset0) - _this.yScale(offset1);
                bar.x = 0;
                bar.y = _this.yScale(offset1);
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
                bar.height = _this.yScale(offset0) - _this.yScale(offset1);
                bar.x = 0;
                bar.y = _this.yScale(offset1);
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
                : "\n        <span class=\"tooltip-label\">" + escapeLabel(tooltipLabel) + "</span>\n        <span class=\"tooltip-val\">" + oldValue.toLocaleString() + "</span>\n      ";
            return bar;
        });
        this.updateDataLabels();
    };
    SeriesVerticalComponent.prototype.updateDataLabels = function () {
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
            if (section.total > 0) {
                section.height = this.yScale(totalPositive);
            }
            else {
                section.height = this.yScale(totalNegative);
            }
            section.width = this.xScale.bandwidth();
            this.barsForDataLabels.push(section);
        }
        else {
            this.barsForDataLabels = this.series.map(function (d) {
                var section = {};
                section.series = _this.seriesName ? _this.seriesName : d.label;
                section.total = d.value;
                section.x = _this.xScale(d.label);
                section.y = _this.yScale(0);
                section.height = _this.yScale(section.total) - _this.yScale(0);
                section.width = _this.xScale.bandwidth();
                return section;
            });
        }
    };
    SeriesVerticalComponent.prototype.updateTooltipSettings = function () {
        this.tooltipPlacement = this.tooltipDisabled ? undefined : 'top';
        this.tooltipType = this.tooltipDisabled ? undefined : 'tooltip';
    };
    SeriesVerticalComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    };
    SeriesVerticalComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    SeriesVerticalComponent.prototype.getLabel = function (dataItem) {
        if (dataItem.label) {
            return dataItem.label;
        }
        return dataItem.name;
    };
    SeriesVerticalComponent.prototype.trackBy = function (index, bar) {
        return bar.label;
    };
    SeriesVerticalComponent.prototype.trackDataLabelBy = function (index, barLabel) {
        return index + '#' + barLabel.series + '#' + barLabel.total;
    };
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "dims", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "type", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "series", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "xScale", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "yScale", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "scaleType", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "colors", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "gradient", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "seriesName", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "roundEdges", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "animations", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "showDataLabel", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "dataLabelFormatting", void 0);
    __decorate([
        Input()
    ], SeriesVerticalComponent.prototype, "noBarWhenZero", void 0);
    __decorate([
        Output()
    ], SeriesVerticalComponent.prototype, "select", void 0);
    __decorate([
        Output()
    ], SeriesVerticalComponent.prototype, "activate", void 0);
    __decorate([
        Output()
    ], SeriesVerticalComponent.prototype, "deactivate", void 0);
    __decorate([
        Output()
    ], SeriesVerticalComponent.prototype, "dataLabelHeightChanged", void 0);
    SeriesVerticalComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-series-vertical]',
            template: "\n    <svg:g\n      ngx-charts-bar\n      *ngFor=\"let bar of bars; trackBy: trackBy\"\n      [@animationState]=\"'active'\"\n      [@.disabled]=\"!animations\"\n      [width]=\"bar.width\"\n      [height]=\"bar.height\"\n      [x]=\"bar.x\"\n      [y]=\"bar.y\"\n      [fill]=\"bar.color\"\n      [stops]=\"bar.gradientStops\"\n      [data]=\"bar.data\"\n      [orientation]=\"'vertical'\"\n      [roundEdges]=\"bar.roundEdges\"\n      [gradient]=\"gradient\"\n      [ariaLabel]=\"bar.ariaLabel\"\n      [isActive]=\"isActive(bar.data)\"\n      (select)=\"onClick($event)\"\n      (activate)=\"activate.emit($event)\"\n      (deactivate)=\"deactivate.emit($event)\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"tooltipPlacement\"\n      [tooltipType]=\"tooltipType\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : bar.tooltipText\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"bar.data\"\n      [noBarWhenZero]=\"noBarWhenZero\"\n      [animations]=\"animations\"\n    ></svg:g>\n    <svg:g *ngIf=\"showDataLabel\">\n      <svg:g\n        ngx-charts-bar-label\n        *ngFor=\"let b of barsForDataLabels; let i = index; trackBy: trackDataLabelBy\"\n        [barX]=\"b.x\"\n        [barY]=\"b.y\"\n        [barWidth]=\"b.width\"\n        [barHeight]=\"b.height\"\n        [value]=\"b.total\"\n        [valueFormatting]=\"dataLabelFormatting\"\n        [orientation]=\"'vertical'\"\n        (dimensionsChanged)=\"dataLabelHeightChanged.emit({ size: $event, index: i })\"\n      />\n    </svg:g>\n  ",
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
    ], SeriesVerticalComponent);
    return SeriesVerticalComponent;
}());
export { SeriesVerticalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVzLXZlcnRpY2FsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2Jhci1jaGFydC9zZXJpZXMtdmVydGljYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFhLHVCQUF1QixFQUFlLE1BQU0sZUFBZSxDQUFDO0FBQ3hILE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR2xFLE1BQU0sQ0FBTixJQUFZLE9BR1g7QUFIRCxXQUFZLE9BQU87SUFDakIsZ0NBQXFCLENBQUE7SUFDckIsZ0NBQXFCLENBQUE7QUFDdkIsQ0FBQyxFQUhXLE9BQU8sS0FBUCxPQUFPLFFBR2xCO0FBOEREO0lBQUE7UUFFVyxTQUFJLEdBQUcsVUFBVSxDQUFDO1FBU2xCLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBR2pDLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0Isa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFFL0Isa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFFN0IsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEMsMkJBQXNCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVF0RCxzQkFBaUIsR0FBa0csRUFBRSxDQUFDO0lBNkx4SCxDQUFDO0lBM0xDLDZDQUFXLEdBQVgsVUFBWSxPQUFPO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQs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S0FBSyxFQUFFO29FQUFtQztJQUNsQztRQUFSLEtBQUssRUFBRTsrREFBcUI7SUFDcEI7UUFBUixLQUFLLEVBQUU7K0RBQTRCO0lBQzNCO1FBQVIsS0FBSyxFQUFFO2tFQUFnQztJQUMvQjtRQUFSLEtBQUssRUFBRTt3RUFBMEI7SUFDekI7UUFBUixLQUFLLEVBQUU7a0VBQStCO0lBRTdCO1FBQVQsTUFBTSxFQUFFOzJEQUE2QjtJQUM1QjtRQUFULE1BQU0sRUFBRTs2REFBK0I7SUFDOUI7UUFBVCxNQUFNLEVBQUU7K0RBQWlDO0lBQ2hDO1FBQVQsTUFBTSxFQUFFOzJFQUE2QztJQXRCM0MsdUJBQXVCO1FBNURuQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsK0JBQStCO1lBQ3pDLFFBQVEsRUFBRSw0aURBNkNUO1lBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07WUFDL0MsVUFBVSxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDeEIsVUFBVSxDQUFDLFFBQVEsRUFBRTt3QkFDbkIsS0FBSyxDQUFDOzRCQUNKLE9BQU8sRUFBRSxDQUFDO3lCQUNYLENBQUM7d0JBQ0YsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDcEMsQ0FBQztpQkFDSCxDQUFDO2FBQ0g7U0FDRixDQUFDO09BQ1csdUJBQXVCLENBMk5uQztJQUFELDhCQUFDO0NBQUEsQUEzTkQsSUEyTkM7U0EzTlksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0cmlnZ2VyLCBzdHlsZSwgYW5pbWF0ZSwgdHJhbnNpdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgZm9ybWF0TGFiZWwsIGVzY2FwZUxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsLmhlbHBlcic7XG5pbXBvcnQgeyBEYXRhSXRlbSB9IGZyb20gJy4uL21vZGVscy9jaGFydC1kYXRhLm1vZGVsJztcblxuZXhwb3J0IGVudW0gRDBUeXBlcyB7XG4gIHBvc2l0aXZlID0gJ3Bvc2l0aXZlJyxcbiAgbmVnYXRpdmUgPSAnbmVnYXRpdmUnXG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1zZXJpZXMtdmVydGljYWxdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmdcbiAgICAgIG5neC1jaGFydHMtYmFyXG4gICAgICAqbmdGb3I9XCJsZXQgYmFyIG9mIGJhcnM7IHRyYWNrQnk6IHRyYWNrQnlcIlxuICAgICAgW0BhbmltYXRpb25TdGF0ZV09XCInYWN0aXZlJ1wiXG4gICAgICBbQC5kaXNhYmxlZF09XCIhYW5pbWF0aW9uc1wiXG4gICAgICBbd2lkdGhdPVwiYmFyLndpZHRoXCJcbiAgICAgIFtoZWlnaHRdPVwiYmFyLmhlaWdodFwiXG4gICAgICBbeF09XCJiYXIueFwiXG4gICAgICBbeV09XCJiYXIueVwiXG4gICAgICBbZmlsbF09XCJiYXIuY29sb3JcIlxuICAgICAgW3N0b3BzXT1cImJhci5ncmFkaWVudFN0b3BzXCJcbiAgICAgIFtkYXRhXT1cImJhci5kYXRhXCJcbiAgICAgIFtvcmllbnRhdGlvbl09XCIndmVydGljYWwnXCJcbiAgICAgIFtyb3VuZEVkZ2VzXT1cImJhci5yb3VuZEVkZ2VzXCJcbiAgICAgIFtncmFkaWVudF09XCJncmFkaWVudFwiXG4gICAgICBbYXJpYUxhYmVsXT1cImJhci5hcmlhTGFiZWxcIlxuICAgICAgW2lzQWN0aXZlXT1cImlzQWN0aXZlKGJhci5kYXRhKVwiXG4gICAgICAoc2VsZWN0KT1cIm9uQ2xpY2soJGV2ZW50KVwiXG4gICAgICAoYWN0aXZhdGUpPVwiYWN0aXZhdGUuZW1pdCgkZXZlbnQpXCJcbiAgICAgIChkZWFjdGl2YXRlKT1cImRlYWN0aXZhdGUuZW1pdCgkZXZlbnQpXCJcbiAgICAgIG5neC10b29sdGlwXG4gICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXG4gICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJ0b29sdGlwUGxhY2VtZW50XCJcbiAgICAgIFt0b29sdGlwVHlwZV09XCJ0b29sdGlwVHlwZVwiXG4gICAgICBbdG9vbHRpcFRpdGxlXT1cInRvb2x0aXBUZW1wbGF0ZSA/IHVuZGVmaW5lZCA6IGJhci50b29sdGlwVGV4dFwiXG4gICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICBbdG9vbHRpcENvbnRleHRdPVwiYmFyLmRhdGFcIlxuICAgICAgW25vQmFyV2hlblplcm9dPVwibm9CYXJXaGVuWmVyb1wiXG4gICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcbiAgICA+PC9zdmc6Zz5cbiAgICA8c3ZnOmcgKm5nSWY9XCJzaG93RGF0YUxhYmVsXCI+XG4gICAgICA8c3ZnOmdcbiAgICAgICAgbmd4LWNoYXJ0cy1iYXItbGFiZWxcbiAgICAgICAgKm5nRm9yPVwibGV0IGIgb2YgYmFyc0ZvckRhdGFMYWJlbHM7IGxldCBpID0gaW5kZXg7IHRyYWNrQnk6IHRyYWNrRGF0YUxhYmVsQnlcIlxuICAgICAgICBbYmFyWF09XCJiLnhcIlxuICAgICAgICBbYmFyWV09XCJiLnlcIlxuICAgICAgICBbYmFyV2lkdGhdPVwiYi53aWR0aFwiXG4gICAgICAgIFtiYXJIZWlnaHRdPVwiYi5oZWlnaHRcIlxuICAgICAgICBbdmFsdWVdPVwiYi50b3RhbFwiXG4gICAgICAgIFt2YWx1ZUZvcm1hdHRpbmddPVwiZGF0YUxhYmVsRm9ybWF0dGluZ1wiXG4gICAgICAgIFtvcmllbnRhdGlvbl09XCIndmVydGljYWwnXCJcbiAgICAgICAgKGRpbWVuc2lvbnNDaGFuZ2VkKT1cImRhdGFMYWJlbEhlaWdodENoYW5nZWQuZW1pdCh7IHNpemU6ICRldmVudCwgaW5kZXg6IGkgfSlcIlxuICAgICAgLz5cbiAgICA8L3N2ZzpnPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2FuaW1hdGlvblN0YXRlJywgW1xuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICB9KSxcbiAgICAgICAgYW5pbWF0ZSg1MDAsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSlcbiAgICAgIF0pXG4gICAgXSlcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBTZXJpZXNWZXJ0aWNhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGRpbXM7XG4gIEBJbnB1dCgpIHR5cGUgPSAnc3RhbmRhcmQnO1xuICBASW5wdXQoKSBzZXJpZXM7XG4gIEBJbnB1dCgpIHhTY2FsZTtcbiAgQElucHV0KCkgeVNjYWxlO1xuICBASW5wdXQoKSBzY2FsZVR5cGU7XG4gIEBJbnB1dCgpIGNvbG9ycztcbiAgQElucHV0KCkgZ3JhZGllbnQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFjdGl2ZUVudHJpZXM6IGFueVtdO1xuICBASW5wdXQoKSBzZXJpZXNOYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBJbnB1dCgpIHJvdW5kRWRnZXM6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFuaW1hdGlvbnM6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBzaG93RGF0YUxhYmVsOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRhdGFMYWJlbEZvcm1hdHRpbmc6IGFueTtcbiAgQElucHV0KCkgbm9CYXJXaGVuWmVybzogYm9vbGVhbiA9IHRydWU7XG5cbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRhdGFMYWJlbEhlaWdodENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgdG9vbHRpcFBsYWNlbWVudDogc3RyaW5nO1xuICB0b29sdGlwVHlwZTogc3RyaW5nO1xuXG4gIGJhcnM6IGFueTtcbiAgeDogYW55O1xuICB5OiBhbnk7XG4gIGJhcnNGb3JEYXRhTGFiZWxzOiBBcnJheTx7IHg6IG51bWJlcjsgeTogbnVtYmVyOyB3aWR0aDogbnVtYmVyOyBoZWlnaHQ6IG51bWJlcjsgdG90YWw6IG51bWJlcjsgc2VyaWVzOiBzdHJpbmcgfT4gPSBbXTtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZVRvb2x0aXBTZXR0aW5ncygpO1xuICAgIGxldCB3aWR0aDtcbiAgICBpZiAodGhpcy5zZXJpZXMubGVuZ3RoKSB7XG4gICAgICB3aWR0aCA9IHRoaXMueFNjYWxlLmJhbmR3aWR0aCgpO1xuICAgIH1cbiAgICB3aWR0aCA9IE1hdGgucm91bmQod2lkdGgpO1xuICAgIGNvbnN0IHlTY2FsZU1pbiA9IE1hdGgubWF4KHRoaXMueVNjYWxlLmRvbWFpbigpWzBdLCAwKTtcblxuICAgIGNvbnN0IGQwID0ge1xuICAgICAgW0QwVHlwZXMucG9zaXRpdmVdOiAwLFxuICAgICAgW0QwVHlwZXMubmVnYXRpdmVdOiAwXG4gICAgfTtcbiAgICBsZXQgZDBUeXBlID0gRDBUeXBlcy5wb3NpdGl2ZTtcblxuICAgIGxldCB0b3RhbDtcbiAgICBpZiAodGhpcy50eXBlID09PSAnbm9ybWFsaXplZCcpIHtcbiAgICAgIHRvdGFsID0gdGhpcy5zZXJpZXMubWFwKGQgPT4gZC52YWx1ZSkucmVkdWNlKChzdW0sIGQpID0+IHN1bSArIGQsIDApO1xuICAgIH1cblxuICAgIHRoaXMuYmFycyA9IHRoaXMuc2VyaWVzLm1hcCgoZCwgaW5kZXgpID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IGQudmFsdWU7XG4gICAgICBjb25zdCBvbGRWYWx1ZSA9IGQudmFsdWU7XG4gICAgICBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICdsb2cnKSB7XG4gICAgICAgIGNvbnN0IGU6IGFueSA9IHt9O1xuICAgICAgICBPYmplY3QuYXNzaWduKGUsIGQpO1xuICAgICAgICBlLnZhbHVlID0gTWF0aC5sb2cxMChOdW1iZXIodmFsdWUpKTtcbiAgICAgICAgdmFsdWUgPSBlLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcblxuICAgICAgfVxuICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmdldExhYmVsKGQpO1xuICAgICAgY29uc3QgZm9ybWF0dGVkTGFiZWwgPSBmb3JtYXRMYWJlbChsYWJlbCk7XG4gICAgICBjb25zdCByb3VuZEVkZ2VzID0gdGhpcy5yb3VuZEVkZ2VzO1xuICAgICAgZDBUeXBlID0gdmFsdWUgPiAwID8gRDBUeXBlcy5wb3NpdGl2ZSA6IEQwVHlwZXMubmVnYXRpdmU7XG5cbiAgICAgIGNvbnN0IGJhcjogYW55ID0ge1xuICAgICAgICB2YWx1ZSxcbiAgICAgICAgbGFiZWwsXG4gICAgICAgIHJvdW5kRWRnZXMsXG4gICAgICAgIGRhdGE6IGQsXG4gICAgICAgIHdpZHRoLFxuICAgICAgICBmb3JtYXR0ZWRMYWJlbCxcbiAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy50eXBlID09PSAnc3RhbmRhcmQnKSB7XG4gICAgICAgIGJhci5oZWlnaHQgPSBNYXRoLmFicyh0aGlzLnlTY2FsZSh2YWx1ZSkgLSB0aGlzLnlTY2FsZSh5U2NhbGVNaW4pKTtcbiAgICAgICAgYmFyLnggPSB0aGlzLnhTY2FsZShsYWJlbCk7XG5cbiAgICAgICAgaWYgKHZhbHVlIDwgMCkge1xuICAgICAgICAgIGJhci55ID0gdGhpcy55U2NhbGUoMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYmFyLnkgPSB0aGlzLnlTY2FsZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSAnc3RhY2tlZCcpIHtcbiAgICAgICAgY29uc3Qgb2Zmc2V0MCA9IGQwW2QwVHlwZV07XG4gICAgICAgIGNvbnN0IG9mZnNldDEgPSBvZmZzZXQwICsgdmFsdWU7XG4gICAgICAgIGQwW2QwVHlwZV0gKz0gdmFsdWU7XG5cbiAgICAgICAgYmFyLmhlaWdodCA9IHRoaXMueVNjYWxlKG9mZnNldDApIC0gdGhpcy55U2NhbGUob2Zmc2V0MSk7XG4gICAgICAgIGJhci54ID0gMDtcbiAgICAgICAgYmFyLnkgPSB0aGlzLnlTY2FsZShvZmZzZXQxKTtcbiAgICAgICAgYmFyLm9mZnNldDAgPSBvZmZzZXQwO1xuICAgICAgICBiYXIub2Zmc2V0MSA9IG9mZnNldDE7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJ25vcm1hbGl6ZWQnKSB7XG4gICAgICAgIGxldCBvZmZzZXQwID0gZDBbZDBUeXBlXTtcbiAgICAgICAgbGV0IG9mZnNldDEgPSBvZmZzZXQwICsgdmFsdWU7XG4gICAgICAgIGQwW2QwVHlwZV0gKz0gdmFsdWU7XG5cbiAgICAgICAgaWYgKHRvdGFsID4gMCkge1xuICAgICAgICAgIG9mZnNldDAgPSAob2Zmc2V0MCAqIDEwMCkgLyB0b3RhbDtcbiAgICAgICAgICBvZmZzZXQxID0gKG9mZnNldDEgKiAxMDApIC8gdG90YWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2Zmc2V0MCA9IDA7XG4gICAgICAgICAgb2Zmc2V0MSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBiYXIuaGVpZ2h0ID0gdGhpcy55U2NhbGUob2Zmc2V0MCkgLSB0aGlzLnlTY2FsZShvZmZzZXQxKTtcbiAgICAgICAgYmFyLnggPSAwO1xuICAgICAgICBiYXIueSA9IHRoaXMueVNjYWxlKG9mZnNldDEpO1xuICAgICAgICBiYXIub2Zmc2V0MCA9IG9mZnNldDA7XG4gICAgICAgIGJhci5vZmZzZXQxID0gb2Zmc2V0MTtcbiAgICAgICAgdmFsdWUgPSAob2Zmc2V0MSAtIG9mZnNldDApLnRvRml4ZWQoMikgKyAnJSc7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNvbG9ycy5zY2FsZVR5cGUgPT09ICdvcmRpbmFsJykge1xuICAgICAgICBiYXIuY29sb3IgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcihsYWJlbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy50eXBlID09PSAnc3RhbmRhcmQnKSB7XG4gICAgICAgICAgYmFyLmNvbG9yID0gdGhpcy5jb2xvcnMuZ2V0Q29sb3IodmFsdWUpO1xuICAgICAgICAgIGJhci5ncmFkaWVudFN0b3BzID0gdGhpcy5jb2xvcnMuZ2V0TGluZWFyR3JhZGllbnRTdG9wcyh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYmFyLmNvbG9yID0gdGhpcy5jb2xvcnMuZ2V0Q29sb3IoYmFyLm9mZnNldDEpO1xuICAgICAgICAgIGJhci5ncmFkaWVudFN0b3BzID0gdGhpcy5jb2xvcnMuZ2V0TGluZWFyR3JhZGllbnRTdG9wcyhiYXIub2Zmc2V0MSwgYmFyLm9mZnNldDApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCB0b29sdGlwTGFiZWwgPSBmb3JtYXR0ZWRMYWJlbDtcbiAgICAgIGJhci5hcmlhTGFiZWwgPSBmb3JtYXR0ZWRMYWJlbCArICcgJyArIHZhbHVlLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgICBpZiAodGhpcy5zZXJpZXNOYW1lKSB7XG4gICAgICAgIHRvb2x0aXBMYWJlbCA9IGAke3RoaXMuc2VyaWVzTmFtZX0g4oCiICR7Zm9ybWF0dGVkTGFiZWx9YDtcbiAgICAgICAgYmFyLmRhdGEuc2VyaWVzID0gdGhpcy5zZXJpZXNOYW1lO1xuICAgICAgICBiYXIuYXJpYUxhYmVsID0gdGhpcy5zZXJpZXNOYW1lICsgJyAnICsgYmFyLmFyaWFMYWJlbDtcbiAgICAgIH1cblxuICAgICAgYmFyLnRvb2x0aXBUZXh0ID0gdGhpcy50b29sdGlwRGlzYWJsZWRcbiAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgOiBgXG4gICAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC1sYWJlbFwiPiR7ZXNjYXBlTGFiZWwodG9vbHRpcExhYmVsKX08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC12YWxcIj4ke29sZFZhbHVlLnRvTG9jYWxlU3RyaW5nKCl9PC9zcGFuPlxuICAgICAgYDtcblxuICAgICAgcmV0dXJuIGJhcjtcbiAgICB9KTtcblxuICAgIHRoaXMudXBkYXRlRGF0YUxhYmVscygpO1xuICB9XG5cbiAgdXBkYXRlRGF0YUxhYmVscygpIHtcbiAgICBpZiAodGhpcy50eXBlID09PSAnc3RhY2tlZCcpIHtcbiAgICAgIHRoaXMuYmFyc0ZvckRhdGFMYWJlbHMgPSBbXTtcbiAgICAgIGNvbnN0IHNlY3Rpb246IGFueSA9IHt9O1xuICAgICAgc2VjdGlvbi5zZXJpZXMgPSB0aGlzLnNlcmllc05hbWU7XG4gICAgICBjb25zdCB0b3RhbFBvc2l0aXZlID0gdGhpcy5zZXJpZXMubWFwKGQgPT4gZC52YWx1ZSkucmVkdWNlKChzdW0sIGQpID0+IChkID4gMCA/IHN1bSArIGQgOiBzdW0pLCAwKTtcbiAgICAgIGNvbnN0IHRvdGFsTmVnYXRpdmUgPSB0aGlzLnNlcmllcy5tYXAoZCA9PiBkLnZhbHVlKS5yZWR1Y2UoKHN1bSwgZCkgPT4gKGQgPCAwID8gc3VtICsgZCA6IHN1bSksIDApO1xuICAgICAgc2VjdGlvbi50b3RhbCA9IHRvdGFsUG9zaXRpdmUgKyB0b3RhbE5lZ2F0aXZlO1xuICAgICAgc2VjdGlvbi54ID0gMDtcbiAgICAgIHNlY3Rpb24ueSA9IDA7XG4gICAgICBpZiAoc2VjdGlvbi50b3RhbCA+IDApIHtcbiAgICAgICAgc2VjdGlvbi5oZWlnaHQgPSB0aGlzLnlTY2FsZSh0b3RhbFBvc2l0aXZlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlY3Rpb24uaGVpZ2h0ID0gdGhpcy55U2NhbGUodG90YWxOZWdhdGl2ZSk7XG4gICAgICB9XG4gICAgICBzZWN0aW9uLndpZHRoID0gdGhpcy54U2NhbGUuYmFuZHdpZHRoKCk7XG4gICAgICB0aGlzLmJhcnNGb3JEYXRhTGFiZWxzLnB1c2goc2VjdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYmFyc0ZvckRhdGFMYWJlbHMgPSB0aGlzLnNlcmllcy5tYXAoZCA9PiB7XG4gICAgICAgIGNvbnN0IHNlY3Rpb246IGFueSA9IHt9O1xuICAgICAgICBzZWN0aW9uLnNlcmllcyA9IHRoaXMuc2VyaWVzTmFtZSA/IHRoaXMuc2VyaWVzTmFtZSA6IGQubGFiZWw7XG4gICAgICAgIHNlY3Rpb24udG90YWwgPSBkLnZhbHVlO1xuICAgICAgICBzZWN0aW9uLnggPSB0aGlzLnhTY2FsZShkLmxhYmVsKTtcbiAgICAgICAgc2VjdGlvbi55ID0gdGhpcy55U2NhbGUoMCk7XG4gICAgICAgIHNlY3Rpb24uaGVpZ2h0ID0gdGhpcy55U2NhbGUoc2VjdGlvbi50b3RhbCkgLSB0aGlzLnlTY2FsZSgwKTtcbiAgICAgICAgc2VjdGlvbi53aWR0aCA9IHRoaXMueFNjYWxlLmJhbmR3aWR0aCgpO1xuICAgICAgICByZXR1cm4gc2VjdGlvbjtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVRvb2x0aXBTZXR0aW5ncygpIHtcbiAgICB0aGlzLnRvb2x0aXBQbGFjZW1lbnQgPSB0aGlzLnRvb2x0aXBEaXNhYmxlZCA/IHVuZGVmaW5lZCA6ICd0b3AnO1xuICAgIHRoaXMudG9vbHRpcFR5cGUgPSB0aGlzLnRvb2x0aXBEaXNhYmxlZCA/IHVuZGVmaW5lZCA6ICd0b29sdGlwJztcbiAgfVxuXG4gIGlzQWN0aXZlKGVudHJ5KTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmFjdGl2ZUVudHJpZXMpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBpdGVtID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbmQoZCA9PiB7XG4gICAgICByZXR1cm4gZW50cnkubmFtZSA9PT0gZC5uYW1lICYmIGVudHJ5LnNlcmllcyA9PT0gZC5zZXJpZXM7XG4gICAgfSk7XG4gICAgcmV0dXJuIGl0ZW0gIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIG9uQ2xpY2soZGF0YTogRGF0YUl0ZW0pOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdC5lbWl0KGRhdGEpO1xuICB9XG5cbiAgZ2V0TGFiZWwoZGF0YUl0ZW0pOiBzdHJpbmcge1xuICAgIGlmIChkYXRhSXRlbS5sYWJlbCkge1xuICAgICAgcmV0dXJuIGRhdGFJdGVtLmxhYmVsO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YUl0ZW0ubmFtZTtcbiAgfVxuXG4gIHRyYWNrQnkoaW5kZXgsIGJhcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGJhci5sYWJlbDtcbiAgfVxuXG4gIHRyYWNrRGF0YUxhYmVsQnkoaW5kZXgsIGJhckxhYmVsKSB7XG4gICAgcmV0dXJuIGluZGV4ICsgJyMnICsgYmFyTGFiZWwuc2VyaWVzICsgJyMnICsgYmFyTGFiZWwudG90YWw7XG4gIH1cbn1cbiJdfQ==