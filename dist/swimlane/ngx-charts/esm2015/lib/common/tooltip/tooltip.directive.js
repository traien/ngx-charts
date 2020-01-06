import { __decorate } from "tslib";
import { Directive, Input, Output, EventEmitter, HostListener, ViewContainerRef, Renderer2, OnDestroy } from '@angular/core';
import { PlacementTypes } from './position';
import { StyleTypes } from './style.type';
import { AlignmentTypes } from './alignment.type';
import { ShowTypes } from './show.type';
import { TooltipService } from './tooltip.service';
let TooltipDirective = class TooltipDirective {
    constructor(tooltipService, viewContainerRef, renderer) {
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
    get listensForFocus() {
        return this.tooltipShowEvent === ShowTypes.all || this.tooltipShowEvent === ShowTypes.focus;
    }
    get listensForHover() {
        return this.tooltipShowEvent === ShowTypes.all || this.tooltipShowEvent === ShowTypes.mouseover;
    }
    ngOnDestroy() {
        this.hideTooltip(true);
    }
    onFocus() {
        if (this.listensForFocus) {
            this.showTooltip();
        }
    }
    onBlur() {
        if (this.listensForFocus) {
            this.hideTooltip(true);
        }
    }
    onMouseEnter() {
        if (this.listensForHover) {
            this.showTooltip();
        }
    }
    onMouseLeave(target) {
        if (this.listensForHover && this.tooltipCloseOnMouseLeave) {
            clearTimeout(this.timeout);
            if (this.component) {
                const contentDom = this.component.instance.element.nativeElement;
                const contains = contentDom.contains(target);
                if (contains)
                    return;
            }
            this.hideTooltip(this.tooltipImmediateExit);
        }
    }
    onMouseClick() {
        if (this.listensForHover) {
            this.hideTooltip(true);
        }
    }
    showTooltip(immediate) {
        if (this.component || this.tooltipDisabled)
            return;
        const time = immediate ? 0 : this.tooltipShowTimeout;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.tooltipService.destroyAll();
            const options = this.createBoundOptions();
            this.component = this.tooltipService.create(options);
            // add a tiny timeout to avoid event re-triggers
            setTimeout(() => {
                if (this.component) {
                    this.addHideListeners(this.component.instance.element.nativeElement);
                }
            }, 10);
            this.show.emit(true);
        }, time);
    }
    addHideListeners(tooltip) {
        // on mouse enter, cancel the hide triggered by the leave
        this.mouseEnterContentEvent = this.renderer.listen(tooltip, 'mouseenter', () => {
            clearTimeout(this.timeout);
        });
        // content mouse leave listener
        if (this.tooltipCloseOnMouseLeave) {
            this.mouseLeaveContentEvent = this.renderer.listen(tooltip, 'mouseleave', () => {
                this.hideTooltip(this.tooltipImmediateExit);
            });
        }
        // content close on click outside
        if (this.tooltipCloseOnClickOutside) {
            this.documentClickEvent = this.renderer.listen(document, 'click', event => {
                const contains = tooltip.contains(event.target);
                if (!contains)
                    this.hideTooltip();
            });
        }
    }
    hideTooltip(immediate = false) {
        if (!this.component)
            return;
        const destroyFn = () => {
            // remove events
            if (this.mouseLeaveContentEvent)
                this.mouseLeaveContentEvent();
            if (this.mouseEnterContentEvent)
                this.mouseEnterContentEvent();
            if (this.documentClickEvent)
                this.documentClickEvent();
            // emit events
            this.hide.emit(true);
            // destroy component
            this.tooltipService.destroy(this.component);
            this.component = undefined;
        };
        clearTimeout(this.timeout);
        if (!immediate) {
            this.timeout = setTimeout(destroyFn, this.tooltipHideTimeout);
        }
        else {
            destroyFn();
        }
    }
    createBoundOptions() {
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
    }
};
TooltipDirective.ctorParameters = () => [
    { type: TooltipService },
    { type: ViewContainerRef },
    { type: Renderer2 }
];
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
export { TooltipDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vdG9vbHRpcC90b29sdGlwLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixZQUFZLEVBQ1osZ0JBQWdCLEVBQ2hCLFNBQVMsRUFDVCxTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM1QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXhDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUduRCxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQW9DM0IsWUFDVSxjQUE4QixFQUM5QixnQkFBa0MsRUFDbEMsUUFBbUI7UUFGbkIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQXRDcEIsb0JBQWUsR0FBVyxFQUFFLENBQUM7UUFDN0IsaUJBQVksR0FBVyxFQUFFLENBQUM7UUFDMUIsd0JBQW1CLEdBQVksSUFBSSxDQUFDO1FBQ3BDLG1CQUFjLEdBQVcsRUFBRSxDQUFDO1FBQzVCLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBQ2pDLHFCQUFnQixHQUFZLElBQUksQ0FBQztRQUNqQyxxQkFBZ0IsR0FBbUIsY0FBYyxDQUFDLEdBQUcsQ0FBQztRQUN0RCxxQkFBZ0IsR0FBbUIsY0FBYyxDQUFDLE1BQU0sQ0FBQztRQUN6RCxn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b0RBYTdDO0FBR0Q7SUFEQyxZQUFZLENBQUMsT0FBTyxDQUFDO29EQUtyQjtBQXZGVSxnQkFBZ0I7SUFENUIsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxDQUFDO0dBQzVCLGdCQUFnQixDQTZLNUI7U0E3S1ksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgVmlld0NvbnRhaW5lclJlZixcclxuICBSZW5kZXJlcjIsXHJcbiAgT25EZXN0cm95XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBQbGFjZW1lbnRUeXBlcyB9IGZyb20gJy4vcG9zaXRpb24nO1xyXG5pbXBvcnQgeyBTdHlsZVR5cGVzIH0gZnJvbSAnLi9zdHlsZS50eXBlJztcclxuaW1wb3J0IHsgQWxpZ25tZW50VHlwZXMgfSBmcm9tICcuL2FsaWdubWVudC50eXBlJztcclxuaW1wb3J0IHsgU2hvd1R5cGVzIH0gZnJvbSAnLi9zaG93LnR5cGUnO1xyXG5cclxuaW1wb3J0IHsgVG9vbHRpcFNlcnZpY2UgfSBmcm9tICcuL3Rvb2x0aXAuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbmd4LXRvb2x0aXBdJyB9KVxyXG5leHBvcnQgY2xhc3MgVG9vbHRpcERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgdG9vbHRpcENzc0NsYXNzOiBzdHJpbmcgPSAnJztcclxuICBASW5wdXQoKSB0b29sdGlwVGl0bGU6IHN0cmluZyA9ICcnO1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBBcHBlbmRUb0JvZHk6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBTcGFjaW5nOiBudW1iZXIgPSAxMDtcclxuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSB0b29sdGlwU2hvd0NhcmV0OiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSB0b29sdGlwUGxhY2VtZW50OiBQbGFjZW1lbnRUeXBlcyA9IFBsYWNlbWVudFR5cGVzLnRvcDtcclxuICBASW5wdXQoKSB0b29sdGlwQWxpZ25tZW50OiBBbGlnbm1lbnRUeXBlcyA9IEFsaWdubWVudFR5cGVzLmNlbnRlcjtcclxuICBASW5wdXQoKSB0b29sdGlwVHlwZTogU3R5bGVUeXBlcyA9IFN0eWxlVHlwZXMucG9wb3ZlcjtcclxuICBASW5wdXQoKSB0b29sdGlwQ2xvc2VPbkNsaWNrT3V0c2lkZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCkgdG9vbHRpcENsb3NlT25Nb3VzZUxlYXZlOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSB0b29sdGlwSGlkZVRpbWVvdXQ6IG51bWJlciA9IDMwMDtcclxuICBASW5wdXQoKSB0b29sdGlwU2hvd1RpbWVvdXQ6IG51bWJlciA9IDEwMDtcclxuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IGFueTtcclxuICBASW5wdXQoKSB0b29sdGlwU2hvd0V2ZW50OiBTaG93VHlwZXMgPSBTaG93VHlwZXMuYWxsO1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBDb250ZXh0OiBhbnk7XHJcbiAgQElucHV0KCkgdG9vbHRpcEltbWVkaWF0ZUV4aXQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQE91dHB1dCgpIHNob3cgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGhpZGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHByaXZhdGUgZ2V0IGxpc3RlbnNGb3JGb2N1cygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnRvb2x0aXBTaG93RXZlbnQgPT09IFNob3dUeXBlcy5hbGwgfHwgdGhpcy50b29sdGlwU2hvd0V2ZW50ID09PSBTaG93VHlwZXMuZm9jdXM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldCBsaXN0ZW5zRm9ySG92ZXIoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy50b29sdGlwU2hvd0V2ZW50ID09PSBTaG93VHlwZXMuYWxsIHx8IHRoaXMudG9vbHRpcFNob3dFdmVudCA9PT0gU2hvd1R5cGVzLm1vdXNlb3ZlcjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcG9uZW50OiBhbnk7XHJcbiAgcHJpdmF0ZSB0aW1lb3V0OiBhbnk7XHJcbiAgcHJpdmF0ZSBtb3VzZUxlYXZlQ29udGVudEV2ZW50OiBhbnk7XHJcbiAgcHJpdmF0ZSBtb3VzZUVudGVyQ29udGVudEV2ZW50OiBhbnk7XHJcbiAgcHJpdmF0ZSBkb2N1bWVudENsaWNrRXZlbnQ6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHRvb2x0aXBTZXJ2aWNlOiBUb29sdGlwU2VydmljZSxcclxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxyXG4gICkge31cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLmhpZGVUb29sdGlwKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZm9jdXNpbicpXHJcbiAgb25Gb2N1cygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmxpc3RlbnNGb3JGb2N1cykge1xyXG4gICAgICB0aGlzLnNob3dUb29sdGlwKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdibHVyJylcclxuICBvbkJsdXIoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5saXN0ZW5zRm9yRm9jdXMpIHtcclxuICAgICAgdGhpcy5oaWRlVG9vbHRpcCh0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxyXG4gIG9uTW91c2VFbnRlcigpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmxpc3RlbnNGb3JIb3Zlcikge1xyXG4gICAgICB0aGlzLnNob3dUb29sdGlwKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJywgWyckZXZlbnQudGFyZ2V0J10pXHJcbiAgb25Nb3VzZUxlYXZlKHRhcmdldCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMubGlzdGVuc0ZvckhvdmVyICYmIHRoaXMudG9vbHRpcENsb3NlT25Nb3VzZUxlYXZlKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuY29tcG9uZW50KSB7XHJcbiAgICAgICAgY29uc3QgY29udGVudERvbSA9IHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICAgICAgICBjb25zdCBjb250YWlucyA9IGNvbnRlbnREb20uY29udGFpbnModGFyZ2V0KTtcclxuICAgICAgICBpZiAoY29udGFpbnMpIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5oaWRlVG9vbHRpcCh0aGlzLnRvb2x0aXBJbW1lZGlhdGVFeGl0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcclxuICBvbk1vdXNlQ2xpY2soKSB7XHJcbiAgICBpZiAodGhpcy5saXN0ZW5zRm9ySG92ZXIpIHtcclxuICAgICAgdGhpcy5oaWRlVG9vbHRpcCh0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNob3dUb29sdGlwKGltbWVkaWF0ZT86IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmNvbXBvbmVudCB8fCB0aGlzLnRvb2x0aXBEaXNhYmxlZCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHRpbWUgPSBpbW1lZGlhdGUgPyAwIDogdGhpcy50b29sdGlwU2hvd1RpbWVvdXQ7XHJcblxyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XHJcbiAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy50b29sdGlwU2VydmljZS5kZXN0cm95QWxsKCk7XHJcblxyXG4gICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5jcmVhdGVCb3VuZE9wdGlvbnMoKTtcclxuICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLnRvb2x0aXBTZXJ2aWNlLmNyZWF0ZShvcHRpb25zKTtcclxuXHJcbiAgICAgIC8vIGFkZCBhIHRpbnkgdGltZW91dCB0byBhdm9pZCBldmVudCByZS10cmlnZ2Vyc1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5jb21wb25lbnQpIHtcclxuICAgICAgICAgIHRoaXMuYWRkSGlkZUxpc3RlbmVycyh0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgMTApO1xyXG5cclxuICAgICAgdGhpcy5zaG93LmVtaXQodHJ1ZSk7XHJcbiAgICB9LCB0aW1lKTtcclxuICB9XHJcblxyXG4gIGFkZEhpZGVMaXN0ZW5lcnModG9vbHRpcCk6IHZvaWQge1xyXG4gICAgLy8gb24gbW91c2UgZW50ZXIsIGNhbmNlbCB0aGUgaGlkZSB0cmlnZ2VyZWQgYnkgdGhlIGxlYXZlXHJcbiAgICB0aGlzLm1vdXNlRW50ZXJDb250ZW50RXZlbnQgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0b29sdGlwLCAnbW91c2VlbnRlcicsICgpID0+IHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBjb250ZW50IG1vdXNlIGxlYXZlIGxpc3RlbmVyXHJcbiAgICBpZiAodGhpcy50b29sdGlwQ2xvc2VPbk1vdXNlTGVhdmUpIHtcclxuICAgICAgdGhpcy5tb3VzZUxlYXZlQ29udGVudEV2ZW50ID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odG9vbHRpcCwgJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5oaWRlVG9vbHRpcCh0aGlzLnRvb2x0aXBJbW1lZGlhdGVFeGl0KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29udGVudCBjbG9zZSBvbiBjbGljayBvdXRzaWRlXHJcbiAgICBpZiAodGhpcy50b29sdGlwQ2xvc2VPbkNsaWNrT3V0c2lkZSkge1xyXG4gICAgICB0aGlzLmRvY3VtZW50Q2xpY2tFdmVudCA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAnY2xpY2snLCBldmVudCA9PiB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbnMgPSB0b29sdGlwLmNvbnRhaW5zKGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgaWYgKCFjb250YWlucykgdGhpcy5oaWRlVG9vbHRpcCgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhpZGVUb29sdGlwKGltbWVkaWF0ZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuY29tcG9uZW50KSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgZGVzdHJveUZuID0gKCkgPT4ge1xyXG4gICAgICAvLyByZW1vdmUgZXZlbnRzXHJcbiAgICAgIGlmICh0aGlzLm1vdXNlTGVhdmVDb250ZW50RXZlbnQpIHRoaXMubW91c2VMZWF2ZUNvbnRlbnRFdmVudCgpO1xyXG4gICAgICBpZiAodGhpcy5tb3VzZUVudGVyQ29udGVudEV2ZW50KSB0aGlzLm1vdXNlRW50ZXJDb250ZW50RXZlbnQoKTtcclxuICAgICAgaWYgKHRoaXMuZG9jdW1lbnRDbGlja0V2ZW50KSB0aGlzLmRvY3VtZW50Q2xpY2tFdmVudCgpO1xyXG5cclxuICAgICAgLy8gZW1pdCBldmVudHNcclxuICAgICAgdGhpcy5oaWRlLmVtaXQodHJ1ZSk7XHJcblxyXG4gICAgICAvLyBkZXN0cm95IGNvbXBvbmVudFxyXG4gICAgICB0aGlzLnRvb2x0aXBTZXJ2aWNlLmRlc3Ryb3kodGhpcy5jb21wb25lbnQpO1xyXG4gICAgICB0aGlzLmNvbXBvbmVudCA9IHVuZGVmaW5lZDtcclxuICAgIH07XHJcblxyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XHJcbiAgICBpZiAoIWltbWVkaWF0ZSkge1xyXG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGRlc3Ryb3lGbiwgdGhpcy50b29sdGlwSGlkZVRpbWVvdXQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGVzdHJveUZuKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUJvdW5kT3B0aW9ucygpOiBhbnkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6IHRoaXMudG9vbHRpcFRpdGxlLFxyXG4gICAgICB0ZW1wbGF0ZTogdGhpcy50b29sdGlwVGVtcGxhdGUsXHJcbiAgICAgIGhvc3Q6IHRoaXMudmlld0NvbnRhaW5lclJlZi5lbGVtZW50LFxyXG4gICAgICBwbGFjZW1lbnQ6IHRoaXMudG9vbHRpcFBsYWNlbWVudCxcclxuICAgICAgYWxpZ25tZW50OiB0aGlzLnRvb2x0aXBBbGlnbm1lbnQsXHJcbiAgICAgIHR5cGU6IHRoaXMudG9vbHRpcFR5cGUsXHJcbiAgICAgIHNob3dDYXJldDogdGhpcy50b29sdGlwU2hvd0NhcmV0LFxyXG4gICAgICBjc3NDbGFzczogdGhpcy50b29sdGlwQ3NzQ2xhc3MsXHJcbiAgICAgIHNwYWNpbmc6IHRoaXMudG9vbHRpcFNwYWNpbmcsXHJcbiAgICAgIGNvbnRleHQ6IHRoaXMudG9vbHRpcENvbnRleHRcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==