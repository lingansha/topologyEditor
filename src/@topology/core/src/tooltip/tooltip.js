var Tooltip = /** @class */ (function () {
    function Tooltip(parentElement, store) {
        var _this = this;
        this.parentElement = parentElement;
        this.store = store;
        this.box = document.createElement('div');
        this.text = document.createElement('div');
        this.arrowUp = document.createElement('div');
        this.arrowDown = document.createElement('div');
        this.box.className = 'topology-tooltip';
        this.text.className = 'text';
        this.arrowUp.className = 'arrow';
        this.arrowDown.className = 'arrow down';
        this.box.appendChild(this.text);
        this.box.appendChild(this.arrowUp);
        this.box.appendChild(this.arrowDown);
        parentElement.appendChild(this.box);
        this.box.onmouseleave = function () {
            _this.hide();
            _this.store.lastHover = undefined;
        };
        var sheet;
        for (var i = 0; i < document.styleSheets.length; i++) {
            if (document.styleSheets[i].title === 'le5le.com/tooltip') {
                sheet = document.styleSheets[i];
            }
        }
        if (!sheet) {
            var style = document.createElement('style');
            style.type = 'text/css';
            style.title = 'le5le.com/tooltip';
            document.head.appendChild(style);
            style = document.createElement('style');
            style.type = 'text/css';
            document.head.appendChild(style);
            sheet = style.sheet;
            sheet.insertRule('.topology-tooltip{position:absolute;padding:8px 0;z-index:10;left: -9999px;top: -9999px;}');
            sheet.insertRule('.topology-tooltip .text{max-width:320px;min-height:30px;max-height:400px;outline:none;padding:8px 16px;border-radius:4px;background:#777777;color:#ffffff;line-height:1.8;overflow-y:auto;}');
            sheet.insertRule('.topology-tooltip .arrow{position:absolute;border:6px solid transparent;background:transparent;top:-4px;left:50%;transform:translateX(-50%)}');
            sheet.insertRule('.topology-tooltip .arrow.down{top:initial;bottom: 1.5px;}');
        }
    }
    /**
     * 通过 pen 的 titleFn titleFnJs title 来获取 title
     * @returns 此次应该展示的 title
     */
    Tooltip.getTitle = function (pen) {
        if (pen.titleFnJs && !pen.titleFn) {
            try {
                pen.titleFn = new Function('pen', pen.titleFnJs);
            }
            catch (error) {
                console.log('titleFnJs', error);
            }
        }
        return pen.titleFn ? pen.titleFn(pen) : String(pen.title);
    };
    /**
     * 更改 tooltip dom 的文本
     * @returns 返回设置前的 rect
     */
    Tooltip.prototype.setText = function (pen) {
        var oldElemRect = this.box.getBoundingClientRect();
        var marked = globalThis.marked;
        var title = Tooltip.getTitle(pen);
        if (marked) {
            this.text.innerHTML = marked(title);
            var a = this.text.getElementsByTagName('A');
            for (var i = 0; i < a.length; ++i) {
                a[i].setAttribute('target', '_blank');
            }
        }
        else {
            this.text.innerHTML = title;
        }
        return oldElemRect;
    };
    /**
     * 更新文字
     */
    Tooltip.prototype.updateText = function (pen) {
        var _a;
        if (((_a = this.currentPen) === null || _a === void 0 ? void 0 : _a.id) !== pen.id) {
            return;
        }
        if (Tooltip.titleEmpty(pen)) {
            return;
        }
        var oldRect = this.setText(pen);
        var newRect = this.box.getBoundingClientRect();
        this.changePositionByText(oldRect, newRect);
    };
    /**
     * 改变文字会 影响 box 的大小，需要重新设置位置
     * @param oldRect 原
     * @param newRect 新
     */
    Tooltip.prototype.changePositionByText = function (oldRect, newRect) {
        this.x -= (newRect.width - oldRect.width) / 2;
        this.y -= newRect.height - oldRect.height;
        this.box.style.left = this.x + 'px';
        this.box.style.top = this.y + 'px';
    };
    Tooltip.titleEmpty = function (pen) {
        return !pen.title && !pen.titleFn && !pen.titleFnJs;
    };
    Tooltip.prototype.show = function (pen, pos) {
        this.currentPen = pen;
        if (Tooltip.titleEmpty(pen)) {
            return;
        }
        this.setText(pen);
        var elemRect = this.box.getBoundingClientRect();
        var rect = pen.calculative.worldRect;
        var x = pen.calculative.canvas.store.data.x + pos.x - elemRect.width / 2;
        var y = pen.calculative.canvas.store.data.y + pos.y - elemRect.height;
        if (!pen.type) {
            x =
                pen.calculative.canvas.store.data.x +
                    rect.x -
                    (elemRect.width - rect.width) / 2;
            y =
                pen.calculative.canvas.store.data.y +
                    rect.ey -
                    elemRect.height -
                    rect.height;
        }
        if (y > 0) {
            this.arrowUp.style.borderBottomColor = 'transparent';
            this.arrowDown.style.borderTopColor = '#777777';
        }
        else {
            y += elemRect.height + rect.height + 5;
            this.arrowUp.style.borderBottomColor = '#777777';
            this.arrowDown.style.borderTopColor = 'transparent';
        }
        this.x = x;
        this.y = y;
        this.box.style.left = this.x + 'px';
        this.box.style.top = this.y + 'px';
    };
    Tooltip.prototype.hide = function () {
        this.currentPen = null;
        this.x = -9999;
        this.box.style.left = '-9999px';
    };
    Tooltip.prototype.translate = function (x, y) {
        if (this.x < -1000) {
            return;
        }
        this.x += x;
        this.y += y;
        this.box.style.left = this.x + 'px';
        this.box.style.top = this.y + 'px';
    };
    Tooltip.prototype.destroy = function () {
        this.box.onmouseleave = null;
    };
    return Tooltip;
}());
export { Tooltip };
//# sourceMappingURL=tooltip.js.map