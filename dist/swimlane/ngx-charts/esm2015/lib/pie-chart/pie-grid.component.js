import { __decorate } from "tslib";
import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, ContentChild, Output, EventEmitter } from '@angular/core';
import { min } from 'd3-array';
import { format } from 'd3-format';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
import { trimLabel } from '../common/trim-label.helper';
import { gridLayout } from '../common/grid-layout.helper';
import { formatLabel } from '../common/label.helper';
let PieGridComponent = class PieGridComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.tooltipDisabled = false;
        this.label = 'Total';
        this.minWidth = 150;
        this.activeEntries = [];
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.margin = [20, 20, 20, 20];
    }
    update() {
        super.update();
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin
        });
        this.formatDates();
        this.domain = this.getDomain();
        this.data = gridLayout(this.dims, this.results, this.minWidth, this.designatedTotal);
        this.transform = `translate(${this.margin[3]} , ${this.margin[0]})`;
        this.series = this.getSeries();
        this.setColors();
        this.tooltipText = this.tooltipText || this.defaultTooltipText;
    }
    defaultTooltipText({ data }) {
        const label = trimLabel(formatLabel(data.name));
        const val = data.value.toLocaleString();
        return `
      <span class="tooltip-label">${label}</span>
      <span class="tooltip-val">${val}</span>
    `;
    }
    getDomain() {
        return this.results.map(d => d.label);
    }
    getSeries() {
        const total = this.designatedTotal ? this.designatedTotal : this.getTotal();
        return this.data.map(d => {
            const baselineLabelHeight = 20;
            const padding = 10;
            const name = d.data.name;
            const label = formatLabel(name);
            const value = d.data.value;
            const radius = min([d.width - padding, d.height - baselineLabelHeight]) / 2 - 5;
            const innerRadius = radius * 0.9;
            let count = 0;
            const colors = () => {
                count += 1;
                if (count === 1) {
                    return 'rgba(100,100,100,0.3)';
                }
                else {
                    return this.colorScale.getColor(label);
                }
            };
            const xPos = d.x + (d.width - padding) / 2;
            const yPos = d.y + (d.height - baselineLabelHeight) / 2;
            return {
                transform: `translate(${xPos}, ${yPos})`,
                colors,
                innerRadius,
                outerRadius: radius,
                name,
                label: trimLabel(label),
                total: value,
                value,
                percent: format('.1%')(d.data.percent),
                data: [
                    d,
                    {
                        data: {
                            other: true,
                            value: total - value,
                            name: d.data.name
                        }
                    }
                ]
            };
        });
    }
    getTotal() {
        return this.results.map(d => d.value).reduce((sum, d) => sum + d, 0);
    }
    onClick(data) {
        this.select.emit(data);
    }
    setColors() {
        this.colorScale = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
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
], PieGridComponent.prototype, "designatedTotal", void 0);
__decorate([
    Input()
], PieGridComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input()
], PieGridComponent.prototype, "tooltipText", void 0);
__decorate([
    Input()
], PieGridComponent.prototype, "label", void 0);
__decorate([
    Input()
], PieGridComponent.prototype, "minWidth", void 0);
__decorate([
    Input()
], PieGridComponent.prototype, "activeEntries", void 0);
__decorate([
    Output()
], PieGridComponent.prototype, "activate", void 0);
__decorate([
    Output()
], PieGridComponent.prototype, "deactivate", void 0);
__decorate([
    ContentChild('tooltipTemplate')
], PieGridComponent.prototype, "tooltipTemplate", void 0);
PieGridComponent = __decorate([
    Component({
        selector: 'ngx-charts-pie-grid',
        template: `
    <ngx-charts-chart [view]="[width, height]" [showLegend]="false" [animations]="animations">
      <svg:g [attr.transform]="transform" class="pie-grid chart">
        <svg:g *ngFor="let series of series" class="pie-grid-item" [attr.transform]="series.transform">
          <svg:g
            ngx-charts-pie-grid-series
            [colors]="series.colors"
            [data]="series.data"
            [innerRadius]="series.innerRadius"
            [outerRadius]="series.outerRadius"
            [animations]="animations"
            (select)="onClick($event)"
            ngx-tooltip
            [tooltipDisabled]="tooltipDisabled"
            [tooltipPlacement]="'top'"
            [tooltipType]="'tooltip'"
            [tooltipTitle]="tooltipTemplate ? undefined : tooltipText({ data: series })"
            [tooltipTemplate]="tooltipTemplate"
            [tooltipContext]="series.data[0].data"
            (activate)="onActivate($event)"
            (deactivate)="onDeactivate($event)"
          />
          <svg:text
            *ngIf="animations"
            class="label percent-label"
            dy="-0.5em"
            x="0"
            y="5"
            ngx-charts-count-up
            [countTo]="series.percent"
            [countSuffix]="'%'"
            text-anchor="middle"
          ></svg:text>
          <svg:text *ngIf="!animations" class="label percent-label" dy="-0.5em" x="0" y="5" text-anchor="middle">
            {{ series.percent.toLocaleString() }}
          </svg:text>
          <svg:text class="label" dy="0.5em" x="0" y="5" text-anchor="middle">
            {{ series.label }}
          </svg:text>
          <svg:text
            *ngIf="animations"
            class="label"
            dy="1.23em"
            x="0"
            [attr.y]="series.outerRadius"
            text-anchor="middle"
            ngx-charts-count-up
            [countTo]="series.total"
            [countPrefix]="label + ': '"
          ></svg:text>
          <svg:text
            *ngIf="!animations"
            class="label"
            dy="1.23em"
            x="0"
            [attr.y]="series.outerRadius"
            text-anchor="middle"
          >
            {{ label }}: {{ series.total.toLocaleString() }}
          </svg:text>
        </svg:g>
      </svg:g>
    </ngx-charts-chart>
  `,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".pie-grid .arc1{opacity:.4}.pie-grid .percent-label{font-size:16px;font-weight:400}"]
    })
], PieGridComponent);
export { PieGridComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWdyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvcGllLWNoYXJ0L3BpZS1ncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2QixZQUFZLEVBRVosTUFBTSxFQUNOLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFbkMsT0FBTyxFQUFFLHVCQUF1QixFQUFrQixNQUFNLGtDQUFrQyxDQUFDO0FBQzNGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQXlFckQsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBaUIsU0FBUSxrQkFBa0I7SUFBeEQ7O1FBRVcsb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFFakMsVUFBSyxHQUFXLE9BQU8sQ0FBQztRQUN4QixhQUFRLEdBQVcsR0FBRyxDQUFDO1FBQ3ZCLGtCQUFhLEdBQVUsRUFBRSxDQUFDO1FBRXpCLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqRCxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFRN0QsV0FBTSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFB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QyxpQkFBaUIsQ0FBQzt5REFBbUM7QUFuQnhELGdCQUFnQjtJQXRFNUIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStEVDtRQUVELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1FBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztLQUNoRCxDQUFDO0dBQ1csZ0JBQWdCLENBMko1QjtTQTNKWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBWaWV3RW5jYXBzdWxhdGlvbixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDb250ZW50Q2hpbGQsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBtaW4gfSBmcm9tICdkMy1hcnJheSc7XHJcbmltcG9ydCB7IGZvcm1hdCB9IGZyb20gJ2QzLWZvcm1hdCc7XHJcblxyXG5pbXBvcnQgeyBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucywgVmlld0RpbWVuc2lvbnMgfSBmcm9tICcuLi9jb21tb24vdmlldy1kaW1lbnNpb25zLmhlbHBlcic7XHJcbmltcG9ydCB7IENvbG9ySGVscGVyIH0gZnJvbSAnLi4vY29tbW9uL2NvbG9yLmhlbHBlcic7XHJcbmltcG9ydCB7IEJhc2VDaGFydENvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9iYXNlLWNoYXJ0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IHRyaW1MYWJlbCB9IGZyb20gJy4uL2NvbW1vbi90cmltLWxhYmVsLmhlbHBlcic7XHJcbmltcG9ydCB7IGdyaWRMYXlvdXQgfSBmcm9tICcuLi9jb21tb24vZ3JpZC1sYXlvdXQuaGVscGVyJztcclxuaW1wb3J0IHsgZm9ybWF0TGFiZWwgfSBmcm9tICcuLi9jb21tb24vbGFiZWwuaGVscGVyJztcclxuaW1wb3J0IHsgRGF0YUl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvY2hhcnQtZGF0YS5tb2RlbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC1jaGFydHMtcGllLWdyaWQnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8bmd4LWNoYXJ0cy1jaGFydCBbdmlld109XCJbd2lkdGgsIGhlaWdodF1cIiBbc2hvd0xlZ2VuZF09XCJmYWxzZVwiIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIj5cclxuICAgICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIiBjbGFzcz1cInBpZS1ncmlkIGNoYXJ0XCI+XHJcbiAgICAgICAgPHN2ZzpnICpuZ0Zvcj1cImxldCBzZXJpZXMgb2Ygc2VyaWVzXCIgY2xhc3M9XCJwaWUtZ3JpZC1pdGVtXCIgW2F0dHIudHJhbnNmb3JtXT1cInNlcmllcy50cmFuc2Zvcm1cIj5cclxuICAgICAgICAgIDxzdmc6Z1xyXG4gICAgICAgICAgICBuZ3gtY2hhcnRzLXBpZS1ncmlkLXNlcmllc1xyXG4gICAgICAgICAgICBbY29sb3JzXT1cInNlcmllcy5jb2xvcnNcIlxyXG4gICAgICAgICAgICBbZGF0YV09XCJzZXJpZXMuZGF0YVwiXHJcbiAgICAgICAgICAgIFtpbm5lclJhZGl1c109XCJzZXJpZXMuaW5uZXJSYWRpdXNcIlxyXG4gICAgICAgICAgICBbb3V0ZXJSYWRpdXNdPVwic2VyaWVzLm91dGVyUmFkaXVzXCJcclxuICAgICAgICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgICAgICAgIChzZWxlY3QpPVwib25DbGljaygkZXZlbnQpXCJcclxuICAgICAgICAgICAgbmd4LXRvb2x0aXBcclxuICAgICAgICAgICAgW3Rvb2x0aXBEaXNhYmxlZF09XCJ0b29sdGlwRGlzYWJsZWRcIlxyXG4gICAgICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCIndG9wJ1wiXHJcbiAgICAgICAgICAgIFt0b29sdGlwVHlwZV09XCIndG9vbHRpcCdcIlxyXG4gICAgICAgICAgICBbdG9vbHRpcFRpdGxlXT1cInRvb2x0aXBUZW1wbGF0ZSA/IHVuZGVmaW5lZCA6IHRvb2x0aXBUZXh0KHsgZGF0YTogc2VyaWVzIH0pXCJcclxuICAgICAgICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxyXG4gICAgICAgICAgICBbdG9vbHRpcENvbnRleHRdPVwic2VyaWVzLmRhdGFbMF0uZGF0YVwiXHJcbiAgICAgICAgICAgIChhY3RpdmF0ZSk9XCJvbkFjdGl2YXRlKCRldmVudClcIlxyXG4gICAgICAgICAgICAoZGVhY3RpdmF0ZSk9XCJvbkRlYWN0aXZhdGUoJGV2ZW50KVwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPHN2Zzp0ZXh0XHJcbiAgICAgICAgICAgICpuZ0lmPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgICAgICAgIGNsYXNzPVwibGFiZWwgcGVyY2VudC1sYWJlbFwiXHJcbiAgICAgICAgICAgIGR5PVwiLTAuNWVtXCJcclxuICAgICAgICAgICAgeD1cIjBcIlxyXG4gICAgICAgICAgICB5PVwiNVwiXHJcbiAgICAgICAgICAgIG5neC1jaGFydHMtY291bnQtdXBcclxuICAgICAgICAgICAgW2NvdW50VG9dPVwic2VyaWVzLnBlcmNlbnRcIlxyXG4gICAgICAgICAgICBbY291bnRTdWZmaXhdPVwiJyUnXCJcclxuICAgICAgICAgICAgdGV4dC1hbmNob3I9XCJtaWRkbGVcIlxyXG4gICAgICAgICAgPjwvc3ZnOnRleHQ+XHJcbiAgICAgICAgICA8c3ZnOnRleHQgKm5nSWY9XCIhYW5pbWF0aW9uc1wiIGNsYXNzPVwibGFiZWwgcGVyY2VudC1sYWJlbFwiIGR5PVwiLTAuNWVtXCIgeD1cIjBcIiB5PVwiNVwiIHRleHQtYW5jaG9yPVwibWlkZGxlXCI+XHJcbiAgICAgICAgICAgIHt7IHNlcmllcy5wZXJjZW50LnRvTG9jYWxlU3RyaW5nKCkgfX1cclxuICAgICAgICAgIDwvc3ZnOnRleHQ+XHJcbiAgICAgICAgICA8c3ZnOnRleHQgY2xhc3M9XCJsYWJlbFwiIGR5PVwiMC41ZW1cIiB4PVwiMFwiIHk9XCI1XCIgdGV4dC1hbmNob3I9XCJtaWRkbGVcIj5cclxuICAgICAgICAgICAge3sgc2VyaWVzLmxhYmVsIH19XHJcbiAgICAgICAgICA8L3N2Zzp0ZXh0PlxyXG4gICAgICAgICAgPHN2Zzp0ZXh0XHJcbiAgICAgICAgICAgICpuZ0lmPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgICAgICAgIGNsYXNzPVwibGFiZWxcIlxyXG4gICAgICAgICAgICBkeT1cIjEuMjNlbVwiXHJcbiAgICAgICAgICAgIHg9XCIwXCJcclxuICAgICAgICAgICAgW2F0dHIueV09XCJzZXJpZXMub3V0ZXJSYWRpdXNcIlxyXG4gICAgICAgICAgICB0ZXh0LWFuY2hvcj1cIm1pZGRsZVwiXHJcbiAgICAgICAgICAgIG5neC1jaGFydHMtY291bnQtdXBcclxuICAgICAgICAgICAgW2NvdW50VG9dPVwic2VyaWVzLnRvdGFsXCJcclxuICAgICAgICAgICAgW2NvdW50UHJlZml4XT1cImxhYmVsICsgJzogJ1wiXHJcbiAgICAgICAgICA+PC9zdmc6dGV4dD5cclxuICAgICAgICAgIDxzdmc6dGV4dFxyXG4gICAgICAgICAgICAqbmdJZj1cIiFhbmltYXRpb25zXCJcclxuICAgICAgICAgICAgY2xhc3M9XCJsYWJlbFwiXHJcbiAgICAgICAgICAgIGR5PVwiMS4yM2VtXCJcclxuICAgICAgICAgICAgeD1cIjBcIlxyXG4gICAgICAgICAgICBbYXR0ci55XT1cInNlcmllcy5vdXRlclJhZGl1c1wiXHJcbiAgICAgICAgICAgIHRleHQtYW5jaG9yPVwibWlkZGxlXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge3sgbGFiZWwgfX06IHt7IHNlcmllcy50b3RhbC50b0xvY2FsZVN0cmluZygpIH19XHJcbiAgICAgICAgICA8L3N2Zzp0ZXh0PlxyXG4gICAgICAgIDwvc3ZnOmc+XHJcbiAgICAgIDwvc3ZnOmc+XHJcbiAgICA8L25neC1jaGFydHMtY2hhcnQ+XHJcbiAgYCxcclxuICBzdHlsZVVybHM6IFsnLi4vY29tbW9uL2Jhc2UtY2hhcnQuY29tcG9uZW50LnNjc3MnLCAnLi9waWUtZ3JpZC5jb21wb25lbnQuc2NzcyddLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFBpZUdyaWRDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ2hhcnRDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpIGRlc2lnbmF0ZWRUb3RhbDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBUZXh0OiAobzogYW55KSA9PiBhbnk7XHJcbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZyA9ICdUb3RhbCc7XHJcbiAgQElucHV0KCkgbWluV2lkdGg6IG51bWJlciA9IDE1MDtcclxuICBASW5wdXQoKSBhY3RpdmVFbnRyaWVzOiBhbnlbXSA9IFtdO1xyXG5cclxuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgZGltczogVmlld0RpbWVuc2lvbnM7XHJcbiAgZGF0YTogYW55W107XHJcbiAgdHJhbnNmb3JtOiBzdHJpbmc7XHJcbiAgc2VyaWVzOiBhbnlbXTtcclxuICBkb21haW46IGFueVtdO1xyXG4gIGNvbG9yU2NhbGU6IENvbG9ySGVscGVyO1xyXG4gIG1hcmdpbiA9IFsyMCwgMjAsIDIwLCAyMF07XHJcblxyXG4gIEBDb250ZW50Q2hpbGQoJ3Rvb2x0aXBUZW1wbGF0ZScpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgc3VwZXIudXBkYXRlKCk7XHJcblxyXG4gICAgdGhpcy5kaW1zID0gY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMoe1xyXG4gICAgICB3aWR0aDogdGhpcy53aWR0aCxcclxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcclxuICAgICAgbWFyZ2luczogdGhpcy5tYXJnaW5cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZm9ybWF0RGF0ZXMoKTtcclxuXHJcbiAgICB0aGlzLmRvbWFpbiA9IHRoaXMuZ2V0RG9tYWluKCk7XHJcblxyXG4gICAgdGhpcy5kYXRhID0gZ3JpZExheW91dCh0aGlzLmRpbXMsIHRoaXMucmVzdWx0cywgdGhpcy5taW5XaWR0aCwgdGhpcy5kZXNpZ25hdGVkVG90YWwpO1xyXG4gICAgdGhpcy50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7dGhpcy5tYXJnaW5bM119ICwgJHt0aGlzLm1hcmdpblswXX0pYDtcclxuXHJcbiAgICB0aGlzLnNlcmllcyA9IHRoaXMuZ2V0U2VyaWVzKCk7XHJcbiAgICB0aGlzLnNldENvbG9ycygpO1xyXG5cclxuICAgIHRoaXMudG9vbHRpcFRleHQgPSB0aGlzLnRvb2x0aXBUZXh0IHx8IHRoaXMuZGVmYXVsdFRvb2x0aXBUZXh0O1xyXG4gIH1cclxuXHJcbiAgZGVmYXVsdFRvb2x0aXBUZXh0KHsgZGF0YSB9KTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGxhYmVsID0gdHJpbUxhYmVsKGZvcm1hdExhYmVsKGRhdGEubmFtZSkpO1xyXG4gICAgY29uc3QgdmFsID0gZGF0YS52YWx1ZS50b0xvY2FsZVN0cmluZygpO1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLWxhYmVsXCI+JHtsYWJlbH08L3NwYW4+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC12YWxcIj4ke3ZhbH08L3NwYW4+XHJcbiAgICBgO1xyXG4gIH1cclxuXHJcbiAgZ2V0RG9tYWluKCk6IGFueVtdIHtcclxuICAgIHJldHVybiB0aGlzLnJlc3VsdHMubWFwKGQgPT4gZC5sYWJlbCk7XHJcbiAgfVxyXG5cclxuICBnZXRTZXJpZXMoKTogYW55W10ge1xyXG4gICAgY29uc3QgdG90YWwgPSB0aGlzLmRlc2lnbmF0ZWRUb3RhbCA/IHRoaXMuZGVzaWduYXRlZFRvdGFsIDogdGhpcy5nZXRUb3RhbCgpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmRhdGEubWFwKGQgPT4ge1xyXG4gICAgICBjb25zdCBiYXNlbGluZUxhYmVsSGVpZ2h0ID0gMjA7XHJcbiAgICAgIGNvbnN0IHBhZGRpbmcgPSAxMDtcclxuICAgICAgY29uc3QgbmFtZSA9IGQuZGF0YS5uYW1lO1xyXG4gICAgICBjb25zdCBsYWJlbCA9IGZvcm1hdExhYmVsKG5hbWUpO1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IGQuZGF0YS52YWx1ZTtcclxuICAgICAgY29uc3QgcmFkaXVzID0gbWluKFtkLndpZHRoIC0gcGFkZGluZywgZC5oZWlnaHQgLSBiYXNlbGluZUxhYmVsSGVpZ2h0XSkgLyAyIC0gNTtcclxuICAgICAgY29uc3QgaW5uZXJSYWRpdXMgPSByYWRpdXMgKiAwLjk7XHJcblxyXG4gICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICBjb25zdCBjb2xvcnMgPSAoKSA9PiB7XHJcbiAgICAgICAgY291bnQgKz0gMTtcclxuICAgICAgICBpZiAoY291bnQgPT09IDEpIHtcclxuICAgICAgICAgIHJldHVybiAncmdiYSgxMDAsMTAwLDEwMCwwLjMpJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuY29sb3JTY2FsZS5nZXRDb2xvcihsYWJlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgY29uc3QgeFBvcyA9IGQueCArIChkLndpZHRoIC0gcGFkZGluZykgLyAyO1xyXG4gICAgICBjb25zdCB5UG9zID0gZC55ICsgKGQuaGVpZ2h0IC0gYmFzZWxpbmVMYWJlbEhlaWdodCkgLyAyO1xyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoJHt4UG9zfSwgJHt5UG9zfSlgLFxyXG4gICAgICAgIGNvbG9ycyxcclxuICAgICAgICBpbm5lclJhZGl1cyxcclxuICAgICAgICBvdXRlclJhZGl1czogcmFkaXVzLFxyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgbGFiZWw6IHRyaW1MYWJlbChsYWJlbCksXHJcbiAgICAgICAgdG90YWw6IHZhbHVlLFxyXG4gICAgICAgIHZhbHVlLFxyXG4gICAgICAgIHBlcmNlbnQ6IGZvcm1hdCgnLjElJykoZC5kYXRhLnBlcmNlbnQpLFxyXG4gICAgICAgIGRhdGE6IFtcclxuICAgICAgICAgIGQsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICBvdGhlcjogdHJ1ZSxcclxuICAgICAgICAgICAgICB2YWx1ZTogdG90YWwgLSB2YWx1ZSxcclxuICAgICAgICAgICAgICBuYW1lOiBkLmRhdGEubmFtZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRUb3RhbCgpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMucmVzdWx0cy5tYXAoZCA9PiBkLnZhbHVlKS5yZWR1Y2UoKHN1bSwgZCkgPT4gc3VtICsgZCwgMCk7XHJcbiAgfVxyXG5cclxuICBvbkNsaWNrKGRhdGE6IERhdGFJdGVtKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdC5lbWl0KGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgc2V0Q29sb3JzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jb2xvclNjYWxlID0gbmV3IENvbG9ySGVscGVyKHRoaXMuc2NoZW1lLCAnb3JkaW5hbCcsIHRoaXMuZG9tYWluLCB0aGlzLmN1c3RvbUNvbG9ycyk7XHJcbiAgfVxyXG5cclxuICBvbkFjdGl2YXRlKGl0ZW0sIGZyb21MZWdlbmQgPSBmYWxzZSkge1xyXG4gICAgaXRlbSA9IHRoaXMucmVzdWx0cy5maW5kKGQgPT4ge1xyXG4gICAgICBpZiAoZnJvbUxlZ2VuZCkge1xyXG4gICAgICAgIHJldHVybiBkLmxhYmVsID09PSBpdGVtLm5hbWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGQubmFtZSA9PT0gaXRlbS5uYW1lO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBpZHggPSB0aGlzLmFjdGl2ZUVudHJpZXMuZmluZEluZGV4KGQgPT4ge1xyXG4gICAgICByZXR1cm4gZC5uYW1lID09PSBpdGVtLm5hbWUgJiYgZC52YWx1ZSA9PT0gaXRlbS52YWx1ZSAmJiBkLnNlcmllcyA9PT0gaXRlbS5zZXJpZXM7XHJcbiAgICB9KTtcclxuICAgIGlmIChpZHggPiAtMSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hY3RpdmVFbnRyaWVzID0gW2l0ZW0sIC4uLnRoaXMuYWN0aXZlRW50cmllc107XHJcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQoeyB2YWx1ZTogaXRlbSwgZW50cmllczogdGhpcy5hY3RpdmVFbnRyaWVzIH0pO1xyXG4gIH1cclxuXHJcbiAgb25EZWFjdGl2YXRlKGl0ZW0sIGZyb21MZWdlbmQgPSBmYWxzZSkge1xyXG4gICAgaXRlbSA9IHRoaXMucmVzdWx0cy5maW5kKGQgPT4ge1xyXG4gICAgICBpZiAoZnJvbUxlZ2VuZCkge1xyXG4gICAgICAgIHJldHVybiBkLmxhYmVsID09PSBpdGVtLm5hbWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGQubmFtZSA9PT0gaXRlbS5uYW1lO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBpZHggPSB0aGlzLmFjdGl2ZUVudHJpZXMuZmluZEluZGV4KGQgPT4ge1xyXG4gICAgICByZXR1cm4gZC5uYW1lID09PSBpdGVtLm5hbWUgJiYgZC52YWx1ZSA9PT0gaXRlbS52YWx1ZSAmJiBkLnNlcmllcyA9PT0gaXRlbS5zZXJpZXM7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmFjdGl2ZUVudHJpZXMuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICB0aGlzLmFjdGl2ZUVudHJpZXMgPSBbLi4udGhpcy5hY3RpdmVFbnRyaWVzXTtcclxuXHJcbiAgICB0aGlzLmRlYWN0aXZhdGUuZW1pdCh7IHZhbHVlOiBpdGVtLCBlbnRyaWVzOiB0aGlzLmFjdGl2ZUVudHJpZXMgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==