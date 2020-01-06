import { __decorate } from "tslib";
import { Input, Component, ElementRef, AfterViewInit, ViewEncapsulation, HostListener, ViewChild, HostBinding, Renderer2 } from '@angular/core';
import { throttleable } from '../../utils/throttle';
import { PositionHelper } from './position';
var TooltipContentComponent = /** @class */ (function () {
    function TooltipContentComponent(element, renderer) {
        this.element = element;
        this.renderer = renderer;
    }
    Object.defineProperty(TooltipContentComponent.prototype, "cssClasses", {
        get: function () {
            var clz = 'ngx-charts-tooltip-content';
            clz += " position-" + this.placement;
            clz += " type-" + this.type;
            clz += " " + this.cssClass;
            return clz;
        },
        enumerable: true,
        configurable: true
    });
    TooltipContentComponent.prototype.ngAfterViewInit = function () {
        setTimeout(this.position.bind(this));
    };
    TooltipContentComponent.prototype.position = function () {
        var _this = this;
        var nativeElm = this.element.nativeElement;
        var hostDim = this.host.nativeElement.getBoundingClientRect();
        // if no dims were found, never show
        if (!hostDim.height && !hostDim.width)
            return;
        var elmDim = nativeElm.getBoundingClientRect();
        this.checkFlip(hostDim, elmDim);
        this.positionContent(nativeElm, hostDim, elmDim);
        if (this.showCaret) {
            this.positionCaret(hostDim, elmDim);
        }
        // animate its entry
        setTimeout(function () { return _this.renderer.addClass(nativeElm, 'animate'); }, 1);
    };
    TooltipContentComponent.prototype.positionContent = function (nativeElm, hostDim, elmDim) {
        var _a = PositionHelper.positionContent(this.placement, elmDim, hostDim, this.spacing, this.alignment), top = _a.top, left = _a.left;
        this.renderer.setStyle(nativeElm, 'top', top + "px");
        this.renderer.setStyle(nativeElm, 'left', left + "px");
    };
    TooltipContentComponent.prototype.positionCaret = function (hostDim, elmDim) {
        var caretElm = this.caretElm.nativeElement;
        var caretDimensions = caretElm.getBoundingClientRect();
        var _a = PositionHelper.positionCaret(this.placement, elmDim, hostDim, caretDimensions, this.alignment), top = _a.top, left = _a.left;
        this.renderer.setStyle(caretElm, 'top', top + "px");
        this.renderer.setStyle(caretElm, 'left', left + "px");
    };
    TooltipContentComponent.prototype.checkFlip = function (hostDim, elmDim) {
        this.placement = PositionHelper.determinePlacement(this.placement, elmDim, hostDim, this.spacing);
    };
    TooltipContentComponent.prototype.onWindowResize = function () {
        this.position();
    };
    TooltipContentComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
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
            template: "\n    <div>\n      <span #caretElm [hidden]=\"!showCaret\" class=\"tooltip-caret position-{{ this.placement }}\"> </span>\n      <div class=\"tooltip-content\">\n        <span *ngIf=\"!title\">\n          <ng-template [ngTemplateOutlet]=\"template\" [ngTemplateOutletContext]=\"{ model: context }\"> </ng-template>\n        </span>\n        <span *ngIf=\"title\" [innerHTML]=\"title\"> </span>\n      </div>\n    </div>\n  ",
            encapsulation: ViewEncapsulation.None,
            styles: [".ngx-charts-tooltip-content{position:fixed;border-radius:3px;z-index:5000;display:block;font-weight:400;opacity:0;pointer-events:none!important}.ngx-charts-tooltip-content.type-popover{background:#fff;color:#060709;border:1px solid #72809b;box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);font-size:13px;padding:4px}.ngx-charts-tooltip-content.type-popover .tooltip-caret{position:absolute;z-index:5001;width:0;height:0}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-left{border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:7px solid #fff}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-top{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid #fff}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-right{border-top:7px solid transparent;border-bottom:7px solid transparent;border-right:7px solid #fff}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-bottom{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid #fff}.ngx-charts-tooltip-content.type-tooltip{color:#fff;background:rgba(0,0,0,.75);font-size:12px;padding:0 10px;text-align:center;pointer-events:auto}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-left{border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-top{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-right{border-top:7px solid transparent;border-bottom:7px solid transparent;border-right:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-bottom{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content .tooltip-label{display:block;line-height:1em;padding:8px 5px 5px;font-size:1em}.ngx-charts-tooltip-content .tooltip-val{display:block;font-size:1.3em;line-height:1em;padding:0 5px 8px}.ngx-charts-tooltip-content .tooltip-caret{position:absolute;z-index:5001;width:0;height:0}.ngx-charts-tooltip-content.position-right{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}.ngx-charts-tooltip-content.position-left{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}.ngx-charts-tooltip-content.position-top{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}.ngx-charts-tooltip-content.position-bottom{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}.ngx-charts-tooltip-content.animate{opacity:1;-webkit-transition:opacity .3s,-webkit-transform .3s;transition:opacity .3s,transform .3s,-webkit-transform .3s;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);pointer-events:auto}.area-tooltip-container{padding:5px 0;pointer-events:none}.tooltip-item{text-align:left;line-height:1.2em;padding:5px 0}.tooltip-item .tooltip-item-color{display:inline-block;height:12px;width:12px;margin-right:5px;color:#5b646b;border-radius:3px}"]
        })
    ], TooltipContentComponent);
    return TooltipContentComponent;
}());
export { TooltipContentComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vdG9vbHRpcC90b29sdGlwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLEtBQUssRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLGFBQWEsRUFDYixpQkFBaUIsRUFDakIsWUFBWSxFQUNaLFNBQVMsRUFDVCxXQUFXLEVBQ1gsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsY0FBYyxFQUFrQixNQUFNLFlBQVksQ0FBQztBQXFCNUQ7SUF1QkUsaUNBQW1CLE9BQW1CLEVBQVUsUUFBbUI7UUFBaEQsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7SUFBRyxDQUFDO0lBUnZFLHNCQUFJLCtDQUFVO2FBQWQ7WUFDRSxJQUFJLEdBQUcsR0FBRyw0QkFBNEIsQ0FBQztZQUN2QyxHQUFHLElBQUksZUFBYSxJQUFJLENBQUMsU0FBVyxDQUFDO1lBQ3JDLEdBQUcsSUFBSSxXQUFTLElBQUksQ0FBQyxJQUFNLENBQUM7WUFDNUIsR0FBRyxJQUFJLE1BQUksSUFBSSxDQUFDLFFBQVUsQ0FBQztZQUMzQixPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUM7OztPQUFBO0lBSUQsaURBQWUsR0FBZjtRQUNFLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCwwQ0FBUSxHQUFSO1FBQUEsaUJBaUJDO1FBaEJDLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQzdDLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFB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LHlhQVVUO1lBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O1NBRXRDLENBQUM7T0FDVyx1QkFBdUIsQ0ErRW5DO0lBQUQsOEJBQUM7Q0FBQSxBQS9FRCxJQStFQztTQS9FWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIElucHV0LFxyXG4gIENvbXBvbmVudCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb24sXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIFZpZXdDaGlsZCxcclxuICBIb3N0QmluZGluZyxcclxuICBSZW5kZXJlcjJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IHRocm90dGxlYWJsZSB9IGZyb20gJy4uLy4uL3V0aWxzL3Rocm90dGxlJztcclxuaW1wb3J0IHsgUG9zaXRpb25IZWxwZXIsIFBsYWNlbWVudFR5cGVzIH0gZnJvbSAnLi9wb3NpdGlvbic7XHJcblxyXG5pbXBvcnQgeyBTdHlsZVR5cGVzIH0gZnJvbSAnLi9zdHlsZS50eXBlJztcclxuaW1wb3J0IHsgQWxpZ25tZW50VHlwZXMgfSBmcm9tICcuL2FsaWdubWVudC50eXBlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LXRvb2x0aXAtY29udGVudCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXY+XHJcbiAgICAgIDxzcGFuICNjYXJldEVsbSBbaGlkZGVuXT1cIiFzaG93Q2FyZXRcIiBjbGFzcz1cInRvb2x0aXAtY2FyZXQgcG9zaXRpb24te3sgdGhpcy5wbGFjZW1lbnQgfX1cIj4gPC9zcGFuPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwidG9vbHRpcC1jb250ZW50XCI+XHJcbiAgICAgICAgPHNwYW4gKm5nSWY9XCIhdGl0bGVcIj5cclxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZVwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7IG1vZGVsOiBjb250ZXh0IH1cIj4gPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gKm5nSWY9XCJ0aXRsZVwiIFtpbm5lckhUTUxdPVwidGl0bGVcIj4gPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGAsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBzdHlsZVVybHM6IFsnLi90b29sdGlwLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFRvb2x0aXBDb250ZW50Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgQElucHV0KCkgaG9zdDogYW55O1xyXG4gIEBJbnB1dCgpIHNob3dDYXJldDogYm9vbGVhbjtcclxuICBASW5wdXQoKSB0eXBlOiBTdHlsZVR5cGVzO1xyXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50VHlwZXM7XHJcbiAgQElucHV0KCkgYWxpZ25tZW50OiBBbGlnbm1lbnRUeXBlcztcclxuICBASW5wdXQoKSBzcGFjaW5nOiBudW1iZXI7XHJcbiAgQElucHV0KCkgY3NzQ2xhc3M6IHN0cmluZztcclxuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHRlbXBsYXRlOiBhbnk7XHJcbiAgQElucHV0KCkgY29udGV4dDogYW55O1xyXG5cclxuICBAVmlld0NoaWxkKCdjYXJldEVsbScpIGNhcmV0RWxtO1xyXG5cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcclxuICBnZXQgY3NzQ2xhc3NlcygpOiBzdHJpbmcge1xyXG4gICAgbGV0IGNseiA9ICduZ3gtY2hhcnRzLXRvb2x0aXAtY29udGVudCc7XHJcbiAgICBjbHogKz0gYCBwb3NpdGlvbi0ke3RoaXMucGxhY2VtZW50fWA7XHJcbiAgICBjbHogKz0gYCB0eXBlLSR7dGhpcy50eXBlfWA7XHJcbiAgICBjbHogKz0gYCAke3RoaXMuY3NzQ2xhc3N9YDtcclxuICAgIHJldHVybiBjbHo7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICBzZXRUaW1lb3V0KHRoaXMucG9zaXRpb24uYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwb3NpdGlvbigpOiB2b2lkIHtcclxuICAgIGNvbnN0IG5hdGl2ZUVsbSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gICAgY29uc3QgaG9zdERpbSA9IHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgIC8vIGlmIG5vIGRpbXMgd2VyZSBmb3VuZCwgbmV2ZXIgc2hvd1xyXG4gICAgaWYgKCFob3N0RGltLmhlaWdodCAmJiAhaG9zdERpbS53aWR0aCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGVsbURpbSA9IG5hdGl2ZUVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIHRoaXMuY2hlY2tGbGlwKGhvc3REaW0sIGVsbURpbSk7XHJcbiAgICB0aGlzLnBvc2l0aW9uQ29udGVudChuYXRpdmVFbG0sIGhvc3REaW0sIGVsbURpbSk7XHJcblxyXG4gICAgaWYgKHRoaXMuc2hvd0NhcmV0KSB7XHJcbiAgICAgIHRoaXMucG9zaXRpb25DYXJldChob3N0RGltLCBlbG1EaW0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFuaW1hdGUgaXRzIGVudHJ5XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MobmF0aXZlRWxtLCAnYW5pbWF0ZScpLCAxKTtcclxuICB9XHJcblxyXG4gIHBvc2l0aW9uQ29udGVudChuYXRpdmVFbG0sIGhvc3REaW0sIGVsbURpbSk6IHZvaWQge1xyXG4gICAgY29uc3QgeyB0b3AsIGxlZnQgfSA9IFBvc2l0aW9uSGVscGVyLnBvc2l0aW9uQ29udGVudCh0aGlzLnBsYWNlbWVudCwgZWxtRGltLCBob3N0RGltLCB0aGlzLnNwYWNpbmcsIHRoaXMuYWxpZ25tZW50KTtcclxuXHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKG5hdGl2ZUVsbSwgJ3RvcCcsIGAke3RvcH1weGApO1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShuYXRpdmVFbG0sICdsZWZ0JywgYCR7bGVmdH1weGApO1xyXG4gIH1cclxuXHJcbiAgcG9zaXRpb25DYXJldChob3N0RGltLCBlbG1EaW0pOiB2b2lkIHtcclxuICAgIGNvbnN0IGNhcmV0RWxtID0gdGhpcy5jYXJldEVsbS5uYXRpdmVFbGVtZW50O1xyXG4gICAgY29uc3QgY2FyZXREaW1lbnNpb25zID0gY2FyZXRFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCB7IHRvcCwgbGVmdCB9ID0gUG9zaXRpb25IZWxwZXIucG9zaXRpb25DYXJldChcclxuICAgICAgdGhpcy5wbGFjZW1lbnQsXHJcbiAgICAgIGVsbURpbSxcclxuICAgICAgaG9zdERpbSxcclxuICAgICAgY2FyZXREaW1lbnNpb25zLFxyXG4gICAgICB0aGlzLmFsaWdubWVudFxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGNhcmV0RWxtLCAndG9wJywgYCR7dG9wfXB4YCk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGNhcmV0RWxtLCAnbGVmdCcsIGAke2xlZnR9cHhgKTtcclxuICB9XHJcblxyXG4gIGNoZWNrRmxpcChob3N0RGltLCBlbG1EaW0pOiB2b2lkIHtcclxuICAgIHRoaXMucGxhY2VtZW50ID0gUG9zaXRpb25IZWxwZXIuZGV0ZXJtaW5lUGxhY2VtZW50KHRoaXMucGxhY2VtZW50LCBlbG1EaW0sIGhvc3REaW0sIHRoaXMuc3BhY2luZyk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJylcclxuICBAdGhyb3R0bGVhYmxlKDEwMClcclxuICBvbldpbmRvd1Jlc2l6ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMucG9zaXRpb24oKTtcclxuICB9XHJcbn1cclxuIl19