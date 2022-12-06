import { BindId, Pen } from '@topology/core';
import type { ECharts, EChartOption } from 'echarts';
export declare enum ReplaceMode {
    Add = 0,
    Replace = 1,
    ReplaceAll = 2
}
export interface ChartPen extends Pen {
    echarts: {
        option: EChartOption;
        max: number;
        replaceMode: ReplaceMode;
        theme: string;
    };
}
export declare const echartsList: {
    echarts: any;
    [id: string]: {
        div: HTMLDivElement;
        chart: ECharts;
    };
};
export declare function echarts(pen: ChartPen): Path2D;
/**
 * 配置 echarts option, 并修改 replaceMode
 * @param pen 当前画笔
 * @param ids 绑定 id 数组
 * @param isTime 是否实时，用于折线图与柱状图，若实时多条线
 * @param isYCategory 是否 Y 轴为 category，用于折线图与柱状图
 */
export declare function setEchartsOption(pen: ChartPen, ids: BindId[], isTime?: boolean, isYCategory?: boolean): void;
