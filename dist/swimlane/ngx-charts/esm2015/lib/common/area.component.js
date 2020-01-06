import { __decorate } from "tslib";
import { Component, Input, Output, SimpleChanges, EventEmitter, ElementRef, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { select } from 'd3-selection';
import { id } from '../utils/id';
let AreaComponent = class AreaComponent {
    constructor(element) {
        this.opacity = 1;
        this.startOpacity = 0.5;
        this.endOpacity = 1;
        this.gradient = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.initialized = false;
        this.hasGradient = false;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        if (!this.initialized) {
            this.loadAnimation();
            this.initialized = true;
        }
        else {
            this.update();
        }
    }
    update() {
        this.gradientId = 'grad' + id().toString();
        this.gradientFill = `url(#${this.gradientId})`;
        if (this.gradient || this.stops) {
            this.gradientStops = this.getGradient();
            this.hasGradient = true;
        }
        else {
            this.hasGradient = false;
        }
        this.updatePathEl();
    }
    loadAnimation() {
        this.areaPath = this.startingPath;
        setTimeout(this.update.bind(this), 100);
    }
    updatePathEl() {
        const node = select(this.element).select('.area');
        if (this.animations) {
            node
                .transition()
                .duration(750)
                .attr('d', this.path);
        }
        else {
            node.attr('d', this.path);
        }
    }
    getGradient() {
        if (this.stops) {
            return this.stops;
        }
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: this.startOpacity
            },
            {
                offset: 100,
                color: this.fill,
                opacity: this.endOpacity
            }
        ];
    }
};
AreaComponent.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], AreaComponent.prototype, "data", void 0);
__decorate([
    Input()
], AreaComponent.prototype, "path", void 0);
__decorate([
    Input()
], AreaComponent.prototype, "startingPath", void 0);
__decorate([
    Input()
], AreaComponent.prototype, "fill", void 0);
__decorate([
    Input()
], AreaComponent.prototype, "opacity", void 0);
__decorate([
    Input()
], AreaComponent.prototype, "startOpacity", void 0);
__decorate([
    Input()
], AreaComponent.prototype, "endOpacity", void 0);
__decorate([
    Input()
], AreaComponent.prototype, "activeLabel", void 0);
__decorate([
    Input()
], AreaComponent.prototype, "gradient", void 0);
__decorate([
    Input()
], AreaComponent.prototype, "stops", void 0);
__decorate([
    Input()
], AreaComponent.prototype, "animations", void 0);
__decorate([
    Output()
], AreaComponent.prototype, "select", void 0);
AreaComponent = __decorate([
    Component({
        selector: 'g[ngx-charts-area]',
        template: `
    <svg:defs *ngIf="gradient">
      <svg:g ngx-charts-svg-linear-gradient orientation="vertical" [name]="gradientId" [stops]="gradientStops" />
    </svg:defs>
    <svg:path class="area" [attr.d]="areaPath" [attr.fill]="gradient ? gradientFill : fill" [style.opacity]="opacity" />
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], AreaComponent);
export { AreaComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJlYS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vYXJlYS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixhQUFhLEVBQ2IsWUFBWSxFQUNaLFVBQVUsRUFDVixTQUFTLEVBQ1QsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdEMsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQVlqQyxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBdUJ4QixZQUFZLE9BQW1CO1FBbEJ0QixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osaUJBQVksR0FBRyxHQUFHLENBQUM7UUFDbkIsZUFBVSxHQUFHLENBQUMsQ0FBQztRQUVmLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFFMUIsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUxQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQU10QyxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUU3QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUczQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDdkMsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7U0FDekI7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNmO0lBQ0gsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sR0FBRyxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDO1FBRS9DLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQ3pCO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztTQUMxQjtRQUVELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUNsQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELFlBQVk7UUFDVixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVsRCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSTtpQkFDRCxVQUFVLEVBQUU7aUJBQ1osUUFBUSxDQUFDLEdBQUcsQ0FBQztpQkFDYixJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QjthQUFNO1lBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDbkI7UUFFRCxPQUFPO1lBQ0w7Z0JBQ0UsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNoQixPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVk7YUFDM0I7WUFDRDtnQkFDRSxNQUFNLEVBQUUsR0FBRztnQkFDWCxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2hCLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVTthQUN6QjtTQUNGLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTs7WUEvRHNCLFVBQVU7O0FBdEJ0QjtJQUFSLEtBQUssRUFBRTsyQ0FBTTtBQUNMO0lBQVIsS0FBSyxFQUFFOzJDQUFNO0FBQ0w7SUFBUixLQUFLLEVBQUU7bURBQWM7QUFDYjtJQUFSLEtBQUssRUFBRTsyQ0FBTTtBQUNMO0lBQVIsS0FBSyxFQUFFOzhDQUFhO0FBQ1o7SUFBUixLQUFLLEVBQUU7bURBQW9CO0FBQ25CO0lBQVIsS0FBSyxFQUFFO2lEQUFnQjtBQUNmO0lBQVIsS0FBSyxFQUFFO2tEQUFhO0FBQ1o7SUFBUixLQUFLLEVBQUU7K0NBQTJCO0FBQzFCO0lBQVIsS0FBSyxFQUFFOzRDQUFjO0FBQ2I7SUFBUixLQUFLLEVBQUU7aURBQTRCO0FBRTFCO0lBQVQsTUFBTSxFQUFFOzZDQUE2QjtBQWIzQixhQUFhO0lBVnpCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxvQkFBb0I7UUFDOUIsUUFBUSxFQUFFOzs7OztHQUtUO1FBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07S0FDaEQsQ0FBQztHQUNXLGFBQWEsQ0FzRnpCO1NBdEZZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgRWxlbWVudFJlZixcclxuICBPbkNoYW5nZXMsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgc2VsZWN0IH0gZnJvbSAnZDMtc2VsZWN0aW9uJztcclxuaW1wb3J0IHsgaWQgfSBmcm9tICcuLi91dGlscy9pZCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1hcmVhXScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxzdmc6ZGVmcyAqbmdJZj1cImdyYWRpZW50XCI+XHJcbiAgICAgIDxzdmc6ZyBuZ3gtY2hhcnRzLXN2Zy1saW5lYXItZ3JhZGllbnQgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiIFtuYW1lXT1cImdyYWRpZW50SWRcIiBbc3RvcHNdPVwiZ3JhZGllbnRTdG9wc1wiIC8+XHJcbiAgICA8L3N2ZzpkZWZzPlxyXG4gICAgPHN2ZzpwYXRoIGNsYXNzPVwiYXJlYVwiIFthdHRyLmRdPVwiYXJlYVBhdGhcIiBbYXR0ci5maWxsXT1cImdyYWRpZW50ID8gZ3JhZGllbnRGaWxsIDogZmlsbFwiIFtzdHlsZS5vcGFjaXR5XT1cIm9wYWNpdHlcIiAvPlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEFyZWFDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIGRhdGE7XHJcbiAgQElucHV0KCkgcGF0aDtcclxuICBASW5wdXQoKSBzdGFydGluZ1BhdGg7XHJcbiAgQElucHV0KCkgZmlsbDtcclxuICBASW5wdXQoKSBvcGFjaXR5ID0gMTtcclxuICBASW5wdXQoKSBzdGFydE9wYWNpdHkgPSAwLjU7XHJcbiAgQElucHV0KCkgZW5kT3BhY2l0eSA9IDE7XHJcbiAgQElucHV0KCkgYWN0aXZlTGFiZWw7XHJcbiAgQElucHV0KCkgZ3JhZGllbnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSBzdG9wczogYW55W107XHJcbiAgQElucHV0KCkgYW5pbWF0aW9uczogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gIGdyYWRpZW50SWQ6IHN0cmluZztcclxuICBncmFkaWVudEZpbGw6IHN0cmluZztcclxuICBhcmVhUGF0aDogc3RyaW5nO1xyXG4gIGluaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgZ3JhZGllbnRTdG9wczogYW55W107XHJcbiAgaGFzR3JhZGllbnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZikge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XHJcbiAgICAgIHRoaXMubG9hZEFuaW1hdGlvbigpO1xyXG4gICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLmdyYWRpZW50SWQgPSAnZ3JhZCcgKyBpZCgpLnRvU3RyaW5nKCk7XHJcbiAgICB0aGlzLmdyYWRpZW50RmlsbCA9IGB1cmwoIyR7dGhpcy5ncmFkaWVudElkfSlgO1xyXG5cclxuICAgIGlmICh0aGlzLmdyYWRpZW50IHx8IHRoaXMuc3RvcHMpIHtcclxuICAgICAgdGhpcy5ncmFkaWVudFN0b3BzID0gdGhpcy5nZXRHcmFkaWVudCgpO1xyXG4gICAgICB0aGlzLmhhc0dyYWRpZW50ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaGFzR3JhZGllbnQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZVBhdGhFbCgpO1xyXG4gIH1cclxuXHJcbiAgbG9hZEFuaW1hdGlvbigpOiB2b2lkIHtcclxuICAgIHRoaXMuYXJlYVBhdGggPSB0aGlzLnN0YXJ0aW5nUGF0aDtcclxuICAgIHNldFRpbWVvdXQodGhpcy51cGRhdGUuYmluZCh0aGlzKSwgMTAwKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVBhdGhFbCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IG5vZGUgPSBzZWxlY3QodGhpcy5lbGVtZW50KS5zZWxlY3QoJy5hcmVhJyk7XHJcblxyXG4gICAgaWYgKHRoaXMuYW5pbWF0aW9ucykge1xyXG4gICAgICBub2RlXHJcbiAgICAgICAgLnRyYW5zaXRpb24oKVxyXG4gICAgICAgIC5kdXJhdGlvbig3NTApXHJcbiAgICAgICAgLmF0dHIoJ2QnLCB0aGlzLnBhdGgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbm9kZS5hdHRyKCdkJywgdGhpcy5wYXRoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldEdyYWRpZW50KCkge1xyXG4gICAgaWYgKHRoaXMuc3RvcHMpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuc3RvcHM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFtcclxuICAgICAge1xyXG4gICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICBjb2xvcjogdGhpcy5maWxsLFxyXG4gICAgICAgIG9wYWNpdHk6IHRoaXMuc3RhcnRPcGFjaXR5XHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBvZmZzZXQ6IDEwMCxcclxuICAgICAgICBjb2xvcjogdGhpcy5maWxsLFxyXG4gICAgICAgIG9wYWNpdHk6IHRoaXMuZW5kT3BhY2l0eVxyXG4gICAgICB9XHJcbiAgICBdO1xyXG4gIH1cclxufVxyXG4iXX0=