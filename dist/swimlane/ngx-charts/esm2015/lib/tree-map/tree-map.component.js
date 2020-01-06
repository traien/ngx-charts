import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { treemap, stratify } from 'd3-hierarchy';
import { BaseChartComponent } from '../common/base-chart.component';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
let TreeMapComponent = class TreeMapComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.tooltipDisabled = false;
        this.gradient = false;
        this.select = new EventEmitter();
        this.margin = [10, 10, 10, 10];
    }
    update() {
        super.update();
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin
        });
        this.domain = this.getDomain();
        this.treemap = treemap().size([this.dims.width, this.dims.height]);
        const rootNode = {
            name: 'root',
            value: 0,
            isRoot: true
        };
        const root = stratify()
            .id(d => {
            let label = d.name;
            if (label.constructor.name === 'Date') {
                label = label.toLocaleDateString();
            }
            else {
                label = label.toLocaleString();
            }
            return label;
        })
            .parentId(d => (d.isRoot ? null : 'root'))([rootNode, ...this.results])
            .sum(d => d.value);
        this.data = this.treemap(root);
        this.setColors();
        this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
    }
    getDomain() {
        return this.results.map(d => d.name);
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
], TreeMapComponent.prototype, "results", void 0);
__decorate([
    Input()
], TreeMapComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    Input()
], TreeMapComponent.prototype, "valueFormatting", void 0);
__decorate([
    Input()
], TreeMapComponent.prototype, "labelFormatting", void 0);
__decorate([
    Input()
], TreeMapComponent.prototype, "gradient", void 0);
__decorate([
    Output()
], TreeMapComponent.prototype, "select", void 0);
__decorate([
    ContentChild('tooltipTemplate')
], TreeMapComponent.prototype, "tooltipTemplate", void 0);
TreeMapComponent = __decorate([
    Component({
        selector: 'ngx-charts-tree-map',
        template: `
    <ngx-charts-chart [view]="[width, height]" [showLegend]="false" [animations]="animations">
      <svg:g [attr.transform]="transform" class="tree-map chart">
        <svg:g
          ngx-charts-tree-map-cell-series
          [colors]="colors"
          [data]="data"
          [dims]="dims"
          [tooltipDisabled]="tooltipDisabled"
          [tooltipTemplate]="tooltipTemplate"
          [valueFormatting]="valueFormatting"
          [labelFormatting]="labelFormatting"
          [gradient]="gradient"
          [animations]="animations"
          (select)="onClick($event)"
        />
      </svg:g>
    </ngx-charts-chart>
  `,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".tree-map .treemap-val{font-size:1.3em;padding-top:5px;display:inline-block}.tree-map .treemap-label p{display:table-cell;text-align:center;line-height:1.2em;vertical-align:middle}"]
    })
], TreeMapComponent);
export { TreeMapComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1tYXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvdHJlZS1tYXAvdHJlZS1tYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsWUFBWSxFQUViLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRWpELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQTJCckQsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBaUIsU0FBUSxrQkFBa0I7SUFBeEQ7O1FBRVcsb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFHakMsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUV6QixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVV0QyxXQUFNLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQXFENUIsQ0FBQztJQW5EQyxNQUFNO1FBQ0osS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWYsSUFBSSxDQUFDLElBQUksR0FBRyx1QkFBdUIsQ0FBQztZQUNsQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNyQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUUvQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sRUFBTyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUV4RSxNQUFNLFFBQVEsR0FBRztZQUNmLElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLENBQUM7WUFDUixNQUFNLEVBQUUsSUFBSTtTQUNiLENBQUM7UUFFRixNQUFNLElBQUksR0FBRyxRQUFRLEVBQU87YUFDekIsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ04sSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUVuQixJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtnQkFDckMsS0FBSyxHQUFHLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2FBQ3BDO2lCQUFNO2dCQUNMLEtBQUssR0FBRyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDaEM7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQzthQUNELFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3RFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVyQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFL0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDekUsQ0FBQztJQUVELFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBSTtRQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN4RixDQUFDO0NBQ0YsQ0FBQTtBQXJFVTtJQUFSLEtBQUssRUFBRTtpREFBUztBQUNSO0lBQVIsS0FBSyxFQUFFO3lEQUFrQztBQUNqQztJQUFSLEtBQUssRUFBRTt5REFBc0I7QUFDckI7SUFBUixLQUFLLEVBQUU7eURBQXNCO0FBQ3JCO0lBQVIsS0FBSyxFQUFFO2tEQUEyQjtBQUV6QjtJQUFULE1BQU0sRUFBRTtnREFBNkI7QUFFTDtJQUFoQyxZQUFZLENBQUMsaUJBQWlCLENBQUM7eURBQW1DO0FBVHhELGdCQUFnQjtJQXpCNUIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCVDtRQUVELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1FBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztLQUNoRCxDQUFDO0dBQ1csZ0JBQWdCLENBc0U1QjtTQXRFWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBUZW1wbGF0ZVJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyB0cmVlbWFwLCBzdHJhdGlmeSB9IGZyb20gJ2QzLWhpZXJhcmNoeSc7XHJcblxyXG5pbXBvcnQgeyBCYXNlQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuLi9jb21tb24vYmFzZS1jaGFydC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucyB9IGZyb20gJy4uL2NvbW1vbi92aWV3LWRpbWVuc2lvbnMuaGVscGVyJztcclxuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY29sb3IuaGVscGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LWNoYXJ0cy10cmVlLW1hcCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZ3gtY2hhcnRzLWNoYXJ0IFt2aWV3XT1cIlt3aWR0aCwgaGVpZ2h0XVwiIFtzaG93TGVnZW5kXT1cImZhbHNlXCIgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiPlxyXG4gICAgICA8c3ZnOmcgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybVwiIGNsYXNzPVwidHJlZS1tYXAgY2hhcnRcIj5cclxuICAgICAgICA8c3ZnOmdcclxuICAgICAgICAgIG5neC1jaGFydHMtdHJlZS1tYXAtY2VsbC1zZXJpZXNcclxuICAgICAgICAgIFtjb2xvcnNdPVwiY29sb3JzXCJcclxuICAgICAgICAgIFtkYXRhXT1cImRhdGFcIlxyXG4gICAgICAgICAgW2RpbXNdPVwiZGltc1wiXHJcbiAgICAgICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXHJcbiAgICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXHJcbiAgICAgICAgICBbdmFsdWVGb3JtYXR0aW5nXT1cInZhbHVlRm9ybWF0dGluZ1wiXHJcbiAgICAgICAgICBbbGFiZWxGb3JtYXR0aW5nXT1cImxhYmVsRm9ybWF0dGluZ1wiXHJcbiAgICAgICAgICBbZ3JhZGllbnRdPVwiZ3JhZGllbnRcIlxyXG4gICAgICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgICAgICAoc2VsZWN0KT1cIm9uQ2xpY2soJGV2ZW50KVwiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9zdmc6Zz5cclxuICAgIDwvbmd4LWNoYXJ0cy1jaGFydD5cclxuICBgLFxyXG4gIHN0eWxlVXJsczogWycuL3RyZWUtbWFwLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVHJlZU1hcENvbXBvbmVudCBleHRlbmRzIEJhc2VDaGFydENvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgcmVzdWx0cztcclxuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSB2YWx1ZUZvcm1hdHRpbmc6IGFueTtcclxuICBASW5wdXQoKSBsYWJlbEZvcm1hdHRpbmc6IGFueTtcclxuICBASW5wdXQoKSBncmFkaWVudDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBAQ29udGVudENoaWxkKCd0b29sdGlwVGVtcGxhdGUnKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIGRpbXM6IGFueTtcclxuICBkb21haW46IGFueTtcclxuICB0cmFuc2Zvcm06IGFueTtcclxuICBjb2xvcnM6IENvbG9ySGVscGVyO1xyXG4gIHRyZWVtYXA6IGFueTtcclxuICBkYXRhOiBhbnk7XHJcbiAgbWFyZ2luID0gWzEwLCAxMCwgMTAsIDEwXTtcclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgc3VwZXIudXBkYXRlKCk7XHJcblxyXG4gICAgdGhpcy5kaW1zID0gY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMoe1xyXG4gICAgICB3aWR0aDogdGhpcy53aWR0aCxcclxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcclxuICAgICAgbWFyZ2luczogdGhpcy5tYXJnaW5cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZG9tYWluID0gdGhpcy5nZXREb21haW4oKTtcclxuXHJcbiAgICB0aGlzLnRyZWVtYXAgPSB0cmVlbWFwPGFueT4oKS5zaXplKFt0aGlzLmRpbXMud2lkdGgsIHRoaXMuZGltcy5oZWlnaHRdKTtcclxuXHJcbiAgICBjb25zdCByb290Tm9kZSA9IHtcclxuICAgICAgbmFtZTogJ3Jvb3QnLFxyXG4gICAgICB2YWx1ZTogMCxcclxuICAgICAgaXNSb290OiB0cnVlXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJvb3QgPSBzdHJhdGlmeTxhbnk+KClcclxuICAgICAgLmlkKGQgPT4ge1xyXG4gICAgICAgIGxldCBsYWJlbCA9IGQubmFtZTtcclxuXHJcbiAgICAgICAgaWYgKGxhYmVsLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdEYXRlJykge1xyXG4gICAgICAgICAgbGFiZWwgPSBsYWJlbC50b0xvY2FsZURhdGVTdHJpbmcoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbGFiZWwgPSBsYWJlbC50b0xvY2FsZVN0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGFiZWw7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5wYXJlbnRJZChkID0+IChkLmlzUm9vdCA/IG51bGwgOiAncm9vdCcpKShbcm9vdE5vZGUsIC4uLnRoaXMucmVzdWx0c10pXHJcbiAgICAgIC5zdW0oZCA9PiBkLnZhbHVlKTtcclxuXHJcbiAgICB0aGlzLmRhdGEgPSB0aGlzLnRyZWVtYXAocm9vdCk7XHJcblxyXG4gICAgdGhpcy5zZXRDb2xvcnMoKTtcclxuXHJcbiAgICB0aGlzLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt0aGlzLmRpbXMueE9mZnNldH0gLCAke3RoaXMubWFyZ2luWzBdfSlgO1xyXG4gIH1cclxuXHJcbiAgZ2V0RG9tYWluKCk6IGFueVtdIHtcclxuICAgIHJldHVybiB0aGlzLnJlc3VsdHMubWFwKGQgPT4gZC5uYW1lKTtcclxuICB9XHJcblxyXG4gIG9uQ2xpY2soZGF0YSk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3QuZW1pdChkYXRhKTtcclxuICB9XHJcblxyXG4gIHNldENvbG9ycygpOiB2b2lkIHtcclxuICAgIHRoaXMuY29sb3JzID0gbmV3IENvbG9ySGVscGVyKHRoaXMuc2NoZW1lLCAnb3JkaW5hbCcsIHRoaXMuZG9tYWluLCB0aGlzLmN1c3RvbUNvbG9ycyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==