import { calcRightBottom, getRect, translateRect } from '../rect';
var ViewMap = /** @class */ (function () {
    function ViewMap(parent) {
        var _this = this;
        this.parent = parent;
        this.boxWidth = 320;
        this.boxHeight = 180;
        this.ratio = this.boxWidth / this.boxHeight;
        this.padding = 5;
        this.onMouseDown = function (e) {
            e.preventDefault();
            e.stopPropagation();
            _this.isDown = true;
        };
        this.onMouseMove = function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (_this.isDown) {
                try {
                    _this.parent.gotoView(e.offsetX / _this.box.clientWidth, e.offsetY / _this.box.clientHeight);
                }
                catch (e) {
                    console.warn(e.message);
                    _this.isDown = false;
                }
            }
        };
        this.onMouseUp = function (e) {
            e.preventDefault();
            e.stopPropagation();
            try {
                _this.parent.gotoView(e.offsetX / _this.box.clientWidth, e.offsetY / _this.box.clientHeight);
            }
            catch (e) {
                console.warn(e.message);
            }
            finally {
                _this.isDown = false;
            }
        };
        this.box = document.createElement('div');
        this.img = new Image();
        this.view = document.createElement('div');
        this.box.appendChild(this.img);
        this.box.appendChild(this.view);
        this.parent.externalElements.appendChild(this.box);
        this.box.className = 'topology-map';
        this.box.onmousedown = this.onMouseDown;
        this.box.onmousemove = this.onMouseMove;
        this.box.onmouseup = this.onMouseUp;
        var sheet;
        for (var i = 0; i < document.styleSheets.length; i++) {
            if (document.styleSheets[i].title === 'le5le/map') {
                sheet = document.styleSheets[i];
            }
        }
        if (!sheet) {
            var style = document.createElement('style');
            style.type = 'text/css';
            style.title = 'le5le.com/map';
            document.head.appendChild(style);
            style = document.createElement('style');
            style.type = 'text/css';
            document.head.appendChild(style);
            sheet = style.sheet;
            sheet.insertRule(".topology-map{display:flex;width:" + (this.boxWidth + 2 * this.padding) + "px;height:" + (this.boxHeight + 2 * this.padding) + "px;padding:" + this.padding + "px;background:#f4f4f4;border:1px solid #ffffff;box-shadow: 0px 0px 14px 0px rgba(0,10,38,0.30);border-radius:8px;position:absolute;z-index:20;right:0;bottom:0;justify-content:center;align-items:center;cursor:default;user-select:none;overflow: hidden;}");
            sheet.insertRule('.topology-map img{max-width:100%;max-height:100%;pointer-events: none;}');
            sheet.insertRule('.topology-map div{pointer-events: none;border:1px solid #1890ff;position:absolute}');
        }
    }
    ViewMap.prototype.show = function () {
        this.box.style.display = 'flex';
        var data = this.parent.store.data;
        if (data.pens.length) {
            this.img.style.display = 'block';
            this.img.src = this.parent.toPng();
            this.setView();
        }
        else {
            this.img.style.display = 'none';
        }
        this.isShow = true;
    };
    ViewMap.prototype.hide = function () {
        this.box.style.display = 'none';
        this.isShow = false;
    };
    ViewMap.prototype.setView = function () {
        var data = this.parent.store.data;
        if (data.pens.length) {
            var rect = getRect(data.pens);
            // rect += data.x y 得到相对坐标
            translateRect(rect, data.x, data.y);
            var rectRatio = rect.width / rect.height;
            if (rectRatio > this.ratio) {
                // 上下留白，扩大高度
                var height_1 = rect.width / this.ratio;
                rect.y -= (height_1 - rect.height) / 2;
                rect.height = height_1;
                calcRightBottom(rect);
            }
            else {
                // 左右留白，扩大宽度
                var width_1 = rect.height * this.ratio;
                rect.x -= (width_1 - rect.width) / 2;
                rect.width = width_1;
                calcRightBottom(rect);
            }
            var canvasRect = this.parent.canvasRect;
            var left = 0, top_1 = 0;
            if (rect.x < 0) {
                left = -rect.x / rect.width;
            }
            else if (rect.x + rect.width > canvasRect.width) {
                var space = 0;
                if (canvasRect.width > rect.width) {
                    // 均已左上角为起点，这种场景需要剪掉一个留白
                    space = canvasRect.width - rect.width;
                }
                left = (-rect.x + space) / rect.width;
            }
            if (rect.y < 0) {
                top_1 = -rect.y / rect.height;
            }
            else if (rect.y + rect.height > canvasRect.height) {
                var space = 0;
                if (canvasRect.height > rect.height) {
                    space = canvasRect.height - rect.height;
                }
                top_1 = (-rect.y + space) / rect.height;
            }
            var width = canvasRect.width > rect.width ? 1 : canvasRect.width / rect.width;
            var height = canvasRect.height > rect.height ? 1 : canvasRect.height / rect.height;
            this.view.style.left = this.padding + left * this.boxWidth + 'px';
            this.view.style.width = width * this.boxWidth + 'px';
            this.view.style.top = this.padding + top_1 * this.boxHeight + 'px';
            this.view.style.height = height * this.boxHeight + 'px';
        }
    };
    return ViewMap;
}());
export { ViewMap };
//# sourceMappingURL=map.js.map