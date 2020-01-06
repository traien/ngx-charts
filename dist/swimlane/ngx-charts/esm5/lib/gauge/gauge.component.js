import { __decorate, __extends, __read, __spread, __values } from "tslib";
import { Component, Input, ViewChild, ChangeDetectionStrategy, Output, EventEmitter, ViewEncapsulation, ContentChild } from '@angular/core';
import { scaleLinear } from 'd3-scale';
import { BaseChartComponent } from '../common/base-chart.component';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
var GaugeComponent = /** @class */ (function (_super) {
    __extends(GaugeComponent, _super);
    function GaugeComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.min = 0;
        _this.max = 100;
        _this.bigSegments = 10;
        _this.smallSegments = 5;
        _this.showAxis = true;
        _this.startAngle = -120;
        _this.angleSpan = 240;
        _this.activeEntries = [];
        _this.tooltipDisabled = false;
        _this.showText = true;
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.resizeScale = 1;
        _this.rotation = '';
        _this.textTransform = 'scale(1, 1)';
        _this.cornerRadius = 10;
        return _this;
    }
    GaugeComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        _super.prototype.ngAfterViewInit.call(this);
        setTimeout(function () { return _this.scaleText(); });
    };
    GaugeComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        if (!this.showAxis) {
            if (!this.margin) {
                this.margin = [10, 20, 10, 20];
            }
        }
        else {
            if (!this.margin) {
                this.margin = [60, 100, 60, 100];
            }
        }
        // make the starting angle positive
        if (this.startAngle < 0) {
            this.startAngle = (this.startAngle % 360) + 360;
        }
        this.angleSpan = Math.min(this.angleSpan, 360);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showLegend: this.legend,
            legendPosition: this.legendPosition
        });
        this.domain = this.getDomain();
        this.valueDomain = this.getValueDomain();
        this.valueScale = this.getValueScale();
        this.displayValue = this.getDisplayValue();
        this.outerRadius = Math.min(this.dims.width, this.dims.height) / 2;
        this.arcs = this.getArcs();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        var xOffset = this.margin[3] + this.dims.width / 2;
        var yOffset = this.margin[0] + this.dims.height / 2;
        this.transform = "translate(" + xOffset + ", " + yOffset + ")";
        this.rotation = "rotate(" + this.startAngle + ")";
        setTimeout(function () { return _this.scaleText(); }, 50);
    };
    GaugeComponent.prototype.getArcs = function () {
        var e_1, _a;
        var arcs = [];
        var availableRadius = this.outerRadius * 0.7;
        var radiusPerArc = Math.min(availableRadius / this.results.length, 10);
        var arcWidth = radiusPerArc * 0.7;
        this.textRadius = this.outerRadius - this.results.length * radiusPerArc;
        this.cornerRadius = Math.floor(arcWidth / 2);
        var i = 0;
        try {
            for (var _b = __values(this.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                var d = _c.value;
                var outerRadius = this.outerRadius - i * radiusPerArc;
                var innerRadius = outerRadius - arcWidth;
                var backgroundArc = {
                    endAngle: (this.angleSpan * Math.PI) / 180,
                    innerRadius: innerRadius,
                    outerRadius: outerRadius,
                    data: {
                        value: this.max,
                        name: d.name
                    }
                };
                var valueArc = {
                    endAngle: (Math.min(this.valueScale(d.value), this.angleSpan) * Math.PI) / 180,
                    innerRadius: innerRadius,
                    outerRadius: outerRadius,
                    data: {
                        value: d.value,
                        name: d.name
                    }
                };
                var arc = {
                    backgroundArc: backgroundArc,
                    valueArc: valueArc
                };
                arcs.push(arc);
                i++;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return arcs;
    };
    GaugeComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    GaugeComponent.prototype.getValueDomain = function () {
        var values = this.results.map(function (d) { return d.value; });
        var dataMin = Math.min.apply(Math, __spread(values));
        var dataMax = Math.max.apply(Math, __spread(values));
        if (this.min !== undefined) {
            this.min = Math.min(this.min, dataMin);
        }
        else {
            this.min = dataMin;
        }
        if (this.max !== undefined) {
            this.max = Math.max(this.max, dataMax);
        }
        else {
            this.max = dataMax;
        }
        return [this.min, this.max];
    };
    GaugeComponent.prototype.getValueScale = function () {
        return scaleLinear()
            .range([0, this.angleSpan])
            .nice()
            .domain(this.valueDomain);
    };
    GaugeComponent.prototype.getDisplayValue = function () {
        var value = this.results.map(function (d) { return d.value; }).reduce(function (a, b) { return a + b; }, 0);
        if (this.textValue && 0 !== this.textValue.length) {
            return this.textValue.toLocaleString();
        }
        if (this.valueFormatting) {
            return this.valueFormatting(value);
        }
        return value.toLocaleString();
    };
    GaugeComponent.prototype.scaleText = function (repeat) {
        var _this = this;
        if (repeat === void 0) { repeat = true; }
        if (!this.showText) {
            return;
        }
        var width = this.textEl.nativeElement.getBoundingClientRect().width;
        var oldScale = this.resizeScale;
        if (width === 0) {
            this.resizeScale = 1;
        }
        else {
            var availableSpace = this.textRadius;
            this.resizeScale = Math.floor((availableSpace / (width / this.resizeScale)) * 100) / 100;
        }
        if (this.resizeScale !== oldScale) {
            this.textTransform = "scale(" + this.resizeScale + ", " + this.resizeScale + ")";
            this.cd.markForCheck();
            if (repeat) {
                setTimeout(function () { return _this.scaleText(false); }, 50);
            }
        }
    };
    GaugeComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    GaugeComponent.prototype.getLegendOptions = function () {
        return {
            scaleType: 'ordinal',
            colors: this.colors,
            domain: this.domain,
            title: this.legendTitle,
            position: this.legendPosition
        };
    };
    GaugeComponent.prototype.setColors = function () {
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    GaugeComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = __spread([item], this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    GaugeComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = __spread(this.activeEntries);
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    GaugeComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    };
    GaugeComponent.prototype.trackBy = function (index, item) {
        return item.valueArc.data.name;
    };
    __decorate([
        Input()
    ], GaugeComponent.prototype, "legend", void 0);
    __decorate([
        Input()
    ], GaugeComponent.prototype, "legendTitle", void 0);
    __decorate([
        Input()
    ], GaugeComponent.prototype, "legendPosition", void 0);
    __decorate([
        Input()
    ], GaugeComponent.prototype, "min", void 0);
    __decorate([
        Input()
    ], GaugeComponent.prototype, "max", void 0);
    __decorate([
        Input()
    ], GaugeComponent.prototype, "textValue", void 0);
    __decorate([
        Input()
    ], GaugeComponent.prototype, "units", void 0);
    __decorate([
        Input()
    ], GaugeComponent.prototype, "bigSegments", void 0);
    __decorate([
        Input()
    ], GaugeComponent.prototype, "smallSegments", void 0);
    __decorate([
        Input()
    ], GaugeComponent.prototype, "results", void 0);
    __decorate([
        Input()
    ], GaugeComponent.prototype, "showAxis", void 0);
    __decorate([
        Input()
    ], GaugeComponent.prototype, "startAngle", void 0);
    __decorate([
        Input()
    ], GaugeComponent.prototype, "angleSpan", void 0);
    __decorate([
        Input()
    ], GaugeComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input()
    ], GaugeComponent.prototype, "axisTickFormatting", void 0);
    __decorate([
        Input()
    ], GaugeComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input()
    ], GaugeComponent.prototype, "valueFormatting", void 0);
    __decorate([
        Input()
    ], GaugeComponent.prototype, "showText", void 0);
    __decorate([
        Input()
    ], GaugeComponent.prototype, "margin", void 0);
    __decorate([
        Output()
    ], GaugeComponent.prototype, "activate", void 0);
    __decorate([
        Output()
    ], GaugeComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate')
    ], GaugeComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        ViewChild('textEl')
    ], GaugeComponent.prototype, "textEl", void 0);
    GaugeComponent = __decorate([
        Component({
            selector: 'ngx-charts-gauge',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n    >\n      <svg:g [attr.transform]=\"transform\" class=\"gauge chart\">\n        <svg:g *ngFor=\"let arc of arcs; trackBy: trackBy\" [attr.transform]=\"rotation\">\n          <svg:g\n            ngx-charts-gauge-arc\n            [backgroundArc]=\"arc.backgroundArc\"\n            [valueArc]=\"arc.valueArc\"\n            [cornerRadius]=\"cornerRadius\"\n            [colors]=\"colors\"\n            [isActive]=\"isActive(arc.valueArc.data)\"\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [valueFormatting]=\"valueFormatting\"\n            [animations]=\"animations\"\n            (select)=\"onClick($event)\"\n            (activate)=\"onActivate($event)\"\n            (deactivate)=\"onDeactivate($event)\"\n          ></svg:g>\n        </svg:g>\n\n        <svg:g\n          ngx-charts-gauge-axis\n          *ngIf=\"showAxis\"\n          [bigSegments]=\"bigSegments\"\n          [smallSegments]=\"smallSegments\"\n          [min]=\"min\"\n          [max]=\"max\"\n          [radius]=\"outerRadius\"\n          [angleSpan]=\"angleSpan\"\n          [valueScale]=\"valueScale\"\n          [startAngle]=\"startAngle\"\n          [tickFormatting]=\"axisTickFormatting\"\n        ></svg:g>\n\n        <svg:text\n          #textEl\n          *ngIf=\"showText\"\n          [style.textAnchor]=\"'middle'\"\n          [attr.transform]=\"textTransform\"\n          alignment-baseline=\"central\"\n        >\n          <tspan x=\"0\" dy=\"0\">{{ displayValue }}</tspan>\n          <tspan x=\"0\" dy=\"1.2em\">{{ units }}</tspan>\n        </svg:text>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".gauge .background-arc path{fill:rgba(0,0,0,.05)}.gauge .gauge-tick path{stroke:#666}.gauge .gauge-tick text{font-size:12px;fill:#666;font-weight:700}.gauge .gauge-tick-large path{stroke-width:2px}.gauge .gauge-tick-small path{stroke-width:1px}"]
        })
    ], GaugeComponent);
    return GaugeComponent;
}(BaseChartComponent));
export { GaugeComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F1Z2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvZ2F1Z2UvZ2F1Z2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxTQUFTLEVBRVQsdUJBQXVCLEVBQ3ZCLE1BQU0sRUFDTixZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLFlBQVksRUFFYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRXZDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSx1QkFBdUIsRUFBa0IsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFpRXJEO0lBQW9DLGtDQUFrQjtJQUF0RDtRQUFBLHFFQTRRQztRQTNRVSxZQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsaUJBQVcsR0FBVyxRQUFRLENBQUM7UUFDL0Isb0JBQWMsR0FBVyxPQUFPLENBQUM7UUFDakMsU0FBRyxHQUFXLENBQUMsQ0FBQztRQUNoQixTQUFHLEdBQVcsR0FBRyxDQUFDO1FBR2xCLGlCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLG1CQUFhLEdBQVcsQ0FBQyxDQUFDO1FBRTFCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFDekIsZ0JBQVUsR0FBVyxDQUFDLEdBQUcsQ0FBQztRQUMxQixlQUFTLEdBQVcsR0FBRyxDQUFDO1FBQ3hCLG1CQUFhLEdBQVUsRUFBRSxDQUFDO1FBRTFCLHFCQUFlLEdBQVksS0FBSyxDQUFDO1FBRWpDLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFLeEIsY0FBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pELGdCQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENB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UixLQUFLLEVBQUU7bURBQWdCO0lBQ2Y7UUFBUixLQUFLLEVBQUU7b0RBQTBCO0lBQ3pCO1FBQVIsS0FBSyxFQUFFO3NEQUEyQjtJQUMxQjtRQUFSLEtBQUssRUFBRTtxREFBeUI7SUFDeEI7UUFBUixLQUFLLEVBQUU7eURBQTJCO0lBQzFCO1FBQVIsS0FBSyxFQUFFOzhEQUF5QjtJQUN4QjtRQUFSLEtBQUssRUFBRTsyREFBa0M7SUFDakM7UUFBUixLQUFLLEVBQUU7MkRBQXlDO0lBQ3hDO1FBQVIsS0FBSyxFQUFFO29EQUEwQjtJQUd6QjtRQUFSLEtBQUssRUFBRTtrREFBZTtJQUViO1FBQVQsTUFBTSxFQUFFO29EQUFrRDtJQUNqRDtRQUFULE1BQU0sRUFBRTtzREFBb0Q7SUFFNUI7UUFBaEMsWUFBWSxDQUFDLGlCQUFpQixDQUFDOzJEQUFtQztJQUU5QztRQUFwQixTQUFTLENBQUMsUUFBUSxDQUFDO2tEQUFvQjtJQTVCN0IsY0FBYztRQS9EMUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixRQUFRLEVBQUUsZytEQXdEVDtZQUVELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNoRCxDQUFDO09BQ1csY0FBYyxDQTRRMUI7SUFBRCxxQkFBQztDQUFBLEFBNVFELENBQW9DLGtCQUFrQixHQTRRckQ7U0E1UVksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgVmlld0NoaWxkLFxyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBWaWV3RW5jYXBzdWxhdGlvbixcclxuICBDb250ZW50Q2hpbGQsXHJcbiAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgc2NhbGVMaW5lYXIgfSBmcm9tICdkMy1zY2FsZSc7XHJcblxyXG5pbXBvcnQgeyBCYXNlQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuLi9jb21tb24vYmFzZS1jaGFydC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucywgVmlld0RpbWVuc2lvbnMgfSBmcm9tICcuLi9jb21tb24vdmlldy1kaW1lbnNpb25zLmhlbHBlcic7XHJcbmltcG9ydCB7IENvbG9ySGVscGVyIH0gZnJvbSAnLi4vY29tbW9uL2NvbG9yLmhlbHBlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC1jaGFydHMtZ2F1Z2UnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8bmd4LWNoYXJ0cy1jaGFydFxyXG4gICAgICBbdmlld109XCJbd2lkdGgsIGhlaWdodF1cIlxyXG4gICAgICBbc2hvd0xlZ2VuZF09XCJsZWdlbmRcIlxyXG4gICAgICBbbGVnZW5kT3B0aW9uc109XCJsZWdlbmRPcHRpb25zXCJcclxuICAgICAgW2FjdGl2ZUVudHJpZXNdPVwiYWN0aXZlRW50cmllc1wiXHJcbiAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxyXG4gICAgICAobGVnZW5kTGFiZWxDbGljayk9XCJvbkNsaWNrKCRldmVudClcIlxyXG4gICAgICAobGVnZW5kTGFiZWxBY3RpdmF0ZSk9XCJvbkFjdGl2YXRlKCRldmVudClcIlxyXG4gICAgICAobGVnZW5kTGFiZWxEZWFjdGl2YXRlKT1cIm9uRGVhY3RpdmF0ZSgkZXZlbnQpXCJcclxuICAgID5cclxuICAgICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIiBjbGFzcz1cImdhdWdlIGNoYXJ0XCI+XHJcbiAgICAgICAgPHN2ZzpnICpuZ0Zvcj1cImxldCBhcmMgb2YgYXJjczsgdHJhY2tCeTogdHJhY2tCeVwiIFthdHRyLnRyYW5zZm9ybV09XCJyb3RhdGlvblwiPlxyXG4gICAgICAgICAgPHN2ZzpnXHJcbiAgICAgICAgICAgIG5neC1jaGFydHMtZ2F1Z2UtYXJjXHJcbiAgICAgICAgICAgIFtiYWNrZ3JvdW5kQXJjXT1cImFyYy5iYWNrZ3JvdW5kQXJjXCJcclxuICAgICAgICAgICAgW3ZhbHVlQXJjXT1cImFyYy52YWx1ZUFyY1wiXHJcbiAgICAgICAgICAgIFtjb3JuZXJSYWRpdXNdPVwiY29ybmVyUmFkaXVzXCJcclxuICAgICAgICAgICAgW2NvbG9yc109XCJjb2xvcnNcIlxyXG4gICAgICAgICAgICBbaXNBY3RpdmVdPVwiaXNBY3RpdmUoYXJjLnZhbHVlQXJjLmRhdGEpXCJcclxuICAgICAgICAgICAgW3Rvb2x0aXBEaXNhYmxlZF09XCJ0b29sdGlwRGlzYWJsZWRcIlxyXG4gICAgICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXHJcbiAgICAgICAgICAgIFt2YWx1ZUZvcm1hdHRpbmddPVwidmFsdWVGb3JtYXR0aW5nXCJcclxuICAgICAgICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgICAgICAgIChzZWxlY3QpPVwib25DbGljaygkZXZlbnQpXCJcclxuICAgICAgICAgICAgKGFjdGl2YXRlKT1cIm9uQWN0aXZhdGUoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgIChkZWFjdGl2YXRlKT1cIm9uRGVhY3RpdmF0ZSgkZXZlbnQpXCJcclxuICAgICAgICAgID48L3N2ZzpnPlxyXG4gICAgICAgIDwvc3ZnOmc+XHJcblxyXG4gICAgICAgIDxzdmc6Z1xyXG4gICAgICAgICAgbmd4LWNoYXJ0cy1nYXVnZS1heGlzXHJcbiAgICAgICAgICAqbmdJZj1cInNob3dBeGlzXCJcclxuICAgICAgICAgIFtiaWdTZWdtZW50c109XCJiaWdTZWdtZW50c1wiXHJcbiAgICAgICAgICBbc21hbGxTZWdtZW50c109XCJzbWFsbFNlZ21lbnRzXCJcclxuICAgICAgICAgIFttaW5dPVwibWluXCJcclxuICAgICAgICAgIFttYXhdPVwibWF4XCJcclxuICAgICAgICAgIFtyYWRpdXNdPVwib3V0ZXJSYWRpdXNcIlxyXG4gICAgICAgICAgW2FuZ2xlU3Bhbl09XCJhbmdsZVNwYW5cIlxyXG4gICAgICAgICAgW3ZhbHVlU2NhbGVdPVwidmFsdWVTY2FsZVwiXHJcbiAgICAgICAgICBbc3RhcnRBbmdsZV09XCJzdGFydEFuZ2xlXCJcclxuICAgICAgICAgIFt0aWNrRm9ybWF0dGluZ109XCJheGlzVGlja0Zvcm1hdHRpbmdcIlxyXG4gICAgICAgID48L3N2ZzpnPlxyXG5cclxuICAgICAgICA8c3ZnOnRleHRcclxuICAgICAgICAgICN0ZXh0RWxcclxuICAgICAgICAgICpuZ0lmPVwic2hvd1RleHRcIlxyXG4gICAgICAgICAgW3N0eWxlLnRleHRBbmNob3JdPVwiJ21pZGRsZSdcIlxyXG4gICAgICAgICAgW2F0dHIudHJhbnNmb3JtXT1cInRleHRUcmFuc2Zvcm1cIlxyXG4gICAgICAgICAgYWxpZ25tZW50LWJhc2VsaW5lPVwiY2VudHJhbFwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPHRzcGFuIHg9XCIwXCIgZHk9XCIwXCI+e3sgZGlzcGxheVZhbHVlIH19PC90c3Bhbj5cclxuICAgICAgICAgIDx0c3BhbiB4PVwiMFwiIGR5PVwiMS4yZW1cIj57eyB1bml0cyB9fTwvdHNwYW4+XHJcbiAgICAgICAgPC9zdmc6dGV4dD5cclxuICAgICAgPC9zdmc6Zz5cclxuICAgIDwvbmd4LWNoYXJ0cy1jaGFydD5cclxuICBgLFxyXG4gIHN0eWxlVXJsczogWycuLi9jb21tb24vYmFzZS1jaGFydC5jb21wb25lbnQuc2NzcycsICcuL2dhdWdlLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2F1Z2VDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ2hhcnRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuICBASW5wdXQoKSBsZWdlbmQgPSBmYWxzZTtcclxuICBASW5wdXQoKSBsZWdlbmRUaXRsZTogc3RyaW5nID0gJ0xlZ2VuZCc7XHJcbiAgQElucHV0KCkgbGVnZW5kUG9zaXRpb246IHN0cmluZyA9ICdyaWdodCc7XHJcbiAgQElucHV0KCkgbWluOiBudW1iZXIgPSAwO1xyXG4gIEBJbnB1dCgpIG1heDogbnVtYmVyID0gMTAwO1xyXG4gIEBJbnB1dCgpIHRleHRWYWx1ZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHVuaXRzOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgYmlnU2VnbWVudHM6IG51bWJlciA9IDEwO1xyXG4gIEBJbnB1dCgpIHNtYWxsU2VnbWVudHM6IG51bWJlciA9IDU7XHJcbiAgQElucHV0KCkgcmVzdWx0czogYW55W107XHJcbiAgQElucHV0KCkgc2hvd0F4aXM6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIHN0YXJ0QW5nbGU6IG51bWJlciA9IC0xMjA7XHJcbiAgQElucHV0KCkgYW5nbGVTcGFuOiBudW1iZXIgPSAyNDA7XHJcbiAgQElucHV0KCkgYWN0aXZlRW50cmllczogYW55W10gPSBbXTtcclxuICBASW5wdXQoKSBheGlzVGlja0Zvcm1hdHRpbmc6IGFueTtcclxuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSB2YWx1ZUZvcm1hdHRpbmc6ICh2YWx1ZTogYW55KSA9PiBzdHJpbmc7XHJcbiAgQElucHV0KCkgc2hvd1RleHQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAvLyBTcGVjaWZ5IG1hcmdpbnNcclxuICBASW5wdXQoKSBtYXJnaW46IGFueVtdO1xyXG5cclxuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgQENvbnRlbnRDaGlsZCgndG9vbHRpcFRlbXBsYXRlJykgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBAVmlld0NoaWxkKCd0ZXh0RWwnKSB0ZXh0RWw6IEVsZW1lbnRSZWY7XHJcblxyXG4gIGRpbXM6IFZpZXdEaW1lbnNpb25zO1xyXG4gIGRvbWFpbjogYW55W107XHJcbiAgdmFsdWVEb21haW46IGFueTtcclxuICB2YWx1ZVNjYWxlOiBhbnk7XHJcblxyXG4gIGNvbG9yczogQ29sb3JIZWxwZXI7XHJcbiAgdHJhbnNmb3JtOiBzdHJpbmc7XHJcblxyXG4gIG91dGVyUmFkaXVzOiBudW1iZXI7XHJcbiAgdGV4dFJhZGl1czogbnVtYmVyOyAvLyBtYXggYXZhaWxhYmxlIHJhZGl1cyBmb3IgdGhlIHRleHRcclxuICByZXNpemVTY2FsZTogbnVtYmVyID0gMTtcclxuICByb3RhdGlvbjogc3RyaW5nID0gJyc7XHJcbiAgdGV4dFRyYW5zZm9ybTogc3RyaW5nID0gJ3NjYWxlKDEsIDEpJztcclxuICBjb3JuZXJSYWRpdXM6IG51bWJlciA9IDEwO1xyXG4gIGFyY3M6IGFueVtdO1xyXG4gIGRpc3BsYXlWYWx1ZTogc3RyaW5nO1xyXG4gIGxlZ2VuZE9wdGlvbnM6IGFueTtcclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgc3VwZXIubmdBZnRlclZpZXdJbml0KCk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2NhbGVUZXh0KCkpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgc3VwZXIudXBkYXRlKCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLnNob3dBeGlzKSB7XHJcbiAgICAgIGlmICghdGhpcy5tYXJnaW4pIHtcclxuICAgICAgICB0aGlzLm1hcmdpbiA9IFsxMCwgMjAsIDEwLCAyMF07XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICghdGhpcy5tYXJnaW4pIHtcclxuICAgICAgICB0aGlzLm1hcmdpbiA9IFs2MCwgMTAwLCA2MCwgMTAwXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIG1ha2UgdGhlIHN0YXJ0aW5nIGFuZ2xlIHBvc2l0aXZlXHJcbiAgICBpZiAodGhpcy5zdGFydEFuZ2xlIDwgMCkge1xyXG4gICAgICB0aGlzLnN0YXJ0QW5nbGUgPSAodGhpcy5zdGFydEFuZ2xlICUgMzYwKSArIDM2MDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFuZ2xlU3BhbiA9IE1hdGgubWluKHRoaXMuYW5nbGVTcGFuLCAzNjApO1xyXG5cclxuICAgIHRoaXMuZGltcyA9IGNhbGN1bGF0ZVZpZXdEaW1lbnNpb25zKHtcclxuICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXHJcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXHJcbiAgICAgIG1hcmdpbnM6IHRoaXMubWFyZ2luLFxyXG4gICAgICBzaG93TGVnZW5kOiB0aGlzLmxlZ2VuZCxcclxuICAgICAgbGVnZW5kUG9zaXRpb246IHRoaXMubGVnZW5kUG9zaXRpb25cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZG9tYWluID0gdGhpcy5nZXREb21haW4oKTtcclxuICAgIHRoaXMudmFsdWVEb21haW4gPSB0aGlzLmdldFZhbHVlRG9tYWluKCk7XHJcbiAgICB0aGlzLnZhbHVlU2NhbGUgPSB0aGlzLmdldFZhbHVlU2NhbGUoKTtcclxuICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdGhpcy5nZXREaXNwbGF5VmFsdWUoKTtcclxuXHJcbiAgICB0aGlzLm91dGVyUmFkaXVzID0gTWF0aC5taW4odGhpcy5kaW1zLndpZHRoLCB0aGlzLmRpbXMuaGVpZ2h0KSAvIDI7XHJcblxyXG4gICAgdGhpcy5hcmNzID0gdGhpcy5nZXRBcmNzKCk7XHJcblxyXG4gICAgdGhpcy5zZXRDb2xvcnMoKTtcclxuICAgIHRoaXMubGVnZW5kT3B0aW9ucyA9IHRoaXMuZ2V0TGVnZW5kT3B0aW9ucygpO1xyXG5cclxuICAgIGNvbnN0IHhPZmZzZXQgPSB0aGlzLm1hcmdpblszXSArIHRoaXMuZGltcy53aWR0aCAvIDI7XHJcbiAgICBjb25zdCB5T2Zmc2V0ID0gdGhpcy5tYXJnaW5bMF0gKyB0aGlzLmRpbXMuaGVpZ2h0IC8gMjtcclxuXHJcbiAgICB0aGlzLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt4T2Zmc2V0fSwgJHt5T2Zmc2V0fSlgO1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9IGByb3RhdGUoJHt0aGlzLnN0YXJ0QW5nbGV9KWA7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2NhbGVUZXh0KCksIDUwKTtcclxuICB9XHJcblxyXG4gIGdldEFyY3MoKTogYW55W10ge1xyXG4gICAgY29uc3QgYXJjcyA9IFtdO1xyXG5cclxuICAgIGNvbnN0IGF2YWlsYWJsZVJhZGl1cyA9IHRoaXMub3V0ZXJSYWRpdXMgKiAwLjc7XHJcblxyXG4gICAgY29uc3QgcmFkaXVzUGVyQXJjID0gTWF0aC5taW4oYXZhaWxhYmxlUmFkaXVzIC8gdGhpcy5yZXN1bHRzLmxlbmd0aCwgMTApO1xyXG4gICAgY29uc3QgYXJjV2lkdGggPSByYWRpdXNQZXJBcmMgKiAwLjc7XHJcbiAgICB0aGlzLnRleHRSYWRpdXMgPSB0aGlzLm91dGVyUmFkaXVzIC0gdGhpcy5yZXN1bHRzLmxlbmd0aCAqIHJhZGl1c1BlckFyYztcclxuICAgIHRoaXMuY29ybmVyUmFkaXVzID0gTWF0aC5mbG9vcihhcmNXaWR0aCAvIDIpO1xyXG5cclxuICAgIGxldCBpID0gMDtcclxuICAgIGZvciAoY29uc3QgZCBvZiB0aGlzLnJlc3VsdHMpIHtcclxuICAgICAgY29uc3Qgb3V0ZXJSYWRpdXMgPSB0aGlzLm91dGVyUmFkaXVzIC0gaSAqIHJhZGl1c1BlckFyYztcclxuICAgICAgY29uc3QgaW5uZXJSYWRpdXMgPSBvdXRlclJhZGl1cyAtIGFyY1dpZHRoO1xyXG5cclxuICAgICAgY29uc3QgYmFja2dyb3VuZEFyYyA9IHtcclxuICAgICAgICBlbmRBbmdsZTogKHRoaXMuYW5nbGVTcGFuICogTWF0aC5QSSkgLyAxODAsXHJcbiAgICAgICAgaW5uZXJSYWRpdXMsXHJcbiAgICAgICAgb3V0ZXJSYWRpdXMsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgdmFsdWU6IHRoaXMubWF4LFxyXG4gICAgICAgICAgbmFtZTogZC5uYW1lXHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgY29uc3QgdmFsdWVBcmMgPSB7XHJcbiAgICAgICAgZW5kQW5nbGU6IChNYXRoLm1pbih0aGlzLnZhbHVlU2NhbGUoZC52YWx1ZSksIHRoaXMuYW5nbGVTcGFuKSAqIE1hdGguUEkpIC8gMTgwLFxyXG4gICAgICAgIGlubmVyUmFkaXVzLFxyXG4gICAgICAgIG91dGVyUmFkaXVzLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHZhbHVlOiBkLnZhbHVlLFxyXG4gICAgICAgICAgbmFtZTogZC5uYW1lXHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgY29uc3QgYXJjID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRBcmMsXHJcbiAgICAgICAgdmFsdWVBcmNcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGFyY3MucHVzaChhcmMpO1xyXG4gICAgICBpKys7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGFyY3M7XHJcbiAgfVxyXG5cclxuICBnZXREb21haW4oKTogYW55W10ge1xyXG4gICAgcmV0dXJuIHRoaXMucmVzdWx0cy5tYXAoZCA9PiBkLm5hbWUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VmFsdWVEb21haW4oKTogYW55W10ge1xyXG4gICAgY29uc3QgdmFsdWVzID0gdGhpcy5yZXN1bHRzLm1hcChkID0+IGQudmFsdWUpO1xyXG4gICAgY29uc3QgZGF0YU1pbiA9IE1hdGgubWluKC4uLnZhbHVlcyk7XHJcbiAgICBjb25zdCBkYXRhTWF4ID0gTWF0aC5tYXgoLi4udmFsdWVzKTtcclxuXHJcbiAgICBpZiAodGhpcy5taW4gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm1pbiA9IE1hdGgubWluKHRoaXMubWluLCBkYXRhTWluKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubWluID0gZGF0YU1pbjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5tYXggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm1heCA9IE1hdGgubWF4KHRoaXMubWF4LCBkYXRhTWF4KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubWF4ID0gZGF0YU1heDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gW3RoaXMubWluLCB0aGlzLm1heF07XHJcbiAgfVxyXG5cclxuICBnZXRWYWx1ZVNjYWxlKCk6IGFueSB7XHJcbiAgICByZXR1cm4gc2NhbGVMaW5lYXIoKVxyXG4gICAgICAucmFuZ2UoWzAsIHRoaXMuYW5nbGVTcGFuXSlcclxuICAgICAgLm5pY2UoKVxyXG4gICAgICAuZG9tYWluKHRoaXMudmFsdWVEb21haW4pO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGlzcGxheVZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMucmVzdWx0cy5tYXAoZCA9PiBkLnZhbHVlKS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcclxuXHJcbiAgICBpZiAodGhpcy50ZXh0VmFsdWUgJiYgMCAhPT0gdGhpcy50ZXh0VmFsdWUubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnRleHRWYWx1ZS50b0xvY2FsZVN0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnZhbHVlRm9ybWF0dGluZykge1xyXG4gICAgICByZXR1cm4gdGhpcy52YWx1ZUZvcm1hdHRpbmcodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB2YWx1ZS50b0xvY2FsZVN0cmluZygpO1xyXG4gIH1cclxuXHJcbiAgc2NhbGVUZXh0KHJlcGVhdDogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5zaG93VGV4dCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCB7IHdpZHRoIH0gPSB0aGlzLnRleHRFbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc3Qgb2xkU2NhbGUgPSB0aGlzLnJlc2l6ZVNjYWxlO1xyXG5cclxuICAgIGlmICh3aWR0aCA9PT0gMCkge1xyXG4gICAgICB0aGlzLnJlc2l6ZVNjYWxlID0gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGF2YWlsYWJsZVNwYWNlID0gdGhpcy50ZXh0UmFkaXVzO1xyXG4gICAgICB0aGlzLnJlc2l6ZVNjYWxlID0gTWF0aC5mbG9vcigoYXZhaWxhYmxlU3BhY2UgLyAod2lkdGggLyB0aGlzLnJlc2l6ZVNjYWxlKSkgKiAxMDApIC8gMTAwO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnJlc2l6ZVNjYWxlICE9PSBvbGRTY2FsZSkge1xyXG4gICAgICB0aGlzLnRleHRUcmFuc2Zvcm0gPSBgc2NhbGUoJHt0aGlzLnJlc2l6ZVNjYWxlfSwgJHt0aGlzLnJlc2l6ZVNjYWxlfSlgO1xyXG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICBpZiAocmVwZWF0KSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnNjYWxlVGV4dChmYWxzZSksIDUwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25DbGljayhkYXRhKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdC5lbWl0KGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGVnZW5kT3B0aW9ucygpOiBhbnkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc2NhbGVUeXBlOiAnb3JkaW5hbCcsXHJcbiAgICAgIGNvbG9yczogdGhpcy5jb2xvcnMsXHJcbiAgICAgIGRvbWFpbjogdGhpcy5kb21haW4sXHJcbiAgICAgIHRpdGxlOiB0aGlzLmxlZ2VuZFRpdGxlLFxyXG4gICAgICBwb3NpdGlvbjogdGhpcy5sZWdlbmRQb3NpdGlvblxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHNldENvbG9ycygpOiB2b2lkIHtcclxuICAgIHRoaXMuY29sb3JzID0gbmV3IENvbG9ySGVscGVyKHRoaXMuc2NoZW1lLCAnb3JkaW5hbCcsIHRoaXMuZG9tYWluLCB0aGlzLmN1c3RvbUNvbG9ycyk7XHJcbiAgfVxyXG5cclxuICBvbkFjdGl2YXRlKGl0ZW0pOiB2b2lkIHtcclxuICAgIGNvbnN0IGlkeCA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kSW5kZXgoZCA9PiB7XHJcbiAgICAgIHJldHVybiBkLm5hbWUgPT09IGl0ZW0ubmFtZSAmJiBkLnZhbHVlID09PSBpdGVtLnZhbHVlO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoaWR4ID4gLTEpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWN0aXZlRW50cmllcyA9IFtpdGVtLCAuLi50aGlzLmFjdGl2ZUVudHJpZXNdO1xyXG4gICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHsgdmFsdWU6IGl0ZW0sIGVudHJpZXM6IHRoaXMuYWN0aXZlRW50cmllcyB9KTtcclxuICB9XHJcblxyXG4gIG9uRGVhY3RpdmF0ZShpdGVtKTogdm9pZCB7XHJcbiAgICBjb25zdCBpZHggPSB0aGlzLmFjdGl2ZUVudHJpZXMuZmluZEluZGV4KGQgPT4ge1xyXG4gICAgICByZXR1cm4gZC5uYW1lID09PSBpdGVtLm5hbWUgJiYgZC52YWx1ZSA9PT0gaXRlbS52YWx1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYWN0aXZlRW50cmllcy5zcGxpY2UoaWR4LCAxKTtcclxuICAgIHRoaXMuYWN0aXZlRW50cmllcyA9IFsuLi50aGlzLmFjdGl2ZUVudHJpZXNdO1xyXG5cclxuICAgIHRoaXMuZGVhY3RpdmF0ZS5lbWl0KHsgdmFsdWU6IGl0ZW0sIGVudHJpZXM6IHRoaXMuYWN0aXZlRW50cmllcyB9KTtcclxuICB9XHJcblxyXG4gIGlzQWN0aXZlKGVudHJ5KTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIXRoaXMuYWN0aXZlRW50cmllcykgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3QgaXRlbSA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kKGQgPT4ge1xyXG4gICAgICByZXR1cm4gZW50cnkubmFtZSA9PT0gZC5uYW1lICYmIGVudHJ5LnNlcmllcyA9PT0gZC5zZXJpZXM7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpdGVtICE9PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICB0cmFja0J5KGluZGV4LCBpdGVtKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBpdGVtLnZhbHVlQXJjLmRhdGEubmFtZTtcclxuICB9XHJcbn1cclxuIl19