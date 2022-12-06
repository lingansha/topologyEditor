/// <reference types="offscreencanvas" />
import { Pen, IValue } from '../pen';
import { Point } from '../point';
import { Rect } from '../rect';
import { EditAction, TopologyStore } from '../store';
import { Padding } from '../utils';
import { HotkeyType, HoverType, MouseRight } from '../data';
import { curve, mind, lineSegment } from '../diagrams';
import { polyline } from '../diagrams/line/polyline';
import { Tooltip } from '../tooltip';
import { Scroll } from '../scroll';
import { CanvasImage } from './canvasImage';
import { MagnifierCanvas } from './magnifierCanvas';
import { Topology } from '../core';
export declare const movingSuffix: "-moving";
export declare class Canvas {
    parent: Topology;
    parentElement: HTMLElement;
    store: TopologyStore;
    canvas: HTMLCanvasElement;
    offscreen: HTMLCanvasElement | OffscreenCanvas;
    width: number;
    height: number;
    externalElements: HTMLDivElement;
    clientRect?: DOMRect;
    canvasRect: Rect;
    activeRect: Rect;
    initActiveRect: Rect;
    dragRect: Rect;
    lastRotate: number;
    sizeCPs: Point[];
    activeInitPos: Point[];
    hoverType: HoverType;
    resizeIndex: number;
    mouseDown: {
        x: number;
        y: number;
        restore?: boolean;
    };
    hotkeyType: HotkeyType;
    mouseRight: MouseRight;
    addCaches: Pen[];
    touchCenter?: Point;
    initTouchDis?: number;
    initScale?: number;
    touchScaling?: boolean;
    touchMoving?: boolean;
    startTouches?: TouchList;
    lastOffsetX: number;
    lastOffsetY: number;
    drawingLineName?: string;
    drawLineFns: string[];
    drawingLine?: Pen;
    pencil?: boolean;
    pencilLine?: Pen;
    movingPens: Pen[];
    patchFlagsLines?: Set<Pen>;
    dock: {
        xDock: Point;
        yDock: Point;
    };
    prevAnchor: Point;
    nextAnchor: Point;
    private lastMouseTime;
    private hoverTimer;
    private willInactivePen;
    patchFlags: boolean;
    lastRender: number;
    touchStart: number;
    touchStartTimer: any;
    timer: any;
    private lastAnimateRender;
    animateRendering: boolean;
    renderTimer: number;
    initPens?: Pen[];
    pointSize: 8;
    pasteOffset: number;
    /**
     * @deprecated 改用 beforeAddPens
     */
    beforeAddPen: (pen: Pen) => boolean;
    beforeAddPens: (pens: Pen[]) => Promise<boolean>;
    beforeAddAnchor: (pen: Pen, anchor: Point) => Promise<boolean>;
    beforeRemovePens: (pens: Pen[]) => Promise<boolean>;
    beforeRemoveAnchor: (pen: Pen, anchor: Point) => Promise<boolean>;
    customResizeDock: (store: TopologyStore, rect: Rect, pens: Pen[], resizeIndex: number) => {
        xDock: Point;
        yDock: Point;
    };
    customMoveDock: (store: TopologyStore, rect: Rect, pens: Pen[], offset: Point) => {
        xDock: Point;
        yDock: Point;
    };
    inputParent: HTMLDivElement;
    inputDiv: HTMLDivElement;
    inputRight: HTMLDivElement;
    dropdown: HTMLUListElement;
    tooltip: Tooltip;
    mousePos: Point;
    scroll: Scroll;
    movingAnchor: Point;
    canvasImage: CanvasImage;
    canvasImageBottom: CanvasImage;
    magnifierCanvas: MagnifierCanvas;
    stopPropagation: (e: MouseEvent) => void;
    constructor(parent: Topology, parentElement: HTMLElement, store: TopologyStore);
    curve: typeof curve;
    polyline: typeof polyline;
    mind: typeof mind;
    line: typeof lineSegment;
    listen(): void;
    onCopy: (event: ClipboardEvent) => void;
    onCut: (event: ClipboardEvent) => void;
    onPaste: (event: ClipboardEvent) => void;
    onwheel: (e: WheelEvent) => void;
    onkeydown: (e: KeyboardEvent) => void;
    /**
     * 分割连线的锚点，变成两条线
     * @param line 连线
     * @param anchor 锚点，连线的某个锚点，引用相同
     */
    splitLine(line: Pen, anchor: Point): void;
    private translateAnchor;
    onkeyup: (e: KeyboardEvent) => void;
    fileToPen(file: File, isGif: boolean): Promise<Pen>;
    ondrop: (event: DragEvent) => Promise<void>;
    dropPens(pens: Pen[], e: Point): Promise<void>;
    randomCombineId(pen: Pen, pens: Pen[], parentId?: string): Pen;
    addPens(pens: Pen[], history?: boolean): Promise<Pen[]>;
    ontouchstart: (e: TouchEvent) => void;
    ontouchmove: (event: TouchEvent) => void;
    ontouchend: (event: TouchEvent) => void;
    onGesturestart: (e: any) => void;
    /**
     * 获取初始化的 pencilLine
     * @param pt 需包含 penId
     */
    private getInitPencilLine;
    /**
     * 获取初始化的 drawingLine
     * @param pt 需包含 penId
     */
    private createDrawingLine;
    onMouseDown: (e: {
        x: number;
        y: number;
        clientX: number;
        clientY: number;
        pageX: number;
        pageY: number;
        buttons?: number;
        ctrlKey?: boolean;
        shiftKey?: boolean;
        altKey?: boolean;
    }) => void;
    onMouseMove: (e: {
        x: number;
        y: number;
        clientX: number;
        clientY: number;
        pageX: number;
        pageY: number;
        buttons?: number;
        ctrlKey?: boolean;
        shiftKey?: boolean;
        altKey?: boolean;
    }) => void;
    onMouseUp: (e: {
        x: number;
        y: number;
        clientX: number;
        clientY: number;
        pageX: number;
        pageY: number;
        buttons?: number;
        ctrlKey?: boolean;
        shiftKey?: boolean;
        altKey?: boolean;
        button?: number;
    }) => void;
    private addRuleLine;
    /**
     * 拖拽结束，数据更新到 active.pens
     */
    private movedActivePens;
    /**
     * 复制移动后的笔
     */
    private copyMovedPens;
    /**
     * 若本次改变的画笔存在图片，并且在上层 or 下层，需要擦除上层 or 下层
     * 子节点中包含图片，也需要重绘
     * @param pens 本次改变的 pens
     */
    initImageCanvas(pens: Pen[]): void;
    private hasImage;
    private clearDock;
    inactive(drawing?: boolean): void;
    active(pens: Pen[], emit?: boolean): void;
    getSizeCPs(): void;
    onResize: () => void;
    onScroll: () => void;
    calibrateMouse: (pt: Point) => Point;
    clearHover(): void;
    private getHover;
    private inPens;
    private dockInAnchor;
    inAnchor(pt: Point, pen: Pen, anchor: Point): HoverType;
    resize(w?: number, h?: number): void;
    clearCanvas(): void;
    addPen(pen: Pen, history?: boolean, emit?: boolean): Promise<Pen>;
    pushHistory(action: EditAction): void;
    undo(): void;
    redo(): void;
    activeHistory(): void;
    doEditAction(action: EditAction, undo: boolean): void;
    makePen(pen: Pen): void;
    drawline(mouse?: Point): void;
    initLineRect(pen: Pen): void;
    drawingPencil(): void;
    stopPencil(): void;
    finishDrawline(end?: boolean): Promise<void>;
    finishPencil(): Promise<void>;
    /**
     * 火狐浏览器无法绘制 svg 不存在 width height 的问题
     * 此方法手动添加 width 和 height 解决火狐浏览器绘制 svg
     * @param pen
     */
    private firefoxLoadSvg;
    loadImage(pen: Pen): void;
    private imageTimer;
    imageLoaded(): void;
    setCalculativeByScale(pen: Pen): void;
    updatePenRect(pen: Pen, { worldRectIsReady, playingAnimate, }?: {
        worldRectIsReady?: boolean;
        playingAnimate?: boolean;
        noChildren?: boolean;
    }): void;
    render: (patchFlags?: number | boolean) => void;
    renderPens: () => void;
    private renderPenContainChild;
    renderBorder: () => void;
    renderHoverPoint: () => void;
    translate(x?: number, y?: number): void;
    onMovePens(): void;
    /**
     * 缩放整个画布
     * @param scale 缩放比例，最终的 data.scale
     * @param center 中心点，引用类型，存在副作用，会更改原值
     */
    scale(scale: number, center?: {
        x: number;
        y: number;
    }): void;
    rotatePens(e: Point): void;
    resizePens(e: Point): void;
    movePens(e: {
        x: number;
        y: number;
        ctrlKey?: boolean;
        shiftKey?: boolean;
        altKey?: boolean;
    }): void;
    /**
     * 初始化移动，更改画笔的 id parentId 等关联关系
     * @param pen 要修改的画笔
     * @param pens 本次操作的画笔们，包含子画笔
     */
    private changeIdsByMoving;
    /**
     * 初始化 this.movingPens
     * 修改 ids （id parentId children 等）
     * 半透明，去图片
     */
    initMovingPens(): void;
    moveLineAnchor(pt: {
        x: number;
        y: number;
    }, keyOptions: {
        ctrlKey?: boolean;
        shiftKey?: boolean;
        altKey?: boolean;
    }): void;
    moveLineAnchorPrev(e: {
        x: number;
        y: number;
    }): void;
    moveLineAnchorNext(e: {
        x: number;
        y: number;
    }): void;
    setAnchor(e: {
        x: number;
        y: number;
    }): Promise<void>;
    /**
     * 连线允许移动，若与其它图形有连接，但其它图形不在此次移动中，会断开连接
     * @param line 连线
     * @param pens 本次移动的全部图形，包含子节点
     */
    private checkDisconnect;
    /**
     * 移动 画笔们
     * @param pens 画笔们，不包含子节点
     * @param x 偏移 x
     * @param y 偏移 y
     * @param doing 是否持续移动
     */
    translatePens(pens: Pen[], x: number, y: number, doing?: boolean): void;
    private calcAutoAnchor;
    restoreNodeAnimate(pen: Pen): void;
    updateLines(pen: Pen, change?: boolean): void;
    calcActiveRect(): void;
    /**
     * 旋转当前画笔包括子节点
     * @param pen 旋转的画笔
     * @param angle 本次的旋转值，加到 pen.calculative.rotate 上
     */
    rotatePen(pen: Pen, angle: number, rect: Rect): void;
    nextAnimate(pen: Pen): void;
    animate(): void;
    get clipboardName(): string;
    copy(pens?: Pen[]): Promise<void>;
    cut(pens?: Pen[]): void;
    paste(): Promise<void>;
    /**
     * 获取 pens 列表中的所有节点（包含子节点）
     * @param pens 不包含子节点
     */
    getAllByPens(pens: Pen[]): Pen[];
    /**
     *
     * @param pen 当前复制的画笔
     * @param parentId 父节点 id
     * @param clipboard 本次复制的全部画笔，包含子节点, 以及 origin 和 scale
     * @returns 复制后的画笔
     */
    private pastePen;
    /**
     * 修改对应连线的 anchors
     * @param oldId 老 id
     * @param pen 节点
     * @param pastePens 本次复制的 pens 包含子节点
     */
    changeLineAnchors(oldId: string, pen: Pen, pastePens: Pen[]): void;
    /**
     * 复制连线的过程，修改 与 此线连接 node 的 connectedLines
     * @param oldId 线原 id
     * @param line 线
     * @param pastePens 此处复制的全部 pens (包含子节点)
     */
    changeNodeConnectedLine(oldId: string, line: Pen, pastePens: Pen[]): void;
    delete(pens?: Pen[], canDelLocked?: boolean, history?: boolean): Promise<void>;
    private _del;
    getDelPens(pen: Pen, delPens: Pen[]): void;
    private getLockedParent;
    delForce(pen: Pen): void;
    private delConnectedLines;
    private ondblclick;
    showInput: (pen: Pen, rect?: Rect, background?: string) => void;
    setInputStyle: (pen: Pen) => void;
    hideInput: () => void;
    private createInput;
    clearDropdownList(): void;
    private setDropdownList;
    /**
     * 添加一个选项到 dropdown dom 中
     * @param text 选项文字
     * @param index 选项索引
     */
    private dropdownAppendOption;
    private selectDropdown;
    find(idOrTag: string): Pen[];
    findOne(idOrTag: string): Pen | undefined;
    changePenId(oldId: string, newId: string): void;
    updateValue(pen: Pen, data: IValue): void;
    /**
     * 执行 pen ，以及 pen 的子孙节点的 onResize 生命周期函数
     */
    private execPenResize;
    setPenRect(pen: Pen, rect: Rect, render?: boolean): void;
    getPenRect(pen: Pen, origin?: Point, scale?: number): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    toPng(padding?: Padding, callback?: BlobCallback, containBkImg?: boolean): string;
    toggleAnchorMode(): void;
    addAnchorHand(): void;
    removeAnchorHand(): void;
    toggleAnchorHand(): void;
    gotoView(x: number, y: number): void;
    showMagnifier(): void;
    hideMagnifier(): void;
    toggleMagnifier(): void;
    destroy(): void;
}
