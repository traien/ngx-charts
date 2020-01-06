import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { formatLabel, escapeLabel } from '../common/label.helper';
var HeatCellSeriesComponent = /** @class */ (function () {
    function HeatCellSeriesComponent() {
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
    }
    HeatCellSeriesComponent.prototype.ngOnInit = function () {
        if (!this.tooltipText) {
            this.tooltipText = this.getTooltipText;
        }
    };
    HeatCellSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    HeatCellSeriesComponent.prototype.update = function () {
        this.cells = this.getCells();
    };
    HeatCellSeriesComponent.prototype.getCells = function () {
        var _this = this;
        var cells = [];
        this.data.map(function (row) {
            row.series.map(function (cell) {
                var value = cell.value;
                cell.series = row.name;
                cells.push({
                    row: row,
                    cell: cell,
                    x: _this.xScale(row.name),
                    y: _this.yScale(cell.name),
                    width: _this.xScale.bandwidth(),
                    height: _this.yScale.bandwidth(),
                    fill: _this.colors.getColor(value),
                    data: value,
                    label: formatLabel(cell.name),
                    series: row.name
                });
            });
        });
        return cells;
    };
    HeatCellSeriesComponent.prototype.getTooltipText = function (_a) {
        var label = _a.label, data = _a.data, series = _a.series;
        return "\n      <span class=\"tooltip-label\">" + escapeLabel(series) + " \u2022 " + escapeLabel(label) + "</span>\n      <span class=\"tooltip-val\">" + data.toLocaleString() + "</span>\n    ";
    };
    HeatCellSeriesComponent.prototype.trackBy = function (index, item) {
        return item.tooltipText;
    };
    HeatCellSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(data);
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
            template: "\n    <svg:g\n      ngx-charts-heat-map-cell\n      *ngFor=\"let c of cells; trackBy: trackBy\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [fill]=\"c.fill\"\n      [data]=\"c.data\"\n      (select)=\"onClick(c.cell)\"\n      (activate)=\"activate.emit(c.cell)\"\n      (deactivate)=\"deactivate.emit(c.cell)\"\n      [gradient]=\"gradient\"\n      [animations]=\"animations\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"'top'\"\n      [tooltipType]=\"'tooltip'\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : tooltipText(c)\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"{ series: c.series, name: c.label, value: c.data }\"\n    ></svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], HeatCellSeriesComponent);
    return HeatCellSeriesComponent;
}());
export { HeatCellSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhdC1tYXAtY2VsbC1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvaGVhdC1tYXAvaGVhdC1tYXAtY2VsbC1zZXJpZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxNQUFNLEVBQ04sWUFBWSxFQUdaLHVCQUF1QixFQUV4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBOEJsRTtJQUFBO1FBTVcsb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFHakMsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUxQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1QixhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDakQsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBMEQvRCxDQUFDO0lBdERDLDBDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7U0FDeEM7SUFDSCxDQUFDO0lBRUQsNkNBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsd0NBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCwwQ0FBUSxHQUFSO1FBQUEsaUJBd0JDO1FBdkJDLElBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUc7WUFDZixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUk7Z0JBQ2pCLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFFdkIsS0FBSyxDQUFDLElBQUksQ0FBQztvQkFDVCxHQUFHLEtBQUE7b0JBQ0gsSUFBSSxNQUFBO29CQUNKLENBQUMsRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQ3hCLENBQUMsRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ3pCLEtBQUssRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRTtvQkFDOUIsTUFBTSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO29CQUMvQixJQUFJLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO29CQUNqQyxJQUFJLEVBQUUsS0FBSztvQkFDWCxLQUFLLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQzdCLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSTtpQkFDakIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELGdEQUFjLEdBQWQsVUFBZSxFQUF1QjtZQUFyQixnQkFBSyxFQUFFLGNBQUksRUFBRSxrQkFBTTtRQUNsQyxPQUFPLDJDQUN5QixXQUFXLENBQUMsTUFBTSxDQUFDLGdCQUFNLFdBQVcsQ0FBQyxLQUFLLENBQUMsbURBQzdDLElBQUksQ0FBQyxjQUFjLEVBQUUsa0JBQ2xELENBQUM7SUFDSixDQUFDO0lBRUQseUNBQU8sR0FBUCxVQUFRLEtBQUssRUFBRSxJQUFJO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBRUQseUNBQU8sR0FBUCxVQUFRLElBQUk7UUFDVixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBckVRO1FBQVIsS0FBSyxFQUFFO3lEQUFNO0lBQ0w7UUFBUixLQUFLLEVBQUU7MkRBQVE7SUFDUDtRQUFSLEtBQUssRUFBRTsyREFBUTtJQUNQO1FBQVIsS0FBSyxFQUFFOzJEQUFRO0lBQ1A7UUFBUixLQUFLLEVBQUU7NkRBQW1CO0lBQ2xCO1FBQVIsS0FBSyxFQUFFO29FQUFrQztJQUNqQztRQUFSLEtBQUssRUFBRTtnRUFBa0I7SUFDakI7UUFBUixLQUFLLEVBQUU7b0VBQW1DO0lBQ2xDO1FBQVIsS0FBSyxFQUFFOytEQUE0QjtJQUUxQjtRQUFULE1BQU0sRUFBRTsyREFBNkI7SUFDNUI7UUFBVCxNQUFNLEVBQUU7NkRBQWtEO0lBQ2pEO1FBQVQsTUFBTSxFQUFFOytEQUFvRDtJQWJsRCx1QkFBdUI7UUE1Qm5DLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxvQ0FBb0M7WUFDOUMsUUFBUSxFQUFFLGd4QkF1QlQ7WUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO09BQ1csdUJBQXVCLENBdUVuQztJQUFELDhCQUFDO0NBQUEsQUF2RUQsSUF1RUM7U0F2RVksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkluaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZm9ybWF0TGFiZWwsIGVzY2FwZUxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsLmhlbHBlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1oZWF0LW1hcC1jZWxsLXNlcmllc10nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8c3ZnOmdcclxuICAgICAgbmd4LWNoYXJ0cy1oZWF0LW1hcC1jZWxsXHJcbiAgICAgICpuZ0Zvcj1cImxldCBjIG9mIGNlbGxzOyB0cmFja0J5OiB0cmFja0J5XCJcclxuICAgICAgW3hdPVwiYy54XCJcclxuICAgICAgW3ldPVwiYy55XCJcclxuICAgICAgW3dpZHRoXT1cImMud2lkdGhcIlxyXG4gICAgICBbaGVpZ2h0XT1cImMuaGVpZ2h0XCJcclxuICAgICAgW2ZpbGxdPVwiYy5maWxsXCJcclxuICAgICAgW2RhdGFdPVwiYy5kYXRhXCJcclxuICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKGMuY2VsbClcIlxyXG4gICAgICAoYWN0aXZhdGUpPVwiYWN0aXZhdGUuZW1pdChjLmNlbGwpXCJcclxuICAgICAgKGRlYWN0aXZhdGUpPVwiZGVhY3RpdmF0ZS5lbWl0KGMuY2VsbClcIlxyXG4gICAgICBbZ3JhZGllbnRdPVwiZ3JhZGllbnRcIlxyXG4gICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcclxuICAgICAgbmd4LXRvb2x0aXBcclxuICAgICAgW3Rvb2x0aXBEaXNhYmxlZF09XCJ0b29sdGlwRGlzYWJsZWRcIlxyXG4gICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCIndG9wJ1wiXHJcbiAgICAgIFt0b29sdGlwVHlwZV09XCIndG9vbHRpcCdcIlxyXG4gICAgICBbdG9vbHRpcFRpdGxlXT1cInRvb2x0aXBUZW1wbGF0ZSA/IHVuZGVmaW5lZCA6IHRvb2x0aXBUZXh0KGMpXCJcclxuICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxyXG4gICAgICBbdG9vbHRpcENvbnRleHRdPVwieyBzZXJpZXM6IGMuc2VyaWVzLCBuYW1lOiBjLmxhYmVsLCB2YWx1ZTogYy5kYXRhIH1cIlxyXG4gICAgPjwvc3ZnOmc+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgSGVhdENlbGxTZXJpZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgZGF0YTtcclxuICBASW5wdXQoKSBjb2xvcnM7XHJcbiAgQElucHV0KCkgeFNjYWxlO1xyXG4gIEBJbnB1dCgpIHlTY2FsZTtcclxuICBASW5wdXQoKSBncmFkaWVudDogYm9vbGVhbjtcclxuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSB0b29sdGlwVGV4dDogYW55O1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICBASW5wdXQoKSBhbmltYXRpb25zOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY2VsbHM6IGFueVtdO1xyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICghdGhpcy50b29sdGlwVGV4dCkge1xyXG4gICAgICB0aGlzLnRvb2x0aXBUZXh0ID0gdGhpcy5nZXRUb29sdGlwVGV4dDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNlbGxzID0gdGhpcy5nZXRDZWxscygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2VsbHMoKSB7XHJcbiAgICBjb25zdCBjZWxscyA9IFtdO1xyXG5cclxuICAgIHRoaXMuZGF0YS5tYXAocm93ID0+IHtcclxuICAgICAgcm93LnNlcmllcy5tYXAoY2VsbCA9PiB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBjZWxsLnZhbHVlO1xyXG4gICAgICAgIGNlbGwuc2VyaWVzID0gcm93Lm5hbWU7XHJcblxyXG4gICAgICAgIGNlbGxzLnB1c2goe1xyXG4gICAgICAgICAgcm93LFxyXG4gICAgICAgICAgY2VsbCxcclxuICAgICAgICAgIHg6IHRoaXMueFNjYWxlKHJvdy5uYW1lKSxcclxuICAgICAgICAgIHk6IHRoaXMueVNjYWxlKGNlbGwubmFtZSksXHJcbiAgICAgICAgICB3aWR0aDogdGhpcy54U2NhbGUuYmFuZHdpZHRoKCksXHJcbiAgICAgICAgICBoZWlnaHQ6IHRoaXMueVNjYWxlLmJhbmR3aWR0aCgpLFxyXG4gICAgICAgICAgZmlsbDogdGhpcy5jb2xvcnMuZ2V0Q29sb3IodmFsdWUpLFxyXG4gICAgICAgICAgZGF0YTogdmFsdWUsXHJcbiAgICAgICAgICBsYWJlbDogZm9ybWF0TGFiZWwoY2VsbC5uYW1lKSxcclxuICAgICAgICAgIHNlcmllczogcm93Lm5hbWVcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gY2VsbHM7XHJcbiAgfVxyXG5cclxuICBnZXRUb29sdGlwVGV4dCh7IGxhYmVsLCBkYXRhLCBzZXJpZXMgfSk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtbGFiZWxcIj4ke2VzY2FwZUxhYmVsKHNlcmllcyl9IOKAoiAke2VzY2FwZUxhYmVsKGxhYmVsKX08L3NwYW4+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC12YWxcIj4ke2RhdGEudG9Mb2NhbGVTdHJpbmcoKX08L3NwYW4+XHJcbiAgICBgO1xyXG4gIH1cclxuXHJcbiAgdHJhY2tCeShpbmRleCwgaXRlbSk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gaXRlbS50b29sdGlwVGV4dDtcclxuICB9XHJcblxyXG4gIG9uQ2xpY2soZGF0YSk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3QuZW1pdChkYXRhKTtcclxuICB9XHJcbn1cclxuIl19