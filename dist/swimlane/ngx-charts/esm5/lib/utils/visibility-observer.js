import { __decorate } from "tslib";
import { Output, EventEmitter, NgZone, Directive } from '@angular/core';
/**
 * Visibility Observer
 */
var VisibilityObserver = /** @class */ (function () {
    function VisibilityObserver(element, zone) {
        this.element = element;
        this.zone = zone;
        this.visible = new EventEmitter();
        this.isVisible = false;
        this.runCheck();
    }
    VisibilityObserver.prototype.destroy = function () {
        clearTimeout(this.timeout);
    };
    VisibilityObserver.prototype.onVisibilityChange = function () {
        var _this = this;
        // trigger zone recalc for columns
        this.zone.run(function () {
            _this.isVisible = true;
            _this.visible.emit(true);
        });
    };
    VisibilityObserver.prototype.runCheck = function () {
        var _this = this;
        var check = function () {
            if (!_this.element) {
                return;
            }
            // https://davidwalsh.name/offsetheight-visibility
            var _a = _this.element.nativeElement, offsetHeight = _a.offsetHeight, offsetWidth = _a.offsetWidth;
            if (offsetHeight && offsetWidth) {
                clearTimeout(_this.timeout);
                _this.onVisibilityChange();
            }
            else {
                clearTimeout(_this.timeout);
                _this.zone.runOutsideAngular(function () {
                    _this.timeout = setTimeout(function () { return check(); }, 100);
                });
            }
        };
        this.zone.runOutsideAngular(function () {
            _this.timeout = setTimeout(function () { return check(); });
        });
    };
    VisibilityObserver.ctorParameters = function () { return [
        { type: undefined },
        { type: NgZone }
    ]; };
    __decorate([
        Output()
    ], VisibilityObserver.prototype, "visible", void 0);
    VisibilityObserver = __decorate([
        Directive()
    ], VisibilityObserver);
    return VisibilityObserver;
}());
export { VisibilityObserver };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaWJpbGl0eS1vYnNlcnZlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL3Zpc2liaWxpdHktb2JzZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEU7O0dBRUc7QUFFSDtJQU1FLDRCQUFvQixPQUFZLEVBQVUsSUFBWTtRQUFsQyxZQUFPLEdBQVAsT0FBTyxDQUFLO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUw1QyxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHMUQsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUd6QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVELG9DQUFPLEdBQVA7UUFDRSxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCwrQ0FBa0IsR0FBbEI7UUFBQSxpQkFNQztRQUxDLGtDQUFrQztRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNaLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFBQSxpQkF1QkM7UUF0QkMsSUFBTSxLQUFLLEdBQUc7WUFDWixJQUFJLENBQUMsS0FBSSxDQUFDLE9BQU8sRUFBRTtnQkFDakIsT0FBTzthQUNSO1lBRUQsa0RBQWtEO1lBQzVDLElBQUEsZ0NBQTBELEVBQXhELDhCQUFZLEVBQUUsNEJBQTBDLENBQUM7WUFFakUsSUFBSSxZQUFZLElBQUksV0FBVyxFQUFFO2dCQUMvQixZQUFZLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMzQixLQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzthQUMzQjtpQkFBTTtnQkFDTCxZQUFZLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMzQixLQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO29CQUMxQixLQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSyxFQUFFLEVBQVAsQ0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNoRCxDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUMxQixLQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSyxFQUFFLEVBQVAsQ0FBTyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7Z0JBdkMrQyxNQUFNOztJQUw1QztRQUFULE1BQU0sRUFBRTt1REFBaUQ7SUFEL0Msa0JBQWtCO1FBRDlCLFNBQVMsRUFBRTtPQUNDLGtCQUFrQixDQThDOUI7SUFBRCx5QkFBQztDQUFBLEFBOUNELElBOENDO1NBOUNZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE91dHB1dCwgRXZlbnRFbWl0dGVyLCBOZ1pvbmUsIERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIFZpc2liaWxpdHkgT2JzZXJ2ZXJcclxuICovXHJcbkBEaXJlY3RpdmUoKVxyXG5leHBvcnQgY2xhc3MgVmlzaWJpbGl0eU9ic2VydmVyIHtcclxuICBAT3V0cHV0KCkgdmlzaWJsZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHRpbWVvdXQ6IGFueTtcclxuICBpc1Zpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBhbnksIHByaXZhdGUgem9uZTogTmdab25lKSB7XHJcbiAgICB0aGlzLnJ1bkNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBkZXN0cm95KCk6IHZvaWQge1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XHJcbiAgfVxyXG5cclxuICBvblZpc2liaWxpdHlDaGFuZ2UoKTogdm9pZCB7XHJcbiAgICAvLyB0cmlnZ2VyIHpvbmUgcmVjYWxjIGZvciBjb2x1bW5zXHJcbiAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgdGhpcy5pc1Zpc2libGUgPSB0cnVlO1xyXG4gICAgICB0aGlzLnZpc2libGUuZW1pdCh0cnVlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcnVuQ2hlY2soKTogdm9pZCB7XHJcbiAgICBjb25zdCBjaGVjayA9ICgpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLmVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGh0dHBzOi8vZGF2aWR3YWxzaC5uYW1lL29mZnNldGhlaWdodC12aXNpYmlsaXR5XHJcbiAgICAgIGNvbnN0IHsgb2Zmc2V0SGVpZ2h0LCBvZmZzZXRXaWR0aCB9ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcblxyXG4gICAgICBpZiAob2Zmc2V0SGVpZ2h0ICYmIG9mZnNldFdpZHRoKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XHJcbiAgICAgICAgdGhpcy5vblZpc2liaWxpdHlDaGFuZ2UoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcclxuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiBjaGVjaygpLCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gY2hlY2soKSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19