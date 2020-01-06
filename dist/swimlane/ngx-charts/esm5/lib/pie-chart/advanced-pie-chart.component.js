import { __decorate, __extends, __read, __spread } from "tslib";
import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
var AdvancedPieChartComponent = /** @class */ (function (_super) {
    __extends(AdvancedPieChartComponent, _super);
    function AdvancedPieChartComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activeEntries = [];
        _this.tooltipDisabled = false;
        _this.label = 'Total';
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [20, 20, 20, 20];
        return _this;
    }
    AdvancedPieChartComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions({
            width: (this.width * 4) / 12.0,
            height: this.height,
            margins: this.margin
        });
        this.formatDates();
        this.domain = this.getDomain();
        this.setColors();
        var xOffset = this.dims.width / 2;
        var yOffset = this.margin[0] + this.dims.height / 2;
        this.legendWidth = this.width - this.dims.width - this.margin[1];
        this.outerRadius = Math.min(this.dims.width, this.dims.height) / 2.5;
        this.innerRadius = this.outerRadius * 0.75;
        this.transform = "translate(" + xOffset + " , " + yOffset + ")";
    };
    AdvancedPieChartComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.label; });
    };
    AdvancedPieChartComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    AdvancedPieChartComponent.prototype.setColors = function () {
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    AdvancedPieChartComponent.prototype.onActivate = function (item, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        item = this.results.find(function (d) {
            if (fromLegend) {
                return d.label === item.name;
            }
            else {
                return d.name === item.name;
            }
        });
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = __spread([item], this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    AdvancedPieChartComponent.prototype.onDeactivate = function (item, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        item = this.results.find(function (d) {
            if (fromLegend) {
                return d.label === item.name;
            }
            else {
                return d.name === item.name;
            }
        });
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = __spread(this.activeEntries);
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    __decorate([
        Input()
    ], AdvancedPieChartComponent.prototype, "gradient", void 0);
    __decorate([
        Input()
    ], AdvancedPieChartComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input()
    ], AdvancedPieChartComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input()
    ], AdvancedPieChartComponent.prototype, "tooltipText", void 0);
    __decorate([
        Input()
    ], AdvancedPieChartComponent.prototype, "label", void 0);
    __decorate([
        Output()
    ], AdvancedPieChartComponent.prototype, "activate", void 0);
    __decorate([
        Output()
    ], AdvancedPieChartComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate')
    ], AdvancedPieChartComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        Input()
    ], AdvancedPieChartComponent.prototype, "valueFormatting", void 0);
    __decorate([
        Input()
    ], AdvancedPieChartComponent.prototype, "nameFormatting", void 0);
    __decorate([
        Input()
    ], AdvancedPieChartComponent.prototype, "percentageFormatting", void 0);
    AdvancedPieChartComponent = __decorate([
        Component({
            selector: 'ngx-charts-advanced-pie-chart',
            template: "\n    <div [style.width.px]=\"width\" [style.height.px]=\"height\">\n      <div class=\"advanced-pie chart\" [style.width.px]=\"dims.width\" [style.height.px]=\"dims.height\">\n        <ngx-charts-chart [view]=\"[width, height]\" [showLegend]=\"false\" [animations]=\"animations\">\n          <svg:g [attr.transform]=\"transform\" class=\"pie chart\">\n            <svg:g\n              ngx-charts-pie-series\n              [colors]=\"colors\"\n              [series]=\"results\"\n              [innerRadius]=\"innerRadius\"\n              [activeEntries]=\"activeEntries\"\n              [outerRadius]=\"outerRadius\"\n              [gradient]=\"gradient\"\n              [tooltipDisabled]=\"tooltipDisabled\"\n              [tooltipTemplate]=\"tooltipTemplate\"\n              [tooltipText]=\"tooltipText\"\n              (select)=\"onClick($event)\"\n              (activate)=\"onActivate($event)\"\n              (deactivate)=\"onDeactivate($event)\"\n              [animations]=\"animations\"\n            ></svg:g>\n          </svg:g>\n        </ngx-charts-chart>\n      </div>\n      <div class=\"advanced-pie-legend-wrapper\" [style.width.px]=\"width - dims.width\" [style.height.px]=\"height\">\n        <ngx-charts-advanced-legend\n          [data]=\"results\"\n          [colors]=\"colors\"\n          [width]=\"width - dims.width - margin[1]\"\n          [label]=\"label\"\n          [animations]=\"animations\"\n          [valueFormatting]=\"valueFormatting\"\n          [labelFormatting]=\"nameFormatting\"\n          [percentageFormatting]=\"percentageFormatting\"\n          (select)=\"onClick($event)\"\n          (activate)=\"onActivate($event, true)\"\n          (deactivate)=\"onDeactivate($event, true)\"\n        >\n        </ngx-charts-advanced-legend>\n      </div>\n    </div>\n  ",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".advanced-pie{display:inline-block;float:left}.advanced-pie-legend-wrapper{display:inline-block}"]
        })
    ], AdvancedPieChartComponent);
    return AdvancedPieChartComponent;
}(BaseChartComponent));
export { AdvancedPieChartComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2YW5jZWQtcGllLWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL3BpZS1jaGFydC9hZHZhbmNlZC1waWUtY2hhcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBRU4saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSx1QkFBdUIsRUFBa0IsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFtRHBFO0lBQStDLDZDQUFrQjtJQUFqRTtRQUFBLHFFQW9HQztRQWxHVSxtQkFBYSxHQUFVLEVBQUUsQ0FBQztRQUMxQixxQkFBZSxHQUFZLEtBQUssQ0FBQztRQUVqQyxXQUFLLEdBQVcsT0FBTyxDQUFDO1FBRXZCLGNBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqRCxnQkFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBWTdELFlBQU0sR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDOztJQWdGNUIsQ0FBQztJQTFFQywwQ0FBTSxHQUFOO1FBQ0UsaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFFZixJQUFJLENBQUMsSUFBSSxHQUFHLHVCQUF1QixDQUFDO1lBQ2xDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSTtZQUM5QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3JC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QUF3QztJQUN2QztRQUFSLEtBQUssRUFBRTsyRUFBOEM7SUF4QjNDLHlCQUF5QjtRQWhEckMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLCtCQUErQjtZQUN6QyxRQUFRLEVBQUUsK3dEQXlDVDtZQUVELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNoRCxDQUFDO09BQ1cseUJBQXlCLENBb0dyQztJQUFELGdDQUFDO0NBQUEsQUFwR0QsQ0FBK0Msa0JBQWtCLEdBb0doRTtTQXBHWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENvbXBvbmVudCxcclxuICBDb250ZW50Q2hpbGQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBUZW1wbGF0ZVJlZixcclxuICBWaWV3RW5jYXBzdWxhdGlvblxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMsIFZpZXdEaW1lbnNpb25zIH0gZnJvbSAnLi4vY29tbW9uL3ZpZXctZGltZW5zaW9ucy5oZWxwZXInO1xyXG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gJy4uL2NvbW1vbi9jb2xvci5oZWxwZXInO1xyXG5pbXBvcnQgeyBCYXNlQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuLi9jb21tb24vYmFzZS1jaGFydC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEYXRhSXRlbSB9IGZyb20gJy4uL21vZGVscy9jaGFydC1kYXRhLm1vZGVsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LWNoYXJ0cy1hZHZhbmNlZC1waWUtY2hhcnQnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IFtzdHlsZS53aWR0aC5weF09XCJ3aWR0aFwiIFtzdHlsZS5oZWlnaHQucHhdPVwiaGVpZ2h0XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJhZHZhbmNlZC1waWUgY2hhcnRcIiBbc3R5bGUud2lkdGgucHhdPVwiZGltcy53aWR0aFwiIFtzdHlsZS5oZWlnaHQucHhdPVwiZGltcy5oZWlnaHRcIj5cclxuICAgICAgICA8bmd4LWNoYXJ0cy1jaGFydCBbdmlld109XCJbd2lkdGgsIGhlaWdodF1cIiBbc2hvd0xlZ2VuZF09XCJmYWxzZVwiIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIj5cclxuICAgICAgICAgIDxzdmc6ZyBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtXCIgY2xhc3M9XCJwaWUgY2hhcnRcIj5cclxuICAgICAgICAgICAgPHN2ZzpnXHJcbiAgICAgICAgICAgICAgbmd4LWNoYXJ0cy1waWUtc2VyaWVzXHJcbiAgICAgICAgICAgICAgW2NvbG9yc109XCJjb2xvcnNcIlxyXG4gICAgICAgICAgICAgIFtzZXJpZXNdPVwicmVzdWx0c1wiXHJcbiAgICAgICAgICAgICAgW2lubmVyUmFkaXVzXT1cImlubmVyUmFkaXVzXCJcclxuICAgICAgICAgICAgICBbYWN0aXZlRW50cmllc109XCJhY3RpdmVFbnRyaWVzXCJcclxuICAgICAgICAgICAgICBbb3V0ZXJSYWRpdXNdPVwib3V0ZXJSYWRpdXNcIlxyXG4gICAgICAgICAgICAgIFtncmFkaWVudF09XCJncmFkaWVudFwiXHJcbiAgICAgICAgICAgICAgW3Rvb2x0aXBEaXNhYmxlZF09XCJ0b29sdGlwRGlzYWJsZWRcIlxyXG4gICAgICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcclxuICAgICAgICAgICAgICBbdG9vbHRpcFRleHRdPVwidG9vbHRpcFRleHRcIlxyXG4gICAgICAgICAgICAgIChzZWxlY3QpPVwib25DbGljaygkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAoYWN0aXZhdGUpPVwib25BY3RpdmF0ZSgkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAoZGVhY3RpdmF0ZSk9XCJvbkRlYWN0aXZhdGUoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgICAgICAgID48L3N2ZzpnPlxyXG4gICAgICAgICAgPC9zdmc6Zz5cclxuICAgICAgICA8L25neC1jaGFydHMtY2hhcnQ+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYWR2YW5jZWQtcGllLWxlZ2VuZC13cmFwcGVyXCIgW3N0eWxlLndpZHRoLnB4XT1cIndpZHRoIC0gZGltcy53aWR0aFwiIFtzdHlsZS5oZWlnaHQucHhdPVwiaGVpZ2h0XCI+XHJcbiAgICAgICAgPG5neC1jaGFydHMtYWR2YW5jZWQtbGVnZW5kXHJcbiAgICAgICAgICBbZGF0YV09XCJyZXN1bHRzXCJcclxuICAgICAgICAgIFtjb2xvcnNdPVwiY29sb3JzXCJcclxuICAgICAgICAgIFt3aWR0aF09XCJ3aWR0aCAtIGRpbXMud2lkdGggLSBtYXJnaW5bMV1cIlxyXG4gICAgICAgICAgW2xhYmVsXT1cImxhYmVsXCJcclxuICAgICAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxyXG4gICAgICAgICAgW3ZhbHVlRm9ybWF0dGluZ109XCJ2YWx1ZUZvcm1hdHRpbmdcIlxyXG4gICAgICAgICAgW2xhYmVsRm9ybWF0dGluZ109XCJuYW1lRm9ybWF0dGluZ1wiXHJcbiAgICAgICAgICBbcGVyY2VudGFnZUZvcm1hdHRpbmddPVwicGVyY2VudGFnZUZvcm1hdHRpbmdcIlxyXG4gICAgICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKCRldmVudClcIlxyXG4gICAgICAgICAgKGFjdGl2YXRlKT1cIm9uQWN0aXZhdGUoJGV2ZW50LCB0cnVlKVwiXHJcbiAgICAgICAgICAoZGVhY3RpdmF0ZSk9XCJvbkRlYWN0aXZhdGUoJGV2ZW50LCB0cnVlKVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgIDwvbmd4LWNoYXJ0cy1hZHZhbmNlZC1sZWdlbmQ+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgYCxcclxuICBzdHlsZVVybHM6IFsnLi4vY29tbW9uL2Jhc2UtY2hhcnQuY29tcG9uZW50LnNjc3MnLCAnLi9hZHZhbmNlZC1waWUtY2hhcnQuY29tcG9uZW50LnNjc3MnXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZHZhbmNlZFBpZUNoYXJ0Q29tcG9uZW50IGV4dGVuZHMgQmFzZUNoYXJ0Q29tcG9uZW50IHtcclxuICBASW5wdXQoKSBncmFkaWVudDogYm9vbGVhbjtcclxuICBASW5wdXQoKSBhY3RpdmVFbnRyaWVzOiBhbnlbXSA9IFtdO1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBUZXh0OiBhbnk7XHJcbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZyA9ICdUb3RhbCc7XHJcblxyXG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBAQ29udGVudENoaWxkKCd0b29sdGlwVGVtcGxhdGUnKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIGRhdGE6IGFueTtcclxuICBkaW1zOiBWaWV3RGltZW5zaW9ucztcclxuICBkb21haW46IGFueVtdO1xyXG4gIG91dGVyUmFkaXVzOiBudW1iZXI7XHJcbiAgaW5uZXJSYWRpdXM6IG51bWJlcjtcclxuICB0cmFuc2Zvcm06IHN0cmluZztcclxuICBjb2xvcnM6IENvbG9ySGVscGVyO1xyXG4gIGxlZ2VuZFdpZHRoOiBudW1iZXI7XHJcbiAgbWFyZ2luID0gWzIwLCAyMCwgMjAsIDIwXTtcclxuXHJcbiAgQElucHV0KCkgdmFsdWVGb3JtYXR0aW5nOiAodmFsdWU6IG51bWJlcikgPT4gYW55O1xyXG4gIEBJbnB1dCgpIG5hbWVGb3JtYXR0aW5nOiAodmFsdWU6IHN0cmluZykgPT4gYW55O1xyXG4gIEBJbnB1dCgpIHBlcmNlbnRhZ2VGb3JtYXR0aW5nOiAodmFsdWU6IG51bWJlcikgPT4gYW55O1xyXG5cclxuICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICBzdXBlci51cGRhdGUoKTtcclxuXHJcbiAgICB0aGlzLmRpbXMgPSBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucyh7XHJcbiAgICAgIHdpZHRoOiAodGhpcy53aWR0aCAqIDQpIC8gMTIuMCxcclxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcclxuICAgICAgbWFyZ2luczogdGhpcy5tYXJnaW5cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZm9ybWF0RGF0ZXMoKTtcclxuXHJcbiAgICB0aGlzLmRvbWFpbiA9IHRoaXMuZ2V0RG9tYWluKCk7XHJcbiAgICB0aGlzLnNldENvbG9ycygpO1xyXG5cclxuICAgIGNvbnN0IHhPZmZzZXQgPSB0aGlzLmRpbXMud2lkdGggLyAyO1xyXG4gICAgY29uc3QgeU9mZnNldCA9IHRoaXMubWFyZ2luWzBdICsgdGhpcy5kaW1zLmhlaWdodCAvIDI7XHJcbiAgICB0aGlzLmxlZ2VuZFdpZHRoID0gdGhpcy53aWR0aCAtIHRoaXMuZGltcy53aWR0aCAtIHRoaXMubWFyZ2luWzFdO1xyXG5cclxuICAgIHRoaXMub3V0ZXJSYWRpdXMgPSBNYXRoLm1pbih0aGlzLmRpbXMud2lkdGgsIHRoaXMuZGltcy5oZWlnaHQpIC8gMi41O1xyXG4gICAgdGhpcy5pbm5lclJhZGl1cyA9IHRoaXMub3V0ZXJSYWRpdXMgKiAwLjc1O1xyXG5cclxuICAgIHRoaXMudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3hPZmZzZXR9ICwgJHt5T2Zmc2V0fSlgO1xyXG4gIH1cclxuXHJcbiAgZ2V0RG9tYWluKCk6IGFueVtdIHtcclxuICAgIHJldHVybiB0aGlzLnJlc3VsdHMubWFwKGQgPT4gZC5sYWJlbCk7XHJcbiAgfVxyXG5cclxuICBvbkNsaWNrKGRhdGE6IERhdGFJdGVtKSB7XHJcbiAgICB0aGlzLnNlbGVjdC5lbWl0KGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgc2V0Q29sb3JzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jb2xvcnMgPSBuZXcgQ29sb3JIZWxwZXIodGhpcy5zY2hlbWUsICdvcmRpbmFsJywgdGhpcy5kb21haW4sIHRoaXMuY3VzdG9tQ29sb3JzKTtcclxuICB9XHJcblxyXG4gIG9uQWN0aXZhdGUoaXRlbSwgZnJvbUxlZ2VuZCA9IGZhbHNlKSB7XHJcbiAgICBpdGVtID0gdGhpcy5yZXN1bHRzLmZpbmQoZCA9PiB7XHJcbiAgICAgIGlmIChmcm9tTGVnZW5kKSB7XHJcbiAgICAgICAgcmV0dXJuIGQubGFiZWwgPT09IGl0ZW0ubmFtZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZC5uYW1lID09PSBpdGVtLm5hbWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGlkeCA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kSW5kZXgoZCA9PiB7XHJcbiAgICAgIHJldHVybiBkLm5hbWUgPT09IGl0ZW0ubmFtZSAmJiBkLnZhbHVlID09PSBpdGVtLnZhbHVlICYmIGQuc2VyaWVzID09PSBpdGVtLnNlcmllcztcclxuICAgIH0pO1xyXG4gICAgaWYgKGlkeCA+IC0xKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFjdGl2ZUVudHJpZXMgPSBbaXRlbSwgLi4udGhpcy5hY3RpdmVFbnRyaWVzXTtcclxuICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7IHZhbHVlOiBpdGVtLCBlbnRyaWVzOiB0aGlzLmFjdGl2ZUVudHJpZXMgfSk7XHJcbiAgfVxyXG5cclxuICBvbkRlYWN0aXZhdGUoaXRlbSwgZnJvbUxlZ2VuZCA9IGZhbHNlKSB7XHJcbiAgICBpdGVtID0gdGhpcy5yZXN1bHRzLmZpbmQoZCA9PiB7XHJcbiAgICAgIGlmIChmcm9tTGVnZW5kKSB7XHJcbiAgICAgICAgcmV0dXJuIGQubGFiZWwgPT09IGl0ZW0ubmFtZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZC5uYW1lID09PSBpdGVtLm5hbWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGlkeCA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kSW5kZXgoZCA9PiB7XHJcbiAgICAgIHJldHVybiBkLm5hbWUgPT09IGl0ZW0ubmFtZSAmJiBkLnZhbHVlID09PSBpdGVtLnZhbHVlICYmIGQuc2VyaWVzID09PSBpdGVtLnNlcmllcztcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYWN0aXZlRW50cmllcy5zcGxpY2UoaWR4LCAxKTtcclxuICAgIHRoaXMuYWN0aXZlRW50cmllcyA9IFsuLi50aGlzLmFjdGl2ZUVudHJpZXNdO1xyXG5cclxuICAgIHRoaXMuZGVhY3RpdmF0ZS5lbWl0KHsgdmFsdWU6IGl0ZW0sIGVudHJpZXM6IHRoaXMuYWN0aXZlRW50cmllcyB9KTtcclxuICB9XHJcbn1cclxuIl19