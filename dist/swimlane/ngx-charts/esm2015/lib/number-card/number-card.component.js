import { __decorate } from "tslib";
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { BaseChartComponent } from '../common/base-chart.component';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { gridLayout, gridSize } from '../common/grid-layout.helper';
let NumberCardComponent = class NumberCardComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.emptyColor = 'rgba(0, 0, 0, 0)';
        this.innerPadding = 15;
        this.margin = [10, 10, 10, 10];
    }
    get clickable() {
        return !!this.select.observers.length;
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
        this.setColors();
        this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
        const size = gridSize(this.dims, this.results.length, 150);
        const N = size[0] * size[1];
        const data = this.results.slice();
        while (data.length < N) {
            data.push({ value: null });
        }
        this.data = gridLayout(this.dims, data, 150, this.designatedTotal);
    }
    getDomain() {
        return this.results.map(d => d.label);
    }
    onClick(data) {
        this.select.emit(data);
    }
    setColors() {
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    }
};
__decorate([
    Input()
], NumberCardComponent.prototype, "cardColor", void 0);
__decorate([
    Input()
], NumberCardComponent.prototype, "bandColor", void 0);
__decorate([
    Input()
], NumberCardComponent.prototype, "emptyColor", void 0);
__decorate([
    Input()
], NumberCardComponent.prototype, "innerPadding", void 0);
__decorate([
    Input()
], NumberCardComponent.prototype, "textColor", void 0);
__decorate([
    Input()
], NumberCardComponent.prototype, "valueFormatting", void 0);
__decorate([
    Input()
], NumberCardComponent.prototype, "labelFormatting", void 0);
__decorate([
    Input()
], NumberCardComponent.prototype, "designatedTotal", void 0);
NumberCardComponent = __decorate([
    Component({
        selector: 'ngx-charts-number-card',
        template: `
    <ngx-charts-chart [view]="[width, height]" [showLegend]="false" [animations]="animations">
      <svg:g [attr.transform]="transform" class="number-card chart" [class.clickable]="clickable">
        <svg:g
          ngx-charts-card-series
          [colors]="colors"
          [cardColor]="cardColor"
          [bandColor]="bandColor"
          [textColor]="textColor"
          [emptyColor]="emptyColor"
          [data]="data"
          [dims]="dims"
          [innerPadding]="innerPadding"
          [valueFormatting]="valueFormatting"
          [labelFormatting]="labelFormatting"
          [animations]="animations"
          (select)="onClick($event)"
        />
      </svg:g>
    </ngx-charts-chart>
  `,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", "ngx-charts-number-card .cell .trimmed-label{font-size:12px;pointer-events:none;overflow:hidden;text-align:left;line-height:1em}ngx-charts-number-card .cell .trimmed-label p{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;width:100%;padding:0;margin:0}ngx-charts-number-card .cell .value-text{pointer-events:none}ngx-charts-number-card .number-card.clickable .cell .card,ngx-charts-number-card .number-card.clickable .cell .card-band{cursor:pointer}"]
    })
], NumberCardComponent);
export { NumberCardComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLWNhcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvbnVtYmVyLWNhcmQvbnVtYmVyLWNhcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQWtCLE1BQU0sa0NBQWtDLENBQUM7QUFDM0YsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUE2QnBFLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW9CLFNBQVEsa0JBQWtCO0lBQTNEOztRQUdXLGVBQVUsR0FBVyxrQkFBa0IsQ0FBQztRQUN4QyxpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQVkzQixXQUFNLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQStDNUIsQ0FBQztJQTNDQyxJQUFJLFNBQVM7UUFDWCxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7SUFDeEMsQ0FBQztJQUVELE1BQU07UUFDSixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFZixJQUFJLENBQUMsSUFBSSxHQUFHLHVCQUF1QixDQUFDO1lBQ2xDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3JCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVuQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUUvQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUV2RSxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMzRCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTVCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFbEMsT0FBTyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7U0FDNUI7UUFFRCxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsT0FBTyxDQUFDLElBQUk7UUFDVixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDeEYsQ0FBQztDQUNGLENBQUE7QUE5RFU7SUFBUixLQUFLLEVBQUU7c0RBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFO3NEQUFtQjtBQUNsQjtJQUFSLEtBQUssRUFBRTt1REFBeUM7QUFDeEM7SUFBUixLQUFLLEVBQUU7eURBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFO3NEQUFtQjtBQUNsQjtJQUFSLEtBQUssRUFBRTs0REFBc0I7QUFDckI7SUFBUixLQUFLLEVBQUU7NERBQXNCO0FBQ3JCO0lBQVIsS0FBSyxFQUFFOzREQUF5QjtBQVJ0QixtQkFBbUI7SUEzQi9CLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSx3QkFBd0I7UUFDbEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CVDtRQUVELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1FBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztLQUNoRCxDQUFDO0dBQ1csbUJBQW1CLENBK0QvQjtTQS9EWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmFzZUNoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL2Jhc2UtY2hhcnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMsIFZpZXdEaW1lbnNpb25zIH0gZnJvbSAnLi4vY29tbW9uL3ZpZXctZGltZW5zaW9ucy5oZWxwZXInO1xyXG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gJy4uL2NvbW1vbi9jb2xvci5oZWxwZXInO1xyXG5pbXBvcnQgeyBncmlkTGF5b3V0LCBncmlkU2l6ZSB9IGZyb20gJy4uL2NvbW1vbi9ncmlkLWxheW91dC5oZWxwZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtY2hhcnRzLW51bWJlci1jYXJkJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5neC1jaGFydHMtY2hhcnQgW3ZpZXddPVwiW3dpZHRoLCBoZWlnaHRdXCIgW3Nob3dMZWdlbmRdPVwiZmFsc2VcIiBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCI+XHJcbiAgICAgIDxzdmc6ZyBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtXCIgY2xhc3M9XCJudW1iZXItY2FyZCBjaGFydFwiIFtjbGFzcy5jbGlja2FibGVdPVwiY2xpY2thYmxlXCI+XHJcbiAgICAgICAgPHN2ZzpnXHJcbiAgICAgICAgICBuZ3gtY2hhcnRzLWNhcmQtc2VyaWVzXHJcbiAgICAgICAgICBbY29sb3JzXT1cImNvbG9yc1wiXHJcbiAgICAgICAgICBbY2FyZENvbG9yXT1cImNhcmRDb2xvclwiXHJcbiAgICAgICAgICBbYmFuZENvbG9yXT1cImJhbmRDb2xvclwiXHJcbiAgICAgICAgICBbdGV4dENvbG9yXT1cInRleHRDb2xvclwiXHJcbiAgICAgICAgICBbZW1wdHlDb2xvcl09XCJlbXB0eUNvbG9yXCJcclxuICAgICAgICAgIFtkYXRhXT1cImRhdGFcIlxyXG4gICAgICAgICAgW2RpbXNdPVwiZGltc1wiXHJcbiAgICAgICAgICBbaW5uZXJQYWRkaW5nXT1cImlubmVyUGFkZGluZ1wiXHJcbiAgICAgICAgICBbdmFsdWVGb3JtYXR0aW5nXT1cInZhbHVlRm9ybWF0dGluZ1wiXHJcbiAgICAgICAgICBbbGFiZWxGb3JtYXR0aW5nXT1cImxhYmVsRm9ybWF0dGluZ1wiXHJcbiAgICAgICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcclxuICAgICAgICAgIChzZWxlY3QpPVwib25DbGljaygkZXZlbnQpXCJcclxuICAgICAgICAvPlxyXG4gICAgICA8L3N2ZzpnPlxyXG4gICAgPC9uZ3gtY2hhcnRzLWNoYXJ0PlxyXG4gIGAsXHJcbiAgc3R5bGVVcmxzOiBbJy4uL2NvbW1vbi9iYXNlLWNoYXJ0LmNvbXBvbmVudC5zY3NzJywgJy4vY2FyZC5jb21wb25lbnQuc2NzcyddLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIE51bWJlckNhcmRDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ2hhcnRDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpIGNhcmRDb2xvcjogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGJhbmRDb2xvcjogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGVtcHR5Q29sb3I6IHN0cmluZyA9ICdyZ2JhKDAsIDAsIDAsIDApJztcclxuICBASW5wdXQoKSBpbm5lclBhZGRpbmcgPSAxNTtcclxuICBASW5wdXQoKSB0ZXh0Q29sb3I6IHN0cmluZztcclxuICBASW5wdXQoKSB2YWx1ZUZvcm1hdHRpbmc6IGFueTtcclxuICBASW5wdXQoKSBsYWJlbEZvcm1hdHRpbmc6IGFueTtcclxuICBASW5wdXQoKSBkZXNpZ25hdGVkVG90YWw6IG51bWJlcjtcclxuXHJcbiAgZGltczogVmlld0RpbWVuc2lvbnM7XHJcbiAgZGF0YTogYW55W107XHJcbiAgc2xvdHM6IGFueVtdO1xyXG4gIGNvbG9yczogQ29sb3JIZWxwZXI7XHJcbiAgdHJhbnNmb3JtOiBzdHJpbmc7XHJcbiAgZG9tYWluOiBhbnlbXTtcclxuICBtYXJnaW4gPSBbMTAsIDEwLCAxMCwgMTBdO1xyXG5cclxuICBiYWNrZ3JvdW5kQ2FyZHM6IGFueVtdO1xyXG5cclxuICBnZXQgY2xpY2thYmxlKCkge1xyXG4gICAgcmV0dXJuICEhdGhpcy5zZWxlY3Qub2JzZXJ2ZXJzLmxlbmd0aDtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIHN1cGVyLnVwZGF0ZSgpO1xyXG5cclxuICAgIHRoaXMuZGltcyA9IGNhbGN1bGF0ZVZpZXdEaW1lbnNpb25zKHtcclxuICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXHJcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXHJcbiAgICAgIG1hcmdpbnM6IHRoaXMubWFyZ2luXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmZvcm1hdERhdGVzKCk7XHJcblxyXG4gICAgdGhpcy5kb21haW4gPSB0aGlzLmdldERvbWFpbigpO1xyXG5cclxuICAgIHRoaXMuc2V0Q29sb3JzKCk7XHJcbiAgICB0aGlzLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt0aGlzLmRpbXMueE9mZnNldH0gLCAke3RoaXMubWFyZ2luWzBdfSlgO1xyXG5cclxuICAgIGNvbnN0IHNpemUgPSBncmlkU2l6ZSh0aGlzLmRpbXMsIHRoaXMucmVzdWx0cy5sZW5ndGgsIDE1MCk7XHJcbiAgICBjb25zdCBOID0gc2l6ZVswXSAqIHNpemVbMV07XHJcblxyXG4gICAgY29uc3QgZGF0YSA9IHRoaXMucmVzdWx0cy5zbGljZSgpO1xyXG5cclxuICAgIHdoaWxlIChkYXRhLmxlbmd0aCA8IE4pIHtcclxuICAgICAgZGF0YS5wdXNoKHsgdmFsdWU6IG51bGwgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kYXRhID0gZ3JpZExheW91dCh0aGlzLmRpbXMsIGRhdGEsIDE1MCwgdGhpcy5kZXNpZ25hdGVkVG90YWwpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RG9tYWluKCk6IGFueVtdIHtcclxuICAgIHJldHVybiB0aGlzLnJlc3VsdHMubWFwKGQgPT4gZC5sYWJlbCk7XHJcbiAgfVxyXG5cclxuICBvbkNsaWNrKGRhdGEpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XHJcbiAgfVxyXG5cclxuICBzZXRDb2xvcnMoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNvbG9ycyA9IG5ldyBDb2xvckhlbHBlcih0aGlzLnNjaGVtZSwgJ29yZGluYWwnLCB0aGlzLmRvbWFpbiwgdGhpcy5jdXN0b21Db2xvcnMpO1xyXG4gIH1cclxufVxyXG4iXX0=