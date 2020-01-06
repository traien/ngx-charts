import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { AdvancedPieChartComponent } from './advanced-pie-chart.component';
import { PieLabelComponent } from './pie-label.component';
import { PieArcComponent } from './pie-arc.component';
import { PieChartComponent } from './pie-chart.component';
import { PieGridComponent } from './pie-grid.component';
import { PieGridSeriesComponent } from './pie-grid-series.component';
import { PieSeriesComponent } from './pie-series.component';
var PieChartModule = /** @class */ (function () {
    function PieChartModule() {
    }
    PieChartModule = __decorate([
        NgModule({
            imports: [ChartCommonModule],
            declarations: [
                AdvancedPieChartComponent,
                PieLabelComponent,
                PieArcComponent,
                PieChartComponent,
                PieGridComponent,
                PieGridSeriesComponent,
                PieSeriesComponent
            ],
            exports: [
                AdvancedPieChartComponent,
                PieLabelComponent,
                PieArcComponent,
                PieChartComponent,
                PieGridComponent,
                PieGridSeriesComponent,
                PieSeriesComponent
            ]
        })
    ], PieChartModule);
    return PieChartModule;
}());
export { PieChartModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWNoYXJ0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL3BpZS1jaGFydC9waWUtY2hhcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQXVCNUQ7SUFBQTtJQUE2QixDQUFDO0lBQWpCLGNBQWM7UUFyQjFCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixDQUFDO1lBQzVCLFlBQVksRUFBRTtnQkFDWix5QkFBeUI7Z0JBQ3pCLGlCQUFpQjtnQkFDakIsZUFBZTtnQkFDZixpQkFBaUI7Z0JBQ2pCLGdCQUFnQjtnQkFDaEIsc0JBQXNCO2dCQUN0QixrQkFBa0I7YUFDbkI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AseUJBQXlCO2dCQUN6QixpQkFBaUI7Z0JBQ2pCLGVBQWU7Z0JBQ2YsaUJBQWlCO2dCQUNqQixnQkFBZ0I7Z0JBQ2hCLHNCQUFzQjtnQkFDdEIsa0JBQWtCO2FBQ25CO1NBQ0YsQ0FBQztPQUNXLGNBQWMsQ0FBRztJQUFELHFCQUFDO0NBQUEsQUFBOUIsSUFBOEI7U0FBakIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENoYXJ0Q29tbW9uTW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uL2NoYXJ0LWNvbW1vbi5tb2R1bGUnO1xyXG5pbXBvcnQgeyBBZHZhbmNlZFBpZUNoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi9hZHZhbmNlZC1waWUtY2hhcnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUGllTGFiZWxDb21wb25lbnQgfSBmcm9tICcuL3BpZS1sYWJlbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQaWVBcmNDb21wb25lbnQgfSBmcm9tICcuL3BpZS1hcmMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUGllQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuL3BpZS1jaGFydC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQaWVHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9waWUtZ3JpZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQaWVHcmlkU2VyaWVzQ29tcG9uZW50IH0gZnJvbSAnLi9waWUtZ3JpZC1zZXJpZXMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUGllU2VyaWVzQ29tcG9uZW50IH0gZnJvbSAnLi9waWUtc2VyaWVzLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDaGFydENvbW1vbk1vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBBZHZhbmNlZFBpZUNoYXJ0Q29tcG9uZW50LFxyXG4gICAgUGllTGFiZWxDb21wb25lbnQsXHJcbiAgICBQaWVBcmNDb21wb25lbnQsXHJcbiAgICBQaWVDaGFydENvbXBvbmVudCxcclxuICAgIFBpZUdyaWRDb21wb25lbnQsXHJcbiAgICBQaWVHcmlkU2VyaWVzQ29tcG9uZW50LFxyXG4gICAgUGllU2VyaWVzQ29tcG9uZW50XHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBBZHZhbmNlZFBpZUNoYXJ0Q29tcG9uZW50LFxyXG4gICAgUGllTGFiZWxDb21wb25lbnQsXHJcbiAgICBQaWVBcmNDb21wb25lbnQsXHJcbiAgICBQaWVDaGFydENvbXBvbmVudCxcclxuICAgIFBpZUdyaWRDb21wb25lbnQsXHJcbiAgICBQaWVHcmlkU2VyaWVzQ29tcG9uZW50LFxyXG4gICAgUGllU2VyaWVzQ29tcG9uZW50XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGllQ2hhcnRNb2R1bGUge31cclxuIl19