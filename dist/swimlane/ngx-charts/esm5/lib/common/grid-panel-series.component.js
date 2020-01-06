import { __decorate } from "tslib";
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
var GridPanelSeriesComponent = /** @class */ (function () {
    function GridPanelSeriesComponent() {
    }
    GridPanelSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    GridPanelSeriesComponent.prototype.update = function () {
        this.gridPanels = this.getGridPanels();
    };
    GridPanelSeriesComponent.prototype.getGridPanels = function () {
        var _this = this;
        return this.data.map(function (d) {
            var offset;
            var width;
            var height;
            var x;
            var y;
            var className = 'odd';
            if (_this.orient === 'vertical') {
                var position = _this.xScale(d.name);
                var positionIndex = Number.parseInt((position / _this.xScale.step()).toString(), 10);
                if (positionIndex % 2 === 1) {
                    className = 'even';
                }
                offset = _this.xScale.bandwidth() * _this.xScale.paddingInner();
                width = _this.xScale.bandwidth() + offset;
                height = _this.dims.height;
                x = _this.xScale(d.name) - offset / 2;
                y = 0;
            }
            else if (_this.orient === 'horizontal') {
                var position = _this.yScale(d.name);
                var positionIndex = Number.parseInt((position / _this.yScale.step()).toString(), 10);
                if (positionIndex % 2 === 1) {
                    className = 'even';
                }
                offset = _this.yScale.bandwidth() * _this.yScale.paddingInner();
                width = _this.dims.width;
                height = _this.yScale.bandwidth() + offset;
                x = 0;
                y = _this.yScale(d.name) - offset / 2;
            }
            return {
                name: d.name,
                class: className,
                height: height,
                width: width,
                x: x,
                y: y
            };
        });
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
            template: "\n    <svg:g\n      ngx-charts-grid-panel\n      *ngFor=\"let gridPanel of gridPanels\"\n      [height]=\"gridPanel.height\"\n      [width]=\"gridPanel.width\"\n      [x]=\"gridPanel.x\"\n      [y]=\"gridPanel.y\"\n      [class.grid-panel]=\"true\"\n      [class.odd]=\"gridPanel.class === 'odd'\"\n      [class.even]=\"gridPanel.class === 'even'\"\n    ></svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], GridPanelSeriesComponent);
    return GridPanelSeriesComponent;
}());
export { GridPanelSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1wYW5lbC1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL2dyaWQtcGFuZWwtc2VyaWVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsS0FBSyxFQUFhLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBbUJwRztJQUFBO0lBd0VBLENBQUM7SUF0REMsOENBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQseUNBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxnREFBYSxHQUFiO1FBQUEsaUJBNkNDO1FBNUNDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO1lBQ3BCLElBQUksTUFBTSxDQUFDO1lBQ1gsSUFBSSxLQUFLLENBQUM7WUFDVixJQUFJLE1BQU0sQ0FBQztZQUNYLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFFdEIsSUFBSSxLQUFJLENBQUMsTUFBTSxLQUFLLFVBQVUsRUFBRTtnQkFDOUIsSUFBTSxRQUFRLEdBQVcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdDLElBQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUV0RixJQUFJLGFBQWEsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUMzQixTQUFTLEdBQUcsTUFBTSxDQUFDO2lCQUNwQjtnQkFDRCxNQUFNLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUM5RCxLQUFLLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxNQUFNLENBQUM7Z0JBQ3pDLE1BQU0sR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDMUIsQ0FBQyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQ3JDLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDUDtpQkFBTSxJQUFJLEtBQUksQ0FBQyxNQUFNLEtBQUssWUFBWSxFQUFFO2dCQUN2QyxJQUFNLFFBQVEsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckMsSUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBRXRGLElBQUksYUFBYSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQzNCLFNBQVMsR0FBRyxNQUFNLENBQUM7aUJBQ3BCO2dCQUNELE1BQU0sR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBRTlELEtBQUssR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDeEIsTUFBTSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsTUFBTSxDQUFDO2dCQUMxQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNOLENBQUMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2FBQ3RDO1lBRUQsT0FBTztnQkFDTCxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7Z0JBQ1osS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLE1BQU0sUUFBQTtnQkFDTixLQUFLLE9BQUE7Z0JBQ0wsQ0FBQyxHQUFBO2dCQUNELENBQUMsR0FBQTthQUNGLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFuRUQ7UUFEQyxLQUFLLEVBQUU7MERBQ0g7SUFHTDtRQURDLEtBQUssRUFBRTswREFDSDtJQUdMO1FBREMsS0FBSyxFQUFFOzREQUNEO0lBR1A7UUFEQyxLQUFLLEVBQUU7NERBQ0Q7SUFHUDtRQURDLEtBQUssRUFBRTs0REFDRDtJQWhCSSx3QkFBd0I7UUFqQnBDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxpQ0FBaUM7WUFDM0MsUUFBUSxFQUFFLGlYQVlUO1lBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQztPQUNXLHdCQUF3QixDQXdFcEM7SUFBRCwrQkFBQztDQUFBLEFBeEVELElBd0VDO1NBeEVZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgU2ltcGxlQ2hhbmdlcywgSW5wdXQsIE9uQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLWdyaWQtcGFuZWwtc2VyaWVzXScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxzdmc6Z1xyXG4gICAgICBuZ3gtY2hhcnRzLWdyaWQtcGFuZWxcclxuICAgICAgKm5nRm9yPVwibGV0IGdyaWRQYW5lbCBvZiBncmlkUGFuZWxzXCJcclxuICAgICAgW2hlaWdodF09XCJncmlkUGFuZWwuaGVpZ2h0XCJcclxuICAgICAgW3dpZHRoXT1cImdyaWRQYW5lbC53aWR0aFwiXHJcbiAgICAgIFt4XT1cImdyaWRQYW5lbC54XCJcclxuICAgICAgW3ldPVwiZ3JpZFBhbmVsLnlcIlxyXG4gICAgICBbY2xhc3MuZ3JpZC1wYW5lbF09XCJ0cnVlXCJcclxuICAgICAgW2NsYXNzLm9kZF09XCJncmlkUGFuZWwuY2xhc3MgPT09ICdvZGQnXCJcclxuICAgICAgW2NsYXNzLmV2ZW5dPVwiZ3JpZFBhbmVsLmNsYXNzID09PSAnZXZlbidcIlxyXG4gICAgPjwvc3ZnOmc+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgR3JpZFBhbmVsU2VyaWVzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBncmlkUGFuZWxzOiBhbnlbXTtcclxuXHJcbiAgQElucHV0KClcclxuICBkYXRhO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGRpbXM7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgeFNjYWxlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHlTY2FsZTtcclxuXHJcbiAgQElucHV0KClcclxuICBvcmllbnQ7XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLmdyaWRQYW5lbHMgPSB0aGlzLmdldEdyaWRQYW5lbHMoKTtcclxuICB9XHJcblxyXG4gIGdldEdyaWRQYW5lbHMoKTogYW55W10ge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YS5tYXAoZCA9PiB7XHJcbiAgICAgIGxldCBvZmZzZXQ7XHJcbiAgICAgIGxldCB3aWR0aDtcclxuICAgICAgbGV0IGhlaWdodDtcclxuICAgICAgbGV0IHg7XHJcbiAgICAgIGxldCB5O1xyXG4gICAgICBsZXQgY2xhc3NOYW1lID0gJ29kZCc7XHJcblxyXG4gICAgICBpZiAodGhpcy5vcmllbnQgPT09ICd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICBjb25zdCBwb3NpdGlvbjogbnVtYmVyID0gdGhpcy54U2NhbGUoZC5uYW1lKTtcclxuICAgICAgICBjb25zdCBwb3NpdGlvbkluZGV4ID0gTnVtYmVyLnBhcnNlSW50KChwb3NpdGlvbiAvIHRoaXMueFNjYWxlLnN0ZXAoKSkudG9TdHJpbmcoKSwgMTApO1xyXG5cclxuICAgICAgICBpZiAocG9zaXRpb25JbmRleCAlIDIgPT09IDEpIHtcclxuICAgICAgICAgIGNsYXNzTmFtZSA9ICdldmVuJztcclxuICAgICAgICB9XHJcbiAgICAgICAgb2Zmc2V0ID0gdGhpcy54U2NhbGUuYmFuZHdpZHRoKCkgKiB0aGlzLnhTY2FsZS5wYWRkaW5nSW5uZXIoKTtcclxuICAgICAgICB3aWR0aCA9IHRoaXMueFNjYWxlLmJhbmR3aWR0aCgpICsgb2Zmc2V0O1xyXG4gICAgICAgIGhlaWdodCA9IHRoaXMuZGltcy5oZWlnaHQ7XHJcbiAgICAgICAgeCA9IHRoaXMueFNjYWxlKGQubmFtZSkgLSBvZmZzZXQgLyAyO1xyXG4gICAgICAgIHkgPSAwO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMub3JpZW50ID09PSAnaG9yaXpvbnRhbCcpIHtcclxuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMueVNjYWxlKGQubmFtZSk7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb25JbmRleCA9IE51bWJlci5wYXJzZUludCgocG9zaXRpb24gLyB0aGlzLnlTY2FsZS5zdGVwKCkpLnRvU3RyaW5nKCksIDEwKTtcclxuXHJcbiAgICAgICAgaWYgKHBvc2l0aW9uSW5kZXggJSAyID09PSAxKSB7XHJcbiAgICAgICAgICBjbGFzc05hbWUgPSAnZXZlbic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9mZnNldCA9IHRoaXMueVNjYWxlLmJhbmR3aWR0aCgpICogdGhpcy55U2NhbGUucGFkZGluZ0lubmVyKCk7XHJcblxyXG4gICAgICAgIHdpZHRoID0gdGhpcy5kaW1zLndpZHRoO1xyXG4gICAgICAgIGhlaWdodCA9IHRoaXMueVNjYWxlLmJhbmR3aWR0aCgpICsgb2Zmc2V0O1xyXG4gICAgICAgIHggPSAwO1xyXG4gICAgICAgIHkgPSB0aGlzLnlTY2FsZShkLm5hbWUpIC0gb2Zmc2V0IC8gMjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lOiBkLm5hbWUsXHJcbiAgICAgICAgY2xhc3M6IGNsYXNzTmFtZSxcclxuICAgICAgICBoZWlnaHQsXHJcbiAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgeCxcclxuICAgICAgICB5XHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19