import { __decorate, __extends, __read, __spread } from "tslib";
import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, ContentChild, Output, EventEmitter } from '@angular/core';
import { min } from 'd3-array';
import { format } from 'd3-format';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
import { trimLabel } from '../common/trim-label.helper';
import { gridLayout } from '../common/grid-layout.helper';
import { formatLabel } from '../common/label.helper';
var PieGridComponent = /** @class */ (function (_super) {
    __extends(PieGridComponent, _super);
    function PieGridComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tooltipDisabled = false;
        _this.label = 'Total';
        _this.minWidth = 150;
        _this.activeEntries = [];
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [20, 20, 20, 20];
        return _this;
    }
    PieGridComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin
        });
        this.formatDates();
        this.domain = this.getDomain();
        this.data = gridLayout(this.dims, this.results, this.minWidth, this.designatedTotal);
        this.transform = "translate(" + this.margin[3] + " , " + this.margin[0] + ")";
        this.series = this.getSeries();
        this.setColors();
        this.tooltipText = this.tooltipText || this.defaultTooltipText;
    };
    PieGridComponent.prototype.defaultTooltipText = function (_a) {
        var data = _a.data;
        var label = trimLabel(formatLabel(data.name));
        var val = data.value.toLocaleString();
        return "\n      <span class=\"tooltip-label\">" + label + "</span>\n      <span class=\"tooltip-val\">" + val + "</span>\n    ";
    };
    PieGridComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.label; });
    };
    PieGridComponent.prototype.getSeries = function () {
        var _this = this;
        var total = this.designatedTotal ? this.designatedTotal : this.getTotal();
        return this.data.map(function (d) {
            var baselineLabelHeight = 20;
            var padding = 10;
            var name = d.data.name;
            var label = formatLabel(name);
            var value = d.data.value;
            var radius = min([d.width - padding, d.height - baselineLabelHeight]) / 2 - 5;
            var innerRadius = radius * 0.9;
            var count = 0;
            var colors = function () {
                count += 1;
                if (count === 1) {
                    return 'rgba(100,100,100,0.3)';
                }
                else {
                    return _this.colorScale.getColor(label);
                }
            };
            var xPos = d.x + (d.width - padding) / 2;
            var yPos = d.y + (d.height - baselineLabelHeight) / 2;
            return {
                transform: "translate(" + xPos + ", " + yPos + ")",
                colors: colors,
                innerRadius: innerRadius,
                outerRadius: radius,
                name: name,
                label: trimLabel(label),
                total: value,
                value: value,
                percent: format('.1%')(d.data.percent),
                data: [
                    d,
                    {
                        data: {
                            other: true,
                            value: total - value,
                            name: d.data.name
                        }
                    }
                ]
            };
        });
    };
    PieGridComponent.prototype.getTotal = function () {
        return this.results.map(function (d) { return d.value; }).reduce(function (sum, d) { return sum + d; }, 0);
    };
    PieGridComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    PieGridComponent.prototype.setColors = function () {
        this.colorScale = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    PieGridComponent.prototype.onActivate = function (item, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        item = this.results.find(function (d) {
            if (fromLegend) {
                return d.label === item.name;
            }
            else {
                return d.name === item.name;
            }
        });
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = __spread([item], this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    PieGridComponent.prototype.onDeactivate = function (item, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        item = this.results.find(function (d) {
            if (fromLegend) {
                return d.label === item.name;
            }
            else {
                return d.name === item.name;
            }
        });
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = __spread(this.activeEntries);
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    __decorate([
        Input()
    ], PieGridComponent.prototype, "designatedTotal", void 0);
    __decorate([
        Input()
    ], PieGridComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input()
    ], PieGridComponent.prototype, "tooltipText", void 0);
    __decorate([
        Input()
    ], PieGridComponent.prototype, "label", void 0);
    __decorate([
        Input()
    ], PieGridComponent.prototype, "minWidth", void 0);
    __decorate([
        Input()
    ], PieGridComponent.prototype, "activeEntries", void 0);
    __decorate([
        Output()
    ], PieGridComponent.prototype, "activate", void 0);
    __decorate([
        Output()
    ], PieGridComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate')
    ], PieGridComponent.prototype, "tooltipTemplate", void 0);
    PieGridComponent = __decorate([
        Component({
            selector: 'ngx-charts-pie-grid',
            template: "\n    <ngx-charts-chart [view]=\"[width, height]\" [showLegend]=\"false\" [animations]=\"animations\">\n      <svg:g [attr.transform]=\"transform\" class=\"pie-grid chart\">\n        <svg:g *ngFor=\"let series of series\" class=\"pie-grid-item\" [attr.transform]=\"series.transform\">\n          <svg:g\n            ngx-charts-pie-grid-series\n            [colors]=\"series.colors\"\n            [data]=\"series.data\"\n            [innerRadius]=\"series.innerRadius\"\n            [outerRadius]=\"series.outerRadius\"\n            [animations]=\"animations\"\n            (select)=\"onClick($event)\"\n            ngx-tooltip\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipPlacement]=\"'top'\"\n            [tooltipType]=\"'tooltip'\"\n            [tooltipTitle]=\"tooltipTemplate ? undefined : tooltipText({ data: series })\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [tooltipContext]=\"series.data[0].data\"\n            (activate)=\"onActivate($event)\"\n            (deactivate)=\"onDeactivate($event)\"\n          />\n          <svg:text\n            *ngIf=\"animations\"\n            class=\"label percent-label\"\n            dy=\"-0.5em\"\n            x=\"0\"\n            y=\"5\"\n            ngx-charts-count-up\n            [countTo]=\"series.percent\"\n            [countSuffix]=\"'%'\"\n            text-anchor=\"middle\"\n          ></svg:text>\n          <svg:text *ngIf=\"!animations\" class=\"label percent-label\" dy=\"-0.5em\" x=\"0\" y=\"5\" text-anchor=\"middle\">\n            {{ series.percent.toLocaleString() }}\n          </svg:text>\n          <svg:text class=\"label\" dy=\"0.5em\" x=\"0\" y=\"5\" text-anchor=\"middle\">\n            {{ series.label }}\n          </svg:text>\n          <svg:text\n            *ngIf=\"animations\"\n            class=\"label\"\n            dy=\"1.23em\"\n            x=\"0\"\n            [attr.y]=\"series.outerRadius\"\n            text-anchor=\"middle\"\n            ngx-charts-count-up\n            [countTo]=\"series.total\"\n            [countPrefix]=\"label + ': '\"\n          ></svg:text>\n          <svg:text\n            *ngIf=\"!animations\"\n            class=\"label\"\n            dy=\"1.23em\"\n            x=\"0\"\n            [attr.y]=\"series.outerRadius\"\n            text-anchor=\"middle\"\n          >\n            {{ label }}: {{ series.total.toLocaleString() }}\n          </svg:text>\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".pie-grid .arc1{opacity:.4}.pie-grid .percent-label{font-size:16px;font-weight:400}"]
        })
    ], PieGridComponent);
    return PieGridComponent;
}(BaseChartComponent));
export { PieGridComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWdyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvcGllLWNoYXJ0L3BpZS1ncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2QixZQUFZLEVBRVosTUFBTSxFQUNOLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFbkMsT0FBTyxFQUFFLHVCQUF1QixFQUFrQixNQUFNLGtDQUFrQyxDQUFDO0FBQzNGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQXlFckQ7SUFBc0Msb0NBQWtCO0lBQXhEO1FBQUEscUVBMkpDO1FBekpVLHFCQUFlLEdBQVksS0FBSyxDQUFDO1FBRWpDLFdBQUssR0FBVyxPQUFPLENBQUM7UUFDeEIsY0FBUSxHQUFXLEdBQUcsQ0FBQztRQUN2QixtQkFBYSxHQUFVLEVBQUUsQ0FBQztRQUV6QixjQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDakQsZ0JBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVE3RCxZQUFNLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzs7SUEw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QUFFO3NEQUFrRDtJQUNqRDtRQUFULE1BQU0sRUFBRTt3REFBb0Q7SUFVNUI7UUFBaEMsWUFBWSxDQUFDLGlCQUFpQixDQUFDOzZEQUFtQztJQW5CeEQsZ0JBQWdCO1FBdEU1QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFFBQVEsRUFBRSxtN0VBK0RUO1lBRUQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O1NBQ2hELENBQUM7T0FDVyxnQkFBZ0IsQ0EySjVCO0lBQUQsdUJBQUM7Q0FBQSxBQTNKRCxDQUFzQyxrQkFBa0IsR0EySnZEO1NBM0pZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBUZW1wbGF0ZVJlZixcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IG1pbiB9IGZyb20gJ2QzLWFycmF5JztcclxuaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSAnZDMtZm9ybWF0JztcclxuXHJcbmltcG9ydCB7IGNhbGN1bGF0ZVZpZXdEaW1lbnNpb25zLCBWaWV3RGltZW5zaW9ucyB9IGZyb20gJy4uL2NvbW1vbi92aWV3LWRpbWVuc2lvbnMuaGVscGVyJztcclxuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY29sb3IuaGVscGVyJztcclxuaW1wb3J0IHsgQmFzZUNoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL2Jhc2UtY2hhcnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgdHJpbUxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL3RyaW0tbGFiZWwuaGVscGVyJztcclxuaW1wb3J0IHsgZ3JpZExheW91dCB9IGZyb20gJy4uL2NvbW1vbi9ncmlkLWxheW91dC5oZWxwZXInO1xyXG5pbXBvcnQgeyBmb3JtYXRMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbC5oZWxwZXInO1xyXG5pbXBvcnQgeyBEYXRhSXRlbSB9IGZyb20gJy4uL21vZGVscy9jaGFydC1kYXRhLm1vZGVsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LWNoYXJ0cy1waWUtZ3JpZCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZ3gtY2hhcnRzLWNoYXJ0IFt2aWV3XT1cIlt3aWR0aCwgaGVpZ2h0XVwiIFtzaG93TGVnZW5kXT1cImZhbHNlXCIgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiPlxyXG4gICAgICA8c3ZnOmcgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybVwiIGNsYXNzPVwicGllLWdyaWQgY2hhcnRcIj5cclxuICAgICAgICA8c3ZnOmcgKm5nRm9yPVwibGV0IHNlcmllcyBvZiBzZXJpZXNcIiBjbGFzcz1cInBpZS1ncmlkLWl0ZW1cIiBbYXR0ci50cmFuc2Zvcm1dPVwic2VyaWVzLnRyYW5zZm9ybVwiPlxyXG4gICAgICAgICAgPHN2ZzpnXHJcbiAgICAgICAgICAgIG5neC1jaGFydHMtcGllLWdyaWQtc2VyaWVzXHJcbiAgICAgICAgICAgIFtjb2xvcnNdPVwic2VyaWVzLmNvbG9yc1wiXHJcbiAgICAgICAgICAgIFtkYXRhXT1cInNlcmllcy5kYXRhXCJcclxuICAgICAgICAgICAgW2lubmVyUmFkaXVzXT1cInNlcmllcy5pbm5lclJhZGl1c1wiXHJcbiAgICAgICAgICAgIFtvdXRlclJhZGl1c109XCJzZXJpZXMub3V0ZXJSYWRpdXNcIlxyXG4gICAgICAgICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcclxuICAgICAgICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKCRldmVudClcIlxyXG4gICAgICAgICAgICBuZ3gtdG9vbHRpcFxyXG4gICAgICAgICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXHJcbiAgICAgICAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cIid0b3AnXCJcclxuICAgICAgICAgICAgW3Rvb2x0aXBUeXBlXT1cIid0b29sdGlwJ1wiXHJcbiAgICAgICAgICAgIFt0b29sdGlwVGl0bGVdPVwidG9vbHRpcFRlbXBsYXRlID8gdW5kZWZpbmVkIDogdG9vbHRpcFRleHQoeyBkYXRhOiBzZXJpZXMgfSlcIlxyXG4gICAgICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXHJcbiAgICAgICAgICAgIFt0b29sdGlwQ29udGV4dF09XCJzZXJpZXMuZGF0YVswXS5kYXRhXCJcclxuICAgICAgICAgICAgKGFjdGl2YXRlKT1cIm9uQWN0aXZhdGUoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgIChkZWFjdGl2YXRlKT1cIm9uRGVhY3RpdmF0ZSgkZXZlbnQpXCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8c3ZnOnRleHRcclxuICAgICAgICAgICAgKm5nSWY9XCJhbmltYXRpb25zXCJcclxuICAgICAgICAgICAgY2xhc3M9XCJsYWJlbCBwZXJjZW50LWxhYmVsXCJcclxuICAgICAgICAgICAgZHk9XCItMC41ZW1cIlxyXG4gICAgICAgICAgICB4PVwiMFwiXHJcbiAgICAgICAgICAgIHk9XCI1XCJcclxuICAgICAgICAgICAgbmd4LWNoYXJ0cy1jb3VudC11cFxyXG4gICAgICAgICAgICBbY291bnRUb109XCJzZXJpZXMucGVyY2VudFwiXHJcbiAgICAgICAgICAgIFtjb3VudFN1ZmZpeF09XCInJSdcIlxyXG4gICAgICAgICAgICB0ZXh0LWFuY2hvcj1cIm1pZGRsZVwiXHJcbiAgICAgICAgICA+PC9zdmc6dGV4dD5cclxuICAgICAgICAgIDxzdmc6dGV4dCAqbmdJZj1cIiFhbmltYXRpb25zXCIgY2xhc3M9XCJsYWJlbCBwZXJjZW50LWxhYmVsXCIgZHk9XCItMC41ZW1cIiB4PVwiMFwiIHk9XCI1XCIgdGV4dC1hbmNob3I9XCJtaWRkbGVcIj5cclxuICAgICAgICAgICAge3sgc2VyaWVzLnBlcmNlbnQudG9Mb2NhbGVTdHJpbmcoKSB9fVxyXG4gICAgICAgICAgPC9zdmc6dGV4dD5cclxuICAgICAgICAgIDxzdmc6dGV4dCBjbGFzcz1cImxhYmVsXCIgZHk9XCIwLjVlbVwiIHg9XCIwXCIgeT1cIjVcIiB0ZXh0LWFuY2hvcj1cIm1pZGRsZVwiPlxyXG4gICAgICAgICAgICB7eyBzZXJpZXMubGFiZWwgfX1cclxuICAgICAgICAgIDwvc3ZnOnRleHQ+XHJcbiAgICAgICAgICA8c3ZnOnRleHRcclxuICAgICAgICAgICAgKm5nSWY9XCJhbmltYXRpb25zXCJcclxuICAgICAgICAgICAgY2xhc3M9XCJsYWJlbFwiXHJcbiAgICAgICAgICAgIGR5PVwiMS4yM2VtXCJcclxuICAgICAgICAgICAgeD1cIjBcIlxyXG4gICAgICAgICAgICBbYXR0ci55XT1cInNlcmllcy5vdXRlclJhZGl1c1wiXHJcbiAgICAgICAgICAgIHRleHQtYW5jaG9yPVwibWlkZGxlXCJcclxuICAgICAgICAgICAgbmd4LWNoYXJ0cy1jb3VudC11cFxyXG4gICAgICAgICAgICBbY291bnRUb109XCJzZXJpZXMudG90YWxcIlxyXG4gICAgICAgICAgICBbY291bnRQcmVmaXhdPVwibGFiZWwgKyAnOiAnXCJcclxuICAgICAgICAgID48L3N2Zzp0ZXh0PlxyXG4gICAgICAgICAgPHN2Zzp0ZXh0XHJcbiAgICAgICAgICAgICpuZ0lmPVwiIWFuaW1hdGlvbnNcIlxyXG4gICAgICAgICAgICBjbGFzcz1cImxhYmVsXCJcclxuICAgICAgICAgICAgZHk9XCIxLjIzZW1cIlxyXG4gICAgICAgICAgICB4PVwiMFwiXHJcbiAgICAgICAgICAgIFthdHRyLnldPVwic2VyaWVzLm91dGVyUmFkaXVzXCJcclxuICAgICAgICAgICAgdGV4dC1hbmNob3I9XCJtaWRkbGVcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7eyBsYWJlbCB9fToge3sgc2VyaWVzLnRvdGFsLnRvTG9jYWxlU3RyaW5nKCkgfX1cclxuICAgICAgICAgIDwvc3ZnOnRleHQ+XHJcbiAgICAgICAgPC9zdmc6Zz5cclxuICAgICAgPC9zdmc6Zz5cclxuICAgIDwvbmd4LWNoYXJ0cy1jaGFydD5cclxuICBgLFxyXG4gIHN0eWxlVXJsczogWycuLi9jb21tb24vYmFzZS1jaGFydC5jb21wb25lbnQuc2NzcycsICcuL3BpZS1ncmlkLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGllR3JpZENvbXBvbmVudCBleHRlbmRzIEJhc2VDaGFydENvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgZGVzaWduYXRlZFRvdGFsOiBudW1iZXI7XHJcbiAgQElucHV0KCkgdG9vbHRpcERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgdG9vbHRpcFRleHQ6IChvOiBhbnkpID0+IGFueTtcclxuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nID0gJ1RvdGFsJztcclxuICBASW5wdXQoKSBtaW5XaWR0aDogbnVtYmVyID0gMTUwO1xyXG4gIEBJbnB1dCgpIGFjdGl2ZUVudHJpZXM6IGFueVtdID0gW107XHJcblxyXG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBkaW1zOiBWaWV3RGltZW5zaW9ucztcclxuICBkYXRhOiBhbnlbXTtcclxuICB0cmFuc2Zvcm06IHN0cmluZztcclxuICBzZXJpZXM6IGFueVtdO1xyXG4gIGRvbWFpbjogYW55W107XHJcbiAgY29sb3JTY2FsZTogQ29sb3JIZWxwZXI7XHJcbiAgbWFyZ2luID0gWzIwLCAyMCwgMjAsIDIwXTtcclxuXHJcbiAgQENvbnRlbnRDaGlsZCgndG9vbHRpcFRlbXBsYXRlJykgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICBzdXBlci51cGRhdGUoKTtcclxuXHJcbiAgICB0aGlzLmRpbXMgPSBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucyh7XHJcbiAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxyXG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxyXG4gICAgICBtYXJnaW5zOiB0aGlzLm1hcmdpblxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5mb3JtYXREYXRlcygpO1xyXG5cclxuICAgIHRoaXMuZG9tYWluID0gdGhpcy5nZXREb21haW4oKTtcclxuXHJcbiAgICB0aGlzLmRhdGEgPSBncmlkTGF5b3V0KHRoaXMuZGltcywgdGhpcy5yZXN1bHRzLCB0aGlzLm1pbldpZHRoLCB0aGlzLmRlc2lnbmF0ZWRUb3RhbCk7XHJcbiAgICB0aGlzLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt0aGlzLm1hcmdpblszXX0gLCAke3RoaXMubWFyZ2luWzBdfSlgO1xyXG5cclxuICAgIHRoaXMuc2VyaWVzID0gdGhpcy5nZXRTZXJpZXMoKTtcclxuICAgIHRoaXMuc2V0Q29sb3JzKCk7XHJcblxyXG4gICAgdGhpcy50b29sdGlwVGV4dCA9IHRoaXMudG9vbHRpcFRleHQgfHwgdGhpcy5kZWZhdWx0VG9vbHRpcFRleHQ7XHJcbiAgfVxyXG5cclxuICBkZWZhdWx0VG9vbHRpcFRleHQoeyBkYXRhIH0pOiBzdHJpbmcge1xyXG4gICAgY29uc3QgbGFiZWwgPSB0cmltTGFiZWwoZm9ybWF0TGFiZWwoZGF0YS5uYW1lKSk7XHJcbiAgICBjb25zdCB2YWwgPSBkYXRhLnZhbHVlLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtbGFiZWxcIj4ke2xhYmVsfTwvc3Bhbj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLXZhbFwiPiR7dmFsfTwvc3Bhbj5cclxuICAgIGA7XHJcbiAgfVxyXG5cclxuICBnZXREb21haW4oKTogYW55W10ge1xyXG4gICAgcmV0dXJuIHRoaXMucmVzdWx0cy5tYXAoZCA9PiBkLmxhYmVsKTtcclxuICB9XHJcblxyXG4gIGdldFNlcmllcygpOiBhbnlbXSB7XHJcbiAgICBjb25zdCB0b3RhbCA9IHRoaXMuZGVzaWduYXRlZFRvdGFsID8gdGhpcy5kZXNpZ25hdGVkVG90YWwgOiB0aGlzLmdldFRvdGFsKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZGF0YS5tYXAoZCA9PiB7XHJcbiAgICAgIGNvbnN0IGJhc2VsaW5lTGFiZWxIZWlnaHQgPSAyMDtcclxuICAgICAgY29uc3QgcGFkZGluZyA9IDEwO1xyXG4gICAgICBjb25zdCBuYW1lID0gZC5kYXRhLm5hbWU7XHJcbiAgICAgIGNvbnN0IGxhYmVsID0gZm9ybWF0TGFiZWwobmFtZSk7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gZC5kYXRhLnZhbHVlO1xyXG4gICAgICBjb25zdCByYWRpdXMgPSBtaW4oW2Qud2lkdGggLSBwYWRkaW5nLCBkLmhlaWdodCAtIGJhc2VsaW5lTGFiZWxIZWlnaHRdKSAvIDIgLSA1O1xyXG4gICAgICBjb25zdCBpbm5lclJhZGl1cyA9IHJhZGl1cyAqIDAuOTtcclxuXHJcbiAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgIGNvbnN0IGNvbG9ycyA9ICgpID0+IHtcclxuICAgICAgICBjb3VudCArPSAxO1xyXG4gICAgICAgIGlmIChjb3VudCA9PT0gMSkge1xyXG4gICAgICAgICAgcmV0dXJuICdyZ2JhKDEwMCwxMDAsMTAwLDAuMyknO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5jb2xvclNjYWxlLmdldENvbG9yKGxhYmVsKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjb25zdCB4UG9zID0gZC54ICsgKGQud2lkdGggLSBwYWRkaW5nKSAvIDI7XHJcbiAgICAgIGNvbnN0IHlQb3MgPSBkLnkgKyAoZC5oZWlnaHQgLSBiYXNlbGluZUxhYmVsSGVpZ2h0KSAvIDI7XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZSgke3hQb3N9LCAke3lQb3N9KWAsXHJcbiAgICAgICAgY29sb3JzLFxyXG4gICAgICAgIGlubmVyUmFkaXVzLFxyXG4gICAgICAgIG91dGVyUmFkaXVzOiByYWRpdXMsXHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICBsYWJlbDogdHJpbUxhYmVsKGxhYmVsKSxcclxuICAgICAgICB0b3RhbDogdmFsdWUsXHJcbiAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgcGVyY2VudDogZm9ybWF0KCcuMSUnKShkLmRhdGEucGVyY2VudCksXHJcbiAgICAgICAgZGF0YTogW1xyXG4gICAgICAgICAgZCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgIG90aGVyOiB0cnVlLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiB0b3RhbCAtIHZhbHVlLFxyXG4gICAgICAgICAgICAgIG5hbWU6IGQuZGF0YS5uYW1lXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldFRvdGFsKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZXN1bHRzLm1hcChkID0+IGQudmFsdWUpLnJlZHVjZSgoc3VtLCBkKSA9PiBzdW0gKyBkLCAwKTtcclxuICB9XHJcblxyXG4gIG9uQ2xpY2soZGF0YTogRGF0YUl0ZW0pOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XHJcbiAgfVxyXG5cclxuICBzZXRDb2xvcnMoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNvbG9yU2NhbGUgPSBuZXcgQ29sb3JIZWxwZXIodGhpcy5zY2hlbWUsICdvcmRpbmFsJywgdGhpcy5kb21haW4sIHRoaXMuY3VzdG9tQ29sb3JzKTtcclxuICB9XHJcblxyXG4gIG9uQWN0aXZhdGUoaXRlbSwgZnJvbUxlZ2VuZCA9IGZhbHNlKSB7XHJcbiAgICBpdGVtID0gdGhpcy5yZXN1bHRzLmZpbmQoZCA9PiB7XHJcbiAgICAgIGlmIChmcm9tTGVnZW5kKSB7XHJcbiAgICAgICAgcmV0dXJuIGQubGFiZWwgPT09IGl0ZW0ubmFtZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZC5uYW1lID09PSBpdGVtLm5hbWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGlkeCA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kSW5kZXgoZCA9PiB7XHJcbiAgICAgIHJldHVybiBkLm5hbWUgPT09IGl0ZW0ubmFtZSAmJiBkLnZhbHVlID09PSBpdGVtLnZhbHVlICYmIGQuc2VyaWVzID09PSBpdGVtLnNlcmllcztcclxuICAgIH0pO1xyXG4gICAgaWYgKGlkeCA+IC0xKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFjdGl2ZUVudHJpZXMgPSBbaXRlbSwgLi4udGhpcy5hY3RpdmVFbnRyaWVzXTtcclxuICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7IHZhbHVlOiBpdGVtLCBlbnRyaWVzOiB0aGlzLmFjdGl2ZUVudHJpZXMgfSk7XHJcbiAgfVxyXG5cclxuICBvbkRlYWN0aXZhdGUoaXRlbSwgZnJvbUxlZ2VuZCA9IGZhbHNlKSB7XHJcbiAgICBpdGVtID0gdGhpcy5yZXN1bHRzLmZpbmQoZCA9PiB7XHJcbiAgICAgIGlmIChmcm9tTGVnZW5kKSB7XHJcbiAgICAgICAgcmV0dXJuIGQubGFiZWwgPT09IGl0ZW0ubmFtZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZC5uYW1lID09PSBpdGVtLm5hbWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGlkeCA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kSW5kZXgoZCA9PiB7XHJcbiAgICAgIHJldHVybiBkLm5hbWUgPT09IGl0ZW0ubmFtZSAmJiBkLnZhbHVlID09PSBpdGVtLnZhbHVlICYmIGQuc2VyaWVzID09PSBpdGVtLnNlcmllcztcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYWN0aXZlRW50cmllcy5zcGxpY2UoaWR4LCAxKTtcclxuICAgIHRoaXMuYWN0aXZlRW50cmllcyA9IFsuLi50aGlzLmFjdGl2ZUVudHJpZXNdO1xyXG5cclxuICAgIHRoaXMuZGVhY3RpdmF0ZS5lbWl0KHsgdmFsdWU6IGl0ZW0sIGVudHJpZXM6IHRoaXMuYWN0aXZlRW50cmllcyB9KTtcclxuICB9XHJcbn1cclxuIl19