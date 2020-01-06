import { __decorate } from "tslib";
import { Directive, Input, Output, EventEmitter, HostListener, ViewContainerRef, Renderer2, OnDestroy } from '@angular/core';
import { PlacementTypes } from './position';
import { StyleTypes } from './style.type';
import { AlignmentTypes } from './alignment.type';
import { ShowTypes } from './show.type';
import { TooltipService } from './tooltip.service';
var TooltipDirective = /** @class */ (function () {
    function TooltipDirective(tooltipService, viewContainerRef, renderer) {
        this.tooltipService = tooltipService;
        this.viewContainerRef = viewContainerRef;
        this.renderer = renderer;
        this.tooltipCssClass = '';
        this.tooltipTitle = '';
        this.tooltipAppendToBody = true;
        this.tooltipSpacing = 10;
        this.tooltipDisabled = false;
        this.tooltipShowCaret = true;
        this.tooltipPlacement = PlacementTypes.top;
        this.tooltipAlignment = AlignmentTypes.center;
        this.tooltipType = StyleTypes.popover;
        this.tooltipCloseOnClickOutside = true;
        this.tooltipCloseOnMouseLeave = true;
        this.tooltipHideTimeout = 300;
        this.tooltipShowTimeout = 100;
        this.tooltipShowEvent = ShowTypes.all;
        this.tooltipImmediateExit = false;
        this.show = new EventEmitter();
        this.hide = new EventEmitter();
    }
    Object.defineProperty(TooltipDirective.prototype, "listensForFocus", {
        get: function () {
            return this.tooltipShowEvent === ShowTypes.all || this.tooltipShowEvent === ShowTypes.focus;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "listensForHover", {
        get: function () {
            return this.tooltipShowEvent === ShowTypes.all || this.tooltipShowEvent === ShowTypes.mouseover;
        },
        enumerable: true,
        configurable: true
    });
    TooltipDirective.prototype.ngOnDestroy = function () {
        this.hideTooltip(true);
    };
    TooltipDirective.prototype.onFocus = function () {
        if (this.listensForFocus) {
            this.showTooltip();
        }
    };
    TooltipDirective.prototype.onBlur = function () {
        if (this.listensForFocus) {
            this.hideTooltip(true);
        }
    };
    TooltipDirective.prototype.onMouseEnter = function () {
        if (this.listensForHover) {
            this.showTooltip();
        }
    };
    TooltipDirective.prototype.onMouseLeave = function (target) {
        if (this.listensForHover && this.tooltipCloseOnMouseLeave) {
            clearTimeout(this.timeout);
            if (this.component) {
                var contentDom = this.component.instance.element.nativeElement;
                var contains = contentDom.contains(target);
                if (contains)
                    return;
            }
            this.hideTooltip(this.tooltipImmediateExit);
        }
    };
    TooltipDirective.prototype.onMouseClick = function () {
        if (this.listensForHover) {
            this.hideTooltip(true);
        }
    };
    TooltipDirective.prototype.showTooltip = function (immediate) {
        var _this = this;
        if (this.component || this.tooltipDisabled)
            return;
        var time = immediate ? 0 : this.tooltipShowTimeout;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
            _this.tooltipService.destroyAll();
            var options = _this.createBoundOptions();
            _this.component = _this.tooltipService.create(options);
            // add a tiny timeout to avoid event re-triggers
            setTimeout(function () {
                if (_this.component) {
                    _this.addHideListeners(_this.component.instance.element.nativeElement);
                }
            }, 10);
            _this.show.emit(true);
        }, time);
    };
    TooltipDirective.prototype.addHideListeners = function (tooltip) {
        var _this = this;
        // on mouse enter, cancel the hide triggered by the leave
        this.mouseEnterContentEvent = this.renderer.listen(tooltip, 'mouseenter', function () {
            clearTimeout(_this.timeout);
        });
        // content mouse leave listener
        if (this.tooltipCloseOnMouseLeave) {
            this.mouseLeaveContentEvent = this.renderer.listen(tooltip, 'mouseleave', function () {
                _this.hideTooltip(_this.tooltipImmediateExit);
            });
        }
        // content close on click outside
        if (this.tooltipCloseOnClickOutside) {
            this.documentClickEvent = this.renderer.listen(document, 'click', function (event) {
                var contains = tooltip.contains(event.target);
                if (!contains)
                    _this.hideTooltip();
            });
        }
    };
    TooltipDirective.prototype.hideTooltip = function (immediate) {
        var _this = this;
        if (immediate === void 0) { immediate = false; }
        if (!this.component)
            return;
        var destroyFn = function () {
            // remove events
            if (_this.mouseLeaveContentEvent)
                _this.mouseLeaveContentEvent();
            if (_this.mouseEnterContentEvent)
                _this.mouseEnterContentEvent();
            if (_this.documentClickEvent)
                _this.documentClickEvent();
            // emit events
            _this.hide.emit(true);
            // destroy component
            _this.tooltipService.destroy(_this.component);
            _this.component = undefined;
        };
        clearTimeout(this.timeout);
        if (!immediate) {
            this.timeout = setTimeout(destroyFn, this.tooltipHideTimeout);
        }
        else {
            destroyFn();
        }
    };
    TooltipDirective.prototype.createBoundOptions = function () {
        return {
            title: this.tooltipTitle,
            template: this.tooltipTemplate,
            host: this.viewContainerRef.element,
            placement: this.tooltipPlacement,
            alignment: this.tooltipAlignment,
            type: this.tooltipType,
            showCaret: this.tooltipShowCaret,
            cssClass: this.tooltipCssClass,
            spacing: this.tooltipSpacing,
            context: this.tooltipContext
        };
    };
    TooltipDirective.ctorParameters = function () { return [
        { type: TooltipService },
        { type: ViewContainerRef },
        { type: Renderer2 }
    ]; };
    __decorate([
        Input()
    ], TooltipDirective.prototype, "tooltipCssClass", void 0);
    __decorate([
        Input()
    ], TooltipDirective.prototype, "tooltipTitle", void 0);
    __decorate([
        Input()
    ], TooltipDirective.prototype, "tooltipAppendToBody", void 0);
    __decorate([
        Input()
    ], TooltipDirective.prototype, "tooltipSpacing", void 0);
    __decorate([
        Input()
    ], TooltipDirective.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input()
    ], TooltipDirective.prototype, "tooltipShowCaret", void 0);
    __decorate([
        Input()
    ], TooltipDirective.prototype, "tooltipPlacement", void 0);
    __decorate([
        Input()
    ], TooltipDirective.prototype, "tooltipAlignment", void 0);
    __decorate([
        Input()
    ], TooltipDirective.prototype, "tooltipType", void 0);
    __decorate([
        Input()
    ], TooltipDirective.prototype, "tooltipCloseOnClickOutside", void 0);
    __decorate([
        Input()
    ], TooltipDirective.prototype, "tooltipCloseOnMouseLeave", void 0);
    __decorate([
        Input()
    ], TooltipDirective.prototype, "tooltipHideTimeout", void 0);
    __decorate([
        Input()
    ], TooltipDirective.prototype, "tooltipShowTimeout", void 0);
    __decorate([
        Input()
    ], TooltipDirective.prototype, "tooltipTemplate", void 0);
    __decorate([
        Input()
    ], TooltipDirective.prototype, "tooltipShowEvent", void 0);
    __decorate([
        Input()
    ], TooltipDirective.prototype, "tooltipContext", void 0);
    __decorate([
        Input()
    ], TooltipDirective.prototype, "tooltipImmediateExit", void 0);
    __decorate([
        Output()
    ], TooltipDirective.prototype, "show", void 0);
    __decorate([
        Output()
    ], TooltipDirective.prototype, "hide", void 0);
    __decorate([
        HostListener('focusin')
    ], TooltipDirective.prototype, "onFocus", null);
    __decorate([
        HostListener('blur')
    ], TooltipDirective.prototype, "onBlur", null);
    __decorate([
        HostListener('mouseenter')
    ], TooltipDirective.prototype, "onMouseEnter", null);
    __decorate([
        HostListener('mouseleave', ['$event.target'])
    ], TooltipDirective.prototype, "onMouseLeave", null);
    __decorate([
        HostListener('click')
    ], TooltipDirective.prototype, "onMouseClick", null);
    TooltipDirective = __decorate([
        Directive({ selector: '[ngx-tooltip]' })
    ], TooltipDirective);
    return TooltipDirective;
}());
export { TooltipDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vdG9vbHRpcC90b29sdGlwLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixZQUFZLEVBQ1osZ0JBQWdCLEVBQ2hCLFNBQVMsRUFDVCxTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM1QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXhDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUduRDtJQW9DRSwwQkFDVSxjQUE4QixFQUM5QixnQkFBa0MsRUFDbEMsUUFBbUI7UUFGbkIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQXRDcEIsb0JBQWUsR0FBVyxFQUFFLENBQUM7UUFDN0IsaUJBQVksR0FBVyxFQUFFLENBQUM7UUFDMUIsd0JBQW1CLEdBQVksSUFBSSxDQUFDO1FBQ3BDLG1CQUFjLEdBQVcsRUFBRSxDQUFDO1FBQzVCLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBQ2pDLHFCQUFnQixHQUFZLElBQUksQ0FBQztRQUNqQyxxQkFBZ0IsR0FBbUIsY0FBYyxDQUFDLEdBQUcsQ0FBQztRQUN0RCxxQkFBZ0IsR0FBbUIsY0FBYyxDQUFDLE1BQU0sQ0FBQztRQUN6RCxnQkFBVyxHQUFlLFVBQVUsQ0FBQyxPQUFPLENBQUM7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SzFCO0lBR0Q7UUFEQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUM7d0RBYTdDO0lBR0Q7UUFEQyxZQUFZLENBQUMsT0FBTyxDQUFDO3dEQUtyQjtJQXZGVSxnQkFBZ0I7UUFENUIsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxDQUFDO09BQzVCLGdCQUFnQixDQTZLNUI7SUFBRCx1QkFBQztDQUFBLEFBN0tELElBNktDO1NBN0tZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIFZpZXdDb250YWluZXJSZWYsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIE9uRGVzdHJveVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgUGxhY2VtZW50VHlwZXMgfSBmcm9tICcuL3Bvc2l0aW9uJztcclxuaW1wb3J0IHsgU3R5bGVUeXBlcyB9IGZyb20gJy4vc3R5bGUudHlwZSc7XHJcbmltcG9ydCB7IEFsaWdubWVudFR5cGVzIH0gZnJvbSAnLi9hbGlnbm1lbnQudHlwZSc7XHJcbmltcG9ydCB7IFNob3dUeXBlcyB9IGZyb20gJy4vc2hvdy50eXBlJztcclxuXHJcbmltcG9ydCB7IFRvb2x0aXBTZXJ2aWNlIH0gZnJvbSAnLi90b29sdGlwLnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25neC10b29sdGlwXScgfSlcclxuZXhwb3J0IGNsYXNzIFRvb2x0aXBEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBDc3NDbGFzczogc3RyaW5nID0gJyc7XHJcbiAgQElucHV0KCkgdG9vbHRpcFRpdGxlOiBzdHJpbmcgPSAnJztcclxuICBASW5wdXQoKSB0b29sdGlwQXBwZW5kVG9Cb2R5OiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSB0b29sdGlwU3BhY2luZzogbnVtYmVyID0gMTA7XHJcbiAgQElucHV0KCkgdG9vbHRpcERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgdG9vbHRpcFNob3dDYXJldDogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCkgdG9vbHRpcFBsYWNlbWVudDogUGxhY2VtZW50VHlwZXMgPSBQbGFjZW1lbnRUeXBlcy50b3A7XHJcbiAgQElucHV0KCkgdG9vbHRpcEFsaWdubWVudDogQWxpZ25tZW50VHlwZXMgPSBBbGlnbm1lbnRUeXBlcy5jZW50ZXI7XHJcbiAgQElucHV0KCkgdG9vbHRpcFR5cGU6IFN0eWxlVHlwZXMgPSBTdHlsZVR5cGVzLnBvcG92ZXI7XHJcbiAgQElucHV0KCkgdG9vbHRpcENsb3NlT25DbGlja091dHNpZGU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBDbG9zZU9uTW91c2VMZWF2ZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCkgdG9vbHRpcEhpZGVUaW1lb3V0OiBudW1iZXIgPSAzMDA7XHJcbiAgQElucHV0KCkgdG9vbHRpcFNob3dUaW1lb3V0OiBudW1iZXIgPSAxMDA7XHJcbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBhbnk7XHJcbiAgQElucHV0KCkgdG9vbHRpcFNob3dFdmVudDogU2hvd1R5cGVzID0gU2hvd1R5cGVzLmFsbDtcclxuICBASW5wdXQoKSB0b29sdGlwQ29udGV4dDogYW55O1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBJbW1lZGlhdGVFeGl0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBPdXRwdXQoKSBzaG93ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBoaWRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBwcml2YXRlIGdldCBsaXN0ZW5zRm9yRm9jdXMoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy50b29sdGlwU2hvd0V2ZW50ID09PSBTaG93VHlwZXMuYWxsIHx8IHRoaXMudG9vbHRpcFNob3dFdmVudCA9PT0gU2hvd1R5cGVzLmZvY3VzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXQgbGlzdGVuc0ZvckhvdmVyKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMudG9vbHRpcFNob3dFdmVudCA9PT0gU2hvd1R5cGVzLmFsbCB8fCB0aGlzLnRvb2x0aXBTaG93RXZlbnQgPT09IFNob3dUeXBlcy5tb3VzZW92ZXI7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXBvbmVudDogYW55O1xyXG4gIHByaXZhdGUgdGltZW91dDogYW55O1xyXG4gIHByaXZhdGUgbW91c2VMZWF2ZUNvbnRlbnRFdmVudDogYW55O1xyXG4gIHByaXZhdGUgbW91c2VFbnRlckNvbnRlbnRFdmVudDogYW55O1xyXG4gIHByaXZhdGUgZG9jdW1lbnRDbGlja0V2ZW50OiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB0b29sdGlwU2VydmljZTogVG9vbHRpcFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcclxuICApIHt9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5oaWRlVG9vbHRpcCh0cnVlKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzaW4nKVxyXG4gIG9uRm9jdXMoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5saXN0ZW5zRm9yRm9jdXMpIHtcclxuICAgICAgdGhpcy5zaG93VG9vbHRpcCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXHJcbiAgb25CbHVyKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMubGlzdGVuc0ZvckZvY3VzKSB7XHJcbiAgICAgIHRoaXMuaGlkZVRvb2x0aXAodHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcclxuICBvbk1vdXNlRW50ZXIoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5saXN0ZW5zRm9ySG92ZXIpIHtcclxuICAgICAgdGhpcy5zaG93VG9vbHRpcCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScsIFsnJGV2ZW50LnRhcmdldCddKVxyXG4gIG9uTW91c2VMZWF2ZSh0YXJnZXQpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmxpc3RlbnNGb3JIb3ZlciAmJiB0aGlzLnRvb2x0aXBDbG9zZU9uTW91c2VMZWF2ZSkge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmNvbXBvbmVudCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnREb20gPSB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgY29udGFpbnMgPSBjb250ZW50RG9tLmNvbnRhaW5zKHRhcmdldCk7XHJcbiAgICAgICAgaWYgKGNvbnRhaW5zKSByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuaGlkZVRvb2x0aXAodGhpcy50b29sdGlwSW1tZWRpYXRlRXhpdCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXHJcbiAgb25Nb3VzZUNsaWNrKCkge1xyXG4gICAgaWYgKHRoaXMubGlzdGVuc0ZvckhvdmVyKSB7XHJcbiAgICAgIHRoaXMuaGlkZVRvb2x0aXAodHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzaG93VG9vbHRpcChpbW1lZGlhdGU/OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5jb21wb25lbnQgfHwgdGhpcy50b29sdGlwRGlzYWJsZWQpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCB0aW1lID0gaW1tZWRpYXRlID8gMCA6IHRoaXMudG9vbHRpcFNob3dUaW1lb3V0O1xyXG5cclxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xyXG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMudG9vbHRpcFNlcnZpY2UuZGVzdHJveUFsbCgpO1xyXG5cclxuICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuY3JlYXRlQm91bmRPcHRpb25zKCk7XHJcbiAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy50b29sdGlwU2VydmljZS5jcmVhdGUob3B0aW9ucyk7XHJcblxyXG4gICAgICAvLyBhZGQgYSB0aW55IHRpbWVvdXQgdG8gYXZvaWQgZXZlbnQgcmUtdHJpZ2dlcnNcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50KSB7XHJcbiAgICAgICAgICB0aGlzLmFkZEhpZGVMaXN0ZW5lcnModGhpcy5jb21wb25lbnQuaW5zdGFuY2UuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDEwKTtcclxuXHJcbiAgICAgIHRoaXMuc2hvdy5lbWl0KHRydWUpO1xyXG4gICAgfSwgdGltZSk7XHJcbiAgfVxyXG5cclxuICBhZGRIaWRlTGlzdGVuZXJzKHRvb2x0aXApOiB2b2lkIHtcclxuICAgIC8vIG9uIG1vdXNlIGVudGVyLCBjYW5jZWwgdGhlIGhpZGUgdHJpZ2dlcmVkIGJ5IHRoZSBsZWF2ZVxyXG4gICAgdGhpcy5tb3VzZUVudGVyQ29udGVudEV2ZW50ID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odG9vbHRpcCwgJ21vdXNlZW50ZXInLCAoKSA9PiB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gY29udGVudCBtb3VzZSBsZWF2ZSBsaXN0ZW5lclxyXG4gICAgaWYgKHRoaXMudG9vbHRpcENsb3NlT25Nb3VzZUxlYXZlKSB7XHJcbiAgICAgIHRoaXMubW91c2VMZWF2ZUNvbnRlbnRFdmVudCA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRvb2x0aXAsICdtb3VzZWxlYXZlJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuaGlkZVRvb2x0aXAodGhpcy50b29sdGlwSW1tZWRpYXRlRXhpdCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbnRlbnQgY2xvc2Ugb24gY2xpY2sgb3V0c2lkZVxyXG4gICAgaWYgKHRoaXMudG9vbHRpcENsb3NlT25DbGlja091dHNpZGUpIHtcclxuICAgICAgdGhpcy5kb2N1bWVudENsaWNrRXZlbnQgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5zID0gdG9vbHRpcC5jb250YWlucyhldmVudC50YXJnZXQpO1xyXG4gICAgICAgIGlmICghY29udGFpbnMpIHRoaXMuaGlkZVRvb2x0aXAoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoaWRlVG9vbHRpcChpbW1lZGlhdGU6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmNvbXBvbmVudCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGRlc3Ryb3lGbiA9ICgpID0+IHtcclxuICAgICAgLy8gcmVtb3ZlIGV2ZW50c1xyXG4gICAgICBpZiAodGhpcy5tb3VzZUxlYXZlQ29udGVudEV2ZW50KSB0aGlzLm1vdXNlTGVhdmVDb250ZW50RXZlbnQoKTtcclxuICAgICAgaWYgKHRoaXMubW91c2VFbnRlckNvbnRlbnRFdmVudCkgdGhpcy5tb3VzZUVudGVyQ29udGVudEV2ZW50KCk7XHJcbiAgICAgIGlmICh0aGlzLmRvY3VtZW50Q2xpY2tFdmVudCkgdGhpcy5kb2N1bWVudENsaWNrRXZlbnQoKTtcclxuXHJcbiAgICAgIC8vIGVtaXQgZXZlbnRzXHJcbiAgICAgIHRoaXMuaGlkZS5lbWl0KHRydWUpO1xyXG5cclxuICAgICAgLy8gZGVzdHJveSBjb21wb25lbnRcclxuICAgICAgdGhpcy50b29sdGlwU2VydmljZS5kZXN0cm95KHRoaXMuY29tcG9uZW50KTtcclxuICAgICAgdGhpcy5jb21wb25lbnQgPSB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xyXG4gICAgaWYgKCFpbW1lZGlhdGUpIHtcclxuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChkZXN0cm95Rm4sIHRoaXMudG9vbHRpcEhpZGVUaW1lb3V0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRlc3Ryb3lGbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVCb3VuZE9wdGlvbnMoKTogYW55IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLnRvb2x0aXBUaXRsZSxcclxuICAgICAgdGVtcGxhdGU6IHRoaXMudG9vbHRpcFRlbXBsYXRlLFxyXG4gICAgICBob3N0OiB0aGlzLnZpZXdDb250YWluZXJSZWYuZWxlbWVudCxcclxuICAgICAgcGxhY2VtZW50OiB0aGlzLnRvb2x0aXBQbGFjZW1lbnQsXHJcbiAgICAgIGFsaWdubWVudDogdGhpcy50b29sdGlwQWxpZ25tZW50LFxyXG4gICAgICB0eXBlOiB0aGlzLnRvb2x0aXBUeXBlLFxyXG4gICAgICBzaG93Q2FyZXQ6IHRoaXMudG9vbHRpcFNob3dDYXJldCxcclxuICAgICAgY3NzQ2xhc3M6IHRoaXMudG9vbHRpcENzc0NsYXNzLFxyXG4gICAgICBzcGFjaW5nOiB0aGlzLnRvb2x0aXBTcGFjaW5nLFxyXG4gICAgICBjb250ZXh0OiB0aGlzLnRvb2x0aXBDb250ZXh0XHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=