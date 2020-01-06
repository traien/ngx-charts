import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { formatLabel, escapeLabel } from '../common/label.helper';
import { id } from '../utils/id';
let CircleSeriesComponent = class CircleSeriesComponent {
    constructor() {
        this.type = 'standard';
        this.tooltipDisabled = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.barVisible = false;
    }
    ngOnInit() {
        this.gradientId = 'grad' + id().toString();
        this.gradientFill = `url(#${this.gradientId})`;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.circle = this.getActiveCircle();
    }
    getActiveCircle() {
        const indexActiveDataPoint = this.data.series.findIndex(d => {
            const label = d.name;
            return label && this.visibleValue && label.toString() === this.visibleValue.toString() && d.value !== undefined;
        });
        if (indexActiveDataPoint === -1) {
            // No valid point is 'active/hovered over' at this moment.
            return undefined;
        }
        return this.mapDataPointToCircle(this.data.series[indexActiveDataPoint], indexActiveDataPoint);
    }
    mapDataPointToCircle(d, i) {
        const seriesName = this.data.name;
        const value = d.value;
        const label = d.name;
        const tooltipLabel = formatLabel(label);
        let cx;
        if (this.scaleType === 'time') {
            cx = this.xScale(label);
        }
        else if (this.scaleType === 'linear') {
            cx = this.xScale(Number(label));
        }
        else {
            cx = this.xScale(label);
        }
        const cy = this.yScale(this.type === 'standard' ? value : d.d1);
        const radius = 5;
        const height = this.yScale.range()[0] - cy;
        const opacity = 1;
        let color;
        if (this.colors.scaleType === 'linear') {
            if (this.type === 'standard') {
                color = this.colors.getColor(value);
            }
            else {
                color = this.colors.getColor(d.d1);
            }
        }
        else {
            color = this.colors.getColor(seriesName);
        }
        const data = Object.assign({}, d, {
            series: seriesName,
            value,
            name: label
        });
        return {
            classNames: [`circle-data-${i}`],
            value,
            label,
            data,
            cx,
            cy,
            radius,
            height,
            tooltipLabel,
            color,
            opacity,
            seriesName,
            gradientStops: this.getGradientStops(color),
            min: d.min,
            max: d.max
        };
    }
    getTooltipText({ tooltipLabel, value, seriesName, min, max }) {
        return `
      <span class="tooltip-label">${escapeLabel(seriesName)} • ${escapeLabel(tooltipLabel)}</span>
      <span class="tooltip-val">${value.toLocaleString()}${this.getTooltipMinMaxText(min, max)}</span>
    `;
    }
    getTooltipMinMaxText(min, max) {
        if (min !== undefined || max !== undefined) {
            let result = ' (';
            if (min !== undefined) {
                if (max === undefined) {
                    result += '≥';
                }
                result += min.toLocaleString();
                if (max !== undefined) {
                    result += ' - ';
                }
            }
            else if (max !== undefined) {
                result += '≤';
            }
            if (max !== undefined) {
                result += max.toLocaleString();
            }
            result += ')';
            return result;
        }
        else {
            return '';
        }
    }
    getGradientStops(color) {
        return [
            {
                offset: 0,
                color,
                opacity: 0.2
            },
            {
                offset: 100,
                color,
                opacity: 1
            }
        ];
    }
    onClick(data) {
        this.select.emit(data);
    }
    isActive(entry) {
        if (!this.activeEntries)
            return false;
        const item = this.activeEntries.find(d => {
            return entry.name === d.name;
        });
        return item !== undefined;
    }
    activateCircle() {
        this.barVisible = true;
        this.activate.emit({ name: this.data.name });
    }
    deactivateCircle() {
        this.barVisible = false;
        this.circle.opacity = 0;
        this.deactivate.emit({ name: this.data.name });
    }
};
__decorate([
    Input()
], CircleSeriesComponent.prototype, "data", void 0);
__decorate([
    Input()
], CircleSeriesComponent.prototype, "type", void 0);
__decorate([
    Input()
], CircleSeriesComponent.prototype, "xScale", void 0);
__decorate([
    Input()
], CircleSeriesComponent.prototype, "yScale", void 0);
__decorate([
    Input()
], CircleSeriesComponent.prototype, "colors", void 0);
__decorate([
    Input()
], CircleSeriesComponent.prototype, "scaleType", void 0);
__decorate([
    Input()
], CircleSeriesComponent.prototype, "visibleValue", void 0);
__decorate([
    Input()
], CircleSeriesComponent.prototype, "activeEntries", void 0);
__decorate([
    Input()
], CircleSeriesComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input()
], CircleSeriesComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    Output()
], CircleSeriesComponent.prototype, "select", void 0);
__decorate([
    Output()
], CircleSeriesComponent.prototype, "activate", void 0);
__decorate([
    Output()
], CircleSeriesComponent.prototype, "deactivate", void 0);
CircleSeriesComponent = __decorate([
    Component({
        selector: 'g[ngx-charts-circle-series]',
        template: `
    <svg:g *ngIf="circle">
      <defs>
        <svg:g
          ngx-charts-svg-linear-gradient
          orientation="vertical"
          [name]="gradientId"
          [stops]="circle.gradientStops"
        />
      </defs>
      <svg:rect
        *ngIf="barVisible && type === 'standard'"
        [@animationState]="'active'"
        [attr.x]="circle.cx - circle.radius"
        [attr.y]="circle.cy"
        [attr.width]="circle.radius * 2"
        [attr.height]="circle.height"
        [attr.fill]="gradientFill"
        class="tooltip-bar"
      />
      <svg:g
        ngx-charts-circle
        class="circle"
        [cx]="circle.cx"
        [cy]="circle.cy"
        [r]="circle.radius"
        [fill]="circle.color"
        [class.active]="isActive({ name: circle.seriesName })"
        [pointerEvents]="circle.value === 0 ? 'none' : 'all'"
        [data]="circle.value"
        [classNames]="circle.classNames"
        (select)="onClick(circle.data)"
        (activate)="activateCircle()"
        (deactivate)="deactivateCircle()"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="'top'"
        [tooltipType]="'tooltip'"
        [tooltipTitle]="tooltipTemplate ? undefined : getTooltipText(circle)"
        [tooltipTemplate]="tooltipTemplate"
        [tooltipContext]="circle.data"
      />
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [
            trigger('animationState', [
                transition(':enter', [
                    style({
                        opacity: 0
                    }),
                    animate(250, style({ opacity: 1 }))
                ])
            ])
        ]
    })
], CircleSeriesComponent);
export { CircleSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY2xlLXNlcmllcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vY2lyY2xlLXNlcmllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFFTixZQUFZLEVBR1osdUJBQXVCLEVBRXhCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxhQUFhLENBQUM7QUE2RGpDLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBQWxDO1FBRVcsU0FBSSxHQUFHLFVBQVUsQ0FBQztRQU9sQixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUdoQyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1QixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUkxQyxlQUFVLEdBQVksS0FBSyxDQUFDO0lBNEo5QixDQUFDO0lBeEpDLFFBQVE7UUFDTixJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sR0FBRyxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDO0lBQ2pELENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLE1BQU0sR0FBRyxJ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RUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDakQsQ0FBQztDQUNGLENBQUE7QUE3S1U7SUFBUixLQUFLLEVBQUU7bURBQU07QUFDTDtJQUFSLEtBQUssRUFBRTttREFBbUI7QUFDbEI7SUFBUixLQUFLLEVBQUU7cURBQVE7QUFDUDtJQUFSLEtBQUssRUFBRTtxREFBUTtBQUNQO0lBQVIsS0FBSyxFQUFFO3FEQUFxQjtBQUNwQjtJQUFSLEtBQUssRUFBRTt3REFBVztBQUNWO0lBQVIsS0FBSyxFQUFFOzJEQUFjO0FBQ2I7SUFBUixLQUFLLEVBQUU7NERBQXNCO0FBQ3JCO0lBQVIsS0FBSyxFQUFFOzhEQUFrQztBQUNqQztJQUFSLEtBQUssRUFBRTs4REFBbUM7QUFFakM7SUFBVCxNQUFNLEVBQUU7cURBQTZCO0FBQzVCO0lBQVQsTUFBTSxFQUFFO3VEQUErQjtBQUM5QjtJQUFULE1BQU0sRUFBRTt5REFBaUM7QUFkL0IscUJBQXFCO0lBMURqQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsNkJBQTZCO1FBQ3ZDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJDVDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1FBQy9DLFVBQVUsRUFBRTtZQUNWLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDeEIsVUFBVSxDQUFDLFFBQVEsRUFBRTtvQkFDbkIsS0FBSyxDQUFDO3dCQUNKLE9BQU8sRUFBRSxDQUFDO3FCQUNYLENBQUM7b0JBQ0YsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDcEMsQ0FBQzthQUNILENBQUM7U0FDSDtLQUNGLENBQUM7R0FDVyxxQkFBcUIsQ0E4S2pDO1NBOUtZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPbkNoYW5nZXMsXHJcbiAgT25Jbml0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIFRlbXBsYXRlUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IHRyaWdnZXIsIHN0eWxlLCBhbmltYXRlLCB0cmFuc2l0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IGZvcm1hdExhYmVsLCBlc2NhcGVMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbC5oZWxwZXInO1xyXG5pbXBvcnQgeyBpZCB9IGZyb20gJy4uL3V0aWxzL2lkJztcclxuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY29sb3IuaGVscGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLWNpcmNsZS1zZXJpZXNdJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHN2ZzpnICpuZ0lmPVwiY2lyY2xlXCI+XHJcbiAgICAgIDxkZWZzPlxyXG4gICAgICAgIDxzdmc6Z1xyXG4gICAgICAgICAgbmd4LWNoYXJ0cy1zdmctbGluZWFyLWdyYWRpZW50XHJcbiAgICAgICAgICBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCJcclxuICAgICAgICAgIFtuYW1lXT1cImdyYWRpZW50SWRcIlxyXG4gICAgICAgICAgW3N0b3BzXT1cImNpcmNsZS5ncmFkaWVudFN0b3BzXCJcclxuICAgICAgICAvPlxyXG4gICAgICA8L2RlZnM+XHJcbiAgICAgIDxzdmc6cmVjdFxyXG4gICAgICAgICpuZ0lmPVwiYmFyVmlzaWJsZSAmJiB0eXBlID09PSAnc3RhbmRhcmQnXCJcclxuICAgICAgICBbQGFuaW1hdGlvblN0YXRlXT1cIidhY3RpdmUnXCJcclxuICAgICAgICBbYXR0ci54XT1cImNpcmNsZS5jeCAtIGNpcmNsZS5yYWRpdXNcIlxyXG4gICAgICAgIFthdHRyLnldPVwiY2lyY2xlLmN5XCJcclxuICAgICAgICBbYXR0ci53aWR0aF09XCJjaXJjbGUucmFkaXVzICogMlwiXHJcbiAgICAgICAgW2F0dHIuaGVpZ2h0XT1cImNpcmNsZS5oZWlnaHRcIlxyXG4gICAgICAgIFthdHRyLmZpbGxdPVwiZ3JhZGllbnRGaWxsXCJcclxuICAgICAgICBjbGFzcz1cInRvb2x0aXAtYmFyXCJcclxuICAgICAgLz5cclxuICAgICAgPHN2ZzpnXHJcbiAgICAgICAgbmd4LWNoYXJ0cy1jaXJjbGVcclxuICAgICAgICBjbGFzcz1cImNpcmNsZVwiXHJcbiAgICAgICAgW2N4XT1cImNpcmNsZS5jeFwiXHJcbiAgICAgICAgW2N5XT1cImNpcmNsZS5jeVwiXHJcbiAgICAgICAgW3JdPVwiY2lyY2xlLnJhZGl1c1wiXHJcbiAgICAgICAgW2ZpbGxdPVwiY2lyY2xlLmNvbG9yXCJcclxuICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImlzQWN0aXZlKHsgbmFtZTogY2lyY2xlLnNlcmllc05hbWUgfSlcIlxyXG4gICAgICAgIFtwb2ludGVyRXZlbnRzXT1cImNpcmNsZS52YWx1ZSA9PT0gMCA/ICdub25lJyA6ICdhbGwnXCJcclxuICAgICAgICBbZGF0YV09XCJjaXJjbGUudmFsdWVcIlxyXG4gICAgICAgIFtjbGFzc05hbWVzXT1cImNpcmNsZS5jbGFzc05hbWVzXCJcclxuICAgICAgICAoc2VsZWN0KT1cIm9uQ2xpY2soY2lyY2xlLmRhdGEpXCJcclxuICAgICAgICAoYWN0aXZhdGUpPVwiYWN0aXZhdGVDaXJjbGUoKVwiXHJcbiAgICAgICAgKGRlYWN0aXZhdGUpPVwiZGVhY3RpdmF0ZUNpcmNsZSgpXCJcclxuICAgICAgICBuZ3gtdG9vbHRpcFxyXG4gICAgICAgIFt0b29sdGlwRGlzYWJsZWRdPVwidG9vbHRpcERpc2FibGVkXCJcclxuICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCIndG9wJ1wiXHJcbiAgICAgICAgW3Rvb2x0aXBUeXBlXT1cIid0b29sdGlwJ1wiXHJcbiAgICAgICAgW3Rvb2x0aXBUaXRsZV09XCJ0b29sdGlwVGVtcGxhdGUgPyB1bmRlZmluZWQgOiBnZXRUb29sdGlwVGV4dChjaXJjbGUpXCJcclxuICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXHJcbiAgICAgICAgW3Rvb2x0aXBDb250ZXh0XT1cImNpcmNsZS5kYXRhXCJcclxuICAgICAgLz5cclxuICAgIDwvc3ZnOmc+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBhbmltYXRpb25zOiBbXHJcbiAgICB0cmlnZ2VyKCdhbmltYXRpb25TdGF0ZScsIFtcclxuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xyXG4gICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgICB9KSxcclxuICAgICAgICBhbmltYXRlKDI1MCwgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKVxyXG4gICAgICBdKVxyXG4gICAgXSlcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDaXJjbGVTZXJpZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgZGF0YTtcclxuICBASW5wdXQoKSB0eXBlID0gJ3N0YW5kYXJkJztcclxuICBASW5wdXQoKSB4U2NhbGU7XHJcbiAgQElucHV0KCkgeVNjYWxlO1xyXG4gIEBJbnB1dCgpIGNvbG9yczogQ29sb3JIZWxwZXI7XHJcbiAgQElucHV0KCkgc2NhbGVUeXBlO1xyXG4gIEBJbnB1dCgpIHZpc2libGVWYWx1ZTtcclxuICBASW5wdXQoKSBhY3RpdmVFbnRyaWVzOiBhbnlbXTtcclxuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBhcmVhUGF0aDogYW55O1xyXG4gIGNpcmNsZTogYW55OyAvLyBhY3RpdmUgY2lyY2xlXHJcbiAgYmFyVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGdyYWRpZW50SWQ6IHN0cmluZztcclxuICBncmFkaWVudEZpbGw6IHN0cmluZztcclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmdyYWRpZW50SWQgPSAnZ3JhZCcgKyBpZCgpLnRvU3RyaW5nKCk7XHJcbiAgICB0aGlzLmdyYWRpZW50RmlsbCA9IGB1cmwoIyR7dGhpcy5ncmFkaWVudElkfSlgO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuY2lyY2xlID0gdGhpcy5nZXRBY3RpdmVDaXJjbGUoKTtcclxuICB9XHJcblxyXG4gIGdldEFjdGl2ZUNpcmNsZSgpOiB7fSB7XHJcbiAgICBjb25zdCBpbmRleEFjdGl2ZURhdGFQb2ludCA9IHRoaXMuZGF0YS5zZXJpZXMuZmluZEluZGV4KGQgPT4ge1xyXG4gICAgICBjb25zdCBsYWJlbCA9IGQubmFtZTtcclxuICAgICAgcmV0dXJuIGxhYmVsICYmIHRoaXMudmlzaWJsZVZhbHVlICYmIGxhYmVsLnRvU3RyaW5nKCkgPT09IHRoaXMudmlzaWJsZVZhbHVlLnRvU3RyaW5nKCkgJiYgZC52YWx1ZSAhPT0gdW5kZWZpbmVkO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGluZGV4QWN0aXZlRGF0YVBvaW50ID09PSAtMSkge1xyXG4gICAgICAvLyBObyB2YWxpZCBwb2ludCBpcyAnYWN0aXZlL2hvdmVyZWQgb3ZlcicgYXQgdGhpcyBtb21lbnQuXHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMubWFwRGF0YVBvaW50VG9DaXJjbGUodGhpcy5kYXRhLnNlcmllc1tpbmRleEFjdGl2ZURhdGFQb2ludF0sIGluZGV4QWN0aXZlRGF0YVBvaW50KTtcclxuICB9XHJcblxyXG4gIG1hcERhdGFQb2ludFRvQ2lyY2xlKGQ6IGFueSwgaTogbnVtYmVyKTogYW55IHtcclxuICAgIGNvbnN0IHNlcmllc05hbWUgPSB0aGlzLmRhdGEubmFtZTtcclxuXHJcbiAgICBjb25zdCB2YWx1ZSA9IGQudmFsdWU7XHJcbiAgICBjb25zdCBsYWJlbCA9IGQubmFtZTtcclxuICAgIGNvbnN0IHRvb2x0aXBMYWJlbCA9IGZvcm1hdExhYmVsKGxhYmVsKTtcclxuXHJcbiAgICBsZXQgY3g7XHJcbiAgICBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICd0aW1lJykge1xyXG4gICAgICBjeCA9IHRoaXMueFNjYWxlKGxhYmVsKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICdsaW5lYXInKSB7XHJcbiAgICAgIGN4ID0gdGhpcy54U2NhbGUoTnVtYmVyKGxhYmVsKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjeCA9IHRoaXMueFNjYWxlKGxhYmVsKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjeSA9IHRoaXMueVNjYWxlKHRoaXMudHlwZSA9PT0gJ3N0YW5kYXJkJyA/IHZhbHVlIDogZC5kMSk7XHJcbiAgICBjb25zdCByYWRpdXMgPSA1O1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy55U2NhbGUucmFuZ2UoKVswXSAtIGN5O1xyXG4gICAgY29uc3Qgb3BhY2l0eSA9IDE7XHJcblxyXG4gICAgbGV0IGNvbG9yO1xyXG4gICAgaWYgKHRoaXMuY29sb3JzLnNjYWxlVHlwZSA9PT0gJ2xpbmVhcicpIHtcclxuICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ3N0YW5kYXJkJykge1xyXG4gICAgICAgIGNvbG9yID0gdGhpcy5jb2xvcnMuZ2V0Q29sb3IodmFsdWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbG9yID0gdGhpcy5jb2xvcnMuZ2V0Q29sb3IoZC5kMSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbG9yID0gdGhpcy5jb2xvcnMuZ2V0Q29sb3Ioc2VyaWVzTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGQsIHtcclxuICAgICAgc2VyaWVzOiBzZXJpZXNOYW1lLFxyXG4gICAgICB2YWx1ZSxcclxuICAgICAgbmFtZTogbGFiZWxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNsYXNzTmFtZXM6IFtgY2lyY2xlLWRhdGEtJHtpfWBdLFxyXG4gICAgICB2YWx1ZSxcclxuICAgICAgbGFiZWwsXHJcbiAgICAgIGRhdGEsXHJcbiAgICAgIGN4LFxyXG4gICAgICBjeSxcclxuICAgICAgcmFkaXVzLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIHRvb2x0aXBMYWJlbCxcclxuICAgICAgY29sb3IsXHJcbiAgICAgIG9wYWNpdHksXHJcbiAgICAgIHNlcmllc05hbWUsXHJcbiAgICAgIGdyYWRpZW50U3RvcHM6IHRoaXMuZ2V0R3JhZGllbnRTdG9wcyhjb2xvciksXHJcbiAgICAgIG1pbjogZC5taW4sXHJcbiAgICAgIG1heDogZC5tYXhcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBnZXRUb29sdGlwVGV4dCh7IHRvb2x0aXBMYWJlbCwgdmFsdWUsIHNlcmllc05hbWUsIG1pbiwgbWF4IH0pOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLWxhYmVsXCI+JHtlc2NhcGVMYWJlbChzZXJpZXNOYW1lKX0g4oCiICR7ZXNjYXBlTGFiZWwodG9vbHRpcExhYmVsKX08L3NwYW4+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC12YWxcIj4ke3ZhbHVlLnRvTG9jYWxlU3RyaW5nKCl9JHt0aGlzLmdldFRvb2x0aXBNaW5NYXhUZXh0KG1pbiwgbWF4KX08L3NwYW4+XHJcbiAgICBgO1xyXG4gIH1cclxuXHJcbiAgZ2V0VG9vbHRpcE1pbk1heFRleHQobWluOiBhbnksIG1heDogYW55KSB7XHJcbiAgICBpZiAobWluICE9PSB1bmRlZmluZWQgfHwgbWF4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgbGV0IHJlc3VsdCA9ICcgKCc7XHJcbiAgICAgIGlmIChtaW4gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmIChtYXggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgcmVzdWx0ICs9ICfiiaUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHQgKz0gbWluLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICAgICAgaWYgKG1heCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICByZXN1bHQgKz0gJyAtICc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKG1heCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmVzdWx0ICs9ICfiiaQnO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChtYXggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJlc3VsdCArPSBtYXgudG9Mb2NhbGVTdHJpbmcoKTtcclxuICAgICAgfVxyXG4gICAgICByZXN1bHQgKz0gJyknO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0R3JhZGllbnRTdG9wcyhjb2xvcikge1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAge1xyXG4gICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICBjb2xvcixcclxuICAgICAgICBvcGFjaXR5OiAwLjJcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIG9mZnNldDogMTAwLFxyXG4gICAgICAgIGNvbG9yLFxyXG4gICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgfVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIG9uQ2xpY2soZGF0YSk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3QuZW1pdChkYXRhKTtcclxuICB9XHJcblxyXG4gIGlzQWN0aXZlKGVudHJ5KTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIXRoaXMuYWN0aXZlRW50cmllcykgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3QgaXRlbSA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kKGQgPT4ge1xyXG4gICAgICByZXR1cm4gZW50cnkubmFtZSA9PT0gZC5uYW1lO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaXRlbSAhPT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgYWN0aXZhdGVDaXJjbGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLmJhclZpc2libGUgPSB0cnVlO1xyXG4gICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHsgbmFtZTogdGhpcy5kYXRhLm5hbWUgfSk7XHJcbiAgfVxyXG5cclxuICBkZWFjdGl2YXRlQ2lyY2xlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5iYXJWaXNpYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLmNpcmNsZS5vcGFjaXR5ID0gMDtcclxuICAgIHRoaXMuZGVhY3RpdmF0ZS5lbWl0KHsgbmFtZTogdGhpcy5kYXRhLm5hbWUgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==