import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './tooltip.directive';
import { TooltipContentComponent } from './tooltip.component';
import { TooltipService } from './tooltip.service';
import { InjectionService } from './injection.service';
var TooltipModule = /** @class */ (function () {
    function TooltipModule() {
    }
    TooltipModule = __decorate([
        NgModule({
            declarations: [TooltipContentComponent, TooltipDirective],
            providers: [InjectionService, TooltipService],
            exports: [TooltipContentComponent, TooltipDirective],
            imports: [CommonModule],
            entryComponents: [TooltipContentComponent]
        })
    ], TooltipModule);
    return TooltipModule;
}());
export { TooltipModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vdG9vbHRpcC90b29sdGlwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRW5ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBU3ZEO0lBQUE7SUFBNEIsQ0FBQztJQUFoQixhQUFhO1FBUHpCLFFBQVEsQ0FBQztZQUNSLFlBQVksRUFBRSxDQUFDLHVCQUF1QixFQUFFLGdCQUFnQixDQUFDO1lBQ3pELFNBQVMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQztZQUM3QyxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxnQkFBZ0IsQ0FBQztZQUNwRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsZUFBZSxFQUFFLENBQUMsdUJBQXVCLENBQUM7U0FDM0MsQ0FBQztPQUNXLGFBQWEsQ0FBRztJQUFELG9CQUFDO0NBQUEsQUFBN0IsSUFBNkI7U0FBaEIsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBUb29sdGlwRGlyZWN0aXZlIH0gZnJvbSAnLi90b29sdGlwLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFRvb2x0aXBDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi90b29sdGlwLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRvb2x0aXBTZXJ2aWNlIH0gZnJvbSAnLi90b29sdGlwLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgSW5qZWN0aW9uU2VydmljZSB9IGZyb20gJy4vaW5qZWN0aW9uLnNlcnZpY2UnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtUb29sdGlwQ29udGVudENvbXBvbmVudCwgVG9vbHRpcERpcmVjdGl2ZV0sXHJcbiAgcHJvdmlkZXJzOiBbSW5qZWN0aW9uU2VydmljZSwgVG9vbHRpcFNlcnZpY2VdLFxyXG4gIGV4cG9ydHM6IFtUb29sdGlwQ29udGVudENvbXBvbmVudCwgVG9vbHRpcERpcmVjdGl2ZV0sXHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbVG9vbHRpcENvbnRlbnRDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUb29sdGlwTW9kdWxlIHt9XHJcbiJdfQ==