import { Pen } from '../pen';
import { Point } from '../point';
import { Padding } from '../utils';
export interface Rect {
    x?: number;
    y?: number;
    ex?: number;
    ey?: number;
    width?: number;
    height?: number;
    rotate?: number;
    center?: Point;
}
export declare function pointInRect(pt: Point, rect: Rect): boolean;
export declare function pointInSimpleRect(pt: Point, rect: Rect, r?: number): boolean;
export declare function calcCenter(rect: Rect): void;
export declare function calcRightBottom(rect: Rect): void;
export declare function pointInVertices(point: {
    x: number;
    y: number;
}, vertices: Point[]): boolean;
export declare function getRect(pens: Pen[]): Rect;
export declare function rectToPoints(rect: Rect): {
    x: number;
    y: number;
}[];
export declare function getRectOfPoints(points: Point[]): Rect;
export declare function rectInRect(source: Rect, target: Rect, allIn?: boolean): boolean;
/**
 * 一个 rect 在另一个 rect 的 四个角，即水平区域不重合，垂直区域不重合
 */
export declare function rectInFourAngRect(source: Rect, target: Rect): boolean;
/**
 * 扩大 rect ，x，y，ex，ey 值都会变
 * @param rect 原 rect ，无副作用
 * @param size padding 类型，可传四个方向的值，也可以只传一个值
 */
export declare function expandRect(rect: Rect, size: Padding): Rect;
export declare function translateRect(rect: Rect | Pen, x: number, y: number): void;
export declare function resizeRect(rect: Rect | Pen, offsetX: number, offsetY: number, resizeIndex: number): void;
export declare function scaleRect(rect: Rect, scale: number, center: Point): void;
export declare function calcRelativeRect(rect: Rect, worldRect: Rect): Rect;
/**
 * 计算相对点 ，anchors 中的值都是百分比
 * @param pt 绝对坐标
 * @param worldRect 图形外接矩形
 * @returns 相对坐标点
 */
export declare function calcRelativePoint(pt: Point, worldRect: Rect): Point;
