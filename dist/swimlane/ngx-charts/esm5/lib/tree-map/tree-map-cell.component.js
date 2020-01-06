import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { select } from 'd3-selection';
import { invertColor } from '../utils/color-utils';
import { trimLabel } from '../common/trim-label.helper';
import { escapeLabel } from '../common/label.helper';
import { id } from '../utils/id';
var TreeMapCellComponent = /** @class */ (function () {
    function TreeMapCellComponent(element) {
        this.gradient = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    TreeMapCellComponent.prototype.ngOnChanges = function () {
        this.update();
        this.valueFormatting = this.valueFormatting || (function (value) { return value.toLocaleString(); });
        var labelFormatting = this.labelFormatting || (function (cell) { return escapeLabel(trimLabel(cell.label, 55)); });
        var cellData = {
            data: this.data,
            label: this.label,
            value: this.value
        };
        this.formattedValue = this.valueFormatting(cellData.value);
        this.formattedLabel = labelFormatting(cellData);
        this.gradientId = 'grad' + id().toString();
        this.gradientUrl = "url(#" + this.gradientId + ")";
        this.gradientStops = this.getGradientStops();
    };
    TreeMapCellComponent.prototype.update = function () {
        if (this.initialized) {
            this.animateToCurrentForm();
        }
        else {
            if (this.animations) {
                this.loadAnimation();
            }
            this.initialized = true;
        }
    };
    TreeMapCellComponent.prototype.loadAnimation = function () {
        var node = select(this.element).select('.cell');
        node
            .attr('opacity', 0)
            .attr('x', this.x)
            .attr('y', this.y);
        this.animateToCurrentForm();
    };
    TreeMapCellComponent.prototype.getTextColor = function () {
        return invertColor(this.fill);
    };
    TreeMapCellComponent.prototype.animateToCurrentForm = function () {
        var node = select(this.element).select('.cell');
        if (this.animations) {
            node
                .transition()
                .duration(750)
                .attr('opacity', 1)
                .attr('x', this.x)
                .attr('y', this.y)
                .attr('width', this.width)
                .attr('height', this.height);
        }
        else {
            node
                .attr('opacity', 1)
                .attr('x', this.x)
                .attr('y', this.y)
                .attr('width', this.width)
                .attr('height', this.height);
        }
    };
    TreeMapCellComponent.prototype.onClick = function () {
        this.select.emit(this.data);
    };
    TreeMapCellComponent.prototype.getGradientStops = function () {
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: 0.3
            },
            {
                offset: 100,
                color: this.fill,
                opacity: 1
            }
        ];
    };
    TreeMapCellComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], TreeMapCellComponent.prototype, "data", void 0);
    __decorate([
        Input()
    ], TreeMapCellComponent.prototype, "fill", void 0);
    __decorate([
        Input()
    ], TreeMapCellComponent.prototype, "x", void 0);
    __decorate([
        Input()
    ], TreeMapCellComponent.prototype, "y", void 0);
    __decorate([
        Input()
    ], TreeMapCellComponent.prototype, "width", void 0);
    __decorate([
        Input()
    ], TreeMapCellComponent.prototype, "height", void 0);
    __decorate([
        Input()
    ], TreeMapCellComponent.prototype, "label", void 0);
    __decorate([
        Input()
    ], TreeMapCellComponent.prototype, "value", void 0);
    __decorate([
        Input()
    ], TreeMapCellComponent.prototype, "valueType", void 0);
    __decorate([
        Input()
    ], TreeMapCellComponent.prototype, "valueFormatting", void 0);
    __decorate([
        Input()
    ], TreeMapCellComponent.prototype, "labelFormatting", void 0);
    __decorate([
        Input()
    ], TreeMapCellComponent.prototype, "gradient", void 0);
    __decorate([
        Input()
    ], TreeMapCellComponent.prototype, "animations", void 0);
    __decorate([
        Output()
    ], TreeMapCellComponent.prototype, "select", void 0);
    TreeMapCellComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-tree-map-cell]',
            template: "\n    <svg:g>\n      <defs *ngIf=\"gradient\">\n        <svg:g ngx-charts-svg-linear-gradient orientation=\"vertical\" [name]=\"gradientId\" [stops]=\"gradientStops\" />\n      </defs>\n      <svg:rect\n        [attr.fill]=\"gradient ? gradientUrl : fill\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        [attr.x]=\"x\"\n        [attr.y]=\"y\"\n        [style.cursor]=\"'pointer'\"\n        class=\"cell\"\n        (click)=\"onClick()\"\n      />\n      <svg:foreignObject\n        *ngIf=\"width >= 70 && height >= 35\"\n        [attr.x]=\"x\"\n        [attr.y]=\"y\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        class=\"treemap-label\"\n        [style.pointer-events]=\"'none'\"\n      >\n        <xhtml:p [style.color]=\"getTextColor()\" [style.height]=\"height + 'px'\" [style.width]=\"width + 'px'\">\n          <xhtml:span class=\"treemap-label\" [innerHTML]=\"formattedLabel\"> </xhtml:span>\n          <xhtml:br />\n          <xhtml:span\n            *ngIf=\"animations\"\n            class=\"treemap-val\"\n            ngx-charts-count-up\n            [countTo]=\"value\"\n            [valueFormatting]=\"valueFormatting\"\n          >\n          </xhtml:span>\n          <xhtml:span *ngIf=\"!animations\" class=\"treemap-val\">\n            {{ formattedValue }}\n          </xhtml:span>\n        </xhtml:p>\n      </svg:foreignObject>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], TreeMapCellComponent);
    return TreeMapCellComponent;
}());
export { TreeMapCellComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1tYXAtY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi90cmVlLW1hcC90cmVlLW1hcC1jZWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZILE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFdEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQWdEakM7SUEyQkUsOEJBQVksT0FBbUI7UUFmdEIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTFCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBVXRDLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBRzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUN2QyxDQUFDO0lBRUQsMENBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVkLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLGNBQWMsRUFBRSxFQUF0QixDQUFzQixDQUFDLENBQUM7UUFDakYsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQXRDLENBQXNDLENBQUMsQ0FBQztRQUVqRyxJQUFNLFFBQVEsR0FBRztZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDbEIsQ0FBQztRQUVGLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFaEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLEdBQUcsRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFRLElBQUksQ0FBQyxVQUFVLE1BQUcsQ0FBQztRQUM5QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRCxxQ0FBTSxHQUFOO1FBQ0UsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQzdCO2FBQU07WUFDTCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUN0QjtZQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUVELDRDQUFhLEdBQWI7UUFDRSxJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVsRCxJQUFJO2FBQ0QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7YUFDbEIsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ2pCLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXJCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCwyQ0FBWSxHQUFaO1FBQ0UsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxtREFBb0IsR0FBcEI7UUFDRSxJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVsRCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSTtpQkFDRCxVQUFVLEVBQUU7aUJBQ1osUUFBUSxDQUFDLEdBQUcsQ0FBQztpQkFDYixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztpQkFDbEIsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUNqQixJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQ2pCLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztpQkFDekIsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDaEM7YUFBTTtZQUNMLElBQUk7aUJBQ0QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7aUJBQ2xCLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDakIsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUNqQixJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7aUJBQ3pCLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQztJQUVELHNDQUFPLEdBQVA7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELCtDQUFnQixHQUFoQjtRQUNFLE9BQU87WUFDTDtnQkFDRSxNQUFNLEVBQUUsQ0FBQztnQkFDVCxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2hCLE9BQU8sRUFBRSxHQUFHO2FBQ2I7WUFDRDtnQkFDRSxNQUFNLEVBQUUsR0FBRztnQkFDWCxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2hCLE9BQU8sRUFBRSxDQUFDO2FBQ1g7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Z0JBekZvQixVQUFVOztJQTFCdEI7UUFBUixLQUFLLEVBQUU7c0RBQU07SUFDTDtRQUFSLEtBQUssRUFBRTtzREFBTTtJQUNMO1FBQVIsS0FBSyxFQUFFO21EQUFHO0lBQ0Y7UUFBUixLQUFLLEVBQUU7bURBQUc7SUFDRjtRQUFSLEtBQUssRUFBRTt1REFBTztJQUNOO1FBQVIsS0FBSyxFQUFFO3dEQUFRO0lBQ1A7UUFBUixLQUFLLEVBQUU7dURBQU87SUFDTjtRQUFSLEtBQUssRUFBRTt1REFBTztJQUNOO1FBQVIsS0FBSyxFQUFFOzJEQUFXO0lBQ1Y7UUFBUixLQUFLLEVBQUU7aUVBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFO2lFQUFzQjtJQUNyQjtRQUFSLEtBQUssRUFBRTswREFBMkI7SUFDMUI7UUFBUixLQUFLLEVBQUU7NERBQTRCO0lBRTFCO1FBQVQsTUFBTSxFQUFFO3dEQUE2QjtJQWYzQixvQkFBb0I7UUE5Q2hDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSw2QkFBNkI7WUFDdkMsUUFBUSxFQUFFLDQ0Q0F5Q1Q7WUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO09BQ1csb0JBQW9CLENBcUhoQztJQUFELDJCQUFDO0NBQUEsQUFySEQsSUFxSEM7U0FySFksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIE9uQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgc2VsZWN0IH0gZnJvbSAnZDMtc2VsZWN0aW9uJztcclxuXHJcbmltcG9ydCB7IGludmVydENvbG9yIH0gZnJvbSAnLi4vdXRpbHMvY29sb3ItdXRpbHMnO1xyXG5pbXBvcnQgeyB0cmltTGFiZWwgfSBmcm9tICcuLi9jb21tb24vdHJpbS1sYWJlbC5oZWxwZXInO1xyXG5pbXBvcnQgeyBlc2NhcGVMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbC5oZWxwZXInO1xyXG5pbXBvcnQgeyBpZCB9IGZyb20gJy4uL3V0aWxzL2lkJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLXRyZWUtbWFwLWNlbGxdJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHN2ZzpnPlxyXG4gICAgICA8ZGVmcyAqbmdJZj1cImdyYWRpZW50XCI+XHJcbiAgICAgICAgPHN2ZzpnIG5neC1jaGFydHMtc3ZnLWxpbmVhci1ncmFkaWVudCBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCIgW25hbWVdPVwiZ3JhZGllbnRJZFwiIFtzdG9wc109XCJncmFkaWVudFN0b3BzXCIgLz5cclxuICAgICAgPC9kZWZzPlxyXG4gICAgICA8c3ZnOnJlY3RcclxuICAgICAgICBbYXR0ci5maWxsXT1cImdyYWRpZW50ID8gZ3JhZGllbnRVcmwgOiBmaWxsXCJcclxuICAgICAgICBbYXR0ci53aWR0aF09XCJ3aWR0aFwiXHJcbiAgICAgICAgW2F0dHIuaGVpZ2h0XT1cImhlaWdodFwiXHJcbiAgICAgICAgW2F0dHIueF09XCJ4XCJcclxuICAgICAgICBbYXR0ci55XT1cInlcIlxyXG4gICAgICAgIFtzdHlsZS5jdXJzb3JdPVwiJ3BvaW50ZXInXCJcclxuICAgICAgICBjbGFzcz1cImNlbGxcIlxyXG4gICAgICAgIChjbGljayk9XCJvbkNsaWNrKClcIlxyXG4gICAgICAvPlxyXG4gICAgICA8c3ZnOmZvcmVpZ25PYmplY3RcclxuICAgICAgICAqbmdJZj1cIndpZHRoID49IDcwICYmIGhlaWdodCA+PSAzNVwiXHJcbiAgICAgICAgW2F0dHIueF09XCJ4XCJcclxuICAgICAgICBbYXR0ci55XT1cInlcIlxyXG4gICAgICAgIFthdHRyLndpZHRoXT1cIndpZHRoXCJcclxuICAgICAgICBbYXR0ci5oZWlnaHRdPVwiaGVpZ2h0XCJcclxuICAgICAgICBjbGFzcz1cInRyZWVtYXAtbGFiZWxcIlxyXG4gICAgICAgIFtzdHlsZS5wb2ludGVyLWV2ZW50c109XCInbm9uZSdcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPHhodG1sOnAgW3N0eWxlLmNvbG9yXT1cImdldFRleHRDb2xvcigpXCIgW3N0eWxlLmhlaWdodF09XCJoZWlnaHQgKyAncHgnXCIgW3N0eWxlLndpZHRoXT1cIndpZHRoICsgJ3B4J1wiPlxyXG4gICAgICAgICAgPHhodG1sOnNwYW4gY2xhc3M9XCJ0cmVlbWFwLWxhYmVsXCIgW2lubmVySFRNTF09XCJmb3JtYXR0ZWRMYWJlbFwiPiA8L3hodG1sOnNwYW4+XHJcbiAgICAgICAgICA8eGh0bWw6YnIgLz5cclxuICAgICAgICAgIDx4aHRtbDpzcGFuXHJcbiAgICAgICAgICAgICpuZ0lmPVwiYW5pbWF0aW9uc1wiXHJcbiAgICAgICAgICAgIGNsYXNzPVwidHJlZW1hcC12YWxcIlxyXG4gICAgICAgICAgICBuZ3gtY2hhcnRzLWNvdW50LXVwXHJcbiAgICAgICAgICAgIFtjb3VudFRvXT1cInZhbHVlXCJcclxuICAgICAgICAgICAgW3ZhbHVlRm9ybWF0dGluZ109XCJ2YWx1ZUZvcm1hdHRpbmdcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgPC94aHRtbDpzcGFuPlxyXG4gICAgICAgICAgPHhodG1sOnNwYW4gKm5nSWY9XCIhYW5pbWF0aW9uc1wiIGNsYXNzPVwidHJlZW1hcC12YWxcIj5cclxuICAgICAgICAgICAge3sgZm9ybWF0dGVkVmFsdWUgfX1cclxuICAgICAgICAgIDwveGh0bWw6c3Bhbj5cclxuICAgICAgICA8L3hodG1sOnA+XHJcbiAgICAgIDwvc3ZnOmZvcmVpZ25PYmplY3Q+XHJcbiAgICA8L3N2ZzpnPlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFRyZWVNYXBDZWxsQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBkYXRhO1xyXG4gIEBJbnB1dCgpIGZpbGw7XHJcbiAgQElucHV0KCkgeDtcclxuICBASW5wdXQoKSB5O1xyXG4gIEBJbnB1dCgpIHdpZHRoO1xyXG4gIEBJbnB1dCgpIGhlaWdodDtcclxuICBASW5wdXQoKSBsYWJlbDtcclxuICBASW5wdXQoKSB2YWx1ZTtcclxuICBASW5wdXQoKSB2YWx1ZVR5cGU7XHJcbiAgQElucHV0KCkgdmFsdWVGb3JtYXR0aW5nOiBhbnk7XHJcbiAgQElucHV0KCkgbGFiZWxGb3JtYXR0aW5nOiBhbnk7XHJcbiAgQElucHV0KCkgZ3JhZGllbnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSBhbmltYXRpb25zOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgZ3JhZGllbnRTdG9wczogYW55W107XHJcbiAgZ3JhZGllbnRJZDogc3RyaW5nO1xyXG4gIGdyYWRpZW50VXJsOiBzdHJpbmc7XHJcblxyXG4gIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gIHRyYW5zZm9ybTogc3RyaW5nO1xyXG4gIGZvcm1hdHRlZExhYmVsOiBzdHJpbmc7XHJcbiAgZm9ybWF0dGVkVmFsdWU6IHN0cmluZztcclxuICBpbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcclxuICAgIHRoaXMudXBkYXRlKCk7XHJcblxyXG4gICAgdGhpcy52YWx1ZUZvcm1hdHRpbmcgPSB0aGlzLnZhbHVlRm9ybWF0dGluZyB8fCAodmFsdWUgPT4gdmFsdWUudG9Mb2NhbGVTdHJpbmcoKSk7XHJcbiAgICBjb25zdCBsYWJlbEZvcm1hdHRpbmcgPSB0aGlzLmxhYmVsRm9ybWF0dGluZyB8fCAoY2VsbCA9PiBlc2NhcGVMYWJlbCh0cmltTGFiZWwoY2VsbC5sYWJlbCwgNTUpKSk7XHJcblxyXG4gICAgY29uc3QgY2VsbERhdGEgPSB7XHJcbiAgICAgIGRhdGE6IHRoaXMuZGF0YSxcclxuICAgICAgbGFiZWw6IHRoaXMubGFiZWwsXHJcbiAgICAgIHZhbHVlOiB0aGlzLnZhbHVlXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZm9ybWF0dGVkVmFsdWUgPSB0aGlzLnZhbHVlRm9ybWF0dGluZyhjZWxsRGF0YS52YWx1ZSk7XHJcbiAgICB0aGlzLmZvcm1hdHRlZExhYmVsID0gbGFiZWxGb3JtYXR0aW5nKGNlbGxEYXRhKTtcclxuXHJcbiAgICB0aGlzLmdyYWRpZW50SWQgPSAnZ3JhZCcgKyBpZCgpLnRvU3RyaW5nKCk7XHJcbiAgICB0aGlzLmdyYWRpZW50VXJsID0gYHVybCgjJHt0aGlzLmdyYWRpZW50SWR9KWA7XHJcbiAgICB0aGlzLmdyYWRpZW50U3RvcHMgPSB0aGlzLmdldEdyYWRpZW50U3RvcHMoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XHJcbiAgICAgIHRoaXMuYW5pbWF0ZVRvQ3VycmVudEZvcm0oKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLmFuaW1hdGlvbnMpIHtcclxuICAgICAgICB0aGlzLmxvYWRBbmltYXRpb24oKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxvYWRBbmltYXRpb24oKTogdm9pZCB7XHJcbiAgICBjb25zdCBub2RlID0gc2VsZWN0KHRoaXMuZWxlbWVudCkuc2VsZWN0KCcuY2VsbCcpO1xyXG5cclxuICAgIG5vZGVcclxuICAgICAgLmF0dHIoJ29wYWNpdHknLCAwKVxyXG4gICAgICAuYXR0cigneCcsIHRoaXMueClcclxuICAgICAgLmF0dHIoJ3knLCB0aGlzLnkpO1xyXG5cclxuICAgIHRoaXMuYW5pbWF0ZVRvQ3VycmVudEZvcm0oKTtcclxuICB9XHJcblxyXG4gIGdldFRleHRDb2xvcigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGludmVydENvbG9yKHRoaXMuZmlsbCk7XHJcbiAgfVxyXG5cclxuICBhbmltYXRlVG9DdXJyZW50Rm9ybSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IG5vZGUgPSBzZWxlY3QodGhpcy5lbGVtZW50KS5zZWxlY3QoJy5jZWxsJyk7XHJcblxyXG4gICAgaWYgKHRoaXMuYW5pbWF0aW9ucykge1xyXG4gICAgICBub2RlXHJcbiAgICAgICAgLnRyYW5zaXRpb24oKVxyXG4gICAgICAgIC5kdXJhdGlvbig3NTApXHJcbiAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAxKVxyXG4gICAgICAgIC5hdHRyKCd4JywgdGhpcy54KVxyXG4gICAgICAgIC5hdHRyKCd5JywgdGhpcy55KVxyXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMud2lkdGgpXHJcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5vZGVcclxuICAgICAgICAuYXR0cignb3BhY2l0eScsIDEpXHJcbiAgICAgICAgLmF0dHIoJ3gnLCB0aGlzLngpXHJcbiAgICAgICAgLmF0dHIoJ3knLCB0aGlzLnkpXHJcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy53aWR0aClcclxuICAgICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25DbGljaygpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0LmVtaXQodGhpcy5kYXRhKTtcclxuICB9XHJcblxyXG4gIGdldEdyYWRpZW50U3RvcHMoKSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICB7XHJcbiAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgIGNvbG9yOiB0aGlzLmZpbGwsXHJcbiAgICAgICAgb3BhY2l0eTogMC4zXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBvZmZzZXQ6IDEwMCxcclxuICAgICAgICBjb2xvcjogdGhpcy5maWxsLFxyXG4gICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgfVxyXG4gICAgXTtcclxuICB9XHJcbn1cclxuIl19