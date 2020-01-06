import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { scaleLinear, scaleTime, scalePoint } from 'd3-scale';
import { curveCardinalClosed } from 'd3-shape';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
import { getScaleType } from '../common/domain.helper';
import { isDate } from '../utils/types';
const twoPI = 2 * Math.PI;
let PolarChartComponent = class PolarChartComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.legendTitle = 'Legend';
        this.legendPosition = 'right';
        this.showGridLines = true;
        this.curve = curveCardinalClosed;
        this.activeEntries = [];
        this.rangeFillOpacity = 0.15;
        this.trimYAxisTicks = true;
        this.maxYAxisTickLength = 16;
        this.roundDomains = false;
        this.tooltipDisabled = false;
        this.showSeriesOnHover = true;
        this.gradient = false;
        this.yAxisMinScale = 0;
        this.labelTrim = true;
        this.labelTrimSize = 10;
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
    }
    update() {
        super.update();
        this.setDims();
        this.setScales();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.setTicks();
    }
    setDims() {
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        const halfWidth = Math.floor(this.dims.width / 2);
        const halfHeight = Math.floor(this.dims.height / 2);
        const outerRadius = (this.outerRadius = Math.min(halfHeight / 1.5, halfWidth / 1.5));
        const yOffset = Math.max(0, halfHeight - outerRadius);
        this.yAxisDims = Object.assign(Object.assign({}, this.dims), { width: halfWidth });
        this.transform = `translate(${this.dims.xOffset}, ${this.margin[0]})`;
        this.transformYAxis = `translate(0, ${yOffset})`;
        this.labelOffset = this.dims.height + 40;
        this.transformPlot = `translate(${halfWidth}, ${halfHeight})`;
    }
    setScales() {
        const xValues = this.getXValues();
        this.scaleType = getScaleType(xValues);
        this.xDomain = this.filteredDomain || this.getXDomain(xValues);
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale(this.xDomain, twoPI);
        this.yScale = this.getYScale(this.yDomain, this.outerRadius);
        this.yAxisScale = this.getYScale(this.yDomain.reverse(), this.outerRadius);
    }
    setTicks() {
        let tickFormat;
        if (this.xAxisTickFormatting) {
            tickFormat = this.xAxisTickFormatting;
        }
        else if (this.xScale.tickFormat) {
            tickFormat = this.xScale.tickFormat.apply(this.xScale, [5]);
        }
        else {
            tickFormat = d => {
                if (isDate(d)) {
                    return d.toLocaleDateString();
                }
                return d.toLocaleString();
            };
        }
        const outerRadius = this.outerRadius;
        const s = 1.1;
        this.thetaTicks = this.xDomain.map(d => {
            const startAngle = this.xScale(d);
            const dd = s * outerRadius * (startAngle > Math.PI ? -1 : 1);
            const label = tickFormat(d);
            const startPos = [outerRadius * Math.sin(startAngle), -outerRadius * Math.cos(startAngle)];
            const pos = [dd, s * startPos[1]];
            return {
                innerRadius: 0,
                outerRadius,
                startAngle,
                endAngle: startAngle,
                value: outerRadius,
                label,
                startPos,
                pos
            };
        });
        const minDistance = 10;
        /* from pie chart, abstract out -*/
        for (let i = 0; i < this.thetaTicks.length - 1; i++) {
            const a = this.thetaTicks[i];
            for (let j = i + 1; j < this.thetaTicks.length; j++) {
                const b = this.thetaTicks[j];
                // if they're on the same side
                if (b.pos[0] * a.pos[0] > 0) {
                    // if they're overlapping
                    const o = minDistance - Math.abs(b.pos[1] - a.pos[1]);
                    if (o > 0) {
                        // push the second up or down
                        b.pos[1] += Math.sign(b.pos[0]) * o;
                    }
                }
            }
        }
        this.radiusTicks = this.yAxisScale.ticks(Math.floor(this.dims.height / 50)).map(d => this.yScale(d));
    }
    getXValues() {
        const values = [];
        for (const results of this.results) {
            for (const d of results.series) {
                if (!values.includes(d.name)) {
                    values.push(d.name);
                }
            }
        }
        return values;
    }
    getXDomain(values = this.getXValues()) {
        if (this.scaleType === 'time') {
            const min = Math.min(...values);
            const max = Math.max(...values);
            return [min, max];
        }
        else if (this.scaleType === 'linear') {
            values = values.map(v => Number(v));
            const min = Math.min(...values);
            const max = Math.max(...values);
            return [min, max];
        }
        return values;
    }
    getYValues() {
        const domain = [];
        for (const results of this.results) {
            for (const d of results.series) {
                if (domain.indexOf(d.value) < 0) {
                    domain.push(d.value);
                }
                if (d.min !== undefined) {
                    if (domain.indexOf(d.min) < 0) {
                        domain.push(d.min);
                    }
                }
                if (d.max !== undefined) {
                    if (domain.indexOf(d.max) < 0) {
                        domain.push(d.max);
                    }
                }
            }
        }
        return domain;
    }
    getYDomain(domain = this.getYValues()) {
        let min = Math.min(...domain);
        const max = Math.max(this.yAxisMinScale, ...domain);
        min = Math.max(0, min);
        if (!this.autoScale) {
            min = Math.min(0, min);
        }
        return [min, max];
    }
    getSeriesDomain() {
        return this.results.map(d => d.name);
    }
    getXScale(domain, width) {
        switch (this.scaleType) {
            case 'time':
                return scaleTime()
                    .range([0, width])
                    .domain(domain);
            case 'linear':
                const scale = scaleLinear()
                    .range([0, width])
                    .domain(domain);
                return this.roundDomains ? scale.nice() : scale;
            default:
                return scalePoint()
                    .range([0, width - twoPI / domain.length])
                    .padding(0)
                    .domain(domain);
        }
    }
    getYScale(domain, height) {
        const scale = scaleLinear()
            .range([0, height])
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    }
    onClick(data, series) {
        if (series) {
            data.series = series.name;
        }
        this.select.emit(data);
    }
    setColors() {
        const domain = this.schemeType === 'ordinal' ? this.seriesDomain : this.yDomain.reverse();
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    }
    getLegendOptions() {
        if (this.schemeType === 'ordinal') {
            return {
                scaleType: this.schemeType,
                colors: this.colors,
                domain: this.seriesDomain,
                title: this.legendTitle,
                position: this.legendPosition
            };
        }
        return {
            scaleType: this.schemeType,
            colors: this.colors.scale,
            domain: this.yDomain,
            title: undefined,
            position: this.legendPosition
        };
    }
    updateYAxisWidth({ width }) {
        this.yAxisWidth = width;
        this.update();
    }
    updateXAxisHeight({ height }) {
        this.xAxisHeight = height;
        this.update();
    }
    onActivate(item) {
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = this.showSeriesOnHover ? [item, ...this.activeEntries] : this.activeEntries;
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
    deactivateAll() {
        this.activeEntries = [...this.activeEntries];
        for (const entry of this.activeEntries) {
            this.deactivate.emit({ value: entry, entries: [] });
        }
        this.activeEntries = [];
    }
    trackBy(index, item) {
        return item.name;
    }
};
__decorate([
    Input()
], PolarChartComponent.prototype, "legend", void 0);
__decorate([
    Input()
], PolarChartComponent.prototype, "legendTitle", void 0);
__decorate([
    Input()
], PolarChartComponent.prototype, "legendPosition", void 0);
__decorate([
    Input()
], PolarChartComponent.prototype, "xAxis", void 0);
__decorate([
    Input()
], PolarChartComponent.prototype, "yAxis", void 0);
__decorate([
    Input()
], PolarChartComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    Input()
], PolarChartComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    Input()
], PolarChartComponent.prototype, "xAxisLabel", void 0);
__decorate([
    Input()
], PolarChartComponent.prototype, "yAxisLabel", void 0);
__decorate([
    Input()
], PolarChartComponent.prototype, "autoScale", void 0);
__decorate([
    Input()
], PolarChartComponent.prototype, "showGridLines", void 0);
__decorate([
    Input()
], PolarChartComponent.prototype, "curve", void 0);
__decorate([
    Input()
], PolarChartComponent.prototype, "activeEntries", void 0);
__decorate([
    Input()
], PolarChartComponent.prototype, "schemeType", void 0);
__decorate([
    Input()
], PolarChartComponent.prototype, "rangeFillOpacity", void 0);
__decorate([
    Input()
], PolarChartComponent.prototype, "trimYAxisTicks", void 0);
__decorate([
    Input()
], PolarChartComponent.prototype, "maxYAxisTickLength", void 0);
__decorate([
    Input()
], PolarChartComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    Input()
], PolarChartComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    Input()
], PolarChartComponent.prototype, "roundDomains", void 0);
__decorate([
    Input()
], PolarChartComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input()
], PolarChartComponent.prototype, "showSeriesOnHover", void 0);
__decorate([
    Input()
], PolarChartComponent.prototype, "gradient", void 0);
__decorate([
    Input()
], PolarChartComponent.prototype, "yAxisMinScale", void 0);
__decorate([
    Input()
], PolarChartComponent.prototype, "labelTrim", void 0);
__decorate([
    Input()
], PolarChartComponent.prototype, "labelTrimSize", void 0);
__decorate([
    Output()
], PolarChartComponent.prototype, "activate", void 0);
__decorate([
    Output()
], PolarChartComponent.prototype, "deactivate", void 0);
__decorate([
    ContentChild('tooltipTemplate')
], PolarChartComponent.prototype, "tooltipTemplate", void 0);
PolarChartComponent = __decorate([
    Component({
        selector: 'ngx-charts-polar-chart',
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
      <svg:g class="polar-chart chart" [attr.transform]="transform">
        <svg:g [attr.transform]="transformPlot">
          <svg:circle class="polar-chart-background" cx="0" cy="0" [attr.r]="this.outerRadius" />
          <svg:g *ngIf="showGridLines">
            <svg:circle
              *ngFor="let r of radiusTicks"
              class="gridline-path radial-gridline-path"
              cx="0"
              cy="0"
              [attr.r]="r"
            />
          </svg:g>
          <svg:g *ngIf="xAxis">
            <svg:g
              ngx-charts-pie-label
              *ngFor="let tick of thetaTicks"
              [data]="tick"
              [radius]="outerRadius"
              [label]="tick.label"
              [max]="outerRadius"
              [value]="showGridLines ? 1 : outerRadius"
              [explodeSlices]="true"
              [animations]="animations"
              [labelTrim]="labelTrim"
              [labelTrimSize]="labelTrimSize"
            ></svg:g>
          </svg:g>
        </svg:g>
        <svg:g
          ngx-charts-y-axis
          [attr.transform]="transformYAxis"
          *ngIf="yAxis"
          [yScale]="yAxisScale"
          [dims]="yAxisDims"
          [showGridLines]="showGridLines"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel"
          [trimTicks]="trimYAxisTicks"
          [maxTickLength]="maxYAxisTickLength"
          [tickFormatting]="yAxisTickFormatting"
          (dimensionsChanged)="updateYAxisWidth($event)"
        ></svg:g>
        <svg:g
          ngx-charts-axis-label
          *ngIf="xAxis && showXAxisLabel"
          [label]="xAxisLabel"
          [offset]="labelOffset"
          [orient]="'bottom'"
          [height]="dims.height"
          [width]="dims.width"
        ></svg:g>
        <svg:g [attr.transform]="transformPlot">
          <svg:g *ngFor="let series of results; trackBy: trackBy" [@animationState]="'active'">
            <svg:g
              ngx-charts-polar-series
              [gradient]="gradient"
              [xScale]="xScale"
              [yScale]="yScale"
              [colors]="colors"
              [data]="series"
              [activeEntries]="activeEntries"
              [scaleType]="scaleType"
              [curve]="curve"
              [rangeFillOpacity]="rangeFillOpacity"
              [animations]="animations"
              [tooltipDisabled]="tooltipDisabled"
              [tooltipTemplate]="tooltipTemplate"
              (select)="onClick($event)"
              (activate)="onActivate($event)"
              (deactivate)="onDeactivate($event)"
            />
          </svg:g>
        </svg:g>
      </svg:g>
    </ngx-charts-chart>
  `,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [
            trigger('animationState', [
                transition(':leave', [
                    style({
                        opacity: 1
                    }),
                    animate(500, style({
                        opacity: 0
                    }))
                ])
            ])
        ],
        styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".pie-label{font-size:11px}.pie-label.animation{-webkit-animation:750ms ease-in fadeIn;animation:750ms ease-in fadeIn}@-webkit-keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.pie-label-line{stroke-dasharray:100%}.pie-label-line.animation{-webkit-animation:3s linear drawOut;animation:3s linear drawOut;-webkit-transition:d 750ms;transition:d 750ms}@-webkit-keyframes drawOut{from{stroke-dashoffset:100%}to{stroke-dashoffset:0}}@keyframes drawOut{from{stroke-dashoffset:100%}to{stroke-dashoffset:0}}", ".polar-chart .polar-chart-background{fill:none}.polar-chart .radial-gridline-path{stroke-dasharray:10 10;fill:none}.polar-chart .pie-label-line{stroke:#2f3646}.polar-charts-series .polar-series-area,.polar-series-path{pointer-events:none}"]
    })
], PolarChartComponent);
export { PolarChartComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9sYXItY2hhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvcG9sYXItY2hhcnQvcG9sYXItY2hhcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsWUFBWSxFQUViLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDOUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRS9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBa0IsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxNQUFNLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztBQWtIMUIsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxrQkFBa0I7SUFBM0Q7O1FBRVcsZ0JBQVcsR0FBVyxRQUFRLENBQUM7UUFDL0IsbUJBQWMsR0FBVyxPQUFPLENBQUM7UUFRakMsa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFDOUIsVUFBSyxHQUFRLG1CQUFtQixDQUFDO1FBQ2pDLGtCQUFhLEdB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QUFNO1FBQy9DLFVBQVUsRUFBRTtZQUNWLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDeEIsVUFBVSxDQUFDLFFBQVEsRUFBRTtvQkFDbkIsS0FBSyxDQUFDO3dCQUNKLE9BQU8sRUFBRSxDQUFDO3FCQUNYLENBQUM7b0JBQ0YsT0FBTyxDQUNMLEdBQUcsRUFDSCxLQUFLLENBQUM7d0JBQ0osT0FBTyxFQUFFLENBQUM7cUJBQ1gsQ0FBQyxDQUNIO2lCQUNGLENBQUM7YUFDSCxDQUFDO1NBQ0g7O0tBQ0YsQ0FBQztHQUNXLG1CQUFtQixDQXdWL0I7U0F4VlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBWaWV3RW5jYXBzdWxhdGlvbixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDb250ZW50Q2hpbGQsXHJcbiAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgdHJpZ2dlciwgc3R5bGUsIGFuaW1hdGUsIHRyYW5zaXRpb24gfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgc2NhbGVMaW5lYXIsIHNjYWxlVGltZSwgc2NhbGVQb2ludCB9IGZyb20gJ2QzLXNjYWxlJztcclxuaW1wb3J0IHsgY3VydmVDYXJkaW5hbENsb3NlZCB9IGZyb20gJ2QzLXNoYXBlJztcclxuXHJcbmltcG9ydCB7IGNhbGN1bGF0ZVZpZXdEaW1lbnNpb25zLCBWaWV3RGltZW5zaW9ucyB9IGZyb20gJy4uL2NvbW1vbi92aWV3LWRpbWVuc2lvbnMuaGVscGVyJztcclxuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY29sb3IuaGVscGVyJztcclxuaW1wb3J0IHsgQmFzZUNoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL2Jhc2UtY2hhcnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgZ2V0U2NhbGVUeXBlIH0gZnJvbSAnLi4vY29tbW9uL2RvbWFpbi5oZWxwZXInO1xyXG5pbXBvcnQgeyBpc0RhdGUgfSBmcm9tICcuLi91dGlscy90eXBlcyc7XHJcblxyXG5jb25zdCB0d29QSSA9IDIgKiBNYXRoLlBJO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtY2hhcnRzLXBvbGFyLWNoYXJ0JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5neC1jaGFydHMtY2hhcnRcclxuICAgICAgW3ZpZXddPVwiW3dpZHRoLCBoZWlnaHRdXCJcclxuICAgICAgW3Nob3dMZWdlbmRdPVwibGVnZW5kXCJcclxuICAgICAgW2xlZ2VuZE9wdGlvbnNdPVwibGVnZW5kT3B0aW9uc1wiXHJcbiAgICAgIFthY3RpdmVFbnRyaWVzXT1cImFjdGl2ZUVudHJpZXNcIlxyXG4gICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcclxuICAgICAgKGxlZ2VuZExhYmVsQ2xpY2spPVwib25DbGljaygkZXZlbnQpXCJcclxuICAgICAgKGxlZ2VuZExhYmVsQWN0aXZhdGUpPVwib25BY3RpdmF0ZSgkZXZlbnQpXCJcclxuICAgICAgKGxlZ2VuZExhYmVsRGVhY3RpdmF0ZSk9XCJvbkRlYWN0aXZhdGUoJGV2ZW50KVwiXHJcbiAgICA+XHJcbiAgICAgIDxzdmc6ZyBjbGFzcz1cInBvbGFyLWNoYXJ0IGNoYXJ0XCIgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybVwiPlxyXG4gICAgICAgIDxzdmc6ZyBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtUGxvdFwiPlxyXG4gICAgICAgICAgPHN2ZzpjaXJjbGUgY2xhc3M9XCJwb2xhci1jaGFydC1iYWNrZ3JvdW5kXCIgY3g9XCIwXCIgY3k9XCIwXCIgW2F0dHIucl09XCJ0aGlzLm91dGVyUmFkaXVzXCIgLz5cclxuICAgICAgICAgIDxzdmc6ZyAqbmdJZj1cInNob3dHcmlkTGluZXNcIj5cclxuICAgICAgICAgICAgPHN2ZzpjaXJjbGVcclxuICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgciBvZiByYWRpdXNUaWNrc1wiXHJcbiAgICAgICAgICAgICAgY2xhc3M9XCJncmlkbGluZS1wYXRoIHJhZGlhbC1ncmlkbGluZS1wYXRoXCJcclxuICAgICAgICAgICAgICBjeD1cIjBcIlxyXG4gICAgICAgICAgICAgIGN5PVwiMFwiXHJcbiAgICAgICAgICAgICAgW2F0dHIucl09XCJyXCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvc3ZnOmc+XHJcbiAgICAgICAgICA8c3ZnOmcgKm5nSWY9XCJ4QXhpc1wiPlxyXG4gICAgICAgICAgICA8c3ZnOmdcclxuICAgICAgICAgICAgICBuZ3gtY2hhcnRzLXBpZS1sYWJlbFxyXG4gICAgICAgICAgICAgICpuZ0Zvcj1cImxldCB0aWNrIG9mIHRoZXRhVGlja3NcIlxyXG4gICAgICAgICAgICAgIFtkYXRhXT1cInRpY2tcIlxyXG4gICAgICAgICAgICAgIFtyYWRpdXNdPVwib3V0ZXJSYWRpdXNcIlxyXG4gICAgICAgICAgICAgIFtsYWJlbF09XCJ0aWNrLmxhYmVsXCJcclxuICAgICAgICAgICAgICBbbWF4XT1cIm91dGVyUmFkaXVzXCJcclxuICAgICAgICAgICAgICBbdmFsdWVdPVwic2hvd0dyaWRMaW5lcyA/IDEgOiBvdXRlclJhZGl1c1wiXHJcbiAgICAgICAgICAgICAgW2V4cGxvZGVTbGljZXNdPVwidHJ1ZVwiXHJcbiAgICAgICAgICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgICAgICAgICAgW2xhYmVsVHJpbV09XCJsYWJlbFRyaW1cIlxyXG4gICAgICAgICAgICAgIFtsYWJlbFRyaW1TaXplXT1cImxhYmVsVHJpbVNpemVcIlxyXG4gICAgICAgICAgICA+PC9zdmc6Zz5cclxuICAgICAgICAgIDwvc3ZnOmc+XHJcbiAgICAgICAgPC9zdmc6Zz5cclxuICAgICAgICA8c3ZnOmdcclxuICAgICAgICAgIG5neC1jaGFydHMteS1heGlzXHJcbiAgICAgICAgICBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtWUF4aXNcIlxyXG4gICAgICAgICAgKm5nSWY9XCJ5QXhpc1wiXHJcbiAgICAgICAgICBbeVNjYWxlXT1cInlBeGlzU2NhbGVcIlxyXG4gICAgICAgICAgW2RpbXNdPVwieUF4aXNEaW1zXCJcclxuICAgICAgICAgIFtzaG93R3JpZExpbmVzXT1cInNob3dHcmlkTGluZXNcIlxyXG4gICAgICAgICAgW3Nob3dMYWJlbF09XCJzaG93WUF4aXNMYWJlbFwiXHJcbiAgICAgICAgICBbbGFiZWxUZXh0XT1cInlBeGlzTGFiZWxcIlxyXG4gICAgICAgICAgW3RyaW1UaWNrc109XCJ0cmltWUF4aXNUaWNrc1wiXHJcbiAgICAgICAgICBbbWF4VGlja0xlbmd0aF09XCJtYXhZQXhpc1RpY2tMZW5ndGhcIlxyXG4gICAgICAgICAgW3RpY2tGb3JtYXR0aW5nXT1cInlBeGlzVGlja0Zvcm1hdHRpbmdcIlxyXG4gICAgICAgICAgKGRpbWVuc2lvbnNDaGFuZ2VkKT1cInVwZGF0ZVlBeGlzV2lkdGgoJGV2ZW50KVwiXHJcbiAgICAgICAgPjwvc3ZnOmc+XHJcbiAgICAgICAgPHN2ZzpnXHJcbiAgICAgICAgICBuZ3gtY2hhcnRzLWF4aXMtbGFiZWxcclxuICAgICAgICAgICpuZ0lmPVwieEF4aXMgJiYgc2hvd1hBeGlzTGFiZWxcIlxyXG4gICAgICAgICAgW2xhYmVsXT1cInhBeGlzTGFiZWxcIlxyXG4gICAgICAgICAgW29mZnNldF09XCJsYWJlbE9mZnNldFwiXHJcbiAgICAgICAgICBbb3JpZW50XT1cIidib3R0b20nXCJcclxuICAgICAgICAgIFtoZWlnaHRdPVwiZGltcy5oZWlnaHRcIlxyXG4gICAgICAgICAgW3dpZHRoXT1cImRpbXMud2lkdGhcIlxyXG4gICAgICAgID48L3N2ZzpnPlxyXG4gICAgICAgIDxzdmc6ZyBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtUGxvdFwiPlxyXG4gICAgICAgICAgPHN2ZzpnICpuZ0Zvcj1cImxldCBzZXJpZXMgb2YgcmVzdWx0czsgdHJhY2tCeTogdHJhY2tCeVwiIFtAYW5pbWF0aW9uU3RhdGVdPVwiJ2FjdGl2ZSdcIj5cclxuICAgICAgICAgICAgPHN2ZzpnXHJcbiAgICAgICAgICAgICAgbmd4LWNoYXJ0cy1wb2xhci1zZXJpZXNcclxuICAgICAgICAgICAgICBbZ3JhZGllbnRdPVwiZ3JhZGllbnRcIlxyXG4gICAgICAgICAgICAgIFt4U2NhbGVdPVwieFNjYWxlXCJcclxuICAgICAgICAgICAgICBbeVNjYWxlXT1cInlTY2FsZVwiXHJcbiAgICAgICAgICAgICAgW2NvbG9yc109XCJjb2xvcnNcIlxyXG4gICAgICAgICAgICAgIFtkYXRhXT1cInNlcmllc1wiXHJcbiAgICAgICAgICAgICAgW2FjdGl2ZUVudHJpZXNdPVwiYWN0aXZlRW50cmllc1wiXHJcbiAgICAgICAgICAgICAgW3NjYWxlVHlwZV09XCJzY2FsZVR5cGVcIlxyXG4gICAgICAgICAgICAgIFtjdXJ2ZV09XCJjdXJ2ZVwiXHJcbiAgICAgICAgICAgICAgW3JhbmdlRmlsbE9wYWNpdHldPVwicmFuZ2VGaWxsT3BhY2l0eVwiXHJcbiAgICAgICAgICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgICAgICAgICAgW3Rvb2x0aXBEaXNhYmxlZF09XCJ0b29sdGlwRGlzYWJsZWRcIlxyXG4gICAgICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcclxuICAgICAgICAgICAgICAoc2VsZWN0KT1cIm9uQ2xpY2soJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgKGFjdGl2YXRlKT1cIm9uQWN0aXZhdGUoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgKGRlYWN0aXZhdGUpPVwib25EZWFjdGl2YXRlKCRldmVudClcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9zdmc6Zz5cclxuICAgICAgICA8L3N2ZzpnPlxyXG4gICAgICA8L3N2ZzpnPlxyXG4gICAgPC9uZ3gtY2hhcnRzLWNoYXJ0PlxyXG4gIGAsXHJcbiAgc3R5bGVVcmxzOiBbXHJcbiAgICAnLi4vY29tbW9uL2Jhc2UtY2hhcnQuY29tcG9uZW50LnNjc3MnLFxyXG4gICAgJy4uL3BpZS1jaGFydC9waWUtY2hhcnQuY29tcG9uZW50LnNjc3MnLFxyXG4gICAgJy4vcG9sYXItY2hhcnQuY29tcG9uZW50LnNjc3MnXHJcbiAgXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIGFuaW1hdGlvbnM6IFtcclxuICAgIHRyaWdnZXIoJ2FuaW1hdGlvblN0YXRlJywgW1xyXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXHJcbiAgICAgICAgc3R5bGUoe1xyXG4gICAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGFuaW1hdGUoXHJcbiAgICAgICAgICA1MDAsXHJcbiAgICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKVxyXG4gICAgICBdKVxyXG4gICAgXSlcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQb2xhckNoYXJ0Q29tcG9uZW50IGV4dGVuZHMgQmFzZUNoYXJ0Q29tcG9uZW50IHtcclxuICBASW5wdXQoKSBsZWdlbmQ6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgbGVnZW5kVGl0bGU6IHN0cmluZyA9ICdMZWdlbmQnO1xyXG4gIEBJbnB1dCgpIGxlZ2VuZFBvc2l0aW9uOiBzdHJpbmcgPSAncmlnaHQnO1xyXG4gIEBJbnB1dCgpIHhBeGlzOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHlBeGlzOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHNob3dYQXhpc0xhYmVsOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHNob3dZQXhpc0xhYmVsOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHhBeGlzTGFiZWw6IHN0cmluZztcclxuICBASW5wdXQoKSB5QXhpc0xhYmVsOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgYXV0b1NjYWxlOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHNob3dHcmlkTGluZXM6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIGN1cnZlOiBhbnkgPSBjdXJ2ZUNhcmRpbmFsQ2xvc2VkO1xyXG4gIEBJbnB1dCgpIGFjdGl2ZUVudHJpZXM6IGFueVtdID0gW107XHJcbiAgQElucHV0KCkgc2NoZW1lVHlwZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHJhbmdlRmlsbE9wYWNpdHk6IG51bWJlciA9IDAuMTU7XHJcbiAgQElucHV0KCkgdHJpbVlBeGlzVGlja3M6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIG1heFlBeGlzVGlja0xlbmd0aDogbnVtYmVyID0gMTY7XHJcbiAgQElucHV0KCkgeEF4aXNUaWNrRm9ybWF0dGluZzogKG86IGFueSkgPT4gYW55O1xyXG4gIEBJbnB1dCgpIHlBeGlzVGlja0Zvcm1hdHRpbmc6IChvOiBhbnkpID0+IGFueTtcclxuICBASW5wdXQoKSByb3VuZERvbWFpbnM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSBzaG93U2VyaWVzT25Ib3ZlcjogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCkgZ3JhZGllbnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSB5QXhpc01pblNjYWxlOiBudW1iZXIgPSAwO1xyXG4gIEBJbnB1dCgpIGxhYmVsVHJpbTogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCkgbGFiZWxUcmltU2l6ZTogbnVtYmVyID0gMTA7XHJcblxyXG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBAQ29udGVudENoaWxkKCd0b29sdGlwVGVtcGxhdGUnKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIGRpbXM6IFZpZXdEaW1lbnNpb25zO1xyXG4gIHlBeGlzRGltczogVmlld0RpbWVuc2lvbnM7XHJcbiAgbGFiZWxPZmZzZXQ6IG51bWJlcjtcclxuICB4RG9tYWluOiBhbnk7XHJcbiAgeURvbWFpbjogYW55O1xyXG4gIHNlcmllc0RvbWFpbjogYW55O1xyXG4gIHlTY2FsZTogYW55OyAvLyAtPiByU2NhbGVcclxuICB4U2NhbGU6IGFueTsgLy8gLT4gdFNjYWxlXHJcbiAgeUF4aXNTY2FsZTogYW55OyAvLyAtPiB5U2NhbGVcclxuICBjb2xvcnM6IENvbG9ySGVscGVyO1xyXG4gIHNjYWxlVHlwZTogc3RyaW5nO1xyXG4gIHRyYW5zZm9ybTogc3RyaW5nO1xyXG4gIHRyYW5zZm9ybVBsb3Q6IHN0cmluZztcclxuICB0cmFuc2Zvcm1ZQXhpczogc3RyaW5nO1xyXG4gIHRyYW5zZm9ybVhBeGlzOiBzdHJpbmc7XHJcbiAgc2VyaWVzOiBhbnk7IC8vID8/P1xyXG4gIG1hcmdpbiA9IFsxMCwgMjAsIDEwLCAyMF07XHJcbiAgeEF4aXNIZWlnaHQ6IG51bWJlciA9IDA7XHJcbiAgeUF4aXNXaWR0aDogbnVtYmVyID0gMDtcclxuICBmaWx0ZXJlZERvbWFpbjogYW55O1xyXG4gIGxlZ2VuZE9wdGlvbnM6IGFueTtcclxuICB0aGV0YVRpY2tzOiBhbnlbXTtcclxuICByYWRpdXNUaWNrczogbnVtYmVyW107XHJcbiAgb3V0ZXJSYWRpdXM6IG51bWJlcjtcclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgc3VwZXIudXBkYXRlKCk7XHJcblxyXG4gICAgdGhpcy5zZXREaW1zKCk7XHJcblxyXG4gICAgdGhpcy5zZXRTY2FsZXMoKTtcclxuICAgIHRoaXMuc2V0Q29sb3JzKCk7XHJcbiAgICB0aGlzLmxlZ2VuZE9wdGlvbnMgPSB0aGlzLmdldExlZ2VuZE9wdGlvbnMoKTtcclxuXHJcbiAgICB0aGlzLnNldFRpY2tzKCk7XHJcbiAgfVxyXG5cclxuICBzZXREaW1zKCkge1xyXG4gICAgdGhpcy5kaW1zID0gY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMoe1xyXG4gICAgICB3aWR0aDogdGhpcy53aWR0aCxcclxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcclxuICAgICAgbWFyZ2luczogdGhpcy5tYXJnaW4sXHJcbiAgICAgIHNob3dYQXhpczogdGhpcy54QXhpcyxcclxuICAgICAgc2hvd1lBeGlzOiB0aGlzLnlBeGlzLFxyXG4gICAgICB4QXhpc0hlaWdodDogdGhpcy54QXhpc0hlaWdodCxcclxuICAgICAgeUF4aXNXaWR0aDogdGhpcy55QXhpc1dpZHRoLFxyXG4gICAgICBzaG93WExhYmVsOiB0aGlzLnNob3dYQXhpc0xhYmVsLFxyXG4gICAgICBzaG93WUxhYmVsOiB0aGlzLnNob3dZQXhpc0xhYmVsLFxyXG4gICAgICBzaG93TGVnZW5kOiB0aGlzLmxlZ2VuZCxcclxuICAgICAgbGVnZW5kVHlwZTogdGhpcy5zY2hlbWVUeXBlLFxyXG4gICAgICBsZWdlbmRQb3NpdGlvbjogdGhpcy5sZWdlbmRQb3NpdGlvblxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgaGFsZldpZHRoID0gTWF0aC5mbG9vcih0aGlzLmRpbXMud2lkdGggLyAyKTtcclxuICAgIGNvbnN0IGhhbGZIZWlnaHQgPSBNYXRoLmZsb29yKHRoaXMuZGltcy5oZWlnaHQgLyAyKTtcclxuXHJcbiAgICBjb25zdCBvdXRlclJhZGl1cyA9ICh0aGlzLm91dGVyUmFkaXVzID0gTWF0aC5taW4oaGFsZkhlaWdodCAvIDEuNSwgaGFsZldpZHRoIC8gMS41KSk7XHJcblxyXG4gICAgY29uc3QgeU9mZnNldCA9IE1hdGgubWF4KDAsIGhhbGZIZWlnaHQgLSBvdXRlclJhZGl1cyk7XHJcblxyXG4gICAgdGhpcy55QXhpc0RpbXMgPSB7XHJcbiAgICAgIC4uLnRoaXMuZGltcyxcclxuICAgICAgd2lkdGg6IGhhbGZXaWR0aFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt0aGlzLmRpbXMueE9mZnNldH0sICR7dGhpcy5tYXJnaW5bMF19KWA7XHJcbiAgICB0aGlzLnRyYW5zZm9ybVlBeGlzID0gYHRyYW5zbGF0ZSgwLCAke3lPZmZzZXR9KWA7XHJcbiAgICB0aGlzLmxhYmVsT2Zmc2V0ID0gdGhpcy5kaW1zLmhlaWdodCArIDQwO1xyXG4gICAgdGhpcy50cmFuc2Zvcm1QbG90ID0gYHRyYW5zbGF0ZSgke2hhbGZXaWR0aH0sICR7aGFsZkhlaWdodH0pYDtcclxuICB9XHJcblxyXG4gIHNldFNjYWxlcygpIHtcclxuICAgIGNvbnN0IHhWYWx1ZXMgPSB0aGlzLmdldFhWYWx1ZXMoKTtcclxuICAgIHRoaXMuc2NhbGVUeXBlID0gZ2V0U2NhbGVUeXBlKHhWYWx1ZXMpO1xyXG4gICAgdGhpcy54RG9tYWluID0gdGhpcy5maWx0ZXJlZERvbWFpbiB8fCB0aGlzLmdldFhEb21haW4oeFZhbHVlcyk7XHJcblxyXG4gICAgdGhpcy55RG9tYWluID0gdGhpcy5nZXRZRG9tYWluKCk7XHJcbiAgICB0aGlzLnNlcmllc0RvbWFpbiA9IHRoaXMuZ2V0U2VyaWVzRG9tYWluKCk7XHJcblxyXG4gICAgdGhpcy54U2NhbGUgPSB0aGlzLmdldFhTY2FsZSh0aGlzLnhEb21haW4sIHR3b1BJKTtcclxuICAgIHRoaXMueVNjYWxlID0gdGhpcy5nZXRZU2NhbGUodGhpcy55RG9tYWluLCB0aGlzLm91dGVyUmFkaXVzKTtcclxuICAgIHRoaXMueUF4aXNTY2FsZSA9IHRoaXMuZ2V0WVNjYWxlKHRoaXMueURvbWFpbi5yZXZlcnNlKCksIHRoaXMub3V0ZXJSYWRpdXMpO1xyXG4gIH1cclxuXHJcbiAgc2V0VGlja3MoKSB7XHJcbiAgICBsZXQgdGlja0Zvcm1hdDtcclxuICAgIGlmICh0aGlzLnhBeGlzVGlja0Zvcm1hdHRpbmcpIHtcclxuICAgICAgdGlja0Zvcm1hdCA9IHRoaXMueEF4aXNUaWNrRm9ybWF0dGluZztcclxuICAgIH0gZWxzZSBpZiAodGhpcy54U2NhbGUudGlja0Zvcm1hdCkge1xyXG4gICAgICB0aWNrRm9ybWF0ID0gdGhpcy54U2NhbGUudGlja0Zvcm1hdC5hcHBseSh0aGlzLnhTY2FsZSwgWzVdKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRpY2tGb3JtYXQgPSBkID0+IHtcclxuICAgICAgICBpZiAoaXNEYXRlKGQpKSB7XHJcbiAgICAgICAgICByZXR1cm4gZC50b0xvY2FsZURhdGVTdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGQudG9Mb2NhbGVTdHJpbmcoKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvdXRlclJhZGl1cyA9IHRoaXMub3V0ZXJSYWRpdXM7XHJcbiAgICBjb25zdCBzID0gMS4xO1xyXG5cclxuICAgIHRoaXMudGhldGFUaWNrcyA9IHRoaXMueERvbWFpbi5tYXAoZCA9PiB7XHJcbiAgICAgIGNvbnN0IHN0YXJ0QW5nbGUgPSB0aGlzLnhTY2FsZShkKTtcclxuICAgICAgY29uc3QgZGQgPSBzICogb3V0ZXJSYWRpdXMgKiAoc3RhcnRBbmdsZSA+IE1hdGguUEkgPyAtMSA6IDEpO1xyXG4gICAgICBjb25zdCBsYWJlbCA9IHRpY2tGb3JtYXQoZCk7XHJcblxyXG4gICAgICBjb25zdCBzdGFydFBvcyA9IFtvdXRlclJhZGl1cyAqIE1hdGguc2luKHN0YXJ0QW5nbGUpLCAtb3V0ZXJSYWRpdXMgKiBNYXRoLmNvcyhzdGFydEFuZ2xlKV07XHJcbiAgICAgIGNvbnN0IHBvcyA9IFtkZCwgcyAqIHN0YXJ0UG9zWzFdXTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpbm5lclJhZGl1czogMCxcclxuICAgICAgICBvdXRlclJhZGl1cyxcclxuICAgICAgICBzdGFydEFuZ2xlLFxyXG4gICAgICAgIGVuZEFuZ2xlOiBzdGFydEFuZ2xlLFxyXG4gICAgICAgIHZhbHVlOiBvdXRlclJhZGl1cyxcclxuICAgICAgICBsYWJlbCxcclxuICAgICAgICBzdGFydFBvcyxcclxuICAgICAgICBwb3NcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IG1pbkRpc3RhbmNlID0gMTA7XHJcblxyXG4gICAgLyogZnJvbSBwaWUgY2hhcnQsIGFic3RyYWN0IG91dCAtKi9cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50aGV0YVRpY2tzLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICBjb25zdCBhID0gdGhpcy50aGV0YVRpY2tzW2ldO1xyXG5cclxuICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgdGhpcy50aGV0YVRpY2tzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgY29uc3QgYiA9IHRoaXMudGhldGFUaWNrc1tqXTtcclxuICAgICAgICAvLyBpZiB0aGV5J3JlIG9uIHRoZSBzYW1lIHNpZGVcclxuICAgICAgICBpZiAoYi5wb3NbMF0gKiBhLnBvc1swXSA+IDApIHtcclxuICAgICAgICAgIC8vIGlmIHRoZXkncmUgb3ZlcmxhcHBpbmdcclxuICAgICAgICAgIGNvbnN0IG8gPSBtaW5EaXN0YW5jZSAtIE1hdGguYWJzKGIucG9zWzFdIC0gYS5wb3NbMV0pO1xyXG4gICAgICAgICAgaWYgKG8gPiAwKSB7XHJcbiAgICAgICAgICAgIC8vIHB1c2ggdGhlIHNlY29uZCB1cCBvciBkb3duXHJcbiAgICAgICAgICAgIGIucG9zWzFdICs9IE1hdGguc2lnbihiLnBvc1swXSkgKiBvO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmFkaXVzVGlja3MgPSB0aGlzLnlBeGlzU2NhbGUudGlja3MoTWF0aC5mbG9vcih0aGlzLmRpbXMuaGVpZ2h0IC8gNTApKS5tYXAoZCA9PiB0aGlzLnlTY2FsZShkKSk7XHJcbiAgfVxyXG5cclxuICBnZXRYVmFsdWVzKCk6IGFueVtdIHtcclxuICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xyXG4gICAgZm9yIChjb25zdCByZXN1bHRzIG9mIHRoaXMucmVzdWx0cykge1xyXG4gICAgICBmb3IgKGNvbnN0IGQgb2YgcmVzdWx0cy5zZXJpZXMpIHtcclxuICAgICAgICBpZiAoIXZhbHVlcy5pbmNsdWRlcyhkLm5hbWUpKSB7XHJcbiAgICAgICAgICB2YWx1ZXMucHVzaChkLm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlcztcclxuICB9XHJcblxyXG4gIGdldFhEb21haW4odmFsdWVzID0gdGhpcy5nZXRYVmFsdWVzKCkpOiBhbnlbXSB7XHJcbiAgICBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICd0aW1lJykge1xyXG4gICAgICBjb25zdCBtaW4gPSBNYXRoLm1pbiguLi52YWx1ZXMpO1xyXG4gICAgICBjb25zdCBtYXggPSBNYXRoLm1heCguLi52YWx1ZXMpO1xyXG4gICAgICByZXR1cm4gW21pbiwgbWF4XTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICdsaW5lYXInKSB7XHJcbiAgICAgIHZhbHVlcyA9IHZhbHVlcy5tYXAodiA9PiBOdW1iZXIodikpO1xyXG4gICAgICBjb25zdCBtaW4gPSBNYXRoLm1pbiguLi52YWx1ZXMpO1xyXG4gICAgICBjb25zdCBtYXggPSBNYXRoLm1heCguLi52YWx1ZXMpO1xyXG4gICAgICByZXR1cm4gW21pbiwgbWF4XTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZXM7XHJcbiAgfVxyXG5cclxuICBnZXRZVmFsdWVzKCk6IGFueVtdIHtcclxuICAgIGNvbnN0IGRvbWFpbiA9IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3QgcmVzdWx0cyBvZiB0aGlzLnJlc3VsdHMpIHtcclxuICAgICAgZm9yIChjb25zdCBkIG9mIHJlc3VsdHMuc2VyaWVzKSB7XHJcbiAgICAgICAgaWYgKGRvbWFpbi5pbmRleE9mKGQudmFsdWUpIDwgMCkge1xyXG4gICAgICAgICAgZG9tYWluLnB1c2goZC52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkLm1pbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBpZiAoZG9tYWluLmluZGV4T2YoZC5taW4pIDwgMCkge1xyXG4gICAgICAgICAgICBkb21haW4ucHVzaChkLm1pbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkLm1heCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBpZiAoZG9tYWluLmluZGV4T2YoZC5tYXgpIDwgMCkge1xyXG4gICAgICAgICAgICBkb21haW4ucHVzaChkLm1heCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZG9tYWluO1xyXG4gIH1cclxuXHJcbiAgZ2V0WURvbWFpbihkb21haW4gPSB0aGlzLmdldFlWYWx1ZXMoKSk6IGFueVtdIHtcclxuICAgIGxldCBtaW4gPSBNYXRoLm1pbiguLi5kb21haW4pO1xyXG4gICAgY29uc3QgbWF4ID0gTWF0aC5tYXgodGhpcy55QXhpc01pblNjYWxlLCAuLi5kb21haW4pO1xyXG5cclxuICAgIG1pbiA9IE1hdGgubWF4KDAsIG1pbik7XHJcbiAgICBpZiAoIXRoaXMuYXV0b1NjYWxlKSB7XHJcbiAgICAgIG1pbiA9IE1hdGgubWluKDAsIG1pbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFttaW4sIG1heF07XHJcbiAgfVxyXG5cclxuICBnZXRTZXJpZXNEb21haW4oKTogYW55W10ge1xyXG4gICAgcmV0dXJuIHRoaXMucmVzdWx0cy5tYXAoZCA9PiBkLm5hbWUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0WFNjYWxlKGRvbWFpbiwgd2lkdGgpOiBhbnkge1xyXG4gICAgc3dpdGNoICh0aGlzLnNjYWxlVHlwZSkge1xyXG4gICAgICBjYXNlICd0aW1lJzpcclxuICAgICAgICByZXR1cm4gc2NhbGVUaW1lKClcclxuICAgICAgICAgIC5yYW5nZShbMCwgd2lkdGhdKVxyXG4gICAgICAgICAgLmRvbWFpbihkb21haW4pO1xyXG4gICAgICBjYXNlICdsaW5lYXInOlxyXG4gICAgICAgIGNvbnN0IHNjYWxlID0gc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgICAgLnJhbmdlKFswLCB3aWR0aF0pXHJcbiAgICAgICAgICAuZG9tYWluKGRvbWFpbik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm91bmREb21haW5zID8gc2NhbGUubmljZSgpIDogc2NhbGU7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIHNjYWxlUG9pbnQoKVxyXG4gICAgICAgICAgLnJhbmdlKFswLCB3aWR0aCAtIHR3b1BJIC8gZG9tYWluLmxlbmd0aF0pXHJcbiAgICAgICAgICAucGFkZGluZygwKVxyXG4gICAgICAgICAgLmRvbWFpbihkb21haW4pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0WVNjYWxlKGRvbWFpbiwgaGVpZ2h0KTogYW55IHtcclxuICAgIGNvbnN0IHNjYWxlID0gc2NhbGVMaW5lYXIoKVxyXG4gICAgICAucmFuZ2UoWzAsIGhlaWdodF0pXHJcbiAgICAgIC5kb21haW4oZG9tYWluKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5yb3VuZERvbWFpbnMgPyBzY2FsZS5uaWNlKCkgOiBzY2FsZTtcclxuICB9XHJcblxyXG4gIG9uQ2xpY2soZGF0YSwgc2VyaWVzPyk6IHZvaWQge1xyXG4gICAgaWYgKHNlcmllcykge1xyXG4gICAgICBkYXRhLnNlcmllcyA9IHNlcmllcy5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XHJcbiAgfVxyXG5cclxuICBzZXRDb2xvcnMoKTogdm9pZCB7XHJcbiAgICBjb25zdCBkb21haW4gPSB0aGlzLnNjaGVtZVR5cGUgPT09ICdvcmRpbmFsJyA/IHRoaXMuc2VyaWVzRG9tYWluIDogdGhpcy55RG9tYWluLnJldmVyc2UoKTtcclxuICAgIHRoaXMuY29sb3JzID0gbmV3IENvbG9ySGVscGVyKHRoaXMuc2NoZW1lLCB0aGlzLnNjaGVtZVR5cGUsIGRvbWFpbiwgdGhpcy5jdXN0b21Db2xvcnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGVnZW5kT3B0aW9ucygpIHtcclxuICAgIGlmICh0aGlzLnNjaGVtZVR5cGUgPT09ICdvcmRpbmFsJykge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHNjYWxlVHlwZTogdGhpcy5zY2hlbWVUeXBlLFxyXG4gICAgICAgIGNvbG9yczogdGhpcy5jb2xvcnMsXHJcbiAgICAgICAgZG9tYWluOiB0aGlzLnNlcmllc0RvbWFpbixcclxuICAgICAgICB0aXRsZTogdGhpcy5sZWdlbmRUaXRsZSxcclxuICAgICAgICBwb3NpdGlvbjogdGhpcy5sZWdlbmRQb3NpdGlvblxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc2NhbGVUeXBlOiB0aGlzLnNjaGVtZVR5cGUsXHJcbiAgICAgIGNvbG9yczogdGhpcy5jb2xvcnMuc2NhbGUsXHJcbiAgICAgIGRvbWFpbjogdGhpcy55RG9tYWluLFxyXG4gICAgICB0aXRsZTogdW5kZWZpbmVkLFxyXG4gICAgICBwb3NpdGlvbjogdGhpcy5sZWdlbmRQb3NpdGlvblxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVlBeGlzV2lkdGgoeyB3aWR0aCB9KTogdm9pZCB7XHJcbiAgICB0aGlzLnlBeGlzV2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVYQXhpc0hlaWdodCh7IGhlaWdodCB9KTogdm9pZCB7XHJcbiAgICB0aGlzLnhBeGlzSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIG9uQWN0aXZhdGUoaXRlbSkge1xyXG4gICAgY29uc3QgaWR4ID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbmRJbmRleChkID0+IHtcclxuICAgICAgcmV0dXJuIGQubmFtZSA9PT0gaXRlbS5uYW1lICYmIGQudmFsdWUgPT09IGl0ZW0udmFsdWU7XHJcbiAgICB9KTtcclxuICAgIGlmIChpZHggPiAtMSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmFjdGl2ZUVudHJpZXMgPSB0aGlzLnNob3dTZXJpZXNPbkhvdmVyID8gW2l0ZW0sIC4uLnRoaXMuYWN0aXZlRW50cmllc10gOiB0aGlzLmFjdGl2ZUVudHJpZXM7XHJcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQoeyB2YWx1ZTogaXRlbSwgZW50cmllczogdGhpcy5hY3RpdmVFbnRyaWVzIH0pO1xyXG4gIH1cclxuXHJcbiAgb25EZWFjdGl2YXRlKGl0ZW0pIHtcclxuICAgIGNvbnN0IGlkeCA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kSW5kZXgoZCA9PiB7XHJcbiAgICAgIHJldHVybiBkLm5hbWUgPT09IGl0ZW0ubmFtZSAmJiBkLnZhbHVlID09PSBpdGVtLnZhbHVlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5hY3RpdmVFbnRyaWVzLnNwbGljZShpZHgsIDEpO1xyXG4gICAgdGhpcy5hY3RpdmVFbnRyaWVzID0gWy4uLnRoaXMuYWN0aXZlRW50cmllc107XHJcblxyXG4gICAgdGhpcy5kZWFjdGl2YXRlLmVtaXQoeyB2YWx1ZTogaXRlbSwgZW50cmllczogdGhpcy5hY3RpdmVFbnRyaWVzIH0pO1xyXG4gIH1cclxuXHJcbiAgZGVhY3RpdmF0ZUFsbCgpIHtcclxuICAgIHRoaXMuYWN0aXZlRW50cmllcyA9IFsuLi50aGlzLmFjdGl2ZUVudHJpZXNdO1xyXG4gICAgZm9yIChjb25zdCBlbnRyeSBvZiB0aGlzLmFjdGl2ZUVudHJpZXMpIHtcclxuICAgICAgdGhpcy5kZWFjdGl2YXRlLmVtaXQoeyB2YWx1ZTogZW50cnksIGVudHJpZXM6IFtdIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hY3RpdmVFbnRyaWVzID0gW107XHJcbiAgfVxyXG5cclxuICB0cmFja0J5KGluZGV4LCBpdGVtKSB7XHJcbiAgICByZXR1cm4gaXRlbS5uYW1lO1xyXG4gIH1cclxufVxyXG4iXX0=