import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { invertColor } from '../utils/color-utils';
var CardSeriesComponent = /** @class */ (function () {
    function CardSeriesComponent() {
        this.innerPadding = 15;
        this.emptyColor = 'rgba(0, 0, 0, 0)';
        this.animations = true;
        this.select = new EventEmitter();
    }
    CardSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    CardSeriesComponent.prototype.update = function () {
        if (this.data.length > 2) {
            var valueFormatting_1 = this.valueFormatting || (function (card) { return card.value.toLocaleString(); });
            var sortedLengths = this.data
                .map(function (d) {
                var hasValue = d && d.data && typeof d.data.value !== 'undefined' && d.data.value !== null;
                return hasValue
                    ? valueFormatting_1({
                        data: d.data,
                        label: d ? d.data.name : '',
                        value: d && d.data ? d.data.value : ''
                    }).length
                    : 0;
            })
                .sort(function (a, b) { return b - a; });
            var idx = Math.ceil(this.data.length / 2);
            this.medianSize = sortedLengths[idx];
        }
        var cards = this.getCards();
        this.cards = cards.filter(function (d) { return d.data.value !== null; });
        this.emptySlots = cards.filter(function (d) { return d.data.value === null; });
    };
    CardSeriesComponent.prototype.getCards = function () {
        var _this = this;
        var yPadding = typeof this.innerPadding === 'number' ? this.innerPadding : this.innerPadding[0] + this.innerPadding[2];
        var xPadding = typeof this.innerPadding === 'number' ? this.innerPadding : this.innerPadding[1] + this.innerPadding[3];
        return this.data.map(function (d, index) {
            var label = d.data.name;
            if (label && label.constructor.name === 'Date') {
                label = label.toLocaleDateString();
            }
            else {
                label = label ? label.toLocaleString() : label;
            }
            var value = d.data.value;
            var valueColor = label ? _this.colors.getColor(label) : _this.emptyColor;
            var color = _this.cardColor || valueColor || '#000';
            return {
                x: d.x,
                y: d.y,
                width: d.width - xPadding,
                height: d.height - yPadding,
                color: color,
                bandColor: _this.bandColor || valueColor,
                textColor: _this.textColor || invertColor(color),
                label: label,
                data: d.data,
                tooltipText: label + ": " + value
            };
        });
    };
    CardSeriesComponent.prototype.trackBy = function (index, card) {
        return card.label;
    };
    CardSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    __decorate([
        Input()
    ], CardSeriesComponent.prototype, "data", void 0);
    __decorate([
        Input()
    ], CardSeriesComponent.prototype, "slots", void 0);
    __decorate([
        Input()
    ], CardSeriesComponent.prototype, "dims", void 0);
    __decorate([
        Input()
    ], CardSeriesComponent.prototype, "colors", void 0);
    __decorate([
        Input()
    ], CardSeriesComponent.prototype, "innerPadding", void 0);
    __decorate([
        Input()
    ], CardSeriesComponent.prototype, "cardColor", void 0);
    __decorate([
        Input()
    ], CardSeriesComponent.prototype, "bandColor", void 0);
    __decorate([
        Input()
    ], CardSeriesComponent.prototype, "emptyColor", void 0);
    __decorate([
        Input()
    ], CardSeriesComponent.prototype, "textColor", void 0);
    __decorate([
        Input()
    ], CardSeriesComponent.prototype, "valueFormatting", void 0);
    __decorate([
        Input()
    ], CardSeriesComponent.prototype, "labelFormatting", void 0);
    __decorate([
        Input()
    ], CardSeriesComponent.prototype, "animations", void 0);
    __decorate([
        Output()
    ], CardSeriesComponent.prototype, "select", void 0);
    CardSeriesComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-card-series]',
            template: "\n    <svg:rect\n      *ngFor=\"let c of emptySlots; trackBy: trackBy\"\n      class=\"card-empty\"\n      [attr.x]=\"c.x\"\n      [attr.y]=\"c.y\"\n      [style.fill]=\"emptyColor\"\n      [attr.width]=\"c.width\"\n      [attr.height]=\"c.height\"\n      rx=\"3\"\n      ry=\"3\"\n    />\n    <svg:g\n      ngx-charts-card\n      *ngFor=\"let c of cards; trackBy: trackBy\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [color]=\"c.color\"\n      [bandColor]=\"c.bandColor\"\n      [textColor]=\"c.textColor\"\n      [data]=\"c.data\"\n      [label]=\"c.label\"\n      [medianSize]=\"medianSize\"\n      [valueFormatting]=\"valueFormatting\"\n      [labelFormatting]=\"labelFormatting\"\n      [animations]=\"animations\"\n      (select)=\"onClick($event)\"\n    />\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], CardSeriesComponent);
    return CardSeriesComponent;
}());
export { CardSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvbnVtYmVyLWNhcmQvY2FyZC1zZXJpZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUdaLHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFnRG5EO0lBQUE7UUFLVyxpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUlsQixlQUFVLEdBQUcsa0JBQWtCLENBQUM7UUFJaEMsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUxQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQTBFeEMsQ0FBQztJQXBFQyx5Q0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxvQ0FBTSxHQUFOO1FBQ0UsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDeEIsSUFBTSxpQkFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLEVBQTNCLENBQTJCLENBQUMsQ0FBQztZQUV0RixJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSTtpQkFDNUIsR0FBRyxDQUFDLFVBQUEsQ0FBQztnQkFDSixJQUFNLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLFdBQVcsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUM7Z0JBQzdGLE9BQU8s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QyxRQUFRLEVBQUUsMnpCQThCVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FDVyxtQkFBbUIsQ0F5Ri9CO0lBQUQsMEJBQUM7Q0FBQSxBQXpGRCxJQXlGQztTQXpGWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGludmVydENvbG9yIH0gZnJvbSAnLi4vdXRpbHMvY29sb3ItdXRpbHMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDYXJkTW9kZWwge1xyXG4gIHg7XHJcbiAgeTtcclxuICB3aWR0aDogbnVtYmVyO1xyXG4gIGhlaWdodDogbnVtYmVyO1xyXG4gIGNvbG9yOiBzdHJpbmc7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICBkYXRhO1xyXG4gIHRvb2x0aXBUZXh0OiBzdHJpbmc7XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLWNhcmQtc2VyaWVzXScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxzdmc6cmVjdFxyXG4gICAgICAqbmdGb3I9XCJsZXQgYyBvZiBlbXB0eVNsb3RzOyB0cmFja0J5OiB0cmFja0J5XCJcclxuICAgICAgY2xhc3M9XCJjYXJkLWVtcHR5XCJcclxuICAgICAgW2F0dHIueF09XCJjLnhcIlxyXG4gICAgICBbYXR0ci55XT1cImMueVwiXHJcbiAgICAgIFtzdHlsZS5maWxsXT1cImVtcHR5Q29sb3JcIlxyXG4gICAgICBbYXR0ci53aWR0aF09XCJjLndpZHRoXCJcclxuICAgICAgW2F0dHIuaGVpZ2h0XT1cImMuaGVpZ2h0XCJcclxuICAgICAgcng9XCIzXCJcclxuICAgICAgcnk9XCIzXCJcclxuICAgIC8+XHJcbiAgICA8c3ZnOmdcclxuICAgICAgbmd4LWNoYXJ0cy1jYXJkXHJcbiAgICAgICpuZ0Zvcj1cImxldCBjIG9mIGNhcmRzOyB0cmFja0J5OiB0cmFja0J5XCJcclxuICAgICAgW3hdPVwiYy54XCJcclxuICAgICAgW3ldPVwiYy55XCJcclxuICAgICAgW3dpZHRoXT1cImMud2lkdGhcIlxyXG4gICAgICBbaGVpZ2h0XT1cImMuaGVpZ2h0XCJcclxuICAgICAgW2NvbG9yXT1cImMuY29sb3JcIlxyXG4gICAgICBbYmFuZENvbG9yXT1cImMuYmFuZENvbG9yXCJcclxuICAgICAgW3RleHRDb2xvcl09XCJjLnRleHRDb2xvclwiXHJcbiAgICAgIFtkYXRhXT1cImMuZGF0YVwiXHJcbiAgICAgIFtsYWJlbF09XCJjLmxhYmVsXCJcclxuICAgICAgW21lZGlhblNpemVdPVwibWVkaWFuU2l6ZVwiXHJcbiAgICAgIFt2YWx1ZUZvcm1hdHRpbmddPVwidmFsdWVGb3JtYXR0aW5nXCJcclxuICAgICAgW2xhYmVsRm9ybWF0dGluZ109XCJsYWJlbEZvcm1hdHRpbmdcIlxyXG4gICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcclxuICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKCRldmVudClcIlxyXG4gICAgLz5cclxuICBgLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXJkU2VyaWVzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBkYXRhOiBhbnlbXTtcclxuICBASW5wdXQoKSBzbG90czogYW55W107XHJcbiAgQElucHV0KCkgZGltcztcclxuICBASW5wdXQoKSBjb2xvcnM7XHJcbiAgQElucHV0KCkgaW5uZXJQYWRkaW5nID0gMTU7XHJcblxyXG4gIEBJbnB1dCgpIGNhcmRDb2xvcjtcclxuICBASW5wdXQoKSBiYW5kQ29sb3I7XHJcbiAgQElucHV0KCkgZW1wdHlDb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDApJztcclxuICBASW5wdXQoKSB0ZXh0Q29sb3I7XHJcbiAgQElucHV0KCkgdmFsdWVGb3JtYXR0aW5nOiBhbnk7XHJcbiAgQElucHV0KCkgbGFiZWxGb3JtYXR0aW5nOiBhbnk7XHJcbiAgQElucHV0KCkgYW5pbWF0aW9uczogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNhcmRzOiBDYXJkTW9kZWxbXTtcclxuICBlbXB0eVNsb3RzOiBhbnlbXTtcclxuICBtZWRpYW5TaXplOiBudW1iZXI7XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5kYXRhLmxlbmd0aCA+IDIpIHtcclxuICAgICAgY29uc3QgdmFsdWVGb3JtYXR0aW5nID0gdGhpcy52YWx1ZUZvcm1hdHRpbmcgfHwgKGNhcmQgPT4gY2FyZC52YWx1ZS50b0xvY2FsZVN0cmluZygpKTtcclxuXHJcbiAgICAgIGNvbnN0IHNvcnRlZExlbmd0aHMgPSB0aGlzLmRhdGFcclxuICAgICAgICAubWFwKGQgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaGFzVmFsdWUgPSBkICYmIGQuZGF0YSAmJiB0eXBlb2YgZC5kYXRhLnZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiBkLmRhdGEudmFsdWUgIT09IG51bGw7XHJcbiAgICAgICAgICByZXR1cm4gaGFzVmFsdWVcclxuICAgICAgICAgICAgPyB2YWx1ZUZvcm1hdHRpbmcoe1xyXG4gICAgICAgICAgICAgICAgZGF0YTogZC5kYXRhLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IGQgPyBkLmRhdGEubmFtZSA6ICcnLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGQgJiYgZC5kYXRhID8gZC5kYXRhLnZhbHVlIDogJydcclxuICAgICAgICAgICAgICB9KS5sZW5ndGhcclxuICAgICAgICAgICAgOiAwO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGIgLSBhKTtcclxuICAgICAgY29uc3QgaWR4ID0gTWF0aC5jZWlsKHRoaXMuZGF0YS5sZW5ndGggLyAyKTtcclxuICAgICAgdGhpcy5tZWRpYW5TaXplID0gc29ydGVkTGVuZ3Roc1tpZHhdO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNhcmRzID0gdGhpcy5nZXRDYXJkcygpO1xyXG4gICAgdGhpcy5jYXJkcyA9IGNhcmRzLmZpbHRlcihkID0+IGQuZGF0YS52YWx1ZSAhPT0gbnVsbCk7XHJcbiAgICB0aGlzLmVtcHR5U2xvdHMgPSBjYXJkcy5maWx0ZXIoZCA9PiBkLmRhdGEudmFsdWUgPT09IG51bGwpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2FyZHMoKTogYW55W10ge1xyXG4gICAgY29uc3QgeVBhZGRpbmcgPVxyXG4gICAgICB0eXBlb2YgdGhpcy5pbm5lclBhZGRpbmcgPT09ICdudW1iZXInID8gdGhpcy5pbm5lclBhZGRpbmcgOiB0aGlzLmlubmVyUGFkZGluZ1swXSArIHRoaXMuaW5uZXJQYWRkaW5nWzJdO1xyXG4gICAgY29uc3QgeFBhZGRpbmcgPVxyXG4gICAgICB0eXBlb2YgdGhpcy5pbm5lclBhZGRpbmcgPT09ICdudW1iZXInID8gdGhpcy5pbm5lclBhZGRpbmcgOiB0aGlzLmlubmVyUGFkZGluZ1sxXSArIHRoaXMuaW5uZXJQYWRkaW5nWzNdO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmRhdGEubWFwKChkLCBpbmRleCkgPT4ge1xyXG4gICAgICBsZXQgbGFiZWwgPSBkLmRhdGEubmFtZTtcclxuICAgICAgaWYgKGxhYmVsICYmIGxhYmVsLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdEYXRlJykge1xyXG4gICAgICAgIGxhYmVsID0gbGFiZWwudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGFiZWwgPSBsYWJlbCA/IGxhYmVsLnRvTG9jYWxlU3RyaW5nKCkgOiBsYWJlbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgdmFsdWUgPSBkLmRhdGEudmFsdWU7XHJcbiAgICAgIGNvbnN0IHZhbHVlQ29sb3IgPSBsYWJlbCA/IHRoaXMuY29sb3JzLmdldENvbG9yKGxhYmVsKSA6IHRoaXMuZW1wdHlDb2xvcjtcclxuICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmNhcmRDb2xvciB8fCB2YWx1ZUNvbG9yIHx8ICcjMDAwJztcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB4OiBkLngsXHJcbiAgICAgICAgeTogZC55LFxyXG4gICAgICAgIHdpZHRoOiBkLndpZHRoIC0geFBhZGRpbmcsXHJcbiAgICAgICAgaGVpZ2h0OiBkLmhlaWdodCAtIHlQYWRkaW5nLFxyXG4gICAgICAgIGNvbG9yLFxyXG4gICAgICAgIGJhbmRDb2xvcjogdGhpcy5iYW5kQ29sb3IgfHwgdmFsdWVDb2xvcixcclxuICAgICAgICB0ZXh0Q29sb3I6IHRoaXMudGV4dENvbG9yIHx8IGludmVydENvbG9yKGNvbG9yKSxcclxuICAgICAgICBsYWJlbCxcclxuICAgICAgICBkYXRhOiBkLmRhdGEsXHJcbiAgICAgICAgdG9vbHRpcFRleHQ6IGAke2xhYmVsfTogJHt2YWx1ZX1gXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHRyYWNrQnkoaW5kZXgsIGNhcmQpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGNhcmQubGFiZWw7XHJcbiAgfVxyXG5cclxuICBvbkNsaWNrKGRhdGEpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==