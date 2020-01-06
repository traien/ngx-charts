import { __decorate } from "tslib";
import { Component, Input, Output, ViewChild, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { trimLabel } from '../trim-label.helper';
import { reduceTicks } from './ticks.helper';
import { roundedRect } from '../../common/shape.helper';
let YAxisTicksComponent = class YAxisTicksComponent {
    constructor() {
        this.tickArguments = [5];
        this.tickStroke = '#ccc';
        this.trimTicks = true;
        this.maxTickLength = 16;
        this.showGridLines = false;
        this.showRefLabels = false;
        this.showRefLines = false;
        this.dimensionsChanged = new EventEmitter();
        this.innerTickSize = 6;
        this.tickPadding = 3;
        this.verticalSpacing = 20;
        this.textAnchor = 'middle';
        this.width = 0;
        this.outerTickSize = 6;
        this.rotateLabels = false;
        this.referenceLineLength = 0;
    }
    ngOnChanges(changes) {
        this.update();
    }
    ngAfterViewInit() {
        setTimeout(() => this.updateDims());
    }
    updateDims() {
        const width = parseInt(this.ticksElement.nativeElement.getBoundingClientRect().width, 10);
        if (width !== this.width) {
            this.width = width;
            this.dimensionsChanged.emit({ width });
            setTimeout(() => this.updateDims());
        }
    }
    update() {
        let scale;
        const sign = this.orient === 'top' || this.orient === 'right' ? -1 : 1;
        this.tickSpacing = Math.max(this.innerTickSize, 0) + this.tickPadding;
        scale = this.scale;
        this.ticks = this.getTicks();
        console.log(this.ticks);
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
        this.adjustedScale = scale.bandwidth
            ? function (d) {
                return scale(d) + scale.bandwidth() * 0.5;
            }
            : scale;
        if (this.showRefLines && this.referenceLines) {
            this.setReferencelines();
        }
        switch (this.orient) {
            case 'top':
                this.transform = function (tick) {
                    return 'translate(' + this.adjustedScale(tick) + ',0)';
                };
                this.textAnchor = 'middle';
                this.y2 = this.innerTickSize * sign;
                this.y1 = this.tickSpacing * sign;
                this.dy = sign < 0 ? '0em' : '.71em';
                break;
            case 'bottom':
                this.transform = function (tick) {
                    return 'translate(' + this.adjustedScale(tick) + ',0)';
                };
                this.textAnchor = 'middle';
                this.y2 = this.innerTickSize * sign;
                this.y1 = this.tickSpacing * sign;
                this.dy = sign < 0 ? '0em' : '.71em';
                break;
            case 'left':
                this.transform = function (tick) {
                    return 'translate(0,' + this.adjustedScale(tick) + ')';
                };
                this.textAnchor = 'end';
                this.x2 = this.innerTickSize * -sign;
                this.x1 = this.tickSpacing * -sign;
                this.dy = '.32em';
                break;
            case 'right':
                this.transform = function (tick) {
                    return 'translate(0,' + this.adjustedScale(tick) + ')';
                };
                this.textAnchor = 'start';
                this.x2 = this.innerTickSize * -sign;
                this.x1 = this.tickSpacing * -sign;
                this.dy = '.32em';
                break;
            default:
        }
        setTimeout(() => this.updateDims());
    }
    getLogTick(tick) {
        console.log(this.scaleType);
        if (this.scaleType === 'log') {
            return Math.pow(10, tick);
        }
        else {
            return tick;
        }
    }
    setReferencelines() {
        this.refMin = this.adjustedScale(Math.min.apply(null, this.referenceLines.map(item => item.value)));
        this.refMax = this.adjustedScale(Math.max.apply(null, this.referenceLines.map(item => item.value)));
        this.referenceLineLength = this.referenceLines.length;
        this.referenceAreaPath = roundedRect(0, this.refMax, this.gridLineWidth, this.refMin - this.refMax, 0, [
            false,
            false,
            false,
            false
        ]);
    }
    getTicks() {
        let ticks;
        const maxTicks = this.getMaxTicks(20);
        const maxScaleTicks = this.getMaxTicks(50);
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
    }
    getMaxTicks(tickHeight) {
        return Math.floor(this.height / tickHeight);
    }
    tickTransform(tick) {
        return `translate(${this.adjustedScale(tick)},${this.verticalSpacing})`;
    }
    gridLineTransform() {
        return `translate(5,0)`;
    }
    tickTrim(label) {
        return this.trimTicks ? trimLabel(label, this.maxTickLength) : label;
    }
};
__decorate([
    Input()
], YAxisTicksComponent.prototype, "scale", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "scaleType", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "orient", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "tickArguments", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "tickValues", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "tickStroke", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "trimTicks", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "maxTickLength", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "tickFormatting", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "showGridLines", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "gridLineWidth", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "height", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "referenceLines", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "showRefLabels", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "showRefLines", void 0);
__decorate([
    Output()
], YAxisTicksComponent.prototype, "dimensionsChanged", void 0);
__decorate([
    ViewChild('ticksel')
], YAxisTicksComponent.prototype, "ticksElement", void 0);
YAxisTicksComponent = __decorate([
    Component({
        selector: 'g[ngx-charts-y-axis-ticks]',
        template: `
    <svg:g #ticksel>
      <svg:g *ngFor="let tick of ticks" class="tick" [attr.transform]="transform(tick)">
        <title>{{ getLogTick(tickFormat(tick)) }}</title>
        <svg:text
          stroke-width="0.01"
          [attr.dy]="dy"
          [attr.x]="x1"
          [attr.y]="y1"
          [attr.text-anchor]="textAnchor"
          [style.font-size]="'12px'"
        >
          {{ getLogTick(tickTrim(tickFormat(tick))) }}
        </svg:text>
      </svg:g>
    </svg:g>

    <svg:path
      *ngIf="referenceLineLength > 1 && refMax && refMin && showRefLines"
      class="reference-area"
      [attr.d]="referenceAreaPath"
      [attr.transform]="gridLineTransform()"
    />
    <svg:g *ngFor="let tick of ticks" [attr.transform]="transform(tick)">
      <svg:g *ngIf="showGridLines" [attr.transform]="gridLineTransform()">
        <svg:line
          *ngIf="orient === 'left'"
          class="gridline-path gridline-path-horizontal"
          x1="0"
          [attr.x2]="gridLineWidth"
        />
        <svg:line
          *ngIf="orient === 'right'"
          class="gridline-path gridline-path-horizontal"
          x1="0"
          [attr.x2]="-gridLineWidth"
        />
      </svg:g>
    </svg:g>

    <svg:g *ngFor="let refLine of referenceLines">
      <svg:g *ngIf="showRefLines" [attr.transform]="transform(refLine.value)">
        <svg:line
          class="refline-path gridline-path-horizontal"
          x1="0"
          [attr.x2]="gridLineWidth"
          [attr.transform]="gridLineTransform()"
        />
        <svg:g *ngIf="showRefLabels">
          <title>{{ tickTrim(tickFormat(refLine.value)) }}</title>
          <svg:text
            class="refline-label"
            [attr.dy]="dy"
            [attr.y]="-6"
            [attr.x]="gridLineWidth"
            [attr.text-anchor]="textAnchor"
          >
            {{ refLine.name }}
          </svg:text>
        </svg:g>
      </svg:g>
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], YAxisTicksComponent);
export { YAxisTicksComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieS1heGlzLXRpY2tzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9heGVzL3ktYXhpcy10aWNrcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFHTixTQUFTLEVBQ1QsWUFBWSxFQUVaLHVCQUF1QixFQUV4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQXFFeEQsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFBaEM7UUFJVyxrQkFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEIsZUFBVSxHQUFHLE1BQU0sQ0FBQztRQUNwQixjQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBRTNCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBSXRCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBRTdCLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFakQsa0JBQWEsR0FBUSxDQUFDLENBQUM7UUFDdkIsZ0JBQVcsR0FBUSxDQUFDLENBQUM7UUFFckIsb0JBQWUsR0FBVyxFQUFFLENBQUM7UUFDN0IsZUFBVSxHQUFRLFFBQVEsQ0FBQztRQVUzQixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBRzlCLHdCQUFtQixHQUFXLENBQUMsQ0FBQztJQWdLbEMsQ0FBQztJQTNK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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThEVDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO0tBQ2hELENBQUM7R0FDVyxtQkFBbUIsQ0FzTS9CO1NBdE1ZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgT25DaGFuZ2VzLFxuICBFbGVtZW50UmVmLFxuICBWaWV3Q2hpbGQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0cmltTGFiZWwgfSBmcm9tICcuLi90cmltLWxhYmVsLmhlbHBlcic7XG5pbXBvcnQgeyByZWR1Y2VUaWNrcyB9IGZyb20gJy4vdGlja3MuaGVscGVyJztcbmltcG9ydCB7IHJvdW5kZWRSZWN0IH0gZnJvbSAnLi4vLi4vY29tbW9uL3NoYXBlLmhlbHBlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy15LWF4aXMtdGlja3NdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmcgI3RpY2tzZWw+XG4gICAgICA8c3ZnOmcgKm5nRm9yPVwibGV0IHRpY2sgb2YgdGlja3NcIiBjbGFzcz1cInRpY2tcIiBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtKHRpY2spXCI+XG4gICAgICAgIDx0aXRsZT57eyBnZXRMb2dUaWNrKHRpY2tGb3JtYXQodGljaykpIH19PC90aXRsZT5cbiAgICAgICAgPHN2Zzp0ZXh0XG4gICAgICAgICAgc3Ryb2tlLXdpZHRoPVwiMC4wMVwiXG4gICAgICAgICAgW2F0dHIuZHldPVwiZHlcIlxuICAgICAgICAgIFthdHRyLnhdPVwieDFcIlxuICAgICAgICAgIFthdHRyLnldPVwieTFcIlxuICAgICAgICAgIFthdHRyLnRleHQtYW5jaG9yXT1cInRleHRBbmNob3JcIlxuICAgICAgICAgIFtzdHlsZS5mb250LXNpemVdPVwiJzEycHgnXCJcbiAgICAgICAgPlxuICAgICAgICAgIHt7IGdldExvZ1RpY2sodGlja1RyaW0odGlja0Zvcm1hdCh0aWNrKSkpIH19XG4gICAgICAgIDwvc3ZnOnRleHQ+XG4gICAgICA8L3N2ZzpnPlxuICAgIDwvc3ZnOmc+XG5cbiAgICA8c3ZnOnBhdGhcbiAgICAgICpuZ0lmPVwicmVmZXJlbmNlTGluZUxlbmd0aCA+IDEgJiYgcmVmTWF4ICYmIHJlZk1pbiAmJiBzaG93UmVmTGluZXNcIlxuICAgICAgY2xhc3M9XCJyZWZlcmVuY2UtYXJlYVwiXG4gICAgICBbYXR0ci5kXT1cInJlZmVyZW5jZUFyZWFQYXRoXCJcbiAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJncmlkTGluZVRyYW5zZm9ybSgpXCJcbiAgICAvPlxuICAgIDxzdmc6ZyAqbmdGb3I9XCJsZXQgdGljayBvZiB0aWNrc1wiIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm0odGljaylcIj5cbiAgICAgIDxzdmc6ZyAqbmdJZj1cInNob3dHcmlkTGluZXNcIiBbYXR0ci50cmFuc2Zvcm1dPVwiZ3JpZExpbmVUcmFuc2Zvcm0oKVwiPlxuICAgICAgICA8c3ZnOmxpbmVcbiAgICAgICAgICAqbmdJZj1cIm9yaWVudCA9PT0gJ2xlZnQnXCJcbiAgICAgICAgICBjbGFzcz1cImdyaWRsaW5lLXBhdGggZ3JpZGxpbmUtcGF0aC1ob3Jpem9udGFsXCJcbiAgICAgICAgICB4MT1cIjBcIlxuICAgICAgICAgIFthdHRyLngyXT1cImdyaWRMaW5lV2lkdGhcIlxuICAgICAgICAvPlxuICAgICAgICA8c3ZnOmxpbmVcbiAgICAgICAgICAqbmdJZj1cIm9yaWVudCA9PT0gJ3JpZ2h0J1wiXG4gICAgICAgICAgY2xhc3M9XCJncmlkbGluZS1wYXRoIGdyaWRsaW5lLXBhdGgtaG9yaXpvbnRhbFwiXG4gICAgICAgICAgeDE9XCIwXCJcbiAgICAgICAgICBbYXR0ci54Ml09XCItZ3JpZExpbmVXaWR0aFwiXG4gICAgICAgIC8+XG4gICAgICA8L3N2ZzpnPlxuICAgIDwvc3ZnOmc+XG5cbiAgICA8c3ZnOmcgKm5nRm9yPVwibGV0IHJlZkxpbmUgb2YgcmVmZXJlbmNlTGluZXNcIj5cbiAgICAgIDxzdmc6ZyAqbmdJZj1cInNob3dSZWZMaW5lc1wiIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm0ocmVmTGluZS52YWx1ZSlcIj5cbiAgICAgICAgPHN2ZzpsaW5lXG4gICAgICAgICAgY2xhc3M9XCJyZWZsaW5lLXBhdGggZ3JpZGxpbmUtcGF0aC1ob3Jpem9udGFsXCJcbiAgICAgICAgICB4MT1cIjBcIlxuICAgICAgICAgIFthdHRyLngyXT1cImdyaWRMaW5lV2lkdGhcIlxuICAgICAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJncmlkTGluZVRyYW5zZm9ybSgpXCJcbiAgICAgICAgLz5cbiAgICAgICAgPHN2ZzpnICpuZ0lmPVwic2hvd1JlZkxhYmVsc1wiPlxuICAgICAgICAgIDx0aXRsZT57eyB0aWNrVHJpbSh0aWNrRm9ybWF0KHJlZkxpbmUudmFsdWUpKSB9fTwvdGl0bGU+XG4gICAgICAgICAgPHN2Zzp0ZXh0XG4gICAgICAgICAgICBjbGFzcz1cInJlZmxpbmUtbGFiZWxcIlxuICAgICAgICAgICAgW2F0dHIuZHldPVwiZHlcIlxuICAgICAgICAgICAgW2F0dHIueV09XCItNlwiXG4gICAgICAgICAgICBbYXR0ci54XT1cImdyaWRMaW5lV2lkdGhcIlxuICAgICAgICAgICAgW2F0dHIudGV4dC1hbmNob3JdPVwidGV4dEFuY2hvclwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3sgcmVmTGluZS5uYW1lIH19XG4gICAgICAgICAgPC9zdmc6dGV4dD5cbiAgICAgICAgPC9zdmc6Zz5cbiAgICAgIDwvc3ZnOmc+XG4gICAgPC9zdmc6Zz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgWUF4aXNUaWNrc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIHNjYWxlO1xuICBASW5wdXQoKSBzY2FsZVR5cGU7XG4gIEBJbnB1dCgpIG9yaWVudDtcbiAgQElucHV0KCkgdGlja0FyZ3VtZW50cyA9IFs1XTtcbiAgQElucHV0KCkgdGlja1ZhbHVlczogYW55W107XG4gIEBJbnB1dCgpIHRpY2tTdHJva2UgPSAnI2NjYyc7XG4gIEBJbnB1dCgpIHRyaW1UaWNrczogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIG1heFRpY2tMZW5ndGg6IG51bWJlciA9IDE2O1xuICBASW5wdXQoKSB0aWNrRm9ybWF0dGluZztcbiAgQElucHV0KCkgc2hvd0dyaWRMaW5lcyA9IGZhbHNlO1xuICBASW5wdXQoKSBncmlkTGluZVdpZHRoO1xuICBASW5wdXQoKSBoZWlnaHQ7XG4gIEBJbnB1dCgpIHJlZmVyZW5jZUxpbmVzO1xuICBASW5wdXQoKSBzaG93UmVmTGFiZWxzOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNob3dSZWZMaW5lczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBkaW1lbnNpb25zQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBpbm5lclRpY2tTaXplOiBhbnkgPSA2O1xuICB0aWNrUGFkZGluZzogYW55ID0gMztcbiAgdGlja1NwYWNpbmc6IGFueTtcbiAgdmVydGljYWxTcGFjaW5nOiBudW1iZXIgPSAyMDtcbiAgdGV4dEFuY2hvcjogYW55ID0gJ21pZGRsZSc7XG4gIGR5OiBhbnk7XG4gIHgxOiBhbnk7XG4gIHgyOiBhbnk7XG4gIHkxOiBhbnk7XG4gIHkyOiBhbnk7XG4gIGFkanVzdGVkU2NhbGU6IGFueTtcbiAgdHJhbnNmb3JtOiAobzogYW55KSA9PiBzdHJpbmc7XG4gIHRpY2tGb3JtYXQ6IChvOiBhbnkpID0+IHN0cmluZztcbiAgdGlja3M6IGFueTtcbiAgd2lkdGg6IG51bWJlciA9IDA7XG4gIG91dGVyVGlja1NpemU6IG51bWJlciA9IDY7XG4gIHJvdGF0ZUxhYmVsczogYm9vbGVhbiA9IGZhbHNlO1xuICByZWZNYXg6IG51bWJlcjtcbiAgcmVmTWluOiBudW1iZXI7XG4gIHJlZmVyZW5jZUxpbmVMZW5ndGg6IG51bWJlciA9IDA7XG4gIHJlZmVyZW5jZUFyZWFQYXRoOiBzdHJpbmc7XG5cbiAgQFZpZXdDaGlsZCgndGlja3NlbCcpIHRpY2tzRWxlbWVudDogRWxlbWVudFJlZjtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlRGltcygpKTtcbiAgfVxuXG4gIHVwZGF0ZURpbXMoKTogdm9pZCB7XG4gICAgY29uc3Qgd2lkdGggPSBwYXJzZUludCh0aGlzLnRpY2tzRWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoLCAxMCk7XG4gICAgaWYgKHdpZHRoICE9PSB0aGlzLndpZHRoKSB7XG4gICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICB0aGlzLmRpbWVuc2lvbnNDaGFuZ2VkLmVtaXQoeyB3aWR0aCB9KTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVEaW1zKCkpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBsZXQgc2NhbGU7XG4gICAgY29uc3Qgc2lnbiA9IHRoaXMub3JpZW50ID09PSAndG9wJyB8fCB0aGlzLm9yaWVudCA9PT0gJ3JpZ2h0JyA/IC0xIDogMTtcbiAgICB0aGlzLnRpY2tTcGFjaW5nID0gTWF0aC5tYXgodGhpcy5pbm5lclRpY2tTaXplLCAwKSArIHRoaXMudGlja1BhZGRpbmc7XG5cbiAgICBzY2FsZSA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy50aWNrcyA9IHRoaXMuZ2V0VGlja3MoKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnRpY2tzKTtcblxuICAgIGlmICh0aGlzLnRpY2tGb3JtYXR0aW5nKSB7XG4gICAgICB0aGlzLnRpY2tGb3JtYXQgPSB0aGlzLnRpY2tGb3JtYXR0aW5nO1xuICAgIH0gZWxzZSBpZiAoc2NhbGUudGlja0Zvcm1hdCkge1xuICAgICAgdGhpcy50aWNrRm9ybWF0ID0gc2NhbGUudGlja0Zvcm1hdC5hcHBseShzY2FsZSwgdGhpcy50aWNrQXJndW1lbnRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50aWNrRm9ybWF0ID0gZnVuY3Rpb24oZCkge1xuICAgICAgICBpZiAoZC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnRGF0ZScpIHtcbiAgICAgICAgICByZXR1cm4gZC50b0xvY2FsZURhdGVTdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZC50b0xvY2FsZVN0cmluZygpO1xuICAgICAgfTtcbiAgICB9XG5cblxuICAgIHRoaXMuYWRqdXN0ZWRTY2FsZSA9IHNjYWxlLmJhbmR3aWR0aFxuICAgICAgPyBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIHNjYWxlKGQpICsgc2NhbGUuYmFuZHdpZHRoKCkgKiAwLjU7XG4gICAgICAgIH1cbiAgICAgIDogc2NhbGU7XG5cbiAgICBpZiAodGhpcy5zaG93UmVmTGluZXMgJiYgdGhpcy5yZWZlcmVuY2VMaW5lcykge1xuICAgICAgdGhpcy5zZXRSZWZlcmVuY2VsaW5lcygpO1xuICAgIH1cblxuICAgIHN3aXRjaCAodGhpcy5vcmllbnQpIHtcbiAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgIHRoaXMudHJhbnNmb3JtID0gZnVuY3Rpb24odGljaykge1xuICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyB0aGlzLmFkanVzdGVkU2NhbGUodGljaykgKyAnLDApJztcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50ZXh0QW5jaG9yID0gJ21pZGRsZSc7XG4gICAgICAgIHRoaXMueTIgPSB0aGlzLmlubmVyVGlja1NpemUgKiBzaWduO1xuICAgICAgICB0aGlzLnkxID0gdGhpcy50aWNrU3BhY2luZyAqIHNpZ247XG4gICAgICAgIHRoaXMuZHkgPSBzaWduIDwgMCA/ICcwZW0nIDogJy43MWVtJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IGZ1bmN0aW9uKHRpY2spIHtcbiAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgdGhpcy5hZGp1c3RlZFNjYWxlKHRpY2spICsgJywwKSc7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGV4dEFuY2hvciA9ICdtaWRkbGUnO1xuICAgICAgICB0aGlzLnkyID0gdGhpcy5pbm5lclRpY2tTaXplICogc2lnbjtcbiAgICAgICAgdGhpcy55MSA9IHRoaXMudGlja1NwYWNpbmcgKiBzaWduO1xuICAgICAgICB0aGlzLmR5ID0gc2lnbiA8IDAgPyAnMGVtJyA6ICcuNzFlbSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIHRoaXMudHJhbnNmb3JtID0gZnVuY3Rpb24odGljaykge1xuICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKDAsJyArIHRoaXMuYWRqdXN0ZWRTY2FsZSh0aWNrKSArICcpJztcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50ZXh0QW5jaG9yID0gJ2VuZCc7XG4gICAgICAgIHRoaXMueDIgPSB0aGlzLmlubmVyVGlja1NpemUgKiAtc2lnbjtcbiAgICAgICAgdGhpcy54MSA9IHRoaXMudGlja1NwYWNpbmcgKiAtc2lnbjtcbiAgICAgICAgdGhpcy5keSA9ICcuMzJlbSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IGZ1bmN0aW9uKHRpY2spIHtcbiAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgwLCcgKyB0aGlzLmFkanVzdGVkU2NhbGUodGljaykgKyAnKSc7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGV4dEFuY2hvciA9ICdzdGFydCc7XG4gICAgICAgIHRoaXMueDIgPSB0aGlzLmlubmVyVGlja1NpemUgKiAtc2lnbjtcbiAgICAgICAgdGhpcy54MSA9IHRoaXMudGlja1NwYWNpbmcgKiAtc2lnbjtcbiAgICAgICAgdGhpcy5keSA9ICcuMzJlbSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZURpbXMoKSk7XG4gIH1cbiAgZ2V0TG9nVGljayh0aWNrOiBhbnkpOiBhbnkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuc2NhbGVUeXBlKTtcbiAgICBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICdsb2cnKSB7XG4gICAgICByZXR1cm4gTWF0aC5wb3coMTAsIHRpY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGljaztcbiAgICB9XG4gIH1cblxuICBzZXRSZWZlcmVuY2VsaW5lcygpOiB2b2lkIHtcbiAgICB0aGlzLnJlZk1pbiA9IHRoaXMuYWRqdXN0ZWRTY2FsZShcbiAgICAgIE1hdGgubWluLmFwcGx5KFxuICAgICAgICBudWxsLFxuICAgICAgICB0aGlzLnJlZmVyZW5jZUxpbmVzLm1hcChpdGVtID0+IGl0ZW0udmFsdWUpXG4gICAgICApXG4gICAgKTtcbiAgICB0aGlzLnJlZk1heCA9IHRoaXMuYWRqdXN0ZWRTY2FsZShcbiAgICAgIE1hdGgubWF4LmFwcGx5KFxuICAgICAgICBudWxsLFxuICAgICAgICB0aGlzLnJlZmVyZW5jZUxpbmVzLm1hcChpdGVtID0+IGl0ZW0udmFsdWUpXG4gICAgICApXG4gICAgKTtcbiAgICB0aGlzLnJlZmVyZW5jZUxpbmVMZW5ndGggPSB0aGlzLnJlZmVyZW5jZUxpbmVzLmxlbmd0aDtcblxuICAgIHRoaXMucmVmZXJlbmNlQXJlYVBhdGggPSByb3VuZGVkUmVjdCgwLCB0aGlzLnJlZk1heCwgdGhpcy5ncmlkTGluZVdpZHRoLCB0aGlzLnJlZk1pbiAtIHRoaXMucmVmTWF4LCAwLCBbXG4gICAgICBmYWxzZSxcbiAgICAgIGZhbHNlLFxuICAgICAgZmFsc2UsXG4gICAgICBmYWxzZVxuICAgIF0pO1xuICB9XG5cbiAgZ2V0VGlja3MoKTogYW55IHtcbiAgICBsZXQgdGlja3M7XG4gICAgY29uc3QgbWF4VGlja3MgPSB0aGlzLmdldE1heFRpY2tzKDIwKTtcbiAgICBjb25zdCBtYXhTY2FsZVRpY2tzID0gdGhpcy5nZXRNYXhUaWNrcyg1MCk7XG5cbiAgICBpZiAodGhpcy50aWNrVmFsdWVzKSB7XG4gICAgICB0aWNrcyA9IHRoaXMudGlja1ZhbHVlcztcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGUudGlja3MpIHtcbiAgICAgIHRpY2tzID0gdGhpcy5zY2FsZS50aWNrcy5hcHBseSh0aGlzLnNjYWxlLCBbbWF4U2NhbGVUaWNrc10pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aWNrcyA9IHRoaXMuc2NhbGUuZG9tYWluKCk7XG4gICAgICB0aWNrcyA9IHJlZHVjZVRpY2tzKHRpY2tzLCBtYXhUaWNrcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRpY2tzO1xuICB9XG5cbiAgZ2V0TWF4VGlja3ModGlja0hlaWdodDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLmhlaWdodCAvIHRpY2tIZWlnaHQpO1xuICB9XG5cbiAgdGlja1RyYW5zZm9ybSh0aWNrKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYHRyYW5zbGF0ZSgke3RoaXMuYWRqdXN0ZWRTY2FsZSh0aWNrKX0sJHt0aGlzLnZlcnRpY2FsU3BhY2luZ30pYDtcbiAgfVxuXG4gIGdyaWRMaW5lVHJhbnNmb3JtKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGB0cmFuc2xhdGUoNSwwKWA7XG4gIH1cblxuICB0aWNrVHJpbShsYWJlbDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy50cmltVGlja3MgPyB0cmltTGFiZWwobGFiZWwsIHRoaXMubWF4VGlja0xlbmd0aCkgOiBsYWJlbDtcbiAgfVxufVxuIl19