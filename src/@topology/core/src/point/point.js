import { Direction } from '../data';
export var PrevNextType;
(function (PrevNextType) {
    PrevNextType[PrevNextType["Mirror"] = 0] = "Mirror";
    PrevNextType[PrevNextType["Bilateral"] = 1] = "Bilateral";
    PrevNextType[PrevNextType["Free"] = 2] = "Free";
})(PrevNextType || (PrevNextType = {}));
export var TwoWay;
(function (TwoWay) {
    TwoWay[TwoWay["Default"] = 0] = "Default";
    TwoWay[TwoWay["In"] = 1] = "In";
    TwoWay[TwoWay["Out"] = 2] = "Out";
    TwoWay[TwoWay["DisableConnected"] = 3] = "DisableConnected";
    TwoWay[TwoWay["DisableConnectTo"] = 4] = "DisableConnectTo";
    TwoWay[TwoWay["Disable"] = 10] = "Disable";
})(TwoWay || (TwoWay = {}));
export function rotatePoint(pt, angle, center) {
    if (!angle || angle % 360 === 0) {
        return;
    }
    var a = (angle * Math.PI) / 180;
    var x = (pt.x - center.x) * Math.cos(a) -
        (pt.y - center.y) * Math.sin(a) +
        center.x;
    var y = (pt.x - center.x) * Math.sin(a) +
        (pt.y - center.y) * Math.cos(a) +
        center.y;
    pt.x = x;
    pt.y = y;
    pt.prev && rotatePoint(pt.prev, angle, center);
    pt.next && rotatePoint(pt.next, angle, center);
}
export function hitPoint(pt, target, radius) {
    if (radius === void 0) { radius = 5; }
    return (pt.x > target.x - radius &&
        pt.x < target.x + radius &&
        pt.y > target.y - radius &&
        pt.y < target.y + radius);
}
export function scalePoint(pt, scale, center) {
    pt.x = center.x - (center.x - pt.x) * scale;
    pt.y = center.y - (center.y - pt.y) * scale;
}
export function calcRotate(pt, center) {
    if (pt.x === center.x) {
        return pt.y <= center.y ? 0 : 180;
    }
    if (pt.y === center.y) {
        return pt.x < center.x ? 270 : 90;
    }
    var x = pt.x - center.x;
    var y = pt.y - center.y;
    var angle = (Math.atan(Math.abs(x / y)) / (2 * Math.PI)) * 360;
    if (x > 0 && y > 0) {
        angle = 180 - angle;
    }
    else if (x < 0 && y > 0) {
        angle += 180;
    }
    else if (x < 0 && y < 0) {
        angle = 360 - angle;
    }
    return angle;
}
export function distance(pt1, pt2) {
    var x = pt1.x - pt2.x;
    var y = pt1.y - pt2.y;
    return Math.sqrt(x * x + y * y);
}
export function facePoint(pt, targetPt) {
    var d = Direction.None;
    if (!targetPt) {
        return d;
    }
    var disX = pt.x - targetPt.x;
    var disY = pt.y - targetPt.y;
    if (Math.abs(disX) > Math.abs(disY)) {
        if (disX > 0) {
            d = Direction.Right;
        }
        else {
            d = Direction.Left;
        }
    }
    else {
        if (disY > 0) {
            d = Direction.Bottom;
        }
        else {
            d = Direction.Up;
        }
    }
    return d;
}
export function translatePoint(pt, x, y) {
    if (!pt) {
        return;
    }
    pt.x += x;
    pt.y += y;
    if (pt.next) {
        pt.next.x += x;
        pt.next.y += y;
    }
    if (pt.prev) {
        pt.prev.x += x;
        pt.prev.y += y;
    }
}
/**
 * 是否是同一个点
 * @param pt1 点1
 * @param pt2 点2
 * @returns true 相同
 */
export function samePoint(pt1, pt2) {
    return pt1.anchorId === pt2.anchorId && pt1.connectTo === pt2.connectTo;
}
//# sourceMappingURL=point.js.map