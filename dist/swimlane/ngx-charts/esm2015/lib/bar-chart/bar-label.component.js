import { __decorate } from "tslib";
import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, ElementRef, Output, EventEmitter } from '@angular/core';
import { formatLabel } from '../common/label.helper';
let BarLabelComponent = class BarLabelComponent {
    constructor(element) {
        this.dimensionsChanged = new EventEmitter();
        this.horizontalPadding = 2;
        this.verticalPadding = 5;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
    }
    getSize() {
        const h = this.element.getBoundingClientRect().height;
        const w = this.element.getBoundingClientRect().width;
        return { height: h, width: w, negative: this.value < 0 };
    }
    ngAfterViewInit() {
        this.dimensionsChanged.emit(this.getSize());
    }
    update() {
        if (this.valueFormatting) {
            this.formatedValue = this.valueFormatting(this.value);
        }
        else {
            this.formatedValue = formatLabel(this.value);
        }
        if (this.orientation === 'horizontal') {
            this.x = this.barX + this.barWidth;
            // if the value is negative then it's on the left of the x0.
            // we need to put the data label in front of the bar
            if (this.value < 0) {
                this.x = this.x - this.horizontalPadding;
                this.textAnchor = 'end';
            }
            else {
                this.x = this.x + this.horizontalPadding;
                this.textAnchor = 'start';
            }
            this.y = this.barY + this.barHeight / 2;
        }
        else {
            // orientation must be "vertical"
            this.x = this.barX + this.barWidth / 2;
            this.y = this.barY + this.barHeight;
            if (this.value < 0) {
                this.y = this.y + this.verticalPadding;
                this.textAnchor = 'end';
            }
            else {
                this.y = this.y - this.verticalPadding;
                this.textAnchor = 'start';
            }
            this.transform = `rotate(-45, ${this.x} , ${this.y})`;
        }
    }
};
BarLabelComponent.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], BarLabelComponent.prototype, "value", void 0);
__decorate([
    Input()
], BarLabelComponent.prototype, "valueFormatting", void 0);
__decorate([
    Input()
], BarLabelComponent.prototype, "barX", void 0);
__decorate([
    Input()
], BarLabelComponent.prototype, "barY", void 0);
__decorate([
    Input()
], BarLabelComponent.prototype, "barWidth", void 0);
__decorate([
    Input()
], BarLabelComponent.prototype, "barHeight", void 0);
__decorate([
    Input()
], BarLabelComponent.prototype, "orientation", void 0);
__decorate([
    Output()
], BarLabelComponent.prototype, "dimensionsChanged", void 0);
BarLabelComponent = __decorate([
    Component({
        selector: 'g[ngx-charts-bar-label]',
        template: `
    <svg:text
      class="textDataLabel"
      alignment-baseline="middle"
      [attr.text-anchor]="textAnchor"
      [attr.transform]="transform"
      [attr.x]="x"
      [attr.y]="y"
    >
      {{ formatedValue }}
    </svg:text>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".textDataLabel{font-size:11px}"]
    })
], BarLabelComponent);
export { BarLabelComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLWxhYmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2Jhci1jaGFydC9iYXItbGFiZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxTQUFTLEVBQ1QsYUFBYSxFQUNiLHVCQUF1QixFQUN2QixVQUFVLEVBQ1YsTUFBTSxFQUNOLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFtQnJELElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBb0I1QixZQUFZLE9BQW1CO1FBWHJCLHNCQUFpQixHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBS3BFLHNCQUFpQixHQUFXLENBQUMsQ0FBQztRQUM5QixvQkFBZSxHQUFXLENBQUMsQ0FBQztRQU0xQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDdkMsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELE9BQU87UUFDTCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQztJQUMzRCxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN2RDthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlDO1FBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFlBQVksRUFBRTtZQUNyQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNuQyw0REFBNEQ7WUFDNUQsb0RBQW9EO1lBQ3BELElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2FBQ3pCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDO2FBQzNCO1lBQ0QsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1NBQ3pDO2FBQU07WUFDTCxpQ0FBaUM7WUFDakMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBRXBDLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO2dCQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQzthQUN6QjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7YUFDM0I7WUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLGVBQWUsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7U0FDdkQ7SUFDSCxDQUFDO0NBQ0YsQ0FBQTs7WUFwRHNCLFVBQVU7O0FBbkJ0QjtJQUFSLEtBQUssRUFBRTtnREFBTztBQUNOO0lBQVIsS0FBSyxFQUFFOzBEQUFzQjtBQUNyQjtJQUFSLEtBQUssRUFBRTsrQ0FBTTtBQUNMO0lBQVIsS0FBSyxFQUFFOytDQUFNO0FBQ0w7SUFBUixLQUFLLEVBQUU7bURBQVU7QUFDVDtJQUFSLEtBQUssRUFBRTtvREFBVztBQUNWO0lBQVIsS0FBSyxFQUFFO3NEQUFhO0FBRVg7SUFBVCxNQUFNLEVBQUU7NERBQTJEO0FBVHpELGlCQUFpQjtJQWpCN0IsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHlCQUF5QjtRQUNuQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7O0dBV1Q7UUFFRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7S0FDaEQsQ0FBQztHQUNXLGlCQUFpQixDQXdFN0I7U0F4RVksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgRWxlbWVudFJlZixcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGZvcm1hdExhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsLmhlbHBlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1iYXItbGFiZWxdJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHN2Zzp0ZXh0XHJcbiAgICAgIGNsYXNzPVwidGV4dERhdGFMYWJlbFwiXHJcbiAgICAgIGFsaWdubWVudC1iYXNlbGluZT1cIm1pZGRsZVwiXHJcbiAgICAgIFthdHRyLnRleHQtYW5jaG9yXT1cInRleHRBbmNob3JcIlxyXG4gICAgICBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtXCJcclxuICAgICAgW2F0dHIueF09XCJ4XCJcclxuICAgICAgW2F0dHIueV09XCJ5XCJcclxuICAgID5cclxuICAgICAge3sgZm9ybWF0ZWRWYWx1ZSB9fVxyXG4gICAgPC9zdmc6dGV4dD5cclxuICBgLFxyXG4gIHN0eWxlVXJsczogWycuL2Jhci1sYWJlbC5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCYXJMYWJlbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgdmFsdWU7XHJcbiAgQElucHV0KCkgdmFsdWVGb3JtYXR0aW5nOiBhbnk7XHJcbiAgQElucHV0KCkgYmFyWDtcclxuICBASW5wdXQoKSBiYXJZO1xyXG4gIEBJbnB1dCgpIGJhcldpZHRoO1xyXG4gIEBJbnB1dCgpIGJhckhlaWdodDtcclxuICBASW5wdXQoKSBvcmllbnRhdGlvbjtcclxuXHJcbiAgQE91dHB1dCgpIGRpbWVuc2lvbnNDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgZWxlbWVudDogYW55O1xyXG4gIHg6IG51bWJlcjtcclxuICB5OiBudW1iZXI7XHJcbiAgaG9yaXpvbnRhbFBhZGRpbmc6IG51bWJlciA9IDI7XHJcbiAgdmVydGljYWxQYWRkaW5nOiBudW1iZXIgPSA1O1xyXG4gIGZvcm1hdGVkVmFsdWU6IHN0cmluZztcclxuICB0cmFuc2Zvcm06IHN0cmluZztcclxuICB0ZXh0QW5jaG9yOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICBnZXRTaXplKCk6IGFueSB7XHJcbiAgICBjb25zdCBoID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcclxuICAgIGNvbnN0IHcgPSB0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XHJcbiAgICByZXR1cm4geyBoZWlnaHQ6IGgsIHdpZHRoOiB3LCBuZWdhdGl2ZTogdGhpcy52YWx1ZSA8IDAgfTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMuZGltZW5zaW9uc0NoYW5nZWQuZW1pdCh0aGlzLmdldFNpemUoKSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy52YWx1ZUZvcm1hdHRpbmcpIHtcclxuICAgICAgdGhpcy5mb3JtYXRlZFZhbHVlID0gdGhpcy52YWx1ZUZvcm1hdHRpbmcodGhpcy52YWx1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZvcm1hdGVkVmFsdWUgPSBmb3JtYXRMYWJlbCh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XHJcbiAgICAgIHRoaXMueCA9IHRoaXMuYmFyWCArIHRoaXMuYmFyV2lkdGg7XHJcbiAgICAgIC8vIGlmIHRoZSB2YWx1ZSBpcyBuZWdhdGl2ZSB0aGVuIGl0J3Mgb24gdGhlIGxlZnQgb2YgdGhlIHgwLlxyXG4gICAgICAvLyB3ZSBuZWVkIHRvIHB1dCB0aGUgZGF0YSBsYWJlbCBpbiBmcm9udCBvZiB0aGUgYmFyXHJcbiAgICAgIGlmICh0aGlzLnZhbHVlIDwgMCkge1xyXG4gICAgICAgIHRoaXMueCA9IHRoaXMueCAtIHRoaXMuaG9yaXpvbnRhbFBhZGRpbmc7XHJcbiAgICAgICAgdGhpcy50ZXh0QW5jaG9yID0gJ2VuZCc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy54ID0gdGhpcy54ICsgdGhpcy5ob3Jpem9udGFsUGFkZGluZztcclxuICAgICAgICB0aGlzLnRleHRBbmNob3IgPSAnc3RhcnQnO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMueSA9IHRoaXMuYmFyWSArIHRoaXMuYmFySGVpZ2h0IC8gMjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIG9yaWVudGF0aW9uIG11c3QgYmUgXCJ2ZXJ0aWNhbFwiXHJcbiAgICAgIHRoaXMueCA9IHRoaXMuYmFyWCArIHRoaXMuYmFyV2lkdGggLyAyO1xyXG4gICAgICB0aGlzLnkgPSB0aGlzLmJhclkgKyB0aGlzLmJhckhlaWdodDtcclxuXHJcbiAgICAgIGlmICh0aGlzLnZhbHVlIDwgMCkge1xyXG4gICAgICAgIHRoaXMueSA9IHRoaXMueSArIHRoaXMudmVydGljYWxQYWRkaW5nO1xyXG4gICAgICAgIHRoaXMudGV4dEFuY2hvciA9ICdlbmQnO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMueSA9IHRoaXMueSAtIHRoaXMudmVydGljYWxQYWRkaW5nO1xyXG4gICAgICAgIHRoaXMudGV4dEFuY2hvciA9ICdzdGFydCc7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy50cmFuc2Zvcm0gPSBgcm90YXRlKC00NSwgJHt0aGlzLnh9ICwgJHt0aGlzLnl9KWA7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==