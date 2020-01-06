import { __decorate } from "tslib";
import { Component, Input, ViewChild, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { scaleLinear } from 'd3-scale';
import { BaseChartComponent } from '../common/base-chart.component';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
let LinearGaugeComponent = class LinearGaugeComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.min = 0;
        this.max = 100;
        this.value = 0;
        this.margin = [10, 20, 10, 20];
        this.valueResizeScale = 1;
        this.unitsResizeScale = 1;
        this.valueTextTransform = '';
        this.valueTranslate = '';
        this.unitsTextTransform = '';
        this.unitsTranslate = '';
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        setTimeout(() => {
            this.scaleText('value');
            this.scaleText('units');
        });
    }
    update() {
        super.update();
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
        const xOffset = this.margin[3] + this.dims.width / 2;
        const yOffset = this.margin[0] + this.dims.height / 2;
        this.transform = `translate(${xOffset}, ${yOffset})`;
        this.transformLine = `translate(${this.margin[3] + this.valueScale(this.previousValue)}, ${yOffset})`;
        this.valueTranslate = `translate(0, -15)`;
        this.unitsTranslate = `translate(0, 15)`;
        setTimeout(() => this.scaleText('value'), 50);
        setTimeout(() => this.scaleText('units'), 50);
    }
    getValueDomain() {
        return [this.min, this.max];
    }
    getValueScale() {
        return scaleLinear()
            .range([0, this.dims.width])
            .domain(this.valueDomain);
    }
    getDisplayValue() {
        if (this.valueFormatting) {
            return this.valueFormatting(this.value);
        }
        return this.value.toLocaleString();
    }
    scaleText(element, repeat = true) {
        let el;
        let resizeScale;
        if (element === 'value') {
            el = this.valueTextEl;
            resizeScale = this.valueResizeScale;
        }
        else {
            el = this.unitsTextEl;
            resizeScale = this.unitsResizeScale;
        }
        const { width, height } = el.nativeElement.getBoundingClientRect();
        if (width === 0 || height === 0)
            return;
        const oldScale = resizeScale;
        const availableWidth = this.dims.width;
        const availableHeight = Math.max(this.dims.height / 2 - 15, 0);
        const resizeScaleWidth = Math.floor((availableWidth / (width / resizeScale)) * 100) / 100;
        const resizeScaleHeight = Math.floor((availableHeight / (height / resizeScale)) * 100) / 100;
        resizeScale = Math.min(resizeScaleHeight, resizeScaleWidth);
        if (resizeScale !== oldScale) {
            if (element === 'value') {
                this.valueResizeScale = resizeScale;
                this.valueTextTransform = `scale(${resizeScale}, ${resizeScale})`;
            }
            else {
                this.unitsResizeScale = resizeScale;
                this.unitsTextTransform = `scale(${resizeScale}, ${resizeScale})`;
            }
            this.cd.markForCheck();
            if (repeat) {
                setTimeout(() => {
                    this.scaleText(element, false);
                }, 50);
            }
        }
    }
    onClick() {
        this.select.emit({
            name: 'Value',
            value: this.value
        });
    }
    setColors() {
        this.colors = new ColorHelper(this.scheme, 'ordinal', [this.value], this.customColors);
    }
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
        template: `
    <ngx-charts-chart [view]="[width, height]" [showLegend]="false" [animations]="animations" (click)="onClick()">
      <svg:g class="linear-gauge chart">
        <svg:g
          ngx-charts-bar
          class="background-bar"
          [width]="dims.width"
          [height]="3"
          [x]="margin[3]"
          [y]="dims.height / 2 + margin[0] - 2"
          [data]="{}"
          [orientation]="'horizontal'"
          [roundEdges]="true"
          [animations]="animations"
        ></svg:g>
        <svg:g
          ngx-charts-bar
          [width]="valueScale(value)"
          [height]="3"
          [x]="margin[3]"
          [y]="dims.height / 2 + margin[0] - 2"
          [fill]="colors.getColor(units)"
          [data]="{}"
          [orientation]="'horizontal'"
          [roundEdges]="true"
          [animations]="animations"
        ></svg:g>

        <svg:line
          *ngIf="hasPreviousValue"
          [attr.transform]="transformLine"
          x1="0"
          y1="5"
          x2="0"
          y2="15"
          [attr.stroke]="colors.getColor(units)"
        />

        <svg:line
          *ngIf="hasPreviousValue"
          [attr.transform]="transformLine"
          x1="0"
          y1="-5"
          x2="0"
          y2="-15"
          [attr.stroke]="colors.getColor(units)"
        />

        <svg:g [attr.transform]="transform">
          <svg:g [attr.transform]="valueTranslate">
            <svg:text
              #valueTextEl
              class="value"
              [style.textAnchor]="'middle'"
              [attr.transform]="valueTextTransform"
              alignment-baseline="after-edge"
            >
              {{ displayValue }}
            </svg:text>
          </svg:g>

          <svg:g [attr.transform]="unitsTranslate">
            <svg:text
              #unitsTextEl
              class="units"
              [style.textAnchor]="'middle'"
              [attr.transform]="unitsTextTransform"
              alignment-baseline="before-edge"
            >
              {{ units }}
            </svg:text>
          </svg:g>
        </svg:g>
      </svg:g>
    </ngx-charts-chart>
  `,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".linear-gauge{cursor:pointer}.linear-gauge .background-bar path{fill:rgba(0,0,0,.05)}.linear-gauge .units{fill:#666}"]
    })
], LinearGaugeComponent);
export { LinearGaugeComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZWFyLWdhdWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2dhdWdlL2xpbmVhci1nYXVnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLFNBQVMsRUFFVCxpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFdkMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLHVCQUF1QixFQUFrQixNQUFNLGtDQUFrQyxDQUFDO0FBQzNGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQW9GckQsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxrQkFBa0I7SUFBNUQ7O1FBQ1csUUFBRyxHQUFXLENBQUMsQ0FBQztRQUNoQixRQUFHLEdBQVcsR0FBRyxDQUFDO1FBQ2xCLFVBQUssR0FBVyxDQUFDLENBQUM7UUFjM0IsV0FBTSxHQUFVLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFHakMscUJBQWdCLEdBQVcsQ0FBQyxDQUFDO1FBQzdCLHFCQUFnQixHQUFXLENBQUMsQ0FBQztRQUM3Qix1QkFBa0IsR0FBVyxFQUFFLENBQUM7UUFDaEMsbUJBQWMsR0FBVyxFQUFFLENBQUM7UUFDNUIsdUJBQWtCLEdBQVcsRUFBRSxDQUFDO1FBQ2hDLG1CQUFjLEdBQVcsRUFBRSxDQUFDO0lBOEc5QixDQUFDO0lBMUdDLGVBQWU7UUFDYixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxD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RUFBRTtpREFBbUI7QUFDbEI7SUFBUixLQUFLLEVBQUU7bURBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFO21EQUFlO0FBQ2Q7SUFBUixLQUFLLEVBQUU7MkRBQWU7QUFDZDtJQUFSLEtBQUssRUFBRTs2REFBc0I7QUFFSjtJQUF6QixTQUFTLENBQUMsYUFBYSxDQUFDO3lEQUF5QjtBQUN4QjtJQUF6QixTQUFTLENBQUMsYUFBYSxDQUFDO3lEQUF5QjtBQVR2QyxvQkFBb0I7SUFsRmhDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSx5QkFBeUI7UUFDbkMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyRVQ7UUFFRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtRQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7S0FDaEQsQ0FBQztHQUNXLG9CQUFvQixDQXVJaEM7U0F2SVksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgRWxlbWVudFJlZixcclxuICBWaWV3Q2hpbGQsXHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBWaWV3RW5jYXBzdWxhdGlvbixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBzY2FsZUxpbmVhciB9IGZyb20gJ2QzLXNjYWxlJztcclxuXHJcbmltcG9ydCB7IEJhc2VDaGFydENvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9iYXNlLWNoYXJ0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IGNhbGN1bGF0ZVZpZXdEaW1lbnNpb25zLCBWaWV3RGltZW5zaW9ucyB9IGZyb20gJy4uL2NvbW1vbi92aWV3LWRpbWVuc2lvbnMuaGVscGVyJztcclxuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY29sb3IuaGVscGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LWNoYXJ0cy1saW5lYXItZ2F1Z2UnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8bmd4LWNoYXJ0cy1jaGFydCBbdmlld109XCJbd2lkdGgsIGhlaWdodF1cIiBbc2hvd0xlZ2VuZF09XCJmYWxzZVwiIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIiAoY2xpY2spPVwib25DbGljaygpXCI+XHJcbiAgICAgIDxzdmc6ZyBjbGFzcz1cImxpbmVhci1nYXVnZSBjaGFydFwiPlxyXG4gICAgICAgIDxzdmc6Z1xyXG4gICAgICAgICAgbmd4LWNoYXJ0cy1iYXJcclxuICAgICAgICAgIGNsYXNzPVwiYmFja2dyb3VuZC1iYXJcIlxyXG4gICAgICAgICAgW3dpZHRoXT1cImRpbXMud2lkdGhcIlxyXG4gICAgICAgICAgW2hlaWdodF09XCIzXCJcclxuICAgICAgICAgIFt4XT1cIm1hcmdpblszXVwiXHJcbiAgICAgICAgICBbeV09XCJkaW1zLmhlaWdodCAvIDIgKyBtYXJnaW5bMF0gLSAyXCJcclxuICAgICAgICAgIFtkYXRhXT1cInt9XCJcclxuICAgICAgICAgIFtvcmllbnRhdGlvbl09XCInaG9yaXpvbnRhbCdcIlxyXG4gICAgICAgICAgW3JvdW5kRWRnZXNdPVwidHJ1ZVwiXHJcbiAgICAgICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcclxuICAgICAgICA+PC9zdmc6Zz5cclxuICAgICAgICA8c3ZnOmdcclxuICAgICAgICAgIG5neC1jaGFydHMtYmFyXHJcbiAgICAgICAgICBbd2lkdGhdPVwidmFsdWVTY2FsZSh2YWx1ZSlcIlxyXG4gICAgICAgICAgW2hlaWdodF09XCIzXCJcclxuICAgICAgICAgIFt4XT1cIm1hcmdpblszXVwiXHJcbiAgICAgICAgICBbeV09XCJkaW1zLmhlaWdodCAvIDIgKyBtYXJnaW5bMF0gLSAyXCJcclxuICAgICAgICAgIFtmaWxsXT1cImNvbG9ycy5nZXRDb2xvcih1bml0cylcIlxyXG4gICAgICAgICAgW2RhdGFdPVwie31cIlxyXG4gICAgICAgICAgW29yaWVudGF0aW9uXT1cIidob3Jpem9udGFsJ1wiXHJcbiAgICAgICAgICBbcm91bmRFZGdlc109XCJ0cnVlXCJcclxuICAgICAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxyXG4gICAgICAgID48L3N2ZzpnPlxyXG5cclxuICAgICAgICA8c3ZnOmxpbmVcclxuICAgICAgICAgICpuZ0lmPVwiaGFzUHJldmlvdXNWYWx1ZVwiXHJcbiAgICAgICAgICBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtTGluZVwiXHJcbiAgICAgICAgICB4MT1cIjBcIlxyXG4gICAgICAgICAgeTE9XCI1XCJcclxuICAgICAgICAgIHgyPVwiMFwiXHJcbiAgICAgICAgICB5Mj1cIjE1XCJcclxuICAgICAgICAgIFthdHRyLnN0cm9rZV09XCJjb2xvcnMuZ2V0Q29sb3IodW5pdHMpXCJcclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICA8c3ZnOmxpbmVcclxuICAgICAgICAgICpuZ0lmPVwiaGFzUHJldmlvdXNWYWx1ZVwiXHJcbiAgICAgICAgICBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtTGluZVwiXHJcbiAgICAgICAgICB4MT1cIjBcIlxyXG4gICAgICAgICAgeTE9XCItNVwiXHJcbiAgICAgICAgICB4Mj1cIjBcIlxyXG4gICAgICAgICAgeTI9XCItMTVcIlxyXG4gICAgICAgICAgW2F0dHIuc3Ryb2tlXT1cImNvbG9ycy5nZXRDb2xvcih1bml0cylcIlxyXG4gICAgICAgIC8+XHJcblxyXG4gICAgICAgIDxzdmc6ZyBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtXCI+XHJcbiAgICAgICAgICA8c3ZnOmcgW2F0dHIudHJhbnNmb3JtXT1cInZhbHVlVHJhbnNsYXRlXCI+XHJcbiAgICAgICAgICAgIDxzdmc6dGV4dFxyXG4gICAgICAgICAgICAgICN2YWx1ZVRleHRFbFxyXG4gICAgICAgICAgICAgIGNsYXNzPVwidmFsdWVcIlxyXG4gICAgICAgICAgICAgIFtzdHlsZS50ZXh0QW5jaG9yXT1cIidtaWRkbGUnXCJcclxuICAgICAgICAgICAgICBbYXR0ci50cmFuc2Zvcm1dPVwidmFsdWVUZXh0VHJhbnNmb3JtXCJcclxuICAgICAgICAgICAgICBhbGlnbm1lbnQtYmFzZWxpbmU9XCJhZnRlci1lZGdlXCJcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHt7IGRpc3BsYXlWYWx1ZSB9fVxyXG4gICAgICAgICAgICA8L3N2Zzp0ZXh0PlxyXG4gICAgICAgICAgPC9zdmc6Zz5cclxuXHJcbiAgICAgICAgICA8c3ZnOmcgW2F0dHIudHJhbnNmb3JtXT1cInVuaXRzVHJhbnNsYXRlXCI+XHJcbiAgICAgICAgICAgIDxzdmc6dGV4dFxyXG4gICAgICAgICAgICAgICN1bml0c1RleHRFbFxyXG4gICAgICAgICAgICAgIGNsYXNzPVwidW5pdHNcIlxyXG4gICAgICAgICAgICAgIFtzdHlsZS50ZXh0QW5jaG9yXT1cIidtaWRkbGUnXCJcclxuICAgICAgICAgICAgICBbYXR0ci50cmFuc2Zvcm1dPVwidW5pdHNUZXh0VHJhbnNmb3JtXCJcclxuICAgICAgICAgICAgICBhbGlnbm1lbnQtYmFzZWxpbmU9XCJiZWZvcmUtZWRnZVwiXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7eyB1bml0cyB9fVxyXG4gICAgICAgICAgICA8L3N2Zzp0ZXh0PlxyXG4gICAgICAgICAgPC9zdmc6Zz5cclxuICAgICAgICA8L3N2ZzpnPlxyXG4gICAgICA8L3N2ZzpnPlxyXG4gICAgPC9uZ3gtY2hhcnRzLWNoYXJ0PlxyXG4gIGAsXHJcbiAgc3R5bGVVcmxzOiBbJy4uL2NvbW1vbi9iYXNlLWNoYXJ0LmNvbXBvbmVudC5zY3NzJywgJy4vbGluZWFyLWdhdWdlLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGluZWFyR2F1Z2VDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ2hhcnRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuICBASW5wdXQoKSBtaW46IG51bWJlciA9IDA7XHJcbiAgQElucHV0KCkgbWF4OiBudW1iZXIgPSAxMDA7XHJcbiAgQElucHV0KCkgdmFsdWU6IG51bWJlciA9IDA7XHJcbiAgQElucHV0KCkgdW5pdHM6IHN0cmluZztcclxuICBASW5wdXQoKSBwcmV2aW91c1ZhbHVlO1xyXG4gIEBJbnB1dCgpIHZhbHVlRm9ybWF0dGluZzogYW55O1xyXG5cclxuICBAVmlld0NoaWxkKCd2YWx1ZVRleHRFbCcpIHZhbHVlVGV4dEVsOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ3VuaXRzVGV4dEVsJykgdW5pdHNUZXh0RWw6IEVsZW1lbnRSZWY7XHJcblxyXG4gIGRpbXM6IFZpZXdEaW1lbnNpb25zO1xyXG4gIHZhbHVlRG9tYWluOiBhbnk7XHJcbiAgdmFsdWVTY2FsZTogYW55O1xyXG5cclxuICBjb2xvcnM6IENvbG9ySGVscGVyO1xyXG4gIHRyYW5zZm9ybTogc3RyaW5nO1xyXG4gIG1hcmdpbjogYW55W10gPSBbMTAsIDIwLCAxMCwgMjBdO1xyXG4gIHRyYW5zZm9ybUxpbmU6IHN0cmluZztcclxuXHJcbiAgdmFsdWVSZXNpemVTY2FsZTogbnVtYmVyID0gMTtcclxuICB1bml0c1Jlc2l6ZVNjYWxlOiBudW1iZXIgPSAxO1xyXG4gIHZhbHVlVGV4dFRyYW5zZm9ybTogc3RyaW5nID0gJyc7XHJcbiAgdmFsdWVUcmFuc2xhdGU6IHN0cmluZyA9ICcnO1xyXG4gIHVuaXRzVGV4dFRyYW5zZm9ybTogc3RyaW5nID0gJyc7XHJcbiAgdW5pdHNUcmFuc2xhdGU6IHN0cmluZyA9ICcnO1xyXG4gIGRpc3BsYXlWYWx1ZTogc3RyaW5nO1xyXG4gIGhhc1ByZXZpb3VzVmFsdWU6IGJvb2xlYW47XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuc2NhbGVUZXh0KCd2YWx1ZScpO1xyXG4gICAgICB0aGlzLnNjYWxlVGV4dCgndW5pdHMnKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgc3VwZXIudXBkYXRlKCk7XHJcblxyXG4gICAgdGhpcy5oYXNQcmV2aW91c1ZhbHVlID0gdGhpcy5wcmV2aW91c1ZhbHVlICE9PSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLm1heCA9IE1hdGgubWF4KHRoaXMubWF4LCB0aGlzLnZhbHVlKTtcclxuICAgIHRoaXMubWluID0gTWF0aC5taW4odGhpcy5taW4sIHRoaXMudmFsdWUpO1xyXG4gICAgaWYgKHRoaXMuaGFzUHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICB0aGlzLm1heCA9IE1hdGgubWF4KHRoaXMubWF4LCB0aGlzLnByZXZpb3VzVmFsdWUpO1xyXG4gICAgICB0aGlzLm1pbiA9IE1hdGgubWluKHRoaXMubWluLCB0aGlzLnByZXZpb3VzVmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZGltcyA9IGNhbGN1bGF0ZVZpZXdEaW1lbnNpb25zKHtcclxuICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXHJcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXHJcbiAgICAgIG1hcmdpbnM6IHRoaXMubWFyZ2luXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnZhbHVlRG9tYWluID0gdGhpcy5nZXRWYWx1ZURvbWFpbigpO1xyXG4gICAgdGhpcy52YWx1ZVNjYWxlID0gdGhpcy5nZXRWYWx1ZVNjYWxlKCk7XHJcbiAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHRoaXMuZ2V0RGlzcGxheVZhbHVlKCk7XHJcblxyXG4gICAgdGhpcy5zZXRDb2xvcnMoKTtcclxuXHJcbiAgICBjb25zdCB4T2Zmc2V0ID0gdGhpcy5tYXJnaW5bM10gKyB0aGlzLmRpbXMud2lkdGggLyAyO1xyXG4gICAgY29uc3QgeU9mZnNldCA9IHRoaXMubWFyZ2luWzBdICsgdGhpcy5kaW1zLmhlaWdodCAvIDI7XHJcblxyXG4gICAgdGhpcy50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eE9mZnNldH0sICR7eU9mZnNldH0pYDtcclxuICAgIHRoaXMudHJhbnNmb3JtTGluZSA9IGB0cmFuc2xhdGUoJHt0aGlzLm1hcmdpblszXSArIHRoaXMudmFsdWVTY2FsZSh0aGlzLnByZXZpb3VzVmFsdWUpfSwgJHt5T2Zmc2V0fSlgO1xyXG4gICAgdGhpcy52YWx1ZVRyYW5zbGF0ZSA9IGB0cmFuc2xhdGUoMCwgLTE1KWA7XHJcbiAgICB0aGlzLnVuaXRzVHJhbnNsYXRlID0gYHRyYW5zbGF0ZSgwLCAxNSlgO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnNjYWxlVGV4dCgndmFsdWUnKSwgNTApO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnNjYWxlVGV4dCgndW5pdHMnKSwgNTApO1xyXG4gIH1cclxuXHJcbiAgZ2V0VmFsdWVEb21haW4oKTogYW55W10ge1xyXG4gICAgcmV0dXJuIFt0aGlzLm1pbiwgdGhpcy5tYXhdO1xyXG4gIH1cclxuXHJcbiAgZ2V0VmFsdWVTY2FsZSgpOiBhbnkge1xyXG4gICAgcmV0dXJuIHNjYWxlTGluZWFyKClcclxuICAgICAgLnJhbmdlKFswLCB0aGlzLmRpbXMud2lkdGhdKVxyXG4gICAgICAuZG9tYWluKHRoaXMudmFsdWVEb21haW4pO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGlzcGxheVZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICBpZiAodGhpcy52YWx1ZUZvcm1hdHRpbmcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudmFsdWVGb3JtYXR0aW5nKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMudmFsdWUudG9Mb2NhbGVTdHJpbmcoKTtcclxuICB9XHJcblxyXG4gIHNjYWxlVGV4dChlbGVtZW50LCByZXBlYXQ6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XHJcbiAgICBsZXQgZWw7XHJcbiAgICBsZXQgcmVzaXplU2NhbGU7XHJcbiAgICBpZiAoZWxlbWVudCA9PT0gJ3ZhbHVlJykge1xyXG4gICAgICBlbCA9IHRoaXMudmFsdWVUZXh0RWw7XHJcbiAgICAgIHJlc2l6ZVNjYWxlID0gdGhpcy52YWx1ZVJlc2l6ZVNjYWxlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZWwgPSB0aGlzLnVuaXRzVGV4dEVsO1xyXG4gICAgICByZXNpemVTY2FsZSA9IHRoaXMudW5pdHNSZXNpemVTY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IGVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBpZiAod2lkdGggPT09IDAgfHwgaGVpZ2h0ID09PSAwKSByZXR1cm47XHJcbiAgICBjb25zdCBvbGRTY2FsZSA9IHJlc2l6ZVNjYWxlO1xyXG4gICAgY29uc3QgYXZhaWxhYmxlV2lkdGggPSB0aGlzLmRpbXMud2lkdGg7XHJcbiAgICBjb25zdCBhdmFpbGFibGVIZWlnaHQgPSBNYXRoLm1heCh0aGlzLmRpbXMuaGVpZ2h0IC8gMiAtIDE1LCAwKTtcclxuICAgIGNvbnN0IHJlc2l6ZVNjYWxlV2lkdGggPSBNYXRoLmZsb29yKChhdmFpbGFibGVXaWR0aCAvICh3aWR0aCAvIHJlc2l6ZVNjYWxlKSkgKiAxMDApIC8gMTAwO1xyXG4gICAgY29uc3QgcmVzaXplU2NhbGVIZWlnaHQgPSBNYXRoLmZsb29yKChhdmFpbGFibGVIZWlnaHQgLyAoaGVpZ2h0IC8gcmVzaXplU2NhbGUpKSAqIDEwMCkgLyAxMDA7XHJcbiAgICByZXNpemVTY2FsZSA9IE1hdGgubWluKHJlc2l6ZVNjYWxlSGVpZ2h0LCByZXNpemVTY2FsZVdpZHRoKTtcclxuXHJcbiAgICBpZiAocmVzaXplU2NhbGUgIT09IG9sZFNjYWxlKSB7XHJcbiAgICAgIGlmIChlbGVtZW50ID09PSAndmFsdWUnKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZVJlc2l6ZVNjYWxlID0gcmVzaXplU2NhbGU7XHJcbiAgICAgICAgdGhpcy52YWx1ZVRleHRUcmFuc2Zvcm0gPSBgc2NhbGUoJHtyZXNpemVTY2FsZX0sICR7cmVzaXplU2NhbGV9KWA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy51bml0c1Jlc2l6ZVNjYWxlID0gcmVzaXplU2NhbGU7XHJcbiAgICAgICAgdGhpcy51bml0c1RleHRUcmFuc2Zvcm0gPSBgc2NhbGUoJHtyZXNpemVTY2FsZX0sICR7cmVzaXplU2NhbGV9KWA7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgaWYgKHJlcGVhdCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zY2FsZVRleHQoZWxlbWVudCwgZmFsc2UpO1xyXG4gICAgICAgIH0sIDUwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25DbGljaygpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0LmVtaXQoe1xyXG4gICAgICBuYW1lOiAnVmFsdWUnLFxyXG4gICAgICB2YWx1ZTogdGhpcy52YWx1ZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRDb2xvcnMoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNvbG9ycyA9IG5ldyBDb2xvckhlbHBlcih0aGlzLnNjaGVtZSwgJ29yZGluYWwnLCBbdGhpcy52YWx1ZV0sIHRoaXMuY3VzdG9tQ29sb3JzKTtcclxuICB9XHJcbn1cclxuIl19