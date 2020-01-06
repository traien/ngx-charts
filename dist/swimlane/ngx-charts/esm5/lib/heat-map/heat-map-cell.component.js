import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, SimpleChanges, ElementRef, OnChanges, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { select } from 'd3-selection';
import { id } from '../utils/id';
var HeatMapCellComponent = /** @class */ (function () {
    function HeatMapCellComponent(element) {
        this.gradient = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.element = element.nativeElement;
    }
    HeatMapCellComponent.prototype.ngOnChanges = function (changes) {
        this.transform = "translate(" + this.x + " , " + this.y + ")";
        this.startOpacity = 0.3;
        this.gradientId = 'grad' + id().toString();
        this.gradientUrl = "url(#" + this.gradientId + ")";
        this.gradientStops = this.getGradientStops();
        if (this.animations) {
            this.loadAnimation();
        }
    };
    HeatMapCellComponent.prototype.getGradientStops = function () {
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: this.startOpacity
            },
            {
                offset: 100,
                color: this.fill,
                opacity: 1
            }
        ];
    };
    HeatMapCellComponent.prototype.loadAnimation = function () {
        var node = select(this.element).select('.cell');
        node.attr('opacity', 0);
        this.animateToCurrentForm();
    };
    HeatMapCellComponent.prototype.animateToCurrentForm = function () {
        var node = select(this.element).select('.cell');
        node
            .transition()
            .duration(750)
            .attr('opacity', 1);
    };
    HeatMapCellComponent.prototype.onClick = function () {
        this.select.emit(this.data);
    };
    HeatMapCellComponent.prototype.onMouseEnter = function () {
        this.activate.emit(this.data);
    };
    HeatMapCellComponent.prototype.onMouseLeave = function () {
        this.deactivate.emit(this.data);
    };
    HeatMapCellComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], HeatMapCellComponent.prototype, "fill", void 0);
    __decorate([
        Input()
    ], HeatMapCellComponent.prototype, "x", void 0);
    __decorate([
        Input()
    ], HeatMapCellComponent.prototype, "y", void 0);
    __decorate([
        Input()
    ], HeatMapCellComponent.prototype, "width", void 0);
    __decorate([
        Input()
    ], HeatMapCellComponent.prototype, "height", void 0);
    __decorate([
        Input()
    ], HeatMapCellComponent.prototype, "data", void 0);
    __decorate([
        Input()
    ], HeatMapCellComponent.prototype, "label", void 0);
    __decorate([
        Input()
    ], HeatMapCellComponent.prototype, "gradient", void 0);
    __decorate([
        Input()
    ], HeatMapCellComponent.prototype, "animations", void 0);
    __decorate([
        Output()
    ], HeatMapCellComponent.prototype, "select", void 0);
    __decorate([
        Output()
    ], HeatMapCellComponent.prototype, "activate", void 0);
    __decorate([
        Output()
    ], HeatMapCellComponent.prototype, "deactivate", void 0);
    __decorate([
        HostListener('mouseenter')
    ], HeatMapCellComponent.prototype, "onMouseEnter", null);
    __decorate([
        HostListener('mouseleave')
    ], HeatMapCellComponent.prototype, "onMouseLeave", null);
    HeatMapCellComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-heat-map-cell]',
            template: "\n    <svg:g [attr.transform]=\"transform\" class=\"cell\">\n      <defs *ngIf=\"gradient\">\n        <svg:g ngx-charts-svg-linear-gradient orientation=\"vertical\" [name]=\"gradientId\" [stops]=\"gradientStops\" />\n      </defs>\n      <svg:rect\n        [attr.fill]=\"gradient ? gradientUrl : fill\"\n        rx=\"3\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        class=\"cell\"\n        style=\"cursor: pointer\"\n        (click)=\"onClick()\"\n      />\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], HeatMapCellComponent);
    return HeatMapCellComponent;
}());
export { HeatMapCellComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhdC1tYXAtY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9oZWF0LW1hcC9oZWF0LW1hcC1jZWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixhQUFhLEVBQ2IsVUFBVSxFQUNWLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFdEMsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQXNCakM7SUF1QkUsOEJBQVksT0FBbUI7UUFmdEIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTFCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBV3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUN2QyxDQUFDO0lBRUQsMENBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsZUFBYSxJQUFJLENBQUMsQ0FBQyxXQUFNLElBQUksQ0FBQyxDQUFDLE1BQUcsQ0FBQztRQUVwRCxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sR0FBRyxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVEsSUFBSSxDQUFDLFVBQVUsTUFBRyxDQUFDO1FBQzlDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFN0MsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN0QjtJQUNILENBQUM7SUFFRCwrQ0FBZ0IsR0FBaEI7UUFDRSxPQUFPO1lBQ0w7Z0JBQ0UsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNoQixPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVk7YUFDM0I7WUFDRDtnQkFDRSxNQUFNLEVBQUUsR0FBRztnQkFDWCxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2hCLE9BQU8sRUFBRSxDQUFDO2FBQ1g7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELDRDQUFhLEdBQWI7UUFDRSxJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsbURBQW9CLEdBQXBCO1FBQ0UsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbEQsSUFBSTthQUNELFVBQVUsRUFBRTthQUNaLFFBQVEsQ0FBQyxHQUFHLENBQUM7YUFDYixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxzQ0FBTyxHQUFQO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFHRCwyQ0FBWSxHQUFaO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFHRCwyQ0FBWSxHQUFaO1FBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7O2dCQTNEb0IsVUFBVTs7SUF0QnRCO1FBQVIsS0FBSyxFQUFFO3NEQUFNO0lBQ0w7UUFBUixLQUFLLEVBQUU7bURBQUc7SUFDRjtRQUFSLEtBQUssRUFBRTttREFBRztJQUNGO1FBQVIsS0FBSyxFQUFFO3VEQUFPO0lBQ047UUFBUixLQUFLLEVBQUU7d0RBQVE7SUFDUDtRQUFSLEtBQUssRUFBRTtzREFBTTtJQUNMO1FBQVIsS0FBSyxFQUFFO3VEQUFPO0lBQ047UUFBUixLQUFLLEVBQUU7MERBQTJCO0lBQzFCO1FBQVIsS0FBSyxFQUFFOzREQUE0QjtJQUUxQjtRQUFULE1BQU0sRUFBRTt3REFBNkI7SUFDNUI7UUFBVCxNQUFNLEVBQUU7MERBQStCO0lBQzlCO1FBQVQsTUFBTSxFQUFFOzREQUFpQztJQThEMUM7UUFEQyxZQUFZLENBQUMsWUFBWSxDQUFDOzREQUcxQjtJQUdEO1FBREMsWUFBWSxDQUFDLFlBQVksQ0FBQzs0REFHMUI7SUFsRlUsb0JBQW9CO1FBcEJoQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsNkJBQTZCO1lBQ3ZDLFFBQVEsRUFBRSwwZkFlVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FDVyxvQkFBb0IsQ0FtRmhDO0lBQUQsMkJBQUM7Q0FBQSxBQW5GRCxJQW1GQztTQW5GWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgRWxlbWVudFJlZixcclxuICBPbkNoYW5nZXMsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgSG9zdExpc3RlbmVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IHNlbGVjdCB9IGZyb20gJ2QzLXNlbGVjdGlvbic7XHJcblxyXG5pbXBvcnQgeyBpZCB9IGZyb20gJy4uL3V0aWxzL2lkJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLWhlYXQtbWFwLWNlbGxdJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIiBjbGFzcz1cImNlbGxcIj5cclxuICAgICAgPGRlZnMgKm5nSWY9XCJncmFkaWVudFwiPlxyXG4gICAgICAgIDxzdmc6ZyBuZ3gtY2hhcnRzLXN2Zy1saW5lYXItZ3JhZGllbnQgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiIFtuYW1lXT1cImdyYWRpZW50SWRcIiBbc3RvcHNdPVwiZ3JhZGllbnRTdG9wc1wiIC8+XHJcbiAgICAgIDwvZGVmcz5cclxuICAgICAgPHN2ZzpyZWN0XHJcbiAgICAgICAgW2F0dHIuZmlsbF09XCJncmFkaWVudCA/IGdyYWRpZW50VXJsIDogZmlsbFwiXHJcbiAgICAgICAgcng9XCIzXCJcclxuICAgICAgICBbYXR0ci53aWR0aF09XCJ3aWR0aFwiXHJcbiAgICAgICAgW2F0dHIuaGVpZ2h0XT1cImhlaWdodFwiXHJcbiAgICAgICAgY2xhc3M9XCJjZWxsXCJcclxuICAgICAgICBzdHlsZT1cImN1cnNvcjogcG9pbnRlclwiXHJcbiAgICAgICAgKGNsaWNrKT1cIm9uQ2xpY2soKVwiXHJcbiAgICAgIC8+XHJcbiAgICA8L3N2ZzpnPlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEhlYXRNYXBDZWxsQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBmaWxsO1xyXG4gIEBJbnB1dCgpIHg7XHJcbiAgQElucHV0KCkgeTtcclxuICBASW5wdXQoKSB3aWR0aDtcclxuICBASW5wdXQoKSBoZWlnaHQ7XHJcbiAgQElucHV0KCkgZGF0YTtcclxuICBASW5wdXQoKSBsYWJlbDtcclxuICBASW5wdXQoKSBncmFkaWVudDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGFuaW1hdGlvbnM6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgdHJhbnNmb3JtOiBzdHJpbmc7XHJcbiAgYWN0aXZlUmFuZ2U6IGFueVtdO1xyXG4gIHN0YXJ0T3BhY2l0eTogbnVtYmVyO1xyXG4gIGdyYWRpZW50SWQ6IHN0cmluZztcclxuICBncmFkaWVudFVybDogc3RyaW5nO1xyXG4gIGdyYWRpZW50U3RvcHM6IGFueVtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICB0aGlzLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt0aGlzLnh9ICwgJHt0aGlzLnl9KWA7XHJcblxyXG4gICAgdGhpcy5zdGFydE9wYWNpdHkgPSAwLjM7XHJcbiAgICB0aGlzLmdyYWRpZW50SWQgPSAnZ3JhZCcgKyBpZCgpLnRvU3RyaW5nKCk7XHJcbiAgICB0aGlzLmdyYWRpZW50VXJsID0gYHVybCgjJHt0aGlzLmdyYWRpZW50SWR9KWA7XHJcbiAgICB0aGlzLmdyYWRpZW50U3RvcHMgPSB0aGlzLmdldEdyYWRpZW50U3RvcHMoKTtcclxuXHJcbiAgICBpZiAodGhpcy5hbmltYXRpb25zKSB7XHJcbiAgICAgIHRoaXMubG9hZEFuaW1hdGlvbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0R3JhZGllbnRTdG9wcygpIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIHtcclxuICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgY29sb3I6IHRoaXMuZmlsbCxcclxuICAgICAgICBvcGFjaXR5OiB0aGlzLnN0YXJ0T3BhY2l0eVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgb2Zmc2V0OiAxMDAsXHJcbiAgICAgICAgY29sb3I6IHRoaXMuZmlsbCxcclxuICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgIH1cclxuICAgIF07XHJcbiAgfVxyXG5cclxuICBsb2FkQW5pbWF0aW9uKCk6IHZvaWQge1xyXG4gICAgY29uc3Qgbm9kZSA9IHNlbGVjdCh0aGlzLmVsZW1lbnQpLnNlbGVjdCgnLmNlbGwnKTtcclxuICAgIG5vZGUuYXR0cignb3BhY2l0eScsIDApO1xyXG4gICAgdGhpcy5hbmltYXRlVG9DdXJyZW50Rm9ybSgpO1xyXG4gIH1cclxuXHJcbiAgYW5pbWF0ZVRvQ3VycmVudEZvcm0oKTogdm9pZCB7XHJcbiAgICBjb25zdCBub2RlID0gc2VsZWN0KHRoaXMuZWxlbWVudCkuc2VsZWN0KCcuY2VsbCcpO1xyXG5cclxuICAgIG5vZGVcclxuICAgICAgLnRyYW5zaXRpb24oKVxyXG4gICAgICAuZHVyYXRpb24oNzUwKVxyXG4gICAgICAuYXR0cignb3BhY2l0eScsIDEpO1xyXG4gIH1cclxuXHJcbiAgb25DbGljaygpIHtcclxuICAgIHRoaXMuc2VsZWN0LmVtaXQodGhpcy5kYXRhKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxyXG4gIG9uTW91c2VFbnRlcigpOiB2b2lkIHtcclxuICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh0aGlzLmRhdGEpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXHJcbiAgb25Nb3VzZUxlYXZlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5kZWFjdGl2YXRlLmVtaXQodGhpcy5kYXRhKTtcclxuICB9XHJcbn1cclxuIl19