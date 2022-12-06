/// <reference types="offscreencanvas" />
import { Pen } from '../pen';
import { TopologyStore } from '../store';
export declare class CanvasImage {
    parentElement: HTMLElement;
    store: TopologyStore;
    private isBottom?;
    canvas: HTMLCanvasElement;
    /**
     * 非图片的绘制
     * isBottom true 指背景颜色，背景网格
     * isBottom false 指 标尺
     */
    otherOffsreen: HTMLCanvasElement | OffscreenCanvas;
    offscreen: HTMLCanvasElement | OffscreenCanvas;
    animateOffsScreen: HTMLCanvasElement | OffscreenCanvas;
    constructor(parentElement: HTMLElement, store: TopologyStore, isBottom?: boolean);
    resize(w?: number, h?: number): void;
    init(): void;
    clear(): void;
    hasImage(pen: Pen): boolean;
    render(): void;
    renderGrid(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D): void;
    renderRule(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D): void;
}
