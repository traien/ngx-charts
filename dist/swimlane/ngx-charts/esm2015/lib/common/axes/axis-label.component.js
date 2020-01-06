import { __decorate } from "tslib";
import { Component, Input, ElementRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
let AxisLabelComponent = class AxisLabelComponent {
    constructor(element) {
        this.textHeight = 25;
        this.margin = 5;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.strokeWidth = '0.01';
        this.textAnchor = 'middle';
        this.transform = '';
        switch (this.orient) {
            case 'top':
                this.y = this.offset;
                this.x = this.width / 2;
                break;
            case 'bottom':
                this.y = this.offset;
                this.x = this.width / 2;
                break;
            case 'left':
                this.y = -(this.offset + this.textHeight + this.margin);
                this.x = -this.height / 2;
                this.transform = 'rotate(270)';
                break;
            case 'right':
                this.y = this.offset + this.margin;
                this.x = -this.height / 2;
                this.transform = 'rotate(270)';
                break;
            default:
        }
    }
};
AxisLabelComponent.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], AxisLabelComponent.prototype, "orient", void 0);
__decorate([
    Input()
], AxisLabelComponent.prototype, "label", void 0);
__decorate([
    Input()
], AxisLabelComponent.prototype, "offset", void 0);
__decorate([
    Input()
], AxisLabelComponent.prototype, "width", void 0);
__decorate([
    Input()
], AxisLabelComponent.prototype, "height", void 0);
AxisLabelComponent = __decorate([
    Component({
        selector: 'g[ngx-charts-axis-label]',
        template: `
    <svg:text
      [attr.stroke-width]="strokeWidth"
      [attr.x]="x"
      [attr.y]="y"
      [attr.text-anchor]="textAnchor"
      [attr.transform]="transform"
    >
      {{ label }}
    </svg:text>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], AxisLabelComponent);
export { AxisLabelComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXhpcy1sYWJlbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vYXhlcy9heGlzLWxhYmVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFpQmhILElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBZ0I3QixZQUFZLE9BQW1CO1FBSC9CLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsV0FBTSxHQUFHLENBQUMsQ0FBQztRQUdULElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUN2QyxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRXBCLFFBQVEsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNuQixLQUFLLEtBQUs7Z0JBQ1IsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUNyQixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QixNQUFNO1lBQ1IsS0FBSyxRQUFRO2dCQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDckIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDeEIsTUFBTTtZQUNSLEtBQUssTUFBTTtnQkFDVCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN4RCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO2dCQUMvQixNQUFNO1lBQ1IsS0FBSyxPQUFPO2dCQUNWLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUNuQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO2dCQUMvQixNQUFNO1lBQ1IsUUFBUTtTQUNUO0lBQ0gsQ0FBQztDQUNGLENBQUE7O1lBbkNzQixVQUFVOztBQWZ0QjtJQUFSLEtBQUssRUFBRTtrREFBUTtBQUNQO0lBQVIsS0FBSyxFQUFFO2lEQUFPO0FBQ047SUFBUixLQUFLLEVBQUU7a0RBQVE7QUFDUDtJQUFSLEtBQUssRUFBRTtpREFBTztBQUNOO0lBQVIsS0FBSyxFQUFFO2tEQUFRO0FBTEwsa0JBQWtCO0lBZjlCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSwwQkFBMEI7UUFDcEMsUUFBUSxFQUFFOzs7Ozs7Ozs7O0dBVVQ7UUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtLQUNoRCxDQUFDO0dBQ1csa0JBQWtCLENBbUQ5QjtTQW5EWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBFbGVtZW50UmVmLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1heGlzLWxhYmVsXScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxzdmc6dGV4dFxyXG4gICAgICBbYXR0ci5zdHJva2Utd2lkdGhdPVwic3Ryb2tlV2lkdGhcIlxyXG4gICAgICBbYXR0ci54XT1cInhcIlxyXG4gICAgICBbYXR0ci55XT1cInlcIlxyXG4gICAgICBbYXR0ci50ZXh0LWFuY2hvcl09XCJ0ZXh0QW5jaG9yXCJcclxuICAgICAgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybVwiXHJcbiAgICA+XHJcbiAgICAgIHt7IGxhYmVsIH19XHJcbiAgICA8L3N2Zzp0ZXh0PlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEF4aXNMYWJlbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgb3JpZW50O1xyXG4gIEBJbnB1dCgpIGxhYmVsO1xyXG4gIEBJbnB1dCgpIG9mZnNldDtcclxuICBASW5wdXQoKSB3aWR0aDtcclxuICBASW5wdXQoKSBoZWlnaHQ7XHJcblxyXG4gIHg6IGFueTtcclxuICB5OiBhbnk7XHJcbiAgdHJhbnNmb3JtOiBhbnk7XHJcbiAgc3Ryb2tlV2lkdGg6IGFueTtcclxuICB0ZXh0QW5jaG9yOiBhbnk7XHJcbiAgZWxlbWVudDogRWxlbWVudFJlZjtcclxuICB0ZXh0SGVpZ2h0ID0gMjU7XHJcbiAgbWFyZ2luID0gNTtcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZikge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuc3Ryb2tlV2lkdGggPSAnMC4wMSc7XHJcbiAgICB0aGlzLnRleHRBbmNob3IgPSAnbWlkZGxlJztcclxuICAgIHRoaXMudHJhbnNmb3JtID0gJyc7XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLm9yaWVudCkge1xyXG4gICAgICBjYXNlICd0b3AnOlxyXG4gICAgICAgIHRoaXMueSA9IHRoaXMub2Zmc2V0O1xyXG4gICAgICAgIHRoaXMueCA9IHRoaXMud2lkdGggLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdib3R0b20nOlxyXG4gICAgICAgIHRoaXMueSA9IHRoaXMub2Zmc2V0O1xyXG4gICAgICAgIHRoaXMueCA9IHRoaXMud2lkdGggLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdsZWZ0JzpcclxuICAgICAgICB0aGlzLnkgPSAtKHRoaXMub2Zmc2V0ICsgdGhpcy50ZXh0SGVpZ2h0ICsgdGhpcy5tYXJnaW4pO1xyXG4gICAgICAgIHRoaXMueCA9IC10aGlzLmhlaWdodCAvIDI7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSAncm90YXRlKDI3MCknO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdyaWdodCc6XHJcbiAgICAgICAgdGhpcy55ID0gdGhpcy5vZmZzZXQgKyB0aGlzLm1hcmdpbjtcclxuICAgICAgICB0aGlzLnggPSAtdGhpcy5oZWlnaHQgLyAyO1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtID0gJ3JvdGF0ZSgyNzApJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19