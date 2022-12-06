var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { PenType } from '.';
import { calcCenter, expandRect, rectInFourAngRect, rectToPoints, } from '../rect';
import { deepClone } from '../utils';
export function calcAnchorDock(store, e, curAnchor) {
    var e_1, _a;
    var xDock;
    var yDock;
    var x = Infinity;
    var y = Infinity;
    var size = 8;
    var _loop_1 = function (pen) {
        if (pen.calculative.inView === false) {
            return "continue";
        }
        // 得到图形的全部点
        var points = getPointsByPen(pen);
        points.forEach(function (pt) {
            if (pt === e || pt === curAnchor) {
                return;
            }
            var distance = (pen.calculative.worldRect.center.x - e.x) *
                (pen.calculative.worldRect.center.x - e.x) +
                (pen.calculative.worldRect.center.y - e.y) *
                    (pen.calculative.worldRect.center.y - e.y);
            var disX = Math.abs(pt.x - e.x);
            if (disX > 0 && disX < size && distance < x) {
                xDock = {
                    x: Math.round(pt.x) + 0.5,
                    y: Math.round(pt.y) + 0.5,
                    prev: {
                        x: Math.round(e.x) + 0.5,
                        y: Math.round(e.y) + 0.5,
                    },
                    step: pt.x - e.x,
                };
                x = distance;
            }
            var disY = Math.abs(pt.y - e.y);
            if (disY > 0 && disY < size && distance < y) {
                yDock = {
                    x: Math.round(pt.x) + 0.5,
                    y: Math.round(pt.y) + 0.5,
                    prev: {
                        x: Math.round(e.x) + 0.5,
                        y: Math.round(e.y) + 0.5,
                    },
                    step: pt.y - e.y,
                };
                y = distance;
            }
        });
    };
    try {
        for (var _b = __values(store.data.pens), _c = _b.next(); !_c.done; _c = _b.next()) {
            var pen = _c.value;
            _loop_1(pen);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return {
        xDock: xDock,
        yDock: yDock,
    };
}
export function calcMoveDock(store, rect, pens, offset) {
    // 找到 points ，深拷贝一下，不影响原值
    var activePoints = [];
    if (pens.length === 1) {
        activePoints = deepClone(getPointsByPen(pens[0]));
        activePoints.forEach(function (point) {
            point.x += offset.x;
            point.y += offset.y;
        });
    }
    else {
        calcCenter(rect);
        activePoints = __spreadArray([rect.center], __read(rectToPoints(rect)), false);
    }
    return calcDockByPoints(store, activePoints, rect, true);
}
/**
 * 得到画笔的全部点
 * 线 即全部的 worldAnchors
 * 图形 即全部的 worldAnchors ，加上边缘四个点以及中心点
 * @param pen 画笔
 */
export function getPointsByPen(pen) {
    if (!pen.type) {
        var outerPoints = rectToPoints(pen.calculative.worldRect);
        calcCenter(pen.calculative.worldRect);
        return __spreadArray(__spreadArray(__spreadArray([], __read(pen.calculative.worldAnchors), false), __read(outerPoints), false), [
            pen.calculative.worldRect.center,
        ], false);
    }
    else if (pen.type === PenType.Line) {
        return pen.calculative.worldAnchors;
    }
}
export function calcResizeDock(store, rect, pens, resizeIndex) {
    var activePoints = rectToPoints(rect);
    return calcDockByPoints(store, activePoints, rect);
}
/**
 * 通过当前 活动层 的所有点 计算 dock
 * @param activePoints 活动层 的所有点
 * @param rect 当前区域
 * @param calcActive 是否与 活动层画笔 的点进行计算
 */
function calcDockByPoints(store, activePoints, rect, calcActive) {
    if (calcActive === void 0) { calcActive = false; }
    var xDock;
    var yDock;
    var minCloseX = Infinity;
    var minCloseY = Infinity;
    // 临近范围
    var closeSize = 10;
    var paddingRect = expandRect(rect, closeSize);
    store.data.pens.forEach(function (pen) {
        var e_2, _a, e_3, _b;
        var _c = pen.calculative, inView = _c.inView, worldRect = _c.worldRect, active = _c.active;
        if (inView === false ||
            (!calcActive && active) || // 如果不计算活动层，则过滤掉活动层
            rectInFourAngRect(paddingRect, worldRect) || // 水平和垂直方向 无重合
            (pen.type &&
                store.active.some(function (active) { return isConnectLine(store, active, pen); }))) {
            return;
        }
        // 得到图形的全部点
        var points = getPointsByPen(pen);
        try {
            // 比对 points 中的点，必须找出最近的点，不可提前跳出
            for (var points_1 = __values(points), points_1_1 = points_1.next(); !points_1_1.done; points_1_1 = points_1.next()) {
                var point = points_1_1.value;
                try {
                    for (var activePoints_1 = (e_3 = void 0, __values(activePoints)), activePoints_1_1 = activePoints_1.next(); !activePoints_1_1.done; activePoints_1_1 = activePoints_1.next()) {
                        var activePoint = activePoints_1_1.value;
                        var stepX = point.x - activePoint.x;
                        var stepY = point.y - activePoint.y;
                        var absStepX = Math.abs(stepX);
                        var absStepY = Math.abs(stepY);
                        if (!rect.center) {
                            rect.center = {
                                x: rect.x + rect.width / 2,
                                y: rect.y + rect.height / 2,
                            };
                        }
                        if (absStepX < closeSize && absStepX < minCloseX) {
                            xDock = {
                                x: Math.round(point.x) + 0.5,
                                y: Math.round(point.y) + 0.5,
                                step: stepX,
                                prev: {
                                    x: Math.round(activePoint.x) + 0.5,
                                    y: Math.round(activePoint.y) + 0.5,
                                },
                                penId: pen.id,
                                anchorId: activePoint.id,
                                dockAnchorId: point.id,
                            };
                            minCloseX = absStepX;
                        }
                        if (absStepY < closeSize && absStepY < minCloseY) {
                            yDock = {
                                x: Math.round(point.x) + 0.5,
                                y: Math.round(point.y) + 0.5,
                                step: stepY,
                                prev: {
                                    x: Math.round(activePoint.x) + 0.5,
                                    y: Math.round(activePoint.y) + 0.5,
                                },
                                penId: pen.id,
                                anchorId: activePoint.id,
                                dockAnchorId: point.id,
                            };
                            minCloseY = absStepY;
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (activePoints_1_1 && !activePoints_1_1.done && (_b = activePoints_1.return)) _b.call(activePoints_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (points_1_1 && !points_1_1.done && (_a = points_1.return)) _a.call(points_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    });
    return {
        xDock: xDock,
        yDock: yDock,
    };
}
/**
 * 判断 line 是否是 active 的连接线（并且计算子节点）
 * @param store
 * @param active 本次计算的画笔
 * @param line 连线
 * @returns
 */
function isConnectLine(store, active, line) {
    var e_4, _a, e_5, _b;
    if (!line.type) {
        return false;
    }
    if (Array.isArray(active === null || active === void 0 ? void 0 : active.connectedLines)) {
        try {
            for (var _c = __values(active === null || active === void 0 ? void 0 : active.connectedLines), _d = _c.next(); !_d.done; _d = _c.next()) {
                var cline = _d.value;
                if (cline.lineId === line.id) {
                    return true;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_4) throw e_4.error; }
        }
    }
    // 考虑子节点
    if (Array.isArray(active === null || active === void 0 ? void 0 : active.children)) {
        try {
            for (var _e = __values(active.children), _f = _e.next(); !_f.done; _f = _e.next()) {
                var id = _f.value;
                var child = store.pens[id];
                if (isConnectLine(store, child, line)) {
                    return true;
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_5) throw e_5.error; }
        }
    }
    return false;
}
/**
 * 是否近似于 num
 * @param num
 */
export function isEqual(source, target) {
    // @ts-ignore
    return source.toFixed(12) == target;
}
//# sourceMappingURL=math.js.map