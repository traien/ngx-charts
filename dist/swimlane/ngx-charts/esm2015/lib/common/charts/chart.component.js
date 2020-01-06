import { __decorate } from "tslib";
import { Component, Input, OnChanges, ViewContainerRef, ChangeDetectionStrategy, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { TooltipService } from '../tooltip';
let ChartComponent = class ChartComponent {
    constructor(vcr, tooltipService) {
        this.vcr = vcr;
        this.tooltipService = tooltipService;
        this.showLegend = false;
        this.animations = true;
        this.legendLabelClick = new EventEmitter();
        this.legendLabelActivate = new EventEmitter();
        this.legendLabelDeactivate = new EventEmitter();
        // this.tooltipService.injectionService.setRootViewContainer(this.vcr);
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        let legendColumns = 0;
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
        const chartColumns = 12 - legendColumns;
        this.chartWidth = Math.floor((this.view[0] * chartColumns) / 12.0);
        this.legendWidth =
            !this.legendOptions || this.legendOptions.position === 'right'
                ? Math.floor((this.view[0] * legendColumns) / 12.0)
                : this.chartWidth;
    }
    getLegendType() {
        if (this.legendOptions.scaleType === 'linear') {
            return 'scaleLegend';
        }
        else {
            return 'legend';
        }
    }
};
ChartComponent.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: TooltipService }
];
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
        template: `
    <div class="ngx-charts-outer" [style.width.px]="view[0]" [@animationState]="'active'" [@.disabled]="!animations">
      <svg class="ngx-charts" [attr.width]="chartWidth" [attr.height]="view[1]">
        <ng-content></ng-content>
      </svg>
      <ngx-charts-scale-legend
        *ngIf="showLegend && legendType === 'scaleLegend'"
        class="chart-legend"
        [horizontal]="legendOptions && legendOptions.position === 'below'"
        [valueRange]="legendOptions.domain"
        [colors]="legendOptions.colors"
        [height]="view[1]"
        [width]="legendWidth"
      >
      </ngx-charts-scale-legend>
      <ngx-charts-legend
        *ngIf="showLegend && legendType === 'legend'"
        class="chart-legend"
        [horizontal]="legendOptions && legendOptions.position === 'below'"
        [data]="legendOptions.domain"
        [title]="legendOptions.title"
        [colors]="legendOptions.colors"
        [height]="view[1]"
        [width]="legendWidth"
        [activeEntries]="activeEntries"
        (labelClick)="legendLabelClick.emit($event)"
        (labelActivate)="legendLabelActivate.emit($event)"
        (labelDeactivate)="legendLabelDeactivate.emit($event)"
      >
      </ngx-charts-legend>
    </div>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [
            trigger('animationState', [
                transition(':enter', [style({ opacity: 0 }), animate('500ms 100ms', style({ opacity: 1 }))])
            ])
        ]
    })
], ChartComponent);
export { ChartComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL2NoYXJ0cy9jaGFydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsdUJBQXVCLEVBQ3ZCLFlBQVksRUFDWixNQUFNLEVBQ04sYUFBYSxFQUNkLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBNEM1QyxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBcUJ6QixZQUFvQixHQUFxQixFQUFVLGNBQThCO1FBQTdELFFBQUcsR0FBSCxHQUFHLENBQWtCO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBbkJ4RSxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBU25CLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFMUIscUJBQWdCLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDekQsd0JBQW1CLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUQsMEJBQXFCLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFPdEUsdUVBQXVFO0lBQ3pFLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUV2QyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7Z0JBQ2xFLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxhQUFhLEVBQUU7b0JBQ3JDLGFBQWEsR0FBRyxDQUFDLENBQUM7aUJBQ25CO3FCQUFNO29CQUNMLGFBQWEsR0FBRyxDQUFDLENBQUM7aUJBQ25CO2FBQ0Y7U0FDRjtRQUVELE1BQU0sWUFBWSxHQUFHLEVBQUUsR0FBRyxhQUFhLENBQUM7UUFFeEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsV0FBVztZQUNkLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsS0FBSyxPQUFPO2dCQUM1RCxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUNuRCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN4QixDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFFO1lBQzdDLE9BQU8sYUFBYSxDQUFDO1NBQ3RCO2FBQU07WUFDTCxPQUFPLFFBQVEsQ0FBQztTQUNqQjtJQUNILENBQUM7Q0FDRixDQUFBOztZQXRDMEIsZ0JBQWdCO1lBQTBCLGNBQWM7O0FBcEJ4RTtJQUFSLEtBQUssRUFBRTs0Q0FBTTtBQUNMO0lBQVIsS0FBSyxFQUFFO2tEQUFvQjtBQUNuQjtJQUFSLEtBQUssRUFBRTtxREFBb0I7QUFHbkI7SUFBUixLQUFLLEVBQUU7NENBQU07QUFDTDtJQUFSLEtBQUssRUFBRTtrREFBWTtBQUNYO0lBQVIsS0FBSyxFQUFFO2tEQUFpQjtBQUNoQjtJQUFSLEtBQUssRUFBRTs4Q0FBYTtBQUNaO0lBQVIsS0FBSyxFQUFFO3FEQUFzQjtBQUNyQjtJQUFSLEtBQUssRUFBRTtrREFBNEI7QUFFMUI7SUFBVCxNQUFNLEVBQUU7d0RBQTBEO0FBQ3pEO0lBQVQsTUFBTSxFQUFFOzJEQUE2RDtBQUM1RDtJQUFULE1BQU0sRUFBRTs2REFBK0Q7QUFmN0QsY0FBYztJQTFDMUIsU0FBUyxDQUFDO1FBQ1QsU0FBUyxFQUFFLENBQUMsY0FBYyxDQUFDO1FBQzNCLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0JUO1FBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07UUFDL0MsVUFBVSxFQUFFO1lBQ1YsT0FBTyxDQUFDLGdCQUFnQixFQUFFO2dCQUN4QixVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDN0YsQ0FBQztTQUNIO0tBQ0YsQ0FBQztHQUNXLGNBQWMsQ0EyRDFCO1NBM0RZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgVmlld0NvbnRhaW5lclJlZixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT3V0cHV0LFxyXG4gIFNpbXBsZUNoYW5nZXNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgdHJpZ2dlciwgc3R5bGUsIGFuaW1hdGUsIHRyYW5zaXRpb24gfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgVG9vbHRpcFNlcnZpY2UgfSBmcm9tICcuLi90b29sdGlwJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHByb3ZpZGVyczogW1Rvb2x0aXBTZXJ2aWNlXSxcclxuICBzZWxlY3RvcjogJ25neC1jaGFydHMtY2hhcnQnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwibmd4LWNoYXJ0cy1vdXRlclwiIFtzdHlsZS53aWR0aC5weF09XCJ2aWV3WzBdXCIgW0BhbmltYXRpb25TdGF0ZV09XCInYWN0aXZlJ1wiIFtALmRpc2FibGVkXT1cIiFhbmltYXRpb25zXCI+XHJcbiAgICAgIDxzdmcgY2xhc3M9XCJuZ3gtY2hhcnRzXCIgW2F0dHIud2lkdGhdPVwiY2hhcnRXaWR0aFwiIFthdHRyLmhlaWdodF09XCJ2aWV3WzFdXCI+XHJcbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgICA8L3N2Zz5cclxuICAgICAgPG5neC1jaGFydHMtc2NhbGUtbGVnZW5kXHJcbiAgICAgICAgKm5nSWY9XCJzaG93TGVnZW5kICYmIGxlZ2VuZFR5cGUgPT09ICdzY2FsZUxlZ2VuZCdcIlxyXG4gICAgICAgIGNsYXNzPVwiY2hhcnQtbGVnZW5kXCJcclxuICAgICAgICBbaG9yaXpvbnRhbF09XCJsZWdlbmRPcHRpb25zICYmIGxlZ2VuZE9wdGlvbnMucG9zaXRpb24gPT09ICdiZWxvdydcIlxyXG4gICAgICAgIFt2YWx1ZVJhbmdlXT1cImxlZ2VuZE9wdGlvbnMuZG9tYWluXCJcclxuICAgICAgICBbY29sb3JzXT1cImxlZ2VuZE9wdGlvbnMuY29sb3JzXCJcclxuICAgICAgICBbaGVpZ2h0XT1cInZpZXdbMV1cIlxyXG4gICAgICAgIFt3aWR0aF09XCJsZWdlbmRXaWR0aFwiXHJcbiAgICAgID5cclxuICAgICAgPC9uZ3gtY2hhcnRzLXNjYWxlLWxlZ2VuZD5cclxuICAgICAgPG5neC1jaGFydHMtbGVnZW5kXHJcbiAgICAgICAgKm5nSWY9XCJzaG93TGVnZW5kICYmIGxlZ2VuZFR5cGUgPT09ICdsZWdlbmQnXCJcclxuICAgICAgICBjbGFzcz1cImNoYXJ0LWxlZ2VuZFwiXHJcbiAgICAgICAgW2hvcml6b250YWxdPVwibGVnZW5kT3B0aW9ucyAmJiBsZWdlbmRPcHRpb25zLnBvc2l0aW9uID09PSAnYmVsb3cnXCJcclxuICAgICAgICBbZGF0YV09XCJsZWdlbmRPcHRpb25zLmRvbWFpblwiXHJcbiAgICAgICAgW3RpdGxlXT1cImxlZ2VuZE9wdGlvbnMudGl0bGVcIlxyXG4gICAgICAgIFtjb2xvcnNdPVwibGVnZW5kT3B0aW9ucy5jb2xvcnNcIlxyXG4gICAgICAgIFtoZWlnaHRdPVwidmlld1sxXVwiXHJcbiAgICAgICAgW3dpZHRoXT1cImxlZ2VuZFdpZHRoXCJcclxuICAgICAgICBbYWN0aXZlRW50cmllc109XCJhY3RpdmVFbnRyaWVzXCJcclxuICAgICAgICAobGFiZWxDbGljayk9XCJsZWdlbmRMYWJlbENsaWNrLmVtaXQoJGV2ZW50KVwiXHJcbiAgICAgICAgKGxhYmVsQWN0aXZhdGUpPVwibGVnZW5kTGFiZWxBY3RpdmF0ZS5lbWl0KCRldmVudClcIlxyXG4gICAgICAgIChsYWJlbERlYWN0aXZhdGUpPVwibGVnZW5kTGFiZWxEZWFjdGl2YXRlLmVtaXQoJGV2ZW50KVwiXHJcbiAgICAgID5cclxuICAgICAgPC9uZ3gtY2hhcnRzLWxlZ2VuZD5cclxuICAgIDwvZGl2PlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgYW5pbWF0aW9uczogW1xyXG4gICAgdHJpZ2dlcignYW5pbWF0aW9uU3RhdGUnLCBbXHJcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtzdHlsZSh7IG9wYWNpdHk6IDAgfSksIGFuaW1hdGUoJzUwMG1zIDEwMG1zJywgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKV0pXHJcbiAgICBdKVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIENoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSB2aWV3O1xyXG4gIEBJbnB1dCgpIHNob3dMZWdlbmQgPSBmYWxzZTtcclxuICBASW5wdXQoKSBsZWdlbmRPcHRpb25zOiBhbnk7XHJcblxyXG4gIC8vIHJlbW92ZVxyXG4gIEBJbnB1dCgpIGRhdGE7XHJcbiAgQElucHV0KCkgbGVnZW5kRGF0YTtcclxuICBASW5wdXQoKSBsZWdlbmRUeXBlOiBhbnk7XHJcbiAgQElucHV0KCkgY29sb3JzOiBhbnk7XHJcbiAgQElucHV0KCkgYWN0aXZlRW50cmllczogYW55W107XHJcbiAgQElucHV0KCkgYW5pbWF0aW9uczogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBPdXRwdXQoKSBsZWdlbmRMYWJlbENsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgbGVnZW5kTGFiZWxBY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGxlZ2VuZExhYmVsRGVhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNoYXJ0V2lkdGg6IGFueTtcclxuICB0aXRsZTogYW55O1xyXG4gIGxlZ2VuZFdpZHRoOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdmNyOiBWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIHRvb2x0aXBTZXJ2aWNlOiBUb29sdGlwU2VydmljZSkge1xyXG4gICAgLy8gdGhpcy50b29sdGlwU2VydmljZS5pbmplY3Rpb25TZXJ2aWNlLnNldFJvb3RWaWV3Q29udGFpbmVyKHRoaXMudmNyKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICBsZXQgbGVnZW5kQ29sdW1ucyA9IDA7XHJcbiAgICBpZiAodGhpcy5zaG93TGVnZW5kKSB7XHJcbiAgICAgIHRoaXMubGVnZW5kVHlwZSA9IHRoaXMuZ2V0TGVnZW5kVHlwZSgpO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLmxlZ2VuZE9wdGlvbnMgfHwgdGhpcy5sZWdlbmRPcHRpb25zLnBvc2l0aW9uID09PSAncmlnaHQnKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubGVnZW5kVHlwZSA9PT0gJ3NjYWxlTGVnZW5kJykge1xyXG4gICAgICAgICAgbGVnZW5kQ29sdW1ucyA9IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGxlZ2VuZENvbHVtbnMgPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNoYXJ0Q29sdW1ucyA9IDEyIC0gbGVnZW5kQ29sdW1ucztcclxuXHJcbiAgICB0aGlzLmNoYXJ0V2lkdGggPSBNYXRoLmZsb29yKCh0aGlzLnZpZXdbMF0gKiBjaGFydENvbHVtbnMpIC8gMTIuMCk7XHJcbiAgICB0aGlzLmxlZ2VuZFdpZHRoID1cclxuICAgICAgIXRoaXMubGVnZW5kT3B0aW9ucyB8fCB0aGlzLmxlZ2VuZE9wdGlvbnMucG9zaXRpb24gPT09ICdyaWdodCdcclxuICAgICAgICA/IE1hdGguZmxvb3IoKHRoaXMudmlld1swXSAqIGxlZ2VuZENvbHVtbnMpIC8gMTIuMClcclxuICAgICAgICA6IHRoaXMuY2hhcnRXaWR0aDtcclxuICB9XHJcblxyXG4gIGdldExlZ2VuZFR5cGUoKTogc3RyaW5nIHtcclxuICAgIGlmICh0aGlzLmxlZ2VuZE9wdGlvbnMuc2NhbGVUeXBlID09PSAnbGluZWFyJykge1xyXG4gICAgICByZXR1cm4gJ3NjYWxlTGVnZW5kJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAnbGVnZW5kJztcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19