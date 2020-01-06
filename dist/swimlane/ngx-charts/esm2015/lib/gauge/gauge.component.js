import { __decorate } from "tslib";
import { Component, Input, ViewChild, ChangeDetectionStrategy, Output, EventEmitter, ViewEncapsulation, ContentChild } from '@angular/core';
import { scaleLinear } from 'd3-scale';
import { BaseChartComponent } from '../common/base-chart.component';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
let GaugeComponent = class GaugeComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.legend = false;
        this.legendTitle = 'Legend';
        this.legendPosition = 'right';
        this.min = 0;
        this.max = 100;
        this.bigSegments = 10;
        this.smallSegments = 5;
        this.showAxis = true;
        this.startAngle = -120;
        this.angleSpan = 240;
        this.activeEntries = [];
        this.tooltipDisabled = false;
        this.showText = true;
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.resizeScale = 1;
        this.rotation = '';
        this.textTransform = 'scale(1, 1)';
        this.cornerRadius = 10;
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        setTimeout(() => this.scaleText());
    }
    update() {
        super.update();
        if (!this.showAxis) {
            if (!this.margin) {
                this.margin = [10, 20, 10, 20];
            }
        }
        else {
            if (!this.margin) {
                this.margin = [60, 100, 60, 100];
            }
        }
        // make the starting angle positive
        if (this.startAngle < 0) {
            this.startAngle = (this.startAngle % 360) + 360;
        }
        this.angleSpan = Math.min(this.angleSpan, 360);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showLegend: this.legend,
            legendPosition: this.legendPosition
        });
        this.domain = this.getDomain();
        this.valueDomain = this.getValueDomain();
        this.valueScale = this.getValueScale();
        this.displayValue = this.getDisplayValue();
        this.outerRadius = Math.min(this.dims.width, this.dims.height) / 2;
        this.arcs = this.getArcs();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        const xOffset = this.margin[3] + this.dims.width / 2;
        const yOffset = this.margin[0] + this.dims.height / 2;
        this.transform = `translate(${xOffset}, ${yOffset})`;
        this.rotation = `rotate(${this.startAngle})`;
        setTimeout(() => this.scaleText(), 50);
    }
    getArcs() {
        const arcs = [];
        const availableRadius = this.outerRadius * 0.7;
        const radiusPerArc = Math.min(availableRadius / this.results.length, 10);
        const arcWidth = radiusPerArc * 0.7;
        this.textRadius = this.outerRadius - this.results.length * radiusPerArc;
        this.cornerRadius = Math.floor(arcWidth / 2);
        let i = 0;
        for (const d of this.results) {
            const outerRadius = this.outerRadius - i * radiusPerArc;
            const innerRadius = outerRadius - arcWidth;
            const backgroundArc = {
                endAngle: (this.angleSpan * Math.PI) / 180,
                innerRadius,
                outerRadius,
                data: {
                    value: this.max,
                    name: d.name
                }
            };
            const valueArc = {
                endAngle: (Math.min(this.valueScale(d.value), this.angleSpan) * Math.PI) / 180,
                innerRadius,
                outerRadius,
                data: {
                    value: d.value,
                    name: d.name
                }
            };
            const arc = {
                backgroundArc,
                valueArc
            };
            arcs.push(arc);
            i++;
        }
        return arcs;
    }
    getDomain() {
        return this.results.map(d => d.name);
    }
    getValueDomain() {
        const values = this.results.map(d => d.value);
        const dataMin = Math.min(...values);
        const dataMax = Math.max(...values);
        if (this.min !== undefined) {
            this.min = Math.min(this.min, dataMin);
        }
        else {
            this.min = dataMin;
        }
        if (this.max !== undefined) {
            this.max = Math.max(this.max, dataMax);
        }
        else {
            this.max = dataMax;
        }
        return [this.min, this.max];
    }
    getValueScale() {
        return scaleLinear()
            .range([0, this.angleSpan])
            .nice()
            .domain(this.valueDomain);
    }
    getDisplayValue() {
        const value = this.results.map(d => d.value).reduce((a, b) => a + b, 0);
        if (this.textValue && 0 !== this.textValue.length) {
            return this.textValue.toLocaleString();
        }
        if (this.valueFormatting) {
            return this.valueFormatting(value);
        }
        return value.toLocaleString();
    }
    scaleText(repeat = true) {
        if (!this.showText) {
            return;
        }
        const { width } = this.textEl.nativeElement.getBoundingClientRect();
        const oldScale = this.resizeScale;
        if (width === 0) {
            this.resizeScale = 1;
        }
        else {
            const availableSpace = this.textRadius;
            this.resizeScale = Math.floor((availableSpace / (width / this.resizeScale)) * 100) / 100;
        }
        if (this.resizeScale !== oldScale) {
            this.textTransform = `scale(${this.resizeScale}, ${this.resizeScale})`;
            this.cd.markForCheck();
            if (repeat) {
                setTimeout(() => this.scaleText(false), 50);
            }
        }
    }
    onClick(data) {
        this.select.emit(data);
    }
    getLegendOptions() {
        return {
            scaleType: 'ordinal',
            colors: this.colors,
            domain: this.domain,
            title: this.legendTitle,
            position: this.legendPosition
        };
    }
    setColors() {
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    }
    onActivate(item) {
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item, ...this.activeEntries];
        this.activate.emit({ value: item, entries: this.activeEntries });
    }
    onDeactivate(item) {
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = [...this.activeEntries];
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    }
    isActive(entry) {
        if (!this.activeEntries)
            return false;
        const item = this.activeEntries.find(d => {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    }
    trackBy(index, item) {
        return item.valueArc.data.name;
    }
};
__decorate([
    Input()
], GaugeComponent.prototype, "legend", void 0);
__decorate([
    Input()
], GaugeComponent.prototype, "legendTitle", void 0);
__decorate([
    Input()
], GaugeComponent.prototype, "legendPosition", void 0);
__decorate([
    Input()
], GaugeComponent.prototype, "min", void 0);
__decorate([
    Input()
], GaugeComponent.prototype, "max", void 0);
__decorate([
    Input()
], GaugeComponent.prototype, "textValue", void 0);
__decorate([
    Input()
], GaugeComponent.prototype, "units", void 0);
__decorate([
    Input()
], GaugeComponent.prototype, "bigSegments", void 0);
__decorate([
    Input()
], GaugeComponent.prototype, "smallSegments", void 0);
__decorate([
    Input()
], GaugeComponent.prototype, "results", void 0);
__decorate([
    Input()
], GaugeComponent.prototype, "showAxis", void 0);
__decorate([
    Input()
], GaugeComponent.prototype, "startAngle", void 0);
__decorate([
    Input()
], GaugeComponent.prototype, "angleSpan", void 0);
__decorate([
    Input()
], GaugeComponent.prototype, "activeEntries", void 0);
__decorate([
    Input()
], GaugeComponent.prototype, "axisTickFormatting", void 0);
__decorate([
    Input()
], GaugeComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input()
], GaugeComponent.prototype, "valueFormatting", void 0);
__decorate([
    Input()
], GaugeComponent.prototype, "showText", void 0);
__decorate([
    Input()
], GaugeComponent.prototype, "margin", void 0);
__decorate([
    Output()
], GaugeComponent.prototype, "activate", void 0);
__decorate([
    Output()
], GaugeComponent.prototype, "deactivate", void 0);
__decorate([
    ContentChild('tooltipTemplate')
], GaugeComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    ViewChild('textEl')
], GaugeComponent.prototype, "textEl", void 0);
GaugeComponent = __decorate([
    Component({
        selector: 'ngx-charts-gauge',
        template: `
    <ngx-charts-chart
      [view]="[width, height]"
      [showLegend]="legend"
      [legendOptions]="legendOptions"
      [activeEntries]="activeEntries"
      [animations]="animations"
      (legendLabelClick)="onClick($event)"
      (legendLabelActivate)="onActivate($event)"
      (legendLabelDeactivate)="onDeactivate($event)"
    >
      <svg:g [attr.transform]="transform" class="gauge chart">
        <svg:g *ngFor="let arc of arcs; trackBy: trackBy" [attr.transform]="rotation">
          <svg:g
            ngx-charts-gauge-arc
            [backgroundArc]="arc.backgroundArc"
            [valueArc]="arc.valueArc"
            [cornerRadius]="cornerRadius"
            [colors]="colors"
            [isActive]="isActive(arc.valueArc.data)"
            [tooltipDisabled]="tooltipDisabled"
            [tooltipTemplate]="tooltipTemplate"
            [valueFormatting]="valueFormatting"
            [animations]="animations"
            (select)="onClick($event)"
            (activate)="onActivate($event)"
            (deactivate)="onDeactivate($event)"
          ></svg:g>
        </svg:g>

        <svg:g
          ngx-charts-gauge-axis
          *ngIf="showAxis"
          [bigSegments]="bigSegments"
          [smallSegments]="smallSegments"
          [min]="min"
          [max]="max"
          [radius]="outerRadius"
          [angleSpan]="angleSpan"
          [valueScale]="valueScale"
          [startAngle]="startAngle"
          [tickFormatting]="axisTickFormatting"
        ></svg:g>

        <svg:text
          #textEl
          *ngIf="showText"
          [style.textAnchor]="'middle'"
          [attr.transform]="textTransform"
          alignment-baseline="central"
        >
          <tspan x="0" dy="0">{{ displayValue }}</tspan>
          <tspan x="0" dy="1.2em">{{ units }}</tspan>
        </svg:text>
      </svg:g>
    </ngx-charts-chart>
  `,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".gauge .background-arc path{fill:rgba(0,0,0,.05)}.gauge .gauge-tick path{stroke:#666}.gauge .gauge-tick text{font-size:12px;fill:#666;font-weight:700}.gauge .gauge-tick-large path{stroke-width:2px}.gauge .gauge-tick-small path{stroke-width:1px}"]
    })
], GaugeComponent);
export { GaugeComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F1Z2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvZ2F1Z2UvZ2F1Z2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxTQUFTLEVBRVQsdUJBQXVCLEVBQ3ZCLE1BQU0sRUFDTixZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLFlBQVksRUFFYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRXZDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSx1QkFBdUIsRUFBa0IsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFpRXJELElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWUsU0FBUSxrQkFBa0I7SUFBdEQ7O1FBQ1csV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLGdCQUFXLEdBQVcsUUFBUSxDQUFDO1FBQy9CLG1CQUFjLEdBQVcsT0FBTyxDQUFDO1FBQ2pDLFFBQUcsR0FBVyxDQUFDLENBQUM7UUFDaEIsUUFBRyxHQUFXLEdBQUcsQ0FBQztRQUdsQixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUUxQixhQUFRLEdBQVksSUFBSSxDQUFDO1FBQ3pCLGVBQVUsR0FBVyxDQUFDLEdBQUcsQ0FBQztRQUMxQixjQUFTLEdBQVcsR0FBRyxDQUFDO1FBQ3hCLGtCQUFhLEdBQVUsRUFBRSxDQUFDO1FBRTFCLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBRWpDLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFLeEIsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pELGVBQVUsR0FBc0IsSUFBSSxZ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RTt1REFBa0M7QUFDakM7SUFBUixLQUFLLEVBQUU7dURBQXlDO0FBQ3hDO0lBQVIsS0FBSyxFQUFFO2dEQUEwQjtBQUd6QjtJQUFSLEtBQUssRUFBRTs4Q0FBZTtBQUViO0lBQVQsTUFBTSxFQUFFO2dEQUFrRDtBQUNqRDtJQUFULE1BQU0sRUFBRTtrREFBb0Q7QUFFNUI7SUFBaEMsWUFBWSxDQUFDLGlCQUFpQixDQUFDO3VEQUFtQztBQUU5QztJQUFwQixTQUFTLENBQUMsUUFBUSxDQUFDOzhDQUFvQjtBQTVCN0IsY0FBYztJQS9EMUIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0RUO1FBRUQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7UUFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O0tBQ2hELENBQUM7R0FDVyxjQUFjLENBNFExQjtTQTVRWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgRWxlbWVudFJlZixcclxuICBWaWV3Q2hpbGQsXHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBUZW1wbGF0ZVJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBzY2FsZUxpbmVhciB9IGZyb20gJ2QzLXNjYWxlJztcclxuXHJcbmltcG9ydCB7IEJhc2VDaGFydENvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9iYXNlLWNoYXJ0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IGNhbGN1bGF0ZVZpZXdEaW1lbnNpb25zLCBWaWV3RGltZW5zaW9ucyB9IGZyb20gJy4uL2NvbW1vbi92aWV3LWRpbWVuc2lvbnMuaGVscGVyJztcclxuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY29sb3IuaGVscGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LWNoYXJ0cy1nYXVnZScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZ3gtY2hhcnRzLWNoYXJ0XHJcbiAgICAgIFt2aWV3XT1cIlt3aWR0aCwgaGVpZ2h0XVwiXHJcbiAgICAgIFtzaG93TGVnZW5kXT1cImxlZ2VuZFwiXHJcbiAgICAgIFtsZWdlbmRPcHRpb25zXT1cImxlZ2VuZE9wdGlvbnNcIlxyXG4gICAgICBbYWN0aXZlRW50cmllc109XCJhY3RpdmVFbnRyaWVzXCJcclxuICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgIChsZWdlbmRMYWJlbENsaWNrKT1cIm9uQ2xpY2soJGV2ZW50KVwiXHJcbiAgICAgIChsZWdlbmRMYWJlbEFjdGl2YXRlKT1cIm9uQWN0aXZhdGUoJGV2ZW50KVwiXHJcbiAgICAgIChsZWdlbmRMYWJlbERlYWN0aXZhdGUpPVwib25EZWFjdGl2YXRlKCRldmVudClcIlxyXG4gICAgPlxyXG4gICAgICA8c3ZnOmcgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybVwiIGNsYXNzPVwiZ2F1Z2UgY2hhcnRcIj5cclxuICAgICAgICA8c3ZnOmcgKm5nRm9yPVwibGV0IGFyYyBvZiBhcmNzOyB0cmFja0J5OiB0cmFja0J5XCIgW2F0dHIudHJhbnNmb3JtXT1cInJvdGF0aW9uXCI+XHJcbiAgICAgICAgICA8c3ZnOmdcclxuICAgICAgICAgICAgbmd4LWNoYXJ0cy1nYXVnZS1hcmNcclxuICAgICAgICAgICAgW2JhY2tncm91bmRBcmNdPVwiYXJjLmJhY2tncm91bmRBcmNcIlxyXG4gICAgICAgICAgICBbdmFsdWVBcmNdPVwiYXJjLnZhbHVlQXJjXCJcclxuICAgICAgICAgICAgW2Nvcm5lclJhZGl1c109XCJjb3JuZXJSYWRpdXNcIlxyXG4gICAgICAgICAgICBbY29sb3JzXT1cImNvbG9yc1wiXHJcbiAgICAgICAgICAgIFtpc0FjdGl2ZV09XCJpc0FjdGl2ZShhcmMudmFsdWVBcmMuZGF0YSlcIlxyXG4gICAgICAgICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXHJcbiAgICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcclxuICAgICAgICAgICAgW3ZhbHVlRm9ybWF0dGluZ109XCJ2YWx1ZUZvcm1hdHRpbmdcIlxyXG4gICAgICAgICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcclxuICAgICAgICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKCRldmVudClcIlxyXG4gICAgICAgICAgICAoYWN0aXZhdGUpPVwib25BY3RpdmF0ZSgkZXZlbnQpXCJcclxuICAgICAgICAgICAgKGRlYWN0aXZhdGUpPVwib25EZWFjdGl2YXRlKCRldmVudClcIlxyXG4gICAgICAgICAgPjwvc3ZnOmc+XHJcbiAgICAgICAgPC9zdmc6Zz5cclxuXHJcbiAgICAgICAgPHN2ZzpnXHJcbiAgICAgICAgICBuZ3gtY2hhcnRzLWdhdWdlLWF4aXNcclxuICAgICAgICAgICpuZ0lmPVwic2hvd0F4aXNcIlxyXG4gICAgICAgICAgW2JpZ1NlZ21lbnRzXT1cImJpZ1NlZ21lbnRzXCJcclxuICAgICAgICAgIFtzbWFsbFNlZ21lbnRzXT1cInNtYWxsU2VnbWVudHNcIlxyXG4gICAgICAgICAgW21pbl09XCJtaW5cIlxyXG4gICAgICAgICAgW21heF09XCJtYXhcIlxyXG4gICAgICAgICAgW3JhZGl1c109XCJvdXRlclJhZGl1c1wiXHJcbiAgICAgICAgICBbYW5nbGVTcGFuXT1cImFuZ2xlU3BhblwiXHJcbiAgICAgICAgICBbdmFsdWVTY2FsZV09XCJ2YWx1ZVNjYWxlXCJcclxuICAgICAgICAgIFtzdGFydEFuZ2xlXT1cInN0YXJ0QW5nbGVcIlxyXG4gICAgICAgICAgW3RpY2tGb3JtYXR0aW5nXT1cImF4aXNUaWNrRm9ybWF0dGluZ1wiXHJcbiAgICAgICAgPjwvc3ZnOmc+XHJcblxyXG4gICAgICAgIDxzdmc6dGV4dFxyXG4gICAgICAgICAgI3RleHRFbFxyXG4gICAgICAgICAgKm5nSWY9XCJzaG93VGV4dFwiXHJcbiAgICAgICAgICBbc3R5bGUudGV4dEFuY2hvcl09XCInbWlkZGxlJ1wiXHJcbiAgICAgICAgICBbYXR0ci50cmFuc2Zvcm1dPVwidGV4dFRyYW5zZm9ybVwiXHJcbiAgICAgICAgICBhbGlnbm1lbnQtYmFzZWxpbmU9XCJjZW50cmFsXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8dHNwYW4geD1cIjBcIiBkeT1cIjBcIj57eyBkaXNwbGF5VmFsdWUgfX08L3RzcGFuPlxyXG4gICAgICAgICAgPHRzcGFuIHg9XCIwXCIgZHk9XCIxLjJlbVwiPnt7IHVuaXRzIH19PC90c3Bhbj5cclxuICAgICAgICA8L3N2Zzp0ZXh0PlxyXG4gICAgICA8L3N2ZzpnPlxyXG4gICAgPC9uZ3gtY2hhcnRzLWNoYXJ0PlxyXG4gIGAsXHJcbiAgc3R5bGVVcmxzOiBbJy4uL2NvbW1vbi9iYXNlLWNoYXJ0LmNvbXBvbmVudC5zY3NzJywgJy4vZ2F1Z2UuY29tcG9uZW50LnNjc3MnXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYXVnZUNvbXBvbmVudCBleHRlbmRzIEJhc2VDaGFydENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xyXG4gIEBJbnB1dCgpIGxlZ2VuZCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGxlZ2VuZFRpdGxlOiBzdHJpbmcgPSAnTGVnZW5kJztcclxuICBASW5wdXQoKSBsZWdlbmRQb3NpdGlvbjogc3RyaW5nID0gJ3JpZ2h0JztcclxuICBASW5wdXQoKSBtaW46IG51bWJlciA9IDA7XHJcbiAgQElucHV0KCkgbWF4OiBudW1iZXIgPSAxMDA7XHJcbiAgQElucHV0KCkgdGV4dFZhbHVlOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgdW5pdHM6IHN0cmluZztcclxuICBASW5wdXQoKSBiaWdTZWdtZW50czogbnVtYmVyID0gMTA7XHJcbiAgQElucHV0KCkgc21hbGxTZWdtZW50czogbnVtYmVyID0gNTtcclxuICBASW5wdXQoKSByZXN1bHRzOiBhbnlbXTtcclxuICBASW5wdXQoKSBzaG93QXhpczogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCkgc3RhcnRBbmdsZTogbnVtYmVyID0gLTEyMDtcclxuICBASW5wdXQoKSBhbmdsZVNwYW46IG51bWJlciA9IDI0MDtcclxuICBASW5wdXQoKSBhY3RpdmVFbnRyaWVzOiBhbnlbXSA9IFtdO1xyXG4gIEBJbnB1dCgpIGF4aXNUaWNrRm9ybWF0dGluZzogYW55O1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHZhbHVlRm9ybWF0dGluZzogKHZhbHVlOiBhbnkpID0+IHN0cmluZztcclxuICBASW5wdXQoKSBzaG93VGV4dDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIC8vIFNwZWNpZnkgbWFyZ2luc1xyXG4gIEBJbnB1dCgpIG1hcmdpbjogYW55W107XHJcblxyXG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBAQ29udGVudENoaWxkKCd0b29sdGlwVGVtcGxhdGUnKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ3RleHRFbCcpIHRleHRFbDogRWxlbWVudFJlZjtcclxuXHJcbiAgZGltczogVmlld0RpbWVuc2lvbnM7XHJcbiAgZG9tYWluOiBhbnlbXTtcclxuICB2YWx1ZURvbWFpbjogYW55O1xyXG4gIHZhbHVlU2NhbGU6IGFueTtcclxuXHJcbiAgY29sb3JzOiBDb2xvckhlbHBlcjtcclxuICB0cmFuc2Zvcm06IHN0cmluZztcclxuXHJcbiAgb3V0ZXJSYWRpdXM6IG51bWJlcjtcclxuICB0ZXh0UmFkaXVzOiBudW1iZXI7IC8vIG1heCBhdmFpbGFibGUgcmFkaXVzIGZvciB0aGUgdGV4dFxyXG4gIHJlc2l6ZVNjYWxlOiBudW1iZXIgPSAxO1xyXG4gIHJvdGF0aW9uOiBzdHJpbmcgPSAnJztcclxuICB0ZXh0VHJhbnNmb3JtOiBzdHJpbmcgPSAnc2NhbGUoMSwgMSknO1xyXG4gIGNvcm5lclJhZGl1czogbnVtYmVyID0gMTA7XHJcbiAgYXJjczogYW55W107XHJcbiAgZGlzcGxheVZhbHVlOiBzdHJpbmc7XHJcbiAgbGVnZW5kT3B0aW9uczogYW55O1xyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zY2FsZVRleHQoKSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICBzdXBlci51cGRhdGUoKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuc2hvd0F4aXMpIHtcclxuICAgICAgaWYgKCF0aGlzLm1hcmdpbikge1xyXG4gICAgICAgIHRoaXMubWFyZ2luID0gWzEwLCAyMCwgMTAsIDIwXTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKCF0aGlzLm1hcmdpbikge1xyXG4gICAgICAgIHRoaXMubWFyZ2luID0gWzYwLCAxMDAsIDYwLCAxMDBdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbWFrZSB0aGUgc3RhcnRpbmcgYW5nbGUgcG9zaXRpdmVcclxuICAgIGlmICh0aGlzLnN0YXJ0QW5nbGUgPCAwKSB7XHJcbiAgICAgIHRoaXMuc3RhcnRBbmdsZSA9ICh0aGlzLnN0YXJ0QW5nbGUgJSAzNjApICsgMzYwO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYW5nbGVTcGFuID0gTWF0aC5taW4odGhpcy5hbmdsZVNwYW4sIDM2MCk7XHJcblxyXG4gICAgdGhpcy5kaW1zID0gY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMoe1xyXG4gICAgICB3aWR0aDogdGhpcy53aWR0aCxcclxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcclxuICAgICAgbWFyZ2luczogdGhpcy5tYXJnaW4sXHJcbiAgICAgIHNob3dMZWdlbmQ6IHRoaXMubGVnZW5kLFxyXG4gICAgICBsZWdlbmRQb3NpdGlvbjogdGhpcy5sZWdlbmRQb3NpdGlvblxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5kb21haW4gPSB0aGlzLmdldERvbWFpbigpO1xyXG4gICAgdGhpcy52YWx1ZURvbWFpbiA9IHRoaXMuZ2V0VmFsdWVEb21haW4oKTtcclxuICAgIHRoaXMudmFsdWVTY2FsZSA9IHRoaXMuZ2V0VmFsdWVTY2FsZSgpO1xyXG4gICAgdGhpcy5kaXNwbGF5VmFsdWUgPSB0aGlzLmdldERpc3BsYXlWYWx1ZSgpO1xyXG5cclxuICAgIHRoaXMub3V0ZXJSYWRpdXMgPSBNYXRoLm1pbih0aGlzLmRpbXMud2lkdGgsIHRoaXMuZGltcy5oZWlnaHQpIC8gMjtcclxuXHJcbiAgICB0aGlzLmFyY3MgPSB0aGlzLmdldEFyY3MoKTtcclxuXHJcbiAgICB0aGlzLnNldENvbG9ycygpO1xyXG4gICAgdGhpcy5sZWdlbmRPcHRpb25zID0gdGhpcy5nZXRMZWdlbmRPcHRpb25zKCk7XHJcblxyXG4gICAgY29uc3QgeE9mZnNldCA9IHRoaXMubWFyZ2luWzNdICsgdGhpcy5kaW1zLndpZHRoIC8gMjtcclxuICAgIGNvbnN0IHlPZmZzZXQgPSB0aGlzLm1hcmdpblswXSArIHRoaXMuZGltcy5oZWlnaHQgLyAyO1xyXG5cclxuICAgIHRoaXMudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3hPZmZzZXR9LCAke3lPZmZzZXR9KWA7XHJcbiAgICB0aGlzLnJvdGF0aW9uID0gYHJvdGF0ZSgke3RoaXMuc3RhcnRBbmdsZX0pYDtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zY2FsZVRleHQoKSwgNTApO1xyXG4gIH1cclxuXHJcbiAgZ2V0QXJjcygpOiBhbnlbXSB7XHJcbiAgICBjb25zdCBhcmNzID0gW107XHJcblxyXG4gICAgY29uc3QgYXZhaWxhYmxlUmFkaXVzID0gdGhpcy5vdXRlclJhZGl1cyAqIDAuNztcclxuXHJcbiAgICBjb25zdCByYWRpdXNQZXJBcmMgPSBNYXRoLm1pbihhdmFpbGFibGVSYWRpdXMgLyB0aGlzLnJlc3VsdHMubGVuZ3RoLCAxMCk7XHJcbiAgICBjb25zdCBhcmNXaWR0aCA9IHJhZGl1c1BlckFyYyAqIDAuNztcclxuICAgIHRoaXMudGV4dFJhZGl1cyA9IHRoaXMub3V0ZXJSYWRpdXMgLSB0aGlzLnJlc3VsdHMubGVuZ3RoICogcmFkaXVzUGVyQXJjO1xyXG4gICAgdGhpcy5jb3JuZXJSYWRpdXMgPSBNYXRoLmZsb29yKGFyY1dpZHRoIC8gMik7XHJcblxyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgZm9yIChjb25zdCBkIG9mIHRoaXMucmVzdWx0cykge1xyXG4gICAgICBjb25zdCBvdXRlclJhZGl1cyA9IHRoaXMub3V0ZXJSYWRpdXMgLSBpICogcmFkaXVzUGVyQXJjO1xyXG4gICAgICBjb25zdCBpbm5lclJhZGl1cyA9IG91dGVyUmFkaXVzIC0gYXJjV2lkdGg7XHJcblxyXG4gICAgICBjb25zdCBiYWNrZ3JvdW5kQXJjID0ge1xyXG4gICAgICAgIGVuZEFuZ2xlOiAodGhpcy5hbmdsZVNwYW4gKiBNYXRoLlBJKSAvIDE4MCxcclxuICAgICAgICBpbm5lclJhZGl1cyxcclxuICAgICAgICBvdXRlclJhZGl1cyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICB2YWx1ZTogdGhpcy5tYXgsXHJcbiAgICAgICAgICBuYW1lOiBkLm5hbWVcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjb25zdCB2YWx1ZUFyYyA9IHtcclxuICAgICAgICBlbmRBbmdsZTogKE1hdGgubWluKHRoaXMudmFsdWVTY2FsZShkLnZhbHVlKSwgdGhpcy5hbmdsZVNwYW4pICogTWF0aC5QSSkgLyAxODAsXHJcbiAgICAgICAgaW5uZXJSYWRpdXMsXHJcbiAgICAgICAgb3V0ZXJSYWRpdXMsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgdmFsdWU6IGQudmFsdWUsXHJcbiAgICAgICAgICBuYW1lOiBkLm5hbWVcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjb25zdCBhcmMgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZEFyYyxcclxuICAgICAgICB2YWx1ZUFyY1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgYXJjcy5wdXNoKGFyYyk7XHJcbiAgICAgIGkrKztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYXJjcztcclxuICB9XHJcblxyXG4gIGdldERvbWFpbigpOiBhbnlbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZXN1bHRzLm1hcChkID0+IGQubmFtZSk7XHJcbiAgfVxyXG5cclxuICBnZXRWYWx1ZURvbWFpbigpOiBhbnlbXSB7XHJcbiAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLnJlc3VsdHMubWFwKGQgPT4gZC52YWx1ZSk7XHJcbiAgICBjb25zdCBkYXRhTWluID0gTWF0aC5taW4oLi4udmFsdWVzKTtcclxuICAgIGNvbnN0IGRhdGFNYXggPSBNYXRoLm1heCguLi52YWx1ZXMpO1xyXG5cclxuICAgIGlmICh0aGlzLm1pbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMubWluID0gTWF0aC5taW4odGhpcy5taW4sIGRhdGFNaW4pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5taW4gPSBkYXRhTWluO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm1heCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMubWF4ID0gTWF0aC5tYXgodGhpcy5tYXgsIGRhdGFNYXgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5tYXggPSBkYXRhTWF4O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBbdGhpcy5taW4sIHRoaXMubWF4XTtcclxuICB9XHJcblxyXG4gIGdldFZhbHVlU2NhbGUoKTogYW55IHtcclxuICAgIHJldHVybiBzY2FsZUxpbmVhcigpXHJcbiAgICAgIC5yYW5nZShbMCwgdGhpcy5hbmdsZVNwYW5dKVxyXG4gICAgICAubmljZSgpXHJcbiAgICAgIC5kb21haW4odGhpcy52YWx1ZURvbWFpbik7XHJcbiAgfVxyXG5cclxuICBnZXREaXNwbGF5VmFsdWUoKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5yZXN1bHRzLm1hcChkID0+IGQudmFsdWUpLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApO1xyXG5cclxuICAgIGlmICh0aGlzLnRleHRWYWx1ZSAmJiAwICE9PSB0aGlzLnRleHRWYWx1ZS5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudGV4dFZhbHVlLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudmFsdWVGb3JtYXR0aW5nKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlRm9ybWF0dGluZyh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHZhbHVlLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgfVxyXG5cclxuICBzY2FsZVRleHQocmVwZWF0OiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLnNob3dUZXh0KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHsgd2lkdGggfSA9IHRoaXMudGV4dEVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCBvbGRTY2FsZSA9IHRoaXMucmVzaXplU2NhbGU7XHJcblxyXG4gICAgaWYgKHdpZHRoID09PSAwKSB7XHJcbiAgICAgIHRoaXMucmVzaXplU2NhbGUgPSAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgYXZhaWxhYmxlU3BhY2UgPSB0aGlzLnRleHRSYWRpdXM7XHJcbiAgICAgIHRoaXMucmVzaXplU2NhbGUgPSBNYXRoLmZsb29yKChhdmFpbGFibGVTcGFjZSAvICh3aWR0aCAvIHRoaXMucmVzaXplU2NhbGUpKSAqIDEwMCkgLyAxMDA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucmVzaXplU2NhbGUgIT09IG9sZFNjYWxlKSB7XHJcbiAgICAgIHRoaXMudGV4dFRyYW5zZm9ybSA9IGBzY2FsZSgke3RoaXMucmVzaXplU2NhbGV9LCAke3RoaXMucmVzaXplU2NhbGV9KWA7XHJcbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgIGlmIChyZXBlYXQpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2NhbGVUZXh0KGZhbHNlKSwgNTApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkNsaWNrKGRhdGEpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XHJcbiAgfVxyXG5cclxuICBnZXRMZWdlbmRPcHRpb25zKCk6IGFueSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzY2FsZVR5cGU6ICdvcmRpbmFsJyxcclxuICAgICAgY29sb3JzOiB0aGlzLmNvbG9ycyxcclxuICAgICAgZG9tYWluOiB0aGlzLmRvbWFpbixcclxuICAgICAgdGl0bGU6IHRoaXMubGVnZW5kVGl0bGUsXHJcbiAgICAgIHBvc2l0aW9uOiB0aGlzLmxlZ2VuZFBvc2l0aW9uXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgc2V0Q29sb3JzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jb2xvcnMgPSBuZXcgQ29sb3JIZWxwZXIodGhpcy5zY2hlbWUsICdvcmRpbmFsJywgdGhpcy5kb21haW4sIHRoaXMuY3VzdG9tQ29sb3JzKTtcclxuICB9XHJcblxyXG4gIG9uQWN0aXZhdGUoaXRlbSk6IHZvaWQge1xyXG4gICAgY29uc3QgaWR4ID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbmRJbmRleChkID0+IHtcclxuICAgICAgcmV0dXJuIGQubmFtZSA9PT0gaXRlbS5uYW1lICYmIGQudmFsdWUgPT09IGl0ZW0udmFsdWU7XHJcbiAgICB9KTtcclxuICAgIGlmIChpZHggPiAtMSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hY3RpdmVFbnRyaWVzID0gW2l0ZW0sIC4uLnRoaXMuYWN0aXZlRW50cmllc107XHJcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQoeyB2YWx1ZTogaXRlbSwgZW50cmllczogdGhpcy5hY3RpdmVFbnRyaWVzIH0pO1xyXG4gIH1cclxuXHJcbiAgb25EZWFjdGl2YXRlKGl0ZW0pOiB2b2lkIHtcclxuICAgIGNvbnN0IGlkeCA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kSW5kZXgoZCA9PiB7XHJcbiAgICAgIHJldHVybiBkLm5hbWUgPT09IGl0ZW0ubmFtZSAmJiBkLnZhbHVlID09PSBpdGVtLnZhbHVlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5hY3RpdmVFbnRyaWVzLnNwbGljZShpZHgsIDEpO1xyXG4gICAgdGhpcy5hY3RpdmVFbnRyaWVzID0gWy4uLnRoaXMuYWN0aXZlRW50cmllc107XHJcblxyXG4gICAgdGhpcy5kZWFjdGl2YXRlLmVtaXQoeyB2YWx1ZTogaXRlbSwgZW50cmllczogdGhpcy5hY3RpdmVFbnRyaWVzIH0pO1xyXG4gIH1cclxuXHJcbiAgaXNBY3RpdmUoZW50cnkpOiBib29sZWFuIHtcclxuICAgIGlmICghdGhpcy5hY3RpdmVFbnRyaWVzKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBpdGVtID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbmQoZCA9PiB7XHJcbiAgICAgIHJldHVybiBlbnRyeS5uYW1lID09PSBkLm5hbWUgJiYgZW50cnkuc2VyaWVzID09PSBkLnNlcmllcztcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGl0ZW0gIT09IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHRyYWNrQnkoaW5kZXgsIGl0ZW0pOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGl0ZW0udmFsdWVBcmMuZGF0YS5uYW1lO1xyXG4gIH1cclxufVxyXG4iXX0=