import { __decorate, __extends, __read, __spread, __values } from "tslib";
import { Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { scaleBand, scaleLinear } from 'd3-scale';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
var BarVerticalStackedComponent = /** @class */ (function (_super) {
    __extends(BarVerticalStackedComponent, _super);
    function BarVerticalStackedComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.tooltipDisabled = false;
        _this.showGridLines = true;
        _this.activeEntries = [];
        _this.trimXAxisTicks = true;
        _this.trimYAxisTicks = true;
        _this.rotateXAxisTicks = true;
        _this.maxXAxisTickLength = 16;
        _this.maxYAxisTickLength = 16;
        _this.barPadding = 8;
        _this.roundDomains = false;
        _this.showDataLabel = false;
        _this.noBarWhenZero = true;
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.dataLabelMaxHeight = { negative: 0, positive: 0 };
        return _this;
    }
    BarVerticalStackedComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        if (!this.showDataLabel) {
            this.dataLabelMaxHeight = { negative: 0, positive: 0 };
        }
        this.margin = [10 + this.dataLabelMaxHeight.positive, 20, 10 + this.dataLabelMaxHeight.negative, 20];
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
        if (this.showDataLabel) {
            this.dims.height -= this.dataLabelMaxHeight.negative;
        }
        this.formatDates();
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valueDomain = this.getValueDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + (this.margin[0] + this.dataLabelMaxHeight.negative) + ")";
    };
    BarVerticalStackedComponent.prototype.getGroupDomain = function () {
        var e_1, _a;
        var domain = [];
        try {
            for (var _b = __values(this.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                var group = _c.value;
                if (!domain.includes(group.label)) {
                    domain.push(group.label);
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
    BarVerticalStackedComponent.prototype.getInnerDomain = function () {
        var e_2, _a, e_3, _b;
        var domain = [];
        try {
            for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                var group = _d.value;
                try {
                    for (var _e = (e_3 = void 0, __values(group.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var d = _f.value;
                        if (!domain.includes(d.label)) {
                            domain.push(d.label);
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
    BarVerticalStackedComponent.prototype.getValueDomain = function () {
        var e_4, _a, e_5, _b;
        var domain = [];
        var smallest = 0;
        var biggest = 0;
        try {
            for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                var group = _d.value;
                var smallestSum = 0;
                var biggestSum = 0;
                try {
                    for (var _e = (e_5 = void 0, __values(group.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var d = _f.value;
                        if (d.value < 0) {
                            smallestSum += d.value;
                        }
                        else {
                            biggestSum += d.value;
                        }
                        smallest = d.value < smallest ? d.value : smallest;
                        biggest = d.value > biggest ? d.value : biggest;
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                domain.push(smallestSum);
                domain.push(biggestSum);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_4) throw e_4.error; }
        }
        domain.push(smallest);
        domain.push(biggest);
        var min = Math.min.apply(Math, __spread([0], domain));
        var max = this.yScaleMax ? Math.max.apply(Math, __spread([this.yScaleMax], domain)) : Math.max.apply(Math, __spread(domain));
        return [min, max];
    };
    BarVerticalStackedComponent.prototype.getXScale = function () {
        var spacing = this.groupDomain.length / (this.dims.width / this.barPadding + 1);
        return scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarVerticalStackedComponent.prototype.getYScale = function () {
        var scale = scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.valueDomain);
        return this.roundDomains ? scale.nice() : scale;
    };
    BarVerticalStackedComponent.prototype.onDataLabelMaxHeightChanged = function (event, groupIndex) {
        var _this = this;
        if (event.size.negative) {
            this.dataLabelMaxHeight.negative = Math.max(this.dataLabelMaxHeight.negative, event.size.height);
        }
        else {
            this.dataLabelMaxHeight.positive = Math.max(this.dataLabelMaxHeight.positive, event.size.height);
        }
        if (groupIndex === this.results.length - 1) {
            setTimeout(function () { return _this.update(); });
        }
    };
    BarVerticalStackedComponent.prototype.groupTransform = function (group) {
        return "translate(" + (this.xScale(group.name) || 0) + ", 0)";
    };
    BarVerticalStackedComponent.prototype.onClick = function (data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    };
    BarVerticalStackedComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    BarVerticalStackedComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valueDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    BarVerticalStackedComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.valueDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarVerticalStackedComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarVerticalStackedComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarVerticalStackedComponent.prototype.onActivate = function (event, group, fromLegend) {
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
    BarVerticalStackedComponent.prototype.onDeactivate = function (event, group, fromLegend) {
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
    ], BarVerticalStackedComponent.prototype, "legend", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "legendTitle", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "legendPosition", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "xAxis", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "yAxis", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "gradient", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "showGridLines", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "schemeType", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "trimXAxisTicks", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "trimYAxisTicks", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "rotateXAxisTicks", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "maxXAxisTickLength", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "maxYAxisTickLength", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "xAxisTickFormatting", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "yAxisTickFormatting", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "xAxisTicks", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "yAxisTicks", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "barPadding", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "roundDomains", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "yScaleMax", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "showDataLabel", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "dataLabelFormatting", void 0);
    __decorate([
        Input()
    ], BarVerticalStackedComponent.prototype, "noBarWhenZero", void 0);
    __decorate([
        Output()
    ], BarVerticalStackedComponent.prototype, "activate", void 0);
    __decorate([
        Output()
    ], BarVerticalStackedComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate')
    ], BarVerticalStackedComponent.prototype, "tooltipTemplate", void 0);
    BarVerticalStackedComponent = __decorate([
        Component({
            selector: 'ngx-charts-bar-vertical-stacked',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelActivate)=\"onActivate($event, undefined, true)\"\n      (legendLabelDeactivate)=\"onDeactivate($event, undefined, true)\"\n      (legendLabelClick)=\"onClick($event)\"\n    >\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          [xAxisOffset]=\"dataLabelMaxHeight.negative\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g\n          *ngFor=\"let group of results; let index = index; trackBy: trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\"\n        >\n          <svg:g\n            ngx-charts-series-vertical\n            type=\"stacked\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [activeEntries]=\"activeEntries\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [showDataLabel]=\"showDataLabel\"\n            [dataLabelFormatting]=\"dataLabelFormatting\"\n            [seriesName]=\"group.name\"\n            [animations]=\"animations\"\n            [noBarWhenZero]=\"noBarWhenZero\"\n            (select)=\"onClick($event, group)\"\n            (activate)=\"onActivate($event, group)\"\n            (deactivate)=\"onDeactivate($event, group)\"\n            (dataLabelHeightChanged)=\"onDataLabelMaxHeightChanged($event, index)\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':leave', [
                        style({
                            opacity: 1,
                            transform: '*'
                        }),
                        animate(500, style({ opacity: 0, transform: 'scale(0)' }))
                    ])
                ])
            ],
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
        })
    ], BarVerticalStackedComponent);
    return BarVerticalStackedComponent;
}(BaseChartComponent));
export { BarVerticalStackedComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLXZlcnRpY2FsLXN0YWNrZWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvYmFyLWNoYXJ0L2Jhci12ZXJ0aWNhbC1zdGFja2VkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLFlBQVksRUFFYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFbEQsT0FBTyxFQUFFLHVCQUF1QixFQUFrQixNQUFNLGtDQUFrQyxDQUFDO0FBQzNGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQTJGcEU7SUFBaUQsK0NBQWtCO0lBQW5FO1FBQUEscUVBc1FDO1FBclFVLFlBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixpQkFBVyxHQUFXLFFBQVEsQ0FBQztRQUMvQixvQkFBYyxHQUFXLE9BQU8sQ0FBQztRQU9qQyxxQkFBZSxHQUFZLEtBQUssQ0FBQztRQUVqQyxtQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixtQkFBYSxHQUFVLEVBQUUsQ0FBQztRQUUxQixvQkFBYyxHQUFZLElBQUksQ0FBQztRQUMvQixvQkFBYyxHQUFZLElBQUksQ0FBQztRQUMvQixzQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFDakMsd0JBQWtCLEdBQVcsRUFBRSxDQUFDO1FBQ2hDLHdCQUFrQixHQUFXLEVBQUUsQ0FBQztRQUtoQyxnQkFBVSxHQUFHLENBQUMsQ0FBQztRQUNmLGtCQUFZLEdBQVksS0FBSyxDQUFDO1FBRTlCLG1CQUFhLEdBQVksS0FBSyxDQUFDO1FBRS9CLG1CQUFhLEdBQVksSUFBSSxDQUFDO1FBRTdCLGNBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqRCxnQkFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBYTdELFlBQU0sR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzFCLGlCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBQ3hCLGdCQUFVLEdBQVcsQ0FBQyxDQUFDO1FBRXZCLHdCQUFrQixHQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUM7O0lBcU56RCxDQUFDO0lBbk5DLDRDQUFNLEdBQU47UUFDRSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUVmLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDO1NBQ3hEO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVyRyxJQUFJLENBQUMsSUFBSSxHQUFHLHVCQUF1QixDQUFDO1lBQ2xDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ3BCLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSztZQUNyQixTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDckIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixVQUFVLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDL0IsVUFBVSxFQUFFLElBQUksQ0FBQyxjQUFjO1lBQy9CLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTTtZQUN2QixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDM0IsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO1NBQ3BDLENBQUMsQ0FBQztRQUVILElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDO1NBQ3REO1FBRUQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRW5CLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXpDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRS9CLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRTdDLElBQUksQ0FBQyxTQUFTLEdBQUcsZUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sWUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLE9BQUcsQ0FBQztJQUM1RyxDQUFDO0lBRUQsb0RBQWMsR0FBZDs7UUFDRSxJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7O1lBQ2xCLEtBQW9CLElBQUEsS0FBQSxTQUFBLElBQUksQ0FBQyxPQUFPLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQTdCLElBQU0sS0FBSyxXQUFBO2dCQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzFCO2FBQ0Y7Ozs7Ozs7OztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxvREFBYyxHQUFkOztRQUNFLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQzs7WUFDbEIsS0FBb0IsSUFBQSxLQUFBLFNBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQSxnQkFBQSw0QkFBRTtnQkFBN0IsSUFBTSxLQUFLLFdBQUE7O29CQUNkLEtBQWdCLElBQUEsb0JBQUEsU0FBQSxLQUFLLENBQUMsTUFBTSxDQUFBLENBQUEsZ0JBQUEsNEJBQUU7d0JBQXpCLElBQU0sQ0FBQyxXQUFBO3dCQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTs0QkFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQ3RCO3FCQUNGOzs7Ozs7Ozs7YUFDRjs7Ozs7Ozs7O1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELG9EQUFjLEdBQWQ7O1FBQ0UsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7O1lBQ2hCLEtBQW9CLElBQUEsS0FBQSxTQUFBLElBQUksQ0FBQyxPQUFPLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQTdCLElBQU0sS0FBSyxXQUFBO2dCQUNkLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDOztvQkFDbkIsS0FBZ0IsSUFBQSxvQkFBQSxTQUFBLEtBQUssQ0FBQyxNQUFNLENBQUEsQ0FBQSxnQkFBQSw0QkFBRTt3QkFBekIsSUFBTSxDQUFDLFdBQUE7d0JBQ1YsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTs0QkFDZixXQUFXLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQzt5QkFDeEI7NkJBQU07NEJBQ0wsVUFBVSxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUM7eUJBQ3ZCO3dCQUNELFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO3dCQUNuRCxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztxQkFDakQ7Ozs7Ozs7OztnQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3pCOzs7Ozs7Ozs7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFckIsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsT0FBUixJQUFJLFlBQUssQ0FBQyxHQUFLLE1BQU0sRUFBQyxDQUFDO1FBQ25DLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQVIsSUFBSSxZQUFLLElBQUksQ0FBQyxTQUFTLEdBQUssTUFBTSxHQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFSLElBQUksV0FBUSxNQUFNLEVBQUMsQ0FBQztRQUN2RixPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRCwrQ0FBUyxHQUFUO1FBQ0UsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLE9BQU8sU0FBUyxFQUFFO2FBQ2YsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDaEMsWUFBWSxDQUFDLE9BQU8sQ0FBQzthQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCwrQ0FBUyxHQUFUO1FBQ0UsSUFBTSxLQUFLLEdBQUcsV0FBVyxFQUFFO2FBQ3hCLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNsRCxDQUFDO0lBRUQsaUVBQTJCLEdBQTNCLFVBQTRCLEtBQUssRUFBRSxVQUFVO1FBQTdDLGlCQVNDO1FBUkMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN2QixJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2xHO2FBQU07WUFDTCxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2xHO1FBQ0QsSUFBSSxVQUFVLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLE1BQU0sRUFBRSxFQUFiLENBQWEsQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQUVELG9EQUFjLEdBQWQsVUFBZSxLQUFLO1FBQ2xCLE9BQU8sZ0JBQWEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFNLENBQUM7SUFDekQsQ0FBQztJQUVELDZDQUFPLEdBQVAsVUFBUSxJQUFJLEVBQUUsS0FBTTtRQUNsQixJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztTQUMxQjtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCw2Q0FBTyxHQUFQLFVBQVEsS0FBSyxFQUFFLElBQUk7UUFDakIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFFRCwrQ0FBUyxHQUFUO1FBQ0UsSUFBSSxNQUFNLENBQUM7UUFDWCxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFO1lBQ2pDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQzNCO2FBQU07WUFDTCxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUMzQjtRQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDekYsQ0FBQztJQUVELHNEQUFnQixHQUFoQjtRQUNFLElBQU0sSUFBSSxHQUFHO1lBQ1gsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzFCLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLE1BQU0sRUFBRSxFQUFFO1lBQ1YsS0FBSyxFQUFFLFNBQVM7WUFDaEIsUUFBUSxFQUFFLElBQUksQ0FBQyxjQUFjO1NBQzlCLENBQUM7UUFDRixJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQy9CO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNqQztRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELHNEQUFnQixHQUFoQixVQUFpQixFQUFTO1lBQVAsZ0JBQUs7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCx1REFBaUIsR0FBakIsVUFBa0IsRUFBVTtZQUFSLGtCQUFNO1FBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsZ0RBQVUsR0FBVixVQUFXLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBa0I7UUFBbEIsMkJBQUEsRUFBQSxrQkFBa0I7UUFDekMsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdEMsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7U0FDMUI7UUFFRCxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTzthQUN2QixHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxFQUFSLENBQVEsQ0FBQzthQUNsQixJQUFJLEVBQUU7YUFDTixNQUFNLENBQUMsVUFBQSxDQUFDO1lBQ1AsSUFBSSxVQUFVLEVBQUU7Z0JBQ2QsT0FBTyxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDOUI7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ3pEO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFTCxJQUFJLENBQUMsYUFBYSxZQUFPLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELGtEQUFZLEdBQVosVUFBYSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQWtCO1FBQWxCLDJCQUFBLEVBQUEsa0JBQWtCO1FBQzNDLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1NBQzFCO1FBRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUM7WUFDOUMsSUFBSSxVQUFVLEVBQUU7Z0JBQ2QsT0FBTyxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDOUI7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzVEO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFwUVE7UUFBUixLQUFLLEVBQUU7K0RBQWdCO0lBQ2Y7UUFBUixLQUFLLEVBQUU7b0VBQWdDO0lBQy9CO1FBQVIsS0FBSyxFQUFFO3VFQUFrQztJQUNqQztRQUFSLEtBQUssRUFBRTs4REFBTztJQUNOO1FBQVIsS0FBSyxFQUFFOzhEQUFPO0lBQ047UUFBUixLQUFLLEVBQUU7dUVBQWdCO0lBQ2Y7UUFBUixLQUFLLEVBQUU7dUVBQWdCO0lBQ2Y7UUFBUixLQUFLLEVBQUU7bUVBQVk7SUFDWDtRQUFSLEtBQUssRUFBRTttRUFBWTtJQUNYO1FBQVIsS0FBSyxFQUFFO3dFQUFrQztJQUNqQztRQUFSLEtBQUssRUFBRTtpRUFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7c0VBQStCO0lBQzlCO1FBQVIsS0FBSyxFQUFFO3NFQUEyQjtJQUMxQjtRQUFSLEtBQUssRUFBRTttRUFBb0I7SUFDbkI7UUFBUixLQUFLLEVBQUU7dUVBQWdDO0lBQy9CO1FBQVIsS0FBSyxFQUFFO3VFQUFnQztJQUMvQjtRQUFSLEtBQUssRUFBRTt5RUFBa0M7SUFDakM7UUFBUixLQUFLLEVBQUU7MkVBQWlDO0lBQ2hDO1FBQVIsS0FBSyxFQUFFOzJFQUFpQztJQUNoQztRQUFSLEtBQUssRUFBRTs0RUFBMEI7SUFDekI7UUFBUixLQUFLLEVBQUU7NEVBQTBCO0lBQ3pCO1FBQVIsS0FBSyxFQUFFO21FQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTttRUFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7bUVBQWdCO0lBQ2Y7UUFBUixLQUFLLEVBQUU7cUVBQStCO0lBQzlCO1FBQVIsS0FBSyxFQUFFO2tFQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTtzRUFBZ0M7SUFDL0I7UUFBUixLQUFLLEVBQUU7NEVBQTBCO0lBQ3pCO1FBQVIsS0FBSyxFQUFFO3NFQUErQjtJQUU3QjtRQUFULE1BQU0sRUFBRTtpRUFBa0Q7SUFDakQ7UUFBVCxNQUFNLEVBQUU7bUVBQW9EO0lBRTVCO1FBQWhDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQzt3RUFBbUM7SUFsQ3hELDJCQUEyQjtRQXpGdkMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGlDQUFpQztZQUMzQyxRQUFRLEVBQUUsdXNGQXVFVDtZQUVELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLFVBQVUsRUFBRTtnQkFDVixPQUFPLENBQUMsZ0JBQWdCLEVBQUU7b0JBQ3hCLFVBQVUsQ0FBQyxRQUFRLEVBQUU7d0JBQ25CLEtBQUssQ0FBQzs0QkFDSixPQUFPLEVBQUUsQ0FBQzs0QkFDVixTQUFTLEVBQUUsR0FBRzt5QkFDZixDQUFDO3dCQUNGLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztxQkFDM0QsQ0FBQztpQkFDSCxDQUFDO2FBQ0g7O1NBQ0YsQ0FBQztPQUNXLDJCQUEyQixDQXNRdkM7SUFBRCxrQ0FBQztDQUFBLEFBdFFELENBQWlELGtCQUFrQixHQXNRbEU7U0F0UVksMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBWaWV3RW5jYXBzdWxhdGlvbixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDb250ZW50Q2hpbGQsXHJcbiAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgdHJpZ2dlciwgc3R5bGUsIGFuaW1hdGUsIHRyYW5zaXRpb24gfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgc2NhbGVCYW5kLCBzY2FsZUxpbmVhciB9IGZyb20gJ2QzLXNjYWxlJztcclxuXHJcbmltcG9ydCB7IGNhbGN1bGF0ZVZpZXdEaW1lbnNpb25zLCBWaWV3RGltZW5zaW9ucyB9IGZyb20gJy4uL2NvbW1vbi92aWV3LWRpbWVuc2lvbnMuaGVscGVyJztcclxuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY29sb3IuaGVscGVyJztcclxuaW1wb3J0IHsgQmFzZUNoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL2Jhc2UtY2hhcnQuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LWNoYXJ0cy1iYXItdmVydGljYWwtc3RhY2tlZCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZ3gtY2hhcnRzLWNoYXJ0XHJcbiAgICAgIFt2aWV3XT1cIlt3aWR0aCwgaGVpZ2h0XVwiXHJcbiAgICAgIFtzaG93TGVnZW5kXT1cImxlZ2VuZFwiXHJcbiAgICAgIFtsZWdlbmRPcHRpb25zXT1cImxlZ2VuZE9wdGlvbnNcIlxyXG4gICAgICBbYWN0aXZlRW50cmllc109XCJhY3RpdmVFbnRyaWVzXCJcclxuICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgIChsZWdlbmRMYWJlbEFjdGl2YXRlKT1cIm9uQWN0aXZhdGUoJGV2ZW50LCB1bmRlZmluZWQsIHRydWUpXCJcclxuICAgICAgKGxlZ2VuZExhYmVsRGVhY3RpdmF0ZSk9XCJvbkRlYWN0aXZhdGUoJGV2ZW50LCB1bmRlZmluZWQsIHRydWUpXCJcclxuICAgICAgKGxlZ2VuZExhYmVsQ2xpY2spPVwib25DbGljaygkZXZlbnQpXCJcclxuICAgID5cclxuICAgICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIiBjbGFzcz1cImJhci1jaGFydCBjaGFydFwiPlxyXG4gICAgICAgIDxzdmc6Z1xyXG4gICAgICAgICAgbmd4LWNoYXJ0cy14LWF4aXNcclxuICAgICAgICAgICpuZ0lmPVwieEF4aXNcIlxyXG4gICAgICAgICAgW3hTY2FsZV09XCJ4U2NhbGVcIlxyXG4gICAgICAgICAgW2RpbXNdPVwiZGltc1wiXHJcbiAgICAgICAgICBbc2hvd0xhYmVsXT1cInNob3dYQXhpc0xhYmVsXCJcclxuICAgICAgICAgIFtsYWJlbFRleHRdPVwieEF4aXNMYWJlbFwiXHJcbiAgICAgICAgICBbdHJpbVRpY2tzXT1cInRyaW1YQXhpc1RpY2tzXCJcclxuICAgICAgICAgIFtyb3RhdGVUaWNrc109XCJyb3RhdGVYQXhpc1RpY2tzXCJcclxuICAgICAgICAgIFttYXhUaWNrTGVuZ3RoXT1cIm1heFhBeGlzVGlja0xlbmd0aFwiXHJcbiAgICAgICAgICBbdGlja0Zvcm1hdHRpbmddPVwieEF4aXNUaWNrRm9ybWF0dGluZ1wiXHJcbiAgICAgICAgICBbdGlja3NdPVwieEF4aXNUaWNrc1wiXHJcbiAgICAgICAgICBbeEF4aXNPZmZzZXRdPVwiZGF0YUxhYmVsTWF4SGVpZ2h0Lm5lZ2F0aXZlXCJcclxuICAgICAgICAgIChkaW1lbnNpb25zQ2hhbmdlZCk9XCJ1cGRhdGVYQXhpc0hlaWdodCgkZXZlbnQpXCJcclxuICAgICAgICA+PC9zdmc6Zz5cclxuICAgICAgICA8c3ZnOmdcclxuICAgICAgICAgIG5neC1jaGFydHMteS1heGlzXHJcbiAgICAgICAgICAqbmdJZj1cInlBeGlzXCJcclxuICAgICAgICAgIFt5U2NhbGVdPVwieVNjYWxlXCJcclxuICAgICAgICAgIFtkaW1zXT1cImRpbXNcIlxyXG4gICAgICAgICAgW3Nob3dHcmlkTGluZXNdPVwic2hvd0dyaWRMaW5lc1wiXHJcbiAgICAgICAgICBbc2hvd0xhYmVsXT1cInNob3dZQXhpc0xhYmVsXCJcclxuICAgICAgICAgIFtsYWJlbFRleHRdPVwieUF4aXNMYWJlbFwiXHJcbiAgICAgICAgICBbdHJpbVRpY2tzXT1cInRyaW1ZQXhpc1RpY2tzXCJcclxuICAgICAgICAgIFttYXhUaWNrTGVuZ3RoXT1cIm1heFlBeGlzVGlja0xlbmd0aFwiXHJcbiAgICAgICAgICBbdGlja0Zvcm1hdHRpbmddPVwieUF4aXNUaWNrRm9ybWF0dGluZ1wiXHJcbiAgICAgICAgICBbdGlja3NdPVwieUF4aXNUaWNrc1wiXHJcbiAgICAgICAgICAoZGltZW5zaW9uc0NoYW5nZWQpPVwidXBkYXRlWUF4aXNXaWR0aCgkZXZlbnQpXCJcclxuICAgICAgICA+PC9zdmc6Zz5cclxuICAgICAgICA8c3ZnOmdcclxuICAgICAgICAgICpuZ0Zvcj1cImxldCBncm91cCBvZiByZXN1bHRzOyBsZXQgaW5kZXggPSBpbmRleDsgdHJhY2tCeTogdHJhY2tCeVwiXHJcbiAgICAgICAgICBbQGFuaW1hdGlvblN0YXRlXT1cIidhY3RpdmUnXCJcclxuICAgICAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJncm91cFRyYW5zZm9ybShncm91cClcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxzdmc6Z1xyXG4gICAgICAgICAgICBuZ3gtY2hhcnRzLXNlcmllcy12ZXJ0aWNhbFxyXG4gICAgICAgICAgICB0eXBlPVwic3RhY2tlZFwiXHJcbiAgICAgICAgICAgIFt4U2NhbGVdPVwieFNjYWxlXCJcclxuICAgICAgICAgICAgW3lTY2FsZV09XCJ5U2NhbGVcIlxyXG4gICAgICAgICAgICBbYWN0aXZlRW50cmllc109XCJhY3RpdmVFbnRyaWVzXCJcclxuICAgICAgICAgICAgW2NvbG9yc109XCJjb2xvcnNcIlxyXG4gICAgICAgICAgICBbc2VyaWVzXT1cImdyb3VwLnNlcmllc1wiXHJcbiAgICAgICAgICAgIFtkaW1zXT1cImRpbXNcIlxyXG4gICAgICAgICAgICBbZ3JhZGllbnRdPVwiZ3JhZGllbnRcIlxyXG4gICAgICAgICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXHJcbiAgICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcclxuICAgICAgICAgICAgW3Nob3dEYXRhTGFiZWxdPVwic2hvd0RhdGFMYWJlbFwiXHJcbiAgICAgICAgICAgIFtkYXRhTGFiZWxGb3JtYXR0aW5nXT1cImRhdGFMYWJlbEZvcm1hdHRpbmdcIlxyXG4gICAgICAgICAgICBbc2VyaWVzTmFtZV09XCJncm91cC5uYW1lXCJcclxuICAgICAgICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgICAgICAgIFtub0JhcldoZW5aZXJvXT1cIm5vQmFyV2hlblplcm9cIlxyXG4gICAgICAgICAgICAoc2VsZWN0KT1cIm9uQ2xpY2soJGV2ZW50LCBncm91cClcIlxyXG4gICAgICAgICAgICAoYWN0aXZhdGUpPVwib25BY3RpdmF0ZSgkZXZlbnQsIGdyb3VwKVwiXHJcbiAgICAgICAgICAgIChkZWFjdGl2YXRlKT1cIm9uRGVhY3RpdmF0ZSgkZXZlbnQsIGdyb3VwKVwiXHJcbiAgICAgICAgICAgIChkYXRhTGFiZWxIZWlnaHRDaGFuZ2VkKT1cIm9uRGF0YUxhYmVsTWF4SGVpZ2h0Q2hhbmdlZCgkZXZlbnQsIGluZGV4KVwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvc3ZnOmc+XHJcbiAgICAgIDwvc3ZnOmc+XHJcbiAgICA8L25neC1jaGFydHMtY2hhcnQ+XHJcbiAgYCxcclxuICBzdHlsZVVybHM6IFsnLi4vY29tbW9uL2Jhc2UtY2hhcnQuY29tcG9uZW50LnNjc3MnXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIGFuaW1hdGlvbnM6IFtcclxuICAgIHRyaWdnZXIoJ2FuaW1hdGlvblN0YXRlJywgW1xyXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXHJcbiAgICAgICAgc3R5bGUoe1xyXG4gICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgIHRyYW5zZm9ybTogJyonXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgYW5pbWF0ZSg1MDAsIHN0eWxlKHsgb3BhY2l0eTogMCwgdHJhbnNmb3JtOiAnc2NhbGUoMCknIH0pKVxyXG4gICAgICBdKVxyXG4gICAgXSlcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCYXJWZXJ0aWNhbFN0YWNrZWRDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ2hhcnRDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpIGxlZ2VuZCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGxlZ2VuZFRpdGxlOiBzdHJpbmcgPSAnTGVnZW5kJztcclxuICBASW5wdXQoKSBsZWdlbmRQb3NpdGlvbjogc3RyaW5nID0gJ3JpZ2h0JztcclxuICBASW5wdXQoKSB4QXhpcztcclxuICBASW5wdXQoKSB5QXhpcztcclxuICBASW5wdXQoKSBzaG93WEF4aXNMYWJlbDtcclxuICBASW5wdXQoKSBzaG93WUF4aXNMYWJlbDtcclxuICBASW5wdXQoKSB4QXhpc0xhYmVsO1xyXG4gIEBJbnB1dCgpIHlBeGlzTGFiZWw7XHJcbiAgQElucHV0KCkgdG9vbHRpcERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZ3JhZGllbnQ6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgc2hvd0dyaWRMaW5lczogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCkgYWN0aXZlRW50cmllczogYW55W10gPSBbXTtcclxuICBASW5wdXQoKSBzY2hlbWVUeXBlOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgdHJpbVhBeGlzVGlja3M6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIHRyaW1ZQXhpc1RpY2tzOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSByb3RhdGVYQXhpc1RpY2tzOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSBtYXhYQXhpc1RpY2tMZW5ndGg6IG51bWJlciA9IDE2O1xyXG4gIEBJbnB1dCgpIG1heFlBeGlzVGlja0xlbmd0aDogbnVtYmVyID0gMTY7XHJcbiAgQElucHV0KCkgeEF4aXNUaWNrRm9ybWF0dGluZzogYW55O1xyXG4gIEBJbnB1dCgpIHlBeGlzVGlja0Zvcm1hdHRpbmc6IGFueTtcclxuICBASW5wdXQoKSB4QXhpc1RpY2tzOiBhbnlbXTtcclxuICBASW5wdXQoKSB5QXhpc1RpY2tzOiBhbnlbXTtcclxuICBASW5wdXQoKSBiYXJQYWRkaW5nID0gODtcclxuICBASW5wdXQoKSByb3VuZERvbWFpbnM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSB5U2NhbGVNYXg6IG51bWJlcjtcclxuICBASW5wdXQoKSBzaG93RGF0YUxhYmVsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZGF0YUxhYmVsRm9ybWF0dGluZzogYW55O1xyXG4gIEBJbnB1dCgpIG5vQmFyV2hlblplcm86IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgQENvbnRlbnRDaGlsZCgndG9vbHRpcFRlbXBsYXRlJykgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBkaW1zOiBWaWV3RGltZW5zaW9ucztcclxuICBncm91cERvbWFpbjogYW55W107XHJcbiAgaW5uZXJEb21haW46IGFueVtdO1xyXG4gIHZhbHVlRG9tYWluOiBhbnlbXTtcclxuICB4U2NhbGU6IGFueTtcclxuICB5U2NhbGU6IGFueTtcclxuICB0cmFuc2Zvcm06IHN0cmluZztcclxuICB0aWNrRm9ybWF0dGluZzogKGxhYmVsOiBzdHJpbmcpID0+IHN0cmluZztcclxuICBjb2xvcnM6IENvbG9ySGVscGVyO1xyXG4gIG1hcmdpbiA9IFsxMCwgMjAsIDEwLCAyMF07XHJcbiAgeEF4aXNIZWlnaHQ6IG51bWJlciA9IDA7XHJcbiAgeUF4aXNXaWR0aDogbnVtYmVyID0gMDtcclxuICBsZWdlbmRPcHRpb25zOiBhbnk7XHJcbiAgZGF0YUxhYmVsTWF4SGVpZ2h0OiBhbnkgPSB7IG5lZ2F0aXZlOiAwLCBwb3NpdGl2ZTogMCB9O1xyXG5cclxuICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICBzdXBlci51cGRhdGUoKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuc2hvd0RhdGFMYWJlbCkge1xyXG4gICAgICB0aGlzLmRhdGFMYWJlbE1heEhlaWdodCA9IHsgbmVnYXRpdmU6IDAsIHBvc2l0aXZlOiAwIH07XHJcbiAgICB9XHJcbiAgICB0aGlzLm1hcmdpbiA9IFsxMCArIHRoaXMuZGF0YUxhYmVsTWF4SGVpZ2h0LnBvc2l0aXZlLCAyMCwgMTAgKyB0aGlzLmRhdGFMYWJlbE1heEhlaWdodC5uZWdhdGl2ZSwgMjBdO1xyXG5cclxuICAgIHRoaXMuZGltcyA9IGNhbGN1bGF0ZVZpZXdEaW1lbnNpb25zKHtcclxuICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXHJcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXHJcbiAgICAgIG1hcmdpbnM6IHRoaXMubWFyZ2luLFxyXG4gICAgICBzaG93WEF4aXM6IHRoaXMueEF4aXMsXHJcbiAgICAgIHNob3dZQXhpczogdGhpcy55QXhpcyxcclxuICAgICAgeEF4aXNIZWlnaHQ6IHRoaXMueEF4aXNIZWlnaHQsXHJcbiAgICAgIHlBeGlzV2lkdGg6IHRoaXMueUF4aXNXaWR0aCxcclxuICAgICAgc2hvd1hMYWJlbDogdGhpcy5zaG93WEF4aXNMYWJlbCxcclxuICAgICAgc2hvd1lMYWJlbDogdGhpcy5zaG93WUF4aXNMYWJlbCxcclxuICAgICAgc2hvd0xlZ2VuZDogdGhpcy5sZWdlbmQsXHJcbiAgICAgIGxlZ2VuZFR5cGU6IHRoaXMuc2NoZW1lVHlwZSxcclxuICAgICAgbGVnZW5kUG9zaXRpb246IHRoaXMubGVnZW5kUG9zaXRpb25cclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh0aGlzLnNob3dEYXRhTGFiZWwpIHtcclxuICAgICAgdGhpcy5kaW1zLmhlaWdodCAtPSB0aGlzLmRhdGFMYWJlbE1heEhlaWdodC5uZWdhdGl2ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZvcm1hdERhdGVzKCk7XHJcblxyXG4gICAgdGhpcy5ncm91cERvbWFpbiA9IHRoaXMuZ2V0R3JvdXBEb21haW4oKTtcclxuICAgIHRoaXMuaW5uZXJEb21haW4gPSB0aGlzLmdldElubmVyRG9tYWluKCk7XHJcbiAgICB0aGlzLnZhbHVlRG9tYWluID0gdGhpcy5nZXRWYWx1ZURvbWFpbigpO1xyXG5cclxuICAgIHRoaXMueFNjYWxlID0gdGhpcy5nZXRYU2NhbGUoKTtcclxuICAgIHRoaXMueVNjYWxlID0gdGhpcy5nZXRZU2NhbGUoKTtcclxuXHJcbiAgICB0aGlzLnNldENvbG9ycygpO1xyXG4gICAgdGhpcy5sZWdlbmRPcHRpb25zID0gdGhpcy5nZXRMZWdlbmRPcHRpb25zKCk7XHJcblxyXG4gICAgdGhpcy50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7dGhpcy5kaW1zLnhPZmZzZXR9ICwgJHt0aGlzLm1hcmdpblswXSArIHRoaXMuZGF0YUxhYmVsTWF4SGVpZ2h0Lm5lZ2F0aXZlfSlgO1xyXG4gIH1cclxuXHJcbiAgZ2V0R3JvdXBEb21haW4oKSB7XHJcbiAgICBjb25zdCBkb21haW4gPSBbXTtcclxuICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgdGhpcy5yZXN1bHRzKSB7XHJcbiAgICAgIGlmICghZG9tYWluLmluY2x1ZGVzKGdyb3VwLmxhYmVsKSkge1xyXG4gICAgICAgIGRvbWFpbi5wdXNoKGdyb3VwLmxhYmVsKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRvbWFpbjtcclxuICB9XHJcblxyXG4gIGdldElubmVyRG9tYWluKCkge1xyXG4gICAgY29uc3QgZG9tYWluID0gW107XHJcbiAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIHRoaXMucmVzdWx0cykge1xyXG4gICAgICBmb3IgKGNvbnN0IGQgb2YgZ3JvdXAuc2VyaWVzKSB7XHJcbiAgICAgICAgaWYgKCFkb21haW4uaW5jbHVkZXMoZC5sYWJlbCkpIHtcclxuICAgICAgICAgIGRvbWFpbi5wdXNoKGQubGFiZWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRvbWFpbjtcclxuICB9XHJcblxyXG4gIGdldFZhbHVlRG9tYWluKCkge1xyXG4gICAgY29uc3QgZG9tYWluID0gW107XHJcbiAgICBsZXQgc21hbGxlc3QgPSAwO1xyXG4gICAgbGV0IGJpZ2dlc3QgPSAwO1xyXG4gICAgZm9yIChjb25zdCBncm91cCBvZiB0aGlzLnJlc3VsdHMpIHtcclxuICAgICAgbGV0IHNtYWxsZXN0U3VtID0gMDtcclxuICAgICAgbGV0IGJpZ2dlc3RTdW0gPSAwO1xyXG4gICAgICBmb3IgKGNvbnN0IGQgb2YgZ3JvdXAuc2VyaWVzKSB7XHJcbiAgICAgICAgaWYgKGQudmFsdWUgPCAwKSB7XHJcbiAgICAgICAgICBzbWFsbGVzdFN1bSArPSBkLnZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBiaWdnZXN0U3VtICs9IGQudmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNtYWxsZXN0ID0gZC52YWx1ZSA8IHNtYWxsZXN0ID8gZC52YWx1ZSA6IHNtYWxsZXN0O1xyXG4gICAgICAgIGJpZ2dlc3QgPSBkLnZhbHVlID4gYmlnZ2VzdCA/IGQudmFsdWUgOiBiaWdnZXN0O1xyXG4gICAgICB9XHJcbiAgICAgIGRvbWFpbi5wdXNoKHNtYWxsZXN0U3VtKTtcclxuICAgICAgZG9tYWluLnB1c2goYmlnZ2VzdFN1bSk7XHJcbiAgICB9XHJcbiAgICBkb21haW4ucHVzaChzbWFsbGVzdCk7XHJcbiAgICBkb21haW4ucHVzaChiaWdnZXN0KTtcclxuXHJcbiAgICBjb25zdCBtaW4gPSBNYXRoLm1pbigwLCAuLi5kb21haW4pO1xyXG4gICAgY29uc3QgbWF4ID0gdGhpcy55U2NhbGVNYXggPyBNYXRoLm1heCh0aGlzLnlTY2FsZU1heCwgLi4uZG9tYWluKSA6IE1hdGgubWF4KC4uLmRvbWFpbik7XHJcbiAgICByZXR1cm4gW21pbiwgbWF4XTtcclxuICB9XHJcblxyXG4gIGdldFhTY2FsZSgpOiBhbnkge1xyXG4gICAgY29uc3Qgc3BhY2luZyA9IHRoaXMuZ3JvdXBEb21haW4ubGVuZ3RoIC8gKHRoaXMuZGltcy53aWR0aCAvIHRoaXMuYmFyUGFkZGluZyArIDEpO1xyXG4gICAgcmV0dXJuIHNjYWxlQmFuZCgpXHJcbiAgICAgIC5yYW5nZVJvdW5kKFswLCB0aGlzLmRpbXMud2lkdGhdKVxyXG4gICAgICAucGFkZGluZ0lubmVyKHNwYWNpbmcpXHJcbiAgICAgIC5kb21haW4odGhpcy5ncm91cERvbWFpbik7XHJcbiAgfVxyXG5cclxuICBnZXRZU2NhbGUoKTogYW55IHtcclxuICAgIGNvbnN0IHNjYWxlID0gc2NhbGVMaW5lYXIoKVxyXG4gICAgICAucmFuZ2UoW3RoaXMuZGltcy5oZWlnaHQsIDBdKVxyXG4gICAgICAuZG9tYWluKHRoaXMudmFsdWVEb21haW4pO1xyXG4gICAgcmV0dXJuIHRoaXMucm91bmREb21haW5zID8gc2NhbGUubmljZSgpIDogc2NhbGU7XHJcbiAgfVxyXG5cclxuICBvbkRhdGFMYWJlbE1heEhlaWdodENoYW5nZWQoZXZlbnQsIGdyb3VwSW5kZXgpIHtcclxuICAgIGlmIChldmVudC5zaXplLm5lZ2F0aXZlKSB7XHJcbiAgICAgIHRoaXMuZGF0YUxhYmVsTWF4SGVpZ2h0Lm5lZ2F0aXZlID0gTWF0aC5tYXgodGhpcy5kYXRhTGFiZWxNYXhIZWlnaHQubmVnYXRpdmUsIGV2ZW50LnNpemUuaGVpZ2h0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZGF0YUxhYmVsTWF4SGVpZ2h0LnBvc2l0aXZlID0gTWF0aC5tYXgodGhpcy5kYXRhTGFiZWxNYXhIZWlnaHQucG9zaXRpdmUsIGV2ZW50LnNpemUuaGVpZ2h0KTtcclxuICAgIH1cclxuICAgIGlmIChncm91cEluZGV4ID09PSB0aGlzLnJlc3VsdHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlKCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ3JvdXBUcmFuc2Zvcm0oZ3JvdXApIHtcclxuICAgIHJldHVybiBgdHJhbnNsYXRlKCR7dGhpcy54U2NhbGUoZ3JvdXAubmFtZSkgfHwgMH0sIDApYDtcclxuICB9XHJcblxyXG4gIG9uQ2xpY2soZGF0YSwgZ3JvdXA/KSB7XHJcbiAgICBpZiAoZ3JvdXApIHtcclxuICAgICAgZGF0YS5zZXJpZXMgPSBncm91cC5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XHJcbiAgfVxyXG5cclxuICB0cmFja0J5KGluZGV4LCBpdGVtKSB7XHJcbiAgICByZXR1cm4gaXRlbS5uYW1lO1xyXG4gIH1cclxuXHJcbiAgc2V0Q29sb3JzKCk6IHZvaWQge1xyXG4gICAgbGV0IGRvbWFpbjtcclxuICAgIGlmICh0aGlzLnNjaGVtZVR5cGUgPT09ICdvcmRpbmFsJykge1xyXG4gICAgICBkb21haW4gPSB0aGlzLmlubmVyRG9tYWluO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZG9tYWluID0gdGhpcy52YWx1ZURvbWFpbjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNvbG9ycyA9IG5ldyBDb2xvckhlbHBlcih0aGlzLnNjaGVtZSwgdGhpcy5zY2hlbWVUeXBlLCBkb21haW4sIHRoaXMuY3VzdG9tQ29sb3JzKTtcclxuICB9XHJcblxyXG4gIGdldExlZ2VuZE9wdGlvbnMoKSB7XHJcbiAgICBjb25zdCBvcHRzID0ge1xyXG4gICAgICBzY2FsZVR5cGU6IHRoaXMuc2NoZW1lVHlwZSxcclxuICAgICAgY29sb3JzOiB1bmRlZmluZWQsXHJcbiAgICAgIGRvbWFpbjogW10sXHJcbiAgICAgIHRpdGxlOiB1bmRlZmluZWQsXHJcbiAgICAgIHBvc2l0aW9uOiB0aGlzLmxlZ2VuZFBvc2l0aW9uXHJcbiAgICB9O1xyXG4gICAgaWYgKG9wdHMuc2NhbGVUeXBlID09PSAnb3JkaW5hbCcpIHtcclxuICAgICAgb3B0cy5kb21haW4gPSB0aGlzLmlubmVyRG9tYWluO1xyXG4gICAgICBvcHRzLmNvbG9ycyA9IHRoaXMuY29sb3JzO1xyXG4gICAgICBvcHRzLnRpdGxlID0gdGhpcy5sZWdlbmRUaXRsZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG9wdHMuZG9tYWluID0gdGhpcy52YWx1ZURvbWFpbjtcclxuICAgICAgb3B0cy5jb2xvcnMgPSB0aGlzLmNvbG9ycy5zY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb3B0cztcclxuICB9XHJcblxyXG4gIHVwZGF0ZVlBeGlzV2lkdGgoeyB3aWR0aCB9KSB7XHJcbiAgICB0aGlzLnlBeGlzV2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVYQXhpc0hlaWdodCh7IGhlaWdodCB9KSB7XHJcbiAgICB0aGlzLnhBeGlzSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIG9uQWN0aXZhdGUoZXZlbnQsIGdyb3VwLCBmcm9tTGVnZW5kID0gZmFsc2UpIHtcclxuICAgIGNvbnN0IGl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LCBldmVudCk7XHJcbiAgICBpZiAoZ3JvdXApIHtcclxuICAgICAgaXRlbS5zZXJpZXMgPSBncm91cC5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5yZXN1bHRzXHJcbiAgICAgIC5tYXAoZyA9PiBnLnNlcmllcylcclxuICAgICAgLmZsYXQoKVxyXG4gICAgICAuZmlsdGVyKGkgPT4ge1xyXG4gICAgICAgIGlmIChmcm9tTGVnZW5kKSB7XHJcbiAgICAgICAgICByZXR1cm4gaS5sYWJlbCA9PT0gaXRlbS5uYW1lO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gaS5uYW1lID09PSBpdGVtLm5hbWUgJiYgaS5zZXJpZXMgPT09IGl0ZW0uc2VyaWVzO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgdGhpcy5hY3RpdmVFbnRyaWVzID0gWy4uLml0ZW1zXTtcclxuICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7IHZhbHVlOiBpdGVtLCBlbnRyaWVzOiB0aGlzLmFjdGl2ZUVudHJpZXMgfSk7XHJcbiAgfVxyXG5cclxuICBvbkRlYWN0aXZhdGUoZXZlbnQsIGdyb3VwLCBmcm9tTGVnZW5kID0gZmFsc2UpIHtcclxuICAgIGNvbnN0IGl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LCBldmVudCk7XHJcbiAgICBpZiAoZ3JvdXApIHtcclxuICAgICAgaXRlbS5zZXJpZXMgPSBncm91cC5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWN0aXZlRW50cmllcyA9IHRoaXMuYWN0aXZlRW50cmllcy5maWx0ZXIoaSA9PiB7XHJcbiAgICAgIGlmIChmcm9tTGVnZW5kKSB7XHJcbiAgICAgICAgcmV0dXJuIGkubGFiZWwgIT09IGl0ZW0ubmFtZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gIShpLm5hbWUgPT09IGl0ZW0ubmFtZSAmJiBpLnNlcmllcyA9PT0gaXRlbS5zZXJpZXMpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmRlYWN0aXZhdGUuZW1pdCh7IHZhbHVlOiBpdGVtLCBlbnRyaWVzOiB0aGlzLmFjdGl2ZUVudHJpZXMgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==