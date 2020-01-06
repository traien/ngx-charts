import { __decorate } from "tslib";
import { Input, Component, ElementRef, AfterViewInit, ViewEncapsulation, HostListener, ViewChild, HostBinding, Renderer2 } from '@angular/core';
import { throttleable } from '../../utils/throttle';
import { PositionHelper } from './position';
let TooltipContentComponent = class TooltipContentComponent {
    constructor(element, renderer) {
        this.element = element;
        this.renderer = renderer;
    }
    get cssClasses() {
        let clz = 'ngx-charts-tooltip-content';
        clz += ` position-${this.placement}`;
        clz += ` type-${this.type}`;
        clz += ` ${this.cssClass}`;
        return clz;
    }
    ngAfterViewInit() {
        setTimeout(this.position.bind(this));
    }
    position() {
        const nativeElm = this.element.nativeElement;
        const hostDim = this.host.nativeElement.getBoundingClientRect();
        // if no dims were found, never show
        if (!hostDim.height && !hostDim.width)
            return;
        const elmDim = nativeElm.getBoundingClientRect();
        this.checkFlip(hostDim, elmDim);
        this.positionContent(nativeElm, hostDim, elmDim);
        if (this.showCaret) {
            this.positionCaret(hostDim, elmDim);
        }
        // animate its entry
        setTimeout(() => this.renderer.addClass(nativeElm, 'animate'), 1);
    }
    positionContent(nativeElm, hostDim, elmDim) {
        const { top, left } = PositionHelper.positionContent(this.placement, elmDim, hostDim, this.spacing, this.alignment);
        this.renderer.setStyle(nativeElm, 'top', `${top}px`);
        this.renderer.setStyle(nativeElm, 'left', `${left}px`);
    }
    positionCaret(hostDim, elmDim) {
        const caretElm = this.caretElm.nativeElement;
        const caretDimensions = caretElm.getBoundingClientRect();
        const { top, left } = PositionHelper.positionCaret(this.placement, elmDim, hostDim, caretDimensions, this.alignment);
        this.renderer.setStyle(caretElm, 'top', `${top}px`);
        this.renderer.setStyle(caretElm, 'left', `${left}px`);
    }
    checkFlip(hostDim, elmDim) {
        this.placement = PositionHelper.determinePlacement(this.placement, elmDim, hostDim, this.spacing);
    }
    onWindowResize() {
        this.position();
    }
};
TooltipContentComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
__decorate([
    Input()
], TooltipContentComponent.prototype, "host", void 0);
__decorate([
    Input()
], TooltipContentComponent.prototype, "showCaret", void 0);
__decorate([
    Input()
], TooltipContentComponent.prototype, "type", void 0);
__decorate([
    Input()
], TooltipContentComponent.prototype, "placement", void 0);
__decorate([
    Input()
], TooltipContentComponent.prototype, "alignment", void 0);
__decorate([
    Input()
], TooltipContentComponent.prototype, "spacing", void 0);
__decorate([
    Input()
], TooltipContentComponent.prototype, "cssClass", void 0);
__decorate([
    Input()
], TooltipContentComponent.prototype, "title", void 0);
__decorate([
    Input()
], TooltipContentComponent.prototype, "template", void 0);
__decorate([
    Input()
], TooltipContentComponent.prototype, "context", void 0);
__decorate([
    ViewChild('caretElm')
], TooltipContentComponent.prototype, "caretElm", void 0);
__decorate([
    HostBinding('class')
], TooltipContentComponent.prototype, "cssClasses", null);
__decorate([
    HostListener('window:resize'),
    throttleable(100)
], TooltipContentComponent.prototype, "onWindowResize", null);
TooltipContentComponent = __decorate([
    Component({
        selector: 'ngx-tooltip-content',
        template: `
    <div>
      <span #caretElm [hidden]="!showCaret" class="tooltip-caret position-{{ this.placement }}"> </span>
      <div class="tooltip-content">
        <span *ngIf="!title">
          <ng-template [ngTemplateOutlet]="template" [ngTemplateOutletContext]="{ model: context }"> </ng-template>
        </span>
        <span *ngIf="title" [innerHTML]="title"> </span>
      </div>
    </div>
  `,
        encapsulation: ViewEncapsulation.None,
        styles: [".ngx-charts-tooltip-content{position:fixed;border-radius:3px;z-index:5000;display:block;font-weight:400;opacity:0;pointer-events:none!important}.ngx-charts-tooltip-content.type-popover{background:#fff;color:#060709;border:1px solid #72809b;box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);font-size:13px;padding:4px}.ngx-charts-tooltip-content.type-popover .tooltip-caret{position:absolute;z-index:5001;width:0;height:0}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-left{border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:7px solid #fff}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-top{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid #fff}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-right{border-top:7px solid transparent;border-bottom:7px solid transparent;border-right:7px solid #fff}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-bottom{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid #fff}.ngx-charts-tooltip-content.type-tooltip{color:#fff;background:rgba(0,0,0,.75);font-size:12px;padding:0 10px;text-align:center;pointer-events:auto}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-left{border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-top{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-right{border-top:7px solid transparent;border-bottom:7px solid transparent;border-right:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-bottom{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content .tooltip-label{display:block;line-height:1em;padding:8px 5px 5px;font-size:1em}.ngx-charts-tooltip-content .tooltip-val{display:block;font-size:1.3em;line-height:1em;padding:0 5px 8px}.ngx-charts-tooltip-content .tooltip-caret{position:absolute;z-index:5001;width:0;height:0}.ngx-charts-tooltip-content.position-right{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}.ngx-charts-tooltip-content.position-left{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}.ngx-charts-tooltip-content.position-top{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}.ngx-charts-tooltip-content.position-bottom{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}.ngx-charts-tooltip-content.animate{opacity:1;-webkit-transition:opacity .3s,-webkit-transform .3s;transition:opacity .3s,transform .3s,-webkit-transform .3s;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);pointer-events:auto}.area-tooltip-container{padding:5px 0;pointer-events:none}.tooltip-item{text-align:left;line-height:1.2em;padding:5px 0}.tooltip-item .tooltip-item-color{display:inline-block;height:12px;width:12px;margin-right:5px;color:#5b646b;border-radius:3px}"]
    })
], TooltipContentComponent);
export { TooltipContentComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vdG9vbHRpcC90b29sdGlwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLEtBQUssRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLGFBQWEsRUFDYixpQkFBaUIsRUFDakIsWUFBWSxFQUNaLFNBQVMsRUFDVCxXQUFXLEVBQ1gsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsY0FBYyxFQUFrQixNQUFNLFlBQVksQ0FBQztBQXFCNUQsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBdUI7SUF1QmxDLFlBQW1CLE9BQW1CLEVBQVUsUUFBbUI7UUFBaEQsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7SUFBRyxDQUFDO0lBUnZFLElBQUksVUFBVTtRQUNaLElBQUksR0FBRyxHQUFHLDRCQUE0QixDQUFDO1FBQ3ZDLEdBQUcsSUFBSSxhQUFhLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQyxHQUFHLElBQUksU0FBUyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUIsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzNCLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUlELGVBQWU7UUFDYixVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsUUFBUTtRQUNOLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQzdDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENB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dEIsU0FBUyxDQUFDLFVBQVUsQ0FBQzt5REFBVTtBQUdoQztJQURDLFdBQVcsQ0FBQyxPQUFPLENBQUM7eURBT3BCO0FBdUREO0lBRkMsWUFBWSxDQUFDLGVBQWUsQ0FBQztJQUM3QixZQUFZLENBQUMsR0FBRyxDQUFDOzZEQUdqQjtBQTlFVSx1QkFBdUI7SUFoQm5DLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsUUFBUSxFQUFFOzs7Ozs7Ozs7O0dBVVQ7UUFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7S0FFdEMsQ0FBQztHQUNXLHVCQUF1QixDQStFbkM7U0EvRVksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBJbnB1dCxcclxuICBDb21wb25lbnQsXHJcbiAgRWxlbWVudFJlZixcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBWaWV3Q2hpbGQsXHJcbiAgSG9zdEJpbmRpbmcsXHJcbiAgUmVuZGVyZXIyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyB0aHJvdHRsZWFibGUgfSBmcm9tICcuLi8uLi91dGlscy90aHJvdHRsZSc7XHJcbmltcG9ydCB7IFBvc2l0aW9uSGVscGVyLCBQbGFjZW1lbnRUeXBlcyB9IGZyb20gJy4vcG9zaXRpb24nO1xyXG5cclxuaW1wb3J0IHsgU3R5bGVUeXBlcyB9IGZyb20gJy4vc3R5bGUudHlwZSc7XHJcbmltcG9ydCB7IEFsaWdubWVudFR5cGVzIH0gZnJvbSAnLi9hbGlnbm1lbnQudHlwZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC10b29sdGlwLWNvbnRlbnQnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8c3BhbiAjY2FyZXRFbG0gW2hpZGRlbl09XCIhc2hvd0NhcmV0XCIgY2xhc3M9XCJ0b29sdGlwLWNhcmV0IHBvc2l0aW9uLXt7IHRoaXMucGxhY2VtZW50IH19XCI+IDwvc3Bhbj5cclxuICAgICAgPGRpdiBjbGFzcz1cInRvb2x0aXAtY29udGVudFwiPlxyXG4gICAgICAgIDxzcGFuICpuZ0lmPVwiIXRpdGxlXCI+XHJcbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBtb2RlbDogY29udGV4dCB9XCI+IDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDxzcGFuICpuZ0lmPVwidGl0bGVcIiBbaW5uZXJIVE1MXT1cInRpdGxlXCI+IDwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdG9vbHRpcC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUb29sdGlwQ29udGVudENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xyXG4gIEBJbnB1dCgpIGhvc3Q6IGFueTtcclxuICBASW5wdXQoKSBzaG93Q2FyZXQ6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgdHlwZTogU3R5bGVUeXBlcztcclxuICBASW5wdXQoKSBwbGFjZW1lbnQ6IFBsYWNlbWVudFR5cGVzO1xyXG4gIEBJbnB1dCgpIGFsaWdubWVudDogQWxpZ25tZW50VHlwZXM7XHJcbiAgQElucHV0KCkgc3BhY2luZzogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGNzc0NsYXNzOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcclxuICBASW5wdXQoKSB0ZW1wbGF0ZTogYW55O1xyXG4gIEBJbnB1dCgpIGNvbnRleHQ6IGFueTtcclxuXHJcbiAgQFZpZXdDaGlsZCgnY2FyZXRFbG0nKSBjYXJldEVsbTtcclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXHJcbiAgZ2V0IGNzc0NsYXNzZXMoKTogc3RyaW5nIHtcclxuICAgIGxldCBjbHogPSAnbmd4LWNoYXJ0cy10b29sdGlwLWNvbnRlbnQnO1xyXG4gICAgY2x6ICs9IGAgcG9zaXRpb24tJHt0aGlzLnBsYWNlbWVudH1gO1xyXG4gICAgY2x6ICs9IGAgdHlwZS0ke3RoaXMudHlwZX1gO1xyXG4gICAgY2x6ICs9IGAgJHt0aGlzLmNzc0NsYXNzfWA7XHJcbiAgICByZXR1cm4gY2x6O1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge31cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgc2V0VGltZW91dCh0aGlzLnBvc2l0aW9uLmJpbmQodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgcG9zaXRpb24oKTogdm9pZCB7XHJcbiAgICBjb25zdCBuYXRpdmVFbG0gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICAgIGNvbnN0IGhvc3REaW0gPSB0aGlzLmhvc3QubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAvLyBpZiBubyBkaW1zIHdlcmUgZm91bmQsIG5ldmVyIHNob3dcclxuICAgIGlmICghaG9zdERpbS5oZWlnaHQgJiYgIWhvc3REaW0ud2lkdGgpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBlbG1EaW0gPSBuYXRpdmVFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICB0aGlzLmNoZWNrRmxpcChob3N0RGltLCBlbG1EaW0pO1xyXG4gICAgdGhpcy5wb3NpdGlvbkNvbnRlbnQobmF0aXZlRWxtLCBob3N0RGltLCBlbG1EaW0pO1xyXG5cclxuICAgIGlmICh0aGlzLnNob3dDYXJldCkge1xyXG4gICAgICB0aGlzLnBvc2l0aW9uQ2FyZXQoaG9zdERpbSwgZWxtRGltKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhbmltYXRlIGl0cyBlbnRyeVxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKG5hdGl2ZUVsbSwgJ2FuaW1hdGUnKSwgMSk7XHJcbiAgfVxyXG5cclxuICBwb3NpdGlvbkNvbnRlbnQobmF0aXZlRWxtLCBob3N0RGltLCBlbG1EaW0pOiB2b2lkIHtcclxuICAgIGNvbnN0IHsgdG9wLCBsZWZ0IH0gPSBQb3NpdGlvbkhlbHBlci5wb3NpdGlvbkNvbnRlbnQodGhpcy5wbGFjZW1lbnQsIGVsbURpbSwgaG9zdERpbSwgdGhpcy5zcGFjaW5nLCB0aGlzLmFsaWdubWVudCk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShuYXRpdmVFbG0sICd0b3AnLCBgJHt0b3B9cHhgKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUobmF0aXZlRWxtLCAnbGVmdCcsIGAke2xlZnR9cHhgKTtcclxuICB9XHJcblxyXG4gIHBvc2l0aW9uQ2FyZXQoaG9zdERpbSwgZWxtRGltKTogdm9pZCB7XHJcbiAgICBjb25zdCBjYXJldEVsbSA9IHRoaXMuY2FyZXRFbG0ubmF0aXZlRWxlbWVudDtcclxuICAgIGNvbnN0IGNhcmV0RGltZW5zaW9ucyA9IGNhcmV0RWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc3QgeyB0b3AsIGxlZnQgfSA9IFBvc2l0aW9uSGVscGVyLnBvc2l0aW9uQ2FyZXQoXHJcbiAgICAgIHRoaXMucGxhY2VtZW50LFxyXG4gICAgICBlbG1EaW0sXHJcbiAgICAgIGhvc3REaW0sXHJcbiAgICAgIGNhcmV0RGltZW5zaW9ucyxcclxuICAgICAgdGhpcy5hbGlnbm1lbnRcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShjYXJldEVsbSwgJ3RvcCcsIGAke3RvcH1weGApO1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShjYXJldEVsbSwgJ2xlZnQnLCBgJHtsZWZ0fXB4YCk7XHJcbiAgfVxyXG5cclxuICBjaGVja0ZsaXAoaG9zdERpbSwgZWxtRGltKTogdm9pZCB7XHJcbiAgICB0aGlzLnBsYWNlbWVudCA9IFBvc2l0aW9uSGVscGVyLmRldGVybWluZVBsYWNlbWVudCh0aGlzLnBsYWNlbWVudCwgZWxtRGltLCBob3N0RGltLCB0aGlzLnNwYWNpbmcpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScpXHJcbiAgQHRocm90dGxlYWJsZSgxMDApXHJcbiAgb25XaW5kb3dSZXNpemUoKTogdm9pZCB7XHJcbiAgICB0aGlzLnBvc2l0aW9uKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==