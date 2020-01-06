import { __decorate } from "tslib";
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { line } from 'd3-shape';
let GaugeAxisComponent = class GaugeAxisComponent {
    constructor() {
        this.rotate = '';
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.rotationAngle = -90 + this.startAngle;
        this.rotate = `rotate(${this.rotationAngle})`;
        this.ticks = this.getTicks();
    }
    getTicks() {
        const bigTickSegment = this.angleSpan / this.bigSegments;
        const smallTickSegment = bigTickSegment / this.smallSegments;
        const tickLength = 20;
        const ticks = {
            big: [],
            small: []
        };
        const startDistance = this.radius + 10;
        const textDist = startDistance + tickLength + 10;
        for (let i = 0; i <= this.bigSegments; i++) {
            const angleDeg = i * bigTickSegment;
            const angle = (angleDeg * Math.PI) / 180;
            const textAnchor = this.getTextAnchor(angleDeg);
            let skip = false;
            if (i === 0 && this.angleSpan === 360) {
                skip = true;
            }
            if (!skip) {
                let text = Number.parseFloat(this.valueScale.invert(angleDeg).toString()).toLocaleString();
                if (this.tickFormatting) {
                    text = this.tickFormatting(text);
                }
                ticks.big.push({
                    line: this.getTickPath(startDistance, tickLength, angle),
                    textAnchor,
                    text,
                    textTransform: `
            translate(${textDist * Math.cos(angle)}, ${textDist * Math.sin(angle)}) rotate(${-this.rotationAngle})
          `
                });
            }
            if (i === this.bigSegments) {
                continue;
            }
            for (let j = 1; j <= this.smallSegments; j++) {
                const smallAngleDeg = angleDeg + j * smallTickSegment;
                const smallAngle = (smallAngleDeg * Math.PI) / 180;
                ticks.small.push({
                    line: this.getTickPath(startDistance, tickLength / 2, smallAngle)
                });
            }
        }
        return ticks;
    }
    getTextAnchor(angle) {
        // [0, 45] = 'middle';
        // [46, 135] = 'start';
        // [136, 225] = 'middle';
        // [226, 315] = 'end';
        angle = (this.startAngle + angle) % 360;
        let textAnchor = 'middle';
        if (angle > 45 && angle <= 135) {
            textAnchor = 'start';
        }
        else if (angle > 225 && angle <= 315) {
            textAnchor = 'end';
        }
        return textAnchor;
    }
    getTickPath(startDistance, tickLength, angle) {
        const y1 = startDistance * Math.sin(angle);
        const y2 = (startDistance + tickLength) * Math.sin(angle);
        const x1 = startDistance * Math.cos(angle);
        const x2 = (startDistance + tickLength) * Math.cos(angle);
        const points = [
            { x: x1, y: y1 },
            { x: x2, y: y2 }
        ];
        const lineGenerator = line()
            .x(d => d.x)
            .y(d => d.y);
        return lineGenerator(points);
    }
};
__decorate([
    Input()
], GaugeAxisComponent.prototype, "bigSegments", void 0);
__decorate([
    Input()
], GaugeAxisComponent.prototype, "smallSegments", void 0);
__decorate([
    Input()
], GaugeAxisComponent.prototype, "min", void 0);
__decorate([
    Input()
], GaugeAxisComponent.prototype, "max", void 0);
__decorate([
    Input()
], GaugeAxisComponent.prototype, "angleSpan", void 0);
__decorate([
    Input()
], GaugeAxisComponent.prototype, "startAngle", void 0);
__decorate([
    Input()
], GaugeAxisComponent.prototype, "radius", void 0);
__decorate([
    Input()
], GaugeAxisComponent.prototype, "valueScale", void 0);
__decorate([
    Input()
], GaugeAxisComponent.prototype, "tickFormatting", void 0);
GaugeAxisComponent = __decorate([
    Component({
        selector: 'g[ngx-charts-gauge-axis]',
        template: `
    <svg:g [attr.transform]="rotate">
      <svg:g *ngFor="let tick of ticks.big" class="gauge-tick gauge-tick-large">
        <svg:path [attr.d]="tick.line" />
      </svg:g>
      <svg:g *ngFor="let tick of ticks.big" class="gauge-tick gauge-tick-large">
        <svg:text
          [style.textAnchor]="tick.textAnchor"
          [attr.transform]="tick.textTransform"
          alignment-baseline="central"
        >
          {{ tick.text }}
        </svg:text>
      </svg:g>
      <svg:g *ngFor="let tick of ticks.small" class="gauge-tick gauge-tick-small">
        <svg:path [attr.d]="tick.line" />
      </svg:g>
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], GaugeAxisComponent);
export { GaugeAxisComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F1Z2UtYXhpcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9nYXVnZS9nYXVnZS1heGlzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQTRCLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUF5QmhDLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBQS9CO1FBYUUsV0FBTSxHQUFXLEVBQUUsQ0FBQztJQWtHdEIsQ0FBQztJQWhHQyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNDLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUM7UUFDOUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELFFBQVE7UUFDTixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDekQsTUFBTSxnQkFBZ0IsR0FBRyxjQUFjLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM3RCxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDdEIsTUFBTSxLQUFLLEdBQUc7WUFDWixHQUFHLEVBQUUsRUFBRTtZQUNQLEtBQUssRUFBRSxFQUFFO1NBQ1YsQ0FBQztRQUVGLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sUUFBUSxHQUFHLGFBQWEsR0FB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USxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQlQ7UUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtLQUNoRCxDQUFDO0dBQ1csa0JBQWtCLENBK0c5QjtTQS9HWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGxpbmUgfSBmcm9tICdkMy1zaGFwZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1nYXVnZS1heGlzXScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxzdmc6ZyBbYXR0ci50cmFuc2Zvcm1dPVwicm90YXRlXCI+XHJcbiAgICAgIDxzdmc6ZyAqbmdGb3I9XCJsZXQgdGljayBvZiB0aWNrcy5iaWdcIiBjbGFzcz1cImdhdWdlLXRpY2sgZ2F1Z2UtdGljay1sYXJnZVwiPlxyXG4gICAgICAgIDxzdmc6cGF0aCBbYXR0ci5kXT1cInRpY2subGluZVwiIC8+XHJcbiAgICAgIDwvc3ZnOmc+XHJcbiAgICAgIDxzdmc6ZyAqbmdGb3I9XCJsZXQgdGljayBvZiB0aWNrcy5iaWdcIiBjbGFzcz1cImdhdWdlLXRpY2sgZ2F1Z2UtdGljay1sYXJnZVwiPlxyXG4gICAgICAgIDxzdmc6dGV4dFxyXG4gICAgICAgICAgW3N0eWxlLnRleHRBbmNob3JdPVwidGljay50ZXh0QW5jaG9yXCJcclxuICAgICAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJ0aWNrLnRleHRUcmFuc2Zvcm1cIlxyXG4gICAgICAgICAgYWxpZ25tZW50LWJhc2VsaW5lPVwiY2VudHJhbFwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAge3sgdGljay50ZXh0IH19XHJcbiAgICAgICAgPC9zdmc6dGV4dD5cclxuICAgICAgPC9zdmc6Zz5cclxuICAgICAgPHN2ZzpnICpuZ0Zvcj1cImxldCB0aWNrIG9mIHRpY2tzLnNtYWxsXCIgY2xhc3M9XCJnYXVnZS10aWNrIGdhdWdlLXRpY2stc21hbGxcIj5cclxuICAgICAgICA8c3ZnOnBhdGggW2F0dHIuZF09XCJ0aWNrLmxpbmVcIiAvPlxyXG4gICAgICA8L3N2ZzpnPlxyXG4gICAgPC9zdmc6Zz5cclxuICBgLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYXVnZUF4aXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIGJpZ1NlZ21lbnRzOiBhbnk7XHJcbiAgQElucHV0KCkgc21hbGxTZWdtZW50czogYW55O1xyXG4gIEBJbnB1dCgpIG1pbjogYW55O1xyXG4gIEBJbnB1dCgpIG1heDogYW55O1xyXG4gIEBJbnB1dCgpIGFuZ2xlU3BhbjogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHN0YXJ0QW5nbGU6IG51bWJlcjtcclxuICBASW5wdXQoKSByYWRpdXM6IGFueTtcclxuICBASW5wdXQoKSB2YWx1ZVNjYWxlOiBhbnk7XHJcbiAgQElucHV0KCkgdGlja0Zvcm1hdHRpbmc6IGFueTtcclxuXHJcbiAgdGlja3M6IGFueTtcclxuICByb3RhdGlvbkFuZ2xlOiBudW1iZXI7XHJcbiAgcm90YXRlOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMucm90YXRpb25BbmdsZSA9IC05MCArIHRoaXMuc3RhcnRBbmdsZTtcclxuICAgIHRoaXMucm90YXRlID0gYHJvdGF0ZSgke3RoaXMucm90YXRpb25BbmdsZX0pYDtcclxuICAgIHRoaXMudGlja3MgPSB0aGlzLmdldFRpY2tzKCk7XHJcbiAgfVxyXG5cclxuICBnZXRUaWNrcygpOiBhbnkge1xyXG4gICAgY29uc3QgYmlnVGlja1NlZ21lbnQgPSB0aGlzLmFuZ2xlU3BhbiAvIHRoaXMuYmlnU2VnbWVudHM7XHJcbiAgICBjb25zdCBzbWFsbFRpY2tTZWdtZW50ID0gYmlnVGlja1NlZ21lbnQgLyB0aGlzLnNtYWxsU2VnbWVudHM7XHJcbiAgICBjb25zdCB0aWNrTGVuZ3RoID0gMjA7XHJcbiAgICBjb25zdCB0aWNrcyA9IHtcclxuICAgICAgYmlnOiBbXSxcclxuICAgICAgc21hbGw6IFtdXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHN0YXJ0RGlzdGFuY2UgPSB0aGlzLnJhZGl1cyArIDEwO1xyXG4gICAgY29uc3QgdGV4dERpc3QgPSBzdGFydERpc3RhbmNlICsgdGlja0xlbmd0aCArIDEwO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHRoaXMuYmlnU2VnbWVudHM7IGkrKykge1xyXG4gICAgICBjb25zdCBhbmdsZURlZyA9IGkgKiBiaWdUaWNrU2VnbWVudDtcclxuICAgICAgY29uc3QgYW5nbGUgPSAoYW5nbGVEZWcgKiBNYXRoLlBJKSAvIDE4MDtcclxuXHJcbiAgICAgIGNvbnN0IHRleHRBbmNob3IgPSB0aGlzLmdldFRleHRBbmNob3IoYW5nbGVEZWcpO1xyXG5cclxuICAgICAgbGV0IHNraXAgPSBmYWxzZTtcclxuICAgICAgaWYgKGkgPT09IDAgJiYgdGhpcy5hbmdsZVNwYW4gPT09IDM2MCkge1xyXG4gICAgICAgIHNraXAgPSB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXNraXApIHtcclxuICAgICAgICBsZXQgdGV4dCA9IE51bWJlci5wYXJzZUZsb2F0KHRoaXMudmFsdWVTY2FsZS5pbnZlcnQoYW5nbGVEZWcpLnRvU3RyaW5nKCkpLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICAgICAgaWYgKHRoaXMudGlja0Zvcm1hdHRpbmcpIHtcclxuICAgICAgICAgIHRleHQgPSB0aGlzLnRpY2tGb3JtYXR0aW5nKHRleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aWNrcy5iaWcucHVzaCh7XHJcbiAgICAgICAgICBsaW5lOiB0aGlzLmdldFRpY2tQYXRoKHN0YXJ0RGlzdGFuY2UsIHRpY2tMZW5ndGgsIGFuZ2xlKSxcclxuICAgICAgICAgIHRleHRBbmNob3IsXHJcbiAgICAgICAgICB0ZXh0LFxyXG4gICAgICAgICAgdGV4dFRyYW5zZm9ybTogYFxyXG4gICAgICAgICAgICB0cmFuc2xhdGUoJHt0ZXh0RGlzdCAqIE1hdGguY29zKGFuZ2xlKX0sICR7dGV4dERpc3QgKiBNYXRoLnNpbihhbmdsZSl9KSByb3RhdGUoJHstdGhpcy5yb3RhdGlvbkFuZ2xlfSlcclxuICAgICAgICAgIGBcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGkgPT09IHRoaXMuYmlnU2VnbWVudHMpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yIChsZXQgaiA9IDE7IGogPD0gdGhpcy5zbWFsbFNlZ21lbnRzOyBqKyspIHtcclxuICAgICAgICBjb25zdCBzbWFsbEFuZ2xlRGVnID0gYW5nbGVEZWcgKyBqICogc21hbGxUaWNrU2VnbWVudDtcclxuICAgICAgICBjb25zdCBzbWFsbEFuZ2xlID0gKHNtYWxsQW5nbGVEZWcgKiBNYXRoLlBJKSAvIDE4MDtcclxuXHJcbiAgICAgICAgdGlja3Muc21hbGwucHVzaCh7XHJcbiAgICAgICAgICBsaW5lOiB0aGlzLmdldFRpY2tQYXRoKHN0YXJ0RGlzdGFuY2UsIHRpY2tMZW5ndGggLyAyLCBzbWFsbEFuZ2xlKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRpY2tzO1xyXG4gIH1cclxuXHJcbiAgZ2V0VGV4dEFuY2hvcihhbmdsZSkge1xyXG4gICAgLy8gWzAsIDQ1XSA9ICdtaWRkbGUnO1xyXG4gICAgLy8gWzQ2LCAxMzVdID0gJ3N0YXJ0JztcclxuICAgIC8vIFsxMzYsIDIyNV0gPSAnbWlkZGxlJztcclxuICAgIC8vIFsyMjYsIDMxNV0gPSAnZW5kJztcclxuXHJcbiAgICBhbmdsZSA9ICh0aGlzLnN0YXJ0QW5nbGUgKyBhbmdsZSkgJSAzNjA7XHJcbiAgICBsZXQgdGV4dEFuY2hvciA9ICdtaWRkbGUnO1xyXG4gICAgaWYgKGFuZ2xlID4gNDUgJiYgYW5nbGUgPD0gMTM1KSB7XHJcbiAgICAgIHRleHRBbmNob3IgPSAnc3RhcnQnO1xyXG4gICAgfSBlbHNlIGlmIChhbmdsZSA+IDIyNSAmJiBhbmdsZSA8PSAzMTUpIHtcclxuICAgICAgdGV4dEFuY2hvciA9ICdlbmQnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRleHRBbmNob3I7XHJcbiAgfVxyXG5cclxuICBnZXRUaWNrUGF0aChzdGFydERpc3RhbmNlLCB0aWNrTGVuZ3RoLCBhbmdsZSk6IGFueSB7XHJcbiAgICBjb25zdCB5MSA9IHN0YXJ0RGlzdGFuY2UgKiBNYXRoLnNpbihhbmdsZSk7XHJcbiAgICBjb25zdCB5MiA9IChzdGFydERpc3RhbmNlICsgdGlja0xlbmd0aCkgKiBNYXRoLnNpbihhbmdsZSk7XHJcbiAgICBjb25zdCB4MSA9IHN0YXJ0RGlzdGFuY2UgKiBNYXRoLmNvcyhhbmdsZSk7XHJcbiAgICBjb25zdCB4MiA9IChzdGFydERpc3RhbmNlICsgdGlja0xlbmd0aCkgKiBNYXRoLmNvcyhhbmdsZSk7XHJcblxyXG4gICAgY29uc3QgcG9pbnRzID0gW1xyXG4gICAgICB7IHg6IHgxLCB5OiB5MSB9LFxyXG4gICAgICB7IHg6IHgyLCB5OiB5MiB9XHJcbiAgICBdO1xyXG4gICAgY29uc3QgbGluZUdlbmVyYXRvciA9IGxpbmU8YW55PigpXHJcbiAgICAgIC54KGQgPT4gZC54KVxyXG4gICAgICAueShkID0+IGQueSk7XHJcbiAgICByZXR1cm4gbGluZUdlbmVyYXRvcihwb2ludHMpO1xyXG4gIH1cclxufVxyXG4iXX0=