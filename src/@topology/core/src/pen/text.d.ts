import { Pen } from '.';
export declare function calcTextRect(pen: Pen): void;
export declare function calcTextDrawRect(ctx: CanvasRenderingContext2D, pen: Pen): void;
export declare function calcTextLines(pen: Pen, text?: string): string[];
export declare function getWords(txt?: string): string[];
export declare function wrapLines(words: string[], pen: Pen): string[];
export declare function calcTextAdaptionWidth(ctx: CanvasRenderingContext2D, pen: Pen): number;
