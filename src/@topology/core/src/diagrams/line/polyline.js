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
import { Direction } from '../../data';
import { deleteTempAnchor, facePen, getFromAnchor, getToAnchor, } from '../../pen';
import { s8 } from '../../utils';
var faceSpace = 30;
export function polyline(store, pen, mousedwon) {
    var _a;
    if (!pen.calculative.worldAnchors) {
        pen.calculative.worldAnchors = [];
    }
    if (pen.calculative.worldAnchors.length < 2) {
        return;
    }
    var from = getFromAnchor(pen);
    var to = getToAnchor(pen);
    if (!from || !to) {
        return;
    }
    // 拖拽起点
    var dragFrom;
    if (((_a = pen.anchors) === null || _a === void 0 ? void 0 : _a.length) && from === pen.calculative.activeAnchor) {
        dragFrom = true;
        from = to;
        to = getFromAnchor(pen);
    }
    else if ((!pen.anchors || !pen.anchors.length) &&
        from !== pen.calculative.activeAnchor) {
        from = pen.calculative.activeAnchor;
    }
    if (!from || !to) {
        return;
    }
    from.next = undefined;
    to.prev = undefined;
    var connected = to.connectTo;
    deleteTempAnchor(pen);
    var pts = [];
    var fromPen = store.pens[from.connectTo];
    var toPen = store.pens[to.connectTo];
    var fromFace = facePen(from, fromPen);
    var toFace = facePen(to, toPen);
    var a = getFacePoint(from, fromFace, faceSpace);
    if (a) {
        from = a;
        pts.push(a);
    }
    a = getFacePoint(to, toFace, faceSpace);
    var end = to;
    if (a) {
        to = a;
    }
    switch (fromFace) {
        case Direction.Up:
            pts.push.apply(pts, __spreadArray([], __read(getNextPointsOfUp(from, to, toFace)), false));
            break;
        case Direction.Right:
            pts.push.apply(pts, __spreadArray([], __read(getNextPointsOfRight(from, to, toFace)), false));
            break;
        case Direction.Bottom:
            pts.push.apply(pts, __spreadArray([], __read(getNextPointsOfBottom(from, to, toFace)), false));
            break;
        case Direction.Left:
            pts.push.apply(pts, __spreadArray([], __read(getNextPointsOfLeft(from, to, toFace)), false));
            break;
        default:
            pts.push.apply(pts, __spreadArray([], __read(getNextPoints(pen, from, to)), false));
            break;
    }
    pts.forEach(function (anchor) {
        anchor.id = s8();
        anchor.penId = pen.id;
        pen.calculative.worldAnchors.push(anchor);
    });
    pen.calculative.worldAnchors.push(to);
    if (a) {
        pen.calculative.worldAnchors.push(end);
    }
    if (dragFrom) {
        pen.calculative.worldAnchors.reverse();
    }
    if (connected) {
        var i = pen.calculative.worldAnchors.length - 2;
        pen.calculative.worldAnchors[i].isTemp = false;
    }
}
function getFacePoint(pt, d, dis) {
    var point = { x: pt.x, y: pt.y, id: s8() };
    switch (d) {
        case Direction.Up:
            point.y -= dis;
            break;
        case Direction.Right:
            point.x += dis;
            break;
        case Direction.Bottom:
            point.y += dis;
            break;
        case Direction.Left:
            point.x -= dis;
            break;
        default: {
            return;
        }
    }
    return point;
}
function getNextPointsOfUp(from, to, toFace) {
    if (from.x === to.x || from.y === to.y) {
        return [];
    }
    var pts = [];
    var x;
    var y;
    switch (toFace) {
        case Direction.Up:
            if (from.y < to.y) {
                x = to.x;
                y = from.y;
            }
            else {
                x = from.x;
                y = to.y;
            }
            pts.push({ x: x, y: y });
            break;
        case Direction.Bottom:
            x = to.x;
            y = from.y;
            if (to.y > from.y) {
                x = from.x + (to.x - from.x) / 2;
                pts.push({ x: x, y: from.y }, { x: x, y: to.y });
            }
            else {
                var centerY = (from.y + to.y) / 2;
                pts.push({ x: from.x, y: centerY }, { x: to.x, y: centerY });
            }
            break;
        case Direction.Right:
            x = to.x;
            y = from.y;
            if (to.x < from.x && to.y < from.y) {
                x = from.x;
                y = to.y;
            }
            pts.push({ x: x, y: y });
            break;
        case Direction.Left:
            x = to.x;
            y = from.y;
            if (to.x > from.x && to.y < from.y) {
                x = from.x;
                y = to.y;
            }
            pts.push({ x: x, y: y });
            break;
        default:
            if (to.y > from.y - faceSpace) {
                x = from.x + (to.x - from.x) / 2;
                pts.push({ x: x, y: from.y }, { x: x, y: to.y });
            }
            else {
                var centerY = (from.y + to.y + faceSpace) / 2;
                pts.push({ x: from.x, y: centerY }, { x: to.x, y: centerY });
            }
            break;
    }
    return pts;
}
function getNextPointsOfRight(from, to, toFace) {
    if (from.x === to.x || from.y === to.y) {
        return [];
    }
    var pts = [];
    var x;
    var y;
    switch (toFace) {
        case Direction.Up:
            x = from.x;
            y = to.y;
            if (to.x > from.x && to.y > from.y) {
                x = to.x;
                y = from.y;
            }
            pts.push({ x: x, y: y });
            break;
        case Direction.Bottom:
            x = from.x;
            y = to.y;
            if (to.x > from.x && to.y < from.y) {
                x = to.x;
                y = from.y;
            }
            pts.push({ x: x, y: y });
            break;
        case Direction.Left:
            x = to.x;
            y = from.y;
            if (to.x < from.x) {
                y = from.y + (to.y - from.y) / 2;
                pts.push({ x: from.x, y: y }, { x: to.x, y: y });
            }
            else {
                var centerX = (from.x + to.x) / 2;
                pts.push({ x: centerX, y: y }, { x: centerX, y: to.y });
            }
            break;
        case Direction.Right:
            if (to.x < from.x) {
                pts.push({ x: from.x, y: to.y });
            }
            else {
                pts.push({ x: to.x, y: from.y });
            }
            break;
        default:
            x = to.x;
            y = to.y;
            if (to.x < from.x + faceSpace) {
                pts.push({ x: from.x, y: y });
            }
            else {
                var centerX = (from.x + to.x - faceSpace) / 2;
                pts.push({ x: centerX, y: from.y }, { x: centerX, y: y });
            }
            break;
    }
    return pts;
}
function getNextPointsOfBottom(from, to, toFace) {
    if (from.x === to.x || from.y === to.y) {
        return [];
    }
    var pts = [];
    var x;
    var y;
    switch (toFace) {
        case Direction.Up:
            x = from.x;
            y = to.y;
            if (to.y < from.y) {
                x = from.x + (to.x - from.x) / 2;
                pts.push({ x: x, y: from.y }, { x: x, y: to.y });
            }
            else {
                var centerY = (from.y + to.y) / 2;
                pts.push({ x: x, y: centerY }, { x: to.x, y: centerY });
            }
            break;
        case Direction.Right:
            x = to.x;
            y = from.y;
            if (to.x < from.x && to.y > from.y) {
                x = from.x;
                y = to.y;
            }
            pts.push({ x: x, y: y });
            break;
        case Direction.Bottom:
            if (from.y > to.y) {
                x = to.x;
                y = from.y;
            }
            else {
                x = from.x;
                y = to.y;
            }
            pts.push({ x: x, y: y });
            break;
        case Direction.Left:
            x = to.x;
            y = from.y;
            if (to.x > from.x && to.y > from.y) {
                x = from.x;
                y = to.y;
            }
            pts.push({ x: x, y: y });
            break;
        default:
            x = from.x;
            if (to.y < from.y + faceSpace) {
                x = from.x + (to.x - from.x) / 2;
                pts.push({ x: x, y: from.y }, { x: x, y: to.y });
            }
            else {
                var centerY = (from.y + to.y - faceSpace) / 2;
                pts.push({ x: x, y: centerY }, { x: to.x, y: centerY });
            }
            break;
    }
    return pts;
}
function getNextPointsOfLeft(from, to, toFace) {
    if (from.x === to.x || from.y === to.y) {
        return [];
    }
    var pts = [];
    var x;
    var y;
    switch (toFace) {
        case Direction.Up:
            x = from.x;
            y = to.y;
            if (to.x < from.x && to.y > from.y) {
                x = to.x;
                y = from.y;
            }
            pts.push({ x: x, y: y });
            break;
        case Direction.Bottom:
            x = from.x;
            y = to.y;
            if (to.x < from.x && to.y < from.y) {
                x = to.x;
                y = from.y;
            }
            pts.push({ x: x, y: y });
            break;
        case Direction.Right:
            x = from.x;
            y = to.y;
            if (to.x > from.x) {
                x = to.x;
                y = from.y + (to.y - from.y) / 2;
                pts.push({ x: from.x, y: y }, { x: to.x, y: y });
            }
            else {
                var centerX = (from.x + to.x) / 2;
                pts.push({ x: centerX, y: from.y }, { x: centerX, y: to.y });
            }
            break;
        case Direction.Left:
            if (to.x > from.x) {
                pts.push({ x: from.x, y: to.y });
            }
            else {
                pts.push({ x: to.x, y: from.y });
            }
            break;
        default:
            x = from.x;
            y = to.y;
            if (to.x < from.x - faceSpace) {
                var centerX = (from.x + to.x + faceSpace) / 2;
                pts.push({ x: centerX, y: from.y }, { x: centerX, y: y });
            }
            else {
                pts.push({ x: from.x, y: y });
            }
            break;
    }
    return pts;
}
function getNextPoints(pen, from, to) {
    var pts = [];
    if (pen.calculative.drawlineH == undefined) {
        pen.calculative.drawlineH =
            Math.abs(to.x - from.x) > Math.abs(to.y - from.y);
    }
    if (pen.calculative.worldAnchors.length) {
        to.isTemp = undefined;
        if (pen.calculative.drawlineH) {
            pts.push({ x: to.x, y: from.y });
            if (Math.abs(to.y - from.y) < faceSpace) {
                to.isTemp = true;
            }
        }
        else {
            pts.push({ x: from.x, y: to.y });
            if (Math.abs(to.x - from.x) < faceSpace) {
                to.isTemp = true;
            }
        }
    }
    return pts;
}
export function anchorInHorizontal(pen, anchor, from) {
    var _a, _b;
    if (from === void 0) { from = true; }
    var anchors = pen.calculative.worldAnchors;
    if (!from) {
        anchors = [];
        pen.calculative.worldAnchors.forEach(function (item) {
            anchors.unshift(item);
        });
    }
    for (var i = 0; i < anchors.length; i++) {
        if (anchors[i].id === anchor.id) {
            break;
        }
        if (anchors[i].y !== anchor.y) {
            return false;
        }
        if (anchors[i].x === ((_a = anchors[i + 1]) === null || _a === void 0 ? void 0 : _a.x) &&
            anchors[i].y !== ((_b = anchors[i + 1]) === null || _b === void 0 ? void 0 : _b.y)) {
            return false;
        }
    }
    return true;
}
export function anchorInVertical(pen, anchor, from) {
    var _a, _b;
    if (from === void 0) { from = true; }
    var anchors = pen.calculative.worldAnchors;
    if (!from) {
        anchors = [];
        pen.calculative.worldAnchors.forEach(function (item) {
            anchors.unshift(item);
        });
    }
    for (var i = 0; i < anchors.length; i++) {
        if (anchors[i].id === anchor.id) {
            break;
        }
        if (anchors[i].x !== anchor.x) {
            return false;
        }
        if (anchors[i].y === ((_a = anchors[i + 1]) === null || _a === void 0 ? void 0 : _a.y) &&
            anchors[i].x !== ((_b = anchors[i + 1]) === null || _b === void 0 ? void 0 : _b.x)) {
            return false;
        }
    }
    return true;
}
export function translatePolylineAnchor(pen, anchor, pt) {
    if (!pen.calculative.worldAnchors) {
        return;
    }
    var i = pen.calculative.worldAnchors.findIndex(function (item) { return item.id === anchor.id; });
    var from = getFromAnchor(pen);
    var to = getToAnchor(pen);
    var prev = pen.calculative.worldAnchors[i - 1];
    var next = pen.calculative.worldAnchors[i + 1];
    if (pen.calculative.h == undefined) {
        if (from.connectTo) {
            if (anchorInHorizontal(pen, anchor, true)) {
                pen.calculative.h = true;
            }
            else if (anchorInVertical(pen, anchor, true)) {
                pen.calculative.h = false;
            }
        }
        if (pen.calculative.h == undefined && to.connectTo) {
            if (anchorInHorizontal(pen, anchor, false)) {
                pen.calculative.h = true;
            }
            else if (anchorInVertical(pen, anchor, false)) {
                pen.calculative.h = false;
            }
        }
        if (pen.calculative.h == undefined) {
            if (prev) {
                pen.calculative.h = prev.y === anchor.y;
            }
            else if (next) {
                pen.calculative.h = next.y === anchor.y;
            }
        }
    }
    // 水平
    if (pen.calculative.h) {
        anchor.x = pt.x;
        if (from.connectTo && anchorInHorizontal(pen, anchor, true)) {
            if (next && next.y !== anchor.y) {
                next.x = anchor.x;
            }
            return;
        }
        if (to.connectTo && anchorInHorizontal(pen, anchor, false)) {
            if (prev && prev.y !== anchor.y) {
                prev.x = anchor.x;
            }
            return;
        }
        var a = pen.anchors[i];
        var d = void 0;
        for (var pos = i - 1; pos > -1; pos--) {
            prev = pen.anchors[pos];
            if (d == undefined) {
                d = prev.y === a.y;
            }
            if (d === true) {
                if (prev.y === a.y) {
                    pen.calculative.worldAnchors[pos].y = pt.y;
                }
                else {
                    break;
                }
            }
            else {
                if (prev.x === a.x) {
                    pen.calculative.worldAnchors[pos].x = pt.x;
                }
                else {
                    break;
                }
            }
        }
        d = undefined;
        for (var pos = i + 1; pos < pen.calculative.worldAnchors.length; pos++) {
            next = pen.anchors[pos];
            if (next) {
                if (d == undefined) {
                    d = next.y === a.y;
                }
                if (d === true) {
                    if (next.y === a.y) {
                        pen.calculative.worldAnchors[pos].y = pt.y;
                    }
                    else {
                        break;
                    }
                }
                else {
                    if (next.x === a.x) {
                        pen.calculative.worldAnchors[pos].x = pt.x;
                    }
                    else {
                        break;
                    }
                }
            }
            else {
                break;
            }
        }
        anchor.y = pt.y;
    }
    // 垂直
    else {
        anchor.y = pt.y;
        if (from.connectTo && anchorInVertical(pen, anchor, true)) {
            if (next && next.x !== anchor.x) {
                next.y = anchor.y;
            }
            return;
        }
        if (to.connectTo && anchorInVertical(pen, anchor, false)) {
            if (prev && prev.x !== anchor.x) {
                prev.y = anchor.y;
            }
            return;
        }
        var a = pen.anchors[i];
        var d = void 0;
        for (var pos = i - 1; pos > -1; pos--) {
            prev = pen.anchors[pos];
            if (d == undefined) {
                d = prev.x === a.x;
            }
            if (d === true) {
                if (prev.x === a.x) {
                    pen.calculative.worldAnchors[pos].x = pt.x;
                }
                else {
                    break;
                }
            }
            else {
                if (prev.y === a.y) {
                    pen.calculative.worldAnchors[pos].y = pt.y;
                }
                else {
                    break;
                }
            }
        }
        d = undefined;
        for (var pos = i + 1; pos < pen.calculative.worldAnchors.length; pos++) {
            next = pen.anchors[pos];
            if (next) {
                if (d == undefined) {
                    d = next.x === a.x;
                }
                if (d === true) {
                    if (next.x === a.x) {
                        pen.calculative.worldAnchors[pos].x = pt.x;
                    }
                    else {
                        break;
                    }
                }
                else {
                    if (next.y === a.y) {
                        pen.calculative.worldAnchors[pos].y = pt.y;
                    }
                    else {
                        break;
                    }
                }
            }
            else {
                break;
            }
        }
        anchor.x = pt.x;
    }
}
//# sourceMappingURL=polyline.js.map