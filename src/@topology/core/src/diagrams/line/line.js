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
import { deleteTempAnchor, getFromAnchor, getToAnchor } from '../../pen';
import { hitPoint } from '../../point';
import { getRectOfPoints, pointInSimpleRect } from '../../rect';
import { getBezierPoint, getQuadraticPoint } from './curve';
export function line(pen, ctx) {
    var path = !ctx ? new Path2D() : ctx;
    var worldAnchors = pen.calculative.worldAnchors;
    if (worldAnchors.length > 1) {
        var from_1; // 上一个点
        worldAnchors.forEach(function (pt) {
            if (from_1) {
                draw(path, from_1, pt);
            }
            else {
                pt.start = true;
            }
            from_1 = pt;
        });
        if (pen.close) {
            draw(path, from_1, worldAnchors[0]);
        }
    }
    if (path instanceof Path2D)
        return path;
}
export function lineSegment(store, pen, mousedwon) {
    var _a;
    if (!pen.calculative.worldAnchors) {
        pen.calculative.worldAnchors = [];
    }
    if (pen.calculative.worldAnchors.length < 2 || ((_a = pen.anchors) === null || _a === void 0 ? void 0 : _a.length) > 1) {
        return;
    }
    var from = getFromAnchor(pen);
    var to = getToAnchor(pen);
    if (!from || !to || !to.id || from === to) {
        return;
    }
    from.next = undefined;
    deleteTempAnchor(pen);
    to.prev = undefined;
    pen.calculative.worldAnchors.push(to);
}
function draw(path, from, to) {
    if (!to || to.isTemp) {
        return;
    }
    from.start && path.moveTo(from.x, from.y);
    if (from.next) {
        if (to.prev) {
            path.bezierCurveTo(from.next.x, from.next.y, to.prev.x, to.prev.y, to.x, to.y);
        }
        else {
            path.quadraticCurveTo(from.next.x, from.next.y, to.x, to.y);
        }
    }
    else {
        if (to.prev) {
            path.quadraticCurveTo(to.prev.x, to.prev.y, to.x, to.y);
        }
        else {
            path.lineTo(to.x, to.y);
        }
    }
}
export function getLineRect(pen) {
    getLineLength(pen);
    return getRectOfPoints(getLinePoints(pen));
}
/**
 * 获取连线的 points ，并非 worldAnchors ，worldAnchors 之前的路径点也会记录
 */
