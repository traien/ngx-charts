import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, OnChanges, ElementRef, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { select } from 'd3-selection';
var LineComponent = /** @class */ (function () {
    function LineComponent(element) {
        this.element = element;
        this.fill = 'none';
        this.animations = true;
        this.select = new EventEmitter();
        this.initialized = false;
    }
    LineComponent.prototype.ngOnChanges = function (changes) {
        if (!this.initialized) {
            this.initialized = true;
            this.initialPath = this.path;
        }
        else {
            this.updatePathEl();
        }
    };
    LineComponent.prototype.updatePathEl = function () {
        var node = select(this.element.nativeElement).select('.line');
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
    LineComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], LineComponent.prototype, "path", void 0);
    __decorate([
        Input()
    ], LineComponent.prototype, "stroke", void 0);
    __decorate([
        Input()
    ], LineComponent.prototype, "data", void 0);
    __decorate([
        Input()
    ], LineComponent.prototype, "fill", void 0);
    __decorate([
        Input()
    ], LineComponent.prototype, "animations", void 0);
    __decorate([
        Output()
    ], LineComponent.prototype, "select", void 0);
    LineComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-line]',
            template: "\n    <svg:path\n      [@animationState]=\"'active'\"\n      class=\"line\"\n      [attr.d]=\"initialPath\"\n      [attr.fill]=\"fill\"\n      [attr.stroke]=\"stroke\"\n      stroke-width=\"1.5px\"\n    />\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':enter', [
                        style({
                            strokeDasharray: 2000,
                            strokeDashoffset: 2000
                        }),
                        animate(1000, style({
                            strokeDashoffset: 0
                        }))
                    ])
                ])
            ]
        })
    ], LineComponent);
    return LineComponent;
}());
export { LineComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9saW5lLWNoYXJ0L2xpbmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1YsdUJBQXVCLEVBQ3ZCLGFBQWEsRUFDZCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQWdDdEM7SUFZRSx1QkFBb0IsT0FBbUI7UUFBbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQVI5QixTQUFJLEdBQVcsTUFBTSxDQUFDO1FBQ3RCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFMUIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFdEMsZ0JBQVcsR0FBWSxLQUFLLENBQUM7SUFHYSxDQUFDO0lBRTNDLG1DQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDOUI7YUFBTTtZQUNMLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQjtJQUNILENBQUM7SUFFRCxvQ0FBWSxHQUFaO1FBQ0UsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWhFLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJO2lCQUNELFVBQVUsRUFBRTtpQkFDWixRQUFRLENBQUMsR0FBRyxDQUFDO2lCQUNiLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pCO2FBQU07WUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0I7SUFDSCxDQUFDOztnQkF0QjRCLFVBQVU7O0lBWDlCO1FBQVIsS0FBSyxFQUFFOytDQUFNO0lBQ0w7UUFBUixLQUFLLEVBQUU7aURBQVE7SUFDUDtRQUFSLEtBQUssRUFBRTsrQ0FBTTtJQUNMO1FBQVIsS0FBSyxFQUFFOytDQUF1QjtJQUN0QjtRQUFSLEtBQUssRUFBRTtxREFBNEI7SUFFMUI7UUFBVCxNQUFNLEVBQUU7aURBQTZCO0lBUDNCLGFBQWE7UUE5QnpCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsUUFBUSxFQUFFLG1OQVNUO1lBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07WUFDL0MsVUFBVSxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDeEIsVUFBVSxDQUFDLFFBQVEsRUFBRTt3QkFDbkIsS0FBSyxDQUFDOzRCQUNKLGVBQWUsRUFBRSxJQUFJOzRCQUNyQixnQkFBZ0IsRUFBRSxJQUFJO3lCQUN2QixDQUFDO3dCQUNGLE9BQU8sQ0FDTCxJQUFJLEVBQ0osS0FBSyxDQUFDOzRCQUNKLGdCQUFnQixFQUFFLENBQUM7eUJBQ3BCLENBQUMsQ0FDSDtxQkFDRixDQUFDO2lCQUNILENBQUM7YUFDSDtTQUNGLENBQUM7T0FDVyxhQUFhLENBbUN6QjtJQUFELG9CQUFDO0NBQUEsQUFuQ0QsSUFtQ0M7U0FuQ1ksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgU2ltcGxlQ2hhbmdlc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyB0cmlnZ2VyLCBzdHlsZSwgYW5pbWF0ZSwgdHJhbnNpdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBzZWxlY3QgfSBmcm9tICdkMy1zZWxlY3Rpb24nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtbGluZV0nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8c3ZnOnBhdGhcclxuICAgICAgW0BhbmltYXRpb25TdGF0ZV09XCInYWN0aXZlJ1wiXHJcbiAgICAgIGNsYXNzPVwibGluZVwiXHJcbiAgICAgIFthdHRyLmRdPVwiaW5pdGlhbFBhdGhcIlxyXG4gICAgICBbYXR0ci5maWxsXT1cImZpbGxcIlxyXG4gICAgICBbYXR0ci5zdHJva2VdPVwic3Ryb2tlXCJcclxuICAgICAgc3Ryb2tlLXdpZHRoPVwiMS41cHhcIlxyXG4gICAgLz5cclxuICBgLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIGFuaW1hdGlvbnM6IFtcclxuICAgIHRyaWdnZXIoJ2FuaW1hdGlvblN0YXRlJywgW1xyXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXHJcbiAgICAgICAgc3R5bGUoe1xyXG4gICAgICAgICAgc3Ryb2tlRGFzaGFycmF5OiAyMDAwLFxyXG4gICAgICAgICAgc3Ryb2tlRGFzaG9mZnNldDogMjAwMFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGFuaW1hdGUoXHJcbiAgICAgICAgICAxMDAwLFxyXG4gICAgICAgICAgc3R5bGUoe1xyXG4gICAgICAgICAgICBzdHJva2VEYXNob2Zmc2V0OiAwXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIClcclxuICAgICAgXSlcclxuICAgIF0pXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGluZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgcGF0aDtcclxuICBASW5wdXQoKSBzdHJva2U7XHJcbiAgQElucHV0KCkgZGF0YTtcclxuICBASW5wdXQoKSBmaWxsOiBzdHJpbmcgPSAnbm9uZSc7XHJcbiAgQElucHV0KCkgYW5pbWF0aW9uczogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGluaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgaW5pdGlhbFBhdGg6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmKSB7fVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuaW5pdGlhbFBhdGggPSB0aGlzLnBhdGg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGhFbCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlUGF0aEVsKCk6IHZvaWQge1xyXG4gICAgY29uc3Qgbm9kZSA9IHNlbGVjdCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCkuc2VsZWN0KCcubGluZScpO1xyXG5cclxuICAgIGlmICh0aGlzLmFuaW1hdGlvbnMpIHtcclxuICAgICAgbm9kZVxyXG4gICAgICAgIC50cmFuc2l0aW9uKClcclxuICAgICAgICAuZHVyYXRpb24oNzUwKVxyXG4gICAgICAgIC5hdHRyKCdkJywgdGhpcy5wYXRoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5vZGUuYXR0cignZCcsIHRoaXMucGF0aCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==