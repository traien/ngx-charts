import { __decorate } from "tslib";
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { area, line } from 'd3-shape';
import { id } from '../utils/id';
import { sortLinear, sortByTime, sortByDomain } from '../utils/sort';
let LineSeriesComponent = class LineSeriesComponent {
    constructor() {
        this.animations = true;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.updateGradients();
        const data = this.sortData(this.data.series);
        const lineGen = this.getLineGenerator();
        this.path = lineGen(data) || '';
        const areaGen = this.getAreaGenerator();
        this.areaPath = areaGen(data) || '';
        if (this.hasRange) {
            const range = this.getRangeGenerator();
            this.outerPath = range(data) || '';
        }
        if (this.hasGradient) {
            this.stroke = this.gradientUrl;
            const values = this.data.series.map(d => d.value);
            const max = Math.max(...values);
            const min = Math.min(...values);
            if (max === min) {
                this.stroke = this.colors.getColor(max);
            }
        }
        else {
            this.stroke = this.colors.getColor(this.data.name);
        }
    }
    getLineGenerator() {
        return line()
            .x(d => {
            const label = d.name;
            let value;
            if (this.scaleType === 'time') {
                value = this.xScale(label);
            }
            else if (this.scaleType === 'linear') {
                value = this.xScale(Number(label));
            }
            else {
                value = this.xScale(label);
            }
            return value;
        })
            .y(d => this.yScale(d.value))
            .curve(this.curve);
    }
    getRangeGenerator() {
        return area()
            .x(d => {
            const label = d.name;
            let value;
            if (this.scaleType === 'time') {
                value = this.xScale(label);
            }
            else if (this.scaleType === 'linear') {
                value = this.xScale(Number(label));
            }
            else {
                value = this.xScale(label);
            }
            return value;
        })
            .y0(d => this.yScale(typeof d.min === 'number' ? d.min : d.value))
            .y1(d => this.yScale(typeof d.max === 'number' ? d.max : d.value))
            .curve(this.curve);
    }
    getAreaGenerator() {
        const xProperty = d => {
            const label = d.name;
            return this.xScale(label);
        };
        return area()
            .x(xProperty)
            .y0(() => this.yScale.range()[0])
            .y1(d => this.yScale(d.value))
            .curve(this.curve);
    }
    sortData(data) {
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
    }
    updateGradients() {
        if (this.colors.scaleType === 'linear') {
            this.hasGradient = true;
            this.gradientId = 'grad' + id().toString();
            this.gradientUrl = `url(#${this.gradientId})`;
            const values = this.data.series.map(d => d.value);
            const max = Math.max(...values);
            const min = Math.min(...values);
            this.gradientStops = this.colors.getLinearGradientStops(max, min);
            this.areaGradientStops = this.colors.getLinearGradientStops(max);
        }
        else {
            this.hasGradient = false;
            this.gradientStops = undefined;
            this.areaGradientStops = undefined;
        }
    }
    isActive(entry) {
        if (!this.activeEntries)
            return false;
        const item = this.activeEntries.find(d => {
            return entry.name === d.name;
        });
        return item !== undefined;
    }
    isInactive(entry) {
        if (!this.activeEntries || this.activeEntries.length === 0)
            return false;
        const item = this.activeEntries.find(d => {
            return entry.name === d.name;
        });
        return item === undefined;
    }
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
        template: `
    <svg:g>
      <defs>
        <svg:g
          ngx-charts-svg-linear-gradient
          *ngIf="hasGradient"
          orientation="vertical"
          [name]="gradientId"
          [stops]="gradientStops"
        />
      </defs>
      <svg:g
        ngx-charts-area
        class="line-highlight"
        [data]="data"
        [path]="areaPath"
        [fill]="hasGradient ? gradientUrl : colors.getColor(data.name)"
        [opacity]="0.25"
        [startOpacity]="0"
        [gradient]="true"
        [stops]="areaGradientStops"
        [class.active]="isActive(data)"
        [class.inactive]="isInactive(data)"
        [animations]="animations"
      />
      <svg:g
        ngx-charts-line
        class="line-series"
        [data]="data"
        [path]="path"
        [stroke]="stroke"
        [animations]="animations"
        [class.active]="isActive(data)"
        [class.inactive]="isInactive(data)"
      />
      <svg:g
        ngx-charts-area
        *ngIf="hasRange"
        class="line-series-range"
        [data]="data"
        [path]="outerPath"
        [fill]="hasGradient ? gradientUrl : colors.getColor(data.name)"
        [class.active]="isActive(data)"
        [class.inactive]="isInactive(data)"
        [opacity]="rangeFillOpacity"
        [animations]="animations"
      />
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], LineSeriesComponent);
export { LineSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvbGluZS1jaGFydC9saW5lLXNlcmllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUE0Qix1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUV0QyxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXVEckUsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFBaEM7UUFVVyxlQUFVLEdBQVksSUFBSSxDQUFDO0lBMkl0QyxDQUFDO0lBL0hDLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFdkIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTdDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVoQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFcEMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE1B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QkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGFyZWEsIGxpbmUgfSBmcm9tICdkMy1zaGFwZSc7XHJcblxyXG5pbXBvcnQgeyBpZCB9IGZyb20gJy4uL3V0aWxzL2lkJztcclxuaW1wb3J0IHsgc29ydExpbmVhciwgc29ydEJ5VGltZSwgc29ydEJ5RG9tYWluIH0gZnJvbSAnLi4vdXRpbHMvc29ydCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1saW5lLXNlcmllc10nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8c3ZnOmc+XHJcbiAgICAgIDxkZWZzPlxyXG4gICAgICAgIDxzdmc6Z1xyXG4gICAgICAgICAgbmd4LWNoYXJ0cy1zdmctbGluZWFyLWdyYWRpZW50XHJcbiAgICAgICAgICAqbmdJZj1cImhhc0dyYWRpZW50XCJcclxuICAgICAgICAgIG9yaWVudGF0aW9uPVwidmVydGljYWxcIlxyXG4gICAgICAgICAgW25hbWVdPVwiZ3JhZGllbnRJZFwiXHJcbiAgICAgICAgICBbc3RvcHNdPVwiZ3JhZGllbnRTdG9wc1wiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kZWZzPlxyXG4gICAgICA8c3ZnOmdcclxuICAgICAgICBuZ3gtY2hhcnRzLWFyZWFcclxuICAgICAgICBjbGFzcz1cImxpbmUtaGlnaGxpZ2h0XCJcclxuICAgICAgICBbZGF0YV09XCJkYXRhXCJcclxuICAgICAgICBbcGF0aF09XCJhcmVhUGF0aFwiXHJcbiAgICAgICAgW2ZpbGxdPVwiaGFzR3JhZGllbnQgPyBncmFkaWVudFVybCA6IGNvbG9ycy5nZXRDb2xvcihkYXRhLm5hbWUpXCJcclxuICAgICAgICBbb3BhY2l0eV09XCIwLjI1XCJcclxuICAgICAgICBbc3RhcnRPcGFjaXR5XT1cIjBcIlxyXG4gICAgICAgIFtncmFkaWVudF09XCJ0cnVlXCJcclxuICAgICAgICBbc3RvcHNdPVwiYXJlYUdyYWRpZW50U3RvcHNcIlxyXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaXNBY3RpdmUoZGF0YSlcIlxyXG4gICAgICAgIFtjbGFzcy5pbmFjdGl2ZV09XCJpc0luYWN0aXZlKGRhdGEpXCJcclxuICAgICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcclxuICAgICAgLz5cclxuICAgICAgPHN2ZzpnXHJcbiAgICAgICAgbmd4LWNoYXJ0cy1saW5lXHJcbiAgICAgICAgY2xhc3M9XCJsaW5lLXNlcmllc1wiXHJcbiAgICAgICAgW2RhdGFdPVwiZGF0YVwiXHJcbiAgICAgICAgW3BhdGhdPVwicGF0aFwiXHJcbiAgICAgICAgW3N0cm9rZV09XCJzdHJva2VcIlxyXG4gICAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxyXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaXNBY3RpdmUoZGF0YSlcIlxyXG4gICAgICAgIFtjbGFzcy5pbmFjdGl2ZV09XCJpc0luYWN0aXZlKGRhdGEpXCJcclxuICAgICAgLz5cclxuICAgICAgPHN2ZzpnXHJcbiAgICAgICAgbmd4LWNoYXJ0cy1hcmVhXHJcbiAgICAgICAgKm5nSWY9XCJoYXNSYW5nZVwiXHJcbiAgICAgICAgY2xhc3M9XCJsaW5lLXNlcmllcy1yYW5nZVwiXHJcbiAgICAgICAgW2RhdGFdPVwiZGF0YVwiXHJcbiAgICAgICAgW3BhdGhdPVwib3V0ZXJQYXRoXCJcclxuICAgICAgICBbZmlsbF09XCJoYXNHcmFkaWVudCA/IGdyYWRpZW50VXJsIDogY29sb3JzLmdldENvbG9yKGRhdGEubmFtZSlcIlxyXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaXNBY3RpdmUoZGF0YSlcIlxyXG4gICAgICAgIFtjbGFzcy5pbmFjdGl2ZV09XCJpc0luYWN0aXZlKGRhdGEpXCJcclxuICAgICAgICBbb3BhY2l0eV09XCJyYW5nZUZpbGxPcGFjaXR5XCJcclxuICAgICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcclxuICAgICAgLz5cclxuICAgIDwvc3ZnOmc+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGluZVNlcmllc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgZGF0YTtcclxuICBASW5wdXQoKSB4U2NhbGU7XHJcbiAgQElucHV0KCkgeVNjYWxlO1xyXG4gIEBJbnB1dCgpIGNvbG9ycztcclxuICBASW5wdXQoKSBzY2FsZVR5cGU7XHJcbiAgQElucHV0KCkgY3VydmU6IGFueTtcclxuICBASW5wdXQoKSBhY3RpdmVFbnRyaWVzOiBhbnlbXTtcclxuICBASW5wdXQoKSByYW5nZUZpbGxPcGFjaXR5OiBudW1iZXI7XHJcbiAgQElucHV0KCkgaGFzUmFuZ2U6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgYW5pbWF0aW9uczogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIHBhdGg6IHN0cmluZztcclxuICBvdXRlclBhdGg6IHN0cmluZztcclxuICBhcmVhUGF0aDogc3RyaW5nO1xyXG4gIGdyYWRpZW50SWQ6IHN0cmluZztcclxuICBncmFkaWVudFVybDogc3RyaW5nO1xyXG4gIGhhc0dyYWRpZW50OiBib29sZWFuO1xyXG4gIGdyYWRpZW50U3RvcHM6IGFueVtdO1xyXG4gIGFyZWFHcmFkaWVudFN0b3BzOiBhbnlbXTtcclxuICBzdHJva2U6IGFueTtcclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMudXBkYXRlR3JhZGllbnRzKCk7XHJcblxyXG4gICAgY29uc3QgZGF0YSA9IHRoaXMuc29ydERhdGEodGhpcy5kYXRhLnNlcmllcyk7XHJcblxyXG4gICAgY29uc3QgbGluZUdlbiA9IHRoaXMuZ2V0TGluZUdlbmVyYXRvcigpO1xyXG4gICAgdGhpcy5wYXRoID0gbGluZUdlbihkYXRhKSB8fCAnJztcclxuXHJcbiAgICBjb25zdCBhcmVhR2VuID0gdGhpcy5nZXRBcmVhR2VuZXJhdG9yKCk7XHJcbiAgICB0aGlzLmFyZWFQYXRoID0gYXJlYUdlbihkYXRhKSB8fCAnJztcclxuXHJcbiAgICBpZiAodGhpcy5oYXNSYW5nZSkge1xyXG4gICAgICBjb25zdCByYW5nZSA9IHRoaXMuZ2V0UmFuZ2VHZW5lcmF0b3IoKTtcclxuICAgICAgdGhpcy5vdXRlclBhdGggPSByYW5nZShkYXRhKSB8fCAnJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5oYXNHcmFkaWVudCkge1xyXG4gICAgICB0aGlzLnN0cm9rZSA9IHRoaXMuZ3JhZGllbnRVcmw7XHJcbiAgICAgIGNvbnN0IHZhbHVlcyA9IHRoaXMuZGF0YS5zZXJpZXMubWFwKGQgPT4gZC52YWx1ZSk7XHJcbiAgICAgIGNvbnN0IG1heCA9IE1hdGgubWF4KC4uLnZhbHVlcyk7XHJcbiAgICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKC4uLnZhbHVlcyk7XHJcbiAgICAgIGlmIChtYXggPT09IG1pbikge1xyXG4gICAgICAgIHRoaXMuc3Ryb2tlID0gdGhpcy5jb2xvcnMuZ2V0Q29sb3IobWF4KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zdHJva2UgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcih0aGlzLmRhdGEubmFtZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRMaW5lR2VuZXJhdG9yKCk6IGFueSB7XHJcbiAgICByZXR1cm4gbGluZTxhbnk+KClcclxuICAgICAgLngoZCA9PiB7XHJcbiAgICAgICAgY29uc3QgbGFiZWwgPSBkLm5hbWU7XHJcbiAgICAgICAgbGV0IHZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ3RpbWUnKSB7XHJcbiAgICAgICAgICB2YWx1ZSA9IHRoaXMueFNjYWxlKGxhYmVsKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAnbGluZWFyJykge1xyXG4gICAgICAgICAgdmFsdWUgPSB0aGlzLnhTY2FsZShOdW1iZXIobGFiZWwpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmFsdWUgPSB0aGlzLnhTY2FsZShsYWJlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgfSlcclxuICAgICAgLnkoZCA9PiB0aGlzLnlTY2FsZShkLnZhbHVlKSlcclxuICAgICAgLmN1cnZlKHRoaXMuY3VydmUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmFuZ2VHZW5lcmF0b3IoKTogYW55IHtcclxuICAgIHJldHVybiBhcmVhPGFueT4oKVxyXG4gICAgICAueChkID0+IHtcclxuICAgICAgICBjb25zdCBsYWJlbCA9IGQubmFtZTtcclxuICAgICAgICBsZXQgdmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAndGltZScpIHtcclxuICAgICAgICAgIHZhbHVlID0gdGhpcy54U2NhbGUobGFiZWwpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICdsaW5lYXInKSB7XHJcbiAgICAgICAgICB2YWx1ZSA9IHRoaXMueFNjYWxlKE51bWJlcihsYWJlbCkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2YWx1ZSA9IHRoaXMueFNjYWxlKGxhYmVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICB9KVxyXG4gICAgICAueTAoZCA9PiB0aGlzLnlTY2FsZSh0eXBlb2YgZC5taW4gPT09ICdudW1iZXInID8gZC5taW4gOiBkLnZhbHVlKSlcclxuICAgICAgLnkxKGQgPT4gdGhpcy55U2NhbGUodHlwZW9mIGQubWF4ID09PSAnbnVtYmVyJyA/IGQubWF4IDogZC52YWx1ZSkpXHJcbiAgICAgIC5jdXJ2ZSh0aGlzLmN1cnZlKTtcclxuICB9XHJcblxyXG4gIGdldEFyZWFHZW5lcmF0b3IoKTogYW55IHtcclxuICAgIGNvbnN0IHhQcm9wZXJ0eSA9IGQgPT4ge1xyXG4gICAgICBjb25zdCBsYWJlbCA9IGQubmFtZTtcclxuICAgICAgcmV0dXJuIHRoaXMueFNjYWxlKGxhYmVsKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGFyZWE8YW55PigpXHJcbiAgICAgIC54KHhQcm9wZXJ0eSlcclxuICAgICAgLnkwKCgpID0+IHRoaXMueVNjYWxlLnJhbmdlKClbMF0pXHJcbiAgICAgIC55MShkID0+IHRoaXMueVNjYWxlKGQudmFsdWUpKVxyXG4gICAgICAuY3VydmUodGhpcy5jdXJ2ZSk7XHJcbiAgfVxyXG5cclxuICBzb3J0RGF0YShkYXRhKSB7XHJcbiAgICBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICdsaW5lYXInKSB7XHJcbiAgICAgIGRhdGEgPSBzb3J0TGluZWFyKGRhdGEsICduYW1lJyk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAndGltZScpIHtcclxuICAgICAgZGF0YSA9IHNvcnRCeVRpbWUoZGF0YSwgJ25hbWUnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRhdGEgPSBzb3J0QnlEb21haW4oZGF0YSwgJ25hbWUnLCAnYXNjJywgdGhpcy54U2NhbGUuZG9tYWluKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlR3JhZGllbnRzKCkge1xyXG4gICAgaWYgKHRoaXMuY29sb3JzLnNjYWxlVHlwZSA9PT0gJ2xpbmVhcicpIHtcclxuICAgICAgdGhpcy5oYXNHcmFkaWVudCA9IHRydWU7XHJcbiAgICAgIHRoaXMuZ3JhZGllbnRJZCA9ICdncmFkJyArIGlkKCkudG9TdHJpbmcoKTtcclxuICAgICAgdGhpcy5ncmFkaWVudFVybCA9IGB1cmwoIyR7dGhpcy5ncmFkaWVudElkfSlgO1xyXG4gICAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLmRhdGEuc2VyaWVzLm1hcChkID0+IGQudmFsdWUpO1xyXG4gICAgICBjb25zdCBtYXggPSBNYXRoLm1heCguLi52YWx1ZXMpO1xyXG4gICAgICBjb25zdCBtaW4gPSBNYXRoLm1pbiguLi52YWx1ZXMpO1xyXG4gICAgICB0aGlzLmdyYWRpZW50U3RvcHMgPSB0aGlzLmNvbG9ycy5nZXRMaW5lYXJHcmFkaWVudFN0b3BzKG1heCwgbWluKTtcclxuICAgICAgdGhpcy5hcmVhR3JhZGllbnRTdG9wcyA9IHRoaXMuY29sb3JzLmdldExpbmVhckdyYWRpZW50U3RvcHMobWF4KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaGFzR3JhZGllbnQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5ncmFkaWVudFN0b3BzID0gdW5kZWZpbmVkO1xyXG4gICAgICB0aGlzLmFyZWFHcmFkaWVudFN0b3BzID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNBY3RpdmUoZW50cnkpOiBib29sZWFuIHtcclxuICAgIGlmICghdGhpcy5hY3RpdmVFbnRyaWVzKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBpdGVtID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbmQoZCA9PiB7XHJcbiAgICAgIHJldHVybiBlbnRyeS5uYW1lID09PSBkLm5hbWU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpdGVtICE9PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBpc0luYWN0aXZlKGVudHJ5KTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIXRoaXMuYWN0aXZlRW50cmllcyB8fCB0aGlzLmFjdGl2ZUVudHJpZXMubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBpdGVtID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbmQoZCA9PiB7XHJcbiAgICAgIHJldHVybiBlbnRyeS5uYW1lID09PSBkLm5hbWU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpdGVtID09PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==