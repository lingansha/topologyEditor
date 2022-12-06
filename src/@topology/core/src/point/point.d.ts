import { Direction } from '../data';
export declare enum PrevNextType {
    Mirror = 0,
    Bilateral = 1,
    Free = 2
}
export declare enum TwoWay {
    Default = 0,
    In = 1,
    Out = 2,
    DisableConnected = 3,
    DisableConnectTo = 4,
    Disable = 10
}
export interface Point {
    x: number;
    y: number;
    radius?: number;
    color?: string;
    background?: string;
    id?: string;
    penId?: string;
    connectTo?: string;
    anchorId?: string;
    twoWay?: TwoWay;
    prev?: Point;
    next?: Point;
    prevNextType?: PrevNextType;
    start?: boolean;
    lineLength?: number;
    step?: number;
    curvePoints?: Point[];
    rotate?: number;
    hidden?: boolean;
    locked?: number;
    flag?: number;
    isTemp?: boolean;
    dockAnchorId?: string;
}
export declare function rotatePoint(pt: Point, angle: number, center: Point): void;
export declare function hitPoint(pt: Point, target: Point, radius?: number): boolean;
export declare function scalePoint(pt: Point, scale: number, center: Point): void;
export declare function calcRotate(pt: Point, center: Point): number;
export declare function distance(pt1: Point, pt2: Point): number;
export declare function facePoint(pt: Point, targetPt?: Point): Direction;
export declare function translatePoint(pt: Point, x: number, y: number): void;
/**
 * 是否是同一个点
 * @param pt1 点1
 * @param pt2 点2
 * @returns true 相同
 */
export declare function samePoint(pt1: Point, pt2: Point): boolean;
