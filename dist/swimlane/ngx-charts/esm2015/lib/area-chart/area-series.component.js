import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { area } from 'd3-shape';
import { sortLinear, sortByTime, sortByDomain } from '../utils/sort';
let AreaSeriesComponent = class AreaSeriesComponent {
    constructor() {
        this.baseValue = 'auto';
        this.stacked = false;
        this.normalized = false;
        this.animations = true;
        this.select = new EventEmitter();
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.updateGradient();
        let currentArea;
        let startingArea;
        const xProperty = d => {
            const label = d.name;
            return this.xScale(label);
        };
        if (this.stacked || this.normalized) {
            currentArea = area()
                .x(xProperty)
                .y0((d, i) => this.yScale(d.d0))
                .y1((d, i) => this.yScale(d.d1));
            startingArea = area()
                .x(xProperty)
                .y0(d => this.yScale.range()[0])
                .y1(d => this.yScale.range()[0]);
        }
        else {
            currentArea = area()
                .x(xProperty)
                .y0(() => (this.baseValue === 'auto' ? this.yScale.range()[0] : this.yScale(this.baseValue)))
                .y1(d => this.yScale(d.value));
            startingArea = area()
                .x(xProperty)
                .y0(d => (this.baseValue === 'auto' ? this.yScale.range()[0] : this.yScale(this.baseValue)))
                .y1(d => (this.baseValue === 'auto' ? this.yScale.range()[0] : this.yScale(this.baseValue)));
        }
        currentArea.curve(this.curve);
        startingArea.curve(this.curve);
        this.opacity = 0.8;
        let data = this.data.series;
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
    }
    updateGradient() {
        if (this.colors.scaleType === 'linear') {
            this.hasGradient = true;
            if (this.stacked || this.normalized) {
                const d0values = this.data.series.map(d => d.d0);
                const d1values = this.data.series.map(d => d.d1);
                const max = Math.max(...d1values);
                const min = Math.min(...d0values);
                this.gradientStops = this.colors.getLinearGradientStops(max, min);
            }
            else {
                const values = this.data.series.map(d => d.value);
                const max = Math.max(...values);
                this.gradientStops = this.colors.getLinearGradientStops(max);
            }
        }
        else {
            this.hasGradient = false;
            this.gradientStops = undefined;
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
        template: `
    <svg:g
      ngx-charts-area
      class="area-series"
      [data]="data"
      [path]="path"
      [fill]="colors.getColor(data.name)"
      [stops]="gradientStops"
      [startingPath]="startingPath"
      [opacity]="opacity"
      [gradient]="gradient || hasGradient"
      [animations]="animations"
      [class.active]="isActive(data)"
      [class.inactive]="isInactive(data)"
    />
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], AreaSeriesComponent);
export { AreaSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJlYS1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvYXJlYS1jaGFydC9hcmVhLXNlcmllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBR1osdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFaEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBc0JyRSxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQUFoQztRQUlXLGNBQVMsR0FBUSxNQUFNLENBQUM7UUFHeEIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixlQUFVLEdBQVksS0FBSyxDQUFDO1FBSTVCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFMUIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFtR3hDLENBQUM7SUExRkMsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV0QixJQUFJLFdBQVcsQ0FBQztRQUNoQixJQUFJLFlBQVksQ0FBQztRQUVqQixNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNwQixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3JCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUM7UUFFRixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQyxXQUFXLEdBQUcsSUFBSSxFQUFPO2lCQUN0QixDQUFDLENBQUMsU0FBUyxDQUFDO2lCQUNaLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUMvQixFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRW5DLFlBQVksR0FBRyxJQUFJLEVBQU87aUJBQ3ZCLENBQUMsQ0FBQyxTQUFTLENBQUM7aUJBQ1osRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDL0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BDO2FBQU07WUFDTCxXQUFXLEdBQUcsSUFBSSxFQUFPO2lCQUN0QixDQUFDLENBQUMsU0FBUyxDQUFDO2lCQUNaLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2lCQUM1RixFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRWpDLFlBQVksR0FBRyxJQUFJLEVBQU87aUJBQ3ZCLENBQUMsQ0FBQyxTQUFTLENBQUM7aUJBQ1osRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztpQkFDM0YsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hHO1FBRUQsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFFbkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFFBQVEsRUFBRTtZQUMvQixJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNqQzthQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxNQUFNLEVBQUU7WUFDcEMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDakM7YUFBTTtZQUNMLElBQUksR0FBRyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQ2hFO1FBRUQsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELGNBQWM7UUFDWixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxLQUFLLFFBQVEsRUFBRTtZQUN0QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDbkMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2pELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQztnQkFDbEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ25FO2lCQUFNO2dCQUNMLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDOUQ7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7U0FDaEM7SUFDSCxDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQUs7UUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWE7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUN0QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN2QyxPQUFPLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxLQUFLLFNBQVMsQ0FBQztJQUM1QixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQUs7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDekUsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDdkMsT0FBTyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksS0FBSyxTQUFTLENBQUM7SUFDNUIsQ0FBQztDQUNGLENBQUE7QUFoSFU7SUFBUixLQUFLLEVBQUU7aURBQU07QUFDTDtJQUFSLEtBQUssRUFBRTttREFBUTtBQUNQO0lBQVIsS0FBSyxFQUFFO21EQUFRO0FBQ1A7SUFBUixLQUFLLEVBQUU7c0RBQXlCO0FBQ3hCO0lBQVIsS0FBSyxFQUFFO21EQUFRO0FBQ1A7SUFBUixLQUFLLEVBQUU7c0RBQVc7QUFDVjtJQUFSLEtBQUssRUFBRTtvREFBMEI7QUFDekI7SUFBUixLQUFLLEVBQUU7dURBQTZCO0FBQzVCO0lBQVIsS0FBSyxFQUFFO3FEQUFVO0FBQ1Q7SUFBUixLQUFLLEVBQUU7a0RBQU87QUFDTjtJQUFSLEtBQUssRUFBRTswREFBc0I7QUFDckI7SUFBUixLQUFLLEVBQUU7dURBQTRCO0FBRTFCO0lBQVQsTUFBTSxFQUFFO21EQUE2QjtBQWQzQixtQkFBbUI7SUFwQi9CLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSwyQkFBMkI7UUFDckMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7R0FlVDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO0tBQ2hELENBQUM7R0FDVyxtQkFBbUIsQ0FpSC9CO1NBakhZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgYXJlYSB9IGZyb20gJ2QzLXNoYXBlJztcclxuXHJcbmltcG9ydCB7IHNvcnRMaW5lYXIsIHNvcnRCeVRpbWUsIHNvcnRCeURvbWFpbiB9IGZyb20gJy4uL3V0aWxzL3NvcnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtYXJlYS1zZXJpZXNdJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHN2ZzpnXHJcbiAgICAgIG5neC1jaGFydHMtYXJlYVxyXG4gICAgICBjbGFzcz1cImFyZWEtc2VyaWVzXCJcclxuICAgICAgW2RhdGFdPVwiZGF0YVwiXHJcbiAgICAgIFtwYXRoXT1cInBhdGhcIlxyXG4gICAgICBbZmlsbF09XCJjb2xvcnMuZ2V0Q29sb3IoZGF0YS5uYW1lKVwiXHJcbiAgICAgIFtzdG9wc109XCJncmFkaWVudFN0b3BzXCJcclxuICAgICAgW3N0YXJ0aW5nUGF0aF09XCJzdGFydGluZ1BhdGhcIlxyXG4gICAgICBbb3BhY2l0eV09XCJvcGFjaXR5XCJcclxuICAgICAgW2dyYWRpZW50XT1cImdyYWRpZW50IHx8IGhhc0dyYWRpZW50XCJcclxuICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaXNBY3RpdmUoZGF0YSlcIlxyXG4gICAgICBbY2xhc3MuaW5hY3RpdmVdPVwiaXNJbmFjdGl2ZShkYXRhKVwiXHJcbiAgICAvPlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEFyZWFTZXJpZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIGRhdGE7XHJcbiAgQElucHV0KCkgeFNjYWxlO1xyXG4gIEBJbnB1dCgpIHlTY2FsZTtcclxuICBASW5wdXQoKSBiYXNlVmFsdWU6IGFueSA9ICdhdXRvJztcclxuICBASW5wdXQoKSBjb2xvcnM7XHJcbiAgQElucHV0KCkgc2NhbGVUeXBlO1xyXG4gIEBJbnB1dCgpIHN0YWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSBub3JtYWxpemVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZ3JhZGllbnQ7XHJcbiAgQElucHV0KCkgY3VydmU7XHJcbiAgQElucHV0KCkgYWN0aXZlRW50cmllczogYW55W107XHJcbiAgQElucHV0KCkgYW5pbWF0aW9uczogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIG9wYWNpdHk6IG51bWJlcjtcclxuICBwYXRoOiBzdHJpbmc7XHJcbiAgc3RhcnRpbmdQYXRoOiBzdHJpbmc7XHJcblxyXG4gIGhhc0dyYWRpZW50OiBib29sZWFuO1xyXG4gIGdyYWRpZW50U3RvcHM6IGFueVtdO1xyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgdGhpcy51cGRhdGVHcmFkaWVudCgpO1xyXG5cclxuICAgIGxldCBjdXJyZW50QXJlYTtcclxuICAgIGxldCBzdGFydGluZ0FyZWE7XHJcblxyXG4gICAgY29uc3QgeFByb3BlcnR5ID0gZCA9PiB7XHJcbiAgICAgIGNvbnN0IGxhYmVsID0gZC5uYW1lO1xyXG4gICAgICByZXR1cm4gdGhpcy54U2NhbGUobGFiZWwpO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAodGhpcy5zdGFja2VkIHx8IHRoaXMubm9ybWFsaXplZCkge1xyXG4gICAgICBjdXJyZW50QXJlYSA9IGFyZWE8YW55PigpXHJcbiAgICAgICAgLngoeFByb3BlcnR5KVxyXG4gICAgICAgIC55MCgoZCwgaSkgPT4gdGhpcy55U2NhbGUoZC5kMCkpXHJcbiAgICAgICAgLnkxKChkLCBpKSA9PiB0aGlzLnlTY2FsZShkLmQxKSk7XHJcblxyXG4gICAgICBzdGFydGluZ0FyZWEgPSBhcmVhPGFueT4oKVxyXG4gICAgICAgIC54KHhQcm9wZXJ0eSlcclxuICAgICAgICAueTAoZCA9PiB0aGlzLnlTY2FsZS5yYW5nZSgpWzBdKVxyXG4gICAgICAgIC55MShkID0+IHRoaXMueVNjYWxlLnJhbmdlKClbMF0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY3VycmVudEFyZWEgPSBhcmVhPGFueT4oKVxyXG4gICAgICAgIC54KHhQcm9wZXJ0eSlcclxuICAgICAgICAueTAoKCkgPT4gKHRoaXMuYmFzZVZhbHVlID09PSAnYXV0bycgPyB0aGlzLnlTY2FsZS5yYW5nZSgpWzBdIDogdGhpcy55U2NhbGUodGhpcy5iYXNlVmFsdWUpKSlcclxuICAgICAgICAueTEoZCA9PiB0aGlzLnlTY2FsZShkLnZhbHVlKSk7XHJcblxyXG4gICAgICBzdGFydGluZ0FyZWEgPSBhcmVhPGFueT4oKVxyXG4gICAgICAgIC54KHhQcm9wZXJ0eSlcclxuICAgICAgICAueTAoZCA9PiAodGhpcy5iYXNlVmFsdWUgPT09ICdhdXRvJyA/IHRoaXMueVNjYWxlLnJhbmdlKClbMF0gOiB0aGlzLnlTY2FsZSh0aGlzLmJhc2VWYWx1ZSkpKVxyXG4gICAgICAgIC55MShkID0+ICh0aGlzLmJhc2VWYWx1ZSA9PT0gJ2F1dG8nID8gdGhpcy55U2NhbGUucmFuZ2UoKVswXSA6IHRoaXMueVNjYWxlKHRoaXMuYmFzZVZhbHVlKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGN1cnJlbnRBcmVhLmN1cnZlKHRoaXMuY3VydmUpO1xyXG4gICAgc3RhcnRpbmdBcmVhLmN1cnZlKHRoaXMuY3VydmUpO1xyXG5cclxuICAgIHRoaXMub3BhY2l0eSA9IDAuODtcclxuXHJcbiAgICBsZXQgZGF0YSA9IHRoaXMuZGF0YS5zZXJpZXM7XHJcbiAgICBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICdsaW5lYXInKSB7XHJcbiAgICAgIGRhdGEgPSBzb3J0TGluZWFyKGRhdGEsICduYW1lJyk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAndGltZScpIHtcclxuICAgICAgZGF0YSA9IHNvcnRCeVRpbWUoZGF0YSwgJ25hbWUnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRhdGEgPSBzb3J0QnlEb21haW4oZGF0YSwgJ25hbWUnLCAnYXNjJywgdGhpcy54U2NhbGUuZG9tYWluKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucGF0aCA9IGN1cnJlbnRBcmVhKGRhdGEpO1xyXG4gICAgdGhpcy5zdGFydGluZ1BhdGggPSBzdGFydGluZ0FyZWEoZGF0YSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVHcmFkaWVudCgpIHtcclxuICAgIGlmICh0aGlzLmNvbG9ycy5zY2FsZVR5cGUgPT09ICdsaW5lYXInKSB7XHJcbiAgICAgIHRoaXMuaGFzR3JhZGllbnQgPSB0cnVlO1xyXG4gICAgICBpZiAodGhpcy5zdGFja2VkIHx8IHRoaXMubm9ybWFsaXplZCkge1xyXG4gICAgICAgIGNvbnN0IGQwdmFsdWVzID0gdGhpcy5kYXRhLnNlcmllcy5tYXAoZCA9PiBkLmQwKTtcclxuICAgICAgICBjb25zdCBkMXZhbHVlcyA9IHRoaXMuZGF0YS5zZXJpZXMubWFwKGQgPT4gZC5kMSk7XHJcbiAgICAgICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoLi4uZDF2YWx1ZXMpO1xyXG4gICAgICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKC4uLmQwdmFsdWVzKTtcclxuICAgICAgICB0aGlzLmdyYWRpZW50U3RvcHMgPSB0aGlzLmNvbG9ycy5nZXRMaW5lYXJHcmFkaWVudFN0b3BzKG1heCwgbWluKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLmRhdGEuc2VyaWVzLm1hcChkID0+IGQudmFsdWUpO1xyXG4gICAgICAgIGNvbnN0IG1heCA9IE1hdGgubWF4KC4uLnZhbHVlcyk7XHJcbiAgICAgICAgdGhpcy5ncmFkaWVudFN0b3BzID0gdGhpcy5jb2xvcnMuZ2V0TGluZWFyR3JhZGllbnRTdG9wcyhtYXgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmhhc0dyYWRpZW50ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuZ3JhZGllbnRTdG9wcyA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzQWN0aXZlKGVudHJ5KTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIXRoaXMuYWN0aXZlRW50cmllcykgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3QgaXRlbSA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kKGQgPT4ge1xyXG4gICAgICByZXR1cm4gZW50cnkubmFtZSA9PT0gZC5uYW1lO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaXRlbSAhPT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgaXNJbmFjdGl2ZShlbnRyeSk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKCF0aGlzLmFjdGl2ZUVudHJpZXMgfHwgdGhpcy5hY3RpdmVFbnRyaWVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3QgaXRlbSA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kKGQgPT4ge1xyXG4gICAgICByZXR1cm4gZW50cnkubmFtZSA9PT0gZC5uYW1lO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaXRlbSA9PT0gdW5kZWZpbmVkO1xyXG4gIH1cclxufVxyXG4iXX0=