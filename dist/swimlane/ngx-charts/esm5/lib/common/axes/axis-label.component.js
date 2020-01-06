import { __decorate } from "tslib";
import { Component, Input, ElementRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
var AxisLabelComponent = /** @class */ (function () {
    function AxisLabelComponent(element) {
        this.textHeight = 25;
        this.margin = 5;
        this.element = element.nativeElement;
    }
    AxisLabelComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    AxisLabelComponent.prototype.update = function () {
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
    };
    AxisLabelComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
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
            template: "\n    <svg:text\n      [attr.stroke-width]=\"strokeWidth\"\n      [attr.x]=\"x\"\n      [attr.y]=\"y\"\n      [attr.text-anchor]=\"textAnchor\"\n      [attr.transform]=\"transform\"\n    >\n      {{ label }}\n    </svg:text>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], AxisLabelComponent);
    return AxisLabelComponent;
}());
export { AxisLabelComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXhpcy1sYWJlbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vYXhlcy9heGlzLWxhYmVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFpQmhIO0lBZ0JFLDRCQUFZLE9BQW1CO1FBSC9CLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsV0FBTSxHQUFHLENBQUMsQ0FBQztRQUdULElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUN2QyxDQUFDO0lBRUQsd0NBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsbUNBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRXBCLFFBQVEsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNuQixLQUFLLEtBQUs7Z0JBQ1IsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUNyQixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QixNQUFNO1lBQ1IsS0FBSyxRQUFRO2dCQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDckIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDeEIsTUFBTTtZQUNSLEtBQUssTUFBTTtnQkFDVCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN4RCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO2dCQUMvQixNQUFNO1lBQ1IsS0FBSyxPQUFPO2dCQUNWLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUNuQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO2dCQUMvQixNQUFNO1lBQ1IsUUFBUTtTQUNUO0lBQ0gsQ0FBQzs7Z0JBbENvQixVQUFVOztJQWZ0QjtRQUFSLEtBQUssRUFBRTtzREFBUTtJQUNQO1FBQVIsS0FBSyxFQUFFO3FEQUFPO0lBQ047UUFBUixLQUFLLEVBQUU7c0RBQVE7SUFDUDtRQUFSLEtBQUssRUFBRTtxREFBTztJQUNOO1FBQVIsS0FBSyxFQUFFO3NEQUFRO0lBTEwsa0JBQWtCO1FBZjlCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSwwQkFBMEI7WUFDcEMsUUFBUSxFQUFFLHNPQVVUO1lBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQztPQUNXLGtCQUFrQixDQW1EOUI7SUFBRCx5QkFBQztDQUFBLEFBbkRELElBbURDO1NBbkRZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEVsZW1lbnRSZWYsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLWF4aXMtbGFiZWxdJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHN2Zzp0ZXh0XHJcbiAgICAgIFthdHRyLnN0cm9rZS13aWR0aF09XCJzdHJva2VXaWR0aFwiXHJcbiAgICAgIFthdHRyLnhdPVwieFwiXHJcbiAgICAgIFthdHRyLnldPVwieVwiXHJcbiAgICAgIFthdHRyLnRleHQtYW5jaG9yXT1cInRleHRBbmNob3JcIlxyXG4gICAgICBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtXCJcclxuICAgID5cclxuICAgICAge3sgbGFiZWwgfX1cclxuICAgIDwvc3ZnOnRleHQ+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXhpc0xhYmVsQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBvcmllbnQ7XHJcbiAgQElucHV0KCkgbGFiZWw7XHJcbiAgQElucHV0KCkgb2Zmc2V0O1xyXG4gIEBJbnB1dCgpIHdpZHRoO1xyXG4gIEBJbnB1dCgpIGhlaWdodDtcclxuXHJcbiAgeDogYW55O1xyXG4gIHk6IGFueTtcclxuICB0cmFuc2Zvcm06IGFueTtcclxuICBzdHJva2VXaWR0aDogYW55O1xyXG4gIHRleHRBbmNob3I6IGFueTtcclxuICBlbGVtZW50OiBFbGVtZW50UmVmO1xyXG4gIHRleHRIZWlnaHQgPSAyNTtcclxuICBtYXJnaW4gPSA1O1xyXG5cclxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zdHJva2VXaWR0aCA9ICcwLjAxJztcclxuICAgIHRoaXMudGV4dEFuY2hvciA9ICdtaWRkbGUnO1xyXG4gICAgdGhpcy50cmFuc2Zvcm0gPSAnJztcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMub3JpZW50KSB7XHJcbiAgICAgIGNhc2UgJ3RvcCc6XHJcbiAgICAgICAgdGhpcy55ID0gdGhpcy5vZmZzZXQ7XHJcbiAgICAgICAgdGhpcy54ID0gdGhpcy53aWR0aCAvIDI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2JvdHRvbSc6XHJcbiAgICAgICAgdGhpcy55ID0gdGhpcy5vZmZzZXQ7XHJcbiAgICAgICAgdGhpcy54ID0gdGhpcy53aWR0aCAvIDI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2xlZnQnOlxyXG4gICAgICAgIHRoaXMueSA9IC0odGhpcy5vZmZzZXQgKyB0aGlzLnRleHRIZWlnaHQgKyB0aGlzLm1hcmdpbik7XHJcbiAgICAgICAgdGhpcy54ID0gLXRoaXMuaGVpZ2h0IC8gMjtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9ICdyb3RhdGUoMjcwKSc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcclxuICAgICAgICB0aGlzLnkgPSB0aGlzLm9mZnNldCArIHRoaXMubWFyZ2luO1xyXG4gICAgICAgIHRoaXMueCA9IC10aGlzLmhlaWdodCAvIDI7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSAncm90YXRlKDI3MCknO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=