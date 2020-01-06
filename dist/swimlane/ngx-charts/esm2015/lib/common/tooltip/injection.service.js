var InjectionService_1;
import { __decorate } from "tslib";
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, ViewContainerRef, EmbeddedViewRef, Type } from '@angular/core';
import { DomPortalHost, ComponentPortal } from '@angular/cdk/portal';
/**
 * Injection service is a helper to append components
 * dynamically to a known location in the DOM, most
 * noteably for dialogs/tooltips appending to body.
 *
 * @export
 */
let InjectionService = InjectionService_1 = class InjectionService {
    constructor(applicationRef, componentFactoryResolver, injector) {
        this.applicationRef = applicationRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
    }
    /**
     * Sets a default global root view container. This is useful for
     * things like ngUpgrade that doesn't have a ApplicationRef root.
     *
     * @param container
     */
    static setGlobalRootViewContainer(container) {
        InjectionService_1.globalRootViewContainer = container;
    }
    /**
     * Gets the root view container to inject the component to.
     *
     * @memberOf InjectionService
     */
    getRootViewContainer() {
        if (this._container)
            return this._container;
        if (InjectionService_1.globalRootViewContainer)
            return InjectionService_1.globalRootViewContainer;
        if (this.applicationRef.components.length)
            return this.applicationRef.components[0];
        throw new Error('View Container not found! ngUpgrade needs to manually set this via setRootViewContainer or setGlobalRootViewContainer.');
    }
    /**
     * Overrides the default root view container. This is useful for
     * things like ngUpgrade that doesn't have a ApplicationRef root.
     *
     * @param container
     *
     * @memberOf InjectionService
     */
    setRootViewContainer(container) {
        this._container = container;
    }
    /**
     * Gets the html element for a component ref.
     *
     * @param componentRef
     *
     * @memberOf InjectionService
     */
    getComponentRootNode(componentRef) {
        if (componentRef.hostView && componentRef.hostView.rootNodes.length > 0) {
            return componentRef.hostView.rootNodes[0];
        }
        // the top most component root node has no `hostView`
        return componentRef.location.nativeElement;
    }
    /**
     * Gets the root component container html element.
     *
     * @memberOf InjectionService
     */
    getRootViewContainerNode(componentRef) {
        return this.getComponentRootNode(componentRef);
    }
    /**
     * Projects the bindings onto the component
     *
     * @param component
     * @param options
     *
     * @memberOf InjectionService
     */
    projectComponentBindings(component, bindings) {
        if (bindings) {
            if (bindings.inputs !== undefined) {
                const bindingKeys = Object.getOwnPropertyNames(bindings.inputs);
                for (const bindingName of bindingKeys) {
                    component.instance[bindingName] = bindings.inputs[bindingName];
                }
            }
            if (bindings.outputs !== undefined) {
                const eventKeys = Object.getOwnPropertyNames(bindings.outputs);
                for (const eventName of eventKeys) {
                    component.instance[eventName] = bindings.outputs[eventName];
                }
            }
        }
        return component;
    }
    /**
     * Appends a component to a adjacent location
     *
     * @param componentClass
     * @param [options={}]
     * @param [location]
     *
     * @memberOf InjectionService
     */
    appendComponent(componentClass, bindings = {}, location) {
        if (!location)
            location = this.getRootViewContainer();
        const appendLocation = this.getComponentRootNode(location);
        const portalHost = new DomPortalHost(appendLocation, this.componentFactoryResolver, this.applicationRef, this.injector);
        const portal = new ComponentPortal(componentClass);
        const componentRef = portalHost.attach(portal);
        this.projectComponentBindings(componentRef, bindings);
        return componentRef;
    }
};
InjectionService.globalRootViewContainer = null;
InjectionService.ctorParameters = () => [
    { type: ApplicationRef },
    { type: ComponentFactoryResolver },
    { type: Injector }
];
InjectionService = InjectionService_1 = __decorate([
    Injectable()
], InjectionService);
export { InjectionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vdG9vbHRpcC9pbmplY3Rpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFDTCxjQUFjLEVBQ2Qsd0JBQXdCLEVBQ3hCLFlBQVksRUFDWixVQUFVLEVBQ1YsUUFBUSxFQUNSLGdCQUFnQixFQUNoQixlQUFlLEVBQ2YsSUFBSSxFQUNMLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFckU7Ozs7OztHQU1HO0FBRUgsSUFBYSxnQkFBZ0Isd0JBQTdCLE1BQWEsZ0JBQWdCO0lBZTNCLFlBQ1UsY0FBOEIsRUFDOUIsd0JBQWtELEVBQ2xELFFBQWtCO1FBRmxCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5Qiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELGFBQVEsR0FBUixRQUFRLENBQVU7SUFDekIsQ0FBQztJQWhCSjs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxTQUEyQjtRQUMzRCxrQkFBZ0IsQ0FBQyx1QkFBdUIsR0FBRyxTQUFTLENBQUM7SUFDdkQsQ0FBQztJQVVEOzs7O09BSUc7SUFDSCxvQkFBb0I7UUFDbEIsSUFBSSxJQUFJLENBQUMsVUFBVTtZQUFFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUM1QyxJQUFJLGtCQUFnQixDQUFDLHVCQUF1QjtZQUFFLE9BQU8sa0JBQWdCLENBQUMsdUJBQXVCLENBQUM7UUFFOUYsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxNQUFNO1lBQUUsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwRixNQUFNLElBQUksS0FBSyxDQUNiLHdIQUF3SCxDQUN6SCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxvQkFBb0IsQ0FBQyxTQUEyQjtRQUM5QyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztJQUM5QixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsb0JBQW9CLENBQUMsWUFBaUI7UUFDcEMsSUFBSSxZQUFZLENBQUMsUUFBUSxJQUFLLFlBQVksQ0FBQyxRQUFpQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2pHLE9BQVEsWUFBWSxDQUFDLFFBQWlDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBZ0IsQ0FBQztTQUNwRjtRQUVELHFEQUFxRDtRQUNyRCxPQUFPLFlBQVksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO0lBQzdDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsd0JBQXdCLENBQUMsWUFBWTtRQUNuQyxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILHdCQUF3QixDQUFDLFNBQTRCLEVBQUUsUUFBYTtRQUNsRSxJQUFJLFFBQVEsRUFBRTtZQUNaLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7Z0JBQ2pDLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2hFLEtBQUssTUFBTSxXQUFXLElBQUksV0FBVyxFQUFFO29CQUNyQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ2hFO2FBQ0Y7WUFFRCxJQUFJLFFBQVEsQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO2dCQUNsQyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMvRCxLQUFLLE1BQU0sU0FBUyxJQUFJLFNBQVMsRUFBRTtvQkFDakMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUM3RDthQUNGO1NBQ0Y7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxlQUFlLENBQUksY0FBdUIsRUFBRSxXQUFnQixFQUFFLEVBQUUsUUFBYztRQUM1RSxJQUFJLENBQUMsUUFBUTtZQUFFLFFBQVEsR0FBRyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUN0RCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFM0QsTUFBTSxVQUFVLEdBQUcsSUFBSSxhQUFhLENBQ2xDLGNBQWMsRUFDZCxJQUFJLENBQUMsd0JBQXdCLEVBQzdCLElBQUksQ0FBQyxjQUFjLEVBQ25CLElBQUksQ0FBQyxRQUFRLENBQ2QsQ0FBQztRQUVGLE1BQU0sTUFBTSxHQUFHLElBQUksZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRW5ELE1BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN0RCxPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0NBQ0YsQ0FBQTtBQS9IUSx3Q0FBdUIsR0FBcUIsSUFBSSxDQUFDOztZQWU5QixjQUFjO1lBQ0osd0JBQXdCO1lBQ3hDLFFBQVE7O0FBbEJqQixnQkFBZ0I7SUFENUIsVUFBVSxFQUFFO0dBQ0EsZ0JBQWdCLENBZ0k1QjtTQWhJWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFwcGxpY2F0aW9uUmVmLFxyXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICBDb21wb25lbnRSZWYsXHJcbiAgSW5qZWN0YWJsZSxcclxuICBJbmplY3RvcixcclxuICBWaWV3Q29udGFpbmVyUmVmLFxyXG4gIEVtYmVkZGVkVmlld1JlZixcclxuICBUeXBlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERvbVBvcnRhbEhvc3QsIENvbXBvbmVudFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xyXG5cclxuLyoqXHJcbiAqIEluamVjdGlvbiBzZXJ2aWNlIGlzIGEgaGVscGVyIHRvIGFwcGVuZCBjb21wb25lbnRzXHJcbiAqIGR5bmFtaWNhbGx5IHRvIGEga25vd24gbG9jYXRpb24gaW4gdGhlIERPTSwgbW9zdFxyXG4gKiBub3RlYWJseSBmb3IgZGlhbG9ncy90b29sdGlwcyBhcHBlbmRpbmcgdG8gYm9keS5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSW5qZWN0aW9uU2VydmljZSB7XHJcbiAgc3RhdGljIGdsb2JhbFJvb3RWaWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmID0gbnVsbDtcclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyBhIGRlZmF1bHQgZ2xvYmFsIHJvb3QgdmlldyBjb250YWluZXIuIFRoaXMgaXMgdXNlZnVsIGZvclxyXG4gICAqIHRoaW5ncyBsaWtlIG5nVXBncmFkZSB0aGF0IGRvZXNuJ3QgaGF2ZSBhIEFwcGxpY2F0aW9uUmVmIHJvb3QuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gY29udGFpbmVyXHJcbiAgICovXHJcbiAgc3RhdGljIHNldEdsb2JhbFJvb3RWaWV3Q29udGFpbmVyKGNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZik6IHZvaWQge1xyXG4gICAgSW5qZWN0aW9uU2VydmljZS5nbG9iYWxSb290Vmlld0NvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGFwcGxpY2F0aW9uUmVmOiBBcHBsaWNhdGlvblJlZixcclxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvclxyXG4gICkge31cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgcm9vdCB2aWV3IGNvbnRhaW5lciB0byBpbmplY3QgdGhlIGNvbXBvbmVudCB0by5cclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBJbmplY3Rpb25TZXJ2aWNlXHJcbiAgICovXHJcbiAgZ2V0Um9vdFZpZXdDb250YWluZXIoKTogVmlld0NvbnRhaW5lclJlZiB8IENvbXBvbmVudFJlZjxhbnk+IHtcclxuICAgIGlmICh0aGlzLl9jb250YWluZXIpIHJldHVybiB0aGlzLl9jb250YWluZXI7XHJcbiAgICBpZiAoSW5qZWN0aW9uU2VydmljZS5nbG9iYWxSb290Vmlld0NvbnRhaW5lcikgcmV0dXJuIEluamVjdGlvblNlcnZpY2UuZ2xvYmFsUm9vdFZpZXdDb250YWluZXI7XHJcblxyXG4gICAgaWYgKHRoaXMuYXBwbGljYXRpb25SZWYuY29tcG9uZW50cy5sZW5ndGgpIHJldHVybiB0aGlzLmFwcGxpY2F0aW9uUmVmLmNvbXBvbmVudHNbMF07XHJcblxyXG4gICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAnVmlldyBDb250YWluZXIgbm90IGZvdW5kISBuZ1VwZ3JhZGUgbmVlZHMgdG8gbWFudWFsbHkgc2V0IHRoaXMgdmlhIHNldFJvb3RWaWV3Q29udGFpbmVyIG9yIHNldEdsb2JhbFJvb3RWaWV3Q29udGFpbmVyLidcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPdmVycmlkZXMgdGhlIGRlZmF1bHQgcm9vdCB2aWV3IGNvbnRhaW5lci4gVGhpcyBpcyB1c2VmdWwgZm9yXHJcbiAgICogdGhpbmdzIGxpa2UgbmdVcGdyYWRlIHRoYXQgZG9lc24ndCBoYXZlIGEgQXBwbGljYXRpb25SZWYgcm9vdC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBjb250YWluZXJcclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBJbmplY3Rpb25TZXJ2aWNlXHJcbiAgICovXHJcbiAgc2V0Um9vdFZpZXdDb250YWluZXIoY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmKTogdm9pZCB7XHJcbiAgICB0aGlzLl9jb250YWluZXIgPSBjb250YWluZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBodG1sIGVsZW1lbnQgZm9yIGEgY29tcG9uZW50IHJlZi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBjb21wb25lbnRSZWZcclxuICAgKlxyXG4gICAqIEBtZW1iZXJPZiBJbmplY3Rpb25TZXJ2aWNlXHJcbiAgICovXHJcbiAgZ2V0Q29tcG9uZW50Um9vdE5vZGUoY29tcG9uZW50UmVmOiBhbnkpOiBIVE1MRWxlbWVudCB7XHJcbiAgICBpZiAoY29tcG9uZW50UmVmLmhvc3RWaWV3ICYmIChjb21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pLnJvb3ROb2Rlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiAoY29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KS5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdGhlIHRvcCBtb3N0IGNvbXBvbmVudCByb290IG5vZGUgaGFzIG5vIGBob3N0Vmlld2BcclxuICAgIHJldHVybiBjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIHJvb3QgY29tcG9uZW50IGNvbnRhaW5lciBodG1sIGVsZW1lbnQuXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgSW5qZWN0aW9uU2VydmljZVxyXG4gICAqL1xyXG4gIGdldFJvb3RWaWV3Q29udGFpbmVyTm9kZShjb21wb25lbnRSZWYpOiBIVE1MRWxlbWVudCB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRDb21wb25lbnRSb290Tm9kZShjb21wb25lbnRSZWYpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUHJvamVjdHMgdGhlIGJpbmRpbmdzIG9udG8gdGhlIGNvbXBvbmVudFxyXG4gICAqXHJcbiAgICogQHBhcmFtIGNvbXBvbmVudFxyXG4gICAqIEBwYXJhbSBvcHRpb25zXHJcbiAgICpcclxuICAgKiBAbWVtYmVyT2YgSW5qZWN0aW9uU2VydmljZVxyXG4gICAqL1xyXG4gIHByb2plY3RDb21wb25lbnRCaW5kaW5ncyhjb21wb25lbnQ6IENvbXBvbmVudFJlZjxhbnk+LCBiaW5kaW5nczogYW55KTogQ29tcG9uZW50UmVmPGFueT4ge1xyXG4gICAgaWYgKGJpbmRpbmdzKSB7XHJcbiAgICAgIGlmIChiaW5kaW5ncy5pbnB1dHMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNvbnN0IGJpbmRpbmdLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYmluZGluZ3MuaW5wdXRzKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGJpbmRpbmdOYW1lIG9mIGJpbmRpbmdLZXlzKSB7XHJcbiAgICAgICAgICBjb21wb25lbnQuaW5zdGFuY2VbYmluZGluZ05hbWVdID0gYmluZGluZ3MuaW5wdXRzW2JpbmRpbmdOYW1lXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChiaW5kaW5ncy5vdXRwdXRzICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zdCBldmVudEtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhiaW5kaW5ncy5vdXRwdXRzKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGV2ZW50TmFtZSBvZiBldmVudEtleXMpIHtcclxuICAgICAgICAgIGNvbXBvbmVudC5pbnN0YW5jZVtldmVudE5hbWVdID0gYmluZGluZ3Mub3V0cHV0c1tldmVudE5hbWVdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb21wb25lbnQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBcHBlbmRzIGEgY29tcG9uZW50IHRvIGEgYWRqYWNlbnQgbG9jYXRpb25cclxuICAgKlxyXG4gICAqIEBwYXJhbSBjb21wb25lbnRDbGFzc1xyXG4gICAqIEBwYXJhbSBbb3B0aW9ucz17fV1cclxuICAgKiBAcGFyYW0gW2xvY2F0aW9uXVxyXG4gICAqXHJcbiAgICogQG1lbWJlck9mIEluamVjdGlvblNlcnZpY2VcclxuICAgKi9cclxuICBhcHBlbmRDb21wb25lbnQ8VD4oY29tcG9uZW50Q2xhc3M6IFR5cGU8VD4sIGJpbmRpbmdzOiBhbnkgPSB7fSwgbG9jYXRpb24/OiBhbnkpOiBDb21wb25lbnRSZWY8YW55PiB7XHJcbiAgICBpZiAoIWxvY2F0aW9uKSBsb2NhdGlvbiA9IHRoaXMuZ2V0Um9vdFZpZXdDb250YWluZXIoKTtcclxuICAgIGNvbnN0IGFwcGVuZExvY2F0aW9uID0gdGhpcy5nZXRDb21wb25lbnRSb290Tm9kZShsb2NhdGlvbik7XHJcblxyXG4gICAgY29uc3QgcG9ydGFsSG9zdCA9IG5ldyBEb21Qb3J0YWxIb3N0KFxyXG4gICAgICBhcHBlbmRMb2NhdGlvbixcclxuICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICAgIHRoaXMuYXBwbGljYXRpb25SZWYsXHJcbiAgICAgIHRoaXMuaW5qZWN0b3JcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgcG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbChjb21wb25lbnRDbGFzcyk7XHJcblxyXG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gcG9ydGFsSG9zdC5hdHRhY2gocG9ydGFsKTtcclxuICAgIHRoaXMucHJvamVjdENvbXBvbmVudEJpbmRpbmdzKGNvbXBvbmVudFJlZiwgYmluZGluZ3MpO1xyXG4gICAgcmV0dXJuIGNvbXBvbmVudFJlZjtcclxuICB9XHJcbn1cclxuIl19