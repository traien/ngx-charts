import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { brushX } from 'd3-brush';
import { scaleLinear, scaleTime, scalePoint } from 'd3-scale';
import { select, event as d3event } from 'd3-selection';
import { id } from '../../utils';
let Timeline = class Timeline {
    constructor(element, cd) {
        this.cd = cd;
        this.height = 50;
        this.select = new EventEmitter();
        this.onDomainChange = new EventEmitter();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
        if (!this.initialized) {
            this.addBrush();
            this.initialized = true;
        }
    }
    update() {
        this.dims = this.getDims();
        this.height = this.dims.height;
        const offsetY = this.view[1] - this.height;
        this.xDomain = this.getXDomain();
        this.xScale = this.getXScale();
        if (this.brush) {
            this.updateBrush();
        }
        this.transform = `translate(0 , ${offsetY})`;
        this.filterId = 'filter' + id().toString();
        this.filter = `url(#${this.filterId})`;
        this.cd.markForCheck();
    }
    getXDomain() {
        let values = [];
        for (const results of this.results) {
            for (const d of results.series) {
                if (!values.includes(d.name)) {
                    values.push(d.name);
                }
            }
        }
        let domain = [];
        if (this.scaleType === 'time') {
            const min = Math.min(...values);
            const max = Math.max(...values);
            domain = [min, max];
        }
        else if (this.scaleType === 'linear') {
            values = values.map(v => Number(v));
            const min = Math.min(...values);
            const max = Math.max(...values);
            domain = [min, max];
        }
        else {
            domain = values;
        }
        return domain;
    }
    getXScale() {
        let scale;
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
    }
    addBrush() {
        if (this.brush)
            return;
        const height = this.height;
        const width = this.view[0];
        this.brush = brushX()
            .extent([
            [0, 0],
            [width, height]
        ])
            .on('brush end', () => {
            const selection = d3event.selection || this.xScale.range();
            const newDomain = selection.map(this.xScale.invert);
            this.onDomainChange.emit(newDomain);
            this.cd.markForCheck();
        });
        select(this.element)
            .select('.brush')
            .call(this.brush);
    }
    updateBrush() {
        if (!this.brush)
            return;
        const height = this.height;
        const width = this.view[0];
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
    }
    getDims() {
        const width = this.view[0];
        const dims = {
            width,
            height: this.height
        };
        return dims;
    }
};
Timeline.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
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
        template: `
    <svg:g class="timeline" [attr.transform]="transform">
      <svg:filter [attr.id]="filterId">
        <svg:feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"
        />
      </svg:filter>
      <svg:g class="embedded-chart">
        <ng-content></ng-content>
      </svg:g>
      <svg:rect x="0" [attr.width]="view[0]" y="0" [attr.height]="height" class="brush-background" />
      <svg:g class="brush"></svg:g>
    </svg:g>
  `,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".timeline .brush-background{fill:rgba(0,0,0,.05)}.timeline .brush .selection{fill:rgba(0,0,0,.1);stroke-width:1px;stroke:#888}.timeline .brush .handle{fill-opacity:0}.timeline .embedded-chart{opacity:.6}"]
    })
], Timeline);
export { Timeline };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL3RpbWVsaW5lL3RpbWVsaW5lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixVQUFVLEVBQ1YsU0FBUyxFQUNULHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsYUFBYSxFQUNiLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssSUFBSSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFeEQsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQXdCakMsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUTtJQXlCbkIsWUFBWSxPQUFtQixFQUFVLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBZnJELFdBQU0sR0FBVyxFQUFFLENBQUM7UUFFbkIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUIsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBUTlDLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBSzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUN2QyxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVkLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZ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QixVQUFVO1lBQWMsaUJBQWlCOztBQXhCckQ7SUFBUixLQUFLLEVBQUU7c0NBQU07QUFDTDtJQUFSLEtBQUssRUFBRTt1Q0FBTztBQUNOO0lBQVIsS0FBSyxFQUFFO3lDQUFTO0FBQ1I7SUFBUixLQUFLLEVBQUU7d0NBQVE7QUFDUDtJQUFSLEtBQUssRUFBRTs4Q0FBYztBQUNiO0lBQVIsS0FBSyxFQUFFO3dDQUFRO0FBQ1A7SUFBUixLQUFLLEVBQUU7MkNBQVc7QUFDVjtJQUFSLEtBQUssRUFBRTsyQ0FBVztBQUNWO0lBQVIsS0FBSyxFQUFFOzJDQUFXO0FBQ1Y7SUFBUixLQUFLLEVBQUU7d0NBQXFCO0FBRW5CO0lBQVQsTUFBTSxFQUFFO3dDQUE2QjtBQUM1QjtJQUFULE1BQU0sRUFBRTtnREFBcUM7QUFibkMsUUFBUTtJQXRCcEIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHdCQUF3QjtRQUNsQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7OztHQWVUO1FBRUQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7UUFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O0tBQ2hELENBQUM7R0FDVyxRQUFRLENBcUtwQjtTQXJLWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBFbGVtZW50UmVmLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGJydXNoWCB9IGZyb20gJ2QzLWJydXNoJztcclxuaW1wb3J0IHsgc2NhbGVMaW5lYXIsIHNjYWxlVGltZSwgc2NhbGVQb2ludCB9IGZyb20gJ2QzLXNjYWxlJztcclxuaW1wb3J0IHsgc2VsZWN0LCBldmVudCBhcyBkM2V2ZW50IH0gZnJvbSAnZDMtc2VsZWN0aW9uJztcclxuXHJcbmltcG9ydCB7IGlkIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtdGltZWxpbmVdJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHN2ZzpnIGNsYXNzPVwidGltZWxpbmVcIiBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtXCI+XHJcbiAgICAgIDxzdmc6ZmlsdGVyIFthdHRyLmlkXT1cImZpbHRlcklkXCI+XHJcbiAgICAgICAgPHN2ZzpmZUNvbG9yTWF0cml4XHJcbiAgICAgICAgICBpbj1cIlNvdXJjZUdyYXBoaWNcIlxyXG4gICAgICAgICAgdHlwZT1cIm1hdHJpeFwiXHJcbiAgICAgICAgICB2YWx1ZXM9XCIwLjMzMzMgMC4zMzMzIDAuMzMzMyAwIDAgMC4zMzMzIDAuMzMzMyAwLjMzMzMgMCAwIDAuMzMzMyAwLjMzMzMgMC4zMzMzIDAgMCAwIDAgMCAxIDBcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvc3ZnOmZpbHRlcj5cclxuICAgICAgPHN2ZzpnIGNsYXNzPVwiZW1iZWRkZWQtY2hhcnRcIj5cclxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICAgIDwvc3ZnOmc+XHJcbiAgICAgIDxzdmc6cmVjdCB4PVwiMFwiIFthdHRyLndpZHRoXT1cInZpZXdbMF1cIiB5PVwiMFwiIFthdHRyLmhlaWdodF09XCJoZWlnaHRcIiBjbGFzcz1cImJydXNoLWJhY2tncm91bmRcIiAvPlxyXG4gICAgICA8c3ZnOmcgY2xhc3M9XCJicnVzaFwiPjwvc3ZnOmc+XHJcbiAgICA8L3N2ZzpnPlxyXG4gIGAsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdGltZWxpbmUuY29tcG9uZW50LnNjc3MnXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUaW1lbGluZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgdmlldztcclxuICBASW5wdXQoKSBzdGF0ZTtcclxuICBASW5wdXQoKSByZXN1bHRzO1xyXG4gIEBJbnB1dCgpIHNjaGVtZTtcclxuICBASW5wdXQoKSBjdXN0b21Db2xvcnM7XHJcbiAgQElucHV0KCkgbGVnZW5kO1xyXG4gIEBJbnB1dCgpIG1pbmlDaGFydDtcclxuICBASW5wdXQoKSBhdXRvU2NhbGU7XHJcbiAgQElucHV0KCkgc2NhbGVUeXBlO1xyXG4gIEBJbnB1dCgpIGhlaWdodDogbnVtYmVyID0gNTA7XHJcblxyXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIG9uRG9tYWluQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBlbGVtZW50OiBIVE1MRWxlbWVudDtcclxuICBkaW1zOiBhbnk7XHJcbiAgeERvbWFpbjogYW55W107XHJcbiAgeFNjYWxlOiBhbnk7XHJcbiAgYnJ1c2g6IGFueTtcclxuICB0cmFuc2Zvcm06IHN0cmluZztcclxuICBpbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGZpbHRlcklkOiBhbnk7XHJcbiAgZmlsdGVyOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG5cclxuICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xyXG4gICAgICB0aGlzLmFkZEJydXNoKCk7XHJcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5kaW1zID0gdGhpcy5nZXREaW1zKCk7XHJcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMuZGltcy5oZWlnaHQ7XHJcbiAgICBjb25zdCBvZmZzZXRZID0gdGhpcy52aWV3WzFdIC0gdGhpcy5oZWlnaHQ7XHJcblxyXG4gICAgdGhpcy54RG9tYWluID0gdGhpcy5nZXRYRG9tYWluKCk7XHJcbiAgICB0aGlzLnhTY2FsZSA9IHRoaXMuZ2V0WFNjYWxlKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuYnJ1c2gpIHtcclxuICAgICAgdGhpcy51cGRhdGVCcnVzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgwICwgJHtvZmZzZXRZfSlgO1xyXG5cclxuICAgIHRoaXMuZmlsdGVySWQgPSAnZmlsdGVyJyArIGlkKCkudG9TdHJpbmcoKTtcclxuICAgIHRoaXMuZmlsdGVyID0gYHVybCgjJHt0aGlzLmZpbHRlcklkfSlgO1xyXG5cclxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBnZXRYRG9tYWluKCk6IGFueVtdIHtcclxuICAgIGxldCB2YWx1ZXMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IHJlc3VsdHMgb2YgdGhpcy5yZXN1bHRzKSB7XHJcbiAgICAgIGZvciAoY29uc3QgZCBvZiByZXN1bHRzLnNlcmllcykge1xyXG4gICAgICAgIGlmICghdmFsdWVzLmluY2x1ZGVzKGQubmFtZSkpIHtcclxuICAgICAgICAgIHZhbHVlcy5wdXNoKGQubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGRvbWFpbiA9IFtdO1xyXG4gICAgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAndGltZScpIHtcclxuICAgICAgY29uc3QgbWluID0gTWF0aC5taW4oLi4udmFsdWVzKTtcclxuICAgICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoLi4udmFsdWVzKTtcclxuICAgICAgZG9tYWluID0gW21pbiwgbWF4XTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICdsaW5lYXInKSB7XHJcbiAgICAgIHZhbHVlcyA9IHZhbHVlcy5tYXAodiA9PiBOdW1iZXIodikpO1xyXG4gICAgICBjb25zdCBtaW4gPSBNYXRoLm1pbiguLi52YWx1ZXMpO1xyXG4gICAgICBjb25zdCBtYXggPSBNYXRoLm1heCguLi52YWx1ZXMpO1xyXG4gICAgICBkb21haW4gPSBbbWluLCBtYXhdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZG9tYWluID0gdmFsdWVzO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkb21haW47XHJcbiAgfVxyXG5cclxuICBnZXRYU2NhbGUoKSB7XHJcbiAgICBsZXQgc2NhbGU7XHJcblxyXG4gICAgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAndGltZScpIHtcclxuICAgICAgc2NhbGUgPSBzY2FsZVRpbWUoKVxyXG4gICAgICAgIC5yYW5nZShbMCwgdGhpcy5kaW1zLndpZHRoXSlcclxuICAgICAgICAuZG9tYWluKHRoaXMueERvbWFpbik7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGVUeXBlID09PSAnbGluZWFyJykge1xyXG4gICAgICBzY2FsZSA9IHNjYWxlTGluZWFyKClcclxuICAgICAgICAucmFuZ2UoWzAsIHRoaXMuZGltcy53aWR0aF0pXHJcbiAgICAgICAgLmRvbWFpbih0aGlzLnhEb21haW4pO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ29yZGluYWwnKSB7XHJcbiAgICAgIHNjYWxlID0gc2NhbGVQb2ludCgpXHJcbiAgICAgICAgLnJhbmdlKFswLCB0aGlzLmRpbXMud2lkdGhdKVxyXG4gICAgICAgIC5wYWRkaW5nKDAuMSlcclxuICAgICAgICAuZG9tYWluKHRoaXMueERvbWFpbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNjYWxlO1xyXG4gIH1cclxuXHJcbiAgYWRkQnJ1c2goKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5icnVzaCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuaGVpZ2h0O1xyXG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLnZpZXdbMF07XHJcblxyXG4gICAgdGhpcy5icnVzaCA9IGJydXNoWCgpXHJcbiAgICAgIC5leHRlbnQoW1xyXG4gICAgICAgIFswLCAwXSxcclxuICAgICAgICBbd2lkdGgsIGhlaWdodF1cclxuICAgICAgXSlcclxuICAgICAgLm9uKCdicnVzaCBlbmQnLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gZDNldmVudC5zZWxlY3Rpb24gfHwgdGhpcy54U2NhbGUucmFuZ2UoKTtcclxuICAgICAgICBjb25zdCBuZXdEb21haW4gPSBzZWxlY3Rpb24ubWFwKHRoaXMueFNjYWxlLmludmVydCk7XHJcblxyXG4gICAgICAgIHRoaXMub25Eb21haW5DaGFuZ2UuZW1pdChuZXdEb21haW4pO1xyXG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHNlbGVjdCh0aGlzLmVsZW1lbnQpXHJcbiAgICAgIC5zZWxlY3QoJy5icnVzaCcpXHJcbiAgICAgIC5jYWxsKHRoaXMuYnJ1c2gpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlQnJ1c2goKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuYnJ1c2gpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmhlaWdodDtcclxuICAgIGNvbnN0IHdpZHRoID0gdGhpcy52aWV3WzBdO1xyXG5cclxuICAgIHRoaXMuYnJ1c2guZXh0ZW50KFtcclxuICAgICAgWzAsIDBdLFxyXG4gICAgICBbd2lkdGgsIGhlaWdodF1cclxuICAgIF0pO1xyXG4gICAgc2VsZWN0KHRoaXMuZWxlbWVudClcclxuICAgICAgLnNlbGVjdCgnLmJydXNoJylcclxuICAgICAgLmNhbGwodGhpcy5icnVzaCk7XHJcblxyXG4gICAgLy8gY2xlYXIgaGFyZGNvZGVkIHByb3BlcnRpZXMgc28gdGhleSBjYW4gYmUgZGVmaW5lZCBieSBDU1NcclxuICAgIHNlbGVjdCh0aGlzLmVsZW1lbnQpXHJcbiAgICAgIC5zZWxlY3QoJy5zZWxlY3Rpb24nKVxyXG4gICAgICAuYXR0cignZmlsbCcsIHVuZGVmaW5lZClcclxuICAgICAgLmF0dHIoJ3N0cm9rZScsIHVuZGVmaW5lZClcclxuICAgICAgLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIHVuZGVmaW5lZCk7XHJcblxyXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIGdldERpbXMoKTogYW55IHtcclxuICAgIGNvbnN0IHdpZHRoID0gdGhpcy52aWV3WzBdO1xyXG5cclxuICAgIGNvbnN0IGRpbXMgPSB7XHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBkaW1zO1xyXG4gIH1cclxufVxyXG4iXX0=