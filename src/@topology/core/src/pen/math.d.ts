import { Point } from '../point';
import { Rect } from '../rect';
import { TopologyStore } from '../store';
import { Pen } from './model';
export declare function calcAnchorDock(store: TopologyStore, e: Point, curAnchor?: Point): {
    xDock: Point;
    yDock: Point;
};
export declare function calcMoveDock(store: TopologyStore, rect: Rect, pens: Pen[], offset: Point): {
    xDock: Point;
    yDock: Point;
};
/**
 * 得到画笔的全部点
 * 线 即全部的 worldAnchors
 * 图形 即全部的 worldAnchors ，加上边缘四个点以及中心点
 * @param pen 画笔
 */
export declare function getPointsByPen(pen: Pen): Point[];
export declare function calcResizeDock(store: TopologyStore, rect: Rect, pens: Pen[], resizeIndex: number): {
    xDock: Point;
    yDock: Point;
};
/**
 * 是否近似于 num
 * @param num
 */
export declare function isEqual(source: number, target: number): boolean;
