import { Pen } from '@topology/core';
import { activityFinal } from './final';
export declare function activityDiagram(): Record<string, (pen: Pen, ctx?: CanvasRenderingContext2D) => Path2D>;
export declare function activityDiagramByCtx(): {
    activityFinal: typeof activityFinal;
};
