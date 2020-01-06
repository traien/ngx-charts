import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { pie } from 'd3-shape';
var PieGridSeriesComponent = /** @class */ (function () {
    function PieGridSeriesComponent(element) {
        this.innerRadius = 70;
        this.outerRadius = 80;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.element = element.nativeElement;
    }
    PieGridSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PieGridSeriesComponent.prototype.update = function () {
        this.layout = pie()
            .value(function (d) { return d.data.value; })
            .sort(null);
        this.arcs = this.getArcs();
    };
    PieGridSeriesComponent.prototype.getArcs = function () {
        var _this = this;
        return this.layout(this.data).map(function (arc, index) {
            var label = arc.data.data.name;
            var other = arc.data.data.other;
            if (index === 0) {
                arc.startAngle = 0;
            }
            var color = _this.colors(label);
            return {
                data: arc.data.data,
                class: 'arc ' + 'arc' + index,
                fill: color,
                startAngle: other ? 0 : arc.startAngle,
                endAngle: arc.endAngle,
                animate: _this.animations && !other,
                pointerEvents: !other
            };
        });
    };
    PieGridSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(this.data[0].data);
    };
    PieGridSeriesComponent.prototype.trackBy = function (index, item) {
        return item.data.name;
    };
    PieGridSeriesComponent.prototype.label = function (arc) {
        return arc.data.name;
    };
    PieGridSeriesComponent.prototype.color = function (arc) {
        return this.colors(this.label(arc));
    };
    PieGridSeriesComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], PieGridSeriesComponent.prototype, "colors", void 0);
    __decorate([
        Input()
    ], PieGridSeriesComponent.prototype, "data", void 0);
    __decorate([
        Input()
    ], PieGridSeriesComponent.prototype, "innerRadius", void 0);
    __decorate([
        Input()
    ], PieGridSeriesComponent.prototype, "outerRadius", void 0);
    __decorate([
        Input()
    ], PieGridSeriesComponent.prototype, "animations", void 0);
    __decorate([
        Output()
    ], PieGridSeriesComponent.prototype, "select", void 0);
    __decorate([
        Output()
    ], PieGridSeriesComponent.prototype, "activate", void 0);
    __decorate([
        Output()
    ], PieGridSeriesComponent.prototype, "deactivate", void 0);
    PieGridSeriesComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-pie-grid-series]',
            template: "\n    <svg:g class=\"pie-grid-arcs\">\n      <svg:g\n        ngx-charts-pie-arc\n        *ngFor=\"let arc of arcs; trackBy: trackBy\"\n        [attr.class]=\"arc.class\"\n        [startAngle]=\"arc.startAngle\"\n        [endAngle]=\"arc.endAngle\"\n        [innerRadius]=\"innerRadius\"\n        [outerRadius]=\"outerRadius\"\n        [fill]=\"color(arc)\"\n        [value]=\"arc.data.value\"\n        [data]=\"arc.data\"\n        [gradient]=\"false\"\n        [pointerEvents]=\"arc.pointerEvents\"\n        [animate]=\"arc.animate\"\n        (select)=\"onClick($event)\"\n        (activate)=\"activate.emit($event)\"\n        (deactivate)=\"deactivate.emit($event)\"\n      ></svg:g>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], PieGridSeriesComponent);
    return PieGridSeriesComponent;
}());
export { PieGridSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWdyaWQtc2VyaWVzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL3BpZS1jaGFydC9waWUtZ3JpZC1zZXJpZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFVBQVUsRUFDVixTQUFTLEVBQ1QsYUFBYSxFQUNiLHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBNEIvQjtJQWVFLGdDQUFZLE9BQW1CO1FBWnRCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFMUIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFPeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCw0Q0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCx1Q0FBTSxHQUFOO1FBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQVk7YUFDMUIsS0FBSyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQVosQ0FBWSxDQUFDO2FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVkLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCx3Q0FBTyxHQUFQO1FBQUEsaUJBb0JDO1FBbkJDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRyxFQUFFLEtBQUs7WUFDM0MsSUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2pDLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVsQyxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7YUFDcEI7WUFFRCxJQUFNLEtBQUssR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pDLE9BQU87Z0JBQ0wsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSTtnQkFDbkIsS0FBSyxFQUFFLE1BQU0sR0FBRyxLQUFLLEdBQUcsS0FBSztnQkFDN0IsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVTtnQkFDdEMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFRO2dCQUN0QixPQUFPLEVBQUUsS0FBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2xDLGFBQWEsRUFBRSxDQUFDLEtBQUs7YUFDdEIsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHdDQUFPLEdBQVAsVUFBUSxJQUFJO1FBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsd0NBQU8sR0FBUCxVQUFRLEtBQUssRUFBRSxJQUFJO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUVELHNDQUFLLEdBQUwsVUFBTSxHQUFHO1FBQ1AsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRUQsc0NBQUssR0FBTCxVQUFNLEdBQUc7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7O2dCQXBEb0IsVUFBVTs7SUFkdEI7UUFBUixLQUFLLEVBQUU7MERBQVE7SUFDUDtRQUFSLEtBQUssRUFBRTt3REFBTTtJQUNMO1FBQVIsS0FBSyxFQUFFOytEQUFrQjtJQUNqQjtRQUFSLEtBQUssRUFBRTsrREFBa0I7SUFDakI7UUFBUixLQUFLLEVBQUU7OERBQTRCO0lBRTFCO1FBQVQsTUFBTSxFQUFFOzBEQUE2QjtJQUM1QjtRQUFULE1BQU0sRUFBRTs0REFBK0I7SUFDOUI7UUFBVCxNQUFNLEVBQUU7OERBQWlDO0lBVC9CLHNCQUFzQjtRQTFCbEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLCtCQUErQjtZQUN6QyxRQUFRLEVBQUUsZ3NCQXFCVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FDVyxzQkFBc0IsQ0FvRWxDO0lBQUQsNkJBQUM7Q0FBQSxBQXBFRCxJQW9FQztTQXBFWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgcGllIH0gZnJvbSAnZDMtc2hhcGUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtcGllLWdyaWQtc2VyaWVzXScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxzdmc6ZyBjbGFzcz1cInBpZS1ncmlkLWFyY3NcIj5cclxuICAgICAgPHN2ZzpnXHJcbiAgICAgICAgbmd4LWNoYXJ0cy1waWUtYXJjXHJcbiAgICAgICAgKm5nRm9yPVwibGV0IGFyYyBvZiBhcmNzOyB0cmFja0J5OiB0cmFja0J5XCJcclxuICAgICAgICBbYXR0ci5jbGFzc109XCJhcmMuY2xhc3NcIlxyXG4gICAgICAgIFtzdGFydEFuZ2xlXT1cImFyYy5zdGFydEFuZ2xlXCJcclxuICAgICAgICBbZW5kQW5nbGVdPVwiYXJjLmVuZEFuZ2xlXCJcclxuICAgICAgICBbaW5uZXJSYWRpdXNdPVwiaW5uZXJSYWRpdXNcIlxyXG4gICAgICAgIFtvdXRlclJhZGl1c109XCJvdXRlclJhZGl1c1wiXHJcbiAgICAgICAgW2ZpbGxdPVwiY29sb3IoYXJjKVwiXHJcbiAgICAgICAgW3ZhbHVlXT1cImFyYy5kYXRhLnZhbHVlXCJcclxuICAgICAgICBbZGF0YV09XCJhcmMuZGF0YVwiXHJcbiAgICAgICAgW2dyYWRpZW50XT1cImZhbHNlXCJcclxuICAgICAgICBbcG9pbnRlckV2ZW50c109XCJhcmMucG9pbnRlckV2ZW50c1wiXHJcbiAgICAgICAgW2FuaW1hdGVdPVwiYXJjLmFuaW1hdGVcIlxyXG4gICAgICAgIChzZWxlY3QpPVwib25DbGljaygkZXZlbnQpXCJcclxuICAgICAgICAoYWN0aXZhdGUpPVwiYWN0aXZhdGUuZW1pdCgkZXZlbnQpXCJcclxuICAgICAgICAoZGVhY3RpdmF0ZSk9XCJkZWFjdGl2YXRlLmVtaXQoJGV2ZW50KVwiXHJcbiAgICAgID48L3N2ZzpnPlxyXG4gICAgPC9zdmc6Zz5cclxuICBgLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQaWVHcmlkU2VyaWVzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBjb2xvcnM7XHJcbiAgQElucHV0KCkgZGF0YTtcclxuICBASW5wdXQoKSBpbm5lclJhZGl1cyA9IDcwO1xyXG4gIEBJbnB1dCgpIG91dGVyUmFkaXVzID0gODA7XHJcbiAgQElucHV0KCkgYW5pbWF0aW9uczogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBlbGVtZW50OiBIVE1MRWxlbWVudDtcclxuICBsYXlvdXQ6IGFueTtcclxuICBhcmNzOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLmxheW91dCA9IHBpZTxhbnksIGFueT4oKVxyXG4gICAgICAudmFsdWUoZCA9PiBkLmRhdGEudmFsdWUpXHJcbiAgICAgIC5zb3J0KG51bGwpO1xyXG5cclxuICAgIHRoaXMuYXJjcyA9IHRoaXMuZ2V0QXJjcygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0QXJjcygpOiBhbnlbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQodGhpcy5kYXRhKS5tYXAoKGFyYywgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3QgbGFiZWwgPSBhcmMuZGF0YS5kYXRhLm5hbWU7XHJcbiAgICAgIGNvbnN0IG90aGVyID0gYXJjLmRhdGEuZGF0YS5vdGhlcjtcclxuXHJcbiAgICAgIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICAgIGFyYy5zdGFydEFuZ2xlID0gMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmNvbG9ycyhsYWJlbCk7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgZGF0YTogYXJjLmRhdGEuZGF0YSxcclxuICAgICAgICBjbGFzczogJ2FyYyAnICsgJ2FyYycgKyBpbmRleCxcclxuICAgICAgICBmaWxsOiBjb2xvcixcclxuICAgICAgICBzdGFydEFuZ2xlOiBvdGhlciA/IDAgOiBhcmMuc3RhcnRBbmdsZSxcclxuICAgICAgICBlbmRBbmdsZTogYXJjLmVuZEFuZ2xlLFxyXG4gICAgICAgIGFuaW1hdGU6IHRoaXMuYW5pbWF0aW9ucyAmJiAhb3RoZXIsXHJcbiAgICAgICAgcG9pbnRlckV2ZW50czogIW90aGVyXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uQ2xpY2soZGF0YSk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3QuZW1pdCh0aGlzLmRhdGFbMF0uZGF0YSk7XHJcbiAgfVxyXG5cclxuICB0cmFja0J5KGluZGV4LCBpdGVtKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBpdGVtLmRhdGEubmFtZTtcclxuICB9XHJcblxyXG4gIGxhYmVsKGFyYyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYXJjLmRhdGEubmFtZTtcclxuICB9XHJcblxyXG4gIGNvbG9yKGFyYyk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2xvcnModGhpcy5sYWJlbChhcmMpKTtcclxuICB9XHJcbn1cclxuIl19