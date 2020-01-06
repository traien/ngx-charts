import { __decorate } from "tslib";
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
var SvgRadialGradientComponent = /** @class */ (function () {
    function SvgRadialGradientComponent() {
        this.endOpacity = 1;
        this.cx = 0;
        this.cy = 0;
    }
    Object.defineProperty(SvgRadialGradientComponent.prototype, "stops", {
        get: function () {
            return this.stopsInput || this.stopsDefault;
        },
        set: function (value) {
            this.stopsInput = value;
        },
        enumerable: true,
        configurable: true
    });
    SvgRadialGradientComponent.prototype.ngOnChanges = function (changes) {
        this.r = '30%';
        if ('color' in changes || 'startOpacity' in changes || 'endOpacity' in changes) {
            this.stopsDefault = [
                {
                    offset: 0,
                    color: this.color,
                    opacity: this.startOpacity
                },
                {
                    offset: 100,
                    color: this.color,
                    opacity: this.endOpacity
                }
            ];
        }
    };
    __decorate([
        Input()
    ], SvgRadialGradientComponent.prototype, "color", void 0);
    __decorate([
        Input()
    ], SvgRadialGradientComponent.prototype, "name", void 0);
    __decorate([
        Input()
    ], SvgRadialGradientComponent.prototype, "startOpacity", void 0);
    __decorate([
        Input()
    ], SvgRadialGradientComponent.prototype, "endOpacity", void 0);
    __decorate([
        Input()
    ], SvgRadialGradientComponent.prototype, "cx", void 0);
    __decorate([
        Input()
    ], SvgRadialGradientComponent.prototype, "cy", void 0);
    __decorate([
        Input()
    ], SvgRadialGradientComponent.prototype, "stops", null);
    SvgRadialGradientComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-svg-radial-gradient]',
            template: "\n    <svg:radialGradient [id]=\"name\" [attr.cx]=\"cx\" [attr.cy]=\"cy\" [attr.r]=\"r\" gradientUnits=\"userSpaceOnUse\">\n      <svg:stop\n        *ngFor=\"let stop of stops\"\n        [attr.offset]=\"stop.offset + '%'\"\n        [style.stop-color]=\"stop.color\"\n        [style.stop-opacity]=\"stop.opacity\"\n      />\n    </svg:radialGradient>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], SvgRadialGradientComponent);
    return SvgRadialGradientComponent;
}());
export { SvgRadialGradientComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLXJhZGlhbC1ncmFkaWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vc3ZnLXJhZGlhbC1ncmFkaWVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFhLHVCQUF1QixFQUFpQixNQUFNLGVBQWUsQ0FBQztBQWdCcEc7SUFBQTtRQUlXLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixPQUFFLEdBQVcsQ0FBQyxDQUFDO1FBQ2YsT0FBRSxHQUFXLENBQUMsQ0FBQztJQWlDMUIsQ0FBQztJQTlCQyxzQkFBSSw2Q0FBSzthQUFUO1lBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDOUMsQ0FBQzthQUVELFVBQVUsS0FBWTtZQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUMxQixDQUFDOzs7T0FKQTtJQVdELGdEQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNmLElBQUksT0FBTyxJQUFJLE9BQU8sSUFBSSxjQUFjLElBQUksT0FBTyxJQUFJLFlBQVksSUFBSSxPQUFPLEVBQUU7WUFDOUUsSUFBSSxDQUFDLFlBQVksR0FBRztnQkFDbEI7b0JBQ0UsTUFBTSxFQUFFLENBQUM7b0JBQ1QsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO29CQUNqQixPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVk7aUJBQzNCO2dCQUNEO29CQUNFLE1BQU0sRUFBRSxHQUFHO29CQUNYLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztvQkFDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVO2lCQUN6QjthQUNGLENBQUM7U0FDSDtJQUNILENBQUM7SUFyQ1E7UUFBUixLQUFLLEVBQUU7NkRBQWU7SUFDZDtRQUFSLEtBQUssRUFBRTs0REFBYztJQUNiO1FBQVIsS0FBSyxFQUFFO29FQUFzQjtJQUNyQjtRQUFSLEtBQUssRUFBRTtrRUFBZ0I7SUFDZjtRQUFSLEtBQUssRUFBRTswREFBZ0I7SUFDZjtRQUFSLEtBQUssRUFBRTswREFBZ0I7SUFHeEI7UUFEQyxLQUFLLEVBQUU7MkRBR1A7SUFYVSwwQkFBMEI7UUFkdEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG1DQUFtQztZQUM3QyxRQUFRLEVBQUUsbVdBU1Q7WUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO09BQ1csMEJBQTBCLENBdUN0QztJQUFELGlDQUFDO0NBQUEsQUF2Q0QsSUF1Q0M7U0F2Q1ksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtc3ZnLXJhZGlhbC1ncmFkaWVudF0nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8c3ZnOnJhZGlhbEdyYWRpZW50IFtpZF09XCJuYW1lXCIgW2F0dHIuY3hdPVwiY3hcIiBbYXR0ci5jeV09XCJjeVwiIFthdHRyLnJdPVwiclwiIGdyYWRpZW50VW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiPlxyXG4gICAgICA8c3ZnOnN0b3BcclxuICAgICAgICAqbmdGb3I9XCJsZXQgc3RvcCBvZiBzdG9wc1wiXHJcbiAgICAgICAgW2F0dHIub2Zmc2V0XT1cInN0b3Aub2Zmc2V0ICsgJyUnXCJcclxuICAgICAgICBbc3R5bGUuc3RvcC1jb2xvcl09XCJzdG9wLmNvbG9yXCJcclxuICAgICAgICBbc3R5bGUuc3RvcC1vcGFjaXR5XT1cInN0b3Aub3BhY2l0eVwiXHJcbiAgICAgIC8+XHJcbiAgICA8L3N2ZzpyYWRpYWxHcmFkaWVudD5cclxuICBgLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdmdSYWRpYWxHcmFkaWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgY29sb3I6IHN0cmluZztcclxuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgc3RhcnRPcGFjaXR5OiBudW1iZXI7XHJcbiAgQElucHV0KCkgZW5kT3BhY2l0eSA9IDE7XHJcbiAgQElucHV0KCkgY3g6IG51bWJlciA9IDA7XHJcbiAgQElucHV0KCkgY3k6IG51bWJlciA9IDA7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHN0b3BzKCk6IGFueVtdIHtcclxuICAgIHJldHVybiB0aGlzLnN0b3BzSW5wdXQgfHwgdGhpcy5zdG9wc0RlZmF1bHQ7XHJcbiAgfVxyXG5cclxuICBzZXQgc3RvcHModmFsdWU6IGFueVtdKSB7XHJcbiAgICB0aGlzLnN0b3BzSW5wdXQgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHI6IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSBzdG9wc0lucHV0OiBhbnlbXTtcclxuICBwcml2YXRlIHN0b3BzRGVmYXVsdDogYW55W107XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIHRoaXMuciA9ICczMCUnO1xyXG4gICAgaWYgKCdjb2xvcicgaW4gY2hhbmdlcyB8fCAnc3RhcnRPcGFjaXR5JyBpbiBjaGFuZ2VzIHx8ICdlbmRPcGFjaXR5JyBpbiBjaGFuZ2VzKSB7XHJcbiAgICAgIHRoaXMuc3RvcHNEZWZhdWx0ID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgIGNvbG9yOiB0aGlzLmNvbG9yLFxyXG4gICAgICAgICAgb3BhY2l0eTogdGhpcy5zdGFydE9wYWNpdHlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG9mZnNldDogMTAwLFxyXG4gICAgICAgICAgY29sb3I6IHRoaXMuY29sb3IsXHJcbiAgICAgICAgICBvcGFjaXR5OiB0aGlzLmVuZE9wYWNpdHlcclxuICAgICAgICB9XHJcbiAgICAgIF07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==