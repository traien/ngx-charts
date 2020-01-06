import { EventEmitter, OnChanges, TemplateRef } from '@angular/core';
import { DataItem } from '../models/chart-data.model';
export declare enum D0Types {
    positive = "positive",
    negative = "negative"
}
export declare class SeriesVerticalComponent implements OnChanges {
    dims: any;
    type: string;
    series: any;
    xScale: any;
    yScale: any;
    scaleType: any;
    colors: any;
    gradient: boolean;
    activeEntries: any[];
    seriesName: string;
    tooltipDisabled: boolean;
    tooltipTemplate: TemplateRef<any>;
    roundEdges: boolean;
    animations: boolean;
    showDataLabel: boolean;
    dataLabelFormatting: any;
    noBarWhenZero: boolean;
    select: EventEmitter<any>;
    activate: EventEmitter<any>;
    deactivate: EventEmitter<any>;
    dataLabelHeightChanged: EventEmitter<any>;
    tooltipPlacement: string;
    tooltipType: string;
    bars: any;
    x: any;
    y: any;
    barsForDataLabels: Array<{
        x: number;
        y: number;
        width: number;
        height: number;
        total: number;
        series: string;
    }>;
    ngOnChanges(changes: any): void;
    update(): void;
    updateDataLabels(): void;
    updateTooltipSettings(): void;
    isActive(entry: any): boolean;
    onClick(data: DataItem): void;
    getLabel(dataItem: any): string;
    trackBy(index: any, bar: any): string;
    trackDataLabelBy(index: any, barLabel: any): string;
}