export function getLinePoints(pen) {
    var pts = [];
    var from; // 上一个点
    pen.calculative.worldAnchors.forEach(function (pt) {
        pts.push(pt);
        from && pts.push.apply(pts, __spreadArray([], __read(getPoints(from, pt, pen)), false));
        from = pt;
    });
    if (pen.close && pen.calculative.worldAnchors.length > 1) {
        pts.push.apply(pts, __spreadArray([], __read(getPoints(from, pen.calculative.worldAnchors[0], pen)), false));
    }
    return pts;
}
export function getLineR(pen) {
    return (pen === null || pen === void 0 ? void 0 : pen.lineWidth) ? pen.lineWidth / 2 + 4 : 4;
}
export function getPoints(from, to, pen) {
    var pts = [];
    if (!to) {
        return pts;
    }
    var step = 0.02;
    if (from.lineLength) {
        var r = getLineR(pen);
        step = r / from.lineLength;
    }
    if (from.next) {
        if (to.prev) {
            for (var i = step; i < 1; i += step) {
                pts.push(getBezierPoint(i, from, from.next, to.prev, to));
            }
        }
        else {
            for (var i = step; i < 1; i += step) {
                pts.push(getQuadraticPoint(i, from, from.next, to));
            }
        }
    }
    else {
        if (to.prev) {
            for (var i = step; i < 1; i += step) {
                pts.push(getQuadraticPoint(i, from, to.prev, to));
            }
        }
        else {
            pts.push({ x: to.x, y: to.y });
        }
    }
    if (pts.length > 1) {
        from.curvePoints = pts;
    }
    return pts;
}
export function pointInLine(pt, pen) {
    var e_1, _a;
    var r = getLineR(pen);
    var i = 0;
    var from; // 上一个点
    var point;
    try {
        for (var _b = __values(pen.calculative.worldAnchors), _c = _b.next(); !_c.done; _c = _b.next()) {
            var anchor = _c.value;
            if (from) {
                point = pointInLineSegment(pt, from, anchor, r);
                if (point) {
                    return {
                        i: i,
                        point: point,
                    };
                }
                ++i;
            }
            from = anchor;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (pen.close &&
        pen.calculative.worldAnchors.length > 1 &&
        (point = pointInLineSegment(pt, from, pen.calculative.worldAnchors[0], r))) {
        return {
            i: i,
            point: point,
        };
    }
}
export function pointInLineSegment(pt, pt1, pt2, r) {
    var e_2, _a;
    if (r === void 0) { r = 4; }
    if (!pt1.next && !pt2.prev) {
        var x1 = pt1.x, y1 = pt1.y;
        var x2 = pt2.x, y2 = pt2.y;
        var minX = Math.min(x1, x2);
        var maxX = Math.max(x1, x2);
        var minY = Math.min(y1, y2);
        var maxY = Math.max(y1, y2);
        if (!(pt.x >= minX - r &&
            pt.x <= maxX + r &&
            pt.y >= minY - r &&
            pt.y <= maxY + r)) {
            return;
        }
        return pointToLine(pt, pt1, pt2, r);
    }
    else if (pt1.curvePoints) {
        try {
            for (var _b = __values(pt1.curvePoints), _c = _b.next(); !_c.done; _c = _b.next()) {
                var point = _c.value;
                if (hitPoint(pt, point, r)) {
                    return point;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
}
export function pointToLine(pt, pt1, pt2, r) {
    if (r === void 0) { r = 4; }
    // 竖线
    if (pt1.x === pt2.x) {
        var len = Math.abs(pt.x - pt1.x);
        if (len <= r) {
            return {
                x: pt1.x,
                y: pt.y,
            };
        }
    }
    else {
        var A = (pt1.y - pt2.y) / (pt1.x - pt2.x);
        var B = pt1.y - A * pt1.x;
        var len = Math.abs((A * pt.x + B - pt.y) / Math.sqrt(A * A + 1));
        if (len <= r) {
            var m = pt.x + A * pt.y;
            var x = (m - A * B) / (A * A + 1);
            return {
                x: x,
                y: A * x + B,
            };
        }
    }
}
function lineLen(from, cp1, cp2, to) {
    if (!cp1 && !cp2) {
        return (Math.sqrt(Math.pow(Math.abs(from.x - to.x), 2) +
            Math.pow(Math.abs(from.y - to.y), 2)) || 0);
    }
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    if (cp1 && cp2) {
        path.setAttribute('d', "M" + from.x + " " + from.y + " C" + cp1.x + " " + cp1.y + " " + cp2.x + " " + cp2.y + " " + to.x + " " + to.y);
    }
    else if (cp1) {
        path.setAttribute('d', "M" + from.x + " " + from.y + " Q" + cp1.x + " " + cp1.y + " " + to.x + " " + to.y);
    }
    else {
        path.setAttribute('d', "M" + from.x + " " + from.y + " Q" + cp2.x + " " + cp2.y + " " + to.x + " " + to.y);
    }
    return path.getTotalLength() || 0;
}
export function getLineLength(pen) {
    if (pen.calculative.worldAnchors.length < 2) {
        return 0;
    }
    var len = 0;
    var from; // 上一个点
    pen.calculative.worldAnchors.forEach(function (pt) {
        if (from) {
            from.lineLength = lineLen(from, from.next, pt.prev, pt);
            len += from.lineLength;
        }
        from = pt;
    });
    if (pen.close) {
        // pen.close ，下一个点即第一个点
        var to = getFromAnchor(pen);
        from.lineLength = lineLen(from, from.next, to.prev, to);
        len += from.lineLength;
    }
    pen.length = len;
    return len;
}
/**
 * 连线在 rect 内， 连线与 rect 相交
 */
export function lineInRect(line, rect) {
    // 判断是直线还是贝塞尔
    var worldAnchors = line.calculative.worldAnchors;
    for (var index = 0; index < worldAnchors.length - 1; index++) {
        var current = worldAnchors[index];
        var next = worldAnchors[index + 1];
        if (!current.next && !next.prev) {
            // 线段
            if (isLineIntersectRectangle(current, next, rect)) {
                return true;
            }
        }
        else {
            // 贝塞尔
            if (isBezierIntersectRectangle(current, next, rect)) {
                return true;
            }
        }
    }
    return false;
}
/**
 * 线段与矩形是否相交
 * @param rect 矩形
 */
export function isLineIntersectRectangle(pt1, pt2, rect) {
    if (pointInSimpleRect(pt1, rect) || pointInSimpleRect(pt2, rect)) {
        // 存在一个点在矩形内部
        return true;
    }
    var linePointX1 = pt1.x;
    var linePointY1 = pt1.y;
    var linePointX2 = pt2.x;
    var linePointY2 = pt2.y;
    var rectangleLeftTopX = rect.x;
    var rectangleLeftTopY = rect.y;
    var rectangleRightBottomX = rect.ex;
    var rectangleRightBottomY = rect.ey;
    var lineHeight = linePointY1 - linePointY2;
    var lineWidth = linePointX2 - linePointX1; // 计算叉乘
    var c = linePointX1 * linePointY2 - linePointX2 * linePointY1;
    if ((lineHeight * rectangleLeftTopX + lineWidth * rectangleLeftTopY + c >= 0 &&
        lineHeight * rectangleRightBottomX +
            lineWidth * rectangleRightBottomY +
            c <=
            0) ||
        (lineHeight * rectangleLeftTopX + lineWidth * rectangleLeftTopY + c <= 0 &&
            lineHeight * rectangleRightBottomX +
                lineWidth * rectangleRightBottomY +
                c >=
                0) ||
        (lineHeight * rectangleLeftTopX + lineWidth * rectangleRightBottomY + c >=
            0 &&
            lineHeight * rectangleRightBottomX + lineWidth * rectangleLeftTopY + c <=
                0) ||
        (lineHeight * rectangleLeftTopX + lineWidth * rectangleRightBottomY + c <=
            0 &&
            lineHeight * rectangleRightBottomX + lineWidth * rectangleLeftTopY + c >=
                0)) {
        if (rectangleLeftTopX > rectangleRightBottomX) {
            var temp = rectangleLeftTopX;
            rectangleLeftTopX = rectangleRightBottomX;
            rectangleRightBottomX = temp;
        }
        if (rectangleLeftTopY < rectangleRightBottomY) {
            var temp1 = rectangleLeftTopY;
            rectangleLeftTopY = rectangleRightBottomY;
            rectangleRightBottomY = temp1;
        }
        if ((linePointX1 < rectangleLeftTopX && linePointX2 < rectangleLeftTopX) ||
            (linePointX1 > rectangleRightBottomX &&
                linePointX2 > rectangleRightBottomX) ||
            (linePointY1 > rectangleLeftTopY && linePointY2 > rectangleLeftTopY) ||
            (linePointY1 < rectangleRightBottomY &&
                linePointY2 < rectangleRightBottomY)) {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return false;
    }
}
/**
 * 贝塞尔曲线与矩形是否相交
 * @param from 前点
 * @param to 后点
 * @param rect 矩形
 */
export function isBezierIntersectRectangle(from, to, rect) {
    var step = 0.02;
    if (!from.next && !to.prev) {
        // 直线
        return isLineIntersectRectangle(from, to, rect);
    }
    else if (from.next && to.prev) {
        for (var i = step; i < 1; i += step) {
            var point = getBezierPoint(i, from, from.next, to.prev, to);
            if (pointInSimpleRect(point, rect)) {
                return true;
            }
        }
    }
    else if (from.next || to.prev) {
        for (var i = step; i < 1; i += step) {
            var point = getQuadraticPoint(i, from, from.next || to.prev, to);
            if (pointInSimpleRect(point, rect)) {
                return true;
            }
        }
    }
    return false;
}
//# sourceMappingURL=line.js.map