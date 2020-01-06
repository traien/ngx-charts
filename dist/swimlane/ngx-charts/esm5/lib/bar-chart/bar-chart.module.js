import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { BarComponent } from './bar.component';
import { BarHorizontalComponent } from './bar-horizontal.component';
import { BarHorizontal2DComponent } from './bar-horizontal-2d.component';
import { BarHorizontalNormalizedComponent } from './bar-horizontal-normalized.component';
import { BarHorizontalStackedComponent } from './bar-horizontal-stacked.component';
import { BarVerticalComponent } from './bar-vertical.component';
import { BarVertical2DComponent } from './bar-vertical-2d.component';
import { BarVerticalNormalizedComponent } from './bar-vertical-normalized.component';
import { BarVerticalStackedComponent } from './bar-vertical-stacked.component';
import { SeriesHorizontal } from './series-horizontal.component';
import { SeriesVerticalComponent } from './series-vertical.component';
import { BarLabelComponent } from './bar-label.component';
var BarChartModule = /** @class */ (function () {
    function BarChartModule() {
    }
    BarChartModule = __decorate([
        NgModule({
            imports: [ChartCommonModule],
            declarations: [
                BarComponent,
                BarHorizontalComponent,
                BarHorizontal2DComponent,
                BarHorizontalNormalizedComponent,
                BarHorizontalStackedComponent,
                BarVerticalComponent,
                BarVertical2DComponent,
                BarVerticalNormalizedComponent,
                BarVerticalStackedComponent,
                BarLabelComponent,
                SeriesHorizontal,
                SeriesVerticalComponent
            ],
            exports: [
                BarComponent,
                BarHorizontalComponent,
                BarHorizontal2DComponent,
                BarHorizontalNormalizedComponent,
                BarHorizontalStackedComponent,
                BarVerticalComponent,
                BarVertical2DComponent,
                BarVerticalNormalizedComponent,
                BarVerticalStackedComponent,
                BarLabelComponent,
                SeriesHorizontal,
                SeriesVerticalComponent
            ]
        })
    ], BarChartModule);
    return BarChartModule;
}());
export { BarChartModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLWNoYXJ0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2Jhci1jaGFydC9iYXItY2hhcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN6RixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQWlDMUQ7SUFBQTtJQUE2QixDQUFDO0lBQWpCLGNBQWM7UUEvQjFCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixDQUFDO1lBQzVCLFlBQVksRUFBRTtnQkFDWixZQUFZO2dCQUNaLHNCQUFzQjtnQkFDdEIsd0JBQXdCO2dCQUN4QixnQ0FBZ0M7Z0JBQ2hDLDZCQUE2QjtnQkFDN0Isb0JBQW9CO2dCQUNwQixzQkFBc0I7Z0JBQ3RCLDhCQUE4QjtnQkFDOUIsMkJBQTJCO2dCQUMzQixpQkFBaUI7Z0JBQ2pCLGdCQUFnQjtnQkFDaEIsdUJBQXVCO2FBQ3hCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLFlBQVk7Z0JBQ1osc0JBQXNCO2dCQUN0Qix3QkFBd0I7Z0JBQ3hCLGdDQUFnQztnQkFDaEMsNkJBQTZCO2dCQUM3QixvQkFBb0I7Z0JBQ3BCLHNCQUFzQjtnQkFDdEIsOEJBQThCO2dCQUM5QiwyQkFBMkI7Z0JBQzNCLGlCQUFpQjtnQkFDakIsZ0JBQWdCO2dCQUNoQix1QkFBdUI7YUFDeEI7U0FDRixDQUFDO09BQ1csY0FBYyxDQUFHO0lBQUQscUJBQUM7Q0FBQSxBQUE5QixJQUE4QjtTQUFqQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2hhcnRDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY2hhcnQtY29tbW9uLm1vZHVsZSc7XHJcbmltcG9ydCB7IEJhckNvbXBvbmVudCB9IGZyb20gJy4vYmFyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEJhckhvcml6b250YWxDb21wb25lbnQgfSBmcm9tICcuL2Jhci1ob3Jpem9udGFsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEJhckhvcml6b250YWwyRENvbXBvbmVudCB9IGZyb20gJy4vYmFyLWhvcml6b250YWwtMmQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQmFySG9yaXpvbnRhbE5vcm1hbGl6ZWRDb21wb25lbnQgfSBmcm9tICcuL2Jhci1ob3Jpem9udGFsLW5vcm1hbGl6ZWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQmFySG9yaXpvbnRhbFN0YWNrZWRDb21wb25lbnQgfSBmcm9tICcuL2Jhci1ob3Jpem9udGFsLXN0YWNrZWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQmFyVmVydGljYWxDb21wb25lbnQgfSBmcm9tICcuL2Jhci12ZXJ0aWNhbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCYXJWZXJ0aWNhbDJEQ29tcG9uZW50IH0gZnJvbSAnLi9iYXItdmVydGljYWwtMmQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQmFyVmVydGljYWxOb3JtYWxpemVkQ29tcG9uZW50IH0gZnJvbSAnLi9iYXItdmVydGljYWwtbm9ybWFsaXplZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCYXJWZXJ0aWNhbFN0YWNrZWRDb21wb25lbnQgfSBmcm9tICcuL2Jhci12ZXJ0aWNhbC1zdGFja2VkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNlcmllc0hvcml6b250YWwgfSBmcm9tICcuL3Nlcmllcy1ob3Jpem9udGFsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNlcmllc1ZlcnRpY2FsQ29tcG9uZW50IH0gZnJvbSAnLi9zZXJpZXMtdmVydGljYWwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQmFyTGFiZWxDb21wb25lbnQgfSBmcm9tICcuL2Jhci1sYWJlbC5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ2hhcnRDb21tb25Nb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgQmFyQ29tcG9uZW50LFxyXG4gICAgQmFySG9yaXpvbnRhbENvbXBvbmVudCxcclxuICAgIEJhckhvcml6b250YWwyRENvbXBvbmVudCxcclxuICAgIEJhckhvcml6b250YWxOb3JtYWxpemVkQ29tcG9uZW50LFxyXG4gICAgQmFySG9yaXpvbnRhbFN0YWNrZWRDb21wb25lbnQsXHJcbiAgICBCYXJWZXJ0aWNhbENvbXBvbmVudCxcclxuICAgIEJhclZlcnRpY2FsMkRDb21wb25lbnQsXHJcbiAgICBCYXJWZXJ0aWNhbE5vcm1hbGl6ZWRDb21wb25lbnQsXHJcbiAgICBCYXJWZXJ0aWNhbFN0YWNrZWRDb21wb25lbnQsXHJcbiAgICBCYXJMYWJlbENvbXBvbmVudCxcclxuICAgIFNlcmllc0hvcml6b250YWwsXHJcbiAgICBTZXJpZXNWZXJ0aWNhbENvbXBvbmVudFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgQmFyQ29tcG9uZW50LFxyXG4gICAgQmFySG9yaXpvbnRhbENvbXBvbmVudCxcclxuICAgIEJhckhvcml6b250YWwyRENvbXBvbmVudCxcclxuICAgIEJhckhvcml6b250YWxOb3JtYWxpemVkQ29tcG9uZW50LFxyXG4gICAgQmFySG9yaXpvbnRhbFN0YWNrZWRDb21wb25lbnQsXHJcbiAgICBCYXJWZXJ0aWNhbENvbXBvbmVudCxcclxuICAgIEJhclZlcnRpY2FsMkRDb21wb25lbnQsXHJcbiAgICBCYXJWZXJ0aWNhbE5vcm1hbGl6ZWRDb21wb25lbnQsXHJcbiAgICBCYXJWZXJ0aWNhbFN0YWNrZWRDb21wb25lbnQsXHJcbiAgICBCYXJMYWJlbENvbXBvbmVudCxcclxuICAgIFNlcmllc0hvcml6b250YWwsXHJcbiAgICBTZXJpZXNWZXJ0aWNhbENvbXBvbmVudFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEJhckNoYXJ0TW9kdWxlIHt9XHJcbiJdfQ==