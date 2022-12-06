import { Pen } from '../../pen';
import { Point } from '../../point';
import { TopologyStore } from '../../store';
export declare function polyline(store: TopologyStore, pen: Pen, mousedwon?: Point): void;
export declare function anchorInHorizontal(pen: Pen, anchor: Point, from?: boolean): boolean;
export declare function anchorInVertical(pen: Pen, anchor: Point, from?: boolean): boolean;
export declare function translatePolylineAnchor(pen: Pen, anchor: Point, pt: {
    x: number;
    y: number;
}): void;
