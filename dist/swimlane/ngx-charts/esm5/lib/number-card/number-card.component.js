import { __decorate, __extends } from "tslib";
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { BaseChartComponent } from '../common/base-chart.component';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { gridLayout, gridSize } from '../common/grid-layout.helper';
var NumberCardComponent = /** @class */ (function (_super) {
    __extends(NumberCardComponent, _super);
    function NumberCardComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.emptyColor = 'rgba(0, 0, 0, 0)';
        _this.innerPadding = 15;
        _this.margin = [10, 10, 10, 10];
        return _this;
    }
    Object.defineProperty(NumberCardComponent.prototype, "clickable", {
        get: function () {
            return !!this.select.observers.length;
        },
        enumerable: true,
        configurable: true
    });
    NumberCardComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin
        });
        this.formatDates();
        this.domain = this.getDomain();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        var size = gridSize(this.dims, this.results.length, 150);
        var N = size[0] * size[1];
        var data = this.results.slice();
        while (data.length < N) {
            data.push({ value: null });
        }
        this.data = gridLayout(this.dims, data, 150, this.designatedTotal);
    };
    NumberCardComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.label; });
    };
    NumberCardComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    NumberCardComponent.prototype.setColors = function () {
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    __decorate([
        Input()
    ], NumberCardComponent.prototype, "cardColor", void 0);
    __decorate([
        Input()
    ], NumberCardComponent.prototype, "bandColor", void 0);
    __decorate([
        Input()
    ], NumberCardComponent.prototype, "emptyColor", void 0);
    __decorate([
        Input()
    ], NumberCardComponent.prototype, "innerPadding", void 0);
    __decorate([
        Input()
    ], NumberCardComponent.prototype, "textColor", void 0);
    __decorate([
        Input()
    ], NumberCardComponent.prototype, "valueFormatting", void 0);
    __decorate([
        Input()
    ], NumberCardComponent.prototype, "labelFormatting", void 0);
    __decorate([
        Input()
    ], NumberCardComponent.prototype, "designatedTotal", void 0);
    NumberCardComponent = __decorate([
        Component({
            selector: 'ngx-charts-number-card',
            template: "\n    <ngx-charts-chart [view]=\"[width, height]\" [showLegend]=\"false\" [animations]=\"animations\">\n      <svg:g [attr.transform]=\"transform\" class=\"number-card chart\" [class.clickable]=\"clickable\">\n        <svg:g\n          ngx-charts-card-series\n          [colors]=\"colors\"\n          [cardColor]=\"cardColor\"\n          [bandColor]=\"bandColor\"\n          [textColor]=\"textColor\"\n          [emptyColor]=\"emptyColor\"\n          [data]=\"data\"\n          [dims]=\"dims\"\n          [innerPadding]=\"innerPadding\"\n          [valueFormatting]=\"valueFormatting\"\n          [labelFormatting]=\"labelFormatting\"\n          [animations]=\"animations\"\n          (select)=\"onClick($event)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", "ngx-charts-number-card .cell .trimmed-label{font-size:12px;pointer-events:none;overflow:hidden;text-align:left;line-height:1em}ngx-charts-number-card .cell .trimmed-label p{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;width:100%;padding:0;margin:0}ngx-charts-number-card .cell .value-text{pointer-events:none}ngx-charts-number-card .number-card.clickable .cell .card,ngx-charts-number-card .number-card.clickable .cell .card-band{cursor:pointer}"]
        })
    ], NumberCardComponent);
    return NumberCardComponent;
}(BaseChartComponent));
export { NumberCardComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLWNhcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvbnVtYmVyLWNhcmQvbnVtYmVyLWNhcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQWtCLE1BQU0sa0NBQWtDLENBQUM7QUFDM0YsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUE2QnBFO0lBQXlDLHVDQUFrQjtJQUEzRDtRQUFBLHFFQStEQztRQTVEVSxnQkFBVSxHQUFXLGtCQUFrQixDQUFDO1FBQ3hDLGtCQUFZLEdBQUcsRUFBRSxDQUFDO1FBWTNCLFlBQU0sR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDOztJQStDNUIsQ0FBQztJQTNDQyxzQkFBSSwwQ0FBUzthQUFiO1lBQ0UsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQ3hDLENBQUM7OztPQUFBO0lBRUQsb0NBQU0sR0FBTjtRQUNFLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBRWYsSUFBSSxDQUFDLElBQUksR0FBRyx1QkFBdUIsQ0FBQztZQUNsQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNyQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFL0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsZUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFHLENBQUM7UUFFdkUsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0QsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU1QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWxDLE9BQU8sSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQzVCO1FBRUQsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsdUNBQVMsR0FBVDtRQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsS0FBSyxFQUFQLENBQU8sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxxQ0FBTyxHQUFQLFVBQVEsSUFBSTtRQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCx1Q0FBUyxHQUFUO1FBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBN0RRO1FBQVIsS0FBSyxFQUFFOzBEQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTswREFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7MkRBQXlDO0lBQ3hDO1FBQVIsS0FBSyxFQUFFOzZEQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTswREFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7Z0VBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFO2dFQUFzQjtJQUNyQjtRQUFSLEtBQUssRUFBRTtnRUFBeUI7SUFSdEIsbUJBQW1CO1FBM0IvQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLFFBQVEsRUFBRSxvd0JBb0JUO1lBRUQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O1NBQ2hELENBQUM7T0FDVyxtQkFBbUIsQ0ErRC9CO0lBQUQsMEJBQUM7Q0FBQSxBQS9ERCxDQUF5QyxrQkFBa0IsR0ErRDFEO1NBL0RZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCYXNlQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuLi9jb21tb24vYmFzZS1jaGFydC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucywgVmlld0RpbWVuc2lvbnMgfSBmcm9tICcuLi9jb21tb24vdmlldy1kaW1lbnNpb25zLmhlbHBlcic7XHJcbmltcG9ydCB7IENvbG9ySGVscGVyIH0gZnJvbSAnLi4vY29tbW9uL2NvbG9yLmhlbHBlcic7XHJcbmltcG9ydCB7IGdyaWRMYXlvdXQsIGdyaWRTaXplIH0gZnJvbSAnLi4vY29tbW9uL2dyaWQtbGF5b3V0LmhlbHBlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC1jaGFydHMtbnVtYmVyLWNhcmQnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8bmd4LWNoYXJ0cy1jaGFydCBbdmlld109XCJbd2lkdGgsIGhlaWdodF1cIiBbc2hvd0xlZ2VuZF09XCJmYWxzZVwiIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIj5cclxuICAgICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIiBjbGFzcz1cIm51bWJlci1jYXJkIGNoYXJ0XCIgW2NsYXNzLmNsaWNrYWJsZV09XCJjbGlja2FibGVcIj5cclxuICAgICAgICA8c3ZnOmdcclxuICAgICAgICAgIG5neC1jaGFydHMtY2FyZC1zZXJpZXNcclxuICAgICAgICAgIFtjb2xvcnNdPVwiY29sb3JzXCJcclxuICAgICAgICAgIFtjYXJkQ29sb3JdPVwiY2FyZENvbG9yXCJcclxuICAgICAgICAgIFtiYW5kQ29sb3JdPVwiYmFuZENvbG9yXCJcclxuICAgICAgICAgIFt0ZXh0Q29sb3JdPVwidGV4dENvbG9yXCJcclxuICAgICAgICAgIFtlbXB0eUNvbG9yXT1cImVtcHR5Q29sb3JcIlxyXG4gICAgICAgICAgW2RhdGFdPVwiZGF0YVwiXHJcbiAgICAgICAgICBbZGltc109XCJkaW1zXCJcclxuICAgICAgICAgIFtpbm5lclBhZGRpbmddPVwiaW5uZXJQYWRkaW5nXCJcclxuICAgICAgICAgIFt2YWx1ZUZvcm1hdHRpbmddPVwidmFsdWVGb3JtYXR0aW5nXCJcclxuICAgICAgICAgIFtsYWJlbEZvcm1hdHRpbmddPVwibGFiZWxGb3JtYXR0aW5nXCJcclxuICAgICAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxyXG4gICAgICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKCRldmVudClcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvc3ZnOmc+XHJcbiAgICA8L25neC1jaGFydHMtY2hhcnQ+XHJcbiAgYCxcclxuICBzdHlsZVVybHM6IFsnLi4vY29tbW9uL2Jhc2UtY2hhcnQuY29tcG9uZW50LnNjc3MnLCAnLi9jYXJkLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTnVtYmVyQ2FyZENvbXBvbmVudCBleHRlbmRzIEJhc2VDaGFydENvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgY2FyZENvbG9yOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgYmFuZENvbG9yOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZW1wdHlDb2xvcjogc3RyaW5nID0gJ3JnYmEoMCwgMCwgMCwgMCknO1xyXG4gIEBJbnB1dCgpIGlubmVyUGFkZGluZyA9IDE1O1xyXG4gIEBJbnB1dCgpIHRleHRDb2xvcjogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHZhbHVlRm9ybWF0dGluZzogYW55O1xyXG4gIEBJbnB1dCgpIGxhYmVsRm9ybWF0dGluZzogYW55O1xyXG4gIEBJbnB1dCgpIGRlc2lnbmF0ZWRUb3RhbDogbnVtYmVyO1xyXG5cclxuICBkaW1zOiBWaWV3RGltZW5zaW9ucztcclxuICBkYXRhOiBhbnlbXTtcclxuICBzbG90czogYW55W107XHJcbiAgY29sb3JzOiBDb2xvckhlbHBlcjtcclxuICB0cmFuc2Zvcm06IHN0cmluZztcclxuICBkb21haW46IGFueVtdO1xyXG4gIG1hcmdpbiA9IFsxMCwgMTAsIDEwLCAxMF07XHJcblxyXG4gIGJhY2tncm91bmRDYXJkczogYW55W107XHJcblxyXG4gIGdldCBjbGlja2FibGUoKSB7XHJcbiAgICByZXR1cm4gISF0aGlzLnNlbGVjdC5vYnNlcnZlcnMubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgc3VwZXIudXBkYXRlKCk7XHJcblxyXG4gICAgdGhpcy5kaW1zID0gY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMoe1xyXG4gICAgICB3aWR0aDogdGhpcy53aWR0aCxcclxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcclxuICAgICAgbWFyZ2luczogdGhpcy5tYXJnaW5cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZm9ybWF0RGF0ZXMoKTtcclxuXHJcbiAgICB0aGlzLmRvbWFpbiA9IHRoaXMuZ2V0RG9tYWluKCk7XHJcblxyXG4gICAgdGhpcy5zZXRDb2xvcnMoKTtcclxuICAgIHRoaXMudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3RoaXMuZGltcy54T2Zmc2V0fSAsICR7dGhpcy5tYXJnaW5bMF19KWA7XHJcblxyXG4gICAgY29uc3Qgc2l6ZSA9IGdyaWRTaXplKHRoaXMuZGltcywgdGhpcy5yZXN1bHRzLmxlbmd0aCwgMTUwKTtcclxuICAgIGNvbnN0IE4gPSBzaXplWzBdICogc2l6ZVsxXTtcclxuXHJcbiAgICBjb25zdCBkYXRhID0gdGhpcy5yZXN1bHRzLnNsaWNlKCk7XHJcblxyXG4gICAgd2hpbGUgKGRhdGEubGVuZ3RoIDwgTikge1xyXG4gICAgICBkYXRhLnB1c2goeyB2YWx1ZTogbnVsbCB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRhdGEgPSBncmlkTGF5b3V0KHRoaXMuZGltcywgZGF0YSwgMTUwLCB0aGlzLmRlc2lnbmF0ZWRUb3RhbCk7XHJcbiAgfVxyXG5cclxuICBnZXREb21haW4oKTogYW55W10ge1xyXG4gICAgcmV0dXJuIHRoaXMucmVzdWx0cy5tYXAoZCA9PiBkLmxhYmVsKTtcclxuICB9XHJcblxyXG4gIG9uQ2xpY2soZGF0YSk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3QuZW1pdChkYXRhKTtcclxuICB9XHJcblxyXG4gIHNldENvbG9ycygpOiB2b2lkIHtcclxuICAgIHRoaXMuY29sb3JzID0gbmV3IENvbG9ySGVscGVyKHRoaXMuc2NoZW1lLCAnb3JkaW5hbCcsIHRoaXMuZG9tYWluLCB0aGlzLmN1c3RvbUNvbG9ycyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==