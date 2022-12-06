import { Emitter } from 'mitt';
import { FormItem, LockState, Pen } from '../pen';
import { Options } from '../options';
import { Point } from '../point';
export interface TopologyData {
    pens: Pen[];
    x: number;
    y: number;
    scale: number;
    origin: Point;
    center: Point;
    locked?: LockState;
    websocket?: string;
    mqtt?: string;
    mqttOptions?: {
        clientId?: string;
        username?: string;
        password?: string;
        customClientId?: boolean;
    };
    mqttTopics?: string;
    background?: string;
    socketCbJs?: string;
    initJs?: string;
    grid?: boolean;
    gridColor?: string;
    gridSize?: number;
    gridRotate?: number;
    rule?: boolean;
    ruleColor?: string;
    fromArrow?: string;
    toArrow?: string;
    lineWidth?: number;
    color?: string;
    penBackground?: string;
    paths?: {
        [key: string]: string;
    };
    bkImage?: string;
    http?: string;
    httpTimeInterval?: number;
    httpHeaders?: HeadersInit;
    version?: string;
}
export declare enum EditType {
    Add = 0,
    Update = 1,
    Delete = 2
}
export interface EditAction {
    type?: EditType;
    initPens?: Pen[];
    pens?: Pen[];
    step?: number;
    origin?: Point;
    scale?: number;
}
export interface TopologyStore {
    id: string;
    data: TopologyData;
    pens: {
        [key: string]: Pen;
    };
    histories?: EditAction[];
    historyIndex?: number;
    path2dMap: WeakMap<Pen, Path2D>;
    bindDatas: {
        [key: string]: {
            id: string;
            formItem: FormItem;
        }[];
    };
    active?: Pen[];
    hover?: Pen;
    lastHover?: Pen;
    activeAnchor?: Point;
    hoverAnchor?: Point;
    pointAt?: Point;
    pointAtIndex?: number;
    animates: Set<Pen>;
    options: Options;
    emitter: Emitter;
    dpiRatio?: number;
    clipboard?: TopologyClipboard;
    patchFlagsBackground?: boolean;
    patchFlagsTop?: boolean;
    bkImg: HTMLImageElement;
    fillWorldTextRect?: boolean;
}
export interface TopologyClipboard {
    topology?: boolean;
    pens: Pen[];
    origin: Point;
    scale: number;
    offset?: number;
    page: string;
    initRect?: Point;
    pos?: Point;
}
export declare const createStore: () => TopologyStore;
export declare const useStore: (id?: string) => TopologyStore;
export declare const clearStore: (store: TopologyStore) => void;
