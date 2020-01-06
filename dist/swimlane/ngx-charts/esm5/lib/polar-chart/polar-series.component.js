import { __decorate, __read, __spread } from "tslib";
import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { lineRadial } from 'd3-shape';
import { id } from '../utils/id';
import { sortLinear, sortByTime, sortByDomain } from '../utils/sort';
import { escapeLabel } from '../common/label.helper';
var PolarSeriesComponent = /** @class */ (function () {
    function PolarSeriesComponent() {
        this.tooltipDisabled = false;
        this.gradient = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.circleRadius = 3;
    }
    PolarSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PolarSeriesComponent.prototype.update = function () {
        var _this = this;
        this.updateGradients();
        var line = this.getLineGenerator();
        var data = this.sortData(this.data.series);
        var seriesName = this.data.name;
        var linearScaleType = this.colors.scaleType === 'linear';
        var min = this.yScale.domain()[0];
        this.seriesColor = this.colors.getColor(linearScaleType ? min : seriesName);
        this.path = line(data) || '';
        this.circles = data.map(function (d) {
            var a = _this.getAngle(d);
            var r = _this.getRadius(d);
            var value = d.value;
            var color = _this.colors.getColor(linearScaleType ? Math.abs(value) : seriesName);
            var cData = Object.assign({}, d, {
                series: seriesName,
                value: value,
                name: d.name
            });
            return {
                data: cData,
                cx: r * Math.sin(a),
                cy: -r * Math.cos(a),
                value: value,
                color: color,
                label: d.name
            };
        });
        this.active = this.isActive(this.data);
        this.inactive = this.isInactive(this.data);
        this.tooltipText = this.tooltipText || (function (c) { return _this.defaultTooltipText(c); });
    };
    PolarSeriesComponent.prototype.getAngle = function (d) {
        var label = d.name;
        if (this.scaleType === 'time') {
            return this.xScale(label);
        }
        else if (this.scaleType === 'linear') {
            return this.xScale(Number(label));
        }
        return this.xScale(label);
    };
    PolarSeriesComponent.prototype.getRadius = function (d) {
        return this.yScale(d.value);
    };
    PolarSeriesComponent.prototype.getLineGenerator = function () {
        var _this = this;
        return lineRadial()
            .angle(function (d) { return _this.getAngle(d); })
            .radius(function (d) { return _this.getRadius(d); })
            .curve(this.curve);
    };
    PolarSeriesComponent.prototype.sortData = function (data) {
        if (this.scaleType === 'linear') {
            return sortLinear(data, 'name');
        }
        else if (this.scaleType === 'time') {
            return sortByTime(data, 'name');
        }
        return sortByDomain(data, 'name', 'asc', this.xScale.domain());
    };
    PolarSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    PolarSeriesComponent.prototype.isInactive = function (entry) {
        if (!this.activeEntries || this.activeEntries.length === 0)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item === undefined;
    };
    PolarSeriesComponent.prototype.defaultTooltipText = function (_a) {
        var label = _a.label, value = _a.value;
        return "\n      <span class=\"tooltip-label\">" + escapeLabel(this.data.name) + " \u2022 " + escapeLabel(label) + "</span>\n      <span class=\"tooltip-val\">" + value.toLocaleString() + "</span>\n    ";
    };
    PolarSeriesComponent.prototype.updateGradients = function () {
        this.hasGradient = this.gradient || this.colors.scaleType === 'linear';
        if (!this.hasGradient) {
            return;
        }
        this.gradientId = 'grad' + id().toString();
        this.gradientUrl = "url(#" + this.gradientId + ")";
        if (this.colors.scaleType === 'linear') {
            var values = this.data.series.map(function (d) { return d.value; });
            var max = Math.max.apply(Math, __spread(values));
            var min = Math.min.apply(Math, __spread(values));
            this.gradientStops = this.colors.getLinearGradientStops(max, min);
        }
        else {
            this.gradientStops = undefined;
        }
    };
    __decorate([
        Input()
    ], PolarSeriesComponent.prototype, "name", void 0);
    __decorate([
        Input()
    ], PolarSeriesComponent.prototype, "data", void 0);
    __decorate([
        Input()
    ], PolarSeriesComponent.prototype, "xScale", void 0);
    __decorate([
        Input()
    ], PolarSeriesComponent.prototype, "yScale", void 0);
    __decorate([
        Input()
    ], PolarSeriesComponent.prototype, "colors", void 0);
    __decorate([
        Input()
    ], PolarSeriesComponent.prototype, "scaleType", void 0);
    __decorate([
        Input()
    ], PolarSeriesComponent.prototype, "curve", void 0);
    __decorate([
        Input()
    ], PolarSeriesComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input()
    ], PolarSeriesComponent.prototype, "rangeFillOpacity", void 0);
    __decorate([
        Input()
    ], PolarSeriesComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input()
    ], PolarSeriesComponent.prototype, "tooltipText", void 0);
    __decorate([
        Input()
    ], PolarSeriesComponent.prototype, "gradient", void 0);
    __decorate([
        Input()
    ], PolarSeriesComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        Input()
    ], PolarSeriesComponent.prototype, "animations", void 0);
    __decorate([
        Output()
    ], PolarSeriesComponent.prototype, "select", void 0);
    __decorate([
        Output()
    ], PolarSeriesComponent.prototype, "activate", void 0);
    __decorate([
        Output()
    ], PolarSeriesComponent.prototype, "deactivate", void 0);
    PolarSeriesComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-polar-series]',
            template: "\n    <svg:g class=\"polar-charts-series\">\n      <defs>\n        <svg:g\n          ngx-charts-svg-radial-gradient\n          *ngIf=\"hasGradient\"\n          orientation=\"vertical\"\n          [color]=\"seriesColor\"\n          [name]=\"gradientId\"\n          [startOpacity]=\"0.25\"\n          [endOpacity]=\"1\"\n          [stops]=\"gradientStops\"\n        />\n      </defs>\n      <svg:g\n        ngx-charts-line\n        class=\"polar-series-path\"\n        [path]=\"path\"\n        [stroke]=\"hasGradient ? gradientUrl : seriesColor\"\n        [class.active]=\"active\"\n        [class.inactive]=\"inactive\"\n        [attr.fill-opacity]=\"rangeFillOpacity\"\n        [fill]=\"hasGradient ? gradientUrl : seriesColor\"\n        [animations]=\"animations\"\n      />\n      <svg:g\n        ngx-charts-circle\n        *ngFor=\"let circle of circles\"\n        class=\"circle\"\n        [cx]=\"circle.cx\"\n        [cy]=\"circle.cy\"\n        [r]=\"circleRadius\"\n        [fill]=\"circle.color\"\n        [style.opacity]=\"inactive ? 0.2 : 1\"\n        ngx-tooltip\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipPlacement]=\"'top'\"\n        tooltipType=\"tooltip\"\n        [tooltipTitle]=\"tooltipTemplate ? undefined : tooltipText(circle)\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipContext]=\"circle.data\"\n        (select)=\"select.emit(circle.data)\"\n        (activate)=\"activate.emit({ name: circle.data.series })\"\n        (deactivate)=\"deactivate.emit({ name: circle.data.series })\"\n      ></svg:g>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], PolarSeriesComponent);
    return PolarSeriesComponent;
}());
export { PolarSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9sYXItc2VyaWVzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL3BvbGFyLWNoYXJ0L3BvbGFyLXNlcmllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUdMLHVCQUF1QixFQUV2QixNQUFNLEVBQ04sWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFdEMsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNqQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBcURyRDtJQUFBO1FBVVcsb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFFakMsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUUxQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTFCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBSTFDLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO0lBb0kzQixDQUFDO0lBdEhDLDBDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELHFDQUFNLEdBQU47UUFBQSxpQkF3Q0M7UUF2Q0MsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXZCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXJDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU3QyxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNsQyxJQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsS0FBSyxRQUFRLENBQUM7UUFDM0QsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUU1RSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQztZQUN2QixJQUFNLENBQUMsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQU0sQ0FBQyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUV0QixJQUFNLEtBQUssR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRW5GLElBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtnQkFDakMsTUFBTSxFQUFFLFVBQVU7Z0JBQ2xCLEtBQUssT0FBQTtnQkFDTCxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7YUFDYixDQUFDLENBQUM7WUFFSCxPQUFPO2dCQUNMLElBQUksRUFBRSxLQUFLO2dCQUNYLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsS0FBSyxPQUFBO2dCQUNMLEtBQUssT0FBQTtnQkFDTCxLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUk7YUFDZCxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLEVBQTFCLENBQTBCLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsdUNBQVEsR0FBUixVQUFTLENBQUM7UUFDUixJQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3JCLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxNQUFNLEVBQUU7WUFDN0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNCO2FBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFFBQVEsRUFBRTtZQUN0QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDbkM7UUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELHdDQUFTLEdBQVQsVUFBVSxDQUFDO1FBQ1QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsK0NBQWdCLEdBQWhCO1FBQUEsaUJBS0M7UUFKQyxPQUFPLFVBQVUsRUFBTzthQUNyQixLQUFLLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFoQixDQUFnQixDQUFDO2FBQzVCLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQWpCLENBQWlCLENBQUM7YUFDOUIsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQsdUNBQVEsR0FBUixVQUFTLElBQUk7UUFDWCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFFO1lBQy9CLE9BQU8sVUFBVSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNqQzthQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxNQUFNLEVBQUU7WUFDcEMsT0FBTyxVQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ2pDO1FBQ0QsT0FBTyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCx1Q0FBUSxHQUFSLFVBQVMsS0FBSztRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3RDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztZQUNwQyxPQUFPLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxLQUFLLFNBQVMsQ0FBQztJQUM1QixDQUFDO0lBRUQseUNBQVUsR0FBVixVQUFXLEtBQUs7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDekUsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDO1lBQ3BDLE9BQU8sS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLEtBQUssU0FBUyxDQUFDO0lBQzVCLENBQUM7SUFFRCxpREFBa0IsR0FBbEIsVUFBbUIsRUFBZ0I7WUFBZCxnQkFBSyxFQUFFLGdCQUFLO1FBQy9CLE9BQU8sMkNBQ3lCLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBTSxXQUFXLENBQUMsS0FBSyxDQUFDLG1EQUNyRCxLQUFLLENBQUMsY0FBYyxFQUFFLGtCQUNuRCxDQUFDO0lBQ0osQ0FBQztJQUVELDhDQUFlLEdBQWY7UUFDRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEtBQUssUUFBUSxDQUFDO1FBRXZFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3JCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxHQUFHLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBUSxJQUFJLENBQUMsVUFBVSxNQUFHLENBQUM7UUFFOUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQUU7WUFDdEMsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssRUFBUCxDQUFPLENBQUMsQ0FBQztZQUNsRCxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxPQUFSLElBQUksV0FBUSxNQUFNLEVBQUMsQ0FBQztZQUNoQyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxPQUFSLElBQUksV0FBUSxNQUFNLEVBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ25FO2FBQU07WUFDTCxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztTQUNoQztJQUNILENBQUM7SUF4SlE7UUFBUixLQUFLLEVBQUU7c0RBQU07SUFDTDtRQUFSLEtBQUssRUFBRTtzREFBTTtJQUNMO1FBQVIsS0FBSyxFQUFFO3dEQUFRO0lBQ1A7UUFBUixLQUFLLEVBQUU7d0RBQVE7SUFDUDtRQUFSLEtBQUssRUFBRTt3REFBUTtJQUNQO1FBQVIsS0FBSyxFQUFFOzJEQUFXO0lBQ1Y7UUFBUixLQUFLLEVBQUU7dURBQVk7SUFDWDtRQUFSLEtBQUssRUFBRTsrREFBc0I7SUFDckI7UUFBUixLQUFLLEVBQUU7a0VBQTBCO0lBQ3pCO1FBQVIsS0FBSyxFQUFFO2lFQUFrQztJQUNqQztRQUFSLEtBQUssRUFBRTs2REFBaUM7SUFDaEM7UUFBUixLQUFLLEVBQUU7MERBQTJCO0lBQzFCO1FBQVIsS0FBSyxFQUFFO2lFQUFtQztJQUNsQztRQUFSLEtBQUssRUFBRTs0REFBNEI7SUFFMUI7UUFBVCxNQUFNLEVBQUU7d0RBQTZCO0lBQzVCO1FBQVQsTUFBTSxFQUFFOzBEQUErQjtJQUM5QjtRQUFULE1BQU0sRUFBRTs0REFBaUM7SUFsQi9CLG9CQUFvQjtRQW5EaEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDRCQUE0QjtZQUN0QyxRQUFRLEVBQUUsNmlEQThDVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FDVyxvQkFBb0IsQ0EwSmhDO0lBQUQsMkJBQUM7Q0FBQSxBQTFKRCxJQTBKQztTQTFKWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBUZW1wbGF0ZVJlZixcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGxpbmVSYWRpYWwgfSBmcm9tICdkMy1zaGFwZSc7XHJcblxyXG5pbXBvcnQgeyBpZCB9IGZyb20gJy4uL3V0aWxzL2lkJztcclxuaW1wb3J0IHsgc29ydExpbmVhciwgc29ydEJ5VGltZSwgc29ydEJ5RG9tYWluIH0gZnJvbSAnLi4vdXRpbHMvc29ydCc7XHJcbmltcG9ydCB7IGVzY2FwZUxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsLmhlbHBlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1wb2xhci1zZXJpZXNdJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHN2ZzpnIGNsYXNzPVwicG9sYXItY2hhcnRzLXNlcmllc1wiPlxyXG4gICAgICA8ZGVmcz5cclxuICAgICAgICA8c3ZnOmdcclxuICAgICAgICAgIG5neC1jaGFydHMtc3ZnLXJhZGlhbC1ncmFkaWVudFxyXG4gICAgICAgICAgKm5nSWY9XCJoYXNHcmFkaWVudFwiXHJcbiAgICAgICAgICBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCJcclxuICAgICAgICAgIFtjb2xvcl09XCJzZXJpZXNDb2xvclwiXHJcbiAgICAgICAgICBbbmFtZV09XCJncmFkaWVudElkXCJcclxuICAgICAgICAgIFtzdGFydE9wYWNpdHldPVwiMC4yNVwiXHJcbiAgICAgICAgICBbZW5kT3BhY2l0eV09XCIxXCJcclxuICAgICAgICAgIFtzdG9wc109XCJncmFkaWVudFN0b3BzXCJcclxuICAgICAgICAvPlxyXG4gICAgICA8L2RlZnM+XHJcbiAgICAgIDxzdmc6Z1xyXG4gICAgICAgIG5neC1jaGFydHMtbGluZVxyXG4gICAgICAgIGNsYXNzPVwicG9sYXItc2VyaWVzLXBhdGhcIlxyXG4gICAgICAgIFtwYXRoXT1cInBhdGhcIlxyXG4gICAgICAgIFtzdHJva2VdPVwiaGFzR3JhZGllbnQgPyBncmFkaWVudFVybCA6IHNlcmllc0NvbG9yXCJcclxuICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImFjdGl2ZVwiXHJcbiAgICAgICAgW2NsYXNzLmluYWN0aXZlXT1cImluYWN0aXZlXCJcclxuICAgICAgICBbYXR0ci5maWxsLW9wYWNpdHldPVwicmFuZ2VGaWxsT3BhY2l0eVwiXHJcbiAgICAgICAgW2ZpbGxdPVwiaGFzR3JhZGllbnQgPyBncmFkaWVudFVybCA6IHNlcmllc0NvbG9yXCJcclxuICAgICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcclxuICAgICAgLz5cclxuICAgICAgPHN2ZzpnXHJcbiAgICAgICAgbmd4LWNoYXJ0cy1jaXJjbGVcclxuICAgICAgICAqbmdGb3I9XCJsZXQgY2lyY2xlIG9mIGNpcmNsZXNcIlxyXG4gICAgICAgIGNsYXNzPVwiY2lyY2xlXCJcclxuICAgICAgICBbY3hdPVwiY2lyY2xlLmN4XCJcclxuICAgICAgICBbY3ldPVwiY2lyY2xlLmN5XCJcclxuICAgICAgICBbcl09XCJjaXJjbGVSYWRpdXNcIlxyXG4gICAgICAgIFtmaWxsXT1cImNpcmNsZS5jb2xvclwiXHJcbiAgICAgICAgW3N0eWxlLm9wYWNpdHldPVwiaW5hY3RpdmUgPyAwLjIgOiAxXCJcclxuICAgICAgICBuZ3gtdG9vbHRpcFxyXG4gICAgICAgIFt0b29sdGlwRGlzYWJsZWRdPVwidG9vbHRpcERpc2FibGVkXCJcclxuICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCIndG9wJ1wiXHJcbiAgICAgICAgdG9vbHRpcFR5cGU9XCJ0b29sdGlwXCJcclxuICAgICAgICBbdG9vbHRpcFRpdGxlXT1cInRvb2x0aXBUZW1wbGF0ZSA/IHVuZGVmaW5lZCA6IHRvb2x0aXBUZXh0KGNpcmNsZSlcIlxyXG4gICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcclxuICAgICAgICBbdG9vbHRpcENvbnRleHRdPVwiY2lyY2xlLmRhdGFcIlxyXG4gICAgICAgIChzZWxlY3QpPVwic2VsZWN0LmVtaXQoY2lyY2xlLmRhdGEpXCJcclxuICAgICAgICAoYWN0aXZhdGUpPVwiYWN0aXZhdGUuZW1pdCh7IG5hbWU6IGNpcmNsZS5kYXRhLnNlcmllcyB9KVwiXHJcbiAgICAgICAgKGRlYWN0aXZhdGUpPVwiZGVhY3RpdmF0ZS5lbWl0KHsgbmFtZTogY2lyY2xlLmRhdGEuc2VyaWVzIH0pXCJcclxuICAgICAgPjwvc3ZnOmc+XHJcbiAgICA8L3N2ZzpnPlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFBvbGFyU2VyaWVzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBuYW1lO1xyXG4gIEBJbnB1dCgpIGRhdGE7XHJcbiAgQElucHV0KCkgeFNjYWxlOyAvLyBUaGV0YVxyXG4gIEBJbnB1dCgpIHlTY2FsZTsgLy8gUlxyXG4gIEBJbnB1dCgpIGNvbG9ycztcclxuICBASW5wdXQoKSBzY2FsZVR5cGU7XHJcbiAgQElucHV0KCkgY3VydmU6IGFueTtcclxuICBASW5wdXQoKSBhY3RpdmVFbnRyaWVzOiBhbnlbXTtcclxuICBASW5wdXQoKSByYW5nZUZpbGxPcGFjaXR5OiBudW1iZXI7XHJcbiAgQElucHV0KCkgdG9vbHRpcERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgdG9vbHRpcFRleHQ6IChvOiBhbnkpID0+IHN0cmluZztcclxuICBASW5wdXQoKSBncmFkaWVudDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICBASW5wdXQoKSBhbmltYXRpb25zOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHBhdGg6IHN0cmluZztcclxuICBjaXJjbGVzOiBhbnlbXTtcclxuICBjaXJjbGVSYWRpdXM6IG51bWJlciA9IDM7XHJcblxyXG4gIG91dGVyUGF0aDogc3RyaW5nO1xyXG4gIGFyZWFQYXRoOiBzdHJpbmc7XHJcbiAgZ3JhZGllbnRJZDogc3RyaW5nO1xyXG4gIGdyYWRpZW50VXJsOiBzdHJpbmc7XHJcbiAgaGFzR3JhZGllbnQ6IGJvb2xlYW47XHJcbiAgZ3JhZGllbnRTdG9wczogYW55W107XHJcbiAgYXJlYUdyYWRpZW50U3RvcHM6IGFueVtdO1xyXG4gIHNlcmllc0NvbG9yOiBzdHJpbmc7XHJcblxyXG4gIGFjdGl2ZTogYm9vbGVhbjtcclxuICBpbmFjdGl2ZTogYm9vbGVhbjtcclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMudXBkYXRlR3JhZGllbnRzKCk7XHJcblxyXG4gICAgY29uc3QgbGluZSA9IHRoaXMuZ2V0TGluZUdlbmVyYXRvcigpO1xyXG5cclxuICAgIGNvbnN0IGRhdGEgPSB0aGlzLnNvcnREYXRhKHRoaXMuZGF0YS5zZXJpZXMpO1xyXG5cclxuICAgIGNvbnN0IHNlcmllc05hbWUgPSB0aGlzLmRhdGEubmFtZTtcclxuICAgIGNvbnN0IGxpbmVhclNjYWxlVHlwZSA9IHRoaXMuY29sb3JzLnNjYWxlVHlwZSA9PT0gJ2xpbmVhcic7XHJcbiAgICBjb25zdCBtaW4gPSB0aGlzLnlTY2FsZS5kb21haW4oKVswXTtcclxuICAgIHRoaXMuc2VyaWVzQ29sb3IgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcihsaW5lYXJTY2FsZVR5cGUgPyBtaW4gOiBzZXJpZXNOYW1lKTtcclxuXHJcbiAgICB0aGlzLnBhdGggPSBsaW5lKGRhdGEpIHx8ICcnO1xyXG5cclxuICAgIHRoaXMuY2lyY2xlcyA9IGRhdGEubWFwKGQgPT4ge1xyXG4gICAgICBjb25zdCBhID0gdGhpcy5nZXRBbmdsZShkKTtcclxuICAgICAgY29uc3QgciA9IHRoaXMuZ2V0UmFkaXVzKGQpO1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IGQudmFsdWU7XHJcblxyXG4gICAgICBjb25zdCBjb2xvciA9IHRoaXMuY29sb3JzLmdldENvbG9yKGxpbmVhclNjYWxlVHlwZSA/IE1hdGguYWJzKHZhbHVlKSA6IHNlcmllc05hbWUpO1xyXG5cclxuICAgICAgY29uc3QgY0RhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBkLCB7XHJcbiAgICAgICAgc2VyaWVzOiBzZXJpZXNOYW1lLFxyXG4gICAgICAgIHZhbHVlLFxyXG4gICAgICAgIG5hbWU6IGQubmFtZVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgZGF0YTogY0RhdGEsXHJcbiAgICAgICAgY3g6IHIgKiBNYXRoLnNpbihhKSxcclxuICAgICAgICBjeTogLXIgKiBNYXRoLmNvcyhhKSxcclxuICAgICAgICB2YWx1ZSxcclxuICAgICAgICBjb2xvcixcclxuICAgICAgICBsYWJlbDogZC5uYW1lXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmFjdGl2ZSA9IHRoaXMuaXNBY3RpdmUodGhpcy5kYXRhKTtcclxuICAgIHRoaXMuaW5hY3RpdmUgPSB0aGlzLmlzSW5hY3RpdmUodGhpcy5kYXRhKTtcclxuICAgIHRoaXMudG9vbHRpcFRleHQgPSB0aGlzLnRvb2x0aXBUZXh0IHx8IChjID0+IHRoaXMuZGVmYXVsdFRvb2x0aXBUZXh0KGMpKTtcclxuICB9XHJcblxyXG4gIGdldEFuZ2xlKGQpIHtcclxuICAgIGNvbnN0IGxhYmVsID0gZC5uYW1lO1xyXG4gICAgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAndGltZScpIHtcclxuICAgICAgcmV0dXJuIHRoaXMueFNjYWxlKGxhYmVsKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICdsaW5lYXInKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnhTY2FsZShOdW1iZXIobGFiZWwpKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnhTY2FsZShsYWJlbCk7XHJcbiAgfVxyXG5cclxuICBnZXRSYWRpdXMoZCkge1xyXG4gICAgcmV0dXJuIHRoaXMueVNjYWxlKGQudmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGluZUdlbmVyYXRvcigpOiBhbnkge1xyXG4gICAgcmV0dXJuIGxpbmVSYWRpYWw8YW55PigpXHJcbiAgICAgIC5hbmdsZShkID0+IHRoaXMuZ2V0QW5nbGUoZCkpXHJcbiAgICAgIC5yYWRpdXMoZCA9PiB0aGlzLmdldFJhZGl1cyhkKSlcclxuICAgICAgLmN1cnZlKHRoaXMuY3VydmUpO1xyXG4gIH1cclxuXHJcbiAgc29ydERhdGEoZGF0YSkge1xyXG4gICAgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAnbGluZWFyJykge1xyXG4gICAgICByZXR1cm4gc29ydExpbmVhcihkYXRhLCAnbmFtZScpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ3RpbWUnKSB7XHJcbiAgICAgIHJldHVybiBzb3J0QnlUaW1lKGRhdGEsICduYW1lJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc29ydEJ5RG9tYWluKGRhdGEsICduYW1lJywgJ2FzYycsIHRoaXMueFNjYWxlLmRvbWFpbigpKTtcclxuICB9XHJcblxyXG4gIGlzQWN0aXZlKGVudHJ5KTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIXRoaXMuYWN0aXZlRW50cmllcykgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3QgaXRlbSA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kKGQgPT4ge1xyXG4gICAgICByZXR1cm4gZW50cnkubmFtZSA9PT0gZC5uYW1lO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaXRlbSAhPT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgaXNJbmFjdGl2ZShlbnRyeSk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKCF0aGlzLmFjdGl2ZUVudHJpZXMgfHwgdGhpcy5hY3RpdmVFbnRyaWVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3QgaXRlbSA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kKGQgPT4ge1xyXG4gICAgICByZXR1cm4gZW50cnkubmFtZSA9PT0gZC5uYW1lO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaXRlbSA9PT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgZGVmYXVsdFRvb2x0aXBUZXh0KHsgbGFiZWwsIHZhbHVlIH0pOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLWxhYmVsXCI+JHtlc2NhcGVMYWJlbCh0aGlzLmRhdGEubmFtZSl9IOKAoiAke2VzY2FwZUxhYmVsKGxhYmVsKX08L3NwYW4+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC12YWxcIj4ke3ZhbHVlLnRvTG9jYWxlU3RyaW5nKCl9PC9zcGFuPlxyXG4gICAgYDtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUdyYWRpZW50cygpIHtcclxuICAgIHRoaXMuaGFzR3JhZGllbnQgPSB0aGlzLmdyYWRpZW50IHx8IHRoaXMuY29sb3JzLnNjYWxlVHlwZSA9PT0gJ2xpbmVhcic7XHJcblxyXG4gICAgaWYgKCF0aGlzLmhhc0dyYWRpZW50KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdyYWRpZW50SWQgPSAnZ3JhZCcgKyBpZCgpLnRvU3RyaW5nKCk7XHJcbiAgICB0aGlzLmdyYWRpZW50VXJsID0gYHVybCgjJHt0aGlzLmdyYWRpZW50SWR9KWA7XHJcblxyXG4gICAgaWYgKHRoaXMuY29sb3JzLnNjYWxlVHlwZSA9PT0gJ2xpbmVhcicpIHtcclxuICAgICAgY29uc3QgdmFsdWVzID0gdGhpcy5kYXRhLnNlcmllcy5tYXAoZCA9PiBkLnZhbHVlKTtcclxuICAgICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoLi4udmFsdWVzKTtcclxuICAgICAgY29uc3QgbWluID0gTWF0aC5taW4oLi4udmFsdWVzKTtcclxuICAgICAgdGhpcy5ncmFkaWVudFN0b3BzID0gdGhpcy5jb2xvcnMuZ2V0TGluZWFyR3JhZGllbnRTdG9wcyhtYXgsIG1pbik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmdyYWRpZW50U3RvcHMgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==