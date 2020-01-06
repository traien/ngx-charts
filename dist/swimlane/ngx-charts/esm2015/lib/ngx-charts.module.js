import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { ChartCommonModule } from './common/chart-common.module';
import { AreaChartModule } from './area-chart/area-chart.module';
import { BarChartModule } from './bar-chart/bar-chart.module';
import { BubbleChartModule } from './bubble-chart/bubble-chart.module';
import { HeatMapModule } from './heat-map/heat-map.module';
import { LineChartModule } from './line-chart/line-chart.module';
import { PolarChartModule } from './polar-chart/polar-chart.module';
import { NumberCardModule } from './number-card/number-card.module';
import { PieChartModule } from './pie-chart/pie-chart.module';
import { TreeMapModule } from './tree-map/tree-map.module';
import { GaugeModule } from './gauge/gauge.module';
import { ngxChartsPolyfills } from './polyfills';
let NgxChartsModule = class NgxChartsModule {
    constructor() {
        ngxChartsPolyfills();
    }
};
NgxChartsModule = __decorate([
    NgModule({
        exports: [
            ChartCommonModule,
            AreaChartModule,
            BarChartModule,
            BubbleChartModule,
            HeatMapModule,
            LineChartModule,
            PolarChartModule,
            NumberCardModule,
            PieChartModule,
            TreeMapModule,
            GaugeModule
        ]
    })
], NgxChartsModule);
export { NgxChartsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNoYXJ0cy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtY2hhcnRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBaUJqRCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBQzFCO1FBQ0Usa0JBQWtCLEVBQUUsQ0FBQztJQUN2QixDQUFDO0NBQ0YsQ0FBQTtBQUpZLGVBQWU7SUFmM0IsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsaUJBQWlCO1lBQ2pCLGVBQWU7WUFDZixjQUFjO1lBQ2QsaUJBQWlCO1lBQ2pCLGFBQWE7WUFDYixlQUFlO1lBQ2YsZ0JBQWdCO1lBQ2hCLGdCQUFnQjtZQUNoQixjQUFjO1lBQ2QsYUFBYTtZQUNiLFdBQVc7U0FDWjtLQUNGLENBQUM7R0FDVyxlQUFlLENBSTNCO1NBSlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENoYXJ0Q29tbW9uTW9kdWxlIH0gZnJvbSAnLi9jb21tb24vY2hhcnQtY29tbW9uLm1vZHVsZSc7XHJcbmltcG9ydCB7IEFyZWFDaGFydE1vZHVsZSB9IGZyb20gJy4vYXJlYS1jaGFydC9hcmVhLWNoYXJ0Lm1vZHVsZSc7XHJcbmltcG9ydCB7IEJhckNoYXJ0TW9kdWxlIH0gZnJvbSAnLi9iYXItY2hhcnQvYmFyLWNoYXJ0Lm1vZHVsZSc7XHJcbmltcG9ydCB7IEJ1YmJsZUNoYXJ0TW9kdWxlIH0gZnJvbSAnLi9idWJibGUtY2hhcnQvYnViYmxlLWNoYXJ0Lm1vZHVsZSc7XHJcbmltcG9ydCB7IEhlYXRNYXBNb2R1bGUgfSBmcm9tICcuL2hlYXQtbWFwL2hlYXQtbWFwLm1vZHVsZSc7XHJcbmltcG9ydCB7IExpbmVDaGFydE1vZHVsZSB9IGZyb20gJy4vbGluZS1jaGFydC9saW5lLWNoYXJ0Lm1vZHVsZSc7XHJcbmltcG9ydCB7IFBvbGFyQ2hhcnRNb2R1bGUgfSBmcm9tICcuL3BvbGFyLWNoYXJ0L3BvbGFyLWNoYXJ0Lm1vZHVsZSc7XHJcbmltcG9ydCB7IE51bWJlckNhcmRNb2R1bGUgfSBmcm9tICcuL251bWJlci1jYXJkL251bWJlci1jYXJkLm1vZHVsZSc7XHJcbmltcG9ydCB7IFBpZUNoYXJ0TW9kdWxlIH0gZnJvbSAnLi9waWUtY2hhcnQvcGllLWNoYXJ0Lm1vZHVsZSc7XHJcbmltcG9ydCB7IFRyZWVNYXBNb2R1bGUgfSBmcm9tICcuL3RyZWUtbWFwL3RyZWUtbWFwLm1vZHVsZSc7XHJcbmltcG9ydCB7IEdhdWdlTW9kdWxlIH0gZnJvbSAnLi9nYXVnZS9nYXVnZS5tb2R1bGUnO1xyXG5pbXBvcnQgeyBuZ3hDaGFydHNQb2x5ZmlsbHMgfSBmcm9tICcuL3BvbHlmaWxscyc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGV4cG9ydHM6IFtcclxuICAgIENoYXJ0Q29tbW9uTW9kdWxlLFxyXG4gICAgQXJlYUNoYXJ0TW9kdWxlLFxyXG4gICAgQmFyQ2hhcnRNb2R1bGUsXHJcbiAgICBCdWJibGVDaGFydE1vZHVsZSxcclxuICAgIEhlYXRNYXBNb2R1bGUsXHJcbiAgICBMaW5lQ2hhcnRNb2R1bGUsXHJcbiAgICBQb2xhckNoYXJ0TW9kdWxlLFxyXG4gICAgTnVtYmVyQ2FyZE1vZHVsZSxcclxuICAgIFBpZUNoYXJ0TW9kdWxlLFxyXG4gICAgVHJlZU1hcE1vZHVsZSxcclxuICAgIEdhdWdlTW9kdWxlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4Q2hhcnRzTW9kdWxlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIG5neENoYXJ0c1BvbHlmaWxscygpO1xyXG4gIH1cclxufVxyXG4iXX0=