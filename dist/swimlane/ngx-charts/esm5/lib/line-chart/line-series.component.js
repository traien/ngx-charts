import { __decorate, __read, __spread } from "tslib";
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { area, line } from 'd3-shape';
import { id } from '../utils/id';
import { sortLinear, sortByTime, sortByDomain } from '../utils/sort';
var LineSeriesComponent = /** @class */ (function () {
    function LineSeriesComponent() {
        this.animations = true;
    }
    LineSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    LineSeriesComponent.prototype.update = function () {
        this.updateGradients();
        var data = this.sortData(this.data.series);
        var lineGen = this.getLineGenerator();
        this.path = lineGen(data) || '';
        var areaGen = this.getAreaGenerator();
        this.areaPath = areaGen(data) || '';
        if (this.hasRange) {
            var range = this.getRangeGenerator();
            this.outerPath = range(data) || '';
        }
        if (this.hasGradient) {
            this.stroke = this.gradientUrl;
            var values = this.data.series.map(function (d) { return d.value; });
            var max = Math.max.apply(Math, __spread(values));
            var min = Math.min.apply(Math, __spread(values));
            if (max === min) {
                this.stroke = this.colors.getColor(max);
            }
        }
        else {
            this.stroke = this.colors.getColor(this.data.name);
        }
    };
    LineSeriesComponent.prototype.getLineGenerator = function () {
        var _this = this;
        return line()
            .x(function (d) {
            var label = d.name;
            var value;
            if (_this.scaleType === 'time') {
                value = _this.xScale(label);
            }
            else if (_this.scaleType === 'linear') {
                value = _this.xScale(Number(label));
            }
            else {
                value = _this.xScale(label);
            }
            return value;
        })
            .y(function (d) { return _this.yScale(d.value); })
            .curve(this.curve);
    };
    LineSeriesComponent.prototype.getRangeGenerator = function () {
        var _this = this;
        return area()
            .x(function (d) {
            var label = d.name;
            var value;
            if (_this.scaleType === 'time') {
                value = _this.xScale(label);
            }
            else if (_this.scaleType === 'linear') {
                value = _this.xScale(Number(label));
            }
            else {
                value = _this.xScale(label);
            }
            return value;
        })
            .y0(function (d) { return _this.yScale(typeof d.min === 'number' ? d.min : d.value); })
            .y1(function (d) { return _this.yScale(typeof d.max === 'number' ? d.max : d.value); })
            .curve(this.curve);
    };
    LineSeriesComponent.prototype.getAreaGenerator = function () {
        var _this = this;
        var xProperty = function (d) {
            var label = d.name;
            return _this.xScale(label);
        };
        return area()
            .x(xProperty)
            .y0(function () { return _this.yScale.range()[0]; })
            .y1(function (d) { return _this.yScale(d.value); })
            .curve(this.curve);
    };
    LineSeriesComponent.prototype.sortData = function (data) {
        if (this.scaleType === 'linear') {
            data = sortLinear(data, 'name');
        }
        else if (this.scaleType === 'time') {
            data = sortByTime(data, 'name');
        }
        else {
            data = sortByDomain(data, 'name', 'asc', this.xScale.domain());
        }
        return data;
    };
    LineSeriesComponent.prototype.updateGradients = function () {
        if (this.colors.scaleType === 'linear') {
            this.hasGradient = true;
            this.gradientId = 'grad' + id().toString();
            this.gradientUrl = "url(#" + this.gradientId + ")";
            var values = this.data.series.map(function (d) { return d.value; });
            var max = Math.max.apply(Math, __spread(values));
            var min = Math.min.apply(Math, __spread(values));
            this.gradientStops = this.colors.getLinearGradientStops(max, min);
            this.areaGradientStops = this.colors.getLinearGradientStops(max);
        }
        else {
            this.hasGradient = false;
            this.gradientStops = undefined;
            this.areaGradientStops = undefined;
        }
    };
    LineSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    LineSeriesComponent.prototype.isInactive = function (entry) {
        if (!this.activeEntries || this.activeEntries.length === 0)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item === undefined;
    };
    __decorate([
        Input()
    ], LineSeriesComponent.prototype, "data", void 0);
    __decorate([
        Input()
    ], LineSeriesComponent.prototype, "xScale", void 0);
    __decorate([
        Input()
    ], LineSeriesComponent.prototype, "yScale", void 0);
    __decorate([
        Input()
    ], LineSeriesComponent.prototype, "colors", void 0);
    __decorate([
        Input()
    ], LineSeriesComponent.prototype, "scaleType", void 0);
    __decorate([
        Input()
    ], LineSeriesComponent.prototype, "curve", void 0);
    __decorate([
        Input()
    ], LineSeriesComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input()
    ], LineSeriesComponent.prototype, "rangeFillOpacity", void 0);
    __decorate([
        Input()
    ], LineSeriesComponent.prototype, "hasRange", void 0);
    __decorate([
        Input()
    ], LineSeriesComponent.prototype, "animations", void 0);
    LineSeriesComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-line-series]',
            template: "\n    <svg:g>\n      <defs>\n        <svg:g\n          ngx-charts-svg-linear-gradient\n          *ngIf=\"hasGradient\"\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"gradientStops\"\n        />\n      </defs>\n      <svg:g\n        ngx-charts-area\n        class=\"line-highlight\"\n        [data]=\"data\"\n        [path]=\"areaPath\"\n        [fill]=\"hasGradient ? gradientUrl : colors.getColor(data.name)\"\n        [opacity]=\"0.25\"\n        [startOpacity]=\"0\"\n        [gradient]=\"true\"\n        [stops]=\"areaGradientStops\"\n        [class.active]=\"isActive(data)\"\n        [class.inactive]=\"isInactive(data)\"\n        [animations]=\"animations\"\n      />\n      <svg:g\n        ngx-charts-line\n        class=\"line-series\"\n        [data]=\"data\"\n        [path]=\"path\"\n        [stroke]=\"stroke\"\n        [animations]=\"animations\"\n        [class.active]=\"isActive(data)\"\n        [class.inactive]=\"isInactive(data)\"\n      />\n      <svg:g\n        ngx-charts-area\n        *ngIf=\"hasRange\"\n        class=\"line-series-range\"\n        [data]=\"data\"\n        [path]=\"outerPath\"\n        [fill]=\"hasGradient ? gradientUrl : colors.getColor(data.name)\"\n        [class.active]=\"isActive(data)\"\n        [class.inactive]=\"isInactive(data)\"\n        [opacity]=\"rangeFillOpacity\"\n        [animations]=\"animations\"\n      />\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], LineSeriesComponent);
    return LineSeriesComponent;
}());
export { LineSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvbGluZS1jaGFydC9saW5lLXNlcmllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUE0Qix1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUV0QyxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXVEckU7SUFBQTtRQVVXLGVBQVUsR0FBWSxJQUFJLENBQUM7SUEySXRDLENBQUM7SUEvSEMseUNBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsb0NBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV2QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFN0MsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRWhDLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVwQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBTSxLQUFLLEdBQUcsSUFBSSxD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QWdEVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FDVyxtQkFBbUIsQ0FxSi9CO0lBQUQsMEJBQUM7Q0FBQSxBQXJKRCxJQXFKQztTQXJKWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGFyZWEsIGxpbmUgfSBmcm9tICdkMy1zaGFwZSc7XHJcblxyXG5pbXBvcnQgeyBpZCB9IGZyb20gJy4uL3V0aWxzL2lkJztcclxuaW1wb3J0IHsgc29ydExpbmVhciwgc29ydEJ5VGltZSwgc29ydEJ5RG9tYWluIH0gZnJvbSAnLi4vdXRpbHMvc29ydCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1saW5lLXNlcmllc10nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8c3ZnOmc+XHJcbiAgICAgIDxkZWZzPlxyXG4gICAgICAgIDxzdmc6Z1xyXG4gICAgICAgICAgbmd4LWNoYXJ0cy1zdmctbGluZWFyLWdyYWRpZW50XHJcbiAgICAgICAgICAqbmdJZj1cImhhc0dyYWRpZW50XCJcclxuICAgICAgICAgIG9yaWVudGF0aW9uPVwidmVydGljYWxcIlxyXG4gICAgICAgICAgW25hbWVdPVwiZ3JhZGllbnRJZFwiXHJcbiAgICAgICAgICBbc3RvcHNdPVwiZ3JhZGllbnRTdG9wc1wiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kZWZzPlxyXG4gICAgICA8c3ZnOmdcclxuICAgICAgICBuZ3gtY2hhcnRzLWFyZWFcclxuICAgICAgICBjbGFzcz1cImxpbmUtaGlnaGxpZ2h0XCJcclxuICAgICAgICBbZGF0YV09XCJkYXRhXCJcclxuICAgICAgICBbcGF0aF09XCJhcmVhUGF0aFwiXHJcbiAgICAgICAgW2ZpbGxdPVwiaGFzR3JhZGllbnQgPyBncmFkaWVudFVybCA6IGNvbG9ycy5nZXRDb2xvcihkYXRhLm5hbWUpXCJcclxuICAgICAgICBbb3BhY2l0eV09XCIwLjI1XCJcclxuICAgICAgICBbc3RhcnRPcGFjaXR5XT1cIjBcIlxyXG4gICAgICAgIFtncmFkaWVudF09XCJ0cnVlXCJcclxuICAgICAgICBbc3RvcHNdPVwiYXJlYUdyYWRpZW50U3RvcHNcIlxyXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaXNBY3RpdmUoZGF0YSlcIlxyXG4gICAgICAgIFtjbGFzcy5pbmFjdGl2ZV09XCJpc0luYWN0aXZlKGRhdGEpXCJcclxuICAgICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcclxuICAgICAgLz5cclxuICAgICAgPHN2ZzpnXHJcbiAgICAgICAgbmd4LWNoYXJ0cy1saW5lXHJcbiAgICAgICAgY2xhc3M9XCJsaW5lLXNlcmllc1wiXHJcbiAgICAgICAgW2RhdGFdPVwiZGF0YVwiXHJcbiAgICAgICAgW3BhdGhdPVwicGF0aFwiXHJcbiAgICAgICAgW3N0cm9rZV09XCJzdHJva2VcIlxyXG4gICAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxyXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaXNBY3RpdmUoZGF0YSlcIlxyXG4gICAgICAgIFtjbGFzcy5pbmFjdGl2ZV09XCJpc0luYWN0aXZlKGRhdGEpXCJcclxuICAgICAgLz5cclxuICAgICAgPHN2ZzpnXHJcbiAgICAgICAgbmd4LWNoYXJ0cy1hcmVhXHJcbiAgICAgICAgKm5nSWY9XCJoYXNSYW5nZVwiXHJcbiAgICAgICAgY2xhc3M9XCJsaW5lLXNlcmllcy1yYW5nZVwiXHJcbiAgICAgICAgW2RhdGFdPVwiZGF0YVwiXHJcbiAgICAgICAgW3BhdGhdPVwib3V0ZXJQYXRoXCJcclxuICAgICAgICBbZmlsbF09XCJoYXNHcmFkaWVudCA/IGdyYWRpZW50VXJsIDogY29sb3JzLmdldENvbG9yKGRhdGEubmFtZSlcIlxyXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaXNBY3RpdmUoZGF0YSlcIlxyXG4gICAgICAgIFtjbGFzcy5pbmFjdGl2ZV09XCJpc0luYWN0aXZlKGRhdGEpXCJcclxuICAgICAgICBbb3BhY2l0eV09XCJyYW5nZUZpbGxPcGFjaXR5XCJcclxuICAgICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcclxuICAgICAgLz5cclxuICAgIDwvc3ZnOmc+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGluZVNlcmllc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgZGF0YTtcclxuICBASW5wdXQoKSB4U2NhbGU7XHJcbiAgQElucHV0KCkgeVNjYWxlO1xyXG4gIEBJbnB1dCgpIGNvbG9ycztcclxuICBASW5wdXQoKSBzY2FsZVR5cGU7XHJcbiAgQElucHV0KCkgY3VydmU6IGFueTtcclxuICBASW5wdXQoKSBhY3RpdmVFbnRyaWVzOiBhbnlbXTtcclxuICBASW5wdXQoKSByYW5nZUZpbGxPcGFjaXR5OiBudW1iZXI7XHJcbiAgQElucHV0KCkgaGFzUmFuZ2U6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgYW5pbWF0aW9uczogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIHBhdGg6IHN0cmluZztcclxuICBvdXRlclBhdGg6IHN0cmluZztcclxuICBhcmVhUGF0aDogc3RyaW5nO1xyXG4gIGdyYWRpZW50SWQ6IHN0cmluZztcclxuICBncmFkaWVudFVybDogc3RyaW5nO1xyXG4gIGhhc0dyYWRpZW50OiBib29sZWFuO1xyXG4gIGdyYWRpZW50U3RvcHM6IGFueVtdO1xyXG4gIGFyZWFHcmFkaWVudFN0b3BzOiBhbnlbXTtcclxuICBzdHJva2U6IGFueTtcclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMudXBkYXRlR3JhZGllbnRzKCk7XHJcblxyXG4gICAgY29uc3QgZGF0YSA9IHRoaXMuc29ydERhdGEodGhpcy5kYXRhLnNlcmllcyk7XHJcblxyXG4gICAgY29uc3QgbGluZUdlbiA9IHRoaXMuZ2V0TGluZUdlbmVyYXRvcigpO1xyXG4gICAgdGhpcy5wYXRoID0gbGluZUdlbihkYXRhKSB8fCAnJztcclxuXHJcbiAgICBjb25zdCBhcmVhR2VuID0gdGhpcy5nZXRBcmVhR2VuZXJhdG9yKCk7XHJcbiAgICB0aGlzLmFyZWFQYXRoID0gYXJlYUdlbihkYXRhKSB8fCAnJztcclxuXHJcbiAgICBpZiAodGhpcy5oYXNSYW5nZSkge1xyXG4gICAgICBjb25zdCByYW5nZSA9IHRoaXMuZ2V0UmFuZ2VHZW5lcmF0b3IoKTtcclxuICAgICAgdGhpcy5vdXRlclBhdGggPSByYW5nZShkYXRhKSB8fCAnJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5oYXNHcmFkaWVudCkge1xyXG4gICAgICB0aGlzLnN0cm9rZSA9IHRoaXMuZ3JhZGllbnRVcmw7XHJcbiAgICAgIGNvbnN0IHZhbHVlcyA9IHRoaXMuZGF0YS5zZXJpZXMubWFwKGQgPT4gZC52YWx1ZSk7XHJcbiAgICAgIGNvbnN0IG1heCA9IE1hdGgubWF4KC4uLnZhbHVlcyk7XHJcbiAgICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKC4uLnZhbHVlcyk7XHJcbiAgICAgIGlmIChtYXggPT09IG1pbikge1xyXG4gICAgICAgIHRoaXMuc3Ryb2tlID0gdGhpcy5jb2xvcnMuZ2V0Q29sb3IobWF4KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zdHJva2UgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcih0aGlzLmRhdGEubmFtZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRMaW5lR2VuZXJhdG9yKCk6IGFueSB7XHJcbiAgICByZXR1cm4gbGluZTxhbnk+KClcclxuICAgICAgLngoZCA9PiB7XHJcbiAgICAgICAgY29uc3QgbGFiZWwgPSBkLm5hbWU7XHJcbiAgICAgICAgbGV0IHZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ3RpbWUnKSB7XHJcbiAgICAgICAgICB2YWx1ZSA9IHRoaXMueFNjYWxlKGxhYmVsKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAnbGluZWFyJykge1xyXG4gICAgICAgICAgdmFsdWUgPSB0aGlzLnhTY2FsZShOdW1iZXIobGFiZWwpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmFsdWUgPSB0aGlzLnhTY2FsZShsYWJlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgfSlcclxuICAgICAgLnkoZCA9PiB0aGlzLnlTY2FsZShkLnZhbHVlKSlcclxuICAgICAgLmN1cnZlKHRoaXMuY3VydmUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmFuZ2VHZW5lcmF0b3IoKTogYW55IHtcclxuICAgIHJldHVybiBhcmVhPGFueT4oKVxyXG4gICAgICAueChkID0+IHtcclxuICAgICAgICBjb25zdCBsYWJlbCA9IGQubmFtZTtcclxuICAgICAgICBsZXQgdmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAndGltZScpIHtcclxuICAgICAgICAgIHZhbHVlID0gdGhpcy54U2NhbGUobGFiZWwpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICdsaW5lYXInKSB7XHJcbiAgICAgICAgICB2YWx1ZSA9IHRoaXMueFNjYWxlKE51bWJlcihsYWJlbCkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2YWx1ZSA9IHRoaXMueFNjYWxlKGxhYmVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICB9KVxyXG4gICAgICAueTAoZCA9PiB0aGlzLnlTY2FsZSh0eXBlb2YgZC5taW4gPT09ICdudW1iZXInID8gZC5taW4gOiBkLnZhbHVlKSlcclxuICAgICAgLnkxKGQgPT4gdGhpcy55U2NhbGUodHlwZW9mIGQubWF4ID09PSAnbnVtYmVyJyA/IGQubWF4IDogZC52YWx1ZSkpXHJcbiAgICAgIC5jdXJ2ZSh0aGlzLmN1cnZlKTtcclxuICB9XHJcblxyXG4gIGdldEFyZWFHZW5lcmF0b3IoKTogYW55IHtcclxuICAgIGNvbnN0IHhQcm9wZXJ0eSA9IGQgPT4ge1xyXG4gICAgICBjb25zdCBsYWJlbCA9IGQubmFtZTtcclxuICAgICAgcmV0dXJuIHRoaXMueFNjYWxlKGxhYmVsKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGFyZWE8YW55PigpXHJcbiAgICAgIC54KHhQcm9wZXJ0eSlcclxuICAgICAgLnkwKCgpID0+IHRoaXMueVNjYWxlLnJhbmdlKClbMF0pXHJcbiAgICAgIC55MShkID0+IHRoaXMueVNjYWxlKGQudmFsdWUpKVxyXG4gICAgICAuY3VydmUodGhpcy5jdXJ2ZSk7XHJcbiAgfVxyXG5cclxuICBzb3J0RGF0YShkYXRhKSB7XHJcbiAgICBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICdsaW5lYXInKSB7XHJcbiAgICAgIGRhdGEgPSBzb3J0TGluZWFyKGRhdGEsICduYW1lJyk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAndGltZScpIHtcclxuICAgICAgZGF0YSA9IHNvcnRCeVRpbWUoZGF0YSwgJ25hbWUnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRhdGEgPSBzb3J0QnlEb21haW4oZGF0YSwgJ25hbWUnLCAnYXNjJywgdGhpcy54U2NhbGUuZG9tYWluKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlR3JhZGllbnRzKCkge1xyXG4gICAgaWYgKHRoaXMuY29sb3JzLnNjYWxlVHlwZSA9PT0gJ2xpbmVhcicpIHtcclxuICAgICAgdGhpcy5oYXNHcmFkaWVudCA9IHRydWU7XHJcbiAgICAgIHRoaXMuZ3JhZGllbnRJZCA9ICdncmFkJyArIGlkKCkudG9TdHJpbmcoKTtcclxuICAgICAgdGhpcy5ncmFkaWVudFVybCA9IGB1cmwoIyR7dGhpcy5ncmFkaWVudElkfSlgO1xyXG4gICAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLmRhdGEuc2VyaWVzLm1hcChkID0+IGQudmFsdWUpO1xyXG4gICAgICBjb25zdCBtYXggPSBNYXRoLm1heCguLi52YWx1ZXMpO1xyXG4gICAgICBjb25zdCBtaW4gPSBNYXRoLm1pbiguLi52YWx1ZXMpO1xyXG4gICAgICB0aGlzLmdyYWRpZW50U3RvcHMgPSB0aGlzLmNvbG9ycy5nZXRMaW5lYXJHcmFkaWVudFN0b3BzKG1heCwgbWluKTtcclxuICAgICAgdGhpcy5hcmVhR3JhZGllbnRTdG9wcyA9IHRoaXMuY29sb3JzLmdldExpbmVhckdyYWRpZW50U3RvcHMobWF4KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaGFzR3JhZGllbnQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5ncmFkaWVudFN0b3BzID0gdW5kZWZpbmVkO1xyXG4gICAgICB0aGlzLmFyZWFHcmFkaWVudFN0b3BzID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNBY3RpdmUoZW50cnkpOiBib29sZWFuIHtcclxuICAgIGlmICghdGhpcy5hY3RpdmVFbnRyaWVzKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBpdGVtID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbmQoZCA9PiB7XHJcbiAgICAgIHJldHVybiBlbnRyeS5uYW1lID09PSBkLm5hbWU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpdGVtICE9PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBpc0luYWN0aXZlKGVudHJ5KTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIXRoaXMuYWN0aXZlRW50cmllcyB8fCB0aGlzLmFjdGl2ZUVudHJpZXMubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBpdGVtID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbmQoZCA9PiB7XHJcbiAgICAgIHJldHVybiBlbnRyeS5uYW1lID09PSBkLm5hbWU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpdGVtID09PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==