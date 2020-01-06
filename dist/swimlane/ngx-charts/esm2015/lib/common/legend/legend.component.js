import { __decorate } from "tslib";
import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, SimpleChanges, OnChanges, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { formatLabel } from '../label.helper';
let LegendComponent = class LegendComponent {
    constructor(cd) {
        this.cd = cd;
        this.horizontal = false;
        this.labelClick = new EventEmitter();
        this.labelActivate = new EventEmitter();
        this.labelDeactivate = new EventEmitter();
        this.legendEntries = [];
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.cd.markForCheck();
        this.legendEntries = this.getLegendEntries();
    }
    getLegendEntries() {
        const items = [];
        for (const label of this.data) {
            const formattedLabel = formatLabel(label);
            const idx = items.findIndex(i => {
                return i.label === formattedLabel;
            });
            if (idx === -1) {
                items.push({
                    label,
                    formattedLabel,
                    color: this.colors.getColor(label)
                });
            }
        }
        return items;
    }
    isActive(entry) {
        if (!this.activeEntries)
            return false;
        const item = this.activeEntries.find(d => {
            return entry.label === d.name;
        });
        return item !== undefined;
    }
    activate(item) {
        this.labelActivate.emit(item);
    }
    deactivate(item) {
        this.labelDeactivate.emit(item);
    }
    trackBy(index, item) {
        return item.label;
    }
};
LegendComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
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
        template: `
    <div [style.width.px]="width">
      <header class="legend-title" *ngIf="title?.length > 0">
        <span class="legend-title-text">{{ title }}</span>
      </header>
      <div class="legend-wrap">
        <ul class="legend-labels" [class.horizontal-legend]="horizontal" [style.max-height.px]="height - 45">
          <li *ngFor="let entry of legendEntries; trackBy: trackBy" class="legend-label">
            <ngx-charts-legend-entry
              [label]="entry.label"
              [formattedLabel]="entry.formattedLabel"
              [color]="entry.color"
              [isActive]="isActive(entry)"
              (select)="labelClick.emit($event)"
              (activate)="activate($event)"
              (deactivate)="deactivate($event)"
            >
            </ngx-charts-legend-entry>
          </li>
        </ul>
      </div>
    </div>
  `,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".chart-legend{display:inline-block;padding:0;width:auto!important}.chart-legend .legend-title{white-space:nowrap;overflow:hidden;margin-left:10px;margin-bottom:5px;font-size:14px;font-weight:700}.chart-legend li,.chart-legend ul{padding:0;margin:0;list-style:none}.chart-legend .horizontal-legend li{display:inline-block}.chart-legend .legend-wrap{width:calc(100% - 10px)}.chart-legend .legend-labels{line-height:85%;list-style:none;text-align:left;float:left;width:100%;border-radius:3px;overflow-y:auto;overflow-x:hidden;white-space:nowrap;background:rgba(0,0,0,.05)}.chart-legend .legend-label{cursor:pointer;font-size:90%;margin:8px;color:#afb7c8}.chart-legend .legend-label:hover{color:#000;-webkit-transition:.2s;transition:.2s}.chart-legend .legend-label .active .legend-label-text{color:#000}.chart-legend .legend-label-color{display:inline-block;height:15px;width:15px;margin-right:5px;color:#5b646b;border-radius:3px}.chart-legend .legend-label-text{display:inline-block;vertical-align:top;line-height:15px;font-size:12px;width:calc(100% - 20px);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.chart-legend .legend-title-text{vertical-align:bottom;display:inline-block;line-height:16px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}"]
    })
], LegendComponent);
export { LegendComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVnZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9sZWdlbmQvbGVnZW5kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsdUJBQXVCLEVBQ3ZCLE1BQU0sRUFDTixZQUFZLEVBQ1osYUFBYSxFQUNiLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQStCOUMsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQWUxQixZQUFvQixFQUFxQjtRQUFyQixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQVJoQyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBRWxCLGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNuRCxrQkFBYSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3RELG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbEUsa0JBQWEsR0FBVSxFQUFFLENBQUM7SUFFa0IsQ0FBQztJQUU3QyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7UUFFakIsS0FBSyxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQzdCLE1BQU0sY0FBYyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUUxQyxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUM5QixPQUFPLENBQUMsQ0FBQyxLQUFLLEtBQUssY0FBYyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ2QsS0FBSyxDQUFDLElBQUksQ0FBQztvQkFDVCxLQUFLO29CQUNMLGNBQWM7b0JBQ2QsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztpQkFDbkMsQ0FBQyxDQUFDO2FBQ0o7U0FDRjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFLO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDdEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDdkMsT0FBTyxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksS0FBSyxTQUFTLENBQUM7SUFDNUIsQ0FBQztJQUVELFFBQVEsQ0FBQyxJQUFJO1FBQ1gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFJO1FBQ2IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSTtRQUNqQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztDQUNGLENBQUE7O1lBcER5QixpQkFBaUI7O0FBZGhDO0lBQVIsS0FBSyxFQUFFOzZDQUFNO0FBQ0w7SUFBUixLQUFLLEVBQUU7OENBQU87QUFDTjtJQUFSLEtBQUssRUFBRTsrQ0FBUTtBQUNQO0lBQVIsS0FBSyxFQUFFOytDQUFRO0FBQ1A7SUFBUixLQUFLLEVBQUU7OENBQU87QUFDTjtJQUFSLEtBQUssRUFBRTtzREFBZTtBQUNkO0lBQVIsS0FBSyxFQUFFO21EQUFvQjtBQUVsQjtJQUFULE1BQU0sRUFBRTttREFBb0Q7QUFDbkQ7SUFBVCxNQUFNLEVBQUU7c0RBQXVEO0FBQ3REO0lBQVQsTUFBTSxFQUFFO3dEQUF5RDtBQVh2RCxlQUFlO0lBN0IzQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCVDtRQUVELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1FBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztLQUNoRCxDQUFDO0dBQ1csZUFBZSxDQW1FM0I7U0FuRVksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBPbkNoYW5nZXMsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb25cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZm9ybWF0TGFiZWwgfSBmcm9tICcuLi9sYWJlbC5oZWxwZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtY2hhcnRzLWxlZ2VuZCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgW3N0eWxlLndpZHRoLnB4XT1cIndpZHRoXCI+XHJcbiAgICAgIDxoZWFkZXIgY2xhc3M9XCJsZWdlbmQtdGl0bGVcIiAqbmdJZj1cInRpdGxlPy5sZW5ndGggPiAwXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJsZWdlbmQtdGl0bGUtdGV4dFwiPnt7IHRpdGxlIH19PC9zcGFuPlxyXG4gICAgICA8L2hlYWRlcj5cclxuICAgICAgPGRpdiBjbGFzcz1cImxlZ2VuZC13cmFwXCI+XHJcbiAgICAgICAgPHVsIGNsYXNzPVwibGVnZW5kLWxhYmVsc1wiIFtjbGFzcy5ob3Jpem9udGFsLWxlZ2VuZF09XCJob3Jpem9udGFsXCIgW3N0eWxlLm1heC1oZWlnaHQucHhdPVwiaGVpZ2h0IC0gNDVcIj5cclxuICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgZW50cnkgb2YgbGVnZW5kRW50cmllczsgdHJhY2tCeTogdHJhY2tCeVwiIGNsYXNzPVwibGVnZW5kLWxhYmVsXCI+XHJcbiAgICAgICAgICAgIDxuZ3gtY2hhcnRzLWxlZ2VuZC1lbnRyeVxyXG4gICAgICAgICAgICAgIFtsYWJlbF09XCJlbnRyeS5sYWJlbFwiXHJcbiAgICAgICAgICAgICAgW2Zvcm1hdHRlZExhYmVsXT1cImVudHJ5LmZvcm1hdHRlZExhYmVsXCJcclxuICAgICAgICAgICAgICBbY29sb3JdPVwiZW50cnkuY29sb3JcIlxyXG4gICAgICAgICAgICAgIFtpc0FjdGl2ZV09XCJpc0FjdGl2ZShlbnRyeSlcIlxyXG4gICAgICAgICAgICAgIChzZWxlY3QpPVwibGFiZWxDbGljay5lbWl0KCRldmVudClcIlxyXG4gICAgICAgICAgICAgIChhY3RpdmF0ZSk9XCJhY3RpdmF0ZSgkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAoZGVhY3RpdmF0ZSk9XCJkZWFjdGl2YXRlKCRldmVudClcIlxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDwvbmd4LWNoYXJ0cy1sZWdlbmQtZW50cnk+XHJcbiAgICAgICAgICA8L2xpPlxyXG4gICAgICAgIDwvdWw+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgYCxcclxuICBzdHlsZVVybHM6IFsnLi9sZWdlbmQuY29tcG9uZW50LnNjc3MnXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMZWdlbmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIGRhdGE7XHJcbiAgQElucHV0KCkgdGl0bGU7XHJcbiAgQElucHV0KCkgY29sb3JzO1xyXG4gIEBJbnB1dCgpIGhlaWdodDtcclxuICBASW5wdXQoKSB3aWR0aDtcclxuICBASW5wdXQoKSBhY3RpdmVFbnRyaWVzO1xyXG4gIEBJbnB1dCgpIGhvcml6b250YWwgPSBmYWxzZTtcclxuXHJcbiAgQE91dHB1dCgpIGxhYmVsQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBsYWJlbEFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgbGFiZWxEZWFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgbGVnZW5kRW50cmllczogYW55W10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgdGhpcy5sZWdlbmRFbnRyaWVzID0gdGhpcy5nZXRMZWdlbmRFbnRyaWVzKCk7XHJcbiAgfVxyXG5cclxuICBnZXRMZWdlbmRFbnRyaWVzKCk6IGFueVtdIHtcclxuICAgIGNvbnN0IGl0ZW1zID0gW107XHJcblxyXG4gICAgZm9yIChjb25zdCBsYWJlbCBvZiB0aGlzLmRhdGEpIHtcclxuICAgICAgY29uc3QgZm9ybWF0dGVkTGFiZWwgPSBmb3JtYXRMYWJlbChsYWJlbCk7XHJcblxyXG4gICAgICBjb25zdCBpZHggPSBpdGVtcy5maW5kSW5kZXgoaSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGkubGFiZWwgPT09IGZvcm1hdHRlZExhYmVsO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChpZHggPT09IC0xKSB7XHJcbiAgICAgICAgaXRlbXMucHVzaCh7XHJcbiAgICAgICAgICBsYWJlbCxcclxuICAgICAgICAgIGZvcm1hdHRlZExhYmVsLFxyXG4gICAgICAgICAgY29sb3I6IHRoaXMuY29sb3JzLmdldENvbG9yKGxhYmVsKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGl0ZW1zO1xyXG4gIH1cclxuXHJcbiAgaXNBY3RpdmUoZW50cnkpOiBib29sZWFuIHtcclxuICAgIGlmICghdGhpcy5hY3RpdmVFbnRyaWVzKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBpdGVtID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbmQoZCA9PiB7XHJcbiAgICAgIHJldHVybiBlbnRyeS5sYWJlbCA9PT0gZC5uYW1lO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaXRlbSAhPT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgYWN0aXZhdGUoaXRlbSkge1xyXG4gICAgdGhpcy5sYWJlbEFjdGl2YXRlLmVtaXQoaXRlbSk7XHJcbiAgfVxyXG5cclxuICBkZWFjdGl2YXRlKGl0ZW0pIHtcclxuICAgIHRoaXMubGFiZWxEZWFjdGl2YXRlLmVtaXQoaXRlbSk7XHJcbiAgfVxyXG5cclxuICB0cmFja0J5KGluZGV4LCBpdGVtKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBpdGVtLmxhYmVsO1xyXG4gIH1cclxufVxyXG4iXX0=