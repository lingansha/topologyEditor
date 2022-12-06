import { Pen } from '../../pen';
import { Point } from '../../point';
import { TopologyStore } from '../../store';
export declare function curve(store: TopologyStore, pen: Pen, mousedwon?: Point): void;
export declare function getQuadraticPoint(step: number, from: Point, cp: Point, to: Point): {
    x: number;
    y: number;
    step: number;
};
export declare function getBezierPoint(step: number, from: Point, cp1: Point, cp2: Point, to: Point): {
    x: number;
    y: number;
    step: number;
};
export declare function getSplitAnchor(pen: Pen, pt: Point, index: number): Point;
export declare function mind(store: TopologyStore, pen: Pen, mousedwon?: Point): void;
