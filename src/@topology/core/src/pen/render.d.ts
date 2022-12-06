/// <reference types="offscreencanvas" />
import { IValue, Pen } from './model';
import { Direction } from '../data';
import { Point } from '../point';
import { Rect } from '../rect';
import { TopologyStore } from '../store';
export declare function getParent(pen: Pen, root?: boolean): Pen;
export declare function getAllChildren(pen: Pen, store: TopologyStore): Pen[];
export declare function drawImage(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, pen: Pen): void;
/**
 * 获取文字颜色， textColor 优先其次 color
 */
export declare function getTextColor(pen: Pen, store: TopologyStore): string;
export declare function drawIcon(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, pen: Pen): void;
/**
 * canvas2svg 中对 font 的解析规则比 canvas 中简单，能识别的类型很少
 * @returns ctx.font
 */
export declare function getFont({ fontStyle, textDecoration, fontWeight, fontSize, fontFamily, lineHeight, }?: {
    fontStyle?: string;
    textDecoration?: string;
    fontWeight?: string;
    fontSize?: number;
    fontFamily?: string;
    lineHeight?: number;
}): string;
export declare function ctxFlip(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, pen: Pen): void;
export declare function ctxRotate(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, pen: Pen): void;
export declare function renderPen(ctx: CanvasRenderingContext2D, pen: Pen): void;
/**
 * 更改 ctx 的 lineCap 属性
 */
export declare function setLineCap(ctx: CanvasRenderingContext2D, pen: Pen): void;
/**
 * 更改 ctx 的 lineJoin 属性
 */
export declare function setLineJoin(ctx: CanvasRenderingContext2D, pen: Pen): void;
/**
 * 通常用在下载 svg
 * canvas2svg 与 canvas ctx 设置 strokeStyle 表现不同
 * 若设置值为 undefined ，canvas2svg 为空， canvas ctx 为上一个值
 */
export declare function renderPenRaw(ctx: CanvasRenderingContext2D, pen: Pen, rect?: Rect): void;
/**
 * 根据 path2D 绘制 path
 * @param canUsePath 是否可使用 Path2D, downloadSvg 不可使用 path2D
 */
export declare function ctxDrawPath(canUsePath: boolean, ctx: CanvasRenderingContext2D, pen: Pen, store: TopologyStore, fill: boolean): void;
/**
 * 设置线条动画，ctx 的 strokeStyle lineDash 等属性更改
 */
export declare function setCtxLineAnimate(ctx: CanvasRenderingContext2D, pen: Pen, store: TopologyStore): void;
/**
 * 全局 color
 */
export declare function getGlobalColor(store: TopologyStore): string;
export declare function renderLineAnchors(ctx: CanvasRenderingContext2D, pen: Pen): void;
export declare function renderAnchor(ctx: CanvasRenderingContext2D, pt: Point, pen: Pen): void;
export declare function calcWorldRects(pen: Pen): Rect;
export declare function calcPadding(pen: Pen, rect: Rect): void;
export declare function calcPenRect(pen: Pen): void;
export declare function calcWorldAnchors(pen: Pen): void;
export declare function calcWorldPointOfPen(pen: Pen, pt: Point): Point;
export declare function calcIconRect(pens: {
    [key: string]: Pen;
}, pen: Pen): void;
export declare function scalePen(pen: Pen, scale: number, center: Point): void;
export declare function pushPenAnchor(pen: Pen, pt: Point): {
    id: string;
    penId: string;
    x: number;
    y: number;
};
export declare function addLineAnchor(pen: Pen, pt: Point, index: number): Point;
export declare function removePenAnchor(pen: Pen, anchor: Point): void;
export declare function facePen(pt: Point, pen?: Pen): Direction;
export declare function nearestAnchor(pen: Pen, pt: Point): Point;
export declare function translateLine(pen: Pen, x: number, y: number): void;
export declare function deleteTempAnchor(pen: Pen): void;
/**
 * 添加line到pen的connectedLines中，并关联相关属性
 * 不添加连线到画布中，请确保画布中已经有该连线。
 * */
export declare function connectLine(pen: Pen, anchor: Point, line: Pen, lineAnchor: Point): boolean;
/**
 * 从 pen.connectedLines 中删除 lineId 和 lineAnchor
 */
export declare function disconnectLine(pen: Pen, anchor: Point, line: Pen, lineAnchor: Point): boolean;
export declare function getAnchor(pen: Pen, anchorId: string): Point;
export declare function getFromAnchor(pen: Pen): Point;
export declare function getToAnchor(pen: Pen): Point;
export declare function setNodeAnimate(pen: Pen, now: number): true | 0;
export declare function initPrevFrame(pen: Pen): void;
export declare function setNodeAnimateProcess(pen: Pen, process: number): void;
export declare function setLineAnimate(pen: Pen, now: number): true | 0;
export declare function setChildrenActive(pen: Pen, active?: boolean): void;
export declare function setHover(pen: Pen, hover?: boolean): void;
export declare function setElemPosition(pen: Pen, elem: HTMLElement): void;
/**
 * 每个画笔 locked
 * @param pens 画笔
 * @returns
 */
export declare function getPensLock(pens: Pen[]): boolean;
/**
 * 画笔们的 disabledRotate = true
 * 即 全部禁止旋转 返回 true
 * @param pens 画笔
 * @returns
 */
export declare function getPensDisableRotate(pens: Pen[]): boolean;
export declare function rotatePen(pen: Pen, angle: number, rect: Rect): void;
/**
 * 画笔们的 disableSize = true
 * 即 全部不允许改变大小 返回 true
 * @param pens 画笔
 * @returns
 */
export declare function getPensDisableResize(pens: Pen[]): boolean;
export declare function getFrameValue(pen: Pen, prop: string, frameIndex: number): number;
/**
 * 判断该画笔 是否是组合为状态中 展示的画笔
 */
export declare function isShowChild(pen: Pen, store: TopologyStore): boolean;
/**
 * 计算画笔的 inView
 * @param pen 画笔
 * @param calcChild 是否计算子画笔
 */
export declare function calcInView(pen: Pen, calcChild?: boolean): void;
export declare function setGlobalAlpha(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, pen: Pen): void;
export declare function setChildValue(pen: Pen, data: IValue): void;
