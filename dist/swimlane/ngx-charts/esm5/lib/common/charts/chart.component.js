import { __decorate } from "tslib";
import { Component, Input, OnChanges, ViewContainerRef, ChangeDetectionStrategy, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { TooltipService } from '../tooltip';
var ChartComponent = /** @class */ (function () {
    function ChartComponent(vcr, tooltipService) {
        this.vcr = vcr;
        this.tooltipService = tooltipService;
        this.showLegend = false;
        this.animations = true;
        this.legendLabelClick = new EventEmitter();
        this.legendLabelActivate = new EventEmitter();
        this.legendLabelDeactivate = new EventEmitter();
        // this.tooltipService.injectionService.setRootViewContainer(this.vcr);
    }
    ChartComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    ChartComponent.prototype.update = function () {
        var legendColumns = 0;
        if (this.showLegend) {
            this.legendType = this.getLegendType();
            if (!this.legendOptions || this.legendOptions.position === 'right') {
                if (this.legendType === 'scaleLegend') {
                    legendColumns = 1;
                }
                else {
                    legendColumns = 2;
                }
            }
        }
        var chartColumns = 12 - legendColumns;
        this.chartWidth = Math.floor((this.view[0] * chartColumns) / 12.0);
        this.legendWidth =
            !this.legendOptions || this.legendOptions.position === 'right'
                ? Math.floor((this.view[0] * legendColumns) / 12.0)
                : this.chartWidth;
    };
    ChartComponent.prototype.getLegendType = function () {
        if (this.legendOptions.scaleType === 'linear') {
            return 'scaleLegend';
        }
        else {
            return 'legend';
        }
    };
    ChartComponent.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: TooltipService }
    ]; };
    __decorate([
        Input()
    ], ChartComponent.prototype, "view", void 0);
    __decorate([
        Input()
    ], ChartComponent.prototype, "showLegend", void 0);
    __decorate([
        Input()
    ], ChartComponent.prototype, "legendOptions", void 0);
    __decorate([
        Input()
    ], ChartComponent.prototype, "data", void 0);
    __decorate([
        Input()
    ], ChartComponent.prototype, "legendData", void 0);
    __decorate([
        Input()
    ], ChartComponent.prototype, "legendType", void 0);
    __decorate([
        Input()
    ], ChartComponent.prototype, "colors", void 0);
    __decorate([
        Input()
    ], ChartComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input()
    ], ChartComponent.prototype, "animations", void 0);
    __decorate([
        Output()
    ], ChartComponent.prototype, "legendLabelClick", void 0);
    __decorate([
        Output()
    ], ChartComponent.prototype, "legendLabelActivate", void 0);
    __decorate([
        Output()
    ], ChartComponent.prototype, "legendLabelDeactivate", void 0);
    ChartComponent = __decorate([
        Component({
            providers: [TooltipService],
            selector: 'ngx-charts-chart',
            template: "\n    <div class=\"ngx-charts-outer\" [style.width.px]=\"view[0]\" [@animationState]=\"'active'\" [@.disabled]=\"!animations\">\n      <svg class=\"ngx-charts\" [attr.width]=\"chartWidth\" [attr.height]=\"view[1]\">\n        <ng-content></ng-content>\n      </svg>\n      <ngx-charts-scale-legend\n        *ngIf=\"showLegend && legendType === 'scaleLegend'\"\n        class=\"chart-legend\"\n        [horizontal]=\"legendOptions && legendOptions.position === 'below'\"\n        [valueRange]=\"legendOptions.domain\"\n        [colors]=\"legendOptions.colors\"\n        [height]=\"view[1]\"\n        [width]=\"legendWidth\"\n      >\n      </ngx-charts-scale-legend>\n      <ngx-charts-legend\n        *ngIf=\"showLegend && legendType === 'legend'\"\n        class=\"chart-legend\"\n        [horizontal]=\"legendOptions && legendOptions.position === 'below'\"\n        [data]=\"legendOptions.domain\"\n        [title]=\"legendOptions.title\"\n        [colors]=\"legendOptions.colors\"\n        [height]=\"view[1]\"\n        [width]=\"legendWidth\"\n        [activeEntries]=\"activeEntries\"\n        (labelClick)=\"legendLabelClick.emit($event)\"\n        (labelActivate)=\"legendLabelActivate.emit($event)\"\n        (labelDeactivate)=\"legendLabelDeactivate.emit($event)\"\n      >\n      </ngx-charts-legend>\n    </div>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':enter', [style({ opacity: 0 }), animate('500ms 100ms', style({ opacity: 1 }))])
                ])
            ]
        })
    ], ChartComponent);
    return ChartComponent;
}());
export { ChartComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL2NoYXJ0cy9jaGFydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsdUJBQXVCLEVBQ3ZCLFlBQVksRUFDWixNQUFNLEVBQ04sYUFBYSxFQUNkLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBNEM1QztJQXFCRSx3QkFBb0IsR0FBcUIsRUFBVSxjQUE4QjtRQUE3RCxRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQW5CeEUsZUFBVSxHQUFHLEtBQUssQ0FBQztRQVNuQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTFCLHFCQUFnQixHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3pELHdCQUFtQixHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVELDBCQUFxQixHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBT3RFLHVFQUF1RTtJQUN6RSxDQUFDO0lBRUQsb0NBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUNFLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFFdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFFO2dCQUNsRSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssYUFBYSxFQUFFO29CQUNyQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO2lCQUNuQjtxQkFBTTtvQkFDTCxhQUFhLEdBQUcsQ0FBQyxDQUFDO2lCQUNuQjthQUNGO1NBQ0Y7UUFFRCxJQUFNLFlBQVksR0FBRyxFQUFFLEdBQUcsYUFBYSxDQUFDO1FBRXhDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFdBQVc7WUFDZCxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEtBQUssT0FBTztnQkFDNUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDbkQsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDeEIsQ0FBQztJQUVELHNDQUFhLEdBQWI7UUFDRSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxLQUFLLFFBQVEsRUFBRTtZQUM3QyxPQUFPLGFBQWEsQ0FBQztTQUN0QjthQUFNO1lBQ0wsT0FBTyxRQUFRLENBQUM7U0FDakI7SUFDSCxDQUFDOztnQkFyQ3dCLGdCQUFnQjtnQkFBMEIsY0FBYzs7SUFwQnhFO1FBQVIsS0FBSyxFQUFFO2dEQUFNO0lBQ0w7UUFBUixLQUFLLEVBQUU7c0RBQW9CO0lBQ25CO1FBQVIsS0FBSyxFQUFFO3lEQUFvQjtJQUduQjtRQUFSLEtBQUssRUFBRTtnREFBTTtJQUNMO1FBQVIsS0FBSyxFQUFFO3NEQUFZO0lBQ1g7UUFBUixLQUFLLEVBQUU7c0RBQWlCO0lBQ2hCO1FBQVIsS0FBSyxFQUFFO2tEQUFhO0lBQ1o7UUFBUixLQUFLLEVBQUU7eURBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFO3NEQUE0QjtJQUUxQjtRQUFULE1BQU0sRUFBRTs0REFBMEQ7SUFDekQ7UUFBVCxNQUFNLEVBQUU7K0RBQTZEO0lBQzVEO1FBQVQsTUFBTSxFQUFFO2lFQUErRDtJQWY3RCxjQUFjO1FBMUMxQixTQUFTLENBQUM7WUFDVCxTQUFTLEVBQUUsQ0FBQyxjQUFjLENBQUM7WUFDM0IsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixRQUFRLEVBQUUsK3lDQStCVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLFVBQVUsRUFBRTtnQkFDVixPQUFPLENBQUMsZ0JBQWdCLEVBQUU7b0JBQ3hCLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDN0YsQ0FBQzthQUNIO1NBQ0YsQ0FBQztPQUNXLGNBQWMsQ0EyRDFCO0lBQUQscUJBQUM7Q0FBQSxBQTNERCxJQTJEQztTQTNEWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIFZpZXdDb250YWluZXJSZWYsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE91dHB1dCxcclxuICBTaW1wbGVDaGFuZ2VzXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IHRyaWdnZXIsIHN0eWxlLCBhbmltYXRlLCB0cmFuc2l0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IFRvb2x0aXBTZXJ2aWNlIH0gZnJvbSAnLi4vdG9vbHRpcCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBwcm92aWRlcnM6IFtUb29sdGlwU2VydmljZV0sXHJcbiAgc2VsZWN0b3I6ICduZ3gtY2hhcnRzLWNoYXJ0JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cIm5neC1jaGFydHMtb3V0ZXJcIiBbc3R5bGUud2lkdGgucHhdPVwidmlld1swXVwiIFtAYW5pbWF0aW9uU3RhdGVdPVwiJ2FjdGl2ZSdcIiBbQC5kaXNhYmxlZF09XCIhYW5pbWF0aW9uc1wiPlxyXG4gICAgICA8c3ZnIGNsYXNzPVwibmd4LWNoYXJ0c1wiIFthdHRyLndpZHRoXT1cImNoYXJ0V2lkdGhcIiBbYXR0ci5oZWlnaHRdPVwidmlld1sxXVwiPlxyXG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgICAgPC9zdmc+XHJcbiAgICAgIDxuZ3gtY2hhcnRzLXNjYWxlLWxlZ2VuZFxyXG4gICAgICAgICpuZ0lmPVwic2hvd0xlZ2VuZCAmJiBsZWdlbmRUeXBlID09PSAnc2NhbGVMZWdlbmQnXCJcclxuICAgICAgICBjbGFzcz1cImNoYXJ0LWxlZ2VuZFwiXHJcbiAgICAgICAgW2hvcml6b250YWxdPVwibGVnZW5kT3B0aW9ucyAmJiBsZWdlbmRPcHRpb25zLnBvc2l0aW9uID09PSAnYmVsb3cnXCJcclxuICAgICAgICBbdmFsdWVSYW5nZV09XCJsZWdlbmRPcHRpb25zLmRvbWFpblwiXHJcbiAgICAgICAgW2NvbG9yc109XCJsZWdlbmRPcHRpb25zLmNvbG9yc1wiXHJcbiAgICAgICAgW2hlaWdodF09XCJ2aWV3WzFdXCJcclxuICAgICAgICBbd2lkdGhdPVwibGVnZW5kV2lkdGhcIlxyXG4gICAgICA+XHJcbiAgICAgIDwvbmd4LWNoYXJ0cy1zY2FsZS1sZWdlbmQ+XHJcbiAgICAgIDxuZ3gtY2hhcnRzLWxlZ2VuZFxyXG4gICAgICAgICpuZ0lmPVwic2hvd0xlZ2VuZCAmJiBsZWdlbmRUeXBlID09PSAnbGVnZW5kJ1wiXHJcbiAgICAgICAgY2xhc3M9XCJjaGFydC1sZWdlbmRcIlxyXG4gICAgICAgIFtob3Jpem9udGFsXT1cImxlZ2VuZE9wdGlvbnMgJiYgbGVnZW5kT3B0aW9ucy5wb3NpdGlvbiA9PT0gJ2JlbG93J1wiXHJcbiAgICAgICAgW2RhdGFdPVwibGVnZW5kT3B0aW9ucy5kb21haW5cIlxyXG4gICAgICAgIFt0aXRsZV09XCJsZWdlbmRPcHRpb25zLnRpdGxlXCJcclxuICAgICAgICBbY29sb3JzXT1cImxlZ2VuZE9wdGlvbnMuY29sb3JzXCJcclxuICAgICAgICBbaGVpZ2h0XT1cInZpZXdbMV1cIlxyXG4gICAgICAgIFt3aWR0aF09XCJsZWdlbmRXaWR0aFwiXHJcbiAgICAgICAgW2FjdGl2ZUVudHJpZXNdPVwiYWN0aXZlRW50cmllc1wiXHJcbiAgICAgICAgKGxhYmVsQ2xpY2spPVwibGVnZW5kTGFiZWxDbGljay5lbWl0KCRldmVudClcIlxyXG4gICAgICAgIChsYWJlbEFjdGl2YXRlKT1cImxlZ2VuZExhYmVsQWN0aXZhdGUuZW1pdCgkZXZlbnQpXCJcclxuICAgICAgICAobGFiZWxEZWFjdGl2YXRlKT1cImxlZ2VuZExhYmVsRGVhY3RpdmF0ZS5lbWl0KCRldmVudClcIlxyXG4gICAgICA+XHJcbiAgICAgIDwvbmd4LWNoYXJ0cy1sZWdlbmQ+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIGFuaW1hdGlvbnM6IFtcclxuICAgIHRyaWdnZXIoJ2FuaW1hdGlvblN0YXRlJywgW1xyXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbc3R5bGUoeyBvcGFjaXR5OiAwIH0pLCBhbmltYXRlKCc1MDBtcyAxMDBtcycsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSldKVxyXG4gICAgXSlcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDaGFydENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgdmlldztcclxuICBASW5wdXQoKSBzaG93TGVnZW5kID0gZmFsc2U7XHJcbiAgQElucHV0KCkgbGVnZW5kT3B0aW9uczogYW55O1xyXG5cclxuICAvLyByZW1vdmVcclxuICBASW5wdXQoKSBkYXRhO1xyXG4gIEBJbnB1dCgpIGxlZ2VuZERhdGE7XHJcbiAgQElucHV0KCkgbGVnZW5kVHlwZTogYW55O1xyXG4gIEBJbnB1dCgpIGNvbG9yczogYW55O1xyXG4gIEBJbnB1dCgpIGFjdGl2ZUVudHJpZXM6IGFueVtdO1xyXG4gIEBJbnB1dCgpIGFuaW1hdGlvbnM6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBAT3V0cHV0KCkgbGVnZW5kTGFiZWxDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGxlZ2VuZExhYmVsQWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBsZWdlbmRMYWJlbERlYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjaGFydFdpZHRoOiBhbnk7XHJcbiAgdGl0bGU6IGFueTtcclxuICBsZWdlbmRXaWR0aDogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZjcjogVmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSB0b29sdGlwU2VydmljZTogVG9vbHRpcFNlcnZpY2UpIHtcclxuICAgIC8vIHRoaXMudG9vbHRpcFNlcnZpY2UuaW5qZWN0aW9uU2VydmljZS5zZXRSb290Vmlld0NvbnRhaW5lcih0aGlzLnZjcik7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgbGV0IGxlZ2VuZENvbHVtbnMgPSAwO1xyXG4gICAgaWYgKHRoaXMuc2hvd0xlZ2VuZCkge1xyXG4gICAgICB0aGlzLmxlZ2VuZFR5cGUgPSB0aGlzLmdldExlZ2VuZFR5cGUoKTtcclxuXHJcbiAgICAgIGlmICghdGhpcy5sZWdlbmRPcHRpb25zIHx8IHRoaXMubGVnZW5kT3B0aW9ucy5wb3NpdGlvbiA9PT0gJ3JpZ2h0Jykge1xyXG4gICAgICAgIGlmICh0aGlzLmxlZ2VuZFR5cGUgPT09ICdzY2FsZUxlZ2VuZCcpIHtcclxuICAgICAgICAgIGxlZ2VuZENvbHVtbnMgPSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBsZWdlbmRDb2x1bW5zID0gMjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjaGFydENvbHVtbnMgPSAxMiAtIGxlZ2VuZENvbHVtbnM7XHJcblxyXG4gICAgdGhpcy5jaGFydFdpZHRoID0gTWF0aC5mbG9vcigodGhpcy52aWV3WzBdICogY2hhcnRDb2x1bW5zKSAvIDEyLjApO1xyXG4gICAgdGhpcy5sZWdlbmRXaWR0aCA9XHJcbiAgICAgICF0aGlzLmxlZ2VuZE9wdGlvbnMgfHwgdGhpcy5sZWdlbmRPcHRpb25zLnBvc2l0aW9uID09PSAncmlnaHQnXHJcbiAgICAgICAgPyBNYXRoLmZsb29yKCh0aGlzLnZpZXdbMF0gKiBsZWdlbmRDb2x1bW5zKSAvIDEyLjApXHJcbiAgICAgICAgOiB0aGlzLmNoYXJ0V2lkdGg7XHJcbiAgfVxyXG5cclxuICBnZXRMZWdlbmRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICBpZiAodGhpcy5sZWdlbmRPcHRpb25zLnNjYWxlVHlwZSA9PT0gJ2xpbmVhcicpIHtcclxuICAgICAgcmV0dXJuICdzY2FsZUxlZ2VuZCc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJ2xlZ2VuZCc7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==