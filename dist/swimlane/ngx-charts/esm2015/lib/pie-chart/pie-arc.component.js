import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ElementRef, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { interpolate } from 'd3-interpolate';
import { select } from 'd3-selection';
import { arc } from 'd3-shape';
import { id } from '../utils/id';
let PieArcComponent = class PieArcComponent {
    constructor(element) {
        this.startAngle = 0;
        this.endAngle = Math.PI * 2;
        this.cornerRadius = 0;
        this.explodeSlices = false;
        this.gradient = false;
        this.animate = true;
        this.pointerEvents = true;
        this.isActive = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.dblclick = new EventEmitter();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
    }
    getGradient() {
        return this.gradient ? this.gradientFill : this.fill;
    }
    getPointerEvents() {
        return this.pointerEvents ? 'auto' : 'none';
    }
    update() {
        const calc = this.calculateArc();
        this.startOpacity = 0.5;
        this.radialGradientId = 'linearGrad' + id().toString();
        this.gradientFill = `url(#${this.radialGradientId})`;
        if (this.animate) {
            if (this.initialized) {
                this.updateAnimation();
            }
            else {
                this.loadAnimation();
                this.initialized = true;
            }
        }
        else {
            this.path = calc.startAngle(this.startAngle).endAngle(this.endAngle)();
        }
    }
    calculateArc() {
        let outerRadius = this.outerRadius;
        if (this.explodeSlices && this.innerRadius === 0) {
            outerRadius = (this.outerRadius * this.value) / this.max;
        }
        return arc()
            .innerRadius(this.innerRadius)
            .outerRadius(outerRadius)
            .cornerRadius(this.cornerRadius);
    }
    loadAnimation() {
        const node = select(this.element)
            .selectAll('.arc')
            .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        const calc = this.calculateArc();
        node
            .transition()
            .attrTween('d', function (d) {
            this._current = this._current || d;
            const copyOfD = Object.assign({}, d);
            copyOfD.endAngle = copyOfD.startAngle;
            const interpolater = interpolate(copyOfD, copyOfD);
            this._current = interpolater(0);
            return function (t) {
                return calc(interpolater(t));
            };
        })
            .transition()
            .duration(750)
            .attrTween('d', function (d) {
            this._current = this._current || d;
            const interpolater = interpolate(this._current, d);
            this._current = interpolater(0);
            return function (t) {
                return calc(interpolater(t));
            };
        });
    }
    updateAnimation() {
        const node = select(this.element)
            .selectAll('.arc')
            .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        const calc = this.calculateArc();
        node
            .transition()
            .duration(750)
            .attrTween('d', function (d) {
            this._current = this._current || d;
            const interpolater = interpolate(this._current, d);
            this._current = interpolater(0);
            return function (t) {
                return calc(interpolater(t));
            };
        });
    }
    onClick() {
        clearTimeout(this._timeout);
        this._timeout = setTimeout(() => this.select.emit(this.data), 200);
    }
    onDblClick(event) {
        event.preventDefault();
        event.stopPropagation();
        clearTimeout(this._timeout);
        this.dblclick.emit({
            data: this.data,
            nativeEvent: event
        });
    }
};
PieArcComponent.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], PieArcComponent.prototype, "fill", void 0);
__decorate([
    Input()
], PieArcComponent.prototype, "startAngle", void 0);
__decorate([
    Input()
], PieArcComponent.prototype, "endAngle", void 0);
__decorate([
    Input()
], PieArcComponent.prototype, "innerRadius", void 0);
__decorate([
    Input()
], PieArcComponent.prototype, "outerRadius", void 0);
__decorate([
    Input()
], PieArcComponent.prototype, "cornerRadius", void 0);
__decorate([
    Input()
], PieArcComponent.prototype, "value", void 0);
__decorate([
    Input()
], PieArcComponent.prototype, "max", void 0);
__decorate([
    Input()
], PieArcComponent.prototype, "data", void 0);
__decorate([
    Input()
], PieArcComponent.prototype, "explodeSlices", void 0);
__decorate([
    Input()
], PieArcComponent.prototype, "gradient", void 0);
__decorate([
    Input()
], PieArcComponent.prototype, "animate", void 0);
__decorate([
    Input()
], PieArcComponent.prototype, "pointerEvents", void 0);
__decorate([
    Input()
], PieArcComponent.prototype, "isActive", void 0);
__decorate([
    Output()
], PieArcComponent.prototype, "select", void 0);
__decorate([
    Output()
], PieArcComponent.prototype, "activate", void 0);
__decorate([
    Output()
], PieArcComponent.prototype, "deactivate", void 0);
__decorate([
    Output()
], PieArcComponent.prototype, "dblclick", void 0);
PieArcComponent = __decorate([
    Component({
        selector: 'g[ngx-charts-pie-arc]',
        template: `
    <svg:g class="arc-group">
      <svg:defs *ngIf="gradient">
        <svg:g
          ngx-charts-svg-radial-gradient
          [color]="fill"
          orientation="vertical"
          [name]="radialGradientId"
          [startOpacity]="startOpacity"
        />
      </svg:defs>
      <svg:path
        [attr.d]="path"
        class="arc"
        [class.active]="isActive"
        [attr.fill]="getGradient()"
        (click)="onClick()"
        (dblclick)="onDblClick($event)"
        (mouseenter)="activate.emit(data)"
        (mouseleave)="deactivate.emit(data)"
        [style.pointer-events]="getPointerEvents()"
      />
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], PieArcComponent);
export { PieArcComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWFyYy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9waWUtY2hhcnQvcGllLWFyYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osVUFBVSxFQUNWLGFBQWEsRUFDYixTQUFTLEVBQ1QsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFL0IsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQWdDakMsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQThCMUIsWUFBWSxPQUFtQjtRQTVCdEIsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUN2QixhQUFRLEdBQVcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFHL0IsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFJekIsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixZQUFPLEdBQVksSUFBSSxDQUFDO1FBQ3hCLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBQzlCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFFekIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEMsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFReEMsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFJM0IsSUFB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QUFDeEI7SUFBUixLQUFLLEVBQUU7c0RBQStCO0FBQzlCO0lBQVIsS0FBSyxFQUFFO2lEQUEyQjtBQUV6QjtJQUFULE1BQU0sRUFBRTsrQ0FBNkI7QUFDNUI7SUFBVCxNQUFNLEVBQUU7aURBQStCO0FBQzlCO0lBQVQsTUFBTSxFQUFFO21EQUFpQztBQUNoQztJQUFULE1BQU0sRUFBRTtpREFBK0I7QUFuQjdCLGVBQWU7SUE1QjNCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSx1QkFBdUI7UUFDakMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCVDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO0tBQ2hELENBQUM7R0FDVyxlQUFlLENBOEkzQjtTQTlJWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBFbGVtZW50UmVmLFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGludGVycG9sYXRlIH0gZnJvbSAnZDMtaW50ZXJwb2xhdGUnO1xyXG5pbXBvcnQgeyBzZWxlY3QgfSBmcm9tICdkMy1zZWxlY3Rpb24nO1xyXG5pbXBvcnQgeyBhcmMgfSBmcm9tICdkMy1zaGFwZSc7XHJcblxyXG5pbXBvcnQgeyBpZCB9IGZyb20gJy4uL3V0aWxzL2lkJztcclxuLyogdHNsaW50OmRpc2FibGUgKi9cclxuaW1wb3J0IHsgTW91c2VFdmVudCB9IGZyb20gJy4uL2V2ZW50cyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1waWUtYXJjXScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxzdmc6ZyBjbGFzcz1cImFyYy1ncm91cFwiPlxyXG4gICAgICA8c3ZnOmRlZnMgKm5nSWY9XCJncmFkaWVudFwiPlxyXG4gICAgICAgIDxzdmc6Z1xyXG4gICAgICAgICAgbmd4LWNoYXJ0cy1zdmctcmFkaWFsLWdyYWRpZW50XHJcbiAgICAgICAgICBbY29sb3JdPVwiZmlsbFwiXHJcbiAgICAgICAgICBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCJcclxuICAgICAgICAgIFtuYW1lXT1cInJhZGlhbEdyYWRpZW50SWRcIlxyXG4gICAgICAgICAgW3N0YXJ0T3BhY2l0eV09XCJzdGFydE9wYWNpdHlcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvc3ZnOmRlZnM+XHJcbiAgICAgIDxzdmc6cGF0aFxyXG4gICAgICAgIFthdHRyLmRdPVwicGF0aFwiXHJcbiAgICAgICAgY2xhc3M9XCJhcmNcIlxyXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaXNBY3RpdmVcIlxyXG4gICAgICAgIFthdHRyLmZpbGxdPVwiZ2V0R3JhZGllbnQoKVwiXHJcbiAgICAgICAgKGNsaWNrKT1cIm9uQ2xpY2soKVwiXHJcbiAgICAgICAgKGRibGNsaWNrKT1cIm9uRGJsQ2xpY2soJGV2ZW50KVwiXHJcbiAgICAgICAgKG1vdXNlZW50ZXIpPVwiYWN0aXZhdGUuZW1pdChkYXRhKVwiXHJcbiAgICAgICAgKG1vdXNlbGVhdmUpPVwiZGVhY3RpdmF0ZS5lbWl0KGRhdGEpXCJcclxuICAgICAgICBbc3R5bGUucG9pbnRlci1ldmVudHNdPVwiZ2V0UG9pbnRlckV2ZW50cygpXCJcclxuICAgICAgLz5cclxuICAgIDwvc3ZnOmc+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGllQXJjQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBmaWxsO1xyXG4gIEBJbnB1dCgpIHN0YXJ0QW5nbGU6IG51bWJlciA9IDA7XHJcbiAgQElucHV0KCkgZW5kQW5nbGU6IG51bWJlciA9IE1hdGguUEkgKiAyO1xyXG4gIEBJbnB1dCgpIGlubmVyUmFkaXVzO1xyXG4gIEBJbnB1dCgpIG91dGVyUmFkaXVzO1xyXG4gIEBJbnB1dCgpIGNvcm5lclJhZGl1czogbnVtYmVyID0gMDtcclxuICBASW5wdXQoKSB2YWx1ZTtcclxuICBASW5wdXQoKSBtYXg7XHJcbiAgQElucHV0KCkgZGF0YTtcclxuICBASW5wdXQoKSBleHBsb2RlU2xpY2VzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZ3JhZGllbnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSBhbmltYXRlOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSBwb2ludGVyRXZlbnRzOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSBpc0FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZGJsY2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gIHBhdGg6IGFueTtcclxuICBzdGFydE9wYWNpdHk6IG51bWJlcjtcclxuICByYWRpYWxHcmFkaWVudElkOiBzdHJpbmc7XHJcbiAgbGluZWFyR3JhZGllbnRJZDogc3RyaW5nO1xyXG4gIGdyYWRpZW50RmlsbDogc3RyaW5nO1xyXG4gIGluaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfdGltZW91dDtcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZikge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIGdldEdyYWRpZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ3JhZGllbnQgPyB0aGlzLmdyYWRpZW50RmlsbCA6IHRoaXMuZmlsbDtcclxuICB9XHJcblxyXG4gIGdldFBvaW50ZXJFdmVudHMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wb2ludGVyRXZlbnRzID8gJ2F1dG8nIDogJ25vbmUnO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgY29uc3QgY2FsYyA9IHRoaXMuY2FsY3VsYXRlQXJjKCk7XHJcbiAgICB0aGlzLnN0YXJ0T3BhY2l0eSA9IDAuNTtcclxuICAgIHRoaXMucmFkaWFsR3JhZGllbnRJZCA9ICdsaW5lYXJHcmFkJyArIGlkKCkudG9TdHJpbmcoKTtcclxuICAgIHRoaXMuZ3JhZGllbnRGaWxsID0gYHVybCgjJHt0aGlzLnJhZGlhbEdyYWRpZW50SWR9KWA7XHJcblxyXG4gICAgaWYgKHRoaXMuYW5pbWF0ZSkge1xyXG4gICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlQW5pbWF0aW9uKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5sb2FkQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGF0aCA9IGNhbGMuc3RhcnRBbmdsZSh0aGlzLnN0YXJ0QW5nbGUpLmVuZEFuZ2xlKHRoaXMuZW5kQW5nbGUpKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjYWxjdWxhdGVBcmMoKTogYW55IHtcclxuICAgIGxldCBvdXRlclJhZGl1cyA9IHRoaXMub3V0ZXJSYWRpdXM7XHJcbiAgICBpZiAodGhpcy5leHBsb2RlU2xpY2VzICYmIHRoaXMuaW5uZXJSYWRpdXMgPT09IDApIHtcclxuICAgICAgb3V0ZXJSYWRpdXMgPSAodGhpcy5vdXRlclJhZGl1cyAqIHRoaXMudmFsdWUpIC8gdGhpcy5tYXg7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGFyYygpXHJcbiAgICAgIC5pbm5lclJhZGl1cyh0aGlzLmlubmVyUmFkaXVzKVxyXG4gICAgICAub3V0ZXJSYWRpdXMob3V0ZXJSYWRpdXMpXHJcbiAgICAgIC5jb3JuZXJSYWRpdXModGhpcy5jb3JuZXJSYWRpdXMpO1xyXG4gIH1cclxuXHJcbiAgbG9hZEFuaW1hdGlvbigpOiB2b2lkIHtcclxuICAgIGNvbnN0IG5vZGUgPSBzZWxlY3QodGhpcy5lbGVtZW50KVxyXG4gICAgICAuc2VsZWN0QWxsKCcuYXJjJylcclxuICAgICAgLmRhdGEoW3sgc3RhcnRBbmdsZTogdGhpcy5zdGFydEFuZ2xlLCBlbmRBbmdsZTogdGhpcy5lbmRBbmdsZSB9XSk7XHJcblxyXG4gICAgY29uc3QgY2FsYyA9IHRoaXMuY2FsY3VsYXRlQXJjKCk7XHJcblxyXG4gICAgbm9kZVxyXG4gICAgICAudHJhbnNpdGlvbigpXHJcbiAgICAgIC5hdHRyVHdlZW4oJ2QnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgKDxhbnk+dGhpcykuX2N1cnJlbnQgPSAoPGFueT50aGlzKS5fY3VycmVudCB8fCBkO1xyXG4gICAgICAgIGNvbnN0IGNvcHlPZkQgPSBPYmplY3QuYXNzaWduKHt9LCBkKTtcclxuICAgICAgICBjb3B5T2ZELmVuZEFuZ2xlID0gY29weU9mRC5zdGFydEFuZ2xlO1xyXG4gICAgICAgIGNvbnN0IGludGVycG9sYXRlciA9IGludGVycG9sYXRlKGNvcHlPZkQsIGNvcHlPZkQpO1xyXG4gICAgICAgICg8YW55PnRoaXMpLl9jdXJyZW50ID0gaW50ZXJwb2xhdGVyKDApO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgICByZXR1cm4gY2FsYyhpbnRlcnBvbGF0ZXIodCkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0pXHJcbiAgICAgIC50cmFuc2l0aW9uKClcclxuICAgICAgLmR1cmF0aW9uKDc1MClcclxuICAgICAgLmF0dHJUd2VlbignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAoPGFueT50aGlzKS5fY3VycmVudCA9ICg8YW55PnRoaXMpLl9jdXJyZW50IHx8IGQ7XHJcbiAgICAgICAgY29uc3QgaW50ZXJwb2xhdGVyID0gaW50ZXJwb2xhdGUoKDxhbnk+dGhpcykuX2N1cnJlbnQsIGQpO1xyXG4gICAgICAgICg8YW55PnRoaXMpLl9jdXJyZW50ID0gaW50ZXJwb2xhdGVyKDApO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgICByZXR1cm4gY2FsYyhpbnRlcnBvbGF0ZXIodCkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlQW5pbWF0aW9uKCk6IHZvaWQge1xyXG4gICAgY29uc3Qgbm9kZSA9IHNlbGVjdCh0aGlzLmVsZW1lbnQpXHJcbiAgICAgIC5zZWxlY3RBbGwoJy5hcmMnKVxyXG4gICAgICAuZGF0YShbeyBzdGFydEFuZ2xlOiB0aGlzLnN0YXJ0QW5nbGUsIGVuZEFuZ2xlOiB0aGlzLmVuZEFuZ2xlIH1dKTtcclxuXHJcbiAgICBjb25zdCBjYWxjID0gdGhpcy5jYWxjdWxhdGVBcmMoKTtcclxuXHJcbiAgICBub2RlXHJcbiAgICAgIC50cmFuc2l0aW9uKClcclxuICAgICAgLmR1cmF0aW9uKDc1MClcclxuICAgICAgLmF0dHJUd2VlbignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAoPGFueT50aGlzKS5fY3VycmVudCA9ICg8YW55PnRoaXMpLl9jdXJyZW50IHx8IGQ7XHJcbiAgICAgICAgY29uc3QgaW50ZXJwb2xhdGVyID0gaW50ZXJwb2xhdGUoKDxhbnk+dGhpcykuX2N1cnJlbnQsIGQpO1xyXG4gICAgICAgICg8YW55PnRoaXMpLl9jdXJyZW50ID0gaW50ZXJwb2xhdGVyKDApO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgICByZXR1cm4gY2FsYyhpbnRlcnBvbGF0ZXIodCkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25DbGljaygpOiB2b2lkIHtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0KTtcclxuICAgIHRoaXMuX3RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2VsZWN0LmVtaXQodGhpcy5kYXRhKSwgMjAwKTtcclxuICB9XHJcblxyXG4gIG9uRGJsQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0KTtcclxuXHJcbiAgICB0aGlzLmRibGNsaWNrLmVtaXQoe1xyXG4gICAgICBkYXRhOiB0aGlzLmRhdGEsXHJcbiAgICAgIG5hdGl2ZUV2ZW50OiBldmVudFxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==