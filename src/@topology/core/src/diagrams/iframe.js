import { setElemPosition } from '../pen';
export var iframes = {};
export function iframe(pen) {
    var _a;
    if (!pen.onDestroy) {
        pen.onDestroy = destory;
        pen.onMove = move;
        pen.onResize = move;
        pen.onRotate = move;
        pen.onValue = move;
        pen.onChangeId = changeId;
    }
    if (!iframes[pen.id]) {
        var iframe_1 = document.createElement('iframe');
        iframe_1.scrolling = 'no';
        iframe_1.frameBorder = '0';
        iframe_1.src = pen.iframe;
        iframes[pen.id] = iframe_1;
        pen.calculative.iframe = pen.iframe;
        (_a = pen.calculative.canvas.externalElements) === null || _a === void 0 ? void 0 : _a.appendChild(iframe_1);
        setElemPosition(pen, iframe_1);
    }
    else if (iframes[pen.id].getAttribute('src') !== pen.iframe) {
        iframes[pen.id].src = pen.iframe;
        pen.calculative.iframe = pen.iframe;
    }
    if (pen.calculative.patchFlags) {
        setElemPosition(pen, iframes[pen.id]);
    }
    return new Path2D();
}
function destory(pen) {
    iframes[pen.id].remove();
    iframes[pen.id] = undefined;
}
function move(pen) {
    if (!iframes[pen.id]) {
        return;
    }
    setElemPosition(pen, iframes[pen.id]);
    if (iframes[pen.id].getAttribute('src') !== pen.iframe) {
        iframes[pen.id].src = pen.iframe;
    }
}
function changeId(pen, oldId, newId) {
    if (!iframes[oldId]) {
        return;
    }
    iframes[newId] = iframes[oldId];
    delete iframes[oldId];
}
//# sourceMappingURL=iframe.js.map