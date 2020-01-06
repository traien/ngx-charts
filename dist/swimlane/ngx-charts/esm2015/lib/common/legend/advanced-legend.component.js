import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { trimLabel } from '../trim-label.helper';
import { formatLabel } from '../label.helper';
let AdvancedLegendComponent = class AdvancedLegendComponent {
    constructor() {
        this.label = 'Total';
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.legendItems = [];
        this.labelFormatting = label => label;
        this.percentageFormatting = percentage => percentage;
        this.defaultValueFormatting = value => value.toLocaleString();
    }
    ngOnChanges(changes) {
        this.update();
    }
    getTotal() {
        return this.data.map(d => d.value).reduce((sum, d) => sum + d, 0);
    }
    update() {
        this.total = this.getTotal();
        this.roundedTotal = this.total;
        this.legendItems = this.getLegendItems();
    }
    getLegendItems() {
        return this.data.map(d => {
            const label = formatLabel(d.name);
            const value = d.value;
            const color = this.colors.getColor(label);
            const percentage = this.total > 0 ? (value / this.total) * 100 : 0;
            const formattedLabel = typeof this.labelFormatting === 'function' ? this.labelFormatting(label) : label;
            return {
                _value: value,
                data: d,
                value,
                color,
                label: formattedLabel,
                displayLabel: trimLabel(formattedLabel, 20),
                origialLabel: d.name,
                percentage: this.percentageFormatting ? this.percentageFormatting(percentage) : percentage.toLocaleString()
            };
        });
    }
    trackBy(item) {
        return item.formattedLabel;
    }
};
__decorate([
    Input()
], AdvancedLegendComponent.prototype, "width", void 0);
__decorate([
    Input()
], AdvancedLegendComponent.prototype, "data", void 0);
__decorate([
    Input()
], AdvancedLegendComponent.prototype, "colors", void 0);
__decorate([
    Input()
], AdvancedLegendComponent.prototype, "label", void 0);
__decorate([
    Input()
], AdvancedLegendComponent.prototype, "animations", void 0);
__decorate([
    Output()
], AdvancedLegendComponent.prototype, "select", void 0);
__decorate([
    Output()
], AdvancedLegendComponent.prototype, "activate", void 0);
__decorate([
    Output()
], AdvancedLegendComponent.prototype, "deactivate", void 0);
__decorate([
    Input()
], AdvancedLegendComponent.prototype, "valueFormatting", void 0);
__decorate([
    Input()
], AdvancedLegendComponent.prototype, "labelFormatting", void 0);
__decorate([
    Input()
], AdvancedLegendComponent.prototype, "percentageFormatting", void 0);
AdvancedLegendComponent = __decorate([
    Component({
        selector: 'ngx-charts-advanced-legend',
        template: `
    <div class="advanced-pie-legend" [style.width.px]="width">
      <div
        *ngIf="animations"
        class="total-value"
        ngx-charts-count-up
        [countTo]="roundedTotal"
        [valueFormatting]="valueFormatting"
      ></div>
      <div class="total-value" *ngIf="!animations">
        {{ valueFormatting ? valueFormatting(roundedTotal) : defaultValueFormatting(roundedTotal) }}
      </div>
      <div class="total-label">
        {{ label }}
      </div>
      <div class="legend-items-container">
        <div class="legend-items">
          <div
            *ngFor="let legendItem of legendItems; trackBy: trackBy"
            tabindex="-1"
            class="legend-item"
            (mouseenter)="activate.emit(legendItem.data)"
            (mouseleave)="deactivate.emit(legendItem.data)"
            (click)="select.emit(legendItem.data)"
          >
            <div class="item-color" [style.border-left-color]="legendItem.color"></div>
            <div
              *ngIf="animations"
              class="item-value"
              ngx-charts-count-up
              [countTo]="legendItem._value"
              [valueFormatting]="valueFormatting"
            ></div>
            <div *ngIf="!animations" class="item-value">
              {{ valueFormatting ? valueFormatting(legendItem.value) : defaultValueFormatting(legendItem.value) }}
            </div>
            <div class="item-label">{{ legendItem.displayLabel }}</div>
            <div
              *ngIf="animations"
              class="item-percent"
              ngx-charts-count-up
              [countTo]="legendItem.percentage"
              [countSuffix]="'%'"
            ></div>
            <div *ngIf="!animations" class="item-percent">{{ legendItem.percentage.toLocaleString() }}%</div>
          </div>
        </div>
      </div>
    </div>
  `,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".advanced-pie-legend{float:left;position:relative;top:50%;-webkit-transform:translate(0,-50%);transform:translate(0,-50%)}.advanced-pie-legend .total-value{font-size:36px}.advanced-pie-legend .total-label{font-size:24px;margin-bottom:19px}.advanced-pie-legend .legend-items-container{width:100%}.advanced-pie-legend .legend-items-container .legend-items{white-space:nowrap;overflow:auto}.advanced-pie-legend .legend-items-container .legend-items .legend-item{margin-right:20px;display:inline-block;cursor:pointer}.advanced-pie-legend .legend-items-container .legend-items .legend-item:focus{outline:0}.advanced-pie-legend .legend-items-container .legend-items .legend-item:hover{color:#000;-webkit-transition:.2s;transition:.2s}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-value{font-size:24px;margin-top:-6px;margin-left:11px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-label{font-size:14px;opacity:.7;margin-left:11px;margin-top:-6px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-percent{font-size:24px;opacity:.7;margin-left:11px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-color{border-left:4px solid;width:4px;height:42px;float:left;margin-right:7px}"]
    })
], AdvancedLegendComponent);
export { AdvancedLegendComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2YW5jZWQtbGVnZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9sZWdlbmQvYWR2YW5jZWQtbGVnZW5kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBRU4saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUEwRDlDLElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXVCO0lBQXBDO1FBSVcsVUFBSyxHQUFXLE9BQU8sQ0FBQztRQUN4QixlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTFCLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMvQyxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDakQsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTdELGdCQUFXLEdBQVUsRUFBRSxDQUFDO1FBS2Ysb0JBQWUsR0FBMkIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDekQseUJBQW9CLEdBQTJCLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDO1FBRWpGLDJCQUFzQixHQUEyQixLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQXlDbkYsQ0FBQztJQXZDQyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBRS9CLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCxjQUFjO1FBQ1osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN2QixNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDdEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRSxNQUFNLGNBQWMsR0FBRyxPQUFPLElBQUksQ0FBQyxlQUFlLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFFeEcsT0FBTztnQkFDTCxNQUFNLEVBQUUsS0FBSztnQkFDYixJQUFJLEVBQUUsQ0FBQztnQkFDUCxLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsS0FBSyxFQUFFLGNBQWM7Z0JBQ3JCLFlBQVksRUFBRSxTQUFTLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQztnQkFDM0MsWUFBWSxFQUFFLENBQUMsQ0FBQyxJQUFJO2dCQUNwQixVQUFVLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUU7YUFDNUcsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFJO1FBQ1YsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7Q0FDRixDQUFBO0FBM0RVO0lBQVIsS0FBSyxFQUFFO3NEQUFlO0FBQ2Q7SUFBUixLQUFLLEVBQUU7cURBQU07QUFDTDtJQUFSLEtBQUssRUFBRTt1REFBUTtBQUNQO0lBQVIsS0FBSyxFQUFFO3NEQUF5QjtBQUN4QjtJQUFSLEtBQUssRUFBRTsyREFBNEI7QUFFMUI7SUFBVCxNQUFNLEVBQUU7dURBQWdEO0FBQy9DO0lBQVQsTUFBTSxFQUFFO3lEQUFrRDtBQUNqRDtJQUFULE1BQU0sRUFBRTsyREFBb0Q7QUFNcEQ7SUFBUixLQUFLLEVBQUU7Z0VBQXlDO0FBQ3hDO0lBQVIsS0FBSyxFQUFFO2dFQUEwRDtBQUN6RDtJQUFSLEtBQUssRUFBRTtxRUFBeUU7QUFqQnRFLHVCQUF1QjtJQXhEbkMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDRCQUE0QjtRQUN0QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpRFQ7UUFFRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtRQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7S0FDaEQsQ0FBQztHQUNXLHVCQUF1QixDQTREbkM7U0E1RFksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDb21wb25lbnQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPdXRwdXQsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBWaWV3RW5jYXBzdWxhdGlvblxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyB0cmltTGFiZWwgfSBmcm9tICcuLi90cmltLWxhYmVsLmhlbHBlcic7XHJcbmltcG9ydCB7IGZvcm1hdExhYmVsIH0gZnJvbSAnLi4vbGFiZWwuaGVscGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LWNoYXJ0cy1hZHZhbmNlZC1sZWdlbmQnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwiYWR2YW5jZWQtcGllLWxlZ2VuZFwiIFtzdHlsZS53aWR0aC5weF09XCJ3aWR0aFwiPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgKm5nSWY9XCJhbmltYXRpb25zXCJcclxuICAgICAgICBjbGFzcz1cInRvdGFsLXZhbHVlXCJcclxuICAgICAgICBuZ3gtY2hhcnRzLWNvdW50LXVwXHJcbiAgICAgICAgW2NvdW50VG9dPVwicm91bmRlZFRvdGFsXCJcclxuICAgICAgICBbdmFsdWVGb3JtYXR0aW5nXT1cInZhbHVlRm9ybWF0dGluZ1wiXHJcbiAgICAgID48L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInRvdGFsLXZhbHVlXCIgKm5nSWY9XCIhYW5pbWF0aW9uc1wiPlxyXG4gICAgICAgIHt7IHZhbHVlRm9ybWF0dGluZyA/IHZhbHVlRm9ybWF0dGluZyhyb3VuZGVkVG90YWwpIDogZGVmYXVsdFZhbHVlRm9ybWF0dGluZyhyb3VuZGVkVG90YWwpIH19XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwidG90YWwtbGFiZWxcIj5cclxuICAgICAgICB7eyBsYWJlbCB9fVxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImxlZ2VuZC1pdGVtcy1jb250YWluZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibGVnZW5kLWl0ZW1zXCI+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBsZWdlbmRJdGVtIG9mIGxlZ2VuZEl0ZW1zOyB0cmFja0J5OiB0cmFja0J5XCJcclxuICAgICAgICAgICAgdGFiaW5kZXg9XCItMVwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwibGVnZW5kLWl0ZW1cIlxyXG4gICAgICAgICAgICAobW91c2VlbnRlcik9XCJhY3RpdmF0ZS5lbWl0KGxlZ2VuZEl0ZW0uZGF0YSlcIlxyXG4gICAgICAgICAgICAobW91c2VsZWF2ZSk9XCJkZWFjdGl2YXRlLmVtaXQobGVnZW5kSXRlbS5kYXRhKVwiXHJcbiAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3QuZW1pdChsZWdlbmRJdGVtLmRhdGEpXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tY29sb3JcIiBbc3R5bGUuYm9yZGVyLWxlZnQtY29sb3JdPVwibGVnZW5kSXRlbS5jb2xvclwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgKm5nSWY9XCJhbmltYXRpb25zXCJcclxuICAgICAgICAgICAgICBjbGFzcz1cIml0ZW0tdmFsdWVcIlxyXG4gICAgICAgICAgICAgIG5neC1jaGFydHMtY291bnQtdXBcclxuICAgICAgICAgICAgICBbY291bnRUb109XCJsZWdlbmRJdGVtLl92YWx1ZVwiXHJcbiAgICAgICAgICAgICAgW3ZhbHVlRm9ybWF0dGluZ109XCJ2YWx1ZUZvcm1hdHRpbmdcIlxyXG4gICAgICAgICAgICA+PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhYW5pbWF0aW9uc1wiIGNsYXNzPVwiaXRlbS12YWx1ZVwiPlxyXG4gICAgICAgICAgICAgIHt7IHZhbHVlRm9ybWF0dGluZyA/IHZhbHVlRm9ybWF0dGluZyhsZWdlbmRJdGVtLnZhbHVlKSA6IGRlZmF1bHRWYWx1ZUZvcm1hdHRpbmcobGVnZW5kSXRlbS52YWx1ZSkgfX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLWxhYmVsXCI+e3sgbGVnZW5kSXRlbS5kaXNwbGF5TGFiZWwgfX08L2Rpdj5cclxuICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICpuZ0lmPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgICAgICAgICAgY2xhc3M9XCJpdGVtLXBlcmNlbnRcIlxyXG4gICAgICAgICAgICAgIG5neC1jaGFydHMtY291bnQtdXBcclxuICAgICAgICAgICAgICBbY291bnRUb109XCJsZWdlbmRJdGVtLnBlcmNlbnRhZ2VcIlxyXG4gICAgICAgICAgICAgIFtjb3VudFN1ZmZpeF09XCInJSdcIlxyXG4gICAgICAgICAgICA+PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhYW5pbWF0aW9uc1wiIGNsYXNzPVwiaXRlbS1wZXJjZW50XCI+e3sgbGVnZW5kSXRlbS5wZXJjZW50YWdlLnRvTG9jYWxlU3RyaW5nKCkgfX0lPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG4gIHN0eWxlVXJsczogWycuL2FkdmFuY2VkLWxlZ2VuZC5jb21wb25lbnQuc2NzcyddLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEFkdmFuY2VkTGVnZW5kQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSB3aWR0aDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGRhdGE7XHJcbiAgQElucHV0KCkgY29sb3JzO1xyXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmcgPSAnVG90YWwnO1xyXG4gIEBJbnB1dCgpIGFuaW1hdGlvbnM6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgbGVnZW5kSXRlbXM6IGFueVtdID0gW107XHJcbiAgdG90YWw6IG51bWJlcjtcclxuICByb3VuZGVkVG90YWw6IG51bWJlcjtcclxuXHJcbiAgQElucHV0KCkgdmFsdWVGb3JtYXR0aW5nOiAodmFsdWU6IG51bWJlcikgPT4gYW55O1xyXG4gIEBJbnB1dCgpIGxhYmVsRm9ybWF0dGluZzogKHZhbHVlOiBzdHJpbmcpID0+IGFueSA9IGxhYmVsID0+IGxhYmVsO1xyXG4gIEBJbnB1dCgpIHBlcmNlbnRhZ2VGb3JtYXR0aW5nOiAodmFsdWU6IG51bWJlcikgPT4gYW55ID0gcGVyY2VudGFnZSA9PiBwZXJjZW50YWdlO1xyXG5cclxuICBkZWZhdWx0VmFsdWVGb3JtYXR0aW5nOiAodmFsdWU6IG51bWJlcikgPT4gYW55ID0gdmFsdWUgPT4gdmFsdWUudG9Mb2NhbGVTdHJpbmcoKTtcclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIGdldFRvdGFsKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhLm1hcChkID0+IGQudmFsdWUpLnJlZHVjZSgoc3VtLCBkKSA9PiBzdW0gKyBkLCAwKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMudG90YWwgPSB0aGlzLmdldFRvdGFsKCk7XHJcbiAgICB0aGlzLnJvdW5kZWRUb3RhbCA9IHRoaXMudG90YWw7XHJcblxyXG4gICAgdGhpcy5sZWdlbmRJdGVtcyA9IHRoaXMuZ2V0TGVnZW5kSXRlbXMoKTtcclxuICB9XHJcblxyXG4gIGdldExlZ2VuZEl0ZW1zKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhLm1hcChkID0+IHtcclxuICAgICAgY29uc3QgbGFiZWwgPSBmb3JtYXRMYWJlbChkLm5hbWUpO1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IGQudmFsdWU7XHJcbiAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jb2xvcnMuZ2V0Q29sb3IobGFiZWwpO1xyXG4gICAgICBjb25zdCBwZXJjZW50YWdlID0gdGhpcy50b3RhbCA+IDAgPyAodmFsdWUgLyB0aGlzLnRvdGFsKSAqIDEwMCA6IDA7XHJcbiAgICAgIGNvbnN0IGZvcm1hdHRlZExhYmVsID0gdHlwZW9mIHRoaXMubGFiZWxGb3JtYXR0aW5nID09PSAnZnVuY3Rpb24nID8gdGhpcy5sYWJlbEZvcm1hdHRpbmcobGFiZWwpIDogbGFiZWw7XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIF92YWx1ZTogdmFsdWUsXHJcbiAgICAgICAgZGF0YTogZCxcclxuICAgICAgICB2YWx1ZSxcclxuICAgICAgICBjb2xvcixcclxuICAgICAgICBsYWJlbDogZm9ybWF0dGVkTGFiZWwsXHJcbiAgICAgICAgZGlzcGxheUxhYmVsOiB0cmltTGFiZWwoZm9ybWF0dGVkTGFiZWwsIDIwKSxcclxuICAgICAgICBvcmlnaWFsTGFiZWw6IGQubmFtZSxcclxuICAgICAgICBwZXJjZW50YWdlOiB0aGlzLnBlcmNlbnRhZ2VGb3JtYXR0aW5nID8gdGhpcy5wZXJjZW50YWdlRm9ybWF0dGluZyhwZXJjZW50YWdlKSA6IHBlcmNlbnRhZ2UudG9Mb2NhbGVTdHJpbmcoKVxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB0cmFja0J5KGl0ZW0pIHtcclxuICAgIHJldHVybiBpdGVtLmZvcm1hdHRlZExhYmVsO1xyXG4gIH1cclxufVxyXG4iXX0=