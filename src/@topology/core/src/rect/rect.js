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
import { isEqual } from '../pen';
import { rotatePoint, scalePoint } from '../point';
import { formatPadding } from '../utils';
export function pointInRect(pt, rect) {
    if (!rect) {
        return;
    }
    if (rect.ex == null) {
        calcRightBottom(rect);
    }
    if (!rect.rotate ||
        // rect.width < 20 ||
        // rect.height < 20 ||
        rect.rotate % 360 === 0) {
        return pt.x > rect.x && pt.x < rect.ex && pt.y > rect.y && pt.y < rect.ey;
    }
    if (!rect.center) {
        calcCenter(rect);
    }
    var pts = [
        { x: rect.x, y: rect.y },
        { x: rect.ex, y: rect.y },
        { x: rect.ex, y: rect.ey },
        { x: rect.x, y: rect.ey },
    ];
    pts.forEach(function (item) {
        rotatePoint(item, rect.rotate, rect.center);
    });
    return pointInVertices(pt, pts);
}
export function pointInSimpleRect(pt, rect, r) {
    if (r === void 0) { r = 0; }
    var x = rect.x, y = rect.y, ex = rect.ex, ey = rect.ey;
    return pt.x >= x - r && pt.x <= ex + r && pt.y >= y - r && pt.y <= ey + r;
}
export function calcCenter(rect) {
    if (!rect.center) {
        rect.center = {};
    }
    rect.center.x = rect.x + rect.width / 2;
    rect.center.y = rect.y + rect.height / 2;
}
export function calcRightBottom(rect) {
    rect.ex = rect.x + rect.width;
    rect.ey = rect.y + rect.height;
}
export function pointInVertices(point, vertices) {
    var e_1, _a;
    if (vertices.length < 3) {
        return false;
    }
    var isIn = false;
    var last = vertices[vertices.length - 1];
    try {
        for (var vertices_1 = __values(vertices), vertices_1_1 = vertices_1.next(); !vertices_1_1.done; vertices_1_1 = vertices_1.next()) {
            var item = vertices_1_1.value;
            if (last.y > point.y !== item.y > point.y) {
                if (item.x + ((point.y - item.y) * (last.x - item.x)) / (last.y - item.y) >
                    point.x) {
                    isIn = !isIn;
                }
            }
            last = item;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (vertices_1_1 && !vertices_1_1.done && (_a = vertices_1.return)) _a.call(vertices_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return isIn;
}
export function getRect(pens) {
    var points = [];
    pens.forEach(function (pen) {
        if (pen.isRuleLine) {
            return;
        }
        var rect = pen.calculative.worldRect;
        if (rect) {
            var pts = rectToPoints(rect);
            // rectToPoints 已经计算过 rotate 无需重复计算
            points.push.apply(points, __spreadArray([], __read(pts), false));
        }
    });
    var rect = getRectOfPoints(points);
    calcCenter(rect);
    return rect;
}
export function rectToPoints(rect) {
    var pts = [
        { x: rect.x, y: rect.y },
        { x: rect.ex, y: rect.y },
        { x: rect.ex, y: rect.ey },
        { x: rect.x, y: rect.ey },
    ];
    if (rect.rotate) {
        if (!rect.center) {
            calcCenter(rect);
        }
        pts.forEach(function (pt) {
            rotatePoint(pt, rect.rotate, rect.center);
        });
    }
    return pts;
}
export function getRectOfPoints(points) {
    var x = Infinity;
    var y = Infinity;
    var ex = -Infinity;
    var ey = -Infinity;
    points === null || points === void 0 ? void 0 : points.forEach(function (item) {
        if (!isFinite(item.x) || !isFinite(item.y)) {
            return;
        }
        x = Math.min(x, item.x);
        y = Math.min(y, item.y);
        ex = Math.max(ex, item.x);
        ey = Math.max(ey, item.y);
    });
    return { x: x, y: y, ex: ex, ey: ey, width: ex - x, height: ey - y };
}
export function rectInRect(source, target, allIn) {
    if (source.rotate) {
        // 根据 rotate 扩大 rect
        source = getRectOfPoints(rectToPoints(source)); // 更改 source 引用地址值，不影响原值
    }
    if (allIn) {
        return (source.x > target.x &&
            source.ex < target.ex &&
            source.y > target.y &&
            source.ey < target.ey);
    }
    return !(source.x > target.ex ||
        source.ex < target.x ||
        source.ey < target.y ||
        source.y > target.ey);
}
/**
 * 一个 rect 在另一个 rect 的 四个角，即水平区域不重合，垂直区域不重合
 */
export function rectInFourAngRect(source, target) {
    return ((target.x > source.ex || target.ex < source.x) &&
        (target.y > source.ey || target.ey < source.y));
}
/**
 * 扩大 rect ，x，y，ex，ey 值都会变
 * @param rect 原 rect ，无副作用
 * @param size padding 类型，可传四个方向的值，也可以只传一个值
 */
export function expandRect(rect, size) {
    var padding = formatPadding(size);
    var retRect = {
        x: rect.x - padding[3],
        y: rect.y - padding[0],
        width: rect.width + padding[1] + padding[3],
        height: rect.height + padding[0] + padding[2],
    };
    calcRightBottom(retRect);
    return retRect;
}
export function translateRect(rect, x, y) {
    rect.x += x;
    rect.y += y;
    rect.ex += x;
    rect.ey += y;
    if (rect.center) {
        rect.center.x += x;
        rect.center.y += y;
    }
}
/**
 * 通过两条线段计算出相交的点
 * @param line1 线段1
 * @param line2 线段2
 */
function getIntersectPoint(line1, line2) {
    var k1 = (line1.to.y - line1.from.y) / (line1.to.x - line1.from.x);
    var k2 = (line2.to.y - line2.from.y) / (line2.to.x - line2.from.x);
    return getIntersectPointByK({
        k: k1,
        point: line1.from,
    }, {
        k: k2,
        point: line2.from,
    });
}
/**
 * 该方法作用同上，不过此方法需要传的是 斜率
 * @param line1 线段1
 * @param line2 线段2
 * @returns
 */
function getIntersectPointByK(line1, line2) {
    if (isEqual(line1.k, 0)) {
        return {
            x: line2.point.x,
            y: line1.point.y,
        };
    }
    else if (isEqual(line2.k, 0)) {
        return {
            x: line1.point.x,
            y: line2.point.y,
        };
    }
    var b1 = line1.point.y - line1.k * line1.point.x;
    var b2 = line2.point.y - line2.k * line2.point.x;
    var x = (b2 - b1) / (line1.k - line2.k);
    var y = line1.k * x + b1;
    return {
        x: x,
        y: y,
    };
}
/**
 * 通过 4 个点和旋转角度，计算出原矩形（旋转前的矩形）
 * @param pts 4 个点
 * @param rotate 旋转角度
 */
function pointsToRect(pts, rotate) {
    var e_2, _a;
    // 1. 计算 center，认为 0，2 ；1，3 的连线相交就是 center 点
    var center = getIntersectPoint({
        from: pts[0],
        to: pts[2],
    }, {
        from: pts[1],
        to: pts[3],
    });
    try {
        // 2. 把点反向转 rotate °
        for (var pts_1 = __values(pts), pts_1_1 = pts_1.next(); !pts_1_1.done; pts_1_1 = pts_1.next()) {
            var pt = pts_1_1.value;
            rotatePoint(pt, -rotate, center);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (pts_1_1 && !pts_1_1.done && (_a = pts_1.return)) _a.call(pts_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    // 3. 计算区域
    return getRectOfPoints(pts);
}
export function resizeRect(rect, offsetX, offsetY, resizeIndex) {
    if (rect.rotate && rect.rotate % 360) {
        // 计算出外边的四个点
        var pts = rectToPoints(rect);
        // 斜率不改变，提前计算
        var k1 = (pts[0].y - pts[1].y) / (pts[0].x - pts[1].x);
        var k2 = (pts[1].y - pts[2].y) / (pts[1].x - pts[2].x);
        if (resizeIndex < 4) {
            // 斜对角的四个点
            // resize 的点
            pts[resizeIndex].x += offsetX;
            pts[resizeIndex].y += offsetY;
            // 不变的点
            var noChangePoint = pts[(resizeIndex + 2) % 4];
            // 由于斜率是不变的，我们只需要根据斜率 和 已知的两点求出相交的 另外两点
            pts[(resizeIndex + 1) % 4] = getIntersectPointByK({ k: resizeIndex % 2 ? k2 : k1, point: pts[resizeIndex] }, { k: resizeIndex % 2 ? k1 : k2, point: noChangePoint });
            pts[(resizeIndex + 4 - 1) % 4] = getIntersectPointByK({ k: resizeIndex % 2 ? k1 : k2, point: pts[resizeIndex] }, { k: resizeIndex % 2 ? k2 : k1, point: noChangePoint });
        }
        else {
            // 边缘四个点有两个点固定
            var k = [4, 6].includes(resizeIndex) ? k2 : k1;
            if (!isEqual(k, 0)) {
                pts[resizeIndex % 4].y += offsetY;
                pts[resizeIndex % 4].x += offsetY / k;
                pts[(resizeIndex + 1) % 4].y += offsetY;
                pts[(resizeIndex + 1) % 4].x += offsetY / k;
            }
            else {
                pts[resizeIndex % 4].x += offsetX;
                pts[(resizeIndex + 1) % 4].x += offsetX;
            }
        }
        if (Math.pow((pts[0].x - pts[1].x), 2) + Math.pow((pts[0].y - pts[1].y), 2) < 25 ||
            Math.pow((pts[1].x - pts[2].x), 2) + Math.pow((pts[1].y - pts[2].y), 2) < 25) {
            // 距离小于 5 不能继续 resize 了
            return;
        }
        var retRect = pointsToRect(pts, rect.rotate);
        calcCenter(retRect);
        Object.assign(rect, retRect);
        return;
    }
    switch (resizeIndex) {
        case 0:
            if (rect.width - offsetX < 5 || rect.height - offsetY < 5) {
                break;
            }
            rect.x += offsetX;
            rect.y += offsetY;
            rect.width -= offsetX;
            rect.height -= offsetY;
            break;
        case 1:
            if (rect.width + offsetX < 5 || rect.height - offsetY < 5) {
                break;
            }
            rect.ex += offsetX;
            rect.y += offsetY;
            rect.width += offsetX;
            rect.height -= offsetY;
            break;
        case 2:
            if (rect.width + offsetX < 5 || rect.height + offsetY < 5) {
                break;
            }
            rect.ex += offsetX;
            rect.ey += offsetY;
            rect.width += offsetX;
            rect.height += offsetY;
            break;
        case 3:
            if (rect.width - offsetX < 5 || rect.height + offsetY < 5) {
                break;
            }
            rect.x += offsetX;
            rect.ey += offsetY;
            rect.width -= offsetX;
            rect.height += offsetY;
            break;
        case 4:
            if (rect.height - offsetY < 5) {
                break;
            }
            rect.y += offsetY;
            rect.height -= offsetY;
            break;
        case 5:
            if (rect.width + offsetX < 5) {
                break;
            }
            rect.ex += offsetX;
            rect.width += offsetX;
            break;
        case 6:
            if (rect.height + offsetY < 5) {
                break;
            }
            rect.ey += offsetY;
            rect.height += offsetY;
            break;
        case 7:
            if (rect.width - offsetX < 5) {
                break;
            }
            rect.x += offsetX;
            rect.width -= offsetX;
            break;
    }
}
export function scaleRect(rect, scale, center) {
    if (!rect) {
        return;
    }
    rect.width *= scale;
    rect.height *= scale;
    scalePoint(rect, scale, center);
    calcRightBottom(rect);
    calcCenter(rect);
}
export function calcRelativeRect(rect, worldRect) {
    var relRect = {
        x: (rect.x - worldRect.x) / worldRect.width,
        y: (rect.y - worldRect.y) / worldRect.height,
        width: rect.width / worldRect.width,
        height: rect.height / worldRect.height,
    };
    calcRightBottom(relRect);
    return relRect;
}
/**
 * 计算相对点 ，anchors 中的值都是百分比
 * @param pt 绝对坐标
 * @param worldRect 图形外接矩形
 * @returns 相对坐标点
 */
export function calcRelativePoint(pt, worldRect) {
    var x = worldRect.x, y = worldRect.y, width = worldRect.width, height = worldRect.height;
    var penId = pt.penId, connectTo = pt.connectTo;
    var point = Object.assign({}, pt, {
        x: width ? (pt.x - x) / width : 0,
        y: height ? (pt.y - y) / height : 0,
    });
    if (pt.prev) {
        point.prev = {
            penId: penId,
            connectTo: connectTo,
            x: width ? (pt.prev.x - x) / width : 0,
            y: height ? (pt.prev.y - y) / height : 0,
        };
    }
    if (pt.next) {
        point.next = {
            penId: penId,
            connectTo: connectTo,
            x: width ? (pt.next.x - x) / width : 0,
            y: height ? (pt.next.y - y) / height : 0,
        };
    }
    return point;
}
//# sourceMappingURL=rect.js.map