import { __decorate } from "tslib";
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
let SvgRadialGradientComponent = class SvgRadialGradientComponent {
    constructor() {
        this.endOpacity = 1;
        this.cx = 0;
        this.cy = 0;
    }
    get stops() {
        return this.stopsInput || this.stopsDefault;
    }
    set stops(value) {
        this.stopsInput = value;
    }
    ngOnChanges(changes) {
        this.r = '30%';
        if ('color' in changes || 'startOpacity' in changes || 'endOpacity' in changes) {
            this.stopsDefault = [
                {
                    offset: 0,
                    color: this.color,
                    opacity: this.startOpacity
                },
                {
                    offset: 100,
                    color: this.color,
                    opacity: this.endOpacity
                }
            ];
        }
    }
};
__decorate([
    Input()
], SvgRadialGradientComponent.prototype, "color", void 0);
__decorate([
    Input()
], SvgRadialGradientComponent.prototype, "name", void 0);
__decorate([
    Input()
], SvgRadialGradientComponent.prototype, "startOpacity", void 0);
__decorate([
    Input()
], SvgRadialGradientComponent.prototype, "endOpacity", void 0);
__decorate([
    Input()
], SvgRadialGradientComponent.prototype, "cx", void 0);
__decorate([
    Input()
], SvgRadialGradientComponent.prototype, "cy", void 0);
__decorate([
    Input()
], SvgRadialGradientComponent.prototype, "stops", null);
SvgRadialGradientComponent = __decorate([
    Component({
        selector: 'g[ngx-charts-svg-radial-gradient]',
        template: `
    <svg:radialGradient [id]="name" [attr.cx]="cx" [attr.cy]="cy" [attr.r]="r" gradientUnits="userSpaceOnUse">
      <svg:stop
        *ngFor="let stop of stops"
        [attr.offset]="stop.offset + '%'"
        [style.stop-color]="stop.color"
        [style.stop-opacity]="stop.opacity"
      />
    </svg:radialGradient>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], SvgRadialGradientComponent);
export { SvgRadialGradientComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLXJhZGlhbC1ncmFkaWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vc3ZnLXJhZGlhbC1ncmFkaWVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFhLHVCQUF1QixFQUFpQixNQUFNLGVBQWUsQ0FBQztBQWdCcEcsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMEI7SUFBdkM7UUFJVyxlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsT0FBRSxHQUFXLENBQUMsQ0FBQztRQUNmLE9BQUUsR0FBVyxDQUFDLENBQUM7SUFpQzFCLENBQUM7SUE5QkMsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDOUMsQ0FBQztJQUVELElBQUksS0FBSyxDQUFDLEtBQVk7UUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQU9ELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNmLElBQUksT0FBTyxJQUFJLE9BQU8sSUFBSSxjQUFjLElBQUksT0FBTyxJQUFJLFlBQVksSUFBSSxPQUFPLEVBQUU7WUFDOUUsSUFBSSxDQUFDLFlBQVksR0FBRztnQkFDbEI7b0JBQ0UsTUFBTSxFQUFFLENBQUM7b0JBQ1QsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO29CQUNqQixPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVk7aUJBQzNCO2dCQUNEO29CQUNFLE1BQU0sRUFBRSxHQUFHO29CQUNYLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztvQkFDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVO2lCQUN6QjthQUNGLENBQUM7U0FDSDtJQUNILENBQUM7Q0FDRixDQUFBO0FBdENVO0lBQVIsS0FBSyxFQUFFO3lEQUFlO0FBQ2Q7SUFBUixLQUFLLEVBQUU7d0RBQWM7QUFDYjtJQUFSLEtBQUssRUFBRTtnRUFBc0I7QUFDckI7SUFBUixLQUFLLEVBQUU7OERBQWdCO0FBQ2Y7SUFBUixLQUFLLEVBQUU7c0RBQWdCO0FBQ2Y7SUFBUixLQUFLLEVBQUU7c0RBQWdCO0FBR3hCO0lBREMsS0FBSyxFQUFFO3VEQUdQO0FBWFUsMEJBQTBCO0lBZHRDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxtQ0FBbUM7UUFDN0MsUUFBUSxFQUFFOzs7Ozs7Ozs7R0FTVDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO0tBQ2hELENBQUM7R0FDVywwQkFBMEIsQ0F1Q3RDO1NBdkNZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLXN2Zy1yYWRpYWwtZ3JhZGllbnRdJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHN2ZzpyYWRpYWxHcmFkaWVudCBbaWRdPVwibmFtZVwiIFthdHRyLmN4XT1cImN4XCIgW2F0dHIuY3ldPVwiY3lcIiBbYXR0ci5yXT1cInJcIiBncmFkaWVudFVuaXRzPVwidXNlclNwYWNlT25Vc2VcIj5cclxuICAgICAgPHN2ZzpzdG9wXHJcbiAgICAgICAgKm5nRm9yPVwibGV0IHN0b3Agb2Ygc3RvcHNcIlxyXG4gICAgICAgIFthdHRyLm9mZnNldF09XCJzdG9wLm9mZnNldCArICclJ1wiXHJcbiAgICAgICAgW3N0eWxlLnN0b3AtY29sb3JdPVwic3RvcC5jb2xvclwiXHJcbiAgICAgICAgW3N0eWxlLnN0b3Atb3BhY2l0eV09XCJzdG9wLm9wYWNpdHlcIlxyXG4gICAgICAvPlxyXG4gICAgPC9zdmc6cmFkaWFsR3JhZGllbnQ+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3ZnUmFkaWFsR3JhZGllbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIGNvbG9yOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHN0YXJ0T3BhY2l0eTogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGVuZE9wYWNpdHkgPSAxO1xyXG4gIEBJbnB1dCgpIGN4OiBudW1iZXIgPSAwO1xyXG4gIEBJbnB1dCgpIGN5OiBudW1iZXIgPSAwO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBzdG9wcygpOiBhbnlbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdG9wc0lucHV0IHx8IHRoaXMuc3RvcHNEZWZhdWx0O1xyXG4gIH1cclxuXHJcbiAgc2V0IHN0b3BzKHZhbHVlOiBhbnlbXSkge1xyXG4gICAgdGhpcy5zdG9wc0lucHV0ID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICByOiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgc3RvcHNJbnB1dDogYW55W107XHJcbiAgcHJpdmF0ZSBzdG9wc0RlZmF1bHQ6IGFueVtdO1xyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICB0aGlzLnIgPSAnMzAlJztcclxuICAgIGlmICgnY29sb3InIGluIGNoYW5nZXMgfHwgJ3N0YXJ0T3BhY2l0eScgaW4gY2hhbmdlcyB8fCAnZW5kT3BhY2l0eScgaW4gY2hhbmdlcykge1xyXG4gICAgICB0aGlzLnN0b3BzRGVmYXVsdCA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvcixcclxuICAgICAgICAgIG9wYWNpdHk6IHRoaXMuc3RhcnRPcGFjaXR5XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBvZmZzZXQ6IDEwMCxcclxuICAgICAgICAgIGNvbG9yOiB0aGlzLmNvbG9yLFxyXG4gICAgICAgICAgb3BhY2l0eTogdGhpcy5lbmRPcGFjaXR5XHJcbiAgICAgICAgfVxyXG4gICAgICBdO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=