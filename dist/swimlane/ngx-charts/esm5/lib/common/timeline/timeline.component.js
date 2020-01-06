import { __decorate, __read, __spread, __values } from "tslib";
import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { brushX } from 'd3-brush';
import { scaleLinear, scaleTime, scalePoint } from 'd3-scale';
import { select, event as d3event } from 'd3-selection';
import { id } from '../../utils';
var Timeline = /** @class */ (function () {
    function Timeline(element, cd) {
        this.cd = cd;
        this.height = 50;
        this.select = new EventEmitter();
        this.onDomainChange = new EventEmitter();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    Timeline.prototype.ngOnChanges = function (changes) {
        this.update();
        if (!this.initialized) {
            this.addBrush();
            this.initialized = true;
        }
    };
    Timeline.prototype.update = function () {
        this.dims = this.getDims();
        this.height = this.dims.height;
        var offsetY = this.view[1] - this.height;
        this.xDomain = this.getXDomain();
        this.xScale = this.getXScale();
        if (this.brush) {
            this.updateBrush();
        }
        this.transform = "translate(0 , " + offsetY + ")";
        this.filterId = 'filter' + id().toString();
        this.filter = "url(#" + this.filterId + ")";
        this.cd.markForCheck();
    };
    Timeline.prototype.getXDomain = function () {
        var e_1, _a, e_2, _b;
        var values = [];
        try {
            for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                var results = _d.value;
                try {
                    for (var _e = (e_2 = void 0, __values(results.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var d = _f.value;
                        if (!values.includes(d.name)) {
                            values.push(d.name);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var domain = [];
        if (this.scaleType === 'time') {
            var min = Math.min.apply(Math, __spread(values));
            var max = Math.max.apply(Math, __spread(values));
            domain = [min, max];
        }
        else if (this.scaleType === 'linear') {
            values = values.map(function (v) { return Number(v); });
            var min = Math.min.apply(Math, __spread(values));
            var max = Math.max.apply(Math, __spread(values));
            domain = [min, max];
        }
        else {
            domain = values;
        }
        return domain;
    };
    Timeline.prototype.getXScale = function () {
        var scale;
        if (this.scaleType === 'time') {
            scale = scaleTime()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'linear') {
            scale = scaleLinear()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'ordinal') {
            scale = scalePoint()
                .range([0, this.dims.width])
                .padding(0.1)
                .domain(this.xDomain);
        }
        return scale;
    };
    Timeline.prototype.addBrush = function () {
        var _this = this;
        if (this.brush)
            return;
        var height = this.height;
        var width = this.view[0];
        this.brush = brushX()
            .extent([
            [0, 0],
            [width, height]
        ])
            .on('brush end', function () {
            var selection = d3event.selection || _this.xScale.range();
            var newDomain = selection.map(_this.xScale.invert);
            _this.onDomainChange.emit(newDomain);
            _this.cd.markForCheck();
        });
        select(this.element)
            .select('.brush')
            .call(this.brush);
    };
    Timeline.prototype.updateBrush = function () {
        if (!this.brush)
            return;
        var height = this.height;
        var width = this.view[0];
        this.brush.extent([
            [0, 0],
            [width, height]
        ]);
        select(this.element)
            .select('.brush')
            .call(this.brush);
        // clear hardcoded properties so they can be defined by CSS
        select(this.element)
            .select('.selection')
            .attr('fill', undefined)
            .attr('stroke', undefined)
            .attr('fill-opacity', undefined);
        this.cd.markForCheck();
    };
    Timeline.prototype.getDims = function () {
        var width = this.view[0];
        var dims = {
            width: width,
            height: this.height
        };
        return dims;
    };
    Timeline.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], Timeline.prototype, "view", void 0);
    __decorate([
        Input()
    ], Timeline.prototype, "state", void 0);
    __decorate([
        Input()
    ], Timeline.prototype, "results", void 0);
    __decorate([
        Input()
    ], Timeline.prototype, "scheme", void 0);
    __decorate([
        Input()
    ], Timeline.prototype, "customColors", void 0);
    __decorate([
        Input()
    ], Timeline.prototype, "legend", void 0);
    __decorate([
        Input()
    ], Timeline.prototype, "miniChart", void 0);
    __decorate([
        Input()
    ], Timeline.prototype, "autoScale", void 0);
    __decorate([
        Input()
    ], Timeline.prototype, "scaleType", void 0);
    __decorate([
        Input()
    ], Timeline.prototype, "height", void 0);
    __decorate([
        Output()
    ], Timeline.prototype, "select", void 0);
    __decorate([
        Output()
    ], Timeline.prototype, "onDomainChange", void 0);
    Timeline = __decorate([
        Component({
            selector: 'g[ngx-charts-timeline]',
            template: "\n    <svg:g class=\"timeline\" [attr.transform]=\"transform\">\n      <svg:filter [attr.id]=\"filterId\">\n        <svg:feColorMatrix\n          in=\"SourceGraphic\"\n          type=\"matrix\"\n          values=\"0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\"\n        />\n      </svg:filter>\n      <svg:g class=\"embedded-chart\">\n        <ng-content></ng-content>\n      </svg:g>\n      <svg:rect x=\"0\" [attr.width]=\"view[0]\" y=\"0\" [attr.height]=\"height\" class=\"brush-background\" />\n      <svg:g class=\"brush\"></svg:g>\n    </svg:g>\n  ",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".timeline .brush-background{fill:rgba(0,0,0,.05)}.timeline .brush .selection{fill:rgba(0,0,0,.1);stroke-width:1px;stroke:#888}.timeline .brush .handle{fill-opacity:0}.timeline .embedded-chart{opacity:.6}"]
        })
    ], Timeline);
    return Timeline;
}());
export { Timeline };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL3RpbWVsaW5lL3RpbWVsaW5lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixVQUFVLEVBQ1YsU0FBUyxFQUNULHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsYUFBYSxFQUNiLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssSUFBSSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFeEQsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQXdCakM7SUF5QkUsa0JBQVksT0FBbUIsRUFBVSxFQUFxQjtRQUFyQixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQWZyRCxXQUFNLEdBQVcsRUFBRSxDQUFDO1FBRW5CLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVE5QyxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUszQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDdkMsQ0FBQztJQUVELDhCQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFZCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLFdBQVcs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LElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUzQixJQUFNLElBQUksR0FBRztZQUNYLEtBQUssT0FBQTtZQUNMLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNwQixDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOztnQkEzSW9CLFVBQVU7Z0JBQWMsaUJBQWlCOztJQXhCckQ7UUFBUixLQUFLLEVBQUU7MENBQU07SUFDTDtRQUFSLEtBQUssRUFBRTsyQ0FBTztJQUNOO1FBQVIsS0FBSyxFQUFFOzZDQUFTO0lBQ1I7UUFBUixLQUFLLEVBQUU7NENBQVE7SUFDUDtRQUFSLEtBQUssRUFBRTtrREFBYztJQUNiO1FBQVIsS0FBSyxFQUFFOzRDQUFRO0lBQ1A7UUFBUixLQUFLLEVBQUU7K0NBQVc7SUFDVjtRQUFSLEtBQUssRUFBRTsrQ0FBVztJQUNWO1FBQVIsS0FBSyxFQUFFOytDQUFXO0lBQ1Y7UUFBUixLQUFLLEVBQUU7NENBQXFCO0lBRW5CO1FBQVQsTUFBTSxFQUFFOzRDQUE2QjtJQUM1QjtRQUFULE1BQU0sRUFBRTtvREFBcUM7SUFibkMsUUFBUTtRQXRCcEIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHdCQUF3QjtZQUNsQyxRQUFRLEVBQUUsb2xCQWVUO1lBRUQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O1NBQ2hELENBQUM7T0FDVyxRQUFRLENBcUtwQjtJQUFELGVBQUM7Q0FBQSxBQXJLRCxJQXFLQztTQXJLWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBFbGVtZW50UmVmLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGJydXNoWCB9IGZyb20gJ2QzLWJydXNoJztcclxuaW1wb3J0IHsgc2NhbGVMaW5lYXIsIHNjYWxlVGltZSwgc2NhbGVQb2ludCB9IGZyb20gJ2QzLXNjYWxlJztcclxuaW1wb3J0IHsgc2VsZWN0LCBldmVudCBhcyBkM2V2ZW50IH0gZnJvbSAnZDMtc2VsZWN0aW9uJztcclxuXHJcbmltcG9ydCB7IGlkIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtdGltZWxpbmVdJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHN2ZzpnIGNsYXNzPVwidGltZWxpbmVcIiBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtXCI+XHJcbiAgICAgIDxzdmc6ZmlsdGVyIFthdHRyLmlkXT1cImZpbHRlcklkXCI+XHJcbiAgICAgICAgPHN2ZzpmZUNvbG9yTWF0cml4XHJcbiAgICAgICAgICBpbj1cIlNvdXJjZUdyYXBoaWNcIlxyXG4gICAgICAgICAgdHlwZT1cIm1hdHJpeFwiXHJcbiAgICAgICAgICB2YWx1ZXM9XCIwLjMzMzMgMC4zMzMzIDAuMzMzMyAwIDAgMC4zMzMzIDAuMzMzMyAwLjMzMzMgMCAwIDAuMzMzMyAwLjMzMzMgMC4zMzMzIDAgMCAwIDAgMCAxIDBcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvc3ZnOmZpbHRlcj5cclxuICAgICAgPHN2ZzpnIGNsYXNzPVwiZW1iZWRkZWQtY2hhcnRcIj5cclxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICAgIDwvc3ZnOmc+XHJcbiAgICAgIDxzdmc6cmVjdCB4PVwiMFwiIFthdHRyLndpZHRoXT1cInZpZXdbMF1cIiB5PVwiMFwiIFthdHRyLmhlaWdodF09XCJoZWlnaHRcIiBjbGFzcz1cImJydXNoLWJhY2tncm91bmRcIiAvPlxyXG4gICAgICA8c3ZnOmcgY2xhc3M9XCJicnVzaFwiPjwvc3ZnOmc+XHJcbiAgICA8L3N2ZzpnPlxyXG4gIGAsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdGltZWxpbmUuY29tcG9uZW50LnNjc3MnXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUaW1lbGluZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgdmlldztcclxuICBASW5wdXQoKSBzdGF0ZTtcclxuICBASW5wdXQoKSByZXN1bHRzO1xyXG4gIEBJbnB1dCgpIHNjaGVtZTtcclxuICBASW5wdXQoKSBjdXN0b21Db2xvcnM7XHJcbiAgQElucHV0KCkgbGVnZW5kO1xyXG4gIEBJbnB1dCgpIG1pbmlDaGFydDtcclxuICBASW5wdXQoKSBhdXRvU2NhbGU7XHJcbiAgQElucHV0KCkgc2NhbGVUeXBlO1xyXG4gIEBJbnB1dCgpIGhlaWdodDogbnVtYmVyID0gNTA7XHJcblxyXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIG9uRG9tYWluQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBlbGVtZW50OiBIVE1MRWxlbWVudDtcclxuICBkaW1zOiBhbnk7XHJcbiAgeERvbWFpbjogYW55W107XHJcbiAgeFNjYWxlOiBhbnk7XHJcbiAgYnJ1c2g6IGFueTtcclxuICB0cmFuc2Zvcm06IHN0cmluZztcclxuICBpbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGZpbHRlcklkOiBhbnk7XHJcbiAgZmlsdGVyOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG5cclxuICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xyXG4gICAgICB0aGlzLmFkZEJydXNoKCk7XHJcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5kaW1zID0gdGhpcy5nZXREaW1zKCk7XHJcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMuZGltcy5oZWlnaHQ7XHJcbiAgICBjb25zdCBvZmZzZXRZID0gdGhpcy52aWV3WzFdIC0gdGhpcy5oZWlnaHQ7XHJcblxyXG4gICAgdGhpcy54RG9tYWluID0gdGhpcy5nZXRYRG9tYWluKCk7XHJcbiAgICB0aGlzLnhTY2FsZSA9IHRoaXMuZ2V0WFNjYWxlKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuYnJ1c2gpIHtcclxuICAgICAgdGhpcy51cGRhdGVCcnVzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgwICwgJHtvZmZzZXRZfSlgO1xyXG5cclxuICAgIHRoaXMuZmlsdGVySWQgPSAnZmlsdGVyJyArIGlkKCkudG9TdHJpbmcoKTtcclxuICAgIHRoaXMuZmlsdGVyID0gYHVybCgjJHt0aGlzLmZpbHRlcklkfSlgO1xyXG5cclxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBnZXRYRG9tYWluKCk6IGFueVtdIHtcclxuICAgIGxldCB2YWx1ZXMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IHJlc3VsdHMgb2YgdGhpcy5yZXN1bHRzKSB7XHJcbiAgICAgIGZvciAoY29uc3QgZCBvZiByZXN1bHRzLnNlcmllcykge1xyXG4gICAgICAgIGlmICghdmFsdWVzLmluY2x1ZGVzKGQubmFtZSkpIHtcclxuICAgICAgICAgIHZhbHVlcy5wdXNoKGQubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGRvbWFpbiA9IFtdO1xyXG4gICAgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAndGltZScpIHtcclxuICAgICAgY29uc3QgbWluID0gTWF0aC5taW4oLi4udmFsdWVzKTtcclxuICAgICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoLi4udmFsdWVzKTtcclxuICAgICAgZG9tYWluID0gW21pbiwgbWF4XTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICdsaW5lYXInKSB7XHJcbiAgICAgIHZhbHVlcyA9IHZhbHVlcy5tYXAodiA9PiBOdW1iZXIodikpO1xyXG4gICAgICBjb25zdCBtaW4gPSBNYXRoLm1pbiguLi52YWx1ZXMpO1xyXG4gICAgICBjb25zdCBtYXggPSBNYXRoLm1heCguLi52YWx1ZXMpO1xyXG4gICAgICBkb21haW4gPSBbbWluLCBtYXhdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZG9tYWluID0gdmFsdWVzO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkb21haW47XHJcbiAgfVxyXG5cclxuICBnZXRYU2NhbGUoKSB7XHJcbiAgICBsZXQgc2NhbGU7XHJcblxyXG4gICAgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAndGltZScpIHtcclxuICAgICAgc2NhbGUgPSBzY2FsZVRpbWUoKVxyXG4gICAgICAgIC5yYW5nZShbMCwgdGhpcy5kaW1zLndpZHRoXSlcclxuICAgICAgICAuZG9tYWluKHRoaXMueERvbWFpbik7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAnbGluZWFyJykge1xyXG4gICAgICBzY2FsZSA9IHNjYWxlTGluZWFyKClcclxuICAgICAgICAucmFuZ2UoWzAsIHRoaXMuZGltcy53aWR0aF0pXHJcbiAgICAgICAgLmRvbWFpbih0aGlzLnhEb21haW4pO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ29yZGluYWwnKSB7XHJcbiAgICAgIHNjYWxlID0gc2NhbGVQb2ludCgpXHJcbiAgICAgICAgLnJhbmdlKFswLCB0aGlzLmRpbXMud2lkdGhdKVxyXG4gICAgICAgIC5wYWRkaW5nKDAuMSlcclxuICAgICAgICAuZG9tYWluKHRoaXMueERvbWFpbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNjYWxlO1xyXG4gIH1cclxuXHJcbiAgYWRkQnJ1c2goKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5icnVzaCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuaGVpZ2h0O1xyXG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLnZpZXdbMF07XHJcblxyXG4gICAgdGhpcy5icnVzaCA9IGJydXNoWCgpXHJcbiAgICAgIC5leHRlbnQoW1xyXG4gICAgICAgIFswLCAwXSxcclxuICAgICAgICBbd2lkdGgsIGhlaWdodF1cclxuICAgICAgXSlcclxuICAgICAgLm9uKCdicnVzaCBlbmQnLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gZDNldmVudC5zZWxlY3Rpb24gfHwgdGhpcy54U2NhbGUucmFuZ2UoKTtcclxuICAgICAgICBjb25zdCBuZXdEb21haW4gPSBzZWxlY3Rpb24ubWFwKHRoaXMueFNjYWxlLmludmVydCk7XHJcblxyXG4gICAgICAgIHRoaXMub25Eb21haW5DaGFuZ2UuZW1pdChuZXdEb21haW4pO1xyXG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHNlbGVjdCh0aGlzLmVsZW1lbnQpXHJcbiAgICAgIC5zZWxlY3QoJy5icnVzaCcpXHJcbiAgICAgIC5jYWxsKHRoaXMuYnJ1c2gpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlQnJ1c2goKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuYnJ1c2gpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmhlaWdodDtcclxuICAgIGNvbnN0IHdpZHRoID0gdGhpcy52aWV3WzBdO1xyXG5cclxuICAgIHRoaXMuYnJ1c2guZXh0ZW50KFtcclxuICAgICAgWzAsIDBdLFxyXG4gICAgICBbd2lkdGgsIGhlaWdodF1cclxuICAgIF0pO1xyXG4gICAgc2VsZWN0KHRoaXMuZWxlbWVudClcclxuICAgICAgLnNlbGVjdCgnLmJydXNoJylcclxuICAgICAgLmNhbGwodGhpcy5icnVzaCk7XHJcblxyXG4gICAgLy8gY2xlYXIgaGFyZGNvZGVkIHByb3BlcnRpZXMgc28gdGhleSBjYW4gYmUgZGVmaW5lZCBieSBDU1NcclxuICAgIHNlbGVjdCh0aGlzLmVsZW1lbnQpXHJcbiAgICAgIC5zZWxlY3QoJy5zZWxlY3Rpb24nKVxyXG4gICAgICAuYXR0cignZmlsbCcsIHVuZGVmaW5lZClcclxuICAgICAgLmF0dHIoJ3N0cm9rZScsIHVuZGVmaW5lZClcclxuICAgICAgLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIHVuZGVmaW5lZCk7XHJcblxyXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIGdldERpbXMoKTogYW55IHtcclxuICAgIGNvbnN0IHdpZHRoID0gdGhpcy52aWV3WzBdO1xyXG5cclxuICAgIGNvbnN0IGRpbXMgPSB7XHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBkaW1zO1xyXG4gIH1cclxufVxyXG4iXX0=