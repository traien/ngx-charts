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
let PieChartModule = class PieChartModule {
};
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
export { PieChartModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWNoYXJ0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL3BpZS1jaGFydC9waWUtY2hhcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQXVCNUQsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztDQUFHLENBQUE7QUFBakIsY0FBYztJQXJCMUIsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUM7UUFDNUIsWUFBWSxFQUFFO1lBQ1oseUJBQXlCO1lBQ3pCLGlCQUFpQjtZQUNqQixlQUFlO1lBQ2YsaUJBQWlCO1lBQ2pCLGdCQUFnQjtZQUNoQixzQkFBc0I7WUFDdEIsa0JBQWtCO1NBQ25CO1FBQ0QsT0FBTyxFQUFFO1lBQ1AseUJBQXlCO1lBQ3pCLGlCQUFpQjtZQUNqQixlQUFlO1lBQ2YsaUJBQWlCO1lBQ2pCLGdCQUFnQjtZQUNoQixzQkFBc0I7WUFDdEIsa0JBQWtCO1NBQ25CO0tBQ0YsQ0FBQztHQUNXLGNBQWMsQ0FBRztTQUFqQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2hhcnRDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY2hhcnQtY29tbW9uLm1vZHVsZSc7XHJcbmltcG9ydCB7IEFkdmFuY2VkUGllQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuL2FkdmFuY2VkLXBpZS1jaGFydC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQaWVMYWJlbENvbXBvbmVudCB9IGZyb20gJy4vcGllLWxhYmVsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFBpZUFyY0NvbXBvbmVudCB9IGZyb20gJy4vcGllLWFyYy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQaWVDaGFydENvbXBvbmVudCB9IGZyb20gJy4vcGllLWNoYXJ0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFBpZUdyaWRDb21wb25lbnQgfSBmcm9tICcuL3BpZS1ncmlkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFBpZUdyaWRTZXJpZXNDb21wb25lbnQgfSBmcm9tICcuL3BpZS1ncmlkLXNlcmllcy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQaWVTZXJpZXNDb21wb25lbnQgfSBmcm9tICcuL3BpZS1zZXJpZXMuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NoYXJ0Q29tbW9uTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEFkdmFuY2VkUGllQ2hhcnRDb21wb25lbnQsXHJcbiAgICBQaWVMYWJlbENvbXBvbmVudCxcclxuICAgIFBpZUFyY0NvbXBvbmVudCxcclxuICAgIFBpZUNoYXJ0Q29tcG9uZW50LFxyXG4gICAgUGllR3JpZENvbXBvbmVudCxcclxuICAgIFBpZUdyaWRTZXJpZXNDb21wb25lbnQsXHJcbiAgICBQaWVTZXJpZXNDb21wb25lbnRcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIEFkdmFuY2VkUGllQ2hhcnRDb21wb25lbnQsXHJcbiAgICBQaWVMYWJlbENvbXBvbmVudCxcclxuICAgIFBpZUFyY0NvbXBvbmVudCxcclxuICAgIFBpZUNoYXJ0Q29tcG9uZW50LFxyXG4gICAgUGllR3JpZENvbXBvbmVudCxcclxuICAgIFBpZUdyaWRTZXJpZXNDb21wb25lbnQsXHJcbiAgICBQaWVTZXJpZXNDb21wb25lbnRcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQaWVDaGFydE1vZHVsZSB7fVxyXG4iXX0=