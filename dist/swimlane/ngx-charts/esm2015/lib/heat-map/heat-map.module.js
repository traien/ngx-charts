import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { HeatMapCellComponent } from './heat-map-cell.component';
import { HeatCellSeriesComponent } from './heat-map-cell-series.component';
import { HeatMapComponent } from './heat-map.component';
let HeatMapModule = class HeatMapModule {
};
HeatMapModule = __decorate([
    NgModule({
        imports: [ChartCommonModule],
        declarations: [HeatMapCellComponent, HeatCellSeriesComponent, HeatMapComponent],
        exports: [HeatMapCellComponent, HeatCellSeriesComponent, HeatMapComponent]
    })
], HeatMapModule);
export { HeatMapModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhdC1tYXAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvaGVhdC1tYXAvaGVhdC1tYXAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBT3hELElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7Q0FBRyxDQUFBO0FBQWhCLGFBQWE7SUFMekIsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUM7UUFDNUIsWUFBWSxFQUFFLENBQUMsb0JBQW9CLEVBQUUsdUJBQXVCLEVBQUUsZ0JBQWdCLENBQUM7UUFDL0UsT0FBTyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsdUJBQXVCLEVBQUUsZ0JBQWdCLENBQUM7S0FDM0UsQ0FBQztHQUNXLGFBQWEsQ0FBRztTQUFoQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2hhcnRDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY2hhcnQtY29tbW9uLm1vZHVsZSc7XHJcbmltcG9ydCB7IEhlYXRNYXBDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi9oZWF0LW1hcC1jZWxsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEhlYXRDZWxsU2VyaWVzQ29tcG9uZW50IH0gZnJvbSAnLi9oZWF0LW1hcC1jZWxsLXNlcmllcy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBIZWF0TWFwQ29tcG9uZW50IH0gZnJvbSAnLi9oZWF0LW1hcC5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ2hhcnRDb21tb25Nb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW0hlYXRNYXBDZWxsQ29tcG9uZW50LCBIZWF0Q2VsbFNlcmllc0NvbXBvbmVudCwgSGVhdE1hcENvbXBvbmVudF0sXHJcbiAgZXhwb3J0czogW0hlYXRNYXBDZWxsQ29tcG9uZW50LCBIZWF0Q2VsbFNlcmllc0NvbXBvbmVudCwgSGVhdE1hcENvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEhlYXRNYXBNb2R1bGUge31cclxuIl19