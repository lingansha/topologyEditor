import { Pen } from '../../pen';
import { Point } from '../../point';
import { Rect } from '../../rect';
import { TopologyStore } from '../../store';
export declare function line(pen: Pen, ctx?: CanvasRenderingContext2D | Path2D): Path2D;
export declare function lineSegment(store: TopologyStore, pen: Pen, mousedwon?: Point): void;
export declare function getLineRect(pen: Pen): Rect;
/**
 * 获取连线的 points ，并非 worldAnchors ，worldAnchors 之前的路径点也会记录
 */
export declare function getLinePoints(pen: Pen): Point[];
export declare function getLineR(pen: Pen): number;
export declare function getPoints(from: Point, to: Point, pen?: Pen): Point[];
export declare function pointInLine(pt: Point, pen: Pen): {
    i: number;
    point: Point;
};
export declare function pointInLineSegment(pt: Point, pt1: Point, pt2: Point, r?: number): {
    x: number;
    y: number;
};
export declare function pointToLine(pt: Point, pt1: Point, pt2: Point, r?: number): {
    x: number;
    y: number;
};
export declare function getLineLength(pen: Pen): number;
/**
 * 连线在 rect 内， 连线与 rect 相交
 */
export declare function lineInRect(line: Pen, rect: Rect): boolean;
/**
 * 线段与矩形是否相交
 * @param rect 矩形
 */
export declare function isLineIntersectRectangle(pt1: Point, pt2: Point, rect: Rect): boolean;
/**
 * 贝塞尔曲线与矩形是否相交
 * @param from 前点
 * @param to 后点
 * @param rect 矩形
 */
export declare function isBezierIntersectRectangle(from: Point, to: Point, rect: Rect): boolean;
