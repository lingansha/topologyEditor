import { calcRotate } from '../point';
import { getFromAnchor, getToAnchor } from './render';
var arrows = {};
export function renderFromArrow(ctx, pen, store) {
    if (!arrows[pen.fromArrow]) {
        return;
    }
    var from = getFromAnchor(pen);
    var x = from.x, y = from.y;
    var pt = { x: x, y: y };
    pt.step = (pen.fromArrowSize || 10) * store.data.scale;
    if (from.next) {
        pt.rotate = calcRotate(from.next, from) + 90;
    }
    else {
        var p = pen.calculative.worldAnchors[1];
        if (!p) {
            return;
        }
        if (p.prev) {
            pt.rotate = calcRotate(p.prev, from) + 90;
        }
        else {
            pt.rotate = calcRotate(p, from) + 90;
        }
    }
    ctx.save();
    ctx.beginPath();
    var fromArrowColor = pen.fromArrowColor || pen.calculative.color;
    fromArrowColor && (ctx.strokeStyle = fromArrowColor);
    arrows[pen.fromArrow](ctx, pen, store, pt);
    ctx.restore();
}
export function renderToArrow(ctx, pen, store) {
    if (!arrows[pen.toArrow] || pen.calculative.worldAnchors.length < 2) {
        return;
    }
    ctx.save();
    var to = getToAnchor(pen);
    var x = to.x, y = to.y;
    var pt = { x: x, y: y };
    pt.step = (pen.toArrowSize || 10) * store.data.scale;
    if (to.prev) {
        pt.rotate = calcRotate(to.prev, to) + 90;
    }
    else {
        var p = pen.calculative.worldAnchors[pen.calculative.worldAnchors.length - 2];
        if (p.next) {
            pt.rotate = calcRotate(p.next, to) + 90;
        }
        else {
            pt.rotate = calcRotate(p, to) + 90;
        }
    }
    ctx.beginPath();
    var toArrowColor = pen.toArrowColor || pen.calculative.color;
    toArrowColor && (ctx.strokeStyle = toArrowColor);
    arrows[pen.toArrow](ctx, pen, store, pt);
    ctx.restore();
}
arrows.triangleSolid = function (ctx, pen, store, point) {
    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.rotate((point.rotate * Math.PI) / 180);
    ctx.translate(-point.x, -point.y);
    var fromX = point.x - point.step;
    ctx.moveTo(fromX, point.y - point.step / 4);
    ctx.lineTo(point.x, point.y);
    ctx.lineTo(fromX, point.y + point.step / 4);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fill();
    ctx.restore();
};
arrows.triangle = function (ctx, pen, store, point) {
    ctx.save();
    if (ctx.lineWidth < 2) {
        ctx.lineWidth = 2;
    }
    ctx.translate(point.x, point.y);
    ctx.rotate((point.rotate * Math.PI) / 180);
    ctx.translate(-point.x, -point.y);
    var fromX = point.x - point.step;
    ctx.moveTo(fromX, point.y - point.step / 4);
    ctx.lineTo(point.x, point.y);
    ctx.lineTo(fromX, point.y + point.step / 4);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = store.data.background || '#ffffff';
    ctx.fill();
    ctx.restore();
};
arrows.circleSolid = function (ctx, pen, store, point) {
    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.rotate((point.rotate * Math.PI) / 180);
    ctx.translate(-point.x, -point.y);
    var r = point.step / 2;
    ctx.arc(point.x - r, point.y, r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fill();
    ctx.restore();
};
arrows.circle = function (ctx, pen, store, point) {
    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.rotate((point.rotate * Math.PI) / 180);
    ctx.translate(-point.x, -point.y);
    var r = point.step / 2;
    ctx.arc(point.x - r, point.y, r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = store.data.background || '#ffffff';
    ctx.fill();
    ctx.restore();
};
arrows.diamondSolid = function (ctx, pen, store, point) {
    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.rotate((point.rotate * Math.PI) / 180);
    ctx.translate(-point.x, -point.y);
    var fromX = point.x - point.step;
    var r = point.step / 2;
    ctx.moveTo(fromX, point.y);
    ctx.lineTo(fromX + r, point.y - r / 2);
    ctx.lineTo(point.x, point.y);
    ctx.lineTo(fromX + r, point.y + r / 2);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fill();
    ctx.restore();
};
arrows.diamond = function (ctx, pen, store, point) {
    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.rotate((point.rotate * Math.PI) / 180);
    ctx.translate(-point.x, -point.y);
    var fromX = point.x - point.step;
    var r = point.step / 2;
    ctx.moveTo(fromX, point.y);
    ctx.lineTo(fromX + r, point.y - r / 2);
    ctx.lineTo(point.x, point.y);
    ctx.lineTo(fromX + r, point.y + r / 2);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = store.data.background || '#ffffff';
    ctx.fill();
    ctx.restore();
};
arrows.line = function (ctx, pen, store, point) {
    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.rotate((point.rotate * Math.PI) / 180);
    ctx.translate(-point.x, -point.y);
    var fromX = point.x - point.step;
    ctx.moveTo(fromX, point.y - point.step / 3);
    ctx.lineTo(point.x, point.y);
    ctx.lineTo(fromX, point.y + point.step / 3);
    ctx.stroke();
    ctx.restore();
};
arrows.lineUp = function (ctx, pen, store, point) {
    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.rotate((point.rotate * Math.PI) / 180);
    ctx.translate(-point.x, -point.y);
    var fromX = point.x - point.step;
    ctx.moveTo(fromX, point.y - point.step / 3);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    ctx.restore();
};
arrows.lineDown = function (ctx, pen, store, point) {
    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.rotate((point.rotate * Math.PI) / 180);
    ctx.translate(-point.x, -point.y);
    var fromX = point.x - point.step;
    ctx.moveTo(fromX, point.y + point.step / 3);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    ctx.restore();
};
//# sourceMappingURL=arrow.js.map