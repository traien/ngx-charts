import { __decorate } from "tslib";
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
let GridPanelSeriesComponent = class GridPanelSeriesComponent {
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.gridPanels = this.getGridPanels();
    }
    getGridPanels() {
        return this.data.map(d => {
            let offset;
            let width;
            let height;
            let x;
            let y;
            let className = 'odd';
            if (this.orient === 'vertical') {
                const position = this.xScale(d.name);
                const positionIndex = Number.parseInt((position / this.xScale.step()).toString(), 10);
                if (positionIndex % 2 === 1) {
                    className = 'even';
                }
                offset = this.xScale.bandwidth() * this.xScale.paddingInner();
                width = this.xScale.bandwidth() + offset;
                height = this.dims.height;
                x = this.xScale(d.name) - offset / 2;
                y = 0;
            }
            else if (this.orient === 'horizontal') {
                const position = this.yScale(d.name);
                const positionIndex = Number.parseInt((position / this.yScale.step()).toString(), 10);
                if (positionIndex % 2 === 1) {
                    className = 'even';
                }
                offset = this.yScale.bandwidth() * this.yScale.paddingInner();
                width = this.dims.width;
                height = this.yScale.bandwidth() + offset;
                x = 0;
                y = this.yScale(d.name) - offset / 2;
            }
            return {
                name: d.name,
                class: className,
                height,
                width,
                x,
                y
            };
        });
    }
};
__decorate([
    Input()
], GridPanelSeriesComponent.prototype, "data", void 0);
__decorate([
    Input()
], GridPanelSeriesComponent.prototype, "dims", void 0);
__decorate([
    Input()
], GridPanelSeriesComponent.prototype, "xScale", void 0);
__decorate([
    Input()
], GridPanelSeriesComponent.prototype, "yScale", void 0);
__decorate([
    Input()
], GridPanelSeriesComponent.prototype, "orient", void 0);
GridPanelSeriesComponent = __decorate([
    Component({
        selector: 'g[ngx-charts-grid-panel-series]',
        template: `
    <svg:g
      ngx-charts-grid-panel
      *ngFor="let gridPanel of gridPanels"
      [height]="gridPanel.height"
      [width]="gridPanel.width"
      [x]="gridPanel.x"
      [y]="gridPanel.y"
      [class.grid-panel]="true"
      [class.odd]="gridPanel.class === 'odd'"
      [class.even]="gridPanel.class === 'even'"
    ></svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], GridPanelSeriesComponent);
export { GridPanelSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1wYW5lbC1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL2dyaWQtcGFuZWwtc2VyaWVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsS0FBSyxFQUFhLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBbUJwRyxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF3QjtJQWtCbkMsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxhQUFhO1FBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN2QixJQUFJLE1BQU0sQ0FBQztZQUNYLElBQUksS0FBSyxDQUFDO1lBQ1YsSUFBSSxNQUFNLENBQUM7WUFDWCxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBRXRCLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxVQUFVLEVBQUU7Z0JBQzlCLE1BQU0sUUFBUSxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM3QyxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFFdEYsSUFBSSxhQUFhLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDM0IsU0FBUyxHQUFHLE1BQU0sQ0FBQztpQkFDcEI7Z0JBQ0QsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDOUQsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsTUFBTSxDQUFDO2dCQUN6QyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQzFCLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ1A7aUJBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFlBQVksRUFBRTtnQkFDdkMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JDLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUV0RixJQUFJLGFBQWEsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUMzQixTQUFTLEdBQUcsTUFBTSxDQUFDO2lCQUNwQjtnQkFDRCxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUU5RCxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3hCLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLE1BQU0sQ0FBQztnQkFDMUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDTixDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQzthQUN0QztZQUVELE9BQU87Z0JBQ0wsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJO2dCQUNaLEtBQUssRUFBRSxTQUFTO2dCQUNoQixNQUFNO2dCQUNOLEtBQUs7Z0JBQ0wsQ0FBQztnQkFDRCxDQUFDO2FBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLENBQUE7QUFwRUM7SUFEQyxLQUFLLEVBQUU7c0RBQ0g7QUFHTDtJQURDLEtBQUssRUFBRTtzREFDSDtBQUdMO0lBREMsS0FBSyxFQUFFO3dEQUNEO0FBR1A7SUFEQyxLQUFLLEVBQUU7d0RBQ0Q7QUFHUDtJQURDLEtBQUssRUFBRTt3REFDRDtBQWhCSSx3QkFBd0I7SUFqQnBDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxpQ0FBaUM7UUFDM0MsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7R0FZVDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO0tBQ2hELENBQUM7R0FDVyx3QkFBd0IsQ0F3RXBDO1NBeEVZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgU2ltcGxlQ2hhbmdlcywgSW5wdXQsIE9uQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLWdyaWQtcGFuZWwtc2VyaWVzXScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxzdmc6Z1xyXG4gICAgICBuZ3gtY2hhcnRzLWdyaWQtcGFuZWxcclxuICAgICAgKm5nRm9yPVwibGV0IGdyaWRQYW5lbCBvZiBncmlkUGFuZWxzXCJcclxuICAgICAgW2hlaWdodF09XCJncmlkUGFuZWwuaGVpZ2h0XCJcclxuICAgICAgW3dpZHRoXT1cImdyaWRQYW5lbC53aWR0aFwiXHJcbiAgICAgIFt4XT1cImdyaWRQYW5lbC54XCJcclxuICAgICAgW3ldPVwiZ3JpZFBhbmVsLnlcIlxyXG4gICAgICBbY2xhc3MuZ3JpZC1wYW5lbF09XCJ0cnVlXCJcclxuICAgICAgW2NsYXNzLm9kZF09XCJncmlkUGFuZWwuY2xhc3MgPT09ICdvZGQnXCJcclxuICAgICAgW2NsYXNzLmV2ZW5dPVwiZ3JpZFBhbmVsLmNsYXNzID09PSAnZXZlbidcIlxyXG4gICAgPjwvc3ZnOmc+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgR3JpZFBhbmVsU2VyaWVzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBncmlkUGFuZWxzOiBhbnlbXTtcclxuXHJcbiAgQElucHV0KClcclxuICBkYXRhO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGRpbXM7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgeFNjYWxlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHlTY2FsZTtcclxuXHJcbiAgQElucHV0KClcclxuICBvcmllbnQ7XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLmdyaWRQYW5lbHMgPSB0aGlzLmdldEdyaWRQYW5lbHMoKTtcclxuICB9XHJcblxyXG4gIGdldEdyaWRQYW5lbHMoKTogYW55W10ge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YS5tYXAoZCA9PiB7XHJcbiAgICAgIGxldCBvZmZzZXQ7XHJcbiAgICAgIGxldCB3aWR0aDtcclxuICAgICAgbGV0IGhlaWdodDtcclxuICAgICAgbGV0IHg7XHJcbiAgICAgIGxldCB5O1xyXG4gICAgICBsZXQgY2xhc3NOYW1lID0gJ29kZCc7XHJcblxyXG4gICAgICBpZiAodGhpcy5vcmllbnQgPT09ICd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICBjb25zdCBwb3NpdGlvbjogbnVtYmVyID0gdGhpcy54U2NhbGUoZC5uYW1lKTtcclxuICAgICAgICBjb25zdCBwb3NpdGlvbkluZGV4ID0gTnVtYmVyLnBhcnNlSW50KChwb3NpdGlvbiAvIHRoaXMueFNjYWxlLnN0ZXAoKSkudG9TdHJpbmcoKSwgMTApO1xyXG5cclxuICAgICAgICBpZiAocG9zaXRpb25JbmRleCAlIDIgPT09IDEpIHtcclxuICAgICAgICAgIGNsYXNzTmFtZSA9ICdldmVuJztcclxuICAgICAgICB9XHJcbiAgICAgICAgb2Zmc2V0ID0gdGhpcy54U2NhbGUuYmFuZHdpZHRoKCkgKiB0aGlzLnhTY2FsZS5wYWRkaW5nSW5uZXIoKTtcclxuICAgICAgICB3aWR0aCA9IHRoaXMueFNjYWxlLmJhbmR3aWR0aCgpICsgb2Zmc2V0O1xyXG4gICAgICAgIGhlaWdodCA9IHRoaXMuZGltcy5oZWlnaHQ7XHJcbiAgICAgICAgeCA9IHRoaXMueFNjYWxlKGQubmFtZSkgLSBvZmZzZXQgLyAyO1xyXG4gICAgICAgIHkgPSAwO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMub3JpZW50ID09PSAnaG9yaXpvbnRhbCcpIHtcclxuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMueVNjYWxlKGQubmFtZSk7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb25JbmRleCA9IE51bWJlci5wYXJzZUludCgocG9zaXRpb24gLyB0aGlzLnlTY2FsZS5zdGVwKCkpLnRvU3RyaW5nKCksIDEwKTtcclxuXHJcbiAgICAgICAgaWYgKHBvc2l0aW9uSW5kZXggJSAyID09PSAxKSB7XHJcbiAgICAgICAgICBjbGFzc05hbWUgPSAnZXZlbic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9mZnNldCA9IHRoaXMueVNjYWxlLmJhbmR3aWR0aCgpICogdGhpcy55U2NhbGUucGFkZGluZ0lubmVyKCk7XHJcblxyXG4gICAgICAgIHdpZHRoID0gdGhpcy5kaW1zLndpZHRoO1xyXG4gICAgICAgIGhlaWdodCA9IHRoaXMueVNjYWxlLmJhbmR3aWR0aCgpICsgb2Zmc2V0O1xyXG4gICAgICAgIHggPSAwO1xyXG4gICAgICAgIHkgPSB0aGlzLnlTY2FsZShkLm5hbWUpIC0gb2Zmc2V0IC8gMjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lOiBkLm5hbWUsXHJcbiAgICAgICAgY2xhc3M6IGNsYXNzTmFtZSxcclxuICAgICAgICBoZWlnaHQsXHJcbiAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgeCxcclxuICAgICAgICB5XHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19