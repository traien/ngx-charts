import { __decorate, __values } from "tslib";
import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, SimpleChanges, OnChanges, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { formatLabel } from '../label.helper';
var LegendComponent = /** @class */ (function () {
    function LegendComponent(cd) {
        this.cd = cd;
        this.horizontal = false;
        this.labelClick = new EventEmitter();
        this.labelActivate = new EventEmitter();
        this.labelDeactivate = new EventEmitter();
        this.legendEntries = [];
    }
    LegendComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    LegendComponent.prototype.update = function () {
        this.cd.markForCheck();
        this.legendEntries = this.getLegendEntries();
    };
    LegendComponent.prototype.getLegendEntries = function () {
        var e_1, _a;
        var items = [];
        var _loop_1 = function (label) {
            var formattedLabel = formatLabel(label);
            var idx = items.findIndex(function (i) {
                return i.label === formattedLabel;
            });
            if (idx === -1) {
                items.push({
                    label: label,
                    formattedLabel: formattedLabel,
                    color: this_1.colors.getColor(label)
                });
            }
        };
        var this_1 = this;
        try {
            for (var _b = __values(this.data), _c = _b.next(); !_c.done; _c = _b.next()) {
                var label = _c.value;
                _loop_1(label);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return items;
    };
    LegendComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.label === d.name;
        });
        return item !== undefined;
    };
    LegendComponent.prototype.activate = function (item) {
        this.labelActivate.emit(item);
    };
    LegendComponent.prototype.deactivate = function (item) {
        this.labelDeactivate.emit(item);
    };
    LegendComponent.prototype.trackBy = function (index, item) {
        return item.label;
    };
    LegendComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], LegendComponent.prototype, "data", void 0);
    __decorate([
        Input()
    ], LegendComponent.prototype, "title", void 0);
    __decorate([
        Input()
    ], LegendComponent.prototype, "colors", void 0);
    __decorate([
        Input()
    ], LegendComponent.prototype, "height", void 0);
    __decorate([
        Input()
    ], LegendComponent.prototype, "width", void 0);
    __decorate([
        Input()
    ], LegendComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input()
    ], LegendComponent.prototype, "horizontal", void 0);
    __decorate([
        Output()
    ], LegendComponent.prototype, "labelClick", void 0);
    __decorate([
        Output()
    ], LegendComponent.prototype, "labelActivate", void 0);
    __decorate([
        Output()
    ], LegendComponent.prototype, "labelDeactivate", void 0);
    LegendComponent = __decorate([
        Component({
            selector: 'ngx-charts-legend',
            template: "\n    <div [style.width.px]=\"width\">\n      <header class=\"legend-title\" *ngIf=\"title?.length > 0\">\n        <span class=\"legend-title-text\">{{ title }}</span>\n      </header>\n      <div class=\"legend-wrap\">\n        <ul class=\"legend-labels\" [class.horizontal-legend]=\"horizontal\" [style.max-height.px]=\"height - 45\">\n          <li *ngFor=\"let entry of legendEntries; trackBy: trackBy\" class=\"legend-label\">\n            <ngx-charts-legend-entry\n              [label]=\"entry.label\"\n              [formattedLabel]=\"entry.formattedLabel\"\n              [color]=\"entry.color\"\n              [isActive]=\"isActive(entry)\"\n              (select)=\"labelClick.emit($event)\"\n              (activate)=\"activate($event)\"\n              (deactivate)=\"deactivate($event)\"\n            >\n            </ngx-charts-legend-entry>\n          </li>\n        </ul>\n      </div>\n    </div>\n  ",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".chart-legend{display:inline-block;padding:0;width:auto!important}.chart-legend .legend-title{white-space:nowrap;overflow:hidden;margin-left:10px;margin-bottom:5px;font-size:14px;font-weight:700}.chart-legend li,.chart-legend ul{padding:0;margin:0;list-style:none}.chart-legend .horizontal-legend li{display:inline-block}.chart-legend .legend-wrap{width:calc(100% - 10px)}.chart-legend .legend-labels{line-height:85%;list-style:none;text-align:left;float:left;width:100%;border-radius:3px;overflow-y:auto;overflow-x:hidden;white-space:nowrap;background:rgba(0,0,0,.05)}.chart-legend .legend-label{cursor:pointer;font-size:90%;margin:8px;color:#afb7c8}.chart-legend .legend-label:hover{color:#000;-webkit-transition:.2s;transition:.2s}.chart-legend .legend-label .active .legend-label-text{color:#000}.chart-legend .legend-label-color{display:inline-block;height:15px;width:15px;margin-right:5px;color:#5b646b;border-radius:3px}.chart-legend .legend-label-text{display:inline-block;vertical-align:top;line-height:15px;font-size:12px;width:calc(100% - 20px);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.chart-legend .legend-title-text{vertical-align:bottom;display:inline-block;line-height:16px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}"]
        })
    ], LegendComponent);
    return LegendComponent;
}());
export { LegendComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVnZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9sZWdlbmQvbGVnZW5kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsdUJBQXVCLEVBQ3ZCLE1BQU0sRUFDTixZQUFZLEVBQ1osYUFBYSxFQUNiLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQStCOUM7SUFlRSx5QkFBb0IsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFSaEMsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUVsQixlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbkQsa0JBQWEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN0RCxvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxFLGtCQUFhLEdBQVUsRUFBRSxDQUFDO0lBRWtCLENBQUM7SUFFN0MscUNBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsZ0NBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRUQsMENBQWdCLEdBQWhCOztRQUNFLElBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztnQ0FFTixLQUFLO1lBQ2QsSUFBTSxjQUFjLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRTFDLElBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDO2dCQUMzQixPQUFPLENBQUMsQ0FBQyxLQUFLLEtBQUssY0FBYyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ2QsS0FBSyxDQUFDLElBQUksQ0FBQztvQkFDVCxLQUFLLE9BQUE7b0JBQ0wsY0FBYyxnQkFBQTtvQkFDZCxLQUFLLEVBQUUsT0FBSyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztpQkFDbkMsQ0FBQyxDQUFDO2FBQ0o7Ozs7WUFiSCxLQUFvQixJQUFBLEtBQUEsU0FBQSxJQUFJLENBQUMsSUFBSSxDQUFBLGdCQUFBO2dCQUF4QixJQUFNLEtBQUssV0FBQTt3QkFBTCxLQUFLO2FBY2Y7Ozs7Ozs7OztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELGtDQUFRLEdBQVIsVUFBUyxLQUFLO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDdEMsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDO1lBQ3BDLE9BQU8sS0FBSyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLEtBQUssU0FBUyxDQUFDO0lBQzVCLENBQUM7SUFFRCxrQ0FBUSxHQUFSLFVBQVMsSUFBSTtRQUNYLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxvQ0FBVSxHQUFWLFVBQVcsSUFBSTtRQUNiLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxpQ0FBTyxHQUFQLFVBQVEsS0FBSyxFQUFFLElBQUk7UUFDakIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7O2dCQW5EdUIsaUJBQWlCOztJQWRoQztRQUFSLEtBQUssRUFBRTtpREFBTTtJQUNMO1FBQVIsS0FBSyxFQUFFO2tEQUFPO0lBQ047UUFBUixLQUFLLEVBQUU7bURBQVE7SUFDUDtRQUFSLEtBQUssRUFBRTttREFBUTtJQUNQO1FBQVIsS0FBSyxFQUFFO2tEQUFPO0lBQ047UUFBUixLQUFLLEVBQUU7MERBQWU7SUFDZDtRQUFSLEtBQUssRUFBRTt1REFBb0I7SUFFbEI7UUFBVCxNQUFNLEVBQUU7dURBQW9EO0lBQ25EO1FBQVQsTUFBTSxFQUFFOzBEQUF1RDtJQUN0RDtRQUFULE1BQU0sRUFBRTs0REFBeUQ7SUFYdkQsZUFBZTtRQTdCM0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixRQUFRLEVBQUUsdTVCQXNCVDtZQUVELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNoRCxDQUFDO09BQ1csZUFBZSxDQW1FM0I7SUFBRCxzQkFBQztDQUFBLEFBbkVELElBbUVDO1NBbkVZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGZvcm1hdExhYmVsIH0gZnJvbSAnLi4vbGFiZWwuaGVscGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LWNoYXJ0cy1sZWdlbmQnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IFtzdHlsZS53aWR0aC5weF09XCJ3aWR0aFwiPlxyXG4gICAgICA8aGVhZGVyIGNsYXNzPVwibGVnZW5kLXRpdGxlXCIgKm5nSWY9XCJ0aXRsZT8ubGVuZ3RoID4gMFwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kLXRpdGxlLXRleHRcIj57eyB0aXRsZSB9fTwvc3Bhbj5cclxuICAgICAgPC9oZWFkZXI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJsZWdlbmQtd3JhcFwiPlxyXG4gICAgICAgIDx1bCBjbGFzcz1cImxlZ2VuZC1sYWJlbHNcIiBbY2xhc3MuaG9yaXpvbnRhbC1sZWdlbmRdPVwiaG9yaXpvbnRhbFwiIFtzdHlsZS5tYXgtaGVpZ2h0LnB4XT1cImhlaWdodCAtIDQ1XCI+XHJcbiAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGVudHJ5IG9mIGxlZ2VuZEVudHJpZXM7IHRyYWNrQnk6IHRyYWNrQnlcIiBjbGFzcz1cImxlZ2VuZC1sYWJlbFwiPlxyXG4gICAgICAgICAgICA8bmd4LWNoYXJ0cy1sZWdlbmQtZW50cnlcclxuICAgICAgICAgICAgICBbbGFiZWxdPVwiZW50cnkubGFiZWxcIlxyXG4gICAgICAgICAgICAgIFtmb3JtYXR0ZWRMYWJlbF09XCJlbnRyeS5mb3JtYXR0ZWRMYWJlbFwiXHJcbiAgICAgICAgICAgICAgW2NvbG9yXT1cImVudHJ5LmNvbG9yXCJcclxuICAgICAgICAgICAgICBbaXNBY3RpdmVdPVwiaXNBY3RpdmUoZW50cnkpXCJcclxuICAgICAgICAgICAgICAoc2VsZWN0KT1cImxhYmVsQ2xpY2suZW1pdCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAoYWN0aXZhdGUpPVwiYWN0aXZhdGUoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgKGRlYWN0aXZhdGUpPVwiZGVhY3RpdmF0ZSgkZXZlbnQpXCJcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICA8L25neC1jaGFydHMtbGVnZW5kLWVudHJ5PlxyXG4gICAgICAgICAgPC9saT5cclxuICAgICAgICA8L3VsPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGAsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbGVnZW5kLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGVnZW5kQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBkYXRhO1xyXG4gIEBJbnB1dCgpIHRpdGxlO1xyXG4gIEBJbnB1dCgpIGNvbG9ycztcclxuICBASW5wdXQoKSBoZWlnaHQ7XHJcbiAgQElucHV0KCkgd2lkdGg7XHJcbiAgQElucHV0KCkgYWN0aXZlRW50cmllcztcclxuICBASW5wdXQoKSBob3Jpem9udGFsID0gZmFsc2U7XHJcblxyXG4gIEBPdXRwdXQoKSBsYWJlbENsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgbGFiZWxBY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGxhYmVsRGVhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGxlZ2VuZEVudHJpZXM6IGFueVtdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgIHRoaXMubGVnZW5kRW50cmllcyA9IHRoaXMuZ2V0TGVnZW5kRW50cmllcygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGVnZW5kRW50cmllcygpOiBhbnlbXSB7XHJcbiAgICBjb25zdCBpdGVtcyA9IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3QgbGFiZWwgb2YgdGhpcy5kYXRhKSB7XHJcbiAgICAgIGNvbnN0IGZvcm1hdHRlZExhYmVsID0gZm9ybWF0TGFiZWwobGFiZWwpO1xyXG5cclxuICAgICAgY29uc3QgaWR4ID0gaXRlbXMuZmluZEluZGV4KGkgPT4ge1xyXG4gICAgICAgIHJldHVybiBpLmxhYmVsID09PSBmb3JtYXR0ZWRMYWJlbDtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoaWR4ID09PSAtMSkge1xyXG4gICAgICAgIGl0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgbGFiZWwsXHJcbiAgICAgICAgICBmb3JtYXR0ZWRMYWJlbCxcclxuICAgICAgICAgIGNvbG9yOiB0aGlzLmNvbG9ycy5nZXRDb2xvcihsYWJlbClcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBpdGVtcztcclxuICB9XHJcblxyXG4gIGlzQWN0aXZlKGVudHJ5KTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIXRoaXMuYWN0aXZlRW50cmllcykgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3QgaXRlbSA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kKGQgPT4ge1xyXG4gICAgICByZXR1cm4gZW50cnkubGFiZWwgPT09IGQubmFtZTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGl0ZW0gIT09IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGFjdGl2YXRlKGl0ZW0pIHtcclxuICAgIHRoaXMubGFiZWxBY3RpdmF0ZS5lbWl0KGl0ZW0pO1xyXG4gIH1cclxuXHJcbiAgZGVhY3RpdmF0ZShpdGVtKSB7XHJcbiAgICB0aGlzLmxhYmVsRGVhY3RpdmF0ZS5lbWl0KGl0ZW0pO1xyXG4gIH1cclxuXHJcbiAgdHJhY2tCeShpbmRleCwgaXRlbSk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gaXRlbS5sYWJlbDtcclxuICB9XHJcbn1cclxuIl19