import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { formatLabel, escapeLabel } from '../common/label.helper';
let BubbleSeriesComponent = class BubbleSeriesComponent {
    constructor() {
        this.tooltipDisabled = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.circles = this.getCircles();
    }
    getCircles() {
        const seriesName = this.data.name;
        return this.data.series
            .map((d, i) => {
            if (typeof d.y !== 'undefined' && typeof d.x !== 'undefined') {
                const y = d.y;
                const x = d.x;
                const r = d.r;
                const radius = this.rScale(r || 1);
                const tooltipLabel = formatLabel(d.name);
                const cx = this.xScaleType === 'linear' ? this.xScale(Number(x)) : this.xScale(x);
                const cy = this.yScaleType === 'linear' ? this.yScale(Number(y)) : this.yScale(y);
                const color = this.colors.scaleType === 'linear' ? this.colors.getColor(r) : this.colors.getColor(seriesName);
                const isActive = !this.activeEntries.length ? true : this.isActive({ name: seriesName });
                const opacity = isActive ? 1 : 0.3;
                const data = Object.assign({}, d, {
                    series: seriesName,
                    name: d.name,
                    value: d.y,
                    x: d.x,
                    radius: d.r
                });
                return {
                    data,
                    x,
                    y,
                    r,
                    classNames: [`circle-data-${i}`],
                    value: y,
                    label: x,
                    cx,
                    cy,
                    radius,
                    tooltipLabel,
                    color,
                    opacity,
                    seriesName,
                    isActive,
                    transform: `translate(${cx},${cy})`
                };
            }
        })
            .filter(circle => circle !== undefined);
    }
    getTooltipText(circle) {
        const hasRadius = typeof circle.r !== 'undefined';
        const hasTooltipLabel = circle.tooltipLabel && circle.tooltipLabel.length;
        const hasSeriesName = circle.seriesName && circle.seriesName.length;
        const radiusValue = hasRadius ? formatLabel(circle.r) : '';
        const xAxisLabel = this.xAxisLabel && this.xAxisLabel !== '' ? `${this.xAxisLabel}:` : '';
        const yAxisLabel = this.yAxisLabel && this.yAxisLabel !== '' ? `${this.yAxisLabel}:` : '';
        const x = formatLabel(circle.x);
        const y = formatLabel(circle.y);
        const name = hasSeriesName && hasTooltipLabel
            ? `${circle.seriesName} • ${circle.tooltipLabel}`
            : circle.seriesName + circle.tooltipLabel;
        const tooltipTitle = hasSeriesName || hasTooltipLabel ? `<span class="tooltip-label">${escapeLabel(name)}</span>` : '';
        return `
      ${tooltipTitle}
      <span class="tooltip-label">
        <label>${escapeLabel(xAxisLabel)}</label> ${escapeLabel(x)}<br />
        <label>${escapeLabel(yAxisLabel)}</label> ${escapeLabel(y)}
      </span>
      <span class="tooltip-val">
        ${escapeLabel(radiusValue)}
      </span>
    `;
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
    isVisible(circle) {
        if (this.activeEntries.length > 0) {
            return this.isActive({ name: circle.seriesName });
        }
        return circle.opacity !== 0;
    }
    activateCircle(circle) {
        circle.barVisible = true;
        this.activate.emit({ name: this.data.name });
    }
    deactivateCircle(circle) {
        circle.barVisible = false;
        this.deactivate.emit({ name: this.data.name });
    }
    trackBy(index, circle) {
        return `${circle.data.series} ${circle.data.name}`;
    }
};
__decorate([
    Input()
], BubbleSeriesComponent.prototype, "data", void 0);
__decorate([
    Input()
], BubbleSeriesComponent.prototype, "xScale", void 0);
__decorate([
    Input()
], BubbleSeriesComponent.prototype, "yScale", void 0);
__decorate([
    Input()
], BubbleSeriesComponent.prototype, "rScale", void 0);
__decorate([
    Input()
], BubbleSeriesComponent.prototype, "xScaleType", void 0);
__decorate([
    Input()
], BubbleSeriesComponent.prototype, "yScaleType", void 0);
__decorate([
    Input()
], BubbleSeriesComponent.prototype, "colors", void 0);
__decorate([
    Input()
], BubbleSeriesComponent.prototype, "visibleValue", void 0);
__decorate([
    Input()
], BubbleSeriesComponent.prototype, "activeEntries", void 0);
__decorate([
    Input()
], BubbleSeriesComponent.prototype, "xAxisLabel", void 0);
__decorate([
    Input()
], BubbleSeriesComponent.prototype, "yAxisLabel", void 0);
__decorate([
    Input()
], BubbleSeriesComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input()
], BubbleSeriesComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    Output()
], BubbleSeriesComponent.prototype, "select", void 0);
__decorate([
    Output()
], BubbleSeriesComponent.prototype, "activate", void 0);
__decorate([
    Output()
], BubbleSeriesComponent.prototype, "deactivate", void 0);
BubbleSeriesComponent = __decorate([
    Component({
        selector: 'g[ngx-charts-bubble-series]',
        template: `
    <svg:g *ngFor="let circle of circles; trackBy: trackBy">
      <svg:g [attr.transform]="circle.transform">
        <svg:g
          ngx-charts-circle
          [@animationState]="'active'"
          class="circle"
          [cx]="0"
          [cy]="0"
          [r]="circle.radius"
          [fill]="circle.color"
          [style.opacity]="circle.opacity"
          [class.active]="circle.isActive"
          [pointerEvents]="'all'"
          [data]="circle.value"
          [classNames]="circle.classNames"
          (select)="onClick(circle.data)"
          (activate)="activateCircle(circle)"
          (deactivate)="deactivateCircle(circle)"
          ngx-tooltip
          [tooltipDisabled]="tooltipDisabled"
          [tooltipPlacement]="'top'"
          [tooltipType]="'tooltip'"
          [tooltipTitle]="tooltipTemplate ? undefined : getTooltipText(circle)"
          [tooltipTemplate]="tooltipTemplate"
          [tooltipContext]="circle.data"
        />
      </svg:g>
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [
            trigger('animationState', [
                transition(':enter', [
                    style({
                        opacity: 0,
                        transform: 'scale(0)'
                    }),
                    animate(250, style({ opacity: 1, transform: 'scale(1)' }))
                ])
            ])
        ]
    })
], BubbleSeriesComponent);
export { BubbleSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnViYmxlLXNlcmllcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9idWJibGUtY2hhcnQvYnViYmxlLXNlcmllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFFTixZQUFZLEVBRVosdUJBQXVCLEVBRXhCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBK0NsRSxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQUFsQztRQVlXLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBR2hDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBK0g1QyxDQUFDO0lBMUhDLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsVUFBVTtRQUNSLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRWxDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO2FBQ3BCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNaLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLFdBQVcsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxFQUFFO2dCQUM1RCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFZCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbkMsTUFBTSxZQUFZLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFekMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xGLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVsRixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFFOUcsTUFBTSxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLENB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U0FDSDtLQUNGLENBQUM7R0FDVyxxQkFBcUIsQ0FnSmpDO1NBaEpZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPbkNoYW5nZXMsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgdHJpZ2dlciwgc3R5bGUsIGFuaW1hdGUsIHRyYW5zaXRpb24gfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgZm9ybWF0TGFiZWwsIGVzY2FwZUxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsLmhlbHBlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1idWJibGUtc2VyaWVzXScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxzdmc6ZyAqbmdGb3I9XCJsZXQgY2lyY2xlIG9mIGNpcmNsZXM7IHRyYWNrQnk6IHRyYWNrQnlcIj5cclxuICAgICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJjaXJjbGUudHJhbnNmb3JtXCI+XHJcbiAgICAgICAgPHN2ZzpnXHJcbiAgICAgICAgICBuZ3gtY2hhcnRzLWNpcmNsZVxyXG4gICAgICAgICAgW0BhbmltYXRpb25TdGF0ZV09XCInYWN0aXZlJ1wiXHJcbiAgICAgICAgICBjbGFzcz1cImNpcmNsZVwiXHJcbiAgICAgICAgICBbY3hdPVwiMFwiXHJcbiAgICAgICAgICBbY3ldPVwiMFwiXHJcbiAgICAgICAgICBbcl09XCJjaXJjbGUucmFkaXVzXCJcclxuICAgICAgICAgIFtmaWxsXT1cImNpcmNsZS5jb2xvclwiXHJcbiAgICAgICAgICBbc3R5bGUub3BhY2l0eV09XCJjaXJjbGUub3BhY2l0eVwiXHJcbiAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImNpcmNsZS5pc0FjdGl2ZVwiXHJcbiAgICAgICAgICBbcG9pbnRlckV2ZW50c109XCInYWxsJ1wiXHJcbiAgICAgICAgICBbZGF0YV09XCJjaXJjbGUudmFsdWVcIlxyXG4gICAgICAgICAgW2NsYXNzTmFtZXNdPVwiY2lyY2xlLmNsYXNzTmFtZXNcIlxyXG4gICAgICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKGNpcmNsZS5kYXRhKVwiXHJcbiAgICAgICAgICAoYWN0aXZhdGUpPVwiYWN0aXZhdGVDaXJjbGUoY2lyY2xlKVwiXHJcbiAgICAgICAgICAoZGVhY3RpdmF0ZSk9XCJkZWFjdGl2YXRlQ2lyY2xlKGNpcmNsZSlcIlxyXG4gICAgICAgICAgbmd4LXRvb2x0aXBcclxuICAgICAgICAgIFt0b29sdGlwRGlzYWJsZWRdPVwidG9vbHRpcERpc2FibGVkXCJcclxuICAgICAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cIid0b3AnXCJcclxuICAgICAgICAgIFt0b29sdGlwVHlwZV09XCIndG9vbHRpcCdcIlxyXG4gICAgICAgICAgW3Rvb2x0aXBUaXRsZV09XCJ0b29sdGlwVGVtcGxhdGUgPyB1bmRlZmluZWQgOiBnZXRUb29sdGlwVGV4dChjaXJjbGUpXCJcclxuICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcclxuICAgICAgICAgIFt0b29sdGlwQ29udGV4dF09XCJjaXJjbGUuZGF0YVwiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9zdmc6Zz5cclxuICAgIDwvc3ZnOmc+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBhbmltYXRpb25zOiBbXHJcbiAgICB0cmlnZ2VyKCdhbmltYXRpb25TdGF0ZScsIFtcclxuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xyXG4gICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgwKSdcclxuICAgICAgICB9KSxcclxuICAgICAgICBhbmltYXRlKDI1MCwgc3R5bGUoeyBvcGFjaXR5OiAxLCB0cmFuc2Zvcm06ICdzY2FsZSgxKScgfSkpXHJcbiAgICAgIF0pXHJcbiAgICBdKVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEJ1YmJsZVNlcmllc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgZGF0YTtcclxuICBASW5wdXQoKSB4U2NhbGU7XHJcbiAgQElucHV0KCkgeVNjYWxlO1xyXG4gIEBJbnB1dCgpIHJTY2FsZTtcclxuICBASW5wdXQoKSB4U2NhbGVUeXBlO1xyXG4gIEBJbnB1dCgpIHlTY2FsZVR5cGU7XHJcbiAgQElucHV0KCkgY29sb3JzO1xyXG4gIEBJbnB1dCgpIHZpc2libGVWYWx1ZTtcclxuICBASW5wdXQoKSBhY3RpdmVFbnRyaWVzOiBhbnlbXTtcclxuICBASW5wdXQoKSB4QXhpc0xhYmVsOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgeUF4aXNMYWJlbDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGFyZWFQYXRoOiBhbnk7XHJcbiAgY2lyY2xlczogYW55W107XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNpcmNsZXMgPSB0aGlzLmdldENpcmNsZXMoKTtcclxuICB9XHJcblxyXG4gIGdldENpcmNsZXMoKTogYW55W10ge1xyXG4gICAgY29uc3Qgc2VyaWVzTmFtZSA9IHRoaXMuZGF0YS5uYW1lO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmRhdGEuc2VyaWVzXHJcbiAgICAgIC5tYXAoKGQsIGkpID0+IHtcclxuICAgICAgICBpZiAodHlwZW9mIGQueSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGQueCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgIGNvbnN0IHkgPSBkLnk7XHJcbiAgICAgICAgICBjb25zdCB4ID0gZC54O1xyXG4gICAgICAgICAgY29uc3QgciA9IGQucjtcclxuXHJcbiAgICAgICAgICBjb25zdCByYWRpdXMgPSB0aGlzLnJTY2FsZShyIHx8IDEpO1xyXG4gICAgICAgICAgY29uc3QgdG9vbHRpcExhYmVsID0gZm9ybWF0TGFiZWwoZC5uYW1lKTtcclxuXHJcbiAgICAgICAgICBjb25zdCBjeCA9IHRoaXMueFNjYWxlVHlwZSA9PT0gJ2xpbmVhcicgPyB0aGlzLnhTY2FsZShOdW1iZXIoeCkpIDogdGhpcy54U2NhbGUoeCk7XHJcbiAgICAgICAgICBjb25zdCBjeSA9IHRoaXMueVNjYWxlVHlwZSA9PT0gJ2xpbmVhcicgPyB0aGlzLnlTY2FsZShOdW1iZXIoeSkpIDogdGhpcy55U2NhbGUoeSk7XHJcblxyXG4gICAgICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmNvbG9ycy5zY2FsZVR5cGUgPT09ICdsaW5lYXInID8gdGhpcy5jb2xvcnMuZ2V0Q29sb3IocikgOiB0aGlzLmNvbG9ycy5nZXRDb2xvcihzZXJpZXNOYW1lKTtcclxuXHJcbiAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9ICF0aGlzLmFjdGl2ZUVudHJpZXMubGVuZ3RoID8gdHJ1ZSA6IHRoaXMuaXNBY3RpdmUoeyBuYW1lOiBzZXJpZXNOYW1lIH0pO1xyXG4gICAgICAgICAgY29uc3Qgb3BhY2l0eSA9IGlzQWN0aXZlID8gMSA6IDAuMztcclxuXHJcbiAgICAgICAgICBjb25zdCBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZCwge1xyXG4gICAgICAgICAgICBzZXJpZXM6IHNlcmllc05hbWUsXHJcbiAgICAgICAgICAgIG5hbWU6IGQubmFtZSxcclxuICAgICAgICAgICAgdmFsdWU6IGQueSxcclxuICAgICAgICAgICAgeDogZC54LFxyXG4gICAgICAgICAgICByYWRpdXM6IGQuclxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGF0YSxcclxuICAgICAgICAgICAgeCxcclxuICAgICAgICAgICAgeSxcclxuICAgICAgICAgICAgcixcclxuICAgICAgICAgICAgY2xhc3NOYW1lczogW2BjaXJjbGUtZGF0YS0ke2l9YF0sXHJcbiAgICAgICAgICAgIHZhbHVlOiB5LFxyXG4gICAgICAgICAgICBsYWJlbDogeCxcclxuICAgICAgICAgICAgY3gsXHJcbiAgICAgICAgICAgIGN5LFxyXG4gICAgICAgICAgICByYWRpdXMsXHJcbiAgICAgICAgICAgIHRvb2x0aXBMYWJlbCxcclxuICAgICAgICAgICAgY29sb3IsXHJcbiAgICAgICAgICAgIG9wYWNpdHksXHJcbiAgICAgICAgICAgIHNlcmllc05hbWUsXHJcbiAgICAgICAgICAgIGlzQWN0aXZlLFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoJHtjeH0sJHtjeX0pYFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5maWx0ZXIoY2lyY2xlID0+IGNpcmNsZSAhPT0gdW5kZWZpbmVkKTtcclxuICB9XHJcblxyXG4gIGdldFRvb2x0aXBUZXh0KGNpcmNsZSk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBoYXNSYWRpdXMgPSB0eXBlb2YgY2lyY2xlLnIgIT09ICd1bmRlZmluZWQnO1xyXG4gICAgY29uc3QgaGFzVG9vbHRpcExhYmVsID0gY2lyY2xlLnRvb2x0aXBMYWJlbCAmJiBjaXJjbGUudG9vbHRpcExhYmVsLmxlbmd0aDtcclxuICAgIGNvbnN0IGhhc1Nlcmllc05hbWUgPSBjaXJjbGUuc2VyaWVzTmFtZSAmJiBjaXJjbGUuc2VyaWVzTmFtZS5sZW5ndGg7XHJcblxyXG4gICAgY29uc3QgcmFkaXVzVmFsdWUgPSBoYXNSYWRpdXMgPyBmb3JtYXRMYWJlbChjaXJjbGUucikgOiAnJztcclxuICAgIGNvbnN0IHhBeGlzTGFiZWwgPSB0aGlzLnhBeGlzTGFiZWwgJiYgdGhpcy54QXhpc0xhYmVsICE9PSAnJyA/IGAke3RoaXMueEF4aXNMYWJlbH06YCA6ICcnO1xyXG4gICAgY29uc3QgeUF4aXNMYWJlbCA9IHRoaXMueUF4aXNMYWJlbCAmJiB0aGlzLnlBeGlzTGFiZWwgIT09ICcnID8gYCR7dGhpcy55QXhpc0xhYmVsfTpgIDogJyc7XHJcbiAgICBjb25zdCB4ID0gZm9ybWF0TGFiZWwoY2lyY2xlLngpO1xyXG4gICAgY29uc3QgeSA9IGZvcm1hdExhYmVsKGNpcmNsZS55KTtcclxuICAgIGNvbnN0IG5hbWUgPVxyXG4gICAgICBoYXNTZXJpZXNOYW1lICYmIGhhc1Rvb2x0aXBMYWJlbFxyXG4gICAgICAgID8gYCR7Y2lyY2xlLnNlcmllc05hbWV9IOKAoiAke2NpcmNsZS50b29sdGlwTGFiZWx9YFxyXG4gICAgICAgIDogY2lyY2xlLnNlcmllc05hbWUgKyBjaXJjbGUudG9vbHRpcExhYmVsO1xyXG4gICAgY29uc3QgdG9vbHRpcFRpdGxlID1cclxuICAgICAgaGFzU2VyaWVzTmFtZSB8fCBoYXNUb29sdGlwTGFiZWwgPyBgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLWxhYmVsXCI+JHtlc2NhcGVMYWJlbChuYW1lKX08L3NwYW4+YCA6ICcnO1xyXG5cclxuICAgIHJldHVybiBgXHJcbiAgICAgICR7dG9vbHRpcFRpdGxlfVxyXG4gICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtbGFiZWxcIj5cclxuICAgICAgICA8bGFiZWw+JHtlc2NhcGVMYWJlbCh4QXhpc0xhYmVsKX08L2xhYmVsPiAke2VzY2FwZUxhYmVsKHgpfTxiciAvPlxyXG4gICAgICAgIDxsYWJlbD4ke2VzY2FwZUxhYmVsKHlBeGlzTGFiZWwpfTwvbGFiZWw+ICR7ZXNjYXBlTGFiZWwoeSl9XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLXZhbFwiPlxyXG4gICAgICAgICR7ZXNjYXBlTGFiZWwocmFkaXVzVmFsdWUpfVxyXG4gICAgICA8L3NwYW4+XHJcbiAgICBgO1xyXG4gIH1cclxuXHJcbiAgb25DbGljayhkYXRhKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdC5lbWl0KGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgaXNBY3RpdmUoZW50cnkpOiBib29sZWFuIHtcclxuICAgIGlmICghdGhpcy5hY3RpdmVFbnRyaWVzKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBpdGVtID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbmQoZCA9PiB7XHJcbiAgICAgIHJldHVybiBlbnRyeS5uYW1lID09PSBkLm5hbWU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpdGVtICE9PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBpc1Zpc2libGUoY2lyY2xlKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5hY3RpdmVFbnRyaWVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaXNBY3RpdmUoeyBuYW1lOiBjaXJjbGUuc2VyaWVzTmFtZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY2lyY2xlLm9wYWNpdHkgIT09IDA7XHJcbiAgfVxyXG5cclxuICBhY3RpdmF0ZUNpcmNsZShjaXJjbGUpOiB2b2lkIHtcclxuICAgIGNpcmNsZS5iYXJWaXNpYmxlID0gdHJ1ZTtcclxuICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7IG5hbWU6IHRoaXMuZGF0YS5uYW1lIH0pO1xyXG4gIH1cclxuXHJcbiAgZGVhY3RpdmF0ZUNpcmNsZShjaXJjbGUpOiB2b2lkIHtcclxuICAgIGNpcmNsZS5iYXJWaXNpYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLmRlYWN0aXZhdGUuZW1pdCh7IG5hbWU6IHRoaXMuZGF0YS5uYW1lIH0pO1xyXG4gIH1cclxuXHJcbiAgdHJhY2tCeShpbmRleCwgY2lyY2xlKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBgJHtjaXJjbGUuZGF0YS5zZXJpZXN9ICR7Y2lyY2xlLmRhdGEubmFtZX1gO1xyXG4gIH1cclxufVxyXG4iXX0=