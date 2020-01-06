import { __decorate, __values } from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { createMouseEvent } from '../events';
var TooltipArea = /** @class */ (function () {
    function TooltipArea() {
        this.anchorOpacity = 0;
        this.anchorPos = -1;
        this.anchorValues = [];
        this.showPercentage = false;
        this.tooltipDisabled = false;
        this.hover = new EventEmitter();
    }
    TooltipArea.prototype.getValues = function (xVal) {
        var e_1, _a;
        var results = [];
        try {
            for (var _b = __values(this.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                var group = _c.value;
                var item = group.series.find(function (d) { return d.name.toString() === xVal.toString(); });
                var groupName = group.name;
                if (groupName instanceof Date) {
                    groupName = groupName.toLocaleDateString();
                }
                if (item) {
                    var label = item.name;
                    var val = item.value;
                    if (this.showPercentage) {
                        val = (item.d1 - item.d0).toFixed(2) + '%';
                    }
                    var color = void 0;
                    if (this.colors.scaleType === 'linear') {
                        var v = val;
                        if (item.d1) {
                            v = item.d1;
                        }
                        color = this.colors.getColor(v);
                    }
                    else {
                        color = this.colors.getColor(group.name);
                    }
                    var data = Object.assign({}, item, {
                        value: val,
                        name: label,
                        series: groupName,
                        min: item.min,
                        max: item.max,
                        color: color
                    });
                    results.push(data);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return results;
    };
    TooltipArea.prototype.mouseMove = function (event) {
        var xPos = event.pageX - event.target.getBoundingClientRect().left;
        var closestIndex = this.findClosestPointIndex(xPos);
        var closestPoint = this.xSet[closestIndex];
        this.anchorPos = this.xScale(closestPoint);
        this.anchorPos = Math.max(0, this.anchorPos);
        this.anchorPos = Math.min(this.dims.width, this.anchorPos);
        this.anchorValues = this.getValues(closestPoint);
        if (this.anchorPos !== this.lastAnchorPos) {
            var ev = createMouseEvent('mouseleave');
            this.tooltipAnchor.nativeElement.dispatchEvent(ev);
            this.anchorOpacity = 0.7;
            this.hover.emit({
                value: closestPoint
            });
            this.showTooltip();
            this.lastAnchorPos = this.anchorPos;
        }
    };
    TooltipArea.prototype.findClosestPointIndex = function (xPos) {
        var minIndex = 0;
        var maxIndex = this.xSet.length - 1;
        var minDiff = Number.MAX_VALUE;
        var closestIndex = 0;
        while (minIndex <= maxIndex) {
            var currentIndex = ((minIndex + maxIndex) / 2) | 0;
            var currentElement = this.xScale(this.xSet[currentIndex]);
            var curDiff = Math.abs(currentElement - xPos);
            if (curDiff < minDiff) {
                minDiff = curDiff;
                closestIndex = currentIndex;
            }
            if (currentElement < xPos) {
                minIndex = currentIndex + 1;
            }
            else if (currentElement > xPos) {
                maxIndex = currentIndex - 1;
            }
            else {
                minDiff = 0;
                closestIndex = currentIndex;
                break;
            }
        }
        return closestIndex;
    };
    TooltipArea.prototype.showTooltip = function () {
        var event = createMouseEvent('mouseenter');
        this.tooltipAnchor.nativeElement.dispatchEvent(event);
    };
    TooltipArea.prototype.hideTooltip = function () {
        var event = createMouseEvent('mouseleave');
        this.tooltipAnchor.nativeElement.dispatchEvent(event);
        this.anchorOpacity = 0;
        this.lastAnchorPos = -1;
    };
    TooltipArea.prototype.getToolTipText = function (tooltipItem) {
        var result = '';
        if (tooltipItem.series !== undefined) {
            result += tooltipItem.series;
        }
        else {
            result += '???';
        }
        result += ': ';
        if (tooltipItem.value !== undefined) {
            result += tooltipItem.value.toLocaleString();
        }
        if (tooltipItem.min !== undefined || tooltipItem.max !== undefined) {
            result += ' (';
            if (tooltipItem.min !== undefined) {
                if (tooltipItem.max === undefined) {
                    result += '≥';
                }
                result += tooltipItem.min.toLocaleString();
                if (tooltipItem.max !== undefined) {
                    result += ' - ';
                }
            }
            else if (tooltipItem.max !== undefined) {
                result += '≤';
            }
            if (tooltipItem.max !== undefined) {
                result += tooltipItem.max.toLocaleString();
            }
            result += ')';
        }
        return result;
    };
    __decorate([
        Input()
    ], TooltipArea.prototype, "dims", void 0);
    __decorate([
        Input()
    ], TooltipArea.prototype, "xSet", void 0);
    __decorate([
        Input()
    ], TooltipArea.prototype, "xScale", void 0);
    __decorate([
        Input()
    ], TooltipArea.prototype, "yScale", void 0);
    __decorate([
        Input()
    ], TooltipArea.prototype, "results", void 0);
    __decorate([
        Input()
    ], TooltipArea.prototype, "colors", void 0);
    __decorate([
        Input()
    ], TooltipArea.prototype, "showPercentage", void 0);
    __decorate([
        Input()
    ], TooltipArea.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input()
    ], TooltipArea.prototype, "tooltipTemplate", void 0);
    __decorate([
        Output()
    ], TooltipArea.prototype, "hover", void 0);
    __decorate([
        ViewChild('tooltipAnchor', { static: false })
    ], TooltipArea.prototype, "tooltipAnchor", void 0);
    TooltipArea = __decorate([
        Component({
            selector: 'g[ngx-charts-tooltip-area]',
            template: "\n    <svg:g>\n      <svg:rect\n        class=\"tooltip-area\"\n        [attr.x]=\"0\"\n        y=\"0\"\n        [attr.width]=\"dims.width\"\n        [attr.height]=\"dims.height\"\n        style=\"opacity: 0; cursor: 'auto';\"\n        (mousemove)=\"mouseMove($event)\"\n        (mouseleave)=\"hideTooltip()\"\n      />\n      <ng-template #defaultTooltipTemplate let-model=\"model\">\n        <xhtml:div class=\"area-tooltip-container\">\n          <xhtml:div *ngFor=\"let tooltipItem of model\" class=\"tooltip-item\">\n            <xhtml:span class=\"tooltip-item-color\" [style.background-color]=\"tooltipItem.color\"></xhtml:span>\n            {{ getToolTipText(tooltipItem) }}\n          </xhtml:div>\n        </xhtml:div>\n      </ng-template>\n      <svg:rect\n        #tooltipAnchor\n        [@animationState]=\"anchorOpacity !== 0 ? 'active' : 'inactive'\"\n        class=\"tooltip-anchor\"\n        [attr.x]=\"anchorPos\"\n        y=\"0\"\n        [attr.width]=\"1\"\n        [attr.height]=\"dims.height\"\n        [style.opacity]=\"anchorOpacity\"\n        [style.pointer-events]=\"'none'\"\n        ngx-tooltip\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipPlacement]=\"'right'\"\n        [tooltipType]=\"'tooltip'\"\n        [tooltipSpacing]=\"15\"\n        [tooltipTemplate]=\"tooltipTemplate ? tooltipTemplate : defaultTooltipTemplate\"\n        [tooltipContext]=\"anchorValues\"\n        [tooltipImmediateExit]=\"true\"\n      />\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition('inactive => active', [
                        style({
                            opacity: 0
                        }),
                        animate(250, style({ opacity: 0.7 }))
                    ]),
                    transition('active => inactive', [
                        style({
                            opacity: 0.7
                        }),
                        animate(250, style({ opacity: 0 }))
                    ])
                ])
            ]
        })
    ], TooltipArea);
    return TooltipArea;
}());
export { TooltipArea };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC1hcmVhLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi90b29sdGlwLWFyZWEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBZSxNQUFNLGVBQWUsQ0FBQztBQUN4SCxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBK0Q3QztJQUFBO1FBQ0Usa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFDMUIsY0FBUyxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLGlCQUFZLEdBQVUsRUFBRSxDQUFDO1FBU2hCLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBQ2hDLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBR2hDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBZ0p2QyxDQUFDO0lBNUlDLCtCQUFTLEdBQVQsVUFBVSxJQUFJOztRQUNaLElBQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQzs7WUFFbkIsS0FBb0IsSUFBQSxLQUFBLFNBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQSxnQkFBQSw0QkFBRTtnQkFBN0IsSUFBTSxLQUFLLFdBQUE7Z0JBQ2QsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBckMsQ0FBcUMsQ0FBQyxDQUFDO2dCQUMzRSxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFD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QUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7cUJBQ3RDLENBQUM7b0JBQ0YsVUFBVSxDQUFDLG9CQUFvQixFQUFFO3dCQUMvQixLQUFLLENBQUM7NEJBQ0osT0FBTyxFQUFFLEdBQUc7eUJBQ2IsQ0FBQzt3QkFDRixPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUNwQyxDQUFDO2lCQUNILENBQUM7YUFDSDtTQUNGLENBQUM7T0FDVyxXQUFXLENBZ0t2QjtJQUFELGtCQUFDO0NBQUEsQUFoS0QsSUFnS0M7U0FoS1ksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBWaWV3Q2hpbGQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyB0cmlnZ2VyLCBzdHlsZSwgYW5pbWF0ZSwgdHJhbnNpdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBjcmVhdGVNb3VzZUV2ZW50IH0gZnJvbSAnLi4vZXZlbnRzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLXRvb2x0aXAtYXJlYV0nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8c3ZnOmc+XHJcbiAgICAgIDxzdmc6cmVjdFxyXG4gICAgICAgIGNsYXNzPVwidG9vbHRpcC1hcmVhXCJcclxuICAgICAgICBbYXR0ci54XT1cIjBcIlxyXG4gICAgICAgIHk9XCIwXCJcclxuICAgICAgICBbYXR0ci53aWR0aF09XCJkaW1zLndpZHRoXCJcclxuICAgICAgICBbYXR0ci5oZWlnaHRdPVwiZGltcy5oZWlnaHRcIlxyXG4gICAgICAgIHN0eWxlPVwib3BhY2l0eTogMDsgY3Vyc29yOiAnYXV0byc7XCJcclxuICAgICAgICAobW91c2Vtb3ZlKT1cIm1vdXNlTW92ZSgkZXZlbnQpXCJcclxuICAgICAgICAobW91c2VsZWF2ZSk9XCJoaWRlVG9vbHRpcCgpXCJcclxuICAgICAgLz5cclxuICAgICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0VG9vbHRpcFRlbXBsYXRlIGxldC1tb2RlbD1cIm1vZGVsXCI+XHJcbiAgICAgICAgPHhodG1sOmRpdiBjbGFzcz1cImFyZWEtdG9vbHRpcC1jb250YWluZXJcIj5cclxuICAgICAgICAgIDx4aHRtbDpkaXYgKm5nRm9yPVwibGV0IHRvb2x0aXBJdGVtIG9mIG1vZGVsXCIgY2xhc3M9XCJ0b29sdGlwLWl0ZW1cIj5cclxuICAgICAgICAgICAgPHhodG1sOnNwYW4gY2xhc3M9XCJ0b29sdGlwLWl0ZW0tY29sb3JcIiBbc3R5bGUuYmFja2dyb3VuZC1jb2xvcl09XCJ0b29sdGlwSXRlbS5jb2xvclwiPjwveGh0bWw6c3Bhbj5cclxuICAgICAgICAgICAge3sgZ2V0VG9vbFRpcFRleHQodG9vbHRpcEl0ZW0pIH19XHJcbiAgICAgICAgICA8L3hodG1sOmRpdj5cclxuICAgICAgICA8L3hodG1sOmRpdj5cclxuICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgPHN2ZzpyZWN0XHJcbiAgICAgICAgI3Rvb2x0aXBBbmNob3JcclxuICAgICAgICBbQGFuaW1hdGlvblN0YXRlXT1cImFuY2hvck9wYWNpdHkgIT09IDAgPyAnYWN0aXZlJyA6ICdpbmFjdGl2ZSdcIlxyXG4gICAgICAgIGNsYXNzPVwidG9vbHRpcC1hbmNob3JcIlxyXG4gICAgICAgIFthdHRyLnhdPVwiYW5jaG9yUG9zXCJcclxuICAgICAgICB5PVwiMFwiXHJcbiAgICAgICAgW2F0dHIud2lkdGhdPVwiMVwiXHJcbiAgICAgICAgW2F0dHIuaGVpZ2h0XT1cImRpbXMuaGVpZ2h0XCJcclxuICAgICAgICBbc3R5bGUub3BhY2l0eV09XCJhbmNob3JPcGFjaXR5XCJcclxuICAgICAgICBbc3R5bGUucG9pbnRlci1ldmVudHNdPVwiJ25vbmUnXCJcclxuICAgICAgICBuZ3gtdG9vbHRpcFxyXG4gICAgICAgIFt0b29sdGlwRGlzYWJsZWRdPVwidG9vbHRpcERpc2FibGVkXCJcclxuICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCIncmlnaHQnXCJcclxuICAgICAgICBbdG9vbHRpcFR5cGVdPVwiJ3Rvb2x0aXAnXCJcclxuICAgICAgICBbdG9vbHRpcFNwYWNpbmddPVwiMTVcIlxyXG4gICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlID8gdG9vbHRpcFRlbXBsYXRlIDogZGVmYXVsdFRvb2x0aXBUZW1wbGF0ZVwiXHJcbiAgICAgICAgW3Rvb2x0aXBDb250ZXh0XT1cImFuY2hvclZhbHVlc1wiXHJcbiAgICAgICAgW3Rvb2x0aXBJbW1lZGlhdGVFeGl0XT1cInRydWVcIlxyXG4gICAgICAvPlxyXG4gICAgPC9zdmc6Zz5cclxuICBgLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIGFuaW1hdGlvbnM6IFtcclxuICAgIHRyaWdnZXIoJ2FuaW1hdGlvblN0YXRlJywgW1xyXG4gICAgICB0cmFuc2l0aW9uKCdpbmFjdGl2ZSA9PiBhY3RpdmUnLCBbXHJcbiAgICAgICAgc3R5bGUoe1xyXG4gICAgICAgICAgb3BhY2l0eTogMFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGFuaW1hdGUoMjUwLCBzdHlsZSh7IG9wYWNpdHk6IDAuNyB9KSlcclxuICAgICAgXSksXHJcbiAgICAgIHRyYW5zaXRpb24oJ2FjdGl2ZSA9PiBpbmFjdGl2ZScsIFtcclxuICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICBvcGFjaXR5OiAwLjdcclxuICAgICAgICB9KSxcclxuICAgICAgICBhbmltYXRlKDI1MCwgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKVxyXG4gICAgICBdKVxyXG4gICAgXSlcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUb29sdGlwQXJlYSB7XHJcbiAgYW5jaG9yT3BhY2l0eTogbnVtYmVyID0gMDtcclxuICBhbmNob3JQb3M6IG51bWJlciA9IC0xO1xyXG4gIGFuY2hvclZhbHVlczogYW55W10gPSBbXTtcclxuICBsYXN0QW5jaG9yUG9zOiBudW1iZXI7XHJcblxyXG4gIEBJbnB1dCgpIGRpbXM7XHJcbiAgQElucHV0KCkgeFNldDtcclxuICBASW5wdXQoKSB4U2NhbGU7XHJcbiAgQElucHV0KCkgeVNjYWxlO1xyXG4gIEBJbnB1dCgpIHJlc3VsdHM7XHJcbiAgQElucHV0KCkgY29sb3JzO1xyXG4gIEBJbnB1dCgpIHNob3dQZXJjZW50YWdlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgdG9vbHRpcERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBAT3V0cHV0KCkgaG92ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ3Rvb2x0aXBBbmNob3InLCB7IHN0YXRpYzogZmFsc2UgfSkgdG9vbHRpcEFuY2hvcjtcclxuXHJcbiAgZ2V0VmFsdWVzKHhWYWwpOiBhbnlbXSB7XHJcbiAgICBjb25zdCByZXN1bHRzID0gW107XHJcblxyXG4gICAgZm9yIChjb25zdCBncm91cCBvZiB0aGlzLnJlc3VsdHMpIHtcclxuICAgICAgY29uc3QgaXRlbSA9IGdyb3VwLnNlcmllcy5maW5kKGQgPT4gZC5uYW1lLnRvU3RyaW5nKCkgPT09IHhWYWwudG9TdHJpbmcoKSk7XHJcbiAgICAgIGxldCBncm91cE5hbWUgPSBncm91cC5uYW1lO1xyXG4gICAgICBpZiAoZ3JvdXBOYW1lIGluc3RhbmNlb2YgRGF0ZSkge1xyXG4gICAgICAgIGdyb3VwTmFtZSA9IGdyb3VwTmFtZS50b0xvY2FsZURhdGVTdHJpbmcoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICBjb25zdCBsYWJlbCA9IGl0ZW0ubmFtZTtcclxuICAgICAgICBsZXQgdmFsID0gaXRlbS52YWx1ZTtcclxuICAgICAgICBpZiAodGhpcy5zaG93UGVyY2VudGFnZSkge1xyXG4gICAgICAgICAgdmFsID0gKGl0ZW0uZDEgLSBpdGVtLmQwKS50b0ZpeGVkKDIpICsgJyUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY29sb3I7XHJcbiAgICAgICAgaWYgKHRoaXMuY29sb3JzLnNjYWxlVHlwZSA9PT0gJ2xpbmVhcicpIHtcclxuICAgICAgICAgIGxldCB2ID0gdmFsO1xyXG4gICAgICAgICAgaWYgKGl0ZW0uZDEpIHtcclxuICAgICAgICAgICAgdiA9IGl0ZW0uZDE7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb2xvciA9IHRoaXMuY29sb3JzLmdldENvbG9yKHYpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb2xvciA9IHRoaXMuY29sb3JzLmdldENvbG9yKGdyb3VwLm5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0sIHtcclxuICAgICAgICAgIHZhbHVlOiB2YWwsXHJcbiAgICAgICAgICBuYW1lOiBsYWJlbCxcclxuICAgICAgICAgIHNlcmllczogZ3JvdXBOYW1lLFxyXG4gICAgICAgICAgbWluOiBpdGVtLm1pbixcclxuICAgICAgICAgIG1heDogaXRlbS5tYXgsXHJcbiAgICAgICAgICBjb2xvclxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXN1bHRzLnB1c2goZGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0cztcclxuICB9XHJcblxyXG4gIG1vdXNlTW92ZShldmVudCkge1xyXG4gICAgY29uc3QgeFBvcyA9IGV2ZW50LnBhZ2VYIC0gZXZlbnQudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XHJcblxyXG4gICAgY29uc3QgY2xvc2VzdEluZGV4ID0gdGhpcy5maW5kQ2xvc2VzdFBvaW50SW5kZXgoeFBvcyk7XHJcbiAgICBjb25zdCBjbG9zZXN0UG9pbnQgPSB0aGlzLnhTZXRbY2xvc2VzdEluZGV4XTtcclxuICAgIHRoaXMuYW5jaG9yUG9zID0gdGhpcy54U2NhbGUoY2xvc2VzdFBvaW50KTtcclxuICAgIHRoaXMuYW5jaG9yUG9zID0gTWF0aC5tYXgoMCwgdGhpcy5hbmNob3JQb3MpO1xyXG4gICAgdGhpcy5hbmNob3JQb3MgPSBNYXRoLm1pbih0aGlzLmRpbXMud2lkdGgsIHRoaXMuYW5jaG9yUG9zKTtcclxuXHJcbiAgICB0aGlzLmFuY2hvclZhbHVlcyA9IHRoaXMuZ2V0VmFsdWVzKGNsb3Nlc3RQb2ludCk7XHJcbiAgICBpZiAodGhpcy5hbmNob3JQb3MgIT09IHRoaXMubGFzdEFuY2hvclBvcykge1xyXG4gICAgICBjb25zdCBldiA9IGNyZWF0ZU1vdXNlRXZlbnQoJ21vdXNlbGVhdmUnKTtcclxuICAgICAgdGhpcy50b29sdGlwQW5jaG9yLm5hdGl2ZUVsZW1lbnQuZGlzcGF0Y2hFdmVudChldik7XHJcbiAgICAgIHRoaXMuYW5jaG9yT3BhY2l0eSA9IDAuNztcclxuICAgICAgdGhpcy5ob3Zlci5lbWl0KHtcclxuICAgICAgICB2YWx1ZTogY2xvc2VzdFBvaW50XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnNob3dUb29sdGlwKCk7XHJcblxyXG4gICAgICB0aGlzLmxhc3RBbmNob3JQb3MgPSB0aGlzLmFuY2hvclBvcztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZpbmRDbG9zZXN0UG9pbnRJbmRleCh4UG9zKSB7XHJcbiAgICBsZXQgbWluSW5kZXggPSAwO1xyXG4gICAgbGV0IG1heEluZGV4ID0gdGhpcy54U2V0Lmxlbmd0aCAtIDE7XHJcbiAgICBsZXQgbWluRGlmZiA9IE51bWJlci5NQVhfVkFMVUU7XHJcbiAgICBsZXQgY2xvc2VzdEluZGV4ID0gMDtcclxuXHJcbiAgICB3aGlsZSAobWluSW5kZXggPD0gbWF4SW5kZXgpIHtcclxuICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gKChtaW5JbmRleCArIG1heEluZGV4KSAvIDIpIHwgMDtcclxuICAgICAgY29uc3QgY3VycmVudEVsZW1lbnQgPSB0aGlzLnhTY2FsZSh0aGlzLnhTZXRbY3VycmVudEluZGV4XSk7XHJcblxyXG4gICAgICBjb25zdCBjdXJEaWZmID0gTWF0aC5hYnMoY3VycmVudEVsZW1lbnQgLSB4UG9zKTtcclxuXHJcbiAgICAgIGlmIChjdXJEaWZmIDwgbWluRGlmZikge1xyXG4gICAgICAgIG1pbkRpZmYgPSBjdXJEaWZmO1xyXG4gICAgICAgIGNsb3Nlc3RJbmRleCA9IGN1cnJlbnRJbmRleDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGN1cnJlbnRFbGVtZW50IDwgeFBvcykge1xyXG4gICAgICAgIG1pbkluZGV4ID0gY3VycmVudEluZGV4ICsgMTtcclxuICAgICAgfSBlbHNlIGlmIChjdXJyZW50RWxlbWVudCA+IHhQb3MpIHtcclxuICAgICAgICBtYXhJbmRleCA9IGN1cnJlbnRJbmRleCAtIDE7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbWluRGlmZiA9IDA7XHJcbiAgICAgICAgY2xvc2VzdEluZGV4ID0gY3VycmVudEluZGV4O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNsb3Nlc3RJbmRleDtcclxuICB9XHJcblxyXG4gIHNob3dUb29sdGlwKCk6IHZvaWQge1xyXG4gICAgY29uc3QgZXZlbnQgPSBjcmVhdGVNb3VzZUV2ZW50KCdtb3VzZWVudGVyJyk7XHJcbiAgICB0aGlzLnRvb2x0aXBBbmNob3IubmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIGhpZGVUb29sdGlwKCk6IHZvaWQge1xyXG4gICAgY29uc3QgZXZlbnQgPSBjcmVhdGVNb3VzZUV2ZW50KCdtb3VzZWxlYXZlJyk7XHJcbiAgICB0aGlzLnRvb2x0aXBBbmNob3IubmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgIHRoaXMuYW5jaG9yT3BhY2l0eSA9IDA7XHJcbiAgICB0aGlzLmxhc3RBbmNob3JQb3MgPSAtMTtcclxuICB9XHJcblxyXG4gIGdldFRvb2xUaXBUZXh0KHRvb2x0aXBJdGVtOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgbGV0IHJlc3VsdDogc3RyaW5nID0gJyc7XHJcbiAgICBpZiAodG9vbHRpcEl0ZW0uc2VyaWVzICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmVzdWx0ICs9IHRvb2x0aXBJdGVtLnNlcmllcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlc3VsdCArPSAnPz8/JztcclxuICAgIH1cclxuICAgIHJlc3VsdCArPSAnOiAnO1xyXG4gICAgaWYgKHRvb2x0aXBJdGVtLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmVzdWx0ICs9IHRvb2x0aXBJdGVtLnZhbHVlLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodG9vbHRpcEl0ZW0ubWluICE9PSB1bmRlZmluZWQgfHwgdG9vbHRpcEl0ZW0ubWF4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmVzdWx0ICs9ICcgKCc7XHJcbiAgICAgIGlmICh0b29sdGlwSXRlbS5taW4gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmICh0b29sdGlwSXRlbS5tYXggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgcmVzdWx0ICs9ICfiiaUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHQgKz0gdG9vbHRpcEl0ZW0ubWluLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICAgICAgaWYgKHRvb2x0aXBJdGVtLm1heCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICByZXN1bHQgKz0gJyAtICc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRvb2x0aXBJdGVtLm1heCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmVzdWx0ICs9ICfiiaQnO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0b29sdGlwSXRlbS5tYXggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJlc3VsdCArPSB0b29sdGlwSXRlbS5tYXgudG9Mb2NhbGVTdHJpbmcoKTtcclxuICAgICAgfVxyXG4gICAgICByZXN1bHQgKz0gJyknO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn1cclxuIl19