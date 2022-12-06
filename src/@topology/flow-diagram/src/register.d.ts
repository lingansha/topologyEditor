import { Pen } from '@topology/core';
import { flowCommentAnchors } from './comment';
import { flowDocumentAnchors } from './document';
import { flowManuallyAnchors } from './manually';
import { flowParallelAnchors } from './parallel';
export declare function flowPens(): Record<string, (pen: Pen, ctx?: CanvasRenderingContext2D) => Path2D>;
export declare function flowAnchors(): {
    flowDocument: typeof flowDocumentAnchors;
    flowManually: typeof flowManuallyAnchors;
    flowParallel: typeof flowParallelAnchors;
    flowComment: typeof flowCommentAnchors;
};
