import { __decorate } from "tslib";
import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, ElementRef, Output, EventEmitter } from '@angular/core';
import { formatLabel } from '../common/label.helper';
var BarLabelComponent = /** @class */ (function () {
    function BarLabelComponent(element) {
        this.dimensionsChanged = new EventEmitter();
        this.horizontalPadding = 2;
        this.verticalPadding = 5;
        this.element = element.nativeElement;
    }
    BarLabelComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    BarLabelComponent.prototype.getSize = function () {
        var h = this.element.getBoundingClientRect().height;
        var w = this.element.getBoundingClientRect().width;
        return { height: h, width: w, negative: this.value < 0 };
    };
    BarLabelComponent.prototype.ngAfterViewInit = function () {
        this.dimensionsChanged.emit(this.getSize());
    };
    BarLabelComponent.prototype.update = function () {
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
            this.transform = "rotate(-45, " + this.x + " , " + this.y + ")";
        }
    };
    BarLabelComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
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
            template: "\n    <svg:text\n      class=\"textDataLabel\"\n      alignment-baseline=\"middle\"\n      [attr.text-anchor]=\"textAnchor\"\n      [attr.transform]=\"transform\"\n      [attr.x]=\"x\"\n      [attr.y]=\"y\"\n    >\n      {{ formatedValue }}\n    </svg:text>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".textDataLabel{font-size:11px}"]
        })
    ], BarLabelComponent);
    return BarLabelComponent;
}());
export { BarLabelComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLWxhYmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2Jhci1jaGFydC9iYXItbGFiZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxTQUFTLEVBQ1QsYUFBYSxFQUNiLHVCQUF1QixFQUN2QixVQUFVLEVBQ1YsTUFBTSxFQUNOLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFtQnJEO0lBb0JFLDJCQUFZLE9BQW1CO1FBWHJCLHNCQUFpQixHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBS3BFLHNCQUFpQixHQUFXLENBQUMsQ0FBQztRQUM5QixvQkFBZSxHQUFXLENBQUMsQ0FBQztRQU0xQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDdkMsQ0FBQztJQUVELHVDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELG1DQUFPLEdBQVA7UUFDRSxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ3RELElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQztJQUMzRCxDQUFDO0lBRUQsMkNBQWUsR0FBZjtRQUNFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELGtDQUFNLEdBQU47UUFDRSxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN2RDthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlDO1FBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFlBQVksRUFBRTtZQUNyQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNuQyw0REFBNEQ7WUFDNUQsb0RBQW9EO1lBQ3BELElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2FBQ3pCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDO2FBQzNCO1lBQ0QsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1NBQ3pDO2FBQU07WUFDTCxpQ0FBaUM7WUFDakMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBRXBDLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO2dCQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQzthQUN6QjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7YUFDM0I7WUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLGlCQUFlLElBQUksQ0FBQyxDQUFDLFdBQU0sSUFBSSxDQUFDLENBQUMsTUFBRyxDQUFDO1NBQ3ZEO0lBQ0gsQ0FBQzs7Z0JBbkRvQixVQUFVOztJQW5CdEI7UUFBUixLQUFLLEVBQUU7b0RBQU87SUFDTjtRQUFSLEtBQUssRUFBRTs4REFBc0I7SUFDckI7UUFBUixLQUFLLEVBQUU7bURBQU07SUFDTDtRQUFSLEtBQUssRUFBRTttREFBTTtJQUNMO1FBQVIsS0FBSyxFQUFFO3VEQUFVO0lBQ1Q7UUFBUixLQUFLLEVBQUU7d0RBQVc7SUFDVjtRQUFSLEtBQUssRUFBRTswREFBYTtJQUVYO1FBQVQsTUFBTSxFQUFFO2dFQUEyRDtJQVR6RCxpQkFBaUI7UUFqQjdCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSx5QkFBeUI7WUFDbkMsUUFBUSxFQUFFLHVRQVdUO1lBRUQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O1NBQ2hELENBQUM7T0FDVyxpQkFBaUIsQ0F3RTdCO0lBQUQsd0JBQUM7Q0FBQSxBQXhFRCxJQXdFQztTQXhFWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBFbGVtZW50UmVmLFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZm9ybWF0TGFiZWwgfSBmcm9tICcuLi9jb21tb24vbGFiZWwuaGVscGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLWJhci1sYWJlbF0nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8c3ZnOnRleHRcclxuICAgICAgY2xhc3M9XCJ0ZXh0RGF0YUxhYmVsXCJcclxuICAgICAgYWxpZ25tZW50LWJhc2VsaW5lPVwibWlkZGxlXCJcclxuICAgICAgW2F0dHIudGV4dC1hbmNob3JdPVwidGV4dEFuY2hvclwiXHJcbiAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIlxyXG4gICAgICBbYXR0ci54XT1cInhcIlxyXG4gICAgICBbYXR0ci55XT1cInlcIlxyXG4gICAgPlxyXG4gICAgICB7eyBmb3JtYXRlZFZhbHVlIH19XHJcbiAgICA8L3N2Zzp0ZXh0PlxyXG4gIGAsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYmFyLWxhYmVsLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEJhckxhYmVsQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSB2YWx1ZTtcclxuICBASW5wdXQoKSB2YWx1ZUZvcm1hdHRpbmc6IGFueTtcclxuICBASW5wdXQoKSBiYXJYO1xyXG4gIEBJbnB1dCgpIGJhclk7XHJcbiAgQElucHV0KCkgYmFyV2lkdGg7XHJcbiAgQElucHV0KCkgYmFySGVpZ2h0O1xyXG4gIEBJbnB1dCgpIG9yaWVudGF0aW9uO1xyXG5cclxuICBAT3V0cHV0KCkgZGltZW5zaW9uc0NoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBlbGVtZW50OiBhbnk7XHJcbiAgeDogbnVtYmVyO1xyXG4gIHk6IG51bWJlcjtcclxuICBob3Jpem9udGFsUGFkZGluZzogbnVtYmVyID0gMjtcclxuICB2ZXJ0aWNhbFBhZGRpbmc6IG51bWJlciA9IDU7XHJcbiAgZm9ybWF0ZWRWYWx1ZTogc3RyaW5nO1xyXG4gIHRyYW5zZm9ybTogc3RyaW5nO1xyXG4gIHRleHRBbmNob3I6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZikge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIGdldFNpemUoKTogYW55IHtcclxuICAgIGNvbnN0IGggPSB0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xyXG4gICAgY29uc3QgdyA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcclxuICAgIHJldHVybiB7IGhlaWdodDogaCwgd2lkdGg6IHcsIG5lZ2F0aXZlOiB0aGlzLnZhbHVlIDwgMCB9O1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5kaW1lbnNpb25zQ2hhbmdlZC5lbWl0KHRoaXMuZ2V0U2l6ZSgpKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnZhbHVlRm9ybWF0dGluZykge1xyXG4gICAgICB0aGlzLmZvcm1hdGVkVmFsdWUgPSB0aGlzLnZhbHVlRm9ybWF0dGluZyh0aGlzLnZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZm9ybWF0ZWRWYWx1ZSA9IGZvcm1hdExhYmVsKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcclxuICAgICAgdGhpcy54ID0gdGhpcy5iYXJYICsgdGhpcy5iYXJXaWR0aDtcclxuICAgICAgLy8gaWYgdGhlIHZhbHVlIGlzIG5lZ2F0aXZlIHRoZW4gaXQncyBvbiB0aGUgbGVmdCBvZiB0aGUgeDAuXHJcbiAgICAgIC8vIHdlIG5lZWQgdG8gcHV0IHRoZSBkYXRhIGxhYmVsIGluIGZyb250IG9mIHRoZSBiYXJcclxuICAgICAgaWYgKHRoaXMudmFsdWUgPCAwKSB7XHJcbiAgICAgICAgdGhpcy54ID0gdGhpcy54IC0gdGhpcy5ob3Jpem9udGFsUGFkZGluZztcclxuICAgICAgICB0aGlzLnRleHRBbmNob3IgPSAnZW5kJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnggPSB0aGlzLnggKyB0aGlzLmhvcml6b250YWxQYWRkaW5nO1xyXG4gICAgICAgIHRoaXMudGV4dEFuY2hvciA9ICdzdGFydCc7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy55ID0gdGhpcy5iYXJZICsgdGhpcy5iYXJIZWlnaHQgLyAyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gb3JpZW50YXRpb24gbXVzdCBiZSBcInZlcnRpY2FsXCJcclxuICAgICAgdGhpcy54ID0gdGhpcy5iYXJYICsgdGhpcy5iYXJXaWR0aCAvIDI7XHJcbiAgICAgIHRoaXMueSA9IHRoaXMuYmFyWSArIHRoaXMuYmFySGVpZ2h0O1xyXG5cclxuICAgICAgaWYgKHRoaXMudmFsdWUgPCAwKSB7XHJcbiAgICAgICAgdGhpcy55ID0gdGhpcy55ICsgdGhpcy52ZXJ0aWNhbFBhZGRpbmc7XHJcbiAgICAgICAgdGhpcy50ZXh0QW5jaG9yID0gJ2VuZCc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy55ID0gdGhpcy55IC0gdGhpcy52ZXJ0aWNhbFBhZGRpbmc7XHJcbiAgICAgICAgdGhpcy50ZXh0QW5jaG9yID0gJ3N0YXJ0JztcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnRyYW5zZm9ybSA9IGByb3RhdGUoLTQ1LCAke3RoaXMueH0gLCAke3RoaXMueX0pYDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19