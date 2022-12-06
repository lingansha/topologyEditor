import pkg from '../../package.json';
export var globalStore = {
    version: pkg.version,
    path2dDraws: {},
    canvasDraws: {},
    anchors: {},
    htmlElements: {},
};
export function register(path2dFns) {
    Object.assign(globalStore.path2dDraws, path2dFns);
}
export function registerCanvasDraw(drawFns) {
    Object.assign(globalStore.canvasDraws, drawFns);
}
export function registerAnchors(anchorsFns) {
    Object.assign(globalStore.anchors, anchorsFns);
}
//# sourceMappingURL=global.js.map