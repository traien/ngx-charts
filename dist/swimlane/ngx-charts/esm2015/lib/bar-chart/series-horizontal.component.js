import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { formatLabel, escapeLabel } from '../common/label.helper';
import { D0Types } from './series-vertical.component';
let SeriesHorizontal = class SeriesHorizontal {
    constructor() {
        this.barsForDataLabels = [];
        this.type = 'standard';
        this.tooltipDisabled = false;
        this.animations = true;
        this.showDataLabel = false;
        this.noBarWhenZero = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.dataLabelWidthChanged = new EventEmitter();
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.updateTooltipSettings();
        const d0 = {
            [D0Types.positive]: 0,
            [D0Types.negative]: 0
        };
        let d0Type;
        d0Type = D0Types.positive;
        let total;
        if (this.type === 'normalized') {
            total = this.series.map(d => d.value).reduce((sum, d) => sum + d, 0);
        }
        const xScaleMin = Math.max(this.xScale.domain()[0], 0);
        this.bars = this.series.map((d, index) => {
            let value = d.value;
            const label = this.getLabel(d);
            const formattedLabel = formatLabel(label);
            const roundEdges = this.roundEdges;
            d0Type = value > 0 ? D0Types.positive : D0Types.negative;
            const bar = {
                value,
                label,
                roundEdges,
                data: d,
                formattedLabel
            };
            bar.height = this.yScale.bandwidth();
            if (this.type === 'standard') {
                bar.width = Math.abs(this.xScale(value) - this.xScale(xScaleMin));
                if (value < 0) {
                    bar.x = this.xScale(value);
                }
                else {
                    bar.x = this.xScale(xScaleMin);
                }
                bar.y = this.yScale(label);
            }
            else if (this.type === 'stacked') {
                const offset0 = d0[d0Type];
                const offset1 = offset0 + value;
                d0[d0Type] += value;
                bar.width = this.xScale(offset1) - this.xScale(offset0);
                bar.x = this.xScale(offset0);
                bar.y = 0;
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
                bar.width = this.xScale(offset1) - this.xScale(offset0);
                bar.x = this.xScale(offset0);
                bar.y = 0;
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
        <span class="tooltip-val">${value.toLocaleString()}</span>
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
            // if total is positive then we show it on the right, otherwise on the left
            if (section.total > 0) {
                section.width = this.xScale(totalPositive);
            }
            else {
                section.width = this.xScale(totalNegative);
            }
            section.height = this.yScale.bandwidth();
            this.barsForDataLabels.push(section);
        }
        else {
            this.barsForDataLabels = this.series.map(d => {
                const section = {};
                section.series = this.seriesName ? this.seriesName : d.label;
                section.total = d.value;
                section.x = this.xScale(0);
                section.y = this.yScale(d.label);
                section.width = this.xScale(section.total) - this.xScale(0);
                section.height = this.yScale.bandwidth();
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
    click(data) {
        this.select.emit(data);
    }
};
__decorate([
    Input()
], SeriesHorizontal.prototype, "dims", void 0);
__decorate([
    Input()
], SeriesHorizontal.prototype, "type", void 0);
__decorate([
    Input()
], SeriesHorizontal.prototype, "series", void 0);
__decorate([
    Input()
], SeriesHorizontal.prototype, "xScale", void 0);
__decorate([
    Input()
], SeriesHorizontal.prototype, "yScale", void 0);
__decorate([
    Input()
], SeriesHorizontal.prototype, "colors", void 0);
__decorate([
    Input()
], SeriesHorizontal.prototype, "tooltipDisabled", void 0);
__decorate([
    Input()
], SeriesHorizontal.prototype, "gradient", void 0);
__decorate([
    Input()
], SeriesHorizontal.prototype, "activeEntries", void 0);
__decorate([
    Input()
], SeriesHorizontal.prototype, "seriesName", void 0);
__decorate([
    Input()
], SeriesHorizontal.prototype, "tooltipTemplate", void 0);
__decorate([
    Input()
], SeriesHorizontal.prototype, "roundEdges", void 0);
__decorate([
    Input()
], SeriesHorizontal.prototype, "animations", void 0);
__decorate([
    Input()
], SeriesHorizontal.prototype, "showDataLabel", void 0);
__decorate([
    Input()
], SeriesHorizontal.prototype, "dataLabelFormatting", void 0);
__decorate([
    Input()
], SeriesHorizontal.prototype, "noBarWhenZero", void 0);
__decorate([
    Output()
], SeriesHorizontal.prototype, "select", void 0);
__decorate([
    Output()
], SeriesHorizontal.prototype, "activate", void 0);
__decorate([
    Output()
], SeriesHorizontal.prototype, "deactivate", void 0);
__decorate([
    Output()
], SeriesHorizontal.prototype, "dataLabelWidthChanged", void 0);
SeriesHorizontal = __decorate([
    Component({
        selector: 'g[ngx-charts-series-horizontal]',
        template: `
    <svg:g
      ngx-charts-bar
      *ngFor="let bar of bars; trackBy: trackBy"
      [@animationState]="'active'"
      [width]="bar.width"
      [height]="bar.height"
      [x]="bar.x"
      [y]="bar.y"
      [fill]="bar.color"
      [stops]="bar.gradientStops"
      [data]="bar.data"
      [orientation]="'horizontal'"
      [roundEdges]="bar.roundEdges"
      (select)="click($event)"
      [gradient]="gradient"
      [isActive]="isActive(bar.data)"
      [ariaLabel]="bar.ariaLabel"
      [animations]="animations"
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
        [orientation]="'horizontal'"
        (dimensionsChanged)="dataLabelWidthChanged.emit({ size: $event, index: i })"
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
], SeriesHorizontal);
export { SeriesHorizontal };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWVzLWhvcml6b250YWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvYmFyLWNoYXJ0L3Nlcmllcy1ob3Jpem9udGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFHWix1QkFBdUIsRUFFeEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBOER0RCxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQUE3QjtRQUlFLHNCQUFpQixHQUFrRyxFQUFFLENBQUM7UUFHN0csU0FBSSxHQUFHLFVBQVUsQ0FBQztRQUtsQixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQU1qQyxlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBRS9CLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBRTdCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hDLDBCQUFxQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUErS3ZELENBQUM7SUExS0MsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FB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QUNwQyxDQUFDO2FBQ0gsQ0FBQztTQUNIO0tBQ0YsQ0FBQztHQUNXLGdCQUFnQixDQXlNNUI7U0F6TVksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPbkNoYW5nZXMsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBUZW1wbGF0ZVJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyB0cmlnZ2VyLCBzdHlsZSwgYW5pbWF0ZSwgdHJhbnNpdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBmb3JtYXRMYWJlbCwgZXNjYXBlTGFiZWwgfSBmcm9tICcuLi9jb21tb24vbGFiZWwuaGVscGVyJztcclxuaW1wb3J0IHsgRDBUeXBlcyB9IGZyb20gJy4vc2VyaWVzLXZlcnRpY2FsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERhdGFJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL2NoYXJ0LWRhdGEubW9kZWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtc2VyaWVzLWhvcml6b250YWxdJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHN2ZzpnXHJcbiAgICAgIG5neC1jaGFydHMtYmFyXHJcbiAgICAgICpuZ0Zvcj1cImxldCBiYXIgb2YgYmFyczsgdHJhY2tCeTogdHJhY2tCeVwiXHJcbiAgICAgIFtAYW5pbWF0aW9uU3RhdGVdPVwiJ2FjdGl2ZSdcIlxyXG4gICAgICBbd2lkdGhdPVwiYmFyLndpZHRoXCJcclxuICAgICAgW2hlaWdodF09XCJiYXIuaGVpZ2h0XCJcclxuICAgICAgW3hdPVwiYmFyLnhcIlxyXG4gICAgICBbeV09XCJiYXIueVwiXHJcbiAgICAgIFtmaWxsXT1cImJhci5jb2xvclwiXHJcbiAgICAgIFtzdG9wc109XCJiYXIuZ3JhZGllbnRTdG9wc1wiXHJcbiAgICAgIFtkYXRhXT1cImJhci5kYXRhXCJcclxuICAgICAgW29yaWVudGF0aW9uXT1cIidob3Jpem9udGFsJ1wiXHJcbiAgICAgIFtyb3VuZEVkZ2VzXT1cImJhci5yb3VuZEVkZ2VzXCJcclxuICAgICAgKHNlbGVjdCk9XCJjbGljaygkZXZlbnQpXCJcclxuICAgICAgW2dyYWRpZW50XT1cImdyYWRpZW50XCJcclxuICAgICAgW2lzQWN0aXZlXT1cImlzQWN0aXZlKGJhci5kYXRhKVwiXHJcbiAgICAgIFthcmlhTGFiZWxdPVwiYmFyLmFyaWFMYWJlbFwiXHJcbiAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxyXG4gICAgICAoYWN0aXZhdGUpPVwiYWN0aXZhdGUuZW1pdCgkZXZlbnQpXCJcclxuICAgICAgKGRlYWN0aXZhdGUpPVwiZGVhY3RpdmF0ZS5lbWl0KCRldmVudClcIlxyXG4gICAgICBuZ3gtdG9vbHRpcFxyXG4gICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXHJcbiAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cInRvb2x0aXBQbGFjZW1lbnRcIlxyXG4gICAgICBbdG9vbHRpcFR5cGVdPVwidG9vbHRpcFR5cGVcIlxyXG4gICAgICBbdG9vbHRpcFRpdGxlXT1cInRvb2x0aXBUZW1wbGF0ZSA/IHVuZGVmaW5lZCA6IGJhci50b29sdGlwVGV4dFwiXHJcbiAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcclxuICAgICAgW3Rvb2x0aXBDb250ZXh0XT1cImJhci5kYXRhXCJcclxuICAgICAgW25vQmFyV2hlblplcm9dPVwibm9CYXJXaGVuWmVyb1wiXHJcbiAgICA+PC9zdmc6Zz5cclxuICAgIDxzdmc6ZyAqbmdJZj1cInNob3dEYXRhTGFiZWxcIj5cclxuICAgICAgPHN2ZzpnXHJcbiAgICAgICAgbmd4LWNoYXJ0cy1iYXItbGFiZWxcclxuICAgICAgICAqbmdGb3I9XCJsZXQgYiBvZiBiYXJzRm9yRGF0YUxhYmVsczsgbGV0IGkgPSBpbmRleDsgdHJhY2tCeTogdHJhY2tEYXRhTGFiZWxCeVwiXHJcbiAgICAgICAgW2JhclhdPVwiYi54XCJcclxuICAgICAgICBbYmFyWV09XCJiLnlcIlxyXG4gICAgICAgIFtiYXJXaWR0aF09XCJiLndpZHRoXCJcclxuICAgICAgICBbYmFySGVpZ2h0XT1cImIuaGVpZ2h0XCJcclxuICAgICAgICBbdmFsdWVdPVwiYi50b3RhbFwiXHJcbiAgICAgICAgW3ZhbHVlRm9ybWF0dGluZ109XCJkYXRhTGFiZWxGb3JtYXR0aW5nXCJcclxuICAgICAgICBbb3JpZW50YXRpb25dPVwiJ2hvcml6b250YWwnXCJcclxuICAgICAgICAoZGltZW5zaW9uc0NoYW5nZWQpPVwiZGF0YUxhYmVsV2lkdGhDaGFuZ2VkLmVtaXQoeyBzaXplOiAkZXZlbnQsIGluZGV4OiBpIH0pXCJcclxuICAgICAgLz5cclxuICAgIDwvc3ZnOmc+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBhbmltYXRpb25zOiBbXHJcbiAgICB0cmlnZ2VyKCdhbmltYXRpb25TdGF0ZScsIFtcclxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xyXG4gICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgICB9KSxcclxuICAgICAgICBhbmltYXRlKDUwMCwgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKVxyXG4gICAgICBdKVxyXG4gICAgXSlcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZXJpZXNIb3Jpem9udGFsIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBiYXJzOiBhbnk7XHJcbiAgeDogYW55O1xyXG4gIHk6IGFueTtcclxuICBiYXJzRm9yRGF0YUxhYmVsczogQXJyYXk8eyB4OiBudW1iZXI7IHk6IG51bWJlcjsgd2lkdGg6IG51bWJlcjsgaGVpZ2h0OiBudW1iZXI7IHRvdGFsOiBudW1iZXI7IHNlcmllczogc3RyaW5nIH0+ID0gW107XHJcblxyXG4gIEBJbnB1dCgpIGRpbXM7XHJcbiAgQElucHV0KCkgdHlwZSA9ICdzdGFuZGFyZCc7XHJcbiAgQElucHV0KCkgc2VyaWVzO1xyXG4gIEBJbnB1dCgpIHhTY2FsZTtcclxuICBASW5wdXQoKSB5U2NhbGU7XHJcbiAgQElucHV0KCkgY29sb3JzO1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGdyYWRpZW50OiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGFjdGl2ZUVudHJpZXM6IGFueVtdO1xyXG4gIEBJbnB1dCgpIHNlcmllc05hbWU6IHN0cmluZztcclxuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgQElucHV0KCkgcm91bmRFZGdlczogYm9vbGVhbjtcclxuICBASW5wdXQoKSBhbmltYXRpb25zOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSBzaG93RGF0YUxhYmVsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZGF0YUxhYmVsRm9ybWF0dGluZzogYW55O1xyXG4gIEBJbnB1dCgpIG5vQmFyV2hlblplcm86IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZGF0YUxhYmVsV2lkdGhDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICB0b29sdGlwUGxhY2VtZW50OiBzdHJpbmc7XHJcbiAgdG9vbHRpcFR5cGU6IHN0cmluZztcclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMudXBkYXRlVG9vbHRpcFNldHRpbmdzKCk7XHJcbiAgICBjb25zdCBkMCA9IHtcclxuICAgICAgW0QwVHlwZXMucG9zaXRpdmVdOiAwLFxyXG4gICAgICBbRDBUeXBlcy5uZWdhdGl2ZV06IDBcclxuICAgIH07XHJcbiAgICBsZXQgZDBUeXBlOiBEMFR5cGVzO1xyXG4gICAgZDBUeXBlID0gRDBUeXBlcy5wb3NpdGl2ZTtcclxuICAgIGxldCB0b3RhbDtcclxuICAgIGlmICh0aGlzLnR5cGUgPT09ICdub3JtYWxpemVkJykge1xyXG4gICAgICB0b3RhbCA9IHRoaXMuc2VyaWVzLm1hcChkID0+IGQudmFsdWUpLnJlZHVjZSgoc3VtLCBkKSA9PiBzdW0gKyBkLCAwKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHhTY2FsZU1pbiA9IE1hdGgubWF4KHRoaXMueFNjYWxlLmRvbWFpbigpWzBdLCAwKTtcclxuXHJcbiAgICB0aGlzLmJhcnMgPSB0aGlzLnNlcmllcy5tYXAoKGQsIGluZGV4KSA9PiB7XHJcbiAgICAgIGxldCB2YWx1ZSA9IGQudmFsdWU7XHJcbiAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5nZXRMYWJlbChkKTtcclxuICAgICAgY29uc3QgZm9ybWF0dGVkTGFiZWwgPSBmb3JtYXRMYWJlbChsYWJlbCk7XHJcbiAgICAgIGNvbnN0IHJvdW5kRWRnZXMgPSB0aGlzLnJvdW5kRWRnZXM7XHJcbiAgICAgIGQwVHlwZSA9IHZhbHVlID4gMCA/IEQwVHlwZXMucG9zaXRpdmUgOiBEMFR5cGVzLm5lZ2F0aXZlO1xyXG5cclxuICAgICAgY29uc3QgYmFyOiBhbnkgPSB7XHJcbiAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgbGFiZWwsXHJcbiAgICAgICAgcm91bmRFZGdlcyxcclxuICAgICAgICBkYXRhOiBkLFxyXG4gICAgICAgIGZvcm1hdHRlZExhYmVsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBiYXIuaGVpZ2h0ID0gdGhpcy55U2NhbGUuYmFuZHdpZHRoKCk7XHJcblxyXG4gICAgICBpZiAodGhpcy50eXBlID09PSAnc3RhbmRhcmQnKSB7XHJcbiAgICAgICAgYmFyLndpZHRoID0gTWF0aC5hYnModGhpcy54U2NhbGUodmFsdWUpIC0gdGhpcy54U2NhbGUoeFNjYWxlTWluKSk7XHJcbiAgICAgICAgaWYgKHZhbHVlIDwgMCkge1xyXG4gICAgICAgICAgYmFyLnggPSB0aGlzLnhTY2FsZSh2YWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGJhci54ID0gdGhpcy54U2NhbGUoeFNjYWxlTWluKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYmFyLnkgPSB0aGlzLnlTY2FsZShsYWJlbCk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSAnc3RhY2tlZCcpIHtcclxuICAgICAgICBjb25zdCBvZmZzZXQwID0gZDBbZDBUeXBlXTtcclxuICAgICAgICBjb25zdCBvZmZzZXQxID0gb2Zmc2V0MCArIHZhbHVlO1xyXG4gICAgICAgIGQwW2QwVHlwZV0gKz0gdmFsdWU7XHJcblxyXG4gICAgICAgIGJhci53aWR0aCA9IHRoaXMueFNjYWxlKG9mZnNldDEpIC0gdGhpcy54U2NhbGUob2Zmc2V0MCk7XHJcbiAgICAgICAgYmFyLnggPSB0aGlzLnhTY2FsZShvZmZzZXQwKTtcclxuICAgICAgICBiYXIueSA9IDA7XHJcbiAgICAgICAgYmFyLm9mZnNldDAgPSBvZmZzZXQwO1xyXG4gICAgICAgIGJhci5vZmZzZXQxID0gb2Zmc2V0MTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICdub3JtYWxpemVkJykge1xyXG4gICAgICAgIGxldCBvZmZzZXQwID0gZDBbZDBUeXBlXTtcclxuICAgICAgICBsZXQgb2Zmc2V0MSA9IG9mZnNldDAgKyB2YWx1ZTtcclxuICAgICAgICBkMFtkMFR5cGVdICs9IHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAodG90YWwgPiAwKSB7XHJcbiAgICAgICAgICBvZmZzZXQwID0gKG9mZnNldDAgKiAxMDApIC8gdG90YWw7XHJcbiAgICAgICAgICBvZmZzZXQxID0gKG9mZnNldDEgKiAxMDApIC8gdG90YWw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG9mZnNldDAgPSAwO1xyXG4gICAgICAgICAgb2Zmc2V0MSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBiYXIud2lkdGggPSB0aGlzLnhTY2FsZShvZmZzZXQxKSAtIHRoaXMueFNjYWxlKG9mZnNldDApO1xyXG4gICAgICAgIGJhci54ID0gdGhpcy54U2NhbGUob2Zmc2V0MCk7XHJcbiAgICAgICAgYmFyLnkgPSAwO1xyXG4gICAgICAgIGJhci5vZmZzZXQwID0gb2Zmc2V0MDtcclxuICAgICAgICBiYXIub2Zmc2V0MSA9IG9mZnNldDE7XHJcbiAgICAgICAgdmFsdWUgPSAob2Zmc2V0MSAtIG9mZnNldDApLnRvRml4ZWQoMikgKyAnJSc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLmNvbG9ycy5zY2FsZVR5cGUgPT09ICdvcmRpbmFsJykge1xyXG4gICAgICAgIGJhci5jb2xvciA9IHRoaXMuY29sb3JzLmdldENvbG9yKGxhYmVsKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAodGhpcy50eXBlID09PSAnc3RhbmRhcmQnKSB7XHJcbiAgICAgICAgICBiYXIuY29sb3IgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcih2YWx1ZSk7XHJcbiAgICAgICAgICBiYXIuZ3JhZGllbnRTdG9wcyA9IHRoaXMuY29sb3JzLmdldExpbmVhckdyYWRpZW50U3RvcHModmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBiYXIuY29sb3IgPSB0aGlzLmNvbG9ycy5nZXRDb2xvcihiYXIub2Zmc2V0MSk7XHJcbiAgICAgICAgICBiYXIuZ3JhZGllbnRTdG9wcyA9IHRoaXMuY29sb3JzLmdldExpbmVhckdyYWRpZW50U3RvcHMoYmFyLm9mZnNldDEsIGJhci5vZmZzZXQwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCB0b29sdGlwTGFiZWwgPSBmb3JtYXR0ZWRMYWJlbDtcclxuICAgICAgYmFyLmFyaWFMYWJlbCA9IGZvcm1hdHRlZExhYmVsICsgJyAnICsgdmFsdWUudG9Mb2NhbGVTdHJpbmcoKTtcclxuICAgICAgaWYgKHRoaXMuc2VyaWVzTmFtZSkge1xyXG4gICAgICAgIHRvb2x0aXBMYWJlbCA9IGAke3RoaXMuc2VyaWVzTmFtZX0g4oCiICR7Zm9ybWF0dGVkTGFiZWx9YDtcclxuICAgICAgICBiYXIuZGF0YS5zZXJpZXMgPSB0aGlzLnNlcmllc05hbWU7XHJcbiAgICAgICAgYmFyLmFyaWFMYWJlbCA9IHRoaXMuc2VyaWVzTmFtZSArICcgJyArIGJhci5hcmlhTGFiZWw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGJhci50b29sdGlwVGV4dCA9IHRoaXMudG9vbHRpcERpc2FibGVkXHJcbiAgICAgICAgPyB1bmRlZmluZWRcclxuICAgICAgICA6IGBcclxuICAgICAgICA8c3BhbiBjbGFzcz1cInRvb2x0aXAtbGFiZWxcIj4ke2VzY2FwZUxhYmVsKHRvb2x0aXBMYWJlbCl9PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC12YWxcIj4ke3ZhbHVlLnRvTG9jYWxlU3RyaW5nKCl9PC9zcGFuPlxyXG4gICAgICBgO1xyXG5cclxuICAgICAgcmV0dXJuIGJhcjtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudXBkYXRlRGF0YUxhYmVscygpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlRGF0YUxhYmVscygpIHtcclxuICAgIGlmICh0aGlzLnR5cGUgPT09ICdzdGFja2VkJykge1xyXG4gICAgICB0aGlzLmJhcnNGb3JEYXRhTGFiZWxzID0gW107XHJcbiAgICAgIGNvbnN0IHNlY3Rpb246IGFueSA9IHt9O1xyXG4gICAgICBzZWN0aW9uLnNlcmllcyA9IHRoaXMuc2VyaWVzTmFtZTtcclxuICAgICAgY29uc3QgdG90YWxQb3NpdGl2ZSA9IHRoaXMuc2VyaWVzLm1hcChkID0+IGQudmFsdWUpLnJlZHVjZSgoc3VtLCBkKSA9PiAoZCA+IDAgPyBzdW0gKyBkIDogc3VtKSwgMCk7XHJcbiAgICAgIGNvbnN0IHRvdGFsTmVnYXRpdmUgPSB0aGlzLnNlcmllcy5tYXAoZCA9PiBkLnZhbHVlKS5yZWR1Y2UoKHN1bSwgZCkgPT4gKGQgPCAwID8gc3VtICsgZCA6IHN1bSksIDApO1xyXG4gICAgICBzZWN0aW9uLnRvdGFsID0gdG90YWxQb3NpdGl2ZSArIHRvdGFsTmVnYXRpdmU7XHJcbiAgICAgIHNlY3Rpb24ueCA9IDA7XHJcbiAgICAgIHNlY3Rpb24ueSA9IDA7XHJcbiAgICAgIC8vIGlmIHRvdGFsIGlzIHBvc2l0aXZlIHRoZW4gd2Ugc2hvdyBpdCBvbiB0aGUgcmlnaHQsIG90aGVyd2lzZSBvbiB0aGUgbGVmdFxyXG4gICAgICBpZiAoc2VjdGlvbi50b3RhbCA+IDApIHtcclxuICAgICAgICBzZWN0aW9uLndpZHRoID0gdGhpcy54U2NhbGUodG90YWxQb3NpdGl2ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2VjdGlvbi53aWR0aCA9IHRoaXMueFNjYWxlKHRvdGFsTmVnYXRpdmUpO1xyXG4gICAgICB9XHJcbiAgICAgIHNlY3Rpb24uaGVpZ2h0ID0gdGhpcy55U2NhbGUuYmFuZHdpZHRoKCk7XHJcbiAgICAgIHRoaXMuYmFyc0ZvckRhdGFMYWJlbHMucHVzaChzZWN0aW9uKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYmFyc0ZvckRhdGFMYWJlbHMgPSB0aGlzLnNlcmllcy5tYXAoZCA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2VjdGlvbjogYW55ID0ge307XHJcbiAgICAgICAgc2VjdGlvbi5zZXJpZXMgPSB0aGlzLnNlcmllc05hbWUgPyB0aGlzLnNlcmllc05hbWUgOiBkLmxhYmVsO1xyXG4gICAgICAgIHNlY3Rpb24udG90YWwgPSBkLnZhbHVlO1xyXG4gICAgICAgIHNlY3Rpb24ueCA9IHRoaXMueFNjYWxlKDApO1xyXG4gICAgICAgIHNlY3Rpb24ueSA9IHRoaXMueVNjYWxlKGQubGFiZWwpO1xyXG4gICAgICAgIHNlY3Rpb24ud2lkdGggPSB0aGlzLnhTY2FsZShzZWN0aW9uLnRvdGFsKSAtIHRoaXMueFNjYWxlKDApO1xyXG4gICAgICAgIHNlY3Rpb24uaGVpZ2h0ID0gdGhpcy55U2NhbGUuYmFuZHdpZHRoKCk7XHJcbiAgICAgICAgcmV0dXJuIHNlY3Rpb247XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlVG9vbHRpcFNldHRpbmdzKCkge1xyXG4gICAgdGhpcy50b29sdGlwUGxhY2VtZW50ID0gdGhpcy50b29sdGlwRGlzYWJsZWQgPyB1bmRlZmluZWQgOiAndG9wJztcclxuICAgIHRoaXMudG9vbHRpcFR5cGUgPSB0aGlzLnRvb2x0aXBEaXNhYmxlZCA/IHVuZGVmaW5lZCA6ICd0b29sdGlwJztcclxuICB9XHJcblxyXG4gIGlzQWN0aXZlKGVudHJ5KTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIXRoaXMuYWN0aXZlRW50cmllcykgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3QgaXRlbSA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kKGQgPT4ge1xyXG4gICAgICByZXR1cm4gZW50cnkubmFtZSA9PT0gZC5uYW1lICYmIGVudHJ5LnNlcmllcyA9PT0gZC5zZXJpZXM7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpdGVtICE9PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBnZXRMYWJlbChkYXRhSXRlbSk6IHN0cmluZyB7XHJcbiAgICBpZiAoZGF0YUl0ZW0ubGFiZWwpIHtcclxuICAgICAgcmV0dXJuIGRhdGFJdGVtLmxhYmVsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRhdGFJdGVtLm5hbWU7XHJcbiAgfVxyXG5cclxuICB0cmFja0J5KGluZGV4LCBiYXIpIHtcclxuICAgIHJldHVybiBiYXIubGFiZWw7XHJcbiAgfVxyXG5cclxuICB0cmFja0RhdGFMYWJlbEJ5KGluZGV4LCBiYXJMYWJlbCkge1xyXG4gICAgcmV0dXJuIGluZGV4ICsgJyMnICsgYmFyTGFiZWwuc2VyaWVzICsgJyMnICsgYmFyTGFiZWwudG90YWw7XHJcbiAgfVxyXG5cclxuICBjbGljayhkYXRhOiBEYXRhSXRlbSk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3QuZW1pdChkYXRhKTtcclxuICB9XHJcbn1cclxuIl19