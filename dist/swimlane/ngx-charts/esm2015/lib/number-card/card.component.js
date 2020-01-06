import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ElementRef, SimpleChanges, OnChanges, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, NgZone, OnDestroy } from '@angular/core';
import { trimLabel } from '../common/trim-label.helper';
import { roundedRect } from '../common/shape.helper';
import { count, decimalChecker } from '../common/count';
import { escapeLabel } from '../common/label.helper';
let CardComponent = class CardComponent {
    constructor(element, cd, zone) {
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
    ngOnChanges(changes) {
        this.update();
    }
    ngOnDestroy() {
        cancelAnimationFrame(this.animationReq);
    }
    update() {
        this.zone.run(() => {
            const hasValue = this.data && typeof this.data.value !== 'undefined';
            const valueFormatting = this.valueFormatting || (card => card.value.toLocaleString());
            const labelFormatting = this.labelFormatting || (card => escapeLabel(trimLabel(card.label, 55)));
            this.transform = `translate(${this.x} , ${this.y})`;
            this.textWidth = Math.max(0, this.width) - this.textPadding[1] - this.textPadding[3];
            this.cardWidth = Math.max(0, this.width);
            this.cardHeight = Math.max(0, this.height);
            this.label = this.label ? this.label : this.data.name;
            const cardData = {
                label: this.label,
                data: this.data,
                value: this.data.value
            };
            this.formattedLabel = labelFormatting(cardData);
            this.transformBand = `translate(0 , ${this.cardHeight - this.bandHeight})`;
            const value = hasValue ? valueFormatting(cardData) : '';
            this.value = this.paddedValue(value);
            this.setPadding();
            this.bandPath = roundedRect(0, 0, this.cardWidth, this.bandHeight, 3, [false, false, true, true]);
            setTimeout(() => {
                this.scaleText();
                this.value = value;
                if (hasValue && !this.initialized) {
                    setTimeout(() => this.startCount(), 20);
                }
            }, 8);
        });
    }
    paddedValue(value) {
        if (this.medianSize && this.medianSize > value.length) {
            value += '\u2007'.repeat(this.medianSize - value.length);
        }
        return value;
    }
    startCount() {
        if (!this.initialized && this.animations) {
            cancelAnimationFrame(this.animationReq);
            const val = this.data.value;
            const decs = decimalChecker(val);
            const valueFormatting = this.valueFormatting || (card => card.value.toLocaleString());
            const callback = ({ value, finished }) => {
                this.zone.run(() => {
                    value = finished ? val : value;
                    this.value = valueFormatting({ label: this.label, data: this.data, value });
                    if (!finished) {
                        this.value = this.paddedValue(this.value);
                    }
                    this.cd.markForCheck();
                });
            };
            this.animationReq = count(0, val, decs, 1, callback);
            this.initialized = true;
        }
    }
    scaleText() {
        this.zone.run(() => {
            const { width, height } = this.textEl.nativeElement.getBoundingClientRect();
            if (width === 0 || height === 0) {
                return;
            }
            const textPadding = (this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8);
            const availableWidth = this.cardWidth - 2 * textPadding;
            const availableHeight = this.cardHeight / 3;
            const resizeScale = Math.min(availableWidth / width, availableHeight / height);
            this.textFontSize = Math.floor(this.textFontSize * resizeScale);
            this.labelFontSize = Math.min(this.textFontSize, 15);
            this.setPadding();
            this.cd.markForCheck();
        });
    }
    setPadding() {
        this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8;
        const padding = this.cardHeight / 2;
        this.textPadding[0] = padding - this.textFontSize - this.labelFontSize / 2;
        this.textPadding[2] = padding - this.labelFontSize;
    }
    onClick() {
        this.select.emit(this.data);
    }
};
CardComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: NgZone }
];
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
        template: `
    <svg:g [attr.transform]="transform" class="cell" (click)="onClick()">
      <svg:rect class="card" [style.fill]="color" [attr.width]="cardWidth" [attr.height]="cardHeight" rx="3" ry="3" />
      <svg:path
        *ngIf="bandColor && bandColor !== color"
        class="card-band"
        [attr.fill]="bandColor"
        [attr.transform]="transformBand"
        stroke="none"
        [attr.d]="bandPath"
      />
      <title>{{ label }}</title>
      <svg:foreignObject
        class="trimmed-label"
        x="5"
        [attr.x]="textPadding[3]"
        [attr.y]="cardHeight - textPadding[2]"
        [attr.width]="textWidth"
        [attr.height]="labelFontSize + textPadding[2]"
        alignment-baseline="hanging"
      >
        <xhtml:p
          [style.color]="textColor"
          [style.fontSize.px]="labelFontSize"
          [style.lineHeight.px]="labelFontSize"
          [innerHTML]="formattedLabel"
        >
        </xhtml:p>
      </svg:foreignObject>
      <svg:text
        #textEl
        class="value-text"
        [attr.x]="textPadding[3]"
        [attr.y]="textPadding[0]"
        [style.fill]="textColor"
        text-anchor="start"
        alignment-baseline="hanging"
        [style.font-size.pt]="textFontSize"
      >
        {{ value }}
      </svg:text>
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], CardComponent);
export { CardComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9udW1iZXItY2FyZC9jYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixVQUFVLEVBQ1YsYUFBYSxFQUNiLFNBQVMsRUFDVCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixNQUFNLEVBQ04sU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFpRHJELElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUF1Q3hCLFlBQVksT0FBbUIsRUFBVSxFQUFxQixFQUFVLElBQVk7UUFBM0MsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBekIzRSxlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTFCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBS3RDLFVBQUssR0FBVyxFQUFFLENBQUM7UUFNbkIsaUJBQVksR0FBVyxFQUFFLENBQUM7UUFDMUIsa0JBQWEsR0FBVyxFQUFFLENBQUM7UUFDM0IsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFHN0IsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUV4QixnQkFBVyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUIsa0JBQWEsR0FBRyxFQUFF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QUU7d0NBQUc7QUFDRjtJQUFSLEtBQUssRUFBRTs0Q0FBTztBQUNOO0lBQVIsS0FBSyxFQUFFOzZDQUFRO0FBQ1A7SUFBUixLQUFLLEVBQUU7NENBQU87QUFDTjtJQUFSLEtBQUssRUFBRTsyQ0FBTTtBQUNMO0lBQVIsS0FBSyxFQUFFO2lEQUFvQjtBQUNuQjtJQUFSLEtBQUssRUFBRTtzREFBc0I7QUFDckI7SUFBUixLQUFLLEVBQUU7c0RBQXNCO0FBQ3JCO0lBQVIsS0FBSyxFQUFFO2lEQUE0QjtBQUUxQjtJQUFULE1BQU0sRUFBRTs2Q0FBNkI7QUFFRTtJQUF2QyxTQUFTLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDOzZDQUFvQjtBQWxCaEQsYUFBYTtJQS9DekIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG9CQUFvQjtRQUM5QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBDVDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO0tBQ2hELENBQUM7R0FDVyxhQUFhLENBd0p6QjtTQXhKWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBFbGVtZW50UmVmLFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIFZpZXdDaGlsZCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBOZ1pvbmUsXHJcbiAgT25EZXN0cm95XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IHRyaW1MYWJlbCB9IGZyb20gJy4uL2NvbW1vbi90cmltLWxhYmVsLmhlbHBlcic7XHJcbmltcG9ydCB7IHJvdW5kZWRSZWN0IH0gZnJvbSAnLi4vY29tbW9uL3NoYXBlLmhlbHBlcic7XHJcbmltcG9ydCB7IGNvdW50LCBkZWNpbWFsQ2hlY2tlciB9IGZyb20gJy4uL2NvbW1vbi9jb3VudCc7XHJcbmltcG9ydCB7IGVzY2FwZUxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsLmhlbHBlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1jYXJkXScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxzdmc6ZyBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtXCIgY2xhc3M9XCJjZWxsXCIgKGNsaWNrKT1cIm9uQ2xpY2soKVwiPlxyXG4gICAgICA8c3ZnOnJlY3QgY2xhc3M9XCJjYXJkXCIgW3N0eWxlLmZpbGxdPVwiY29sb3JcIiBbYXR0ci53aWR0aF09XCJjYXJkV2lkdGhcIiBbYXR0ci5oZWlnaHRdPVwiY2FyZEhlaWdodFwiIHJ4PVwiM1wiIHJ5PVwiM1wiIC8+XHJcbiAgICAgIDxzdmc6cGF0aFxyXG4gICAgICAgICpuZ0lmPVwiYmFuZENvbG9yICYmIGJhbmRDb2xvciAhPT0gY29sb3JcIlxyXG4gICAgICAgIGNsYXNzPVwiY2FyZC1iYW5kXCJcclxuICAgICAgICBbYXR0ci5maWxsXT1cImJhbmRDb2xvclwiXHJcbiAgICAgICAgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybUJhbmRcIlxyXG4gICAgICAgIHN0cm9rZT1cIm5vbmVcIlxyXG4gICAgICAgIFthdHRyLmRdPVwiYmFuZFBhdGhcIlxyXG4gICAgICAvPlxyXG4gICAgICA8dGl0bGU+e3sgbGFiZWwgfX08L3RpdGxlPlxyXG4gICAgICA8c3ZnOmZvcmVpZ25PYmplY3RcclxuICAgICAgICBjbGFzcz1cInRyaW1tZWQtbGFiZWxcIlxyXG4gICAgICAgIHg9XCI1XCJcclxuICAgICAgICBbYXR0ci54XT1cInRleHRQYWRkaW5nWzNdXCJcclxuICAgICAgICBbYXR0ci55XT1cImNhcmRIZWlnaHQgLSB0ZXh0UGFkZGluZ1syXVwiXHJcbiAgICAgICAgW2F0dHIud2lkdGhdPVwidGV4dFdpZHRoXCJcclxuICAgICAgICBbYXR0ci5oZWlnaHRdPVwibGFiZWxGb250U2l6ZSArIHRleHRQYWRkaW5nWzJdXCJcclxuICAgICAgICBhbGlnbm1lbnQtYmFzZWxpbmU9XCJoYW5naW5nXCJcclxuICAgICAgPlxyXG4gICAgICAgIDx4aHRtbDpwXHJcbiAgICAgICAgICBbc3R5bGUuY29sb3JdPVwidGV4dENvbG9yXCJcclxuICAgICAgICAgIFtzdHlsZS5mb250U2l6ZS5weF09XCJsYWJlbEZvbnRTaXplXCJcclxuICAgICAgICAgIFtzdHlsZS5saW5lSGVpZ2h0LnB4XT1cImxhYmVsRm9udFNpemVcIlxyXG4gICAgICAgICAgW2lubmVySFRNTF09XCJmb3JtYXR0ZWRMYWJlbFwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgIDwveGh0bWw6cD5cclxuICAgICAgPC9zdmc6Zm9yZWlnbk9iamVjdD5cclxuICAgICAgPHN2Zzp0ZXh0XHJcbiAgICAgICAgI3RleHRFbFxyXG4gICAgICAgIGNsYXNzPVwidmFsdWUtdGV4dFwiXHJcbiAgICAgICAgW2F0dHIueF09XCJ0ZXh0UGFkZGluZ1szXVwiXHJcbiAgICAgICAgW2F0dHIueV09XCJ0ZXh0UGFkZGluZ1swXVwiXHJcbiAgICAgICAgW3N0eWxlLmZpbGxdPVwidGV4dENvbG9yXCJcclxuICAgICAgICB0ZXh0LWFuY2hvcj1cInN0YXJ0XCJcclxuICAgICAgICBhbGlnbm1lbnQtYmFzZWxpbmU9XCJoYW5naW5nXCJcclxuICAgICAgICBbc3R5bGUuZm9udC1zaXplLnB0XT1cInRleHRGb250U2l6ZVwiXHJcbiAgICAgID5cclxuICAgICAgICB7eyB2YWx1ZSB9fVxyXG4gICAgICA8L3N2Zzp0ZXh0PlxyXG4gICAgPC9zdmc6Zz5cclxuICBgLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXJkQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpIGNvbG9yO1xyXG4gIEBJbnB1dCgpIGJhbmRDb2xvcjtcclxuICBASW5wdXQoKSB0ZXh0Q29sb3I7XHJcblxyXG4gIEBJbnB1dCgpIHg7XHJcbiAgQElucHV0KCkgeTtcclxuICBASW5wdXQoKSB3aWR0aDtcclxuICBASW5wdXQoKSBoZWlnaHQ7XHJcbiAgQElucHV0KCkgbGFiZWw7XHJcbiAgQElucHV0KCkgZGF0YTtcclxuICBASW5wdXQoKSBtZWRpYW5TaXplOiBudW1iZXI7XHJcbiAgQElucHV0KCkgdmFsdWVGb3JtYXR0aW5nOiBhbnk7XHJcbiAgQElucHV0KCkgbGFiZWxGb3JtYXR0aW5nOiBhbnk7XHJcbiAgQElucHV0KCkgYW5pbWF0aW9uczogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ3RleHRFbCcsIHsgc3RhdGljOiBmYWxzZSB9KSB0ZXh0RWw6IEVsZW1lbnRSZWY7XHJcblxyXG4gIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gIHZhbHVlOiBzdHJpbmcgPSAnJztcclxuICB0cmFuc2Zvcm06IHN0cmluZztcclxuICBmb3JtYXR0ZWRMYWJlbDogc3RyaW5nO1xyXG4gIGNhcmRXaWR0aDogbnVtYmVyO1xyXG4gIGNhcmRIZWlnaHQ6IG51bWJlcjtcclxuICB0ZXh0V2lkdGg6IG51bWJlcjtcclxuICB0ZXh0Rm9udFNpemU6IG51bWJlciA9IDEyO1xyXG4gIHRleHRUcmFuc2Zvcm06IHN0cmluZyA9ICcnO1xyXG4gIGluaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgYW5pbWF0aW9uUmVxOiBhbnk7XHJcblxyXG4gIGJhbmRIZWlnaHQ6IG51bWJlciA9IDEwO1xyXG4gIHRyYW5zZm9ybUJhbmQ6IHN0cmluZztcclxuICB0ZXh0UGFkZGluZyA9IFsxMCwgMjAsIDUsIDIwXTtcclxuICBsYWJlbEZvbnRTaXplID0gMTU7XHJcblxyXG4gIGJhbmRQYXRoOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIHpvbmU6IE5nWm9uZSkge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb25SZXEpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGhhc1ZhbHVlID0gdGhpcy5kYXRhICYmIHR5cGVvZiB0aGlzLmRhdGEudmFsdWUgIT09ICd1bmRlZmluZWQnO1xyXG4gICAgICBjb25zdCB2YWx1ZUZvcm1hdHRpbmcgPSB0aGlzLnZhbHVlRm9ybWF0dGluZyB8fCAoY2FyZCA9PiBjYXJkLnZhbHVlLnRvTG9jYWxlU3RyaW5nKCkpO1xyXG4gICAgICBjb25zdCBsYWJlbEZvcm1hdHRpbmcgPSB0aGlzLmxhYmVsRm9ybWF0dGluZyB8fCAoY2FyZCA9PiBlc2NhcGVMYWJlbCh0cmltTGFiZWwoY2FyZC5sYWJlbCwgNTUpKSk7XHJcblxyXG4gICAgICB0aGlzLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt0aGlzLnh9ICwgJHt0aGlzLnl9KWA7XHJcblxyXG4gICAgICB0aGlzLnRleHRXaWR0aCA9IE1hdGgubWF4KDAsIHRoaXMud2lkdGgpIC0gdGhpcy50ZXh0UGFkZGluZ1sxXSAtIHRoaXMudGV4dFBhZGRpbmdbM107XHJcbiAgICAgIHRoaXMuY2FyZFdpZHRoID0gTWF0aC5tYXgoMCwgdGhpcy53aWR0aCk7XHJcbiAgICAgIHRoaXMuY2FyZEhlaWdodCA9IE1hdGgubWF4KDAsIHRoaXMuaGVpZ2h0KTtcclxuXHJcbiAgICAgIHRoaXMubGFiZWwgPSB0aGlzLmxhYmVsID8gdGhpcy5sYWJlbCA6IHRoaXMuZGF0YS5uYW1lO1xyXG5cclxuICAgICAgY29uc3QgY2FyZERhdGEgPSB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMubGFiZWwsXHJcbiAgICAgICAgZGF0YTogdGhpcy5kYXRhLFxyXG4gICAgICAgIHZhbHVlOiB0aGlzLmRhdGEudmFsdWVcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHRoaXMuZm9ybWF0dGVkTGFiZWwgPSBsYWJlbEZvcm1hdHRpbmcoY2FyZERhdGEpO1xyXG4gICAgICB0aGlzLnRyYW5zZm9ybUJhbmQgPSBgdHJhbnNsYXRlKDAgLCAke3RoaXMuY2FyZEhlaWdodCAtIHRoaXMuYmFuZEhlaWdodH0pYDtcclxuXHJcbiAgICAgIGNvbnN0IHZhbHVlID0gaGFzVmFsdWUgPyB2YWx1ZUZvcm1hdHRpbmcoY2FyZERhdGEpIDogJyc7XHJcblxyXG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5wYWRkZWRWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgIHRoaXMuc2V0UGFkZGluZygpO1xyXG5cclxuICAgICAgdGhpcy5iYW5kUGF0aCA9IHJvdW5kZWRSZWN0KDAsIDAsIHRoaXMuY2FyZFdpZHRoLCB0aGlzLmJhbmRIZWlnaHQsIDMsIFtmYWxzZSwgZmFsc2UsIHRydWUsIHRydWVdKTtcclxuXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2NhbGVUZXh0KCk7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIGlmIChoYXNWYWx1ZSAmJiAhdGhpcy5pbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnN0YXJ0Q291bnQoKSwgMjApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgOCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHBhZGRlZFZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIGlmICh0aGlzLm1lZGlhblNpemUgJiYgdGhpcy5tZWRpYW5TaXplID4gdmFsdWUubGVuZ3RoKSB7XHJcbiAgICAgIHZhbHVlICs9ICdcXHUyMDA3Jy5yZXBlYXQodGhpcy5tZWRpYW5TaXplIC0gdmFsdWUubGVuZ3RoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHN0YXJ0Q291bnQoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQgJiYgdGhpcy5hbmltYXRpb25zKSB7XHJcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uUmVxKTtcclxuXHJcbiAgICAgIGNvbnN0IHZhbCA9IHRoaXMuZGF0YS52YWx1ZTtcclxuICAgICAgY29uc3QgZGVjcyA9IGRlY2ltYWxDaGVja2VyKHZhbCk7XHJcbiAgICAgIGNvbnN0IHZhbHVlRm9ybWF0dGluZyA9IHRoaXMudmFsdWVGb3JtYXR0aW5nIHx8IChjYXJkID0+IGNhcmQudmFsdWUudG9Mb2NhbGVTdHJpbmcoKSk7XHJcblxyXG4gICAgICBjb25zdCBjYWxsYmFjayA9ICh7IHZhbHVlLCBmaW5pc2hlZCB9KSA9PiB7XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICB2YWx1ZSA9IGZpbmlzaGVkID8gdmFsIDogdmFsdWU7XHJcbiAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWVGb3JtYXR0aW5nKHsgbGFiZWw6IHRoaXMubGFiZWwsIGRhdGE6IHRoaXMuZGF0YSwgdmFsdWUgfSk7XHJcbiAgICAgICAgICBpZiAoIWZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnBhZGRlZFZhbHVlKHRoaXMudmFsdWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHRoaXMuYW5pbWF0aW9uUmVxID0gY291bnQoMCwgdmFsLCBkZWNzLCAxLCBjYWxsYmFjayk7XHJcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2NhbGVUZXh0KCk6IHZvaWQge1xyXG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy50ZXh0RWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgaWYgKHdpZHRoID09PSAwIHx8IGhlaWdodCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgdGV4dFBhZGRpbmcgPSAodGhpcy50ZXh0UGFkZGluZ1sxXSA9IHRoaXMudGV4dFBhZGRpbmdbM10gPSB0aGlzLmNhcmRXaWR0aCAvIDgpO1xyXG4gICAgICBjb25zdCBhdmFpbGFibGVXaWR0aCA9IHRoaXMuY2FyZFdpZHRoIC0gMiAqIHRleHRQYWRkaW5nO1xyXG4gICAgICBjb25zdCBhdmFpbGFibGVIZWlnaHQgPSB0aGlzLmNhcmRIZWlnaHQgLyAzO1xyXG5cclxuICAgICAgY29uc3QgcmVzaXplU2NhbGUgPSBNYXRoLm1pbihhdmFpbGFibGVXaWR0aCAvIHdpZHRoLCBhdmFpbGFibGVIZWlnaHQgLyBoZWlnaHQpO1xyXG4gICAgICB0aGlzLnRleHRGb250U2l6ZSA9IE1hdGguZmxvb3IodGhpcy50ZXh0Rm9udFNpemUgKiByZXNpemVTY2FsZSk7XHJcbiAgICAgIHRoaXMubGFiZWxGb250U2l6ZSA9IE1hdGgubWluKHRoaXMudGV4dEZvbnRTaXplLCAxNSk7XHJcblxyXG4gICAgICB0aGlzLnNldFBhZGRpbmcoKTtcclxuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0UGFkZGluZygpIHtcclxuICAgIHRoaXMudGV4dFBhZGRpbmdbMV0gPSB0aGlzLnRleHRQYWRkaW5nWzNdID0gdGhpcy5jYXJkV2lkdGggLyA4O1xyXG4gICAgY29uc3QgcGFkZGluZyA9IHRoaXMuY2FyZEhlaWdodCAvIDI7XHJcbiAgICB0aGlzLnRleHRQYWRkaW5nWzBdID0gcGFkZGluZyAtIHRoaXMudGV4dEZvbnRTaXplIC0gdGhpcy5sYWJlbEZvbnRTaXplIC8gMjtcclxuICAgIHRoaXMudGV4dFBhZGRpbmdbMl0gPSBwYWRkaW5nIC0gdGhpcy5sYWJlbEZvbnRTaXplO1xyXG4gIH1cclxuXHJcbiAgb25DbGljaygpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0LmVtaXQodGhpcy5kYXRhKTtcclxuICB9XHJcbn1cclxuIl19