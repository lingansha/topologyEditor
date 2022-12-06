import { calcCenter } from '../rect';
import { getRect, parseSvgPath, pathToString, scalePath, translatePath } from './svg/parse';
export function svgPath(pen, ctx) {
    var _a, _b;
    var store = pen.calculative.canvas.store;
    var pathText = store.data.paths[pen.pathId];
    if (!pathText) {
        return new Path2D();
    }
    var path = parseSvgPath(pathText);
    pen.calculative.svgRect = getRect(path);
    calcCenter(pen.calculative.svgRect);
    if (pen.calculative.svgRect.width !== pen.calculative.worldRect.width ||
        pen.calculative.svgRect.height !== pen.calculative.worldRect.height) {
        scalePath(path, pen.calculative.worldRect.width / pen.calculative.svgRect.width, pen.calculative.worldRect.height / pen.calculative.svgRect.height);
    }
    var rect = getRect(path);
    calcCenter(rect);
    translatePath(path, pen.calculative.worldRect.x - rect.x, pen.calculative.worldRect.y - rect.y);
    var pathStr = pathToString(path);
    if (ctx) {
        (_b = (_a = ctx).svgPath) === null || _b === void 0 ? void 0 : _b.call(_a, pathStr);
        return;
    }
    var path2D = new Path2D(pathStr);
    // TODO: 为何要闭合曲线
    // path2D.closePath();
    return path2D;
}
//# sourceMappingURL=svgPath.js.map