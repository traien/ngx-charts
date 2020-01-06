import { __decorate, __read, __spread } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { area } from 'd3-shape';
import { sortLinear, sortByTime, sortByDomain } from '../utils/sort';
var AreaSeriesComponent = /** @class */ (function () {
    function AreaSeriesComponent() {
        this.baseValue = 'auto';
        this.stacked = false;
        this.normalized = false;
        this.animations = true;
        this.select = new EventEmitter();
    }
    AreaSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    AreaSeriesComponent.prototype.update = function () {
        var _this = this;
        this.updateGradient();
        var currentArea;
        var startingArea;
        var xProperty = function (d) {
            var label = d.name;
            return _this.xScale(label);
        };
        if (this.stacked || this.normalized) {
            currentArea = area()
                .x(xProperty)
                .y0(function (d, i) { return _this.yScale(d.d0); })
                .y1(function (d, i) { return _this.yScale(d.d1); });
            startingArea = area()
                .x(xProperty)
                .y0(function (d) { return _this.yScale.range()[0]; })
                .y1(function (d) { return _this.yScale.range()[0]; });
        }
        else {
            currentArea = area()
                .x(xProperty)
                .y0(function () { return (_this.baseValue === 'auto' ? _this.yScale.range()[0] : _this.yScale(_this.baseValue)); })
                .y1(function (d) { return _this.yScale(d.value); });
            startingArea = area()
                .x(xProperty)
                .y0(function (d) { return (_this.baseValue === 'auto' ? _this.yScale.range()[0] : _this.yScale(_this.baseValue)); })
                .y1(function (d) { return (_this.baseValue === 'auto' ? _this.yScale.range()[0] : _this.yScale(_this.baseValue)); });
        }
        currentArea.curve(this.curve);
        startingArea.curve(this.curve);
        this.opacity = 0.8;
        var data = this.data.series;
        if (this.scaleType === 'linear') {
            data = sortLinear(data, 'name');
        }
        else if (this.scaleType === 'time') {
            data = sortByTime(data, 'name');
        }
        else {
            data = sortByDomain(data, 'name', 'asc', this.xScale.domain());
        }
        this.path = currentArea(data);
        this.startingPath = startingArea(data);
    };
    AreaSeriesComponent.prototype.updateGradient = function () {
        if (this.colors.scaleType === 'linear') {
            this.hasGradient = true;
            if (this.stacked || this.normalized) {
                var d0values = this.data.series.map(function (d) { return d.d0; });
                var d1values = this.data.series.map(function (d) { return d.d1; });
                var max = Math.max.apply(Math, __spread(d1values));
                var min = Math.min.apply(Math, __spread(d0values));
                this.gradientStops = this.colors.getLinearGradientStops(max, min);
            }
            else {
                var values = this.data.series.map(function (d) { return d.value; });
                var max = Math.max.apply(Math, __spread(values));
                this.gradientStops = this.colors.getLinearGradientStops(max);
            }
        }
        else {
            this.hasGradient = false;
            this.gradientStops = undefined;
        }
    };
    AreaSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    AreaSeriesComponent.prototype.isInactive = function (entry) {
        if (!this.activeEntries || this.activeEntries.length === 0)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item === undefined;
    };
    __decorate([
        Input()
    ], AreaSeriesComponent.prototype, "data", void 0);
    __decorate([
        Input()
    ], AreaSeriesComponent.prototype, "xScale", void 0);
    __decorate([
        Input()
    ], AreaSeriesComponent.prototype, "yScale", void 0);
    __decorate([
        Input()
    ], AreaSeriesComponent.prototype, "baseValue", void 0);
    __decorate([
        Input()
    ], AreaSeriesComponent.prototype, "colors", void 0);
    __decorate([
        Input()
    ], AreaSeriesComponent.prototype, "scaleType", void 0);
    __decorate([
        Input()
    ], AreaSeriesComponent.prototype, "stacked", void 0);
    __decorate([
        Input()
    ], AreaSeriesComponent.prototype, "normalized", void 0);
    __decorate([
        Input()
    ], AreaSeriesComponent.prototype, "gradient", void 0);
    __decorate([
        Input()
    ], AreaSeriesComponent.prototype, "curve", void 0);
    __decorate([
        Input()
    ], AreaSeriesComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input()
    ], AreaSeriesComponent.prototype, "animations", void 0);
    __decorate([
        Output()
    ], AreaSeriesComponent.prototype, "select", void 0);
    AreaSeriesComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-area-series]',
            template: "\n    <svg:g\n      ngx-charts-area\n      class=\"area-series\"\n      [data]=\"data\"\n      [path]=\"path\"\n      [fill]=\"colors.getColor(data.name)\"\n      [stops]=\"gradientStops\"\n      [startingPath]=\"startingPath\"\n      [opacity]=\"opacity\"\n      [gradient]=\"gradient || hasGradient\"\n      [animations]=\"animations\"\n      [class.active]=\"isActive(data)\"\n      [class.inactive]=\"isInactive(data)\"\n    />\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], AreaSeriesComponent);
    return AreaSeriesComponent;
}());
export { AreaSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJlYS1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvYXJlYS1jaGFydC9hcmVhLXNlcmllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBR1osdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFaEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBc0JyRTtJQUFBO1FBSVcsY0FBUyxHQUFRLE1BQU0sQ0FBQztRQUd4QixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFJNUIsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUxQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQW1HeEMsQ0FBQztJQTFGQyx5Q0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxvQ0FBTSxHQUFOO1FBQUEsaUJBaURDO1FBaERDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV0QixJQUFJLFdBQVcsQ0FBQztRQUNoQixJQUFJLFlBQVksQ0FBQztRQUVqQixJQUFNLFNBQVMsR0FBRyxVQUFBLENBQUM7WUFDakIsSUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNyQixPQUFPLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDO1FBRUYsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkMsV0FBVyxHQUFHLElBQUksRUFBTztpQkFD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QVIsS0FBSyxFQUFFO3dEQUEwQjtJQUN6QjtRQUFSLEtBQUssRUFBRTsyREFBNkI7SUFDNUI7UUFBUixLQUFLLEVBQUU7eURBQVU7SUFDVDtRQUFSLEtBQUssRUFBRTtzREFBTztJQUNOO1FBQVIsS0FBSyxFQUFFOzhEQUFzQjtJQUNyQjtRQUFSLEtBQUssRUFBRTsyREFBNEI7SUFFMUI7UUFBVCxNQUFNLEVBQUU7dURBQTZCO0lBZDNCLG1CQUFtQjtRQXBCL0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDJCQUEyQjtZQUNyQyxRQUFRLEVBQUUscWJBZVQ7WUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO09BQ1csbUJBQW1CLENBaUgvQjtJQUFELDBCQUFDO0NBQUEsQUFqSEQsSUFpSEM7U0FqSFksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPbkNoYW5nZXMsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBhcmVhIH0gZnJvbSAnZDMtc2hhcGUnO1xyXG5cclxuaW1wb3J0IHsgc29ydExpbmVhciwgc29ydEJ5VGltZSwgc29ydEJ5RG9tYWluIH0gZnJvbSAnLi4vdXRpbHMvc29ydCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1hcmVhLXNlcmllc10nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8c3ZnOmdcclxuICAgICAgbmd4LWNoYXJ0cy1hcmVhXHJcbiAgICAgIGNsYXNzPVwiYXJlYS1zZXJpZXNcIlxyXG4gICAgICBbZGF0YV09XCJkYXRhXCJcclxuICAgICAgW3BhdGhdPVwicGF0aFwiXHJcbiAgICAgIFtmaWxsXT1cImNvbG9ycy5nZXRDb2xvcihkYXRhLm5hbWUpXCJcclxuICAgICAgW3N0b3BzXT1cImdyYWRpZW50U3RvcHNcIlxyXG4gICAgICBbc3RhcnRpbmdQYXRoXT1cInN0YXJ0aW5nUGF0aFwiXHJcbiAgICAgIFtvcGFjaXR5XT1cIm9wYWNpdHlcIlxyXG4gICAgICBbZ3JhZGllbnRdPVwiZ3JhZGllbnQgfHwgaGFzR3JhZGllbnRcIlxyXG4gICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcclxuICAgICAgW2NsYXNzLmFjdGl2ZV09XCJpc0FjdGl2ZShkYXRhKVwiXHJcbiAgICAgIFtjbGFzcy5pbmFjdGl2ZV09XCJpc0luYWN0aXZlKGRhdGEpXCJcclxuICAgIC8+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXJlYVNlcmllc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgZGF0YTtcclxuICBASW5wdXQoKSB4U2NhbGU7XHJcbiAgQElucHV0KCkgeVNjYWxlO1xyXG4gIEBJbnB1dCgpIGJhc2VWYWx1ZTogYW55ID0gJ2F1dG8nO1xyXG4gIEBJbnB1dCgpIGNvbG9ycztcclxuICBASW5wdXQoKSBzY2FsZVR5cGU7XHJcbiAgQElucHV0KCkgc3RhY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIG5vcm1hbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSBncmFkaWVudDtcclxuICBASW5wdXQoKSBjdXJ2ZTtcclxuICBASW5wdXQoKSBhY3RpdmVFbnRyaWVzOiBhbnlbXTtcclxuICBASW5wdXQoKSBhbmltYXRpb25zOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgb3BhY2l0eTogbnVtYmVyO1xyXG4gIHBhdGg6IHN0cmluZztcclxuICBzdGFydGluZ1BhdGg6IHN0cmluZztcclxuXHJcbiAgaGFzR3JhZGllbnQ6IGJvb2xlYW47XHJcbiAgZ3JhZGllbnRTdG9wczogYW55W107XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLnVwZGF0ZUdyYWRpZW50KCk7XHJcblxyXG4gICAgbGV0IGN1cnJlbnRBcmVhO1xyXG4gICAgbGV0IHN0YXJ0aW5nQXJlYTtcclxuXHJcbiAgICBjb25zdCB4UHJvcGVydHkgPSBkID0+IHtcclxuICAgICAgY29uc3QgbGFiZWwgPSBkLm5hbWU7XHJcbiAgICAgIHJldHVybiB0aGlzLnhTY2FsZShsYWJlbCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGlmICh0aGlzLnN0YWNrZWQgfHwgdGhpcy5ub3JtYWxpemVkKSB7XHJcbiAgICAgIGN1cnJlbnRBcmVhID0gYXJlYTxhbnk+KClcclxuICAgICAgICAueCh4UHJvcGVydHkpXHJcbiAgICAgICAgLnkwKChkLCBpKSA9PiB0aGlzLnlTY2FsZShkLmQwKSlcclxuICAgICAgICAueTEoKGQsIGkpID0+IHRoaXMueVNjYWxlKGQuZDEpKTtcclxuXHJcbiAgICAgIHN0YXJ0aW5nQXJlYSA9IGFyZWE8YW55PigpXHJcbiAgICAgICAgLngoeFByb3BlcnR5KVxyXG4gICAgICAgIC55MChkID0+IHRoaXMueVNjYWxlLnJhbmdlKClbMF0pXHJcbiAgICAgICAgLnkxKGQgPT4gdGhpcy55U2NhbGUucmFuZ2UoKVswXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjdXJyZW50QXJlYSA9IGFyZWE8YW55PigpXHJcbiAgICAgICAgLngoeFByb3BlcnR5KVxyXG4gICAgICAgIC55MCgoKSA9PiAodGhpcy5iYXNlVmFsdWUgPT09ICdhdXRvJyA/IHRoaXMueVNjYWxlLnJhbmdlKClbMF0gOiB0aGlzLnlTY2FsZSh0aGlzLmJhc2VWYWx1ZSkpKVxyXG4gICAgICAgIC55MShkID0+IHRoaXMueVNjYWxlKGQudmFsdWUpKTtcclxuXHJcbiAgICAgIHN0YXJ0aW5nQXJlYSA9IGFyZWE8YW55PigpXHJcbiAgICAgICAgLngoeFByb3BlcnR5KVxyXG4gICAgICAgIC55MChkID0+ICh0aGlzLmJhc2VWYWx1ZSA9PT0gJ2F1dG8nID8gdGhpcy55U2NhbGUucmFuZ2UoKVswXSA6IHRoaXMueVNjYWxlKHRoaXMuYmFzZVZhbHVlKSkpXHJcbiAgICAgICAgLnkxKGQgPT4gKHRoaXMuYmFzZVZhbHVlID09PSAnYXV0bycgPyB0aGlzLnlTY2FsZS5yYW5nZSgpWzBdIDogdGhpcy55U2NhbGUodGhpcy5iYXNlVmFsdWUpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3VycmVudEFyZWEuY3VydmUodGhpcy5jdXJ2ZSk7XHJcbiAgICBzdGFydGluZ0FyZWEuY3VydmUodGhpcy5jdXJ2ZSk7XHJcblxyXG4gICAgdGhpcy5vcGFjaXR5ID0gMC44O1xyXG5cclxuICAgIGxldCBkYXRhID0gdGhpcy5kYXRhLnNlcmllcztcclxuICAgIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ2xpbmVhcicpIHtcclxuICAgICAgZGF0YSA9IHNvcnRMaW5lYXIoZGF0YSwgJ25hbWUnKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICd0aW1lJykge1xyXG4gICAgICBkYXRhID0gc29ydEJ5VGltZShkYXRhLCAnbmFtZScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGF0YSA9IHNvcnRCeURvbWFpbihkYXRhLCAnbmFtZScsICdhc2MnLCB0aGlzLnhTY2FsZS5kb21haW4oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wYXRoID0gY3VycmVudEFyZWEoZGF0YSk7XHJcbiAgICB0aGlzLnN0YXJ0aW5nUGF0aCA9IHN0YXJ0aW5nQXJlYShkYXRhKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUdyYWRpZW50KCkge1xyXG4gICAgaWYgKHRoaXMuY29sb3JzLnNjYWxlVHlwZSA9PT0gJ2xpbmVhcicpIHtcclxuICAgICAgdGhpcy5oYXNHcmFkaWVudCA9IHRydWU7XHJcbiAgICAgIGlmICh0aGlzLnN0YWNrZWQgfHwgdGhpcy5ub3JtYWxpemVkKSB7XHJcbiAgICAgICAgY29uc3QgZDB2YWx1ZXMgPSB0aGlzLmRhdGEuc2VyaWVzLm1hcChkID0+IGQuZDApO1xyXG4gICAgICAgIGNvbnN0IGQxdmFsdWVzID0gdGhpcy5kYXRhLnNlcmllcy5tYXAoZCA9PiBkLmQxKTtcclxuICAgICAgICBjb25zdCBtYXggPSBNYXRoLm1heCguLi5kMXZhbHVlcyk7XHJcbiAgICAgICAgY29uc3QgbWluID0gTWF0aC5taW4oLi4uZDB2YWx1ZXMpO1xyXG4gICAgICAgIHRoaXMuZ3JhZGllbnRTdG9wcyA9IHRoaXMuY29sb3JzLmdldExpbmVhckdyYWRpZW50U3RvcHMobWF4LCBtaW4pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IHRoaXMuZGF0YS5zZXJpZXMubWFwKGQgPT4gZC52YWx1ZSk7XHJcbiAgICAgICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoLi4udmFsdWVzKTtcclxuICAgICAgICB0aGlzLmdyYWRpZW50U3RvcHMgPSB0aGlzLmNvbG9ycy5nZXRMaW5lYXJHcmFkaWVudFN0b3BzKG1heCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaGFzR3JhZGllbnQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5ncmFkaWVudFN0b3BzID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNBY3RpdmUoZW50cnkpOiBib29sZWFuIHtcclxuICAgIGlmICghdGhpcy5hY3RpdmVFbnRyaWVzKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBpdGVtID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbmQoZCA9PiB7XHJcbiAgICAgIHJldHVybiBlbnRyeS5uYW1lID09PSBkLm5hbWU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpdGVtICE9PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBpc0luYWN0aXZlKGVudHJ5KTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIXRoaXMuYWN0aXZlRW50cmllcyB8fCB0aGlzLmFjdGl2ZUVudHJpZXMubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBpdGVtID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbmQoZCA9PiB7XHJcbiAgICAgIHJldHVybiBlbnRyeS5uYW1lID09PSBkLm5hbWU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpdGVtID09PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==