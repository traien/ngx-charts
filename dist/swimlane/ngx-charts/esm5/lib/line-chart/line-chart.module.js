import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { LineComponent } from './line.component';
import { LineChartComponent } from './line-chart.component';
import { LineSeriesComponent } from './line-series.component';
var LineChartModule = /** @class */ (function () {
    function LineChartModule() {
    }
    LineChartModule = __decorate([
        NgModule({
            imports: [ChartCommonModule],
            declarations: [LineComponent, LineChartComponent, LineSeriesComponent],
            exports: [LineComponent, LineChartComponent, LineSeriesComponent]
        })
    ], LineChartModule);
    return LineChartModule;
}());
export { LineChartModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS1jaGFydC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9saW5lLWNoYXJ0L2xpbmUtY2hhcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQU85RDtJQUFBO0lBQThCLENBQUM7SUFBbEIsZUFBZTtRQUwzQixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztZQUM1QixZQUFZLEVBQUUsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1CLENBQUM7WUFDdEUsT0FBTyxFQUFFLENBQUMsYUFBYSxFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixDQUFDO1NBQ2xFLENBQUM7T0FDVyxlQUFlLENBQUc7SUFBRCxzQkFBQztDQUFBLEFBQS9CLElBQStCO1NBQWxCLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDaGFydENvbW1vbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9jaGFydC1jb21tb24ubW9kdWxlJztcclxuaW1wb3J0IHsgTGluZUNvbXBvbmVudCB9IGZyb20gJy4vbGluZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBMaW5lQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuL2xpbmUtY2hhcnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTGluZVNlcmllc0NvbXBvbmVudCB9IGZyb20gJy4vbGluZS1zZXJpZXMuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NoYXJ0Q29tbW9uTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtMaW5lQ29tcG9uZW50LCBMaW5lQ2hhcnRDb21wb25lbnQsIExpbmVTZXJpZXNDb21wb25lbnRdLFxyXG4gIGV4cG9ydHM6IFtMaW5lQ29tcG9uZW50LCBMaW5lQ2hhcnRDb21wb25lbnQsIExpbmVTZXJpZXNDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaW5lQ2hhcnRNb2R1bGUge31cclxuIl19