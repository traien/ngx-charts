import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { trimLabel } from '../trim-label.helper';
import { reduceTicks } from './ticks.helper';
var XAxisTicksComponent = /** @class */ (function () {
    function XAxisTicksComponent() {
        this.tickArguments = [5];
        this.tickStroke = '#ccc';
        this.trimTicks = true;
        this.maxTickLength = 16;
        this.showGridLines = false;
        this.rotateTicks = true;
        this.dimensionsChanged = new EventEmitter();
        this.verticalSpacing = 20;
        this.rotateLabels = false;
        this.innerTickSize = 6;
        this.outerTickSize = 6;
        this.tickPadding = 3;
        this.textAnchor = 'middle';
        this.maxTicksLength = 0;
        this.maxAllowedLength = 16;
        this.height = 0;
    }
    XAxisTicksComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    XAxisTicksComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this.updateDims(); });
    };
    XAxisTicksComponent.prototype.updateDims = function () {
        var _this = this;
        var height = parseInt(this.ticksElement.nativeElement.getBoundingClientRect().height, 10);
        if (height !== this.height) {
            this.height = height;
            this.dimensionsChanged.emit({ height: height });
            setTimeout(function () { return _this.updateDims(); });
        }
    };
    XAxisTicksComponent.prototype.update = function () {
        var _this = this;
        var scale = this.scale;
        this.ticks = this.getTicks();
        if (this.tickFormatting) {
            this.tickFormat = this.tickFormatting;
        }
        else if (scale.tickFormat) {
            this.tickFormat = scale.tickFormat.apply(scale, this.tickArguments);
        }
        else {
            this.tickFormat = function (d) {
                if (d.constructor.name === 'Date') {
                    return d.toLocaleDateString();
                }
                return d.toLocaleString();
            };
        }
        var angle = this.rotateTicks ? this.getRotationAngle(this.ticks) : null;
        this.adjustedScale = this.scale.bandwidth
            ? function (d) {
                return this.scale(d) + this.scale.bandwidth() * 0.5;
            }
            : this.scale;
        this.textTransform = '';
        if (angle && angle !== 0) {
            this.textTransform = "rotate(" + angle + ")";
            this.textAnchor = 'end';
            this.verticalSpacing = 10;
        }
        else {
            this.textAnchor = 'middle';
        }
        setTimeout(function () { return _this.updateDims(); });
    };
    XAxisTicksComponent.prototype.getRotationAngle = function (ticks) {
        var angle = 0;
        this.maxTicksLength = 0;
        for (var i = 0; i < ticks.length; i++) {
            var tick = this.tickFormat(ticks[i]).toString();
            var tickLength = tick.length;
            if (this.trimTicks) {
                tickLength = this.tickTrim(tick).length;
            }
            if (tickLength > this.maxTicksLength) {
                this.maxTicksLength = tickLength;
            }
        }
        var len = Math.min(this.maxTicksLength, this.maxAllowedLength);
        var charWidth = 8; // need to measure this
        var wordWidth = len * charWidth;
        var baseWidth = wordWidth;
        var maxBaseWidth = Math.floor(this.width / ticks.length);
        // calculate optimal angle
        while (baseWidth > maxBaseWidth && angle > -90) {
            angle -= 30;
            baseWidth = Math.cos(angle * (Math.PI / 180)) * wordWidth;
        }
        return angle;
    };
    XAxisTicksComponent.prototype.getTicks = function () {
        var ticks;
        var maxTicks = this.getMaxTicks(20);
        var maxScaleTicks = this.getMaxTicks(100);
        if (this.tickValues) {
            ticks = this.tickValues;
        }
        else if (this.scale.ticks) {
            ticks = this.scale.ticks.apply(this.scale, [maxScaleTicks]);
        }
        else {
            ticks = this.scale.domain();
            ticks = reduceTicks(ticks, maxTicks);
        }
        return ticks;
    };
    XAxisTicksComponent.prototype.getMaxTicks = function (tickWidth) {
        return Math.floor(this.width / tickWidth);
    };
    XAxisTicksComponent.prototype.tickTransform = function (tick) {
        return 'translate(' + this.adjustedScale(tick) + ',' + this.verticalSpacing + ')';
    };
    XAxisTicksComponent.prototype.gridLineTransform = function () {
        return "translate(0," + (-this.verticalSpacing - 5) + ")";
    };
    XAxisTicksComponent.prototype.tickTrim = function (label) {
        return this.trimTicks ? trimLabel(label, this.maxTickLength) : label;
    };
    __decorate([
        Input()
    ], XAxisTicksComponent.prototype, "scale", void 0);
    __decorate([
        Input()
    ], XAxisTicksComponent.prototype, "orient", void 0);
    __decorate([
        Input()
    ], XAxisTicksComponent.prototype, "tickArguments", void 0);
    __decorate([
        Input()
    ], XAxisTicksComponent.prototype, "tickValues", void 0);
    __decorate([
        Input()
    ], XAxisTicksComponent.prototype, "tickStroke", void 0);
    __decorate([
        Input()
    ], XAxisTicksComponent.prototype, "trimTicks", void 0);
    __decorate([
        Input()
    ], XAxisTicksComponent.prototype, "maxTickLength", void 0);
    __decorate([
        Input()
    ], XAxisTicksComponent.prototype, "tickFormatting", void 0);
    __decorate([
        Input()
    ], XAxisTicksComponent.prototype, "showGridLines", void 0);
    __decorate([
        Input()
    ], XAxisTicksComponent.prototype, "gridLineHeight", void 0);
    __decorate([
        Input()
    ], XAxisTicksComponent.prototype, "width", void 0);
    __decorate([
        Input()
    ], XAxisTicksComponent.prototype, "rotateTicks", void 0);
    __decorate([
        Output()
    ], XAxisTicksComponent.prototype, "dimensionsChanged", void 0);
    __decorate([
        ViewChild('ticksel')
    ], XAxisTicksComponent.prototype, "ticksElement", void 0);
    XAxisTicksComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-x-axis-ticks]',
            template: "\n    <svg:g #ticksel>\n      <svg:g *ngFor=\"let tick of ticks\" class=\"tick\" [attr.transform]=\"tickTransform(tick)\">\n        <title>{{ tickFormat(tick) }}</title>\n        <svg:text\n          stroke-width=\"0.01\"\n          [attr.text-anchor]=\"textAnchor\"\n          [attr.transform]=\"textTransform\"\n          [style.font-size]=\"'12px'\"\n        >\n          {{ tickTrim(tickFormat(tick)) }}\n        </svg:text>\n      </svg:g>\n    </svg:g>\n\n    <svg:g *ngFor=\"let tick of ticks\" [attr.transform]=\"tickTransform(tick)\">\n      <svg:g *ngIf=\"showGridLines\" [attr.transform]=\"gridLineTransform()\">\n        <svg:line class=\"gridline-path gridline-path-vertical\" [attr.y1]=\"-gridLineHeight\" y2=\"0\" />\n      </svg:g>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], XAxisTicksComponent);
    return XAxisTicksComponent;
}());
export { XAxisTicksComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieC1heGlzLXRpY2tzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9heGVzL3gtYXhpcy10aWNrcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBR1osU0FBUyxFQUdULHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBMkI3QztJQUFBO1FBR1csa0JBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXBCLGVBQVUsR0FBRyxNQUFNLENBQUM7UUFDcEIsY0FBUyxHQUFZLElBQUksQ0FBQztRQUMxQixrQkFBYSxHQUFXLEVBQUUsQ0FBQztRQUUzQixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUd0QixnQkFBVyxHQUFZLElBQUksQ0FBQztRQUUzQixzQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWpELG9CQUFlLEdBQVcsRUFBRSxDQUFDO1FBQzdCLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBQ3hCLGVBQVUsR0FBVyxRQUFRLENBQUM7UUFDOUIsbUJBQWMsR0FBVyxDQUFDLENBQUM7UUFDM0IscUJBQWdCLEdBQVcsRUFBRSxDQUFDO1FBSzlCLFdBQU0sR0FBVyxDQUFDLENBQUM7SUF5SHJCLENBQUM7SUFySEMseUNBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsNkNB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SyxDQUFDO0lBQ3ZFLENBQUM7SUFuSlE7UUFBUixLQUFLLEVBQUU7c0RBQU87SUFDTjtRQUFSLEtBQUssRUFBRTt1REFBUTtJQUNQO1FBQVIsS0FBSyxFQUFFOzhEQUFxQjtJQUNwQjtRQUFSLEtBQUssRUFBRTsyREFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7MkRBQXFCO0lBQ3BCO1FBQVIsS0FBSyxFQUFFOzBEQUEyQjtJQUMxQjtRQUFSLEtBQUssRUFBRTs4REFBNEI7SUFDM0I7UUFBUixLQUFLLEVBQUU7K0RBQWdCO0lBQ2Y7UUFBUixLQUFLLEVBQUU7OERBQXVCO0lBQ3RCO1FBQVIsS0FBSyxFQUFFOytEQUFnQjtJQUNmO1FBQVIsS0FBSyxFQUFFO3NEQUFPO0lBQ047UUFBUixLQUFLLEVBQUU7NERBQTZCO0lBRTNCO1FBQVQsTUFBTSxFQUFFO2tFQUF3QztJQWdCM0I7UUFBckIsU0FBUyxDQUFDLFNBQVMsQ0FBQzs2REFBMEI7SUE5QnBDLG1CQUFtQjtRQXpCL0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDRCQUE0QjtZQUN0QyxRQUFRLEVBQUUsK3ZCQW9CVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FDVyxtQkFBbUIsQ0FxSi9CO0lBQUQsMEJBQUM7Q0FBQSxBQXJKRCxJQXFKQztTQXJKWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBFbGVtZW50UmVmLFxyXG4gIFZpZXdDaGlsZCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgdHJpbUxhYmVsIH0gZnJvbSAnLi4vdHJpbS1sYWJlbC5oZWxwZXInO1xyXG5pbXBvcnQgeyByZWR1Y2VUaWNrcyB9IGZyb20gJy4vdGlja3MuaGVscGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLXgtYXhpcy10aWNrc10nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8c3ZnOmcgI3RpY2tzZWw+XHJcbiAgICAgIDxzdmc6ZyAqbmdGb3I9XCJsZXQgdGljayBvZiB0aWNrc1wiIGNsYXNzPVwidGlja1wiIFthdHRyLnRyYW5zZm9ybV09XCJ0aWNrVHJhbnNmb3JtKHRpY2spXCI+XHJcbiAgICAgICAgPHRpdGxlPnt7IHRpY2tGb3JtYXQodGljaykgfX08L3RpdGxlPlxyXG4gICAgICAgIDxzdmc6dGV4dFxyXG4gICAgICAgICAgc3Ryb2tlLXdpZHRoPVwiMC4wMVwiXHJcbiAgICAgICAgICBbYXR0ci50ZXh0LWFuY2hvcl09XCJ0ZXh0QW5jaG9yXCJcclxuICAgICAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJ0ZXh0VHJhbnNmb3JtXCJcclxuICAgICAgICAgIFtzdHlsZS5mb250LXNpemVdPVwiJzEycHgnXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICB7eyB0aWNrVHJpbSh0aWNrRm9ybWF0KHRpY2spKSB9fVxyXG4gICAgICAgIDwvc3ZnOnRleHQ+XHJcbiAgICAgIDwvc3ZnOmc+XHJcbiAgICA8L3N2ZzpnPlxyXG5cclxuICAgIDxzdmc6ZyAqbmdGb3I9XCJsZXQgdGljayBvZiB0aWNrc1wiIFthdHRyLnRyYW5zZm9ybV09XCJ0aWNrVHJhbnNmb3JtKHRpY2spXCI+XHJcbiAgICAgIDxzdmc6ZyAqbmdJZj1cInNob3dHcmlkTGluZXNcIiBbYXR0ci50cmFuc2Zvcm1dPVwiZ3JpZExpbmVUcmFuc2Zvcm0oKVwiPlxyXG4gICAgICAgIDxzdmc6bGluZSBjbGFzcz1cImdyaWRsaW5lLXBhdGggZ3JpZGxpbmUtcGF0aC12ZXJ0aWNhbFwiIFthdHRyLnkxXT1cIi1ncmlkTGluZUhlaWdodFwiIHkyPVwiMFwiIC8+XHJcbiAgICAgIDwvc3ZnOmc+XHJcbiAgICA8L3N2ZzpnPlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFhBeGlzVGlja3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xyXG4gIEBJbnB1dCgpIHNjYWxlO1xyXG4gIEBJbnB1dCgpIG9yaWVudDtcclxuICBASW5wdXQoKSB0aWNrQXJndW1lbnRzID0gWzVdO1xyXG4gIEBJbnB1dCgpIHRpY2tWYWx1ZXM6IGFueVtdO1xyXG4gIEBJbnB1dCgpIHRpY2tTdHJva2UgPSAnI2NjYyc7XHJcbiAgQElucHV0KCkgdHJpbVRpY2tzOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSBtYXhUaWNrTGVuZ3RoOiBudW1iZXIgPSAxNjtcclxuICBASW5wdXQoKSB0aWNrRm9ybWF0dGluZztcclxuICBASW5wdXQoKSBzaG93R3JpZExpbmVzID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZ3JpZExpbmVIZWlnaHQ7XHJcbiAgQElucHV0KCkgd2lkdGg7XHJcbiAgQElucHV0KCkgcm90YXRlVGlja3M6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBAT3V0cHV0KCkgZGltZW5zaW9uc0NoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHZlcnRpY2FsU3BhY2luZzogbnVtYmVyID0gMjA7XHJcbiAgcm90YXRlTGFiZWxzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgaW5uZXJUaWNrU2l6ZTogbnVtYmVyID0gNjtcclxuICBvdXRlclRpY2tTaXplOiBudW1iZXIgPSA2O1xyXG4gIHRpY2tQYWRkaW5nOiBudW1iZXIgPSAzO1xyXG4gIHRleHRBbmNob3I6IHN0cmluZyA9ICdtaWRkbGUnO1xyXG4gIG1heFRpY2tzTGVuZ3RoOiBudW1iZXIgPSAwO1xyXG4gIG1heEFsbG93ZWRMZW5ndGg6IG51bWJlciA9IDE2O1xyXG4gIGFkanVzdGVkU2NhbGU6IGFueTtcclxuICB0ZXh0VHJhbnNmb3JtOiBhbnk7XHJcbiAgdGlja3M6IGFueTtcclxuICB0aWNrRm9ybWF0OiAobzogYW55KSA9PiBhbnk7XHJcbiAgaGVpZ2h0OiBudW1iZXIgPSAwO1xyXG5cclxuICBAVmlld0NoaWxkKCd0aWNrc2VsJykgdGlja3NFbGVtZW50OiBFbGVtZW50UmVmO1xyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZURpbXMoKSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVEaW1zKCk6IHZvaWQge1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gcGFyc2VJbnQodGhpcy50aWNrc0VsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQsIDEwKTtcclxuICAgIGlmIChoZWlnaHQgIT09IHRoaXMuaGVpZ2h0KSB7XHJcbiAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICB0aGlzLmRpbWVuc2lvbnNDaGFuZ2VkLmVtaXQoeyBoZWlnaHQgfSk7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVEaW1zKCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgY29uc3Qgc2NhbGUgPSB0aGlzLnNjYWxlO1xyXG4gICAgdGhpcy50aWNrcyA9IHRoaXMuZ2V0VGlja3MoKTtcclxuXHJcbiAgICBpZiAodGhpcy50aWNrRm9ybWF0dGluZykge1xyXG4gICAgICB0aGlzLnRpY2tGb3JtYXQgPSB0aGlzLnRpY2tGb3JtYXR0aW5nO1xyXG4gICAgfSBlbHNlIGlmIChzY2FsZS50aWNrRm9ybWF0KSB7XHJcbiAgICAgIHRoaXMudGlja0Zvcm1hdCA9IHNjYWxlLnRpY2tGb3JtYXQuYXBwbHkoc2NhbGUsIHRoaXMudGlja0FyZ3VtZW50cyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRpY2tGb3JtYXQgPSBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgaWYgKGQuY29uc3RydWN0b3IubmFtZSA9PT0gJ0RhdGUnKSB7XHJcbiAgICAgICAgICByZXR1cm4gZC50b0xvY2FsZURhdGVTdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGQudG9Mb2NhbGVTdHJpbmcoKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhbmdsZSA9IHRoaXMucm90YXRlVGlja3MgPyB0aGlzLmdldFJvdGF0aW9uQW5nbGUodGhpcy50aWNrcykgOiBudWxsO1xyXG5cclxuICAgIHRoaXMuYWRqdXN0ZWRTY2FsZSA9IHRoaXMuc2NhbGUuYmFuZHdpZHRoXHJcbiAgICAgID8gZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUoZCkgKyB0aGlzLnNjYWxlLmJhbmR3aWR0aCgpICogMC41O1xyXG4gICAgICAgIH1cclxuICAgICAgOiB0aGlzLnNjYWxlO1xyXG5cclxuICAgIHRoaXMudGV4dFRyYW5zZm9ybSA9ICcnO1xyXG4gICAgaWYgKGFuZ2xlICYmIGFuZ2xlICE9PSAwKSB7XHJcbiAgICAgIHRoaXMudGV4dFRyYW5zZm9ybSA9IGByb3RhdGUoJHthbmdsZX0pYDtcclxuICAgICAgdGhpcy50ZXh0QW5jaG9yID0gJ2VuZCc7XHJcbiAgICAgIHRoaXMudmVydGljYWxTcGFjaW5nID0gMTA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRleHRBbmNob3IgPSAnbWlkZGxlJztcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlRGltcygpKTtcclxuICB9XHJcblxyXG4gIGdldFJvdGF0aW9uQW5nbGUodGlja3MpOiBudW1iZXIge1xyXG4gICAgbGV0IGFuZ2xlID0gMDtcclxuICAgIHRoaXMubWF4VGlja3NMZW5ndGggPSAwO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCB0aWNrID0gdGhpcy50aWNrRm9ybWF0KHRpY2tzW2ldKS50b1N0cmluZygpO1xyXG4gICAgICBsZXQgdGlja0xlbmd0aCA9IHRpY2subGVuZ3RoO1xyXG4gICAgICBpZiAodGhpcy50cmltVGlja3MpIHtcclxuICAgICAgICB0aWNrTGVuZ3RoID0gdGhpcy50aWNrVHJpbSh0aWNrKS5sZW5ndGg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aWNrTGVuZ3RoID4gdGhpcy5tYXhUaWNrc0xlbmd0aCkge1xyXG4gICAgICAgIHRoaXMubWF4VGlja3NMZW5ndGggPSB0aWNrTGVuZ3RoO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbGVuID0gTWF0aC5taW4odGhpcy5tYXhUaWNrc0xlbmd0aCwgdGhpcy5tYXhBbGxvd2VkTGVuZ3RoKTtcclxuICAgIGNvbnN0IGNoYXJXaWR0aCA9IDg7IC8vIG5lZWQgdG8gbWVhc3VyZSB0aGlzXHJcbiAgICBjb25zdCB3b3JkV2lkdGggPSBsZW4gKiBjaGFyV2lkdGg7XHJcblxyXG4gICAgbGV0IGJhc2VXaWR0aCA9IHdvcmRXaWR0aDtcclxuICAgIGNvbnN0IG1heEJhc2VXaWR0aCA9IE1hdGguZmxvb3IodGhpcy53aWR0aCAvIHRpY2tzLmxlbmd0aCk7XHJcblxyXG4gICAgLy8gY2FsY3VsYXRlIG9wdGltYWwgYW5nbGVcclxuICAgIHdoaWxlIChiYXNlV2lkdGggPiBtYXhCYXNlV2lkdGggJiYgYW5nbGUgPiAtOTApIHtcclxuICAgICAgYW5nbGUgLT0gMzA7XHJcbiAgICAgIGJhc2VXaWR0aCA9IE1hdGguY29zKGFuZ2xlICogKE1hdGguUEkgLyAxODApKSAqIHdvcmRXaWR0aDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYW5nbGU7XHJcbiAgfVxyXG5cclxuICBnZXRUaWNrcygpIHtcclxuICAgIGxldCB0aWNrcztcclxuICAgIGNvbnN0IG1heFRpY2tzID0gdGhpcy5nZXRNYXhUaWNrcygyMCk7XHJcbiAgICBjb25zdCBtYXhTY2FsZVRpY2tzID0gdGhpcy5nZXRNYXhUaWNrcygxMDApO1xyXG5cclxuICAgIGlmICh0aGlzLnRpY2tWYWx1ZXMpIHtcclxuICAgICAgdGlja3MgPSB0aGlzLnRpY2tWYWx1ZXM7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGUudGlja3MpIHtcclxuICAgICAgdGlja3MgPSB0aGlzLnNjYWxlLnRpY2tzLmFwcGx5KHRoaXMuc2NhbGUsIFttYXhTY2FsZVRpY2tzXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aWNrcyA9IHRoaXMuc2NhbGUuZG9tYWluKCk7XHJcbiAgICAgIHRpY2tzID0gcmVkdWNlVGlja3ModGlja3MsIG1heFRpY2tzKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGlja3M7XHJcbiAgfVxyXG5cclxuICBnZXRNYXhUaWNrcyh0aWNrV2lkdGg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLndpZHRoIC8gdGlja1dpZHRoKTtcclxuICB9XHJcblxyXG4gIHRpY2tUcmFuc2Zvcm0odGljayk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgdGhpcy5hZGp1c3RlZFNjYWxlKHRpY2spICsgJywnICsgdGhpcy52ZXJ0aWNhbFNwYWNpbmcgKyAnKSc7XHJcbiAgfVxyXG5cclxuICBncmlkTGluZVRyYW5zZm9ybSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGB0cmFuc2xhdGUoMCwkey10aGlzLnZlcnRpY2FsU3BhY2luZyAtIDV9KWA7XHJcbiAgfVxyXG5cclxuICB0aWNrVHJpbShsYWJlbDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnRyaW1UaWNrcyA/IHRyaW1MYWJlbChsYWJlbCwgdGhpcy5tYXhUaWNrTGVuZ3RoKSA6IGxhYmVsO1xyXG4gIH1cclxufVxyXG4iXX0=