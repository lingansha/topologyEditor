import { getRect } from '../rect';
var Scroll = /** @class */ (function () {
    function Scroll(parent) {
        var _this = this;
        this.parent = parent;
        this.onMouseDownH = function (e) {
            e.preventDefault();
            e.stopPropagation();
            _this.isDownH = e.x;
            _this.x = _this.parent.store.data.x || 0;
            _this.lastScrollX = _this.scrollX;
        };
        this.onMouseDownV = function (e) {
            e.preventDefault();
            e.stopPropagation();
            _this.isDownV = e.y;
            _this.y = _this.parent.store.data.y || 0;
            _this.lastScrollY = _this.scrollY;
        };
        this.onMouseMove = function (e) {
            if (_this.isDownH) {
                var x = e.x - _this.isDownH;
                _this.scrollX = _this.lastScrollX + x;
                _this.h.style.left = _this.scrollX + "px";
                _this.parent.store.data.x = _this.x - (x * _this.rect.width) / _this.parent.parentElement.clientWidth;
            }
            if (_this.isDownV) {
                var y = e.y - _this.isDownV;
                _this.scrollY = _this.lastScrollY + y;
                _this.v.style.top = _this.scrollY + "px";
                _this.parent.store.data.y = _this.y - (y * _this.rect.height) / _this.parent.parentElement.clientHeight;
            }
            if (_this.isDownH || _this.isDownV) {
                _this.parent.onMovePens();
                _this.parent.canvasImage.init();
                _this.parent.canvasImageBottom.init();
                _this.parent.render();
            }
        };
        this.onMouseUp = function (e) {
            if (!_this.isDownH && !_this.isDownV) {
                return;
            }
            _this.isDownH = undefined;
            _this.isDownV = undefined;
            if (_this.scrollX < 20) {
                _this.scrollX = 20;
                _this.h.style.left = _this.scrollX + "px";
            }
            else if (_this.scrollX > _this.parent.parentElement.clientWidth - _this.hSize - 20) {
                _this.scrollX = _this.parent.parentElement.clientWidth - _this.hSize - 20;
                _this.h.style.left = _this.scrollX + "px";
            }
            if (_this.scrollY < 20) {
                _this.scrollY = 20;
                _this.v.style.top = _this.scrollY + "px";
            }
            else if (_this.scrollY > _this.parent.parentElement.clientHeight - _this.vSize - 20) {
                _this.scrollY = _this.parent.parentElement.clientHeight - _this.vSize - 20;
                _this.v.style.top = _this.scrollY + "px";
            }
            _this.resize();
        };
        this.h = document.createElement('div');
        this.v = document.createElement('div');
        this.parent.externalElements.appendChild(this.h);
        this.parent.externalElements.appendChild(this.v);
        this.h.className = 'topology-scroll h';
        this.h.onmousedown = this.onMouseDownH;
        this.v.className = 'topology-scroll v';
        this.v.onmousedown = this.onMouseDownV;
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
        var sheet;
        for (var i = 0; i < document.styleSheets.length; i++) {
            if (document.styleSheets[i].title === 'le5le/scroll') {
                sheet = document.styleSheets[i];
            }
        }
        if (!sheet) {
            var style = document.createElement('style');
            style.type = 'text/css';
            style.title = 'le5le.com/scroll';
            document.head.appendChild(style);
            style = document.createElement('style');
            style.type = 'text/css';
            document.head.appendChild(style);
            sheet = style.sheet;
            sheet.insertRule('.topology-scroll{position:absolute;width:8px;height:200px;background:#dddddd;border-radius:10px;z-index:20;cursor:default;}');
            sheet.insertRule('.topology-scroll:hover{background:#cccccc;cursor:pointer}');
            sheet.insertRule('.topology-scroll.v{right:0;top:calc(50% - 100px);}');
            sheet.insertRule('.topology-scroll.h{bottom:2px;left:calc(50% - 100px);width:200px;height:8px;}');
        }
        this.init();
    }
    Scroll.prototype.init = function () {
        this.isShow = true;
        this.resize();
        this.initPos();
    };
    Scroll.prototype.initPos = function () {
        this.scrollX = (this.parent.parentElement.clientWidth - this.hSize) / 2;
        this.scrollY = (this.parent.parentElement.clientHeight - this.vSize) / 2;
        this.h.style.left = this.scrollX + "px";
        this.v.style.top = this.scrollY + "px";
    };
    Scroll.prototype.resize = function () {
        this.rect = getRect(this.parent.store.data.pens);
        if (this.rect.width < 1400) {
            this.rect.width = 1400;
        }
        if (this.rect.height < 900) {
            this.rect.height = 900;
        }
        if (this.parent.store.data.x > 0) {
            this.rect.width += this.parent.store.data.x + (this.rect.x > 0 ? 0 : this.rect.x);
        }
        else {
            this.rect.width -= this.parent.store.data.x + (this.rect.x > 0 ? 0 : this.rect.x);
        }
        if (this.parent.store.data.y > 0) {
            this.rect.height += this.parent.store.data.y + (this.rect.y > 0 ? 0 : this.rect.y);
        }
        else {
            this.rect.height -= this.parent.store.data.y + (this.rect.y > 0 ? 0 : this.rect.y);
        }
        if (this.rect.width < 1400) {
            this.rect.width = 1400;
        }
        if (this.rect.height < 900) {
            this.rect.height = 900;
        }
        this.hSize = (1000 * this.parent.parentElement.clientWidth) / this.rect.width / 3;
        this.vSize = (1000 * this.parent.parentElement.clientHeight) / this.rect.height / 3;
        this.h.style.width = this.hSize + 'px';
        this.v.style.height = this.vSize + 'px';
    };
    Scroll.prototype.show = function () {
        this.isShow = true;
        this.h.style.display = "block";
        this.v.style.display = "block";
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    };
    Scroll.prototype.hide = function () {
        this.isShow = false;
        this.h.style.display = "none";
        this.v.style.display = "none";
        this.destroy();
    };
    Scroll.prototype.translate = function (x, y) {
        if (x) {
            this.scrollX -= (x * this.parent.parentElement.clientWidth) / this.rect.width;
            this.h.style.left = this.scrollX + "px";
        }
        if (y) {
            this.scrollY -= (y * this.parent.parentElement.clientHeight) / this.rect.height;
            this.v.style.top = this.scrollY + "px";
        }
    };
    Scroll.prototype.wheel = function (up) {
        var y = 10;
        if (up) {
            y = -10;
        }
        this.scrollY += y;
        this.v.style.top = this.scrollY + "px";
        this.parent.store.data.y -= (y * this.rect.height) / this.parent.parentElement.clientHeight;
        this.parent.onMovePens();
        this.parent.render();
    };
    Scroll.prototype.destroy = function () {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    };
    return Scroll;
}());
export { Scroll };
//# sourceMappingURL=scroll.js.map