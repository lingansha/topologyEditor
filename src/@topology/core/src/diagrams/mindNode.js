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
import { calcWorldAnchors } from '@topology/core';
import { rectangle } from '.';
export function mindNode(pen, ctx) {
    if (!pen.onResize) {
        pen.onResize = resize;
        pen.onValue = value;
    }
    return rectangle(pen, ctx);
}
function resize(pen) {
    var _a;
    // 过滤出非默认锚点，即自定义锚点
    var manualPoints = pen.anchors.filter(function (point) { return point.flag !== 1; });
    mindNodeAnchors(pen);
    pen.anchors = (_a = pen.anchors).concat.apply(_a, __spreadArray([], __read(manualPoints), false));
}
function value(pen) {
    resize(pen);
    calcWorldAnchors(pen);
}
export function mindNodeAnchors(pen) {
    // TODO: 组合状态下的 width height 成了固定的百分比
    var anchors = [];
    var rectX = pen.x, rectY = pen.y, width = pen.width, height = pen.height;
    var r = borderRadius(pen);
    // 上四
    var topN = 5; // 上方节点个数，控制位置，实际节点数依然是 4 个
    for (var i = 0; i < topN; i++) {
        if (i === 2) {
            continue;
        }
        var x = rectX + (width * (i + 1)) / (topN + 1);
        var y = rectY;
        if (x < rectX + r) {
            // 在左侧圆角
            y = getYByCircle(rectX + r, y + r, x, r, -1);
        }
        else if (x > rectX + width - r) {
            // 在右侧圆角
            y = getYByCircle(rectX + width - r, y + r, x, r, -1);
        }
        anchors.push({
            id: String(anchors.length),
            flag: 1,
            penId: pen.id,
            x: (x - rectX) / width,
            y: (y - rectY) / height,
        });
    }
    // 右三
    var rightN = 3; // 右侧节点数
    for (var i = 0; i < rightN; i++) {
        var y = rectY + (height * (i + 1)) / (rightN + 1);
        var x = rectX + width;
        if (y < rectY + r) {
            // 在上侧圆角以内
            x = getXByCircle(x - r, rectY + r, y, r);
        }
        else if (y > rectY + height - r) {
            // 下侧圆角
            x = getXByCircle(x - r, rectY + height - r, y, r);
        }
        anchors.push({
            id: String(anchors.length),
            flag: 1,
            penId: pen.id,
            x: (x - rectX) / width,
            y: (y - rectY) / height,
        });
    }
    // 下四
    var bottomN = 5; // 下侧节点数
    for (var i = 0; i < bottomN; i++) {
        if (i === 2) {
            continue;
        }
        var x = rectX + (width * (i + 1)) / (bottomN + 1);
        var y = rectY + height;
        if (x < rectX + r) {
            // 在左侧圆角
            y = getYByCircle(rectX + r, y - r, x, r);
        }
        else if (x > rectX + width - r) {
            // 在右侧圆角
            y = getYByCircle(rectX + width - r, y - r, x, r);
        }
        anchors.push({
            id: String(anchors.length),
            flag: 1,
            penId: pen.id,
            x: (x - rectX) / width,
            y: (y - rectY) / height,
        });
    }
    // 左三
    var leftN = 3; // 左侧节点数
    for (var i = 0; i < leftN; i++) {
        var y = rectY + (height * (i + 1)) / (leftN + 1);
        var x = rectX;
        if (y < rectY + r) {
            // 在上侧圆角以内
            x = getXByCircle(x + r, rectY + r, y, r, -1);
        }
        else if (y > rectY + height - r) {
            // 下侧圆角
            x = getXByCircle(x + r, rectY + height - r, y, r, -1);
        }
        anchors.push({
            id: String(anchors.length),
            flag: 1,
            penId: pen.id,
            x: (x - rectX) / width,
            y: (y - rectY) / height,
        });
    }
    pen.anchors = anchors;
}
/**
 * 得到元素实际计算半径
 * @param node 元素
 * @returns 元素实际半径
 */
function borderRadius(pen) {
    var wr = pen.calculative.borderRadius || 0;
    var hr = pen.calculative.borderRadius || 0;
    var width = pen.width, height = pen.height;
    if (pen.calculative.borderRadius < 1) {
        wr = width * pen.calculative.borderRadius;
        hr = height * pen.calculative.borderRadius;
    }
    var r = wr < hr ? wr : hr;
    if (width < 2 * r) {
        r = width / 2;
    }
    if (height < 2 * r) {
        r = height / 2;
    }
    return r;
}
/**
 * 获取圆的 x 坐标
 * @param ox 圆心x
 * @param oy 圆心y
 * @param y y
 * @param r 半径
 * @param sqrt 点可能在左侧，左侧填-1，右侧1（默认值）
 */
function getXByCircle(ox, oy, y, r, sqrt) {
    if (sqrt === void 0) { sqrt = 1; }
    return sqrt * Math.sqrt(Math.pow(r, 2) - Math.pow((y - oy), 2)) + ox;
}
/**
 * 获取圆的 y 坐标
 * @param ox 圆心x
 * @param oy 圆心y
 * @param y y
 * @param r 半径
 * @param sqrt 点可以在上侧，也可能在下侧，上侧-1，下侧1（默认）
 */
function getYByCircle(ox, oy, x, r, sqrt) {
    if (sqrt === void 0) { sqrt = 1; }
    return sqrt * Math.sqrt(Math.pow(r, 2) - Math.pow((x - ox), 2)) + oy;
}
//# sourceMappingURL=mindNode.js.map