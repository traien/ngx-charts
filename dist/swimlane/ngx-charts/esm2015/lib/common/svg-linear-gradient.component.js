import { __decorate } from "tslib";
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
let SvgLinearGradientComponent = class SvgLinearGradientComponent {
    constructor() {
        this.orientation = 'vertical';
    }
    ngOnChanges(changes) {
        this.x1 = '0%';
        this.x2 = '0%';
        this.y1 = '0%';
        this.y2 = '0%';
        if (this.orientation === 'horizontal') {
            this.x2 = '100%';
        }
        else if (this.orientation === 'vertical') {
            this.y1 = '100%';
        }
    }
};
__decorate([
    Input()
], SvgLinearGradientComponent.prototype, "orientation", void 0);
__decorate([
    Input()
], SvgLinearGradientComponent.prototype, "name", void 0);
__decorate([
    Input()
], SvgLinearGradientComponent.prototype, "stops", void 0);
SvgLinearGradientComponent = __decorate([
    Component({
        selector: 'g[ngx-charts-svg-linear-gradient]',
        template: `
    <svg:linearGradient [id]="name" [attr.x1]="x1" [attr.y1]="y1" [attr.x2]="x2" [attr.y2]="y2">
      <svg:stop
        *ngFor="let stop of stops"
        [attr.offset]="stop.offset + '%'"
        [style.stop-color]="stop.color"
        [style.stop-opacity]="stop.opacity"
      />
    </svg:linearGradient>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], SvgLinearGradientComponent);
export { SvgLinearGradientComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLWxpbmVhci1ncmFkaWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vc3ZnLWxpbmVhci1ncmFkaWVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUE0Qix1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWdCcEcsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMEI7SUFBdkM7UUFDVyxnQkFBVyxHQUFHLFVBQVUsQ0FBQztJQXFCcEMsQ0FBQztJQVpDLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNmLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ2YsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDZixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztRQUVmLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxZQUFZLEVBQUU7WUFDckMsSUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUM7U0FDbEI7YUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssVUFBVSxFQUFFO1lBQzFDLElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFyQlU7SUFBUixLQUFLLEVBQUU7K0RBQTBCO0FBQ3pCO0lBQVIsS0FBSyxFQUFFO3dEQUFNO0FBQ0w7SUFBUixLQUFLLEVBQUU7eURBQWM7QUFIWCwwQkFBMEI7SUFkdEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG1DQUFtQztRQUM3QyxRQUFRLEVBQUU7Ozs7Ozs7OztHQVNUO1FBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07S0FDaEQsQ0FBQztHQUNXLDBCQUEwQixDQXNCdEM7U0F0QlksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtc3ZnLWxpbmVhci1ncmFkaWVudF0nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8c3ZnOmxpbmVhckdyYWRpZW50IFtpZF09XCJuYW1lXCIgW2F0dHIueDFdPVwieDFcIiBbYXR0ci55MV09XCJ5MVwiIFthdHRyLngyXT1cIngyXCIgW2F0dHIueTJdPVwieTJcIj5cclxuICAgICAgPHN2ZzpzdG9wXHJcbiAgICAgICAgKm5nRm9yPVwibGV0IHN0b3Agb2Ygc3RvcHNcIlxyXG4gICAgICAgIFthdHRyLm9mZnNldF09XCJzdG9wLm9mZnNldCArICclJ1wiXHJcbiAgICAgICAgW3N0eWxlLnN0b3AtY29sb3JdPVwic3RvcC5jb2xvclwiXHJcbiAgICAgICAgW3N0eWxlLnN0b3Atb3BhY2l0eV09XCJzdG9wLm9wYWNpdHlcIlxyXG4gICAgICAvPlxyXG4gICAgPC9zdmc6bGluZWFyR3JhZGllbnQ+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3ZnTGluZWFyR3JhZGllbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIG9yaWVudGF0aW9uID0gJ3ZlcnRpY2FsJztcclxuICBASW5wdXQoKSBuYW1lO1xyXG4gIEBJbnB1dCgpIHN0b3BzOiBhbnlbXTtcclxuXHJcbiAgeDE6IGFueTtcclxuICB4MjogYW55O1xyXG4gIHkxOiBhbnk7XHJcbiAgeTI6IGFueTtcclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgdGhpcy54MSA9ICcwJSc7XHJcbiAgICB0aGlzLngyID0gJzAlJztcclxuICAgIHRoaXMueTEgPSAnMCUnO1xyXG4gICAgdGhpcy55MiA9ICcwJSc7XHJcblxyXG4gICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xyXG4gICAgICB0aGlzLngyID0gJzEwMCUnO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XHJcbiAgICAgIHRoaXMueTEgPSAnMTAwJSc7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==