import { setElemPosition } from '../pen';
export var gifsList = {};
var gif_z_index = 0;
export function gif(pen) {
    if (!pen.onDestroy) {
        pen.onDestroy = destory;
        pen.onMove = move;
        pen.onResize = resize;
        pen.onRotate = move;
        pen.onValue = value;
        pen.onChangeId = changeId;
    }
    var path = new Path2D();
    if (!pen.image) {
        return;
    }
    if (!gifsList[pen.id]) {
        var img_1 = new Image();
        img_1.crossOrigin = 'anonymous';
        img_1.src = pen.image;
        gifsList[pen.id] = img_1; // 提前赋值，避免重复创建
        gif_z_index++;
        pen.calculative.zIndex = gif_z_index;
        img_1.onload = function () {
            var _a;
            pen.calculative.img = img_1;
            pen.calculative.imgNaturalWidth = img_1.naturalWidth || pen.iconWidth;
            pen.calculative.imgNaturalHeight = img_1.naturalHeight || pen.iconHeight;
            (_a = pen.calculative.canvas.externalElements) === null || _a === void 0 ? void 0 : _a.appendChild(img_1);
            setImagePosition(pen, img_1);
        };
    }
    if (pen.calculative.patchFlags && gifsList[pen.id]) {
        setImagePosition(pen, gifsList[pen.id]);
    }
    return path;
}
function destory(pen) {
    gifsList[pen.id].remove();
    gifsList[pen.id] = undefined;
}
function move(pen) {
    if (!gifsList[pen.id]) {
        return;
    }
    setImagePosition(pen, gifsList[pen.id]);
}
function resize(pen) {
    if (!gifsList[pen.id]) {
        return;
    }
    setImagePosition(pen, gifsList[pen.id]);
}
function value(pen) {
    if (!gifsList[pen.id]) {
        return;
    }
    setImagePosition(pen, gifsList[pen.id]);
    if (gifsList[pen.id].getAttribute('src') !== pen.image) {
        gifsList[pen.id].src = pen.image;
    }
}
function changeId(pen, oldId, newId) {
    if (!gifsList[oldId]) {
        return;
    }
    gifsList[newId] = gifsList[oldId];
    delete gifsList[oldId];
}
/**
 * gif 保持比例，除了更改 position ，还需要是否可保持比例
 * @param pen 画笔
 * @param elem 图片 dom
 */
function setImagePosition(pen, elem) {
    // topology canvas 绘制图片 drawImage 保持比例，是短边填充
    elem.style.objectFit = pen.imageRatio ? 'contain' : 'fill';
    setElemPosition(pen, elem);
}
//# sourceMappingURL=gif.js.map