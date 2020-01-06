import { __decorate } from "tslib";
import { Component, Input, Output, SimpleChanges, EventEmitter, ElementRef, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { select } from 'd3-selection';
import { id } from '../utils/id';
var AreaComponent = /** @class */ (function () {
    function AreaComponent(element) {
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
    AreaComponent.prototype.ngOnChanges = function (changes) {
        if (!this.initialized) {
            this.loadAnimation();
            this.initialized = true;
        }
        else {
            this.update();
        }
    };
    AreaComponent.prototype.update = function () {
        this.gradientId = 'grad' + id().toString();
        this.gradientFill = "url(#" + this.gradientId + ")";
        if (this.gradient || this.stops) {
            this.gradientStops = this.getGradient();
            this.hasGradient = true;
        }
        else {
            this.hasGradient = false;
        }
        this.updatePathEl();
    };
    AreaComponent.prototype.loadAnimation = function () {
        this.areaPath = this.startingPath;
        setTimeout(this.update.bind(this), 100);
    };
    AreaComponent.prototype.updatePathEl = function () {
        var node = select(this.element).select('.area');
        if (this.animations) {
            node
                .transition()
                .duration(750)
                .attr('d', this.path);
        }
        else {
            node.attr('d', this.path);
        }
    };
    AreaComponent.prototype.getGradient = function () {
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
    };
    AreaComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
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
            template: "\n    <svg:defs *ngIf=\"gradient\">\n      <svg:g ngx-charts-svg-linear-gradient orientation=\"vertical\" [name]=\"gradientId\" [stops]=\"gradientStops\" />\n    </svg:defs>\n    <svg:path class=\"area\" [attr.d]=\"areaPath\" [attr.fill]=\"gradient ? gradientFill : fill\" [style.opacity]=\"opacity\" />\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], AreaComponent);
    return AreaComponent;
}());
export { AreaComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJlYS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vYXJlYS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixhQUFhLEVBQ2IsWUFBWSxFQUNaLFVBQVUsRUFDVixTQUFTLEVBQ1QsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdEMsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQVlqQztJQXVCRSx1QkFBWSxPQUFtQjtRQWxCdEIsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLGlCQUFZLEdBQUcsR0FBRyxDQUFDO1FBQ25CLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFFZixhQUFRLEdBQVksS0FBSyxDQUFDO1FBRTFCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFMUIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFNdEMsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFFN0IsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFHM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxtQ0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQ3pCO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDZjtJQUNILENBQUM7SUFFRCw4QkFBTSxHQUFOO1FBQ0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLEdBQUcsRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFRLElBQUksQ0FBQyxVQUFVLE1BQUcsQ0FBQztRQUUvQyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN4QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztTQUN6QjthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDMUI7UUFFRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELHFDQUFhLEdBQWI7UUFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDbEMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxvQ0FBWSxHQUFaO1FBQ0UsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbEQsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUk7aUJBQ0QsVUFBVSxFQUFFO2lCQUNaLFFBQVEsQ0FBQyxHQUFHLENBQUM7aUJBQ2IsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekI7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMzQjtJQUNILENBQUM7SUFFRCxtQ0FBVyxHQUFYO1FBQ0UsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ25CO1FBRUQsT0FBTztZQUNMO2dCQUNFLE1BQU0sRUFBRSxDQUFDO2dCQUNULEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDaEIsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZO2FBQzNCO1lBQ0Q7Z0JBQ0UsTUFBTSxFQUFFLEdBQUc7Z0JBQ1gsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNoQixPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVU7YUFDekI7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Z0JBOURvQixVQUFVOztJQXRCdEI7UUFBUixLQUFLLEVBQUU7K0NBQU07SUFDTDtRQUFSLEtBQUssRUFBRTsrQ0FBTTtJQUNMO1FBQVIsS0FBSyxFQUFFO3VEQUFjO0lBQ2I7UUFBUixLQUFLLEVBQUU7K0NBQU07SUFDTDtRQUFSLEtBQUssRUFBRTtrREFBYTtJQUNaO1FBQVIsS0FBSyxFQUFFO3VEQUFvQjtJQUNuQjtRQUFSLEtBQUssRUFBRTtxREFBZ0I7SUFDZjtRQUFSLEtBQUssRUFBRTtzREFBYTtJQUNaO1FBQVIsS0FBSyxFQUFFO21EQUEyQjtJQUMxQjtRQUFSLEtBQUssRUFBRTtnREFBYztJQUNiO1FBQVIsS0FBSyxFQUFFO3FEQUE0QjtJQUUxQjtRQUFULE1BQU0sRUFBRTtpREFBNkI7SUFiM0IsYUFBYTtRQVZ6QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFFBQVEsRUFBRSxxVEFLVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FDVyxhQUFhLENBc0Z6QjtJQUFELG9CQUFDO0NBQUEsQUF0RkQsSUFzRkM7U0F0RlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBFbGVtZW50UmVmLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBzZWxlY3QgfSBmcm9tICdkMy1zZWxlY3Rpb24nO1xyXG5pbXBvcnQgeyBpZCB9IGZyb20gJy4uL3V0aWxzL2lkJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLWFyZWFdJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHN2ZzpkZWZzICpuZ0lmPVwiZ3JhZGllbnRcIj5cclxuICAgICAgPHN2ZzpnIG5neC1jaGFydHMtc3ZnLWxpbmVhci1ncmFkaWVudCBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCIgW25hbWVdPVwiZ3JhZGllbnRJZFwiIFtzdG9wc109XCJncmFkaWVudFN0b3BzXCIgLz5cclxuICAgIDwvc3ZnOmRlZnM+XHJcbiAgICA8c3ZnOnBhdGggY2xhc3M9XCJhcmVhXCIgW2F0dHIuZF09XCJhcmVhUGF0aFwiIFthdHRyLmZpbGxdPVwiZ3JhZGllbnQgPyBncmFkaWVudEZpbGwgOiBmaWxsXCIgW3N0eWxlLm9wYWNpdHldPVwib3BhY2l0eVwiIC8+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXJlYUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgZGF0YTtcclxuICBASW5wdXQoKSBwYXRoO1xyXG4gIEBJbnB1dCgpIHN0YXJ0aW5nUGF0aDtcclxuICBASW5wdXQoKSBmaWxsO1xyXG4gIEBJbnB1dCgpIG9wYWNpdHkgPSAxO1xyXG4gIEBJbnB1dCgpIHN0YXJ0T3BhY2l0eSA9IDAuNTtcclxuICBASW5wdXQoKSBlbmRPcGFjaXR5ID0gMTtcclxuICBASW5wdXQoKSBhY3RpdmVMYWJlbDtcclxuICBASW5wdXQoKSBncmFkaWVudDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHN0b3BzOiBhbnlbXTtcclxuICBASW5wdXQoKSBhbmltYXRpb25zOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgZ3JhZGllbnRJZDogc3RyaW5nO1xyXG4gIGdyYWRpZW50RmlsbDogc3RyaW5nO1xyXG4gIGFyZWFQYXRoOiBzdHJpbmc7XHJcbiAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBncmFkaWVudFN0b3BzOiBhbnlbXTtcclxuICBoYXNHcmFkaWVudDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgdGhpcy5sb2FkQW5pbWF0aW9uKCk7XHJcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuZ3JhZGllbnRJZCA9ICdncmFkJyArIGlkKCkudG9TdHJpbmcoKTtcclxuICAgIHRoaXMuZ3JhZGllbnRGaWxsID0gYHVybCgjJHt0aGlzLmdyYWRpZW50SWR9KWA7XHJcblxyXG4gICAgaWYgKHRoaXMuZ3JhZGllbnQgfHwgdGhpcy5zdG9wcykge1xyXG4gICAgICB0aGlzLmdyYWRpZW50U3RvcHMgPSB0aGlzLmdldEdyYWRpZW50KCk7XHJcbiAgICAgIHRoaXMuaGFzR3JhZGllbnQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5oYXNHcmFkaWVudCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXBkYXRlUGF0aEVsKCk7XHJcbiAgfVxyXG5cclxuICBsb2FkQW5pbWF0aW9uKCk6IHZvaWQge1xyXG4gICAgdGhpcy5hcmVhUGF0aCA9IHRoaXMuc3RhcnRpbmdQYXRoO1xyXG4gICAgc2V0VGltZW91dCh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpLCAxMDApO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUGF0aEVsKCk6IHZvaWQge1xyXG4gICAgY29uc3Qgbm9kZSA9IHNlbGVjdCh0aGlzLmVsZW1lbnQpLnNlbGVjdCgnLmFyZWEnKTtcclxuXHJcbiAgICBpZiAodGhpcy5hbmltYXRpb25zKSB7XHJcbiAgICAgIG5vZGVcclxuICAgICAgICAudHJhbnNpdGlvbigpXHJcbiAgICAgICAgLmR1cmF0aW9uKDc1MClcclxuICAgICAgICAuYXR0cignZCcsIHRoaXMucGF0aCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBub2RlLmF0dHIoJ2QnLCB0aGlzLnBhdGgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0R3JhZGllbnQoKSB7XHJcbiAgICBpZiAodGhpcy5zdG9wcykge1xyXG4gICAgICByZXR1cm4gdGhpcy5zdG9wcztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gW1xyXG4gICAgICB7XHJcbiAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgIGNvbG9yOiB0aGlzLmZpbGwsXHJcbiAgICAgICAgb3BhY2l0eTogdGhpcy5zdGFydE9wYWNpdHlcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIG9mZnNldDogMTAwLFxyXG4gICAgICAgIGNvbG9yOiB0aGlzLmZpbGwsXHJcbiAgICAgICAgb3BhY2l0eTogdGhpcy5lbmRPcGFjaXR5XHJcbiAgICAgIH1cclxuICAgIF07XHJcbiAgfVxyXG59XHJcbiJdfQ==