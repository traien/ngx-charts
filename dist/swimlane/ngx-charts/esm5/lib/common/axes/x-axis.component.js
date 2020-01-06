import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { XAxisTicksComponent } from './x-axis-ticks.component';
var XAxisComponent = /** @class */ (function () {
    function XAxisComponent() {
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
    XAxisComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    XAxisComponent.prototype.update = function () {
        this.transform = "translate(0," + (this.xAxisOffset + this.padding + this.dims.height) + ")";
        if (typeof this.xAxisTickCount !== 'undefined') {
            this.tickArguments = [this.xAxisTickCount];
        }
    };
    XAxisComponent.prototype.emitTicksHeight = function (_a) {
        var _this = this;
        var height = _a.height;
        var newLabelOffset = height + 25 + 5;
        if (newLabelOffset !== this.labelOffset) {
            this.labelOffset = newLabelOffset;
            setTimeout(function () {
                _this.dimensionsChanged.emit({ height: height });
            }, 0);
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
            template: "\n    <svg:g [attr.class]=\"xAxisClassName\" [attr.transform]=\"transform\">\n      <svg:g\n        ngx-charts-x-axis-ticks\n        *ngIf=\"xScale\"\n        [trimTicks]=\"trimTicks\"\n        [rotateTicks]=\"rotateTicks\"\n        [maxTickLength]=\"maxTickLength\"\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"xScale\"\n        [orient]=\"xOrient\"\n        [showGridLines]=\"showGridLines\"\n        [gridLineHeight]=\"dims.height\"\n        [width]=\"dims.width\"\n        [tickValues]=\"ticks\"\n        (dimensionsChanged)=\"emitTicksHeight($event)\"\n      />\n      <svg:g\n        ngx-charts-axis-label\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"labelOffset\"\n        [orient]=\"'bottom'\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\"\n      ></svg:g>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], XAxisComponent);
    return XAxisComponent;
}());
export { XAxisComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieC1heGlzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9heGVzL3gtYXhpcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLE1BQU0sRUFDTixZQUFZLEVBRVosU0FBUyxFQUNULHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQW9DL0Q7SUFBQTtRQUlXLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBTXRCLFlBQU8sR0FBVyxRQUFRLENBQUM7UUFDM0IsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFFdkIsc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVqRCxtQkFBYyxHQUFXLFFBQVEsQ0FBQztRQUlsQyxnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixTQUFJLEdBQVcsTUFBTSxDQUFDO1FBQ3RCLFdBQU0sR0FBVyxRQUFRLENBQUM7UUFDMUIsZUFBVSxHQUFXLE1BQU0sQ0FBQztRQUM1QixnQkFBVyxHQUFXLE1BQU0sQ0FBQztRQUM3QixZQUFPLEdBQVcsQ0FBQyxDQUFDO0lBeUJ0QixDQUFDO0lBckJDLG9DQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELCtCQUFNLEdBQU47UUFDRSxJQUFJLENBQUMsU0FBUyxHQUFHLGtCQUFlLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sT0FBRyxDQUFDO1FBRXRGLElBQUksT0FBTyxJQUFJLENBQUMsY0FBYyxLQUFLLFdBQVcsRUFBRTtZQUM5QyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzVDO0lBQ0gsQ0FBQztJQUVELHdDQUFlLEdBQWYsVUFBZ0IsRUFBVTtRQUExQixpQkFRQztZQVJpQixrQkFBTTtRQUN0QixJQUFNLGNBQWMsR0FBRyxNQUFNLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN2QyxJQUFJLGNBQWMsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDO1lBQ2xDLFVBQVUsQ0FBQztnQkFDVCxLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxRQUFBLEVBQUUsQ0FBQyxDQUFDO1lBQzFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNQO0lBQ0gsQ0FBQztJQWxEUTtRQUFSLEtBQUssRUFBRTtrREFBUTtJQUNQO1FBQVIsS0FBSyxFQUFFO2dEQUFNO0lBQ0w7UUFBUixLQUFLLEVBQUU7cURBQW9CO0lBQ25CO1FBQVIsS0FBSyxFQUFFO3VEQUE2QjtJQUM1QjtRQUFSLEtBQUssRUFBRTt5REFBdUI7SUFDdEI7UUFBUixLQUFLLEVBQUU7MERBQWdCO0lBQ2Y7UUFBUixLQUFLLEVBQUU7eURBQXVCO0lBQ3RCO1FBQVIsS0FBSyxFQUFFO3FEQUFXO0lBQ1Y7UUFBUixLQUFLLEVBQUU7cURBQVc7SUFDVjtRQUFSLEtBQUssRUFBRTtpREFBYztJQUNiO1FBQVIsS0FBSyxFQUFFOzZEQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTswREFBcUI7SUFDcEI7UUFBUixLQUFLLEVBQUU7bURBQTRCO0lBQzNCO1FBQVIsS0FBSyxFQUFFO3VEQUF5QjtJQUV2QjtRQUFULE1BQU0sRUFBRTs2REFBd0M7SUFhakI7UUFBL0IsU0FBUyxDQUFDLG1CQUFtQixDQUFDOzBEQUFxQztJQTdCekQsY0FBYztRQWxDMUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxRQUFRLEVBQUUsMDZCQTZCVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FDVyxjQUFjLENBb0QxQjtJQUFELHFCQUFDO0NBQUEsQUFwREQsSUFvREM7U0FwRFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPbkNoYW5nZXMsXHJcbiAgVmlld0NoaWxkLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBYQXhpc1RpY2tzQ29tcG9uZW50IH0gZnJvbSAnLi94LWF4aXMtdGlja3MuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLXgtYXhpc10nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8c3ZnOmcgW2F0dHIuY2xhc3NdPVwieEF4aXNDbGFzc05hbWVcIiBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtXCI+XHJcbiAgICAgIDxzdmc6Z1xyXG4gICAgICAgIG5neC1jaGFydHMteC1heGlzLXRpY2tzXHJcbiAgICAgICAgKm5nSWY9XCJ4U2NhbGVcIlxyXG4gICAgICAgIFt0cmltVGlja3NdPVwidHJpbVRpY2tzXCJcclxuICAgICAgICBbcm90YXRlVGlja3NdPVwicm90YXRlVGlja3NcIlxyXG4gICAgICAgIFttYXhUaWNrTGVuZ3RoXT1cIm1heFRpY2tMZW5ndGhcIlxyXG4gICAgICAgIFt0aWNrRm9ybWF0dGluZ109XCJ0aWNrRm9ybWF0dGluZ1wiXHJcbiAgICAgICAgW3RpY2tBcmd1bWVudHNdPVwidGlja0FyZ3VtZW50c1wiXHJcbiAgICAgICAgW3RpY2tTdHJva2VdPVwidGlja1N0cm9rZVwiXHJcbiAgICAgICAgW3NjYWxlXT1cInhTY2FsZVwiXHJcbiAgICAgICAgW29yaWVudF09XCJ4T3JpZW50XCJcclxuICAgICAgICBbc2hvd0dyaWRMaW5lc109XCJzaG93R3JpZExpbmVzXCJcclxuICAgICAgICBbZ3JpZExpbmVIZWlnaHRdPVwiZGltcy5oZWlnaHRcIlxyXG4gICAgICAgIFt3aWR0aF09XCJkaW1zLndpZHRoXCJcclxuICAgICAgICBbdGlja1ZhbHVlc109XCJ0aWNrc1wiXHJcbiAgICAgICAgKGRpbWVuc2lvbnNDaGFuZ2VkKT1cImVtaXRUaWNrc0hlaWdodCgkZXZlbnQpXCJcclxuICAgICAgLz5cclxuICAgICAgPHN2ZzpnXHJcbiAgICAgICAgbmd4LWNoYXJ0cy1heGlzLWxhYmVsXHJcbiAgICAgICAgKm5nSWY9XCJzaG93TGFiZWxcIlxyXG4gICAgICAgIFtsYWJlbF09XCJsYWJlbFRleHRcIlxyXG4gICAgICAgIFtvZmZzZXRdPVwibGFiZWxPZmZzZXRcIlxyXG4gICAgICAgIFtvcmllbnRdPVwiJ2JvdHRvbSdcIlxyXG4gICAgICAgIFtoZWlnaHRdPVwiZGltcy5oZWlnaHRcIlxyXG4gICAgICAgIFt3aWR0aF09XCJkaW1zLndpZHRoXCJcclxuICAgICAgPjwvc3ZnOmc+XHJcbiAgICA8L3N2ZzpnPlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFhBeGlzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSB4U2NhbGU7XHJcbiAgQElucHV0KCkgZGltcztcclxuICBASW5wdXQoKSB0cmltVGlja3M6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgcm90YXRlVGlja3M6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIG1heFRpY2tMZW5ndGg6IG51bWJlcjtcclxuICBASW5wdXQoKSB0aWNrRm9ybWF0dGluZztcclxuICBASW5wdXQoKSBzaG93R3JpZExpbmVzID0gZmFsc2U7XHJcbiAgQElucHV0KCkgc2hvd0xhYmVsO1xyXG4gIEBJbnB1dCgpIGxhYmVsVGV4dDtcclxuICBASW5wdXQoKSB0aWNrczogYW55W107XHJcbiAgQElucHV0KCkgeEF4aXNUaWNrSW50ZXJ2YWw7XHJcbiAgQElucHV0KCkgeEF4aXNUaWNrQ291bnQ6IGFueTtcclxuICBASW5wdXQoKSB4T3JpZW50OiBzdHJpbmcgPSAnYm90dG9tJztcclxuICBASW5wdXQoKSB4QXhpc09mZnNldDogbnVtYmVyID0gMDtcclxuXHJcbiAgQE91dHB1dCgpIGRpbWVuc2lvbnNDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICB4QXhpc0NsYXNzTmFtZTogc3RyaW5nID0gJ3ggYXhpcyc7XHJcblxyXG4gIHRpY2tBcmd1bWVudHM6IGFueTtcclxuICB0cmFuc2Zvcm06IGFueTtcclxuICBsYWJlbE9mZnNldDogbnVtYmVyID0gMDtcclxuICBmaWxsOiBzdHJpbmcgPSAnbm9uZSc7XHJcbiAgc3Ryb2tlOiBzdHJpbmcgPSAnc3Ryb2tlJztcclxuICB0aWNrU3Ryb2tlOiBzdHJpbmcgPSAnI2NjYyc7XHJcbiAgc3Ryb2tlV2lkdGg6IHN0cmluZyA9ICdub25lJztcclxuICBwYWRkaW5nOiBudW1iZXIgPSA1O1xyXG5cclxuICBAVmlld0NoaWxkKFhBeGlzVGlja3NDb21wb25lbnQpIHRpY2tzQ29tcG9uZW50OiBYQXhpc1RpY2tzQ29tcG9uZW50O1xyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgdGhpcy50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKDAsJHt0aGlzLnhBeGlzT2Zmc2V0ICsgdGhpcy5wYWRkaW5nICsgdGhpcy5kaW1zLmhlaWdodH0pYDtcclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMueEF4aXNUaWNrQ291bnQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHRoaXMudGlja0FyZ3VtZW50cyA9IFt0aGlzLnhBeGlzVGlja0NvdW50XTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVtaXRUaWNrc0hlaWdodCh7IGhlaWdodCB9KTogdm9pZCB7XHJcbiAgICBjb25zdCBuZXdMYWJlbE9mZnNldCA9IGhlaWdodCArIDI1ICsgNTtcclxuICAgIGlmIChuZXdMYWJlbE9mZnNldCAhPT0gdGhpcy5sYWJlbE9mZnNldCkge1xyXG4gICAgICB0aGlzLmxhYmVsT2Zmc2V0ID0gbmV3TGFiZWxPZmZzZXQ7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZGltZW5zaW9uc0NoYW5nZWQuZW1pdCh7IGhlaWdodCB9KTtcclxuICAgICAgfSwgMCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==