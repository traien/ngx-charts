import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, SimpleChanges, ElementRef, OnChanges, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { select } from 'd3-selection';
import { id } from '../utils/id';
let HeatMapCellComponent = class HeatMapCellComponent {
    constructor(element) {
        this.gradient = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.transform = `translate(${this.x} , ${this.y})`;
        this.startOpacity = 0.3;
        this.gradientId = 'grad' + id().toString();
        this.gradientUrl = `url(#${this.gradientId})`;
        this.gradientStops = this.getGradientStops();
        if (this.animations) {
            this.loadAnimation();
        }
    }
    getGradientStops() {
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: this.startOpacity
            },
            {
                offset: 100,
                color: this.fill,
                opacity: 1
            }
        ];
    }
    loadAnimation() {
        const node = select(this.element).select('.cell');
        node.attr('opacity', 0);
        this.animateToCurrentForm();
    }
    animateToCurrentForm() {
        const node = select(this.element).select('.cell');
        node
            .transition()
            .duration(750)
            .attr('opacity', 1);
    }
    onClick() {
        this.select.emit(this.data);
    }
    onMouseEnter() {
        this.activate.emit(this.data);
    }
    onMouseLeave() {
        this.deactivate.emit(this.data);
    }
};
HeatMapCellComponent.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], HeatMapCellComponent.prototype, "fill", void 0);
__decorate([
    Input()
], HeatMapCellComponent.prototype, "x", void 0);
__decorate([
    Input()
], HeatMapCellComponent.prototype, "y", void 0);
__decorate([
    Input()
], HeatMapCellComponent.prototype, "width", void 0);
__decorate([
    Input()
], HeatMapCellComponent.prototype, "height", void 0);
__decorate([
    Input()
], HeatMapCellComponent.prototype, "data", void 0);
__decorate([
    Input()
], HeatMapCellComponent.prototype, "label", void 0);
__decorate([
    Input()
], HeatMapCellComponent.prototype, "gradient", void 0);
__decorate([
    Input()
], HeatMapCellComponent.prototype, "animations", void 0);
__decorate([
    Output()
], HeatMapCellComponent.prototype, "select", void 0);
__decorate([
    Output()
], HeatMapCellComponent.prototype, "activate", void 0);
__decorate([
    Output()
], HeatMapCellComponent.prototype, "deactivate", void 0);
__decorate([
    HostListener('mouseenter')
], HeatMapCellComponent.prototype, "onMouseEnter", null);
__decorate([
    HostListener('mouseleave')
], HeatMapCellComponent.prototype, "onMouseLeave", null);
HeatMapCellComponent = __decorate([
    Component({
        selector: 'g[ngx-charts-heat-map-cell]',
        template: `
    <svg:g [attr.transform]="transform" class="cell">
      <defs *ngIf="gradient">
        <svg:g ngx-charts-svg-linear-gradient orientation="vertical" [name]="gradientId" [stops]="gradientStops" />
      </defs>
      <svg:rect
        [attr.fill]="gradient ? gradientUrl : fill"
        rx="3"
        [attr.width]="width"
        [attr.height]="height"
        class="cell"
        style="cursor: pointer"
        (click)="onClick()"
      />
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], HeatMapCellComponent);
export { HeatMapCellComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhdC1tYXAtY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9oZWF0LW1hcC9oZWF0LW1hcC1jZWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixhQUFhLEVBQ2IsVUFBVSxFQUNWLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFdEMsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQXNCakMsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7SUF1Qi9CLFlBQVksT0FBbUI7UUFmdEIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTFCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBV3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUN2QyxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUVwRCxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sR0FBRyxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDO1FBQzlDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFN0MsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN0QjtJQUNILENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxPQUFPO1lBQ0w7Z0JBQ0UsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNoQixPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVk7YUFDM0I7WUFDRDtnQkFDRSxNQUFNLEVBQUUsR0FBRztnQkFDWCxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2hCLE9BQU8sRUFBRSxDQUFDO2FBQ1g7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELGFBQWE7UUFDWCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsb0JBQW9CO1FBQ2xCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWxELElBQUk7YUFDRCxVQUFVLEVBQUU7YUFDWixRQUFRLENBQUMsR0FBRyxDQUFDO2FBQ2IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBR0QsWUFBWTtRQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBR0QsWUFBWTtRQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0NBQ0YsQ0FBQTs7WUE1RHNCLFVBQVU7O0FBdEJ0QjtJQUFSLEtBQUssRUFBRTtrREFBTTtBQUNMO0lBQVIsS0FBSyxFQUFFOytDQUFHO0FBQ0Y7SUFBUixLQUFLLEVBQUU7K0NBQUc7QUFDRjtJQUFSLEtBQUssRUFBRTttREFBTztBQUNOO0lBQVIsS0FBSyxFQUFFO29EQUFRO0FBQ1A7SUFBUixLQUFLLEVBQUU7a0RBQU07QUFDTDtJQUFSLEtBQUssRUFBRTttREFBTztBQUNOO0lBQVIsS0FBSyxFQUFFO3NEQUEyQjtBQUMxQjtJQUFSLEtBQUssRUFBRTt3REFBNEI7QUFFMUI7SUFBVCxNQUFNLEVBQUU7b0RBQTZCO0FBQzVCO0lBQVQsTUFBTSxFQUFFO3NEQUErQjtBQUM5QjtJQUFULE1BQU0sRUFBRTt3REFBaUM7QUE4RDFDO0lBREMsWUFBWSxDQUFDLFlBQVksQ0FBQzt3REFHMUI7QUFHRDtJQURDLFlBQVksQ0FBQyxZQUFZLENBQUM7d0RBRzFCO0FBbEZVLG9CQUFvQjtJQXBCaEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDZCQUE2QjtRQUN2QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7OztHQWVUO1FBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07S0FDaEQsQ0FBQztHQUNXLG9CQUFvQixDQW1GaEM7U0FuRlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIEhvc3RMaXN0ZW5lclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBzZWxlY3QgfSBmcm9tICdkMy1zZWxlY3Rpb24nO1xyXG5cclxuaW1wb3J0IHsgaWQgfSBmcm9tICcuLi91dGlscy9pZCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1oZWF0LW1hcC1jZWxsXScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxzdmc6ZyBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtXCIgY2xhc3M9XCJjZWxsXCI+XHJcbiAgICAgIDxkZWZzICpuZ0lmPVwiZ3JhZGllbnRcIj5cclxuICAgICAgICA8c3ZnOmcgbmd4LWNoYXJ0cy1zdmctbGluZWFyLWdyYWRpZW50IG9yaWVudGF0aW9uPVwidmVydGljYWxcIiBbbmFtZV09XCJncmFkaWVudElkXCIgW3N0b3BzXT1cImdyYWRpZW50U3RvcHNcIiAvPlxyXG4gICAgICA8L2RlZnM+XHJcbiAgICAgIDxzdmc6cmVjdFxyXG4gICAgICAgIFthdHRyLmZpbGxdPVwiZ3JhZGllbnQgPyBncmFkaWVudFVybCA6IGZpbGxcIlxyXG4gICAgICAgIHJ4PVwiM1wiXHJcbiAgICAgICAgW2F0dHIud2lkdGhdPVwid2lkdGhcIlxyXG4gICAgICAgIFthdHRyLmhlaWdodF09XCJoZWlnaHRcIlxyXG4gICAgICAgIGNsYXNzPVwiY2VsbFwiXHJcbiAgICAgICAgc3R5bGU9XCJjdXJzb3I6IHBvaW50ZXJcIlxyXG4gICAgICAgIChjbGljayk9XCJvbkNsaWNrKClcIlxyXG4gICAgICAvPlxyXG4gICAgPC9zdmc6Zz5cclxuICBgLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBIZWF0TWFwQ2VsbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgZmlsbDtcclxuICBASW5wdXQoKSB4O1xyXG4gIEBJbnB1dCgpIHk7XHJcbiAgQElucHV0KCkgd2lkdGg7XHJcbiAgQElucHV0KCkgaGVpZ2h0O1xyXG4gIEBJbnB1dCgpIGRhdGE7XHJcbiAgQElucHV0KCkgbGFiZWw7XHJcbiAgQElucHV0KCkgZ3JhZGllbnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSBhbmltYXRpb25zOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gIHRyYW5zZm9ybTogc3RyaW5nO1xyXG4gIGFjdGl2ZVJhbmdlOiBhbnlbXTtcclxuICBzdGFydE9wYWNpdHk6IG51bWJlcjtcclxuICBncmFkaWVudElkOiBzdHJpbmc7XHJcbiAgZ3JhZGllbnRVcmw6IHN0cmluZztcclxuICBncmFkaWVudFN0b3BzOiBhbnlbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZikge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgdGhpcy50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7dGhpcy54fSAsICR7dGhpcy55fSlgO1xyXG5cclxuICAgIHRoaXMuc3RhcnRPcGFjaXR5ID0gMC4zO1xyXG4gICAgdGhpcy5ncmFkaWVudElkID0gJ2dyYWQnICsgaWQoKS50b1N0cmluZygpO1xyXG4gICAgdGhpcy5ncmFkaWVudFVybCA9IGB1cmwoIyR7dGhpcy5ncmFkaWVudElkfSlgO1xyXG4gICAgdGhpcy5ncmFkaWVudFN0b3BzID0gdGhpcy5nZXRHcmFkaWVudFN0b3BzKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuYW5pbWF0aW9ucykge1xyXG4gICAgICB0aGlzLmxvYWRBbmltYXRpb24oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldEdyYWRpZW50U3RvcHMoKSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICB7XHJcbiAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgIGNvbG9yOiB0aGlzLmZpbGwsXHJcbiAgICAgICAgb3BhY2l0eTogdGhpcy5zdGFydE9wYWNpdHlcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIG9mZnNldDogMTAwLFxyXG4gICAgICAgIGNvbG9yOiB0aGlzLmZpbGwsXHJcbiAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICB9XHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgbG9hZEFuaW1hdGlvbigpOiB2b2lkIHtcclxuICAgIGNvbnN0IG5vZGUgPSBzZWxlY3QodGhpcy5lbGVtZW50KS5zZWxlY3QoJy5jZWxsJyk7XHJcbiAgICBub2RlLmF0dHIoJ29wYWNpdHknLCAwKTtcclxuICAgIHRoaXMuYW5pbWF0ZVRvQ3VycmVudEZvcm0oKTtcclxuICB9XHJcblxyXG4gIGFuaW1hdGVUb0N1cnJlbnRGb3JtKCk6IHZvaWQge1xyXG4gICAgY29uc3Qgbm9kZSA9IHNlbGVjdCh0aGlzLmVsZW1lbnQpLnNlbGVjdCgnLmNlbGwnKTtcclxuXHJcbiAgICBub2RlXHJcbiAgICAgIC50cmFuc2l0aW9uKClcclxuICAgICAgLmR1cmF0aW9uKDc1MClcclxuICAgICAgLmF0dHIoJ29wYWNpdHknLCAxKTtcclxuICB9XHJcblxyXG4gIG9uQ2xpY2soKSB7XHJcbiAgICB0aGlzLnNlbGVjdC5lbWl0KHRoaXMuZGF0YSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcclxuICBvbk1vdXNlRW50ZXIoKTogdm9pZCB7XHJcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQodGhpcy5kYXRhKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxyXG4gIG9uTW91c2VMZWF2ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuZGVhY3RpdmF0ZS5lbWl0KHRoaXMuZGF0YSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==