import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { formatLabel, escapeLabel } from '../common/label.helper';
export var D0Types;
(function (D0Types) {
    D0Types["positive"] = "positive";
    D0Types["negative"] = "negative";
})(D0Types || (D0Types = {}));
let SeriesVerticalComponent = class SeriesVerticalComponent {
    constructor() {
        this.type = 'standard';
        this.tooltipDisabled = false;
        this.animations = true;
        this.showDataLabel = false;
        this.noBarWhenZero = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.dataLabelHeightChanged = new EventEmitter();
        this.barsForDataLabels = [];
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.updateTooltipSettings();
        let width;
        if (this.series.length) {
            width = this.xScale.bandwidth();
        }
        width = Math.round(width);
        const yScaleMin = Math.max(this.yScale.domain()[0], 0);
        const d0 = {
            [D0Types.positive]: 0,
            [D0Types.negative]: 0
        };
        let d0Type = D0Types.positive;
        let total;
        if (this.type === 'normalized') {
            total = this.series.map(d => d.value).reduce((sum, d) => sum + d, 0);
        }
        this.bars = this.series.map((d, index) => {
            let value = d.value;
            const oldValue = d.value;
            if (this.scaleType === 'log') {
                const e = {};
                Object.assign(e, d);
                e.value = Math.log10(Number(value));
                value = e.value;
            }
            else {
            }
            const label = this.getLabel(d);
            const formattedLabel = formatLabel(label);
            const roundEdges = this.roundEdges;
            d0Type = value > 0 ? D0Types.positive : D0Types.negative;
            const bar = {
                value,
                label,
                roundEdges,
                data: d,
                width,
                formattedLabel,
                height: 0,
                x: 0,
                y: 0
            };
            if (this.type === 'standard') {
                bar.height = Math.abs(this.yScale(value) - this.yScale(yScaleMin));
                bar.x = this.xScale(label);
                if (value < 0) {
                    bar.y = this.yScale(0);
                }
                else {
                    bar.y = this.yScale(value);
                }
            }
            else if (this.type === 'stacked') {
                const offset0 = d0[d0Type];
                const offset1 = offset0 + value;
                d0[d0Type] += value;
                bar.height = this.yScale(offset0) - this.yScale(offset1);
                bar.x = 0;
                bar.y = this.yScale(offset1);
                bar.offset0 = offset0;
                bar.offset1 = offset1;
            }
            else if (this.type === 'normalized') {
                let offset0 = d0[d0Type];
                let offset1 = offset0 + value;
                d0[d0Type] += value;
                if (total > 0) {
                    offset0 = (offset0 * 100) / total;
                    offset1 = (offset1 * 100) / total;
                }
                else {
                    offset0 = 0;
                    offset1 = 0;
                }
                bar.height = this.yScale(offset0) - this.yScale(offset1);
                bar.x = 0;
                bar.y = this.yScale(offset1);
                bar.offset0 = offset0;
                bar.offset1 = offset1;
                value = (offset1 - offset0).toFixed(2) + '%';
            }
            if (this.colors.scaleType === 'ordinal') {
                bar.color = this.colors.getColor(label);
            }
            else {
                if (this.type === 'standard') {
                    bar.color = this.colors.getColor(value);
                    bar.gradientStops = this.colors.getLinearGradientStops(value);
                }
                else {
                    bar.color = this.colors.getColor(bar.offset1);
                    bar.gradientStops = this.colors.getLinearGradientStops(bar.offset1, bar.offset0);
                }
            }
            let tooltipLabel = formattedLabel;
            bar.ariaLabel = formattedLabel + ' ' + value.toLocaleString();
            if (this.seriesName) {
                tooltipLabel = `${this.seriesName} • ${formattedLabel}`;
                bar.data.series = this.seriesName;
                bar.ariaLabel = this.seriesName + ' ' + bar.ariaLabel;
            }
            bar.tooltipText = this.tooltipDisabled
                ? undefined
                : `
        <span class="tooltip-label">${escapeLabel(tooltipLabel)}</span>
        <span class="tooltip-val">${oldValue.toLocaleString()}</span>
      `;
            return bar;
        });
        this.updateDataLabels();
    }
    updateDataLabels() {
        if (this.type === 'stacked') {
            this.barsForDataLabels = [];
            const section = {};
            section.series = this.seriesName;
            const totalPositive = this.series.map(d => d.value).reduce((sum, d) => (d > 0 ? sum + d : sum), 0);
            const totalNegative = this.series.map(d => d.value).reduce((sum, d) => (d < 0 ? sum + d : sum), 0);
            section.total = totalPositive + totalNegative;
            section.x = 0;
            section.y = 0;
            if (section.total > 0) {
                section.height = this.yScale(totalPositive);
            }
            else {
                section.height = this.yScale(totalNegative);
            }
            section.width = this.xScale.bandwidth();
            this.barsForDataLabels.push(section);
        }
        else {
            this.barsForDataLabels = this.series.map(d => {
                const section = {};
                section.series = this.seriesName ? this.seriesName : d.label;
                section.total = d.value;
                section.x = this.xScale(d.label);
                section.y = this.yScale(0);
                section.height = this.yScale(section.total) - this.yScale(0);
                section.width = this.xScale.bandwidth();
                return section;
            });
        }
    }
    updateTooltipSettings() {
        this.tooltipPlacement = this.tooltipDisabled ? undefined : 'top';
        this.tooltipType = this.tooltipDisabled ? undefined : 'tooltip';
    }
    isActive(entry) {
        if (!this.activeEntries)
            return false;
        const item = this.activeEntries.find(d => {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    }
    onClick(data) {
        this.select.emit(data);
    }
    getLabel(dataItem) {
        if (dataItem.label) {
            return dataItem.label;
        }
        return dataItem.name;
    }
    trackBy(index, bar) {
        return bar.label;
    }
    trackDataLabelBy(index, barLabel) {
        return index + '#' + barLabel.series + '#' + barLabel.total;
    }
};
__decorate([
    Input()
], SeriesVerticalComponent.prototype, "dims", void 0);
__decorate([
    Input()
], SeriesVerticalComponent.prototype, "type", void 0);
__decorate([
    Input()
], SeriesVerticalComponent.prototype, "series", void 0);
__decorate([
    Input()
], SeriesVerticalComponent.prototype, "xScale", void 0);
__decorate([
    Input()
], SeriesVerticalComponent.prototype, "yScale", void 0);
__decorate([
    Input()
], SeriesVerticalComponent.prototype, "scaleType", void 0);
__decorate([
    Input()
], SeriesVerticalComponent.prototype, "colors", void 0);
__decorate([
    Input()
], SeriesVerticalComponent.prototype, "gradient", void 0);
__decorate([
    Input()
], SeriesVerticalComponent.prototype, "activeEntries", void 0);
__decorate([
    Input()
], SeriesVerticalComponent.prototype, "seriesName", void 0);
__decorate([
    Input()
], SeriesVerticalComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input()
], SeriesVerticalComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    Input()
], SeriesVerticalComponent.prototype, "roundEdges", void 0);
__decorate([
    Input()
], SeriesVerticalComponent.prototype, "animations", void 0);
__decorate([
    Input()
], SeriesVerticalComponent.prototype, "showDataLabel", void 0);
__decorate([
    Input()
], SeriesVerticalComponent.prototype, "dataLabelFormatting", void 0);
__decorate([
    Input()
], SeriesVerticalComponent.prototype, "noBarWhenZero", void 0);
__decorate([
    Output()
], SeriesVerticalComponent.prototype, "select", void 0);
__decorate([
    Output()
], SeriesVerticalComponent.prototype, "activate", void 0);
__decorate([
    Output()
], SeriesVerticalComponent.prototype, "deactivate", void 0);
__decorate([
    Output()
], SeriesVerticalComponent.prototype, "dataLabelHeightChanged", void 0);
SeriesVerticalComponent = __decorate([
    Component({
        selector: 'g[ngx-charts-series-vertical]',
        template: `
    <svg:g
      ngx-charts-bar
      *ngFor="let bar of bars; trackBy: trackBy"
      [@animationState]="'active'"
      [@.disabled]="!animations"
      [width]="bar.width"
      [height]="bar.height"
      [x]="bar.x"
      [y]="bar.y"
      [fill]="bar.color"
      [stops]="bar.gradientStops"
      [data]="bar.data"
      [orientation]="'vertical'"
      [roundEdges]="bar.roundEdges"
      [gradient]="gradient"
      [ariaLabel]="bar.ariaLabel"
      [isActive]="isActive(bar.data)"
      (select)="onClick($event)"
      (activate)="activate.emit($event)"
      (deactivate)="deactivate.emit($event)"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="tooltipPlacement"
      [tooltipType]="tooltipType"
      [tooltipTitle]="tooltipTemplate ? undefined : bar.tooltipText"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipContext]="bar.data"
      [noBarWhenZero]="noBarWhenZero"
      [animations]="animations"
    ></svg:g>
    <svg:g *ngIf="showDataLabel">
      <svg:g
        ngx-charts-bar-label
        *ngFor="let b of barsForDataLabels; let i = index; trackBy: trackDataLabelBy"
        [barX]="b.x"
        [barY]="b.y"
        [barWidth]="b.width"
        [barHeight]="b.height"
        [value]="b.total"
        [valueFormatting]="dataLabelFormatting"
        [orientation]="'vertical'"
        (dimensionsChanged)="dataLabelHeightChanged.emit({ size: $event, index: i })"
      />
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [
            trigger('animationState', [
                transition(':leave', [
                    style({
                        opacity: 1
                    }),
                    animate(500, style({ opacity: 0 }))
                ])
            ])
        ]
    })
], SeriesVerticalComponent);
export { SeriesVerticalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVzLXZlcnRpY2FsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2Jhci1jaGFydC9zZXJpZXMtdmVydGljYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFhLHVCQUF1QixFQUFlLE1BQU0sZUFBZSxDQUFDO0FBQ3hILE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR2xFLE1BQU0sQ0FBTixJQUFZLE9BR1g7QUFIRCxXQUFZLE9BQU87SUFDakIsZ0NBQXFCLENBQUE7SUFDckIsZ0NBQXFCLENBQUE7QUFDdkIsQ0FBQyxFQUhXLE9BQU8sS0FBUCxPQUFPLFFBR2xCO0FBOERELElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXVCO0lBQXBDO1FBRVcsU0FBSSxHQUFHLFVBQVUsQ0FBQztRQVNsQixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUdqQyxlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBRS9CLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBRTdCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hDLDJCQUFzQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFRdEQsc0JBQWlCLEdBQWtHLEVBQUUsQ0FBQztJQTZMeEgsQ0FBQztJQTNMQyxXQUFXLENBQUMsT0FBTztRQUNqQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixJQUFJLEtBQUssQ0FBQztRQUNWLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDdEIsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDakM7UUFDRCxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFdkQsTUFBTSxFQUFFLEdBQUc7WUFDVCxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQ3JCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7U0FDdEIsQ0FBQztRQUNGLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFFOUIsSUFBSSxLQUFLLENBQUM7UUFDVixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssWUFBWSxFQUFFO1lBQzlCLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3RFO1FBRUQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUN2QyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3BCLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDekIsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLEtBQUssRUFBRTtnQkFDNUIsTUFBTSxDQUFDLEdBQVEsRUFBRSxDQUFDO2dCQUNsQixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQzthQUNqQjtpQkFBTTthQUVOO1lBQ0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixNQUFNLGNBQWMsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNuQyxNQUFNLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztZQUV6RCxNQUFNLEdBQUcsR0FBUTtnQkFDZixLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsVUFBVTtnQkFDVixJQUFJLEVBQUUsQ0FBQztnQkFDUCxLQUFLO2dCQUNMLGNBQWM7Z0JBQ2QsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsQ0FBQyxFQUFFLENBQUM7Z0JBQ0osQ0FBQyxFQUFFLENBQUM7YUFDTCxDQUFDO1lBRUYsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtnQkFDNUIsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNuRSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRTNCLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtvQkFDYixHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3hCO3FCQUFNO29CQUNMLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDNUI7YUFDRjtpQkFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO2dCQUNsQyxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzNCLE1BQU0sT0FBTyxHQUFHLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ2hDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUM7Z0JBRXBCLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN6RCxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDVixHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzdCLEdBQUcsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUN0QixHQUFHLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzthQUN2QjtpQkFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssWUFBWSxFQUFFO2dCQUNyQyxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3pCLElBQUksT0FBTyxHQUFHLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQzlCLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUM7Z0JBRXBCLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtvQkFDYixPQUFPLEdBQUcsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO29CQUNsQyxPQUFPLEdBQUcsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2lCQUNuQztxQkFBTTtvQkFDTCxPQUFPLEdBQUcsQ0FBQyxDQUFDO29CQUNaLE9BQU8sR0FBRyxDQUFDLENBQUM7aUJBQ2I7Z0JBRUQsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3pELEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNWLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDN0IsR0FBRyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Z0JBQ3RCLEdBQUcsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUN0QixLQUFLLEdBQUcsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQzthQUM5QztZQUVELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO2dCQUN2QyxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pDO2lCQUFNO2dCQUNMLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7b0JBQzVCLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3hDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDL0Q7cUJBQU07b0JBQ0wsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzlDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDbEY7YUFDRjtZQUVELElBQUksWUFBWSxHQUFHLGNBQWMsQ0FBQztZQUNsQyxHQUFHLENBQUMsU0FBUyxHQUFHLGNBQWMsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzlELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDbkIsWUFBWSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsTUFBTSxjQUFjLEVBQUUsQ0FBQztnQkFDeEQsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDbEMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO2FBQ3ZEO1lBRUQsR0FBRyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZTtnQkFDcEMsQ0FBQyxDQUFDLFNBQVM7Z0JBQ1gsQ0FBQyxDQUFDO3NDQUM0QixXQUFXLENBQUMsWUFBWSxDQUFDO29DQUMzQixRQUFRLENBQUMsY0FBYyxFQUFFO09BQ3RELENBQUM7WUFFRixPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELGdCQUFnQjtRQUNkLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztZQUM1QixNQUFNLE9BQU8sR0FBUSxFQUFFLENBQUM7WUFDeEIsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ2pDLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkcsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuRyxPQUFPLENBQUMsS0FBSyxHQUFHLGFBQWEsR0FBRyxhQUFhLENBQUM7WUFDOUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZCxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNkLElBQUksT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ3JCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUM3QztpQkFBTTtnQkFDTCxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDN0M7WUFDRCxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN0QzthQUFNO1lBQ0wsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUMzQyxNQUFNLE9BQU8sR0FBUSxFQUFFLENBQUM7Z0JBQ3hCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDN0QsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUN4QixPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNqQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0QsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUN4QyxPQUFPLE9BQU8sQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELHFCQUFxQjtRQUNuQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDakUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQUs7UUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWE7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUN0QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN2QyxPQUFPLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDNUQsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksS0FBSyxTQUFTLENBQUM7SUFDNUIsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFjO1FBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxRQUFRLENBQUMsUUFBUTtRQUNmLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRTtZQUNsQixPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUM7U0FDdkI7UUFDRCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVELE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRztRQUNoQixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUM7SUFDbkIsQ0FBQztJQUVELGdCQUFnQixDQUFDLEtBQUssRUFBRSxRQUFRO1FBQzlCLE9BQU8sS0FBSyxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO0lBQzlELENBQUM7Q0FDRixDQUFBO0FBMU5VO0lBQVIsS0FBSyxFQUFFO3FEQUFNO0FBQ0w7SUFBUixLQUFLLEVBQUU7cURBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFO3VEQUFRO0FBQ1A7SUFBUixLQUFLLEVBQUU7dURBQVE7QUFDUDtJQUFSLEtBQUssRUFBRTt1REFBUTtBQUNQO0lBQVIsS0FBSyxFQUFFOzBEQUFXO0FBQ1Y7SUFBUixLQUFLLEVBQUU7dURBQVE7QUFDUDtJQUFSLEtBQUssRUFBRTt5REFBbUI7QUFDbEI7SUFBUixLQUFLLEVBQUU7OERBQXNCO0FBQ3JCO0lBQVIsS0FBSyxFQUFFOzJEQUFvQjtBQUNuQjtJQUFSLEtBQUssRUFBRTtnRUFBa0M7QUFDakM7SUFBUixLQUFLLEVBQUU7Z0VBQW1DO0FBQ2xDO0lBQVIsS0FBSyxFQUFFOzJEQUFxQjtBQUNwQjtJQUFSLEtBQUssRUFBRTsyREFBNEI7QUFDM0I7SUFBUixLQUFLLEVBQUU7OERBQWdDO0FBQy9CO0lBQVIsS0FBSyxFQUFFO29FQUEwQjtBQUN6QjtJQUFSLEtBQUssRUFBRTs4REFBK0I7QUFFN0I7SUFBVCxNQUFNLEVBQUU7dURBQTZCO0FBQzVCO0lBQVQsTUFBTSxFQUFFO3lEQUErQjtBQUM5QjtJQUFULE1BQU0sRUFBRTsyREFBaUM7QUFDaEM7SUFBVCxNQUFNLEVBQUU7dUVBQTZDO0FBdEIzQyx1QkFBdUI7SUE1RG5DLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSwrQkFBK0I7UUFDekMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Q1Q7UUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtRQUMvQyxVQUFVLEVBQUU7WUFDVixPQUFPLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3hCLFVBQVUsQ0FBQyxRQUFRLEVBQUU7b0JBQ25CLEtBQUssQ0FBQzt3QkFDSixPQUFPLEVBQUUsQ0FBQztxQkFDWCxDQUFDO29CQUNGLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ3BDLENBQUM7YUFDSCxDQUFDO1NBQ0g7S0FDRixDQUFDO0dBQ1csdUJBQXVCLENBMk5uQztTQTNOWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRyaWdnZXIsIHN0eWxlLCBhbmltYXRlLCB0cmFuc2l0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBmb3JtYXRMYWJlbCwgZXNjYXBlTGFiZWwgfSBmcm9tICcuLi9jb21tb24vbGFiZWwuaGVscGVyJztcbmltcG9ydCB7IERhdGFJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL2NoYXJ0LWRhdGEubW9kZWwnO1xuXG5leHBvcnQgZW51bSBEMFR5cGVzIHtcbiAgcG9zaXRpdmUgPSAncG9zaXRpdmUnLFxuICBuZWdhdGl2ZSA9ICduZWdhdGl2ZSdcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLXNlcmllcy12ZXJ0aWNhbF0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6Z1xuICAgICAgbmd4LWNoYXJ0cy1iYXJcbiAgICAgICpuZ0Zvcj1cImxldCBiYXIgb2YgYmFyczsgdHJhY2tCeTogdHJhY2tCeVwiXG4gICAgICBbQGFuaW1hdGlvblN0YXRlXT1cIidhY3RpdmUnXCJcbiAgICAgIFtALmRpc2FibGVkXT1cIiFhbmltYXRpb25zXCJcbiAgICAgIFt3aWR0aF09XCJiYXIud2lkdGhcIlxuICAgICAgW2hlaWdodF09XCJiYXIuaGVpZ2h0XCJcbiAgICAgIFt4XT1cImJhci54XCJcbiAgICAgIFt5XT1cImJhci55XCJcbiAgICAgIFtmaWxsXT1cImJhci5jb2xvclwiXG4gICAgICBbc3RvcHNdPVwiYmFyLmdyYWRpZW50U3RvcHNcIlxuICAgICAgW2RhdGFdPVwiYmFyLmRhdGFcIlxuICAgICAgW29yaWVudGF0aW9uXT1cIid2ZXJ0aWNhbCdcIlxuICAgICAgW3JvdW5kRWRnZXNdPVwiYmFyLnJvdW5kRWRnZXNcIlxuICAgICAgW2dyYWRpZW50XT1cImdyYWRpZW50XCJcbiAgICAgIFthcmlhTGFiZWxdPVwiYmFyLmFyaWFMYWJlbFwiXG4gICAgICBbaXNBY3RpdmVdPVwiaXNBY3RpdmUoYmFyLmRhdGEpXCJcbiAgICAgIChzZWxlY3QpPVwib25DbGljaygkZXZlbnQpXCJcbiAgICAgIChhY3RpdmF0ZSk9XCJhY3RpdmF0ZS5lbWl0KCRldmVudClcIlxuICAgICAgKGRlYWN0aXZhdGUpPVwiZGVhY3RpdmF0ZS5lbWl0KCRldmVudClcIlxuICAgICAgbmd4LXRvb2x0aXBcbiAgICAgIFt0b29sdGlwRGlzYWJsZWRdPVwidG9vbHRpcERpc2FibGVkXCJcbiAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgICAgW3Rvb2x0aXBUeXBlXT1cInRvb2x0aXBUeXBlXCJcbiAgICAgIFt0b29sdGlwVGl0bGVdPVwidG9vbHRpcFRlbXBsYXRlID8gdW5kZWZpbmVkIDogYmFyLnRvb2x0aXBUZXh0XCJcbiAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgIFt0b29sdGlwQ29udGV4dF09XCJiYXIuZGF0YVwiXG4gICAgICBbbm9CYXJXaGVuWmVyb109XCJub0JhcldoZW5aZXJvXCJcbiAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxuICAgID48L3N2ZzpnPlxuICAgIDxzdmc6ZyAqbmdJZj1cInNob3dEYXRhTGFiZWxcIj5cbiAgICAgIDxzdmc6Z1xuICAgICAgICBuZ3gtY2hhcnRzLWJhci1sYWJlbFxuICAgICAgICAqbmdGb3I9XCJsZXQgYiBvZiBiYXJzRm9yRGF0YUxhYmVsczsgbGV0IGkgPSBpbmRleDsgdHJhY2tCeTogdHJhY2tEYXRhTGFiZWxCeVwiXG4gICAgICAgIFtiYXJYXT1cImIueFwiXG4gICAgICAgIFtiYXJZXT1cImIueVwiXG4gICAgICAgIFtiYXJXaWR0aF09XCJiLndpZHRoXCJcbiAgICAgICAgW2JhckhlaWdodF09XCJiLmhlaWdodFwiXG4gICAgICAgIFt2YWx1ZV09XCJiLnRvdGFsXCJcbiAgICAgICAgW3ZhbHVlRm9ybWF0dGluZ109XCJkYXRhTGFiZWxGb3JtYXR0aW5nXCJcbiAgICAgICAgW29yaWVudGF0aW9uXT1cIid2ZXJ0aWNhbCdcIlxuICAgICAgICAoZGltZW5zaW9uc0NoYW5nZWQpPVwiZGF0YUxhYmVsSGVpZ2h0Q2hhbmdlZC5lbWl0KHsgc2l6ZTogJGV2ZW50LCBpbmRleDogaSB9KVwiXG4gICAgICAvPlxuICAgIDwvc3ZnOmc+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignYW5pbWF0aW9uU3RhdGUnLCBbXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgIH0pLFxuICAgICAgICBhbmltYXRlKDUwMCwgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKVxuICAgICAgXSlcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFNlcmllc1ZlcnRpY2FsQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZGltcztcbiAgQElucHV0KCkgdHlwZSA9ICdzdGFuZGFyZCc7XG4gIEBJbnB1dCgpIHNlcmllcztcbiAgQElucHV0KCkgeFNjYWxlO1xuICBASW5wdXQoKSB5U2NhbGU7XG4gIEBJbnB1dCgpIHNjYWxlVHlwZTtcbiAgQElucHV0KCkgY29sb3JzO1xuICBASW5wdXQoKSBncmFkaWVudDogYm9vbGVhbjtcbiAgQElucHV0KCkgYWN0aXZlRW50cmllczogYW55W107XG4gIEBJbnB1dCgpIHNlcmllc05hbWU6IHN0cmluZztcbiAgQElucHV0KCkgdG9vbHRpcERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQElucHV0KCkgcm91bmRFZGdlczogYm9vbGVhbjtcbiAgQElucHV0KCkgYW5pbWF0aW9uczogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHNob3dEYXRhTGFiZWw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgZGF0YUxhYmVsRm9ybWF0dGluZzogYW55O1xuICBASW5wdXQoKSBub0JhcldoZW5aZXJvOiBib29sZWFuID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGF0YUxhYmVsSGVpZ2h0Q2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICB0b29sdGlwUGxhY2VtZW50OiBzdHJpbmc7XG4gIHRvb2x0aXBUeXBlOiBzdHJpbmc7XG5cbiAgYmFyczogYW55O1xuICB4OiBhbnk7XG4gIHk6IGFueTtcbiAgYmFyc0ZvckRhdGFMYWJlbHM6IEFycmF5PHsgeDogbnVtYmVyOyB5OiBudW1iZXI7IHdpZHRoOiBudW1iZXI7IGhlaWdodDogbnVtYmVyOyB0b3RhbDogbnVtYmVyOyBzZXJpZXM6IHN0cmluZyB9PiA9IFtdO1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlVG9vbHRpcFNldHRpbmdzKCk7XG4gICAgbGV0IHdpZHRoO1xuICAgIGlmICh0aGlzLnNlcmllcy5sZW5ndGgpIHtcbiAgICAgIHdpZHRoID0gdGhpcy54U2NhbGUuYmFuZHdpZHRoKCk7XG4gICAgfVxuICAgIHdpZHRoID0gTWF0aC5yb3VuZCh3aWR0aCk7XG4gICAgY29uc3QgeVNjYWxlTWluID0gTWF0aC5tYXgodGhpcy55U2NhbGUuZG9tYWluKClbMF0sIDApO1xuXG4gICAgY29uc3QgZDAgPSB7XG4gICAgICBbRDBUeXBlcy5wb3NpdGl2ZV06IDAsXG4gICAgICBbRDBUeXBlcy5uZWdhdGl2ZV06IDBcbiAgICB9O1xuICAgIGxldCBkMFR5cGUgPSBEMFR5cGVzLnBvc2l0aXZlO1xuXG4gICAgbGV0IHRvdGFsO1xuICAgIGlmICh0aGlzLnR5cGUgPT09ICdub3JtYWxpemVkJykge1xuICAgICAgdG90YWwgPSB0aGlzLnNlcmllcy5tYXAoZCA9PiBkLnZhbHVlKS5yZWR1Y2UoKHN1bSwgZCkgPT4gc3VtICsgZCwgMCk7XG4gICAgfVxuXG4gICAgdGhpcy5iYXJzID0gdGhpcy5zZXJpZXMubWFwKChkLCBpbmRleCkgPT4ge1xuICAgICAgbGV0IHZhbHVlID0gZC52YWx1ZTtcbiAgICAgIGNvbnN0IG9sZFZhbHVlID0gZC52YWx1ZTtcbiAgICAgIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ2xvZycpIHtcbiAgICAgICAgY29uc3QgZTogYW55ID0ge307XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZSwgZCk7XG4gICAgICAgIGUudmFsdWUgPSBNYXRoLmxvZzEwKE51bWJlcih2YWx1ZSkpO1xuICAgICAgICB2YWx1ZSA9IGUudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuXG4gICAgICB9XG4gICAgICBjb25zdCBsYWJlbCA9IHRoaXMuZ2V0TGFiZWwoZCk7XG4gICAgICBjb25zdCBmb3JtYXR0ZWRMYWJlbCA9IGZvcm1hdExhYmVsKGxhYmVsKTtcbiAgICAgIGNvbnN0IHJvdW5kRWRnZXMgPSB0aGlzLnJvdW5kRWRnZXM7XG4gICAgICBkMFR5cGUgPSB2YWx1ZSA+IDAgPyBEMFR5cGVzLnBvc2l0aXZlIDogRDBUeXBlcy5uZWdhdGl2ZTtcblxuICAgICAgY29uc3QgYmFyOiBhbnkgPSB7XG4gICAgICAgIHZhbHVlLFxuICAgICAgICBsYWJlbCxcbiAgICAgICAgcm91bmRFZGdlcyxcbiAgICAgICAgZGF0YTogZCxcbiAgICAgICAgd2lkdGgsXG4gICAgICAgIGZvcm1hdHRlZExhYmVsLFxuICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDBcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdzdGFuZGFyZCcpIHtcbiAgICAgICAgYmFyLmhlaWdodCA9IE1hdGguYWJzKHRoaXMueVNjYWxlKHZhbHVlKSAtIHRoaXMueVNjYWxlKHlTY2FsZU1pbikpO1xuICAgICAgICBiYXIueCA9IHRoaXMueFNjYWxlKGxhYmVsKTtcblxuICAgICAgICBpZiAodmFsdWUgPCAwKSB7XG4gICAgICAgICAgYmFyLnkgPSB0aGlzLnlTY2FsZSgwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBiYXIueSA9IHRoaXMueVNjYWxlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICdzdGFja2VkJykge1xuICAgICAgICBjb25zdCBvZmZzZXQwID0gZDBbZDBUeXBlXTtcbiAgICAgICAgY29uc3Qgb2Zmc2V0MSA9IG9mZnNldDAgKyB2YWx1ZTtcbiAgICAgICAgZDBbZDBUeXBlXSArPSB2YWx1ZTtcblxuICAgICAgICBiYXIuaGVpZ2h0ID0gdGhpcy55U2NhbGUob2Zmc2V0MCkgLSB0aGlzLnlTY2FsZShvZmZzZXQxKTtcbiAgICAgICAgYmFyLnggPSAwO1xuICAgICAgICBiYXIueSA9IHRoaXMueVNjYWxlKG9mZnNldDEpO1xuICAgICAgICBiYXIub2Zmc2V0MCA9IG9mZnNldDA7XG4gICAgICAgIGJhci5vZmZzZXQxID0gb2Zmc2V0MTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSAnbm9ybWFsaXplZCcpIHtcbiAgICAgICAgbGV0IG9mZnNldDAgPSBkMFtkMFR5cGVdO1xuICAgICAgICBsZXQgb2Zmc2V0MSA9IG9mZnNldDAgKyB2YWx1ZTtcbiAgICAgICAgZDBbZDBUeXBlXSArPSB2YWx1ZTtcblxuICAgICAgICBpZiAodG90YWwgPiAwKSB7XG4gICAgICAgICAgb2Zmc2V0MCA9IChvZmZzZXQwICogMTAwKSAvIHRvdGFsO1xuICAgICAgICAgIG9mZnNldDEgPSAob2Zmc2V0MSAqIDEwMCkgLyB0b3RhbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvZmZzZXQwID0gMDtcbiAgICAgICAgICBvZmZzZXQxID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGJhci5oZWlnaHQgPSB0aGlzLnlTY2FsZShvZmZzZXQwKSAtIHRoaXMueVNjYWxlKG9mZnNldDEpO1xuICAgICAgICBiYXIueCA9IDA7XG4gICAgICAgIGJhci55ID0gdGhpcy55U2NhbGUob2Zmc2V0MSk7XG4gICAgICAgIGJhci5vZmZzZXQwID0gb2Zmc2V0MDtcbiAgICAgICAgYmFyLm9mZnNldDEgPSBvZmZzZXQxO1xuICAgICAgICB2YWx1ZSA9IChvZmZzZXQxIC0gb2Zmc2V0MCkudG9GaXhlZCgyKSArICclJztcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY29sb3JzLnNjYWxlVHlwZSA9PT0gJ29yZGluYWwnKSB7XG4gICAgICAgIGJhci5jb2xvciA9IHRoaXMuY29sb3JzLmdldENvbG9yKGxhYmVsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdzdGFuZGFyZCcpIHtcbiAgICAgICAgICBiYXIuY29sb3IgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcih2YWx1ZSk7XG4gICAgICAgICAgYmFyLmdyYWRpZW50U3RvcHMgPSB0aGlzLmNvbG9ycy5nZXRMaW5lYXJHcmFkaWVudFN0b3BzKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBiYXIuY29sb3IgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcihiYXIub2Zmc2V0MSk7XG4gICAgICAgICAgYmFyLmdyYWRpZW50U3RvcHMgPSB0aGlzLmNvbG9ycy5nZXRMaW5lYXJHcmFkaWVudFN0b3BzKGJhci5vZmZzZXQxLCBiYXIub2Zmc2V0MCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IHRvb2x0aXBMYWJlbCA9IGZvcm1hdHRlZExhYmVsO1xuICAgICAgYmFyLmFyaWFMYWJlbCA9IGZvcm1hdHRlZExhYmVsICsgJyAnICsgdmFsdWUudG9Mb2NhbGVTdHJpbmcoKTtcbiAgICAgIGlmICh0aGlzLnNlcmllc05hbWUpIHtcbiAgICAgICAgdG9vbHRpcExhYmVsID0gYCR7dGhpcy5zZXJpZXNOYW1lfSDigKIgJHtmb3JtYXR0ZWRMYWJlbH1gO1xuICAgICAgICBiYXIuZGF0YS5zZXJpZXMgPSB0aGlzLnNlcmllc05hbWU7XG4gICAgICAgIGJhci5hcmlhTGFiZWwgPSB0aGlzLnNlcmllc05hbWUgKyAnICcgKyBiYXIuYXJpYUxhYmVsO1xuICAgICAgfVxuXG4gICAgICBiYXIudG9vbHRpcFRleHQgPSB0aGlzLnRvb2x0aXBEaXNhYmxlZFxuICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICA6IGBcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLWxhYmVsXCI+JHtlc2NhcGVMYWJlbCh0b29sdGlwTGFiZWwpfTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLXZhbFwiPiR7b2xkVmFsdWUudG9Mb2NhbGVTdHJpbmcoKX08L3NwYW4+XG4gICAgICBgO1xuXG4gICAgICByZXR1cm4gYmFyO1xuICAgIH0pO1xuXG4gICAgdGhpcy51cGRhdGVEYXRhTGFiZWxzKCk7XG4gIH1cblxuICB1cGRhdGVEYXRhTGFiZWxzKCkge1xuICAgIGlmICh0aGlzLnR5cGUgPT09ICdzdGFja2VkJykge1xuICAgICAgdGhpcy5iYXJzRm9yRGF0YUxhYmVscyA9IFtdO1xuICAgICAgY29uc3Qgc2VjdGlvbjogYW55ID0ge307XG4gICAgICBzZWN0aW9uLnNlcmllcyA9IHRoaXMuc2VyaWVzTmFtZTtcbiAgICAgIGNvbnN0IHRvdGFsUG9zaXRpdmUgPSB0aGlzLnNlcmllcy5tYXAoZCA9PiBkLnZhbHVlKS5yZWR1Y2UoKHN1bSwgZCkgPT4gKGQgPiAwID8gc3VtICsgZCA6IHN1bSksIDApO1xuICAgICAgY29uc3QgdG90YWxOZWdhdGl2ZSA9IHRoaXMuc2VyaWVzLm1hcChkID0+IGQudmFsdWUpLnJlZHVjZSgoc3VtLCBkKSA9PiAoZCA8IDAgPyBzdW0gKyBkIDogc3VtKSwgMCk7XG4gICAgICBzZWN0aW9uLnRvdGFsID0gdG90YWxQb3NpdGl2ZSArIHRvdGFsTmVnYXRpdmU7XG4gICAgICBzZWN0aW9uLnggPSAwO1xuICAgICAgc2VjdGlvbi55ID0gMDtcbiAgICAgIGlmIChzZWN0aW9uLnRvdGFsID4gMCkge1xuICAgICAgICBzZWN0aW9uLmhlaWdodCA9IHRoaXMueVNjYWxlKHRvdGFsUG9zaXRpdmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VjdGlvbi5oZWlnaHQgPSB0aGlzLnlTY2FsZSh0b3RhbE5lZ2F0aXZlKTtcbiAgICAgIH1cbiAgICAgIHNlY3Rpb24ud2lkdGggPSB0aGlzLnhTY2FsZS5iYW5kd2lkdGgoKTtcbiAgICAgIHRoaXMuYmFyc0ZvckRhdGFMYWJlbHMucHVzaChzZWN0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5iYXJzRm9yRGF0YUxhYmVscyA9IHRoaXMuc2VyaWVzLm1hcChkID0+IHtcbiAgICAgICAgY29uc3Qgc2VjdGlvbjogYW55ID0ge307XG4gICAgICAgIHNlY3Rpb24uc2VyaWVzID0gdGhpcy5zZXJpZXNOYW1lID8gdGhpcy5zZXJpZXNOYW1lIDogZC5sYWJlbDtcbiAgICAgICAgc2VjdGlvbi50b3RhbCA9IGQudmFsdWU7XG4gICAgICAgIHNlY3Rpb24ueCA9IHRoaXMueFNjYWxlKGQubGFiZWwpO1xuICAgICAgICBzZWN0aW9uLnkgPSB0aGlzLnlTY2FsZSgwKTtcbiAgICAgICAgc2VjdGlvbi5oZWlnaHQgPSB0aGlzLnlTY2FsZShzZWN0aW9uLnRvdGFsKSAtIHRoaXMueVNjYWxlKDApO1xuICAgICAgICBzZWN0aW9uLndpZHRoID0gdGhpcy54U2NhbGUuYmFuZHdpZHRoKCk7XG4gICAgICAgIHJldHVybiBzZWN0aW9uO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlVG9vbHRpcFNldHRpbmdzKCkge1xuICAgIHRoaXMudG9vbHRpcFBsYWNlbWVudCA9IHRoaXMudG9vbHRpcERpc2FibGVkID8gdW5kZWZpbmVkIDogJ3RvcCc7XG4gICAgdGhpcy50b29sdGlwVHlwZSA9IHRoaXMudG9vbHRpcERpc2FibGVkID8gdW5kZWZpbmVkIDogJ3Rvb2x0aXAnO1xuICB9XG5cbiAgaXNBY3RpdmUoZW50cnkpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlRW50cmllcykgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmFjdGl2ZUVudHJpZXMuZmluZChkID0+IHtcbiAgICAgIHJldHVybiBlbnRyeS5uYW1lID09PSBkLm5hbWUgJiYgZW50cnkuc2VyaWVzID09PSBkLnNlcmllcztcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlbSAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgb25DbGljayhkYXRhOiBEYXRhSXRlbSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XG4gIH1cblxuICBnZXRMYWJlbChkYXRhSXRlbSk6IHN0cmluZyB7XG4gICAgaWYgKGRhdGFJdGVtLmxhYmVsKSB7XG4gICAgICByZXR1cm4gZGF0YUl0ZW0ubGFiZWw7XG4gICAgfVxuICAgIHJldHVybiBkYXRhSXRlbS5uYW1lO1xuICB9XG5cbiAgdHJhY2tCeShpbmRleCwgYmFyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYmFyLmxhYmVsO1xuICB9XG5cbiAgdHJhY2tEYXRhTGFiZWxCeShpbmRleCwgYmFyTGFiZWwpIHtcbiAgICByZXR1cm4gaW5kZXggKyAnIycgKyBiYXJMYWJlbC5zZXJpZXMgKyAnIycgKyBiYXJMYWJlbC50b3RhbDtcbiAgfVxufVxuIl19