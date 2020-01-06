import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { PolarChartComponent } from './polar-chart.component';
import { PolarSeriesComponent } from './polar-series.component';
import { PieChartModule } from '../pie-chart/';
import { LineChartModule } from '../line-chart/';
var PolarChartModule = /** @class */ (function () {
    function PolarChartModule() {
    }
    PolarChartModule = __decorate([
        NgModule({
            imports: [ChartCommonModule, PieChartModule, LineChartModule],
            declarations: [PolarChartComponent, PolarSeriesComponent],
            exports: [PolarChartComponent, PolarSeriesComponent]
        })
    ], PolarChartModule);
    return PolarChartModule;
}());
export { PolarChartModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9sYXItY2hhcnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvcG9sYXItY2hhcnQvcG9sYXItY2hhcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBT2pEO0lBQUE7SUFBK0IsQ0FBQztJQUFuQixnQkFBZ0I7UUFMNUIsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLGVBQWUsQ0FBQztZQUM3RCxZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxvQkFBb0IsQ0FBQztZQUN6RCxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxvQkFBb0IsQ0FBQztTQUNyRCxDQUFDO09BQ1csZ0JBQWdCLENBQUc7SUFBRCx1QkFBQztDQUFBLEFBQWhDLElBQWdDO1NBQW5CLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENoYXJ0Q29tbW9uTW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uL2NoYXJ0LWNvbW1vbi5tb2R1bGUnO1xyXG5pbXBvcnQgeyBQb2xhckNoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi9wb2xhci1jaGFydC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQb2xhclNlcmllc0NvbXBvbmVudCB9IGZyb20gJy4vcG9sYXItc2VyaWVzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFBpZUNoYXJ0TW9kdWxlIH0gZnJvbSAnLi4vcGllLWNoYXJ0Lyc7XHJcbmltcG9ydCB7IExpbmVDaGFydE1vZHVsZSB9IGZyb20gJy4uL2xpbmUtY2hhcnQvJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NoYXJ0Q29tbW9uTW9kdWxlLCBQaWVDaGFydE1vZHVsZSwgTGluZUNoYXJ0TW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtQb2xhckNoYXJ0Q29tcG9uZW50LCBQb2xhclNlcmllc0NvbXBvbmVudF0sXHJcbiAgZXhwb3J0czogW1BvbGFyQ2hhcnRDb21wb25lbnQsIFBvbGFyU2VyaWVzQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUG9sYXJDaGFydE1vZHVsZSB7fVxyXG4iXX0=