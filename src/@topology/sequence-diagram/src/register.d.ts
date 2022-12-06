import { Pen } from '@topology/core';
import { lifeline } from './lifeline';
export declare function sequencePens(): Record<string, (pen: Pen, ctx?: CanvasRenderingContext2D) => Path2D>;
export declare function sequencePensbyCtx(): {
    lifeline: typeof lifeline;
};
