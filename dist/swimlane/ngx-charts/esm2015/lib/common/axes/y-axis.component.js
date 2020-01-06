import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { YAxisTicksComponent } from './y-axis-ticks.component';
let YAxisComponent = class YAxisComponent {
    constructor() {
        this.showGridLines = false;
        this.yOrient = 'left';
        this.yAxisOffset = 0;
        this.dimensionsChanged = new EventEmitter();
        this.yAxisClassName = 'y axis';
        this.labelOffset = 15;
        this.fill = 'none';
        this.stroke = '#CCC';
        this.tickStroke = '#CCC';
        this.strokeWidth = 1;
        this.padding = 5;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.offset = -(this.yAxisOffset + this.padding);
        if (this.yOrient === 'right') {
            this.labelOffset = 65;
            this.transform = `translate(${this.offset + this.dims.width} , 0)`;
        }
        else {
            this.offset = this.offset;
            this.transform = `translate(${this.offset} , 0)`;
        }
        if (this.yAxisTickCount !== undefined) {
            this.tickArguments = [this.yAxisTickCount];
        }
    }
    emitTicksWidth({ width }) {
        if (width !== this.labelOffset && this.yOrient === 'right') {
            this.labelOffset = width + this.labelOffset;
            setTimeout(() => {
                this.dimensionsChanged.emit({ width });
            }, 0);
        }
        else if (width !== this.labelOffset) {
            this.labelOffset = width;
            setTimeout(() => {
                this.dimensionsChanged.emit({ width });
            }, 0);
        }
    }
};
__decorate([
    Input()
], YAxisComponent.prototype, "yScale", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "scaleType", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "dims", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "trimTicks", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "maxTickLength", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "tickFormatting", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "ticks", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "showGridLines", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "showLabel", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "labelText", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "yAxisTickInterval", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "yAxisTickCount", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "yOrient", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "referenceLines", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "showRefLines", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "showRefLabels", void 0);
__decorate([
    Input()
], YAxisComponent.prototype, "yAxisOffset", void 0);
__decorate([
    Output()
], YAxisComponent.prototype, "dimensionsChanged", void 0);
__decorate([
    ViewChild(YAxisTicksComponent)
], YAxisComponent.prototype, "ticksComponent", void 0);
YAxisComponent = __decorate([
    Component({
        selector: 'g[ngx-charts-y-axis]',
        template: `
    <svg:g [attr.class]="yAxisClassName" [attr.transform]="transform">
      <svg:g
        ngx-charts-y-axis-ticks
        *ngIf="yScale"
        [trimTicks]="trimTicks"
        [maxTickLength]="maxTickLength"
        [tickFormatting]="tickFormatting"
        [tickArguments]="tickArguments"
        [tickValues]="ticks"
        [tickStroke]="tickStroke"
        [scale]="yScale"
        [scaleType]="scaleType"
        [orient]="yOrient"
        [showGridLines]="showGridLines"
        [gridLineWidth]="dims.width"
        [referenceLines]="referenceLines"
        [showRefLines]="showRefLines"
        [showRefLabels]="showRefLabels"
        [height]="dims.height"
        (dimensionsChanged)="emitTicksWidth($event)"
      />

      <svg:g
        ngx-charts-axis-label
        *ngIf="showLabel"
        [label]="labelText"
        [offset]="labelOffset"
        [orient]="yOrient"
        [height]="dims.height"
        [width]="dims.width"    
      ></svg:g>
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], YAxisComponent);
export { YAxisComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieS1heGlzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9heGVzL3ktYXhpcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBRVosU0FBUyxFQUVULHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQXdDL0QsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUEzQjtRQVFXLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBS3RCLFlBQU8sR0FBVyxNQUFNLENBQUM7UUFJekIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFDdkIsc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVqRCxtQkFBYyxHQUFXLFFBQVEsQ0FBQztRQUlsQyxnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixTQUFJLEdBQVcsTUFBTSxDQUFDO1FBQ3RCLFdBQU0sR0FBVyxNQUFNLENBQUM7UUFDeEIsZUFBVSxHQUFXLE1BQU0sQ0FBQztRQUM1QixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixZQUFPLEdBQVcsQ0FBQyxDQUFDO0lBb0N0QixDQUFDO0lBaENDLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUFFO1lBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxPQUFPLENBQUM7U0FDcEU7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLGFBQWEsSUFBSSxDQUFDLE1BQU0sT0FBTyxDQUFDO1NBQ2xEO1FBRUQsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLFNBQVMsRUFBRTtZQUNyQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzVDO0lBQ0gsQ0FBQztJQUVELGNBQWMsQ0FBQyxFQUFFLEtBQUssRUFBRTtRQUN0QixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUFFO1lBQzFELElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDNUMsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUN6QyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDUDthQUFNLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUN6QyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDUDtJQUNILENBQUM7Q0FDRixDQUFBO0FBaEVVO0lBQVIsS0FBSyxFQUFFOzhDQUFRO0FBQ1A7SUFBUixLQUFLLEVBQUU7aURBQVc7QUFDVjtJQUFSLEtBQUssRUFBRTs0Q0FBTTtBQUNMO0lBQVIsS0FBSyxFQUFFO2lEQUFvQjtBQUNuQjtJQUFSLEtBQUssRUFBRTtxREFBdUI7QUFDdEI7SUFBUixLQUFLLEVBQUU7c0RBQWdCO0FBQ2Y7SUFBUixLQUFLLEVBQUU7NkNBQWM7QUFDYjtJQUFSLEtBQUssRUFBRTtxREFBdUI7QUFDdEI7SUFBUixLQUFLLEVBQUU7aURBQVc7QUFDVjtJQUFSLEtBQUssRUFBRTtpREFBVztBQUNWO0lBQVIsS0FBSyxFQUFFO3lEQUFtQjtBQUNsQjtJQUFSLEtBQUssRUFBRTtzREFBcUI7QUFDcEI7SUFBUixLQUFLLEVBQUU7K0NBQTBCO0FBQ3pCO0lBQVIsS0FBSyxFQUFFO3NEQUFnQjtBQUNmO0lBQVIsS0FBSyxFQUFFO29EQUFjO0FBQ2I7SUFBUixLQUFLLEVBQUU7cURBQWU7QUFDZDtJQUFSLEtBQUssRUFBRTttREFBeUI7QUFDdkI7SUFBVCxNQUFNLEVBQUU7eURBQXdDO0FBYWpCO0lBQS9CLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQztzREFBcUM7QUEvQnpELGNBQWM7SUF0QzFCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxzQkFBc0I7UUFDaEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQ1Q7UUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtLQUNoRCxDQUFDO0dBQ1csY0FBYyxDQWlFMUI7U0FqRVksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBZQXhpc1RpY2tzQ29tcG9uZW50IH0gZnJvbSAnLi95LWF4aXMtdGlja3MuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLXktYXhpc10nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6ZyBbYXR0ci5jbGFzc109XCJ5QXhpc0NsYXNzTmFtZVwiIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIj5cbiAgICAgIDxzdmc6Z1xuICAgICAgICBuZ3gtY2hhcnRzLXktYXhpcy10aWNrc1xuICAgICAgICAqbmdJZj1cInlTY2FsZVwiXG4gICAgICAgIFt0cmltVGlja3NdPVwidHJpbVRpY2tzXCJcbiAgICAgICAgW21heFRpY2tMZW5ndGhdPVwibWF4VGlja0xlbmd0aFwiXG4gICAgICAgIFt0aWNrRm9ybWF0dGluZ109XCJ0aWNrRm9ybWF0dGluZ1wiXG4gICAgICAgIFt0aWNrQXJndW1lbnRzXT1cInRpY2tBcmd1bWVudHNcIlxuICAgICAgICBbdGlja1ZhbHVlc109XCJ0aWNrc1wiXG4gICAgICAgIFt0aWNrU3Ryb2tlXT1cInRpY2tTdHJva2VcIlxuICAgICAgICBbc2NhbGVdPVwieVNjYWxlXCJcbiAgICAgICAgW3NjYWxlVHlwZV09XCJzY2FsZVR5cGVcIlxuICAgICAgICBbb3JpZW50XT1cInlPcmllbnRcIlxuICAgICAgICBbc2hvd0dyaWRMaW5lc109XCJzaG93R3JpZExpbmVzXCJcbiAgICAgICAgW2dyaWRMaW5lV2lkdGhdPVwiZGltcy53aWR0aFwiXG4gICAgICAgIFtyZWZlcmVuY2VMaW5lc109XCJyZWZlcmVuY2VMaW5lc1wiXG4gICAgICAgIFtzaG93UmVmTGluZXNdPVwic2hvd1JlZkxpbmVzXCJcbiAgICAgICAgW3Nob3dSZWZMYWJlbHNdPVwic2hvd1JlZkxhYmVsc1wiXG4gICAgICAgIFtoZWlnaHRdPVwiZGltcy5oZWlnaHRcIlxuICAgICAgICAoZGltZW5zaW9uc0NoYW5nZWQpPVwiZW1pdFRpY2tzV2lkdGgoJGV2ZW50KVwiXG4gICAgICAvPlxuXG4gICAgICA8c3ZnOmdcbiAgICAgICAgbmd4LWNoYXJ0cy1heGlzLWxhYmVsXG4gICAgICAgICpuZ0lmPVwic2hvd0xhYmVsXCJcbiAgICAgICAgW2xhYmVsXT1cImxhYmVsVGV4dFwiXG4gICAgICAgIFtvZmZzZXRdPVwibGFiZWxPZmZzZXRcIlxuICAgICAgICBbb3JpZW50XT1cInlPcmllbnRcIlxuICAgICAgICBbaGVpZ2h0XT1cImRpbXMuaGVpZ2h0XCJcbiAgICAgICAgW3dpZHRoXT1cImRpbXMud2lkdGhcIiAgICBcbiAgICAgID48L3N2ZzpnPlxuICAgIDwvc3ZnOmc+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFlBeGlzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgeVNjYWxlO1xuICBASW5wdXQoKSBzY2FsZVR5cGU7XG4gIEBJbnB1dCgpIGRpbXM7XG4gIEBJbnB1dCgpIHRyaW1UaWNrczogYm9vbGVhbjtcbiAgQElucHV0KCkgbWF4VGlja0xlbmd0aDogbnVtYmVyO1xuICBASW5wdXQoKSB0aWNrRm9ybWF0dGluZztcbiAgQElucHV0KCkgdGlja3M6IGFueVtdO1xuICBASW5wdXQoKSBzaG93R3JpZExpbmVzID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNob3dMYWJlbDtcbiAgQElucHV0KCkgbGFiZWxUZXh0O1xuICBASW5wdXQoKSB5QXhpc1RpY2tJbnRlcnZhbDtcbiAgQElucHV0KCkgeUF4aXNUaWNrQ291bnQ6IGFueTtcbiAgQElucHV0KCkgeU9yaWVudDogc3RyaW5nID0gJ2xlZnQnO1xuICBASW5wdXQoKSByZWZlcmVuY2VMaW5lcztcbiAgQElucHV0KCkgc2hvd1JlZkxpbmVzO1xuICBASW5wdXQoKSBzaG93UmVmTGFiZWxzO1xuICBASW5wdXQoKSB5QXhpc09mZnNldDogbnVtYmVyID0gMDtcbiAgQE91dHB1dCgpIGRpbWVuc2lvbnNDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHlBeGlzQ2xhc3NOYW1lOiBzdHJpbmcgPSAneSBheGlzJztcbiAgdGlja0FyZ3VtZW50czogYW55O1xuICBvZmZzZXQ6IGFueTtcbiAgdHJhbnNmb3JtOiBhbnk7XG4gIGxhYmVsT2Zmc2V0OiBudW1iZXIgPSAxNTtcbiAgZmlsbDogc3RyaW5nID0gJ25vbmUnO1xuICBzdHJva2U6IHN0cmluZyA9ICcjQ0NDJztcbiAgdGlja1N0cm9rZTogc3RyaW5nID0gJyNDQ0MnO1xuICBzdHJva2VXaWR0aDogbnVtYmVyID0gMTtcbiAgcGFkZGluZzogbnVtYmVyID0gNTtcblxuICBAVmlld0NoaWxkKFlBeGlzVGlja3NDb21wb25lbnQpIHRpY2tzQ29tcG9uZW50OiBZQXhpc1RpY2tzQ29tcG9uZW50O1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMub2Zmc2V0ID0gLSh0aGlzLnlBeGlzT2Zmc2V0ICsgdGhpcy5wYWRkaW5nKTtcbiAgICBpZiAodGhpcy55T3JpZW50ID09PSAncmlnaHQnKSB7XG4gICAgICB0aGlzLmxhYmVsT2Zmc2V0ID0gNjU7XG4gICAgICB0aGlzLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt0aGlzLm9mZnNldCArIHRoaXMuZGltcy53aWR0aH0gLCAwKWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICB0aGlzLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt0aGlzLm9mZnNldH0gLCAwKWA7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMueUF4aXNUaWNrQ291bnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy50aWNrQXJndW1lbnRzID0gW3RoaXMueUF4aXNUaWNrQ291bnRdO1xuICAgIH1cbiAgfVxuXG4gIGVtaXRUaWNrc1dpZHRoKHsgd2lkdGggfSk6IHZvaWQge1xuICAgIGlmICh3aWR0aCAhPT0gdGhpcy5sYWJlbE9mZnNldCAmJiB0aGlzLnlPcmllbnQgPT09ICdyaWdodCcpIHtcbiAgICAgIHRoaXMubGFiZWxPZmZzZXQgPSB3aWR0aCArIHRoaXMubGFiZWxPZmZzZXQ7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5kaW1lbnNpb25zQ2hhbmdlZC5lbWl0KHsgd2lkdGggfSk7XG4gICAgICB9LCAwKTtcbiAgICB9IGVsc2UgaWYgKHdpZHRoICE9PSB0aGlzLmxhYmVsT2Zmc2V0KSB7XG4gICAgICB0aGlzLmxhYmVsT2Zmc2V0ID0gd2lkdGg7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5kaW1lbnNpb25zQ2hhbmdlZC5lbWl0KHsgd2lkdGggfSk7XG4gICAgICB9LCAwKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==