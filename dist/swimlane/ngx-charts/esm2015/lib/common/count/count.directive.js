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
let CountUpDirective = class CountUpDirective {
    constructor(cd, element) {
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
    set countDecimals(val) {
        this._countDecimals = val;
    }
    get countDecimals() {
        if (this._countDecimals)
            return this._countDecimals;
        return decimalChecker(this.countTo);
    }
    set countTo(val) {
        this._countTo = parseFloat(val);
        this.start();
    }
    get countTo() {
        return this._countTo;
    }
    set countFrom(val) {
        this._countFrom = parseFloat(val);
        this.start();
    }
    get countFrom() {
        return this._countFrom;
    }
    ngOnDestroy() {
        cancelAnimationFrame(this.animationReq);
    }
    start() {
        cancelAnimationFrame(this.animationReq);
        const valueFormatting = this.valueFormatting || (value => `${this.countPrefix}${value.toLocaleString()}${this.countSuffix}`);
        const callback = ({ value, progress, finished }) => {
            this.value = valueFormatting(value);
            this.cd.markForCheck();
            if (!finished)
                this.countChange.emit({ value: this.value, progress });
            if (finished)
                this.countFinish.emit({ value: this.value, progress });
        };
        this.animationReq = count(this.countFrom, this.countTo, this.countDecimals, this.countDuration, callback);
    }
};
CountUpDirective.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
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
        template: `
    {{ value }}
  `
    })
], CountUpDirective);
export { CountUpDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL2NvdW50L2NvdW50LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pILE9BQU8sRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkQ7Ozs7Ozs7O0dBUUc7QUFPSCxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQWtEM0IsWUFBb0IsRUFBcUIsRUFBRSxPQUFtQjtRQUExQyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQWpEaEMsa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFDMUIsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFDekIsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFpQ3hCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFJM0MsVUFBSyxHQUFRLEVBQUUsQ0FBQztRQUtSLG1CQUFjLEdBQVcsQ0FBQyxDQUFDO1FBQzNCLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFDckIsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUc3QixJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDN0MsQ0FBQztJQTdDRCxJQUFJLGFBQWEsQ0FBQyxHQUFXO1FBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJLGFBQWE7UUFDZixJQUFJLElBQUksQ0FBQyxjQUFjO1lBQUUsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQ3BELE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBR0QsSUFBSSxPQUFPLENBQUMsR0FBRztRQUNiLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUdELElBQUksU0FBUyxDQUFDLEdBQUc7UUFDZixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFvQkQsV0FBVztRQUNULG9CQUFvQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsS0FBSztRQUNILG9CQUFvQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUV4QyxNQUFNLGVBQWUsR0FDbkIsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUV2RyxNQUFNLFFBQVEsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFO1lBQ2pELElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFFBQVE7Z0JBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ3RFLElBQUksUUFBUTtnQkFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDdkUsQ0FBQyxDQUFDO1FBRUYsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM1RyxDQUFDO0NBQ0YsQ0FBQTs7WUF2QnlCLGlCQUFpQjtZQUFXLFVBQVU7O0FBakRyRDtJQUFSLEtBQUssRUFBRTt1REFBMkI7QUFDMUI7SUFBUixLQUFLLEVBQUU7cURBQTBCO0FBQ3pCO0lBQVIsS0FBSyxFQUFFO3FEQUEwQjtBQUN6QjtJQUFSLEtBQUssRUFBRTt5REFBc0I7QUFHOUI7SUFEQyxLQUFLLEVBQUU7cURBR1A7QUFRRDtJQURDLEtBQUssRUFBRTsrQ0FJUDtBQU9EO0lBREMsS0FBSyxFQUFFO2lEQUlQO0FBTVM7SUFBVCxNQUFNLEVBQUU7cURBQWtDO0FBQ2pDO0lBQVQsTUFBTSxFQUFFO3FEQUFrQztBQXJDaEMsZ0JBQWdCO0lBTjVCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSx1QkFBdUI7UUFDakMsUUFBUSxFQUFFOztHQUVUO0tBQ0YsQ0FBQztHQUNXLGdCQUFnQixDQXlFNUI7U0F6RVksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENoYW5nZURldGVjdG9yUmVmLCBPbkRlc3Ryb3ksIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgY291bnQsIGRlY2ltYWxDaGVja2VyIH0gZnJvbSAnLi9jb3VudC5oZWxwZXInO1xyXG5cclxuLyoqXHJcbiAqIENvdW50IHVwIGNvbXBvbmVudFxyXG4gKlxyXG4gKiBMb29zZWx5IGluc3BpcmVkIGJ5OlxyXG4gKiAgLSBodHRwczovL2dpdGh1Yi5jb20vaXp1cGV0L2FuZ3VsYXIyLWNvdW50b1xyXG4gKiAgLSBodHRwczovL2lub3JnYW5pay5naXRodWIuaW8vY291bnRVcC5qcy9cclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdbbmd4LWNoYXJ0cy1jb3VudC11cF0nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICB7eyB2YWx1ZSB9fVxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIENvdW50VXBEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpIGNvdW50RHVyYXRpb246IG51bWJlciA9IDE7XHJcbiAgQElucHV0KCkgY291bnRQcmVmaXg6IHN0cmluZyA9ICcnO1xyXG4gIEBJbnB1dCgpIGNvdW50U3VmZml4OiBzdHJpbmcgPSAnJztcclxuICBASW5wdXQoKSB2YWx1ZUZvcm1hdHRpbmc6IGFueTtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgY291bnREZWNpbWFscyh2YWw6IG51bWJlcikge1xyXG4gICAgdGhpcy5fY291bnREZWNpbWFscyA9IHZhbDtcclxuICB9XHJcblxyXG4gIGdldCBjb3VudERlY2ltYWxzKCk6IG51bWJlciB7XHJcbiAgICBpZiAodGhpcy5fY291bnREZWNpbWFscykgcmV0dXJuIHRoaXMuX2NvdW50RGVjaW1hbHM7XHJcbiAgICByZXR1cm4gZGVjaW1hbENoZWNrZXIodGhpcy5jb3VudFRvKTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGNvdW50VG8odmFsKSB7XHJcbiAgICB0aGlzLl9jb3VudFRvID0gcGFyc2VGbG9hdCh2YWwpO1xyXG4gICAgdGhpcy5zdGFydCgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNvdW50VG8oKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLl9jb3VudFRvO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgY291bnRGcm9tKHZhbCkge1xyXG4gICAgdGhpcy5fY291bnRGcm9tID0gcGFyc2VGbG9hdCh2YWwpO1xyXG4gICAgdGhpcy5zdGFydCgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNvdW50RnJvbSgpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvdW50RnJvbTtcclxuICB9XHJcblxyXG4gIEBPdXRwdXQoKSBjb3VudENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgY291bnRGaW5pc2ggPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIG5hdGl2ZUVsZW1lbnQ6IGFueTtcclxuXHJcbiAgdmFsdWU6IGFueSA9ICcnO1xyXG4gIGZvcm1hdHRlZFZhbHVlOiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgYW5pbWF0aW9uUmVxOiBhbnk7XHJcblxyXG4gIHByaXZhdGUgX2NvdW50RGVjaW1hbHM6IG51bWJlciA9IDA7XHJcbiAgcHJpdmF0ZSBfY291bnRUbzogbnVtYmVyID0gMDtcclxuICBwcml2YXRlIF9jb3VudEZyb206IG51bWJlciA9IDA7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBlbGVtZW50OiBFbGVtZW50UmVmKSB7XHJcbiAgICB0aGlzLm5hdGl2ZUVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uUmVxKTtcclxuICB9XHJcblxyXG4gIHN0YXJ0KCk6IHZvaWQge1xyXG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb25SZXEpO1xyXG5cclxuICAgIGNvbnN0IHZhbHVlRm9ybWF0dGluZyA9XHJcbiAgICAgIHRoaXMudmFsdWVGb3JtYXR0aW5nIHx8ICh2YWx1ZSA9PiBgJHt0aGlzLmNvdW50UHJlZml4fSR7dmFsdWUudG9Mb2NhbGVTdHJpbmcoKX0ke3RoaXMuY291bnRTdWZmaXh9YCk7XHJcblxyXG4gICAgY29uc3QgY2FsbGJhY2sgPSAoeyB2YWx1ZSwgcHJvZ3Jlc3MsIGZpbmlzaGVkIH0pID0+IHtcclxuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlRm9ybWF0dGluZyh2YWx1ZSk7XHJcbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgIGlmICghZmluaXNoZWQpIHRoaXMuY291bnRDaGFuZ2UuZW1pdCh7IHZhbHVlOiB0aGlzLnZhbHVlLCBwcm9ncmVzcyB9KTtcclxuICAgICAgaWYgKGZpbmlzaGVkKSB0aGlzLmNvdW50RmluaXNoLmVtaXQoeyB2YWx1ZTogdGhpcy52YWx1ZSwgcHJvZ3Jlc3MgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuYW5pbWF0aW9uUmVxID0gY291bnQodGhpcy5jb3VudEZyb20sIHRoaXMuY291bnRUbywgdGhpcy5jb3VudERlY2ltYWxzLCB0aGlzLmNvdW50RHVyYXRpb24sIGNhbGxiYWNrKTtcclxuICB9XHJcbn1cclxuIl19