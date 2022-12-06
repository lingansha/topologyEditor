/// <reference types="offscreencanvas" />
import { TopologyStore } from '../store';
import { Canvas } from './canvas';
export declare class MagnifierCanvas {
    parentCanvas: Canvas;
    parentElement: HTMLElement;
    store: TopologyStore;
    canvas: HTMLCanvasElement;
    magnifierScreen: HTMLCanvasElement | OffscreenCanvas;
    offscreen: HTMLCanvasElement | OffscreenCanvas;
    private magnifierSize;
    magnifier: boolean;
    constructor(parentCanvas: Canvas, parentElement: HTMLElement, store: TopologyStore);
    resize(w?: number, h?: number): void;
    /**
     * 绘制到 该画布的 离屏层
     */
    private renderMagnifier;
    render(): void;
}
