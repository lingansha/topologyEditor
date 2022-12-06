import { createOffscreen } from './offscreen';
var MagnifierCanvas = /** @class */ (function () {
    function MagnifierCanvas(parentCanvas, parentElement, store) {
        this.parentCanvas = parentCanvas;
        this.parentElement = parentElement;
        this.store = store;
        this.canvas = document.createElement('canvas');
        this.magnifierScreen = createOffscreen();
        this.offscreen = createOffscreen();
        this.magnifierSize = 300;
        parentElement.appendChild(this.canvas);
        this.canvas.style.backgroundRepeat = 'no-repeat';
        this.canvas.style.backgroundSize = '100% 100%';
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
    }
    MagnifierCanvas.prototype.resize = function (w, h) {
        this.canvas.style.width = w + 'px';
        this.canvas.style.height = h + 'px';
        w = (w * this.store.dpiRatio) | 0;
        h = (h * this.store.dpiRatio) | 0;
        this.canvas.width = w;
        this.canvas.height = h;
        this.offscreen.width = w;
        this.offscreen.height = h;
        this.offscreen
            .getContext('2d')
            .scale(this.store.dpiRatio, this.store.dpiRatio);
        this.offscreen.getContext('2d').textBaseline = 'middle';
        this.magnifierScreen.width = this.magnifierSize + 5;
        this.magnifierScreen.height = this.magnifierSize + 5;
    };
    /**
     * 绘制到 该画布的 离屏层
     */
    MagnifierCanvas.prototype.renderMagnifier = function () {
        var _this = this;
        if (!this.magnifier) {
            return;
        }
        var r = this.magnifierSize / 2;
        var size = this.magnifierSize + 5;
        var ctx = this.magnifierScreen.getContext('2d');
        ctx.clearRect(0, 0, size, size);
        ctx.lineWidth = 5;
        ctx.save();
        ctx.translate(2.5, 2.5);
        ctx.save();
        ctx.arc(r, r, r, 0, Math.PI * 2, false);
        ctx.clip();
        ctx.fillStyle =
            this.store.data.background || this.store.options.background || '#f4f4f4';
        ctx.fillRect(0, 0, size, size);
        ctx.translate(-r, -r);
        ctx.scale(2, 2);
        var pt = {
            x: (this.parentCanvas.mousePos.x + this.store.data.x) *
                this.store.dpiRatio,
            y: (this.parentCanvas.mousePos.y + this.store.data.y) *
                this.store.dpiRatio,
        };
        var drawOffscreens = [
            this.parentCanvas.canvasImageBottom.offscreen,
            this.parentCanvas.canvasImageBottom.animateOffsScreen,
            this.parentCanvas.offscreen,
            this.parentCanvas.canvasImage.offscreen,
            this.parentCanvas.canvasImage.animateOffsScreen,
        ];
        drawOffscreens.forEach(function (offscreen) {
            ctx.drawImage(offscreen, pt.x - r, pt.y - r, _this.magnifierSize, _this.magnifierSize, 0, 0, _this.magnifierSize, _this.magnifierSize);
        });
        ctx.restore();
        ctx.beginPath();
        var gradient = ctx.createRadialGradient(r, r, r - 5, r, r, r);
        gradient.addColorStop(0, 'rgba(0,0,0,0.2)');
        gradient.addColorStop(0.8, 'rgb(200,200,200)');
        gradient.addColorStop(0.9, 'rgb(200,200,200)');
        gradient.addColorStop(1.0, 'rgba(200,200,200,0.9)');
        ctx.strokeStyle = gradient;
        ctx.arc(r, r, r, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.restore();
        var offscreenCtx = this.offscreen.getContext('2d');
        offscreenCtx.drawImage(this.magnifierScreen, 0, 0, this.magnifierSize + 5, this.magnifierSize + 5, (pt.x - r - 2.5) / this.store.dpiRatio, (pt.y - r - 2.5) / this.store.dpiRatio, (this.magnifierSize + 5) / this.store.dpiRatio, (this.magnifierSize + 5) / this.store.dpiRatio);
    };
    MagnifierCanvas.prototype.render = function () {
        this.offscreen
            .getContext('2d')
            .clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderMagnifier();
        var ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(this.offscreen, 0, 0, this.canvas.width, this.canvas.height);
    };
    return MagnifierCanvas;
}());
export { MagnifierCanvas };
//# sourceMappingURL=magnifierCanvas.js.map