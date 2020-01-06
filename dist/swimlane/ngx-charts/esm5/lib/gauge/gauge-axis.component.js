import { __decorate } from "tslib";
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { line } from 'd3-shape';
var GaugeAxisComponent = /** @class */ (function () {
    function GaugeAxisComponent() {
        this.rotate = '';
    }
    GaugeAxisComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    GaugeAxisComponent.prototype.update = function () {
        this.rotationAngle = -90 + this.startAngle;
        this.rotate = "rotate(" + this.rotationAngle + ")";
        this.ticks = this.getTicks();
    };
    GaugeAxisComponent.prototype.getTicks = function () {
        var bigTickSegment = this.angleSpan / this.bigSegments;
        var smallTickSegment = bigTickSegment / this.smallSegments;
        var tickLength = 20;
        var ticks = {
            big: [],
            small: []
        };
        var startDistance = this.radius + 10;
        var textDist = startDistance + tickLength + 10;
        for (var i = 0; i <= this.bigSegments; i++) {
            var angleDeg = i * bigTickSegment;
            var angle = (angleDeg * Math.PI) / 180;
            var textAnchor = this.getTextAnchor(angleDeg);
            var skip = false;
            if (i === 0 && this.angleSpan === 360) {
                skip = true;
            }
            if (!skip) {
                var text = Number.parseFloat(this.valueScale.invert(angleDeg).toString()).toLocaleString();
                if (this.tickFormatting) {
                    text = this.tickFormatting(text);
                }
                ticks.big.push({
                    line: this.getTickPath(startDistance, tickLength, angle),
                    textAnchor: textAnchor,
                    text: text,
                    textTransform: "\n            translate(" + textDist * Math.cos(angle) + ", " + textDist * Math.sin(angle) + ") rotate(" + -this.rotationAngle + ")\n          "
                });
            }
            if (i === this.bigSegments) {
                continue;
            }
            for (var j = 1; j <= this.smallSegments; j++) {
                var smallAngleDeg = angleDeg + j * smallTickSegment;
                var smallAngle = (smallAngleDeg * Math.PI) / 180;
                ticks.small.push({
                    line: this.getTickPath(startDistance, tickLength / 2, smallAngle)
                });
            }
        }
        return ticks;
    };
    GaugeAxisComponent.prototype.getTextAnchor = function (angle) {
        // [0, 45] = 'middle';
        // [46, 135] = 'start';
        // [136, 225] = 'middle';
        // [226, 315] = 'end';
        angle = (this.startAngle + angle) % 360;
        var textAnchor = 'middle';
        if (angle > 45 && angle <= 135) {
            textAnchor = 'start';
        }
        else if (angle > 225 && angle <= 315) {
            textAnchor = 'end';
        }
        return textAnchor;
    };
    GaugeAxisComponent.prototype.getTickPath = function (startDistance, tickLength, angle) {
        var y1 = startDistance * Math.sin(angle);
        var y2 = (startDistance + tickLength) * Math.sin(angle);
        var x1 = startDistance * Math.cos(angle);
        var x2 = (startDistance + tickLength) * Math.cos(angle);
        var points = [
            { x: x1, y: y1 },
            { x: x2, y: y2 }
        ];
        var lineGenerator = line()
            .x(function (d) { return d.x; })
            .y(function (d) { return d.y; });
        return lineGenerator(points);
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
            template: "\n    <svg:g [attr.transform]=\"rotate\">\n      <svg:g *ngFor=\"let tick of ticks.big\" class=\"gauge-tick gauge-tick-large\">\n        <svg:path [attr.d]=\"tick.line\" />\n      </svg:g>\n      <svg:g *ngFor=\"let tick of ticks.big\" class=\"gauge-tick gauge-tick-large\">\n        <svg:text\n          [style.textAnchor]=\"tick.textAnchor\"\n          [attr.transform]=\"tick.textTransform\"\n          alignment-baseline=\"central\"\n        >\n          {{ tick.text }}\n        </svg:text>\n      </svg:g>\n      <svg:g *ngFor=\"let tick of ticks.small\" class=\"gauge-tick gauge-tick-small\">\n        <svg:path [attr.d]=\"tick.line\" />\n      </svg:g>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], GaugeAxisComponent);
    return GaugeAxisComponent;
}());
export { GaugeAxisComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F1Z2UtYXhpcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9nYXVnZS9nYXVnZS1heGlzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQTRCLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUF5QmhDO0lBQUE7UUFhRSxXQUFNLEdBQVcsRUFBRSxDQUFDO0lBa0d0QixDQUFDO0lBaEdDLHdDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELG1DQUFNLEdBQU47UUFDRSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDM0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFVLElBQUksQ0FBQyxhQUFhLE1BQUcsQ0FBQztRQUM5QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQscUNBQVEsR0FBUjtRQUNFLElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN6RCxJQUFNLGdCQUFnQixHQUFHLGNBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzdELElBQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFNLEtBQUssR0FBRztZQUNaLEdBQUcsRUFBRSxFQUFFO1lBQ1AsS0FBSyxFQUFFLEVBQUU7U0FDVixDQUFDO1FBRUYsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDdkMsSUFBTSxRQUFRLEdBQUcsYUFBYSxHQUFHLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFakQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUMsSUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFHLGNBQWMsQ0FBQztZQUNwQyxJQUFNLEtBQUssR0FBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBRXpDLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFaEQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLEdBQUcsRUFBRTtnQkFDckMsSUFBSSxHQUFHLElBQUksQ0FBQzthQUNiO1lBRUQsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDVCxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQzNGLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtvQkFDdkIsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2xDO2dCQUNELEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO29CQUNiLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDO29CQUN4RCxVQUFVLFlBQUE7b0JBQ1YsSUFBSSxNQUFBO29CQUNKLGFBQWEsRUFBRSw2QkFDRCxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBSyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsaUJBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxrQkFDckc7aUJBQ0YsQ0FBQyxDQUFDO2FBQ0o7WUFFRCxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUMxQixTQUFTO2FBQ1Y7WUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDNUMsSUFBTSxhQUFhLEdBQUcsUUFBUSxHQUFHLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQztnQkFDdEQsSUFBTSxVQUFVLEdBQUcsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFFbkQsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFVBQVUsR0FBRyxDQUFDLEVBQUUsVUFBVSxDQUFDO2lCQUNsRSxDQUFDLENBQUM7YUFDSjtTQUNGO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsMENBQWEsR0FBYixVQUFjLEtBQUs7UUFDakIsc0JBQXNCO1FBQ3RCLHVCQUF1QjtRQUN2Qix5QkFBeUI7UUFDekIsc0JBQXNCO1FBRXRCLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3hDLElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLEtBQUssR0FBRyxFQUFFLElBQUksS0FBSyxJQUFJLEdBQUcsRUFBRTtZQUM5QixVQUFVLEdBQUcsT0FBTyxDQUFDO1NBQ3RCO2FBQU0sSUFBSSxLQUFLLEdBQUcsR0FBRyxJQUFJLEtBQUssSUFBSSxHQUFHLEVBQUU7WUFDdEMsVUFBVSxHQUFHLEtBQUssQ0FBQztTQUNwQjtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFFRCx3Q0FBVyxHQUFYLFVBQVksYUFBYSxFQUFFLFVBQVUsRUFBRSxLQUFLO1FBQzFDLElBQU0sRUFBRSxHQUFHLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLElBQU0sRUFBRSxHQUFHLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUQsSUFBTSxFQUFFLEdBQUcsYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsSUFBTSxFQUFFLEdBQUcsQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxRCxJQUFNLE1BQU0sR0FBRztZQUNiLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO1lBQ2hCLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO1NBQ2pCLENBQUM7UUFDRixJQUFNLGFBQWEsR0FBRyxJQUFJLEVBQU87YUFDOUIsQ0FBQyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsRUFBSCxDQUFHLENBQUM7YUFDWCxDQUFDLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxFQUFILENBQUcsQ0FBQyxDQUFDO1FBQ2YsT0FBTyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQTdHUTtRQUFSLEtBQUssRUFBRTsyREFBa0I7SUFDakI7UUFBUixLQUFLLEVBQUU7NkRBQW9CO0lBQ25CO1FBQVIsS0FBSyxFQUFFO21EQUFVO0lBQ1Q7UUFBUixLQUFLLEVBQUU7bURBQVU7SUFDVDtRQUFSLEtBQUssRUFBRTt5REFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7MERBQW9CO0lBQ25CO1FBQVIsS0FBSyxFQUFFO3NEQUFhO0lBQ1o7UUFBUixLQUFLLEVBQUU7MERBQWlCO0lBQ2hCO1FBQVIsS0FBSyxFQUFFOzhEQUFxQjtJQVRsQixrQkFBa0I7UUF2QjlCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSwwQkFBMEI7WUFDcEMsUUFBUSxFQUFFLHdxQkFrQlQ7WUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO09BQ1csa0JBQWtCLENBK0c5QjtJQUFELHlCQUFDO0NBQUEsQUEvR0QsSUErR0M7U0EvR1ksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBsaW5lIH0gZnJvbSAnZDMtc2hhcGUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtZ2F1Z2UtYXhpc10nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8c3ZnOmcgW2F0dHIudHJhbnNmb3JtXT1cInJvdGF0ZVwiPlxyXG4gICAgICA8c3ZnOmcgKm5nRm9yPVwibGV0IHRpY2sgb2YgdGlja3MuYmlnXCIgY2xhc3M9XCJnYXVnZS10aWNrIGdhdWdlLXRpY2stbGFyZ2VcIj5cclxuICAgICAgICA8c3ZnOnBhdGggW2F0dHIuZF09XCJ0aWNrLmxpbmVcIiAvPlxyXG4gICAgICA8L3N2ZzpnPlxyXG4gICAgICA8c3ZnOmcgKm5nRm9yPVwibGV0IHRpY2sgb2YgdGlja3MuYmlnXCIgY2xhc3M9XCJnYXVnZS10aWNrIGdhdWdlLXRpY2stbGFyZ2VcIj5cclxuICAgICAgICA8c3ZnOnRleHRcclxuICAgICAgICAgIFtzdHlsZS50ZXh0QW5jaG9yXT1cInRpY2sudGV4dEFuY2hvclwiXHJcbiAgICAgICAgICBbYXR0ci50cmFuc2Zvcm1dPVwidGljay50ZXh0VHJhbnNmb3JtXCJcclxuICAgICAgICAgIGFsaWdubWVudC1iYXNlbGluZT1cImNlbnRyYWxcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIHt7IHRpY2sudGV4dCB9fVxyXG4gICAgICAgIDwvc3ZnOnRleHQ+XHJcbiAgICAgIDwvc3ZnOmc+XHJcbiAgICAgIDxzdmc6ZyAqbmdGb3I9XCJsZXQgdGljayBvZiB0aWNrcy5zbWFsbFwiIGNsYXNzPVwiZ2F1Z2UtdGljayBnYXVnZS10aWNrLXNtYWxsXCI+XHJcbiAgICAgICAgPHN2ZzpwYXRoIFthdHRyLmRdPVwidGljay5saW5lXCIgLz5cclxuICAgICAgPC9zdmc6Zz5cclxuICAgIDwvc3ZnOmc+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2F1Z2VBeGlzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBiaWdTZWdtZW50czogYW55O1xyXG4gIEBJbnB1dCgpIHNtYWxsU2VnbWVudHM6IGFueTtcclxuICBASW5wdXQoKSBtaW46IGFueTtcclxuICBASW5wdXQoKSBtYXg6IGFueTtcclxuICBASW5wdXQoKSBhbmdsZVNwYW46IG51bWJlcjtcclxuICBASW5wdXQoKSBzdGFydEFuZ2xlOiBudW1iZXI7XHJcbiAgQElucHV0KCkgcmFkaXVzOiBhbnk7XHJcbiAgQElucHV0KCkgdmFsdWVTY2FsZTogYW55O1xyXG4gIEBJbnB1dCgpIHRpY2tGb3JtYXR0aW5nOiBhbnk7XHJcblxyXG4gIHRpY2tzOiBhbnk7XHJcbiAgcm90YXRpb25BbmdsZTogbnVtYmVyO1xyXG4gIHJvdGF0ZTogc3RyaW5nID0gJyc7XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLnJvdGF0aW9uQW5nbGUgPSAtOTAgKyB0aGlzLnN0YXJ0QW5nbGU7XHJcbiAgICB0aGlzLnJvdGF0ZSA9IGByb3RhdGUoJHt0aGlzLnJvdGF0aW9uQW5nbGV9KWA7XHJcbiAgICB0aGlzLnRpY2tzID0gdGhpcy5nZXRUaWNrcygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VGlja3MoKTogYW55IHtcclxuICAgIGNvbnN0IGJpZ1RpY2tTZWdtZW50ID0gdGhpcy5hbmdsZVNwYW4gLyB0aGlzLmJpZ1NlZ21lbnRzO1xyXG4gICAgY29uc3Qgc21hbGxUaWNrU2VnbWVudCA9IGJpZ1RpY2tTZWdtZW50IC8gdGhpcy5zbWFsbFNlZ21lbnRzO1xyXG4gICAgY29uc3QgdGlja0xlbmd0aCA9IDIwO1xyXG4gICAgY29uc3QgdGlja3MgPSB7XHJcbiAgICAgIGJpZzogW10sXHJcbiAgICAgIHNtYWxsOiBbXVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBzdGFydERpc3RhbmNlID0gdGhpcy5yYWRpdXMgKyAxMDtcclxuICAgIGNvbnN0IHRleHREaXN0ID0gc3RhcnREaXN0YW5jZSArIHRpY2tMZW5ndGggKyAxMDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0aGlzLmJpZ1NlZ21lbnRzOyBpKyspIHtcclxuICAgICAgY29uc3QgYW5nbGVEZWcgPSBpICogYmlnVGlja1NlZ21lbnQ7XHJcbiAgICAgIGNvbnN0IGFuZ2xlID0gKGFuZ2xlRGVnICogTWF0aC5QSSkgLyAxODA7XHJcblxyXG4gICAgICBjb25zdCB0ZXh0QW5jaG9yID0gdGhpcy5nZXRUZXh0QW5jaG9yKGFuZ2xlRGVnKTtcclxuXHJcbiAgICAgIGxldCBza2lwID0gZmFsc2U7XHJcbiAgICAgIGlmIChpID09PSAwICYmIHRoaXMuYW5nbGVTcGFuID09PSAzNjApIHtcclxuICAgICAgICBza2lwID0gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFza2lwKSB7XHJcbiAgICAgICAgbGV0IHRleHQgPSBOdW1iZXIucGFyc2VGbG9hdCh0aGlzLnZhbHVlU2NhbGUuaW52ZXJ0KGFuZ2xlRGVnKS50b1N0cmluZygpKS50b0xvY2FsZVN0cmluZygpO1xyXG4gICAgICAgIGlmICh0aGlzLnRpY2tGb3JtYXR0aW5nKSB7XHJcbiAgICAgICAgICB0ZXh0ID0gdGhpcy50aWNrRm9ybWF0dGluZyh0ZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGlja3MuYmlnLnB1c2goe1xyXG4gICAgICAgICAgbGluZTogdGhpcy5nZXRUaWNrUGF0aChzdGFydERpc3RhbmNlLCB0aWNrTGVuZ3RoLCBhbmdsZSksXHJcbiAgICAgICAgICB0ZXh0QW5jaG9yLFxyXG4gICAgICAgICAgdGV4dCxcclxuICAgICAgICAgIHRleHRUcmFuc2Zvcm06IGBcclxuICAgICAgICAgICAgdHJhbnNsYXRlKCR7dGV4dERpc3QgKiBNYXRoLmNvcyhhbmdsZSl9LCAke3RleHREaXN0ICogTWF0aC5zaW4oYW5nbGUpfSkgcm90YXRlKCR7LXRoaXMucm90YXRpb25BbmdsZX0pXHJcbiAgICAgICAgICBgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpID09PSB0aGlzLmJpZ1NlZ21lbnRzKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvciAobGV0IGogPSAxOyBqIDw9IHRoaXMuc21hbGxTZWdtZW50czsgaisrKSB7XHJcbiAgICAgICAgY29uc3Qgc21hbGxBbmdsZURlZyA9IGFuZ2xlRGVnICsgaiAqIHNtYWxsVGlja1NlZ21lbnQ7XHJcbiAgICAgICAgY29uc3Qgc21hbGxBbmdsZSA9IChzbWFsbEFuZ2xlRGVnICogTWF0aC5QSSkgLyAxODA7XHJcblxyXG4gICAgICAgIHRpY2tzLnNtYWxsLnB1c2goe1xyXG4gICAgICAgICAgbGluZTogdGhpcy5nZXRUaWNrUGF0aChzdGFydERpc3RhbmNlLCB0aWNrTGVuZ3RoIC8gMiwgc21hbGxBbmdsZSlcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aWNrcztcclxuICB9XHJcblxyXG4gIGdldFRleHRBbmNob3IoYW5nbGUpIHtcclxuICAgIC8vIFswLCA0NV0gPSAnbWlkZGxlJztcclxuICAgIC8vIFs0NiwgMTM1XSA9ICdzdGFydCc7XHJcbiAgICAvLyBbMTM2LCAyMjVdID0gJ21pZGRsZSc7XHJcbiAgICAvLyBbMjI2LCAzMTVdID0gJ2VuZCc7XHJcblxyXG4gICAgYW5nbGUgPSAodGhpcy5zdGFydEFuZ2xlICsgYW5nbGUpICUgMzYwO1xyXG4gICAgbGV0IHRleHRBbmNob3IgPSAnbWlkZGxlJztcclxuICAgIGlmIChhbmdsZSA+IDQ1ICYmIGFuZ2xlIDw9IDEzNSkge1xyXG4gICAgICB0ZXh0QW5jaG9yID0gJ3N0YXJ0JztcclxuICAgIH0gZWxzZSBpZiAoYW5nbGUgPiAyMjUgJiYgYW5nbGUgPD0gMzE1KSB7XHJcbiAgICAgIHRleHRBbmNob3IgPSAnZW5kJztcclxuICAgIH1cclxuICAgIHJldHVybiB0ZXh0QW5jaG9yO1xyXG4gIH1cclxuXHJcbiAgZ2V0VGlja1BhdGgoc3RhcnREaXN0YW5jZSwgdGlja0xlbmd0aCwgYW5nbGUpOiBhbnkge1xyXG4gICAgY29uc3QgeTEgPSBzdGFydERpc3RhbmNlICogTWF0aC5zaW4oYW5nbGUpO1xyXG4gICAgY29uc3QgeTIgPSAoc3RhcnREaXN0YW5jZSArIHRpY2tMZW5ndGgpICogTWF0aC5zaW4oYW5nbGUpO1xyXG4gICAgY29uc3QgeDEgPSBzdGFydERpc3RhbmNlICogTWF0aC5jb3MoYW5nbGUpO1xyXG4gICAgY29uc3QgeDIgPSAoc3RhcnREaXN0YW5jZSArIHRpY2tMZW5ndGgpICogTWF0aC5jb3MoYW5nbGUpO1xyXG5cclxuICAgIGNvbnN0IHBvaW50cyA9IFtcclxuICAgICAgeyB4OiB4MSwgeTogeTEgfSxcclxuICAgICAgeyB4OiB4MiwgeTogeTIgfVxyXG4gICAgXTtcclxuICAgIGNvbnN0IGxpbmVHZW5lcmF0b3IgPSBsaW5lPGFueT4oKVxyXG4gICAgICAueChkID0+IGQueClcclxuICAgICAgLnkoZCA9PiBkLnkpO1xyXG4gICAgcmV0dXJuIGxpbmVHZW5lcmF0b3IocG9pbnRzKTtcclxuICB9XHJcbn1cclxuIl19