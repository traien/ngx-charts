import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { escapeLabel } from '../common/label.helper';
let TreeMapCellSeriesComponent = class TreeMapCellSeriesComponent {
    constructor() {
        this.gradient = false;
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
    }
    ngOnChanges(changes) {
        this.cells = this.getCells();
    }
    getCells() {
        return this.data.children
            .filter(d => {
            return d.depth === 1;
        })
            .map((d, index) => {
            const label = d.id;
            return {
                data: d.data,
                x: d.x0,
                y: d.y0,
                width: d.x1 - d.x0,
                height: d.y1 - d.y0,
                fill: this.colors.getColor(label),
                label,
                value: d.value,
                valueType: d.valueType
            };
        });
    }
    getTooltipText({ label, value }) {
        return `
      <span class="tooltip-label">${escapeLabel(label)}</span>
      <span class="tooltip-val">${value.toLocaleString()}</span>
    `;
    }
    onClick(data) {
        this.select.emit(data);
    }
    trackBy(index, item) {
        return item.label;
    }
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
        template: `
    <svg:g
      ngx-charts-tree-map-cell
      *ngFor="let c of cells; trackBy: trackBy"
      [data]="c.data"
      [x]="c.x"
      [y]="c.y"
      [width]="c.width"
      [height]="c.height"
      [fill]="c.fill"
      [label]="c.label"
      [value]="c.value"
      [valueType]="c.valueType"
      [valueFormatting]="valueFormatting"
      [labelFormatting]="labelFormatting"
      [gradient]="gradient"
      [animations]="animations"
      (select)="onClick($event)"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="'top'"
      [tooltipType]="'tooltip'"
      [tooltipTitle]="tooltipTemplate ? undefined : getTooltipText(c)"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipContext]="c.data"
    ></svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], TreeMapCellSeriesComponent);
export { TreeMapCellSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1tYXAtY2VsbC1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvdHJlZS1tYXAvdHJlZS1tYXAtY2VsbC1zZXJpZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssRUFDTCxNQUFNLEVBRU4sWUFBWSxFQUNaLHVCQUF1QixFQUV4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFpQ3JELElBQWEsMEJBQTBCLEdBQXZDLE1BQWEsMEJBQTBCO0lBQXZDO1FBTVcsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUVqQyxlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTFCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBNEN4QyxDQUFDO0lBeENDLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO2FBQ3RCLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNWLE9BQU8sQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDO2FBQ0QsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ2hCLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFFbkIsT0FBTztnQkFDTCxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7Z0JBQ1osQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO2dCQUNQLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtnQkFDUCxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDbEIsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ25CLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7Z0JBQ2pDLEtBQUs7Z0JBQ0wsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLO2dCQUNkLFNBQVMsRUFBRSxDQUFDLENBQUMsU0FBUzthQUN2QixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtRQUM3QixPQUFPO29DQUN5QixXQUFXLENBQUMsS0FBSyxDQUFDO2tDQUNwQixLQUFLLENBQUMsY0FBYyxFQUFFO0tBQ25ELENBQUM7SUFDSixDQUFDO0lBRUQsT0FBTyxDQUFDLElBQUk7UUFDVixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0NBQ0YsQ0FBQTtBQXREVTtJQUFSLEtBQUssRUFBRTt3REFBTTtBQUNMO0lBQVIsS0FBSyxFQUFFO3dEQUFNO0FBQ0w7SUFBUixLQUFLLEVBQUU7MERBQVE7QUFDUDtJQUFSLEtBQUssRUFBRTttRUFBc0I7QUFDckI7SUFBUixLQUFLLEVBQUU7bUVBQXNCO0FBQ3JCO0lBQVIsS0FBSyxFQUFFOzREQUEyQjtBQUMxQjtJQUFSLEtBQUssRUFBRTttRUFBa0M7QUFDakM7SUFBUixLQUFLLEVBQUU7bUVBQW1DO0FBQ2xDO0lBQVIsS0FBSyxFQUFFOzhEQUE0QjtBQUUxQjtJQUFULE1BQU0sRUFBRTswREFBNkI7QUFYM0IsMEJBQTBCO0lBL0J0QyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsb0NBQW9DO1FBQzlDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQlQ7UUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtLQUNoRCxDQUFDO0dBQ1csMEJBQTBCLENBdUR0QztTQXZEWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkNoYW5nZXMsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIFRlbXBsYXRlUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGVzY2FwZUxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsLmhlbHBlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy10cmVlLW1hcC1jZWxsLXNlcmllc10nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8c3ZnOmdcclxuICAgICAgbmd4LWNoYXJ0cy10cmVlLW1hcC1jZWxsXHJcbiAgICAgICpuZ0Zvcj1cImxldCBjIG9mIGNlbGxzOyB0cmFja0J5OiB0cmFja0J5XCJcclxuICAgICAgW2RhdGFdPVwiYy5kYXRhXCJcclxuICAgICAgW3hdPVwiYy54XCJcclxuICAgICAgW3ldPVwiYy55XCJcclxuICAgICAgW3dpZHRoXT1cImMud2lkdGhcIlxyXG4gICAgICBbaGVpZ2h0XT1cImMuaGVpZ2h0XCJcclxuICAgICAgW2ZpbGxdPVwiYy5maWxsXCJcclxuICAgICAgW2xhYmVsXT1cImMubGFiZWxcIlxyXG4gICAgICBbdmFsdWVdPVwiYy52YWx1ZVwiXHJcbiAgICAgIFt2YWx1ZVR5cGVdPVwiYy52YWx1ZVR5cGVcIlxyXG4gICAgICBbdmFsdWVGb3JtYXR0aW5nXT1cInZhbHVlRm9ybWF0dGluZ1wiXHJcbiAgICAgIFtsYWJlbEZvcm1hdHRpbmddPVwibGFiZWxGb3JtYXR0aW5nXCJcclxuICAgICAgW2dyYWRpZW50XT1cImdyYWRpZW50XCJcclxuICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgIChzZWxlY3QpPVwib25DbGljaygkZXZlbnQpXCJcclxuICAgICAgbmd4LXRvb2x0aXBcclxuICAgICAgW3Rvb2x0aXBEaXNhYmxlZF09XCJ0b29sdGlwRGlzYWJsZWRcIlxyXG4gICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCIndG9wJ1wiXHJcbiAgICAgIFt0b29sdGlwVHlwZV09XCIndG9vbHRpcCdcIlxyXG4gICAgICBbdG9vbHRpcFRpdGxlXT1cInRvb2x0aXBUZW1wbGF0ZSA/IHVuZGVmaW5lZCA6IGdldFRvb2x0aXBUZXh0KGMpXCJcclxuICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxyXG4gICAgICBbdG9vbHRpcENvbnRleHRdPVwiYy5kYXRhXCJcclxuICAgID48L3N2ZzpnPlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFRyZWVNYXBDZWxsU2VyaWVzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBkYXRhO1xyXG4gIEBJbnB1dCgpIGRpbXM7XHJcbiAgQElucHV0KCkgY29sb3JzO1xyXG4gIEBJbnB1dCgpIHZhbHVlRm9ybWF0dGluZzogYW55O1xyXG4gIEBJbnB1dCgpIGxhYmVsRm9ybWF0dGluZzogYW55O1xyXG4gIEBJbnB1dCgpIGdyYWRpZW50OiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgdG9vbHRpcERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIEBJbnB1dCgpIGFuaW1hdGlvbnM6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjZWxsczogYW55W107XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIHRoaXMuY2VsbHMgPSB0aGlzLmdldENlbGxzKCk7XHJcbiAgfVxyXG5cclxuICBnZXRDZWxscygpOiBhbnlbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhLmNoaWxkcmVuXHJcbiAgICAgIC5maWx0ZXIoZCA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGQuZGVwdGggPT09IDE7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5tYXAoKGQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGFiZWwgPSBkLmlkO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgZGF0YTogZC5kYXRhLFxyXG4gICAgICAgICAgeDogZC54MCxcclxuICAgICAgICAgIHk6IGQueTAsXHJcbiAgICAgICAgICB3aWR0aDogZC54MSAtIGQueDAsXHJcbiAgICAgICAgICBoZWlnaHQ6IGQueTEgLSBkLnkwLFxyXG4gICAgICAgICAgZmlsbDogdGhpcy5jb2xvcnMuZ2V0Q29sb3IobGFiZWwpLFxyXG4gICAgICAgICAgbGFiZWwsXHJcbiAgICAgICAgICB2YWx1ZTogZC52YWx1ZSxcclxuICAgICAgICAgIHZhbHVlVHlwZTogZC52YWx1ZVR5cGVcclxuICAgICAgICB9O1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldFRvb2x0aXBUZXh0KHsgbGFiZWwsIHZhbHVlIH0pOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLWxhYmVsXCI+JHtlc2NhcGVMYWJlbChsYWJlbCl9PC9zcGFuPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtdmFsXCI+JHt2YWx1ZS50b0xvY2FsZVN0cmluZygpfTwvc3Bhbj5cclxuICAgIGA7XHJcbiAgfVxyXG5cclxuICBvbkNsaWNrKGRhdGEpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XHJcbiAgfVxyXG5cclxuICB0cmFja0J5KGluZGV4LCBpdGVtKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBpdGVtLmxhYmVsO1xyXG4gIH1cclxufVxyXG4iXX0=