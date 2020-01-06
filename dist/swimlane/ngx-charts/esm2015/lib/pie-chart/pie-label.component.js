import { __decorate } from "tslib";
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { arc } from 'd3-shape';
import { trimLabel } from '../common/trim-label.helper';
let PieLabelComponent = class PieLabelComponent {
    constructor() {
        this.animations = true;
        this.labelTrim = true;
        this.labelTrimSize = 10;
        this.isIE = /(edge|msie|trident)/i.test(navigator.userAgent);
        this.trimLabel = trimLabel;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        let startRadius = this.radius;
        if (this.explodeSlices) {
            startRadius = (this.radius * this.value) / this.max;
        }
        const innerArc = arc()
            .innerRadius(startRadius)
            .outerRadius(startRadius);
        // Calculate innerPos then scale outer position to match label position
        const innerPos = innerArc.centroid(this.data);
        let scale = this.data.pos[1] / innerPos[1];
        if (this.data.pos[1] === 0 || innerPos[1] === 0) {
            scale = 1;
        }
        const outerPos = [scale * innerPos[0], scale * innerPos[1]];
        this.line = `M${innerPos}L${outerPos}L${this.data.pos}`;
    }
    get textX() {
        return this.data.pos[0];
    }
    get textY() {
        return this.data.pos[1];
    }
    get styleTransform() {
        return this.isIE ? null : `translate3d(${this.textX}px,${this.textY}px, 0)`;
    }
    get attrTransform() {
        return !this.isIE ? null : `translate(${this.textX},${this.textY})`;
    }
    get textTransition() {
        return this.isIE || !this.animations ? null : 'transform 0.75s';
    }
    textAnchor() {
        return this.midAngle(this.data) < Math.PI ? 'start' : 'end';
    }
    midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }
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
        template: `
    <title>{{ label }}</title>
    <svg:g [attr.transform]="attrTransform" [style.transform]="styleTransform" [style.transition]="textTransition">
      <svg:text
        class="pie-label"
        [class.animation]="animations"
        dy=".35em"
        [style.textAnchor]="textAnchor()"
        [style.shapeRendering]="'crispEdges'"
      >
        {{ labelTrim ? trimLabel(label, labelTrimSize) : label }}
      </svg:text>
    </svg:g>
    <svg:path
      [attr.d]="line"
      [attr.stroke]="color"
      fill="none"
      class="pie-label-line line"
      [class.animation]="animations"
    ></svg:path>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], PieLabelComponent);
export { PieLabelComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWxhYmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL3BpZS1jaGFydC9waWUtbGFiZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBNEIsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEcsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUUvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUEyQnhELElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBaUI1QjtRQVRTLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IsY0FBUyxHQUFZLElBQUksQ0FBQztRQUMxQixrQkFBYSxHQUFXLEVBQUUsQ0FBQztRQUtuQixTQUFJLEdBQUcsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUd2RSxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDOUIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDckQ7UUFFRCxNQUFNLFFBQVEsR0FBRyxHQUFHLEVBQUU7YUFDbkIsV0FBVyxDQUFDLFdBQVcsQ0FBQzthQUN4QixXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFNUIsdUVBQXVFO1FBQ3ZFLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTlDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQy9DLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDWDtRQUNELE1BQU0sUUFBUSxHQUFHLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFNUQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFFBQVEsSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMxRCxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxlQUFlLElBQUksQ0FBQyxLQUFLLE1BQU0sSUFBSSxDQUFDLEtBQUssUUFBUSxDQUFDO0lBQzlFLENBQUM7SUFFRCxJQUFJLGFBQWE7UUFDZixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDO0lBQ3RFLENBQUM7SUFFRCxJQUFJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztJQUNsRSxDQUFDO0lBRUQsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDOUQsQ0FBQztJQUVELFFBQVEsQ0FBQyxDQUFDO1FBQ1IsT0FBTyxDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Q0FDRixDQUFBO0FBekVVO0lBQVIsS0FBSyxFQUFFOytDQUFNO0FBQ0w7SUFBUixLQUFLLEVBQUU7aURBQVE7QUFDUDtJQUFSLEtBQUssRUFBRTtnREFBTztBQUNOO0lBQVIsS0FBSyxFQUFFO2dEQUFPO0FBQ047SUFBUixLQUFLLEVBQUU7OENBQUs7QUFDSjtJQUFSLEtBQUssRUFBRTtnREFBTztBQUNOO0lBQVIsS0FBSyxFQUFFO3dEQUFlO0FBQ2Q7SUFBUixLQUFLLEVBQUU7cURBQTRCO0FBQzNCO0lBQVIsS0FBSyxFQUFFO29EQUEyQjtBQUMxQjtJQUFSLEtBQUssRUFBRTt3REFBNEI7QUFWekIsaUJBQWlCO0lBekI3QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUseUJBQXlCO1FBQ25DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQlQ7UUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtLQUNoRCxDQUFDO0dBQ1csaUJBQWlCLENBMEU3QjtTQTFFWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGFyYyB9IGZyb20gJ2QzLXNoYXBlJztcclxuXHJcbmltcG9ydCB7IHRyaW1MYWJlbCB9IGZyb20gJy4uL2NvbW1vbi90cmltLWxhYmVsLmhlbHBlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1waWUtbGFiZWxdJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHRpdGxlPnt7IGxhYmVsIH19PC90aXRsZT5cclxuICAgIDxzdmc6ZyBbYXR0ci50cmFuc2Zvcm1dPVwiYXR0clRyYW5zZm9ybVwiIFtzdHlsZS50cmFuc2Zvcm1dPVwic3R5bGVUcmFuc2Zvcm1cIiBbc3R5bGUudHJhbnNpdGlvbl09XCJ0ZXh0VHJhbnNpdGlvblwiPlxyXG4gICAgICA8c3ZnOnRleHRcclxuICAgICAgICBjbGFzcz1cInBpZS1sYWJlbFwiXHJcbiAgICAgICAgW2NsYXNzLmFuaW1hdGlvbl09XCJhbmltYXRpb25zXCJcclxuICAgICAgICBkeT1cIi4zNWVtXCJcclxuICAgICAgICBbc3R5bGUudGV4dEFuY2hvcl09XCJ0ZXh0QW5jaG9yKClcIlxyXG4gICAgICAgIFtzdHlsZS5zaGFwZVJlbmRlcmluZ109XCInY3Jpc3BFZGdlcydcIlxyXG4gICAgICA+XHJcbiAgICAgICAge3sgbGFiZWxUcmltID8gdHJpbUxhYmVsKGxhYmVsLCBsYWJlbFRyaW1TaXplKSA6IGxhYmVsIH19XHJcbiAgICAgIDwvc3ZnOnRleHQ+XHJcbiAgICA8L3N2ZzpnPlxyXG4gICAgPHN2ZzpwYXRoXHJcbiAgICAgIFthdHRyLmRdPVwibGluZVwiXHJcbiAgICAgIFthdHRyLnN0cm9rZV09XCJjb2xvclwiXHJcbiAgICAgIGZpbGw9XCJub25lXCJcclxuICAgICAgY2xhc3M9XCJwaWUtbGFiZWwtbGluZSBsaW5lXCJcclxuICAgICAgW2NsYXNzLmFuaW1hdGlvbl09XCJhbmltYXRpb25zXCJcclxuICAgID48L3N2ZzpwYXRoPlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFBpZUxhYmVsQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBkYXRhO1xyXG4gIEBJbnB1dCgpIHJhZGl1cztcclxuICBASW5wdXQoKSBsYWJlbDtcclxuICBASW5wdXQoKSBjb2xvcjtcclxuICBASW5wdXQoKSBtYXg7XHJcbiAgQElucHV0KCkgdmFsdWU7XHJcbiAgQElucHV0KCkgZXhwbG9kZVNsaWNlcztcclxuICBASW5wdXQoKSBhbmltYXRpb25zOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSBsYWJlbFRyaW06IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIGxhYmVsVHJpbVNpemU6IG51bWJlciA9IDEwO1xyXG5cclxuICB0cmltTGFiZWw6IChsYWJlbDogc3RyaW5nLCBtYXg/OiBudW1iZXIpID0+IHN0cmluZztcclxuICBsaW5lOiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgaXNJRSA9IC8oZWRnZXxtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnRyaW1MYWJlbCA9IHRyaW1MYWJlbDtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICBsZXQgc3RhcnRSYWRpdXMgPSB0aGlzLnJhZGl1cztcclxuICAgIGlmICh0aGlzLmV4cGxvZGVTbGljZXMpIHtcclxuICAgICAgc3RhcnRSYWRpdXMgPSAodGhpcy5yYWRpdXMgKiB0aGlzLnZhbHVlKSAvIHRoaXMubWF4O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlubmVyQXJjID0gYXJjKClcclxuICAgICAgLmlubmVyUmFkaXVzKHN0YXJ0UmFkaXVzKVxyXG4gICAgICAub3V0ZXJSYWRpdXMoc3RhcnRSYWRpdXMpO1xyXG5cclxuICAgIC8vIENhbGN1bGF0ZSBpbm5lclBvcyB0aGVuIHNjYWxlIG91dGVyIHBvc2l0aW9uIHRvIG1hdGNoIGxhYmVsIHBvc2l0aW9uXHJcbiAgICBjb25zdCBpbm5lclBvcyA9IGlubmVyQXJjLmNlbnRyb2lkKHRoaXMuZGF0YSk7XHJcblxyXG4gICAgbGV0IHNjYWxlID0gdGhpcy5kYXRhLnBvc1sxXSAvIGlubmVyUG9zWzFdO1xyXG4gICAgaWYgKHRoaXMuZGF0YS5wb3NbMV0gPT09IDAgfHwgaW5uZXJQb3NbMV0gPT09IDApIHtcclxuICAgICAgc2NhbGUgPSAxO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgb3V0ZXJQb3MgPSBbc2NhbGUgKiBpbm5lclBvc1swXSwgc2NhbGUgKiBpbm5lclBvc1sxXV07XHJcblxyXG4gICAgdGhpcy5saW5lID0gYE0ke2lubmVyUG9zfUwke291dGVyUG9zfUwke3RoaXMuZGF0YS5wb3N9YDtcclxuICB9XHJcblxyXG4gIGdldCB0ZXh0WCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YS5wb3NbMF07XHJcbiAgfVxyXG5cclxuICBnZXQgdGV4dFkoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGEucG9zWzFdO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHN0eWxlVHJhbnNmb3JtKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5pc0lFID8gbnVsbCA6IGB0cmFuc2xhdGUzZCgke3RoaXMudGV4dFh9cHgsJHt0aGlzLnRleHRZfXB4LCAwKWA7XHJcbiAgfVxyXG5cclxuICBnZXQgYXR0clRyYW5zZm9ybSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuICF0aGlzLmlzSUUgPyBudWxsIDogYHRyYW5zbGF0ZSgke3RoaXMudGV4dFh9LCR7dGhpcy50ZXh0WX0pYDtcclxuICB9XHJcblxyXG4gIGdldCB0ZXh0VHJhbnNpdGlvbigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuaXNJRSB8fCAhdGhpcy5hbmltYXRpb25zID8gbnVsbCA6ICd0cmFuc2Zvcm0gMC43NXMnO1xyXG4gIH1cclxuXHJcbiAgdGV4dEFuY2hvcigpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMubWlkQW5nbGUodGhpcy5kYXRhKSA8IE1hdGguUEkgPyAnc3RhcnQnIDogJ2VuZCc7XHJcbiAgfVxyXG5cclxuICBtaWRBbmdsZShkKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBkLnN0YXJ0QW5nbGUgKyAoZC5lbmRBbmdsZSAtIGQuc3RhcnRBbmdsZSkgLyAyO1xyXG4gIH1cclxufVxyXG4iXX0=