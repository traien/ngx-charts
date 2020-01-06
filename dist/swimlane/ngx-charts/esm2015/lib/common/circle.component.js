import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostListener } from '@angular/core';
let CircleComponent = class CircleComponent {
    constructor() {
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
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
    ngOnChanges(changes) {
        this.classNames = Array.isArray(this.classNames) ? this.classNames.join(' ') : '';
        this.classNames += 'circle';
    }
};
__decorate([
    Input()
], CircleComponent.prototype, "cx", void 0);
__decorate([
    Input()
], CircleComponent.prototype, "cy", void 0);
__decorate([
    Input()
], CircleComponent.prototype, "r", void 0);
__decorate([
    Input()
], CircleComponent.prototype, "fill", void 0);
__decorate([
    Input()
], CircleComponent.prototype, "stroke", void 0);
__decorate([
    Input()
], CircleComponent.prototype, "data", void 0);
__decorate([
    Input()
], CircleComponent.prototype, "classNames", void 0);
__decorate([
    Input()
], CircleComponent.prototype, "circleOpacity", void 0);
__decorate([
    Input()
], CircleComponent.prototype, "pointerEvents", void 0);
__decorate([
    Output()
], CircleComponent.prototype, "select", void 0);
__decorate([
    Output()
], CircleComponent.prototype, "activate", void 0);
__decorate([
    Output()
], CircleComponent.prototype, "deactivate", void 0);
__decorate([
    HostListener('click')
], CircleComponent.prototype, "onClick", null);
__decorate([
    HostListener('mouseenter')
], CircleComponent.prototype, "onMouseEnter", null);
__decorate([
    HostListener('mouseleave')
], CircleComponent.prototype, "onMouseLeave", null);
CircleComponent = __decorate([
    Component({
        selector: 'g[ngx-charts-circle]',
        template: `
    <svg:circle
      [attr.cx]="cx"
      [attr.cy]="cy"
      [attr.r]="r"
      [attr.fill]="fill"
      [attr.stroke]="stroke"
      [attr.opacity]="circleOpacity"
      [attr.class]="classNames"
      [attr.pointer-events]="pointerEvents"
    />
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], CircleComponent);
export { CircleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9jaXJjbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxNQUFNLEVBQ04sWUFBWSxFQUVaLHVCQUF1QixFQUN2QixZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFrQnZCLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFBNUI7UUFXWSxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1QixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQXFCNUMsQ0FBQztJQWxCQyxPQUFPO1FBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFHRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFHRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNsRixJQUFJLENBQUMsVUFBVSxJQUFJLFFBQVEsQ0FBQztJQUM5QixDQUFDO0NBQ0YsQ0FBQTtBQWpDVTtJQUFSLEtBQUssRUFBRTsyQ0FBSTtBQUNIO0lBQVIsS0FBSyxFQUFFOzJDQUFJO0FBQ0g7SUFBUixLQUFLLEVBQUU7MENBQUc7QUFDRjtJQUFSLEtBQUssRUFBRTs2Q0FBTTtBQUNMO0lBQVIsS0FBSyxFQUFFOytDQUFRO0FBQ1A7SUFBUixLQUFLLEVBQUU7NkNBQU07QUFDTDtJQUFSLEtBQUssRUFBRTttREFBWTtBQUNYO0lBQVIsS0FBSyxFQUFFO3NEQUFlO0FBQ2Q7SUFBUixLQUFLLEVBQUU7c0RBQWU7QUFFYjtJQUFULE1BQU0sRUFBRTsrQ0FBNkI7QUFDNUI7SUFBVCxNQUFNLEVBQUU7aURBQStCO0FBQzlCO0lBQVQsTUFBTSxFQUFFO21EQUFpQztBQUcxQztJQURDLFlBQVksQ0FBQyxPQUFPLENBQUM7OENBR3JCO0FBR0Q7SUFEQyxZQUFZLENBQUMsWUFBWSxDQUFDO21EQUcxQjtBQUdEO0lBREMsWUFBWSxDQUFDLFlBQVksQ0FBQzttREFHMUI7QUE1QlUsZUFBZTtJQWhCM0IsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHNCQUFzQjtRQUNoQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7O0dBV1Q7UUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtLQUNoRCxDQUFDO0dBQ1csZUFBZSxDQWtDM0I7U0FsQ1ksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPbkNoYW5nZXMsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgSG9zdExpc3RlbmVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1jaXJjbGVdJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHN2ZzpjaXJjbGVcclxuICAgICAgW2F0dHIuY3hdPVwiY3hcIlxyXG4gICAgICBbYXR0ci5jeV09XCJjeVwiXHJcbiAgICAgIFthdHRyLnJdPVwiclwiXHJcbiAgICAgIFthdHRyLmZpbGxdPVwiZmlsbFwiXHJcbiAgICAgIFthdHRyLnN0cm9rZV09XCJzdHJva2VcIlxyXG4gICAgICBbYXR0ci5vcGFjaXR5XT1cImNpcmNsZU9wYWNpdHlcIlxyXG4gICAgICBbYXR0ci5jbGFzc109XCJjbGFzc05hbWVzXCJcclxuICAgICAgW2F0dHIucG9pbnRlci1ldmVudHNdPVwicG9pbnRlckV2ZW50c1wiXHJcbiAgICAvPlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIENpcmNsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgY3g7XHJcbiAgQElucHV0KCkgY3k7XHJcbiAgQElucHV0KCkgcjtcclxuICBASW5wdXQoKSBmaWxsO1xyXG4gIEBJbnB1dCgpIHN0cm9rZTtcclxuICBASW5wdXQoKSBkYXRhO1xyXG4gIEBJbnB1dCgpIGNsYXNzTmFtZXM7XHJcbiAgQElucHV0KCkgY2lyY2xlT3BhY2l0eTtcclxuICBASW5wdXQoKSBwb2ludGVyRXZlbnRzO1xyXG5cclxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxyXG4gIG9uQ2xpY2soKSB7XHJcbiAgICB0aGlzLnNlbGVjdC5lbWl0KHRoaXMuZGF0YSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcclxuICBvbk1vdXNlRW50ZXIoKTogdm9pZCB7XHJcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQodGhpcy5kYXRhKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxyXG4gIG9uTW91c2VMZWF2ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuZGVhY3RpdmF0ZS5lbWl0KHRoaXMuZGF0YSk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICB0aGlzLmNsYXNzTmFtZXMgPSBBcnJheS5pc0FycmF5KHRoaXMuY2xhc3NOYW1lcykgPyB0aGlzLmNsYXNzTmFtZXMuam9pbignICcpIDogJyc7XHJcbiAgICB0aGlzLmNsYXNzTmFtZXMgKz0gJ2NpcmNsZSc7XHJcbiAgfVxyXG59XHJcbiJdfQ==