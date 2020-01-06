import { __decorate } from "tslib";
import { Output, EventEmitter, NgZone, Directive } from '@angular/core';
/**
 * Visibility Observer
 */
let VisibilityObserver = class VisibilityObserver {
    constructor(element, zone) {
        this.element = element;
        this.zone = zone;
        this.visible = new EventEmitter();
        this.isVisible = false;
        this.runCheck();
    }
    destroy() {
        clearTimeout(this.timeout);
    }
    onVisibilityChange() {
        // trigger zone recalc for columns
        this.zone.run(() => {
            this.isVisible = true;
            this.visible.emit(true);
        });
    }
    runCheck() {
        const check = () => {
            if (!this.element) {
                return;
            }
            // https://davidwalsh.name/offsetheight-visibility
            const { offsetHeight, offsetWidth } = this.element.nativeElement;
            if (offsetHeight && offsetWidth) {
                clearTimeout(this.timeout);
                this.onVisibilityChange();
            }
            else {
                clearTimeout(this.timeout);
                this.zone.runOutsideAngular(() => {
                    this.timeout = setTimeout(() => check(), 100);
                });
            }
        };
        this.zone.runOutsideAngular(() => {
            this.timeout = setTimeout(() => check());
        });
    }
};
VisibilityObserver.ctorParameters = () => [
    { type: undefined },
    { type: NgZone }
];
__decorate([
    Output()
], VisibilityObserver.prototype, "visible", void 0);
VisibilityObserver = __decorate([
    Directive()
], VisibilityObserver);
export { VisibilityObserver };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaWJpbGl0eS1vYnNlcnZlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL3Zpc2liaWxpdHktb2JzZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEU7O0dBRUc7QUFFSCxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQU03QixZQUFvQixPQUFZLEVBQVUsSUFBWTtRQUFsQyxZQUFPLEdBQVAsT0FBTyxDQUFLO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUw1QyxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHMUQsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUd6QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVELE9BQU87UUFDTCxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsa0NBQWtDO1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTtZQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxLQUFLLEdBQUcsR0FBRyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNqQixPQUFPO2FBQ1I7WUFFRCxrREFBa0Q7WUFDbEQsTUFBTSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztZQUVqRSxJQUFJLFlBQVksSUFBSSxXQUFXLEVBQUU7Z0JBQy9CLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2FBQzNCO2lCQUFNO2dCQUNMLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO29CQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDaEQsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUMsQ0FBQztRQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQTs7O1lBeENpRCxNQUFNOztBQUw1QztJQUFULE1BQU0sRUFBRTttREFBaUQ7QUFEL0Msa0JBQWtCO0lBRDlCLFNBQVMsRUFBRTtHQUNDLGtCQUFrQixDQThDOUI7U0E5Q1ksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE5nWm9uZSwgRGlyZWN0aXZlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogVmlzaWJpbGl0eSBPYnNlcnZlclxyXG4gKi9cclxuQERpcmVjdGl2ZSgpXHJcbmV4cG9ydCBjbGFzcyBWaXNpYmlsaXR5T2JzZXJ2ZXIge1xyXG4gIEBPdXRwdXQoKSB2aXNpYmxlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgdGltZW91dDogYW55O1xyXG4gIGlzVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IGFueSwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHtcclxuICAgIHRoaXMucnVuQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIGRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcclxuICB9XHJcblxyXG4gIG9uVmlzaWJpbGl0eUNoYW5nZSgpOiB2b2lkIHtcclxuICAgIC8vIHRyaWdnZXIgem9uZSByZWNhbGMgZm9yIGNvbHVtbnNcclxuICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgIHRoaXMudmlzaWJsZS5lbWl0KHRydWUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBydW5DaGVjaygpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNoZWNrID0gKCkgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMuZWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gaHR0cHM6Ly9kYXZpZHdhbHNoLm5hbWUvb2Zmc2V0aGVpZ2h0LXZpc2liaWxpdHlcclxuICAgICAgY29uc3QgeyBvZmZzZXRIZWlnaHQsIG9mZnNldFdpZHRoIH0gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuXHJcbiAgICAgIGlmIChvZmZzZXRIZWlnaHQgJiYgb2Zmc2V0V2lkdGgpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcclxuICAgICAgICB0aGlzLm9uVmlzaWJpbGl0eUNoYW5nZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xyXG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IGNoZWNrKCksIDEwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiBjaGVjaygpKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=