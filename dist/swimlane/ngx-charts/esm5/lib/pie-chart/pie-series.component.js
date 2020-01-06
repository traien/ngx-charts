import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { max } from 'd3-array';
import { arc, pie } from 'd3-shape';
import { formatLabel, escapeLabel } from '../common/label.helper';
var PieSeriesComponent = /** @class */ (function () {
    function PieSeriesComponent() {
        this.series = [];
        this.innerRadius = 60;
        this.outerRadius = 80;
        this.trimLabels = true;
        this.maxLabelLength = 10;
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.dblclick = new EventEmitter();
    }
    PieSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PieSeriesComponent.prototype.update = function () {
        var pieGenerator = pie()
            .value(function (d) { return d.value; })
            .sort(null);
        var arcData = pieGenerator(this.series);
        this.max = max(arcData, function (d) {
            return d.value;
        });
        this.data = this.calculateLabelPositions(arcData);
        this.tooltipText = this.tooltipText || this.defaultTooltipText;
    };
    PieSeriesComponent.prototype.midAngle = function (d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    };
    PieSeriesComponent.prototype.outerArc = function () {
        var factor = 1.5;
        return arc()
            .innerRadius(this.outerRadius * factor)
            .outerRadius(this.outerRadius * factor);
    };
    PieSeriesComponent.prototype.calculateLabelPositions = function (pieData) {
        var _this = this;
        var factor = 1.5;
        var minDistance = 10;
        var labelPositions = pieData;
        labelPositions.forEach(function (d) {
            d.pos = _this.outerArc().centroid(d);
            d.pos[0] = factor * _this.outerRadius * (_this.midAngle(d) < Math.PI ? 1 : -1);
        });
        for (var i = 0; i < labelPositions.length - 1; i++) {
            var a = labelPositions[i];
            if (!this.labelVisible(a)) {
                continue;
            }
            for (var j = i + 1; j < labelPositions.length; j++) {
                var b = labelPositions[j];
                if (!this.labelVisible(b)) {
                    continue;
                }
                // if they're on the same side
                if (b.pos[0] * a.pos[0] > 0) {
                    // if they're overlapping
                    var o = minDistance - Math.abs(b.pos[1] - a.pos[1]);
                    if (o > 0) {
                        // push the second up or down
                        b.pos[1] += Math.sign(b.pos[0]) * o;
                    }
                }
            }
        }
        return labelPositions;
    };
    PieSeriesComponent.prototype.labelVisible = function (myArc) {
        return this.showLabels && myArc.endAngle - myArc.startAngle > Math.PI / 30;
    };
    PieSeriesComponent.prototype.getTooltipTitle = function (a) {
        return this.tooltipTemplate ? undefined : this.tooltipText(a);
    };
    PieSeriesComponent.prototype.labelText = function (myArc) {
        if (this.labelFormatting) {
            return this.labelFormatting(myArc.data.name);
        }
        return this.label(myArc);
    };
    PieSeriesComponent.prototype.label = function (myArc) {
        return formatLabel(myArc.data.name);
    };
    PieSeriesComponent.prototype.defaultTooltipText = function (myArc) {
        var label = this.label(myArc);
        var val = formatLabel(myArc.data.value);
        return "\n      <span class=\"tooltip-label\">" + escapeLabel(label) + "</span>\n      <span class=\"tooltip-val\">" + val + "</span>\n    ";
    };
    PieSeriesComponent.prototype.color = function (myArc) {
        return this.colors.getColor(this.label(myArc));
    };
    PieSeriesComponent.prototype.trackBy = function (index, item) {
        return item.data.name;
    };
    PieSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    PieSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    };
    __decorate([
        Input()
    ], PieSeriesComponent.prototype, "colors", void 0);
    __decorate([
        Input()
    ], PieSeriesComponent.prototype, "series", void 0);
    __decorate([
        Input()
    ], PieSeriesComponent.prototype, "dims", void 0);
    __decorate([
        Input()
    ], PieSeriesComponent.prototype, "innerRadius", void 0);
    __decorate([
        Input()
    ], PieSeriesComponent.prototype, "outerRadius", void 0);
    __decorate([
        Input()
    ], PieSeriesComponent.prototype, "explodeSlices", void 0);
    __decorate([
        Input()
    ], PieSeriesComponent.prototype, "showLabels", void 0);
    __decorate([
        Input()
    ], PieSeriesComponent.prototype, "gradient", void 0);
    __decorate([
        Input()
    ], PieSeriesComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input()
    ], PieSeriesComponent.prototype, "labelFormatting", void 0);
    __decorate([
        Input()
    ], PieSeriesComponent.prototype, "trimLabels", void 0);
    __decorate([
        Input()
    ], PieSeriesComponent.prototype, "maxLabelLength", void 0);
    __decorate([
        Input()
    ], PieSeriesComponent.prototype, "tooltipText", void 0);
    __decorate([
        Input()
    ], PieSeriesComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input()
    ], PieSeriesComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        Input()
    ], PieSeriesComponent.prototype, "animations", void 0);
    __decorate([
        Output()
    ], PieSeriesComponent.prototype, "select", void 0);
    __decorate([
        Output()
    ], PieSeriesComponent.prototype, "activate", void 0);
    __decorate([
        Output()
    ], PieSeriesComponent.prototype, "deactivate", void 0);
    __decorate([
        Output()
    ], PieSeriesComponent.prototype, "dblclick", void 0);
    PieSeriesComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-pie-series]',
            template: "\n    <svg:g *ngFor=\"let arc of data; trackBy: trackBy\">\n      <svg:g\n        ngx-charts-pie-label\n        *ngIf=\"labelVisible(arc)\"\n        [data]=\"arc\"\n        [radius]=\"outerRadius\"\n        [color]=\"color(arc)\"\n        [label]=\"labelText(arc)\"\n        [labelTrim]=\"trimLabels\"\n        [labelTrimSize]=\"maxLabelLength\"\n        [max]=\"max\"\n        [value]=\"arc.value\"\n        [explodeSlices]=\"explodeSlices\"\n        [animations]=\"animations\"\n      ></svg:g>\n      <svg:g\n        ngx-charts-pie-arc\n        [startAngle]=\"arc.startAngle\"\n        [endAngle]=\"arc.endAngle\"\n        [innerRadius]=\"innerRadius\"\n        [outerRadius]=\"outerRadius\"\n        [fill]=\"color(arc)\"\n        [value]=\"arc.data.value\"\n        [gradient]=\"gradient\"\n        [data]=\"arc.data\"\n        [max]=\"max\"\n        [explodeSlices]=\"explodeSlices\"\n        [isActive]=\"isActive(arc.data)\"\n        [animate]=\"animations\"\n        (select)=\"onClick($event)\"\n        (activate)=\"activate.emit($event)\"\n        (deactivate)=\"deactivate.emit($event)\"\n        (dblclick)=\"dblclick.emit($event)\"\n        ngx-tooltip\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipPlacement]=\"'top'\"\n        [tooltipType]=\"'tooltip'\"\n        [tooltipTitle]=\"getTooltipTitle(arc)\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipContext]=\"arc.data\"\n      ></svg:g>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], PieSeriesComponent);
    return PieSeriesComponent;
}());
export { PieSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLXNlcmllcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9waWUtY2hhcnQvcGllLXNlcmllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBRVosdUJBQXVCLEVBRXhCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDL0IsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFcEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQWtEbEU7SUFBQTtRQUVXLFdBQU0sR0FBUSxFQUFFLENBQUM7UUFFakIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFNakIsZUFBVSxHQUFZLElBQUksQ0FBQztRQUMzQixtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUU1QixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUVqQyxlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTFCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBd0gxQyxDQUFDO0lBbkhDLHdDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELG1DQUFNLEdBQU47UUFDRSxJQUFNLFlBQVksR0FBRyxHQUFHLEVBQVk7YUFDakMsS0FBSyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FB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QXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFOzBEQUE0QjtJQUMzQjtRQUFSLEtBQUssRUFBRTs4REFBNkI7SUFDNUI7UUFBUixLQUFLLEVBQUU7MkRBQThCO0lBQzdCO1FBQVIsS0FBSyxFQUFFOytEQUFrQztJQUNqQztRQUFSLEtBQUssRUFBRTsrREFBbUM7SUFDbEM7UUFBUixLQUFLLEVBQUU7MERBQTRCO0lBRTFCO1FBQVQsTUFBTSxFQUFFO3NEQUE2QjtJQUM1QjtRQUFULE1BQU0sRUFBRTt3REFBK0I7SUFDOUI7UUFBVCxNQUFNLEVBQUU7MERBQWlDO0lBQ2hDO1FBQVQsTUFBTSxFQUFFO3dEQUErQjtJQXJCN0Isa0JBQWtCO1FBaEQ5QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsMEJBQTBCO1lBQ3BDLFFBQVEsRUFBRSxxN0NBMkNUO1lBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQztPQUNXLGtCQUFrQixDQTZJOUI7SUFBRCx5QkFBQztDQUFBLEFBN0lELElBNklDO1NBN0lZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPbkNoYW5nZXMsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgbWF4IH0gZnJvbSAnZDMtYXJyYXknO1xyXG5pbXBvcnQgeyBhcmMsIHBpZSB9IGZyb20gJ2QzLXNoYXBlJztcclxuXHJcbmltcG9ydCB7IGZvcm1hdExhYmVsLCBlc2NhcGVMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbC5oZWxwZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtcGllLXNlcmllc10nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8c3ZnOmcgKm5nRm9yPVwibGV0IGFyYyBvZiBkYXRhOyB0cmFja0J5OiB0cmFja0J5XCI+XHJcbiAgICAgIDxzdmc6Z1xyXG4gICAgICAgIG5neC1jaGFydHMtcGllLWxhYmVsXHJcbiAgICAgICAgKm5nSWY9XCJsYWJlbFZpc2libGUoYXJjKVwiXHJcbiAgICAgICAgW2RhdGFdPVwiYXJjXCJcclxuICAgICAgICBbcmFkaXVzXT1cIm91dGVyUmFkaXVzXCJcclxuICAgICAgICBbY29sb3JdPVwiY29sb3IoYXJjKVwiXHJcbiAgICAgICAgW2xhYmVsXT1cImxhYmVsVGV4dChhcmMpXCJcclxuICAgICAgICBbbGFiZWxUcmltXT1cInRyaW1MYWJlbHNcIlxyXG4gICAgICAgIFtsYWJlbFRyaW1TaXplXT1cIm1heExhYmVsTGVuZ3RoXCJcclxuICAgICAgICBbbWF4XT1cIm1heFwiXHJcbiAgICAgICAgW3ZhbHVlXT1cImFyYy52YWx1ZVwiXHJcbiAgICAgICAgW2V4cGxvZGVTbGljZXNdPVwiZXhwbG9kZVNsaWNlc1wiXHJcbiAgICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgID48L3N2ZzpnPlxyXG4gICAgICA8c3ZnOmdcclxuICAgICAgICBuZ3gtY2hhcnRzLXBpZS1hcmNcclxuICAgICAgICBbc3RhcnRBbmdsZV09XCJhcmMuc3RhcnRBbmdsZVwiXHJcbiAgICAgICAgW2VuZEFuZ2xlXT1cImFyYy5lbmRBbmdsZVwiXHJcbiAgICAgICAgW2lubmVyUmFkaXVzXT1cImlubmVyUmFkaXVzXCJcclxuICAgICAgICBbb3V0ZXJSYWRpdXNdPVwib3V0ZXJSYWRpdXNcIlxyXG4gICAgICAgIFtmaWxsXT1cImNvbG9yKGFyYylcIlxyXG4gICAgICAgIFt2YWx1ZV09XCJhcmMuZGF0YS52YWx1ZVwiXHJcbiAgICAgICAgW2dyYWRpZW50XT1cImdyYWRpZW50XCJcclxuICAgICAgICBbZGF0YV09XCJhcmMuZGF0YVwiXHJcbiAgICAgICAgW21heF09XCJtYXhcIlxyXG4gICAgICAgIFtleHBsb2RlU2xpY2VzXT1cImV4cGxvZGVTbGljZXNcIlxyXG4gICAgICAgIFtpc0FjdGl2ZV09XCJpc0FjdGl2ZShhcmMuZGF0YSlcIlxyXG4gICAgICAgIFthbmltYXRlXT1cImFuaW1hdGlvbnNcIlxyXG4gICAgICAgIChzZWxlY3QpPVwib25DbGljaygkZXZlbnQpXCJcclxuICAgICAgICAoYWN0aXZhdGUpPVwiYWN0aXZhdGUuZW1pdCgkZXZlbnQpXCJcclxuICAgICAgICAoZGVhY3RpdmF0ZSk9XCJkZWFjdGl2YXRlLmVtaXQoJGV2ZW50KVwiXHJcbiAgICAgICAgKGRibGNsaWNrKT1cImRibGNsaWNrLmVtaXQoJGV2ZW50KVwiXHJcbiAgICAgICAgbmd4LXRvb2x0aXBcclxuICAgICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXHJcbiAgICAgICAgW3Rvb2x0aXBQbGFjZW1lbnRdPVwiJ3RvcCdcIlxyXG4gICAgICAgIFt0b29sdGlwVHlwZV09XCIndG9vbHRpcCdcIlxyXG4gICAgICAgIFt0b29sdGlwVGl0bGVdPVwiZ2V0VG9vbHRpcFRpdGxlKGFyYylcIlxyXG4gICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcclxuICAgICAgICBbdG9vbHRpcENvbnRleHRdPVwiYXJjLmRhdGFcIlxyXG4gICAgICA+PC9zdmc6Zz5cclxuICAgIDwvc3ZnOmc+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGllU2VyaWVzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBjb2xvcnM7XHJcbiAgQElucHV0KCkgc2VyaWVzOiBhbnkgPSBbXTtcclxuICBASW5wdXQoKSBkaW1zO1xyXG4gIEBJbnB1dCgpIGlubmVyUmFkaXVzID0gNjA7XHJcbiAgQElucHV0KCkgb3V0ZXJSYWRpdXMgPSA4MDtcclxuICBASW5wdXQoKSBleHBsb2RlU2xpY2VzO1xyXG4gIEBJbnB1dCgpIHNob3dMYWJlbHM7XHJcbiAgQElucHV0KCkgZ3JhZGllbnQ6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgYWN0aXZlRW50cmllczogYW55W107XHJcbiAgQElucHV0KCkgbGFiZWxGb3JtYXR0aW5nOiBhbnk7XHJcbiAgQElucHV0KCkgdHJpbUxhYmVsczogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCkgbWF4TGFiZWxMZW5ndGg6IG51bWJlciA9IDEwO1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBUZXh0OiAobzogYW55KSA9PiBhbnk7XHJcbiAgQElucHV0KCkgdG9vbHRpcERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIEBJbnB1dCgpIGFuaW1hdGlvbnM6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZGJsY2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIG1heDogbnVtYmVyO1xyXG4gIGRhdGE6IGFueTtcclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHBpZUdlbmVyYXRvciA9IHBpZTxhbnksIGFueT4oKVxyXG4gICAgICAudmFsdWUoZCA9PiBkLnZhbHVlKVxyXG4gICAgICAuc29ydChudWxsKTtcclxuXHJcbiAgICBjb25zdCBhcmNEYXRhID0gcGllR2VuZXJhdG9yKHRoaXMuc2VyaWVzKTtcclxuXHJcbiAgICB0aGlzLm1heCA9IG1heChhcmNEYXRhLCBkID0+IHtcclxuICAgICAgcmV0dXJuIGQudmFsdWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmRhdGEgPSB0aGlzLmNhbGN1bGF0ZUxhYmVsUG9zaXRpb25zKGFyY0RhdGEpO1xyXG4gICAgdGhpcy50b29sdGlwVGV4dCA9IHRoaXMudG9vbHRpcFRleHQgfHwgdGhpcy5kZWZhdWx0VG9vbHRpcFRleHQ7XHJcbiAgfVxyXG5cclxuICBtaWRBbmdsZShkKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBkLnN0YXJ0QW5nbGUgKyAoZC5lbmRBbmdsZSAtIGQuc3RhcnRBbmdsZSkgLyAyO1xyXG4gIH1cclxuXHJcbiAgb3V0ZXJBcmMoKTogYW55IHtcclxuICAgIGNvbnN0IGZhY3RvciA9IDEuNTtcclxuXHJcbiAgICByZXR1cm4gYXJjKClcclxuICAgICAgLmlubmVyUmFkaXVzKHRoaXMub3V0ZXJSYWRpdXMgKiBmYWN0b3IpXHJcbiAgICAgIC5vdXRlclJhZGl1cyh0aGlzLm91dGVyUmFkaXVzICogZmFjdG9yKTtcclxuICB9XHJcblxyXG4gIGNhbGN1bGF0ZUxhYmVsUG9zaXRpb25zKHBpZURhdGEpOiBhbnkge1xyXG4gICAgY29uc3QgZmFjdG9yID0gMS41O1xyXG4gICAgY29uc3QgbWluRGlzdGFuY2UgPSAxMDtcclxuICAgIGNvbnN0IGxhYmVsUG9zaXRpb25zID0gcGllRGF0YTtcclxuXHJcbiAgICBsYWJlbFBvc2l0aW9ucy5mb3JFYWNoKGQgPT4ge1xyXG4gICAgICBkLnBvcyA9IHRoaXMub3V0ZXJBcmMoKS5jZW50cm9pZChkKTtcclxuICAgICAgZC5wb3NbMF0gPSBmYWN0b3IgKiB0aGlzLm91dGVyUmFkaXVzICogKHRoaXMubWlkQW5nbGUoZCkgPCBNYXRoLlBJID8gMSA6IC0xKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGFiZWxQb3NpdGlvbnMubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGEgPSBsYWJlbFBvc2l0aW9uc1tpXTtcclxuICAgICAgaWYgKCF0aGlzLmxhYmVsVmlzaWJsZShhKSkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCBsYWJlbFBvc2l0aW9ucy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgIGNvbnN0IGIgPSBsYWJlbFBvc2l0aW9uc1tqXTtcclxuICAgICAgICBpZiAoIXRoaXMubGFiZWxWaXNpYmxlKGIpKSB7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYgdGhleSdyZSBvbiB0aGUgc2FtZSBzaWRlXHJcbiAgICAgICAgaWYgKGIucG9zWzBdICogYS5wb3NbMF0gPiAwKSB7XHJcbiAgICAgICAgICAvLyBpZiB0aGV5J3JlIG92ZXJsYXBwaW5nXHJcbiAgICAgICAgICBjb25zdCBvID0gbWluRGlzdGFuY2UgLSBNYXRoLmFicyhiLnBvc1sxXSAtIGEucG9zWzFdKTtcclxuICAgICAgICAgIGlmIChvID4gMCkge1xyXG4gICAgICAgICAgICAvLyBwdXNoIHRoZSBzZWNvbmQgdXAgb3IgZG93blxyXG4gICAgICAgICAgICBiLnBvc1sxXSArPSBNYXRoLnNpZ24oYi5wb3NbMF0pICogbztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbGFiZWxQb3NpdGlvbnM7XHJcbiAgfVxyXG5cclxuICBsYWJlbFZpc2libGUobXlBcmMpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnNob3dMYWJlbHMgJiYgbXlBcmMuZW5kQW5nbGUgLSBteUFyYy5zdGFydEFuZ2xlID4gTWF0aC5QSSAvIDMwO1xyXG4gIH1cclxuXHJcbiAgZ2V0VG9vbHRpcFRpdGxlKGEpIHtcclxuICAgIHJldHVybiB0aGlzLnRvb2x0aXBUZW1wbGF0ZSA/IHVuZGVmaW5lZCA6IHRoaXMudG9vbHRpcFRleHQoYSk7XHJcbiAgfVxyXG5cclxuICBsYWJlbFRleHQobXlBcmMpOiBzdHJpbmcge1xyXG4gICAgaWYgKHRoaXMubGFiZWxGb3JtYXR0aW5nKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxhYmVsRm9ybWF0dGluZyhteUFyYy5kYXRhLm5hbWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMubGFiZWwobXlBcmMpO1xyXG4gIH1cclxuXHJcbiAgbGFiZWwobXlBcmMpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGZvcm1hdExhYmVsKG15QXJjLmRhdGEubmFtZSk7XHJcbiAgfVxyXG5cclxuICBkZWZhdWx0VG9vbHRpcFRleHQobXlBcmMpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgbGFiZWwgPSB0aGlzLmxhYmVsKG15QXJjKTtcclxuICAgIGNvbnN0IHZhbCA9IGZvcm1hdExhYmVsKG15QXJjLmRhdGEudmFsdWUpO1xyXG5cclxuICAgIHJldHVybiBgXHJcbiAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC1sYWJlbFwiPiR7ZXNjYXBlTGFiZWwobGFiZWwpfTwvc3Bhbj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLXZhbFwiPiR7dmFsfTwvc3Bhbj5cclxuICAgIGA7XHJcbiAgfVxyXG5cclxuICBjb2xvcihteUFyYyk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2xvcnMuZ2V0Q29sb3IodGhpcy5sYWJlbChteUFyYykpO1xyXG4gIH1cclxuXHJcbiAgdHJhY2tCeShpbmRleCwgaXRlbSk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gaXRlbS5kYXRhLm5hbWU7XHJcbiAgfVxyXG5cclxuICBvbkNsaWNrKGRhdGEpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XHJcbiAgfVxyXG5cclxuICBpc0FjdGl2ZShlbnRyeSk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKCF0aGlzLmFjdGl2ZUVudHJpZXMpIHJldHVybiBmYWxzZTtcclxuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmFjdGl2ZUVudHJpZXMuZmluZChkID0+IHtcclxuICAgICAgcmV0dXJuIGVudHJ5Lm5hbWUgPT09IGQubmFtZSAmJiBlbnRyeS5zZXJpZXMgPT09IGQuc2VyaWVzO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaXRlbSAhPT0gdW5kZWZpbmVkO1xyXG4gIH1cclxufVxyXG4iXX0=