import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { scaleBand, scaleLinear } from 'd3-scale';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
let BarHorizontalComponent = class BarHorizontalComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.legend = false;
        this.legendTitle = 'Legend';
        this.legendPosition = 'right';
        this.tooltipDisabled = false;
        this.showGridLines = true;
        this.activeEntries = [];
        this.trimXAxisTicks = true;
        this.trimYAxisTicks = true;
        this.rotateXAxisTicks = true;
        this.maxXAxisTickLength = 16;
        this.maxYAxisTickLength = 16;
        this.barPadding = 8;
        this.roundDomains = false;
        this.roundEdges = true;
        this.showDataLabel = false;
        this.noBarWhenZero = true;
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
        this.dataLabelMaxWidth = { negative: 0, positive: 0 };
    }
    update() {
        super.update();
        if (!this.showDataLabel) {
            this.dataLabelMaxWidth = { negative: 0, positive: 0 };
        }
        this.margin = [10, 20 + this.dataLabelMaxWidth.positive, 10, 20 + this.dataLabelMaxWidth.negative];
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
        this.formatDates();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
    }
    getXScale() {
        this.xDomain = this.getXDomain();
        const scale = scaleLinear()
            .range([0, this.dims.width])
            .domain(this.xDomain);
        return this.roundDomains ? scale.nice() : scale;
    }
    getYScale() {
        this.yDomain = this.getYDomain();
        const spacing = this.yDomain.length / (this.dims.height / this.barPadding + 1);
        return scaleBand()
            .rangeRound([0, this.dims.height])
            .paddingInner(spacing)
            .domain(this.yDomain);
    }
    getXDomain() {
        const values = this.results.map(d => d.value);
        const min = this.xScaleMin ? Math.min(this.xScaleMin, ...values) : Math.min(0, ...values);
        const max = this.xScaleMax ? Math.max(this.xScaleMax, ...values) : Math.max(0, ...values);
        return [min, max];
    }
    getYDomain() {
        return this.results.map(d => d.label);
    }
    onClick(data) {
        this.select.emit(data);
    }
    setColors() {
        let domain;
        if (this.schemeType === 'ordinal') {
            domain = this.yDomain;
        }
        else {
            domain = this.xDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    }
    getLegendOptions() {
        const opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.yDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.xDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    }
    updateYAxisWidth({ width }) {
        this.yAxisWidth = width;
        this.update();
    }
    updateXAxisHeight({ height }) {
        this.xAxisHeight = height;
        this.update();
    }
    onDataLabelMaxWidthChanged(event) {
        if (event.size.negative) {
            this.dataLabelMaxWidth.negative = Math.max(this.dataLabelMaxWidth.negative, event.size.width);
        }
        else {
            this.dataLabelMaxWidth.positive = Math.max(this.dataLabelMaxWidth.positive, event.size.width);
        }
        if (event.index === this.results.length - 1) {
            setTimeout(() => this.update());
        }
    }
    onActivate(item, fromLegend = false) {
        item = this.results.find(d => {
            if (fromLegend) {
                return d.label === item.name;
            }
            else {
                return d.name === item.name;
            }
        });
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item, ...this.activeEntries];
        this.activate.emit({ value: item, entries: this.activeEntries });
    }
    onDeactivate(item, fromLegend = false) {
        item = this.results.find(d => {
            if (fromLegend) {
                return d.label === item.name;
            }
            else {
                return d.name === item.name;
            }
        });
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = [...this.activeEntries];
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    }
};
__decorate([
    Input()
], BarHorizontalComponent.prototype, "legend", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "legendTitle", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "legendPosition", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "xAxis", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "yAxis", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "xAxisLabel", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "yAxisLabel", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "gradient", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "showGridLines", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "activeEntries", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "schemeType", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "trimXAxisTicks", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "trimYAxisTicks", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "rotateXAxisTicks", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "maxXAxisTickLength", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "maxYAxisTickLength", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "xAxisTicks", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "yAxisTicks", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "barPadding", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "roundDomains", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "roundEdges", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "xScaleMax", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "xScaleMin", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "showDataLabel", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "dataLabelFormatting", void 0);
__decorate([
    Input()
], BarHorizontalComponent.prototype, "noBarWhenZero", void 0);
__decorate([
    Output()
], BarHorizontalComponent.prototype, "activate", void 0);
__decorate([
    Output()
], BarHorizontalComponent.prototype, "deactivate", void 0);
__decorate([
    ContentChild('tooltipTemplate')
], BarHorizontalComponent.prototype, "tooltipTemplate", void 0);
BarHorizontalComponent = __decorate([
    Component({
        selector: 'ngx-charts-bar-horizontal',
        template: `
    <ngx-charts-chart
      [view]="[width, height]"
      [showLegend]="legend"
      [legendOptions]="legendOptions"
      [activeEntries]="activeEntries"
      [animations]="animations"
      (legendLabelClick)="onClick($event)"
      (legendLabelActivate)="onActivate($event, true)"
      (legendLabelDeactivate)="onDeactivate($event, true)"
    >
      <svg:g [attr.transform]="transform" class="bar-chart chart">
        <svg:g
          ngx-charts-x-axis
          *ngIf="xAxis"
          [xScale]="xScale"
          [dims]="dims"
          [showGridLines]="showGridLines"
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel"
          [trimTicks]="trimXAxisTicks"
          [rotateTicks]="rotateXAxisTicks"
          [maxTickLength]="maxXAxisTickLength"
          [tickFormatting]="xAxisTickFormatting"
          [ticks]="xAxisTicks"
          (dimensionsChanged)="updateXAxisHeight($event)"
        ></svg:g>
        <svg:g
          ngx-charts-y-axis
          *ngIf="yAxis"
          [yScale]="yScale"
          [dims]="dims"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel"
          [trimTicks]="trimYAxisTicks"
          [maxTickLength]="maxYAxisTickLength"
          [tickFormatting]="yAxisTickFormatting"
          [ticks]="yAxisTicks"
          [yAxisOffset]="dataLabelMaxWidth.negative"
          (dimensionsChanged)="updateYAxisWidth($event)"
        ></svg:g>
        <svg:g
          ngx-charts-series-horizontal
          [xScale]="xScale"
          [yScale]="yScale"
          [colors]="colors"
          [series]="results"
          [dims]="dims"
          [gradient]="gradient"
          [tooltipDisabled]="tooltipDisabled"
          [tooltipTemplate]="tooltipTemplate"
          [activeEntries]="activeEntries"
          [roundEdges]="roundEdges"
          [animations]="animations"
          [showDataLabel]="showDataLabel"
          [dataLabelFormatting]="dataLabelFormatting"
          [noBarWhenZero]="noBarWhenZero"
          (select)="onClick($event)"
          (activate)="onActivate($event)"
          (deactivate)="onDeactivate($event)"
          (dataLabelWidthChanged)="onDataLabelMaxWidthChanged($event)"
        ></svg:g>
      </svg:g>
    </ngx-charts-chart>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None,
        styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
    })
], BarHorizontalComponent);
export { BarHorizontalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLWhvcml6b250YWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvYmFyLWNoYXJ0L2Jhci1ob3Jpem9udGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLFlBQVksRUFFYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVsRCxPQUFPLEVBQUUsdUJBQXVCLEVBQWtCLE1BQU0sa0NBQWtDLENBQUM7QUFDM0YsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBeUVwRSxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUF1QixTQUFRLGtCQUFrQjtJQUE5RDs7UUFDVyxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsZ0JBQVcsR0FBVyxRQUFRLENBQUM7UUFDL0IsbUJBQWMsR0FBVyxPQUFPLENBQUM7UUFPakMsb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFFakMsa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFDOUIsa0JBQWEsR0FBVSxFQUFFLENBQUM7UUFFMUIsbUJBQWMsR0FBWSxJQUFJLENBQUM7UUFDL0IsbUJBQWMsR0FBWSxJQUFJLENBQUM7UUFDL0IscUJBQWdCLEdBQVksSUFBSSxDQUFDO1FBQ2pDLHVCQUFrQixHQUFXLEVBQUUsQ0FBQztRQUNoQyx1QkFBa0IsR0FBVyxFQUFFLENBQUM7UUFLaEMsZUFBVSxHQUFHLENBQUMsQ0FBQztRQUNmLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0Isa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFFL0Isa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFFN0IsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pELGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVc3RCxXQUFNLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxQixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBRXZCLHNCQUFpQixHQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFtS3hELENBQUM7SUFqS0MsTUFBTTtRQUNKLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVmLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDO1NBQ3ZEO1FBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVuRyxJQUFJLENBQUMsSUFBSSxHQUFHLHVCQUF1QixDQUFDO1lBQ2xDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ3BCLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSztZQUNyQixTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDckIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixVQUFVLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDL0IsVUFBVSxFQUFFLElBQUksQ0FBQyxjQUFjO1lBQy9CLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTTtZQUN2QixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDM0IsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO1NBQ3BDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVuQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUUvQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUU3QyxJQUFJLENBQUMsU0FBUyxHQUFHLGFBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ3pFLENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFakMsTUFBTSxLQUFLLEdBQUcsV0FBVyxFQUFFO2FBQ3hCLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFeEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNsRCxDQUFDO0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2pDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUUvRSxPQUFPLFNBQVMsRUFBRTthQUNmLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2pDLFlBQVksQ0FBQyxPQUFPLENBQUM7YUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsVUFBVTtRQUNSLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBRTFGLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBQzFGLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBSTtRQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxNQUFNLENBQUM7UUFDWCxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFO1lBQ2pDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ3ZCO2FBQU07WUFDTCxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUN2QjtRQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDekYsQ0FBQztJQUVELGdCQUFnQjtRQUNkLE1BQU0sSUFBSSxHQUFHO1lBQ1gsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzFCLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLE1BQU0sRUFBRSxFQUFFO1lBQ1YsS0FBSyxFQUFFLFNBQVM7WUFDaEIsUUFBUSxFQUFFLElBQUksQ0FBQyxjQUFjO1NBQzlCLENBQUM7UUFDRixJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQy9CO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNqQztRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQUUsS0FBSyxFQUFFO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBRSxNQUFNLEVBQUU7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCwwQkFBMEIsQ0FBQyxLQUFLO1FBQzlCLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvRjthQUFNO1lBQ0wsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvRjtRQUNELElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDM0MsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxHQUFHLEtBQUs7UUFDakMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzNCLElBQUksVUFBVSxFQUFFO2dCQUNkLE9BQU8sQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQzlCO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQzdCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMzQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3BGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDWixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELFlBQVksQ0FBQyxJQUFJLEVBQUUsVUFBVSxHQUFHLEtBQUs7UUFDbkMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzNCLElBQUksVUFBVSxFQUFFO2dCQUNkLE9BQU8sQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQzlCO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQzdCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMzQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3BGLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU3QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7Q0FDRixDQUFBO0FBbk5VO0lBQVIsS0FBSyxFQUFFO3NEQUFnQjtBQUNmO0lBQVIsS0FBSyxFQUFFOzJEQUFnQztBQUMvQjtJQUFSLEtBQUssRUFBRTs4REFBa0M7QUFDakM7SUFBUixLQUFLLEVBQUU7cURBQU87QUFDTjtJQUFSLEtBQUssRUFBRTtxREFBTztBQUNOO0lBQVIsS0FBSyxFQUFFOzhEQUFnQjtBQUNmO0lBQVIsS0FBSyxFQUFFOzhEQUFnQjtBQUNmO0lBQVIsS0FBSyxFQUFFOzBEQUFZO0FBQ1g7SUFBUixLQUFLLEVBQUU7MERBQVk7QUFDWDtJQUFSLEtBQUssRUFBRTsrREFBa0M7QUFDakM7SUFBUixLQUFLLEVBQUU7d0RBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFOzZEQUErQjtBQUM5QjtJQUFSLEtBQUssRUFBRTs2REFBMkI7QUFDMUI7SUFBUixLQUFLLEVBQUU7MERBQW9CO0FBQ25CO0lBQVIsS0FBSyxFQUFFOzhEQUFnQztBQUMvQjtJQUFSLEtBQUssRUFBRTs4REFBZ0M7QUFDL0I7SUFBUixLQUFLLEVBQUU7Z0VBQWtDO0FBQ2pDO0lBQVIsS0FBSyxFQUFFO2tFQUFpQztBQUNoQztJQUFSLEtBQUssRUFBRTtrRUFBaUM7QUFDaEM7SUFBUixLQUFLLEVBQUU7bUVBQTBCO0FBQ3pCO0lBQVIsS0FBSyxFQUFFO21FQUEwQjtBQUN6QjtJQUFSLEtBQUssRUFBRTswREFBbUI7QUFDbEI7SUFBUixLQUFLLEVBQUU7MERBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFOzBEQUFnQjtBQUNmO0lBQVIsS0FBSyxFQUFFOzREQUErQjtBQUM5QjtJQUFSLEtBQUssRUFBRTswREFBNEI7QUFDM0I7SUFBUixLQUFLLEVBQUU7eURBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFO3lEQUFtQjtBQUNsQjtJQUFSLEtBQUssRUFBRTs2REFBZ0M7QUFDL0I7SUFBUixLQUFLLEVBQUU7bUVBQTBCO0FBQ3pCO0lBQVIsS0FBSyxFQUFFOzZEQUErQjtBQUU3QjtJQUFULE1BQU0sRUFBRTt3REFBa0Q7QUFDakQ7SUFBVCxNQUFNLEVBQUU7MERBQW9EO0FBRTVCO0lBQWhDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQzsrREFBbUM7QUFwQ3hELHNCQUFzQjtJQXZFbEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDJCQUEyQjtRQUNyQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnRVQ7UUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtRQUUvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7S0FDdEMsQ0FBQztHQUNXLHNCQUFzQixDQW9ObEM7U0FwTlksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBWaWV3RW5jYXBzdWxhdGlvbixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDb250ZW50Q2hpbGQsXHJcbiAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgc2NhbGVCYW5kLCBzY2FsZUxpbmVhciB9IGZyb20gJ2QzLXNjYWxlJztcclxuXHJcbmltcG9ydCB7IGNhbGN1bGF0ZVZpZXdEaW1lbnNpb25zLCBWaWV3RGltZW5zaW9ucyB9IGZyb20gJy4uL2NvbW1vbi92aWV3LWRpbWVuc2lvbnMuaGVscGVyJztcclxuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY29sb3IuaGVscGVyJztcclxuaW1wb3J0IHsgQmFzZUNoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL2Jhc2UtY2hhcnQuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LWNoYXJ0cy1iYXItaG9yaXpvbnRhbCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZ3gtY2hhcnRzLWNoYXJ0XHJcbiAgICAgIFt2aWV3XT1cIlt3aWR0aCwgaGVpZ2h0XVwiXHJcbiAgICAgIFtzaG93TGVnZW5kXT1cImxlZ2VuZFwiXHJcbiAgICAgIFtsZWdlbmRPcHRpb25zXT1cImxlZ2VuZE9wdGlvbnNcIlxyXG4gICAgICBbYWN0aXZlRW50cmllc109XCJhY3RpdmVFbnRyaWVzXCJcclxuICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgIChsZWdlbmRMYWJlbENsaWNrKT1cIm9uQ2xpY2soJGV2ZW50KVwiXHJcbiAgICAgIChsZWdlbmRMYWJlbEFjdGl2YXRlKT1cIm9uQWN0aXZhdGUoJGV2ZW50LCB0cnVlKVwiXHJcbiAgICAgIChsZWdlbmRMYWJlbERlYWN0aXZhdGUpPVwib25EZWFjdGl2YXRlKCRldmVudCwgdHJ1ZSlcIlxyXG4gICAgPlxyXG4gICAgICA8c3ZnOmcgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybVwiIGNsYXNzPVwiYmFyLWNoYXJ0IGNoYXJ0XCI+XHJcbiAgICAgICAgPHN2ZzpnXHJcbiAgICAgICAgICBuZ3gtY2hhcnRzLXgtYXhpc1xyXG4gICAgICAgICAgKm5nSWY9XCJ4QXhpc1wiXHJcbiAgICAgICAgICBbeFNjYWxlXT1cInhTY2FsZVwiXHJcbiAgICAgICAgICBbZGltc109XCJkaW1zXCJcclxuICAgICAgICAgIFtzaG93R3JpZExpbmVzXT1cInNob3dHcmlkTGluZXNcIlxyXG4gICAgICAgICAgW3Nob3dMYWJlbF09XCJzaG93WEF4aXNMYWJlbFwiXHJcbiAgICAgICAgICBbbGFiZWxUZXh0XT1cInhBeGlzTGFiZWxcIlxyXG4gICAgICAgICAgW3RyaW1UaWNrc109XCJ0cmltWEF4aXNUaWNrc1wiXHJcbiAgICAgICAgICBbcm90YXRlVGlja3NdPVwicm90YXRlWEF4aXNUaWNrc1wiXHJcbiAgICAgICAgICBbbWF4VGlja0xlbmd0aF09XCJtYXhYQXhpc1RpY2tMZW5ndGhcIlxyXG4gICAgICAgICAgW3RpY2tGb3JtYXR0aW5nXT1cInhBeGlzVGlja0Zvcm1hdHRpbmdcIlxyXG4gICAgICAgICAgW3RpY2tzXT1cInhBeGlzVGlja3NcIlxyXG4gICAgICAgICAgKGRpbWVuc2lvbnNDaGFuZ2VkKT1cInVwZGF0ZVhBeGlzSGVpZ2h0KCRldmVudClcIlxyXG4gICAgICAgID48L3N2ZzpnPlxyXG4gICAgICAgIDxzdmc6Z1xyXG4gICAgICAgICAgbmd4LWNoYXJ0cy15LWF4aXNcclxuICAgICAgICAgICpuZ0lmPVwieUF4aXNcIlxyXG4gICAgICAgICAgW3lTY2FsZV09XCJ5U2NhbGVcIlxyXG4gICAgICAgICAgW2RpbXNdPVwiZGltc1wiXHJcbiAgICAgICAgICBbc2hvd0xhYmVsXT1cInNob3dZQXhpc0xhYmVsXCJcclxuICAgICAgICAgIFtsYWJlbFRleHRdPVwieUF4aXNMYWJlbFwiXHJcbiAgICAgICAgICBbdHJpbVRpY2tzXT1cInRyaW1ZQXhpc1RpY2tzXCJcclxuICAgICAgICAgIFttYXhUaWNrTGVuZ3RoXT1cIm1heFlBeGlzVGlja0xlbmd0aFwiXHJcbiAgICAgICAgICBbdGlja0Zvcm1hdHRpbmddPVwieUF4aXNUaWNrRm9ybWF0dGluZ1wiXHJcbiAgICAgICAgICBbdGlja3NdPVwieUF4aXNUaWNrc1wiXHJcbiAgICAgICAgICBbeUF4aXNPZmZzZXRdPVwiZGF0YUxhYmVsTWF4V2lkdGgubmVnYXRpdmVcIlxyXG4gICAgICAgICAgKGRpbWVuc2lvbnNDaGFuZ2VkKT1cInVwZGF0ZVlBeGlzV2lkdGgoJGV2ZW50KVwiXHJcbiAgICAgICAgPjwvc3ZnOmc+XHJcbiAgICAgICAgPHN2ZzpnXHJcbiAgICAgICAgICBuZ3gtY2hhcnRzLXNlcmllcy1ob3Jpem9udGFsXHJcbiAgICAgICAgICBbeFNjYWxlXT1cInhTY2FsZVwiXHJcbiAgICAgICAgICBbeVNjYWxlXT1cInlTY2FsZVwiXHJcbiAgICAgICAgICBbY29sb3JzXT1cImNvbG9yc1wiXHJcbiAgICAgICAgICBbc2VyaWVzXT1cInJlc3VsdHNcIlxyXG4gICAgICAgICAgW2RpbXNdPVwiZGltc1wiXHJcbiAgICAgICAgICBbZ3JhZGllbnRdPVwiZ3JhZGllbnRcIlxyXG4gICAgICAgICAgW3Rvb2x0aXBEaXNhYmxlZF09XCJ0b29sdGlwRGlzYWJsZWRcIlxyXG4gICAgICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxyXG4gICAgICAgICAgW2FjdGl2ZUVudHJpZXNdPVwiYWN0aXZlRW50cmllc1wiXHJcbiAgICAgICAgICBbcm91bmRFZGdlc109XCJyb3VuZEVkZ2VzXCJcclxuICAgICAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxyXG4gICAgICAgICAgW3Nob3dEYXRhTGFiZWxdPVwic2hvd0RhdGFMYWJlbFwiXHJcbiAgICAgICAgICBbZGF0YUxhYmVsRm9ybWF0dGluZ109XCJkYXRhTGFiZWxGb3JtYXR0aW5nXCJcclxuICAgICAgICAgIFtub0JhcldoZW5aZXJvXT1cIm5vQmFyV2hlblplcm9cIlxyXG4gICAgICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKCRldmVudClcIlxyXG4gICAgICAgICAgKGFjdGl2YXRlKT1cIm9uQWN0aXZhdGUoJGV2ZW50KVwiXHJcbiAgICAgICAgICAoZGVhY3RpdmF0ZSk9XCJvbkRlYWN0aXZhdGUoJGV2ZW50KVwiXHJcbiAgICAgICAgICAoZGF0YUxhYmVsV2lkdGhDaGFuZ2VkKT1cIm9uRGF0YUxhYmVsTWF4V2lkdGhDaGFuZ2VkKCRldmVudClcIlxyXG4gICAgICAgID48L3N2ZzpnPlxyXG4gICAgICA8L3N2ZzpnPlxyXG4gICAgPC9uZ3gtY2hhcnRzLWNoYXJ0PlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgc3R5bGVVcmxzOiBbJy4uL2NvbW1vbi9iYXNlLWNoYXJ0LmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQmFySG9yaXpvbnRhbENvbXBvbmVudCBleHRlbmRzIEJhc2VDaGFydENvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgbGVnZW5kID0gZmFsc2U7XHJcbiAgQElucHV0KCkgbGVnZW5kVGl0bGU6IHN0cmluZyA9ICdMZWdlbmQnO1xyXG4gIEBJbnB1dCgpIGxlZ2VuZFBvc2l0aW9uOiBzdHJpbmcgPSAncmlnaHQnO1xyXG4gIEBJbnB1dCgpIHhBeGlzO1xyXG4gIEBJbnB1dCgpIHlBeGlzO1xyXG4gIEBJbnB1dCgpIHNob3dYQXhpc0xhYmVsO1xyXG4gIEBJbnB1dCgpIHNob3dZQXhpc0xhYmVsO1xyXG4gIEBJbnB1dCgpIHhBeGlzTGFiZWw7XHJcbiAgQElucHV0KCkgeUF4aXNMYWJlbDtcclxuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSBncmFkaWVudDogYm9vbGVhbjtcclxuICBASW5wdXQoKSBzaG93R3JpZExpbmVzOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSBhY3RpdmVFbnRyaWVzOiBhbnlbXSA9IFtdO1xyXG4gIEBJbnB1dCgpIHNjaGVtZVR5cGU6IHN0cmluZztcclxuICBASW5wdXQoKSB0cmltWEF4aXNUaWNrczogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCkgdHJpbVlBeGlzVGlja3M6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIHJvdGF0ZVhBeGlzVGlja3M6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIG1heFhBeGlzVGlja0xlbmd0aDogbnVtYmVyID0gMTY7XHJcbiAgQElucHV0KCkgbWF4WUF4aXNUaWNrTGVuZ3RoOiBudW1iZXIgPSAxNjtcclxuICBASW5wdXQoKSB4QXhpc1RpY2tGb3JtYXR0aW5nOiBhbnk7XHJcbiAgQElucHV0KCkgeUF4aXNUaWNrRm9ybWF0dGluZzogYW55O1xyXG4gIEBJbnB1dCgpIHhBeGlzVGlja3M6IGFueVtdO1xyXG4gIEBJbnB1dCgpIHlBeGlzVGlja3M6IGFueVtdO1xyXG4gIEBJbnB1dCgpIGJhclBhZGRpbmcgPSA4O1xyXG4gIEBJbnB1dCgpIHJvdW5kRG9tYWluczogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHJvdW5kRWRnZXM6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIHhTY2FsZU1heDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHhTY2FsZU1pbjogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHNob3dEYXRhTGFiZWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSBkYXRhTGFiZWxGb3JtYXR0aW5nOiBhbnk7XHJcbiAgQElucHV0KCkgbm9CYXJXaGVuWmVybzogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBAQ29udGVudENoaWxkKCd0b29sdGlwVGVtcGxhdGUnKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIGRpbXM6IFZpZXdEaW1lbnNpb25zO1xyXG4gIHlTY2FsZTogYW55O1xyXG4gIHhTY2FsZTogYW55O1xyXG4gIHhEb21haW46IGFueTtcclxuICB5RG9tYWluOiBhbnk7XHJcbiAgdHJhbnNmb3JtOiBzdHJpbmc7XHJcbiAgY29sb3JzOiBDb2xvckhlbHBlcjtcclxuICBtYXJnaW4gPSBbMTAsIDIwLCAxMCwgMjBdO1xyXG4gIHhBeGlzSGVpZ2h0OiBudW1iZXIgPSAwO1xyXG4gIHlBeGlzV2lkdGg6IG51bWJlciA9IDA7XHJcbiAgbGVnZW5kT3B0aW9uczogYW55O1xyXG4gIGRhdGFMYWJlbE1heFdpZHRoOiBhbnkgPSB7IG5lZ2F0aXZlOiAwLCBwb3NpdGl2ZTogMCB9O1xyXG5cclxuICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICBzdXBlci51cGRhdGUoKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuc2hvd0RhdGFMYWJlbCkge1xyXG4gICAgICB0aGlzLmRhdGFMYWJlbE1heFdpZHRoID0geyBuZWdhdGl2ZTogMCwgcG9zaXRpdmU6IDAgfTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1hcmdpbiA9IFsxMCwgMjAgKyB0aGlzLmRhdGFMYWJlbE1heFdpZHRoLnBvc2l0aXZlLCAxMCwgMjAgKyB0aGlzLmRhdGFMYWJlbE1heFdpZHRoLm5lZ2F0aXZlXTtcclxuXHJcbiAgICB0aGlzLmRpbXMgPSBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucyh7XHJcbiAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxyXG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxyXG4gICAgICBtYXJnaW5zOiB0aGlzLm1hcmdpbixcclxuICAgICAgc2hvd1hBeGlzOiB0aGlzLnhBeGlzLFxyXG4gICAgICBzaG93WUF4aXM6IHRoaXMueUF4aXMsXHJcbiAgICAgIHhBeGlzSGVpZ2h0OiB0aGlzLnhBeGlzSGVpZ2h0LFxyXG4gICAgICB5QXhpc1dpZHRoOiB0aGlzLnlBeGlzV2lkdGgsXHJcbiAgICAgIHNob3dYTGFiZWw6IHRoaXMuc2hvd1hBeGlzTGFiZWwsXHJcbiAgICAgIHNob3dZTGFiZWw6IHRoaXMuc2hvd1lBeGlzTGFiZWwsXHJcbiAgICAgIHNob3dMZWdlbmQ6IHRoaXMubGVnZW5kLFxyXG4gICAgICBsZWdlbmRUeXBlOiB0aGlzLnNjaGVtZVR5cGUsXHJcbiAgICAgIGxlZ2VuZFBvc2l0aW9uOiB0aGlzLmxlZ2VuZFBvc2l0aW9uXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmZvcm1hdERhdGVzKCk7XHJcblxyXG4gICAgdGhpcy54U2NhbGUgPSB0aGlzLmdldFhTY2FsZSgpO1xyXG4gICAgdGhpcy55U2NhbGUgPSB0aGlzLmdldFlTY2FsZSgpO1xyXG5cclxuICAgIHRoaXMuc2V0Q29sb3JzKCk7XHJcbiAgICB0aGlzLmxlZ2VuZE9wdGlvbnMgPSB0aGlzLmdldExlZ2VuZE9wdGlvbnMoKTtcclxuXHJcbiAgICB0aGlzLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt0aGlzLmRpbXMueE9mZnNldH0gLCAke3RoaXMubWFyZ2luWzBdfSlgO1xyXG4gIH1cclxuXHJcbiAgZ2V0WFNjYWxlKCk6IGFueSB7XHJcbiAgICB0aGlzLnhEb21haW4gPSB0aGlzLmdldFhEb21haW4oKTtcclxuXHJcbiAgICBjb25zdCBzY2FsZSA9IHNjYWxlTGluZWFyKClcclxuICAgICAgLnJhbmdlKFswLCB0aGlzLmRpbXMud2lkdGhdKVxyXG4gICAgICAuZG9tYWluKHRoaXMueERvbWFpbik7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucm91bmREb21haW5zID8gc2NhbGUubmljZSgpIDogc2NhbGU7XHJcbiAgfVxyXG5cclxuICBnZXRZU2NhbGUoKTogYW55IHtcclxuICAgIHRoaXMueURvbWFpbiA9IHRoaXMuZ2V0WURvbWFpbigpO1xyXG4gICAgY29uc3Qgc3BhY2luZyA9IHRoaXMueURvbWFpbi5sZW5ndGggLyAodGhpcy5kaW1zLmhlaWdodCAvIHRoaXMuYmFyUGFkZGluZyArIDEpO1xyXG5cclxuICAgIHJldHVybiBzY2FsZUJhbmQoKVxyXG4gICAgICAucmFuZ2VSb3VuZChbMCwgdGhpcy5kaW1zLmhlaWdodF0pXHJcbiAgICAgIC5wYWRkaW5nSW5uZXIoc3BhY2luZylcclxuICAgICAgLmRvbWFpbih0aGlzLnlEb21haW4pO1xyXG4gIH1cclxuXHJcbiAgZ2V0WERvbWFpbigpOiBhbnlbXSB7XHJcbiAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLnJlc3VsdHMubWFwKGQgPT4gZC52YWx1ZSk7XHJcbiAgICBjb25zdCBtaW4gPSB0aGlzLnhTY2FsZU1pbiA/IE1hdGgubWluKHRoaXMueFNjYWxlTWluLCAuLi52YWx1ZXMpIDogTWF0aC5taW4oMCwgLi4udmFsdWVzKTtcclxuXHJcbiAgICBjb25zdCBtYXggPSB0aGlzLnhTY2FsZU1heCA/IE1hdGgubWF4KHRoaXMueFNjYWxlTWF4LCAuLi52YWx1ZXMpIDogTWF0aC5tYXgoMCwgLi4udmFsdWVzKTtcclxuICAgIHJldHVybiBbbWluLCBtYXhdO1xyXG4gIH1cclxuXHJcbiAgZ2V0WURvbWFpbigpOiBhbnlbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZXN1bHRzLm1hcChkID0+IGQubGFiZWwpO1xyXG4gIH1cclxuXHJcbiAgb25DbGljayhkYXRhKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdC5lbWl0KGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgc2V0Q29sb3JzKCk6IHZvaWQge1xyXG4gICAgbGV0IGRvbWFpbjtcclxuICAgIGlmICh0aGlzLnNjaGVtZVR5cGUgPT09ICdvcmRpbmFsJykge1xyXG4gICAgICBkb21haW4gPSB0aGlzLnlEb21haW47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkb21haW4gPSB0aGlzLnhEb21haW47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jb2xvcnMgPSBuZXcgQ29sb3JIZWxwZXIodGhpcy5zY2hlbWUsIHRoaXMuc2NoZW1lVHlwZSwgZG9tYWluLCB0aGlzLmN1c3RvbUNvbG9ycyk7XHJcbiAgfVxyXG5cclxuICBnZXRMZWdlbmRPcHRpb25zKCkge1xyXG4gICAgY29uc3Qgb3B0cyA9IHtcclxuICAgICAgc2NhbGVUeXBlOiB0aGlzLnNjaGVtZVR5cGUsXHJcbiAgICAgIGNvbG9yczogdW5kZWZpbmVkLFxyXG4gICAgICBkb21haW46IFtdLFxyXG4gICAgICB0aXRsZTogdW5kZWZpbmVkLFxyXG4gICAgICBwb3NpdGlvbjogdGhpcy5sZWdlbmRQb3NpdGlvblxyXG4gICAgfTtcclxuICAgIGlmIChvcHRzLnNjYWxlVHlwZSA9PT0gJ29yZGluYWwnKSB7XHJcbiAgICAgIG9wdHMuZG9tYWluID0gdGhpcy55RG9tYWluO1xyXG4gICAgICBvcHRzLmNvbG9ycyA9IHRoaXMuY29sb3JzO1xyXG4gICAgICBvcHRzLnRpdGxlID0gdGhpcy5sZWdlbmRUaXRsZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG9wdHMuZG9tYWluID0gdGhpcy54RG9tYWluO1xyXG4gICAgICBvcHRzLmNvbG9ycyA9IHRoaXMuY29sb3JzLnNjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvcHRzO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlWUF4aXNXaWR0aCh7IHdpZHRoIH0pOiB2b2lkIHtcclxuICAgIHRoaXMueUF4aXNXaWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVhBeGlzSGVpZ2h0KHsgaGVpZ2h0IH0pOiB2b2lkIHtcclxuICAgIHRoaXMueEF4aXNIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgb25EYXRhTGFiZWxNYXhXaWR0aENoYW5nZWQoZXZlbnQpIHtcclxuICAgIGlmIChldmVudC5zaXplLm5lZ2F0aXZlKSB7XHJcbiAgICAgIHRoaXMuZGF0YUxhYmVsTWF4V2lkdGgubmVnYXRpdmUgPSBNYXRoLm1heCh0aGlzLmRhdGFMYWJlbE1heFdpZHRoLm5lZ2F0aXZlLCBldmVudC5zaXplLndpZHRoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZGF0YUxhYmVsTWF4V2lkdGgucG9zaXRpdmUgPSBNYXRoLm1heCh0aGlzLmRhdGFMYWJlbE1heFdpZHRoLnBvc2l0aXZlLCBldmVudC5zaXplLndpZHRoKTtcclxuICAgIH1cclxuICAgIGlmIChldmVudC5pbmRleCA9PT0gdGhpcy5yZXN1bHRzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZSgpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uQWN0aXZhdGUoaXRlbSwgZnJvbUxlZ2VuZCA9IGZhbHNlKSB7XHJcbiAgICBpdGVtID0gdGhpcy5yZXN1bHRzLmZpbmQoZCA9PiB7XHJcbiAgICAgIGlmIChmcm9tTGVnZW5kKSB7XHJcbiAgICAgICAgcmV0dXJuIGQubGFiZWwgPT09IGl0ZW0ubmFtZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZC5uYW1lID09PSBpdGVtLm5hbWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGlkeCA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kSW5kZXgoZCA9PiB7XHJcbiAgICAgIHJldHVybiBkLm5hbWUgPT09IGl0ZW0ubmFtZSAmJiBkLnZhbHVlID09PSBpdGVtLnZhbHVlICYmIGQuc2VyaWVzID09PSBpdGVtLnNlcmllcztcclxuICAgIH0pO1xyXG4gICAgaWYgKGlkeCA+IC0xKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFjdGl2ZUVudHJpZXMgPSBbaXRlbSwgLi4udGhpcy5hY3RpdmVFbnRyaWVzXTtcclxuICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7IHZhbHVlOiBpdGVtLCBlbnRyaWVzOiB0aGlzLmFjdGl2ZUVudHJpZXMgfSk7XHJcbiAgfVxyXG5cclxuICBvbkRlYWN0aXZhdGUoaXRlbSwgZnJvbUxlZ2VuZCA9IGZhbHNlKSB7XHJcbiAgICBpdGVtID0gdGhpcy5yZXN1bHRzLmZpbmQoZCA9PiB7XHJcbiAgICAgIGlmIChmcm9tTGVnZW5kKSB7XHJcbiAgICAgICAgcmV0dXJuIGQubGFiZWwgPT09IGl0ZW0ubmFtZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZC5uYW1lID09PSBpdGVtLm5hbWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGlkeCA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kSW5kZXgoZCA9PiB7XHJcbiAgICAgIHJldHVybiBkLm5hbWUgPT09IGl0ZW0ubmFtZSAmJiBkLnZhbHVlID09PSBpdGVtLnZhbHVlICYmIGQuc2VyaWVzID09PSBpdGVtLnNlcmllcztcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYWN0aXZlRW50cmllcy5zcGxpY2UoaWR4LCAxKTtcclxuICAgIHRoaXMuYWN0aXZlRW50cmllcyA9IFsuLi50aGlzLmFjdGl2ZUVudHJpZXNdO1xyXG5cclxuICAgIHRoaXMuZGVhY3RpdmF0ZS5lbWl0KHsgdmFsdWU6IGl0ZW0sIGVudHJpZXM6IHRoaXMuYWN0aXZlRW50cmllcyB9KTtcclxuICB9XHJcbn1cclxuIl19