import { __decorate, __extends, __read, __spread, __values } from "tslib";
import { Component, Input, Output, EventEmitter, HostListener, ViewEncapsulation, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { scaleLinear } from 'd3-scale';
import { BaseChartComponent } from '../common/base-chart.component';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { getScaleType } from '../common/domain.helper';
import { getDomain, getScale } from './bubble-chart.utils';
import { id } from '../utils/id';
var BubbleChartComponent = /** @class */ (function (_super) {
    __extends(BubbleChartComponent, _super);
    function BubbleChartComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showGridLines = true;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.xAxis = true;
        _this.yAxis = true;
        _this.trimXAxisTicks = true;
        _this.trimYAxisTicks = true;
        _this.rotateXAxisTicks = true;
        _this.maxXAxisTickLength = 16;
        _this.maxYAxisTickLength = 16;
        _this.roundDomains = false;
        _this.maxRadius = 10;
        _this.minRadius = 3;
        _this.schemeType = 'ordinal';
        _this.tooltipDisabled = false;
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.scaleType = 'linear';
        _this.margin = [10, 20, 10, 20];
        _this.bubblePadding = [0, 0, 0, 0];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.activeEntries = [];
        return _this;
    }
    BubbleChartComponent.prototype.update = function () {
        _super.prototype.update.call(this);
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
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        this.seriesDomain = this.results.map(function (d) { return d.name; });
        this.rDomain = this.getRDomain();
        this.xDomain = this.getXDomain();
        this.yDomain = this.getYDomain();
        this.transform = "translate(" + this.dims.xOffset + "," + this.margin[0] + ")";
        var colorDomain = this.schemeType === 'ordinal' ? this.seriesDomain : this.rDomain;
        this.colors = new ColorHelper(this.scheme, this.schemeType, colorDomain, this.customColors);
        this.data = this.results;
        this.minRadius = Math.max(this.minRadius, 1);
        this.maxRadius = Math.max(this.maxRadius, 1);
        this.rScale = this.getRScale(this.rDomain, [this.minRadius, this.maxRadius]);
        this.bubblePadding = [0, 0, 0, 0];
        this.setScales();
        this.bubblePadding = this.getBubblePadding();
        this.setScales();
        this.legendOptions = this.getLegendOptions();
        this.clipPathId = 'clip' + id().toString();
        this.clipPath = "url(#" + this.clipPathId + ")";
    };
    BubbleChartComponent.prototype.hideCircles = function () {
        this.deactivateAll();
    };
    BubbleChartComponent.prototype.onClick = function (data, series) {
        if (series) {
            data.series = series.name;
        }
        this.select.emit(data);
    };
    BubbleChartComponent.prototype.getBubblePadding = function () {
        var e_1, _a, e_2, _b;
        var yMin = 0;
        var xMin = 0;
        var yMax = this.dims.height;
        var xMax = this.dims.width;
        try {
            for (var _c = __values(this.data), _d = _c.next(); !_d.done; _d = _c.next()) {
                var s = _d.value;
                try {
                    for (var _e = (e_2 = void 0, __values(s.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var d = _f.value;
                        var r = this.rScale(d.r);
                        var cx = this.xScaleType === 'linear' ? this.xScale(Number(d.x)) : this.xScale(d.x);
                        var cy = this.yScaleType === 'linear' ? this.yScale(Number(d.y)) : this.yScale(d.y);
                        xMin = Math.max(r - cx, xMin);
                        yMin = Math.max(r - cy, yMin);
                        yMax = Math.max(cy + r, yMax);
                        xMax = Math.max(cx + r, xMax);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        xMax = Math.max(xMax - this.dims.width, 0);
        yMax = Math.max(yMax - this.dims.height, 0);
        return [yMin, xMax, yMax, xMin];
    };
    BubbleChartComponent.prototype.setScales = function () {
        var width = this.dims.width;
        if (this.xScaleMin === undefined && this.xScaleMax === undefined) {
            width = width - this.bubblePadding[1];
        }
        var height = this.dims.height;
        if (this.yScaleMin === undefined && this.yScaleMax === undefined) {
            height = height - this.bubblePadding[2];
        }
        this.xScale = this.getXScale(this.xDomain, width);
        this.yScale = this.getYScale(this.yDomain, height);
    };
    BubbleChartComponent.prototype.getYScale = function (domain, height) {
        return getScale(domain, [height, this.bubblePadding[0]], this.yScaleType, this.roundDomains);
    };
    BubbleChartComponent.prototype.getXScale = function (domain, width) {
        return getScale(domain, [this.bubblePadding[3], width], this.xScaleType, this.roundDomains);
    };
    BubbleChartComponent.prototype.getRScale = function (domain, range) {
        var scale = scaleLinear()
            .range(range)
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    };
    BubbleChartComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            position: this.legendPosition,
            title: undefined
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.seriesDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.rDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BubbleChartComponent.prototype.getXDomain = function () {
        var e_3, _a, e_4, _b;
        var values = [];
        try {
            for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                var results = _d.value;
                try {
                    for (var _e = (e_4 = void 0, __values(results.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var d = _f.value;
                        if (!values.includes(d.x)) {
                            values.push(d.x);
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_3) throw e_3.error; }
        }
        this.xScaleType = getScaleType(values);
        return getDomain(values, this.xScaleType, this.autoScale, this.xScaleMin, this.xScaleMax);
    };
    BubbleChartComponent.prototype.getYDomain = function () {
        var e_5, _a, e_6, _b;
        var values = [];
        try {
            for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                var results = _d.value;
                try {
                    for (var _e = (e_6 = void 0, __values(results.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var d = _f.value;
                        if (!values.includes(d.y)) {
                            values.push(d.y);
                        }
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_5) throw e_5.error; }
        }
        this.yScaleType = getScaleType(values);
        return getDomain(values, this.yScaleType, this.autoScale, this.yScaleMin, this.yScaleMax);
    };
    BubbleChartComponent.prototype.getRDomain = function () {
        var e_7, _a, e_8, _b;
        var min = Infinity;
        var max = -Infinity;
        try {
            for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                var results = _d.value;
                try {
                    for (var _e = (e_8 = void 0, __values(results.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var d = _f.value;
                        var value = Number(d.r) || 1;
                        min = Math.min(min, value);
                        max = Math.max(max, value);
                    }
                }
                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_8) throw e_8.error; }
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return [min, max];
    };
    BubbleChartComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BubbleChartComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BubbleChartComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = __spread([item], this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BubbleChartComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = __spread(this.activeEntries);
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    BubbleChartComponent.prototype.deactivateAll = function () {
        var e_9, _a;
        this.activeEntries = __spread(this.activeEntries);
        try {
            for (var _b = __values(this.activeEntries), _c = _b.next(); !_c.done; _c = _b.next()) {
                var entry = _c.value;
                this.deactivate.emit({ value: entry, entries: [] });
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_9) throw e_9.error; }
        }
        this.activeEntries = [];
    };
    BubbleChartComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "showGridLines", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "legend", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "legendTitle", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "legendPosition", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "xAxis", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "yAxis", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "trimXAxisTicks", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "trimYAxisTicks", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "rotateXAxisTicks", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "maxXAxisTickLength", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "maxYAxisTickLength", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "xAxisTickFormatting", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "yAxisTickFormatting", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "xAxisTicks", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "yAxisTicks", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "roundDomains", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "maxRadius", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "minRadius", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "autoScale", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "schemeType", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "xScaleMin", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "xScaleMax", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "yScaleMin", void 0);
    __decorate([
        Input()
    ], BubbleChartComponent.prototype, "yScaleMax", void 0);
    __decorate([
        Output()
    ], BubbleChartComponent.prototype, "activate", void 0);
    __decorate([
        Output()
    ], BubbleChartComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate')
    ], BubbleChartComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        HostListener('mouseleave')
    ], BubbleChartComponent.prototype, "hideCircles", null);
    BubbleChartComponent = __decorate([
        Component({
            selector: 'ngx-charts-bubble-chart',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [activeEntries]=\"activeEntries\"\n      [legendOptions]=\"legendOptions\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n    >\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"\n          />\n        </svg:clipPath>\n      </svg:defs>\n      <svg:g [attr.transform]=\"transform\" class=\"bubble-chart chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [showGridLines]=\"showGridLines\"\n          [dims]=\"dims\"\n          [xScale]=\"xScale\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        />\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [showGridLines]=\"showGridLines\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        />\n        <svg:rect\n          class=\"bubble-chart-area\"\n          x=\"0\"\n          y=\"0\"\n          [attr.width]=\"dims.width\"\n          [attr.height]=\"dims.height\"\n          style=\"fill: rgb(255, 0, 0); opacity: 0; cursor: 'auto';\"\n          (mouseenter)=\"deactivateAll()\"\n        />\n        <svg:g [attr.clip-path]=\"clipPath\">\n          <svg:g *ngFor=\"let series of data; trackBy: trackBy\" [@animationState]=\"'active'\">\n            <svg:g\n              ngx-charts-bubble-series\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [rScale]=\"rScale\"\n              [xScaleType]=\"xScaleType\"\n              [yScaleType]=\"yScaleType\"\n              [xAxisLabel]=\"xAxisLabel\"\n              [yAxisLabel]=\"yAxisLabel\"\n              [colors]=\"colors\"\n              [data]=\"series\"\n              [activeEntries]=\"activeEntries\"\n              [tooltipDisabled]=\"tooltipDisabled\"\n              [tooltipTemplate]=\"tooltipTemplate\"\n              (select)=\"onClick($event, series)\"\n              (activate)=\"onActivate($event)\"\n              (deactivate)=\"onDeactivate($event)\"\n            />\n          </svg:g>\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            animations: [
                trigger('animationState', [
                    transition(':leave', [
                        style({
                            opacity: 1
                        }),
                        animate(500, style({
                            opacity: 0
                        }))
                    ])
                ])
            ],
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
        })
    ], BubbleChartComponent);
    return BubbleChartComponent;
}(BaseChartComponent));
export { BubbleChartComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnViYmxlLWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2J1YmJsZS1jaGFydC9idWJibGUtY2hhcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFlBQVksRUFDWixpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLFlBQVksRUFFYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUV2QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQWtCLE1BQU0sa0NBQWtDLENBQUM7QUFDM0YsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzNELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxhQUFhLENBQUM7QUEyR2pDO0lBQTBDLHdDQUFrQjtJQUE1RDtRQUFBLHFFQWlTQztRQWhTVSxtQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixZQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsaUJBQVcsR0FBVyxRQUFRLENBQUM7UUFDL0Isb0JBQWMsR0FBVyxPQUFPLENBQUM7UUFDakMsV0FBSyxHQUFZLElBQUksQ0FBQztRQUN0QixXQUFLLEdBQVksSUFBSSxDQUFDO1FBS3RCLG9CQUFjLEdBQVksSUFBSSxDQUFDO1FBQy9C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QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBUZW1wbGF0ZVJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyB0cmlnZ2VyLCBzdHlsZSwgYW5pbWF0ZSwgdHJhbnNpdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBzY2FsZUxpbmVhciB9IGZyb20gJ2QzLXNjYWxlJztcclxuXHJcbmltcG9ydCB7IEJhc2VDaGFydENvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9iYXNlLWNoYXJ0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IGNhbGN1bGF0ZVZpZXdEaW1lbnNpb25zLCBWaWV3RGltZW5zaW9ucyB9IGZyb20gJy4uL2NvbW1vbi92aWV3LWRpbWVuc2lvbnMuaGVscGVyJztcclxuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY29sb3IuaGVscGVyJztcclxuaW1wb3J0IHsgZ2V0U2NhbGVUeXBlIH0gZnJvbSAnLi4vY29tbW9uL2RvbWFpbi5oZWxwZXInO1xyXG5pbXBvcnQgeyBnZXREb21haW4sIGdldFNjYWxlIH0gZnJvbSAnLi9idWJibGUtY2hhcnQudXRpbHMnO1xyXG5pbXBvcnQgeyBpZCB9IGZyb20gJy4uL3V0aWxzL2lkJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LWNoYXJ0cy1idWJibGUtY2hhcnQnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8bmd4LWNoYXJ0cy1jaGFydFxyXG4gICAgICBbdmlld109XCJbd2lkdGgsIGhlaWdodF1cIlxyXG4gICAgICBbc2hvd0xlZ2VuZF09XCJsZWdlbmRcIlxyXG4gICAgICBbYWN0aXZlRW50cmllc109XCJhY3RpdmVFbnRyaWVzXCJcclxuICAgICAgW2xlZ2VuZE9wdGlvbnNdPVwibGVnZW5kT3B0aW9uc1wiXHJcbiAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxyXG4gICAgICAobGVnZW5kTGFiZWxDbGljayk9XCJvbkNsaWNrKCRldmVudClcIlxyXG4gICAgICAobGVnZW5kTGFiZWxBY3RpdmF0ZSk9XCJvbkFjdGl2YXRlKCRldmVudClcIlxyXG4gICAgICAobGVnZW5kTGFiZWxEZWFjdGl2YXRlKT1cIm9uRGVhY3RpdmF0ZSgkZXZlbnQpXCJcclxuICAgID5cclxuICAgICAgPHN2ZzpkZWZzPlxyXG4gICAgICAgIDxzdmc6Y2xpcFBhdGggW2F0dHIuaWRdPVwiY2xpcFBhdGhJZFwiPlxyXG4gICAgICAgICAgPHN2ZzpyZWN0XHJcbiAgICAgICAgICAgIFthdHRyLndpZHRoXT1cImRpbXMud2lkdGggKyAxMFwiXHJcbiAgICAgICAgICAgIFthdHRyLmhlaWdodF09XCJkaW1zLmhlaWdodCArIDEwXCJcclxuICAgICAgICAgICAgW2F0dHIudHJhbnNmb3JtXT1cIid0cmFuc2xhdGUoLTUsIC01KSdcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L3N2ZzpjbGlwUGF0aD5cclxuICAgICAgPC9zdmc6ZGVmcz5cclxuICAgICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIiBjbGFzcz1cImJ1YmJsZS1jaGFydCBjaGFydFwiPlxyXG4gICAgICAgIDxzdmc6Z1xyXG4gICAgICAgICAgbmd4LWNoYXJ0cy14LWF4aXNcclxuICAgICAgICAgICpuZ0lmPVwieEF4aXNcIlxyXG4gICAgICAgICAgW3Nob3dHcmlkTGluZXNdPVwic2hvd0dyaWRMaW5lc1wiXHJcbiAgICAgICAgICBbZGltc109XCJkaW1zXCJcclxuICAgICAgICAgIFt4U2NhbGVdPVwieFNjYWxlXCJcclxuICAgICAgICAgIFtzaG93TGFiZWxdPVwic2hvd1hBeGlzTGFiZWxcIlxyXG4gICAgICAgICAgW2xhYmVsVGV4dF09XCJ4QXhpc0xhYmVsXCJcclxuICAgICAgICAgIFt0cmltVGlja3NdPVwidHJpbVhBeGlzVGlja3NcIlxyXG4gICAgICAgICAgW3JvdGF0ZVRpY2tzXT1cInJvdGF0ZVhBeGlzVGlja3NcIlxyXG4gICAgICAgICAgW21heFRpY2tMZW5ndGhdPVwibWF4WEF4aXNUaWNrTGVuZ3RoXCJcclxuICAgICAgICAgIFt0aWNrRm9ybWF0dGluZ109XCJ4QXhpc1RpY2tGb3JtYXR0aW5nXCJcclxuICAgICAgICAgIFt0aWNrc109XCJ4QXhpc1RpY2tzXCJcclxuICAgICAgICAgIChkaW1lbnNpb25zQ2hhbmdlZCk9XCJ1cGRhdGVYQXhpc0hlaWdodCgkZXZlbnQpXCJcclxuICAgICAgICAvPlxyXG4gICAgICAgIDxzdmc6Z1xyXG4gICAgICAgICAgbmd4LWNoYXJ0cy15LWF4aXNcclxuICAgICAgICAgICpuZ0lmPVwieUF4aXNcIlxyXG4gICAgICAgICAgW3Nob3dHcmlkTGluZXNdPVwic2hvd0dyaWRMaW5lc1wiXHJcbiAgICAgICAgICBbeVNjYWxlXT1cInlTY2FsZVwiXHJcbiAgICAgICAgICBbZGltc109XCJkaW1zXCJcclxuICAgICAgICAgIFtzaG93TGFiZWxdPVwic2hvd1lBeGlzTGFiZWxcIlxyXG4gICAgICAgICAgW2xhYmVsVGV4dF09XCJ5QXhpc0xhYmVsXCJcclxuICAgICAgICAgIFt0cmltVGlja3NdPVwidHJpbVlBeGlzVGlja3NcIlxyXG4gICAgICAgICAgW21heFRpY2tMZW5ndGhdPVwibWF4WUF4aXNUaWNrTGVuZ3RoXCJcclxuICAgICAgICAgIFt0aWNrRm9ybWF0dGluZ109XCJ5QXhpc1RpY2tGb3JtYXR0aW5nXCJcclxuICAgICAgICAgIFt0aWNrc109XCJ5QXhpc1RpY2tzXCJcclxuICAgICAgICAgIChkaW1lbnNpb25zQ2hhbmdlZCk9XCJ1cGRhdGVZQXhpc1dpZHRoKCRldmVudClcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPHN2ZzpyZWN0XHJcbiAgICAgICAgICBjbGFzcz1cImJ1YmJsZS1jaGFydC1hcmVhXCJcclxuICAgICAgICAgIHg9XCIwXCJcclxuICAgICAgICAgIHk9XCIwXCJcclxuICAgICAgICAgIFthdHRyLndpZHRoXT1cImRpbXMud2lkdGhcIlxyXG4gICAgICAgICAgW2F0dHIuaGVpZ2h0XT1cImRpbXMuaGVpZ2h0XCJcclxuICAgICAgICAgIHN0eWxlPVwiZmlsbDogcmdiKDI1NSwgMCwgMCk7IG9wYWNpdHk6IDA7IGN1cnNvcjogJ2F1dG8nO1wiXHJcbiAgICAgICAgICAobW91c2VlbnRlcik9XCJkZWFjdGl2YXRlQWxsKClcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPHN2ZzpnIFthdHRyLmNsaXAtcGF0aF09XCJjbGlwUGF0aFwiPlxyXG4gICAgICAgICAgPHN2ZzpnICpuZ0Zvcj1cImxldCBzZXJpZXMgb2YgZGF0YTsgdHJhY2tCeTogdHJhY2tCeVwiIFtAYW5pbWF0aW9uU3RhdGVdPVwiJ2FjdGl2ZSdcIj5cclxuICAgICAgICAgICAgPHN2ZzpnXHJcbiAgICAgICAgICAgICAgbmd4LWNoYXJ0cy1idWJibGUtc2VyaWVzXHJcbiAgICAgICAgICAgICAgW3hTY2FsZV09XCJ4U2NhbGVcIlxyXG4gICAgICAgICAgICAgIFt5U2NhbGVdPVwieVNjYWxlXCJcclxuICAgICAgICAgICAgICBbclNjYWxlXT1cInJTY2FsZVwiXHJcbiAgICAgICAgICAgICAgW3hTY2FsZVR5cGVdPVwieFNjYWxlVHlwZVwiXHJcbiAgICAgICAgICAgICAgW3lTY2FsZVR5cGVdPVwieVNjYWxlVHlwZVwiXHJcbiAgICAgICAgICAgICAgW3hBeGlzTGFiZWxdPVwieEF4aXNMYWJlbFwiXHJcbiAgICAgICAgICAgICAgW3lBeGlzTGFiZWxdPVwieUF4aXNMYWJlbFwiXHJcbiAgICAgICAgICAgICAgW2NvbG9yc109XCJjb2xvcnNcIlxyXG4gICAgICAgICAgICAgIFtkYXRhXT1cInNlcmllc1wiXHJcbiAgICAgICAgICAgICAgW2FjdGl2ZUVudHJpZXNdPVwiYWN0aXZlRW50cmllc1wiXHJcbiAgICAgICAgICAgICAgW3Rvb2x0aXBEaXNhYmxlZF09XCJ0b29sdGlwRGlzYWJsZWRcIlxyXG4gICAgICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcclxuICAgICAgICAgICAgICAoc2VsZWN0KT1cIm9uQ2xpY2soJGV2ZW50LCBzZXJpZXMpXCJcclxuICAgICAgICAgICAgICAoYWN0aXZhdGUpPVwib25BY3RpdmF0ZSgkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAoZGVhY3RpdmF0ZSk9XCJvbkRlYWN0aXZhdGUoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L3N2ZzpnPlxyXG4gICAgICAgIDwvc3ZnOmc+XHJcbiAgICAgIDwvc3ZnOmc+XHJcbiAgICA8L25neC1jaGFydHMtY2hhcnQ+XHJcbiAgYCxcclxuICBzdHlsZVVybHM6IFsnLi4vY29tbW9uL2Jhc2UtY2hhcnQuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGFuaW1hdGlvbnM6IFtcclxuICAgIHRyaWdnZXIoJ2FuaW1hdGlvblN0YXRlJywgW1xyXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXHJcbiAgICAgICAgc3R5bGUoe1xyXG4gICAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGFuaW1hdGUoXHJcbiAgICAgICAgICA1MDAsXHJcbiAgICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKVxyXG4gICAgICBdKVxyXG4gICAgXSlcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCdWJibGVDaGFydENvbXBvbmVudCBleHRlbmRzIEJhc2VDaGFydENvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgc2hvd0dyaWRMaW5lczogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCkgbGVnZW5kID0gZmFsc2U7XHJcbiAgQElucHV0KCkgbGVnZW5kVGl0bGU6IHN0cmluZyA9ICdMZWdlbmQnO1xyXG4gIEBJbnB1dCgpIGxlZ2VuZFBvc2l0aW9uOiBzdHJpbmcgPSAncmlnaHQnO1xyXG4gIEBJbnB1dCgpIHhBeGlzOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSB5QXhpczogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCkgc2hvd1hBeGlzTGFiZWw6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgc2hvd1lBeGlzTGFiZWw6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgeEF4aXNMYWJlbDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHlBeGlzTGFiZWw6IHN0cmluZztcclxuICBASW5wdXQoKSB0cmltWEF4aXNUaWNrczogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCkgdHJpbVlBeGlzVGlja3M6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIHJvdGF0ZVhBeGlzVGlja3M6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIG1heFhBeGlzVGlja0xlbmd0aDogbnVtYmVyID0gMTY7XHJcbiAgQElucHV0KCkgbWF4WUF4aXNUaWNrTGVuZ3RoOiBudW1iZXIgPSAxNjtcclxuICBASW5wdXQoKSB4QXhpc1RpY2tGb3JtYXR0aW5nOiBhbnk7XHJcbiAgQElucHV0KCkgeUF4aXNUaWNrRm9ybWF0dGluZzogYW55O1xyXG4gIEBJbnB1dCgpIHhBeGlzVGlja3M6IGFueVtdO1xyXG4gIEBJbnB1dCgpIHlBeGlzVGlja3M6IGFueVtdO1xyXG4gIEBJbnB1dCgpIHJvdW5kRG9tYWluczogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIG1heFJhZGl1cyA9IDEwO1xyXG4gIEBJbnB1dCgpIG1pblJhZGl1cyA9IDM7XHJcbiAgQElucHV0KCkgYXV0b1NjYWxlOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHNjaGVtZVR5cGUgPSAnb3JkaW5hbCc7XHJcbiAgQElucHV0KCkgdG9vbHRpcERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgeFNjYWxlTWluOiBhbnk7XHJcbiAgQElucHV0KCkgeFNjYWxlTWF4OiBhbnk7XHJcbiAgQElucHV0KCkgeVNjYWxlTWluOiBhbnk7XHJcbiAgQElucHV0KCkgeVNjYWxlTWF4OiBhbnk7XHJcblxyXG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBAQ29udGVudENoaWxkKCd0b29sdGlwVGVtcGxhdGUnKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIGRpbXM6IFZpZXdEaW1lbnNpb25zO1xyXG4gIGNvbG9yczogQ29sb3JIZWxwZXI7XHJcbiAgc2NhbGVUeXBlID0gJ2xpbmVhcic7XHJcbiAgbWFyZ2luID0gWzEwLCAyMCwgMTAsIDIwXTtcclxuICBidWJibGVQYWRkaW5nID0gWzAsIDAsIDAsIDBdO1xyXG4gIGRhdGE6IGFueTtcclxuXHJcbiAgbGVnZW5kT3B0aW9uczogYW55O1xyXG4gIHRyYW5zZm9ybTogc3RyaW5nO1xyXG5cclxuICBjbGlwUGF0aDogc3RyaW5nO1xyXG4gIGNsaXBQYXRoSWQ6IHN0cmluZztcclxuXHJcbiAgc2VyaWVzRG9tYWluOiBhbnlbXTtcclxuICB4RG9tYWluOiBhbnlbXTtcclxuICB5RG9tYWluOiBhbnlbXTtcclxuICByRG9tYWluOiBudW1iZXJbXTtcclxuXHJcbiAgeFNjYWxlVHlwZTogc3RyaW5nO1xyXG4gIHlTY2FsZVR5cGU6IHN0cmluZztcclxuXHJcbiAgeVNjYWxlOiBhbnk7XHJcbiAgeFNjYWxlOiBhbnk7XHJcbiAgclNjYWxlOiBhbnk7XHJcblxyXG4gIHhBeGlzSGVpZ2h0OiBudW1iZXIgPSAwO1xyXG4gIHlBeGlzV2lkdGg6IG51bWJlciA9IDA7XHJcblxyXG4gIGFjdGl2ZUVudHJpZXM6IGFueVtdID0gW107XHJcblxyXG4gIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIHN1cGVyLnVwZGF0ZSgpO1xyXG5cclxuICAgIHRoaXMuZGltcyA9IGNhbGN1bGF0ZVZpZXdEaW1lbnNpb25zKHtcclxuICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXHJcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXHJcbiAgICAgIG1hcmdpbnM6IHRoaXMubWFyZ2luLFxyXG4gICAgICBzaG93WEF4aXM6IHRoaXMueEF4aXMsXHJcbiAgICAgIHNob3dZQXhpczogdGhpcy55QXhpcyxcclxuICAgICAgeEF4aXNIZWlnaHQ6IHRoaXMueEF4aXNIZWlnaHQsXHJcbiAgICAgIHlBeGlzV2lkdGg6IHRoaXMueUF4aXNXaWR0aCxcclxuICAgICAgc2hvd1hMYWJlbDogdGhpcy5zaG93WEF4aXNMYWJlbCxcclxuICAgICAgc2hvd1lMYWJlbDogdGhpcy5zaG93WUF4aXNMYWJlbCxcclxuICAgICAgc2hvd0xlZ2VuZDogdGhpcy5sZWdlbmQsXHJcbiAgICAgIGxlZ2VuZFR5cGU6IHRoaXMuc2NoZW1lVHlwZSxcclxuICAgICAgbGVnZW5kUG9zaXRpb246IHRoaXMubGVnZW5kUG9zaXRpb25cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc2VyaWVzRG9tYWluID0gdGhpcy5yZXN1bHRzLm1hcChkID0+IGQubmFtZSk7XHJcbiAgICB0aGlzLnJEb21haW4gPSB0aGlzLmdldFJEb21haW4oKTtcclxuICAgIHRoaXMueERvbWFpbiA9IHRoaXMuZ2V0WERvbWFpbigpO1xyXG4gICAgdGhpcy55RG9tYWluID0gdGhpcy5nZXRZRG9tYWluKCk7XHJcblxyXG4gICAgdGhpcy50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7dGhpcy5kaW1zLnhPZmZzZXR9LCR7dGhpcy5tYXJnaW5bMF19KWA7XHJcblxyXG4gICAgY29uc3QgY29sb3JEb21haW4gPSB0aGlzLnNjaGVtZVR5cGUgPT09ICdvcmRpbmFsJyA/IHRoaXMuc2VyaWVzRG9tYWluIDogdGhpcy5yRG9tYWluO1xyXG4gICAgdGhpcy5jb2xvcnMgPSBuZXcgQ29sb3JIZWxwZXIodGhpcy5zY2hlbWUsIHRoaXMuc2NoZW1lVHlwZSwgY29sb3JEb21haW4sIHRoaXMuY3VzdG9tQ29sb3JzKTtcclxuXHJcbiAgICB0aGlzLmRhdGEgPSB0aGlzLnJlc3VsdHM7XHJcblxyXG4gICAgdGhpcy5taW5SYWRpdXMgPSBNYXRoLm1heCh0aGlzLm1pblJhZGl1cywgMSk7XHJcbiAgICB0aGlzLm1heFJhZGl1cyA9IE1hdGgubWF4KHRoaXMubWF4UmFkaXVzLCAxKTtcclxuXHJcbiAgICB0aGlzLnJTY2FsZSA9IHRoaXMuZ2V0UlNjYWxlKHRoaXMuckRvbWFpbiwgW3RoaXMubWluUmFkaXVzLCB0aGlzLm1heFJhZGl1c10pO1xyXG5cclxuICAgIHRoaXMuYnViYmxlUGFkZGluZyA9IFswLCAwLCAwLCAwXTtcclxuICAgIHRoaXMuc2V0U2NhbGVzKCk7XHJcblxyXG4gICAgdGhpcy5idWJibGVQYWRkaW5nID0gdGhpcy5nZXRCdWJibGVQYWRkaW5nKCk7XHJcbiAgICB0aGlzLnNldFNjYWxlcygpO1xyXG5cclxuICAgIHRoaXMubGVnZW5kT3B0aW9ucyA9IHRoaXMuZ2V0TGVnZW5kT3B0aW9ucygpO1xyXG5cclxuICAgIHRoaXMuY2xpcFBhdGhJZCA9ICdjbGlwJyArIGlkKCkudG9TdHJpbmcoKTtcclxuICAgIHRoaXMuY2xpcFBhdGggPSBgdXJsKCMke3RoaXMuY2xpcFBhdGhJZH0pYDtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxyXG4gIGhpZGVDaXJjbGVzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5kZWFjdGl2YXRlQWxsKCk7XHJcbiAgfVxyXG5cclxuICBvbkNsaWNrKGRhdGEsIHNlcmllcz8pOiB2b2lkIHtcclxuICAgIGlmIChzZXJpZXMpIHtcclxuICAgICAgZGF0YS5zZXJpZXMgPSBzZXJpZXMubmFtZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNlbGVjdC5lbWl0KGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgZ2V0QnViYmxlUGFkZGluZygpIHtcclxuICAgIGxldCB5TWluID0gMDtcclxuICAgIGxldCB4TWluID0gMDtcclxuICAgIGxldCB5TWF4ID0gdGhpcy5kaW1zLmhlaWdodDtcclxuICAgIGxldCB4TWF4ID0gdGhpcy5kaW1zLndpZHRoO1xyXG5cclxuICAgIGZvciAoY29uc3QgcyBvZiB0aGlzLmRhdGEpIHtcclxuICAgICAgZm9yIChjb25zdCBkIG9mIHMuc2VyaWVzKSB7XHJcbiAgICAgICAgY29uc3QgciA9IHRoaXMuclNjYWxlKGQucik7XHJcbiAgICAgICAgY29uc3QgY3ggPSB0aGlzLnhTY2FsZVR5cGUgPT09ICdsaW5lYXInID8gdGhpcy54U2NhbGUoTnVtYmVyKGQueCkpIDogdGhpcy54U2NhbGUoZC54KTtcclxuICAgICAgICBjb25zdCBjeSA9IHRoaXMueVNjYWxlVHlwZSA9PT0gJ2xpbmVhcicgPyB0aGlzLnlTY2FsZShOdW1iZXIoZC55KSkgOiB0aGlzLnlTY2FsZShkLnkpO1xyXG4gICAgICAgIHhNaW4gPSBNYXRoLm1heChyIC0gY3gsIHhNaW4pO1xyXG4gICAgICAgIHlNaW4gPSBNYXRoLm1heChyIC0gY3ksIHlNaW4pO1xyXG4gICAgICAgIHlNYXggPSBNYXRoLm1heChjeSArIHIsIHlNYXgpO1xyXG4gICAgICAgIHhNYXggPSBNYXRoLm1heChjeCArIHIsIHhNYXgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgeE1heCA9IE1hdGgubWF4KHhNYXggLSB0aGlzLmRpbXMud2lkdGgsIDApO1xyXG4gICAgeU1heCA9IE1hdGgubWF4KHlNYXggLSB0aGlzLmRpbXMuaGVpZ2h0LCAwKTtcclxuXHJcbiAgICByZXR1cm4gW3lNaW4sIHhNYXgsIHlNYXgsIHhNaW5dO1xyXG4gIH1cclxuXHJcbiAgc2V0U2NhbGVzKCkge1xyXG4gICAgbGV0IHdpZHRoID0gdGhpcy5kaW1zLndpZHRoO1xyXG4gICAgaWYgKHRoaXMueFNjYWxlTWluID09PSB1bmRlZmluZWQgJiYgdGhpcy54U2NhbGVNYXggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB3aWR0aCA9IHdpZHRoIC0gdGhpcy5idWJibGVQYWRkaW5nWzFdO1xyXG4gICAgfVxyXG4gICAgbGV0IGhlaWdodCA9IHRoaXMuZGltcy5oZWlnaHQ7XHJcbiAgICBpZiAodGhpcy55U2NhbGVNaW4gPT09IHVuZGVmaW5lZCAmJiB0aGlzLnlTY2FsZU1heCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGhlaWdodCA9IGhlaWdodCAtIHRoaXMuYnViYmxlUGFkZGluZ1syXTtcclxuICAgIH1cclxuICAgIHRoaXMueFNjYWxlID0gdGhpcy5nZXRYU2NhbGUodGhpcy54RG9tYWluLCB3aWR0aCk7XHJcbiAgICB0aGlzLnlTY2FsZSA9IHRoaXMuZ2V0WVNjYWxlKHRoaXMueURvbWFpbiwgaGVpZ2h0KTtcclxuICB9XHJcblxyXG4gIGdldFlTY2FsZShkb21haW4sIGhlaWdodCk6IGFueSB7XHJcbiAgICByZXR1cm4gZ2V0U2NhbGUoZG9tYWluLCBbaGVpZ2h0LCB0aGlzLmJ1YmJsZVBhZGRpbmdbMF1dLCB0aGlzLnlTY2FsZVR5cGUsIHRoaXMucm91bmREb21haW5zKTtcclxuICB9XHJcblxyXG4gIGdldFhTY2FsZShkb21haW4sIHdpZHRoKTogYW55IHtcclxuICAgIHJldHVybiBnZXRTY2FsZShkb21haW4sIFt0aGlzLmJ1YmJsZVBhZGRpbmdbM10sIHdpZHRoXSwgdGhpcy54U2NhbGVUeXBlLCB0aGlzLnJvdW5kRG9tYWlucyk7XHJcbiAgfVxyXG5cclxuICBnZXRSU2NhbGUoZG9tYWluLCByYW5nZSk6IGFueSB7XHJcbiAgICBjb25zdCBzY2FsZSA9IHNjYWxlTGluZWFyKClcclxuICAgICAgLnJhbmdlKHJhbmdlKVxyXG4gICAgICAuZG9tYWluKGRvbWFpbik7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucm91bmREb21haW5zID8gc2NhbGUubmljZSgpIDogc2NhbGU7XHJcbiAgfVxyXG5cclxuICBnZXRMZWdlbmRPcHRpb25zKCk6IGFueSB7XHJcbiAgICBjb25zdCBvcHRzID0ge1xyXG4gICAgICBzY2FsZVR5cGU6IHRoaXMuc2NoZW1lVHlwZSxcclxuICAgICAgY29sb3JzOiB1bmRlZmluZWQsXHJcbiAgICAgIGRvbWFpbjogW10sXHJcbiAgICAgIHBvc2l0aW9uOiB0aGlzLmxlZ2VuZFBvc2l0aW9uLFxyXG4gICAgICB0aXRsZTogdW5kZWZpbmVkXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChvcHRzLnNjYWxlVHlwZSA9PT0gJ29yZGluYWwnKSB7XHJcbiAgICAgIG9wdHMuZG9tYWluID0gdGhpcy5zZXJpZXNEb21haW47XHJcbiAgICAgIG9wdHMuY29sb3JzID0gdGhpcy5jb2xvcnM7XHJcbiAgICAgIG9wdHMudGl0bGUgPSB0aGlzLmxlZ2VuZFRpdGxlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb3B0cy5kb21haW4gPSB0aGlzLnJEb21haW47XHJcbiAgICAgIG9wdHMuY29sb3JzID0gdGhpcy5jb2xvcnMuc2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9wdHM7XHJcbiAgfVxyXG5cclxuICBnZXRYRG9tYWluKCk6IGFueVtdIHtcclxuICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3QgcmVzdWx0cyBvZiB0aGlzLnJlc3VsdHMpIHtcclxuICAgICAgZm9yIChjb25zdCBkIG9mIHJlc3VsdHMuc2VyaWVzKSB7XHJcbiAgICAgICAgaWYgKCF2YWx1ZXMuaW5jbHVkZXMoZC54KSkge1xyXG4gICAgICAgICAgdmFsdWVzLnB1c2goZC54KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnhTY2FsZVR5cGUgPSBnZXRTY2FsZVR5cGUodmFsdWVzKTtcclxuICAgIHJldHVybiBnZXREb21haW4odmFsdWVzLCB0aGlzLnhTY2FsZVR5cGUsIHRoaXMuYXV0b1NjYWxlLCB0aGlzLnhTY2FsZU1pbiwgdGhpcy54U2NhbGVNYXgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0WURvbWFpbigpOiBhbnlbXSB7XHJcbiAgICBjb25zdCB2YWx1ZXMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IHJlc3VsdHMgb2YgdGhpcy5yZXN1bHRzKSB7XHJcbiAgICAgIGZvciAoY29uc3QgZCBvZiByZXN1bHRzLnNlcmllcykge1xyXG4gICAgICAgIGlmICghdmFsdWVzLmluY2x1ZGVzKGQueSkpIHtcclxuICAgICAgICAgIHZhbHVlcy5wdXNoKGQueSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy55U2NhbGVUeXBlID0gZ2V0U2NhbGVUeXBlKHZhbHVlcyk7XHJcbiAgICByZXR1cm4gZ2V0RG9tYWluKHZhbHVlcywgdGhpcy55U2NhbGVUeXBlLCB0aGlzLmF1dG9TY2FsZSwgdGhpcy55U2NhbGVNaW4sIHRoaXMueVNjYWxlTWF4KTtcclxuICB9XHJcblxyXG4gIGdldFJEb21haW4oKTogbnVtYmVyW10ge1xyXG4gICAgbGV0IG1pbiA9IEluZmluaXR5O1xyXG4gICAgbGV0IG1heCA9IC1JbmZpbml0eTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IHJlc3VsdHMgb2YgdGhpcy5yZXN1bHRzKSB7XHJcbiAgICAgIGZvciAoY29uc3QgZCBvZiByZXN1bHRzLnNlcmllcykge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gTnVtYmVyKGQucikgfHwgMTtcclxuICAgICAgICBtaW4gPSBNYXRoLm1pbihtaW4sIHZhbHVlKTtcclxuICAgICAgICBtYXggPSBNYXRoLm1heChtYXgsIHZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBbbWluLCBtYXhdO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlWUF4aXNXaWR0aCh7IHdpZHRoIH0pOiB2b2lkIHtcclxuICAgIHRoaXMueUF4aXNXaWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVhBeGlzSGVpZ2h0KHsgaGVpZ2h0IH0pOiB2b2lkIHtcclxuICAgIHRoaXMueEF4aXNIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgb25BY3RpdmF0ZShpdGVtKTogdm9pZCB7XHJcbiAgICBjb25zdCBpZHggPSB0aGlzLmFjdGl2ZUVudHJpZXMuZmluZEluZGV4KGQgPT4ge1xyXG4gICAgICByZXR1cm4gZC5uYW1lID09PSBpdGVtLm5hbWU7XHJcbiAgICB9KTtcclxuICAgIGlmIChpZHggPiAtMSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hY3RpdmVFbnRyaWVzID0gW2l0ZW0sIC4uLnRoaXMuYWN0aXZlRW50cmllc107XHJcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQoeyB2YWx1ZTogaXRlbSwgZW50cmllczogdGhpcy5hY3RpdmVFbnRyaWVzIH0pO1xyXG4gIH1cclxuXHJcbiAgb25EZWFjdGl2YXRlKGl0ZW0pOiB2b2lkIHtcclxuICAgIGNvbnN0IGlkeCA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kSW5kZXgoZCA9PiB7XHJcbiAgICAgIHJldHVybiBkLm5hbWUgPT09IGl0ZW0ubmFtZTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYWN0aXZlRW50cmllcy5zcGxpY2UoaWR4LCAxKTtcclxuICAgIHRoaXMuYWN0aXZlRW50cmllcyA9IFsuLi50aGlzLmFjdGl2ZUVudHJpZXNdO1xyXG5cclxuICAgIHRoaXMuZGVhY3RpdmF0ZS5lbWl0KHsgdmFsdWU6IGl0ZW0sIGVudHJpZXM6IHRoaXMuYWN0aXZlRW50cmllcyB9KTtcclxuICB9XHJcblxyXG4gIGRlYWN0aXZhdGVBbGwoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZUVudHJpZXMgPSBbLi4udGhpcy5hY3RpdmVFbnRyaWVzXTtcclxuICAgIGZvciAoY29uc3QgZW50cnkgb2YgdGhpcy5hY3RpdmVFbnRyaWVzKSB7XHJcbiAgICAgIHRoaXMuZGVhY3RpdmF0ZS5lbWl0KHsgdmFsdWU6IGVudHJ5LCBlbnRyaWVzOiBbXSB9KTtcclxuICAgIH1cclxuICAgIHRoaXMuYWN0aXZlRW50cmllcyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgdHJhY2tCeShpbmRleCwgaXRlbSk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gaXRlbS5uYW1lO1xyXG4gIH1cclxufVxyXG4iXX0=