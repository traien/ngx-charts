import { __decorate } from "tslib";
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { arc } from 'd3-shape';
import { trimLabel } from '../common/trim-label.helper';
var PieLabelComponent = /** @class */ (function () {
    function PieLabelComponent() {
        this.animations = true;
        this.labelTrim = true;
        this.labelTrimSize = 10;
        this.isIE = /(edge|msie|trident)/i.test(navigator.userAgent);
        this.trimLabel = trimLabel;
    }
    PieLabelComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PieLabelComponent.prototype.update = function () {
        var startRadius = this.radius;
        if (this.explodeSlices) {
            startRadius = (this.radius * this.value) / this.max;
        }
        var innerArc = arc()
            .innerRadius(startRadius)
            .outerRadius(startRadius);
        // Calculate innerPos then scale outer position to match label position
        var innerPos = innerArc.centroid(this.data);
        var scale = this.data.pos[1] / innerPos[1];
        if (this.data.pos[1] === 0 || innerPos[1] === 0) {
            scale = 1;
        }
        var outerPos = [scale * innerPos[0], scale * innerPos[1]];
        this.line = "M" + innerPos + "L" + outerPos + "L" + this.data.pos;
    };
    Object.defineProperty(PieLabelComponent.prototype, "textX", {
        get: function () {
            return this.data.pos[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieLabelComponent.prototype, "textY", {
        get: function () {
            return this.data.pos[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieLabelComponent.prototype, "styleTransform", {
        get: function () {
            return this.isIE ? null : "translate3d(" + this.textX + "px," + this.textY + "px, 0)";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieLabelComponent.prototype, "attrTransform", {
        get: function () {
            return !this.isIE ? null : "translate(" + this.textX + "," + this.textY + ")";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieLabelComponent.prototype, "textTransition", {
        get: function () {
            return this.isIE || !this.animations ? null : 'transform 0.75s';
        },
        enumerable: true,
        configurable: true
    });
    PieLabelComponent.prototype.textAnchor = function () {
        return this.midAngle(this.data) < Math.PI ? 'start' : 'end';
    };
    PieLabelComponent.prototype.midAngle = function (d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    };
    __decorate([
        Input()
    ], PieLabelComponent.prototype, "data", void 0);
    __decorate([
        Input()
    ], PieLabelComponent.prototype, "radius", void 0);
    __decorate([
        Input()
    ], PieLabelComponent.prototype, "label", void 0);
    __decorate([
        Input()
    ], PieLabelComponent.prototype, "color", void 0);
    __decorate([
        Input()
    ], PieLabelComponent.prototype, "max", void 0);
    __decorate([
        Input()
    ], PieLabelComponent.prototype, "value", void 0);
    __decorate([
        Input()
    ], PieLabelComponent.prototype, "explodeSlices", void 0);
    __decorate([
        Input()
    ], PieLabelComponent.prototype, "animations", void 0);
    __decorate([
        Input()
    ], PieLabelComponent.prototype, "labelTrim", void 0);
    __decorate([
        Input()
    ], PieLabelComponent.prototype, "labelTrimSize", void 0);
    PieLabelComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-pie-label]',
            template: "\n    <title>{{ label }}</title>\n    <svg:g [attr.transform]=\"attrTransform\" [style.transform]=\"styleTransform\" [style.transition]=\"textTransition\">\n      <svg:text\n        class=\"pie-label\"\n        [class.animation]=\"animations\"\n        dy=\".35em\"\n        [style.textAnchor]=\"textAnchor()\"\n        [style.shapeRendering]=\"'crispEdges'\"\n      >\n        {{ labelTrim ? trimLabel(label, labelTrimSize) : label }}\n      </svg:text>\n    </svg:g>\n    <svg:path\n      [attr.d]=\"line\"\n      [attr.stroke]=\"color\"\n      fill=\"none\"\n      class=\"pie-label-line line\"\n      [class.animation]=\"animations\"\n    ></svg:path>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], PieLabelComponent);
    return PieLabelComponent;
}());
export { PieLabelComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWxhYmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL3BpZS1jaGFydC9waWUtbGFiZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBNEIsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEcsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUUvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUEyQnhEO0lBaUJFO1FBVFMsZUFBVSxHQUFZLElBQUksQ0FBQztRQUMzQixjQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBS25CLFNBQUksR0FBRyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBR3ZFLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFFRCx1Q0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxrQ0FBTSxHQUFOO1FBQ0UsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM5QixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUNyRDtRQUVELElBQU0sUUFBUSxHQUFHLEdBQUcsRUFBRTthQUNuQixXQUFXLENBQUMsV0FBVyxDQUFDO2FBQ3hCLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUU1Qix1RUFBdUU7UUFDdkUsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJ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bnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBhcmMgfSBmcm9tICdkMy1zaGFwZSc7XHJcblxyXG5pbXBvcnQgeyB0cmltTGFiZWwgfSBmcm9tICcuLi9jb21tb24vdHJpbS1sYWJlbC5oZWxwZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtcGllLWxhYmVsXScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDx0aXRsZT57eyBsYWJlbCB9fTwvdGl0bGU+XHJcbiAgICA8c3ZnOmcgW2F0dHIudHJhbnNmb3JtXT1cImF0dHJUcmFuc2Zvcm1cIiBbc3R5bGUudHJhbnNmb3JtXT1cInN0eWxlVHJhbnNmb3JtXCIgW3N0eWxlLnRyYW5zaXRpb25dPVwidGV4dFRyYW5zaXRpb25cIj5cclxuICAgICAgPHN2Zzp0ZXh0XHJcbiAgICAgICAgY2xhc3M9XCJwaWUtbGFiZWxcIlxyXG4gICAgICAgIFtjbGFzcy5hbmltYXRpb25dPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgICAgZHk9XCIuMzVlbVwiXHJcbiAgICAgICAgW3N0eWxlLnRleHRBbmNob3JdPVwidGV4dEFuY2hvcigpXCJcclxuICAgICAgICBbc3R5bGUuc2hhcGVSZW5kZXJpbmddPVwiJ2NyaXNwRWRnZXMnXCJcclxuICAgICAgPlxyXG4gICAgICAgIHt7IGxhYmVsVHJpbSA/IHRyaW1MYWJlbChsYWJlbCwgbGFiZWxUcmltU2l6ZSkgOiBsYWJlbCB9fVxyXG4gICAgICA8L3N2Zzp0ZXh0PlxyXG4gICAgPC9zdmc6Zz5cclxuICAgIDxzdmc6cGF0aFxyXG4gICAgICBbYXR0ci5kXT1cImxpbmVcIlxyXG4gICAgICBbYXR0ci5zdHJva2VdPVwiY29sb3JcIlxyXG4gICAgICBmaWxsPVwibm9uZVwiXHJcbiAgICAgIGNsYXNzPVwicGllLWxhYmVsLWxpbmUgbGluZVwiXHJcbiAgICAgIFtjbGFzcy5hbmltYXRpb25dPVwiYW5pbWF0aW9uc1wiXHJcbiAgICA+PC9zdmc6cGF0aD5cclxuICBgLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQaWVMYWJlbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgZGF0YTtcclxuICBASW5wdXQoKSByYWRpdXM7XHJcbiAgQElucHV0KCkgbGFiZWw7XHJcbiAgQElucHV0KCkgY29sb3I7XHJcbiAgQElucHV0KCkgbWF4O1xyXG4gIEBJbnB1dCgpIHZhbHVlO1xyXG4gIEBJbnB1dCgpIGV4cGxvZGVTbGljZXM7XHJcbiAgQElucHV0KCkgYW5pbWF0aW9uczogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCkgbGFiZWxUcmltOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSBsYWJlbFRyaW1TaXplOiBudW1iZXIgPSAxMDtcclxuXHJcbiAgdHJpbUxhYmVsOiAobGFiZWw6IHN0cmluZywgbWF4PzogbnVtYmVyKSA9PiBzdHJpbmc7XHJcbiAgbGluZTogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IGlzSUUgPSAvKGVkZ2V8bXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy50cmltTGFiZWwgPSB0cmltTGFiZWw7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgbGV0IHN0YXJ0UmFkaXVzID0gdGhpcy5yYWRpdXM7XHJcbiAgICBpZiAodGhpcy5leHBsb2RlU2xpY2VzKSB7XHJcbiAgICAgIHN0YXJ0UmFkaXVzID0gKHRoaXMucmFkaXVzICogdGhpcy52YWx1ZSkgLyB0aGlzLm1heDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpbm5lckFyYyA9IGFyYygpXHJcbiAgICAgIC5pbm5lclJhZGl1cyhzdGFydFJhZGl1cylcclxuICAgICAgLm91dGVyUmFkaXVzKHN0YXJ0UmFkaXVzKTtcclxuXHJcbiAgICAvLyBDYWxjdWxhdGUgaW5uZXJQb3MgdGhlbiBzY2FsZSBvdXRlciBwb3NpdGlvbiB0byBtYXRjaCBsYWJlbCBwb3NpdGlvblxyXG4gICAgY29uc3QgaW5uZXJQb3MgPSBpbm5lckFyYy5jZW50cm9pZCh0aGlzLmRhdGEpO1xyXG5cclxuICAgIGxldCBzY2FsZSA9IHRoaXMuZGF0YS5wb3NbMV0gLyBpbm5lclBvc1sxXTtcclxuICAgIGlmICh0aGlzLmRhdGEucG9zWzFdID09PSAwIHx8IGlubmVyUG9zWzFdID09PSAwKSB7XHJcbiAgICAgIHNjYWxlID0gMTtcclxuICAgIH1cclxuICAgIGNvbnN0IG91dGVyUG9zID0gW3NjYWxlICogaW5uZXJQb3NbMF0sIHNjYWxlICogaW5uZXJQb3NbMV1dO1xyXG5cclxuICAgIHRoaXMubGluZSA9IGBNJHtpbm5lclBvc31MJHtvdXRlclBvc31MJHt0aGlzLmRhdGEucG9zfWA7XHJcbiAgfVxyXG5cclxuICBnZXQgdGV4dFgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGEucG9zWzBdO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHRleHRZKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhLnBvc1sxXTtcclxuICB9XHJcblxyXG4gIGdldCBzdHlsZVRyYW5zZm9ybSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuaXNJRSA/IG51bGwgOiBgdHJhbnNsYXRlM2QoJHt0aGlzLnRleHRYfXB4LCR7dGhpcy50ZXh0WX1weCwgMClgO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGF0dHJUcmFuc2Zvcm0oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAhdGhpcy5pc0lFID8gbnVsbCA6IGB0cmFuc2xhdGUoJHt0aGlzLnRleHRYfSwke3RoaXMudGV4dFl9KWA7XHJcbiAgfVxyXG5cclxuICBnZXQgdGV4dFRyYW5zaXRpb24oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmlzSUUgfHwgIXRoaXMuYW5pbWF0aW9ucyA/IG51bGwgOiAndHJhbnNmb3JtIDAuNzVzJztcclxuICB9XHJcblxyXG4gIHRleHRBbmNob3IoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLm1pZEFuZ2xlKHRoaXMuZGF0YSkgPCBNYXRoLlBJID8gJ3N0YXJ0JyA6ICdlbmQnO1xyXG4gIH1cclxuXHJcbiAgbWlkQW5nbGUoZCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gZC5zdGFydEFuZ2xlICsgKGQuZW5kQW5nbGUgLSBkLnN0YXJ0QW5nbGUpIC8gMjtcclxuICB9XHJcbn1cclxuIl19