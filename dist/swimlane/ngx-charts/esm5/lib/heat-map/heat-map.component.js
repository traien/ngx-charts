import { __decorate, __extends, __read, __spread, __values } from "tslib";
import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, ContentChild, Output, EventEmitter } from '@angular/core';
import { scaleBand } from 'd3-scale';
import { BaseChartComponent } from '../common/base-chart.component';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { getScaleType } from '../common/domain.helper';
var HeatMapComponent = /** @class */ (function (_super) {
    __extends(HeatMapComponent, _super);
    function HeatMapComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.innerPadding = 8;
        _this.trimXAxisTicks = true;
        _this.trimYAxisTicks = true;
        _this.rotateXAxisTicks = true;
        _this.maxXAxisTickLength = 16;
        _this.maxYAxisTickLength = 16;
        _this.tooltipDisabled = false;
        _this.activeEntries = [];
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.scaleType = 'linear';
        return _this;
    }
    HeatMapComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.formatDates();
        this.xDomain = this.getXDomain();
        this.yDomain = this.getYDomain();
        this.valueDomain = this.getValueDomain();
        this.scaleType = getScaleType(this.valueDomain, false);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.scaleType,
            legendPosition: this.legendPosition
        });
        if (this.scaleType === 'linear') {
            var min = this.min;
            var max = this.max;
            if (!this.min) {
                min = Math.min.apply(Math, __spread([0], this.valueDomain));
            }
            if (!this.max) {
                max = Math.max.apply(Math, __spread(this.valueDomain));
            }
            this.valueDomain = [min, max];
        }
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        this.rects = this.getRects();
    };
    HeatMapComponent.prototype.getXDomain = function () {
        var e_1, _a;
        var domain = [];
        try {
            for (var _b = __values(this.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                var group = _c.value;
                if (!domain.includes(group.name)) {
                    domain.push(group.name);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return domain;
    };
    HeatMapComponent.prototype.getYDomain = function () {
        var e_2, _a, e_3, _b;
        var domain = [];
        try {
            for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                var group = _d.value;
                try {
                    for (var _e = (e_3 = void 0, __values(group.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var d = _f.value;
                        if (!domain.includes(d.name)) {
                            domain.push(d.name);
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return domain;
    };
    HeatMapComponent.prototype.getValueDomain = function () {
        var e_4, _a, e_5, _b;
        var domain = [];
        try {
            for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                var group = _d.value;
                try {
                    for (var _e = (e_5 = void 0, __values(group.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var d = _f.value;
                        if (!domain.includes(d.value)) {
                            domain.push(d.value);
                        }
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return domain;
    };
    /**
     * Converts the input to gap paddingInner in fraction
     * Supports the following inputs:
     *    Numbers: 8
     *    Strings: "8", "8px", "8%"
     *    Arrays: [8,2], "8,2", "[8,2]"
     *    Mixed: [8,"2%"], ["8px","2%"], "8,2%", "[8,2%]"
     *
     * @memberOf HeatMapComponent
     */
    HeatMapComponent.prototype.getDimension = function (value, index, N, L) {
        if (index === void 0) { index = 0; }
        if (typeof value === 'string') {
            value = value
                .replace('[', '')
                .replace(']', '')
                .replace('px', '')
                // tslint:disable-next-line: quotemark
                .replace("'", '');
            if (value.includes(',')) {
                value = value.split(',');
            }
        }
        if (Array.isArray(value) && typeof index === 'number') {
            return this.getDimension(value[index], null, N, L);
        }
        if (typeof value === 'string' && value.includes('%')) {
            return +value.replace('%', '') / 100;
        }
        return N / (L / +value + 1);
    };
    HeatMapComponent.prototype.getXScale = function () {
        var f = this.getDimension(this.innerPadding, 0, this.xDomain.length, this.dims.width);
        return scaleBand()
            .rangeRound([0, this.dims.width])
            .domain(this.xDomain)
            .paddingInner(f);
    };
    HeatMapComponent.prototype.getYScale = function () {
        var f = this.getDimension(this.innerPadding, 1, this.yDomain.length, this.dims.height);
        return scaleBand()
            .rangeRound([this.dims.height, 0])
            .domain(this.yDomain)
            .paddingInner(f);
    };
    HeatMapComponent.prototype.getRects = function () {
        var _this = this;
        var rects = [];
        this.xDomain.map(function (xVal) {
            _this.yDomain.map(function (yVal) {
                rects.push({
                    x: _this.xScale(xVal),
                    y: _this.yScale(yVal),
                    rx: 3,
                    width: _this.xScale.bandwidth(),
                    height: _this.yScale.bandwidth(),
                    fill: 'rgba(200,200,200,0.03)'
                });
            });
        });
        return rects;
    };
    HeatMapComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    HeatMapComponent.prototype.setColors = function () {
        this.colors = new ColorHelper(this.scheme, this.scaleType, this.valueDomain);
    };
    HeatMapComponent.prototype.getLegendOptions = function () {
        return {
            scaleType: this.scaleType,
            domain: this.valueDomain,
            colors: this.scaleType === 'ordinal' ? this.colors : this.colors.scale,
            title: this.scaleType === 'ordinal' ? this.legendTitle : undefined,
            position: this.legendPosition
        };
    };
    HeatMapComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    HeatMapComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    HeatMapComponent.prototype.onActivate = function (event, group, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var items = this.results
            .map(function (g) { return g.series; })
            .flat()
            .filter(function (i) {
            if (fromLegend) {
                return i.label === item.name;
            }
            else {
                return i.name === item.name && i.series === item.series;
            }
        });
        this.activeEntries = __spread(items);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    HeatMapComponent.prototype.onDeactivate = function (event, group, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        this.activeEntries = this.activeEntries.filter(function (i) {
            if (fromLegend) {
                return i.label !== item.name;
            }
            else {
                return !(i.name === item.name && i.series === item.series);
            }
        });
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    __decorate([
        Input()
    ], HeatMapComponent.prototype, "legend", void 0);
    __decorate([
        Input()
    ], HeatMapComponent.prototype, "legendTitle", void 0);
    __decorate([
        Input()
    ], HeatMapComponent.prototype, "legendPosition", void 0);
    __decorate([
        Input()
    ], HeatMapComponent.prototype, "xAxis", void 0);
    __decorate([
        Input()
    ], HeatMapComponent.prototype, "yAxis", void 0);
    __decorate([
        Input()
    ], HeatMapComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input()
    ], HeatMapComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input()
    ], HeatMapComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        Input()
    ], HeatMapComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        Input()
    ], HeatMapComponent.prototype, "gradient", void 0);
    __decorate([
        Input()
    ], HeatMapComponent.prototype, "innerPadding", void 0);
    __decorate([
        Input()
    ], HeatMapComponent.prototype, "trimXAxisTicks", void 0);
    __decorate([
        Input()
    ], HeatMapComponent.prototype, "trimYAxisTicks", void 0);
    __decorate([
        Input()
    ], HeatMapComponent.prototype, "rotateXAxisTicks", void 0);
    __decorate([
        Input()
    ], HeatMapComponent.prototype, "maxXAxisTickLength", void 0);
    __decorate([
        Input()
    ], HeatMapComponent.prototype, "maxYAxisTickLength", void 0);
    __decorate([
        Input()
    ], HeatMapComponent.prototype, "xAxisTickFormatting", void 0);
    __decorate([
        Input()
    ], HeatMapComponent.prototype, "yAxisTickFormatting", void 0);
    __decorate([
        Input()
    ], HeatMapComponent.prototype, "xAxisTicks", void 0);
    __decorate([
        Input()
    ], HeatMapComponent.prototype, "yAxisTicks", void 0);
    __decorate([
        Input()
    ], HeatMapComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input()
    ], HeatMapComponent.prototype, "tooltipText", void 0);
    __decorate([
        Input()
    ], HeatMapComponent.prototype, "min", void 0);
    __decorate([
        Input()
    ], HeatMapComponent.prototype, "max", void 0);
    __decorate([
        Input()
    ], HeatMapComponent.prototype, "activeEntries", void 0);
    __decorate([
        Output()
    ], HeatMapComponent.prototype, "activate", void 0);
    __decorate([
        Output()
    ], HeatMapComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate')
    ], HeatMapComponent.prototype, "tooltipTemplate", void 0);
    HeatMapComponent = __decorate([
        Component({
            selector: 'ngx-charts-heat-map',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [animations]=\"animations\"\n      [legendOptions]=\"legendOptions\"\n      (legendLabelClick)=\"onClick($event)\"\n    >\n      <svg:g [attr.transform]=\"transform\" class=\"heat-map chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:rect\n          *ngFor=\"let rect of rects\"\n          [attr.x]=\"rect.x\"\n          [attr.y]=\"rect.y\"\n          [attr.rx]=\"rect.rx\"\n          [attr.width]=\"rect.width\"\n          [attr.height]=\"rect.height\"\n          [attr.fill]=\"rect.fill\"\n        />\n        <svg:g\n          ngx-charts-heat-map-cell-series\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [data]=\"results\"\n          [gradient]=\"gradient\"\n          [animations]=\"animations\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [tooltipText]=\"tooltipText\"\n          (select)=\"onClick($event)\"\n          (activate)=\"onActivate($event, undefined)\"\n          (deactivate)=\"onDeactivate($event, undefined)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
        })
    ], HeatMapComponent);
    return HeatMapComponent;
}(BaseChartComponent));
export { HeatMapComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhdC1tYXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvaGVhdC1tYXAvaGVhdC1tYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLFlBQVksRUFFWixNQUFNLEVBQ04sWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFckMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLHVCQUF1QixFQUFrQixNQUFNLGtDQUFrQyxDQUFDO0FBQzNGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUF1RXZEO0lBQXNDLG9DQUFrQjtJQUF4RDtRQUFBLHFFQTRRQztRQTFRVSxpQkFBVyxHQUFXLFFBQVEsQ0FBQztRQUMvQixvQkFBYyxHQUFXLE9BQU8sQ0FBQztRQVFqQyxrQkFBWSxHQUFzQixDQUFDLENBQUM7UUFDcEMsb0JBQWMsR0FBWSxJQUFJLENBQUM7UUFDL0Isb0JBQWMsR0FBWSxJQUFJLENBQUM7UUFDL0Isc0JBQWdCLEdBQVksSUFBSSxDQUFDO1FBQ2pDLHdCQUFrQixHQUFXLEVBQUUsQ0FBQztRQUNoQyx3QkFBa0IsR0FBVyxFQUFFLENBQUM7UUFLaEMscUJBQWUsR0FBWSxLQUFLLENBQUM7UUFJakMsbUJBQWEsR0FBVSxFQUFFLENBQUM7UUFFekIsY0FBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pELGdCQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFlN0QsWUFBTSxHQUFHLENBQUMsRUFBRSxFQUFF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LEVBQUU7aUVBQTBCO0lBQ3pCO1FBQVIsS0FBSyxFQUFFO2lFQUEwQjtJQUN6QjtRQUFSLEtBQUssRUFBRTt3REFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7d0RBQW1CO0lBQ2xCO1FBQVIsS0FBSyxFQUFFOzZEQUFrQztJQUNqQztRQUFSLEtBQUssRUFBRTt5REFBa0I7SUFDakI7UUFBUixLQUFLLEVBQUU7aURBQVU7SUFDVDtRQUFSLEtBQUssRUFBRTtpREFBVTtJQUNUO1FBQVIsS0FBSyxFQUFFOzJEQUEyQjtJQUV6QjtRQUFULE1BQU0sRUFBRTtzREFBa0Q7SUFDakQ7UUFBVCxNQUFNLEVBQUU7d0RBQW9EO0lBRTVCO1FBQWhDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQzs2REFBbUM7SUE5QnhELGdCQUFnQjtRQXJFNUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixRQUFRLEVBQUUsa25FQThEVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1lBRS9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztTQUN0QyxDQUFDO09BQ1csZ0JBQWdCLENBNFE1QjtJQUFELHVCQUFDO0NBQUEsQUE1UUQsQ0FBc0Msa0JBQWtCLEdBNFF2RDtTQTVRWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBWaWV3RW5jYXBzdWxhdGlvbixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDb250ZW50Q2hpbGQsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBzY2FsZUJhbmQgfSBmcm9tICdkMy1zY2FsZSc7XHJcblxyXG5pbXBvcnQgeyBCYXNlQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuLi9jb21tb24vYmFzZS1jaGFydC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucywgVmlld0RpbWVuc2lvbnMgfSBmcm9tICcuLi9jb21tb24vdmlldy1kaW1lbnNpb25zLmhlbHBlcic7XHJcbmltcG9ydCB7IENvbG9ySGVscGVyIH0gZnJvbSAnLi4vY29tbW9uL2NvbG9yLmhlbHBlcic7XHJcbmltcG9ydCB7IGdldFNjYWxlVHlwZSB9IGZyb20gJy4uL2NvbW1vbi9kb21haW4uaGVscGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LWNoYXJ0cy1oZWF0LW1hcCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZ3gtY2hhcnRzLWNoYXJ0XHJcbiAgICAgIFt2aWV3XT1cIlt3aWR0aCwgaGVpZ2h0XVwiXHJcbiAgICAgIFtzaG93TGVnZW5kXT1cImxlZ2VuZFwiXHJcbiAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxyXG4gICAgICBbbGVnZW5kT3B0aW9uc109XCJsZWdlbmRPcHRpb25zXCJcclxuICAgICAgKGxlZ2VuZExhYmVsQ2xpY2spPVwib25DbGljaygkZXZlbnQpXCJcclxuICAgID5cclxuICAgICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIiBjbGFzcz1cImhlYXQtbWFwIGNoYXJ0XCI+XHJcbiAgICAgICAgPHN2ZzpnXHJcbiAgICAgICAgICBuZ3gtY2hhcnRzLXgtYXhpc1xyXG4gICAgICAgICAgKm5nSWY9XCJ4QXhpc1wiXHJcbiAgICAgICAgICBbeFNjYWxlXT1cInhTY2FsZVwiXHJcbiAgICAgICAgICBbZGltc109XCJkaW1zXCJcclxuICAgICAgICAgIFtzaG93TGFiZWxdPVwic2hvd1hBeGlzTGFiZWxcIlxyXG4gICAgICAgICAgW2xhYmVsVGV4dF09XCJ4QXhpc0xhYmVsXCJcclxuICAgICAgICAgIFt0cmltVGlja3NdPVwidHJpbVhBeGlzVGlja3NcIlxyXG4gICAgICAgICAgW3JvdGF0ZVRpY2tzXT1cInJvdGF0ZVhBeGlzVGlja3NcIlxyXG4gICAgICAgICAgW21heFRpY2tMZW5ndGhdPVwibWF4WEF4aXNUaWNrTGVuZ3RoXCJcclxuICAgICAgICAgIFt0aWNrRm9ybWF0dGluZ109XCJ4QXhpc1RpY2tGb3JtYXR0aW5nXCJcclxuICAgICAgICAgIFt0aWNrc109XCJ4QXhpc1RpY2tzXCJcclxuICAgICAgICAgIChkaW1lbnNpb25zQ2hhbmdlZCk9XCJ1cGRhdGVYQXhpc0hlaWdodCgkZXZlbnQpXCJcclxuICAgICAgICA+PC9zdmc6Zz5cclxuICAgICAgICA8c3ZnOmdcclxuICAgICAgICAgIG5neC1jaGFydHMteS1heGlzXHJcbiAgICAgICAgICAqbmdJZj1cInlBeGlzXCJcclxuICAgICAgICAgIFt5U2NhbGVdPVwieVNjYWxlXCJcclxuICAgICAgICAgIFtkaW1zXT1cImRpbXNcIlxyXG4gICAgICAgICAgW3Nob3dMYWJlbF09XCJzaG93WUF4aXNMYWJlbFwiXHJcbiAgICAgICAgICBbbGFiZWxUZXh0XT1cInlBeGlzTGFiZWxcIlxyXG4gICAgICAgICAgW3RyaW1UaWNrc109XCJ0cmltWUF4aXNUaWNrc1wiXHJcbiAgICAgICAgICBbbWF4VGlja0xlbmd0aF09XCJtYXhZQXhpc1RpY2tMZW5ndGhcIlxyXG4gICAgICAgICAgW3RpY2tGb3JtYXR0aW5nXT1cInlBeGlzVGlja0Zvcm1hdHRpbmdcIlxyXG4gICAgICAgICAgW3RpY2tzXT1cInlBeGlzVGlja3NcIlxyXG4gICAgICAgICAgKGRpbWVuc2lvbnNDaGFuZ2VkKT1cInVwZGF0ZVlBeGlzV2lkdGgoJGV2ZW50KVwiXHJcbiAgICAgICAgPjwvc3ZnOmc+XHJcbiAgICAgICAgPHN2ZzpyZWN0XHJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgcmVjdCBvZiByZWN0c1wiXHJcbiAgICAgICAgICBbYXR0ci54XT1cInJlY3QueFwiXHJcbiAgICAgICAgICBbYXR0ci55XT1cInJlY3QueVwiXHJcbiAgICAgICAgICBbYXR0ci5yeF09XCJyZWN0LnJ4XCJcclxuICAgICAgICAgIFthdHRyLndpZHRoXT1cInJlY3Qud2lkdGhcIlxyXG4gICAgICAgICAgW2F0dHIuaGVpZ2h0XT1cInJlY3QuaGVpZ2h0XCJcclxuICAgICAgICAgIFthdHRyLmZpbGxdPVwicmVjdC5maWxsXCJcclxuICAgICAgICAvPlxyXG4gICAgICAgIDxzdmc6Z1xyXG4gICAgICAgICAgbmd4LWNoYXJ0cy1oZWF0LW1hcC1jZWxsLXNlcmllc1xyXG4gICAgICAgICAgW3hTY2FsZV09XCJ4U2NhbGVcIlxyXG4gICAgICAgICAgW3lTY2FsZV09XCJ5U2NhbGVcIlxyXG4gICAgICAgICAgW2NvbG9yc109XCJjb2xvcnNcIlxyXG4gICAgICAgICAgW2RhdGFdPVwicmVzdWx0c1wiXHJcbiAgICAgICAgICBbZ3JhZGllbnRdPVwiZ3JhZGllbnRcIlxyXG4gICAgICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXHJcbiAgICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXHJcbiAgICAgICAgICBbdG9vbHRpcFRleHRdPVwidG9vbHRpcFRleHRcIlxyXG4gICAgICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKCRldmVudClcIlxyXG4gICAgICAgICAgKGFjdGl2YXRlKT1cIm9uQWN0aXZhdGUoJGV2ZW50LCB1bmRlZmluZWQpXCJcclxuICAgICAgICAgIChkZWFjdGl2YXRlKT1cIm9uRGVhY3RpdmF0ZSgkZXZlbnQsIHVuZGVmaW5lZClcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvc3ZnOmc+XHJcbiAgICA8L25neC1jaGFydHMtY2hhcnQ+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBzdHlsZVVybHM6IFsnLi4vY29tbW9uL2Jhc2UtY2hhcnQuY29tcG9uZW50LnNjc3MnXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBIZWF0TWFwQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNoYXJ0Q29tcG9uZW50IHtcclxuICBASW5wdXQoKSBsZWdlbmQ7XHJcbiAgQElucHV0KCkgbGVnZW5kVGl0bGU6IHN0cmluZyA9ICdMZWdlbmQnO1xyXG4gIEBJbnB1dCgpIGxlZ2VuZFBvc2l0aW9uOiBzdHJpbmcgPSAncmlnaHQnO1xyXG4gIEBJbnB1dCgpIHhBeGlzO1xyXG4gIEBJbnB1dCgpIHlBeGlzO1xyXG4gIEBJbnB1dCgpIHNob3dYQXhpc0xhYmVsO1xyXG4gIEBJbnB1dCgpIHNob3dZQXhpc0xhYmVsO1xyXG4gIEBJbnB1dCgpIHhBeGlzTGFiZWw7XHJcbiAgQElucHV0KCkgeUF4aXNMYWJlbDtcclxuICBASW5wdXQoKSBncmFkaWVudDogYm9vbGVhbjtcclxuICBASW5wdXQoKSBpbm5lclBhZGRpbmc6IG51bWJlciB8IG51bWJlcltdID0gODtcclxuICBASW5wdXQoKSB0cmltWEF4aXNUaWNrczogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCkgdHJpbVlBeGlzVGlja3M6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIHJvdGF0ZVhBeGlzVGlja3M6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIG1heFhBeGlzVGlja0xlbmd0aDogbnVtYmVyID0gMTY7XHJcbiAgQElucHV0KCkgbWF4WUF4aXNUaWNrTGVuZ3RoOiBudW1iZXIgPSAxNjtcclxuICBASW5wdXQoKSB4QXhpc1RpY2tGb3JtYXR0aW5nOiBhbnk7XHJcbiAgQElucHV0KCkgeUF4aXNUaWNrRm9ybWF0dGluZzogYW55O1xyXG4gIEBJbnB1dCgpIHhBeGlzVGlja3M6IGFueVtdO1xyXG4gIEBJbnB1dCgpIHlBeGlzVGlja3M6IGFueVtdO1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBUZXh0OiBhbnk7XHJcbiAgQElucHV0KCkgbWluOiBhbnk7XHJcbiAgQElucHV0KCkgbWF4OiBhbnk7XHJcbiAgQElucHV0KCkgYWN0aXZlRW50cmllczogYW55W10gPSBbXTtcclxuXHJcbiAgQE91dHB1dCgpIGFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBDb250ZW50Q2hpbGQoJ3Rvb2x0aXBUZW1wbGF0ZScpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgZGltczogVmlld0RpbWVuc2lvbnM7XHJcbiAgeERvbWFpbjogYW55W107XHJcbiAgeURvbWFpbjogYW55W107XHJcbiAgdmFsdWVEb21haW46IGFueVtdO1xyXG4gIHhTY2FsZTogYW55O1xyXG4gIHlTY2FsZTogYW55O1xyXG4gIGNvbG9yOiBhbnk7XHJcbiAgY29sb3JzOiBDb2xvckhlbHBlcjtcclxuICBjb2xvclNjYWxlOiBhbnk7XHJcbiAgdHJhbnNmb3JtOiBzdHJpbmc7XHJcbiAgcmVjdHM6IGFueVtdO1xyXG4gIG1hcmdpbiA9IFsxMCwgMjAsIDEwLCAyMF07XHJcbiAgeEF4aXNIZWlnaHQ6IG51bWJlciA9IDA7XHJcbiAgeUF4aXNXaWR0aDogbnVtYmVyID0gMDtcclxuICBsZWdlbmRPcHRpb25zOiBhbnk7XHJcbiAgc2NhbGVUeXBlOiBzdHJpbmcgPSAnbGluZWFyJztcclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgc3VwZXIudXBkYXRlKCk7XHJcblxyXG4gICAgdGhpcy5mb3JtYXREYXRlcygpO1xyXG5cclxuICAgIHRoaXMueERvbWFpbiA9IHRoaXMuZ2V0WERvbWFpbigpO1xyXG4gICAgdGhpcy55RG9tYWluID0gdGhpcy5nZXRZRG9tYWluKCk7XHJcbiAgICB0aGlzLnZhbHVlRG9tYWluID0gdGhpcy5nZXRWYWx1ZURvbWFpbigpO1xyXG5cclxuICAgIHRoaXMuc2NhbGVUeXBlID0gZ2V0U2NhbGVUeXBlKHRoaXMudmFsdWVEb21haW4sIGZhbHNlKTtcclxuXHJcbiAgICB0aGlzLmRpbXMgPSBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucyh7XHJcbiAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxyXG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxyXG4gICAgICBtYXJnaW5zOiB0aGlzLm1hcmdpbixcclxuICAgICAgc2hvd1hBeGlzOiB0aGlzLnhBeGlzLFxyXG4gICAgICBzaG93WUF4aXM6IHRoaXMueUF4aXMsXHJcbiAgICAgIHhBeGlzSGVpZ2h0OiB0aGlzLnhBeGlzSGVpZ2h0LFxyXG4gICAgICB5QXhpc1dpZHRoOiB0aGlzLnlBeGlzV2lkdGgsXHJcbiAgICAgIHNob3dYTGFiZWw6IHRoaXMuc2hvd1hBeGlzTGFiZWwsXHJcbiAgICAgIHNob3dZTGFiZWw6IHRoaXMuc2hvd1lBeGlzTGFiZWwsXHJcbiAgICAgIHNob3dMZWdlbmQ6IHRoaXMubGVnZW5kLFxyXG4gICAgICBsZWdlbmRUeXBlOiB0aGlzLnNjYWxlVHlwZSxcclxuICAgICAgbGVnZW5kUG9zaXRpb246IHRoaXMubGVnZW5kUG9zaXRpb25cclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ2xpbmVhcicpIHtcclxuICAgICAgbGV0IG1pbiA9IHRoaXMubWluO1xyXG4gICAgICBsZXQgbWF4ID0gdGhpcy5tYXg7XHJcbiAgICAgIGlmICghdGhpcy5taW4pIHtcclxuICAgICAgICBtaW4gPSBNYXRoLm1pbigwLCAuLi50aGlzLnZhbHVlRG9tYWluKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIXRoaXMubWF4KSB7XHJcbiAgICAgICAgbWF4ID0gTWF0aC5tYXgoLi4udGhpcy52YWx1ZURvbWFpbik7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy52YWx1ZURvbWFpbiA9IFttaW4sIG1heF07XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy54U2NhbGUgPSB0aGlzLmdldFhTY2FsZSgpO1xyXG4gICAgdGhpcy55U2NhbGUgPSB0aGlzLmdldFlTY2FsZSgpO1xyXG5cclxuICAgIHRoaXMuc2V0Q29sb3JzKCk7XHJcbiAgICB0aGlzLmxlZ2VuZE9wdGlvbnMgPSB0aGlzLmdldExlZ2VuZE9wdGlvbnMoKTtcclxuXHJcbiAgICB0aGlzLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt0aGlzLmRpbXMueE9mZnNldH0gLCAke3RoaXMubWFyZ2luWzBdfSlgO1xyXG4gICAgdGhpcy5yZWN0cyA9IHRoaXMuZ2V0UmVjdHMoKTtcclxuICB9XHJcblxyXG4gIGdldFhEb21haW4oKTogYW55IHtcclxuICAgIGNvbnN0IGRvbWFpbiA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBncm91cCBvZiB0aGlzLnJlc3VsdHMpIHtcclxuICAgICAgaWYgKCFkb21haW4uaW5jbHVkZXMoZ3JvdXAubmFtZSkpIHtcclxuICAgICAgICBkb21haW4ucHVzaChncm91cC5uYW1lKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkb21haW47XHJcbiAgfVxyXG5cclxuICBnZXRZRG9tYWluKCk6IGFueVtdIHtcclxuICAgIGNvbnN0IGRvbWFpbiA9IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgdGhpcy5yZXN1bHRzKSB7XHJcbiAgICAgIGZvciAoY29uc3QgZCBvZiBncm91cC5zZXJpZXMpIHtcclxuICAgICAgICBpZiAoIWRvbWFpbi5pbmNsdWRlcyhkLm5hbWUpKSB7XHJcbiAgICAgICAgICBkb21haW4ucHVzaChkLm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkb21haW47XHJcbiAgfVxyXG5cclxuICBnZXRWYWx1ZURvbWFpbigpOiBhbnlbXSB7XHJcbiAgICBjb25zdCBkb21haW4gPSBbXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIHRoaXMucmVzdWx0cykge1xyXG4gICAgICBmb3IgKGNvbnN0IGQgb2YgZ3JvdXAuc2VyaWVzKSB7XHJcbiAgICAgICAgaWYgKCFkb21haW4uaW5jbHVkZXMoZC52YWx1ZSkpIHtcclxuICAgICAgICAgIGRvbWFpbi5wdXNoKGQudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkb21haW47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb252ZXJ0cyB0aGUgaW5wdXQgdG8gZ2FwIHBhZGRpbmdJbm5lciBpbiBmcmFjdGlvblxyXG4gICAqIFN1cHBvcnRzIHRoZSBmb2xsb3dpbmcgaW5wdXRzOlxyXG4gICAqICAgIE51bWJlcnM6IDhcclxuICAgKiAgICBTdHJpbmdzOiBcIjhcIiwgXCI4cHhcIiwgXCI4JVwiXHJcbiAgICogICAgQXJyYXlzOiBbOCwyXSwgXCI4LDJcIiwgXCJbOCwyXVwiXHJcbiAgICogICAgTWl4ZWQ6IFs4LFwiMiVcIl0sIFtcIjhweFwiLFwiMiVcIl0sIFwiOCwyJVwiLCBcIls4LDIlXVwiXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgSGVhdE1hcENvbXBvbmVudFxyXG4gICAqL1xyXG4gIGdldERpbWVuc2lvbih2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgQXJyYXk8c3RyaW5nIHwgbnVtYmVyPiwgaW5kZXggPSAwLCBOOiBudW1iZXIsIEw6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICB2YWx1ZSA9IHZhbHVlXHJcbiAgICAgICAgLnJlcGxhY2UoJ1snLCAnJylcclxuICAgICAgICAucmVwbGFjZSgnXScsICcnKVxyXG4gICAgICAgIC5yZXBsYWNlKCdweCcsICcnKVxyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogcXVvdGVtYXJrXHJcbiAgICAgICAgLnJlcGxhY2UoXCInXCIsICcnKTtcclxuXHJcbiAgICAgIGlmICh2YWx1ZS5pbmNsdWRlcygnLCcpKSB7XHJcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5zcGxpdCgnLCcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdHlwZW9mIGluZGV4ID09PSAnbnVtYmVyJykge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXREaW1lbnNpb24odmFsdWVbaW5kZXhdLCBudWxsLCBOLCBMKTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLmluY2x1ZGVzKCclJykpIHtcclxuICAgICAgcmV0dXJuICt2YWx1ZS5yZXBsYWNlKCclJywgJycpIC8gMTAwO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIE4gLyAoTCAvICt2YWx1ZSArIDEpO1xyXG4gIH1cclxuXHJcbiAgZ2V0WFNjYWxlKCk6IGFueSB7XHJcbiAgICBjb25zdCBmID0gdGhpcy5nZXREaW1lbnNpb24odGhpcy5pbm5lclBhZGRpbmcsIDAsIHRoaXMueERvbWFpbi5sZW5ndGgsIHRoaXMuZGltcy53aWR0aCk7XHJcbiAgICByZXR1cm4gc2NhbGVCYW5kKClcclxuICAgICAgLnJhbmdlUm91bmQoWzAsIHRoaXMuZGltcy53aWR0aF0pXHJcbiAgICAgIC5kb21haW4odGhpcy54RG9tYWluKVxyXG4gICAgICAucGFkZGluZ0lubmVyKGYpO1xyXG4gIH1cclxuXHJcbiAgZ2V0WVNjYWxlKCk6IGFueSB7XHJcbiAgICBjb25zdCBmID0gdGhpcy5nZXREaW1lbnNpb24odGhpcy5pbm5lclBhZGRpbmcsIDEsIHRoaXMueURvbWFpbi5sZW5ndGgsIHRoaXMuZGltcy5oZWlnaHQpO1xyXG4gICAgcmV0dXJuIHNjYWxlQmFuZCgpXHJcbiAgICAgIC5yYW5nZVJvdW5kKFt0aGlzLmRpbXMuaGVpZ2h0LCAwXSlcclxuICAgICAgLmRvbWFpbih0aGlzLnlEb21haW4pXHJcbiAgICAgIC5wYWRkaW5nSW5uZXIoZik7XHJcbiAgfVxyXG5cclxuICBnZXRSZWN0cygpOiBhbnlbXSB7XHJcbiAgICBjb25zdCByZWN0cyA9IFtdO1xyXG5cclxuICAgIHRoaXMueERvbWFpbi5tYXAoeFZhbCA9PiB7XHJcbiAgICAgIHRoaXMueURvbWFpbi5tYXAoeVZhbCA9PiB7XHJcbiAgICAgICAgcmVjdHMucHVzaCh7XHJcbiAgICAgICAgICB4OiB0aGlzLnhTY2FsZSh4VmFsKSxcclxuICAgICAgICAgIHk6IHRoaXMueVNjYWxlKHlWYWwpLFxyXG4gICAgICAgICAgcng6IDMsXHJcbiAgICAgICAgICB3aWR0aDogdGhpcy54U2NhbGUuYmFuZHdpZHRoKCksXHJcbiAgICAgICAgICBoZWlnaHQ6IHRoaXMueVNjYWxlLmJhbmR3aWR0aCgpLFxyXG4gICAgICAgICAgZmlsbDogJ3JnYmEoMjAwLDIwMCwyMDAsMC4wMyknXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlY3RzO1xyXG4gIH1cclxuXHJcbiAgb25DbGljayhkYXRhKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdC5lbWl0KGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgc2V0Q29sb3JzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jb2xvcnMgPSBuZXcgQ29sb3JIZWxwZXIodGhpcy5zY2hlbWUsIHRoaXMuc2NhbGVUeXBlLCB0aGlzLnZhbHVlRG9tYWluKTtcclxuICB9XHJcblxyXG4gIGdldExlZ2VuZE9wdGlvbnMoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzY2FsZVR5cGU6IHRoaXMuc2NhbGVUeXBlLFxyXG4gICAgICBkb21haW46IHRoaXMudmFsdWVEb21haW4sXHJcbiAgICAgIGNvbG9yczogdGhpcy5zY2FsZVR5cGUgPT09ICdvcmRpbmFsJyA/IHRoaXMuY29sb3JzIDogdGhpcy5jb2xvcnMuc2NhbGUsXHJcbiAgICAgIHRpdGxlOiB0aGlzLnNjYWxlVHlwZSA9PT0gJ29yZGluYWwnID8gdGhpcy5sZWdlbmRUaXRsZSA6IHVuZGVmaW5lZCxcclxuICAgICAgcG9zaXRpb246IHRoaXMubGVnZW5kUG9zaXRpb25cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICB1cGRhdGVZQXhpc1dpZHRoKHsgd2lkdGggfSk6IHZvaWQge1xyXG4gICAgdGhpcy55QXhpc1dpZHRoID0gd2lkdGg7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlWEF4aXNIZWlnaHQoeyBoZWlnaHQgfSk6IHZvaWQge1xyXG4gICAgdGhpcy54QXhpc0hlaWdodCA9IGhlaWdodDtcclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICBvbkFjdGl2YXRlKGV2ZW50LCBncm91cCwgZnJvbUxlZ2VuZCA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCBpdGVtID0gT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQpO1xyXG4gICAgaWYgKGdyb3VwKSB7XHJcbiAgICAgIGl0ZW0uc2VyaWVzID0gZ3JvdXAubmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpdGVtcyA9IHRoaXMucmVzdWx0c1xyXG4gICAgICAubWFwKGcgPT4gZy5zZXJpZXMpXHJcbiAgICAgIC5mbGF0KClcclxuICAgICAgLmZpbHRlcihpID0+IHtcclxuICAgICAgICBpZiAoZnJvbUxlZ2VuZCkge1xyXG4gICAgICAgICAgcmV0dXJuIGkubGFiZWwgPT09IGl0ZW0ubmFtZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIGkubmFtZSA9PT0gaXRlbS5uYW1lICYmIGkuc2VyaWVzID09PSBpdGVtLnNlcmllcztcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYWN0aXZlRW50cmllcyA9IFsuLi5pdGVtc107XHJcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQoeyB2YWx1ZTogaXRlbSwgZW50cmllczogdGhpcy5hY3RpdmVFbnRyaWVzIH0pO1xyXG4gIH1cclxuXHJcbiAgb25EZWFjdGl2YXRlKGV2ZW50LCBncm91cCwgZnJvbUxlZ2VuZCA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCBpdGVtID0gT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQpO1xyXG4gICAgaWYgKGdyb3VwKSB7XHJcbiAgICAgIGl0ZW0uc2VyaWVzID0gZ3JvdXAubmFtZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFjdGl2ZUVudHJpZXMgPSB0aGlzLmFjdGl2ZUVudHJpZXMuZmlsdGVyKGkgPT4ge1xyXG4gICAgICBpZiAoZnJvbUxlZ2VuZCkge1xyXG4gICAgICAgIHJldHVybiBpLmxhYmVsICE9PSBpdGVtLm5hbWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuICEoaS5uYW1lID09PSBpdGVtLm5hbWUgJiYgaS5zZXJpZXMgPT09IGl0ZW0uc2VyaWVzKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5kZWFjdGl2YXRlLmVtaXQoeyB2YWx1ZTogaXRlbSwgZW50cmllczogdGhpcy5hY3RpdmVFbnRyaWVzIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=