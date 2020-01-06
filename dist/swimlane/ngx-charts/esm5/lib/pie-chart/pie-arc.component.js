import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ElementRef, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { interpolate } from 'd3-interpolate';
import { select } from 'd3-selection';
import { arc } from 'd3-shape';
import { id } from '../utils/id';
var PieArcComponent = /** @class */ (function () {
    function PieArcComponent(element) {
        this.startAngle = 0;
        this.endAngle = Math.PI * 2;
        this.cornerRadius = 0;
        this.explodeSlices = false;
        this.gradient = false;
        this.animate = true;
        this.pointerEvents = true;
        this.isActive = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.dblclick = new EventEmitter();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    PieArcComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PieArcComponent.prototype.getGradient = function () {
        return this.gradient ? this.gradientFill : this.fill;
    };
    PieArcComponent.prototype.getPointerEvents = function () {
        return this.pointerEvents ? 'auto' : 'none';
    };
    PieArcComponent.prototype.update = function () {
        var calc = this.calculateArc();
        this.startOpacity = 0.5;
        this.radialGradientId = 'linearGrad' + id().toString();
        this.gradientFill = "url(#" + this.radialGradientId + ")";
        if (this.animate) {
            if (this.initialized) {
                this.updateAnimation();
            }
            else {
                this.loadAnimation();
                this.initialized = true;
            }
        }
        else {
            this.path = calc.startAngle(this.startAngle).endAngle(this.endAngle)();
        }
    };
    PieArcComponent.prototype.calculateArc = function () {
        var outerRadius = this.outerRadius;
        if (this.explodeSlices && this.innerRadius === 0) {
            outerRadius = (this.outerRadius * this.value) / this.max;
        }
        return arc()
            .innerRadius(this.innerRadius)
            .outerRadius(outerRadius)
            .cornerRadius(this.cornerRadius);
    };
    PieArcComponent.prototype.loadAnimation = function () {
        var node = select(this.element)
            .selectAll('.arc')
            .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        var calc = this.calculateArc();
        node
            .transition()
            .attrTween('d', function (d) {
            this._current = this._current || d;
            var copyOfD = Object.assign({}, d);
            copyOfD.endAngle = copyOfD.startAngle;
            var interpolater = interpolate(copyOfD, copyOfD);
            this._current = interpolater(0);
            return function (t) {
                return calc(interpolater(t));
            };
        })
            .transition()
            .duration(750)
            .attrTween('d', function (d) {
            this._current = this._current || d;
            var interpolater = interpolate(this._current, d);
            this._current = interpolater(0);
            return function (t) {
                return calc(interpolater(t));
            };
        });
    };
    PieArcComponent.prototype.updateAnimation = function () {
        var node = select(this.element)
            .selectAll('.arc')
            .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        var calc = this.calculateArc();
        node
            .transition()
            .duration(750)
            .attrTween('d', function (d) {
            this._current = this._current || d;
            var interpolater = interpolate(this._current, d);
            this._current = interpolater(0);
            return function (t) {
                return calc(interpolater(t));
            };
        });
    };
    PieArcComponent.prototype.onClick = function () {
        var _this = this;
        clearTimeout(this._timeout);
        this._timeout = setTimeout(function () { return _this.select.emit(_this.data); }, 200);
    };
    PieArcComponent.prototype.onDblClick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        clearTimeout(this._timeout);
        this.dblclick.emit({
            data: this.data,
            nativeEvent: event
        });
    };
    PieArcComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], PieArcComponent.prototype, "fill", void 0);
    __decorate([
        Input()
    ], PieArcComponent.prototype, "startAngle", void 0);
    __decorate([
        Input()
    ], PieArcComponent.prototype, "endAngle", void 0);
    __decorate([
        Input()
    ], PieArcComponent.prototype, "innerRadius", void 0);
    __decorate([
        Input()
    ], PieArcComponent.prototype, "outerRadius", void 0);
    __decorate([
        Input()
    ], PieArcComponent.prototype, "cornerRadius", void 0);
    __decorate([
        Input()
    ], PieArcComponent.prototype, "value", void 0);
    __decorate([
        Input()
    ], PieArcComponent.prototype, "max", void 0);
    __decorate([
        Input()
    ], PieArcComponent.prototype, "data", void 0);
    __decorate([
        Input()
    ], PieArcComponent.prototype, "explodeSlices", void 0);
    __decorate([
        Input()
    ], PieArcComponent.prototype, "gradient", void 0);
    __decorate([
        Input()
    ], PieArcComponent.prototype, "animate", void 0);
    __decorate([
        Input()
    ], PieArcComponent.prototype, "pointerEvents", void 0);
    __decorate([
        Input()
    ], PieArcComponent.prototype, "isActive", void 0);
    __decorate([
        Output()
    ], PieArcComponent.prototype, "select", void 0);
    __decorate([
        Output()
    ], PieArcComponent.prototype, "activate", void 0);
    __decorate([
        Output()
    ], PieArcComponent.prototype, "deactivate", void 0);
    __decorate([
        Output()
    ], PieArcComponent.prototype, "dblclick", void 0);
    PieArcComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-pie-arc]',
            template: "\n    <svg:g class=\"arc-group\">\n      <svg:defs *ngIf=\"gradient\">\n        <svg:g\n          ngx-charts-svg-radial-gradient\n          [color]=\"fill\"\n          orientation=\"vertical\"\n          [name]=\"radialGradientId\"\n          [startOpacity]=\"startOpacity\"\n        />\n      </svg:defs>\n      <svg:path\n        [attr.d]=\"path\"\n        class=\"arc\"\n        [class.active]=\"isActive\"\n        [attr.fill]=\"getGradient()\"\n        (click)=\"onClick()\"\n        (dblclick)=\"onDblClick($event)\"\n        (mouseenter)=\"activate.emit(data)\"\n        (mouseleave)=\"deactivate.emit(data)\"\n        [style.pointer-events]=\"getPointerEvents()\"\n      />\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], PieArcComponent);
    return PieArcComponent;
}());
export { PieArcComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWFyYy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9waWUtY2hhcnQvcGllLWFyYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osVUFBVSxFQUNWLGFBQWEsRUFDYixTQUFTLEVBQ1QsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFL0IsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQWdDakM7SUE4QkUseUJBQVksT0FBbUI7UUE1QnRCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsYUFBUSxHQUFXLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRy9CLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBSXpCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsWUFBTyxHQUFZLElBQUksQ0FBQztRQUN4QixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBRXpCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBUXhDLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBSTNCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUN2QyxDQUFDO0lBRUQscUNBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQscUNBQVcsR0FBWDtRQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN2RCxDQUFDO0lBRUQsMENBQWdCLEdBQWhCO1FBQ0UsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUM5QyxDQUFDO0lBRUQsZ0NBQU0sR0FBTjtRQUNFLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUN4QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsWUFBWSxHQUFHLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3ZELElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBUSxJQUFJLENBQUMsZ0JBQWdCLE1BQUcsQ0FBQztRQUVyRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNwQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7YUFDeEI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQzthQUN6QjtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztTQUN4RTtJQUNILENBQUM7SUFFRCxzQ0FBWSxHQUFaO1FBQ0UsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNuQyxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLEVBQUU7WUFDaEQsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUMxRDtRQUVELE9BQU8sR0FBRyxFQUFFO2FBQ1QsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDN0IsV0FBVyxDQUFDLFdBQVcsQ0FBQzthQUN4QixZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCx1Q0FBYSxHQUFiO1FBQ0UsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDOUIsU0FBUyxDQUFDLE1BQU0sQ0FBQzthQUNqQixJQUFJLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXBFLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVqQyxJQUFJO2FBQ0QsVUFBVSxFQUFFO2FBQ1osU0FBUyxDQUFDLEdBQUcsRUFBRSxVQUFTLENBQUM7WUFDbEIsSUFBSyxDQUFDLFFBQVEsR0FBUyxJQUFLLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQztZQUNqRCxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyQyxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7WUFDdEMsSUFBTSxZQUFZLEdBQUcsV0FBVyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztZQUM3QyxJQUFLLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QyxPQUFPLFVBQVMsQ0FBQztnQkFDZixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUM7UUFDSixDQUFDLENBQUM7YUFDRCxVQUFVLEVBQUU7YUFDWixRQUFRLENBQUMsR0FBRyxDQUFDO2FBQ2IsU0FBUyxDQUFDLEdBQUcsRUFBRSxVQUFTLENBQUM7WUFDbEIsSUFBSyxDQUFDLFFBQVEsR0FBUyxJQUFLLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQztZQUNqRCxJQUFNLFlBQVksR0FBRyxXQUFXLENBQU8sSUFBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwRCxJQUFLLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QyxPQUFPLFVBQVMsQ0FBQztnQkFDZixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx5Q0FBZSxHQUFmO1FBQ0UsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDOUIsU0FBUyxDQUFDLE1BQU0sQ0FBQzthQUNqQixJQUFJLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXBFLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVqQyxJQUFJO2FBQ0QsVUFBVSxFQUFFO2FBQ1osUUFBUSxDQUFDLEdBQUcsQ0FBQzthQUNiLFNBQVMsQ0FBQyxHQUFHLEVBQUUsVUFBUyxDQUFDO1lBQ2xCLElBQUssQ0FBQyxRQUFRLEdBQVMsSUFBSyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUM7WUFDakQsSUFBTSxZQUFZLEdBQUcsV0FBVyxDQUFPLElBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEQsSUFBSyxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsT0FBTyxVQUFTLENBQUM7Z0JBQ2YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsaUNBQU8sR0FBUDtRQUFBLGlCQUdDO1FBRkMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxFQUEzQixDQUEyQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxvQ0FBVSxHQUFWLFVBQVcsS0FBaUI7UUFDMUIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ2pCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFdBQVcsRUFBRSxLQUFLO1NBQ25CLENBQUMsQ0FBQztJQUNMLENBQUM7O2dCQS9Hb0IsVUFBVTs7SUE3QnRCO1FBQVIsS0FBSyxFQUFFO2lEQUFNO0lBQ0w7UUFBUixLQUFLLEVBQUU7dURBQXdCO0lBQ3ZCO1FBQVIsS0FBSyxFQUFFO3FEQUFnQztJQUMvQjtRQUFSLEtBQUssRUFBRTt3REFBYTtJQUNaO1FBQVIsS0FBSyxFQUFFO3dEQUFhO0lBQ1o7UUFBUixLQUFLLEVBQUU7eURBQTBCO0lBQ3pCO1FBQVIsS0FBSyxFQUFFO2tEQUFPO0lBQ047UUFBUixLQUFLLEVBQUU7Z0RBQUs7SUFDSjtRQUFSLEtBQUssRUFBRTtpREFBTTtJQUNMO1FBQVIsS0FBSyxFQUFFOzBEQUFnQztJQUMvQjtRQUFSLEtBQUssRUFBRTtxREFBMkI7SUFDMUI7UUFBUixLQUFLLEVBQUU7b0RBQXlCO0lBQ3hCO1FBQVIsS0FBSyxFQUFFOzBEQUErQjtJQUM5QjtRQUFSLEtBQUssRUFBRTtxREFBMkI7SUFFekI7UUFBVCxNQUFNLEVBQUU7bURBQTZCO0lBQzVCO1FBQVQsTUFBTSxFQUFFO3FEQUErQjtJQUM5QjtRQUFULE1BQU0sRUFBRTt1REFBaUM7SUFDaEM7UUFBVCxNQUFNLEVBQUU7cURBQStCO0lBbkI3QixlQUFlO1FBNUIzQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLFFBQVEsRUFBRSw2ckJBdUJUO1lBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQztPQUNXLGVBQWUsQ0E4STNCO0lBQUQsc0JBQUM7Q0FBQSxBQTlJRCxJQThJQztTQTlJWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBFbGVtZW50UmVmLFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGludGVycG9sYXRlIH0gZnJvbSAnZDMtaW50ZXJwb2xhdGUnO1xyXG5pbXBvcnQgeyBzZWxlY3QgfSBmcm9tICdkMy1zZWxlY3Rpb24nO1xyXG5pbXBvcnQgeyBhcmMgfSBmcm9tICdkMy1zaGFwZSc7XHJcblxyXG5pbXBvcnQgeyBpZCB9IGZyb20gJy4uL3V0aWxzL2lkJztcclxuLyogdHNsaW50OmRpc2FibGUgKi9cclxuaW1wb3J0IHsgTW91c2VFdmVudCB9IGZyb20gJy4uL2V2ZW50cyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1waWUtYXJjXScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxzdmc6ZyBjbGFzcz1cImFyYy1ncm91cFwiPlxyXG4gICAgICA8c3ZnOmRlZnMgKm5nSWY9XCJncmFkaWVudFwiPlxyXG4gICAgICAgIDxzdmc6Z1xyXG4gICAgICAgICAgbmd4LWNoYXJ0cy1zdmctcmFkaWFsLWdyYWRpZW50XHJcbiAgICAgICAgICBbY29sb3JdPVwiZmlsbFwiXHJcbiAgICAgICAgICBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCJcclxuICAgICAgICAgIFtuYW1lXT1cInJhZGlhbEdyYWRpZW50SWRcIlxyXG4gICAgICAgICAgW3N0YXJ0T3BhY2l0eV09XCJzdGFydE9wYWNpdHlcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvc3ZnOmRlZnM+XHJcbiAgICAgIDxzdmc6cGF0aFxyXG4gICAgICAgIFthdHRyLmRdPVwicGF0aFwiXHJcbiAgICAgICAgY2xhc3M9XCJhcmNcIlxyXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaXNBY3RpdmVcIlxyXG4gICAgICAgIFthdHRyLmZpbGxdPVwiZ2V0R3JhZGllbnQoKVwiXHJcbiAgICAgICAgKGNsaWNrKT1cIm9uQ2xpY2soKVwiXHJcbiAgICAgICAgKGRibGNsaWNrKT1cIm9uRGJsQ2xpY2soJGV2ZW50KVwiXHJcbiAgICAgICAgKG1vdXNlZW50ZXIpPVwiYWN0aXZhdGUuZW1pdChkYXRhKVwiXHJcbiAgICAgICAgKG1vdXNlbGVhdmUpPVwiZGVhY3RpdmF0ZS5lbWl0KGRhdGEpXCJcclxuICAgICAgICBbc3R5bGUucG9pbnRlci1ldmVudHNdPVwiZ2V0UG9pbnRlckV2ZW50cygpXCJcclxuICAgICAgLz5cclxuICAgIDwvc3ZnOmc+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGllQXJjQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBmaWxsO1xyXG4gIEBJbnB1dCgpIHN0YXJ0QW5nbGU6IG51bWJlciA9IDA7XHJcbiAgQElucHV0KCkgZW5kQW5nbGU6IG51bWJlciA9IE1hdGguUEkgKiAyO1xyXG4gIEBJbnB1dCgpIGlubmVyUmFkaXVzO1xyXG4gIEBJbnB1dCgpIG91dGVyUmFkaXVzO1xyXG4gIEBJbnB1dCgpIGNvcm5lclJhZGl1czogbnVtYmVyID0gMDtcclxuICBASW5wdXQoKSB2YWx1ZTtcclxuICBASW5wdXQoKSBtYXg7XHJcbiAgQElucHV0KCkgZGF0YTtcclxuICBASW5wdXQoKSBleHBsb2RlU2xpY2VzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZ3JhZGllbnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSBhbmltYXRlOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSBwb2ludGVyRXZlbnRzOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSBpc0FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZGJsY2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gIHBhdGg6IGFueTtcclxuICBzdGFydE9wYWNpdHk6IG51bWJlcjtcclxuICByYWRpYWxHcmFkaWVudElkOiBzdHJpbmc7XHJcbiAgbGluZWFyR3JhZGllbnRJZDogc3RyaW5nO1xyXG4gIGdyYWRpZW50RmlsbDogc3RyaW5nO1xyXG4gIGluaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfdGltZW91dDtcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZikge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIGdldEdyYWRpZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ3JhZGllbnQgPyB0aGlzLmdyYWRpZW50RmlsbCA6IHRoaXMuZmlsbDtcclxuICB9XHJcblxyXG4gIGdldFBvaW50ZXJFdmVudHMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wb2ludGVyRXZlbnRzID8gJ2F1dG8nIDogJ25vbmUnO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgY29uc3QgY2FsYyA9IHRoaXMuY2FsY3VsYXRlQXJjKCk7XHJcbiAgICB0aGlzLnN0YXJ0T3BhY2l0eSA9IDAuNTtcclxuICAgIHRoaXMucmFkaWFsR3JhZGllbnRJZCA9ICdsaW5lYXJHcmFkJyArIGlkKCkudG9TdHJpbmcoKTtcclxuICAgIHRoaXMuZ3JhZGllbnRGaWxsID0gYHVybCgjJHt0aGlzLnJhZGlhbEdyYWRpZW50SWR9KWA7XHJcblxyXG4gICAgaWYgKHRoaXMuYW5pbWF0ZSkge1xyXG4gICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlQW5pbWF0aW9uKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5sb2FkQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGF0aCA9IGNhbGMuc3RhcnRBbmdsZSh0aGlzLnN0YXJ0QW5nbGUpLmVuZEFuZ2xlKHRoaXMuZW5kQW5nbGUpKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjYWxjdWxhdGVBcmMoKTogYW55IHtcclxuICAgIGxldCBvdXRlclJhZGl1cyA9IHRoaXMub3V0ZXJSYWRpdXM7XHJcbiAgICBpZiAodGhpcy5leHBsb2RlU2xpY2VzICYmIHRoaXMuaW5uZXJSYWRpdXMgPT09IDApIHtcclxuICAgICAgb3V0ZXJSYWRpdXMgPSAodGhpcy5vdXRlclJhZGl1cyAqIHRoaXMudmFsdWUpIC8gdGhpcy5tYXg7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGFyYygpXHJcbiAgICAgIC5pbm5lclJhZGl1cyh0aGlzLmlubmVyUmFkaXVzKVxyXG4gICAgICAub3V0ZXJSYWRpdXMob3V0ZXJSYWRpdXMpXHJcbiAgICAgIC5jb3JuZXJSYWRpdXModGhpcy5jb3JuZXJSYWRpdXMpO1xyXG4gIH1cclxuXHJcbiAgbG9hZEFuaW1hdGlvbigpOiB2b2lkIHtcclxuICAgIGNvbnN0IG5vZGUgPSBzZWxlY3QodGhpcy5lbGVtZW50KVxyXG4gICAgICAuc2VsZWN0QWxsKCcuYXJjJylcclxuICAgICAgLmRhdGEoW3sgc3RhcnRBbmdsZTogdGhpcy5zdGFydEFuZ2xlLCBlbmRBbmdsZTogdGhpcy5lbmRBbmdsZSB9XSk7XHJcblxyXG4gICAgY29uc3QgY2FsYyA9IHRoaXMuY2FsY3VsYXRlQXJjKCk7XHJcblxyXG4gICAgbm9kZVxyXG4gICAgICAudHJhbnNpdGlvbigpXHJcbiAgICAgIC5hdHRyVHdlZW4oJ2QnLCBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgKDxhbnk+dGhpcykuX2N1cnJlbnQgPSAoPGFueT50aGlzKS5fY3VycmVudCB8fCBkO1xyXG4gICAgICAgIGNvbnN0IGNvcHlPZkQgPSBPYmplY3QuYXNzaWduKHt9LCBkKTtcclxuICAgICAgICBjb3B5T2ZELmVuZEFuZ2xlID0gY29weU9mRC5zdGFydEFuZ2xlO1xyXG4gICAgICAgIGNvbnN0IGludGVycG9sYXRlciA9IGludGVycG9sYXRlKGNvcHlPZkQsIGNvcHlPZkQpO1xyXG4gICAgICAgICg8YW55PnRoaXMpLl9jdXJyZW50ID0gaW50ZXJwb2xhdGVyKDApO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgICByZXR1cm4gY2FsYyhpbnRlcnBvbGF0ZXIodCkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0pXHJcbiAgICAgIC50cmFuc2l0aW9uKClcclxuICAgICAgLmR1cmF0aW9uKDc1MClcclxuICAgICAgLmF0dHJUd2VlbignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAoPGFueT50aGlzKS5fY3VycmVudCA9ICg8YW55PnRoaXMpLl9jdXJyZW50IHx8IGQ7XHJcbiAgICAgICAgY29uc3QgaW50ZXJwb2xhdGVyID0gaW50ZXJwb2xhdGUoKDxhbnk+dGhpcykuX2N1cnJlbnQsIGQpO1xyXG4gICAgICAgICg8YW55PnRoaXMpLl9jdXJyZW50ID0gaW50ZXJwb2xhdGVyKDApO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgICByZXR1cm4gY2FsYyhpbnRlcnBvbGF0ZXIodCkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlQW5pbWF0aW9uKCk6IHZvaWQge1xyXG4gICAgY29uc3Qgbm9kZSA9IHNlbGVjdCh0aGlzLmVsZW1lbnQpXHJcbiAgICAgIC5zZWxlY3RBbGwoJy5hcmMnKVxyXG4gICAgICAuZGF0YShbeyBzdGFydEFuZ2xlOiB0aGlzLnN0YXJ0QW5nbGUsIGVuZEFuZ2xlOiB0aGlzLmVuZEFuZ2xlIH1dKTtcclxuXHJcbiAgICBjb25zdCBjYWxjID0gdGhpcy5jYWxjdWxhdGVBcmMoKTtcclxuXHJcbiAgICBub2RlXHJcbiAgICAgIC50cmFuc2l0aW9uKClcclxuICAgICAgLmR1cmF0aW9uKDc1MClcclxuICAgICAgLmF0dHJUd2VlbignZCcsIGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAoPGFueT50aGlzKS5fY3VycmVudCA9ICg8YW55PnRoaXMpLl9jdXJyZW50IHx8IGQ7XHJcbiAgICAgICAgY29uc3QgaW50ZXJwb2xhdGVyID0gaW50ZXJwb2xhdGUoKDxhbnk+dGhpcykuX2N1cnJlbnQsIGQpO1xyXG4gICAgICAgICg8YW55PnRoaXMpLl9jdXJyZW50ID0gaW50ZXJwb2xhdGVyKDApO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgICByZXR1cm4gY2FsYyhpbnRlcnBvbGF0ZXIodCkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25DbGljaygpOiB2b2lkIHtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0KTtcclxuICAgIHRoaXMuX3RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2VsZWN0LmVtaXQodGhpcy5kYXRhKSwgMjAwKTtcclxuICB9XHJcblxyXG4gIG9uRGJsQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0KTtcclxuXHJcbiAgICB0aGlzLmRibGNsaWNrLmVtaXQoe1xyXG4gICAgICBkYXRhOiB0aGlzLmRhdGEsXHJcbiAgICAgIG5hdGl2ZUV2ZW50OiBldmVudFxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==