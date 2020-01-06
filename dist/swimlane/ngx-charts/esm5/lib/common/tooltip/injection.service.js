import { __decorate, __values } from "tslib";
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, ViewContainerRef, EmbeddedViewRef, Type } from '@angular/core';
import { DomPortalHost, ComponentPortal } from '@angular/cdk/portal';
/**
 * Injection service is a helper to append components
 * dynamically to a known location in the DOM, most
 * noteably for dialogs/tooltips appending to body.
 *
 * @export
 */
var InjectionService = /** @class */ (function () {
    function InjectionService(applicationRef, componentFactoryResolver, injector) {
        this.applicationRef = applicationRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
    }
    InjectionService_1 = InjectionService;
    /**
     * Sets a default global root view container. This is useful for
     * things like ngUpgrade that doesn't have a ApplicationRef root.
     *
     * @param container
     */
    InjectionService.setGlobalRootViewContainer = function (container) {
        InjectionService_1.globalRootViewContainer = container;
    };
    /**
     * Gets the root view container to inject the component to.
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.getRootViewContainer = function () {
        if (this._container)
            return this._container;
        if (InjectionService_1.globalRootViewContainer)
            return InjectionService_1.globalRootViewContainer;
        if (this.applicationRef.components.length)
            return this.applicationRef.components[0];
        throw new Error('View Container not found! ngUpgrade needs to manually set this via setRootViewContainer or setGlobalRootViewContainer.');
    };
    /**
     * Overrides the default root view container. This is useful for
     * things like ngUpgrade that doesn't have a ApplicationRef root.
     *
     * @param container
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.setRootViewContainer = function (container) {
        this._container = container;
    };
    /**
     * Gets the html element for a component ref.
     *
     * @param componentRef
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.getComponentRootNode = function (componentRef) {
        if (componentRef.hostView && componentRef.hostView.rootNodes.length > 0) {
            return componentRef.hostView.rootNodes[0];
        }
        // the top most component root node has no `hostView`
        return componentRef.location.nativeElement;
    };
    /**
     * Gets the root component container html element.
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.getRootViewContainerNode = function (componentRef) {
        return this.getComponentRootNode(componentRef);
    };
    /**
     * Projects the bindings onto the component
     *
     * @param component
     * @param options
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.projectComponentBindings = function (component, bindings) {
        var e_1, _a, e_2, _b;
        if (bindings) {
            if (bindings.inputs !== undefined) {
                var bindingKeys = Object.getOwnPropertyNames(bindings.inputs);
                try {
                    for (var bindingKeys_1 = __values(bindingKeys), bindingKeys_1_1 = bindingKeys_1.next(); !bindingKeys_1_1.done; bindingKeys_1_1 = bindingKeys_1.next()) {
                        var bindingName = bindingKeys_1_1.value;
                        component.instance[bindingName] = bindings.inputs[bindingName];
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (bindingKeys_1_1 && !bindingKeys_1_1.done && (_a = bindingKeys_1.return)) _a.call(bindingKeys_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            if (bindings.outputs !== undefined) {
                var eventKeys = Object.getOwnPropertyNames(bindings.outputs);
                try {
                    for (var eventKeys_1 = __values(eventKeys), eventKeys_1_1 = eventKeys_1.next(); !eventKeys_1_1.done; eventKeys_1_1 = eventKeys_1.next()) {
                        var eventName = eventKeys_1_1.value;
                        component.instance[eventName] = bindings.outputs[eventName];
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (eventKeys_1_1 && !eventKeys_1_1.done && (_b = eventKeys_1.return)) _b.call(eventKeys_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        return component;
    };
    /**
     * Appends a component to a adjacent location
     *
     * @param componentClass
     * @param [options={}]
     * @param [location]
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.appendComponent = function (componentClass, bindings, location) {
        if (bindings === void 0) { bindings = {}; }
        if (!location)
            location = this.getRootViewContainer();
        var appendLocation = this.getComponentRootNode(location);
        var portalHost = new DomPortalHost(appendLocation, this.componentFactoryResolver, this.applicationRef, this.injector);
        var portal = new ComponentPortal(componentClass);
        var componentRef = portalHost.attach(portal);
        this.projectComponentBindings(componentRef, bindings);
        return componentRef;
    };
    var InjectionService_1;
    InjectionService.globalRootViewContainer = null;
    InjectionService.ctorParameters = function () { return [
        { type: ApplicationRef },
        { type: ComponentFactoryResolver },
        { type: Injector }
    ]; };
    InjectionService = InjectionService_1 = __decorate([
        Injectable()
    ], InjectionService);
    return InjectionService;
}());
export { InjectionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vdG9vbHRpcC9pbmplY3Rpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLGNBQWMsRUFDZCx3QkFBd0IsRUFDeEIsWUFBWSxFQUNaLFVBQVUsRUFDVixRQUFRLEVBQ1IsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixJQUFJLEVBQ0wsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVyRTs7Ozs7O0dBTUc7QUFFSDtJQWVFLDBCQUNVLGNBQThCLEVBQzlCLHdCQUFrRCxFQUNsRCxRQUFrQjtRQUZsQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQ3pCLENBQUM7eUJBbkJPLGdCQUFnQjtJQUczQjs7Ozs7T0FLRztJQUNJLDJDQUEwQixHQUFqQyxVQUFrQyxTQUEyQjtRQUMzRCxrQkFBZ0IsQ0FBQyx1QkFBdUIsR0FBRyxTQUFTLENBQUM7SUFDdkQsQ0FBQztJQVVEOzs7O09BSUc7SUFDSCwrQ0FBb0IsR0FBcEI7UUFDRSxJQUFJLElBQUksQ0FBQyxVQUFVO1lBQUUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzVDLElBQUksa0JBQWdCLENBQUMsdUJBQXVCO1lBQUUsT0FBTyxrQkFBZ0IsQ0FBQyx1QkFBdUIsQ0FBQztRQUU5RixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLE1BQU07WUFBRSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXBGLE1BQU0sSUFBSSxLQUFLLENBQ2Isd0hBQXdILENBQ3pILENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILCtDQUFvQixHQUFwQixVQUFxQixTQUEyQjtRQUM5QyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztJQUM5QixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsK0NBQW9CLEdBQXBCLFVBQXFCLFlBQWlCO1FBQ3BDLElBQUksWUFBWSxDQUFDLFFBQVEsSUFBSyxZQUFZLENBQUMsUUFBaUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNqRyxPQUFRLFlBQVksQ0FBQyxRQUFpQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQWdCLENBQUM7U0FDcEY7UUFFRCxxREFBcUQ7UUFDckQsT0FBTyxZQUFZLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILG1EQUF3QixHQUF4QixVQUF5QixZQUFZO1FBQ25DLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsbURBQXdCLEdBQXhCLFVBQXlCLFNBQTRCLEVBQUUsUUFBYTs7UUFDbEUsSUFBSSxRQUFRLEVBQUU7WUFDWixJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO2dCQUNqQyxJQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztvQkFDaEUsS0FBMEIsSUFBQSxnQkFBQSxTQUFBLFdBQVcsQ0FBQSx3Q0FBQSxpRUFBRTt3QkFBbEMsSUFBTSxXQUFXLHdCQUFBO3dCQUNwQixTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7cUJBQ2hFOzs7Ozs7Ozs7YUFDRjtZQUVELElBQUksUUFBUSxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7Z0JBQ2xDLElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7O29CQUMvRCxLQUF3QixJQUFBLGNBQUEsU0FBQSxTQUFTLENBQUEsb0NBQUEsMkRBQUU7d0JBQTlCLElBQU0sU0FBUyxzQkFBQTt3QkFDbEIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3FCQUM3RDs7Ozs7Ozs7O2FBQ0Y7U0FDRjtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILDBDQUFlLEdBQWYsVUFBbUIsY0FBdUIsRUFBRSxRQUFrQixFQUFFLFFBQWM7UUFBbEMseUJBQUEsRUFBQSxhQUFrQjtRQUM1RCxJQUFJLENBQUMsUUFBUTtZQUFFLFFBQVEsR0FBRyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUN0RCxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFM0QsSUFBTSxVQUFVLEdBQUcsSUFBSSxhQUFhLENBQ2xDLGNBQWMsRUFDZCxJQUFJLENBQUMsd0JBQXdCLEVBQzdCLElBQUksQ0FBQyxjQUFjLEVBQ25CLElBQUksQ0FBQyxRQUFRLENBQ2QsQ0FBQztRQUVGLElBQU0sTUFBTSxHQUFHLElBQUksZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRW5ELElBQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN0RCxPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDOztJQTlITSx3Q0FBdUIsR0FBcUIsSUFBSSxDQUFDOztnQkFlOUIsY0FBYztnQkFDSix3QkFBd0I7Z0JBQ3hDLFFBQVE7O0lBbEJqQixnQkFBZ0I7UUFENUIsVUFBVSxFQUFFO09BQ0EsZ0JBQWdCLENBZ0k1QjtJQUFELHVCQUFDO0NBQUEsQUFoSUQsSUFnSUM7U0FoSVksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBcHBsaWNhdGlvblJlZixcclxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgQ29tcG9uZW50UmVmLFxyXG4gIEluamVjdGFibGUsXHJcbiAgSW5qZWN0b3IsXHJcbiAgVmlld0NvbnRhaW5lclJlZixcclxuICBFbWJlZGRlZFZpZXdSZWYsXHJcbiAgVHlwZVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEb21Qb3J0YWxIb3N0LCBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcclxuXHJcbi8qKlxyXG4gKiBJbmplY3Rpb24gc2VydmljZSBpcyBhIGhlbHBlciB0byBhcHBlbmQgY29tcG9uZW50c1xyXG4gKiBkeW5hbWljYWxseSB0byBhIGtub3duIGxvY2F0aW9uIGluIHRoZSBET00sIG1vc3RcclxuICogbm90ZWFibHkgZm9yIGRpYWxvZ3MvdG9vbHRpcHMgYXBwZW5kaW5nIHRvIGJvZHkuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEluamVjdGlvblNlcnZpY2Uge1xyXG4gIHN0YXRpYyBnbG9iYWxSb290Vmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZiA9IG51bGw7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgYSBkZWZhdWx0IGdsb2JhbCByb290IHZpZXcgY29udGFpbmVyLiBUaGlzIGlzIHVzZWZ1bCBmb3JcclxuICAgKiB0aGluZ3MgbGlrZSBuZ1VwZ3JhZGUgdGhhdCBkb2Vzbid0IGhhdmUgYSBBcHBsaWNhdGlvblJlZiByb290LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGNvbnRhaW5lclxyXG4gICAqL1xyXG4gIHN0YXRpYyBzZXRHbG9iYWxSb290Vmlld0NvbnRhaW5lcihjb250YWluZXI6IFZpZXdDb250YWluZXJSZWYpOiB2b2lkIHtcclxuICAgIEluamVjdGlvblNlcnZpY2UuZ2xvYmFsUm9vdFZpZXdDb250YWluZXIgPSBjb250YWluZXI7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9jb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBhcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYsXHJcbiAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3JcclxuICApIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIHJvb3QgdmlldyBjb250YWluZXIgdG8gaW5qZWN0IHRoZSBjb21wb25lbnQgdG8uXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgSW5qZWN0aW9uU2VydmljZVxyXG4gICAqL1xyXG4gIGdldFJvb3RWaWV3Q29udGFpbmVyKCk6IFZpZXdDb250YWluZXJSZWYgfCBDb21wb25lbnRSZWY8YW55PiB7XHJcbiAgICBpZiAodGhpcy5fY29udGFpbmVyKSByZXR1cm4gdGhpcy5fY29udGFpbmVyO1xyXG4gICAgaWYgKEluamVjdGlvblNlcnZpY2UuZ2xvYmFsUm9vdFZpZXdDb250YWluZXIpIHJldHVybiBJbmplY3Rpb25TZXJ2aWNlLmdsb2JhbFJvb3RWaWV3Q29udGFpbmVyO1xyXG5cclxuICAgIGlmICh0aGlzLmFwcGxpY2F0aW9uUmVmLmNvbXBvbmVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy5hcHBsaWNhdGlvblJlZi5jb21wb25lbnRzWzBdO1xyXG5cclxuICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgJ1ZpZXcgQ29udGFpbmVyIG5vdCBmb3VuZCEgbmdVcGdyYWRlIG5lZWRzIHRvIG1hbnVhbGx5IHNldCB0aGlzIHZpYSBzZXRSb290Vmlld0NvbnRhaW5lciBvciBzZXRHbG9iYWxSb290Vmlld0NvbnRhaW5lci4nXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT3ZlcnJpZGVzIHRoZSBkZWZhdWx0IHJvb3QgdmlldyBjb250YWluZXIuIFRoaXMgaXMgdXNlZnVsIGZvclxyXG4gICAqIHRoaW5ncyBsaWtlIG5nVXBncmFkZSB0aGF0IGRvZXNuJ3QgaGF2ZSBhIEFwcGxpY2F0aW9uUmVmIHJvb3QuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gY29udGFpbmVyXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgSW5qZWN0aW9uU2VydmljZVxyXG4gICAqL1xyXG4gIHNldFJvb3RWaWV3Q29udGFpbmVyKGNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZik6IHZvaWQge1xyXG4gICAgdGhpcy5fY29udGFpbmVyID0gY29udGFpbmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgaHRtbCBlbGVtZW50IGZvciBhIGNvbXBvbmVudCByZWYuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gY29tcG9uZW50UmVmXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgSW5qZWN0aW9uU2VydmljZVxyXG4gICAqL1xyXG4gIGdldENvbXBvbmVudFJvb3ROb2RlKGNvbXBvbmVudFJlZjogYW55KTogSFRNTEVsZW1lbnQge1xyXG4gICAgaWYgKGNvbXBvbmVudFJlZi5ob3N0VmlldyAmJiAoY29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KS5yb290Tm9kZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm4gKGNvbXBvbmVudFJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55Pikucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRoZSB0b3AgbW9zdCBjb21wb25lbnQgcm9vdCBub2RlIGhhcyBubyBgaG9zdFZpZXdgXHJcbiAgICByZXR1cm4gY29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSByb290IGNvbXBvbmVudCBjb250YWluZXIgaHRtbCBlbGVtZW50LlxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIEluamVjdGlvblNlcnZpY2VcclxuICAgKi9cclxuICBnZXRSb290Vmlld0NvbnRhaW5lck5vZGUoY29tcG9uZW50UmVmKTogSFRNTEVsZW1lbnQge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29tcG9uZW50Um9vdE5vZGUoY29tcG9uZW50UmVmKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFByb2plY3RzIHRoZSBiaW5kaW5ncyBvbnRvIHRoZSBjb21wb25lbnRcclxuICAgKlxyXG4gICAqIEBwYXJhbSBjb21wb25lbnRcclxuICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIEluamVjdGlvblNlcnZpY2VcclxuICAgKi9cclxuICBwcm9qZWN0Q29tcG9uZW50QmluZGluZ3MoY29tcG9uZW50OiBDb21wb25lbnRSZWY8YW55PiwgYmluZGluZ3M6IGFueSk6IENvbXBvbmVudFJlZjxhbnk+IHtcclxuICAgIGlmIChiaW5kaW5ncykge1xyXG4gICAgICBpZiAoYmluZGluZ3MuaW5wdXRzICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zdCBiaW5kaW5nS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGJpbmRpbmdzLmlucHV0cyk7XHJcbiAgICAgICAgZm9yIChjb25zdCBiaW5kaW5nTmFtZSBvZiBiaW5kaW5nS2V5cykge1xyXG4gICAgICAgICAgY29tcG9uZW50Lmluc3RhbmNlW2JpbmRpbmdOYW1lXSA9IGJpbmRpbmdzLmlucHV0c1tiaW5kaW5nTmFtZV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoYmluZGluZ3Mub3V0cHV0cyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY29uc3QgZXZlbnRLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYmluZGluZ3Mub3V0cHV0cyk7XHJcbiAgICAgICAgZm9yIChjb25zdCBldmVudE5hbWUgb2YgZXZlbnRLZXlzKSB7XHJcbiAgICAgICAgICBjb21wb25lbnQuaW5zdGFuY2VbZXZlbnROYW1lXSA9IGJpbmRpbmdzLm91dHB1dHNbZXZlbnROYW1lXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY29tcG9uZW50O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXBwZW5kcyBhIGNvbXBvbmVudCB0byBhIGFkamFjZW50IGxvY2F0aW9uXHJcbiAgICpcclxuICAgKiBAcGFyYW0gY29tcG9uZW50Q2xhc3NcclxuICAgKiBAcGFyYW0gW29wdGlvbnM9e31dXHJcbiAgICogQHBhcmFtIFtsb2NhdGlvbl1cclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBJbmplY3Rpb25TZXJ2aWNlXHJcbiAgICovXHJcbiAgYXBwZW5kQ29tcG9uZW50PFQ+KGNvbXBvbmVudENsYXNzOiBUeXBlPFQ+LCBiaW5kaW5nczogYW55ID0ge30sIGxvY2F0aW9uPzogYW55KTogQ29tcG9uZW50UmVmPGFueT4ge1xyXG4gICAgaWYgKCFsb2NhdGlvbikgbG9jYXRpb24gPSB0aGlzLmdldFJvb3RWaWV3Q29udGFpbmVyKCk7XHJcbiAgICBjb25zdCBhcHBlbmRMb2NhdGlvbiA9IHRoaXMuZ2V0Q29tcG9uZW50Um9vdE5vZGUobG9jYXRpb24pO1xyXG5cclxuICAgIGNvbnN0IHBvcnRhbEhvc3QgPSBuZXcgRG9tUG9ydGFsSG9zdChcclxuICAgICAgYXBwZW5kTG9jYXRpb24sXHJcbiAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgICB0aGlzLmFwcGxpY2F0aW9uUmVmLFxyXG4gICAgICB0aGlzLmluamVjdG9yXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWwoY29tcG9uZW50Q2xhc3MpO1xyXG5cclxuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHBvcnRhbEhvc3QuYXR0YWNoKHBvcnRhbCk7XHJcbiAgICB0aGlzLnByb2plY3RDb21wb25lbnRCaW5kaW5ncyhjb21wb25lbnRSZWYsIGJpbmRpbmdzKTtcclxuICAgIHJldHVybiBjb21wb25lbnRSZWY7XHJcbiAgfVxyXG59XHJcbiJdfQ==