import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { trimLabel } from '../trim-label.helper';
import { formatLabel } from '../label.helper';
var AdvancedLegendComponent = /** @class */ (function () {
    function AdvancedLegendComponent() {
        this.label = 'Total';
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.legendItems = [];
        this.labelFormatting = function (label) { return label; };
        this.percentageFormatting = function (percentage) { return percentage; };
        this.defaultValueFormatting = function (value) { return value.toLocaleString(); };
    }
    AdvancedLegendComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    AdvancedLegendComponent.prototype.getTotal = function () {
        return this.data.map(function (d) { return d.value; }).reduce(function (sum, d) { return sum + d; }, 0);
    };
    AdvancedLegendComponent.prototype.update = function () {
        this.total = this.getTotal();
        this.roundedTotal = this.total;
        this.legendItems = this.getLegendItems();
    };
    AdvancedLegendComponent.prototype.getLegendItems = function () {
        var _this = this;
        return this.data.map(function (d) {
            var label = formatLabel(d.name);
            var value = d.value;
            var color = _this.colors.getColor(label);
            var percentage = _this.total > 0 ? (value / _this.total) * 100 : 0;
            var formattedLabel = typeof _this.labelFormatting === 'function' ? _this.labelFormatting(label) : label;
            return {
                _value: value,
                data: d,
                value: value,
                color: color,
                label: formattedLabel,
                displayLabel: trimLabel(formattedLabel, 20),
                origialLabel: d.name,
                percentage: _this.percentageFormatting ? _this.percentageFormatting(percentage) : percentage.toLocaleString()
            };
        });
    };
    AdvancedLegendComponent.prototype.trackBy = function (item) {
        return item.formattedLabel;
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
            template: "\n    <div class=\"advanced-pie-legend\" [style.width.px]=\"width\">\n      <div\n        *ngIf=\"animations\"\n        class=\"total-value\"\n        ngx-charts-count-up\n        [countTo]=\"roundedTotal\"\n        [valueFormatting]=\"valueFormatting\"\n      ></div>\n      <div class=\"total-value\" *ngIf=\"!animations\">\n        {{ valueFormatting ? valueFormatting(roundedTotal) : defaultValueFormatting(roundedTotal) }}\n      </div>\n      <div class=\"total-label\">\n        {{ label }}\n      </div>\n      <div class=\"legend-items-container\">\n        <div class=\"legend-items\">\n          <div\n            *ngFor=\"let legendItem of legendItems; trackBy: trackBy\"\n            tabindex=\"-1\"\n            class=\"legend-item\"\n            (mouseenter)=\"activate.emit(legendItem.data)\"\n            (mouseleave)=\"deactivate.emit(legendItem.data)\"\n            (click)=\"select.emit(legendItem.data)\"\n          >\n            <div class=\"item-color\" [style.border-left-color]=\"legendItem.color\"></div>\n            <div\n              *ngIf=\"animations\"\n              class=\"item-value\"\n              ngx-charts-count-up\n              [countTo]=\"legendItem._value\"\n              [valueFormatting]=\"valueFormatting\"\n            ></div>\n            <div *ngIf=\"!animations\" class=\"item-value\">\n              {{ valueFormatting ? valueFormatting(legendItem.value) : defaultValueFormatting(legendItem.value) }}\n            </div>\n            <div class=\"item-label\">{{ legendItem.displayLabel }}</div>\n            <div\n              *ngIf=\"animations\"\n              class=\"item-percent\"\n              ngx-charts-count-up\n              [countTo]=\"legendItem.percentage\"\n              [countSuffix]=\"'%'\"\n            ></div>\n            <div *ngIf=\"!animations\" class=\"item-percent\">{{ legendItem.percentage.toLocaleString() }}%</div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".advanced-pie-legend{float:left;position:relative;top:50%;-webkit-transform:translate(0,-50%);transform:translate(0,-50%)}.advanced-pie-legend .total-value{font-size:36px}.advanced-pie-legend .total-label{font-size:24px;margin-bottom:19px}.advanced-pie-legend .legend-items-container{width:100%}.advanced-pie-legend .legend-items-container .legend-items{white-space:nowrap;overflow:auto}.advanced-pie-legend .legend-items-container .legend-items .legend-item{margin-right:20px;display:inline-block;cursor:pointer}.advanced-pie-legend .legend-items-container .legend-items .legend-item:focus{outline:0}.advanced-pie-legend .legend-items-container .legend-items .legend-item:hover{color:#000;-webkit-transition:.2s;transition:.2s}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-value{font-size:24px;margin-top:-6px;margin-left:11px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-label{font-size:14px;opacity:.7;margin-left:11px;margin-top:-6px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-percent{font-size:24px;opacity:.7;margin-left:11px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-color{border-left:4px solid;width:4px;height:42px;float:left;margin-right:7px}"]
        })
    ], AdvancedLegendComponent);
    return AdvancedLegendComponent;
}());
export { AdvancedLegendComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2YW5jZWQtbGVnZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9sZWdlbmQvYWR2YW5jZWQtbGVnZW5kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBRU4saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUEwRDlDO0lBQUE7UUFJVyxVQUFLLEdBQVcsT0FBTyxDQUFDO1FBQ3hCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFMUIsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQy9DLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqRCxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFN0QsZ0JBQVcsR0FBVSxFQUFFLENBQUM7UUFLZixvQkFBZSxHQUEyQixVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssRUFBTCxDQUFLLENBQUM7UUFDekQseUJBQW9CLEdBQTJCLFVBQUEsVUFBVSxJQUFJLE9BQUEsVUFBVSxFQUFWLENBQVUsQ0FBQztRQUVqRiwyQkFBc0IsR0FBMkIsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsY0FBYyxFQUFFLEVBQXRCLENBQXNCLENBQUM7SUF5Q25GLENBQUM7SUF2Q0MsNkNBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsMENBQVEsR0FBUjtRQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsS0FBSyxFQUFQLENBQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxDQUFDLElBQUssT0FBQSxHQUFHLEdBQUcsQ0FBQyxFQUFQLENBQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsd0NBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUUvQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsZ0RBQWMsR0FBZDtRQUFBLGlCQW1CQztRQWxCQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQztZQUNwQixJQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xDLElBQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDdEIsSUFBTSxLQUFLLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUMsSUFBTSxVQUFVLEdBQUcsS0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRSxJQUFNLGNBQWMsR0FBRyxPQUFPLEtBQUksQ0FBQyxlQUFlLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFFeEcsT0FBTztnQkFDTCxNQUFNLEVBQUUsS0FBSztnQkFDYixJQUFJLEVBQUUsQ0FBQztnQkFDUCxLQUFLLE9BQUE7Z0JBQ0wsS0FBSyxPQUFBO2dCQUNMLEtBQUssRUFBRSxjQUFjO2dCQUNyQixZQUFZLEVBQUUsU0FBUyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUM7Z0JBQzNDLFlBQVksRUFBRSxDQUFDLENBQUMsSUFBSTtnQkFDcEIsVUFBVSxFQUFFLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFO2FBQzVHLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCx5Q0FBTyxHQUFQLFVBQVEsSUFBSTtRQUNWLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM3QixDQUFDO0lBMURRO1FBQVIsS0FBSyxFQUFFOzBEQUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7eURBQU07SUFDTDtRQUFSLEtBQUssRUFBRTsyREFBUTtJQUNQO1FBQVIsS0FBSyxFQUFFOzBEQUF5QjtJQUN4QjtRQUFSLEtBQUssRUFBRTsrREFBNEI7SUFFMUI7UUFBVCxNQUFNLEVBQUU7MkRBQWdEO0lBQy9DO1FBQVQsTUFBTSxFQUFFOzZEQUFrRDtJQUNqRDtRQUFULE1BQU0sRUFBRTsrREFBb0Q7SUFNcEQ7UUFBUixLQUFLLEVBQUU7b0VBQXlDO0lBQ3hDO1FBQVIsS0FBSyxFQUFFO29FQUEwRDtJQUN6RDtRQUFSLEtBQUssRUFBRTt5RUFBeUU7SUFqQnRFLHVCQUF1QjtRQXhEbkMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDRCQUE0QjtZQUN0QyxRQUFRLEVBQUUsKzZEQWlEVDtZQUVELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNoRCxDQUFDO09BQ1csdUJBQXVCLENBNERuQztJQUFELDhCQUFDO0NBQUEsQUE1REQsSUE0REM7U0E1RFksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDb21wb25lbnQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPdXRwdXQsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBWaWV3RW5jYXBzdWxhdGlvblxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyB0cmltTGFiZWwgfSBmcm9tICcuLi90cmltLWxhYmVsLmhlbHBlcic7XHJcbmltcG9ydCB7IGZvcm1hdExhYmVsIH0gZnJvbSAnLi4vbGFiZWwuaGVscGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LWNoYXJ0cy1hZHZhbmNlZC1sZWdlbmQnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwiYWR2YW5jZWQtcGllLWxlZ2VuZFwiIFtzdHlsZS53aWR0aC5weF09XCJ3aWR0aFwiPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgKm5nSWY9XCJhbmltYXRpb25zXCJcclxuICAgICAgICBjbGFzcz1cInRvdGFsLXZhbHVlXCJcclxuICAgICAgICBuZ3gtY2hhcnRzLWNvdW50LXVwXHJcbiAgICAgICAgW2NvdW50VG9dPVwicm91bmRlZFRvdGFsXCJcclxuICAgICAgICBbdmFsdWVGb3JtYXR0aW5nXT1cInZhbHVlRm9ybWF0dGluZ1wiXHJcbiAgICAgID48L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInRvdGFsLXZhbHVlXCIgKm5nSWY9XCIhYW5pbWF0aW9uc1wiPlxyXG4gICAgICAgIHt7IHZhbHVlRm9ybWF0dGluZyA/IHZhbHVlRm9ybWF0dGluZyhyb3VuZGVkVG90YWwpIDogZGVmYXVsdFZhbHVlRm9ybWF0dGluZyhyb3VuZGVkVG90YWwpIH19XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwidG90YWwtbGFiZWxcIj5cclxuICAgICAgICB7eyBsYWJlbCB9fVxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImxlZ2VuZC1pdGVtcy1jb250YWluZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibGVnZW5kLWl0ZW1zXCI+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBsZWdlbmRJdGVtIG9mIGxlZ2VuZEl0ZW1zOyB0cmFja0J5OiB0cmFja0J5XCJcclxuICAgICAgICAgICAgdGFiaW5kZXg9XCItMVwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwibGVnZW5kLWl0ZW1cIlxyXG4gICAgICAgICAgICAobW91c2VlbnRlcik9XCJhY3RpdmF0ZS5lbWl0KGxlZ2VuZEl0ZW0uZGF0YSlcIlxyXG4gICAgICAgICAgICAobW91c2VsZWF2ZSk9XCJkZWFjdGl2YXRlLmVtaXQobGVnZW5kSXRlbS5kYXRhKVwiXHJcbiAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3QuZW1pdChsZWdlbmRJdGVtLmRhdGEpXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tY29sb3JcIiBbc3R5bGUuYm9yZGVyLWxlZnQtY29sb3JdPVwibGVnZW5kSXRlbS5jb2xvclwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgKm5nSWY9XCJhbmltYXRpb25zXCJcclxuICAgICAgICAgICAgICBjbGFzcz1cIml0ZW0tdmFsdWVcIlxyXG4gICAgICAgICAgICAgIG5neC1jaGFydHMtY291bnQtdXBcclxuICAgICAgICAgICAgICBbY291bnRUb109XCJsZWdlbmRJdGVtLl92YWx1ZVwiXHJcbiAgICAgICAgICAgICAgW3ZhbHVlRm9ybWF0dGluZ109XCJ2YWx1ZUZvcm1hdHRpbmdcIlxyXG4gICAgICAgICAgICA+PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhYW5pbWF0aW9uc1wiIGNsYXNzPVwiaXRlbS12YWx1ZVwiPlxyXG4gICAgICAgICAgICAgIHt7IHZhbHVlRm9ybWF0dGluZyA/IHZhbHVlRm9ybWF0dGluZyhsZWdlbmRJdGVtLnZhbHVlKSA6IGRlZmF1bHRWYWx1ZUZvcm1hdHRpbmcobGVnZW5kSXRlbS52YWx1ZSkgfX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLWxhYmVsXCI+e3sgbGVnZW5kSXRlbS5kaXNwbGF5TGFiZWwgfX08L2Rpdj5cclxuICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICpuZ0lmPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgICAgICAgICAgY2xhc3M9XCJpdGVtLXBlcmNlbnRcIlxyXG4gICAgICAgICAgICAgIG5neC1jaGFydHMtY291bnQtdXBcclxuICAgICAgICAgICAgICBbY291bnRUb109XCJsZWdlbmRJdGVtLnBlcmNlbnRhZ2VcIlxyXG4gICAgICAgICAgICAgIFtjb3VudFN1ZmZpeF09XCInJSdcIlxyXG4gICAgICAgICAgICA+PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhYW5pbWF0aW9uc1wiIGNsYXNzPVwiaXRlbS1wZXJjZW50XCI+e3sgbGVnZW5kSXRlbS5wZXJjZW50YWdlLnRvTG9jYWxlU3RyaW5nKCkgfX0lPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG4gIHN0eWxlVXJsczogWycuL2FkdmFuY2VkLWxlZ2VuZC5jb21wb25lbnQuc2NzcyddLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEFkdmFuY2VkTGVnZW5kQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSB3aWR0aDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGRhdGE7XHJcbiAgQElucHV0KCkgY29sb3JzO1xyXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmcgPSAnVG90YWwnO1xyXG4gIEBJbnB1dCgpIGFuaW1hdGlvbnM6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgbGVnZW5kSXRlbXM6IGFueVtdID0gW107XHJcbiAgdG90YWw6IG51bWJlcjtcclxuICByb3VuZGVkVG90YWw6IG51bWJlcjtcclxuXHJcbiAgQElucHV0KCkgdmFsdWVGb3JtYXR0aW5nOiAodmFsdWU6IG51bWJlcikgPT4gYW55O1xyXG4gIEBJbnB1dCgpIGxhYmVsRm9ybWF0dGluZzogKHZhbHVlOiBzdHJpbmcpID0+IGFueSA9IGxhYmVsID0+IGxhYmVsO1xyXG4gIEBJbnB1dCgpIHBlcmNlbnRhZ2VGb3JtYXR0aW5nOiAodmFsdWU6IG51bWJlcikgPT4gYW55ID0gcGVyY2VudGFnZSA9PiBwZXJjZW50YWdlO1xyXG5cclxuICBkZWZhdWx0VmFsdWVGb3JtYXR0aW5nOiAodmFsdWU6IG51bWJlcikgPT4gYW55ID0gdmFsdWUgPT4gdmFsdWUudG9Mb2NhbGVTdHJpbmcoKTtcclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIGdldFRvdGFsKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhLm1hcChkID0+IGQudmFsdWUpLnJlZHVjZSgoc3VtLCBkKSA9PiBzdW0gKyBkLCAwKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMudG90YWwgPSB0aGlzLmdldFRvdGFsKCk7XHJcbiAgICB0aGlzLnJvdW5kZWRUb3RhbCA9IHRoaXMudG90YWw7XHJcblxyXG4gICAgdGhpcy5sZWdlbmRJdGVtcyA9IHRoaXMuZ2V0TGVnZW5kSXRlbXMoKTtcclxuICB9XHJcblxyXG4gIGdldExlZ2VuZEl0ZW1zKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhLm1hcChkID0+IHtcclxuICAgICAgY29uc3QgbGFiZWwgPSBmb3JtYXRMYWJlbChkLm5hbWUpO1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IGQudmFsdWU7XHJcbiAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jb2xvcnMuZ2V0Q29sb3IobGFiZWwpO1xyXG4gICAgICBjb25zdCBwZXJjZW50YWdlID0gdGhpcy50b3RhbCA+IDAgPyAodmFsdWUgLyB0aGlzLnRvdGFsKSAqIDEwMCA6IDA7XHJcbiAgICAgIGNvbnN0IGZvcm1hdHRlZExhYmVsID0gdHlwZW9mIHRoaXMubGFiZWxGb3JtYXR0aW5nID09PSAnZnVuY3Rpb24nID8gdGhpcy5sYWJlbEZvcm1hdHRpbmcobGFiZWwpIDogbGFiZWw7XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIF92YWx1ZTogdmFsdWUsXHJcbiAgICAgICAgZGF0YTogZCxcclxuICAgICAgICB2YWx1ZSxcclxuICAgICAgICBjb2xvcixcclxuICAgICAgICBsYWJlbDogZm9ybWF0dGVkTGFiZWwsXHJcbiAgICAgICAgZGlzcGxheUxhYmVsOiB0cmltTGFiZWwoZm9ybWF0dGVkTGFiZWwsIDIwKSxcclxuICAgICAgICBvcmlnaWFsTGFiZWw6IGQubmFtZSxcclxuICAgICAgICBwZXJjZW50YWdlOiB0aGlzLnBlcmNlbnRhZ2VGb3JtYXR0aW5nID8gdGhpcy5wZXJjZW50YWdlRm9ybWF0dGluZyhwZXJjZW50YWdlKSA6IHBlcmNlbnRhZ2UudG9Mb2NhbGVTdHJpbmcoKVxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB0cmFja0J5KGl0ZW0pIHtcclxuICAgIHJldHVybiBpdGVtLmZvcm1hdHRlZExhYmVsO1xyXG4gIH1cclxufVxyXG4iXX0=