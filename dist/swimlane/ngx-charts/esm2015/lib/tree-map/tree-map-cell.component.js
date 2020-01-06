import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { select } from 'd3-selection';
import { invertColor } from '../utils/color-utils';
import { trimLabel } from '../common/trim-label.helper';
import { escapeLabel } from '../common/label.helper';
import { id } from '../utils/id';
let TreeMapCellComponent = class TreeMapCellComponent {
    constructor(element) {
        this.gradient = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    ngOnChanges() {
        this.update();
        this.valueFormatting = this.valueFormatting || (value => value.toLocaleString());
        const labelFormatting = this.labelFormatting || (cell => escapeLabel(trimLabel(cell.label, 55)));
        const cellData = {
            data: this.data,
            label: this.label,
            value: this.value
        };
        this.formattedValue = this.valueFormatting(cellData.value);
        this.formattedLabel = labelFormatting(cellData);
        this.gradientId = 'grad' + id().toString();
        this.gradientUrl = `url(#${this.gradientId})`;
        this.gradientStops = this.getGradientStops();
    }
    update() {
        if (this.initialized) {
            this.animateToCurrentForm();
        }
        else {
            if (this.animations) {
                this.loadAnimation();
            }
            this.initialized = true;
        }
    }
    loadAnimation() {
        const node = select(this.element).select('.cell');
        node
            .attr('opacity', 0)
            .attr('x', this.x)
            .attr('y', this.y);
        this.animateToCurrentForm();
    }
    getTextColor() {
        return invertColor(this.fill);
    }
    animateToCurrentForm() {
        const node = select(this.element).select('.cell');
        if (this.animations) {
            node
                .transition()
                .duration(750)
                .attr('opacity', 1)
                .attr('x', this.x)
                .attr('y', this.y)
                .attr('width', this.width)
                .attr('height', this.height);
        }
        else {
            node
                .attr('opacity', 1)
                .attr('x', this.x)
                .attr('y', this.y)
                .attr('width', this.width)
                .attr('height', this.height);
        }
    }
    onClick() {
        this.select.emit(this.data);
    }
    getGradientStops() {
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: 0.3
            },
            {
                offset: 100,
                color: this.fill,
                opacity: 1
            }
        ];
    }
};
TreeMapCellComponent.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], TreeMapCellComponent.prototype, "data", void 0);
__decorate([
    Input()
], TreeMapCellComponent.prototype, "fill", void 0);
__decorate([
    Input()
], TreeMapCellComponent.prototype, "x", void 0);
__decorate([
    Input()
], TreeMapCellComponent.prototype, "y", void 0);
__decorate([
    Input()
], TreeMapCellComponent.prototype, "width", void 0);
__decorate([
    Input()
], TreeMapCellComponent.prototype, "height", void 0);
__decorate([
    Input()
], TreeMapCellComponent.prototype, "label", void 0);
__decorate([
    Input()
], TreeMapCellComponent.prototype, "value", void 0);
__decorate([
    Input()
], TreeMapCellComponent.prototype, "valueType", void 0);
__decorate([
    Input()
], TreeMapCellComponent.prototype, "valueFormatting", void 0);
__decorate([
    Input()
], TreeMapCellComponent.prototype, "labelFormatting", void 0);
__decorate([
    Input()
], TreeMapCellComponent.prototype, "gradient", void 0);
__decorate([
    Input()
], TreeMapCellComponent.prototype, "animations", void 0);
__decorate([
    Output()
], TreeMapCellComponent.prototype, "select", void 0);
TreeMapCellComponent = __decorate([
    Component({
        selector: 'g[ngx-charts-tree-map-cell]',
        template: `
    <svg:g>
      <defs *ngIf="gradient">
        <svg:g ngx-charts-svg-linear-gradient orientation="vertical" [name]="gradientId" [stops]="gradientStops" />
      </defs>
      <svg:rect
        [attr.fill]="gradient ? gradientUrl : fill"
        [attr.width]="width"
        [attr.height]="height"
        [attr.x]="x"
        [attr.y]="y"
        [style.cursor]="'pointer'"
        class="cell"
        (click)="onClick()"
      />
      <svg:foreignObject
        *ngIf="width >= 70 && height >= 35"
        [attr.x]="x"
        [attr.y]="y"
        [attr.width]="width"
        [attr.height]="height"
        class="treemap-label"
        [style.pointer-events]="'none'"
      >
        <xhtml:p [style.color]="getTextColor()" [style.height]="height + 'px'" [style.width]="width + 'px'">
          <xhtml:span class="treemap-label" [innerHTML]="formattedLabel"> </xhtml:span>
          <xhtml:br />
          <xhtml:span
            *ngIf="animations"
            class="treemap-val"
            ngx-charts-count-up
            [countTo]="value"
            [valueFormatting]="valueFormatting"
          >
          </xhtml:span>
          <xhtml:span *ngIf="!animations" class="treemap-val">
            {{ formattedValue }}
          </xhtml:span>
        </xhtml:p>
      </svg:foreignObject>
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], TreeMapCellComponent);
export { TreeMapCellComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1tYXAtY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi90cmVlLW1hcC90cmVlLW1hcC1jZWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZILE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFdEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQWdEakMsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7SUEyQi9CLFlBQVksT0FBbUI7UUFmdEIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTFCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBVXRDLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBRzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUN2QyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVkLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7UUFDakYsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLElBQUks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QzlCLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxPQUFPO1lBQ0w7Z0JBQ0UsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNoQixPQUFPLEVBQUUsR0FBRzthQUNiO1lBQ0Q7Z0JBQ0UsTUFBTSxFQUFFLEdBQUc7Z0JBQ1gsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNoQixPQUFPLEVBQUUsQ0FBQzthQUNYO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBOztZQTFGc0IsVUFBVTs7QUExQnRCO0lBQVIsS0FBSyxFQUFFO2tEQUFNO0FBQ0w7SUFBUixLQUFLLEVBQUU7a0RBQU07QUFDTDtJQUFSLEtBQUssRUFBRTsrQ0FBRztBQUNGO0lBQVIsS0FBSyxFQUFFOytDQUFHO0FBQ0Y7SUFBUixLQUFLLEVBQUU7bURBQU87QUFDTjtJQUFSLEtBQUssRUFBRTtvREFBUTtBQUNQO0lBQVIsS0FBSyxFQUFFO21EQUFPO0FBQ047SUFBUixLQUFLLEVBQUU7bURBQU87QUFDTjtJQUFSLEtBQUssRUFBRTt1REFBVztBQUNWO0lBQVIsS0FBSyxFQUFFOzZEQUFzQjtBQUNyQjtJQUFSLEtBQUssRUFBRTs2REFBc0I7QUFDckI7SUFBUixLQUFLLEVBQUU7c0RBQTJCO0FBQzFCO0lBQVIsS0FBSyxFQUFFO3dEQUE0QjtBQUUxQjtJQUFULE1BQU0sRUFBRTtvREFBNkI7QUFmM0Isb0JBQW9CO0lBOUNoQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsNkJBQTZCO1FBQ3ZDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Q1Q7UUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtLQUNoRCxDQUFDO0dBQ1csb0JBQW9CLENBcUhoQztTQXJIWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgT25DaGFuZ2VzLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBzZWxlY3QgfSBmcm9tICdkMy1zZWxlY3Rpb24nO1xyXG5cclxuaW1wb3J0IHsgaW52ZXJ0Q29sb3IgfSBmcm9tICcuLi91dGlscy9jb2xvci11dGlscyc7XHJcbmltcG9ydCB7IHRyaW1MYWJlbCB9IGZyb20gJy4uL2NvbW1vbi90cmltLWxhYmVsLmhlbHBlcic7XHJcbmltcG9ydCB7IGVzY2FwZUxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsLmhlbHBlcic7XHJcbmltcG9ydCB7IGlkIH0gZnJvbSAnLi4vdXRpbHMvaWQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtdHJlZS1tYXAtY2VsbF0nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8c3ZnOmc+XHJcbiAgICAgIDxkZWZzICpuZ0lmPVwiZ3JhZGllbnRcIj5cclxuICAgICAgICA8c3ZnOmcgbmd4LWNoYXJ0cy1zdmctbGluZWFyLWdyYWRpZW50IG9yaWVudGF0aW9uPVwidmVydGljYWxcIiBbbmFtZV09XCJncmFkaWVudElkXCIgW3N0b3BzXT1cImdyYWRpZW50U3RvcHNcIiAvPlxyXG4gICAgICA8L2RlZnM+XHJcbiAgICAgIDxzdmc6cmVjdFxyXG4gICAgICAgIFthdHRyLmZpbGxdPVwiZ3JhZGllbnQgPyBncmFkaWVudFVybCA6IGZpbGxcIlxyXG4gICAgICAgIFthdHRyLndpZHRoXT1cIndpZHRoXCJcclxuICAgICAgICBbYXR0ci5oZWlnaHRdPVwiaGVpZ2h0XCJcclxuICAgICAgICBbYXR0ci54XT1cInhcIlxyXG4gICAgICAgIFthdHRyLnldPVwieVwiXHJcbiAgICAgICAgW3N0eWxlLmN1cnNvcl09XCIncG9pbnRlcidcIlxyXG4gICAgICAgIGNsYXNzPVwiY2VsbFwiXHJcbiAgICAgICAgKGNsaWNrKT1cIm9uQ2xpY2soKVwiXHJcbiAgICAgIC8+XHJcbiAgICAgIDxzdmc6Zm9yZWlnbk9iamVjdFxyXG4gICAgICAgICpuZ0lmPVwid2lkdGggPj0gNzAgJiYgaGVpZ2h0ID49IDM1XCJcclxuICAgICAgICBbYXR0ci54XT1cInhcIlxyXG4gICAgICAgIFthdHRyLnldPVwieVwiXHJcbiAgICAgICAgW2F0dHIud2lkdGhdPVwid2lkdGhcIlxyXG4gICAgICAgIFthdHRyLmhlaWdodF09XCJoZWlnaHRcIlxyXG4gICAgICAgIGNsYXNzPVwidHJlZW1hcC1sYWJlbFwiXHJcbiAgICAgICAgW3N0eWxlLnBvaW50ZXItZXZlbnRzXT1cIidub25lJ1wiXHJcbiAgICAgID5cclxuICAgICAgICA8eGh0bWw6cCBbc3R5bGUuY29sb3JdPVwiZ2V0VGV4dENvbG9yKClcIiBbc3R5bGUuaGVpZ2h0XT1cImhlaWdodCArICdweCdcIiBbc3R5bGUud2lkdGhdPVwid2lkdGggKyAncHgnXCI+XHJcbiAgICAgICAgICA8eGh0bWw6c3BhbiBjbGFzcz1cInRyZWVtYXAtbGFiZWxcIiBbaW5uZXJIVE1MXT1cImZvcm1hdHRlZExhYmVsXCI+IDwveGh0bWw6c3Bhbj5cclxuICAgICAgICAgIDx4aHRtbDpiciAvPlxyXG4gICAgICAgICAgPHhodG1sOnNwYW5cclxuICAgICAgICAgICAgKm5nSWY9XCJhbmltYXRpb25zXCJcclxuICAgICAgICAgICAgY2xhc3M9XCJ0cmVlbWFwLXZhbFwiXHJcbiAgICAgICAgICAgIG5neC1jaGFydHMtY291bnQtdXBcclxuICAgICAgICAgICAgW2NvdW50VG9dPVwidmFsdWVcIlxyXG4gICAgICAgICAgICBbdmFsdWVGb3JtYXR0aW5nXT1cInZhbHVlRm9ybWF0dGluZ1wiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICA8L3hodG1sOnNwYW4+XHJcbiAgICAgICAgICA8eGh0bWw6c3BhbiAqbmdJZj1cIiFhbmltYXRpb25zXCIgY2xhc3M9XCJ0cmVlbWFwLXZhbFwiPlxyXG4gICAgICAgICAgICB7eyBmb3JtYXR0ZWRWYWx1ZSB9fVxyXG4gICAgICAgICAgPC94aHRtbDpzcGFuPlxyXG4gICAgICAgIDwveGh0bWw6cD5cclxuICAgICAgPC9zdmc6Zm9yZWlnbk9iamVjdD5cclxuICAgIDwvc3ZnOmc+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVHJlZU1hcENlbGxDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIGRhdGE7XHJcbiAgQElucHV0KCkgZmlsbDtcclxuICBASW5wdXQoKSB4O1xyXG4gIEBJbnB1dCgpIHk7XHJcbiAgQElucHV0KCkgd2lkdGg7XHJcbiAgQElucHV0KCkgaGVpZ2h0O1xyXG4gIEBJbnB1dCgpIGxhYmVsO1xyXG4gIEBJbnB1dCgpIHZhbHVlO1xyXG4gIEBJbnB1dCgpIHZhbHVlVHlwZTtcclxuICBASW5wdXQoKSB2YWx1ZUZvcm1hdHRpbmc6IGFueTtcclxuICBASW5wdXQoKSBsYWJlbEZvcm1hdHRpbmc6IGFueTtcclxuICBASW5wdXQoKSBncmFkaWVudDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGFuaW1hdGlvbnM6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBncmFkaWVudFN0b3BzOiBhbnlbXTtcclxuICBncmFkaWVudElkOiBzdHJpbmc7XHJcbiAgZ3JhZGllbnRVcmw6IHN0cmluZztcclxuXHJcbiAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgdHJhbnNmb3JtOiBzdHJpbmc7XHJcbiAgZm9ybWF0dGVkTGFiZWw6IHN0cmluZztcclxuICBmb3JtYXR0ZWRWYWx1ZTogc3RyaW5nO1xyXG4gIGluaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuXHJcbiAgICB0aGlzLnZhbHVlRm9ybWF0dGluZyA9IHRoaXMudmFsdWVGb3JtYXR0aW5nIHx8ICh2YWx1ZSA9PiB2YWx1ZS50b0xvY2FsZVN0cmluZygpKTtcclxuICAgIGNvbnN0IGxhYmVsRm9ybWF0dGluZyA9IHRoaXMubGFiZWxGb3JtYXR0aW5nIHx8IChjZWxsID0+IGVzY2FwZUxhYmVsKHRyaW1MYWJlbChjZWxsLmxhYmVsLCA1NSkpKTtcclxuXHJcbiAgICBjb25zdCBjZWxsRGF0YSA9IHtcclxuICAgICAgZGF0YTogdGhpcy5kYXRhLFxyXG4gICAgICBsYWJlbDogdGhpcy5sYWJlbCxcclxuICAgICAgdmFsdWU6IHRoaXMudmFsdWVcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5mb3JtYXR0ZWRWYWx1ZSA9IHRoaXMudmFsdWVGb3JtYXR0aW5nKGNlbGxEYXRhLnZhbHVlKTtcclxuICAgIHRoaXMuZm9ybWF0dGVkTGFiZWwgPSBsYWJlbEZvcm1hdHRpbmcoY2VsbERhdGEpO1xyXG5cclxuICAgIHRoaXMuZ3JhZGllbnRJZCA9ICdncmFkJyArIGlkKCkudG9TdHJpbmcoKTtcclxuICAgIHRoaXMuZ3JhZGllbnRVcmwgPSBgdXJsKCMke3RoaXMuZ3JhZGllbnRJZH0pYDtcclxuICAgIHRoaXMuZ3JhZGllbnRTdG9wcyA9IHRoaXMuZ2V0R3JhZGllbnRTdG9wcygpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgdGhpcy5hbmltYXRlVG9DdXJyZW50Rm9ybSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuYW5pbWF0aW9ucykge1xyXG4gICAgICAgIHRoaXMubG9hZEFuaW1hdGlvbigpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbG9hZEFuaW1hdGlvbigpOiB2b2lkIHtcclxuICAgIGNvbnN0IG5vZGUgPSBzZWxlY3QodGhpcy5lbGVtZW50KS5zZWxlY3QoJy5jZWxsJyk7XHJcblxyXG4gICAgbm9kZVxyXG4gICAgICAuYXR0cignb3BhY2l0eScsIDApXHJcbiAgICAgIC5hdHRyKCd4JywgdGhpcy54KVxyXG4gICAgICAuYXR0cigneScsIHRoaXMueSk7XHJcblxyXG4gICAgdGhpcy5hbmltYXRlVG9DdXJyZW50Rm9ybSgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VGV4dENvbG9yKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gaW52ZXJ0Q29sb3IodGhpcy5maWxsKTtcclxuICB9XHJcblxyXG4gIGFuaW1hdGVUb0N1cnJlbnRGb3JtKCk6IHZvaWQge1xyXG4gICAgY29uc3Qgbm9kZSA9IHNlbGVjdCh0aGlzLmVsZW1lbnQpLnNlbGVjdCgnLmNlbGwnKTtcclxuXHJcbiAgICBpZiAodGhpcy5hbmltYXRpb25zKSB7XHJcbiAgICAgIG5vZGVcclxuICAgICAgICAudHJhbnNpdGlvbigpXHJcbiAgICAgICAgLmR1cmF0aW9uKDc1MClcclxuICAgICAgICAuYXR0cignb3BhY2l0eScsIDEpXHJcbiAgICAgICAgLmF0dHIoJ3gnLCB0aGlzLngpXHJcbiAgICAgICAgLmF0dHIoJ3knLCB0aGlzLnkpXHJcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy53aWR0aClcclxuICAgICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbm9kZVxyXG4gICAgICAgIC5hdHRyKCdvcGFjaXR5JywgMSlcclxuICAgICAgICAuYXR0cigneCcsIHRoaXMueClcclxuICAgICAgICAuYXR0cigneScsIHRoaXMueSlcclxuICAgICAgICAuYXR0cignd2lkdGgnLCB0aGlzLndpZHRoKVxyXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkNsaWNrKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3QuZW1pdCh0aGlzLmRhdGEpO1xyXG4gIH1cclxuXHJcbiAgZ2V0R3JhZGllbnRTdG9wcygpIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIHtcclxuICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgY29sb3I6IHRoaXMuZmlsbCxcclxuICAgICAgICBvcGFjaXR5OiAwLjNcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIG9mZnNldDogMTAwLFxyXG4gICAgICAgIGNvbG9yOiB0aGlzLmZpbGwsXHJcbiAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICB9XHJcbiAgICBdO1xyXG4gIH1cclxufVxyXG4iXX0=