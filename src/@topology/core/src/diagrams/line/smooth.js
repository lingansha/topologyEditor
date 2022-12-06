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
import { PrevNextType } from '../../point';
export function simplify(points, length, start, end) {
    var newPoints = [];
    var maxDist, index, xx, yy, dx, dy, ddx, ddy, p1, p2, p, t, dist, dist1;
    p1 = points[start];
    p2 = points[end];
    xx = p1.x;
    yy = p1.y;
    ddx = p2.x - xx;
    ddy = p2.y - yy;
    dist1 = ddx * ddx + ddy * ddy;
    maxDist = length;
    for (var i = start + 1; i < end; i++) {
        p = points[i];
        if (ddx !== 0 || ddy !== 0) {
            t = ((p.x - xx) * ddx + (p.y - yy) * ddy) / dist1;
            if (t > 1) {
                dx = p.x - p2.x;
                dy = p.y - p2.y;
            }
            else if (t > 0) {
                dx = p.x - (xx + ddx * t);
                dy = p.y - (yy + ddy * t);
            }
            else {
                dx = p.x - xx;
                dy = p.y - yy;
            }
        }
        else {
            dx = p.x - xx;
            dy = p.y - yy;
        }
        dist = dx * dx + dy * dy;
        if (dist > maxDist) {
            index = i;
            maxDist = dist;
        }
    }
    if (maxDist > length) {
        // continue simplification while maxDist > length
        if (index - start > 1) {
            newPoints.push.apply(newPoints, __spreadArray([], __read(simplify(points, length, start, index)), false));
        }
        newPoints.push({
            id: points[index].id,
            penId: points[index].penId,
            x: points[index].x,
            y: points[index].y,
        });
        if (end - index > 1) {
            newPoints.push.apply(newPoints, __spreadArray([], __read(simplify(points, length, index, end)), false));
        }
    }
    return newPoints;
}
export function smoothLine(points, cornerThres, match) {
    if (cornerThres === void 0) { cornerThres = 0.8; }
    if (match === void 0) { match = false; }
    if (points.length < 3) {
        return points;
    }
    // adds bezier control points at points if lines have angle less than thres
    var p1, p2, p3, dist1, dist2, x, y, endP, len, angle, newPoints, aLen, nx1, nx2, ny1, ny2;
    var dot = function (x, y, xx, yy) {
        dist1 = Math.sqrt(x * x + y * y);
        if (dist1 > 0) {
            // normalise
            nx1 = x / dist1;
            ny1 = y / dist1;
        }
        else {
            nx1 = 1; // need to have something so this will do as good as anything
            ny1 = 0;
        }
        dist2 = Math.sqrt(xx * xx + yy * yy);
        if (dist2 > 0) {
            nx2 = xx / dist2;
            ny2 = yy / dist2;
        }
        else {
            nx2 = 1;
            ny2 = 0;
        }
        return Math.acos(nx1 * nx2 + ny1 * ny2);
    };
    newPoints = [];
    aLen = points.length;
    p1 = points[0];
    endP = points[aLen - 1];
    newPoints.push(__assign({}, points[0]));
    for (var i = 0; i < aLen - 1; i++) {
        p2 = points[i];
        p3 = points[i + 1];
        angle = Math.abs(dot(p2.x - p1.x, p2.y - p1.y, p3.x - p2.x, p3.y - p2.y));
        if (dist1) {
            // dist1 and dist2 come from dot function
            if (angle < cornerThres * 3.14) {
                // bend it if angle between lines is small
                if (match) {
                    dist1 = Math.min(dist1, dist2);
                    dist2 = dist1;
                }
                // use the two normalized vectors along the lines to create the tangent vector
                x = (nx1 + nx2) / 2;
                y = (ny1 + ny2) / 2;
                len = Math.sqrt(x * x + y * y); // normalise the tangent
                if (len === 0) {
                    newPoints.push(__assign({}, p2));
                }
                else {
                    x /= len;
                    y /= len;
                    var pt = __assign({}, p2);
                    pt.prevNextType = PrevNextType.Bilateral;
                    pt.prev = {
                        penId: pt.penId,
                        x: p2.x - x * dist1 * 0.25,
                        y: p2.y - y * dist1 * 0.25,
                    };
                    pt.next = {
                        penId: pt.penId,
                        x: p2.x + x * dist2 * 0.25,
                        y: p2.y + y * dist2 * 0.25,
                    };
                    newPoints.push(pt);
                }
            }
            else {
                newPoints.push(__assign({}, p2));
            }
        }
        p1 = p2;
    }
    newPoints.push(__assign({}, points[points.length - 1]));
    return newPoints;
}
//# sourceMappingURL=smooth.js.map