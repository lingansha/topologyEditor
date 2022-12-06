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
import { ctxFlip, ctxRotate, drawImage, setGlobalAlpha } from '../pen';
import { rgba } from '../utils';
import { createOffscreen } from './offscreen';
var CanvasImage = /** @class */ (function () {
    function CanvasImage(parentElement, store, isBottom) {
        this.parentElement = parentElement;
        this.store = store;
        this.isBottom = isBottom;
        this.canvas = document.createElement('canvas');
        /**
         * 非图片的绘制
         * isBottom true 指背景颜色，背景网格
         * isBottom false 指 标尺
         */
        this.otherOffsreen = createOffscreen(); // 非图片的
        this.offscreen = createOffscreen();
        this.animateOffsScreen = createOffscreen();
        parentElement.appendChild(this.canvas);
        this.canvas.style.backgroundRepeat = 'no-repeat';
        this.canvas.style.backgroundSize = '100% 100%';
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
    }
    CanvasImage.prototype.resize = function (w, h) {
        this.canvas.style.width = w + 'px';
        this.canvas.style.height = h + 'px';
        w = (w * this.store.dpiRatio) | 0;
        h = (h * this.store.dpiRatio) | 0;
        this.canvas.width = w;
        this.canvas.height = h;
        this.otherOffsreen.width = w;
        this.otherOffsreen.height = h;
        this.offscreen.width = w;
        this.offscreen.height = h;
        this.animateOffsScreen.width = w;
        this.animateOffsScreen.height = h;
        this.otherOffsreen
            .getContext('2d')
            .scale(this.store.dpiRatio, this.store.dpiRatio);
        this.otherOffsreen.getContext('2d').textBaseline = 'middle';
        this.offscreen
            .getContext('2d')
            .scale(this.store.dpiRatio, this.store.dpiRatio);
        this.offscreen.getContext('2d').textBaseline = 'middle';
        this.animateOffsScreen
            .getContext('2d')
            .scale(this.store.dpiRatio, this.store.dpiRatio);
        this.animateOffsScreen.getContext('2d').textBaseline = 'middle';
        this.init();
    };
    CanvasImage.prototype.init = function () {
        var e_1, _a;
        this.offscreen
            .getContext('2d')
            .clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.animateOffsScreen
            .getContext('2d')
            .clearRect(0, 0, this.canvas.width, this.canvas.height);
        try {
            for (var _b = __values(this.store.data.pens), _c = _b.next(); !_c.done; _c = _b.next()) {
                var pen = _c.value;
                if (this.hasImage(pen)) {
                    // 只影响本层的
                    pen.calculative.imageDrawed = false;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.store.patchFlagsBackground = true;
        this.store.patchFlagsTop = true;
    };
    CanvasImage.prototype.clear = function () {
        this.otherOffsreen
            .getContext('2d')
            .clearRect(0, 0, this.otherOffsreen.width, this.otherOffsreen.height);
        this.offscreen
            .getContext('2d')
            .clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.animateOffsScreen
            .getContext('2d')
            .clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas
            .getContext('2d')
            .clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    CanvasImage.prototype.hasImage = function (pen) {
        pen.calculative.hasImage =
            pen.calculative &&
                pen.calculative.inView &&
                !pen.isBottom == !this.isBottom && // undefined == false 结果 false
                pen.image &&
                pen.calculative.img &&
                pen.name !== 'gif';
        return pen.calculative.hasImage;
    };
    CanvasImage.prototype.render = function () {
        var e_2, _a, e_3, _b, e_4, _c;
        var patchFlags = false;
        var patchFlagsAnimate = false;
        try {
            for (var _d = __values(this.store.data.pens), _e = _d.next(); !_e.done; _e = _d.next()) {
                var pen = _e.value;
                if (this.hasImage(pen)) {
                    if (this.store.animates.has(pen)) {
                        patchFlagsAnimate = true;
                    }
                    else if (!pen.calculative.imageDrawed) {
                        patchFlags = true;
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var patchFlagsBackground = this.store.patchFlagsBackground;
        if (patchFlagsBackground && this.isBottom) {
            var ctx = this.otherOffsreen.getContext('2d');
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            var background = this.store.data.background || this.store.options.background;
            if (background) {
                ctx.save();
                ctx.fillStyle = background;
                ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                ctx.restore();
            }
            this.renderGrid(ctx);
        }
        var patchFlagsTop = this.store.patchFlagsTop;
        if (patchFlagsTop && !this.isBottom) {
            var ctx = this.otherOffsreen.getContext('2d');
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.renderRule(ctx);
        }
        if (patchFlags) {
            var ctx = this.offscreen.getContext('2d');
            ctx.save();
            ctx.translate(this.store.data.x, this.store.data.y);
            try {
                for (var _f = __values(this.store.data.pens), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var pen = _g.value;
                    if (!pen.calculative.hasImage ||
                        pen.calculative.imageDrawed ||
                        this.store.animates.has(pen)) {
                        continue;
                    }
                    pen.calculative.imageDrawed = true;
                    ctx.save();
                    ctxFlip(ctx, pen);
                    if (pen.calculative.rotate) {
                        ctxRotate(ctx, pen);
                    }
                    setGlobalAlpha(ctx, pen);
                    drawImage(ctx, pen);
                    ctx.restore();
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                }
                finally { if (e_3) throw e_3.error; }
            }
            ctx.restore();
        }
        if (patchFlagsAnimate) {
            var ctx = this.animateOffsScreen.getContext('2d');
            ctx.save();
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.translate(this.store.data.x, this.store.data.y);
            try {
                for (var _h = __values(this.store.animates), _j = _h.next(); !_j.done; _j = _h.next()) {
                    var pen = _j.value;
                    if (!pen.calculative.hasImage) {
                        continue;
                    }
                    pen.calculative.imageDrawed = true;
                    ctx.save();
                    ctxFlip(ctx, pen);
                    if (pen.calculative.rotate) {
                        ctxRotate(ctx, pen);
                    }
                    setGlobalAlpha(ctx, pen);
                    drawImage(ctx, pen);
                    ctx.restore();
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                }
                finally { if (e_4) throw e_4.error; }
            }
            ctx.restore();
        }
        if (patchFlags ||
            patchFlagsAnimate ||
            (patchFlagsBackground && this.isBottom) ||
            (patchFlagsTop && !this.isBottom)) {
            var ctxCanvas = this.canvas.getContext('2d');
            ctxCanvas.clearRect(0, 0, this.canvas.width, this.canvas.height);
            if (this.isBottom) {
                ctxCanvas.drawImage(this.otherOffsreen, 0, 0, this.canvas.width, this.canvas.height);
                this.store.patchFlagsBackground = false;
            }
            ctxCanvas.drawImage(this.offscreen, 0, 0, this.canvas.width, this.canvas.height);
            ctxCanvas.drawImage(this.animateOffsScreen, 0, 0, this.canvas.width, this.canvas.height);
            if (!this.isBottom) {
                ctxCanvas.drawImage(this.otherOffsreen, 0, 0, this.canvas.width, this.canvas.height);
                this.store.patchFlagsTop = false;
            }
        }
    };
    CanvasImage.prototype.renderGrid = function (ctx) {
        var _a = this.store, data = _a.data, options = _a.options;
        var grid = data.grid, gridRotate = data.gridRotate, gridColor = data.gridColor, gridSize = data.gridSize, scale = data.scale;
        if (!(grid !== null && grid !== void 0 ? grid : options.grid)) {
            // grid false 时不绘制, undefined 时看 options.grid
            return;
        }
        ctx.save();
        var _b = this.canvas, width = _b.width, height = _b.height;
        if (gridRotate) {
            ctx.translate(width / 2, height / 2);
            ctx.rotate((gridRotate * Math.PI) / 180);
            ctx.translate(-width / 2, -height / 2);
        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = gridColor || options.gridColor;
        ctx.beginPath();
        var size = (gridSize || options.gridSize) * scale;
        var longSide = Math.max(width, height);
        var count = Math.ceil(longSide / size);
        for (var i = -size * count; i < longSide * 2; i += size) {
            ctx.moveTo(i, -longSide);
            ctx.lineTo(i, longSide * 2);
        }
        for (var i = -size * count; i < longSide * 2; i += size) {
            ctx.moveTo(-longSide, i);
            ctx.lineTo(longSide * 2, i);
        }
        ctx.stroke();
        ctx.restore();
    };
    CanvasImage.prototype.renderRule = function (ctx) {
        var _a = this.store, data = _a.data, options = _a.options;
        var rule = data.rule, ruleColor = data.ruleColor, scale = data.scale, origin = data.origin;
        if (!(rule !== null && rule !== void 0 ? rule : options.rule)) {
            // rule false 时不绘制, undefined 时看 options.rule
            return;
        }
        var span = scale * 10;
        ctx.save();
        var finalRuleColor = ruleColor || options.ruleColor;
        ctx.strokeStyle = rgba(finalRuleColor, 0.7);
        var x = origin.x + data.x;
        var y = origin.y + data.y;
        var _b = this.canvas, width = _b.width, height = _b.height;
        // horizontal rule
        ctx.beginPath();
        ctx.lineWidth = 12;
        ctx.lineDashOffset = -x % span;
        ctx.setLineDash([1, span - 1]);
        ctx.moveTo(0, 0);
        ctx.lineTo(width, 0);
        ctx.stroke();
        // vertical rule
        ctx.beginPath();
        ctx.lineDashOffset = -y % span;
        ctx.moveTo(0, 0);
        ctx.lineTo(0, height);
        ctx.stroke();
        // the big rule
        ctx.strokeStyle = finalRuleColor;
        ctx.beginPath();
        ctx.lineWidth = 24;
        ctx.lineDashOffset = -x % (span * 10);
        ctx.setLineDash([1, span * 10 - 1]);
        ctx.moveTo(0, 0);
        ctx.lineTo(width, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineDashOffset = -y % (span * 10);
        ctx.moveTo(0, 0);
        ctx.lineTo(0, height);
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = ctx.strokeStyle;
        var text = 0 - Math.floor(x / span / 10) * 100;
        if (x < 0) {
            text -= 100;
        }
        for (var i = x % (span * 10); i < width; i += 10 * span, text += 100) {
            if (span < 3 && text % 500) {
                continue;
            }
            ctx.fillText(text.toString(), i + 4, 16);
        }
        text = 0 - Math.floor(y / span / 10) * 100;
        if (y < 0) {
            text -= 100;
        }
        for (var i = y % (span * 10); i < height; i += 10 * span, text += 100) {
            if (span < 3 && text % 500) {
                continue;
            }
            ctx.save();
            ctx.beginPath();
            ctx.translate(16, i - 4);
            ctx.rotate((270 * Math.PI) / 180);
            ctx.fillText(text.toString(), 0, 0);
            ctx.restore();
        }
        ctx.restore();
    };
    return CanvasImage;
}());
export { CanvasImage };
//# sourceMappingURL=canvasImage.js.map