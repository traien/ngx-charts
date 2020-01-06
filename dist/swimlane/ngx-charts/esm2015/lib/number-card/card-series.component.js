import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { invertColor } from '../utils/color-utils';
let CardSeriesComponent = class CardSeriesComponent {
    constructor() {
        this.innerPadding = 15;
        this.emptyColor = 'rgba(0, 0, 0, 0)';
        this.animations = true;
        this.select = new EventEmitter();
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        if (this.data.length > 2) {
            const valueFormatting = this.valueFormatting || (card => card.value.toLocaleString());
            const sortedLengths = this.data
                .map(d => {
                const hasValue = d && d.data && typeof d.data.value !== 'undefined' && d.data.value !== null;
                return hasValue
                    ? valueFormatting({
                        data: d.data,
                        label: d ? d.data.name : '',
                        value: d && d.data ? d.data.value : ''
                    }).length
                    : 0;
            })
                .sort((a, b) => b - a);
            const idx = Math.ceil(this.data.length / 2);
            this.medianSize = sortedLengths[idx];
        }
        const cards = this.getCards();
        this.cards = cards.filter(d => d.data.value !== null);
        this.emptySlots = cards.filter(d => d.data.value === null);
    }
    getCards() {
        const yPadding = typeof this.innerPadding === 'number' ? this.innerPadding : this.innerPadding[0] + this.innerPadding[2];
        const xPadding = typeof this.innerPadding === 'number' ? this.innerPadding : this.innerPadding[1] + this.innerPadding[3];
        return this.data.map((d, index) => {
            let label = d.data.name;
            if (label && label.constructor.name === 'Date') {
                label = label.toLocaleDateString();
            }
            else {
                label = label ? label.toLocaleString() : label;
            }
            const value = d.data.value;
            const valueColor = label ? this.colors.getColor(label) : this.emptyColor;
            const color = this.cardColor || valueColor || '#000';
            return {
                x: d.x,
                y: d.y,
                width: d.width - xPadding,
                height: d.height - yPadding,
                color,
                bandColor: this.bandColor || valueColor,
                textColor: this.textColor || invertColor(color),
                label,
                data: d.data,
                tooltipText: `${label}: ${value}`
            };
        });
    }
    trackBy(index, card) {
        return card.label;
    }
    onClick(data) {
        this.select.emit(data);
    }
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
        template: `
    <svg:rect
      *ngFor="let c of emptySlots; trackBy: trackBy"
      class="card-empty"
      [attr.x]="c.x"
      [attr.y]="c.y"
      [style.fill]="emptyColor"
      [attr.width]="c.width"
      [attr.height]="c.height"
      rx="3"
      ry="3"
    />
    <svg:g
      ngx-charts-card
      *ngFor="let c of cards; trackBy: trackBy"
      [x]="c.x"
      [y]="c.y"
      [width]="c.width"
      [height]="c.height"
      [color]="c.color"
      [bandColor]="c.bandColor"
      [textColor]="c.textColor"
      [data]="c.data"
      [label]="c.label"
      [medianSize]="medianSize"
      [valueFormatting]="valueFormatting"
      [labelFormatting]="labelFormatting"
      [animations]="animations"
      (select)="onClick($event)"
    />
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], CardSeriesComponent);
export { CardSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvbnVtYmVyLWNhcmQvY2FyZC1zZXJpZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUdaLHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFnRG5ELElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBQWhDO1FBS1csaUJBQVksR0FBRyxFQUFFLENBQUM7UUFJbEIsZUFBVSxHQUFHLGtCQUFrQixDQUFDO1FBSWhDLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFMUIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUEwRXhDLENBQUM7SUFwRUMsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3hCLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztZQUV0RixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSTtpQkFDNUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNQLE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssV0FBVyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQztnQkFDN0YsT0FBTyxRQUFRO29CQUNiLENBQUMsQ0FBQyxlQUFlLENBQUM7d0JBQ2QsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJO3dCQUNaLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO3dCQUMzQixLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO3FCQUN2QyxDQUFDLENBQUMsTUFBTTtvQkFDWCxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1IsQ0FBQyxDQUFDO2lCQUNELElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxRQUFRLEdBQ1osT0FBTyxJQUFJLENBQUMsWUFBWSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFHLE1BQU0sUUFBUSxHQUNaLE9BQU8sSUFBSSxDQUFDLFlBQVksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUxRyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ2hDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3hCLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtnQkFDOUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2FBQ3BDO2lCQUFNO2dCQUNMLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2FBQ2hEO1lBRUQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDM0IsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUN6RSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLFVBQVUsSUFBSSxNQUFNLENBQUM7WUFDckQsT0FBTztnQkFDTCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNOLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLFFBQVE7Z0JBQ3pCLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLFFBQVE7Z0JBQzNCLEtBQUs7Z0JBQ0wsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLElBQUksVUFBVTtnQkFDdkMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQztnQkFDL0MsS0FBSztnQkFDTCxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7Z0JBQ1osV0FBVyxFQUFFLEdBQUcsS0FBSyxLQUFLLEtBQUssRUFBRTthQUNsQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQsT0FBTyxDQUFDLElBQUk7UUFDVixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0NBQ0YsQ0FBQTtBQXhGVTtJQUFSLEtBQUssRUFBRTtpREFBYTtBQUNaO0lBQVIsS0FBSyxFQUFFO2tEQUFjO0FBQ2I7SUFBUixLQUFLLEVBQUU7aURBQU07QUFDTDtJQUFSLEtBQUssRUFBRTttREFBUTtBQUNQO0lBQVIsS0FBSyxFQUFFO3lEQUFtQjtBQUVsQjtJQUFSLEtBQUssRUFBRTtzREFBVztBQUNWO0lBQVIsS0FBSyxFQUFFO3NEQUFXO0FBQ1Y7SUFBUixLQUFLLEVBQUU7dURBQWlDO0FBQ2hDO0lBQVIsS0FBSyxFQUFFO3NEQUFXO0FBQ1Y7SUFBUixLQUFLLEVBQUU7NERBQXNCO0FBQ3JCO0lBQVIsS0FBSyxFQUFFOzREQUFzQjtBQUNyQjtJQUFSLEtBQUssRUFBRTt1REFBNEI7QUFFMUI7SUFBVCxNQUFNLEVBQUU7bURBQTZCO0FBZjNCLG1CQUFtQjtJQW5DL0IsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDJCQUEyQjtRQUNyQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCVDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO0tBQ2hELENBQUM7R0FDVyxtQkFBbUIsQ0F5Ri9CO1NBekZZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgaW52ZXJ0Q29sb3IgfSBmcm9tICcuLi91dGlscy9jb2xvci11dGlscyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENhcmRNb2RlbCB7XHJcbiAgeDtcclxuICB5O1xyXG4gIHdpZHRoOiBudW1iZXI7XHJcbiAgaGVpZ2h0OiBudW1iZXI7XHJcbiAgY29sb3I6IHN0cmluZztcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIGRhdGE7XHJcbiAgdG9vbHRpcFRleHQ6IHN0cmluZztcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtY2FyZC1zZXJpZXNdJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHN2ZzpyZWN0XHJcbiAgICAgICpuZ0Zvcj1cImxldCBjIG9mIGVtcHR5U2xvdHM7IHRyYWNrQnk6IHRyYWNrQnlcIlxyXG4gICAgICBjbGFzcz1cImNhcmQtZW1wdHlcIlxyXG4gICAgICBbYXR0ci54XT1cImMueFwiXHJcbiAgICAgIFthdHRyLnldPVwiYy55XCJcclxuICAgICAgW3N0eWxlLmZpbGxdPVwiZW1wdHlDb2xvclwiXHJcbiAgICAgIFthdHRyLndpZHRoXT1cImMud2lkdGhcIlxyXG4gICAgICBbYXR0ci5oZWlnaHRdPVwiYy5oZWlnaHRcIlxyXG4gICAgICByeD1cIjNcIlxyXG4gICAgICByeT1cIjNcIlxyXG4gICAgLz5cclxuICAgIDxzdmc6Z1xyXG4gICAgICBuZ3gtY2hhcnRzLWNhcmRcclxuICAgICAgKm5nRm9yPVwibGV0IGMgb2YgY2FyZHM7IHRyYWNrQnk6IHRyYWNrQnlcIlxyXG4gICAgICBbeF09XCJjLnhcIlxyXG4gICAgICBbeV09XCJjLnlcIlxyXG4gICAgICBbd2lkdGhdPVwiYy53aWR0aFwiXHJcbiAgICAgIFtoZWlnaHRdPVwiYy5oZWlnaHRcIlxyXG4gICAgICBbY29sb3JdPVwiYy5jb2xvclwiXHJcbiAgICAgIFtiYW5kQ29sb3JdPVwiYy5iYW5kQ29sb3JcIlxyXG4gICAgICBbdGV4dENvbG9yXT1cImMudGV4dENvbG9yXCJcclxuICAgICAgW2RhdGFdPVwiYy5kYXRhXCJcclxuICAgICAgW2xhYmVsXT1cImMubGFiZWxcIlxyXG4gICAgICBbbWVkaWFuU2l6ZV09XCJtZWRpYW5TaXplXCJcclxuICAgICAgW3ZhbHVlRm9ybWF0dGluZ109XCJ2YWx1ZUZvcm1hdHRpbmdcIlxyXG4gICAgICBbbGFiZWxGb3JtYXR0aW5nXT1cImxhYmVsRm9ybWF0dGluZ1wiXHJcbiAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxyXG4gICAgICAoc2VsZWN0KT1cIm9uQ2xpY2soJGV2ZW50KVwiXHJcbiAgICAvPlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIENhcmRTZXJpZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIGRhdGE6IGFueVtdO1xyXG4gIEBJbnB1dCgpIHNsb3RzOiBhbnlbXTtcclxuICBASW5wdXQoKSBkaW1zO1xyXG4gIEBJbnB1dCgpIGNvbG9ycztcclxuICBASW5wdXQoKSBpbm5lclBhZGRpbmcgPSAxNTtcclxuXHJcbiAgQElucHV0KCkgY2FyZENvbG9yO1xyXG4gIEBJbnB1dCgpIGJhbmRDb2xvcjtcclxuICBASW5wdXQoKSBlbXB0eUNvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMCknO1xyXG4gIEBJbnB1dCgpIHRleHRDb2xvcjtcclxuICBASW5wdXQoKSB2YWx1ZUZvcm1hdHRpbmc6IGFueTtcclxuICBASW5wdXQoKSBsYWJlbEZvcm1hdHRpbmc6IGFueTtcclxuICBASW5wdXQoKSBhbmltYXRpb25zOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY2FyZHM6IENhcmRNb2RlbFtdO1xyXG4gIGVtcHR5U2xvdHM6IGFueVtdO1xyXG4gIG1lZGlhblNpemU6IG51bWJlcjtcclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoID4gMikge1xyXG4gICAgICBjb25zdCB2YWx1ZUZvcm1hdHRpbmcgPSB0aGlzLnZhbHVlRm9ybWF0dGluZyB8fCAoY2FyZCA9PiBjYXJkLnZhbHVlLnRvTG9jYWxlU3RyaW5nKCkpO1xyXG5cclxuICAgICAgY29uc3Qgc29ydGVkTGVuZ3RocyA9IHRoaXMuZGF0YVxyXG4gICAgICAgIC5tYXAoZCA9PiB7XHJcbiAgICAgICAgICBjb25zdCBoYXNWYWx1ZSA9IGQgJiYgZC5kYXRhICYmIHR5cGVvZiBkLmRhdGEudmFsdWUgIT09ICd1bmRlZmluZWQnICYmIGQuZGF0YS52YWx1ZSAhPT0gbnVsbDtcclxuICAgICAgICAgIHJldHVybiBoYXNWYWx1ZVxyXG4gICAgICAgICAgICA/IHZhbHVlRm9ybWF0dGluZyh7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiBkLmRhdGEsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogZCA/IGQuZGF0YS5uYW1lIDogJycsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogZCAmJiBkLmRhdGEgPyBkLmRhdGEudmFsdWUgOiAnJ1xyXG4gICAgICAgICAgICAgIH0pLmxlbmd0aFxyXG4gICAgICAgICAgICA6IDA7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc29ydCgoYSwgYikgPT4gYiAtIGEpO1xyXG4gICAgICBjb25zdCBpZHggPSBNYXRoLmNlaWwodGhpcy5kYXRhLmxlbmd0aCAvIDIpO1xyXG4gICAgICB0aGlzLm1lZGlhblNpemUgPSBzb3J0ZWRMZW5ndGhzW2lkeF07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2FyZHMgPSB0aGlzLmdldENhcmRzKCk7XHJcbiAgICB0aGlzLmNhcmRzID0gY2FyZHMuZmlsdGVyKGQgPT4gZC5kYXRhLnZhbHVlICE9PSBudWxsKTtcclxuICAgIHRoaXMuZW1wdHlTbG90cyA9IGNhcmRzLmZpbHRlcihkID0+IGQuZGF0YS52YWx1ZSA9PT0gbnVsbCk7XHJcbiAgfVxyXG5cclxuICBnZXRDYXJkcygpOiBhbnlbXSB7XHJcbiAgICBjb25zdCB5UGFkZGluZyA9XHJcbiAgICAgIHR5cGVvZiB0aGlzLmlubmVyUGFkZGluZyA9PT0gJ251bWJlcicgPyB0aGlzLmlubmVyUGFkZGluZyA6IHRoaXMuaW5uZXJQYWRkaW5nWzBdICsgdGhpcy5pbm5lclBhZGRpbmdbMl07XHJcbiAgICBjb25zdCB4UGFkZGluZyA9XHJcbiAgICAgIHR5cGVvZiB0aGlzLmlubmVyUGFkZGluZyA9PT0gJ251bWJlcicgPyB0aGlzLmlubmVyUGFkZGluZyA6IHRoaXMuaW5uZXJQYWRkaW5nWzFdICsgdGhpcy5pbm5lclBhZGRpbmdbM107XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZGF0YS5tYXAoKGQsIGluZGV4KSA9PiB7XHJcbiAgICAgIGxldCBsYWJlbCA9IGQuZGF0YS5uYW1lO1xyXG4gICAgICBpZiAobGFiZWwgJiYgbGFiZWwuY29uc3RydWN0b3IubmFtZSA9PT0gJ0RhdGUnKSB7XHJcbiAgICAgICAgbGFiZWwgPSBsYWJlbC50b0xvY2FsZURhdGVTdHJpbmcoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsYWJlbCA9IGxhYmVsID8gbGFiZWwudG9Mb2NhbGVTdHJpbmcoKSA6IGxhYmVsO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCB2YWx1ZSA9IGQuZGF0YS52YWx1ZTtcclxuICAgICAgY29uc3QgdmFsdWVDb2xvciA9IGxhYmVsID8gdGhpcy5jb2xvcnMuZ2V0Q29sb3IobGFiZWwpIDogdGhpcy5lbXB0eUNvbG9yO1xyXG4gICAgICBjb25zdCBjb2xvciA9IHRoaXMuY2FyZENvbG9yIHx8IHZhbHVlQ29sb3IgfHwgJyMwMDAnO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHg6IGQueCxcclxuICAgICAgICB5OiBkLnksXHJcbiAgICAgICAgd2lkdGg6IGQud2lkdGggLSB4UGFkZGluZyxcclxuICAgICAgICBoZWlnaHQ6IGQuaGVpZ2h0IC0geVBhZGRpbmcsXHJcbiAgICAgICAgY29sb3IsXHJcbiAgICAgICAgYmFuZENvbG9yOiB0aGlzLmJhbmRDb2xvciB8fCB2YWx1ZUNvbG9yLFxyXG4gICAgICAgIHRleHRDb2xvcjogdGhpcy50ZXh0Q29sb3IgfHwgaW52ZXJ0Q29sb3IoY29sb3IpLFxyXG4gICAgICAgIGxhYmVsLFxyXG4gICAgICAgIGRhdGE6IGQuZGF0YSxcclxuICAgICAgICB0b29sdGlwVGV4dDogYCR7bGFiZWx9OiAke3ZhbHVlfWBcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdHJhY2tCeShpbmRleCwgY2FyZCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gY2FyZC5sYWJlbDtcclxuICB9XHJcblxyXG4gIG9uQ2xpY2soZGF0YSk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3QuZW1pdChkYXRhKTtcclxuICB9XHJcbn1cclxuIl19