import { __decorate, __extends } from "tslib";
import { Injectable } from '@angular/core';
import { InjectionService } from './injection.service';
import { TooltipContentComponent } from './tooltip.component';
import { InjectionRegisteryService } from './injection-registery.service';
var TooltipService = /** @class */ (function (_super) {
    __extends(TooltipService, _super);
    function TooltipService(injectionService) {
        var _this = _super.call(this, injectionService) || this;
        _this.type = TooltipContentComponent;
        return _this;
    }
    TooltipService.ctorParameters = function () { return [
        { type: InjectionService }
    ]; };
    TooltipService = __decorate([
        Injectable()
    ], TooltipService);
    return TooltipService;
}(InjectionRegisteryService));
export { TooltipService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL3Rvb2x0aXAvdG9vbHRpcC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRTFFO0lBQW9DLGtDQUFrRDtJQUdwRix3QkFBWSxnQkFBa0M7UUFBOUMsWUFDRSxrQkFBTSxnQkFBZ0IsQ0FBQyxTQUN4QjtRQUpELFVBQUksR0FBUSx1QkFBdUIsQ0FBQzs7SUFJcEMsQ0FBQzs7Z0JBRjZCLGdCQUFnQjs7SUFIbkMsY0FBYztRQUQxQixVQUFVLEVBQUU7T0FDQSxjQUFjLENBTTFCO0lBQUQscUJBQUM7Q0FBQSxBQU5ELENBQW9DLHlCQUF5QixHQU01RDtTQU5ZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEluamVjdGlvblNlcnZpY2UgfSBmcm9tICcuL2luamVjdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVG9vbHRpcENvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL3Rvb2x0aXAuY29tcG9uZW50JztcclxuaW1wb3J0IHsgSW5qZWN0aW9uUmVnaXN0ZXJ5U2VydmljZSB9IGZyb20gJy4vaW5qZWN0aW9uLXJlZ2lzdGVyeS5zZXJ2aWNlJztcclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVG9vbHRpcFNlcnZpY2UgZXh0ZW5kcyBJbmplY3Rpb25SZWdpc3RlcnlTZXJ2aWNlPFRvb2x0aXBDb250ZW50Q29tcG9uZW50PiB7XHJcbiAgdHlwZTogYW55ID0gVG9vbHRpcENvbnRlbnRDb21wb25lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGluamVjdGlvblNlcnZpY2U6IEluamVjdGlvblNlcnZpY2UpIHtcclxuICAgIHN1cGVyKGluamVjdGlvblNlcnZpY2UpO1xyXG4gIH1cclxufVxyXG4iXX0=