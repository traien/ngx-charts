import { __decorate, __extends } from "tslib";
import { Component, Input, ViewChild, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { scaleLinear } from 'd3-scale';
import { BaseChartComponent } from '../common/base-chart.component';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
var LinearGaugeComponent = /** @class */ (function (_super) {
    __extends(LinearGaugeComponent, _super);
    function LinearGaugeComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.min = 0;
        _this.max = 100;
        _this.value = 0;
        _this.margin = [10, 20, 10, 20];
        _this.valueResizeScale = 1;
        _this.unitsResizeScale = 1;
        _this.valueTextTransform = '';
        _this.valueTranslate = '';
        _this.unitsTextTransform = '';
        _this.unitsTranslate = '';
        return _this;
    }
    LinearGaugeComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        _super.prototype.ngAfterViewInit.call(this);
        setTimeout(function () {
            _this.scaleText('value');
            _this.scaleText('units');
        });
    };
    LinearGaugeComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.hasPreviousValue = this.previousValue !== undefined;
        this.max = Math.max(this.max, this.value);
        this.min = Math.min(this.min, this.value);
        if (this.hasPreviousValue) {
            this.max = Math.max(this.max, this.previousValue);
            this.min = Math.min(this.min, this.previousValue);
        }
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin
        });
        this.valueDomain = this.getValueDomain();
        this.valueScale = this.getValueScale();
        this.displayValue = this.getDisplayValue();
        this.setColors();
        var xOffset = this.margin[3] + this.dims.width / 2;
        var yOffset = this.margin[0] + this.dims.height / 2;
        this.transform = "translate(" + xOffset + ", " + yOffset + ")";
        this.transformLine = "translate(" + (this.margin[3] + this.valueScale(this.previousValue)) + ", " + yOffset + ")";
        this.valueTranslate = "translate(0, -15)";
        this.unitsTranslate = "translate(0, 15)";
        setTimeout(function () { return _this.scaleText('value'); }, 50);
        setTimeout(function () { return _this.scaleText('units'); }, 50);
    };
    LinearGaugeComponent.prototype.getValueDomain = function () {
        return [this.min, this.max];
    };
    LinearGaugeComponent.prototype.getValueScale = function () {
        return scaleLinear()
            .range([0, this.dims.width])
            .domain(this.valueDomain);
    };
    LinearGaugeComponent.prototype.getDisplayValue = function () {
        if (this.valueFormatting) {
            return this.valueFormatting(this.value);
        }
        return this.value.toLocaleString();
    };
    LinearGaugeComponent.prototype.scaleText = function (element, repeat) {
        var _this = this;
        if (repeat === void 0) { repeat = true; }
        var el;
        var resizeScale;
        if (element === 'value') {
            el = this.valueTextEl;
            resizeScale = this.valueResizeScale;
        }
        else {
            el = this.unitsTextEl;
            resizeScale = this.unitsResizeScale;
        }
        var _a = el.nativeElement.getBoundingClientRect(), width = _a.width, height = _a.height;
        if (width === 0 || height === 0)
            return;
        var oldScale = resizeScale;
        var availableWidth = this.dims.width;
        var availableHeight = Math.max(this.dims.height / 2 - 15, 0);
        var resizeScaleWidth = Math.floor((availableWidth / (width / resizeScale)) * 100) / 100;
        var resizeScaleHeight = Math.floor((availableHeight / (height / resizeScale)) * 100) / 100;
        resizeScale = Math.min(resizeScaleHeight, resizeScaleWidth);
        if (resizeScale !== oldScale) {
            if (element === 'value') {
                this.valueResizeScale = resizeScale;
                this.valueTextTransform = "scale(" + resizeScale + ", " + resizeScale + ")";
            }
            else {
                this.unitsResizeScale = resizeScale;
                this.unitsTextTransform = "scale(" + resizeScale + ", " + resizeScale + ")";
            }
            this.cd.markForCheck();
            if (repeat) {
                setTimeout(function () {
                    _this.scaleText(element, false);
                }, 50);
            }
        }
    };
    LinearGaugeComponent.prototype.onClick = function () {
        this.select.emit({
            name: 'Value',
            value: this.value
        });
    };
    LinearGaugeComponent.prototype.setColors = function () {
        this.colors = new ColorHelper(this.scheme, 'ordinal', [this.value], this.customColors);
    };
    __decorate([
        Input()
    ], LinearGaugeComponent.prototype, "min", void 0);
    __decorate([
        Input()
    ], LinearGaugeComponent.prototype, "max", void 0);
    __decorate([
        Input()
    ], LinearGaugeComponent.prototype, "value", void 0);
    __decorate([
        Input()
    ], LinearGaugeComponent.prototype, "units", void 0);
    __decorate([
        Input()
    ], LinearGaugeComponent.prototype, "previousValue", void 0);
    __decorate([
        Input()
    ], LinearGaugeComponent.prototype, "valueFormatting", void 0);
    __decorate([
        ViewChild('valueTextEl')
    ], LinearGaugeComponent.prototype, "valueTextEl", void 0);
    __decorate([
        ViewChild('unitsTextEl')
    ], LinearGaugeComponent.prototype, "unitsTextEl", void 0);
    LinearGaugeComponent = __decorate([
        Component({
            selector: 'ngx-charts-linear-gauge',
            template: "\n    <ngx-charts-chart [view]=\"[width, height]\" [showLegend]=\"false\" [animations]=\"animations\" (click)=\"onClick()\">\n      <svg:g class=\"linear-gauge chart\">\n        <svg:g\n          ngx-charts-bar\n          class=\"background-bar\"\n          [width]=\"dims.width\"\n          [height]=\"3\"\n          [x]=\"margin[3]\"\n          [y]=\"dims.height / 2 + margin[0] - 2\"\n          [data]=\"{}\"\n          [orientation]=\"'horizontal'\"\n          [roundEdges]=\"true\"\n          [animations]=\"animations\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-bar\n          [width]=\"valueScale(value)\"\n          [height]=\"3\"\n          [x]=\"margin[3]\"\n          [y]=\"dims.height / 2 + margin[0] - 2\"\n          [fill]=\"colors.getColor(units)\"\n          [data]=\"{}\"\n          [orientation]=\"'horizontal'\"\n          [roundEdges]=\"true\"\n          [animations]=\"animations\"\n        ></svg:g>\n\n        <svg:line\n          *ngIf=\"hasPreviousValue\"\n          [attr.transform]=\"transformLine\"\n          x1=\"0\"\n          y1=\"5\"\n          x2=\"0\"\n          y2=\"15\"\n          [attr.stroke]=\"colors.getColor(units)\"\n        />\n\n        <svg:line\n          *ngIf=\"hasPreviousValue\"\n          [attr.transform]=\"transformLine\"\n          x1=\"0\"\n          y1=\"-5\"\n          x2=\"0\"\n          y2=\"-15\"\n          [attr.stroke]=\"colors.getColor(units)\"\n        />\n\n        <svg:g [attr.transform]=\"transform\">\n          <svg:g [attr.transform]=\"valueTranslate\">\n            <svg:text\n              #valueTextEl\n              class=\"value\"\n              [style.textAnchor]=\"'middle'\"\n              [attr.transform]=\"valueTextTransform\"\n              alignment-baseline=\"after-edge\"\n            >\n              {{ displayValue }}\n            </svg:text>\n          </svg:g>\n\n          <svg:g [attr.transform]=\"unitsTranslate\">\n            <svg:text\n              #unitsTextEl\n              class=\"units\"\n              [style.textAnchor]=\"'middle'\"\n              [attr.transform]=\"unitsTextTransform\"\n              alignment-baseline=\"before-edge\"\n            >\n              {{ units }}\n            </svg:text>\n          </svg:g>\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".linear-gauge{cursor:pointer}.linear-gauge .background-bar path{fill:rgba(0,0,0,.05)}.linear-gauge .units{fill:#666}"]
        })
    ], LinearGaugeComponent);
    return LinearGaugeComponent;
}(BaseChartComponent));
export { LinearGaugeComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZWFyLWdhdWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2dhdWdlL2xpbmVhci1nYXVnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLFNBQVMsRUFFVCxpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFdkMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLHVCQUF1QixFQUFrQixNQUFNLGtDQUFrQyxDQUFDO0FBQzNGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQW9GckQ7SUFBMEMsd0NBQWtCO0lBQTVEO1FBQUEscUVBdUlDO1FBdElVLFNBQUcsR0FBVyxDQUFDLENBQUM7UUFDaEIsU0FBRyxHQUFXLEdBQUcsQ0FBQztRQUNsQixXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBYzNCLFlBQU0sR0FBVSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBR2pDLHNCQUFnQixHQUFXLENBQUMsQ0FBQztRQUM3QixzQkFBZ0IsR0FBVyxDQUFDLENBQUM7UUFDN0Isd0JBQWtCLEdBQVcsRUFBRSxDQUFDO1FBQ2hDLG9CQUFjLEdBQVcsRUFBRSxDQUFDO1FBQzVCLHdCQUFrQixHQUFXLEVBQUUsQ0FBQztRQUNoQyxvQkFBYyxHQUFXLEVBQUUsQ0FBQzs7SUE4RzlCLENBQUM7SUExR0MsOENBQWUsR0FBZjtRQUFBLGlCQU1DO1FBTEMsaUJBQU0sZUFBZSxXQUFFLENBQUM7UUFDeEIsVUFBVSxDQUFDO1lBQ1QsS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4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LEtBQUssRUFBRTtxREFBaUI7SUFDaEI7UUFBUixLQUFLLEVBQUU7cURBQW1CO0lBQ2xCO1FBQVIsS0FBSyxFQUFFO3VEQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTt1REFBZTtJQUNkO1FBQVIsS0FBSyxFQUFFOytEQUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7aUVBQXNCO0lBRUo7UUFBekIsU0FBUyxDQUFDLGFBQWEsQ0FBQzs2REFBeUI7SUFDeEI7UUFBekIsU0FBUyxDQUFDLGFBQWEsQ0FBQzs2REFBeUI7SUFUdkMsb0JBQW9CO1FBbEZoQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUseUJBQXlCO1lBQ25DLFFBQVEsRUFBRSx5d0VBMkVUO1lBRUQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O1NBQ2hELENBQUM7T0FDVyxvQkFBb0IsQ0F1SWhDO0lBQUQsMkJBQUM7Q0FBQSxBQXZJRCxDQUEwQyxrQkFBa0IsR0F1STNEO1NBdklZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgVmlld0NoaWxkLFxyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb24sXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgc2NhbGVMaW5lYXIgfSBmcm9tICdkMy1zY2FsZSc7XHJcblxyXG5pbXBvcnQgeyBCYXNlQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuLi9jb21tb24vYmFzZS1jaGFydC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucywgVmlld0RpbWVuc2lvbnMgfSBmcm9tICcuLi9jb21tb24vdmlldy1kaW1lbnNpb25zLmhlbHBlcic7XHJcbmltcG9ydCB7IENvbG9ySGVscGVyIH0gZnJvbSAnLi4vY29tbW9uL2NvbG9yLmhlbHBlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC1jaGFydHMtbGluZWFyLWdhdWdlJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5neC1jaGFydHMtY2hhcnQgW3ZpZXddPVwiW3dpZHRoLCBoZWlnaHRdXCIgW3Nob3dMZWdlbmRdPVwiZmFsc2VcIiBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCIgKGNsaWNrKT1cIm9uQ2xpY2soKVwiPlxyXG4gICAgICA8c3ZnOmcgY2xhc3M9XCJsaW5lYXItZ2F1Z2UgY2hhcnRcIj5cclxuICAgICAgICA8c3ZnOmdcclxuICAgICAgICAgIG5neC1jaGFydHMtYmFyXHJcbiAgICAgICAgICBjbGFzcz1cImJhY2tncm91bmQtYmFyXCJcclxuICAgICAgICAgIFt3aWR0aF09XCJkaW1zLndpZHRoXCJcclxuICAgICAgICAgIFtoZWlnaHRdPVwiM1wiXHJcbiAgICAgICAgICBbeF09XCJtYXJnaW5bM11cIlxyXG4gICAgICAgICAgW3ldPVwiZGltcy5oZWlnaHQgLyAyICsgbWFyZ2luWzBdIC0gMlwiXHJcbiAgICAgICAgICBbZGF0YV09XCJ7fVwiXHJcbiAgICAgICAgICBbb3JpZW50YXRpb25dPVwiJ2hvcml6b250YWwnXCJcclxuICAgICAgICAgIFtyb3VuZEVkZ2VzXT1cInRydWVcIlxyXG4gICAgICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgICAgPjwvc3ZnOmc+XHJcbiAgICAgICAgPHN2ZzpnXHJcbiAgICAgICAgICBuZ3gtY2hhcnRzLWJhclxyXG4gICAgICAgICAgW3dpZHRoXT1cInZhbHVlU2NhbGUodmFsdWUpXCJcclxuICAgICAgICAgIFtoZWlnaHRdPVwiM1wiXHJcbiAgICAgICAgICBbeF09XCJtYXJnaW5bM11cIlxyXG4gICAgICAgICAgW3ldPVwiZGltcy5oZWlnaHQgLyAyICsgbWFyZ2luWzBdIC0gMlwiXHJcbiAgICAgICAgICBbZmlsbF09XCJjb2xvcnMuZ2V0Q29sb3IodW5pdHMpXCJcclxuICAgICAgICAgIFtkYXRhXT1cInt9XCJcclxuICAgICAgICAgIFtvcmllbnRhdGlvbl09XCInaG9yaXpvbnRhbCdcIlxyXG4gICAgICAgICAgW3JvdW5kRWRnZXNdPVwidHJ1ZVwiXHJcbiAgICAgICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcclxuICAgICAgICA+PC9zdmc6Zz5cclxuXHJcbiAgICAgICAgPHN2ZzpsaW5lXHJcbiAgICAgICAgICAqbmdJZj1cImhhc1ByZXZpb3VzVmFsdWVcIlxyXG4gICAgICAgICAgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybUxpbmVcIlxyXG4gICAgICAgICAgeDE9XCIwXCJcclxuICAgICAgICAgIHkxPVwiNVwiXHJcbiAgICAgICAgICB4Mj1cIjBcIlxyXG4gICAgICAgICAgeTI9XCIxNVwiXHJcbiAgICAgICAgICBbYXR0ci5zdHJva2VdPVwiY29sb3JzLmdldENvbG9yKHVuaXRzKVwiXHJcbiAgICAgICAgLz5cclxuXHJcbiAgICAgICAgPHN2ZzpsaW5lXHJcbiAgICAgICAgICAqbmdJZj1cImhhc1ByZXZpb3VzVmFsdWVcIlxyXG4gICAgICAgICAgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybUxpbmVcIlxyXG4gICAgICAgICAgeDE9XCIwXCJcclxuICAgICAgICAgIHkxPVwiLTVcIlxyXG4gICAgICAgICAgeDI9XCIwXCJcclxuICAgICAgICAgIHkyPVwiLTE1XCJcclxuICAgICAgICAgIFthdHRyLnN0cm9rZV09XCJjb2xvcnMuZ2V0Q29sb3IodW5pdHMpXCJcclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICA8c3ZnOmcgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybVwiPlxyXG4gICAgICAgICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJ2YWx1ZVRyYW5zbGF0ZVwiPlxyXG4gICAgICAgICAgICA8c3ZnOnRleHRcclxuICAgICAgICAgICAgICAjdmFsdWVUZXh0RWxcclxuICAgICAgICAgICAgICBjbGFzcz1cInZhbHVlXCJcclxuICAgICAgICAgICAgICBbc3R5bGUudGV4dEFuY2hvcl09XCInbWlkZGxlJ1wiXHJcbiAgICAgICAgICAgICAgW2F0dHIudHJhbnNmb3JtXT1cInZhbHVlVGV4dFRyYW5zZm9ybVwiXHJcbiAgICAgICAgICAgICAgYWxpZ25tZW50LWJhc2VsaW5lPVwiYWZ0ZXItZWRnZVwiXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7eyBkaXNwbGF5VmFsdWUgfX1cclxuICAgICAgICAgICAgPC9zdmc6dGV4dD5cclxuICAgICAgICAgIDwvc3ZnOmc+XHJcblxyXG4gICAgICAgICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJ1bml0c1RyYW5zbGF0ZVwiPlxyXG4gICAgICAgICAgICA8c3ZnOnRleHRcclxuICAgICAgICAgICAgICAjdW5pdHNUZXh0RWxcclxuICAgICAgICAgICAgICBjbGFzcz1cInVuaXRzXCJcclxuICAgICAgICAgICAgICBbc3R5bGUudGV4dEFuY2hvcl09XCInbWlkZGxlJ1wiXHJcbiAgICAgICAgICAgICAgW2F0dHIudHJhbnNmb3JtXT1cInVuaXRzVGV4dFRyYW5zZm9ybVwiXHJcbiAgICAgICAgICAgICAgYWxpZ25tZW50LWJhc2VsaW5lPVwiYmVmb3JlLWVkZ2VcIlxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge3sgdW5pdHMgfX1cclxuICAgICAgICAgICAgPC9zdmc6dGV4dD5cclxuICAgICAgICAgIDwvc3ZnOmc+XHJcbiAgICAgICAgPC9zdmc6Zz5cclxuICAgICAgPC9zdmc6Zz5cclxuICAgIDwvbmd4LWNoYXJ0cy1jaGFydD5cclxuICBgLFxyXG4gIHN0eWxlVXJsczogWycuLi9jb21tb24vYmFzZS1jaGFydC5jb21wb25lbnQuc2NzcycsICcuL2xpbmVhci1nYXVnZS5jb21wb25lbnQuc2NzcyddLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIExpbmVhckdhdWdlQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgQElucHV0KCkgbWluOiBudW1iZXIgPSAwO1xyXG4gIEBJbnB1dCgpIG1heDogbnVtYmVyID0gMTAwO1xyXG4gIEBJbnB1dCgpIHZhbHVlOiBudW1iZXIgPSAwO1xyXG4gIEBJbnB1dCgpIHVuaXRzOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcHJldmlvdXNWYWx1ZTtcclxuICBASW5wdXQoKSB2YWx1ZUZvcm1hdHRpbmc6IGFueTtcclxuXHJcbiAgQFZpZXdDaGlsZCgndmFsdWVUZXh0RWwnKSB2YWx1ZVRleHRFbDogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCd1bml0c1RleHRFbCcpIHVuaXRzVGV4dEVsOiBFbGVtZW50UmVmO1xyXG5cclxuICBkaW1zOiBWaWV3RGltZW5zaW9ucztcclxuICB2YWx1ZURvbWFpbjogYW55O1xyXG4gIHZhbHVlU2NhbGU6IGFueTtcclxuXHJcbiAgY29sb3JzOiBDb2xvckhlbHBlcjtcclxuICB0cmFuc2Zvcm06IHN0cmluZztcclxuICBtYXJnaW46IGFueVtdID0gWzEwLCAyMCwgMTAsIDIwXTtcclxuICB0cmFuc2Zvcm1MaW5lOiBzdHJpbmc7XHJcblxyXG4gIHZhbHVlUmVzaXplU2NhbGU6IG51bWJlciA9IDE7XHJcbiAgdW5pdHNSZXNpemVTY2FsZTogbnVtYmVyID0gMTtcclxuICB2YWx1ZVRleHRUcmFuc2Zvcm06IHN0cmluZyA9ICcnO1xyXG4gIHZhbHVlVHJhbnNsYXRlOiBzdHJpbmcgPSAnJztcclxuICB1bml0c1RleHRUcmFuc2Zvcm06IHN0cmluZyA9ICcnO1xyXG4gIHVuaXRzVHJhbnNsYXRlOiBzdHJpbmcgPSAnJztcclxuICBkaXNwbGF5VmFsdWU6IHN0cmluZztcclxuICBoYXNQcmV2aW91c1ZhbHVlOiBib29sZWFuO1xyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLnNjYWxlVGV4dCgndmFsdWUnKTtcclxuICAgICAgdGhpcy5zY2FsZVRleHQoJ3VuaXRzJyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIHN1cGVyLnVwZGF0ZSgpO1xyXG5cclxuICAgIHRoaXMuaGFzUHJldmlvdXNWYWx1ZSA9IHRoaXMucHJldmlvdXNWYWx1ZSAhPT0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5tYXggPSBNYXRoLm1heCh0aGlzLm1heCwgdGhpcy52YWx1ZSk7XHJcbiAgICB0aGlzLm1pbiA9IE1hdGgubWluKHRoaXMubWluLCB0aGlzLnZhbHVlKTtcclxuICAgIGlmICh0aGlzLmhhc1ByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgdGhpcy5tYXggPSBNYXRoLm1heCh0aGlzLm1heCwgdGhpcy5wcmV2aW91c1ZhbHVlKTtcclxuICAgICAgdGhpcy5taW4gPSBNYXRoLm1pbih0aGlzLm1pbiwgdGhpcy5wcmV2aW91c1ZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRpbXMgPSBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucyh7XHJcbiAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxyXG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxyXG4gICAgICBtYXJnaW5zOiB0aGlzLm1hcmdpblxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy52YWx1ZURvbWFpbiA9IHRoaXMuZ2V0VmFsdWVEb21haW4oKTtcclxuICAgIHRoaXMudmFsdWVTY2FsZSA9IHRoaXMuZ2V0VmFsdWVTY2FsZSgpO1xyXG4gICAgdGhpcy5kaXNwbGF5VmFsdWUgPSB0aGlzLmdldERpc3BsYXlWYWx1ZSgpO1xyXG5cclxuICAgIHRoaXMuc2V0Q29sb3JzKCk7XHJcblxyXG4gICAgY29uc3QgeE9mZnNldCA9IHRoaXMubWFyZ2luWzNdICsgdGhpcy5kaW1zLndpZHRoIC8gMjtcclxuICAgIGNvbnN0IHlPZmZzZXQgPSB0aGlzLm1hcmdpblswXSArIHRoaXMuZGltcy5oZWlnaHQgLyAyO1xyXG5cclxuICAgIHRoaXMudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3hPZmZzZXR9LCAke3lPZmZzZXR9KWA7XHJcbiAgICB0aGlzLnRyYW5zZm9ybUxpbmUgPSBgdHJhbnNsYXRlKCR7dGhpcy5tYXJnaW5bM10gKyB0aGlzLnZhbHVlU2NhbGUodGhpcy5wcmV2aW91c1ZhbHVlKX0sICR7eU9mZnNldH0pYDtcclxuICAgIHRoaXMudmFsdWVUcmFuc2xhdGUgPSBgdHJhbnNsYXRlKDAsIC0xNSlgO1xyXG4gICAgdGhpcy51bml0c1RyYW5zbGF0ZSA9IGB0cmFuc2xhdGUoMCwgMTUpYDtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zY2FsZVRleHQoJ3ZhbHVlJyksIDUwKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zY2FsZVRleHQoJ3VuaXRzJyksIDUwKTtcclxuICB9XHJcblxyXG4gIGdldFZhbHVlRG9tYWluKCk6IGFueVtdIHtcclxuICAgIHJldHVybiBbdGhpcy5taW4sIHRoaXMubWF4XTtcclxuICB9XHJcblxyXG4gIGdldFZhbHVlU2NhbGUoKTogYW55IHtcclxuICAgIHJldHVybiBzY2FsZUxpbmVhcigpXHJcbiAgICAgIC5yYW5nZShbMCwgdGhpcy5kaW1zLndpZHRoXSlcclxuICAgICAgLmRvbWFpbih0aGlzLnZhbHVlRG9tYWluKTtcclxuICB9XHJcblxyXG4gIGdldERpc3BsYXlWYWx1ZSgpOiBzdHJpbmcge1xyXG4gICAgaWYgKHRoaXMudmFsdWVGb3JtYXR0aW5nKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlRm9ybWF0dGluZyh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnZhbHVlLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgfVxyXG5cclxuICBzY2FsZVRleHQoZWxlbWVudCwgcmVwZWF0OiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xyXG4gICAgbGV0IGVsO1xyXG4gICAgbGV0IHJlc2l6ZVNjYWxlO1xyXG4gICAgaWYgKGVsZW1lbnQgPT09ICd2YWx1ZScpIHtcclxuICAgICAgZWwgPSB0aGlzLnZhbHVlVGV4dEVsO1xyXG4gICAgICByZXNpemVTY2FsZSA9IHRoaXMudmFsdWVSZXNpemVTY2FsZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGVsID0gdGhpcy51bml0c1RleHRFbDtcclxuICAgICAgcmVzaXplU2NhbGUgPSB0aGlzLnVuaXRzUmVzaXplU2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBlbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgaWYgKHdpZHRoID09PSAwIHx8IGhlaWdodCA9PT0gMCkgcmV0dXJuO1xyXG4gICAgY29uc3Qgb2xkU2NhbGUgPSByZXNpemVTY2FsZTtcclxuICAgIGNvbnN0IGF2YWlsYWJsZVdpZHRoID0gdGhpcy5kaW1zLndpZHRoO1xyXG4gICAgY29uc3QgYXZhaWxhYmxlSGVpZ2h0ID0gTWF0aC5tYXgodGhpcy5kaW1zLmhlaWdodCAvIDIgLSAxNSwgMCk7XHJcbiAgICBjb25zdCByZXNpemVTY2FsZVdpZHRoID0gTWF0aC5mbG9vcigoYXZhaWxhYmxlV2lkdGggLyAod2lkdGggLyByZXNpemVTY2FsZSkpICogMTAwKSAvIDEwMDtcclxuICAgIGNvbnN0IHJlc2l6ZVNjYWxlSGVpZ2h0ID0gTWF0aC5mbG9vcigoYXZhaWxhYmxlSGVpZ2h0IC8gKGhlaWdodCAvIHJlc2l6ZVNjYWxlKSkgKiAxMDApIC8gMTAwO1xyXG4gICAgcmVzaXplU2NhbGUgPSBNYXRoLm1pbihyZXNpemVTY2FsZUhlaWdodCwgcmVzaXplU2NhbGVXaWR0aCk7XHJcblxyXG4gICAgaWYgKHJlc2l6ZVNjYWxlICE9PSBvbGRTY2FsZSkge1xyXG4gICAgICBpZiAoZWxlbWVudCA9PT0gJ3ZhbHVlJykge1xyXG4gICAgICAgIHRoaXMudmFsdWVSZXNpemVTY2FsZSA9IHJlc2l6ZVNjYWxlO1xyXG4gICAgICAgIHRoaXMudmFsdWVUZXh0VHJhbnNmb3JtID0gYHNjYWxlKCR7cmVzaXplU2NhbGV9LCAke3Jlc2l6ZVNjYWxlfSlgO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMudW5pdHNSZXNpemVTY2FsZSA9IHJlc2l6ZVNjYWxlO1xyXG4gICAgICAgIHRoaXMudW5pdHNUZXh0VHJhbnNmb3JtID0gYHNjYWxlKCR7cmVzaXplU2NhbGV9LCAke3Jlc2l6ZVNjYWxlfSlgO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgIGlmIChyZXBlYXQpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuc2NhbGVUZXh0KGVsZW1lbnQsIGZhbHNlKTtcclxuICAgICAgICB9LCA1MCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uQ2xpY2soKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdC5lbWl0KHtcclxuICAgICAgbmFtZTogJ1ZhbHVlJyxcclxuICAgICAgdmFsdWU6IHRoaXMudmFsdWVcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0Q29sb3JzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jb2xvcnMgPSBuZXcgQ29sb3JIZWxwZXIodGhpcy5zY2hlbWUsICdvcmRpbmFsJywgW3RoaXMudmFsdWVdLCB0aGlzLmN1c3RvbUNvbG9ycyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==