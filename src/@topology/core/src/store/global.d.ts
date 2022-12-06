import { Pen } from '../pen';
export declare const globalStore: {
    version: string;
    path2dDraws: {
        [key: string]: (pen: Pen, ctx?: CanvasRenderingContext2D) => Path2D;
    };
    canvasDraws: {
        [key: string]: (ctx: CanvasRenderingContext2D, pen: Pen) => void;
    };
    anchors: {
        [key: string]: (pen: Pen) => void;
    };
    htmlElements: {
        [key: string]: HTMLImageElement;
    };
};
export declare function register(path2dFns: {
    [key: string]: (pen: Pen, ctx?: CanvasRenderingContext2D) => Path2D;
}): void;
export declare function registerCanvasDraw(drawFns: {
    [key: string]: (ctx: CanvasRenderingContext2D, pen: Pen) => void;
}): void;
export declare function registerAnchors(anchorsFns: {
    [key: string]: (pen: Pen) => void;
}): void;
