import { Pen } from '@topology/core';
export declare const highchartsList: {
    Highcharts: any;
    [id: string]: {
        div: HTMLDivElement;
        chart: any;
    };
};
export declare function highcharts(pen: Pen): Path2D;
