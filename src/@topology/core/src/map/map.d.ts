import { Canvas } from '../canvas';
export declare class ViewMap {
    parent: Canvas;
    box: HTMLElement;
    readonly boxWidth = 320;
    readonly boxHeight = 180;
    readonly ratio: number;
    readonly padding = 5;
    img: HTMLImageElement;
    isShow: boolean;
    isDown: boolean;
    view: HTMLElement;
    constructor(parent: Canvas);
    show(): void;
    hide(): void;
    setView(): void;
    private onMouseDown;
    private onMouseMove;
    private onMouseUp;
}
