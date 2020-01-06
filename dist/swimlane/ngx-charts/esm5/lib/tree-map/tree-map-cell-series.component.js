import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { escapeLabel } from '../common/label.helper';
var TreeMapCellSeriesComponent = /** @class */ (function () {
    function TreeMapCellSeriesComponent() {
        this.gradient = false;
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
    }
    TreeMapCellSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.cells = this.getCells();
    };
    TreeMapCellSeriesComponent.prototype.getCells = function () {
        var _this = this;
        return this.data.children
            .filter(function (d) {
            return d.depth === 1;
        })
            .map(function (d, index) {
            var label = d.id;
            return {
                data: d.data,
                x: d.x0,
                y: d.y0,
                width: d.x1 - d.x0,
                height: d.y1 - d.y0,
                fill: _this.colors.getColor(label),
                label: label,
                value: d.value,
                valueType: d.valueType
            };
        });
    };
    TreeMapCellSeriesComponent.prototype.getTooltipText = function (_a) {
        var label = _a.label, value = _a.value;
        return "\n      <span class=\"tooltip-label\">" + escapeLabel(label) + "</span>\n      <span class=\"tooltip-val\">" + value.toLocaleString() + "</span>\n    ";
    };
    TreeMapCellSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    TreeMapCellSeriesComponent.prototype.trackBy = function (index, item) {
        return item.label;
    };
    __decorate([
        Input()
    ], TreeMapCellSeriesComponent.prototype, "data", void 0);
    __decorate([
        Input()
    ], TreeMapCellSeriesComponent.prototype, "dims", void 0);
    __decorate([
        Input()
    ], TreeMapCellSeriesComponent.prototype, "colors", void 0);
    __decorate([
        Input()
    ], TreeMapCellSeriesComponent.prototype, "valueFormatting", void 0);
    __decorate([
        Input()
    ], TreeMapCellSeriesComponent.prototype, "labelFormatting", void 0);
    __decorate([
        Input()
    ], TreeMapCellSeriesComponent.prototype, "gradient", void 0);
    __decorate([
        Input()
    ], TreeMapCellSeriesComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input()
    ], TreeMapCellSeriesComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        Input()
    ], TreeMapCellSeriesComponent.prototype, "animations", void 0);
    __decorate([
        Output()
    ], TreeMapCellSeriesComponent.prototype, "select", void 0);
    TreeMapCellSeriesComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-tree-map-cell-series]',
            template: "\n    <svg:g\n      ngx-charts-tree-map-cell\n      *ngFor=\"let c of cells; trackBy: trackBy\"\n      [data]=\"c.data\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [fill]=\"c.fill\"\n      [label]=\"c.label\"\n      [value]=\"c.value\"\n      [valueType]=\"c.valueType\"\n      [valueFormatting]=\"valueFormatting\"\n      [labelFormatting]=\"labelFormatting\"\n      [gradient]=\"gradient\"\n      [animations]=\"animations\"\n      (select)=\"onClick($event)\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"'top'\"\n      [tooltipType]=\"'tooltip'\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : getTooltipText(c)\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"c.data\"\n    ></svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], TreeMapCellSeriesComponent);
    return TreeMapCellSeriesComponent;
}());
export { TreeMapCellSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1tYXAtY2VsbC1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvdHJlZS1tYXAvdHJlZS1tYXAtY2VsbC1zZXJpZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssRUFDTCxNQUFNLEVBRU4sWUFBWSxFQUNaLHVCQUF1QixFQUV4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFpQ3JEO0lBQUE7UUFNVyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBRWpDLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFMUIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUE0Q3hDLENBQUM7SUF4Q0MsZ0RBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCw2Q0FBUSxHQUFSO1FBQUEsaUJBb0JDO1FBbkJDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO2FBQ3RCLE1BQU0sQ0FBQyxVQUFBLENBQUM7WUFDUCxPQUFPLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQzthQUNELEdBQUcsQ0FBQyxVQUFDLENBQUMsRUFBRSxLQUFLO1lBQ1osSUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUVuQixPQUFPO2dCQUNMLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtnQkFDWixDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1AsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO2dCQUNQLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUNsQixNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDbkIsSUFBSSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztnQkFDakMsS0FBSyxPQUFBO2dCQUNMLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSztnQkFDZCxTQUFTLEVBQUUsQ0FBQyxDQUFDLFNBQVM7YUFDdkIsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG1EQUFjLEdBQWQsVUFBZSxFQUFnQjtZQUFkLGdCQUFLLEVBQUUsZ0JBQUs7UUFDM0IsT0FBTywyQ0FDeUIsV0FBVyxDQUFDLEtBQUssQ0FBQyxtREFDcEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxrQkFDbkQsQ0FBQztJQUNKLENBQUM7SUFFRCw0Q0FBTyxHQUFQLFVBQVEsSUFBSTtRQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCw0Q0FBTyxHQUFQLFVBQVEsS0FBSyxFQUFFLElBQUk7UUFDakIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFyRFE7UUFBUixLQUFLLEVBQUU7NERBQU07SUFDTDtRQUFSLEtBQUssRUFBRTs0REFBTTtJQUNMO1FBQVIsS0FBSyxFQUFFOzhEQUFRO0lBQ1A7UUFBUixLQUFLLEVBQUU7dUVBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFO3VFQUFzQjtJQUNyQjtRQUFSLEtBQUssRUFBRTtnRUFBMkI7SUFDMUI7UUFBUixLQUFLLEVBQUU7dUVBQWtDO0lBQ2pDO1FBQVIsS0FBSyxFQUFFO3VFQUFtQztJQUNsQztRQUFSLEtBQUssRUFBRTtrRUFBNEI7SUFFMUI7UUFBVCxNQUFNLEVBQUU7OERBQTZCO0lBWDNCLDBCQUEwQjtRQS9CdEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG9DQUFvQztZQUM5QyxRQUFRLEVBQUUsOHpCQTBCVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FDVywwQkFBMEIsQ0F1RHRDO0lBQUQsaUNBQUM7Q0FBQSxBQXZERCxJQXVEQztTQXZEWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkNoYW5nZXMsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIFRlbXBsYXRlUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGVzY2FwZUxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsLmhlbHBlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy10cmVlLW1hcC1jZWxsLXNlcmllc10nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8c3ZnOmdcclxuICAgICAgbmd4LWNoYXJ0cy10cmVlLW1hcC1jZWxsXHJcbiAgICAgICpuZ0Zvcj1cImxldCBjIG9mIGNlbGxzOyB0cmFja0J5OiB0cmFja0J5XCJcclxuICAgICAgW2RhdGFdPVwiYy5kYXRhXCJcclxuICAgICAgW3hdPVwiYy54XCJcclxuICAgICAgW3ldPVwiYy55XCJcclxuICAgICAgW3dpZHRoXT1cImMud2lkdGhcIlxyXG4gICAgICBbaGVpZ2h0XT1cImMuaGVpZ2h0XCJcclxuICAgICAgW2ZpbGxdPVwiYy5maWxsXCJcclxuICAgICAgW2xhYmVsXT1cImMubGFiZWxcIlxyXG4gICAgICBbdmFsdWVdPVwiYy52YWx1ZVwiXHJcbiAgICAgIFt2YWx1ZVR5cGVdPVwiYy52YWx1ZVR5cGVcIlxyXG4gICAgICBbdmFsdWVGb3JtYXR0aW5nXT1cInZhbHVlRm9ybWF0dGluZ1wiXHJcbiAgICAgIFtsYWJlbEZvcm1hdHRpbmddPVwibGFiZWxGb3JtYXR0aW5nXCJcclxuICAgICAgW2dyYWRpZW50XT1cImdyYWRpZW50XCJcclxuICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgIChzZWxlY3QpPVwib25DbGljaygkZXZlbnQpXCJcclxuICAgICAgbmd4LXRvb2x0aXBcclxuICAgICAgW3Rvb2x0aXBEaXNhYmxlZF09XCJ0b29sdGlwRGlzYWJsZWRcIlxyXG4gICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCIndG9wJ1wiXHJcbiAgICAgIFt0b29sdGlwVHlwZV09XCIndG9vbHRpcCdcIlxyXG4gICAgICBbdG9vbHRpcFRpdGxlXT1cInRvb2x0aXBUZW1wbGF0ZSA/IHVuZGVmaW5lZCA6IGdldFRvb2x0aXBUZXh0KGMpXCJcclxuICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxyXG4gICAgICBbdG9vbHRpcENvbnRleHRdPVwiYy5kYXRhXCJcclxuICAgID48L3N2ZzpnPlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFRyZWVNYXBDZWxsU2VyaWVzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBkYXRhO1xyXG4gIEBJbnB1dCgpIGRpbXM7XHJcbiAgQElucHV0KCkgY29sb3JzO1xyXG4gIEBJbnB1dCgpIHZhbHVlRm9ybWF0dGluZzogYW55O1xyXG4gIEBJbnB1dCgpIGxhYmVsRm9ybWF0dGluZzogYW55O1xyXG4gIEBJbnB1dCgpIGdyYWRpZW50OiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgdG9vbHRpcERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIEBJbnB1dCgpIGFuaW1hdGlvbnM6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjZWxsczogYW55W107XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIHRoaXMuY2VsbHMgPSB0aGlzLmdldENlbGxzKCk7XHJcbiAgfVxyXG5cclxuICBnZXRDZWxscygpOiBhbnlbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhLmNoaWxkcmVuXHJcbiAgICAgIC5maWx0ZXIoZCA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGQuZGVwdGggPT09IDE7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5tYXAoKGQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGFiZWwgPSBkLmlkO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgZGF0YTogZC5kYXRhLFxyXG4gICAgICAgICAgeDogZC54MCxcclxuICAgICAgICAgIHk6IGQueTAsXHJcbiAgICAgICAgICB3aWR0aDogZC54MSAtIGQueDAsXHJcbiAgICAgICAgICBoZWlnaHQ6IGQueTEgLSBkLnkwLFxyXG4gICAgICAgICAgZmlsbDogdGhpcy5jb2xvcnMuZ2V0Q29sb3IobGFiZWwpLFxyXG4gICAgICAgICAgbGFiZWwsXHJcbiAgICAgICAgICB2YWx1ZTogZC52YWx1ZSxcclxuICAgICAgICAgIHZhbHVlVHlwZTogZC52YWx1ZVR5cGVcclxuICAgICAgICB9O1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldFRvb2x0aXBUZXh0KHsgbGFiZWwsIHZhbHVlIH0pOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLWxhYmVsXCI+JHtlc2NhcGVMYWJlbChsYWJlbCl9PC9zcGFuPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtdmFsXCI+JHt2YWx1ZS50b0xvY2FsZVN0cmluZygpfTwvc3Bhbj5cclxuICAgIGA7XHJcbiAgfVxyXG5cclxuICBvbkNsaWNrKGRhdGEpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XHJcbiAgfVxyXG5cclxuICB0cmFja0J5KGluZGV4LCBpdGVtKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBpdGVtLmxhYmVsO1xyXG4gIH1cclxufVxyXG4iXX0=