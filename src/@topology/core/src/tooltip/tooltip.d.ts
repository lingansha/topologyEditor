import { Pen } from '../pen';
import { Point } from '../point';
import { TopologyStore } from '../store';
export declare class Tooltip {
    parentElement: HTMLElement;
    private store;
    box: HTMLElement;
    text: HTMLElement;
    arrowUp: HTMLElement;
    arrowDown: HTMLElement;
    x: number;
    y: number;
    private currentPen;
    constructor(parentElement: HTMLElement, store: TopologyStore);
    /**
     * 通过 pen 的 titleFn titleFnJs title 来获取 title
     * @returns 此次应该展示的 title
     */
    private static getTitle;
    /**
     * 更改 tooltip dom 的文本
     * @returns 返回设置前的 rect
     */
    private setText;
    /**
     * 更新文字
     */
    updateText(pen: Pen): void;
    /**
     * 改变文字会 影响 box 的大小，需要重新设置位置
     * @param oldRect 原
     * @param newRect 新
     */
    private changePositionByText;
    private static titleEmpty;
    show(pen: Pen, pos: Point): void;
    hide(): void;
    translate(x: number, y: number): void;
    destroy(): void;
}
