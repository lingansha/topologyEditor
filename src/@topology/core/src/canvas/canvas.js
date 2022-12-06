var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
import { KeydownType } from '../options';
import { addLineAnchor, calcIconRect, calcTextRect, calcWorldAnchors, calcWorldRects, LockState, nearestAnchor, PenType, pushPenAnchor, removePenAnchor, renderPen, scalePen, translateLine, deleteTempAnchor, connectLine, disconnectLine, getAnchor, calcAnchorDock, calcMoveDock, calcTextLines, setNodeAnimate, setLineAnimate, calcPenRect, setChildrenActive, getParent, setHover, randomId, getPensLock, getToAnchor, getFromAnchor, calcPadding, getPensDisableRotate, getPensDisableResize, needCalcTextRectProps, calcResizeDock, needPatchFlagsPenRectProps, needCalcIconRectProps, isDomShapes, renderPenRaw, needSetPenProps, getAllChildren, calcInView, isShowChild, getTextColor, getGlobalColor, clearLifeCycle, rotatePen, } from '../pen';
import { calcRotate, distance, hitPoint, PrevNextType, rotatePoint, samePoint, scalePoint, translatePoint, TwoWay, } from '../point';
import { calcCenter, calcRightBottom, calcRelativePoint, getRect, getRectOfPoints, pointInRect, pointInSimpleRect, rectInRect, rectToPoints, resizeRect, translateRect, } from '../rect';
import { EditType, globalStore, } from '../store';
import { deepClone, fileToBase64, uploadFile, formatPadding, isMobile, rgba, s8, } from '../utils';
import { inheritanceProps, defaultCursors, defaultDrawLineFns, HotkeyType, HoverType, MouseRight, rotatedCursors, } from '../data';
import { createOffscreen } from './offscreen';
import { curve, mind, getLineLength, getLineRect, pointInLine, simplify, smoothLine, lineSegment, getLineR, lineInRect, } from '../diagrams';
import { polyline, translatePolylineAnchor } from '../diagrams/line/polyline';
import { Tooltip } from '../tooltip';
import { Scroll } from '../scroll';
import { CanvasImage } from './canvasImage';
import { MagnifierCanvas } from './magnifierCanvas';
import { lockedError } from '../utils/error';
export var movingSuffix = '-moving';
var Canvas = /** @class */ (function () {
    function Canvas(parent, parentElement, store) {
        var _this = this;
        this.parent = parent;
        this.parentElement = parentElement;
        this.store = store;
        this.canvas = document.createElement('canvas');
        this.offscreen = createOffscreen();
        this.externalElements = document.createElement('div');
        this.lastRotate = 0;
        this.hoverType = HoverType.None;
        this.resizeIndex = 0;
        this.lastOffsetX = 0;
        this.lastOffsetY = 0;
        this.drawLineFns = __spreadArray([], __read(defaultDrawLineFns), false);
        this.patchFlagsLines = new Set();
        this.lastMouseTime = 0;
        this.hoverTimer = 0;
        this.patchFlags = false;
        this.lastRender = 0;
        this.touchStart = 0;
        this.lastAnimateRender = 0;
        this.animateRendering = false;
        this.pointSize = 8;
        this.pasteOffset = 10;
        this.inputParent = document.createElement('div');
        // input = document.createElement('textarea');
        this.inputDiv = document.createElement('div');
        this.inputRight = document.createElement('div');
        this.dropdown = document.createElement('ul');
        this.mousePos = { x: 0, y: 0 };
        this.stopPropagation = function (e) {
            e.stopPropagation();
        };
        this.curve = curve;
        this.polyline = polyline;
        this.mind = mind;
        this.line = lineSegment;
        this.onCopy = function (event) {
            if (_this.store.options.disableClipboard) {
                return;
            }
            if (event.target !== _this.externalElements &&
                event.target !== document.body &&
                event.target.offsetParent !== _this.externalElements) {
                return;
            }
            _this.copy();
        };
        this.onCut = function (event) {
            if (_this.store.options.disableClipboard) {
                return;
            }
            if (event.target !== _this.externalElements &&
                event.target !== document.body &&
                event.target.offsetParent !== _this.externalElements) {
                return;
            }
            _this.cut();
        };
        this.onPaste = function (event) {
            if (_this.store.options.disableClipboard) {
                return;
            }
            if (event.target !== _this.externalElements &&
                event.target !== document.body &&
                event.target.offsetParent !== _this.externalElements) {
                return;
            }
            // 是否粘贴图片
            var hasImages;
            if (navigator.clipboard && event.clipboardData) {
                var items = event.clipboardData.items;
                if (items) {
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].type.indexOf('image') !== -1 && items[i].getAsFile()) {
                            hasImages = true;
                            break;
                        }
                    }
                }
            }
            if (hasImages) {
                var items = event.clipboardData.items;
                if (items) {
                    var _loop_1 = function (i) {
                        if (items[i].type.indexOf('image') !== -1 && items[i].getAsFile()) {
                            var _a = _this.mousePos, x_1 = _a.x, y_1 = _a.y;
                            var blob = items[i].getAsFile();
                            var name_1 = items[i].type.slice(6) === 'gif' ? 'gif' : 'image';
                            if (blob !== null) {
                                var base64_str_1;
                                var reader = new FileReader();
                                reader.onload = function (e) {
                                    base64_str_1 = e.target.result;
                                    var image = new Image();
                                    image.src = base64_str_1;
                                    image.onload = function () {
                                        var width = image.width, height = image.height;
                                        var pen = {
                                            name: name_1,
                                            x: x_1 - 50 / 2,
                                            y: y_1 - (height / width) * 50,
                                            externElement: name_1 === 'gif',
                                            width: 100,
                                            height: (height / width) * 100,
                                            image: base64_str_1,
                                        };
                                        _this.addPens([pen]);
                                        _this.active([pen]);
                                        _this.copy([pen]);
                                    };
                                };
                                reader.readAsDataURL(blob);
                            }
                        }
                    };
                    for (var i = 0; i < items.length; i++) {
                        _loop_1(i);
                    }
                }
            }
            else {
                _this.paste();
            }
        };
        this.onwheel = function (e) {
            //输入模式不允许滚动
            if (_this.inputDiv.contentEditable === 'true') {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            if (_this.store.options.scroll && !e.ctrlKey && !e.metaKey && _this.scroll) {
                _this.scroll.wheel(e.deltaY < 0);
                return;
            }
            if (_this.store.options.disableScale) {
                return;
            }
            if (_this.store.data.locked === LockState.Disable)
                return;
            if (_this.store.data.locked === LockState.DisableScale)
                return;
            if (_this.store.data.locked === LockState.DisableMoveScale)
                return;
            // 触摸板平移
            var isTouchPad = !(!e.deltaX && e.deltaY);
            var now = performance.now();
            if (now - _this.touchStart < 50) {
                return;
            }
            _this.touchStart = now;
            var x = e.offsetX, y = e.offsetY;
            if (isTouchPad) {
                _this.translate(e.deltaX, e.deltaY);
            }
            else {
                if (e.deltaY < 0) {
                    _this.scale(_this.store.data.scale + 0.1, { x: x, y: y });
                }
                else {
                    _this.scale(_this.store.data.scale - 0.1, { x: x, y: y });
                }
            }
            _this.externalElements.focus(); // 聚焦
        };
        this.onkeydown = function (e) {
            var _a, _b, _c;
            if (_this.store.data.locked >= LockState.DisableEdit ||
                e.target.tagName === 'INPUT' ||
                e.target.tagName === 'TEXTAREA') {
                return;
            }
            var x = 10;
            var y = 10;
            switch (e.key) {
                case ' ':
                    _this.hotkeyType = HotkeyType.Translate;
                    break;
                case 'Control':
                    if (_this.drawingLine) {
                        _this.drawingLine.calculative.drawlineH =
                            !_this.drawingLine.calculative.drawlineH;
                    }
                    else if (!_this.hotkeyType) {
                        _this.patchFlags = true;
                        _this.hotkeyType = HotkeyType.Select;
                    }
                    break;
                case 'Meta':
                    break;
                case 'Shift':
                    if (_this.store.active.length === 1 &&
                        _this.store.active[0].type &&
                        _this.store.activeAnchor) {
                        _this.toggleAnchorHand();
                    }
                    else if (!_this.hotkeyType) {
                        _this.patchFlags = true;
                        _this.hotkeyType = HotkeyType.Resize;
                    }
                    break;
                case 'Alt':
                    if (_this.drawingLine) {
                        var to = getToAnchor(_this.drawingLine);
                        if (to !== _this.drawingLine.calculative.activeAnchor) {
                            deleteTempAnchor(_this.drawingLine);
                            _this.drawingLine.calculative.worldAnchors.push(to);
                        }
                        else {
                            _this.drawingLine.calculative.worldAnchors.push({
                                x: to.x,
                                y: to.y,
                            });
                        }
                        var index = _this.drawLineFns.indexOf(_this.drawingLineName);
                        _this.drawingLineName =
                            _this.drawLineFns[(index + 1) % _this.drawLineFns.length];
                        _this.drawingLine.lineName = _this.drawingLineName;
                        _this.drawline();
                        _this.patchFlags = true;
                    }
                    e.preventDefault();
                    break;
                case 'a':
                case 'A':
                    if (e.ctrlKey || e.metaKey) {
                        // TODO: ctrl + A 会选中 visible == false 的元素
                        _this.active(_this.store.data.pens.filter(function (pen) { return !pen.parentId && pen.locked !== LockState.Disable; }));
                        e.preventDefault();
                    }
                    else {
                        _this.toggleAnchorMode();
                    }
                    break;
                case 'Delete':
                case 'Backspace':
                    !_this.store.data.locked && _this.delete();
                    break;
                case 'ArrowLeft':
                    if (_this.movingAnchor) {
                        _this.translateAnchor(-1, 0);
                        break;
                    }
                    x = -10;
                    if (e.shiftKey) {
                        x = -5;
                    }
                    if (e.ctrlKey || e.metaKey) {
                        x = -1;
                    }
                    _this.translatePens(_this.store.active, x, 0);
                    break;
                case 'ArrowUp':
                    if (_this.movingAnchor) {
                        _this.translateAnchor(0, -1);
                        break;
                    }
                    y = -10;
                    if (e.shiftKey) {
                        y = -5;
                    }
                    if (e.ctrlKey || e.metaKey) {
                        y = -1;
                    }
                    _this.translatePens(_this.store.active, 0, y);
                    break;
                case 'ArrowRight':
                    if (_this.movingAnchor) {
                        _this.translateAnchor(1, 0);
                        break;
                    }
                    if (e.shiftKey) {
                        x = 5;
                    }
                    if (e.ctrlKey || e.metaKey) {
                        x = 1;
                    }
                    _this.translatePens(_this.store.active, x, 0);
                    break;
                case 'ArrowDown':
                    if (_this.movingAnchor) {
                        _this.translateAnchor(0, 1);
                        break;
                    }
                    if (e.shiftKey) {
                        y = 5;
                    }
                    if (e.ctrlKey || e.metaKey) {
                        y = 1;
                    }
                    _this.translatePens(_this.store.active, 0, y);
                    break;
                case 'd':
                case 'D':
                    if (!((_a = _this.store.active[0]) === null || _a === void 0 ? void 0 : _a.locked)) {
                        _this.removeAnchorHand();
                    }
                    break;
                case 'h':
                case 'H':
                    if (!((_b = _this.store.active[0]) === null || _b === void 0 ? void 0 : _b.locked)) {
                        _this.addAnchorHand();
                    }
                    break;
                case 'm':
                case 'M':
                    _this.toggleMagnifier();
                    break;
                case 'g':
                case 'G':
                    // 进入移动瞄点状态
                    if (_this.hoverType === HoverType.NodeAnchor) {
                        _this.movingAnchor = _this.store.hoverAnchor;
                        _this.externalElements.style.cursor = 'move';
                    }
                    break;
                case 's':
                case 'S':
                    // 分割线
                    if (!_this.store.data.locked &&
                        _this.hoverType === HoverType.LineAnchor &&
                        _this.store.hover === _this.store.active[0]) {
                        _this.splitLine(_this.store.active[0], _this.store.hoverAnchor);
                    }
                    break;
                case 'c':
                case 'C':
                    if ((e.ctrlKey || e.metaKey) && _this.store.options.disableClipboard) {
                        _this.copy();
                    }
                    break;
                case 'x':
                case 'X':
                    if ((e.ctrlKey || e.metaKey) && _this.store.options.disableClipboard) {
                        _this.cut();
                    }
                    break;
                case 'v':
                case 'V':
                    if (!e.ctrlKey && !e.metaKey) {
                        if (_this.drawingLineName) {
                            _this.finishDrawline();
                            _this.drawingLineName = '';
                        }
                        else {
                            _this.drawingLineName = _this.store.options.drawingLineName;
                        }
                    }
                    if ((e.ctrlKey || e.metaKey) && _this.store.options.disableClipboard) {
                        _this.paste();
                    }
                    break;
                case 'b':
                case 'B':
                    _this.drawingPencil();
                    break;
                case 'y':
                case 'Y':
                    if (e.ctrlKey || e.metaKey) {
                        _this.redo();
                    }
                    break;
                case 'z':
                case 'Z':
                    if (e.ctrlKey || e.metaKey) {
                        _this.undo();
                    }
                    else if (e.shiftKey) {
                        _this.redo();
                    }
                    break;
                case 'Enter':
                    if (_this.drawingLineName) {
                        _this.finishDrawline(true);
                        if (_this.store.active[0].anchors[0].connectTo) {
                            _this.drawingLineName = '';
                        }
                        else {
                            _this.drawingLineName = _this.store.options.drawingLineName;
                        }
                    }
                    if (_this.store.active) {
                        _this.store.active.forEach(function (pen) {
                            if (pen.type) {
                                pen.close = !pen.close;
                                _this.store.path2dMap.set(pen, globalStore.path2dDraws.line(pen));
                                getLineLength(pen);
                            }
                        });
                        _this.render();
                    }
                    break;
                case 'Escape':
                    if (_this.drawingLineName) {
                        _this.finishDrawline();
                    }
                    _this.drawingLineName = undefined;
                    _this.stopPencil();
                    if (_this.movingPens) {
                        _this.getAllByPens(_this.movingPens).forEach(function (pen) {
                            _this.store.pens[pen.id] = undefined;
                        });
                        _this.movingPens = undefined;
                        _this.mouseDown = undefined;
                        _this.clearDock();
                        (_c = _this.store.active) === null || _c === void 0 ? void 0 : _c.forEach(function (pen) {
                            _this.updateLines(pen);
                        });
                        _this.calcActiveRect();
                        _this.patchFlags = true;
                    }
                    _this.hotkeyType = HotkeyType.None;
                    _this.movingAnchor = undefined;
                    if (_this.magnifierCanvas.magnifier) {
                        _this.magnifierCanvas.magnifier = false;
                        _this.patchFlags = true;
                    }
                    break;
            }
            _this.render(false);
        };
        this.onkeyup = function (e) {
            // switch (e.key) {
            //   case 'Alt':
            //     if (this.drawingLine) {
            //       this.store.options.autoAnchor = !this.store.options.autoAnchor;
            //     }
            //     break;
            // }
            if (_this.hotkeyType) {
                _this.render();
            }
            if (_this.hotkeyType < HotkeyType.AddAnchor) {
                _this.hotkeyType = HotkeyType.None;
            }
        };
        this.ondrop = function (event) { return __awaiter(_this, void 0, void 0, function () {
            var json, obj, files, isGif, pt, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.store.data.locked) {
                            console.warn('canvas is locked, can not drop');
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        // TODO: 若画布锁定，阻止默认行为不再执行。在 firefox 上拖拽图片会打开新页
                        event.preventDefault();
                        event.stopPropagation();
                        json = event.dataTransfer.getData('Topology') ||
                            event.dataTransfer.getData('Text');
                        obj = null;
                        if (!!json) return [3 /*break*/, 3];
                        files = event.dataTransfer.files;
                        if (!(files.length && files[0].type.match('image.*'))) return [3 /*break*/, 3];
                        isGif = files[0].type === 'image/gif';
                        return [4 /*yield*/, this.fileToPen(files[0], isGif)];
                    case 2:
                        obj = _a.sent();
                        _a.label = 3;
                    case 3:
                        !obj && (obj = JSON.parse(json));
                        obj = Array.isArray(obj) ? obj : [obj];
                        pt = { x: event.offsetX, y: event.offsetY };
                        this.calibrateMouse(pt);
                        this.dropPens(obj, pt);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.ontouchstart = function (e) {
            if (_this.store.data.locked === LockState.Disable) {
                return;
            }
            if (_this.touchStartTimer) {
                clearTimeout(_this.touchStartTimer);
            }
            _this.touchStartTimer = setTimeout(function () {
                _this.touchStart = performance.now();
                var x = e.touches[0].pageX - _this.clientRect.x;
                var y = e.touches[0].pageY - _this.clientRect.y;
                var pos = { x: x, y: y };
                _this.calibrateMouse(pos);
                _this.getHover(pos);
                _this.onMouseDown({
                    x: x,
                    y: y,
                    clientX: e.touches[0].clientX,
                    clientY: e.touches[0].clientY,
                    pageX: e.touches[0].pageX,
                    pageY: e.touches[0].pageY,
                    ctrlKey: e.ctrlKey || e.metaKey,
                    shiftKey: e.shiftKey,
                    altKey: e.altKey,
                    buttons: 1,
                });
                if (e.touches.length === 2) {
                    _this.initTouchDis = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);
                    _this.initScale = _this.store.data.scale;
                    _this.startTouches = e.touches;
                    _this.touchCenter = {
                        x: e.touches[0].pageX +
                            (e.touches[1].pageX - e.touches[0].pageX) / 2 -
                            _this.clientRect.x,
                        y: e.touches[0].pageY +
                            (e.touches[1].pageY - e.touches[0].pageY) / 2 -
                            _this.clientRect.y,
                    };
                    return;
                }
                else if (e.touches.length === 3) {
                    _this.store.emitter.emit('contextmenu', {
                        e: {
                            x: x,
                            y: y,
                            clientX: e.touches[0].clientX,
                            clientY: e.touches[0].clientY,
                            pageX: e.touches[0].pageX,
                            pageY: e.touches[0].pageY,
                        },
                        clientRect: _this.clientRect,
                    });
                    e.preventDefault();
                    e.stopPropagation();
                }
                _this.touchStartTimer = undefined;
            }, 50);
        };
        this.ontouchmove = function (event) {
            var _a;
            if (_this.store.data.locked === LockState.Disable) {
                return;
            }
            event.stopPropagation();
            event.preventDefault();
            var now = performance.now();
            if (now - _this.touchStart < 50) {
                return;
            }
            _this.touchStart = now;
            var touches = event.touches;
            var len = touches.length;
            var x = event.touches[0].pageX - _this.clientRect.x;
            var y = event.touches[0].pageY - _this.clientRect.y;
            if (len === 1) {
                _this.onMouseMove({
                    x: x,
                    y: y,
                    clientX: event.changedTouches[0].clientX,
                    clientY: event.changedTouches[0].clientY,
                    pageX: event.changedTouches[0].pageX,
                    pageY: event.changedTouches[0].pageY,
                    ctrlKey: event.ctrlKey || event.metaKey,
                    shiftKey: event.shiftKey,
                    altKey: event.altKey,
                    buttons: 1,
                });
            }
            else if (len === 2 && ((_a = _this.startTouches) === null || _a === void 0 ? void 0 : _a.length) === 2) {
                if (!_this.touchMoving && !_this.touchScaling) {
                    var x1 = _this.startTouches[0].pageX - touches[0].pageX;
                    var x2 = _this.startTouches[1].pageX - touches[1].pageX;
                    var y1 = _this.startTouches[0].pageY - touches[0].pageY;
                    var y2 = _this.startTouches[1].pageY - touches[1].pageY;
                    if (((x1 >= 0 && x2 < 0) || (x1 <= 0 && x2 > 0)) &&
                        ((y1 >= 0 && y2 < 0) || (y1 <= 0 && y2 > 0))) {
                        _this.touchScaling = true;
                    }
                    else {
                        _this.touchMoving = true;
                    }
                }
                if (_this.touchScaling) {
                    if (_this.store.options.disableScale) {
                        return;
                    }
                    var scale = Math.hypot(touches[0].pageX - touches[1].pageX, touches[0].pageY - touches[1].pageY) / _this.initTouchDis;
                    _this.scale(_this.initScale * scale, deepClone(_this.touchCenter));
                }
                if (_this.touchMoving) {
                    if ((_this.store.data.locked >= LockState.DisableMove &&
                        _this.store.data.locked !== LockState.DisableScale) ||
                        _this.store.options.disableScale) {
                        return;
                    }
                    if (_this.lastOffsetX) {
                        var scale = _this.store.data.scale;
                        _this.translate((x - _this.lastOffsetX) / scale, (y - _this.lastOffsetY) / scale);
                    }
                    _this.lastOffsetX = x;
                    _this.lastOffsetY = y;
                }
            }
        };
        this.ontouchend = function (event) {
            if (_this.store.data.locked === LockState.Disable) {
                return;
            }
            _this.touchCenter = undefined;
            _this.touchScaling = undefined;
            _this.touchMoving = undefined;
            _this.startTouches = undefined;
            _this.lastOffsetX = 0;
            _this.lastOffsetY = 0;
            var x = event.changedTouches[0].pageX - _this.clientRect.x;
            var y = event.changedTouches[0].pageY - _this.clientRect.y;
            _this.onMouseUp({
                x: x,
                y: y,
                clientX: event.changedTouches[0].clientX,
                clientY: event.changedTouches[0].clientY,
                pageX: event.changedTouches[0].pageX,
                pageY: event.changedTouches[0].pageY,
                ctrlKey: event.ctrlKey || event.metaKey,
                shiftKey: event.shiftKey,
                altKey: event.altKey,
                buttons: 1,
            });
            _this.render();
        };
        this.onGesturestart = function (e) {
            e.preventDefault();
        };
        this.onMouseDown = function (e) {
            var _a, _b;
            if (e.buttons === 2 && !_this.drawingLine) {
                _this.mouseRight = MouseRight.Down;
            }
            _this.hideInput();
            if (_this.store.data.locked === LockState.Disable ||
                (e.buttons !== 1 && e.buttons !== 2)) {
                _this.hoverType = HoverType.None;
                return;
            }
            if (_this.magnifierCanvas.magnifier) {
                return;
            }
            _this.calibrateMouse(e);
            _this.mousePos.x = e.x;
            _this.mousePos.y = e.y;
            _this.mouseDown = e;
            _this.lastMouseTime = performance.now();
            // Set anchor of pen.
            if (_this.hotkeyType === HotkeyType.AddAnchor) {
                _this.setAnchor(_this.store.pointAt);
                return;
            }
            // Translate
            if (_this.hotkeyType === HotkeyType.Translate ||
                (_this.mouseRight === MouseRight.Down &&
                    !_this.store.options.mouseRightActive)) {
                return;
            }
            // 正在连线
            if (_this.drawingLine) {
                // 单击在锚点上，完成绘画
                if (_this.store.hoverAnchor) {
                    var to_1 = getToAnchor(_this.drawingLine);
                    to_1.x = _this.store.hoverAnchor.x;
                    to_1.y = _this.store.hoverAnchor.y;
                    connectLine(_this.store.hover, _this.store.hoverAnchor, _this.drawingLine, to_1);
                    _this.drawline();
                    _this.finishDrawline(true);
                    return;
                }
                // 右键，完成绘画
                if (e.buttons === 2 ||
                    (_this.drawingLineName === 'mind' &&
                        ((_a = _this.drawingLine) === null || _a === void 0 ? void 0 : _a.calculative.worldAnchors.length) > 1)) {
                    _this.finishDrawline(true);
                    if ((_b = _this.store.active[0]) === null || _b === void 0 ? void 0 : _b.anchors[0].connectTo) {
                        _this.drawingLineName = '';
                    }
                    else {
                        _this.drawingLineName = _this.store.options.drawingLineName;
                    }
                    return;
                }
                // 自动锚点（单击节点），完成绘画
                if (_this.store.options.autoAnchor && _this.hoverType === HoverType.Node) {
                    var to_2 = getToAnchor(_this.drawingLine);
                    var anchor = nearestAnchor(_this.store.hover, e);
                    to_2.x = anchor.x;
                    to_2.y = anchor.y;
                    _this.drawingLine.autoTo = true;
                    connectLine(_this.store.hover, anchor, _this.drawingLine, to_2);
                    _this.drawline();
                    _this.finishDrawline(true);
                    return;
                }
                // 添加点
                var to = getToAnchor(_this.drawingLine);
                if (to.isTemp) {
                    _this.drawingLine.calculative.activeAnchor =
                        _this.drawingLine.calculative.worldAnchors[_this.drawingLine.calculative.worldAnchors.length - 2];
                    to.isTemp = undefined;
                }
                else {
                    _this.drawingLine.calculative.activeAnchor = to;
                    _this.drawingLine.calculative.worldAnchors.push({
                        x: to.x,
                        y: to.y,
                        penId: to.penId,
                    });
                }
                _this.drawingLine.calculative.drawlineH = undefined;
                _this.drawingLineName !== 'polyline' && _this.drawline();
            }
            // 单击在节点上，通过自动锚点连线
            if (_this.drawingLineName) {
                if (_this.hoverType === HoverType.Node) {
                    if (_this.store.options.autoAnchor) {
                        _this.inactive(true);
                        var anchor = nearestAnchor(_this.store.hover, e);
                        _this.store.hoverAnchor = anchor;
                        var pt = { id: s8(), x: anchor.x, y: anchor.y };
                        _this.drawingLine = _this.createDrawingLine(pt);
                        _this.drawingLine.autoFrom = true;
                        connectLine(_this.store.hover, anchor, _this.drawingLine, pt);
                    }
                    else {
                        _this.inactive();
                        _this.hoverType = HoverType.None;
                    }
                }
                else if (!_this.drawingLine && _this.drawingLineName !== 'curve') {
                    _this.inactive(true);
                    var pt = { id: s8(), x: e.x, y: e.y };
                    _this.drawingLine = _this.createDrawingLine(pt);
                    _this.drawingLine.calculative.activeAnchor = pt;
                }
            }
            else if (_this.pencil) {
                _this.inactive(true);
                var penId = s8();
                var pt = { x: e.x, y: e.y, id: s8(), penId: penId };
                _this.pencilLine = _this.getInitPencilLine(pt);
            }
            else {
                switch (_this.hoverType) {
                    case HoverType.None:
                        _this.store.data.rule &&
                            !_this.store.options.disableRuleLine &&
                            _this.addRuleLine(e);
                        _this.inactive();
                        break;
                    case HoverType.Node:
                    case HoverType.Line:
                        if (_this.store.hover) {
                            var pen = getParent(_this.store.hover, true) || _this.store.hover;
                            if (e.ctrlKey && !e.shiftKey) {
                                if (pen.calculative.active) {
                                    _this.willInactivePen = pen;
                                }
                                else {
                                    pen.calculative.active = true;
                                    setChildrenActive(pen); // 子节点也设置为active
                                    _this.store.active.push(pen);
                                    _this.store.emitter.emit('active', _this.store.active);
                                }
                                _this.patchFlags = true;
                            }
                            else if (e.ctrlKey && e.shiftKey && _this.store.hover.parentId) {
                                _this.active([_this.store.hover]);
                            }
                            else {
                                if (!pen.calculative.active) {
                                    _this.active([pen]);
                                }
                            }
                            _this.calcActiveRect();
                        }
                        break;
                    case HoverType.LineAnchor:
                        _this.store.activeAnchor = _this.store.hoverAnchor;
                        _this.store.hover.calculative.activeAnchor = _this.store.hoverAnchor;
                        _this.active([_this.store.hover]);
                        break;
                    case HoverType.LineAnchorPrev:
                    case HoverType.LineAnchorNext:
                        if (_this.store.activeAnchor) {
                            // 备份，方便移动锚点方向
                            _this.prevAnchor = __assign({}, _this.store.activeAnchor.prev);
                            _this.nextAnchor = __assign({}, _this.store.activeAnchor.next);
                        }
                        break;
                    case HoverType.Resize:
                        _this.activeInitPos = [];
                        _this.store.active.forEach(function (pen) {
                            _this.activeInitPos.push({
                                x: (pen.calculative.worldRect.x - _this.activeRect.x) /
                                    _this.activeRect.width,
                                y: (pen.calculative.worldRect.y - _this.activeRect.y) /
                                    _this.activeRect.height,
                            });
                        });
                        break;
                }
                _this.store.emitter.emit('mousedown', {
                    x: e.x,
                    y: e.y,
                    pen: _this.store.hover,
                });
            }
            _this.render();
        };
        this.onMouseMove = function (e) {
            var _a, _b, _c, _d, _e, _f;
            if (_this.store.data.locked === LockState.Disable) {
                _this.hoverType = HoverType.None;
                return;
            }
            // 防止异常情况导致mouseup事件没有触发
            if (_this.mouseDown &&
                !_this.mouseDown.restore &&
                e.buttons !== 1 &&
                e.buttons !== 2) {
                _this.onMouseUp(e);
                return;
            }
            // 避免鼠标点击和移动一起触发，误抖动
            if (_this.lastMouseTime) {
                var now_1 = performance.now();
                if (now_1 - _this.lastMouseTime < 50) {
                    _this.lastMouseTime = 0;
                    return;
                }
                _this.lastMouseTime = 0;
            }
            _this.calibrateMouse(e);
            _this.mousePos.x = e.x;
            _this.mousePos.y = e.y;
            if (_this.magnifierCanvas.magnifier) {
                _this.render();
                return;
            }
            if (_this.mouseDown && !_this.store.options.disableTranslate) {
                // 画布平移前提
                if (_this.mouseRight === MouseRight.Down) {
                    _this.mouseRight = MouseRight.Translate;
                }
                // Translate
                if (_this.store.data.locked === LockState.DisableEdit ||
                    _this.store.data.locked === LockState.DisableScale ||
                    _this.hotkeyType === HotkeyType.Translate ||
                    _this.mouseRight === MouseRight.Translate) {
                    var scale = _this.store.data.scale;
                    if (Math.abs(e.x - _this.mouseDown.x) > 30) {
                        return;
                    }
                    _this.translate((e.x - _this.mouseDown.x) / scale, (e.y - _this.mouseDown.y) / scale);
                    return;
                }
                if (_this.store.data.locked) {
                    return;
                }
                if (!_this.drawingLine && !_this.pencil) {
                    if (!_this.drawingLineName && !_this.movingAnchor) {
                        // 在锚点上开始连线
                        if (_this.hoverType === HoverType.NodeAnchor) {
                            _this.drawingLineName = _this.store.options.drawingLineName;
                            var pt = {
                                id: s8(),
                                x: _this.store.hoverAnchor.x,
                                y: _this.store.hoverAnchor.y,
                            };
                            _this.drawingLine = _this.createDrawingLine(pt);
                            _this.drawingLine.calculative.activeAnchor = pt;
                            connectLine(_this.store.hover, _this.store.hoverAnchor, _this.drawingLine, pt);
                            _this.drawline();
                            return;
                        }
                    }
                    // 钢笔画线
                    else if (_this.drawingLineName && _this.hoverType === HoverType.None) {
                        var pt = { id: s8(), x: e.x, y: e.y };
                        _this.drawingLine = _this.createDrawingLine(pt);
                        _this.drawingLine.calculative.activeAnchor = pt;
                        _this.drawline();
                        return;
                    }
                    // 框选
                    if (e.buttons === 1 && !_this.hoverType && !_this.hotkeyType) {
                        _this.dragRect = {
                            x: Math.min(_this.mouseDown.x, e.x),
                            y: Math.min(_this.mouseDown.y, e.y),
                            ex: Math.max(_this.mouseDown.x, e.x),
                            ey: Math.max(_this.mouseDown.y, e.y),
                            width: Math.abs(e.x - _this.mouseDown.x),
                            height: Math.abs(e.y - _this.mouseDown.y),
                        };
                        _this.render();
                        return;
                    }
                    // 移动节点锚点
                    if (_this.movingAnchor) {
                        var x = e.x - _this.movingAnchor.x;
                        var y = e.y - _this.movingAnchor.y;
                        _this.translateAnchor(x, y);
                        _this.render();
                        return;
                    }
                    else if (!((_a = _this.store.active[0]) === null || _a === void 0 ? void 0 : _a.locked)) {
                        var pt = { x: e.x, y: e.y };
                        // Move line anchor
                        if (_this.hoverType === HoverType.LineAnchor) {
                            if (_this.dockInAnchor(e) &&
                                !_this.store.options.disableDock &&
                                !_this.store.options.disableLineDock) {
                                _this.clearDock();
                                _this.dock = calcAnchorDock(_this.store, pt, _this.store.activeAnchor);
                                ((_b = _this.dock) === null || _b === void 0 ? void 0 : _b.xDock) && (pt.x += _this.dock.xDock.step);
                                ((_c = _this.dock) === null || _c === void 0 ? void 0 : _c.yDock) && (pt.y += _this.dock.yDock.step);
                            }
                            _this.moveLineAnchor(pt, e);
                            return;
                        }
                        // Move line anchor prev
                        if (_this.hoverType === HoverType.LineAnchorPrev) {
                            _this.moveLineAnchorPrev(e);
                            return;
                        }
                        // Move line anchor next
                        if (_this.hoverType === HoverType.LineAnchorNext) {
                            _this.moveLineAnchorNext(e);
                            return;
                        }
                    }
                    // Rotate
                    if (_this.hoverType === HoverType.Rotate) {
                        _this.rotatePens({ x: e.x, y: e.y });
                        return;
                    }
                    // Resize
                    if (_this.hoverType === HoverType.Resize) {
                        _this.resizePens(e);
                        return;
                    }
                    // Move
                    if (_this.hoverType === HoverType.Node ||
                        _this.hoverType === HoverType.Line) {
                        var x = e.x - _this.mouseDown.x;
                        var y = e.y - _this.mouseDown.y;
                        var shake = 20;
                        if (e.ctrlKey &&
                            !e.shiftKey &&
                            (Math.abs(x) >= shake || Math.abs(y) >= shake)) {
                            _this.willInactivePen = undefined;
                        }
                        if (_this.store.active.length === 1) {
                            var activePen = _this.store.active[0];
                            if (activePen.locked < LockState.DisableMove) {
                                (_d = activePen === null || activePen === void 0 ? void 0 : activePen.onMouseMove) === null || _d === void 0 ? void 0 : _d.call(activePen, activePen, _this.mousePos);
                            }
                        }
                        _this.movePens(e);
                        return;
                    }
                }
                else if (_this.pencil) {
                    var pt = __assign({}, e);
                    pt.id = s8();
                    pt.penId = _this.pencilLine.id;
                    _this.pencilLine.calculative.worldAnchors.push(pt);
                    _this.store.path2dMap.set(_this.pencilLine, globalStore.path2dDraws[_this.pencilLine.name](_this.pencilLine));
                    _this.patchFlags = true;
                }
            }
            if (_this.drawingLine) {
                var pt = __assign({}, e);
                pt.id = s8();
                pt.penId = _this.drawingLine.id;
                // dock
                if (!_this.store.options.disableDock &&
                    !_this.store.options.disableLineDock) {
                    _this.clearDock();
                    _this.dock = calcAnchorDock(_this.store, pt);
                    ((_e = _this.dock) === null || _e === void 0 ? void 0 : _e.xDock) && (pt.x += _this.dock.xDock.step);
                    ((_f = _this.dock) === null || _f === void 0 ? void 0 : _f.yDock) && (pt.y += _this.dock.yDock.step);
                }
                if (_this.mouseDown &&
                    _this.drawingLineName === 'curve' &&
                    !_this.drawingLine.calculative.worldAnchors[0].connectTo) {
                    _this.drawline(pt);
                }
                else {
                    var to = void 0;
                    if (_this.drawingLine.calculative.worldAnchors.length > 1) {
                        to = getToAnchor(_this.drawingLine);
                    }
                    if (to) {
                        to.prev = undefined;
                        to.next = undefined;
                        if (!to.id) {
                            to.id = s8();
                        }
                        to.x = pt.x;
                        to.y = pt.y;
                        to.connectTo = undefined;
                    }
                    else {
                        to = __assign({}, pt);
                        _this.drawingLine.calculative.worldAnchors.push(to);
                    }
                    if (_this.hoverType === HoverType.NodeAnchor ||
                        _this.hoverType === HoverType.LineAnchor) {
                        to.x = _this.store.hoverAnchor.x;
                        to.y = _this.store.hoverAnchor.y;
                        to.connectTo = _this.store.hoverAnchor.penId;
                        if (_this.drawingLineName === 'polyline') {
                            to.isTemp = false;
                        }
                    }
                    if (_this.drawingLineName === 'line') {
                        if (e.ctrlKey) {
                            to.x =
                                _this.drawingLine.calculative.worldAnchors[_this.drawingLine.calculative.worldAnchors.length - 2].x;
                        }
                        else if (e.shiftKey) {
                            to.y =
                                _this.drawingLine.calculative.worldAnchors[_this.drawingLine.calculative.worldAnchors.length - 2].y;
                        }
                    }
                    _this.drawline();
                }
            }
            globalThis.debug && console.time('hover');
            var now = performance.now();
            if (now - _this.hoverTimer > 50) {
                _this.hoverTimer = now;
                _this.getHover(e);
            }
            globalThis.debug && console.timeEnd('hover');
            if (_this.hotkeyType === HotkeyType.AddAnchor) {
                _this.patchFlags = true;
            }
            _this.render(false);
        };
        this.onMouseUp = function (e) {
            var _a, _b;
            if (_this.store.data.locked === LockState.Disable) {
                _this.hoverType = HoverType.None;
                return;
            }
            if (!_this.mouseDown) {
                return;
            }
            if (_this.mouseRight === MouseRight.Down) {
                _this.store.emitter.emit('contextmenu', {
                    e: e,
                    clientRect: _this.clientRect,
                });
            }
            _this.mouseRight = MouseRight.None;
            _this.calibrateMouse(e);
            _this.mousePos.x = e.x;
            _this.mousePos.y = e.y;
            _this.pencil && _this.finishPencil();
            if (_this.drawingLine) {
                // 在锚点上，完成绘画
                if (_this.store.hoverAnchor) {
                    var to = getToAnchor(_this.drawingLine);
                    to.x = _this.store.hoverAnchor.x;
                    to.y = _this.store.hoverAnchor.y;
                    connectLine(_this.store.hover, _this.store.hoverAnchor, _this.drawingLine, to);
                    _this.drawline();
                    _this.finishDrawline(true);
                    return;
                }
                // 自动锚点（单击节点），完成绘画
                if (_this.store.options.autoAnchor && _this.hoverType === HoverType.Node) {
                    var to = getToAnchor(_this.drawingLine);
                    var anchor = nearestAnchor(_this.store.hover, e);
                    to.x = anchor.x;
                    to.y = anchor.y;
                    _this.drawingLine.autoTo = true;
                    connectLine(_this.store.hover, anchor, _this.drawingLine, to);
                    _this.drawline();
                    _this.finishDrawline(true);
                    return;
                }
            }
            // 拖拽连线锚点
            if (_this.hoverType === HoverType.LineAnchor &&
                _this.store.hover &&
                _this.store.active[0] &&
                _this.store.active[0].name === 'line' &&
                _this.store.active[0] !== _this.store.hover) {
                var line_1 = _this.store.active[0];
                var from = getFromAnchor(line_1);
                var to = getToAnchor(line_1);
                if (_this.store.hoverAnchor) {
                    var hover = _this.store.hover;
                    var isHoverFrom = getFromAnchor(hover) === _this.store.hoverAnchor;
                    var isHoverTo = getToAnchor(hover) === _this.store.hoverAnchor;
                    var isActiveFrom = from === _this.store.activeAnchor;
                    var isActiveTo = to === _this.store.activeAnchor;
                    if ((e.ctrlKey || e.altKey) &&
                        hover.type === PenType.Line &&
                        (isHoverFrom || isHoverTo) &&
                        (isActiveFrom || isActiveTo)) {
                        // 合并连线
                        var hoverAnchors = hover.calculative.worldAnchors.map(function (anchor) {
                            return __assign(__assign({}, anchor), { penId: line_1.id });
                        });
                        if (isHoverFrom) {
                            hoverAnchors.shift();
                        }
                        else if (isHoverTo) {
                            hoverAnchors.pop();
                        }
                        if ((isHoverFrom && isActiveFrom) || (isHoverTo && isActiveTo)) {
                            hoverAnchors.reverse();
                        }
                        if (isActiveFrom) {
                            line_1.calculative.worldAnchors[0].connectTo = undefined;
                            (_a = line_1.calculative.worldAnchors).unshift.apply(_a, __spreadArray([], __read(hoverAnchors), false));
                        }
                        else if (isActiveTo) {
                            line_1.calculative.worldAnchors[line_1.calculative.worldAnchors.length - 1].connectTo = undefined;
                            (_b = line_1.calculative.worldAnchors).push.apply(_b, __spreadArray([], __read(hoverAnchors), false));
                        }
                        _this.delete([hover]);
                        // TODO: 历史记录
                        _this.render();
                    }
                    else {
                        // 连接连线
                        if (_this.store.activeAnchor) {
                            _this.store.activeAnchor.x = _this.store.hoverAnchor.x;
                            _this.store.activeAnchor.y = _this.store.hoverAnchor.y;
                            connectLine(_this.store.hover, _this.store.hoverAnchor, line_1, _this.store.activeAnchor);
                        }
                    }
                    if (_this[line_1.lineName] && line_1.lineName !== 'polyline') {
                        _this[line_1.lineName](_this.store, line_1);
                    }
                    _this.store.path2dMap.set(line_1, globalStore.path2dDraws.line(line_1));
                    _this.initLineRect(line_1);
                }
                else {
                    // 连线起始点自动关联 到 pen
                    if (from === _this.store.activeAnchor && line_1.autoFrom) {
                        _this.calcAutoAnchor(line_1, from, _this.store.hover);
                    }
                    else if (to === _this.store.activeAnchor && line_1.autoTo) {
                        _this.calcAutoAnchor(line_1, to, _this.store.hover);
                    }
                }
            }
            // Add pen
            if (_this.addCaches) {
                if (!_this.store.data.locked) {
                    _this.dropPens(_this.addCaches, e);
                }
                _this.addCaches = undefined;
            }
            // Rotate
            if (_this.hoverType === HoverType.Rotate) {
                _this.getSizeCPs();
                _this.store.active.forEach(function (pen) {
                    pen.rotate = pen.calculative.rotate;
                });
            }
            _this.patchFlagsLines.forEach(function (pen) {
                if (pen.type) {
                    _this.initLineRect(pen);
                }
            });
            _this.patchFlagsLines.clear();
            if (_this.dragRect) {
                var pens = _this.store.data.pens.filter(function (pen) {
                    if (pen.visible === false ||
                        pen.locked === LockState.Disable ||
                        pen.parentId) {
                        return false;
                    }
                    if (rectInRect(pen.calculative.worldRect, _this.dragRect, _this.store.options.dragAllIn)) {
                        // 先判断在区域内，若不在区域内，则锚点肯定不在框选区域内，避免每条连线过度计算
                        if (pen.type === PenType.Line && !_this.store.options.dragAllIn) {
                            return lineInRect(pen, _this.dragRect);
                        }
                        return true;
                    }
                });
                _this.active(pens);
            }
            if (e.button !== 2) {
                if (distance(_this.mouseDown, e) < 2) {
                    if (_this.store.hover && _this.store.hover.input) {
                        _this.showInput(_this.store.hover);
                    }
                    _this.store.emitter.emit('click', {
                        x: e.x,
                        y: e.y,
                        pen: _this.store.hover,
                    });
                }
                _this.store.emitter.emit('mouseup', {
                    x: e.x,
                    y: e.y,
                    pen: _this.store.hover,
                });
            }
            if (_this.willInactivePen) {
                _this.willInactivePen.calculative.active = undefined;
                setChildrenActive(_this.willInactivePen, false); // 子节点取消激活
                _this.store.active.splice(_this.store.active.findIndex(function (p) { return p === _this.willInactivePen; }), 1);
                _this.calcActiveRect();
                _this.willInactivePen = undefined;
                _this.store.emitter.emit('inactive', [_this.willInactivePen]);
                _this.render();
            }
            if (_this.movingPens) {
                if (e.ctrlKey && !e.shiftKey) {
                    _this.copyMovedPens();
                }
                else {
                    _this.movedActivePens(e.ctrlKey && e.shiftKey);
                }
                _this.getAllByPens(_this.movingPens).forEach(function (pen) {
                    _this.store.pens[pen.id] = undefined;
                });
                _this.movingPens = undefined;
            }
            if (_this.store.active && _this.store.active[0]) {
                _this.store.active[0].calculative.h = undefined;
            }
            _this.mouseDown = undefined;
            _this.lastOffsetX = 0;
            _this.lastOffsetY = 0;
            _this.clearDock();
            _this.dragRect = undefined;
            _this.initActiveRect = undefined;
        };
        this.clearDock = function () {
            var _a, _b, _c, _d;
            var xPenId = (_b = (_a = _this.dock) === null || _a === void 0 ? void 0 : _a.xDock) === null || _b === void 0 ? void 0 : _b.penId;
            var yPenId = (_d = (_c = _this.dock) === null || _c === void 0 ? void 0 : _c.yDock) === null || _d === void 0 ? void 0 : _d.penId;
            var xPen = _this.store.pens[xPenId];
            if (xPen) {
                xPen.calculative.isDock = false;
            }
            var yPen = _this.store.pens[yPenId];
            if (yPen) {
                yPen.calculative.isDock = false;
            }
            _this.dock = undefined;
        };
        this.onResize = function () {
            if (_this.timer) {
                clearTimeout(_this.timer);
            }
            _this.timer = setTimeout(function () {
                _this.resize();
                _this.timer = undefined;
            }, 100);
        };
        this.onScroll = function () {
            if (_this.timer) {
                clearTimeout(_this.timer);
            }
            _this.timer = setTimeout(function () {
                _this.clientRect = _this.canvas.getBoundingClientRect();
                _this.timer = undefined;
            }, 100);
        };
        this.calibrateMouse = function (pt) {
            pt.x -= _this.store.data.x;
            pt.y -= _this.store.data.y;
            return pt;
        };
        this.getHover = function (pt) {
            var _a, _b;
            if (_this.dragRect) {
                return;
            }
            var hoverType = HoverType.None;
            _this.store.hover = undefined;
            _this.store.hoverAnchor = undefined;
            _this.store.pointAt = undefined;
            _this.store.pointAtIndex = undefined;
            var activeLine = _this.store.active.length === 1 && _this.store.active[0].type;
            if (!_this.drawingLineName &&
                _this.hotkeyType !== HotkeyType.AddAnchor &&
                _this.activeRect &&
                !activeLine &&
                !_this.store.data.locked) {
                var activePensLock = getPensLock(_this.store.active);
                var activePensDisableRotate = getPensDisableRotate(_this.store.active) ||
                    _this.store.options.disableRotate;
                var activePensDisableResize = getPensDisableResize(_this.store.active) ||
                    _this.store.options.disableSize;
                if (!activePensLock && !activePensDisableRotate) {
                    var rotatePt = {
                        x: _this.activeRect.center.x,
                        y: _this.activeRect.y - 30,
                    };
                    if (_this.activeRect.rotate) {
                        rotatePoint(rotatePt, _this.activeRect.rotate, _this.activeRect.center);
                    }
                    // 旋转控制点
                    if (!_this.hotkeyType && hitPoint(pt, rotatePt, _this.pointSize)) {
                        hoverType = HoverType.Rotate;
                        _this.externalElements.style.cursor = "url(\"" + _this.store.options.rotateCursor + "\"), auto";
                    }
                }
                // 大小控制点
                if (!activePensLock && !activePensDisableResize) {
                    for (var i = 0; i < 8; i++) {
                        var firstFour = i < 4;
                        var hotKeyIsResize = _this.hotkeyType === HotkeyType.Resize ||
                            (firstFour && !_this.hotkeyType);
                        if (hotKeyIsResize && hitPoint(pt, _this.sizeCPs[i], _this.pointSize)) {
                            var cursors = firstFour ? defaultCursors : rotatedCursors;
                            var offset = 0;
                            if (Math.abs((_this.activeRect.rotate % 90) - 45) < 25) {
                                cursors = firstFour ? rotatedCursors : defaultCursors;
                                offset =
                                    Math.round((_this.activeRect.rotate - 45) / 90) +
                                        (firstFour ? 0 : 1);
                            }
                            else {
                                offset = Math.round(_this.activeRect.rotate / 90);
                            }
                            hoverType = HoverType.Resize;
                            _this.resizeIndex = i;
                            _this.externalElements.style.cursor = cursors[(i + offset) % 4];
                            break;
                        }
                    }
                }
            }
            if (hoverType === HoverType.None) {
                hoverType = _this.inPens(pt, _this.store.data.pens);
            }
            if (!hoverType && !activeLine && pointInRect(pt, _this.activeRect)) {
                hoverType = HoverType.Node;
                _this.externalElements.style.cursor = 'move';
            }
            _this.hoverType = hoverType;
            if (hoverType === HoverType.None) {
                if (_this.drawingLineName || _this.pencil) {
                    _this.externalElements.style.cursor = 'crosshair';
                }
                else if (!_this.mouseDown) {
                    _this.externalElements.style.cursor = 'default';
                }
                _this.store.hover = undefined;
            }
            if (_this.store.lastHover !== _this.store.hover) {
                _this.patchFlags = true;
                if (_this.store.lastHover) {
                    _this.store.lastHover.calculative.hover = false;
                    setHover(getParent(_this.store.lastHover, true) || _this.store.lastHover, false);
                    _this.store.emitter.emit('leave', _this.store.lastHover);
                    _this.tooltip.hide();
                }
                if (_this.store.hover) {
                    _this.store.hover.calculative.hover = true;
                    setHover(getParent(_this.store.hover, true) || _this.store.hover);
                    _this.store.emitter.emit('enter', _this.store.hover);
                    _this.tooltip.show(_this.store.hover, pt);
                }
                _this.store.lastHover = _this.store.hover;
            }
            (_b = (_a = _this.store.hover) === null || _a === void 0 ? void 0 : _a.onMouseMove) === null || _b === void 0 ? void 0 : _b.call(_a, _this.store.hover, _this.mousePos);
        };
        this.inPens = function (pt, pens) {
            var hoverType = HoverType.None;
            var _loop_2 = function (i) {
                var e_2, _a, e_3, _b;
                var pen = pens[i];
                if (pen.visible == false ||
                    pen.calculative.inView == false ||
                    pen.locked === LockState.Disable) {
                    return "continue";
                }
                var r = getLineR(pen);
                if (!pen.calculative.active &&
                    !pointInSimpleRect(pt, pen.calculative.worldRect, r) &&
                    !pointInRect(pt, pen.calculative.worldRect)) {
                    return "continue";
                }
                // 锚点
                if (!_this.store.data.locked && _this.hotkeyType !== HotkeyType.Resize) {
                    if (pen.calculative.worldAnchors) {
                        try {
                            for (var _c = (e_2 = void 0, __values(pen.calculative.worldAnchors)), _d = _c.next(); !_d.done; _d = _c.next()) {
                                var anchor = _d.value;
                                hoverType = _this.inAnchor(pt, pen, anchor);
                                if (hoverType) {
                                    return "break-outer";
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
                // 图形
                if (pen.type) {
                    var pos = pointInLine(pt, pen);
                    if (pos) {
                        if (!_this.store.data.locked && !pen.locked) {
                            if (_this.hotkeyType === HotkeyType.AddAnchor) {
                                _this.externalElements.style.cursor = 'pointer';
                            }
                            else {
                                _this.externalElements.style.cursor = 'move';
                            }
                        }
                        else {
                            _this.externalElements.style.cursor = _this.store.options.hoverCursor;
                        }
                        _this.store.hover = pen;
                        _this.store.pointAt = pos.point;
                        _this.store.pointAtIndex = pos.i;
                        hoverType = HoverType.Line;
                        return "break";
                    }
                }
                else {
                    if (pen.children) {
                        var pens_1 = []; // TODO: 只考虑了一级子
                        pen.children.forEach(function (id) {
                            pens_1.push(_this.store.pens[id]);
                        });
                        hoverType = _this.inPens(pt, pens_1);
                        if (hoverType) {
                            return "break";
                        }
                    }
                    var isIn = false;
                    if (pen.name === 'line') {
                        isIn = pointInSimpleRect(pt, pen.calculative.worldRect, pen.lineWidth);
                    }
                    else {
                        isIn = pointInRect(pt, pen.calculative.worldRect);
                    }
                    if (isIn) {
                        if (!_this.store.data.locked && !pen.locked) {
                            if (_this.hotkeyType === HotkeyType.AddAnchor) {
                                _this.externalElements.style.cursor = 'pointer';
                            }
                            else {
                                _this.externalElements.style.cursor = 'move';
                            }
                        }
                        else {
                            _this.externalElements.style.cursor = _this.store.options.hoverCursor;
                        }
                        _this.store.hover = pen;
                        hoverType = HoverType.Node;
                        _this.store.pointAt = pt;
                        // 锚点贴边吸附
                        if (!pt.ctrlKey) {
                            var _e = _this.store.hover.calculative.worldRect, x = _e.x, y = _e.y, ex = _e.ex, ey = _e.ey, rotate_1 = _e.rotate, center_1 = _e.center;
                            if (rotate_1) {
                                var pts = [
                                    { x: x, y: y },
                                    { x: ex, y: y },
                                    { x: ex, y: ey },
                                    { x: x, y: ey },
                                ];
                                pts.forEach(function (item) {
                                    rotatePoint(item, rotate_1, center_1);
                                });
                                var last = pts[pts.length - 1];
                                try {
                                    for (var pts_1 = (e_3 = void 0, __values(pts)), pts_1_1 = pts_1.next(); !pts_1_1.done; pts_1_1 = pts_1.next()) {
                                        var item = pts_1_1.value;
                                        if (last.y > pt.y !== item.y > pt.y) {
                                            var tempx = item.x +
                                                ((pt.y - item.y) * (last.x - item.x)) / (last.y - item.y);
                                            if (Math.abs(tempx - _this.store.pointAt.x) < 10) {
                                                _this.store.pointAt.x = tempx;
                                            }
                                        }
                                        last = item;
                                    }
                                }
                                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                finally {
                                    try {
                                        if (pts_1_1 && !pts_1_1.done && (_b = pts_1.return)) _b.call(pts_1);
                                    }
                                    finally { if (e_3) throw e_3.error; }
                                }
                            }
                            else {
                                if (_this.store.pointAt.x - 10 < x) {
                                    _this.store.pointAt.x = x;
                                }
                                else if (_this.store.pointAt.x + 10 > ex) {
                                    _this.store.pointAt.x = ex;
                                }
                                if (_this.store.pointAt.y - 10 < y) {
                                    _this.store.pointAt.y = y;
                                }
                                else if (_this.store.pointAt.y + 10 > ey) {
                                    _this.store.pointAt.y = ey;
                                }
                            }
                        }
                        return "break";
                    }
                }
            };
            outer: for (var i = pens.length - 1; i >= 0; --i) {
                var state_1 = _loop_2(i);
                if (state_1 === "break")
                    break;
                switch (state_1) {
                    case "break-outer": break outer;
                }
            }
            return hoverType;
        };
        this.dockInAnchor = function (pt) {
            var e_4, _a;
            var _b, _c;
            _this.store.hover = undefined;
            for (var i = _this.store.data.pens.length - 1; i >= 0; --i) {
                var pen = _this.store.data.pens[i];
                if (pen.visible == false ||
                    pen.locked === LockState.Disable ||
                    pen === _this.store.active[0]) {
                    continue;
                }
                var r = getLineR(pen);
                r += 2 * _this.store.options.anchorRadius;
                if (!pointInSimpleRect(pt, pen.calculative.worldRect, r)) {
                    continue;
                }
                _this.store.hover = pen;
                // 锚点
                if (_this.hotkeyType !== HotkeyType.Resize) {
                    if (pen.calculative.worldAnchors) {
                        try {
                            for (var _d = (e_4 = void 0, __values(pen.calculative.worldAnchors)), _e = _d.next(); !_e.done; _e = _d.next()) {
                                var anchor = _e.value;
                                if (anchor.twoWay === TwoWay.In) {
                                    var to = getToAnchor(_this.store.active[0]);
                                    if (_this.store.activeAnchor.id !== to.id) {
                                        continue;
                                    }
                                }
                                if (anchor.twoWay === TwoWay.Out) {
                                    var from = getFromAnchor(_this.store.active[0]);
                                    if (_this.store.activeAnchor.id !== from.id) {
                                        continue;
                                    }
                                }
                                if (anchor.twoWay === TwoWay.DisableConnected ||
                                    anchor.twoWay === TwoWay.Disable ||
                                    ((_b = _this.store.activeAnchor) === null || _b === void 0 ? void 0 : _b.twoWay) === TwoWay.DisableConnectTo ||
                                    ((_c = _this.store.activeAnchor) === null || _c === void 0 ? void 0 : _c.twoWay) === TwoWay.Disable) {
                                    continue;
                                }
                                if (_this.inAnchor(pt, pen, anchor)) {
                                    return true;
                                }
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                    }
                }
            }
        };
        this.render = function (patchFlags) {
            var now;
            if (patchFlags == null || patchFlags === true || patchFlags === Infinity) {
                now = performance.now();
                _this.patchFlags = true;
            }
            else if (patchFlags > 1) {
                now = patchFlags;
            }
            else {
                now = performance.now();
            }
            if (!_this.patchFlags) {
                return;
            }
            if (now - _this.lastRender < _this.store.options.interval) {
                if (_this.renderTimer) {
                    cancelAnimationFrame(_this.renderTimer);
                }
                _this.renderTimer = requestAnimationFrame(_this.render);
                return;
            }
            _this.renderTimer = undefined;
            _this.lastRender = now;
            var offscreenCtx = _this.offscreen.getContext('2d');
            offscreenCtx.clearRect(0, 0, _this.offscreen.width, _this.offscreen.height);
            offscreenCtx.save();
            offscreenCtx.translate(_this.store.data.x, _this.store.data.y);
            globalThis.debugRender && console.time('renderPens');
            _this.renderPens();
            globalThis.debugRender && console.timeEnd('renderPens');
            _this.renderBorder();
            _this.renderHoverPoint();
            offscreenCtx.restore();
            _this.magnifierCanvas.render();
            var ctx = _this.canvas.getContext('2d');
            ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            ctx.drawImage(_this.offscreen, 0, 0, _this.width, _this.height);
            _this.canvasImageBottom.render();
            _this.canvasImage.render();
            _this.patchFlags = false;
        };
        this.renderPens = function () {
            var e_5, _a;
            var ctx = _this.offscreen.getContext('2d');
            ctx.strokeStyle = getGlobalColor(_this.store);
            try {
                for (var _b = __values(_this.store.data.pens), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var pen = _c.value;
                    if (!isFinite(pen.x)) {
                        continue;
                    }
                    if (pen.calculative.inView) {
                        renderPen(ctx, pen);
                    }
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_5) throw e_5.error; }
            }
            if (_this.drawingLine) {
                renderPen(ctx, _this.drawingLine);
            }
            if (_this.pencilLine) {
                renderPen(ctx, _this.pencilLine);
            }
            if (_this.movingPens) {
                _this.movingPens.forEach(function (pen) {
                    _this.renderPenContainChild(ctx, pen);
                });
            }
        };
        this.renderPenContainChild = function (ctx, pen) {
            var _a;
            pen.calculative.inView && renderPen(ctx, pen); // 可见才绘制，组合为状态只显示其中一个
            (_a = pen.children) === null || _a === void 0 ? void 0 : _a.forEach(function (id) {
                var child = _this.store.pens[id];
                child && _this.renderPenContainChild(ctx, child);
            });
        };
        this.renderBorder = function () {
            if (!_this.store.data.locked) {
                // Occupied territory.
                if (_this.activeRect &&
                    !(_this.store.active.length === 1 && _this.store.active[0].type) &&
                    !_this.movingPens) {
                    var ctx = _this.offscreen.getContext('2d');
                    ctx.save();
                    ctx.translate(0.5, 0.5);
                    if (_this.activeRect.rotate) {
                        ctx.translate(_this.activeRect.center.x, _this.activeRect.center.y);
                        ctx.rotate((_this.activeRect.rotate * Math.PI) / 180);
                        ctx.translate(-_this.activeRect.center.x, -_this.activeRect.center.y);
                    }
                    ctx.strokeStyle = _this.store.options.activeColor;
                    ctx.globalAlpha = 0.3;
                    ctx.beginPath();
                    ctx.strokeRect(_this.activeRect.x, _this.activeRect.y, _this.activeRect.width, _this.activeRect.height);
                    ctx.globalAlpha = 1;
                    if (getPensLock(_this.store.active) ||
                        getPensDisableRotate(_this.store.active) ||
                        _this.store.options.disableRotate) {
                        ctx.restore();
                        return;
                    }
                    // Draw rotate control line.
                    ctx.beginPath();
                    ctx.moveTo(_this.activeRect.center.x, _this.activeRect.y);
                    ctx.lineTo(_this.activeRect.center.x, _this.activeRect.y - 30);
                    ctx.stroke();
                    // Draw rotate control points.
                    ctx.beginPath();
                    ctx.strokeStyle = _this.store.options.activeColor;
                    ctx.fillStyle = '#ffffff';
                    ctx.arc(_this.activeRect.center.x, _this.activeRect.y - 30, 5, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                    ctx.restore();
                }
            }
        };
        this.renderHoverPoint = function () {
            if (_this.store.data.locked) {
                return;
            }
            var ctx = _this.offscreen.getContext('2d');
            ctx.save();
            ctx.translate(0.5, 0.5);
            if (!_this.store.options.disableAnchor &&
                _this.store.hover &&
                !_this.store.hover.disableAnchor &&
                (_this.hotkeyType !== HotkeyType.Resize ||
                    _this.store.active.length !== 1 ||
                    _this.store.active[0] !== _this.store.hover)) {
                var anchors = __spreadArray([], __read(_this.store.hover.calculative.worldAnchors), false);
                if (_this.store.pointAt && _this.hotkeyType === HotkeyType.AddAnchor) {
                    anchors.push(_this.store.pointAt);
                }
                if (anchors) {
                    ctx.strokeStyle =
                        _this.store.hover.anchorColor || _this.store.options.anchorColor;
                    ctx.fillStyle =
                        _this.store.hover.anchorBackground ||
                            _this.store.options.anchorBackground;
                    anchors.forEach(function (anchor) {
                        if (anchor.hidden && anchor.locked > LockState.DisableEdit) {
                            return;
                        }
                        if (anchor === _this.store.hoverAnchor) {
                            ctx.save();
                            var hoverAnchorColor = _this.store.hover.hoverAnchorColor ||
                                _this.store.options.hoverAnchorColor;
                            ctx.strokeStyle = hoverAnchorColor;
                            ctx.fillStyle = hoverAnchorColor;
                        }
                        ctx.beginPath();
                        var size = anchor.radius ||
                            _this.store.hover.anchorRadius ||
                            _this.store.options.anchorRadius;
                        if (_this.store.hover.type) {
                            size = 3;
                            if (_this.store.hover.calculative.lineWidth > 3) {
                                size = _this.store.hover.calculative.lineWidth;
                            }
                        }
                        ctx.arc(anchor.x, anchor.y, size, 0, Math.PI * 2);
                        if (_this.store.hover.type && _this.store.hoverAnchor === anchor) {
                            ctx.save();
                            ctx.strokeStyle =
                                _this.store.hover.activeColor || _this.store.options.activeColor;
                            ctx.fillStyle = ctx.strokeStyle;
                        }
                        else if (anchor.color || anchor.background) {
                            ctx.save();
                            ctx.strokeStyle = anchor.color;
                            ctx.fillStyle = anchor.background;
                        }
                        ctx.fill();
                        ctx.stroke();
                        if (anchor === _this.store.hoverAnchor) {
                            ctx.restore();
                        }
                        if (_this.store.hover.type && _this.store.hoverAnchor === anchor) {
                            ctx.restore();
                        }
                        else if (anchor.color || anchor.background) {
                            ctx.restore();
                        }
                    });
                }
            }
            // Draw size control points.
            if (_this.hotkeyType !== HotkeyType.AddAnchor &&
                !_this.movingPens && // 不在移动中
                _this.activeRect &&
                !(_this.store.active.length === 1 && _this.store.active[0].type)) {
                if (!getPensLock(_this.store.active) &&
                    !getPensDisableResize(_this.store.active) &&
                    !_this.store.options.disableSize) {
                    ctx.strokeStyle = _this.store.options.activeColor;
                    ctx.fillStyle = '#ffffff';
                    _this.sizeCPs.forEach(function (pt, i) {
                        if (_this.activeRect.rotate) {
                            ctx.save();
                            ctx.translate(pt.x, pt.y);
                            ctx.rotate((_this.activeRect.rotate * Math.PI) / 180);
                            ctx.translate(-pt.x, -pt.y);
                        }
                        if (i < 4 || _this.hotkeyType === HotkeyType.Resize) {
                            ctx.beginPath();
                            ctx.fillRect(pt.x - 4.5, pt.y - 4.5, 8, 8);
                            ctx.strokeRect(pt.x - 5.5, pt.y - 5.5, 10, 10);
                        }
                        if (_this.activeRect.rotate) {
                            ctx.restore();
                        }
                    });
                }
            }
            if (!_this.store.data.locked && _this.dragRect) {
                ctx.save();
                ctx.fillStyle = rgba(_this.store.options.dragColor, 0.2);
                ctx.strokeStyle = _this.store.options.dragColor;
                ctx.beginPath();
                ctx.strokeRect(_this.dragRect.x, _this.dragRect.y, _this.dragRect.width, _this.dragRect.height);
                ctx.fillRect(_this.dragRect.x, _this.dragRect.y, _this.dragRect.width, _this.dragRect.height);
                ctx.restore();
            }
            if (_this.dock) {
                ctx.strokeStyle = _this.store.options.dockColor;
                if (_this.dock.xDock) {
                    ctx.beginPath();
                    ctx.moveTo(_this.dock.xDock.x, _this.dock.xDock.y);
                    ctx.lineTo(_this.dock.xDock.x, _this.dock.xDock.prev.y);
                    ctx.stroke();
                }
                if (_this.dock.yDock) {
                    ctx.beginPath();
                    ctx.moveTo(_this.dock.yDock.x, _this.dock.yDock.y);
                    ctx.lineTo(_this.dock.yDock.prev.x, _this.dock.yDock.y);
                    ctx.stroke();
                }
            }
            ctx.restore();
        };
        /**
         *
         * @param pen 当前复制的画笔
         * @param parentId 父节点 id
         * @param clipboard 本次复制的全部画笔，包含子节点, 以及 origin 和 scale
         * @returns 复制后的画笔
         */
        this.pastePen = function (pen, parentId) {
            var e_6, _a;
            var oldId = pen.id;
            randomId(pen);
            pen.parentId = parentId;
            if (pen.type === PenType.Line) {
                _this.changeNodeConnectedLine(oldId, pen, _this.store.clipboard.pens);
            }
            else {
                _this.changeLineAnchors(oldId, pen, _this.store.clipboard.pens);
            }
            if (!pen.parentId) {
                var rect = _this.getPenRect(pen, _this.store.clipboard.origin, _this.store.clipboard.scale);
                var initRect = _this.getPenRect(_this.store.clipboard.initRect, _this.store.clipboard.origin, _this.store.clipboard.scale);
                var _b = _this.store.data, origin_1 = _b.origin, scale = _b.scale;
                pen.x = origin_1.x + rect.x * scale;
                pen.y = origin_1.y + rect.y * scale;
                pen.width = rect.width * scale;
                pen.height = rect.height * scale;
                initRect.x = origin_1.x + initRect.x * scale;
                initRect.y = origin_1.y + initRect.y * scale;
                calcCenter(initRect);
                if (_this.store.clipboard.pos) {
                    pen.x -= initRect.center.x - _this.store.clipboard.pos.x;
                    pen.y -= initRect.center.y - _this.store.clipboard.pos.y;
                }
                pen.x += _this.store.clipboard.offset * _this.store.data.scale;
                pen.y += _this.store.clipboard.offset * _this.store.data.scale;
            }
            _this.makePen(pen);
            var newChildren = [];
            if (Array.isArray(pen.children)) {
                var _loop_3 = function (childId) {
                    var childPen = _this.store.clipboard.pens.find(function (pen) { return pen.id === childId; });
                    childPen && newChildren.push(_this.pastePen(childPen, pen.id).id);
                };
                try {
                    for (var _c = __values(pen.children), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var childId = _d.value;
                        _loop_3(childId);
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
            pen.children = newChildren;
            return pen;
        };
        this.ondblclick = function (e) {
            if (_this.store.hover &&
                !_this.store.data.locked &&
                !_this.store.options.disableInput) {
                if (_this.store.hover.onShowInput) {
                    _this.store.hover.onShowInput(_this.store.hover, e);
                }
                else {
                    _this.showInput(_this.store.hover);
                }
            }
            _this.store.emitter.emit('dblclick', {
                x: e.x,
                y: e.y,
                pen: _this.store.hover,
            });
        };
        this.showInput = function (pen, rect, background) {
            if (background === void 0) { background = 'transparent'; }
            if (!window ||
                !_this.store.hover ||
                _this.store.hover.locked ||
                _this.store.hover.externElement ||
                _this.store.hover.disableInput) {
                return;
            }
            if (_this.inputDiv.dataset.penId === pen.id) {
                _this.inputDiv.dataset.isInput = 'true';
                _this.inputDiv.contentEditable = 'true';
                _this.inputDiv.focus();
                var range_1 = window.getSelection(); //创建range
                range_1.selectAllChildren(_this.inputDiv); //range 选择obj下所有子内容
                range_1.collapseToEnd(); //光标移至最后
                _this.inputDiv.scrollTop = _this.inputDiv.scrollHeight;
                _this.inputDiv.scrollLeft = _this.inputDiv.scrollWidth;
                return;
            }
            //过滤table2图元
            if (!rect) {
                _this.setInputStyle(pen);
            }
            var textRect = rect || pen.calculative.worldTextRect;
            //value和innerText问题
            var preInputText = pen.calculative.tempText || pen.text + '' || '';
            var textArr = preInputText.replace(/\x20/g, '&nbsp;').split(/[\s\n]/);
            var finalText = (textArr.join('</div><div>') + "</div>")
                .replace('</div>', '')
                .replace(/\<div\>\<\/div\>/g, '<div><br></div>');
            _this.inputDiv.innerHTML = finalText;
            // this.inputDiv.style.fontSize = pen.calculative.fontSize + 'px';
            // this.inputDiv.style.color = getTextColor(pen, this.store);
            _this.inputParent.style.left =
                textRect.x + _this.store.data.x - (pen.textLeft || 0) + 'px'; //+ 5
            _this.inputParent.style.top =
                textRect.y + _this.store.data.y - (pen.textTop || 0) + 'px'; //+ 5
            _this.inputParent.style.width = textRect.width + (pen.textLeft || 0) + 'px'; //(textRect.width < pen.width ? 0 : 10)
            _this.inputParent.style.height = textRect.height + (pen.textTop || 0) + 'px'; //   (textRect.height < pen.height ? 0 : 10)
            _this.inputParent.style.zIndex = '1000';
            _this.inputParent.style.background = background;
            if (pen.rotate % 360) {
                _this.inputParent.style.transform = "rotate(" + pen.rotate + "deg)";
            }
            else {
                _this.inputParent.style.transform = null;
            }
            _this.inputParent.style.display = 'flex';
            _this.inputDiv.dataset.penId = pen.id;
            _this.inputDiv.contentEditable =
                pen.disableInput == undefined ? 'true' : pen.disableInput.toString();
            if (pen.dropdownList && _this.dropdown.style.display !== 'block') {
                if (!_this.store.data.locked) {
                    _this.inputRight.style.display = 'none';
                }
                _this.setDropdownList();
            }
            else {
                _this.inputRight.style.display = 'none';
            }
            _this.inputDiv.contentEditable = 'true';
            _this.inputDiv.focus();
            var range = window.getSelection(); //创建range
            range.selectAllChildren(_this.inputDiv); //range 选择obj下所有子内容
            range.collapseToEnd(); //光标移至最后
            _this.inputDiv.scrollTop = _this.inputDiv.scrollHeight;
            _this.inputDiv.scrollLeft = _this.inputDiv.scrollWidth;
            pen.calculative.text = undefined;
            _this.render();
        };
        this.setInputStyle = function (pen) {
            if (!pen.text) {
                pen.text = '';
            }
            var sheet;
            for (var i = 0; i < document.styleSheets.length; i++) {
                if (document.styleSheets[i].title === 'le5le.com') {
                    sheet = document.styleSheets[i];
                }
            }
            var style = 'overflow: scroll;';
            var div_style = '';
            var font_scale = 1;
            var scale = _this.store.data.scale;
            if (pen.fontSize < 12) {
                font_scale = 12 / pen.fontSize;
            }
            if (pen.textAlign) {
                style += "text-align: " + pen.textAlign + ";";
            }
            else {
                style += 'text-align: center;';
            }
            if (pen.textAlign && pen.whiteSpace === 'pre-line') {
                var textAlign = {
                    left: 'start',
                    center: 'center',
                    right: 'end',
                };
                style += "align-items: " + textAlign[pen.textAlign] + ";";
            }
            if (pen.textBaseline) {
                var baseLine = {
                    top: 'start',
                    middle: 'center',
                    bottom: 'end',
                };
                style += "justify-content: " + baseLine[pen.textBaseline] + ";";
            }
            else {
                // if (pen.textWidth < pen.calculative.) {
                //   style += 'justify-content: start;';
                // } else {
                //文字高度超出整个rect高度时
                style += 'justify-content: center;';
                // }
            }
            if (pen.fontFamily) {
                style += "font-family: " + pen.fontFamily + ";";
            }
            if (pen.fontSize) {
                if (pen.fontSize * scale < 12) {
                    style += "font-size:" + pen.fontSize + "px;";
                    style += "zoom:" + (pen.fontSize / 12) * scale + ";";
                }
                else {
                    style += "font-size:" + pen.fontSize * scale + "px;";
                }
            }
            style += "color:" + getTextColor(pen, _this.store) + ";";
            if (pen.fontStyle) {
                style += "font-style: " + pen.fontStyle + ";";
            }
            if (pen.fontWeight) {
                style += "font-weight: " + pen.fontWeight + ";";
            }
            if (pen.textLeft) {
                style += "margin-left:" + (scale > 1
                    ? pen.textLeft * font_scale
                    : (pen.textLeft * font_scale) / scale) + "px;";
            }
            if (pen.textTop) {
                style += "margin-top:" + (scale > 1
                    ? pen.textTop * font_scale
                    : (pen.textTop * font_scale) / scale) + "px;";
            }
            if (pen.lineHeight) {
                style += "line-height:" + (scale > 1
                    ? pen.fontSize * pen.lineHeight * scale
                    : pen.fontSize * pen.lineHeight * font_scale) + "px;";
            }
            if (pen.textHeight) {
                style += "height:" + (scale > 1
                    ? pen.textHeight * font_scale * scale
                    : pen.textHeight * font_scale) + "px;";
            }
            else {
                var tem = pen.height / scale - (pen.textTop || 0);
                if (tem < 0) {
                    tem = 0;
                }
                style += "height:" + (pen.fontSize * scale < 12 ? tem * font_scale : tem * scale * font_scale) + "px;";
            }
            if (pen.textWidth) {
                if (pen.whiteSpace !== 'pre-line') {
                    if (pen.textWidth < pen.fontSize) {
                        style += "width:" + pen.fontSize * 1.2 * font_scale + "px;";
                    }
                    else {
                        style += "width:" + (scale > 1
                            ? pen.textWidth * font_scale * scale
                            : pen.textWidth * font_scale) + "px;";
                    }
                }
            }
            else {
                if (pen.whiteSpace === undefined || pen.whiteSpace === 'break-all') {
                    var tem = pen.width / scale - (pen.textLeft || 0);
                    if (tem < 0) {
                        tem = 0;
                    }
                    style += "width:" + (pen.fontSize * scale < 12 ? tem * font_scale : tem * scale) + "px;";
                }
                // if (pen.whiteSpace === 'pre-line') {
                //   //回车换行
                //   style += `overflow: visible;`;
                // }
            }
            if (pen.whiteSpace) {
                if (pen.whiteSpace === 'pre-line') {
                    style += "white-space:pre;";
                    // if (!pen.textAlign) {
                    //   style += `align-items: center;`;
                    // }
                }
                else {
                    style += "white-space:" + pen.whiteSpace + ";";
                    if (pen.whiteSpace === 'nowrap') {
                        div_style += 'display:contents;';
                    }
                }
            }
            if (pen.whiteSpace !== 'nowrap') {
                var textWidth = pen.fontSize * 1.2 * pen.text.length;
                var contentWidth = (pen.textWidth || pen.width / scale) *
                    Math.floor(pen.height / scale / (pen.lineHeight * pen.fontSize));
                if (textWidth > contentWidth) {
                    style += 'justify-content: start;';
                }
            }
            sheet.deleteRule(0);
            sheet.deleteRule(0);
            sheet.insertRule(".topology-input\n      .input-div{\n        resize:none;border:none;outline:none;background:transparent;position:absolute;flex-grow:1;height:100%;width: 100%;position:absolute;left:0;top:0;display:flex;flex-direction: column;cursor: text;" + style + "}");
            sheet.insertRule(".input-div div{" + div_style + "}");
            // sheet.insertRule(`.topology-input .input-div-font{${style_font}}`);
        };
        this.hideInput = function () {
            if (_this.inputParent.style.display === 'flex') {
                _this.inputParent.style.display = 'none';
                var pen = _this.store.pens[_this.inputDiv.dataset.penId];
                if (!pen) {
                    return;
                }
                pen.calculative.text = pen.text;
                _this.inputDiv.dataset.value = _this.inputDiv.innerHTML
                    .replace(/\<div\>/g, '\n')
                    .replace(/\<\/div\>/g, '')
                    .replace(/\<br\>/g, '')
                    .replace(/&nbsp;/g, ' ');
                if (pen.onInput) {
                    pen.onInput(pen, _this.inputDiv.dataset.value);
                }
                else if (pen.text !== _this.inputDiv.dataset.value) {
                    var initPens = [deepClone(pen, true)];
                    pen.text = _this.inputDiv.dataset.value;
                    pen.calculative.text = pen.text;
                    _this.inputDiv.dataset.penId = undefined;
                    calcTextRect(pen);
                    _this.patchFlags = true;
                    _this.pushHistory({
                        type: EditType.Update,
                        pens: [deepClone(pen, true)],
                        initPens: initPens,
                    });
                    _this.store.emitter.emit('valueUpdate', pen);
                }
            }
            _this.inputDiv.dataset.penId = undefined;
            _this.dropdown.style.display = 'none';
            _this.inputDiv.dataset.isInput = 'false';
            _this.inputDiv.contentEditable = 'false';
            _this.render();
        };
        this.setDropdownList = function (search) {
            var e_7, _a;
            _this.clearDropdownList();
            if (!_this.store.data.locked) {
                return;
            }
            _this.dropdown.style.display = 'block';
            _this.inputRight.style.display = 'block';
            setTimeout(function () {
                _this.inputRight.style.transform = 'rotate(315deg)';
                _this.inputRight.style.zoom = _this.store.data.scale;
            });
            var pen = _this.store.pens[_this.inputDiv.dataset.penId];
            if (!pen || !pen.dropdownList) {
                _this.dropdown.style.display = 'none';
                _this.inputRight.style.display = 'none';
                _this.inputRight.style.transform = 'rotate(135deg)';
                return;
            }
            if (!pen.dropdownList.length) {
                var none = document.createElement('div');
                none.innerText = 'None';
                none.style.padding = '5px 12px';
                none.style.color = '#ddd';
                _this.dropdown.appendChild(none);
                return;
            }
            var text = _this.inputDiv.innerHTML
                .replace(/\<div\>/g, '\n')
                .replace(/\<\/div\>/g, '')
                .replace(/\<br\>/g, '');
            var i = 0;
            try {
                for (var _b = __values(pen.dropdownList), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    var t = typeof item === 'string' ? item : item.text;
                    if (search && text) {
                        if (t.includes(text)) {
                            // 过滤
                            _this.dropdownAppendOption(t, i);
                        }
                    }
                    else {
                        _this.dropdownAppendOption(t, i);
                    }
                    ++i;
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_7) throw e_7.error; }
            }
            if (!_this.dropdown.hasChildNodes()) {
                var none = document.createElement('div');
                none.innerText = 'None';
                none.style.padding = '5px 12px';
                none.style.color = '#ddd';
                _this.dropdown.appendChild(none);
            }
        };
        this.selectDropdown = function (e) {
            var li = e.target;
            var pen = _this.store.pens[_this.inputDiv.dataset.penId];
            if (!li || !pen || !pen.dropdownList) {
                return;
            }
            var index = +li.dataset.i;
            var dropdown = pen.dropdownList[index];
            if (!dropdown) {
                return;
            }
            var initPens = [deepClone(pen, true)];
            if (typeof dropdown === 'object') {
                _this.updateValue(pen, __assign({}, dropdown));
                pen.calculative.text = undefined;
                _this.calcActiveRect();
            }
            else {
                pen.text = dropdown + '';
            }
            _this.inputDiv.innerText = pen.text;
            // this.dropdown.style.display = 'none';
            // this.inputRight.style.transform = 'rotate(135deg)';
            _this.hideInput();
            _this.pushHistory({
                type: EditType.Update,
                pens: [deepClone(pen, true)],
                initPens: initPens,
            });
            _this.render();
            _this.store.emitter.emit('valueUpdate', pen);
        };
        this.canvasImageBottom = new CanvasImage(parentElement, store, true);
        parentElement.appendChild(this.canvas);
        this.canvas.style.position = 'absolute';
        this.canvas.style.backgroundRepeat = 'no-repeat';
        this.canvas.style.backgroundSize = '100% 100%';
        this.canvasImage = new CanvasImage(parentElement, store);
        this.magnifierCanvas = new MagnifierCanvas(this, parentElement, store);
        this.externalElements.style.position = 'absolute';
        this.externalElements.style.left = '0';
        this.externalElements.style.top = '0';
        this.externalElements.style.outline = 'none';
        this.externalElements.style.background = 'transparent';
        parentElement.style.position = 'relative';
        parentElement.appendChild(this.externalElements);
        this.createInput();
        this.tooltip = new Tooltip(parentElement, store);
        this.tooltip.box.onmouseleave = function (e) {
            _this.patchFlags = true;
            _this.store.lastHover && (_this.store.lastHover.calculative.hover = false);
            var hover = _this.store.data.pens.find(function (item) { return item.calculative.hover === true; });
            setHover(hover, false);
        };
        if (this.store.options.scroll) {
            this.scroll = new Scroll(this);
        }
        this.store.dpiRatio = globalThis.devicePixelRatio || 1;
        if (this.store.dpiRatio < 1) {
            this.store.dpiRatio = 1;
        }
        else if (this.store.dpiRatio > 1 && this.store.dpiRatio < 1.5) {
            this.store.dpiRatio = 1.5;
        }
        this.clientRect = this.externalElements.getBoundingClientRect();
        this.listen();
        window === null || window === void 0 ? void 0 : window.addEventListener('resize', this.onResize);
        window === null || window === void 0 ? void 0 : window.addEventListener('scroll', this.onScroll);
    }
    Canvas.prototype.listen = function () {
        var _this = this;
        // ios
        this.externalElements.addEventListener('gesturestart', this.onGesturestart);
        this.externalElements.ondragover = function (e) { return e.preventDefault(); };
        this.externalElements.ondrop = this.ondrop;
        this.externalElements.oncontextmenu = function (e) { return e.preventDefault(); };
        if (isMobile()) {
            this.store.options.interval = 50;
            this.externalElements.ontouchstart = this.ontouchstart;
            this.externalElements.ontouchmove = this.ontouchmove;
            this.externalElements.ontouchend = this.ontouchend;
        }
        else {
            this.externalElements.onmousedown = function (e) {
                _this.onMouseDown({
                    x: e.offsetX,
                    y: e.offsetY,
                    clientX: e.clientX,
                    clientY: e.clientY,
                    pageX: e.pageX,
                    pageY: e.pageY,
                    ctrlKey: e.ctrlKey || e.metaKey,
                    shiftKey: e.shiftKey,
                    altKey: e.altKey,
                    buttons: e.buttons,
                });
            };
            this.externalElements.onmousemove = function (e) {
                if (e.target !== _this.externalElements) {
                    return;
                }
                _this.onMouseMove({
                    x: e.offsetX,
                    y: e.offsetY,
                    clientX: e.clientX,
                    clientY: e.clientY,
                    pageX: e.pageX,
                    pageY: e.pageY,
                    ctrlKey: e.ctrlKey || e.metaKey,
                    shiftKey: e.shiftKey,
                    altKey: e.altKey,
                    buttons: e.buttons,
                });
            };
            this.externalElements.onmouseup = function (e) {
                _this.onMouseUp({
                    x: e.offsetX,
                    y: e.offsetY,
                    clientX: e.clientX,
                    clientY: e.clientY,
                    pageX: e.pageX,
                    pageY: e.pageY,
                    ctrlKey: e.ctrlKey || e.metaKey,
                    shiftKey: e.shiftKey,
                    altKey: e.altKey,
                    buttons: e.buttons,
                    button: e.button,
                });
            };
            this.externalElements.onmouseleave = function (e) {
                if (e.toElement !== _this.tooltip.box) {
                    _this.tooltip.hide();
                    _this.store.lastHover = undefined;
                }
            };
        }
        this.externalElements.ondblclick = this.ondblclick;
        this.externalElements.tabIndex = 0;
        this.externalElements.onblur = function () {
            _this.mouseDown = undefined;
        };
        this.externalElements.onwheel = this.onwheel;
        document.addEventListener('copy', this.onCopy);
        document.addEventListener('cut', this.onCut);
        document.addEventListener('paste', this.onPaste);
        switch (this.store.options.keydown) {
            case KeydownType.Document:
                document.addEventListener('keydown', this.onkeydown);
                document.addEventListener('keyup', this.onkeyup);
                break;
            case KeydownType.Canvas:
                this.externalElements.addEventListener('keydown', this.onkeydown);
                this.externalElements.addEventListener('keyup', this.onkeyup);
                break;
        }
    };
    /**
     * 分割连线的锚点，变成两条线
     * @param line 连线
     * @param anchor 锚点，连线的某个锚点，引用相同
     */
    Canvas.prototype.splitLine = function (line, anchor) {
        var worldAnchors = line.calculative.worldAnchors;
        var index = worldAnchors.findIndex(function (a) { return a === anchor; });
        if ([-1, 0, worldAnchors.length - 1].includes(index)) {
            // 没找到，起终点不处理
            return;
        }
        var initLine = deepClone(line, true);
        var newLine = deepClone(line, true);
        var id = s8();
        newLine.id = id;
        newLine.calculative.canvas = this;
        newLine.calculative.active = false;
        newLine.calculative.hover = false;
        // index 作为公共点
        var preAnchors = deepClone(worldAnchors.slice(0, index + 1));
        var laterAnchors = deepClone(worldAnchors.slice(index)).map(function (a) {
            a.penId = id;
            return a;
        });
        line.calculative.worldAnchors = preAnchors;
        newLine.calculative.worldAnchors = laterAnchors;
        this.initLineRect(line);
        this.initLineRect(newLine);
        this.store.data.pens.push(newLine);
        this.store.pens[id] = newLine;
        this.pushHistory({
            type: EditType.Add,
            pens: [deepClone(newLine, true)],
            step: 2,
        });
        this.pushHistory({
            type: EditType.Update,
            initPens: [initLine],
            pens: [deepClone(line, true)],
            step: 2,
        });
    };
    Canvas.prototype.translateAnchor = function (x, y) {
        var _this = this;
        this.movingAnchor.x += x;
        this.movingAnchor.y += y;
        // 点不在范围内，移动到范围内
        var penId = this.movingAnchor.penId;
        if (penId) {
            var pen = this.store.pens[penId];
            var rect = pen.calculative.worldRect;
            if (this.movingAnchor.x < rect.x) {
                this.movingAnchor.x = rect.x;
            }
            else if (this.movingAnchor.x > rect.ex) {
                this.movingAnchor.x = rect.ex;
            }
            if (this.movingAnchor.y < rect.y) {
                this.movingAnchor.y = rect.y;
            }
            else if (this.movingAnchor.y > rect.ey) {
                this.movingAnchor.y = rect.ey;
            }
            var anchor = calcRelativePoint(this.movingAnchor, rect);
            // 更改 pen 的 anchors 属性
            var index = pen.anchors.findIndex(function (anchor) { return anchor.id === _this.movingAnchor.id; });
            pen.anchors[index] = anchor;
            this.patchFlags = true;
        }
    };
    Canvas.prototype.fileToPen = function (file, isGif) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = '';
                        if (!this.store.options.uploadFn) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.store.options.uploadFn(file)];
                    case 1:
                        url = _a.sent();
                        return [3 /*break*/, 6];
                    case 2:
                        if (!this.store.options.uploadUrl) return [3 /*break*/, 4];
                        return [4 /*yield*/, uploadFile(file, this.store.options.uploadUrl, this.store.options.uploadParams, this.store.options.uploadHeaders)];
                    case 3:
                        url = _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, fileToBase64(file)];
                    case 5:
                        url = _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, new Promise(function (resolve, reject) {
                            var img = new Image();
                            img.onload = function () {
                                globalStore.htmlElements[url] = img;
                                resolve({
                                    width: img.width,
                                    height: img.height,
                                    name: isGif ? 'gif' : 'image',
                                    image: url,
                                });
                            };
                            img.onerror = function (e) {
                                reject(e);
                            };
                            img.src = url;
                        })];
                }
            });
        });
    };
    Canvas.prototype.dropPens = function (pens, e) {
        return __awaiter(this, void 0, void 0, function () {
            var pens_2, pens_2_1, pen, pens_3, pens_3_1, pen, pens_4, pens_4_1, pen;
            var e_8, _a, e_9, _b, e_10, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        try {
                            for (pens_2 = __values(pens), pens_2_1 = pens_2.next(); !pens_2_1.done; pens_2_1 = pens_2.next()) {
                                pen = pens_2_1.value;
                                // 只修改 树根处的 祖先节点, randomCombineId 会递归更改子节点
                                !pen.parentId && this.randomCombineId(pen, pens);
                            }
                        }
                        catch (e_8_1) { e_8 = { error: e_8_1 }; }
                        finally {
                            try {
                                if (pens_2_1 && !pens_2_1.done && (_a = pens_2.return)) _a.call(pens_2);
                            }
                            finally { if (e_8) throw e_8.error; }
                        }
                        try {
                            for (pens_3 = __values(pens), pens_3_1 = pens_3.next(); !pens_3_1.done; pens_3_1 = pens_3.next()) {
                                pen = pens_3_1.value;
                                // TODO: randomCombineId 会更改 id， 此处应该不存在空 id
                                if (!pen.id) {
                                    pen.id = s8();
                                }
                                !pen.calculative && (pen.calculative = { canvas: this });
                                this.store.pens[pen.id] = pen;
                            }
                        }
                        catch (e_9_1) { e_9 = { error: e_9_1 }; }
                        finally {
                            try {
                                if (pens_3_1 && !pens_3_1.done && (_b = pens_3.return)) _b.call(pens_3);
                            }
                            finally { if (e_9) throw e_9.error; }
                        }
                        try {
                            // // 计算区域
                            // for (const pen of pens) {
                            //   // 组合节点才需要提前计算
                            //   Array.isArray(pen.children) && pen.children.length > 0 && this.updatePenRect(pen);
                            // }
                            for (pens_4 = __values(pens), pens_4_1 = pens_4.next(); !pens_4_1.done; pens_4_1 = pens_4.next()) {
                                pen = pens_4_1.value;
                                if (!pen.parentId) {
                                    pen.width *= this.store.data.scale;
                                    pen.height *= this.store.data.scale;
                                    pen.x = e.x - pen.width / 2;
                                    pen.y = e.y - pen.height / 2;
                                }
                            }
                        }
                        catch (e_10_1) { e_10 = { error: e_10_1 }; }
                        finally {
                            try {
                                if (pens_4_1 && !pens_4_1.done && (_c = pens_4.return)) _c.call(pens_4);
                            }
                            finally { if (e_10) throw e_10.error; }
                        }
                        return [4 /*yield*/, this.addPens(pens, true)];
                    case 1:
                        _d.sent();
                        this.active(pens.filter(function (pen) { return !pen.parentId; }));
                        this.render();
                        this.externalElements.focus(); // 聚焦
                        return [2 /*return*/];
                }
            });
        });
    };
    Canvas.prototype.randomCombineId = function (pen, pens, parentId) {
        var e_11, _a;
        randomId(pen);
        pen.parentId = parentId;
        var newChildren = [];
        if (Array.isArray(pen.children)) {
            var _loop_4 = function (childId) {
                var childPen = pens.find(function (pen) { return pen.id === childId; });
                childPen &&
                    newChildren.push(this_1.randomCombineId(childPen, pens, pen.id).id);
            };
            var this_1 = this;
            try {
                for (var _b = __values(pen.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var childId = _c.value;
                    _loop_4(childId);
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_11) throw e_11.error; }
            }
        }
        pen.children = newChildren;
        return pen;
    };
    Canvas.prototype.addPens = function (pens, history) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, list, pens_5, pens_5_1, pen;
            var e_12, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.beforeAddPens;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.beforeAddPens(pens)];
                    case 1:
                        _a = (_c.sent()) != true;
                        _c.label = 2;
                    case 2:
                        if (_a) {
                            return [2 /*return*/, []];
                        }
                        list = [];
                        try {
                            for (pens_5 = __values(pens), pens_5_1 = pens_5.next(); !pens_5_1.done; pens_5_1 = pens_5.next()) {
                                pen = pens_5_1.value;
                                if (this.beforeAddPen && this.beforeAddPen(pen) != true) {
                                    continue;
                                }
                                this.makePen(pen);
                                list.push(pen);
                            }
                        }
                        catch (e_12_1) { e_12 = { error: e_12_1 }; }
                        finally {
                            try {
                                if (pens_5_1 && !pens_5_1.done && (_b = pens_5.return)) _b.call(pens_5);
                            }
                            finally { if (e_12) throw e_12.error; }
                        }
                        this.render();
                        this.store.emitter.emit('add', list);
                        if (history) {
                            this.pushHistory({ type: EditType.Add, pens: deepClone(list, true) });
                        }
                        return [2 /*return*/, list];
                }
            });
        });
    };
    /**
     * 获取初始化的 pencilLine
     * @param pt 需包含 penId
     */
    Canvas.prototype.getInitPencilLine = function (pt) {
        var _a = this.store, data = _a.data, options = _a.options;
        var scale = data.scale;
        var lineWidth = data.lineWidth || 1;
        return {
            id: pt.penId,
            name: 'line',
            x: pt.x,
            y: pt.y,
            type: PenType.Line,
            calculative: {
                canvas: this,
                pencil: true,
                active: true,
                worldAnchors: [pt],
                lineWidth: lineWidth * scale,
            },
            fromArrow: data.fromArrow || options.fromArrow,
            toArrow: data.toArrow || options.toArrow,
            lineWidth: lineWidth,
        };
    };
    /**
     * 获取初始化的 drawingLine
     * @param pt 需包含 penId
     */
    Canvas.prototype.createDrawingLine = function (pt) {
        this.inactive();
        var _a = this.store, data = _a.data, options = _a.options;
        var scale = data.scale;
        var lineWidth = data.lineWidth || 1;
        pt.penId = s8();
        return {
            id: pt.penId,
            name: 'line',
            lineName: this.drawingLineName,
            x: pt.x,
            y: pt.y,
            type: PenType.Line,
            calculative: {
                canvas: this,
                active: true,
                worldAnchors: [pt],
                lineWidth: lineWidth * scale,
            },
            fromArrow: data.fromArrow || options.fromArrow,
            toArrow: data.toArrow || options.toArrow,
            lineWidth: lineWidth,
        };
    };
    Canvas.prototype.addRuleLine = function (e) {
        var _a = this.store.data, offsetX = _a.x, offsetY = _a.y;
        // 靠近左上角的 x ，y
        var x = e.x + offsetX;
        var y = e.y + offsetY;
        var lineX = e.x;
        var lineY = e.y;
        var width = 0;
        var height = 0;
        var otherPX = 0;
        var otherPY = 0;
        if (x <= y && x < 20) {
            // 绘制一条水平线
            lineX = -offsetX;
            width = this.width;
            otherPX = 1;
        }
        else if (y < x && y < 20) {
            // 绘制一条垂直线
            lineY = -offsetY;
            height = this.height;
            otherPY = 1;
        }
        else {
            return;
        }
        this.addPen({
            isRuleLine: true,
            // locked: LockState.DisableMove,
            type: PenType.Line,
            name: 'line',
            lineName: 'line',
            x: lineX,
            y: lineY,
            width: width,
            height: height,
            color: this.store.options.ruleLineColor,
            anchors: [
                {
                    x: 0,
                    y: 0,
                },
                {
                    x: otherPX,
                    y: otherPY,
                },
            ],
        });
    };
    /**
     * 拖拽结束，数据更新到 active.pens
     */
    Canvas.prototype.movedActivePens = function (readyConnect) {
        var _this = this;
        // 鼠标松手才更新，此处是更新前的值
        var initPens = deepClone(this.store.active, true);
        var pens = deepClone(this.store.active, true);
        this.store.active.forEach(function (pen, i) {
            var _a;
            var _b = _this.movingPens[i], x = _b.x, y = _b.y;
            Object.assign(pen, {
                x: x,
                y: y,
            });
            (_a = pen.onMove) === null || _a === void 0 ? void 0 : _a.call(pen, pen);
            _this.updatePenRect(pen);
            _this.updateLines(pen);
            _this.store.emitter.emit('updateLines', pen);
            // TODO: mouseup 中重复执行 patchFlagsLines
            _this.patchFlagsLines.forEach(function (pen) {
                if (pen.type) {
                    _this.initLineRect(pen);
                }
            });
            _this.patchFlagsLines.clear();
            pen.calculative.x = pen.x;
            pen.calculative.y = pen.y;
            if (pen.calculative.initRect) {
                pen.calculative.initRect.x = pen.calculative.x;
                pen.calculative.initRect.y = pen.calculative.y;
                pen.calculative.initRect.ex = pen.calculative.x + pen.calculative.width;
                pen.calculative.initRect.ey =
                    pen.calculative.y + pen.calculative.height;
            }
        });
        // active 消息表示拖拽结束
        this.store.emitter.emit('active', this.store.active);
        this.initImageCanvas(this.store.active);
        var _a = this.dock, xDock = _a.xDock, yDock = _a.yDock;
        var dockPen;
        if (xDock) {
            dockPen = this.store.pens[xDock.penId];
        }
        if (!dockPen && yDock) {
            dockPen = this.store.pens[yDock.penId];
        }
        // 移动到连线端点，自动连线
        if (readyConnect &&
            this.store.active.length === 1 &&
            (dockPen === null || dockPen === void 0 ? void 0 : dockPen.type) === 1 &&
            ((xDock === null || xDock === void 0 ? void 0 : xDock.anchorId) || (yDock === null || yDock === void 0 ? void 0 : yDock.anchorId))) {
            var from = getFromAnchor(dockPen);
            var to = getToAnchor(dockPen);
            if (xDock === null || xDock === void 0 ? void 0 : xDock.anchorId) {
                var anchor = this.store.pens[this.store.active[0].id + movingSuffix].calculative.worldAnchors.find(function (item) { return item.id === xDock.anchorId; });
                if (anchor.x === from.x && anchor.y === from.y) {
                    initPens.push(deepClone(dockPen, true));
                    connectLine(this.store.active[0], anchor, dockPen, from);
                    pens.push(deepClone(dockPen, true));
                }
                else if (anchor.x === to.x && anchor.y === to.y) {
                    initPens.push(deepClone(dockPen, true));
                    connectLine(this.store.active[0], anchor, dockPen, to);
                    pens.push(deepClone(dockPen, true));
                }
            }
            else if (yDock === null || yDock === void 0 ? void 0 : yDock.anchorId) {
                var anchor = this.store.pens[this.store.active[0].id + movingSuffix].calculative.worldAnchors.find(function (item) { return item.id === yDock.anchorId; });
                if (anchor.x === from.x && anchor.y === from.y) {
                    initPens.push(deepClone(dockPen, true));
                    connectLine(this.store.active[0], anchor, dockPen, from);
                    pens.push(deepClone(dockPen, true));
                }
                else if (anchor.x === to.x && anchor.y === to.y) {
                    initPens.push(deepClone(dockPen, true));
                    connectLine(this.store.active[0], anchor, dockPen, to);
                    pens.push(deepClone(dockPen, true));
                }
            }
        }
        // 此处是更新后的值
        this.pushHistory({
            type: EditType.Update,
            pens: pens,
            initPens: initPens,
        });
    };
    /**
     * 复制移动后的笔
     */
    Canvas.prototype.copyMovedPens = function () {
        var _this = this;
        // 复制行为
        this.copy(this.store.active.map(function (pen, i) {
            // TODO: 移动只更改 x,y 值，不更新其他属性
            // 若需要更改 anchors ，注意 anchors connectTo 问题
            // const { x, y, width, height, anchors } = this.movingPens[i];
            /**
             * TODO: line 类型无法取到移动后的 x，y 值
             * 所以 patchFlagsLines 需要放到 copyMovedPens 前
             * */
            var _a = _this.movingPens[i], x = _a.x, y = _a.y;
            return __assign(__assign({}, pen), { x: x, y: y });
        }));
        // 偏移量 0
        this.pasteOffset = 0;
        this.paste();
    };
    /**
     * 若本次改变的画笔存在图片，并且在上层 or 下层，需要擦除上层 or 下层
     * 子节点中包含图片，也需要重绘
     * @param pens 本次改变的 pens
     */
    Canvas.prototype.initImageCanvas = function (pens) {
        var _this = this;
        pens.some(function (pen) { return _this.hasImage(pen, false); }) && this.canvasImage.init();
        pens.some(function (pen) { return _this.hasImage(pen, true); }) &&
            this.canvasImageBottom.init();
    };
    Canvas.prototype.hasImage = function (pen, isBottom) {
        var _this = this;
        var _a;
        if (pen.image && pen.name !== 'gif' && !pen.isBottom == !isBottom) {
            return true;
        }
        return (_a = pen.children) === null || _a === void 0 ? void 0 : _a.some(function (childId) {
            var child = _this.store.pens[childId];
            return child && _this.hasImage(child, isBottom);
        });
    };
    Canvas.prototype.inactive = function (drawing) {
        if (!this.store.active.length) {
            return;
        }
        this.store.active.forEach(function (pen) {
            pen.calculative.active = undefined;
            pen.calculative.activeAnchor = undefined;
            setChildrenActive(pen, false);
        });
        !drawing && this.store.emitter.emit('inactive', this.store.active);
        this.store.active = [];
        this.activeRect = undefined;
        this.sizeCPs = undefined;
        this.store.activeAnchor = undefined;
        this.patchFlags = true;
    };
    Canvas.prototype.active = function (pens, emit) {
        var e_13, _a, _b;
        if (emit === void 0) { emit = true; }
        if (this.store.active) {
            try {
                for (var _c = __values(this.store.active), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var pen = _d.value;
                    pen.calculative.active = undefined;
                    setChildrenActive(pen, false);
                }
            }
            catch (e_13_1) { e_13 = { error: e_13_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_13) throw e_13.error; }
            }
        }
        this.store.active = [];
        pens.forEach(function (pen) {
            pen.calculative.active = true;
            setChildrenActive(pen);
        });
        (_b = this.store.active).push.apply(_b, __spreadArray([], __read(pens), false));
        this.calcActiveRect();
        this.patchFlags = true;
        emit && this.store.emitter.emit('active', this.store.active);
    };
    Canvas.prototype.getSizeCPs = function () {
        var _this = this;
        this.sizeCPs = rectToPoints(this.activeRect);
        // 正上 正右 正下 正左
        var pts = [
            { x: 0.5, y: 0 },
            { x: 1, y: 0.5 },
            { x: 0.5, y: 1 },
            { x: 0, y: 0.5 },
        ];
        var _a = this.activeRect, x = _a.x, y = _a.y, width = _a.width, height = _a.height, rotate = _a.rotate, center = _a.center;
        pts.forEach(function (pt) {
            var p = {
                x: pt.x * width + x,
                y: pt.y * height + y,
            };
            rotatePoint(p, rotate, center);
            _this.sizeCPs.push(p);
        });
    };
    Canvas.prototype.clearHover = function () {
        this.hoverType = HoverType.None;
        this.store.hover = null;
        this.store.hoverAnchor = null;
    };
    Canvas.prototype.inAnchor = function (pt, pen, anchor) {
        var _a;
        this.store.hoverAnchor = undefined;
        this.movingAnchor = undefined;
        if (!anchor || anchor.locked > LockState.DisableEdit) {
            return HoverType.None;
        }
        if (this.store.options.disableAnchor || pen.disableAnchor) {
            return HoverType.None;
        }
        if ((this.mouseDown || this.drawingLine) &&
            pen.name === 'line' &&
            anchor.connectTo) {
            var connectPen = this.findOne(anchor.connectTo);
            if (!(connectPen === null || connectPen === void 0 ? void 0 : connectPen.calculative.active)) {
                pen = connectPen;
                var connectAnchor = connectPen.calculative.worldAnchors.find(function (item) { return item.id === anchor.anchorId; });
                connectAnchor && (anchor = connectAnchor);
            }
        }
        if (anchor.twoWay === TwoWay.Disable && pen.name !== 'line') {
            return HoverType.None;
        }
        if (pen.name === 'line' && anchor.connectTo) {
            var _anchor = (_a = this.findOne(anchor.connectTo)) === null || _a === void 0 ? void 0 : _a.anchors.find(function (item) { return item.id === anchor.anchorId; });
            if (_anchor && _anchor.twoWay) {
                return HoverType.None;
            }
        }
        if (this.drawingLine) {
            if (anchor.twoWay === TwoWay.Out) {
                return HoverType.None;
            }
        }
        else {
            if (this.mouseDown && this.hoverType === HoverType.LineAnchor) {
            }
            else if (anchor.twoWay === TwoWay.In) {
                return HoverType.None;
            }
        }
        if (hitPoint(pt, anchor, this.pointSize)) {
            if (anchor !== this.store.hoverAnchor) {
                this.patchFlags = true;
            }
            this.store.hoverAnchor = anchor;
            this.store.hover = pen;
            // if (pen.name === 'line' && anchor.connectTo) {
            //   const connectPen = this.findOne(anchor.connectTo);
            //   if (!connectPen.calculative.active) {
            //     this.store.hover = connectPen;
            //     const connectAnchor = connectPen.calculative.worldAnchors.find(
            //       (item) => item.id === anchor.anchorId
            //     );
            //     this.store.hoverAnchor = connectAnchor;
            //     console.log('hover', connectAnchor);
            //   }
            // }
            // console.log('hover', pen, anchor);
            if (pen.type) {
                if (anchor.connectTo && !pen.calculative.active) {
                    this.store.hover = this.store.pens[anchor.connectTo];
                    if (this.store.hover) {
                        this.store.hoverAnchor =
                            this.store.hover.calculative.worldAnchors.find(function (a) { return a.id === anchor.anchorId; });
                        this.externalElements.style.cursor = 'crosshair';
                        return HoverType.NodeAnchor;
                    }
                }
                if (this.hotkeyType === HotkeyType.AddAnchor) {
                    this.externalElements.style.cursor = 'vertical-text';
                }
                else {
                    this.externalElements.style.cursor = 'pointer';
                }
                return HoverType.LineAnchor;
            }
            if (this.hotkeyType === HotkeyType.AddAnchor) {
                this.externalElements.style.cursor = 'vertical-text';
            }
            else {
                this.externalElements.style.cursor = 'crosshair';
            }
            return HoverType.NodeAnchor;
        }
        if (!this.mouseDown && pen.type) {
            if (pen.calculative.active &&
                anchor.prev &&
                hitPoint(pt, anchor.prev, this.pointSize)) {
                this.store.hoverAnchor = anchor;
                this.store.hover = pen;
                this.externalElements.style.cursor = 'pointer';
                return HoverType.LineAnchorPrev;
            }
            if (pen.calculative.active &&
                anchor.next &&
                hitPoint(pt, anchor.next, this.pointSize)) {
                this.store.hoverAnchor = anchor;
                this.store.hover = pen;
                this.externalElements.style.cursor = 'pointer';
                return HoverType.LineAnchorNext;
            }
        }
        return HoverType.None;
    };
    Canvas.prototype.resize = function (w, h) {
        var e_14, _a;
        w = w || this.parentElement.clientWidth;
        h = h || this.parentElement.clientHeight;
        this.width = w;
        this.height = h;
        this.canvasRect = {
            x: 0,
            y: 0,
            width: w,
            height: h,
        };
        calcRightBottom(this.canvasRect);
        this.canvas.style.width = w + 'px';
        this.canvas.style.height = h + 'px';
        this.externalElements.style.width = w + 'px';
        this.externalElements.style.height = h + 'px';
        this.canvasImage.resize(w, h);
        this.canvasImageBottom.resize(w, h);
        this.magnifierCanvas.resize(w, h);
        w = (w * this.store.dpiRatio) | 0;
        h = (h * this.store.dpiRatio) | 0;
        this.canvas.width = w;
        this.canvas.height = h;
        this.offscreen.width = w;
        this.offscreen.height = h;
        this.clientRect = this.externalElements.getBoundingClientRect();
        this.canvas
            .getContext('2d')
            .scale(this.store.dpiRatio, this.store.dpiRatio);
        this.offscreen
            .getContext('2d')
            .scale(this.store.dpiRatio, this.store.dpiRatio);
        this.offscreen.getContext('2d').textBaseline = 'middle';
        this.render();
        try {
            // TODO 窗口大小变化没有刷新图纸
            for (var _b = __values(this.store.data.pens), _c = _b.next(); !_c.done; _c = _b.next()) {
                var pen = _c.value;
                calcInView(pen);
            }
        }
        catch (e_14_1) { e_14 = { error: e_14_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_14) throw e_14.error; }
        }
    };
    Canvas.prototype.clearCanvas = function () {
        this.activeRect = undefined;
        this.sizeCPs = undefined;
        this.canvas
            .getContext('2d')
            .clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.offscreen
            .getContext('2d')
            .clearRect(0, 0, this.offscreen.width, this.offscreen.height);
        this.canvasImage.clear();
        this.canvasImageBottom.clear();
    };
    Canvas.prototype.addPen = function (pen, history, emit) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.beforeAddPens;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.beforeAddPens([pen])];
                    case 1:
                        _a = (_b.sent()) != true;
                        _b.label = 2;
                    case 2:
                        if (_a) {
                            return [2 /*return*/];
                        }
                        if (this.beforeAddPen && this.beforeAddPen(pen) != true) {
                            return [2 /*return*/];
                        }
                        this.makePen(pen);
                        this.active([pen]);
                        this.render();
                        emit && this.store.emitter.emit('add', [pen]);
                        if (history) {
                            this.pushHistory({ type: EditType.Add, pens: [pen] });
                        }
                        return [2 /*return*/, pen];
                }
            });
        });
    };
    Canvas.prototype.pushHistory = function (action) {
        var _this = this;
        var _a;
        if (this.store.data.locked) {
            return;
        }
        var _b = this.store.data, origin = _b.origin, scale = _b.scale;
        action.origin = deepClone(origin);
        action.scale = scale;
        if (action.type !== EditType.Update && action.pens) {
            action.pens.forEach(function (pen) {
                pen.calculative &&
                    (pen.calculative.layer = _this.store.data.pens.findIndex(function (p) { return p.id === pen.id; }));
            });
        }
        if (this.store.historyIndex < this.store.histories.length - 1) {
            this.store.histories.splice(this.store.historyIndex + 1, this.store.histories.length - this.store.historyIndex - 1);
        }
        (_a = action.pens) === null || _a === void 0 ? void 0 : _a.forEach(function (pen) {
            var e_15, _a;
            var found;
            if (action.initPens) {
                try {
                    for (var _b = __values(action.initPens), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var p = _c.value;
                        if (p.id === pen.id) {
                            found = p;
                        }
                    }
                }
                catch (e_15_1) { e_15 = { error: e_15_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_15) throw e_15.error; }
                }
            }
            if (found) {
                for (var k in pen) {
                    if (found[k] == undefined) {
                        found[k] = undefined;
                    }
                }
            }
        });
        this.store.histories.push(action);
        this.store.historyIndex = this.store.histories.length - 1;
        this.store.emitter.emit('update', {
            previous: action.initPens,
            current: action.pens,
        });
    };
    Canvas.prototype.undo = function () {
        if (this.store.data.locked ||
            this.store.historyIndex == null ||
            this.store.historyIndex < 0) {
            return;
        }
        var action = this.store.histories[this.store.historyIndex--];
        this.doEditAction(action, true);
        var step = action.step;
        while (step > 1) {
            var action_1 = this.store.histories[this.store.historyIndex--];
            this.doEditAction(action_1, true);
            step--;
        }
        if (action.type == EditType.Add || EditType.Delete) {
            this.activeHistory();
        }
    };
    Canvas.prototype.redo = function () {
        if (this.store.data.locked ||
            this.store.historyIndex == null ||
            this.store.historyIndex > this.store.histories.length - 2) {
            return;
        }
        var action = this.store.histories[++this.store.historyIndex];
        this.doEditAction(action, false);
        var step = action.step;
        while (step > 1) {
            var action_2 = this.store.histories[++this.store.historyIndex];
            this.doEditAction(action_2, false);
            step--;
        }
        if (action.type == EditType.Add || EditType.Delete) {
            this.activeHistory();
        }
    };
    Canvas.prototype.activeHistory = function () {
        var _this = this;
        var before = this.store.histories[this.store.historyIndex];
        if (before) {
            before.pens.forEach(function (pen) {
                if (!pen.calculative) {
                    return;
                }
                pen.calculative.canvas = _this;
            });
            this.active(before.pens);
        }
    };
    Canvas.prototype.doEditAction = function (action, undo) {
        var _this = this;
        this.inactive();
        this.store.hoverAnchor = undefined;
        this.store.hover = undefined;
        switch (action.type) {
            case EditType.Add:
                action.pens.forEach(function (aPen) {
                    var _a;
                    var pen = deepClone(aPen, true);
                    var i = _this.store.data.pens.findIndex(function (item) { return item.id === pen.id; });
                    if (i > -1) {
                        _this.store.data.pens.splice(i, 1);
                        _this.store.pens[pen.id] = undefined;
                        pen.calculative.canvas = _this;
                        _this.store.animates.delete(pen);
                        (_a = pen.onDestroy) === null || _a === void 0 ? void 0 : _a.call(pen, pen);
                    }
                });
                action.type = EditType.Delete;
                break;
            case EditType.Update:
                var pens = undo ? action.initPens : action.pens;
                var unPens_1 = undo ? action.pens : action.initPens;
                pens.forEach(function (p) {
                    var pen = deepClone(p, true);
                    var i = _this.store.data.pens.findIndex(function (item) { return item.id === pen.id; });
                    if (i > -1) {
                        pen.calculative = _this.store.data.pens[i].calculative;
                        _this.store.data.pens[i] = pen;
                        _this.store.pens[pen.id] = pen;
                        for (var k in pen) {
                            if (typeof pen[k] !== 'object' || k === 'lineDash') {
                                pen.calculative[k] = pen[k];
                            }
                        }
                        pen.calculative.image = undefined;
                        var rect = _this.getPenRect(pen, action.origin, action.scale);
                        _this.setPenRect(pen, rect, false);
                        _this.updateLines(pen, true);
                        if (pen.calculative.canvas.parent.isCombine(pen)) {
                            var unPen_1 = unPens_1.find(function (item) { return item.id === pen.id; });
                            inheritanceProps.forEach(function (key) {
                                var _a;
                                if (pen[key] !== unPen_1[key]) {
                                    _this.parent.setValue((_a = { id: pen.id }, _a[key] = pen[key], _a), { render: true, doEvent: false });
                                }
                            });
                        }
                    }
                });
                break;
            case EditType.Delete:
                action.pens.forEach(function (aPen) {
                    var pen = deepClone(aPen, true);
                    _this.store.data.pens.splice(pen.calculative.layer, 0, pen);
                    // 先放进去，pens 可能是子节点在前，而父节点在后
                    _this.store.pens[pen.id] = pen;
                    pen.calculative.canvas = _this;
                });
                action.pens.forEach(function (aPen) {
                    var pen = _this.store.pens[aPen.id];
                    var rect = _this.getPenRect(pen, action.origin, action.scale);
                    _this.setPenRect(pen, rect, false);
                    pen.calculative.image = undefined;
                    pen.calculative.backgroundImage = undefined;
                    pen.calculative.strokeImage = undefined;
                    _this.loadImage(pen);
                });
                action.type = EditType.Add;
                break;
        }
        if (action.type === EditType.Update) {
            this.initImageCanvas(__spreadArray(__spreadArray([], __read(action.pens), false), __read(action.initPens), false));
        }
        else {
            this.initImageCanvas(action.pens);
        }
        this.render();
        this.store.emitter.emit(undo ? 'undo' : 'redo', action);
    };
    Canvas.prototype.makePen = function (pen) {
        var _this = this;
        if (!pen.id) {
            pen.id = s8();
        }
        this.store.data.pens.push(pen);
        this.store.pens[pen.id] = pen;
        // 集中存储path，避免数据冗余过大
        if (pen.path) {
            !pen.pathId && (pen.pathId = s8());
            var paths = this.store.data.paths;
            !paths[pen.pathId] && (paths[pen.pathId] = pen.path);
            pen.path = undefined;
        }
        // end
        if (pen.lineWidth == undefined) {
            pen.lineWidth = 1;
        }
        var _a = this.store.options, fontSize = _a.fontSize, lineHeight = _a.lineHeight;
        if (!pen.fontSize) {
            pen.fontSize = fontSize;
        }
        if (!pen.lineHeight) {
            pen.lineHeight = lineHeight;
        }
        pen.calculative = { canvas: this };
        if (pen.video || pen.audio) {
            pen.calculative.onended = function (pen) {
                _this.nextAnimate(pen);
            };
        }
        for (var k in pen) {
            if (typeof pen[k] !== 'object' || k === 'lineDash') {
                pen.calculative[k] = pen[k];
            }
        }
        pen.calculative.image = undefined;
        pen.calculative.backgroundImage = undefined;
        pen.calculative.strokeImage = undefined;
        if (!pen.anchors && globalStore.anchors[pen.name]) {
            if (!pen.anchors) {
                pen.anchors = [];
            }
            globalStore.anchors[pen.name](pen);
        }
        this.updatePenRect(pen);
        if (!pen.anchors && pen.calculative.worldAnchors) {
            pen.anchors = pen.calculative.worldAnchors.map(function (pt) {
                return calcRelativePoint(pt, pen.calculative.worldRect);
            });
        }
        !pen.rotate && (pen.rotate = 0);
        this.loadImage(pen);
    };
    Canvas.prototype.drawline = function (mouse) {
        var _a;
        if (!this.drawingLine) {
            return;
        }
        (_a = this[this.drawingLineName]) === null || _a === void 0 ? void 0 : _a.call(this, this.store, this.drawingLine, mouse);
        this.store.path2dMap.set(this.drawingLine, globalStore.path2dDraws.line(this.drawingLine));
        this.patchFlags = true;
    };
    Canvas.prototype.initLineRect = function (pen) {
        var _a;
        if (!pen) {
            return;
        }
        if (!((_a = pen.calculative.worldAnchors) === null || _a === void 0 ? void 0 : _a.length)) {
            this._del([pen]);
            return;
        }
        if (!isFinite(pen.x) || !isFinite(pen.x)) {
            return;
        }
        if (pen.x == null || pen.y == null) {
            return;
        }
        var rect = getLineRect(pen);
        if (!pen.parentId) {
            Object.assign(pen, rect);
        }
        var _b = this.store.options, fontSize = _b.fontSize, lineHeight = _b.lineHeight;
        if (!pen.fontSize) {
            pen.fontSize = fontSize;
            pen.calculative.fontSize = pen.fontSize * this.store.data.scale;
        }
        if (!pen.lineHeight) {
            pen.lineHeight = lineHeight;
            pen.calculative.lineHeight = pen.lineHeight;
        }
        calcCenter(rect);
        pen.calculative.worldRect = rect;
        calcPadding(pen, rect);
        calcTextRect(pen);
        calcInView(pen);
        this.store.path2dMap.set(pen, globalStore.path2dDraws[pen.name](pen));
        if (pen.calculative.worldAnchors) {
            pen.anchors = pen.calculative.worldAnchors.map(function (pt) {
                return calcRelativePoint(pt, pen.calculative.worldRect);
            });
        }
    };
    Canvas.prototype.drawingPencil = function () {
        lockedError(this.store);
        this.pencil = true;
        this.externalElements.style.cursor = 'crosshair';
    };
    Canvas.prototype.stopPencil = function () {
        this.pencil = false;
        this.pencilLine = undefined;
        this.externalElements.style.cursor = 'default';
    };
    Canvas.prototype.finishDrawline = function (end) {
        return __awaiter(this, void 0, void 0, function () {
            var from, to, line, rect, allowAdd, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.drawingLine) {
                            return [2 /*return*/];
                        }
                        from = getFromAnchor(this.drawingLine);
                        to = getToAnchor(this.drawingLine);
                        if (to.isTemp) {
                            this.drawingLine.calculative.worldAnchors.pop();
                            to = getToAnchor(this.drawingLine);
                        }
                        if (!end) {
                            !to.connectTo && this.drawingLine.calculative.worldAnchors.pop();
                            if (getFromAnchor(this.drawingLine) ===
                                this.drawingLine.calculative.activeAnchor) {
                                this.drawingLine = undefined;
                                this.render();
                                return [2 /*return*/];
                            }
                        }
                        if (!from.connectTo || !to.connectTo) {
                            if (this.store.options.disableEmptyLine) {
                                // 有一端未连线，且 禁止创建空线条
                                this.drawingLine = undefined;
                                this.render();
                                return [2 /*return*/];
                            }
                        }
                        else {
                            if (this.store.options.disableRepeatLine) {
                                line = this.store.data.pens.find(function (pen) {
                                    if (pen.type) {
                                        var penFrom = getFromAnchor(pen);
                                        var penTo = getToAnchor(pen);
                                        return samePoint(penFrom, from) && samePoint(penTo, to);
                                    }
                                });
                                if (line) {
                                    // 存在重复连线
                                    this.drawingLine = undefined;
                                    this.render();
                                    return [2 /*return*/];
                                }
                            }
                        }
                        rect = getLineRect(this.drawingLine);
                        Object.assign(this.drawingLine, rect);
                        this.drawingLine.calculative.worldRect = rect;
                        this.drawingLine.calculative.activeAnchor = getToAnchor(this.drawingLine);
                        this.store.activeAnchor = this.drawingLine.calculative.activeAnchor;
                        _a = !this.beforeAddPens;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.beforeAddPens([this.drawingLine])];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        allowAdd = (_a) &&
                            (!this.beforeAddPen || this.beforeAddPen(this.drawingLine));
                        if (allowAdd) {
                            this.initLineRect(this.drawingLine);
                            this.store.data.pens.push(this.drawingLine);
                            this.store.pens[this.drawingLine.id] = this.drawingLine;
                            this.store.emitter.emit('add', [this.drawingLine]);
                            this.active([this.drawingLine]);
                            this.pushHistory({
                                type: EditType.Add,
                                pens: deepClone([this.drawingLine], true),
                            });
                        }
                        this.store.path2dMap.set(this.drawingLine, globalStore.path2dDraws[this.drawingLine.name](this.drawingLine));
                        this.drawingLine = undefined;
                        this.drawingLineName = undefined;
                        this.render();
                        return [2 /*return*/];
                }
            });
        });
    };
    Canvas.prototype.finishPencil = function () {
        return __awaiter(this, void 0, void 0, function () {
            var anchors, p, allowAdd, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.pencilLine) return [3 /*break*/, 4];
                        anchors = simplify(this.pencilLine.calculative.worldAnchors, 10, 0, this.pencilLine.calculative.worldAnchors.length - 1);
                        p = getFromAnchor(this.pencilLine);
                        anchors.unshift({ id: p.id, penId: p.penId, x: p.x, y: p.y });
                        p = getToAnchor(this.pencilLine);
                        anchors.push({ id: p.id, penId: p.penId, x: p.x, y: p.y });
                        this.pencilLine.calculative.worldAnchors = smoothLine(anchors);
                        if (!(this.pencilLine.calculative.worldAnchors.length > 1)) return [3 /*break*/, 3];
                        this.pencilLine.calculative.pencil = false;
                        this.store.path2dMap.set(this.pencilLine, globalStore.path2dDraws[this.pencilLine.name](this.pencilLine));
                        _a = !this.beforeAddPens;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.beforeAddPens([this.pencilLine])];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        allowAdd = (_a) &&
                            (!this.beforeAddPen || this.beforeAddPen(this.pencilLine));
                        if (allowAdd) {
                            this.initLineRect(this.pencilLine);
                            this.store.data.pens.push(this.pencilLine);
                            this.store.pens[this.pencilLine.id] = this.pencilLine;
                            this.store.emitter.emit('add', [this.pencilLine]);
                            this.active([this.pencilLine]);
                            this.pushHistory({
                                type: EditType.Add,
                                pens: deepClone([this.pencilLine], true),
                            });
                        }
                        _b.label = 3;
                    case 3:
                        this.pencilLine = undefined;
                        this.render();
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 火狐浏览器无法绘制 svg 不存在 width height 的问题
     * 此方法手动添加 width 和 height 解决火狐浏览器绘制 svg
     * @param pen
     */
    Canvas.prototype.firefoxLoadSvg = function (pen) {
        var _this = this;
        var img = new Image();
        // request the XML of your svg file
        var request = new XMLHttpRequest();
        request.open('GET', pen.image, true);
        request.onload = function () {
            // once the request returns, parse the response and get the SVG
            var parser = new DOMParser();
            var result = parser.parseFromString(request.responseText, 'text/xml');
            var inlineSVG = result.getElementsByTagName('svg')[0];
            var _a = pen.calculative.worldRect, width = _a.width, height = _a.height;
            // add the attributes Firefox needs. These should be absolute values, not relative
            inlineSVG.setAttribute('width', width + "px");
            inlineSVG.setAttribute('height', height + "px");
            // convert the SVG to a data uri
            var svg64 = btoa(unescape(encodeURIComponent(new XMLSerializer().serializeToString(inlineSVG))));
            var image64 = 'data:image/svg+xml;base64,' + svg64;
            // set that as your image source
            img.src = image64;
            // do your canvas work
            img.onload = function () {
                pen.calculative.img = img;
                pen.calculative.imgNaturalWidth = img.naturalWidth || pen.iconWidth;
                pen.calculative.imgNaturalHeight = img.naturalHeight || pen.iconHeight;
                globalStore.htmlElements[pen.image] = img;
                _this.imageLoaded();
            };
        };
        // send the request
        request.send();
    };
    Canvas.prototype.loadImage = function (pen) {
        var _this = this;
        if (pen.image !== pen.calculative.image) {
            pen.calculative.img = undefined;
            if (pen.image) {
                if (globalStore.htmlElements[pen.image]) {
                    var img = globalStore.htmlElements[pen.image];
                    pen.calculative.img = img;
                    pen.calculative.imgNaturalWidth = img.naturalWidth || pen.iconWidth;
                    pen.calculative.imgNaturalHeight =
                        img.naturalHeight || pen.iconHeight;
                    this.imageLoaded(); // TODO: 重绘图片层 有延时器，可能卡顿
                }
                else {
                    if (navigator.userAgent.includes('Firefox') &&
                        pen.image.endsWith('.svg')) {
                        // 火狐浏览器 svg 图片需要特殊处理
                        this.firefoxLoadSvg(pen);
                    }
                    else {
                        var img_1 = new Image();
                        img_1.crossOrigin = 'anonymous';
                        img_1.src = pen.image;
                        img_1.onload = function () {
                            pen.calculative.img = img_1;
                            pen.calculative.imgNaturalWidth =
                                img_1.naturalWidth || pen.iconWidth;
                            pen.calculative.imgNaturalHeight =
                                img_1.naturalHeight || pen.iconHeight;
                            globalStore.htmlElements[pen.image] = img_1;
                            _this.imageLoaded();
                        };
                    }
                }
            }
            pen.calculative.image = pen.image;
        }
        if (pen.backgroundImage !== pen.calculative.backgroundImage) {
            pen.calculative.backgroundImg = undefined;
            if (pen.backgroundImage) {
                if (globalStore.htmlElements[pen.backgroundImage]) {
                    var img = globalStore.htmlElements[pen.backgroundImage];
                    pen.calculative.backgroundImg = img;
                }
                else {
                    var img_2 = new Image();
                    img_2.crossOrigin = 'anonymous';
                    img_2.src = pen.backgroundImage;
                    img_2.onload = function () {
                        pen.calculative.backgroundImg = img_2;
                        globalStore.htmlElements[pen.backgroundImage] = img_2;
                        _this.imageLoaded();
                    };
                }
            }
            pen.calculative.backgroundImage = pen.backgroundImage;
        }
        if (pen.strokeImage !== pen.calculative.strokeImage) {
            pen.calculative.strokeImg = undefined;
            if (pen.strokeImage) {
                if (globalStore.htmlElements[pen.strokeImage]) {
                    var img = globalStore.htmlElements[pen.strokeImage];
                    pen.calculative.strokeImg = img;
                }
                else {
                    var img_3 = new Image();
                    img_3.crossOrigin = 'anonymous';
                    img_3.src = pen.strokeImage;
                    img_3.onload = function () {
                        pen.calculative.strokeImg = img_3;
                        globalStore.htmlElements[pen.strokeImage] = img_3;
                        _this.imageLoaded();
                    };
                }
            }
            pen.calculative.strokeImage = pen.strokeImage;
        }
    };
    // 避免初始化图片加载重复调用 render，此处防抖
    Canvas.prototype.imageLoaded = function () {
        var _this = this;
        this.imageTimer && clearTimeout(this.imageTimer);
        this.imageTimer = setTimeout(function () {
            // 加载完图片，重新渲染一次图片层
            _this.canvasImage.init();
            _this.canvasImageBottom.init();
            _this.render();
        }, 100);
    };
    Canvas.prototype.setCalculativeByScale = function (pen) {
        var scale = this.store.data.scale;
        pen.calculative.lineWidth = pen.lineWidth * scale;
        pen.calculative.fontSize = pen.fontSize * scale;
        if (pen.fontSize < 1) {
            pen.calculative.fontSize =
                pen.fontSize * pen.calculative.worldRect.height;
        }
        pen.calculative.iconSize = pen.iconSize * scale;
        pen.calculative.iconWidth = pen.iconWidth * scale;
        pen.calculative.iconHeight = pen.iconHeight * scale;
        pen.calculative.iconLeft =
            pen.iconLeft < 1 ? pen.iconLeft : pen.iconLeft * scale;
        pen.calculative.iconTop =
            pen.iconTop < 1 ? pen.iconTop : pen.iconTop * scale;
        pen.calculative.textWidth =
            pen.textWidth < 1 ? pen.textWidth : pen.textWidth * scale;
        pen.calculative.textHeight =
            pen.textHeight < 1 ? pen.textHeight : pen.textHeight * scale;
        pen.calculative.textLeft =
            pen.textLeft < 1 ? pen.textLeft : pen.textLeft * scale;
        pen.calculative.textTop =
            pen.textTop < 1 ? pen.textTop : pen.textTop * scale;
        if (pen.type === PenType.Line && pen.borderWidth) {
            pen.calculative.borderWidth = pen.borderWidth * scale;
        }
    };
    Canvas.prototype.updatePenRect = function (pen, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, worldRectIsReady = _b.worldRectIsReady, playingAnimate = _b.playingAnimate;
        if (worldRectIsReady) {
            calcPenRect(pen);
        }
        else {
            calcWorldRects(pen);
        }
        if (!playingAnimate) {
            this.setCalculativeByScale(pen);
        }
        calcWorldAnchors(pen);
        calcIconRect(this.store.pens, pen);
        calcTextRect(pen);
        calcInView(pen);
        globalStore.path2dDraws[pen.name] &&
            this.store.path2dMap.set(pen, globalStore.path2dDraws[pen.name](pen));
        pen.calculative.patchFlags = true;
        this.patchFlags = true;
        if (pen.children) {
            pen.children.forEach(function (id) {
                var child = _this.store.pens[id];
                child && _this.updatePenRect(child, { worldRectIsReady: false });
            });
        }
        pen.type && this.initLineRect(pen);
    };
    Canvas.prototype.translate = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.store.data.x += x * this.store.data.scale;
        this.store.data.y += y * this.store.data.scale;
        this.store.data.x = Math.round(this.store.data.x);
        this.store.data.y = Math.round(this.store.data.y);
        this.canvasImage.init();
        this.canvasImageBottom.init();
        this.render();
        this.store.emitter.emit('translate', {
            x: this.store.data.x,
            y: this.store.data.y,
        });
        this.tooltip.translate(x, y);
        if (this.scroll && this.scroll.isShow) {
            this.scroll.translate(x, y);
        }
        this.onMovePens();
    };
    Canvas.prototype.onMovePens = function () {
        var e_16, _a;
        var _b;
        var map = this.parent.map;
        if (map && map.isShow) {
            map.setView();
        }
        try {
            // 有移动操作的 画笔 需要执行移动
            for (var _c = __values(this.store.data.pens), _d = _c.next(); !_d.done; _d = _c.next()) {
                var pen = _d.value;
                calcInView(pen);
                (_b = pen.onMove) === null || _b === void 0 ? void 0 : _b.call(pen, pen);
                if (pen.isRuleLine) {
                    if (!pen.width) {
                        // 垂直线，移动 y 即可
                        pen.y = -this.store.data.y;
                    }
                    else if (!pen.height) {
                        // 水平线
                        pen.x = -this.store.data.x;
                    }
                    this.updatePenRect(pen);
                }
            }
        }
        catch (e_16_1) { e_16 = { error: e_16_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_16) throw e_16.error; }
        }
    };
    /**
     * 缩放整个画布
     * @param scale 缩放比例，最终的 data.scale
     * @param center 中心点，引用类型，存在副作用，会更改原值
     */
    Canvas.prototype.scale = function (scale, center) {
        var _this = this;
        var _a;
        if (center === void 0) { center = { x: 0, y: 0 }; }
        var _b = this.store.options, minScale = _b.minScale, maxScale = _b.maxScale;
        if (!(scale >= minScale && scale <= maxScale)) {
            return;
        }
        this.calibrateMouse(center);
        var s = scale / this.store.data.scale;
        this.store.data.scale = scale;
        this.store.data.center = center;
        if ((_a = this.store.clipboard) === null || _a === void 0 ? void 0 : _a.pos) {
            scalePoint(this.store.clipboard.pos, s, center);
        }
        scalePoint(this.store.data.origin, s, center);
        this.store.data.pens.forEach(function (pen) {
            if (pen.parentId) {
                return;
            }
            scalePen(pen, s, center);
            if (pen.isRuleLine) {
                // 扩大线的比例，若是放大，即不缩小，若是缩小，会放大
                var lineScale = s > 1 ? 1 : 1 / s / s;
                // 中心点即为线的中心
                var lineCenter = pen.calculative.worldRect.center;
                if (!pen.width) {
                    // 垂直线
                    scalePen(pen, lineScale, lineCenter);
                }
                else if (!pen.height) {
                    // 水平线
                    scalePen(pen, lineScale, lineCenter);
                }
            }
            _this.updatePenRect(pen, { worldRectIsReady: true });
            _this.execPenResize(pen);
        });
        this.calcActiveRect();
        this.canvasImage.init();
        this.canvasImageBottom.init();
        var map = this.parent.map;
        if (map && map.isShow) {
            map.setView();
        }
        this.render();
        this.store.emitter.emit('scale', this.store.data.scale);
    };
    Canvas.prototype.rotatePens = function (e) {
        var e_17, _a;
        var _this = this;
        if (!this.initPens) {
            this.initPens = deepClone(this.getAllByPens(this.store.active));
        }
        this.activeRect.rotate = calcRotate(e, this.activeRect.center);
        if (this.activeRect.rotate % 90 < 10) {
            this.activeRect.rotate -= this.activeRect.rotate % 90;
        }
        if (this.activeRect.rotate % 90 > 80) {
            this.activeRect.rotate += 90 - (this.activeRect.rotate % 90);
        }
        if (this.store.active.length === 1) {
            this.lastRotate = this.store.active[0].rotate || 0;
        }
        var angle = this.activeRect.rotate - this.lastRotate;
        try {
            for (var _b = __values(this.store.active), _c = _b.next(); !_c.done; _c = _b.next()) {
                var pen = _c.value;
                if (pen.parentId) {
                    return;
                }
                this.rotatePen(pen, angle, this.activeRect);
                pen.onRotate && pen.onRotate(pen);
                this.updateLines(pen);
            }
        }
        catch (e_17_1) { e_17 = { error: e_17_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_17) throw e_17.error; }
        }
        this.lastRotate = this.activeRect.rotate;
        this.getSizeCPs();
        this.initImageCanvas(this.store.active);
        this.render();
        this.store.emitter.emit('rotatePens', this.store.active);
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(function () {
            _this.timer = undefined;
            _this.pushHistory({
                type: EditType.Update,
                pens: deepClone(_this.getAllByPens(_this.store.active)),
                initPens: _this.initPens,
            });
            _this.initPens = undefined;
        }, 200);
    };
    Canvas.prototype.resizePens = function (e) {
        var _this = this;
        if (!this.initPens) {
            this.initPens = deepClone(this.store.active, true);
        }
        if (!this.initActiveRect) {
            this.initActiveRect = deepClone(this.activeRect);
            return;
        }
        var p1 = { x: this.mouseDown.x, y: this.mouseDown.y };
        var p2 = { x: e.x, y: e.y };
        // rotatePoint(p1, -this.activeRect.rotate, this.activeRect.center);
        // rotatePoint(p2, -this.activeRect.rotate, this.activeRect.center);
        var x = p2.x - p1.x;
        var y = p2.y - p1.y;
        var rect = deepClone(this.initActiveRect);
        if (e.shiftKey) {
            // if (x / y > rect.width / rect.height) {
            //   y = (rect.height / rect.width) * x;
            // } else {
            //   x = (rect.width / rect.height) * y;
            // }
            x = (rect.width / rect.height) * y;
        }
        // 得到最准确的 rect 即 resize 后的
        resizeRect(rect, x, y, this.resizeIndex);
        calcCenter(rect);
        if (!this.store.options.disableDock) {
            this.clearDock();
            var resizeDock = this.customResizeDock || calcResizeDock;
            this.dock = resizeDock(this.store, rect, this.store.active, this.resizeIndex);
            var _a = this.dock, xDock = _a.xDock, yDock = _a.yDock;
            if (xDock) {
                x += xDock.step;
                var dockPen = this.store.pens[xDock.penId];
                dockPen.calculative.isDock = true;
            }
            if (yDock) {
                y += yDock.step;
                var dockPen = this.store.pens[yDock.penId];
                dockPen.calculative.isDock = true;
            }
        }
        var w = this.activeRect.width;
        var h = this.activeRect.height;
        var offsetX = x - this.lastOffsetX;
        var offsetY = y - this.lastOffsetY;
        this.lastOffsetX = x;
        this.lastOffsetY = y;
        if (e.ctrlKey) {
            // 1，3 是右上角和左上角的点，此时的 offsetY 符号与 offsetX 是相反的
            var sign = [1, 3].includes(this.resizeIndex) ? -1 : 1;
            offsetY = (sign * (offsetX * h)) / w;
        }
        resizeRect(this.activeRect, offsetX, offsetY, this.resizeIndex);
        calcCenter(this.activeRect);
        var scaleX = this.activeRect.width / w;
        var scaleY = this.activeRect.height / h;
        this.store.active.forEach(function (pen, i) {
            pen.calculative.worldRect.x =
                _this.activeInitPos[i].x * _this.activeRect.width + _this.activeRect.x;
            pen.calculative.worldRect.y =
                _this.activeInitPos[i].y * _this.activeRect.height + _this.activeRect.y;
            pen.calculative.worldRect.width *= scaleX;
            pen.calculative.iconWidth && (pen.calculative.iconWidth *= scaleX);
            pen.calculative.worldRect.height *= scaleY;
            pen.calculative.iconHeight && (pen.calculative.iconHeight *= scaleY);
            calcRightBottom(pen.calculative.worldRect);
            calcCenter(pen.calculative.worldRect);
            _this.updatePenRect(pen, { worldRectIsReady: true });
            _this.execPenResize(pen);
            _this.updateLines(pen);
        });
        this.getSizeCPs();
        this.initImageCanvas(this.store.active);
        this.render();
        this.store.emitter.emit('resizePens', this.store.active);
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(function () {
            _this.timer = undefined;
            _this.pushHistory({
                type: EditType.Update,
                pens: deepClone(_this.store.active, true),
                initPens: _this.initPens,
            });
            _this.initPens = undefined;
        }, 200);
    };
    Canvas.prototype.movePens = function (e) {
        if (!this.activeRect || this.store.data.locked) {
            return;
        }
        if (!this.initActiveRect) {
            this.initActiveRect = deepClone(this.activeRect);
            return;
        }
        if (!this.store.options.moveConnectedLine &&
            this.store.active.length === 1 &&
            (this.store.active[0].anchors[0].connectTo ||
                this.store.active[0].anchors[this.store.active[0].anchors.length - 1]
                    .connectTo)) {
            return;
        }
        if (!this.movingPens) {
            this.initMovingPens();
            this.store.active.forEach(function (pen) {
                setHover(pen, false);
            });
            this.store.hover = undefined;
        }
        var x = e.x - this.mouseDown.x;
        var y = e.y - this.mouseDown.y;
        e.shiftKey && !e.ctrlKey && (x = 0);
        e.altKey && (y = 0);
        var rect = deepClone(this.initActiveRect);
        translateRect(rect, x, y);
        var offset = {
            x: rect.x - this.activeRect.x,
            y: rect.y - this.activeRect.y,
        };
        if (!this.store.options.disableDock) {
            this.clearDock();
            var moveDock = this.customMoveDock || calcMoveDock;
            this.dock = moveDock(this.store, rect, this.movingPens, offset);
            var _a = this.dock, xDock = _a.xDock, yDock = _a.yDock;
            var dockPen = void 0;
            if (xDock) {
                offset.x += xDock.step;
                dockPen = this.store.pens[xDock.penId];
                dockPen.calculative.isDock = true;
            }
            if (yDock) {
                offset.y += yDock.step;
                dockPen = this.store.pens[yDock.penId];
                dockPen.calculative.isDock = true;
            }
        }
        this.translatePens(this.movingPens, offset.x, offset.y, true);
    };
    /**
     * 初始化移动，更改画笔的 id parentId 等关联关系
     * @param pen 要修改的画笔
     * @param pens 本次操作的画笔们，包含子画笔
     */
    Canvas.prototype.changeIdsByMoving = function (pen, pens) {
        pen.id += movingSuffix;
        if (pen.parentId && pens.find(function (p) { return p.id === pen.parentId; })) {
            pen.parentId += movingSuffix;
        }
        if (pen.children) {
            pen.children = pen.children.map(function (child) { return child + movingSuffix; });
        }
        // 连接关系也需要变，用在 updateLines 中
        if (pen.connectedLines) {
            pen.connectedLines = pen.connectedLines.map(function (line) {
                if (pens.find(function (p) { return p.id === line.lineId; })) {
                    line.lineId += movingSuffix;
                }
                return line;
            });
        }
        if (pen.type && pen.calculative.worldAnchors) {
            pen.calculative.worldAnchors = pen.calculative.worldAnchors.map(function (anchor) {
                if (anchor.connectTo && pens.find(function (p) { return p.id === anchor.connectTo; })) {
                    anchor.connectTo += movingSuffix;
                }
                return anchor;
            });
        }
    };
    /**
     * 初始化 this.movingPens
     * 修改 ids （id parentId children 等）
     * 半透明，去图片
     */
    Canvas.prototype.initMovingPens = function () {
        var _this = this;
        if (!this.store.options.moveConnectedLine) {
            for (var i = 0; i < this.store.active.length; i++) {
                var pen = this.store.active[i];
                if (pen.anchors[0].connectTo ||
                    pen.anchors[pen.anchors.length - 1].connectTo) {
                    this.store.active.splice(i, 1);
                    pen.calculative.active = undefined;
                    --i;
                }
            }
        }
        this.movingPens = deepClone(this.store.active, true);
        var containChildPens = this.getAllByPens(this.movingPens);
        var copyContainChildPens = deepClone(containChildPens, true);
        // 考虑父子关系，修改 id
        containChildPens.forEach(function (pen) {
            _this.changeIdsByMoving(pen, copyContainChildPens);
            _this.store.pens[pen.id] = pen; // updatePenRect 时需要计算
            pen.calculative.canvas = _this;
            var value = {
                globalAlpha: 0.5,
            };
            // 线宽为 0 ，看不到外边框，拖动过程中给个外边框
            pen.lineWidth === 0 && (value.lineWidth = 1);
            // TODO: 例如 pen.name = 'triangle' 的情况，但有图片，是否还需要变成矩形呢？
            if (isDomShapes.includes(pen.name) || pen.image) {
                // 修改名称会执行 onDestroy ，清空它
                value.name = 'rectangle';
                value.onDestroy = undefined;
            }
            _this.updateValue(pen, value);
            pen.calculative.image = undefined;
        });
    };
    Canvas.prototype.moveLineAnchor = function (pt, keyOptions) {
        var _this = this;
        var _a, _b;
        if (!this.activeRect || this.store.data.locked) {
            return;
        }
        if (!this.initPens) {
            this.initPens = deepClone(this.store.active, true);
        }
        if ((_a = this.store.activeAnchor) === null || _a === void 0 ? void 0 : _a.connectTo) {
            var pen = this.store.pens[this.store.activeAnchor.connectTo];
            disconnectLine(pen, getAnchor(pen, this.store.activeAnchor.anchorId), this.store.pens[this.store.activeAnchor.penId], this.store.activeAnchor);
        }
        var line = this.store.active[0];
        var from = getFromAnchor(line);
        var to = getToAnchor(line);
        if (line.lineName === 'polyline' && !keyOptions.shiftKey) {
            translatePolylineAnchor(line, this.store.activeAnchor, pt);
        }
        else {
            var offsetX = pt.x - this.store.activeAnchor.x;
            var offsetY = pt.y - this.store.activeAnchor.y;
            translatePoint(this.store.activeAnchor, offsetX, offsetY);
            if (this.store.hover &&
                this.store.hoverAnchor &&
                this.store.hoverAnchor.penId !== this.store.activeAnchor.penId) {
                offsetX = this.store.hoverAnchor.x - this.store.activeAnchor.x;
                offsetY = this.store.hoverAnchor.y - this.store.activeAnchor.y;
                translatePoint(this.store.activeAnchor, offsetX, offsetY);
                to.prev = undefined;
                // 重新自动计算连线
                if (line.lineName !== 'polyline') {
                    (_b = this[line.lineName]) === null || _b === void 0 ? void 0 : _b.call(this, this.store, line);
                }
            }
        }
        this.patchFlagsLines.add(line);
        this.store.path2dMap.set(line, globalStore.path2dDraws[line.name](line));
        this.render();
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(function () {
            _this.timer = undefined;
            _this.pushHistory({
                type: EditType.Update,
                pens: deepClone(_this.store.active, true),
                initPens: _this.initPens,
            });
            _this.initPens = undefined;
        }, 500);
    };
    Canvas.prototype.moveLineAnchorPrev = function (e) {
        var _this = this;
        if (!this.activeRect ||
            this.store.data.locked ||
            !this.store.activeAnchor) {
            return;
        }
        if (!this.initPens) {
            this.initPens = deepClone(this.store.active, true);
        }
        this.store.activeAnchor.prev.x = e.x;
        this.store.activeAnchor.prev.y = e.y;
        if (this.store.activeAnchor.next) {
            if (!this.store.activeAnchor.prevNextType) {
                this.store.activeAnchor.next.x = e.x;
                this.store.activeAnchor.next.y = e.y;
                rotatePoint(this.store.activeAnchor.next, 180, this.store.activeAnchor);
            }
            else if (this.store.activeAnchor.prevNextType === PrevNextType.Bilateral) {
                var rotate = calcRotate(e, this.store.activeAnchor);
                var prevRotate = calcRotate(this.prevAnchor, this.store.activeAnchor);
                this.store.activeAnchor.next.x = this.nextAnchor.x;
                this.store.activeAnchor.next.y = this.nextAnchor.y;
                rotatePoint(this.store.activeAnchor.next, rotate - prevRotate, this.store.activeAnchor);
            }
        }
        var line = this.store.active[0];
        this.patchFlagsLines.add(line);
        this.store.path2dMap.set(line, globalStore.path2dDraws[line.name](line));
        this.render();
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(function () {
            _this.timer = undefined;
            _this.pushHistory({
                type: EditType.Update,
                pens: deepClone(_this.store.active, true),
                initPens: _this.initPens,
            });
            _this.initPens = undefined;
        }, 200);
    };
    Canvas.prototype.moveLineAnchorNext = function (e) {
        var _this = this;
        if (!this.activeRect || this.store.data.locked) {
            return;
        }
        if (!this.initPens) {
            this.initPens = deepClone(this.store.active, true);
        }
        this.store.activeAnchor.next.x = e.x;
        this.store.activeAnchor.next.y = e.y;
        if (this.store.activeAnchor.prev) {
            if (!this.store.activeAnchor.prevNextType) {
                this.store.activeAnchor.prev.x = e.x;
                this.store.activeAnchor.prev.y = e.y;
                rotatePoint(this.store.activeAnchor.prev, 180, this.store.activeAnchor);
            }
            else if (this.store.activeAnchor.prevNextType === PrevNextType.Bilateral) {
                var rotate = calcRotate(e, this.store.activeAnchor);
                var nextRotate = calcRotate(this.nextAnchor, this.store.activeAnchor);
                this.store.activeAnchor.prev.x = this.prevAnchor.x;
                this.store.activeAnchor.prev.y = this.prevAnchor.y;
                rotatePoint(this.store.activeAnchor.prev, rotate - nextRotate, this.store.activeAnchor);
            }
        }
        var line = this.store.active[0];
        this.patchFlagsLines.add(line);
        this.store.path2dMap.set(line, globalStore.path2dDraws[line.name](line));
        this.render();
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(function () {
            _this.timer = undefined;
            _this.pushHistory({
                type: EditType.Update,
                pens: deepClone(_this.store.active, true),
                initPens: _this.initPens,
            });
            _this.initPens = undefined;
        }, 200);
    };
    Canvas.prototype.setAnchor = function (e) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var initPens, hoverPen, _b, _c, pt, pt;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        initPens = [deepClone(this.store.hover, true)];
                        hoverPen = this.store.hover;
                        if (!this.store.hoverAnchor) return [3 /*break*/, 3];
                        _b = this.beforeRemoveAnchor;
                        if (!_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.beforeRemoveAnchor(hoverPen, this.store.hoverAnchor)];
                    case 1:
                        _b = !(_d.sent());
                        _d.label = 2;
                    case 2:
                        if (_b) {
                            return [2 /*return*/];
                        }
                        if (hoverPen.type === PenType.Line &&
                            ((_a = hoverPen.calculative.worldAnchors) === null || _a === void 0 ? void 0 : _a.length) <= 2) {
                            this.delete([hoverPen]);
                        }
                        else {
                            removePenAnchor(hoverPen, this.store.hoverAnchor);
                            if (hoverPen.type === PenType.Line) {
                                this.initLineRect(hoverPen);
                            }
                        }
                        this.store.hoverAnchor = undefined;
                        this.store.activeAnchor = undefined;
                        this.externalElements.style.cursor = 'default';
                        return [3 /*break*/, 6];
                    case 3:
                        if (!hoverPen) return [3 /*break*/, 6];
                        _c = this.beforeAddAnchor;
                        if (!_c) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.beforeAddAnchor(hoverPen, this.store.pointAt)];
                    case 4:
                        _c = !(_d.sent());
                        _d.label = 5;
                    case 5:
                        if (_c) {
                            return [2 /*return*/];
                        }
                        if (hoverPen.type === PenType.Line) {
                            this.store.activeAnchor = addLineAnchor(hoverPen, this.store.pointAt, this.store.pointAtIndex);
                            this.initLineRect(hoverPen);
                            pt = { x: e.x, y: e.y };
                            this.getHover(pt);
                        }
                        else {
                            pt = { id: s8(), x: e.x, y: e.y };
                            this.store.activeAnchor = pushPenAnchor(hoverPen, pt);
                        }
                        _d.label = 6;
                    case 6:
                        this.hotkeyType = HotkeyType.None;
                        this.render();
                        this.pushHistory({
                            type: EditType.Update,
                            pens: [deepClone(hoverPen, true)],
                            initPens: initPens,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 连线允许移动，若与其它图形有连接，但其它图形不在此次移动中，会断开连接
     * @param line 连线
     * @param pens 本次移动的全部图形，包含子节点
     */
    Canvas.prototype.checkDisconnect = function (line, pens) {
        var _this = this;
        if (line.id.indexOf(movingSuffix) > 0) {
            var id = line.id;
            line = this.store.pens[id.replace(movingSuffix, '')];
        }
        // 连接
        line.anchors.forEach(function (anchor) {
            if (anchor.connectTo &&
                !pens.find(function (p) {
                    return p.id === anchor.connectTo ||
                        p.id === anchor.connectTo + movingSuffix;
                })) {
                var pen = _this.store.pens[anchor.connectTo];
                if (!pen || pen.type) {
                    return;
                }
                disconnectLine(pen, getAnchor(pen, anchor.anchorId), line, anchor);
            }
        });
    };
    /**
     * 移动 画笔们
     * @param pens 画笔们，不包含子节点
     * @param x 偏移 x
     * @param y 偏移 y
     * @param doing 是否持续移动
     */
    Canvas.prototype.translatePens = function (pens, x, y, doing) {
        var _this = this;
        if (pens === void 0) { pens = this.store.active; }
        if (!pens || !pens.length) {
            return;
        }
        var hasLocked = pens.some(function (item) {
            if (item.locked >= LockState.DisableMove)
                return true;
        });
        if (hasLocked) {
            return;
        }
        var initPens = !doing && deepClone(pens, true);
        translateRect(this.activeRect, x, y);
        var containChildPens = this.getAllByPens(pens);
        pens.forEach(function (pen) {
            var _a, _b;
            if (pen.locked >= LockState.DisableMove) {
                return;
            }
            if (pen.type === PenType.Line) {
                if (!_this.store.options.moveConnectedLine) {
                    return;
                }
                translateLine(pen, x, y);
                _this.checkDisconnect(pen, containChildPens);
                _this.store.path2dMap.set(pen, globalStore.path2dDraws[pen.name](pen));
                if (!doing) {
                    _this.initLineRect(pen);
                    (_a = pen.connectedLines) === null || _a === void 0 ? void 0 : _a.forEach(function (item) {
                        var line = _this.store.pens[item.lineId];
                        _this.initLineRect(line);
                    });
                }
            }
            else {
                translateRect(pen.calculative.worldRect, x, y);
                _this.updatePenRect(pen, { worldRectIsReady: true });
                pen.calculative.x = pen.x;
                pen.calculative.y = pen.y;
                if (pen.calculative.initRect) {
                    pen.calculative.initRect.x = pen.calculative.x;
                    pen.calculative.initRect.y = pen.calculative.y;
                    pen.calculative.initRect.ex =
                        pen.calculative.x + pen.calculative.width;
                    pen.calculative.initRect.ey =
                        pen.calculative.y + pen.calculative.height;
                }
            }
            _this.updateLines(pen);
            (_b = pen.onMove) === null || _b === void 0 ? void 0 : _b.call(pen, pen);
        });
        this.getSizeCPs();
        this.render();
        this.tooltip.translate(x, y);
        if (!doing) {
            // 单次的移动需要记历史记录
            this.pushHistory({
                type: EditType.Update,
                pens: deepClone(pens, true),
                initPens: initPens,
            });
            this.initImageCanvas(pens);
            this.store.emitter.emit('translatePens', pens);
        }
        this.store.emitter.emit('translatingPens', pens);
    };
    Canvas.prototype.calcAutoAnchor = function (line, lineAnchor, pen, penConnection) {
        var from = getFromAnchor(line);
        var to = getToAnchor(line);
        var newAnchor = nearestAnchor(pen, lineAnchor === from ? to : from);
        lineAnchor.x = newAnchor.x;
        lineAnchor.y = newAnchor.y;
        lineAnchor.prev = undefined;
        lineAnchor.next = undefined;
        if (penConnection) {
            penConnection.anchor = newAnchor.id;
        }
        else {
            connectLine(pen, newAnchor, line, lineAnchor);
        }
        if (this[line.lineName]) {
            this[line.lineName](this.store, line);
        }
        this.store.path2dMap.set(line, globalStore.path2dDraws.line(line));
        this.initLineRect(line);
    };
    Canvas.prototype.restoreNodeAnimate = function (pen) {
        var _a;
        if (pen.calculative.initRect) {
            if (pen.keepAnimateState) {
                for (var k in pen) {
                    if (pen.calculative[k] === undefined) {
                        continue;
                    }
                    if (k !== 'x' &&
                        k !== 'y' &&
                        k !== 'width' &&
                        k !== 'height' &&
                        k !== 'initRect' &&
                        (typeof pen[k] !== 'object' || k === 'lineDash')) {
                        if (k === 'fontSize') {
                            pen[k] =
                                pen.calculative[k] / pen.calculative.canvas.store.data.scale;
                        }
                        else {
                            pen[k] = pen.calculative[k];
                        }
                    }
                }
            }
            else {
                var rotate = pen.calculative.initRect.rotate - pen.calculative.rotate;
                for (var k in pen) {
                    if (k !== 'x' &&
                        k !== 'y' &&
                        k !== 'width' &&
                        k !== 'height' &&
                        k !== 'initRect' &&
                        k !== 'rotate' &&
                        (typeof pen[k] !== 'object' || k === 'lineDash')) {
                        pen.calculative[k] = pen[k];
                    }
                }
                if ((_a = pen.children) === null || _a === void 0 ? void 0 : _a.length) {
                    if (rotate) {
                        rotatePen(pen, rotate, pen.calculative.worldRect);
                    }
                }
                else {
                    pen.calculative.rotate = pen.rotate;
                }
                pen.calculative.worldRect = pen.calculative.initRect;
            }
            this.updatePenRect(pen, { worldRectIsReady: true });
            if (pen.calculative.text !== pen.text) {
                pen.calculative.text = pen.text;
                calcTextLines(pen);
            }
            pen.calculative.initRect = undefined;
        }
    };
    Canvas.prototype.updateLines = function (pen, change) {
        var _this = this;
        var _a;
        (_a = pen.children) === null || _a === void 0 ? void 0 : _a.forEach(function (child) {
            var childPen = _this.store.pens[child];
            if (childPen) {
                // 每个子节点都会更新 line，包括子节点是 type 1 的情况
                _this.updateLines(childPen, change);
            }
        });
        if (!pen.connectedLines) {
            return;
        }
        pen.connectedLines.forEach(function (item) {
            var line = _this.store.pens[item.lineId];
            // 活动层的线不需要更新，会在活动层处理
            if (!line || line.calculative.active) {
                return;
            }
            var lineAnchor = getAnchor(line, item.lineAnchor);
            if (!lineAnchor) {
                return;
            }
            if (line.autoFrom) {
                var from = getFromAnchor(line);
                if (from.id === lineAnchor.id) {
                    _this.calcAutoAnchor(line, from, pen, item);
                }
            }
            if (line.autoTo) {
                var to = getToAnchor(line);
                if (to.id === lineAnchor.id) {
                    _this.calcAutoAnchor(line, to, pen, item);
                }
            }
            var penAnchor = getAnchor(pen, item.anchor);
            if (!penAnchor) {
                return;
            }
            translatePoint(lineAnchor, penAnchor.x - lineAnchor.x, penAnchor.y - lineAnchor.y);
            if (_this.store.options.autoPolyline &&
                line.autoPolyline !== false &&
                line.lineName === 'polyline') {
                var from = getFromAnchor(line);
                var to = getToAnchor(line);
                var found = false;
                if (from.id === lineAnchor.id) {
                    from = lineAnchor;
                    found = true;
                }
                else if (to.id === lineAnchor.id) {
                    to = lineAnchor;
                    found = true;
                }
                if (found) {
                    line.calculative.worldAnchors = [from, to];
                    line.calculative.activeAnchor = from;
                    _this.polyline(_this.store, line, to);
                    _this.initLineRect(line);
                }
            }
            _this.store.path2dMap.set(line, globalStore.path2dDraws[line.name](line));
            _this.patchFlagsLines.add(line);
            change && getLineLength(line);
        });
    };
    Canvas.prototype.calcActiveRect = function () {
        // TODO: visible 不可见， 目前只是不计算 activeRect，考虑它是否进入活动层 store.active
        var canMovePens = this.store.active.filter(function (pen) {
            return (!pen.locked || pen.locked < LockState.DisableMove) &&
                pen.visible != false;
        });
        if (!canMovePens.length) {
            return;
        }
        else if (canMovePens.length === 1) {
            this.activeRect = deepClone(canMovePens[0].calculative.worldRect);
            this.activeRect.rotate = canMovePens[0].calculative.rotate || 0;
            calcCenter(this.activeRect);
        }
        else {
            this.activeRect = getRect(canMovePens);
            this.activeRect.rotate = 0;
        }
        this.lastRotate = 0;
        this.getSizeCPs();
    };
    /**
     * 旋转当前画笔包括子节点
     * @param pen 旋转的画笔
     * @param angle 本次的旋转值，加到 pen.calculative.rotate 上
     */
    Canvas.prototype.rotatePen = function (pen, angle, rect) {
        var _this = this;
        if (pen.type) {
            pen.calculative.worldAnchors.forEach(function (anchor) {
                rotatePoint(anchor, angle, rect.center);
            });
            this.initLineRect(pen);
            calcPenRect(pen);
        }
        else {
            if (pen.calculative.rotate) {
                pen.calculative.rotate += angle;
            }
            else {
                pen.calculative.rotate = angle;
            }
            rotatePoint(pen.calculative.worldRect.center, angle, rect.center);
            if (pen.parentId) {
                pen.calculative.worldRect.x =
                    pen.calculative.worldRect.center.x -
                        pen.calculative.worldRect.width / 2;
                pen.calculative.worldRect.y =
                    pen.calculative.worldRect.center.y -
                        pen.calculative.worldRect.height / 2;
                pen.x = (pen.calculative.worldRect.x - rect.x) / rect.width;
                pen.y = (pen.calculative.worldRect.y - rect.y) / rect.height;
            }
            else {
                pen.x = pen.calculative.worldRect.center.x - pen.width / 2;
                pen.y = pen.calculative.worldRect.center.y - pen.height / 2;
            }
            pen.rotate = pen.calculative.rotate;
            this.updatePenRect(pen);
            if (pen.children) {
                pen.children.forEach(function (id) {
                    var child = _this.store.pens[id];
                    _this.rotatePen(child, angle, pen.calculative.worldRect);
                });
            }
        }
    };
    Canvas.prototype.nextAnimate = function (pen,node) {
        var _this = this;
        if (!pen) {
            return;
        }
        this.store.emitter.emit('animateEnd', pen);
        var pens;
        if (pen.nextAnimate) {
            pens = this.store.data.pens.filter(function (p) {
                return (p.id === pen.nextAnimate ||
                    (p.tags && p.tags.indexOf(pen.nextAnimate) > -1));
            });
        }
        if (!pens) {
            return;
        }
        pens.forEach(function (pen) {
            var _a, _b, _c;
            if (pen.calculative.pause) {
                var d = Date.now() - pen.calculative.pause;
                pen.calculative.pause = undefined;
                pen.calculative.frameStart += d;
                pen.calculative.frameEnd += d;
            }
            else {
                if (pen.name === 'video') {
                    pen.calculative.media.currentTime = 0;
                    (_a = pen.calculative.media) === null || _a === void 0 ? void 0 : _a.play();
                    (_b = pen.onStartVideo) === null || _b === void 0 ? void 0 : _b.call(pen, pen);
                }
                else if (pen.type || ((_c = pen.frames) === null || _c === void 0 ? void 0 : _c.length)) {
                    _this.store.animates.add(pen);
                }
            }
        });
        this.animate(node);
    };
    Canvas.prototype.animate = function (node) {
        console.log("test")
        var _this = this;
        if (this.animateRendering) {
            return;
        }
        requestAnimationFrame(function () {
            var e_18, _a;
            var now = Date.now();
            if (now - _this.lastAnimateRender < _this.store.options.animateInterval) {
                if (_this.store.animates.size > 0) {
                    _this.animate(node);
                }
                return;
            }
            _this.lastAnimateRender = now;
            _this.animateRendering = true;
            var dels = [];
            var active = false;
            var _loop_5 = function (pen) {
                if (pen.calculative.pause) {
                    return "continue";
                }
                if (pen.calculative.active && !pen.type && !_this.movingPens) {
                    // 存在节点在活动层，并且不在移动中
                    active = true;
                }
                if (!pen.type) {
                    if (setNodeAnimate(pen, now,node)) {
                        if (pen.calculative.patchFlags) {
                            calcCenter(pen.calculative.worldRect);
                            _this.updatePenRect(pen, {
                                worldRectIsReady: true,
                                playingAnimate: true,
                            });
                        }
                    }
                    else {
                        // 避免未到绘画帧，用户点击了停止动画，产生了时间差数据
                        requestAnimationFrame(function () {
                            _this.restoreNodeAnimate(pen);
                        });
                        dels.push(pen);
                        _this.nextAnimate(pen,node);
                    }
                    _this.updateLines(pen, true);
                }
                else {
                    if (!setLineAnimate(pen, now)) {
                        if (pen.keepAnimateState) {
                            for (var k in pen) {
                                if (pen.calculative[k] === undefined) {
                                    continue;
                                }
                                if (typeof pen[k] !== 'object' || k === 'lineDash') {
                                    pen[k] = pen.calculative[k];
                                }
                            }
                            calcPenRect(pen);
                        }
                        else {
                            for (var k in pen) {
                                if (typeof pen[k] !== 'object' || k === 'lineDash') {
                                    pen.calculative[k] = pen[k];
                                }
                            }
                        }
                        dels.push(pen);
                        _this.nextAnimate(pen);
                    }
                }
                _this.patchFlags = true;
            };
            try {
                for (var _b = __values(_this.store.animates), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var pen = _c.value;
                    _loop_5(pen);
                }
            }
            catch (e_18_1) { e_18 = { error: e_18_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_18) throw e_18.error; }
            }
            if (active) {
                _this.calcActiveRect();
            }
            dels.forEach(function (pen) {
                _this.store.animates.delete(pen);
            });
            _this.render(false);
            _this.animateRendering = false;
            _this.animate(node);
        });
    };
    Object.defineProperty(Canvas.prototype, "clipboardName", {
        get: function () {
            return 'topology-clipboard';
        },
        enumerable: false,
        configurable: true
    });
    Canvas.prototype.copy = function (pens) {
        return __awaiter(this, void 0, void 0, function () {
            var page, _a, origin, scale, clipboard, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        page = s8();
                        _a = this.store.data, origin = _a.origin, scale = _a.scale;
                        this.store.clipboard = undefined;
                        localStorage.removeItem(this.clipboardName);
                        sessionStorage.setItem('page', page);
                        clipboard = {
                            topology: true,
                            pens: this.getAllByPens(deepClone(pens || this.store.active, true)),
                            origin: deepClone(origin),
                            scale: scale,
                            page: page,
                            initRect: deepClone(this.activeRect),
                            offset: 10,
                        };
                        if (!(navigator.clipboard && !this.store.options.disableClipboard)) return [3 /*break*/, 5];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, navigator.clipboard.writeText(JSON.stringify(clipboard))];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _b = _c.sent();
                        localStorage.setItem(this.clipboardName, JSON.stringify(clipboard));
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        localStorage.setItem(this.clipboardName, JSON.stringify(clipboard));
                        _c.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Canvas.prototype.cut = function (pens) {
        this.copy(pens);
        this.delete(pens);
    };
    Canvas.prototype.paste = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var clipboardText, clipboard, _b, _c, offset, pos, curPage, rootPens, rootPens_1, rootPens_1_1, pen;
            var e_19, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!(navigator.clipboard && !this.store.options.disableClipboard)) return [3 /*break*/, 5];
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ((_a = navigator.clipboard) === null || _a === void 0 ? void 0 : _a.readText())];
                    case 2:
                        clipboardText = _e.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _b = _e.sent();
                        clipboardText = localStorage.getItem(this.clipboardName);
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        clipboardText = localStorage.getItem(this.clipboardName);
                        _e.label = 6;
                    case 6:
                        if (clipboardText) {
                            try {
                                clipboard = JSON.parse(clipboardText);
                            }
                            catch (e) {
                                console.warn('剪切板数据不是json', e.message);
                                return [2 /*return*/];
                            }
                            if (!clipboard || !clipboard.topology) {
                                return [2 /*return*/];
                            }
                        }
                        else {
                            return [2 /*return*/];
                        }
                        _c = this.beforeAddPens;
                        if (!_c) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.beforeAddPens(clipboard.pens)];
                    case 7:
                        _c = (_e.sent()) != true;
                        _e.label = 8;
                    case 8:
                        if (_c) {
                            return [2 /*return*/];
                        }
                        if (this.store.clipboard) {
                            offset = this.store.clipboard.offset + 10;
                            pos = this.store.clipboard.pos;
                        }
                        this.store.clipboard = deepClone(clipboard);
                        curPage = sessionStorage.getItem('page');
                        if (curPage !== clipboard.page) {
                            this.store.clipboard.pos = { x: this.mousePos.x, y: this.mousePos.y };
                            this.store.clipboard.offset = 0;
                        }
                        else {
                            offset && (this.store.clipboard.offset = offset);
                            pos && (this.store.clipboard.pos = pos);
                        }
                        rootPens = this.store.clipboard.pens.filter(function (pen) { return !pen.parentId; });
                        try {
                            for (rootPens_1 = __values(rootPens), rootPens_1_1 = rootPens_1.next(); !rootPens_1_1.done; rootPens_1_1 = rootPens_1.next()) {
                                pen = rootPens_1_1.value;
                                this.pastePen(pen, undefined);
                            }
                        }
                        catch (e_19_1) { e_19 = { error: e_19_1 }; }
                        finally {
                            try {
                                if (rootPens_1_1 && !rootPens_1_1.done && (_d = rootPens_1.return)) _d.call(rootPens_1);
                            }
                            finally { if (e_19) throw e_19.error; }
                        }
                        sessionStorage.setItem('page', clipboard.page);
                        this.active(rootPens);
                        this.pushHistory({ type: EditType.Add, pens: this.store.clipboard.pens });
                        this.render();
                        this.store.emitter.emit('add', this.store.clipboard.pens);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取 pens 列表中的所有节点（包含子节点）
     * @param pens 不包含子节点
     */
    Canvas.prototype.getAllByPens = function (pens) {
        var e_20, _a;
        var retPens = [];
        try {
            for (var pens_6 = __values(pens), pens_6_1 = pens_6.next(); !pens_6_1.done; pens_6_1 = pens_6.next()) {
                var pen = pens_6_1.value;
                retPens.push.apply(retPens, __spreadArray([], __read(deepClone(getAllChildren(pen, this.store), true)), false));
            }
        }
        catch (e_20_1) { e_20 = { error: e_20_1 }; }
        finally {
            try {
                if (pens_6_1 && !pens_6_1.done && (_a = pens_6.return)) _a.call(pens_6);
            }
            finally { if (e_20) throw e_20.error; }
        }
        return retPens.concat(pens);
    };
    /**
     * 修改对应连线的 anchors
     * @param oldId 老 id
     * @param pen 节点
     * @param pastePens 本次复制的 pens 包含子节点
     */
    Canvas.prototype.changeLineAnchors = function (oldId, pen, pastePens) {
        if (!Array.isArray(pen.connectedLines)) {
            return;
        }
        var _loop_6 = function (index) {
            var lineId = pen.connectedLines[index].lineId;
            var line = pastePens.find(function (pen) { return pen.id === lineId; });
            if (line) {
                var from = line.anchors[0];
                var to = line.anchors[line.anchors.length - 1];
                from.connectTo === oldId && (from.connectTo = pen.id);
                to.connectTo === oldId && (to.connectTo = pen.id);
            }
            else {
                // 说明它的连接线不在本次复制的范围内
                pen.connectedLines.splice(index, 1);
                index--;
            }
            out_index_1 = index;
        };
        var out_index_1;
        for (var index = 0; index < pen.connectedLines.length; index++) {
            _loop_6(index);
            index = out_index_1;
        }
    };
    /**
     * 复制连线的过程，修改 与 此线连接 node 的 connectedLines
     * @param oldId 线原 id
     * @param line 线
     * @param pastePens 此处复制的全部 pens (包含子节点)
     */
    Canvas.prototype.changeNodeConnectedLine = function (oldId, line, pastePens) {
        var e_21, _a;
        var _b;
        var from = line.anchors[0];
        var to = line.anchors[line.anchors.length - 1];
        // 修改对应节点的 connectedLines
        var anchors = [from, to];
        var _loop_7 = function (anchor) {
            var nodeId = anchor.connectTo;
            if (nodeId) {
                var node = pastePens.find(function (pen) { return pen.id === nodeId; });
                if (node) {
                    (_b = node.connectedLines) === null || _b === void 0 ? void 0 : _b.forEach(function (cl) {
                        if (cl.lineId === oldId) {
                            cl.lineId = line.id;
                            cl.lineAnchor = anchor.id;
                        }
                    });
                }
                else {
                    // 节点不在本次复制的范围内
                    anchor.connectTo = undefined;
                    if (anchor.prev) {
                        anchor.prev.connectTo = undefined;
                    }
                    if (anchor.next) {
                        anchor.next.connectTo = undefined;
                    }
                }
            }
        };
        try {
            for (var anchors_1 = __values(anchors), anchors_1_1 = anchors_1.next(); !anchors_1_1.done; anchors_1_1 = anchors_1.next()) {
                var anchor = anchors_1_1.value;
                _loop_7(anchor);
            }
        }
        catch (e_21_1) { e_21 = { error: e_21_1 }; }
        finally {
            try {
                if (anchors_1_1 && !anchors_1_1.done && (_a = anchors_1.return)) _a.call(anchors_1);
            }
            finally { if (e_21) throw e_21.error; }
        }
    };
    Canvas.prototype.delete = function (pens, canDelLocked, history) {
        if (pens === void 0) { pens = this.store.active; }
        if (canDelLocked === void 0) { canDelLocked = false; }
        if (history === void 0) { history = true; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, deletePens;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!pens || !pens.length) {
                            return [2 /*return*/];
                        }
                        _a = this.beforeRemovePens;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.beforeRemovePens(pens)];
                    case 1:
                        _a = (_b.sent()) != true;
                        _b.label = 2;
                    case 2:
                        if (_a) {
                            return [2 /*return*/];
                        }
                        if (!canDelLocked) {
                            pens = pens.filter(function (pen) { return !pen.locked; });
                        }
                        if (!pens || !pens.length) {
                            return [2 /*return*/];
                        }
                        deletePens = [];
                        this._del(pens, deletePens);
                        this.initImageCanvas(pens);
                        this.inactive();
                        this.clearHover();
                        this.render();
                        // TODO: 连线的删除 ，连接的 node 的 connectLines 会变化（删除 node ，line 的 anchors 类似），未记历史记录
                        if (history) {
                            this.pushHistory({ type: EditType.Delete, pens: deletePens });
                        }
                        this.store.emitter.emit('delete', pens);
                        return [2 /*return*/];
                }
            });
        });
    };
    Canvas.prototype._del = function (pens, delPens) {
        var _this = this;
        if (!pens) {
            return;
        }
        pens.forEach(function (pen) {
            if (!pen.parentId) {
                if (pen.locked) {
                    return;
                }
                else {
                    if (delPens) {
                        _this.getDelPens(pen, delPens);
                    }
                    _this.delForce(pen);
                }
            }
            else {
                var lockedParent = _this.getLockedParent(pen);
                if (lockedParent) {
                    console.warn('父节点锁定');
                    return;
                }
                else {
                    var parentPen = _this.store.data.pens[pen.parentId];
                    var _index = parentPen.children.indexOf(pen.id);
                    parentPen.children.splice(_index, 1);
                    if (delPens) {
                        _this.getDelPens(pen, delPens);
                    }
                    _this.delForce(pen);
                }
            }
        });
    };
    Canvas.prototype.getDelPens = function (pen, delPens) {
        var _this = this;
        if (!pen) {
            return;
        }
        var i = this.store.data.pens.findIndex(function (item) { return item.id === pen.id; });
        if (i > -1) {
            var delPen = this.store.pens[pen.id];
            delPen.calculative.active = undefined;
            delPens.push(delPen);
        }
        if (pen.children) {
            pen.children.forEach(function (id) {
                _this.getDelPens(_this.store.pens[id], delPens);
            });
        }
    };
    Canvas.prototype.getLockedParent = function (pen) {
        if (!pen.parentId) {
            return false;
        }
        var parentPen = getParent(pen);
        if (parentPen.locked) {
            return parentPen;
        }
        else {
            this.getLockedParent(parentPen);
        }
    };
    Canvas.prototype.delForce = function (pen) {
        var _this = this;
        var _a;
        if (!pen) {
            return;
        }
        var i = this.store.data.pens.findIndex(function (item) { return item.id === pen.id; });
        if (i > -1) {
            this.delConnectedLines(this.store.data.pens[i]);
            this.store.data.pens.splice(i, 1);
            this.store.pens[pen.id] = undefined;
            delete this.store.pens[pen.id];
        }
        this.store.animates.delete(pen);
        if (pen.children) {
            pen.children.forEach(function (id) {
                _this.delForce(_this.store.pens[id]);
            });
        }
        (_a = pen.onDestroy) === null || _a === void 0 ? void 0 : _a.call(pen, pen);
    };
    Canvas.prototype.delConnectedLines = function (pen) {
        var _this = this;
        var _a;
        if (pen.connectedLines) {
            var _loop_8 = function (i) {
                var _b = pen.connectedLines[i], lineId = _b.lineId, lineAnchor = _b.lineAnchor;
                var line = this_2.store.pens[lineId];
                if (line) {
                    var anchor = line.anchors.find(function (anchor) { return anchor.id === lineAnchor; });
                    if ((anchor === null || anchor === void 0 ? void 0 : anchor.connectTo) === pen.id) {
                        anchor.connectTo = undefined;
                        anchor.anchorId = undefined;
                        anchor.prev && (anchor.prev.connectTo = undefined);
                        anchor.next && (anchor.next.connectTo = undefined);
                    }
                    anchor = getAnchor(line, lineAnchor);
                    if (anchor) {
                        anchor.connectTo = undefined;
                        anchor.anchorId = undefined;
                        anchor.prev && (anchor.prev.connectTo = undefined);
                        anchor.next && (anchor.next.connectTo = undefined);
                    }
                }
            };
            var this_2 = this;
            for (var i = 0; i < pen.connectedLines.length; i++) {
                _loop_8(i);
            }
        }
        if (!pen.type) {
            return;
        }
        (_a = pen.calculative.worldAnchors) === null || _a === void 0 ? void 0 : _a.forEach(function (lineAnchor, index) {
            var _a;
            if (!lineAnchor.connectTo) {
                return;
            }
            var connectTo = _this.store.pens[lineAnchor.connectTo];
            if (connectTo) {
                (_a = connectTo.calculative.worldAnchors) === null || _a === void 0 ? void 0 : _a.forEach(function (anchor) {
                    disconnectLine(connectTo, anchor, pen, lineAnchor);
                });
            }
        });
    };
    Canvas.prototype.createInput = function () {
        var _this = this;
        this.inputParent.classList.add('topology-input');
        this.inputRight.classList.add('right');
        this.inputDiv.classList.add('input-div');
        this.inputParent.appendChild(this.inputDiv);
        this.inputParent.appendChild(this.inputRight);
        this.dropdown.onmouseleave = function () {
            _this.store.hover = null;
        };
        this.inputParent.appendChild(this.dropdown);
        this.externalElements.appendChild(this.inputParent);
        this.inputParent.onmousedown = this.stopPropagation;
        this.inputDiv.onmousedown = this.stopPropagation;
        this.inputDiv.contentEditable = 'false';
        this.inputRight.onmousedown = this.stopPropagation;
        this.dropdown.onmousedown = this.stopPropagation;
        this.inputRight.style.transform = 'rotate(135deg)';
        var sheet;
        for (var i = 0; i < document.styleSheets.length; i++) {
            if (document.styleSheets[i].title === 'le5le.com') {
                sheet = document.styleSheets[i];
            }
        }
        if (!sheet) {
            var style = document.createElement('style');
            style.title = 'le5le.com';
            document.head.appendChild(style);
            sheet = style.sheet;
            sheet.insertRule('.topology-input{display:none;position:absolute;outline:none;align-items: center;}');
            sheet.insertRule('.topology-input textarea{resize:none;border:none;outline:none;background:transparent;flex-grow:1;height:100%;left:0;top:0}');
            sheet.insertRule('.topology-input .right{width:10px;height:10px;flex-shrink:0;border-top: 1px solid;border-right: 1px solid;margin-right: 5px;transition: all .3s cubic-bezier(.645,.045,.355,1);position:absolute;right:1px;}');
            sheet.insertRule('.topology-input ul{position:absolute;top:100%;left:-5px;width:calc(100% + 10px);min-height:30px;border-radius: 2px;box-shadow: 0 2px 8px #00000026;list-style-type: none;background-color: #fff;padding: 4px 0;max-height: 105px;overflow-y: auto;}');
            sheet.insertRule('.topology-input ul li{padding: 5px 12px;line-height: 22px;white-space: nowrap;cursor: pointer;}');
            sheet.insertRule('.topology-input ul li:hover{background: #eeeeee;}');
            sheet.insertRule(".input-div::-webkit-scrollbar {display:none}");
            sheet.insertRule('.topology-input .input-div{resize:none;border:none;outline:none;background:transparent;flex-grow:1;height:100%;width: 100%;left:0;top:0;display:flex;text-align: center;justify-content: center;flex-direction: column;}');
            sheet.insertRule(".input-div div{}");
        }
        this.inputDiv.onclick = function (e) {
            e.stopPropagation();
            var pen = _this.store.pens[_this.inputDiv.dataset.penId];
            if (_this.dropdown.style.display === 'block') {
                _this.dropdown.style.display = 'none';
                _this.inputRight.style.transform = 'rotate(135deg)';
            }
            else if ((pen === null || pen === void 0 ? void 0 : pen.dropdownList) && _this.store.data.locked) {
                _this.dropdown.style.display = 'block';
                _this.inputRight.style.transform = 'rotate(315deg)';
            }
            _this.store.emitter.emit('clickInput', pen);
        };
        this.inputDiv.onkeyup = function (e) {
            _this.setDropdownList(true);
            var pen = _this.store.pens[_this.inputDiv.dataset.penId];
            _this.store.emitter.emit('input', { pen: pen, text: e.key });
            e.stopPropagation();
        };
        this.inputDiv.onkeydown = function (e) {
            e.stopPropagation();
        };
        this.inputDiv.onmousedown = this.stopPropagation;
        this.inputDiv.onwheel = function (e) {
            e.stopPropagation();
        };
        this.inputDiv.onpaste = function (e) {
            e.preventDefault();
            var text = '';
            if (e.clipboardData && e.clipboardData.getData) {
                text = e.clipboardData.getData('text/plain');
            }
            document.execCommand('insertHTML', false, text);
        };
    };
    Canvas.prototype.clearDropdownList = function () {
        if (this.dropdown.hasChildNodes()) {
            for (var i = 0; i < this.dropdown.childNodes.length; i++) {
                this.dropdown.childNodes[i].remove();
                --i;
            }
        }
    };
    /**
     * 添加一个选项到 dropdown dom 中
     * @param text 选项文字
     * @param index 选项索引
     */
    Canvas.prototype.dropdownAppendOption = function (text, index) {
        var li = document.createElement('li');
        li.onwheel = this.stopPropagation;
        li.innerText = text;
        li.style.overflow = 'hidden';
        li.style.textOverflow = 'ellipsis';
        li.title = text;
        li.style.zoom = this.store.data.scale;
        li.onmousedown = this.stopPropagation;
        li.dataset.i = index + '';
        li.onclick = this.selectDropdown;
        this.dropdown.appendChild(li);
    };
    Canvas.prototype.find = function (idOrTag) {
        return this.store.data.pens.filter(function (pen) {
            return pen.id == idOrTag || (pen.tags && pen.tags.indexOf(idOrTag) > -1);
        });
    };
    Canvas.prototype.findOne = function (idOrTag) {
        return this.store.data.pens.find(function (pen) {
            return pen.id == idOrTag || (pen.tags && pen.tags.indexOf(idOrTag) > -1);
        });
    };
    Canvas.prototype.changePenId = function (oldId, newId) {
        var _this = this;
        var _a, _b, _c, _d, _e;
        if (oldId === newId) {
            return;
        }
        var pen = this.store.pens[oldId];
        if (!pen) {
            return;
        }
        if (this.store.pens[newId]) {
            return;
        }
        // 若新画笔不存在
        pen.id = newId;
        this.store.pens[newId] = this.store.pens[oldId];
        // dom 节点，需要更改 id
        (_a = pen.onChangeId) === null || _a === void 0 ? void 0 : _a.call(pen, pen, oldId, newId);
        delete this.store.pens[oldId];
        // 父子
        if (pen.parentId) {
            var parent_1 = this.store.pens[pen.parentId];
            var index = (_b = parent_1.children) === null || _b === void 0 ? void 0 : _b.findIndex(function (id) { return id === oldId; });
            index !== -1 && ((_c = parent_1.children) === null || _c === void 0 ? void 0 : _c.splice(index, 1, newId));
        }
        (_d = pen.children) === null || _d === void 0 ? void 0 : _d.forEach(function (childId) {
            var child = _this.store.pens[childId];
            child.parentId = newId;
        });
        // 连接关系
        if (pen.type === PenType.Line) {
            // TODO: 仍然存在 节点类型的 连线，此处判断需要更改
            this.changeNodeConnectedLine(oldId, pen, this.store.data.pens);
        }
        else {
            this.changeLineAnchors(oldId, pen, this.store.data.pens);
            (_e = pen.connectedLines) === null || _e === void 0 ? void 0 : _e.forEach(function (_a) {
                var lineId = _a.lineId;
                var line = _this.store.pens[lineId];
                calcWorldAnchors(line);
            });
        }
    };
    Canvas.prototype.updateValue = function (pen, data) {
        var _a, _b, _c, _d, _e;
        var penRect = this.getPenRect(pen);
        var oldName = pen.name;
        Object.assign(pen, data);
        // data 可能没有 name 属性
        var isChangedName = oldName !== pen.name; // name changed
        data.newId && this.changePenId(pen.id, data.newId);
        var willUpdatePath = false;
        var willCalcTextRect = false;
        var willPatchFlagsPenRect = false; // 是否需要重新计算世界坐标
        var willCalcIconRect = false; // 是否需要重现计算 icon 区域
        var willSetPenRect = false; // 是否重新 setPenRect
        var containIsBottom = false; // 是否包含 isBottom 属性修改
        var oldRotate = undefined;
        var willRenderImage = false; // 是否需要重新渲染图片
        for (var k in data) {
            if (k === 'rotate') {
                oldRotate = pen.calculative.rotate || 0;
            }
            if (typeof pen[k] !== 'object' || k === 'lineDash') {
                pen.calculative[k] = data[k];
            }
            if (needCalcTextRectProps.includes(k)) {
                willCalcTextRect = true;
            }
            if (['name', 'borderRadius'].includes(k)) {
                willUpdatePath = true;
            }
            if (needSetPenProps.includes(k)) {
                willSetPenRect = true;
            }
            if (needPatchFlagsPenRectProps.includes(k)) {
                willPatchFlagsPenRect = true;
            }
            if (needCalcIconRectProps.includes(k)) {
                willCalcIconRect = true;
            }
            if (k === 'isBottom') {
                containIsBottom = true;
            }
            if (k === 'image') {
                willRenderImage = true;
            }
        }
        this.setCalculativeByScale(pen); // 该方法计算量并不大，所以每次修改都计算一次
        if (isChangedName) {
            (_a = pen.onDestroy) === null || _a === void 0 ? void 0 : _a.call(pen, pen);
            clearLifeCycle(pen);
            // 后续代码会重算 path2D
        }
        if (willSetPenRect) {
            var rect = {
                x: (_b = data.x) !== null && _b !== void 0 ? _b : penRect.x,
                y: (_c = data.y) !== null && _c !== void 0 ? _c : penRect.y,
                width: (_d = data.width) !== null && _d !== void 0 ? _d : penRect.width,
                height: (_e = data.height) !== null && _e !== void 0 ? _e : penRect.height,
            };
            this.setPenRect(pen, rect, false);
            this.updateLines(pen, true);
        }
        else if (willPatchFlagsPenRect) {
            this.updatePenRect(pen);
        }
        else {
            willCalcTextRect && calcTextRect(pen);
            willCalcIconRect && calcIconRect(this.store.pens, pen);
            if (willUpdatePath) {
                globalStore.path2dDraws[pen.name] &&
                    this.store.path2dMap.set(pen, globalStore.path2dDraws[pen.name](pen));
            }
        }
        // 若同时设置 x,y,width,height 与 rotate ，先 setPenRect ，再计算 rotate
        if (oldRotate !== undefined) {
            var currentRotate = pen.calculative.rotate;
            pen.calculative.rotate = oldRotate;
            // TODO: rotatePen 会执行 updatePenRect ，上面已经执行 updatePenRect
            this.rotatePen(pen, currentRotate - oldRotate, pen.calculative.worldRect);
        }
        if (data.image || data.backgroundImage || data.strokeImage) {
            pen.calculative.image = undefined;
            pen.calculative.backgroundImage = undefined;
            pen.calculative.strokeImage = undefined;
            this.loadImage(pen);
        }
        if (containIsBottom) {
            this.canvasImage.init();
            this.canvasImageBottom.init();
        }
        else if (willRenderImage) {
            // 存在先有 image 后无 image 的情况
            if (pen.isBottom) {
                this.canvasImageBottom.init();
            }
            else {
                this.canvasImage.init();
            }
        }
        else {
            this.initImageCanvas([pen]);
        }
    };
    /**
     * 执行 pen ，以及 pen 的子孙节点的 onResize 生命周期函数
     */
    Canvas.prototype.execPenResize = function (pen) {
        var _this = this;
        var _a, _b;
        (_a = pen.onResize) === null || _a === void 0 ? void 0 : _a.call(pen, pen);
        (_b = pen.children) === null || _b === void 0 ? void 0 : _b.forEach(function (chlidId) {
            var child = _this.store.pens[chlidId];
            child && _this.execPenResize(child);
        });
    };
    Canvas.prototype.setPenRect = function (pen, rect, render) {
        if (render === void 0) { render = true; }
        if (pen.parentId) {
            // 子节点的 rect 值，一定得是比例值
            Object.assign(pen, rect);
        }
        else {
            var _a = this.store.data, origin_2 = _a.origin, scale = _a.scale;
            pen.x = origin_2.x + rect.x * scale;
            pen.y = origin_2.y + rect.y * scale;
            pen.width = rect.width * scale;
            pen.height = rect.height * scale;
        }
        this.updatePenRect(pen);
        this.execPenResize(pen);
        render && this.render();
    };
    Canvas.prototype.getPenRect = function (pen, origin, scale) {
        if (origin === void 0) { origin = this.store.data.origin; }
        if (scale === void 0) { scale = this.store.data.scale; }
        if (!pen) {
            return;
        }
        if (pen.parentId) {
            // 子节点的 rect 只与父节点 rect 有关
            return {
                x: pen.x,
                y: pen.y,
                width: pen.width,
                height: pen.height,
            };
        }
        return {
            x: (pen.x - origin.x) / scale,
            y: (pen.y - origin.y) / scale,
            width: pen.width / scale,
            height: pen.height / scale,
        };
    };
    Canvas.prototype.toPng = function (padding, callback, containBkImg) {
        var e_22, _a;
        if (padding === void 0) { padding = 2; }
        if (containBkImg === void 0) { containBkImg = false; }
        var rect = getRect(this.store.data.pens);
        if (!isFinite(rect.width)) {
            throw new Error('can not to png, because width is not finite');
        }
        var oldRect = deepClone(rect);
        var storeData = this.store.data;
        // TODO: 目前背景颜色优先级更高
        var isDrawBkImg = containBkImg && !storeData.background && this.store.bkImg;
        // 主体在背景的右侧，下侧
        var isRight = false, isBottom = false;
        if (isDrawBkImg) {
            rect.x += storeData.x;
            rect.y += storeData.y;
            calcRightBottom(rect);
            if (rectInRect(rect, this.canvasRect, true)) {
                // 全部在区域内，那么 rect 就是 canvasRect
                Object.assign(rect, this.canvasRect);
            }
            else {
                // 合并区域
                var mergeArea = getRectOfPoints(__spreadArray(__spreadArray([], __read(rectToPoints(rect)), false), __read(rectToPoints(this.canvasRect)), false));
                Object.assign(rect, mergeArea);
            }
            isRight = rect.x === 0;
            isBottom = rect.y === 0;
        }
        // 有背景图，也添加 padding
        var p = formatPadding(padding);
        rect.x -= p[3];
        rect.y -= p[0];
        rect.width += p[3] + p[1];
        rect.height += p[0] + p[2];
        calcRightBottom(rect);
        var canvas = document.createElement('canvas');
        canvas.width = rect.width;
        canvas.height = rect.height;
        var ctx = canvas.getContext('2d');
        ctx.textBaseline = 'middle'; // 默认垂直居中
        if (isDrawBkImg) {
            var x = rect.x < 0 ? -rect.x : 0;
            var y = rect.y < 0 ? -rect.y : 0;
            ctx.drawImage(this.store.bkImg, x, y, this.canvasRect.width, this.canvasRect.height);
        }
        var background = this.store.data.background || this.store.options.background;
        if (background) {
            // 绘制背景颜色
            ctx.save();
            ctx.fillStyle = background;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore();
        }
        if (!isDrawBkImg) {
            ctx.translate(-rect.x, -rect.y);
        }
        else {
            // 平移画布，画笔的 worldRect 不变化
            ctx.translate(isRight ? storeData.x : -oldRect.x, isBottom ? storeData.y : -oldRect.y);
        }
        try {
            for (var _b = __values(this.store.data.pens), _c = _b.next(); !_c.done; _c = _b.next()) {
                var pen = _c.value;
                // 不使用 calculative.inView 的原因是，如果 pen 在 view 之外，那么它的 calculative.inView 为 false，但是它的绘制还是需要的
                if (!isShowChild(pen, this.store) || pen.visible == false) {
                    continue;
                }
                // TODO: hover 待考虑，若出现再补上
                var active = pen.calculative.active;
                pen.calculative.active = false;
                if (pen.calculative.img) {
                    renderPenRaw(ctx, pen);
                }
                else {
                    renderPen(ctx, pen);
                }
                pen.calculative.active = active;
            }
        }
        catch (e_22_1) { e_22 = { error: e_22_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_22) throw e_22.error; }
        }
        if (callback) {
            canvas.toBlob(callback);
            return;
        }
        return canvas.toDataURL();
    };
    Canvas.prototype.toggleAnchorMode = function () {
        var _a;
        if (!this.hotkeyType) {
            if (this.store.options.disableAnchor || ((_a = this.store.hover) === null || _a === void 0 ? void 0 : _a.disableAnchor)) {
                return;
            }
            this.hotkeyType = HotkeyType.AddAnchor;
            if (this.store.hover) {
                this.externalElements.style.cursor = 'pointer';
            }
        }
        else if (this.hotkeyType === HotkeyType.AddAnchor) {
            this.hotkeyType = HotkeyType.None;
            if (this.store.hoverAnchor) {
                this.externalElements.style.cursor = 'vertical-text';
            }
            else if (this.store.hover) {
                this.externalElements.style.cursor = 'move';
            }
        }
        this.patchFlags = true;
    };
    Canvas.prototype.addAnchorHand = function () {
        if (this.store.activeAnchor &&
            this.store.active &&
            this.store.active.length === 1 &&
            this.store.active[0].type) {
            var initPens = [deepClone(this.store.active[0], true)];
            if (!this.store.activeAnchor.prev) {
                if (!this.store.activeAnchor.next) {
                    this.store.activeAnchor.next = {
                        penId: this.store.activeAnchor.penId,
                        x: this.store.activeAnchor.x + 50,
                        y: this.store.activeAnchor.y,
                    };
                }
                this.store.activeAnchor.prev = __assign({}, this.store.activeAnchor.next);
                rotatePoint(this.store.activeAnchor.prev, 180, this.store.activeAnchor);
                this.initLineRect(this.store.active[0]);
                this.patchFlags = true;
            }
            else if (!this.store.activeAnchor.next) {
                this.store.activeAnchor.next = __assign({}, this.store.activeAnchor.prev);
                rotatePoint(this.store.activeAnchor.next, 180, this.store.activeAnchor);
                this.initLineRect(this.store.active[0]);
                this.patchFlags = true;
            }
            this.pushHistory({
                type: EditType.Update,
                pens: [deepClone(this.store.active[0], true)],
                initPens: initPens,
            });
        }
    };
    Canvas.prototype.removeAnchorHand = function () {
        if (this.store.activeAnchor &&
            this.store.active &&
            this.store.active.length === 1 &&
            this.store.active[0].type) {
            var initPens = [deepClone(this.store.active[0], true)];
            if (this.hoverType === HoverType.LineAnchorPrev) {
                this.store.activeAnchor.prev = undefined;
                this.initLineRect(this.store.active[0]);
                this.patchFlags = true;
            }
            else if (this.hoverType === HoverType.LineAnchorNext) {
                this.store.activeAnchor.next = undefined;
                this.initLineRect(this.store.active[0]);
                this.patchFlags = true;
            }
            else {
                this.store.activeAnchor.prev = undefined;
                this.store.activeAnchor.next = undefined;
                this.initLineRect(this.store.active[0]);
                this.patchFlags = true;
            }
            this.pushHistory({
                type: EditType.Update,
                pens: [deepClone(this.store.active[0])],
                initPens: initPens,
            });
        }
    };
    Canvas.prototype.toggleAnchorHand = function () {
        if (this.store.active.length === 1 &&
            this.store.active[0].type &&
            this.store.activeAnchor) {
            if (!this.store.activeAnchor.prevNextType) {
                this.store.activeAnchor.prevNextType = PrevNextType.Mirror;
            }
            this.store.activeAnchor.prevNextType =
                (this.store.activeAnchor.prevNextType + 1) % 3;
        }
    };
    Canvas.prototype.gotoView = function (x, y) {
        var rect = getRect(this.store.data.pens);
        if (!isFinite(rect.width)) {
            throw new Error('can not move view, because width is not finite');
        }
        this.store.data.x = this.canvas.clientWidth / 2 - x * rect.width - rect.x;
        this.store.data.y = this.canvas.clientHeight / 2 - y * rect.height - rect.y;
        this.onMovePens();
        this.canvasImage.init();
        this.canvasImageBottom.init();
        this.render();
    };
    Canvas.prototype.showMagnifier = function () {
        this.magnifierCanvas.magnifier = true;
        this.externalElements.style.cursor = 'default';
        this.render();
    };
    Canvas.prototype.hideMagnifier = function () {
        this.magnifierCanvas.magnifier = false;
        this.externalElements.style.cursor = 'default';
        this.render();
    };
    Canvas.prototype.toggleMagnifier = function () {
        this.magnifierCanvas.magnifier = !this.magnifierCanvas.magnifier;
        if (this.magnifierCanvas.magnifier) {
            this.externalElements.style.cursor = 'default';
        }
        this.render();
    };
    Canvas.prototype.destroy = function () {
        var _a;
        this.scroll && this.scroll.destroy();
        (_a = this.tooltip) === null || _a === void 0 ? void 0 : _a.destroy();
        // ios
        this.externalElements.removeEventListener('gesturestart', this.onGesturestart);
        this.externalElements.ondragover = function (e) { return e.preventDefault(); };
        this.externalElements.ondrop = undefined;
        if (isMobile()) {
            this.externalElements.ontouchstart = undefined;
            this.externalElements.ontouchmove = undefined;
            this.externalElements.ontouchend = undefined;
        }
        else {
            this.externalElements.onmousedown = undefined;
            this.externalElements.onmousemove = undefined;
            this.externalElements.onmouseup = undefined;
            this.externalElements.onmouseleave = undefined;
        }
        this.externalElements.ondblclick = undefined;
        switch (this.store.options.keydown) {
            case KeydownType.Document:
                document.removeEventListener('keydown', this.onkeydown);
                document.removeEventListener('keyup', this.onkeyup);
                break;
            case KeydownType.Canvas:
                this.externalElements.removeEventListener('keydown', this.onkeydown);
                this.externalElements.removeEventListener('keyup', this.onkeyup);
                break;
        }
        document.removeEventListener('copy', this.onCopy);
        document.removeEventListener('cut', this.onCut);
        document.removeEventListener('paste', this.onPaste);
        window && window.removeEventListener('resize', this.onResize);
        window && window.removeEventListener('scroll', this.onScroll);
    };
    return Canvas;
}());
export { Canvas };
//# sourceMappingURL=canvas.js.map