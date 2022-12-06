export var KeydownType;
(function (KeydownType) {
    KeydownType[KeydownType["None"] = -1] = "None";
    KeydownType[KeydownType["Document"] = 0] = "Document";
    KeydownType[KeydownType["Canvas"] = 1] = "Canvas";
})(KeydownType || (KeydownType = {}));
export var defaultOptions = {
    fontFamily: '"Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial',
    fontSize: 12,
    lineHeight: 1.5,
    textAlign: 'center',
    textBaseline: 'middle',
    color: '#222222',
    activeColor: '#278df8',
    hoverColor: 'rgba(39,141,248,0.50)',
    anchorColor: '#278DF8',
    hoverAnchorColor: '#FF4101',
    anchorRadius: 4,
    anchorBackground: '#fff',
    dockColor: 'rgba(39,141,248,0.50)',
    dockPenColor: '#1890FF',
    dragColor: '#1890ff',
    rotateCursor: 'rotate.cur',
    hoverCursor: 'pointer',
    minScale: 0.1,
    maxScale: 10,
    keydown: KeydownType.Document,
    gridSize: 20,
    gridColor: '#e2e2e2',
    ruleColor: '#888888',
    drawingLineName: 'curve',
    interval: 30,
    animateInterval: 30,
    autoPolyline: true,
    autoAnchor: true,
    animateColor: '#ff4d4f',
    ruleLineColor: '#FF4101',
    defaultAnchors: [
        {
            x: 0.5,
            y: 0,
        },
        {
            x: 1,
            y: 0.5,
        },
        {
            x: 0.5,
            y: 1,
        },
        {
            x: 0,
            y: 0.5,
        },
    ],
    measureTextWidth: true,
    moveConnectedLine: true,
    mouseRightActive: true,
    disableClipboard: false,
};
//# sourceMappingURL=options.js.map