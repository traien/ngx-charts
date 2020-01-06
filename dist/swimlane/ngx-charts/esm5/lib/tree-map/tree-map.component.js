import { __decorate, __extends, __read, __spread } from "tslib";
import { Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { treemap, stratify } from 'd3-hierarchy';
import { BaseChartComponent } from '../common/base-chart.component';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
var TreeMapComponent = /** @class */ (function (_super) {
    __extends(TreeMapComponent, _super);
    function TreeMapComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tooltipDisabled = false;
        _this.gradient = false;
        _this.select = new EventEmitter();
        _this.margin = [10, 10, 10, 10];
        return _this;
    }
    TreeMapComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin
        });
        this.domain = this.getDomain();
        this.treemap = treemap().size([this.dims.width, this.dims.height]);
        var rootNode = {
            name: 'root',
            value: 0,
            isRoot: true
        };
        var root = stratify()
            .id(function (d) {
            var label = d.name;
            if (label.constructor.name === 'Date') {
                label = label.toLocaleDateString();
            }
            else {
                label = label.toLocaleString();
            }
            return label;
        })
            .parentId(function (d) { return (d.isRoot ? null : 'root'); })(__spread([rootNode], this.results))
            .sum(function (d) { return d.value; });
        this.data = this.treemap(root);
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    TreeMapComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    TreeMapComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    TreeMapComponent.prototype.setColors = function () {
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    __decorate([
        Input()
    ], TreeMapComponent.prototype, "results", void 0);
    __decorate([
        Input()
    ], TreeMapComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input()
    ], TreeMapComponent.prototype, "valueFormatting", void 0);
    __decorate([
        Input()
    ], TreeMapComponent.prototype, "labelFormatting", void 0);
    __decorate([
        Input()
    ], TreeMapComponent.prototype, "gradient", void 0);
    __decorate([
        Output()
    ], TreeMapComponent.prototype, "select", void 0);
    __decorate([
        ContentChild('tooltipTemplate')
    ], TreeMapComponent.prototype, "tooltipTemplate", void 0);
    TreeMapComponent = __decorate([
        Component({
            selector: 'ngx-charts-tree-map',
            template: "\n    <ngx-charts-chart [view]=\"[width, height]\" [showLegend]=\"false\" [animations]=\"animations\">\n      <svg:g [attr.transform]=\"transform\" class=\"tree-map chart\">\n        <svg:g\n          ngx-charts-tree-map-cell-series\n          [colors]=\"colors\"\n          [data]=\"data\"\n          [dims]=\"dims\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [valueFormatting]=\"valueFormatting\"\n          [labelFormatting]=\"labelFormatting\"\n          [gradient]=\"gradient\"\n          [animations]=\"animations\"\n          (select)=\"onClick($event)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".tree-map .treemap-val{font-size:1.3em;padding-top:5px;display:inline-block}.tree-map .treemap-label p{display:table-cell;text-align:center;line-height:1.2em;vertical-align:middle}"]
        })
    ], TreeMapComponent);
    return TreeMapComponent;
}(BaseChartComponent));
export { TreeMapComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1tYXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvdHJlZS1tYXAvdHJlZS1tYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsWUFBWSxFQUViLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRWpELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQTJCckQ7SUFBc0Msb0NBQWtCO0lBQXhEO1FBQUEscUVBc0VDO1FBcEVVLHFCQUFlLEdBQVksS0FBSyxDQUFDO1FBR2pDLGNBQVEsR0FBWSxLQUFLLENBQUM7UUFFekIsWUFBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFVdEMsWUFBTSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7O0lBcUQ1QixDQUFDO0lBbkRDLGlDQUFNLEdBQU47UUFDRSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUVmLElBQUksQ0FBQyxJQUFJLEdBQUcsdUJBQXVCLENBQUM7WUFDbEMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDckIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLEVBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFFeEUsSUFBTSxRQUFRLEdBQUc7WUFDZixJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSxDQUFDO1lBQ1IsTUFBTSxFQUFFLElBQUk7U0FDYixDQUFDO1FBRUYsSUFBTSxJQUFJLEdBQUcsUUFBUSxFQUFPO2FBQ3pCLEVBQUUsQ0FBQyxVQUFBLENBQUM7WUFDSCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBRW5CLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO2dCQUNyQyxLQUFLLEdBQUcsS0FBSyxDQUFDLGtCQUFrQixFQUFFLENBQUM7YUFDcEM7aUJBQU07Z0JBQ0wsS0FBSyxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUNoQztZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUFDO2FBQ0QsUUFBUSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUExQixDQUEwQixDQUFDLFdBQUUsUUFBUSxHQUFLLElBQUksQ0FBQyxPQUFPLEVBQUU7YUFDdEUsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssRUFBUCxDQUFPLENBQUMsQ0FBQztRQUVyQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFL0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyxTQUFTLEdBQUcsZUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFHLENBQUM7SUFDekUsQ0FBQztJQUVELG9DQUFTLEdBQVQ7UUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksRUFBTixDQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsa0NBQU8sR0FBUCxVQUFRLElBQUk7UUFDVixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsb0NBQVMsR0FBVDtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQXBFUTtRQUFSLEtBQUssRUFBRTtxREFBUztJQUNSO1FBQVIsS0FBSyxFQUFFOzZEQUFrQztJQUNqQztRQUFSLEtBQUssRUFBRTs2REFBc0I7SUFDckI7UUFBUixLQUFLLEVBQUU7NkRBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFO3NEQUEyQjtJQUV6QjtRQUFULE1BQU0sRUFBRTtvREFBNkI7SUFFTDtRQUFoQyxZQUFZLENBQUMsaUJBQWlCLENBQUM7NkRBQW1DO0lBVHhELGdCQUFnQjtRQXpCNUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixRQUFRLEVBQUUsOHFCQWtCVDtZQUVELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNoRCxDQUFDO09BQ1csZ0JBQWdCLENBc0U1QjtJQUFELHVCQUFDO0NBQUEsQUF0RUQsQ0FBc0Msa0JBQWtCLEdBc0V2RDtTQXRFWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBUZW1wbGF0ZVJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyB0cmVlbWFwLCBzdHJhdGlmeSB9IGZyb20gJ2QzLWhpZXJhcmNoeSc7XHJcblxyXG5pbXBvcnQgeyBCYXNlQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuLi9jb21tb24vYmFzZS1jaGFydC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucyB9IGZyb20gJy4uL2NvbW1vbi92aWV3LWRpbWVuc2lvbnMuaGVscGVyJztcclxuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY29sb3IuaGVscGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LWNoYXJ0cy10cmVlLW1hcCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZ3gtY2hhcnRzLWNoYXJ0IFt2aWV3XT1cIlt3aWR0aCwgaGVpZ2h0XVwiIFtzaG93TGVnZW5kXT1cImZhbHNlXCIgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiPlxyXG4gICAgICA8c3ZnOmcgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybVwiIGNsYXNzPVwidHJlZS1tYXAgY2hhcnRcIj5cclxuICAgICAgICA8c3ZnOmdcclxuICAgICAgICAgIG5neC1jaGFydHMtdHJlZS1tYXAtY2VsbC1zZXJpZXNcclxuICAgICAgICAgIFtjb2xvcnNdPVwiY29sb3JzXCJcclxuICAgICAgICAgIFtkYXRhXT1cImRhdGFcIlxyXG4gICAgICAgICAgW2RpbXNdPVwiZGltc1wiXHJcbiAgICAgICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXHJcbiAgICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXHJcbiAgICAgICAgICBbdmFsdWVGb3JtYXR0aW5nXT1cInZhbHVlRm9ybWF0dGluZ1wiXHJcbiAgICAgICAgICBbbGFiZWxGb3JtYXR0aW5nXT1cImxhYmVsRm9ybWF0dGluZ1wiXHJcbiAgICAgICAgICBbZ3JhZGllbnRdPVwiZ3JhZGllbnRcIlxyXG4gICAgICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgICAgICAoc2VsZWN0KT1cIm9uQ2xpY2soJGV2ZW50KVwiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9zdmc6Zz5cclxuICAgIDwvbmd4LWNoYXJ0cy1jaGFydD5cclxuICBgLFxyXG4gIHN0eWxlVXJsczogWycuL3RyZWUtbWFwLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVHJlZU1hcENvbXBvbmVudCBleHRlbmRzIEJhc2VDaGFydENvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgcmVzdWx0cztcclxuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSB2YWx1ZUZvcm1hdHRpbmc6IGFueTtcclxuICBASW5wdXQoKSBsYWJlbEZvcm1hdHRpbmc6IGFueTtcclxuICBASW5wdXQoKSBncmFkaWVudDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBAQ29udGVudENoaWxkKCd0b29sdGlwVGVtcGxhdGUnKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIGRpbXM6IGFueTtcclxuICBkb21haW46IGFueTtcclxuICB0cmFuc2Zvcm06IGFueTtcclxuICBjb2xvcnM6IENvbG9ySGVscGVyO1xyXG4gIHRyZWVtYXA6IGFueTtcclxuICBkYXRhOiBhbnk7XHJcbiAgbWFyZ2luID0gWzEwLCAxMCwgMTAsIDEwXTtcclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgc3VwZXIudXBkYXRlKCk7XHJcblxyXG4gICAgdGhpcy5kaW1zID0gY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMoe1xyXG4gICAgICB3aWR0aDogdGhpcy53aWR0aCxcclxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcclxuICAgICAgbWFyZ2luczogdGhpcy5tYXJnaW5cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZG9tYWluID0gdGhpcy5nZXREb21haW4oKTtcclxuXHJcbiAgICB0aGlzLnRyZWVtYXAgPSB0cmVlbWFwPGFueT4oKS5zaXplKFt0aGlzLmRpbXMud2lkdGgsIHRoaXMuZGltcy5oZWlnaHRdKTtcclxuXHJcbiAgICBjb25zdCByb290Tm9kZSA9IHtcclxuICAgICAgbmFtZTogJ3Jvb3QnLFxyXG4gICAgICB2YWx1ZTogMCxcclxuICAgICAgaXNSb290OiB0cnVlXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJvb3QgPSBzdHJhdGlmeTxhbnk+KClcclxuICAgICAgLmlkKGQgPT4ge1xyXG4gICAgICAgIGxldCBsYWJlbCA9IGQubmFtZTtcclxuXHJcbiAgICAgICAgaWYgKGxhYmVsLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdEYXRlJykge1xyXG4gICAgICAgICAgbGFiZWwgPSBsYWJlbC50b0xvY2FsZURhdGVTdHJpbmcoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbGFiZWwgPSBsYWJlbC50b0xvY2FsZVN0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGFiZWw7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5wYXJlbnRJZChkID0+IChkLmlzUm9vdCA/IG51bGwgOiAncm9vdCcpKShbcm9vdE5vZGUsIC4uLnRoaXMucmVzdWx0c10pXHJcbiAgICAgIC5zdW0oZCA9PiBkLnZhbHVlKTtcclxuXHJcbiAgICB0aGlzLmRhdGEgPSB0aGlzLnRyZWVtYXAocm9vdCk7XHJcblxyXG4gICAgdGhpcy5zZXRDb2xvcnMoKTtcclxuXHJcbiAgICB0aGlzLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt0aGlzLmRpbXMueE9mZnNldH0gLCAke3RoaXMubWFyZ2luWzBdfSlgO1xyXG4gIH1cclxuXHJcbiAgZ2V0RG9tYWluKCk6IGFueVtdIHtcclxuICAgIHJldHVybiB0aGlzLnJlc3VsdHMubWFwKGQgPT4gZC5uYW1lKTtcclxuICB9XHJcblxyXG4gIG9uQ2xpY2soZGF0YSk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3QuZW1pdChkYXRhKTtcclxuICB9XHJcblxyXG4gIHNldENvbG9ycygpOiB2b2lkIHtcclxuICAgIHRoaXMuY29sb3JzID0gbmV3IENvbG9ySGVscGVyKHRoaXMuc2NoZW1lLCAnb3JkaW5hbCcsIHRoaXMuZG9tYWluLCB0aGlzLmN1c3RvbUNvbG9ycyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==