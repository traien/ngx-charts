import { __assign } from "tslib";
var InjectionRegisteryService = /** @class */ (function () {
    function InjectionRegisteryService(injectionService) {
        this.injectionService = injectionService;
        this.defaults = {};
        this.components = new Map();
    }
    InjectionRegisteryService.prototype.getByType = function (type) {
        if (type === void 0) { type = this.type; }
        return this.components.get(type);
    };
    InjectionRegisteryService.prototype.create = function (bindings) {
        return this.createByType(this.type, bindings);
    };
    InjectionRegisteryService.prototype.createByType = function (type, bindings) {
        bindings = this.assignDefaults(bindings);
        var component = this.injectComponent(type, bindings);
        this.register(type, component);
        return component;
    };
    InjectionRegisteryService.prototype.destroy = function (instance) {
        var compsByType = this.components.get(instance.componentType);
        if (compsByType && compsByType.length) {
            var idx = compsByType.indexOf(instance);
            if (idx > -1) {
                var component = compsByType[idx];
                component.destroy();
                compsByType.splice(idx, 1);
            }
        }
    };
    InjectionRegisteryService.prototype.destroyAll = function () {
        this.destroyByType(this.type);
    };
    InjectionRegisteryService.prototype.destroyByType = function (type) {
        var comps = this.components.get(type);
        if (comps && comps.length) {
            var i = comps.length - 1;
            while (i >= 0) {
                this.destroy(comps[i--]);
            }
        }
    };
    InjectionRegisteryService.prototype.injectComponent = function (type, bindings) {
        return this.injectionService.appendComponent(type, bindings);
    };
    InjectionRegisteryService.prototype.assignDefaults = function (bindings) {
        var inputs = __assign({}, this.defaults.inputs);
        var outputs = __assign({}, this.defaults.outputs);
        if (!bindings.inputs && !bindings.outputs) {
            bindings = { inputs: bindings };
        }
        if (inputs) {
            bindings.inputs = __assign(__assign({}, inputs), bindings.inputs);
        }
        if (outputs) {
            bindings.outputs = __assign(__assign({}, outputs), bindings.outputs);
        }
        return bindings;
    };
    InjectionRegisteryService.prototype.register = function (type, component) {
        if (!this.components.has(type)) {
            this.components.set(type, []);
        }
        var types = this.components.get(type);
        types.push(component);
    };
    return InjectionRegisteryService;
}());
export { InjectionRegisteryService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0aW9uLXJlZ2lzdGVyeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL3Rvb2x0aXAvaW5qZWN0aW9uLXJlZ2lzdGVyeS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFRQTtJQU1FLG1DQUFtQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUgzQyxhQUFRLEdBQW9CLEVBQUUsQ0FBQztRQUMvQixlQUFVLEdBQXFDLElBQUksR0FBRyxFQUFFLENBQUM7SUFFWCxDQUFDO0lBRXpELDZDQUFTLEdBQVQsVUFBVSxJQUF5QjtRQUF6QixxQkFBQSxFQUFBLE9BQWdCLElBQUksQ0FBQyxJQUFJO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELDBDQUFNLEdBQU4sVUFBTyxRQUFnQjtRQUNyQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsZ0RBQVksR0FBWixVQUFhLElBQWEsRUFBRSxRQUF5QjtRQUNuRCxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV6QyxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUUvQixPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQsMkNBQU8sR0FBUCxVQUFRLFFBQXlCO1FBQy9CLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVoRSxJQUFJLFdBQVcsSUFBSSxXQUFXLENBQUMsTUFBTSxFQUFFO1lBQ3JDLElBQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFMUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1osSUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3BCLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzVCO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsOENBQVUsR0FBVjtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxpREFBYSxHQUFiLFVBQWMsSUFBYTtRQUN6QixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV4QyxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDYixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDMUI7U0FDRjtJQUNILENBQUM7SUFFUyxtREFBZSxHQUF6QixVQUEwQixJQUFhLEVBQUUsUUFBeUI7UUFDaEUsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRVMsa0RBQWMsR0FBeEIsVUFBeUIsUUFBeUI7UUFDaEQsSUFBTSxNQUFNLGdCQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFFLENBQUM7UUFDM0MsSUFBTSxPQUFPLGdCQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFFLENBQUM7UUFFN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ3pDLFFBQVEsR0FBRyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQztTQUNqQztRQUVELElBQUksTUFBTSxFQUFFO1lBQ1YsUUFBUSxDQUFDLE1BQU0seUJBQVEsTUFBTSxHQUFLLFFBQVEsQ0FBQyxNQUFNLENBQUUsQ0FBQztTQUNyRDtRQUVELElBQUksT0FBTyxFQUFFO1lBQ1gsUUFBUSxDQUFDLE9BQU8seUJBQVEsT0FBTyxHQUFLLFFBQVEsQ0FBQyxPQUFPLENBQUUsQ0FBQztTQUN4RDtRQUVELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFUyw0Q0FBUSxHQUFsQixVQUFtQixJQUFhLEVBQUUsU0FBMEI7UUFDMUQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztTQUMvQjtRQUVELElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUNILGdDQUFDO0FBQUQsQ0FBQyxBQXJGRCxJQXFGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFJlZiwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJbmplY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9pbmplY3Rpb24uc2VydmljZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBhcnRpYWxCaW5kaW5ncyB7XHJcbiAgaW5wdXRzPzogb2JqZWN0O1xyXG4gIG91dHB1dHM/OiBvYmplY3Q7XHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbmplY3Rpb25SZWdpc3RlcnlTZXJ2aWNlPFQgPSBhbnk+IHtcclxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgdHlwZTogVHlwZTxUPjtcclxuXHJcbiAgcHJvdGVjdGVkIGRlZmF1bHRzOiBQYXJ0aWFsQmluZGluZ3MgPSB7fTtcclxuICBwcm90ZWN0ZWQgY29tcG9uZW50czogTWFwPGFueSwgQXJyYXk8Q29tcG9uZW50UmVmPFQ+Pj4gPSBuZXcgTWFwKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpbmplY3Rpb25TZXJ2aWNlOiBJbmplY3Rpb25TZXJ2aWNlKSB7fVxyXG5cclxuICBnZXRCeVR5cGUodHlwZTogVHlwZTxUPiA9IHRoaXMudHlwZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50cy5nZXQodHlwZSk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoYmluZGluZ3M6IG9iamVjdCk6IENvbXBvbmVudFJlZjxUPiB7XHJcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVCeVR5cGUodGhpcy50eXBlLCBiaW5kaW5ncyk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVCeVR5cGUodHlwZTogVHlwZTxUPiwgYmluZGluZ3M6IFBhcnRpYWxCaW5kaW5ncyk6IENvbXBvbmVudFJlZjxUPiB7XHJcbiAgICBiaW5kaW5ncyA9IHRoaXMuYXNzaWduRGVmYXVsdHMoYmluZGluZ3MpO1xyXG5cclxuICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMuaW5qZWN0Q29tcG9uZW50KHR5cGUsIGJpbmRpbmdzKTtcclxuICAgIHRoaXMucmVnaXN0ZXIodHlwZSwgY29tcG9uZW50KTtcclxuXHJcbiAgICByZXR1cm4gY29tcG9uZW50O1xyXG4gIH1cclxuXHJcbiAgZGVzdHJveShpbnN0YW5jZTogQ29tcG9uZW50UmVmPFQ+KTogdm9pZCB7XHJcbiAgICBjb25zdCBjb21wc0J5VHlwZSA9IHRoaXMuY29tcG9uZW50cy5nZXQoaW5zdGFuY2UuY29tcG9uZW50VHlwZSk7XHJcblxyXG4gICAgaWYgKGNvbXBzQnlUeXBlICYmIGNvbXBzQnlUeXBlLmxlbmd0aCkge1xyXG4gICAgICBjb25zdCBpZHggPSBjb21wc0J5VHlwZS5pbmRleE9mKGluc3RhbmNlKTtcclxuXHJcbiAgICAgIGlmIChpZHggPiAtMSkge1xyXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IGNvbXBzQnlUeXBlW2lkeF07XHJcbiAgICAgICAgY29tcG9uZW50LmRlc3Ryb3koKTtcclxuICAgICAgICBjb21wc0J5VHlwZS5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGVzdHJveUFsbCgpOiB2b2lkIHtcclxuICAgIHRoaXMuZGVzdHJveUJ5VHlwZSh0aGlzLnR5cGUpO1xyXG4gIH1cclxuXHJcbiAgZGVzdHJveUJ5VHlwZSh0eXBlOiBUeXBlPFQ+KTogdm9pZCB7XHJcbiAgICBjb25zdCBjb21wcyA9IHRoaXMuY29tcG9uZW50cy5nZXQodHlwZSk7XHJcblxyXG4gICAgaWYgKGNvbXBzICYmIGNvbXBzLmxlbmd0aCkge1xyXG4gICAgICBsZXQgaSA9IGNvbXBzLmxlbmd0aCAtIDE7XHJcbiAgICAgIHdoaWxlIChpID49IDApIHtcclxuICAgICAgICB0aGlzLmRlc3Ryb3koY29tcHNbaS0tXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBpbmplY3RDb21wb25lbnQodHlwZTogVHlwZTxUPiwgYmluZGluZ3M6IFBhcnRpYWxCaW5kaW5ncyk6IENvbXBvbmVudFJlZjxUPiB7XHJcbiAgICByZXR1cm4gdGhpcy5pbmplY3Rpb25TZXJ2aWNlLmFwcGVuZENvbXBvbmVudCh0eXBlLCBiaW5kaW5ncyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYXNzaWduRGVmYXVsdHMoYmluZGluZ3M6IFBhcnRpYWxCaW5kaW5ncyk6IFBhcnRpYWxCaW5kaW5ncyB7XHJcbiAgICBjb25zdCBpbnB1dHMgPSB7IC4uLnRoaXMuZGVmYXVsdHMuaW5wdXRzIH07XHJcbiAgICBjb25zdCBvdXRwdXRzID0geyAuLi50aGlzLmRlZmF1bHRzLm91dHB1dHMgfTtcclxuXHJcbiAgICBpZiAoIWJpbmRpbmdzLmlucHV0cyAmJiAhYmluZGluZ3Mub3V0cHV0cykge1xyXG4gICAgICBiaW5kaW5ncyA9IHsgaW5wdXRzOiBiaW5kaW5ncyB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbnB1dHMpIHtcclxuICAgICAgYmluZGluZ3MuaW5wdXRzID0geyAuLi5pbnB1dHMsIC4uLmJpbmRpbmdzLmlucHV0cyB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvdXRwdXRzKSB7XHJcbiAgICAgIGJpbmRpbmdzLm91dHB1dHMgPSB7IC4uLm91dHB1dHMsIC4uLmJpbmRpbmdzLm91dHB1dHMgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYmluZGluZ3M7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgcmVnaXN0ZXIodHlwZTogVHlwZTxUPiwgY29tcG9uZW50OiBDb21wb25lbnRSZWY8VD4pOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5jb21wb25lbnRzLmhhcyh0eXBlKSkge1xyXG4gICAgICB0aGlzLmNvbXBvbmVudHMuc2V0KHR5cGUsIFtdKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0eXBlcyA9IHRoaXMuY29tcG9uZW50cy5nZXQodHlwZSk7XHJcbiAgICB0eXBlcy5wdXNoKGNvbXBvbmVudCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==