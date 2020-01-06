import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, HostListener, ElementRef, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { select } from 'd3-selection';
import { roundedRect } from '../common/shape.helper';
import { id } from '../utils/id';
var BarComponent = /** @class */ (function () {
    function BarComponent(element) {
        this.roundEdges = true;
        this.gradient = false;
        this.offset = 0;
        this.isActive = false;
        this.animations = true;
        this.noBarWhenZero = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.hasGradient = false;
        this.hideBar = false;
        this.element = element.nativeElement;
    }
    BarComponent.prototype.ngOnChanges = function (changes) {
        if (changes.roundEdges) {
            this.loadAnimation();
        }
        this.update();
    };
    BarComponent.prototype.update = function () {
        this.gradientId = 'grad' + id().toString();
        this.gradientFill = "url(#" + this.gradientId + ")";
        if (this.gradient || this.stops) {
            this.gradientStops = this.getGradient();
            this.hasGradient = true;
        }
        else {
            this.hasGradient = false;
        }
        this.updatePathEl();
        this.checkToHideBar();
    };
    BarComponent.prototype.loadAnimation = function () {
        this.path = this.getStartingPath();
        setTimeout(this.update.bind(this), 100);
    };
    BarComponent.prototype.updatePathEl = function () {
        var node = select(this.element).select('.bar');
        var path = this.getPath();
        if (this.animations) {
            node
                .transition()
                .duration(500)
                .attr('d', path);
        }
        else {
            node.attr('d', path);
        }
    };
    BarComponent.prototype.getGradient = function () {
        if (this.stops) {
            return this.stops;
        }
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: this.getStartOpacity()
            },
            {
                offset: 100,
                color: this.fill,
                opacity: 1
            }
        ];
    };
    BarComponent.prototype.getStartingPath = function () {
        if (!this.animations) {
            return this.getPath();
        }
        var radius = this.getRadius();
        var path;
        if (this.roundEdges) {
            if (this.orientation === 'vertical') {
                radius = Math.min(this.height, radius);
                path = roundedRect(this.x, this.y + this.height, this.width, 1, 0, this.edges);
            }
            else if (this.orientation === 'horizontal') {
                radius = Math.min(this.width, radius);
                path = roundedRect(this.x, this.y, 1, this.height, 0, this.edges);
            }
        }
        else {
            if (this.orientation === 'vertical') {
                path = roundedRect(this.x, this.y + this.height, this.width, 1, 0, this.edges);
            }
            else if (this.orientation === 'horizontal') {
                path = roundedRect(this.x, this.y, 1, this.height, 0, this.edges);
            }
        }
        return path;
    };
    BarComponent.prototype.getPath = function () {
        var radius = this.getRadius();
        var path;
        if (this.roundEdges) {
            if (this.orientation === 'vertical') {
                radius = Math.min(this.height, radius);
                path = roundedRect(this.x, this.y, this.width, this.height, radius, this.edges);
            }
            else if (this.orientation === 'horizontal') {
                radius = Math.min(this.width, radius);
                path = roundedRect(this.x, this.y, this.width, this.height, radius, this.edges);
            }
        }
        else {
            path = roundedRect(this.x, this.y, this.width, this.height, radius, this.edges);
        }
        return path;
    };
    BarComponent.prototype.getRadius = function () {
        var radius = 0;
        if (this.roundEdges && this.height > 5 && this.width > 5) {
            radius = Math.floor(Math.min(5, this.height / 2, this.width / 2));
        }
        return radius;
    };
    BarComponent.prototype.getStartOpacity = function () {
        if (this.roundEdges) {
            return 0.2;
        }
        else {
            return 0.5;
        }
    };
    Object.defineProperty(BarComponent.prototype, "edges", {
        get: function () {
            var edges = [false, false, false, false];
            if (this.roundEdges) {
                if (this.orientation === 'vertical') {
                    if (this.data.value > 0) {
                        edges = [true, true, false, false];
                    }
                    else {
                        edges = [false, false, true, true];
                    }
                }
                else if (this.orientation === 'horizontal') {
                    if (this.data.value > 0) {
                        edges = [false, true, false, true];
                    }
                    else {
                        edges = [true, false, true, false];
                    }
                }
            }
            return edges;
        },
        enumerable: true,
        configurable: true
    });
    BarComponent.prototype.onMouseEnter = function () {
        this.activate.emit(this.data);
    };
    BarComponent.prototype.onMouseLeave = function () {
        this.deactivate.emit(this.data);
    };
    BarComponent.prototype.checkToHideBar = function () {
        this.hideBar =
            this.noBarWhenZero &&
                ((this.orientation === 'vertical' && this.height === 0) ||
                    (this.orientation === 'horizontal' && this.width === 0));
    };
    BarComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], BarComponent.prototype, "fill", void 0);
    __decorate([
        Input()
    ], BarComponent.prototype, "data", void 0);
    __decorate([
        Input()
    ], BarComponent.prototype, "width", void 0);
    __decorate([
        Input()
    ], BarComponent.prototype, "height", void 0);
    __decorate([
        Input()
    ], BarComponent.prototype, "x", void 0);
    __decorate([
        Input()
    ], BarComponent.prototype, "y", void 0);
    __decorate([
        Input()
    ], BarComponent.prototype, "orientation", void 0);
    __decorate([
        Input()
    ], BarComponent.prototype, "roundEdges", void 0);
    __decorate([
        Input()
    ], BarComponent.prototype, "gradient", void 0);
    __decorate([
        Input()
    ], BarComponent.prototype, "offset", void 0);
    __decorate([
        Input()
    ], BarComponent.prototype, "isActive", void 0);
    __decorate([
        Input()
    ], BarComponent.prototype, "stops", void 0);
    __decorate([
        Input()
    ], BarComponent.prototype, "animations", void 0);
    __decorate([
        Input()
    ], BarComponent.prototype, "ariaLabel", void 0);
    __decorate([
        Input()
    ], BarComponent.prototype, "noBarWhenZero", void 0);
    __decorate([
        Output()
    ], BarComponent.prototype, "select", void 0);
    __decorate([
        Output()
    ], BarComponent.prototype, "activate", void 0);
    __decorate([
        Output()
    ], BarComponent.prototype, "deactivate", void 0);
    __decorate([
        HostListener('mouseenter')
    ], BarComponent.prototype, "onMouseEnter", null);
    __decorate([
        HostListener('mouseleave')
    ], BarComponent.prototype, "onMouseLeave", null);
    BarComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-bar]',
            template: "\n    <svg:defs *ngIf=\"hasGradient\">\n      <svg:g ngx-charts-svg-linear-gradient [orientation]=\"orientation\" [name]=\"gradientId\" [stops]=\"gradientStops\" />\n    </svg:defs>\n    <svg:path\n      class=\"bar\"\n      stroke=\"none\"\n      role=\"img\"\n      tabIndex=\"-1\"\n      [class.active]=\"isActive\"\n      [class.hidden]=\"hideBar\"\n      [attr.d]=\"path\"\n      [attr.aria-label]=\"ariaLabel\"\n      [attr.fill]=\"hasGradient ? gradientFill : fill\"\n      (click)=\"select.emit(data)\"\n    />\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], BarComponent);
    return BarComponent;
}());
export { BarComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2Jhci1jaGFydC9iYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFlBQVksRUFDWixVQUFVLEVBQ1YsYUFBYSxFQUNiLFNBQVMsRUFDVCx1QkFBdUIsRUFDeEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN0QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQTBCakM7SUE4QkUsc0JBQVksT0FBbUI7UUF0QnRCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUUxQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBRTdCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBUTFDLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzdCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFHdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxrQ0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN0QjtRQUNELElB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QUFqTUQsSUFpTUM7U0FqTVksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBPbkNoYW5nZXMsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgc2VsZWN0IH0gZnJvbSAnZDMtc2VsZWN0aW9uJztcclxuaW1wb3J0IHsgcm91bmRlZFJlY3QgfSBmcm9tICcuLi9jb21tb24vc2hhcGUuaGVscGVyJztcclxuaW1wb3J0IHsgaWQgfSBmcm9tICcuLi91dGlscy9pZCc7XHJcblxyXG4vKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgKi9cclxuaW1wb3J0IHsgdHJhbnNpdGlvbiB9IGZyb20gJ2QzLXRyYW5zaXRpb24nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtYmFyXScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxzdmc6ZGVmcyAqbmdJZj1cImhhc0dyYWRpZW50XCI+XHJcbiAgICAgIDxzdmc6ZyBuZ3gtY2hhcnRzLXN2Zy1saW5lYXItZ3JhZGllbnQgW29yaWVudGF0aW9uXT1cIm9yaWVudGF0aW9uXCIgW25hbWVdPVwiZ3JhZGllbnRJZFwiIFtzdG9wc109XCJncmFkaWVudFN0b3BzXCIgLz5cclxuICAgIDwvc3ZnOmRlZnM+XHJcbiAgICA8c3ZnOnBhdGhcclxuICAgICAgY2xhc3M9XCJiYXJcIlxyXG4gICAgICBzdHJva2U9XCJub25lXCJcclxuICAgICAgcm9sZT1cImltZ1wiXHJcbiAgICAgIHRhYkluZGV4PVwiLTFcIlxyXG4gICAgICBbY2xhc3MuYWN0aXZlXT1cImlzQWN0aXZlXCJcclxuICAgICAgW2NsYXNzLmhpZGRlbl09XCJoaWRlQmFyXCJcclxuICAgICAgW2F0dHIuZF09XCJwYXRoXCJcclxuICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIlxyXG4gICAgICBbYXR0ci5maWxsXT1cImhhc0dyYWRpZW50ID8gZ3JhZGllbnRGaWxsIDogZmlsbFwiXHJcbiAgICAgIChjbGljayk9XCJzZWxlY3QuZW1pdChkYXRhKVwiXHJcbiAgICAvPlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgZmlsbDtcclxuICBASW5wdXQoKSBkYXRhOiBhbnk7XHJcbiAgQElucHV0KCkgd2lkdGg6IG51bWJlcjtcclxuICBASW5wdXQoKSBoZWlnaHQ6IG51bWJlcjtcclxuICBASW5wdXQoKSB4OiBudW1iZXI7XHJcbiAgQElucHV0KCkgeTogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIG9yaWVudGF0aW9uO1xyXG4gIEBJbnB1dCgpIHJvdW5kRWRnZXM6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIGdyYWRpZW50OiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgb2Zmc2V0ID0gMDtcclxuICBASW5wdXQoKSBpc0FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHN0b3BzOiBhbnlbXTtcclxuICBASW5wdXQoKSBhbmltYXRpb25zOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSBhcmlhTGFiZWw6IHN0cmluZztcclxuICBASW5wdXQoKSBub0JhcldoZW5aZXJvOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGVsZW1lbnQ6IGFueTtcclxuICBwYXRoOiBhbnk7XHJcbiAgZ3JhZGllbnRJZDogYW55O1xyXG4gIGdyYWRpZW50RmlsbDogYW55O1xyXG4gIHN0YXJ0T3BhY2l0eTogYW55O1xyXG4gIGdyYWRpZW50U3RvcHM6IGFueVtdO1xyXG4gIGhhc0dyYWRpZW50OiBib29sZWFuID0gZmFsc2U7XHJcbiAgaGlkZUJhcjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBpZiAoY2hhbmdlcy5yb3VuZEVkZ2VzKSB7XHJcbiAgICAgIHRoaXMubG9hZEFuaW1hdGlvbigpO1xyXG4gICAgfVxyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuZ3JhZGllbnRJZCA9ICdncmFkJyArIGlkKCkudG9TdHJpbmcoKTtcclxuICAgIHRoaXMuZ3JhZGllbnRGaWxsID0gYHVybCgjJHt0aGlzLmdyYWRpZW50SWR9KWA7XHJcblxyXG4gICAgaWYgKHRoaXMuZ3JhZGllbnQgfHwgdGhpcy5zdG9wcykge1xyXG4gICAgICB0aGlzLmdyYWRpZW50U3RvcHMgPSB0aGlzLmdldEdyYWRpZW50KCk7XHJcbiAgICAgIHRoaXMuaGFzR3JhZGllbnQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5oYXNHcmFkaWVudCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXBkYXRlUGF0aEVsKCk7XHJcbiAgICB0aGlzLmNoZWNrVG9IaWRlQmFyKCk7XHJcbiAgfVxyXG5cclxuICBsb2FkQW5pbWF0aW9uKCk6IHZvaWQge1xyXG4gICAgdGhpcy5wYXRoID0gdGhpcy5nZXRTdGFydGluZ1BhdGgoKTtcclxuICAgIHNldFRpbWVvdXQodGhpcy51cGRhdGUuYmluZCh0aGlzKSwgMTAwKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVBhdGhFbCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IG5vZGUgPSBzZWxlY3QodGhpcy5lbGVtZW50KS5zZWxlY3QoJy5iYXInKTtcclxuICAgIGNvbnN0IHBhdGggPSB0aGlzLmdldFBhdGgoKTtcclxuICAgIGlmICh0aGlzLmFuaW1hdGlvbnMpIHtcclxuICAgICAgbm9kZVxyXG4gICAgICAgIC50cmFuc2l0aW9uKClcclxuICAgICAgICAuZHVyYXRpb24oNTAwKVxyXG4gICAgICAgIC5hdHRyKCdkJywgcGF0aCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBub2RlLmF0dHIoJ2QnLCBwYXRoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldEdyYWRpZW50KCkge1xyXG4gICAgaWYgKHRoaXMuc3RvcHMpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuc3RvcHM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFtcclxuICAgICAge1xyXG4gICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICBjb2xvcjogdGhpcy5maWxsLFxyXG4gICAgICAgIG9wYWNpdHk6IHRoaXMuZ2V0U3RhcnRPcGFjaXR5KClcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIG9mZnNldDogMTAwLFxyXG4gICAgICAgIGNvbG9yOiB0aGlzLmZpbGwsXHJcbiAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICB9XHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3RhcnRpbmdQYXRoKCkge1xyXG4gICAgaWYgKCF0aGlzLmFuaW1hdGlvbnMpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0UGF0aCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCByYWRpdXMgPSB0aGlzLmdldFJhZGl1cygpO1xyXG4gICAgbGV0IHBhdGg7XHJcblxyXG4gICAgaWYgKHRoaXMucm91bmRFZGdlcykge1xyXG4gICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xyXG4gICAgICAgIHJhZGl1cyA9IE1hdGgubWluKHRoaXMuaGVpZ2h0LCByYWRpdXMpO1xyXG4gICAgICAgIHBhdGggPSByb3VuZGVkUmVjdCh0aGlzLngsIHRoaXMueSArIHRoaXMuaGVpZ2h0LCB0aGlzLndpZHRoLCAxLCAwLCB0aGlzLmVkZ2VzKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcclxuICAgICAgICByYWRpdXMgPSBNYXRoLm1pbih0aGlzLndpZHRoLCByYWRpdXMpO1xyXG4gICAgICAgIHBhdGggPSByb3VuZGVkUmVjdCh0aGlzLngsIHRoaXMueSwgMSwgdGhpcy5oZWlnaHQsIDAsIHRoaXMuZWRnZXMpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xyXG4gICAgICAgIHBhdGggPSByb3VuZGVkUmVjdCh0aGlzLngsIHRoaXMueSArIHRoaXMuaGVpZ2h0LCB0aGlzLndpZHRoLCAxLCAwLCB0aGlzLmVkZ2VzKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcclxuICAgICAgICBwYXRoID0gcm91bmRlZFJlY3QodGhpcy54LCB0aGlzLnksIDEsIHRoaXMuaGVpZ2h0LCAwLCB0aGlzLmVkZ2VzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwYXRoO1xyXG4gIH1cclxuXHJcbiAgZ2V0UGF0aCgpIHtcclxuICAgIGxldCByYWRpdXMgPSB0aGlzLmdldFJhZGl1cygpO1xyXG4gICAgbGV0IHBhdGg7XHJcblxyXG4gICAgaWYgKHRoaXMucm91bmRFZGdlcykge1xyXG4gICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xyXG4gICAgICAgIHJhZGl1cyA9IE1hdGgubWluKHRoaXMuaGVpZ2h0LCByYWRpdXMpO1xyXG4gICAgICAgIHBhdGggPSByb3VuZGVkUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHJhZGl1cywgdGhpcy5lZGdlcyk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XHJcbiAgICAgICAgcmFkaXVzID0gTWF0aC5taW4odGhpcy53aWR0aCwgcmFkaXVzKTtcclxuICAgICAgICBwYXRoID0gcm91bmRlZFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCByYWRpdXMsIHRoaXMuZWRnZXMpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwYXRoID0gcm91bmRlZFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCByYWRpdXMsIHRoaXMuZWRnZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwYXRoO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmFkaXVzKCk6IG51bWJlciB7XHJcbiAgICBsZXQgcmFkaXVzID0gMDtcclxuXHJcbiAgICBpZiAodGhpcy5yb3VuZEVkZ2VzICYmIHRoaXMuaGVpZ2h0ID4gNSAmJiB0aGlzLndpZHRoID4gNSkge1xyXG4gICAgICByYWRpdXMgPSBNYXRoLmZsb29yKE1hdGgubWluKDUsIHRoaXMuaGVpZ2h0IC8gMiwgdGhpcy53aWR0aCAvIDIpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmFkaXVzO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3RhcnRPcGFjaXR5KCk6IG51bWJlciB7XHJcbiAgICBpZiAodGhpcy5yb3VuZEVkZ2VzKSB7XHJcbiAgICAgIHJldHVybiAwLjI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gMC41O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IGVkZ2VzKCkge1xyXG4gICAgbGV0IGVkZ2VzID0gW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXTtcclxuICAgIGlmICh0aGlzLnJvdW5kRWRnZXMpIHtcclxuICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICBpZiAodGhpcy5kYXRhLnZhbHVlID4gMCkge1xyXG4gICAgICAgICAgZWRnZXMgPSBbdHJ1ZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZWRnZXMgPSBbZmFsc2UsIGZhbHNlLCB0cnVlLCB0cnVlXTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS52YWx1ZSA+IDApIHtcclxuICAgICAgICAgIGVkZ2VzID0gW2ZhbHNlLCB0cnVlLCBmYWxzZSwgdHJ1ZV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGVkZ2VzID0gW3RydWUsIGZhbHNlLCB0cnVlLCBmYWxzZV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZWRnZXM7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcclxuICBvbk1vdXNlRW50ZXIoKTogdm9pZCB7XHJcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQodGhpcy5kYXRhKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxyXG4gIG9uTW91c2VMZWF2ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuZGVhY3RpdmF0ZS5lbWl0KHRoaXMuZGF0YSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNoZWNrVG9IaWRlQmFyKCkge1xyXG4gICAgdGhpcy5oaWRlQmFyID1cclxuICAgICAgdGhpcy5ub0JhcldoZW5aZXJvICYmXHJcbiAgICAgICgodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJyAmJiB0aGlzLmhlaWdodCA9PT0gMCkgfHxcclxuICAgICAgICAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnICYmIHRoaXMud2lkdGggPT09IDApKTtcclxuICB9XHJcbn1cclxuIl19