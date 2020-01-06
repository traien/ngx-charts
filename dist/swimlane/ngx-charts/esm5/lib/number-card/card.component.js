import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ElementRef, SimpleChanges, OnChanges, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, NgZone, OnDestroy } from '@angular/core';
import { trimLabel } from '../common/trim-label.helper';
import { roundedRect } from '../common/shape.helper';
import { count, decimalChecker } from '../common/count';
import { escapeLabel } from '../common/label.helper';
var CardComponent = /** @class */ (function () {
    function CardComponent(element, cd, zone) {
        this.cd = cd;
        this.zone = zone;
        this.animations = true;
        this.select = new EventEmitter();
        this.value = '';
        this.textFontSize = 12;
        this.textTransform = '';
        this.initialized = false;
        this.bandHeight = 10;
        this.textPadding = [10, 20, 5, 20];
        this.labelFontSize = 15;
        this.element = element.nativeElement;
    }
    CardComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    CardComponent.prototype.ngOnDestroy = function () {
        cancelAnimationFrame(this.animationReq);
    };
    CardComponent.prototype.update = function () {
        var _this = this;
        this.zone.run(function () {
            var hasValue = _this.data && typeof _this.data.value !== 'undefined';
            var valueFormatting = _this.valueFormatting || (function (card) { return card.value.toLocaleString(); });
            var labelFormatting = _this.labelFormatting || (function (card) { return escapeLabel(trimLabel(card.label, 55)); });
            _this.transform = "translate(" + _this.x + " , " + _this.y + ")";
            _this.textWidth = Math.max(0, _this.width) - _this.textPadding[1] - _this.textPadding[3];
            _this.cardWidth = Math.max(0, _this.width);
            _this.cardHeight = Math.max(0, _this.height);
            _this.label = _this.label ? _this.label : _this.data.name;
            var cardData = {
                label: _this.label,
                data: _this.data,
                value: _this.data.value
            };
            _this.formattedLabel = labelFormatting(cardData);
            _this.transformBand = "translate(0 , " + (_this.cardHeight - _this.bandHeight) + ")";
            var value = hasValue ? valueFormatting(cardData) : '';
            _this.value = _this.paddedValue(value);
            _this.setPadding();
            _this.bandPath = roundedRect(0, 0, _this.cardWidth, _this.bandHeight, 3, [false, false, true, true]);
            setTimeout(function () {
                _this.scaleText();
                _this.value = value;
                if (hasValue && !_this.initialized) {
                    setTimeout(function () { return _this.startCount(); }, 20);
                }
            }, 8);
        });
    };
    CardComponent.prototype.paddedValue = function (value) {
        if (this.medianSize && this.medianSize > value.length) {
            value += '\u2007'.repeat(this.medianSize - value.length);
        }
        return value;
    };
    CardComponent.prototype.startCount = function () {
        var _this = this;
        if (!this.initialized && this.animations) {
            cancelAnimationFrame(this.animationReq);
            var val_1 = this.data.value;
            var decs = decimalChecker(val_1);
            var valueFormatting_1 = this.valueFormatting || (function (card) { return card.value.toLocaleString(); });
            var callback = function (_a) {
                var value = _a.value, finished = _a.finished;
                _this.zone.run(function () {
                    value = finished ? val_1 : value;
                    _this.value = valueFormatting_1({ label: _this.label, data: _this.data, value: value });
                    if (!finished) {
                        _this.value = _this.paddedValue(_this.value);
                    }
                    _this.cd.markForCheck();
                });
            };
            this.animationReq = count(0, val_1, decs, 1, callback);
            this.initialized = true;
        }
    };
    CardComponent.prototype.scaleText = function () {
        var _this = this;
        this.zone.run(function () {
            var _a = _this.textEl.nativeElement.getBoundingClientRect(), width = _a.width, height = _a.height;
            if (width === 0 || height === 0) {
                return;
            }
            var textPadding = (_this.textPadding[1] = _this.textPadding[3] = _this.cardWidth / 8);
            var availableWidth = _this.cardWidth - 2 * textPadding;
            var availableHeight = _this.cardHeight / 3;
            var resizeScale = Math.min(availableWidth / width, availableHeight / height);
            _this.textFontSize = Math.floor(_this.textFontSize * resizeScale);
            _this.labelFontSize = Math.min(_this.textFontSize, 15);
            _this.setPadding();
            _this.cd.markForCheck();
        });
    };
    CardComponent.prototype.setPadding = function () {
        this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8;
        var padding = this.cardHeight / 2;
        this.textPadding[0] = padding - this.textFontSize - this.labelFontSize / 2;
        this.textPadding[2] = padding - this.labelFontSize;
    };
    CardComponent.prototype.onClick = function () {
        this.select.emit(this.data);
    };
    CardComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input()
    ], CardComponent.prototype, "color", void 0);
    __decorate([
        Input()
    ], CardComponent.prototype, "bandColor", void 0);
    __decorate([
        Input()
    ], CardComponent.prototype, "textColor", void 0);
    __decorate([
        Input()
    ], CardComponent.prototype, "x", void 0);
    __decorate([
        Input()
    ], CardComponent.prototype, "y", void 0);
    __decorate([
        Input()
    ], CardComponent.prototype, "width", void 0);
    __decorate([
        Input()
    ], CardComponent.prototype, "height", void 0);
    __decorate([
        Input()
    ], CardComponent.prototype, "label", void 0);
    __decorate([
        Input()
    ], CardComponent.prototype, "data", void 0);
    __decorate([
        Input()
    ], CardComponent.prototype, "medianSize", void 0);
    __decorate([
        Input()
    ], CardComponent.prototype, "valueFormatting", void 0);
    __decorate([
        Input()
    ], CardComponent.prototype, "labelFormatting", void 0);
    __decorate([
        Input()
    ], CardComponent.prototype, "animations", void 0);
    __decorate([
        Output()
    ], CardComponent.prototype, "select", void 0);
    __decorate([
        ViewChild('textEl', { static: false })
    ], CardComponent.prototype, "textEl", void 0);
    CardComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-card]',
            template: "\n    <svg:g [attr.transform]=\"transform\" class=\"cell\" (click)=\"onClick()\">\n      <svg:rect class=\"card\" [style.fill]=\"color\" [attr.width]=\"cardWidth\" [attr.height]=\"cardHeight\" rx=\"3\" ry=\"3\" />\n      <svg:path\n        *ngIf=\"bandColor && bandColor !== color\"\n        class=\"card-band\"\n        [attr.fill]=\"bandColor\"\n        [attr.transform]=\"transformBand\"\n        stroke=\"none\"\n        [attr.d]=\"bandPath\"\n      />\n      <title>{{ label }}</title>\n      <svg:foreignObject\n        class=\"trimmed-label\"\n        x=\"5\"\n        [attr.x]=\"textPadding[3]\"\n        [attr.y]=\"cardHeight - textPadding[2]\"\n        [attr.width]=\"textWidth\"\n        [attr.height]=\"labelFontSize + textPadding[2]\"\n        alignment-baseline=\"hanging\"\n      >\n        <xhtml:p\n          [style.color]=\"textColor\"\n          [style.fontSize.px]=\"labelFontSize\"\n          [style.lineHeight.px]=\"labelFontSize\"\n          [innerHTML]=\"formattedLabel\"\n        >\n        </xhtml:p>\n      </svg:foreignObject>\n      <svg:text\n        #textEl\n        class=\"value-text\"\n        [attr.x]=\"textPadding[3]\"\n        [attr.y]=\"textPadding[0]\"\n        [style.fill]=\"textColor\"\n        text-anchor=\"start\"\n        alignment-baseline=\"hanging\"\n        [style.font-size.pt]=\"textFontSize\"\n      >\n        {{ value }}\n      </svg:text>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], CardComponent);
    return CardComponent;
}());
export { CardComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9udW1iZXItY2FyZC9jYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixVQUFVLEVBQ1YsYUFBYSxFQUNiLFNBQVMsRUFDVCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixNQUFNLEVBQ04sU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFpRHJEO0lBdUNFLHVCQUFZLE9BQW1CLEVBQVUsRUFBcUIsRUFBVSxJQUFZO1FBQTNDLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQXpCM0UsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUxQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUt0QyxVQUFLLEdBQVcsRUFBRSxDQUFDO1FBTW5CLGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBQzFCLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBQzNCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBRzdCLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFFeEIsZ0JBQVcsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBS2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUN2QyxDQUFDO0lBRUQsbUNBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsbUNBQVcsR0FBWDtRQUNFLG9CQUFvQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsOEJBQU0sR0FBTjtRQUFBLGlCQXNDQztRQXJDQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNaLElBQU0sUUFBUSxHQUFHLEtBQUksQ0FBQyxJQUFJLElBQUksT0FBTyxLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxXQUFXLENBQUM7WUFDckUsSUFBTSxlQUFlLEdBQUcsS0FBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDO1lBQ3RGLElBQU0sZUFBZSxHQUFHLEtBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUF0QyxDQUFzQyxDQUFDLENBQUM7WUFFakcsS0FBSSxDQUFDLFNBQVMsR0FBRyxlQUFhLEtBQUksQ0FBQyxDQUFDLFdBQU0sS0FBSSxDQUFDLENBQUMsTUFBRyxDQUFDO1lBRXBELEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRixLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QyxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUUzQyxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBRXRELElBQU0sUUFBUSxHQUFHO2dCQUNmLEtBQUssRUFBRSxLQUFJLENBQUMsS0FBSztnQkFDakIsSUFBSSxFQUFFLEtBQUksQ0FBQyxJQUFJO2dCQUNmLEtBQUssRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUs7YUFDdkIsQ0FBQztZQUVGLEtBQUksQ0FBQyxjQUFjLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hELEtBQUksQ0FBQyxhQUFhLEdBQUcsb0JBQWlCLEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSSxDQUFDLFVBQVUsT0FBRyxDQUFDO1lBRTNFLElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFFeEQsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUVsQixLQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBRWxHLFVBQVUsQ0FBQztnQkFDVCxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUNuQixJQUFJLFFBQVEsSUFBSSxDQUFDLEtBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQ2pDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFVBQVUsRUFBRSxFQUFqQixDQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUN6QztZQUNILENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG1DQUFXLEdBQVgsVUFBWSxLQUFhO1FBQ3ZCLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDckQsS0FBSyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDMUQ7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxrQ0FBVSxHQUFWO1FBQUEsaUJBc0JDO1FBckJDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDeEMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRXhDLElBQU0sS0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzVCLElBQU0sSUFBSSxHQUFHLGNBQWMsQ0FBQyxLQUFHLENBQUMsQ0FBQztZQUNqQyxJQUFNLGlCQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDO1lBRXRGLElBQU0sUUFBUSxHQUFHLFVBQUMsRUFBbUI7b0JBQWpCLGdCQUFLLEVBQUUsc0JBQVE7Z0JBQ2pDLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUNaLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO29CQUMvQixLQUFJLENBQUMsS0FBSyxHQUFHLGlCQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLElBQUksRUFBRSxLQUFLLE9BQUEsRUFBRSxDQUFDLENBQUM7b0JBQzVFLElBQUksQ0FBQyxRQUFRLEVBQUU7d0JBQ2IsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDM0M7b0JBQ0QsS0FBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDekIsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUM7WUFFRixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBRUQsaUNBQVMsR0FBVDtRQUFBLGlCQWtCQztRQWpCQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNOLElBQUEsdURBQXFFLEVBQW5FLGdCQUFLLEVBQUUsa0JBQTRELENBQUM7WUFDNUUsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQy9CLE9BQU87YUFDUjtZQUVELElBQU0sV0FBVyxHQUFHLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDckYsSUFBTSxjQUFjLEdBQUcsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFDO1lBQ3hELElBQU0sZUFBZSxHQUFHLEtBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBRTVDLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLEtBQUssRUFBRSxlQUFlLEdBQUcsTUFBTSxDQUFDLENBQUM7WUFDL0UsS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLENBQUM7WUFDaEUsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFckQsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xCLEtBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsa0NBQVUsR0FBVjtRQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUMvRCxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDckQsQ0FBQztJQUVELCtCQUFPLEdBQVA7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7Z0JBaEhvQixVQUFVO2dCQUFjLGlCQUFpQjtnQkFBZ0IsTUFBTTs7SUF0QzNFO1FBQVIsS0FBSyxFQUFFO2dEQUFPO0lBQ047UUFBUixLQUFLLEVBQUU7b0RBQVc7SUFDVjtRQUFSLEtBQUssRUFBRTtvREFBVztJQUVWO1FBQVIsS0FBSyxFQUFFOzRDQUFHO0lBQ0Y7UUFBUixLQUFLLEVBQUU7NENBQUc7SUFDRjtRQUFSLEtBQUssRUFBRTtnREFBTztJQUNOO1FBQVIsS0FBSyxFQUFFO2lEQUFRO0lBQ1A7UUFBUixLQUFLLEVBQUU7Z0RBQU87SUFDTjtRQUFSLEtBQUssRUFBRTsrQ0FBTTtJQUNMO1FBQVIsS0FBSyxFQUFFO3FEQUFvQjtJQUNuQjtRQUFSLEtBQUssRUFBRTswREFBc0I7SUFDckI7UUFBUixLQUFLLEVBQUU7MERBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFO3FEQUE0QjtJQUUxQjtRQUFULE1BQU0sRUFBRTtpREFBNkI7SUFFRTtRQUF2QyxTQUFTLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO2lEQUFvQjtJQWxCaEQsYUFBYTtRQS9DekIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QixRQUFRLEVBQUUsdTRDQTBDVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FDVyxhQUFhLENBd0p6QjtJQUFELG9CQUFDO0NBQUEsQUF4SkQsSUF3SkM7U0F4SlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgRWxlbWVudFJlZixcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBWaWV3Q2hpbGQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgTmdab25lLFxyXG4gIE9uRGVzdHJveVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyB0cmltTGFiZWwgfSBmcm9tICcuLi9jb21tb24vdHJpbS1sYWJlbC5oZWxwZXInO1xyXG5pbXBvcnQgeyByb3VuZGVkUmVjdCB9IGZyb20gJy4uL2NvbW1vbi9zaGFwZS5oZWxwZXInO1xyXG5pbXBvcnQgeyBjb3VudCwgZGVjaW1hbENoZWNrZXIgfSBmcm9tICcuLi9jb21tb24vY291bnQnO1xyXG5pbXBvcnQgeyBlc2NhcGVMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbC5oZWxwZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtY2FyZF0nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8c3ZnOmcgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybVwiIGNsYXNzPVwiY2VsbFwiIChjbGljayk9XCJvbkNsaWNrKClcIj5cclxuICAgICAgPHN2ZzpyZWN0IGNsYXNzPVwiY2FyZFwiIFtzdHlsZS5maWxsXT1cImNvbG9yXCIgW2F0dHIud2lkdGhdPVwiY2FyZFdpZHRoXCIgW2F0dHIuaGVpZ2h0XT1cImNhcmRIZWlnaHRcIiByeD1cIjNcIiByeT1cIjNcIiAvPlxyXG4gICAgICA8c3ZnOnBhdGhcclxuICAgICAgICAqbmdJZj1cImJhbmRDb2xvciAmJiBiYW5kQ29sb3IgIT09IGNvbG9yXCJcclxuICAgICAgICBjbGFzcz1cImNhcmQtYmFuZFwiXHJcbiAgICAgICAgW2F0dHIuZmlsbF09XCJiYW5kQ29sb3JcIlxyXG4gICAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1CYW5kXCJcclxuICAgICAgICBzdHJva2U9XCJub25lXCJcclxuICAgICAgICBbYXR0ci5kXT1cImJhbmRQYXRoXCJcclxuICAgICAgLz5cclxuICAgICAgPHRpdGxlPnt7IGxhYmVsIH19PC90aXRsZT5cclxuICAgICAgPHN2Zzpmb3JlaWduT2JqZWN0XHJcbiAgICAgICAgY2xhc3M9XCJ0cmltbWVkLWxhYmVsXCJcclxuICAgICAgICB4PVwiNVwiXHJcbiAgICAgICAgW2F0dHIueF09XCJ0ZXh0UGFkZGluZ1szXVwiXHJcbiAgICAgICAgW2F0dHIueV09XCJjYXJkSGVpZ2h0IC0gdGV4dFBhZGRpbmdbMl1cIlxyXG4gICAgICAgIFthdHRyLndpZHRoXT1cInRleHRXaWR0aFwiXHJcbiAgICAgICAgW2F0dHIuaGVpZ2h0XT1cImxhYmVsRm9udFNpemUgKyB0ZXh0UGFkZGluZ1syXVwiXHJcbiAgICAgICAgYWxpZ25tZW50LWJhc2VsaW5lPVwiaGFuZ2luZ1wiXHJcbiAgICAgID5cclxuICAgICAgICA8eGh0bWw6cFxyXG4gICAgICAgICAgW3N0eWxlLmNvbG9yXT1cInRleHRDb2xvclwiXHJcbiAgICAgICAgICBbc3R5bGUuZm9udFNpemUucHhdPVwibGFiZWxGb250U2l6ZVwiXHJcbiAgICAgICAgICBbc3R5bGUubGluZUhlaWdodC5weF09XCJsYWJlbEZvbnRTaXplXCJcclxuICAgICAgICAgIFtpbm5lckhUTUxdPVwiZm9ybWF0dGVkTGFiZWxcIlxyXG4gICAgICAgID5cclxuICAgICAgICA8L3hodG1sOnA+XHJcbiAgICAgIDwvc3ZnOmZvcmVpZ25PYmplY3Q+XHJcbiAgICAgIDxzdmc6dGV4dFxyXG4gICAgICAgICN0ZXh0RWxcclxuICAgICAgICBjbGFzcz1cInZhbHVlLXRleHRcIlxyXG4gICAgICAgIFthdHRyLnhdPVwidGV4dFBhZGRpbmdbM11cIlxyXG4gICAgICAgIFthdHRyLnldPVwidGV4dFBhZGRpbmdbMF1cIlxyXG4gICAgICAgIFtzdHlsZS5maWxsXT1cInRleHRDb2xvclwiXHJcbiAgICAgICAgdGV4dC1hbmNob3I9XCJzdGFydFwiXHJcbiAgICAgICAgYWxpZ25tZW50LWJhc2VsaW5lPVwiaGFuZ2luZ1wiXHJcbiAgICAgICAgW3N0eWxlLmZvbnQtc2l6ZS5wdF09XCJ0ZXh0Rm9udFNpemVcIlxyXG4gICAgICA+XHJcbiAgICAgICAge3sgdmFsdWUgfX1cclxuICAgICAgPC9zdmc6dGV4dD5cclxuICAgIDwvc3ZnOmc+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2FyZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuICBASW5wdXQoKSBjb2xvcjtcclxuICBASW5wdXQoKSBiYW5kQ29sb3I7XHJcbiAgQElucHV0KCkgdGV4dENvbG9yO1xyXG5cclxuICBASW5wdXQoKSB4O1xyXG4gIEBJbnB1dCgpIHk7XHJcbiAgQElucHV0KCkgd2lkdGg7XHJcbiAgQElucHV0KCkgaGVpZ2h0O1xyXG4gIEBJbnB1dCgpIGxhYmVsO1xyXG4gIEBJbnB1dCgpIGRhdGE7XHJcbiAgQElucHV0KCkgbWVkaWFuU2l6ZTogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHZhbHVlRm9ybWF0dGluZzogYW55O1xyXG4gIEBJbnB1dCgpIGxhYmVsRm9ybWF0dGluZzogYW55O1xyXG4gIEBJbnB1dCgpIGFuaW1hdGlvbnM6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBAVmlld0NoaWxkKCd0ZXh0RWwnLCB7IHN0YXRpYzogZmFsc2UgfSkgdGV4dEVsOiBFbGVtZW50UmVmO1xyXG5cclxuICBlbGVtZW50OiBIVE1MRWxlbWVudDtcclxuICB2YWx1ZTogc3RyaW5nID0gJyc7XHJcbiAgdHJhbnNmb3JtOiBzdHJpbmc7XHJcbiAgZm9ybWF0dGVkTGFiZWw6IHN0cmluZztcclxuICBjYXJkV2lkdGg6IG51bWJlcjtcclxuICBjYXJkSGVpZ2h0OiBudW1iZXI7XHJcbiAgdGV4dFdpZHRoOiBudW1iZXI7XHJcbiAgdGV4dEZvbnRTaXplOiBudW1iZXIgPSAxMjtcclxuICB0ZXh0VHJhbnNmb3JtOiBzdHJpbmcgPSAnJztcclxuICBpbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGFuaW1hdGlvblJlcTogYW55O1xyXG5cclxuICBiYW5kSGVpZ2h0OiBudW1iZXIgPSAxMDtcclxuICB0cmFuc2Zvcm1CYW5kOiBzdHJpbmc7XHJcbiAgdGV4dFBhZGRpbmcgPSBbMTAsIDIwLCA1LCAyMF07XHJcbiAgbGFiZWxGb250U2l6ZSA9IDE1O1xyXG5cclxuICBiYW5kUGF0aDogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uUmVxKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICBjb25zdCBoYXNWYWx1ZSA9IHRoaXMuZGF0YSAmJiB0eXBlb2YgdGhpcy5kYXRhLnZhbHVlICE9PSAndW5kZWZpbmVkJztcclxuICAgICAgY29uc3QgdmFsdWVGb3JtYXR0aW5nID0gdGhpcy52YWx1ZUZvcm1hdHRpbmcgfHwgKGNhcmQgPT4gY2FyZC52YWx1ZS50b0xvY2FsZVN0cmluZygpKTtcclxuICAgICAgY29uc3QgbGFiZWxGb3JtYXR0aW5nID0gdGhpcy5sYWJlbEZvcm1hdHRpbmcgfHwgKGNhcmQgPT4gZXNjYXBlTGFiZWwodHJpbUxhYmVsKGNhcmQubGFiZWwsIDU1KSkpO1xyXG5cclxuICAgICAgdGhpcy50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7dGhpcy54fSAsICR7dGhpcy55fSlgO1xyXG5cclxuICAgICAgdGhpcy50ZXh0V2lkdGggPSBNYXRoLm1heCgwLCB0aGlzLndpZHRoKSAtIHRoaXMudGV4dFBhZGRpbmdbMV0gLSB0aGlzLnRleHRQYWRkaW5nWzNdO1xyXG4gICAgICB0aGlzLmNhcmRXaWR0aCA9IE1hdGgubWF4KDAsIHRoaXMud2lkdGgpO1xyXG4gICAgICB0aGlzLmNhcmRIZWlnaHQgPSBNYXRoLm1heCgwLCB0aGlzLmhlaWdodCk7XHJcblxyXG4gICAgICB0aGlzLmxhYmVsID0gdGhpcy5sYWJlbCA/IHRoaXMubGFiZWwgOiB0aGlzLmRhdGEubmFtZTtcclxuXHJcbiAgICAgIGNvbnN0IGNhcmREYXRhID0ge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmxhYmVsLFxyXG4gICAgICAgIGRhdGE6IHRoaXMuZGF0YSxcclxuICAgICAgICB2YWx1ZTogdGhpcy5kYXRhLnZhbHVlXHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0aGlzLmZvcm1hdHRlZExhYmVsID0gbGFiZWxGb3JtYXR0aW5nKGNhcmREYXRhKTtcclxuICAgICAgdGhpcy50cmFuc2Zvcm1CYW5kID0gYHRyYW5zbGF0ZSgwICwgJHt0aGlzLmNhcmRIZWlnaHQgLSB0aGlzLmJhbmRIZWlnaHR9KWA7XHJcblxyXG4gICAgICBjb25zdCB2YWx1ZSA9IGhhc1ZhbHVlID8gdmFsdWVGb3JtYXR0aW5nKGNhcmREYXRhKSA6ICcnO1xyXG5cclxuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMucGFkZGVkVmFsdWUodmFsdWUpO1xyXG4gICAgICB0aGlzLnNldFBhZGRpbmcoKTtcclxuXHJcbiAgICAgIHRoaXMuYmFuZFBhdGggPSByb3VuZGVkUmVjdCgwLCAwLCB0aGlzLmNhcmRXaWR0aCwgdGhpcy5iYW5kSGVpZ2h0LCAzLCBbZmFsc2UsIGZhbHNlLCB0cnVlLCB0cnVlXSk7XHJcblxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLnNjYWxlVGV4dCgpO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICBpZiAoaGFzVmFsdWUgJiYgIXRoaXMuaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zdGFydENvdW50KCksIDIwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwYWRkZWRWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICBpZiAodGhpcy5tZWRpYW5TaXplICYmIHRoaXMubWVkaWFuU2l6ZSA+IHZhbHVlLmxlbmd0aCkge1xyXG4gICAgICB2YWx1ZSArPSAnXFx1MjAwNycucmVwZWF0KHRoaXMubWVkaWFuU2l6ZSAtIHZhbHVlLmxlbmd0aCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBzdGFydENvdW50KCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmluaXRpYWxpemVkICYmIHRoaXMuYW5pbWF0aW9ucykge1xyXG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvblJlcSk7XHJcblxyXG4gICAgICBjb25zdCB2YWwgPSB0aGlzLmRhdGEudmFsdWU7XHJcbiAgICAgIGNvbnN0IGRlY3MgPSBkZWNpbWFsQ2hlY2tlcih2YWwpO1xyXG4gICAgICBjb25zdCB2YWx1ZUZvcm1hdHRpbmcgPSB0aGlzLnZhbHVlRm9ybWF0dGluZyB8fCAoY2FyZCA9PiBjYXJkLnZhbHVlLnRvTG9jYWxlU3RyaW5nKCkpO1xyXG5cclxuICAgICAgY29uc3QgY2FsbGJhY2sgPSAoeyB2YWx1ZSwgZmluaXNoZWQgfSkgPT4ge1xyXG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgdmFsdWUgPSBmaW5pc2hlZCA/IHZhbCA6IHZhbHVlO1xyXG4gICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlRm9ybWF0dGluZyh7IGxhYmVsOiB0aGlzLmxhYmVsLCBkYXRhOiB0aGlzLmRhdGEsIHZhbHVlIH0pO1xyXG4gICAgICAgICAgaWYgKCFmaW5pc2hlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5wYWRkZWRWYWx1ZSh0aGlzLnZhbHVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0aGlzLmFuaW1hdGlvblJlcSA9IGNvdW50KDAsIHZhbCwgZGVjcywgMSwgY2FsbGJhY2spO1xyXG4gICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNjYWxlVGV4dCgpOiB2b2lkIHtcclxuICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMudGV4dEVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgIGlmICh3aWR0aCA9PT0gMCB8fCBoZWlnaHQgPT09IDApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHRleHRQYWRkaW5nID0gKHRoaXMudGV4dFBhZGRpbmdbMV0gPSB0aGlzLnRleHRQYWRkaW5nWzNdID0gdGhpcy5jYXJkV2lkdGggLyA4KTtcclxuICAgICAgY29uc3QgYXZhaWxhYmxlV2lkdGggPSB0aGlzLmNhcmRXaWR0aCAtIDIgKiB0ZXh0UGFkZGluZztcclxuICAgICAgY29uc3QgYXZhaWxhYmxlSGVpZ2h0ID0gdGhpcy5jYXJkSGVpZ2h0IC8gMztcclxuXHJcbiAgICAgIGNvbnN0IHJlc2l6ZVNjYWxlID0gTWF0aC5taW4oYXZhaWxhYmxlV2lkdGggLyB3aWR0aCwgYXZhaWxhYmxlSGVpZ2h0IC8gaGVpZ2h0KTtcclxuICAgICAgdGhpcy50ZXh0Rm9udFNpemUgPSBNYXRoLmZsb29yKHRoaXMudGV4dEZvbnRTaXplICogcmVzaXplU2NhbGUpO1xyXG4gICAgICB0aGlzLmxhYmVsRm9udFNpemUgPSBNYXRoLm1pbih0aGlzLnRleHRGb250U2l6ZSwgMTUpO1xyXG5cclxuICAgICAgdGhpcy5zZXRQYWRkaW5nKCk7XHJcbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldFBhZGRpbmcoKSB7XHJcbiAgICB0aGlzLnRleHRQYWRkaW5nWzFdID0gdGhpcy50ZXh0UGFkZGluZ1szXSA9IHRoaXMuY2FyZFdpZHRoIC8gODtcclxuICAgIGNvbnN0IHBhZGRpbmcgPSB0aGlzLmNhcmRIZWlnaHQgLyAyO1xyXG4gICAgdGhpcy50ZXh0UGFkZGluZ1swXSA9IHBhZGRpbmcgLSB0aGlzLnRleHRGb250U2l6ZSAtIHRoaXMubGFiZWxGb250U2l6ZSAvIDI7XHJcbiAgICB0aGlzLnRleHRQYWRkaW5nWzJdID0gcGFkZGluZyAtIHRoaXMubGFiZWxGb250U2l6ZTtcclxuICB9XHJcblxyXG4gIG9uQ2xpY2soKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdC5lbWl0KHRoaXMuZGF0YSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==