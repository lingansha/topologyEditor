/// <reference types="node" />
import { EventType, Handler } from 'mitt';
import { Canvas } from './canvas';
import { Options } from './options';
import { calcTextDrawRect, calcTextLines, calcTextRect, facePen, getWords, LockState, Pen, renderPenRaw, IValue, setElemPosition } from './pen';
import { Point } from './point';
import { EditAction, register, registerAnchors, registerCanvasDraw, TopologyData, TopologyStore } from './store';
import { Padding } from './utils';
import { Rect } from './rect';
import { Event } from './event';
import { ViewMap } from './map';
import { MqttClient } from 'mqtt';
export declare class Topology {
    store: TopologyStore;
    canvas: Canvas;
    websocket: WebSocket;
    mqttClient: MqttClient;
    socketFn: (e: string, topic: string) => void;
    events: Record<number, (pen: Pen, e: Event) => void>;
    map: ViewMap;
    mapTimer: NodeJS.Timeout;
    constructor(parent: string | HTMLElement, opts?: Options);
    facePen: typeof facePen;
    getWords: typeof getWords;
    calcTextLines: typeof calcTextLines;
    calcTextRect: typeof calcTextRect;
    calcTextDrawRect: typeof calcTextDrawRect;
    /**
     * @deprecated 改用 beforeAddPens
     */
    get beforeAddPen(): (pen: Pen) => boolean;
    /**
     * @deprecated 改用 beforeAddPens
     */
    set beforeAddPen(fn: (pen: Pen) => boolean);
    get beforeAddPens(): (pens: Pen[]) => Promise<boolean>;
    set beforeAddPens(fn: (pens: Pen[]) => Promise<boolean>);
    get beforeAddAnchor(): (pen: Pen, anchor: Point) => Promise<boolean>;
    set beforeAddAnchor(fn: (pen: Pen, anchor: Point) => Promise<boolean>);
    get beforeRemovePens(): (pens: Pen[]) => Promise<boolean>;
    set beforeRemovePens(fn: (pens: Pen[]) => Promise<boolean>);
    get beforeRemoveAnchor(): (pen: Pen, anchor: Point) => Promise<boolean>;
    set beforeRemoveAnchor(fn: (pen: Pen, anchor: Point) => Promise<boolean>);
    setOptions(opts?: Options): void;
    getOptions(): Options;
    setDatabyOptions(options?: Options): void;
    private init;
    initEventFns(): void;
    doSendDataEvent(value: any): void;
    resize(width?: number, height?: number): void;
    /**
     *
     * @param emit 是否发送消息
     */
    addPen(pen: Pen, history?: boolean, emit?: boolean): Promise<Pen>;
    addPens(pens: Pen[], history?: boolean): Promise<Pen[]>;
    render(patchFlags?: boolean | number): void;
    setBackgroundImage(url: string): void;
    setBackgroundColor(color?: string): void;
    setGrid({ grid, gridColor, gridSize, gridRotate, }?: {
        grid?: boolean;
        gridColor?: string;
        gridSize?: number;
        gridRotate?: number;
    }): void;
    setRule({ rule, ruleColor, }?: {
        rule?: boolean;
        ruleColor?: string;
    }): void;
    open(data?: TopologyData): void;
    initBindDatas(): void;
    connectSocket(): void;
    /**
     * open 后执行初始化 Js ，每个图纸可配置一个初始化 js
     */
    private doInitJS;
    drawLine(lineName?: string): void;
    drawingPencil(): void;
    stopPencil(): void;
    lock(lock: LockState): void;
    finishDrawLine(end?: boolean): Promise<void>;
    finishPencil(): Promise<void>;
    updateLineType(pen: Pen, lineName: string): void;
    addDrawLineFn(fnName: string, fn: Function): void;
    removeDrawLineFn(fnName: string): void;
    showMagnifier(): void;
    hideMagnifier(): void;
    toggleMagnifier(): void;
    /**
     * 擦除画布，释放 store 上的 pens
     * @param render 是否重绘
     */
    clear(render?: boolean): void;
    emit(eventType: EventType, data: unknown): void;
    on(eventType: EventType, handler: Handler): this;
    off(eventType: EventType, handler: Handler): this;
    register: typeof register;
    registerCanvasDraw: typeof registerCanvasDraw;
    registerAnchors: typeof registerAnchors;
    registerMoveDock(dock: (store: TopologyStore, rect: Rect, pens: Pen[], offset: Point) => {
        xDock: Point;
        yDock: Point;
    }): void;
    /**
     * 参数同方法 registerMoveDock ，最后一个参数由 offset 偏移修改成了当前 resize 的点
     */
    registerResizeDock(dock: (store: TopologyStore, rect: Rect, pens: Pen[], resizeIndex: number) => {
        xDock: Point;
        yDock: Point;
    }): void;
    find(id: string): Pen[];
    find(tag: string): Pen[];
    /**
     * 使用 Array.find 找到即返回，否则返回 undefined
     */
    findOne(id: string): Pen | undefined;
    findOne(tag: string): Pen | undefined;
    getPenRect(pen: Pen): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    setPenRect(pen: Pen, rect: Rect, render?: boolean): void;
    startAnimate(idOrTagOrPens?: string | Pen[]): void;
    pauseAnimate(idOrTagOrPens?: string | Pen[]): void;
    stopAnimate(idOrTagOrPens?: string | Pen[]): void;
    startVideo(idOrTagOrPens?: string | Pen[]): void;
    pauseVideo(idOrTagOrPens?: string | Pen[]): void;
    stopVideo(idOrTagOrPens?: string | Pen[]): void;
    calcAnimateDuration(pen: Pen): number;
    /**
     * 组合
     * @param pens 组合的画笔们
     * @param showChild 组合后展示第几个孩子
     */
    combine(pens?: Pen[], showChild?: number): void;
    uncombine(pen?: Pen): void;
    isCombine(pen: Pen): boolean;
    active(pens: Pen[], emit?: boolean): void;
    inactive(): void;
    /**
     * 删除画笔
     * @param pens 需要删除的画笔们
     * @param canDelLocked 是否删除已经锁住的画笔
     */
    delete(pens?: Pen[], canDelLocked?: boolean, history?: boolean): void;
    scale(scale: number, center?: {
        x: number;
        y: number;
    }): void;
    translate(x: number, y: number): void;
    translatePens(pens: Pen[], x: number, y: number): void;
    getParent(pen: Pen, root?: boolean): Pen;
    data(): TopologyData;
    copy(pens?: Pen[]): void;
    cut(pens?: Pen[]): void;
    paste(): void;
    undo(): void;
    redo(): void;
    listenSocket(): boolean;
    connectWebsocket(websocket?: string): void;
    closeWebsocket(): void;
    connectMqtt(params?: {
        mqtt: string;
        mqttTopics: string;
        mqttOptions?: {
            clientId?: string;
            username?: string;
            password?: string;
            customClientId?: boolean;
        };
    }): void;
    closeMqtt(): void;
    httpTimer: NodeJS.Timeout;
    connectHttp(): void;
    sendDatabyHttp(data: string): Promise<void>;
    closeHttp(): void;
    socketCallback(message: string, topic?: string): void;
    setDatas(datas: {
        dataId: string;
        value: any;
    }[], { render, doEvent, history, }?: {
        render?: boolean;
        doEvent?: boolean;
        history?: boolean;
    }): void;
    setValue(data: IValue, { render, doEvent, history, }?: {
        render?: boolean;
        doEvent?: boolean;
        history?: boolean;
    }): void;
    /**
     * @deprecated 改用 setValue
     */
    _setValue(data: IValue, history?: boolean): void;
    pushHistory(action: EditAction): void;
    showInput(pen: Pen, rect?: Rect): void;
    hideInput(): void;
    clearDropdownList(): void;
    private onEvent;
    private doEvent;
    pushChildren(parent: Pen, children: Pen[]): void;
    renderPenRaw: typeof renderPenRaw;
    toPng(padding?: Padding, callback?: BlobCallback, containBkImg?: boolean): string;
    /**
     * 下载 png
     * @param name 传入参数自带文件后缀名 例如：'test.png'
     * @param padding 上右下左的内边距
     */
    downloadPng(name?: string, padding?: Padding): void;
    getRect(pens?: Pen[]): Rect;
    /**
     * 放大到屏幕尺寸，并居中
     * @param fit true，填满但完整展示；false，填满，但长边可能截取（即显示不完整）
     */
    fitView(fit?: boolean, viewPadding?: Padding): void;
    centerView(): void;
    /**
     * 画布是否有 画笔
     * RuleLine 不算
     */
    hasView(): boolean;
    private getViewCenter;
    /**
     * 大小相同
     * @param pens 画笔们
     */
    beSameByFirst(pens?: Pen[], attribute?: string): void;
    /**
     * 格式刷（样式相同，大小无需一致。）
     * @param pens 画笔们
     */
    formatPainterByFirst(pens?: Pen[]): void;
    alignNodes(align: string, pens?: Pen[], rect?: Rect): void;
    /**
     * 对齐画笔，基于第一个画笔
     * @param align 左对齐，右对齐，上对齐，下对齐，居中对齐
     * @param pens
     */
    alignNodesByFirst(align: string, pens?: Pen[]): void;
    /**
     * 将画笔参照 rect 进行 align 对齐
     * @param align 左对齐，右对齐，上对齐，下对齐，居中对齐
     * @param pen 当前需要对齐的画笔
     * @param rect 参照矩形
     * @returns
     */
    private alignPen;
    /**
     * 水平或垂直方向的均分
     * @param direction 方向，width 说明水平方向间距相同
     * @param pens 节点们，默认全部的
     * @param distance 总的宽 or 高
     */
    private spaceBetweenByDirection;
    spaceBetween(pens?: Pen[], width?: number): void;
    spaceBetweenColumn(pens?: Pen[], height?: number): void;
    layout(pens?: Pen[], width?: number, space?: number): void;
    gotoView(pen: Pen): void;
    showMap(): void;
    hideMap(): void;
    onSizeUpdate(): void;
    toggleAnchorMode(): void;
    addAnchorHand(): void;
    removeAnchorHand(): void;
    toggleAnchorHand(): void;
    /**
     * 将该画笔置顶，即放到数组最后，最后绘制即在顶部
     * @param pen pen 置顶的画笔
     * @param pens 画笔们，注意 pen 必须在该数组内才有效
     */
    top(pen: Pen, pens?: Pen[]): void;
    /**
     * 若本次改变的画笔存在图片，并且在上层 or 下层，需要擦除上层 or 下层
     * 子节点中包含图片，也需要重绘
     * @param pens 本次改变的 pens
     */
    initImageCanvas(pens: Pen[]): void;
    /**
     * 该画笔置底，即放到数组最前，最后绘制即在底部
     * @param pens 画笔们，注意 pen 必须在该数组内才有效
     */
    bottom(pen: Pen, pens?: Pen[]): void;
    /**
     * 该画笔上移，即把该画笔在数组中的位置向后移动一个
     * @param pens 画笔们，注意 pen 必须在该数组内才有效
     */
    up(pen: Pen, pens?: Pen[]): void;
    /**
     * 该画笔下移，即把该画笔在该数组中的位置前移一个
     * @param pens 画笔们，注意 pen 必须在该数组内才有效
     */
    down(pen: Pen, pens?: Pen[]): void;
    setLayer(pen: Pen, toIndex: number, pens?: Pen[]): void;
    changePenId(oldId: string, newId: string): void;
    /**
     * 得到与当前节点连接的线
     * @param node 节点，非连线
     * @param type 类型，全部的连接线/入线/出线
     */
    getLines(node: Pen, type?: 'all' | 'in' | 'out'): Pen[];
    /**
     * 得到当前节点的下一个节点，即出口节点数组
     * 得到当前连线的出口节点
     * @param pen 节点或连线
     */
    nextNode(pen: Pen): Pen[];
    /**
     * 得到当前节点的上一个节点，即入口节点数组
     * 得到当前连线的入口节点
     * @param pen 节点或连线
     */
    previousNode(pen: Pen): Pen[];
    /**
     * 获取节点所有的下一个连接关系
     * @param pen
     *
     */
    getNext(pen: Pen): any[];
    /**
     * 为画布添加锚点
     * @param pen 画笔
     * @param anchor 待添加锚点
     * @param index 连线类型 添加锚点到哪个位置
     */
    addAnchor(pen: Pen, anchor: Point, index?: number): void;
    /**
     *
     * @param from 连接节点
     * @param fromAnchor 连接节点锚点
     * @param to 被连接节点
     * @param toAnchor 被连接节点锚点
     */
    connectLine(from: Pen, to: Pen, fromAnchor?: Point, toAnchor?: Point, render?: boolean): Pen;
    /**
     * 生成一个拷贝组合后的 画笔数组（组合图形），不影响原画布画笔，常用作 二次复用的组件
     * @param pens 画笔数组
     * @param showChild 是否作为状态复用（参考 combine showChild）
     * @returns 组合图形
     */
    toComponent(pens?: Pen[], showChild?: number): Pen[];
    setVisible(pen: Pen, visible: boolean, render?: boolean): void;
    clearHover(): void;
    closeSocket(): void;
    setElemPosition: typeof setElemPosition;
    destroy(onlyData?: boolean): void;
}
