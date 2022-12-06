var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { Direction } from '../../data';
import { facePen, getToAnchor } from '../../pen';
import { distance, PrevNextType, rotatePoint } from '../../point';
import { s8 } from '../../utils';
export function curve(store, pen, mousedwon) {
    if (!pen.calculative.worldAnchors) {
        pen.calculative.worldAnchors = [];
    }
    if (mousedwon) {
        if (pen.calculative.activeAnchor) {
            pen.calculative.activeAnchor.next = { penId: pen.id, x: mousedwon.x, y: mousedwon.y };
            if (distance(pen.calculative.activeAnchor.next, pen.calculative.activeAnchor) < 5) {
                pen.calculative.activeAnchor.next = undefined;
            }
            else {
                pen.calculative.activeAnchor.prev = __assign({}, pen.calculative.activeAnchor.next);
                rotatePoint(pen.calculative.activeAnchor.prev, 180, pen.calculative.activeAnchor);
            }
        }
    }
    else {
        var from = pen.calculative.worldAnchors[0];
        if (!from.next) {
            var fromFace = facePen(from, store.pens[from.connectTo]);
            calcCurveCP(from, fromFace, 50);
            from.prev = undefined;
        }
        var to = pen.calculative.worldAnchors[pen.calculative.worldAnchors.length - 1];
        if (to && to !== from && !to.prev) {
            var toFace = facePen(to, store.pens[to.connectTo]);
            calcCurveCP(to, toFace, -50);
            to.next = undefined;
        }
    }
}
function calcCurveCP(pt, d, dis) {
    switch (d) {
        case Direction.Up:
            pt.prev = {
                penId: pt.penId,
                x: pt.x,
                y: pt.y + dis,
            };
            pt.next = {
                penId: pt.penId,
                x: pt.x,
                y: pt.y - dis,
            };
            break;
        case Direction.Right:
            pt.prev = {
                penId: pt.penId,
                x: pt.x - dis,
                y: pt.y,
            };
            pt.next = {
                penId: pt.penId,
                x: pt.x + dis,
                y: pt.y,
            };
            break;
        case Direction.Bottom:
            pt.prev = {
                penId: pt.penId,
                x: pt.x,
                y: pt.y - dis,
            };
            pt.next = {
                penId: pt.penId,
                x: pt.x,
                y: pt.y + dis,
            };
            break;
        case Direction.Left:
            pt.prev = {
                penId: pt.penId,
                x: pt.x + dis,
                y: pt.y,
            };
            pt.next = {
                penId: pt.penId,
                x: pt.x - dis,
                y: pt.y,
            };
            break;
    }
}
// Get a point in quadratic.
// pos - The position of point in quadratic. It is expressed as a percentage(0 - 1).
export function getQuadraticPoint(step, from, cp, to) {
    var pos = 1 - step;
    var x = pos * pos * from.x + 2 * pos * step * cp.x + step * step * to.x;
    var y = pos * pos * from.y + 2 * pos * step * cp.y + step * step * to.y;
    return { x: x, y: y, step: step };
}
// Get a point in bezier.
// pos - The position of point in bezier. It is expressed as a percentage(0 - 1).
export function getBezierPoint(step, from, cp1, cp2, to) {
    var x1 = from.x, y1 = from.y;
    var x2 = to.x, y2 = to.y;
    var cx1 = cp1.x, cy1 = cp1.y;
    var cx2 = cp2.x, cy2 = cp2.y;
    var pos = 1 - step;
    var x = x1 * pos * pos * pos + 3 * cx1 * step * pos * pos + 3 * cx2 * step * step * pos + x2 * step * step * step;
    var y = y1 * pos * pos * pos + 3 * cy1 * step * pos * pos + 3 * cy2 * step * step * pos + y2 * step * step * step;
    return { x: x, y: y, step: step };
}
function lerp(pt1, pt2, t) {
    return {
        x: pt1.x + t * (pt2.x - pt1.x),
        y: pt1.y + t * (pt2.y - pt1.y),
    };
}
export function getSplitAnchor(pen, pt, index) {
    var from = pen.calculative.worldAnchors[index];
    var to = pen.calculative.worldAnchors[index + 1];
    var t = pt.step;
    var anchor;
    if (from.next && to.prev) {
        var p0 = from;
        var p1 = from.next;
        var p2 = to.prev;
        var p3 = to;
        var p4 = lerp(p0, p1, t);
        var p5 = lerp(p1, p2, t);
        var p6 = lerp(p2, p3, t);
        var p7 = lerp(p4, p5, t);
        var p8 = lerp(p5, p6, t);
        anchor = lerp(p7, p8, t);
        p7.penId = pen.id;
        anchor.prev = p7;
        p8.penId = pen.id;
        anchor.next = p8;
        from.next.x = p4.x;
        from.next.y = p4.y;
        to.prev.x = p6.x;
        to.prev.y = p6.y;
    }
    else if (from.next || to.prev) {
        var p0 = from;
        var p1 = from.next || to.prev;
        var p2 = to;
        var p3 = lerp(p0, p1, t);
        var p4 = lerp(p1, p2, t);
        anchor = pt;
        p3.penId = pen.id;
        p4.penId = pen.id;
        anchor.prev = p3;
        anchor.next = p4;
        from.next = undefined;
        to.prev = undefined;
    }
    else {
        // 并非贝塞尔点，即 from 和 to 之间是一条直线
        anchor = pt;
    }
    anchor.penId = pen.id;
    anchor.id = s8();
    anchor.prevNextType = PrevNextType.Bilateral;
    return anchor;
}
export function mind(store, pen, mousedwon) {
    if (!pen.calculative.worldAnchors) {
        pen.calculative.worldAnchors = [];
    }
    if (pen.calculative.worldAnchors.length < 2) {
        return;
    }
    var from = pen.calculative.activeAnchor;
    var to = mousedwon || getToAnchor(pen);
    if (!from || !to) {
        return;
    }
    var dis = 20;
    var fromPen = store.pens[from.connectTo];
    var fromFace = facePen(from, fromPen);
    if (fromFace === Direction.None) {
        if (to.x > from.x) {
            fromFace = Direction.Right;
        }
        else {
            fromFace = Direction.Left;
        }
    }
    from.next = { id: s8(), penId: pen.id, x: from.x, y: from.y, prevNextType: 2 };
    to.prev = { id: s8(), penId: pen.id, x: to.x, y: to.y, prevNextType: 2 };
    switch (fromFace) {
        case Direction.Up:
            from.next.y -= dis;
            to.prev.y = from.y;
            break;
        case Direction.Bottom:
            from.next.y += dis;
            to.prev.y = from.y;
            break;
        case Direction.Left:
            from.next.x -= dis;
            to.prev.x = from.x;
            break;
        default:
            from.next.x += dis;
            to.prev.x = from.x;
            break;
    }
}
//# sourceMappingURL=curve.js.map