import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { YAxisTicksComponent } from './y-axis-ticks.component';
var YAxisComponent = /** @class */ (function () {
    function YAxisComponent() {
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
    YAxisComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    YAxisComponent.prototype.update = function () {
        this.offset = -(this.yAxisOffset + this.padding);
        if (this.yOrient === 'right') {
            this.labelOffset = 65;
            this.transform = "translate(" + (this.offset + this.dims.width) + " , 0)";
        }
        else {
            this.offset = this.offset;
            this.transform = "translate(" + this.offset + " , 0)";
        }
        if (this.yAxisTickCount !== undefined) {
            this.tickArguments = [this.yAxisTickCount];
        }
    };
    YAxisComponent.prototype.emitTicksWidth = function (_a) {
        var _this = this;
        var width = _a.width;
        if (width !== this.labelOffset && this.yOrient === 'right') {
            this.labelOffset = width + this.labelOffset;
            setTimeout(function () {
                _this.dimensionsChanged.emit({ width: width });
            }, 0);
        }
        else if (width !== this.labelOffset) {
            this.labelOffset = width;
            setTimeout(function () {
                _this.dimensionsChanged.emit({ width: width });
            }, 0);
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
            template: "\n    <svg:g [attr.class]=\"yAxisClassName\" [attr.transform]=\"transform\">\n      <svg:g\n        ngx-charts-y-axis-ticks\n        *ngIf=\"yScale\"\n        [trimTicks]=\"trimTicks\"\n        [maxTickLength]=\"maxTickLength\"\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickValues]=\"ticks\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"yScale\"\n        [scaleType]=\"scaleType\"\n        [orient]=\"yOrient\"\n        [showGridLines]=\"showGridLines\"\n        [gridLineWidth]=\"dims.width\"\n        [referenceLines]=\"referenceLines\"\n        [showRefLines]=\"showRefLines\"\n        [showRefLabels]=\"showRefLabels\"\n        [height]=\"dims.height\"\n        (dimensionsChanged)=\"emitTicksWidth($event)\"\n      />\n\n      <svg:g\n        ngx-charts-axis-label\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"labelOffset\"\n        [orient]=\"yOrient\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\"    \n      ></svg:g>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], YAxisComponent);
    return YAxisComponent;
}());
export { YAxisComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieS1heGlzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9heGVzL3ktYXhpcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBRVosU0FBUyxFQUVULHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQXdDL0Q7SUFBQTtRQVFXLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBS3RCLFlBQU8sR0FBVyxNQUFNLENBQUM7UUFJekIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFDdkIsc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVqRCxtQkFBYyxHQUFXLFFBQVEsQ0FBQztRQUlsQyxnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixTQUFJLEdBQVcsTUFBTSxDQUFDO1FBQ3RCLFdBQU0sR0FBVyxNQUFNLENBQUM7UUFDeEIsZUFBVSxHQUFXLE1BQU0sQ0FBQztRQUM1QixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixZQUFPLEdBQVcsQ0FBQyxDQUFDO0lBb0N0QixDQUFDO0lBaENDLG9DQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELCtCQUFNLEdBQU47UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUFFO1lBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsZ0JBQWEsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssV0FBTyxDQUFDO1NBQ3BFO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxlQUFhLElBQUksQ0FBQyxNQUFNLFVBQU8sQ0FBQztTQUNsRDtRQUVELElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxTQUFTLEVBQUU7WUFDckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUM1QztJQUNILENBQUM7SUFFRCx1Q0FBYyxHQUFkLFVBQWUsRUFBUztRQUF4QixpQkFZQztZQVpnQixnQkFBSztRQUNwQixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUFFO1lBQzFELElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDNUMsVUFBVSxDQUFDO2dCQUNULEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLE9BQUEsRUFBRSxDQUFDLENBQUM7WUFDekMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ1A7YUFBTSxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLFVBQVUsQ0FBQztnQkFDVCxLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxPQUFBLEVBQUUsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNQO0lBQ0gsQ0FBQztJQS9EUTtRQUFSLEtBQUssRUFBRTtrREFBUTtJQUNQO1FBQVIsS0FBSyxFQUFFO3FEQUFXO0lBQ1Y7UUFBUixLQUFLLEVBQUU7Z0RBQU07SUFDTDtRQUFSLEtBQUssRUFBRTtxREFBb0I7SUFDbkI7UUFBUixLQUFLLEVBQUU7eURBQXVCO0lBQ3RCO1FBQVIsS0FBSyxFQUFFOzBEQUFnQjtJQUNmO1FBQVIsS0FBSyxFQUFFO2lEQUFjO0lBQ2I7UUFBUixLQUFLLEVBQUU7eURBQXVCO0lBQ3RCO1FBQVIsS0FBSyxFQUFFO3FEQUFXO0lBQ1Y7UUFBUixLQUFLLEVBQUU7cURBQVc7SUFDVjtRQUFSLEtBQUssRUFBRTs2REFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7MERBQXFCO0lBQ3BCO1FBQVIsS0FBSyxFQUFFO21EQUEwQjtJQUN6QjtRQUFSLEtBQUssRUFBRTswREFBZ0I7SUFDZjtRQUFSLEtBQUssRUFBRTt3REFBYztJQUNiO1FBQVIsS0FBSyxFQUFFO3lEQUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7dURBQXlCO0lBQ3ZCO1FBQVQsTUFBTSxFQUFFOzZEQUF3QztJQWFqQjtRQUEvQixTQUFTLENBQUMsbUJBQW1CLENBQUM7MERBQXFDO0lBL0J6RCxjQUFjO1FBdEMxQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLFFBQVEsRUFBRSwyaUNBaUNUO1lBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQztPQUNXLGNBQWMsQ0FpRTFCO0lBQUQscUJBQUM7Q0FBQSxBQWpFRCxJQWlFQztTQWpFWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFlBeGlzVGlja3NDb21wb25lbnQgfSBmcm9tICcuL3ktYXhpcy10aWNrcy5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMteS1heGlzXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpnIFthdHRyLmNsYXNzXT1cInlBeGlzQ2xhc3NOYW1lXCIgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybVwiPlxuICAgICAgPHN2ZzpnXG4gICAgICAgIG5neC1jaGFydHMteS1heGlzLXRpY2tzXG4gICAgICAgICpuZ0lmPVwieVNjYWxlXCJcbiAgICAgICAgW3RyaW1UaWNrc109XCJ0cmltVGlja3NcIlxuICAgICAgICBbbWF4VGlja0xlbmd0aF09XCJtYXhUaWNrTGVuZ3RoXCJcbiAgICAgICAgW3RpY2tGb3JtYXR0aW5nXT1cInRpY2tGb3JtYXR0aW5nXCJcbiAgICAgICAgW3RpY2tBcmd1bWVudHNdPVwidGlja0FyZ3VtZW50c1wiXG4gICAgICAgIFt0aWNrVmFsdWVzXT1cInRpY2tzXCJcbiAgICAgICAgW3RpY2tTdHJva2VdPVwidGlja1N0cm9rZVwiXG4gICAgICAgIFtzY2FsZV09XCJ5U2NhbGVcIlxuICAgICAgICBbc2NhbGVUeXBlXT1cInNjYWxlVHlwZVwiXG4gICAgICAgIFtvcmllbnRdPVwieU9yaWVudFwiXG4gICAgICAgIFtzaG93R3JpZExpbmVzXT1cInNob3dHcmlkTGluZXNcIlxuICAgICAgICBbZ3JpZExpbmVXaWR0aF09XCJkaW1zLndpZHRoXCJcbiAgICAgICAgW3JlZmVyZW5jZUxpbmVzXT1cInJlZmVyZW5jZUxpbmVzXCJcbiAgICAgICAgW3Nob3dSZWZMaW5lc109XCJzaG93UmVmTGluZXNcIlxuICAgICAgICBbc2hvd1JlZkxhYmVsc109XCJzaG93UmVmTGFiZWxzXCJcbiAgICAgICAgW2hlaWdodF09XCJkaW1zLmhlaWdodFwiXG4gICAgICAgIChkaW1lbnNpb25zQ2hhbmdlZCk9XCJlbWl0VGlja3NXaWR0aCgkZXZlbnQpXCJcbiAgICAgIC8+XG5cbiAgICAgIDxzdmc6Z1xuICAgICAgICBuZ3gtY2hhcnRzLWF4aXMtbGFiZWxcbiAgICAgICAgKm5nSWY9XCJzaG93TGFiZWxcIlxuICAgICAgICBbbGFiZWxdPVwibGFiZWxUZXh0XCJcbiAgICAgICAgW29mZnNldF09XCJsYWJlbE9mZnNldFwiXG4gICAgICAgIFtvcmllbnRdPVwieU9yaWVudFwiXG4gICAgICAgIFtoZWlnaHRdPVwiZGltcy5oZWlnaHRcIlxuICAgICAgICBbd2lkdGhdPVwiZGltcy53aWR0aFwiICAgIFxuICAgICAgPjwvc3ZnOmc+XG4gICAgPC9zdmc6Zz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgWUF4aXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSB5U2NhbGU7XG4gIEBJbnB1dCgpIHNjYWxlVHlwZTtcbiAgQElucHV0KCkgZGltcztcbiAgQElucHV0KCkgdHJpbVRpY2tzOiBib29sZWFuO1xuICBASW5wdXQoKSBtYXhUaWNrTGVuZ3RoOiBudW1iZXI7XG4gIEBJbnB1dCgpIHRpY2tGb3JtYXR0aW5nO1xuICBASW5wdXQoKSB0aWNrczogYW55W107XG4gIEBJbnB1dCgpIHNob3dHcmlkTGluZXMgPSBmYWxzZTtcbiAgQElucHV0KCkgc2hvd0xhYmVsO1xuICBASW5wdXQoKSBsYWJlbFRleHQ7XG4gIEBJbnB1dCgpIHlBeGlzVGlja0ludGVydmFsO1xuICBASW5wdXQoKSB5QXhpc1RpY2tDb3VudDogYW55O1xuICBASW5wdXQoKSB5T3JpZW50OiBzdHJpbmcgPSAnbGVmdCc7XG4gIEBJbnB1dCgpIHJlZmVyZW5jZUxpbmVzO1xuICBASW5wdXQoKSBzaG93UmVmTGluZXM7XG4gIEBJbnB1dCgpIHNob3dSZWZMYWJlbHM7XG4gIEBJbnB1dCgpIHlBeGlzT2Zmc2V0OiBudW1iZXIgPSAwO1xuICBAT3V0cHV0KCkgZGltZW5zaW9uc0NoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgeUF4aXNDbGFzc05hbWU6IHN0cmluZyA9ICd5IGF4aXMnO1xuICB0aWNrQXJndW1lbnRzOiBhbnk7XG4gIG9mZnNldDogYW55O1xuICB0cmFuc2Zvcm06IGFueTtcbiAgbGFiZWxPZmZzZXQ6IG51bWJlciA9IDE1O1xuICBmaWxsOiBzdHJpbmcgPSAnbm9uZSc7XG4gIHN0cm9rZTogc3RyaW5nID0gJyNDQ0MnO1xuICB0aWNrU3Ryb2tlOiBzdHJpbmcgPSAnI0NDQyc7XG4gIHN0cm9rZVdpZHRoOiBudW1iZXIgPSAxO1xuICBwYWRkaW5nOiBudW1iZXIgPSA1O1xuXG4gIEBWaWV3Q2hpbGQoWUF4aXNUaWNrc0NvbXBvbmVudCkgdGlja3NDb21wb25lbnQ6IFlBeGlzVGlja3NDb21wb25lbnQ7XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5vZmZzZXQgPSAtKHRoaXMueUF4aXNPZmZzZXQgKyB0aGlzLnBhZGRpbmcpO1xuICAgIGlmICh0aGlzLnlPcmllbnQgPT09ICdyaWdodCcpIHtcbiAgICAgIHRoaXMubGFiZWxPZmZzZXQgPSA2NTtcbiAgICAgIHRoaXMudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3RoaXMub2Zmc2V0ICsgdGhpcy5kaW1zLndpZHRofSAsIDApYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICAgIHRoaXMudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3RoaXMub2Zmc2V0fSAsIDApYDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy55QXhpc1RpY2tDb3VudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnRpY2tBcmd1bWVudHMgPSBbdGhpcy55QXhpc1RpY2tDb3VudF07XG4gICAgfVxuICB9XG5cbiAgZW1pdFRpY2tzV2lkdGgoeyB3aWR0aCB9KTogdm9pZCB7XG4gICAgaWYgKHdpZHRoICE9PSB0aGlzLmxhYmVsT2Zmc2V0ICYmIHRoaXMueU9yaWVudCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgdGhpcy5sYWJlbE9mZnNldCA9IHdpZHRoICsgdGhpcy5sYWJlbE9mZnNldDtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmRpbWVuc2lvbnNDaGFuZ2VkLmVtaXQoeyB3aWR0aCB9KTtcbiAgICAgIH0sIDApO1xuICAgIH0gZWxzZSBpZiAod2lkdGggIT09IHRoaXMubGFiZWxPZmZzZXQpIHtcbiAgICAgIHRoaXMubGFiZWxPZmZzZXQgPSB3aWR0aDtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmRpbWVuc2lvbnNDaGFuZ2VkLmVtaXQoeyB3aWR0aCB9KTtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgfVxufVxuIl19