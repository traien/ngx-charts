import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnDestroy, ElementRef } from '@angular/core';
import { count, decimalChecker } from './count.helper';
/**
 * Count up component
 *
 * Loosely inspired by:
 *  - https://github.com/izupet/angular2-counto
 *  - https://inorganik.github.io/countUp.js/
 *
 * @export
 */
var CountUpDirective = /** @class */ (function () {
    function CountUpDirective(cd, element) {
        this.cd = cd;
        this.countDuration = 1;
        this.countPrefix = '';
        this.countSuffix = '';
        this.countChange = new EventEmitter();
        this.countFinish = new EventEmitter();
        this.value = '';
        this._countDecimals = 0;
        this._countTo = 0;
        this._countFrom = 0;
        this.nativeElement = element.nativeElement;
    }
    Object.defineProperty(CountUpDirective.prototype, "countDecimals", {
        get: function () {
            if (this._countDecimals)
                return this._countDecimals;
            return decimalChecker(this.countTo);
        },
        set: function (val) {
            this._countDecimals = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CountUpDirective.prototype, "countTo", {
        get: function () {
            return this._countTo;
        },
        set: function (val) {
            this._countTo = parseFloat(val);
            this.start();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CountUpDirective.prototype, "countFrom", {
        get: function () {
            return this._countFrom;
        },
        set: function (val) {
            this._countFrom = parseFloat(val);
            this.start();
        },
        enumerable: true,
        configurable: true
    });
    CountUpDirective.prototype.ngOnDestroy = function () {
        cancelAnimationFrame(this.animationReq);
    };
    CountUpDirective.prototype.start = function () {
        var _this = this;
        cancelAnimationFrame(this.animationReq);
        var valueFormatting = this.valueFormatting || (function (value) { return "" + _this.countPrefix + value.toLocaleString() + _this.countSuffix; });
        var callback = function (_a) {
            var value = _a.value, progress = _a.progress, finished = _a.finished;
            _this.value = valueFormatting(value);
            _this.cd.markForCheck();
            if (!finished)
                _this.countChange.emit({ value: _this.value, progress: progress });
            if (finished)
                _this.countFinish.emit({ value: _this.value, progress: progress });
        };
        this.animationReq = count(this.countFrom, this.countTo, this.countDecimals, this.countDuration, callback);
    };
    CountUpDirective.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], CountUpDirective.prototype, "countDuration", void 0);
    __decorate([
        Input()
    ], CountUpDirective.prototype, "countPrefix", void 0);
    __decorate([
        Input()
    ], CountUpDirective.prototype, "countSuffix", void 0);
    __decorate([
        Input()
    ], CountUpDirective.prototype, "valueFormatting", void 0);
    __decorate([
        Input()
    ], CountUpDirective.prototype, "countDecimals", null);
    __decorate([
        Input()
    ], CountUpDirective.prototype, "countTo", null);
    __decorate([
        Input()
    ], CountUpDirective.prototype, "countFrom", null);
    __decorate([
        Output()
    ], CountUpDirective.prototype, "countChange", void 0);
    __decorate([
        Output()
    ], CountUpDirective.prototype, "countFinish", void 0);
    CountUpDirective = __decorate([
        Component({
            selector: '[ngx-charts-count-up]',
            template: "\n    {{ value }}\n  "
        })
    ], CountUpDirective);
    return CountUpDirective;
}());
export { CountUpDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL2NvdW50L2NvdW50LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pILE9BQU8sRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkQ7Ozs7Ozs7O0dBUUc7QUFPSDtJQWtERSwwQkFBb0IsRUFBcUIsRUFBRSxPQUFtQjtRQUExQyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQWpEaEMsa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFDMUIsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFDekIsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFpQ3hCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFJM0MsVUFBSyxHQUFRLEVBQUUsQ0FBQztRQUtSLG1CQUFjLEdBQVcsQ0FBQyxDQUFDO1FBQzNCLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFDckIsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUc3QixJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDN0MsQ0FBQztJQTdDRCxzQkFBSSwyQ0FBYTthQUlqQjtZQUNFLElBQUksSUFBSSxDQUFDLGNBQWM7Z0JBQUUsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBQ3BELE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QyxDQUFDO2FBUEQsVUFBa0IsR0FBVztZQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQztRQUM1QixDQUFDOzs7T0FBQTtJQVFELHNCQUFJLHFDQUFPO2FBS1g7WUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkIsQ0FBQzthQVBELFVBQVksR0FBRztZQUNiLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNmLENBQUM7OztPQUFBO0lBT0Qsc0JBQUksdUNBQVM7YUFLYjtZQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN6QixDQUFDO2FBUEQsVUFBYyxHQUFHO1lBQ2YsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQzs7O09BQUE7SUF3QkQsc0NBQVcsR0FBWDtRQUNFLG9CQUFvQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsZ0NBQUssR0FBTDtRQUFBLGlCQWNDO1FBYkMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXhDLElBQU0sZUFBZSxHQUNuQixJQUFJLENBQUMsZUFBZSxJQUFJLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFHLEtBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLGNBQWMsRUFBRSxHQUFHLEtBQUksQ0FBQyxXQUFhLEVBQWpFLENBQWlFLENBQUMsQ0FBQztRQUV2RyxJQUFNLFFBQVEsR0FBRyxVQUFDLEVBQTZCO2dCQUEzQixnQkFBSyxFQUFFLHNCQUFRLEVBQUUsc0JBQVE7WUFDM0MsS0FBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEMsS0FBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsUUFBUTtnQkFBRSxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsVUFBQSxFQUFFLENBQUMsQ0FBQztZQUN0RSxJQUFJLFFBQVE7Z0JBQUUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSSxDQUFDLEtBQUssRUFBRSxRQUFRLFVBQUEsRUFBRSxDQUFDLENBQUM7UUFDdkUsQ0FBQyxDQUFDO1FBRUYsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM1RyxDQUFDOztnQkF0QnVCLGlCQUFpQjtnQkFBVyxVQUFVOztJQWpEckQ7UUFBUixLQUFLLEVBQUU7MkRBQTJCO0lBQzFCO1FBQVIsS0FBSyxFQUFFO3lEQUEwQjtJQUN6QjtRQUFSLEtBQUssRUFBRTt5REFBMEI7SUFDekI7UUFBUixLQUFLLEVBQUU7NkRBQXNCO0lBRzlCO1FBREMsS0FBSyxFQUFFO3lEQUdQO0lBUUQ7UUFEQyxLQUFLLEVBQUU7bURBSVA7SUFPRDtRQURDLEtBQUssRUFBRTtxREFJUDtJQU1TO1FBQVQsTUFBTSxFQUFFO3lEQUFrQztJQUNqQztRQUFULE1BQU0sRUFBRTt5REFBa0M7SUFyQ2hDLGdCQUFnQjtRQU41QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLFFBQVEsRUFBRSx1QkFFVDtTQUNGLENBQUM7T0FDVyxnQkFBZ0IsQ0F5RTVCO0lBQUQsdUJBQUM7Q0FBQSxBQXpFRCxJQXlFQztTQXpFWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE9uRGVzdHJveSwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBjb3VudCwgZGVjaW1hbENoZWNrZXIgfSBmcm9tICcuL2NvdW50LmhlbHBlcic7XHJcblxyXG4vKipcclxuICogQ291bnQgdXAgY29tcG9uZW50XHJcbiAqXHJcbiAqIExvb3NlbHkgaW5zcGlyZWQgYnk6XHJcbiAqICAtIGh0dHBzOi8vZ2l0aHViLmNvbS9penVwZXQvYW5ndWxhcjItY291bnRvXHJcbiAqICAtIGh0dHBzOi8vaW5vcmdhbmlrLmdpdGh1Yi5pby9jb3VudFVwLmpzL1xyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ1tuZ3gtY2hhcnRzLWNvdW50LXVwXScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIHt7IHZhbHVlIH19XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ291bnRVcERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgY291bnREdXJhdGlvbjogbnVtYmVyID0gMTtcclxuICBASW5wdXQoKSBjb3VudFByZWZpeDogc3RyaW5nID0gJyc7XHJcbiAgQElucHV0KCkgY291bnRTdWZmaXg6IHN0cmluZyA9ICcnO1xyXG4gIEBJbnB1dCgpIHZhbHVlRm9ybWF0dGluZzogYW55O1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBjb3VudERlY2ltYWxzKHZhbDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9jb3VudERlY2ltYWxzID0gdmFsO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNvdW50RGVjaW1hbHMoKTogbnVtYmVyIHtcclxuICAgIGlmICh0aGlzLl9jb3VudERlY2ltYWxzKSByZXR1cm4gdGhpcy5fY291bnREZWNpbWFscztcclxuICAgIHJldHVybiBkZWNpbWFsQ2hlY2tlcih0aGlzLmNvdW50VG8pO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgY291bnRUbyh2YWwpIHtcclxuICAgIHRoaXMuX2NvdW50VG8gPSBwYXJzZUZsb2F0KHZhbCk7XHJcbiAgICB0aGlzLnN0YXJ0KCk7XHJcbiAgfVxyXG5cclxuICBnZXQgY291bnRUbygpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvdW50VG87XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBjb3VudEZyb20odmFsKSB7XHJcbiAgICB0aGlzLl9jb3VudEZyb20gPSBwYXJzZUZsb2F0KHZhbCk7XHJcbiAgICB0aGlzLnN0YXJ0KCk7XHJcbiAgfVxyXG5cclxuICBnZXQgY291bnRGcm9tKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY291bnRGcm9tO1xyXG4gIH1cclxuXHJcbiAgQE91dHB1dCgpIGNvdW50Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBjb3VudEZpbmlzaCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgbmF0aXZlRWxlbWVudDogYW55O1xyXG5cclxuICB2YWx1ZTogYW55ID0gJyc7XHJcbiAgZm9ybWF0dGVkVmFsdWU6IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSBhbmltYXRpb25SZXE6IGFueTtcclxuXHJcbiAgcHJpdmF0ZSBfY291bnREZWNpbWFsczogbnVtYmVyID0gMDtcclxuICBwcml2YXRlIF9jb3VudFRvOiBudW1iZXIgPSAwO1xyXG4gIHByaXZhdGUgX2NvdW50RnJvbTogbnVtYmVyID0gMDtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcclxuICAgIHRoaXMubmF0aXZlRWxlbWVudCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb25SZXEpO1xyXG4gIH1cclxuXHJcbiAgc3RhcnQoKTogdm9pZCB7XHJcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvblJlcSk7XHJcblxyXG4gICAgY29uc3QgdmFsdWVGb3JtYXR0aW5nID1cclxuICAgICAgdGhpcy52YWx1ZUZvcm1hdHRpbmcgfHwgKHZhbHVlID0+IGAke3RoaXMuY291bnRQcmVmaXh9JHt2YWx1ZS50b0xvY2FsZVN0cmluZygpfSR7dGhpcy5jb3VudFN1ZmZpeH1gKTtcclxuXHJcbiAgICBjb25zdCBjYWxsYmFjayA9ICh7IHZhbHVlLCBwcm9ncmVzcywgZmluaXNoZWQgfSkgPT4ge1xyXG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWVGb3JtYXR0aW5nKHZhbHVlKTtcclxuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgaWYgKCFmaW5pc2hlZCkgdGhpcy5jb3VudENoYW5nZS5lbWl0KHsgdmFsdWU6IHRoaXMudmFsdWUsIHByb2dyZXNzIH0pO1xyXG4gICAgICBpZiAoZmluaXNoZWQpIHRoaXMuY291bnRGaW5pc2guZW1pdCh7IHZhbHVlOiB0aGlzLnZhbHVlLCBwcm9ncmVzcyB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5hbmltYXRpb25SZXEgPSBjb3VudCh0aGlzLmNvdW50RnJvbSwgdGhpcy5jb3VudFRvLCB0aGlzLmNvdW50RGVjaW1hbHMsIHRoaXMuY291bnREdXJhdGlvbiwgY2FsbGJhY2spO1xyXG4gIH1cclxufVxyXG4iXX0=