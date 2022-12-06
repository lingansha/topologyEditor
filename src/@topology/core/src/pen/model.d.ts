import { Point } from '../point';
import { Rect } from '../rect';
import { Event } from '../event';
import { Canvas } from '../canvas';
export declare enum PenType {
    Node = 0,
    Line = 1
}
export declare enum LockState {
    None = 0,
    DisableEdit = 1,
    DisableMove = 2,
    DisableScale = 3,
    DisableMoveScale = 4,
    Disable = 10
}
export declare enum AnchorMode {
    Default = 0,
    In = 1,
    Out = 2
}
export declare enum Gradient {
    None = 0,
    Linear = 1,
    Radial = 2
}
export declare const needCalcTextRectProps: string[];
export declare const needSetPenProps: string[];
export declare const needPatchFlagsPenRectProps: string[];
export declare const needCalcIconRectProps: string[];
export interface ConnectLine {
    lineId: string;
    lineAnchor: string;
    anchor: string;
}
export declare type TextAlign = 'left' | 'center' | 'right';
export declare type TextBaseline = 'top' | 'middle' | 'bottom';
export declare type WhiteSpace = 'nowrap' | 'pre-line' | 'break-all' | '';
export declare type IValue = Pen & Partial<ChartData> & Partial<Record<'tag' | 'newId', string>> & {
    [key: string]: any;
};
export declare type Dropdown = string | IValue;
export declare enum LineAnimateType {
    Normal = 0,
    Beads = 1,
    Dot = 2
}
export interface Pen extends Rect {
    id?: string;
    tags?: string[];
    parentId?: string;
    type?: PenType;
    name?: string;
    lineName?: string;
    borderRadius?: number;
    visible?: boolean;
    locked?: LockState;
    close?: boolean;
    length?: number;
    title?: string;
    titleFnJs?: string;
    titleFn?: (pen: Pen) => string;
    lineWidth?: number;
    borderWidth?: number;
    borderColor?: string;
    globalAlpha?: number;
    lineDash?: number[];
    lineDashOffset?: number;
    color?: string;
    background?: string;
    anchorColor?: string;
    hoverAnchorColor?: string;
    hoverColor?: string;
    hoverBackground?: string;
    activeColor?: string;
    activeBackground?: string;
    bkType?: Gradient;
    gradientFromColor?: string;
    gradientToColor?: string;
    gradientAngle?: number;
    gradientRadius?: number;
    strokeType?: Gradient;
    lineGradientFromColor?: string;
    lineGradientToColor?: string;
    lineGradientAngle?: number;
    lineCap?: CanvasLineCap;
    lineJoin?: CanvasLineJoin;
    shadowColor?: string;
    shadowBlur?: number;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
    textHasShadow?: boolean;
    text?: string;
    textWidth?: number;
    textHeight?: number;
    textLeft?: number;
    textTop?: number;
    textColor?: string;
    hoverTextColor?: string;
    activeTextColor?: string;
    fontFamily?: string;
    fontSize?: number;
    lineHeight?: number;
    fontStyle?: string;
    fontWeight?: string;
    textAlign?: TextAlign;
    textBaseline?: TextBaseline;
    textBackground?: string;
    whiteSpace?: WhiteSpace;
    ellipsis?: boolean;
    image?: string;
    icon?: string;
    iconRotate?: number;
    iconWidth?: number;
    iconHeight?: number;
    iconTop?: number;
    iconLeft?: number;
    iconColor?: string;
    iconFamily?: string;
    iconWeight?: string;
    iconSize?: number;
    iconAlign?: 'top' | 'bottom' | 'left' | 'right' | 'left-top' | 'right-top' | 'left-bottom' | 'right-bottom' | 'center';
    imageRatio?: boolean;
    disableInput?: boolean;
    disableRotate?: boolean;
    disableSize?: boolean;
    disableAnchor?: boolean;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    backgroundImage?: string;
    strokeImage?: string;
    children?: string[];
    anchors?: Point[];
    anchorRadius?: number;
    anchorBackground?: string;
    pathId?: string;
    path?: string;
    fromArrow?: string;
    toArrow?: string;
    fromArrowSize?: number;
    toArrowSize?: number;
    fromArrowColor?: string;
    toArrowColor?: string;
    autoFrom?: boolean;
    autoTo?: boolean;
    connectedLines?: ConnectLine[];
    animateCycle?: number;
    nextAnimate?: string;
    autoPlay?: boolean;
    playLoop?: boolean;
    duration?: number;
    linear?: boolean;
    scale?: number;
    animateSpan?: number;
    animateColor?: string;
    animateLineDash?: number[];
    animateReverse?: boolean;
    keepAnimateState?: boolean;
    lineAnimateType?: LineAnimateType;
    frames?: Pen[];
    animateList?: Pen[][];
    input?: boolean;
    dropdownList?: Dropdown[];
    events?: Event[];
    iframe?: string;
    video?: string;
    audio?: string;
    progress?: number;
    progressColor?: string;
    verticalProgress?: boolean;
    externElement?: boolean;
    autoPolyline?: boolean;
    flipX?: boolean;
    flipY?: boolean;
    fillTexts?: string[];
    hiddenText?: boolean;
    keepDecimal?: number;
    showChild?: number;
    animateDotSize?: number;
    isRuleLine?: boolean;
    isBottom?: boolean;
    form?: FormItem[];
    lockedOnCombine?: LockState;
    calculative?: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        borderRadius?: number;
        progress?: number;
        progressColor?: string;
        worldRect?: Rect;
        worldAnchors?: Point[];
        worldIconRect?: Rect;
        worldTextRect?: Rect;
        textDrawRect?: Rect;
        svgRect?: Rect;
        initRect?: Rect;
        rotate?: number;
        lineWidth?: number;
        borderWidth?: number;
        borderColor?: string;
        globalAlpha?: number;
        lineDash?: number[];
        lineDashOffset?: number;
        color?: string;
        background?: string;
        bkType?: number;
        gradientFromColor?: string;
        gradientToColor?: string;
        gradientAngle?: number;
        gradientRadius?: number;
        strokeType?: Gradient;
        lineGradientFromColor?: string;
        lineGradientToColor?: string;
        lineGradientAngle?: number;
        shadowColor?: string;
        shadowBlur?: number;
        shadowOffsetX?: number;
        shadowOffsetY?: number;
        textHasShadow?: boolean;
        tempText?: string;
        text?: string;
        textWidth?: number;
        textHeight?: number;
        textLeft?: number;
        textTop?: number;
        textColor?: string;
        fontFamily?: string;
        fontSize?: number;
        lineHeight?: number;
        fontStyle?: string;
        fontWeight?: string;
        textBackground?: string;
        iconSize?: number;
        icon?: string;
        iconRotate?: number;
        iconWidth?: number;
        iconHeight?: number;
        iconTop?: number;
        iconLeft?: number;
        iconColor?: string;
        iconFamily?: string;
        iconWeight?: string;
        paddingTop?: number;
        paddingBottom?: number;
        paddingLeft?: number;
        paddingRight?: number;
        textLines?: string[];
        textLineWidths?: number[];
        image?: string;
        img?: HTMLImageElement;
        imgNaturalWidth?: number;
        imgNaturalHeight?: number;
        backgroundImage?: string;
        strokeImage?: string;
        backgroundImg?: HTMLImageElement;
        strokeImg?: HTMLImageElement;
        active?: boolean;
        hover?: boolean;
        isDock?: boolean;
        pencil?: boolean;
        activeAnchor?: Point;
        patchFlags?: boolean;
        visible?: boolean;
        inView?: boolean;
        drawlineH?: boolean;
        hasImage?: boolean;
        imageDrawed?: boolean;
        isBottom?: boolean;
        scale?: number;
        start?: number;
        duration?: number;
        end?: number;
        frameIndex?: number;
        frameStart?: number;
        frameEnd?: number;
        frameDuration?: number;
        animatePos?: number;
        cycleIndex?: number;
        pause?: number;
        layer?: number;
        canvas?: Canvas;
        iframe?: string;
        video?: string;
        audio?: string;
        media?: HTMLMediaElement;
        flipX?: boolean;
        flipY?: boolean;
        h?: boolean;
        hiddenText?: boolean;
        keepDecimal?: number;
        showChild?: number;
        animateDotSize?: number;
        zIndex?: number;
        onended?: (pen: Pen) => void;
        singleton?: any;
    };
    prevFrame?: Pen;
    onAdd?: (pen: Pen) => void;
    onValue?: (pen: Pen) => void;
    onBeforeValue?: (pen: Pen, value: ChartData) => any;
    onDestroy?: (pen: Pen) => void;
    onMove?: (pen: Pen) => void;
    onResize?: (pen: Pen) => void;
    onRotate?: (pen: Pen) => void;
    onClick?: (pen: Pen, e: Point) => void;
    onMouseEnter?: (pen: Pen, e: Point) => void;
    onMouseLeave?: (pen: Pen, e: Point) => void;
    onMouseDown?: (pen: Pen, e: Point) => void;
    onMouseMove?: (pen: Pen, e: Point) => void;
    onMouseUp?: (pen: Pen, e: Point) => void;
    onShowInput?: (pen: Pen, e: Point) => void;
    onInput?: (pen: Pen, text: string) => void;
    onChangeId?: (pen: Pen, oldId: string, newId: string) => void;
    onBinds?: (pen: Pen, values: IValue[], formItem: FormItem) => IValue;
    onStartVideo?: (pen: Pen) => void;
    onPauseVideo?: (pen: Pen) => void;
    onStopVideo?: (pen: Pen) => void;
}
export interface FormItem {
    key: string;
    /**
     * 单属性绑定单变量 或 绑定多变量
     * 为数组时，顺序不重要
     */
    dataIds?: BindId | BindId[];
}
export declare type BindId = {
    dataId: string;
    name: string;
};
/**
 * 图表追加或替换数据，只关注数据
 */
export interface ChartData {
    dataX: any | any[];
    dataY: any | any[];
    /**
     * @deprecated 旧版本，未来移除该属性
     */
    overwrite?: boolean;
}
/**
 * dom 类型的 图形
 */
export declare const isDomShapes: string[];
export declare const formatAttrs: Set<string>;
/**
 * 清空 pen 的 生命周期
 */
export declare function clearLifeCycle(pen: Pen): void;
