import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { formatLabel, escapeLabel } from '../common/label.helper';
let HeatCellSeriesComponent = class HeatCellSeriesComponent {
    constructor() {
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
    }
    ngOnInit() {
        if (!this.tooltipText) {
            this.tooltipText = this.getTooltipText;
        }
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.cells = this.getCells();
    }
    getCells() {
        const cells = [];
        this.data.map(row => {
            row.series.map(cell => {
                const value = cell.value;
                cell.series = row.name;
                cells.push({
                    row,
                    cell,
                    x: this.xScale(row.name),
                    y: this.yScale(cell.name),
                    width: this.xScale.bandwidth(),
                    height: this.yScale.bandwidth(),
                    fill: this.colors.getColor(value),
                    data: value,
                    label: formatLabel(cell.name),
                    series: row.name
                });
            });
        });
        return cells;
    }
    getTooltipText({ label, data, series }) {
        return `
      <span class="tooltip-label">${escapeLabel(series)} • ${escapeLabel(label)}</span>
      <span class="tooltip-val">${data.toLocaleString()}</span>
    `;
    }
    trackBy(index, item) {
        return item.tooltipText;
    }
    onClick(data) {
        this.select.emit(data);
    }
};
__decorate([
    Input()
], HeatCellSeriesComponent.prototype, "data", void 0);
__decorate([
    Input()
], HeatCellSeriesComponent.prototype, "colors", void 0);
__decorate([
    Input()
], HeatCellSeriesComponent.prototype, "xScale", void 0);
__decorate([
    Input()
], HeatCellSeriesComponent.prototype, "yScale", void 0);
__decorate([
    Input()
], HeatCellSeriesComponent.prototype, "gradient", void 0);
__decorate([
    Input()
], HeatCellSeriesComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input()
], HeatCellSeriesComponent.prototype, "tooltipText", void 0);
__decorate([
    Input()
], HeatCellSeriesComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    Input()
], HeatCellSeriesComponent.prototype, "animations", void 0);
__decorate([
    Output()
], HeatCellSeriesComponent.prototype, "select", void 0);
__decorate([
    Output()
], HeatCellSeriesComponent.prototype, "activate", void 0);
__decorate([
    Output()
], HeatCellSeriesComponent.prototype, "deactivate", void 0);
HeatCellSeriesComponent = __decorate([
    Component({
        selector: 'g[ngx-charts-heat-map-cell-series]',
        template: `
    <svg:g
      ngx-charts-heat-map-cell
      *ngFor="let c of cells; trackBy: trackBy"
      [x]="c.x"
      [y]="c.y"
      [width]="c.width"
      [height]="c.height"
      [fill]="c.fill"
      [data]="c.data"
      (select)="onClick(c.cell)"
      (activate)="activate.emit(c.cell)"
      (deactivate)="deactivate.emit(c.cell)"
      [gradient]="gradient"
      [animations]="animations"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="'top'"
      [tooltipType]="'tooltip'"
      [tooltipTitle]="tooltipTemplate ? undefined : tooltipText(c)"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipContext]="{ series: c.series, name: c.label, value: c.data }"
    ></svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], HeatCellSeriesComponent);
export { HeatCellSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhdC1tYXAtY2VsbC1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvaGVhdC1tYXAvaGVhdC1tYXAtY2VsbC1zZXJpZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxNQUFNLEVBQ04sWUFBWSxFQUdaLHVCQUF1QixFQUV4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBOEJsRSxJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF1QjtJQUFwQztRQU1XLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBR2pDLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFMUIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUIsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pELGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQTBEL0QsQ0FBQztJQXREQyxRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1NBQ3hDO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsUUFBUTtRQUNOLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNsQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDcEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUV2QixLQUFLLENBQUMsSUFBSSxDQUFDO29CQUNULEdBQUc7b0JBQ0gsSUFBSTtvQkFDSixDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO29CQUN4QixDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUN6QixLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7b0JBQzlCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRTtvQkFDL0IsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztvQkFDakMsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsS0FBSyxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUM3QixNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUk7aUJBQ2pCLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxjQUFjLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtRQUNwQyxPQUFPO29DQUN5QixXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sV0FBVyxDQUFDLEtBQUssQ0FBQztrQ0FDN0MsSUFBSSxDQUFDLGNBQWMsRUFBRTtLQUNsRCxDQUFDO0lBQ0osQ0FBQztJQUVELE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSTtRQUNqQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFJO1FBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztDQUNGLENBQUE7QUF0RVU7SUFBUixLQUFLLEVBQUU7cURBQU07QUFDTDtJQUFSLEtBQUssRUFBRTt1REFBUTtBQUNQO0lBQVIsS0FBSyxFQUFFO3VEQUFRO0FBQ1A7SUFBUixLQUFLLEVBQUU7dURBQVE7QUFDUDtJQUFSLEtBQUssRUFBRTt5REFBbUI7QUFDbEI7SUFBUixLQUFLLEVBQUU7Z0VBQWtDO0FBQ2pDO0lBQVIsS0FBSyxFQUFFOzREQUFrQjtBQUNqQjtJQUFSLEtBQUssRUFBRTtnRUFBbUM7QUFDbEM7SUFBUixLQUFLLEVBQUU7MkRBQTRCO0FBRTFCO0lBQVQsTUFBTSxFQUFFO3VEQUE2QjtBQUM1QjtJQUFULE1BQU0sRUFBRTt5REFBa0Q7QUFDakQ7SUFBVCxNQUFNLEVBQUU7MkRBQW9EO0FBYmxELHVCQUF1QjtJQTVCbkMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG9DQUFvQztRQUM5QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJUO1FBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07S0FDaEQsQ0FBQztHQUNXLHVCQUF1QixDQXVFbkM7U0F2RVksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkluaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZm9ybWF0TGFiZWwsIGVzY2FwZUxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsLmhlbHBlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1oZWF0LW1hcC1jZWxsLXNlcmllc10nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8c3ZnOmdcclxuICAgICAgbmd4LWNoYXJ0cy1oZWF0LW1hcC1jZWxsXHJcbiAgICAgICpuZ0Zvcj1cImxldCBjIG9mIGNlbGxzOyB0cmFja0J5OiB0cmFja0J5XCJcclxuICAgICAgW3hdPVwiYy54XCJcclxuICAgICAgW3ldPVwiYy55XCJcclxuICAgICAgW3dpZHRoXT1cImMud2lkdGhcIlxyXG4gICAgICBbaGVpZ2h0XT1cImMuaGVpZ2h0XCJcclxuICAgICAgW2ZpbGxdPVwiYy5maWxsXCJcclxuICAgICAgW2RhdGFdPVwiYy5kYXRhXCJcclxuICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKGMuY2VsbClcIlxyXG4gICAgICAoYWN0aXZhdGUpPVwiYWN0aXZhdGUuZW1pdChjLmNlbGwpXCJcclxuICAgICAgKGRlYWN0aXZhdGUpPVwiZGVhY3RpdmF0ZS5lbWl0KGMuY2VsbClcIlxyXG4gICAgICBbZ3JhZGllbnRdPVwiZ3JhZGllbnRcIlxyXG4gICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcclxuICAgICAgbmd4LXRvb2x0aXBcclxuICAgICAgW3Rvb2x0aXBEaXNhYmxlZF09XCJ0b29sdGlwRGlzYWJsZWRcIlxyXG4gICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCIndG9wJ1wiXHJcbiAgICAgIFt0b29sdGlwVHlwZV09XCIndG9vbHRpcCdcIlxyXG4gICAgICBbdG9vbHRpcFRpdGxlXT1cInRvb2x0aXBUZW1wbGF0ZSA/IHVuZGVmaW5lZCA6IHRvb2x0aXBUZXh0KGMpXCJcclxuICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxyXG4gICAgICBbdG9vbHRpcENvbnRleHRdPVwieyBzZXJpZXM6IGMuc2VyaWVzLCBuYW1lOiBjLmxhYmVsLCB2YWx1ZTogYy5kYXRhIH1cIlxyXG4gICAgPjwvc3ZnOmc+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgSGVhdENlbGxTZXJpZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgZGF0YTtcclxuICBASW5wdXQoKSBjb2xvcnM7XHJcbiAgQElucHV0KCkgeFNjYWxlO1xyXG4gIEBJbnB1dCgpIHlTY2FsZTtcclxuICBASW5wdXQoKSBncmFkaWVudDogYm9vbGVhbjtcclxuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSB0b29sdGlwVGV4dDogYW55O1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICBASW5wdXQoKSBhbmltYXRpb25zOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY2VsbHM6IGFueVtdO1xyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICghdGhpcy50b29sdGlwVGV4dCkge1xyXG4gICAgICB0aGlzLnRvb2x0aXBUZXh0ID0gdGhpcy5nZXRUb29sdGlwVGV4dDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNlbGxzID0gdGhpcy5nZXRDZWxscygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2VsbHMoKSB7XHJcbiAgICBjb25zdCBjZWxscyA9IFtdO1xyXG5cclxuICAgIHRoaXMuZGF0YS5tYXAocm93ID0+IHtcclxuICAgICAgcm93LnNlcmllcy5tYXAoY2VsbCA9PiB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBjZWxsLnZhbHVlO1xyXG4gICAgICAgIGNlbGwuc2VyaWVzID0gcm93Lm5hbWU7XHJcblxyXG4gICAgICAgIGNlbGxzLnB1c2goe1xyXG4gICAgICAgICAgcm93LFxyXG4gICAgICAgICAgY2VsbCxcclxuICAgICAgICAgIHg6IHRoaXMueFNjYWxlKHJvdy5uYW1lKSxcclxuICAgICAgICAgIHk6IHRoaXMueVNjYWxlKGNlbGwubmFtZSksXHJcbiAgICAgICAgICB3aWR0aDogdGhpcy54U2NhbGUuYmFuZHdpZHRoKCksXHJcbiAgICAgICAgICBoZWlnaHQ6IHRoaXMueVNjYWxlLmJhbmR3aWR0aCgpLFxyXG4gICAgICAgICAgZmlsbDogdGhpcy5jb2xvcnMuZ2V0Q29sb3IodmFsdWUpLFxyXG4gICAgICAgICAgZGF0YTogdmFsdWUsXHJcbiAgICAgICAgICBsYWJlbDogZm9ybWF0TGFiZWwoY2VsbC5uYW1lKSxcclxuICAgICAgICAgIHNlcmllczogcm93Lm5hbWVcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gY2VsbHM7XHJcbiAgfVxyXG5cclxuICBnZXRUb29sdGlwVGV4dCh7IGxhYmVsLCBkYXRhLCBzZXJpZXMgfSk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtbGFiZWxcIj4ke2VzY2FwZUxhYmVsKHNlcmllcyl9IOKAoiAke2VzY2FwZUxhYmVsKGxhYmVsKX08L3NwYW4+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC12YWxcIj4ke2RhdGEudG9Mb2NhbGVTdHJpbmcoKX08L3NwYW4+XHJcbiAgICBgO1xyXG4gIH1cclxuXHJcbiAgdHJhY2tCeShpbmRleCwgaXRlbSk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gaXRlbS50b29sdGlwVGV4dDtcclxuICB9XHJcblxyXG4gIG9uQ2xpY2soZGF0YSk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3QuZW1pdChkYXRhKTtcclxuICB9XHJcbn1cclxuIl19