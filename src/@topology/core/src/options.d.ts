import { TextAlign, TextBaseline } from './pen';
import { Point } from './point';
export declare enum KeydownType {
    None = -1,
    Document = 0,
    Canvas = 1
}
export interface Options {
    color?: string;
    activeColor?: string;
    activeBackground?: string;
    hoverColor?: string;
    hoverBackground?: string;
    anchorColor?: string;
    hoverAnchorColor?: string;
    anchorRadius?: number;
    anchorBackground?: string;
    dockColor?: string;
    dockPenColor?: string;
    dragColor?: string;
    animateColor?: string;
    textColor?: string;
    fontFamily?: string;
    fontSize?: number;
    lineHeight?: number;
    textAlign?: TextAlign;
    textBaseline?: TextBaseline;
    rotateCursor?: string;
    hoverCursor?: string;
    disableInput?: boolean;
    disableRotate?: boolean;
    disableSize?: boolean;
    disableAnchor?: boolean;
    autoAnchor?: boolean;
    disableEmptyLine?: boolean;
    disableRepeatLine?: boolean;
    disableScale?: boolean;
    disableTranslate?: boolean;
    disableDock?: boolean;
    disableLineDock?: boolean;
    moveConnectedLine?: boolean;
    minScale?: number;
    maxScale?: number;
    keydown?: KeydownType;
    background?: string;
    grid?: boolean;
    gridColor?: string;
    gridSize?: number;
    rule?: boolean;
    ruleColor?: string;
    drawingLineName?: string;
    fromArrow?: string;
    toArrow?: string;
    autoPolyline?: boolean;
    interval?: number;
    animateInterval?: number;
    dragAllIn?: boolean;
    scroll?: boolean;
    uploadFn?: (file: File) => Promise<string>;
    uploadUrl?: string;
    uploadParams?: Record<string, any>;
    uploadHeaders?: Record<string, string>;
    disableRuleLine?: boolean;
    ruleLineColor?: string;
    defaultAnchors?: Point[];
    measureTextWidth?: boolean;
    mouseRightActive?: boolean;
    disableClipboard?: boolean;
}
export declare const defaultOptions: Options;
