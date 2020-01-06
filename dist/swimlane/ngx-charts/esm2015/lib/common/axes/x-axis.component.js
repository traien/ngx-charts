import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { XAxisTicksComponent } from './x-axis-ticks.component';
let XAxisComponent = class XAxisComponent {
    constructor() {
        this.rotateTicks = true;
        this.showGridLines = false;
        this.xOrient = 'bottom';
        this.xAxisOffset = 0;
        this.dimensionsChanged = new EventEmitter();
        this.xAxisClassName = 'x axis';
        this.labelOffset = 0;
        this.fill = 'none';
        this.stroke = 'stroke';
        this.tickStroke = '#ccc';
        this.strokeWidth = 'none';
        this.padding = 5;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.transform = `translate(0,${this.xAxisOffset + this.padding + this.dims.height})`;
        if (typeof this.xAxisTickCount !== 'undefined') {
            this.tickArguments = [this.xAxisTickCount];
        }
    }
    emitTicksHeight({ height }) {
        const newLabelOffset = height + 25 + 5;
        if (newLabelOffset !== this.labelOffset) {
            this.labelOffset = newLabelOffset;
            setTimeout(() => {
                this.dimensionsChanged.emit({ height });
            }, 0);
        }
    }
};
__decorate([
    Input()
], XAxisComponent.prototype, "xScale", void 0);
__decorate([
    Input()
], XAxisComponent.prototype, "dims", void 0);
__decorate([
    Input()
], XAxisComponent.prototype, "trimTicks", void 0);
__decorate([
    Input()
], XAxisComponent.prototype, "rotateTicks", void 0);
__decorate([
    Input()
], XAxisComponent.prototype, "maxTickLength", void 0);
__decorate([
    Input()
], XAxisComponent.prototype, "tickFormatting", void 0);
__decorate([
    Input()
], XAxisComponent.prototype, "showGridLines", void 0);
__decorate([
    Input()
], XAxisComponent.prototype, "showLabel", void 0);
__decorate([
    Input()
], XAxisComponent.prototype, "labelText", void 0);
__decorate([
    Input()
], XAxisComponent.prototype, "ticks", void 0);
__decorate([
    Input()
], XAxisComponent.prototype, "xAxisTickInterval", void 0);
__decorate([
    Input()
], XAxisComponent.prototype, "xAxisTickCount", void 0);
__decorate([
    Input()
], XAxisComponent.prototype, "xOrient", void 0);
__decorate([
    Input()
], XAxisComponent.prototype, "xAxisOffset", void 0);
__decorate([
    Output()
], XAxisComponent.prototype, "dimensionsChanged", void 0);
__decorate([
    ViewChild(XAxisTicksComponent)
], XAxisComponent.prototype, "ticksComponent", void 0);
XAxisComponent = __decorate([
    Component({
        selector: 'g[ngx-charts-x-axis]',
        template: `
    <svg:g [attr.class]="xAxisClassName" [attr.transform]="transform">
      <svg:g
        ngx-charts-x-axis-ticks
        *ngIf="xScale"
        [trimTicks]="trimTicks"
        [rotateTicks]="rotateTicks"
        [maxTickLength]="maxTickLength"
        [tickFormatting]="tickFormatting"
        [tickArguments]="tickArguments"
        [tickStroke]="tickStroke"
        [scale]="xScale"
        [orient]="xOrient"
        [showGridLines]="showGridLines"
        [gridLineHeight]="dims.height"
        [width]="dims.width"
        [tickValues]="ticks"
        (dimensionsChanged)="emitTicksHeight($event)"
      />
      <svg:g
        ngx-charts-axis-label
        *ngIf="showLabel"
        [label]="labelText"
        [offset]="labelOffset"
        [orient]="'bottom'"
        [height]="dims.height"
        [width]="dims.width"
      ></svg:g>
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], XAxisComponent);
export { XAxisComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieC1heGlzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9heGVzL3gtYXhpcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLE1BQU0sRUFDTixZQUFZLEVBRVosU0FBUyxFQUNULHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQW9DL0QsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUEzQjtRQUlXLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBTXRCLFlBQU8sR0FBVyxRQUFRLENBQUM7UUFDM0IsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFFdkIsc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVqRCxtQkFBYyxHQUFXLFFBQVEsQ0FBQztRQUlsQyxnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixTQUFJLEdBQVcsTUFBTSxDQUFDO1FBQ3RCLFdBQU0sR0FBVyxRQUFRLENBQUM7UUFDMUIsZUFBVSxHQUFXLE1BQU0sQ0FBQztRQUM1QixnQkFBVyxHQUFXLE1BQU0sQ0FBQztRQUM3QixZQUFPLEdBQVcsQ0FBQyxDQUFDO0lBeUJ0QixDQUFDO0lBckJDLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsU0FBUyxHQUFHLGVBQWUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUM7UUFFdEYsSUFBSSxPQUFPLElBQUksQ0FBQyxjQUFjLEtBQUssV0FBVyxFQUFFO1lBQzlDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDNUM7SUFDSCxDQUFDO0lBRUQsZUFBZSxDQUFDLEVBQUUsTUFBTSxFQUFFO1FBQ3hCLE1BQU0sY0FBYyxHQUFHLE1BQU0sR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksY0FBYyxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDdkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUM7WUFDbEMsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUMxQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDUDtJQUNILENBQUM7Q0FDRixDQUFBO0FBbkRVO0lBQVIsS0FBSyxFQUFFOzhDQUFRO0FBQ1A7SUFBUixLQUFLLEVBQUU7NENBQU07QUFDTDtJQUFSLEtBQUssRUFBRTtpREFBb0I7QUFDbkI7SUFBUixLQUFLLEVBQUU7bURBQTZCO0FBQzVCO0lBQVIsS0FBSyxFQUFFO3FEQUF1QjtBQUN0QjtJQUFSLEtBQUssRUFBRTtzREFBZ0I7QUFDZjtJQUFSLEtBQUssRUFBRTtxREFBdUI7QUFDdEI7SUFBUixLQUFLLEVBQUU7aURBQVc7QUFDVjtJQUFSLEtBQUssRUFBRTtpREFBVztBQUNWO0lBQVIsS0FBSyxFQUFFOzZDQUFjO0FBQ2I7SUFBUixLQUFLLEVBQUU7eURBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFO3NEQUFxQjtBQUNwQjtJQUFSLEtBQUssRUFBRTsrQ0FBNEI7QUFDM0I7SUFBUixLQUFLLEVBQUU7bURBQXlCO0FBRXZCO0lBQVQsTUFBTSxFQUFFO3lEQUF3QztBQWFqQjtJQUEvQixTQUFTLENBQUMsbUJBQW1CLENBQUM7c0RBQXFDO0FBN0J6RCxjQUFjO0lBbEMxQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsc0JBQXNCO1FBQ2hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2QlQ7UUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtLQUNoRCxDQUFDO0dBQ1csY0FBYyxDQW9EMUI7U0FwRFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPbkNoYW5nZXMsXHJcbiAgVmlld0NoaWxkLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBYQXhpc1RpY2tzQ29tcG9uZW50IH0gZnJvbSAnLi94LWF4aXMtdGlja3MuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLXgtYXhpc10nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8c3ZnOmcgW2F0dHIuY2xhc3NdPVwieEF4aXNDbGFzc05hbWVcIiBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtXCI+XHJcbiAgICAgIDxzdmc6Z1xyXG4gICAgICAgIG5neC1jaGFydHMteC1heGlzLXRpY2tzXHJcbiAgICAgICAgKm5nSWY9XCJ4U2NhbGVcIlxyXG4gICAgICAgIFt0cmltVGlja3NdPVwidHJpbVRpY2tzXCJcclxuICAgICAgICBbcm90YXRlVGlja3NdPVwicm90YXRlVGlja3NcIlxyXG4gICAgICAgIFttYXhUaWNrTGVuZ3RoXT1cIm1heFRpY2tMZW5ndGhcIlxyXG4gICAgICAgIFt0aWNrRm9ybWF0dGluZ109XCJ0aWNrRm9ybWF0dGluZ1wiXHJcbiAgICAgICAgW3RpY2tBcmd1bWVudHNdPVwidGlja0FyZ3VtZW50c1wiXHJcbiAgICAgICAgW3RpY2tTdHJva2VdPVwidGlja1N0cm9rZVwiXHJcbiAgICAgICAgW3NjYWxlXT1cInhTY2FsZVwiXHJcbiAgICAgICAgW29yaWVudF09XCJ4T3JpZW50XCJcclxuICAgICAgICBbc2hvd0dyaWRMaW5lc109XCJzaG93R3JpZExpbmVzXCJcclxuICAgICAgICBbZ3JpZExpbmVIZWlnaHRdPVwiZGltcy5oZWlnaHRcIlxyXG4gICAgICAgIFt3aWR0aF09XCJkaW1zLndpZHRoXCJcclxuICAgICAgICBbdGlja1ZhbHVlc109XCJ0aWNrc1wiXHJcbiAgICAgICAgKGRpbWVuc2lvbnNDaGFuZ2VkKT1cImVtaXRUaWNrc0hlaWdodCgkZXZlbnQpXCJcclxuICAgICAgLz5cclxuICAgICAgPHN2ZzpnXHJcbiAgICAgICAgbmd4LWNoYXJ0cy1heGlzLWxhYmVsXHJcbiAgICAgICAgKm5nSWY9XCJzaG93TGFiZWxcIlxyXG4gICAgICAgIFtsYWJlbF09XCJsYWJlbFRleHRcIlxyXG4gICAgICAgIFtvZmZzZXRdPVwibGFiZWxPZmZzZXRcIlxyXG4gICAgICAgIFtvcmllbnRdPVwiJ2JvdHRvbSdcIlxyXG4gICAgICAgIFtoZWlnaHRdPVwiZGltcy5oZWlnaHRcIlxyXG4gICAgICAgIFt3aWR0aF09XCJkaW1zLndpZHRoXCJcclxuICAgICAgPjwvc3ZnOmc+XHJcbiAgICA8L3N2ZzpnPlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFhBeGlzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSB4U2NhbGU7XHJcbiAgQElucHV0KCkgZGltcztcclxuICBASW5wdXQoKSB0cmltVGlja3M6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgcm90YXRlVGlja3M6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIG1heFRpY2tMZW5ndGg6IG51bWJlcjtcclxuICBASW5wdXQoKSB0aWNrRm9ybWF0dGluZztcclxuICBASW5wdXQoKSBzaG93R3JpZExpbmVzID0gZmFsc2U7XHJcbiAgQElucHV0KCkgc2hvd0xhYmVsO1xyXG4gIEBJbnB1dCgpIGxhYmVsVGV4dDtcclxuICBASW5wdXQoKSB0aWNrczogYW55W107XHJcbiAgQElucHV0KCkgeEF4aXNUaWNrSW50ZXJ2YWw7XHJcbiAgQElucHV0KCkgeEF4aXNUaWNrQ291bnQ6IGFueTtcclxuICBASW5wdXQoKSB4T3JpZW50OiBzdHJpbmcgPSAnYm90dG9tJztcclxuICBASW5wdXQoKSB4QXhpc09mZnNldDogbnVtYmVyID0gMDtcclxuXHJcbiAgQE91dHB1dCgpIGRpbWVuc2lvbnNDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICB4QXhpc0NsYXNzTmFtZTogc3RyaW5nID0gJ3ggYXhpcyc7XHJcblxyXG4gIHRpY2tBcmd1bWVudHM6IGFueTtcclxuICB0cmFuc2Zvcm06IGFueTtcclxuICBsYWJlbE9mZnNldDogbnVtYmVyID0gMDtcclxuICBmaWxsOiBzdHJpbmcgPSAnbm9uZSc7XHJcbiAgc3Ryb2tlOiBzdHJpbmcgPSAnc3Ryb2tlJztcclxuICB0aWNrU3Ryb2tlOiBzdHJpbmcgPSAnI2NjYyc7XHJcbiAgc3Ryb2tlV2lkdGg6IHN0cmluZyA9ICdub25lJztcclxuICBwYWRkaW5nOiBudW1iZXIgPSA1O1xyXG5cclxuICBAVmlld0NoaWxkKFhBeGlzVGlja3NDb21wb25lbnQpIHRpY2tzQ29tcG9uZW50OiBYQXhpc1RpY2tzQ29tcG9uZW50O1xyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgdGhpcy50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKDAsJHt0aGlzLnhBeGlzT2Zmc2V0ICsgdGhpcy5wYWRkaW5nICsgdGhpcy5kaW1zLmhlaWdodH0pYDtcclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMueEF4aXNUaWNrQ291bnQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHRoaXMudGlja0FyZ3VtZW50cyA9IFt0aGlzLnhBeGlzVGlja0NvdW50XTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVtaXRUaWNrc0hlaWdodCh7IGhlaWdodCB9KTogdm9pZCB7XHJcbiAgICBjb25zdCBuZXdMYWJlbE9mZnNldCA9IGhlaWdodCArIDI1ICsgNTtcclxuICAgIGlmIChuZXdMYWJlbE9mZnNldCAhPT0gdGhpcy5sYWJlbE9mZnNldCkge1xyXG4gICAgICB0aGlzLmxhYmVsT2Zmc2V0ID0gbmV3TGFiZWxPZmZzZXQ7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZGltZW5zaW9uc0NoYW5nZWQuZW1pdCh7IGhlaWdodCB9KTtcclxuICAgICAgfSwgMCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==