import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { max } from 'd3-array';
import { arc, pie } from 'd3-shape';
import { formatLabel, escapeLabel } from '../common/label.helper';
let PieSeriesComponent = class PieSeriesComponent {
    constructor() {
        this.series = [];
        this.innerRadius = 60;
        this.outerRadius = 80;
        this.trimLabels = true;
        this.maxLabelLength = 10;
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.dblclick = new EventEmitter();
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        const pieGenerator = pie()
            .value(d => d.value)
            .sort(null);
        const arcData = pieGenerator(this.series);
        this.max = max(arcData, d => {
            return d.value;
        });
        this.data = this.calculateLabelPositions(arcData);
        this.tooltipText = this.tooltipText || this.defaultTooltipText;
    }
    midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }
    outerArc() {
        const factor = 1.5;
        return arc()
            .innerRadius(this.outerRadius * factor)
            .outerRadius(this.outerRadius * factor);
    }
    calculateLabelPositions(pieData) {
        const factor = 1.5;
        const minDistance = 10;
        const labelPositions = pieData;
        labelPositions.forEach(d => {
            d.pos = this.outerArc().centroid(d);
            d.pos[0] = factor * this.outerRadius * (this.midAngle(d) < Math.PI ? 1 : -1);
        });
        for (let i = 0; i < labelPositions.length - 1; i++) {
            const a = labelPositions[i];
            if (!this.labelVisible(a)) {
                continue;
            }
            for (let j = i + 1; j < labelPositions.length; j++) {
                const b = labelPositions[j];
                if (!this.labelVisible(b)) {
                    continue;
                }
                // if they're on the same side
                if (b.pos[0] * a.pos[0] > 0) {
                    // if they're overlapping
                    const o = minDistance - Math.abs(b.pos[1] - a.pos[1]);
                    if (o > 0) {
                        // push the second up or down
                        b.pos[1] += Math.sign(b.pos[0]) * o;
                    }
                }
            }
        }
        return labelPositions;
    }
    labelVisible(myArc) {
        return this.showLabels && myArc.endAngle - myArc.startAngle > Math.PI / 30;
    }
    getTooltipTitle(a) {
        return this.tooltipTemplate ? undefined : this.tooltipText(a);
    }
    labelText(myArc) {
        if (this.labelFormatting) {
            return this.labelFormatting(myArc.data.name);
        }
        return this.label(myArc);
    }
    label(myArc) {
        return formatLabel(myArc.data.name);
    }
    defaultTooltipText(myArc) {
        const label = this.label(myArc);
        const val = formatLabel(myArc.data.value);
        return `
      <span class="tooltip-label">${escapeLabel(label)}</span>
      <span class="tooltip-val">${val}</span>
    `;
    }
    color(myArc) {
        return this.colors.getColor(this.label(myArc));
    }
    trackBy(index, item) {
        return item.data.name;
    }
    onClick(data) {
        this.select.emit(data);
    }
    isActive(entry) {
        if (!this.activeEntries)
            return false;
        const item = this.activeEntries.find(d => {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    }
};
__decorate([
    Input()
], PieSeriesComponent.prototype, "colors", void 0);
__decorate([
    Input()
], PieSeriesComponent.prototype, "series", void 0);
__decorate([
    Input()
], PieSeriesComponent.prototype, "dims", void 0);
__decorate([
    Input()
], PieSeriesComponent.prototype, "innerRadius", void 0);
__decorate([
    Input()
], PieSeriesComponent.prototype, "outerRadius", void 0);
__decorate([
    Input()
], PieSeriesComponent.prototype, "explodeSlices", void 0);
__decorate([
    Input()
], PieSeriesComponent.prototype, "showLabels", void 0);
__decorate([
    Input()
], PieSeriesComponent.prototype, "gradient", void 0);
__decorate([
    Input()
], PieSeriesComponent.prototype, "activeEntries", void 0);
__decorate([
    Input()
], PieSeriesComponent.prototype, "labelFormatting", void 0);
__decorate([
    Input()
], PieSeriesComponent.prototype, "trimLabels", void 0);
__decorate([
    Input()
], PieSeriesComponent.prototype, "maxLabelLength", void 0);
__decorate([
    Input()
], PieSeriesComponent.prototype, "tooltipText", void 0);
__decorate([
    Input()
], PieSeriesComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input()
], PieSeriesComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    Input()
], PieSeriesComponent.prototype, "animations", void 0);
__decorate([
    Output()
], PieSeriesComponent.prototype, "select", void 0);
__decorate([
    Output()
], PieSeriesComponent.prototype, "activate", void 0);
__decorate([
    Output()
], PieSeriesComponent.prototype, "deactivate", void 0);
__decorate([
    Output()
], PieSeriesComponent.prototype, "dblclick", void 0);
PieSeriesComponent = __decorate([
    Component({
        selector: 'g[ngx-charts-pie-series]',
        template: `
    <svg:g *ngFor="let arc of data; trackBy: trackBy">
      <svg:g
        ngx-charts-pie-label
        *ngIf="labelVisible(arc)"
        [data]="arc"
        [radius]="outerRadius"
        [color]="color(arc)"
        [label]="labelText(arc)"
        [labelTrim]="trimLabels"
        [labelTrimSize]="maxLabelLength"
        [max]="max"
        [value]="arc.value"
        [explodeSlices]="explodeSlices"
        [animations]="animations"
      ></svg:g>
      <svg:g
        ngx-charts-pie-arc
        [startAngle]="arc.startAngle"
        [endAngle]="arc.endAngle"
        [innerRadius]="innerRadius"
        [outerRadius]="outerRadius"
        [fill]="color(arc)"
        [value]="arc.data.value"
        [gradient]="gradient"
        [data]="arc.data"
        [max]="max"
        [explodeSlices]="explodeSlices"
        [isActive]="isActive(arc.data)"
        [animate]="animations"
        (select)="onClick($event)"
        (activate)="activate.emit($event)"
        (deactivate)="deactivate.emit($event)"
        (dblclick)="dblclick.emit($event)"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="'top'"
        [tooltipType]="'tooltip'"
        [tooltipTitle]="getTooltipTitle(arc)"
        [tooltipTemplate]="tooltipTemplate"
        [tooltipContext]="arc.data"
      ></svg:g>
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], PieSeriesComponent);
export { PieSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLXNlcmllcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9waWUtY2hhcnQvcGllLXNlcmllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBRVosdUJBQXVCLEVBRXhCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDL0IsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFcEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQWtEbEUsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUFBL0I7UUFFVyxXQUFNLEdBQVEsRUFBRSxDQUFDO1FBRWpCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBTWpCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IsbUJBQWMsR0FBVyxFQUFFLENBQUM7UUFFNUIsb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFFakMsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUxQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1QixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNoQyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQXdIMUMsQ0FBQztJQW5IQyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0osTUFBTSxZQUFZLEdBQUcsR0FBRyxFQUFZO2FBQ2pDLEtBQUssQ0FBQyxDQUFD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QUE2QjtBQUM1QjtJQUFSLEtBQUssRUFBRTt1REFBOEI7QUFDN0I7SUFBUixLQUFLLEVBQUU7MkRBQWtDO0FBQ2pDO0lBQVIsS0FBSyxFQUFFOzJEQUFtQztBQUNsQztJQUFSLEtBQUssRUFBRTtzREFBNEI7QUFFMUI7SUFBVCxNQUFNLEVBQUU7a0RBQTZCO0FBQzVCO0lBQVQsTUFBTSxFQUFFO29EQUErQjtBQUM5QjtJQUFULE1BQU0sRUFBRTtzREFBaUM7QUFDaEM7SUFBVCxNQUFNLEVBQUU7b0RBQStCO0FBckI3QixrQkFBa0I7SUFoRDlCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSwwQkFBMEI7UUFDcEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkNUO1FBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07S0FDaEQsQ0FBQztHQUNXLGtCQUFrQixDQTZJOUI7U0E3SVksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBUZW1wbGF0ZVJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBtYXggfSBmcm9tICdkMy1hcnJheSc7XHJcbmltcG9ydCB7IGFyYywgcGllIH0gZnJvbSAnZDMtc2hhcGUnO1xyXG5cclxuaW1wb3J0IHsgZm9ybWF0TGFiZWwsIGVzY2FwZUxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsLmhlbHBlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1waWUtc2VyaWVzXScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxzdmc6ZyAqbmdGb3I9XCJsZXQgYXJjIG9mIGRhdGE7IHRyYWNrQnk6IHRyYWNrQnlcIj5cclxuICAgICAgPHN2ZzpnXHJcbiAgICAgICAgbmd4LWNoYXJ0cy1waWUtbGFiZWxcclxuICAgICAgICAqbmdJZj1cImxhYmVsVmlzaWJsZShhcmMpXCJcclxuICAgICAgICBbZGF0YV09XCJhcmNcIlxyXG4gICAgICAgIFtyYWRpdXNdPVwib3V0ZXJSYWRpdXNcIlxyXG4gICAgICAgIFtjb2xvcl09XCJjb2xvcihhcmMpXCJcclxuICAgICAgICBbbGFiZWxdPVwibGFiZWxUZXh0KGFyYylcIlxyXG4gICAgICAgIFtsYWJlbFRyaW1dPVwidHJpbUxhYmVsc1wiXHJcbiAgICAgICAgW2xhYmVsVHJpbVNpemVdPVwibWF4TGFiZWxMZW5ndGhcIlxyXG4gICAgICAgIFttYXhdPVwibWF4XCJcclxuICAgICAgICBbdmFsdWVdPVwiYXJjLnZhbHVlXCJcclxuICAgICAgICBbZXhwbG9kZVNsaWNlc109XCJleHBsb2RlU2xpY2VzXCJcclxuICAgICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcclxuICAgICAgPjwvc3ZnOmc+XHJcbiAgICAgIDxzdmc6Z1xyXG4gICAgICAgIG5neC1jaGFydHMtcGllLWFyY1xyXG4gICAgICAgIFtzdGFydEFuZ2xlXT1cImFyYy5zdGFydEFuZ2xlXCJcclxuICAgICAgICBbZW5kQW5nbGVdPVwiYXJjLmVuZEFuZ2xlXCJcclxuICAgICAgICBbaW5uZXJSYWRpdXNdPVwiaW5uZXJSYWRpdXNcIlxyXG4gICAgICAgIFtvdXRlclJhZGl1c109XCJvdXRlclJhZGl1c1wiXHJcbiAgICAgICAgW2ZpbGxdPVwiY29sb3IoYXJjKVwiXHJcbiAgICAgICAgW3ZhbHVlXT1cImFyYy5kYXRhLnZhbHVlXCJcclxuICAgICAgICBbZ3JhZGllbnRdPVwiZ3JhZGllbnRcIlxyXG4gICAgICAgIFtkYXRhXT1cImFyYy5kYXRhXCJcclxuICAgICAgICBbbWF4XT1cIm1heFwiXHJcbiAgICAgICAgW2V4cGxvZGVTbGljZXNdPVwiZXhwbG9kZVNsaWNlc1wiXHJcbiAgICAgICAgW2lzQWN0aXZlXT1cImlzQWN0aXZlKGFyYy5kYXRhKVwiXHJcbiAgICAgICAgW2FuaW1hdGVdPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKCRldmVudClcIlxyXG4gICAgICAgIChhY3RpdmF0ZSk9XCJhY3RpdmF0ZS5lbWl0KCRldmVudClcIlxyXG4gICAgICAgIChkZWFjdGl2YXRlKT1cImRlYWN0aXZhdGUuZW1pdCgkZXZlbnQpXCJcclxuICAgICAgICAoZGJsY2xpY2spPVwiZGJsY2xpY2suZW1pdCgkZXZlbnQpXCJcclxuICAgICAgICBuZ3gtdG9vbHRpcFxyXG4gICAgICAgIFt0b29sdGlwRGlzYWJsZWRdPVwidG9vbHRpcERpc2FibGVkXCJcclxuICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCIndG9wJ1wiXHJcbiAgICAgICAgW3Rvb2x0aXBUeXBlXT1cIid0b29sdGlwJ1wiXHJcbiAgICAgICAgW3Rvb2x0aXBUaXRsZV09XCJnZXRUb29sdGlwVGl0bGUoYXJjKVwiXHJcbiAgICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxyXG4gICAgICAgIFt0b29sdGlwQ29udGV4dF09XCJhcmMuZGF0YVwiXHJcbiAgICAgID48L3N2ZzpnPlxyXG4gICAgPC9zdmc6Zz5cclxuICBgLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQaWVTZXJpZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIGNvbG9ycztcclxuICBASW5wdXQoKSBzZXJpZXM6IGFueSA9IFtdO1xyXG4gIEBJbnB1dCgpIGRpbXM7XHJcbiAgQElucHV0KCkgaW5uZXJSYWRpdXMgPSA2MDtcclxuICBASW5wdXQoKSBvdXRlclJhZGl1cyA9IDgwO1xyXG4gIEBJbnB1dCgpIGV4cGxvZGVTbGljZXM7XHJcbiAgQElucHV0KCkgc2hvd0xhYmVscztcclxuICBASW5wdXQoKSBncmFkaWVudDogYm9vbGVhbjtcclxuICBASW5wdXQoKSBhY3RpdmVFbnRyaWVzOiBhbnlbXTtcclxuICBASW5wdXQoKSBsYWJlbEZvcm1hdHRpbmc6IGFueTtcclxuICBASW5wdXQoKSB0cmltTGFiZWxzOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSBtYXhMYWJlbExlbmd0aDogbnVtYmVyID0gMTA7XHJcbiAgQElucHV0KCkgdG9vbHRpcFRleHQ6IChvOiBhbnkpID0+IGFueTtcclxuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgQElucHV0KCkgYW5pbWF0aW9uczogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBkYmxjbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgbWF4OiBudW1iZXI7XHJcbiAgZGF0YTogYW55O1xyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgY29uc3QgcGllR2VuZXJhdG9yID0gcGllPGFueSwgYW55PigpXHJcbiAgICAgIC52YWx1ZShkID0+IGQudmFsdWUpXHJcbiAgICAgIC5zb3J0KG51bGwpO1xyXG5cclxuICAgIGNvbnN0IGFyY0RhdGEgPSBwaWVHZW5lcmF0b3IodGhpcy5zZXJpZXMpO1xyXG5cclxuICAgIHRoaXMubWF4ID0gbWF4KGFyY0RhdGEsIGQgPT4ge1xyXG4gICAgICByZXR1cm4gZC52YWx1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZGF0YSA9IHRoaXMuY2FsY3VsYXRlTGFiZWxQb3NpdGlvbnMoYXJjRGF0YSk7XHJcbiAgICB0aGlzLnRvb2x0aXBUZXh0ID0gdGhpcy50b29sdGlwVGV4dCB8fCB0aGlzLmRlZmF1bHRUb29sdGlwVGV4dDtcclxuICB9XHJcblxyXG4gIG1pZEFuZ2xlKGQpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIGQuc3RhcnRBbmdsZSArIChkLmVuZEFuZ2xlIC0gZC5zdGFydEFuZ2xlKSAvIDI7XHJcbiAgfVxyXG5cclxuICBvdXRlckFyYygpOiBhbnkge1xyXG4gICAgY29uc3QgZmFjdG9yID0gMS41O1xyXG5cclxuICAgIHJldHVybiBhcmMoKVxyXG4gICAgICAuaW5uZXJSYWRpdXModGhpcy5vdXRlclJhZGl1cyAqIGZhY3RvcilcclxuICAgICAgLm91dGVyUmFkaXVzKHRoaXMub3V0ZXJSYWRpdXMgKiBmYWN0b3IpO1xyXG4gIH1cclxuXHJcbiAgY2FsY3VsYXRlTGFiZWxQb3NpdGlvbnMocGllRGF0YSk6IGFueSB7XHJcbiAgICBjb25zdCBmYWN0b3IgPSAxLjU7XHJcbiAgICBjb25zdCBtaW5EaXN0YW5jZSA9IDEwO1xyXG4gICAgY29uc3QgbGFiZWxQb3NpdGlvbnMgPSBwaWVEYXRhO1xyXG5cclxuICAgIGxhYmVsUG9zaXRpb25zLmZvckVhY2goZCA9PiB7XHJcbiAgICAgIGQucG9zID0gdGhpcy5vdXRlckFyYygpLmNlbnRyb2lkKGQpO1xyXG4gICAgICBkLnBvc1swXSA9IGZhY3RvciAqIHRoaXMub3V0ZXJSYWRpdXMgKiAodGhpcy5taWRBbmdsZShkKSA8IE1hdGguUEkgPyAxIDogLTEpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYWJlbFBvc2l0aW9ucy5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgY29uc3QgYSA9IGxhYmVsUG9zaXRpb25zW2ldO1xyXG4gICAgICBpZiAoIXRoaXMubGFiZWxWaXNpYmxlKGEpKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IGxhYmVsUG9zaXRpb25zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgY29uc3QgYiA9IGxhYmVsUG9zaXRpb25zW2pdO1xyXG4gICAgICAgIGlmICghdGhpcy5sYWJlbFZpc2libGUoYikpIHtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZiB0aGV5J3JlIG9uIHRoZSBzYW1lIHNpZGVcclxuICAgICAgICBpZiAoYi5wb3NbMF0gKiBhLnBvc1swXSA+IDApIHtcclxuICAgICAgICAgIC8vIGlmIHRoZXkncmUgb3ZlcmxhcHBpbmdcclxuICAgICAgICAgIGNvbnN0IG8gPSBtaW5EaXN0YW5jZSAtIE1hdGguYWJzKGIucG9zWzFdIC0gYS5wb3NbMV0pO1xyXG4gICAgICAgICAgaWYgKG8gPiAwKSB7XHJcbiAgICAgICAgICAgIC8vIHB1c2ggdGhlIHNlY29uZCB1cCBvciBkb3duXHJcbiAgICAgICAgICAgIGIucG9zWzFdICs9IE1hdGguc2lnbihiLnBvc1swXSkgKiBvO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBsYWJlbFBvc2l0aW9ucztcclxuICB9XHJcblxyXG4gIGxhYmVsVmlzaWJsZShteUFyYyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2hvd0xhYmVscyAmJiBteUFyYy5lbmRBbmdsZSAtIG15QXJjLnN0YXJ0QW5nbGUgPiBNYXRoLlBJIC8gMzA7XHJcbiAgfVxyXG5cclxuICBnZXRUb29sdGlwVGl0bGUoYSkge1xyXG4gICAgcmV0dXJuIHRoaXMudG9vbHRpcFRlbXBsYXRlID8gdW5kZWZpbmVkIDogdGhpcy50b29sdGlwVGV4dChhKTtcclxuICB9XHJcblxyXG4gIGxhYmVsVGV4dChteUFyYyk6IHN0cmluZyB7XHJcbiAgICBpZiAodGhpcy5sYWJlbEZvcm1hdHRpbmcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGFiZWxGb3JtYXR0aW5nKG15QXJjLmRhdGEubmFtZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5sYWJlbChteUFyYyk7XHJcbiAgfVxyXG5cclxuICBsYWJlbChteUFyYyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZm9ybWF0TGFiZWwobXlBcmMuZGF0YS5uYW1lKTtcclxuICB9XHJcblxyXG4gIGRlZmF1bHRUb29sdGlwVGV4dChteUFyYyk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBsYWJlbCA9IHRoaXMubGFiZWwobXlBcmMpO1xyXG4gICAgY29uc3QgdmFsID0gZm9ybWF0TGFiZWwobXlBcmMuZGF0YS52YWx1ZSk7XHJcblxyXG4gICAgcmV0dXJuIGBcclxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLWxhYmVsXCI+JHtlc2NhcGVMYWJlbChsYWJlbCl9PC9zcGFuPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtdmFsXCI+JHt2YWx9PC9zcGFuPlxyXG4gICAgYDtcclxuICB9XHJcblxyXG4gIGNvbG9yKG15QXJjKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLmNvbG9ycy5nZXRDb2xvcih0aGlzLmxhYmVsKG15QXJjKSk7XHJcbiAgfVxyXG5cclxuICB0cmFja0J5KGluZGV4LCBpdGVtKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBpdGVtLmRhdGEubmFtZTtcclxuICB9XHJcblxyXG4gIG9uQ2xpY2soZGF0YSk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3QuZW1pdChkYXRhKTtcclxuICB9XHJcblxyXG4gIGlzQWN0aXZlKGVudHJ5KTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIXRoaXMuYWN0aXZlRW50cmllcykgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3QgaXRlbSA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kKGQgPT4ge1xyXG4gICAgICByZXR1cm4gZW50cnkubmFtZSA9PT0gZC5uYW1lICYmIGVudHJ5LnNlcmllcyA9PT0gZC5zZXJpZXM7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpdGVtICE9PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==