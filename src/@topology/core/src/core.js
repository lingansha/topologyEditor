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
import { commonAnchors, commonPens, cube } from './diagrams';
import { Canvas } from './canvas';
import { calcInView, calcTextDrawRect, calcTextLines, calcTextRect, facePen, formatAttrs, getAllChildren, getFromAnchor, getParent, getToAnchor, getWords, LockState, PenType, renderPenRaw, setElemPosition, connectLine, nearestAnchor, setChildValue, } from './pen';
import { rotatePoint } from './point';
import { clearStore, EditType, globalStore, register, registerAnchors, registerCanvasDraw, useStore, } from './store';
import { formatPadding, s8, valueInArray, valueInRange, } from './utils';
import { calcCenter, calcRelativeRect, getRect } from './rect';
import { deepClone } from './utils/clone';
import { EventAction } from './event';
import { ViewMap } from './map';
import * as mqtt from 'mqtt/dist/mqtt.min.js';
import pkg from '../package.json';
import { lockedError } from './utils/error';
var Topology = /** @class */ (function () {
    function Topology(parent, opts) {
        var _this = this;
        if (opts === void 0) { opts = {}; }
        this.events = {};
        this.facePen = facePen;
        this.getWords = getWords;
        this.calcTextLines = calcTextLines;
        this.calcTextRect = calcTextRect;
        this.calcTextDrawRect = calcTextDrawRect;
        this.register = register;
        this.registerCanvasDraw = registerCanvasDraw;
        this.registerAnchors = registerAnchors;
        this.onEvent = function (eventName, e) {
            switch (eventName) {
                case 'add':
                    {
                        e.forEach(function (pen) {
                            var _a;
                            (_a = pen.onAdd) === null || _a === void 0 ? void 0 : _a.call(pen, pen);
                        });
                    }
                    _this.onSizeUpdate();
                    break;
                case 'enter':
                    e && e.onMouseEnter && e.onMouseEnter(e, _this.canvas.mousePos);
                    _this.store.data.locked && _this.doEvent(e, eventName);
                    break;
                case 'leave':
                    e && e.onMouseLeave && e.onMouseLeave(e, _this.canvas.mousePos);
                    _this.store.data.locked && _this.doEvent(e, eventName);
                    break;
                case 'active':
                case 'inactive':
                    {
                        _this.store.data.locked &&
                            e.forEach(function (pen) {
                                _this.doEvent(pen, eventName);
                            });
                    }
                    break;
                case 'click':
                    e.pen && e.pen.onClick && e.pen.onClick(e.pen, _this.canvas.mousePos);
                    _this.store.data.locked && e.pen && _this.doEvent(e.pen, eventName);
                    break;
                case 'mousedown':
                    e.pen &&
                        e.pen.onMouseDown &&
                        e.pen.onMouseDown(e.pen, _this.canvas.mousePos);
                    _this.store.data.locked && e.pen && _this.doEvent(e.pen, eventName);
                    break;
                case 'mouseup':
                    e.pen &&
                        e.pen.onMouseUp &&
                        e.pen.onMouseUp(e.pen, _this.canvas.mousePos);
                    _this.store.data.locked && e.pen && _this.doEvent(e.pen, eventName);
                    break;
                case 'dblclick':
                    _this.store.data.locked && e.pen && _this.doEvent(e.pen, eventName);
                    break;
                case 'valueUpdate':
                    _this.store.data.locked && _this.doEvent(e, eventName);
                    _this.canvas.tooltip.updateText(e);
                    break;
                case 'update':
                case 'delete':
                case 'translatePens':
                case 'rotatePens':
                case 'resizePens':
                    _this.onSizeUpdate();
                    break;
            }
        };
        this.doEvent = function (pen, eventName) {
            var _a;
            if (!pen) {
                return;
            }
            (_a = pen.events) === null || _a === void 0 ? void 0 : _a.forEach(function (event) {
                var _a;
                if (_this.events[event.action] && event.name === eventName) {
                    var can = !((_a = event.where) === null || _a === void 0 ? void 0 : _a.type);
                    if (event.where) {
                        var _b = event.where, fn = _b.fn, fnJs = _b.fnJs, comparison = _b.comparison, key = _b.key, value = _b.value;
                        if (fn) {
                            can = fn(pen);
                        }
                        else if (fnJs) {
                            try {
                                event.where.fn = new Function('pen', fnJs);
                            }
                            catch (err) {
                                console.error('Error: make function:', err);
                            }
                            if (event.where.fn) {
                                can = event.where.fn(pen);
                            }
                        }
                        else {
                            switch (comparison) {
                                case '>':
                                    can = pen[key] > +value;
                                    break;
                                case '>=':
                                    can = pen[key] >= +value;
                                    break;
                                case '<':
                                    can = pen[key] < +value;
                                    break;
                                case '<=':
                                    can = pen[key] <= +value;
                                    break;
                                case '=':
                                case '==':
                                    can = pen[key] == value;
                                    break;
                                case '!=':
                                    can = pen[key] != value;
                                    break;
                                case '[)':
                                    can = valueInRange(+pen[key], value);
                                    break;
                                case '![)':
                                    can = !valueInRange(+pen[key], value);
                                    break;
                                case '[]':
                                    can = valueInArray(+pen[key], value);
                                    break;
                                case '![]':
                                    can = !valueInArray(+pen[key], value);
                                    break;
                            }
                        }
                    }
                    can && _this.events[event.action](pen, event);
                }
            });
            // 事件冒泡，子执行完，父执行
            _this.doEvent(_this.store.pens[pen.parentId], eventName);
        };
        this.renderPenRaw = renderPenRaw;
        this.setElemPosition = setElemPosition;
        this.store = useStore(s8());
        this.setOptions(opts);
        this.setDatabyOptions(opts);
        this.init(parent);
        this.register(commonPens());
        this.registerCanvasDraw({ cube: cube });
        this.registerAnchors(commonAnchors());
        globalThis.topology = this;
        this.initEventFns();
        this.store.emitter.on('*', this.onEvent);
    }
    Object.defineProperty(Topology.prototype, "beforeAddPen", {
        /**
         * @deprecated 改用 beforeAddPens
         */
        get: function () {
            return this.canvas.beforeAddPen;
        },
        /**
         * @deprecated 改用 beforeAddPens
         */
        set: function (fn) {
            this.canvas.beforeAddPen = fn;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Topology.prototype, "beforeAddPens", {
        get: function () {
            return this.canvas.beforeAddPens;
        },
        set: function (fn) {
            this.canvas.beforeAddPens = fn;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Topology.prototype, "beforeAddAnchor", {
        get: function () {
            return this.canvas.beforeAddAnchor;
        },
        set: function (fn) {
            this.canvas.beforeAddAnchor = fn;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Topology.prototype, "beforeRemovePens", {
        get: function () {
            return this.canvas.beforeRemovePens;
        },
        set: function (fn) {
            this.canvas.beforeRemovePens = fn;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Topology.prototype, "beforeRemoveAnchor", {
        get: function () {
            return this.canvas.beforeRemoveAnchor;
        },
        set: function (fn) {
            this.canvas.beforeRemoveAnchor = fn;
        },
        enumerable: false,
        configurable: true
    });
    Topology.prototype.setOptions = function (opts) {
        if (opts === void 0) { opts = {}; }
        this.store.options = Object.assign(this.store.options, opts);
    };
    Topology.prototype.getOptions = function () {
        return this.store.options;
    };
    Topology.prototype.setDatabyOptions = function (options) {
        if (options === void 0) { options = {}; }
        var color = options.color, activeColor = options.activeColor, activeBackground = options.activeBackground, grid = options.grid, gridColor = options.gridColor, gridSize = options.gridSize, fromArrow = options.fromArrow, toArrow = options.toArrow, rule = options.rule, ruleColor = options.ruleColor;
        this.setRule({ rule: rule, ruleColor: ruleColor });
        this.setGrid({
            grid: grid,
            gridColor: gridColor,
            gridSize: gridSize,
        });
        this.store.data = Object.assign(this.store.data, {
            color: color,
            activeColor: activeColor,
            activeBackground: activeBackground,
            fromArrow: fromArrow,
            toArrow: toArrow,
        });
    };
    Topology.prototype.init = function (parent) {
        if (typeof parent === 'string') {
            this.canvas = new Canvas(this, document.getElementById(parent), this.store);
        }
        else {
            this.canvas = new Canvas(this, parent, this.store);
        }
        this.resize();
        this.canvas.listen();
    };
    Topology.prototype.initEventFns = function () {
        var _this = this;
        this.events[EventAction.Link] = function (pen, e) {
            var _a;
            if (window && e.value && typeof e.value === 'string') {
                window.open(e.value, (_a = e.params) !== null && _a !== void 0 ? _a : '_blank');
                return;
            }
            console.warn('[topology] Link param is not a string');
        };
        this.events[EventAction.SetProps] = function (pen, e) {
            // TODO: 若频繁地触发，重复 render 可能带来性能问题，待考虑
            var value = e.value;
            if (value && typeof value === 'object') {
                var pens = e.params ? _this.find(e.params) : [pen];
                pens.forEach(function (pen) {
                    if (value.hasOwnProperty('visible')) {
                        _this.setVisible(pen, value.visible);
                    }
                    _this.setValue(__assign({ id: pen.id }, value), { render: false, doEvent: false });
                });
                _this.render();
                return;
            }
            console.warn('[topology] SetProps value is not an object');
        };
        this.events[EventAction.StartAnimate] = function (pen, e) {
            if (!e.value || typeof e.value === 'string') {
                _this.startAnimate(e.value || [pen]);
                return;
            }
            console.warn('[topology] StartAnimate value is not a string');
        };
        this.events[EventAction.PauseAnimate] = function (pen, e) {
            if (!e.value || typeof e.value === 'string') {
                _this.pauseAnimate(e.value || [pen]);
                return;
            }
            console.warn('[topology] PauseAnimate value is not a string');
        };
        this.events[EventAction.StopAnimate] = function (pen, e) {
            if (!e.value || typeof e.value === 'string') {
                _this.stopAnimate(e.value || [pen]);
                return;
            }
            console.warn('[topology] StopAnimate event value is not a string');
        };
        this.events[EventAction.StartVideo] = function (pen, e) {
            if (!e.value || typeof e.value === 'string') {
                _this.startVideo(e.value || [pen]);
                return;
            }
            console.warn('[topology] StartVideo value is not a string');
        };
        this.events[EventAction.PauseVideo] = function (pen, e) {
            if (!e.value || typeof e.value === 'string') {
                _this.pauseVideo(e.value || [pen]);
                return;
            }
            console.warn('[topology] PauseVideo value is not a string');
        };
        this.events[EventAction.StopVideo] = function (pen, e) {
            if (!e.value || typeof e.value === 'string') {
                _this.stopVideo(e.value || [pen]);
                return;
            }
            console.warn('[topology] StopVideo event value is not a string');
        };
        this.events[EventAction.Function] = function (pen, e) {
            var _a;
            if (e.value && !e.fn) {
                try {
                    if (typeof e.value !== 'string') {
                        throw new Error('[topology] Function value must be string');
                    }
                    var fnJs = e.value;
                    e.fn = new Function('pen', 'params', fnJs);
                }
                catch (err) {
                    console.error('[topology]: Error on make a function:', err);
                }
            }
            (_a = e.fn) === null || _a === void 0 ? void 0 : _a.call(e, pen, e.params);
        };
        this.events[EventAction.GlobalFn] = function (pen, e) {
            if (typeof e.value !== 'string') {
                console.warn('[topology] GlobalFn value must be a string');
                return;
            }
            if (globalThis[e.value]) {
                globalThis[e.value](pen, e.params);
            }
        };
        this.events[EventAction.Emit] = function (pen, e) {
            if (typeof e.value !== 'string') {
                console.warn('[topology] Emit value must be a string');
                return;
            }
            _this.store.emitter.emit(e.value, {
                pen: pen,
                params: e.params,
            });
        };
        this.events[EventAction.SendPropData] = function (pen, e) {
            var value = deepClone(e.value);
            if (value && typeof value === 'object') {
                var _pen = e.params ? _this.findOne(e.params) : pen;
                for (var key in value) {
                    if (!value[key]) {
                        value[key] = _pen[key];
                    }
                }
                value.id = _pen.id;
                _this.doSendDataEvent(value);
                return;
            }
            console.warn('[topology] SendPropData value is not an object');
        };
        this.events[EventAction.SendVarData] = function (pen, e) {
            var value = deepClone(e.value);
            if (value && typeof value === 'object') {
                var _pen = e.params ? _this.findOne(e.params) : pen;
                var array = [];
                var _loop_1 = function (key) {
                    var obj = {
                        dataId: key,
                        value: value[key],
                    };
                    if (!obj.value) {
                        var oneForm = _pen.form.find(function (_item) {
                            return _item.dataIds &&
                                _item.dataIds.dataId === obj.dataId;
                        });
                        if (oneForm) {
                            obj.value = _pen[oneForm.key];
                        }
                    }
                    array.push(obj);
                };
                for (var key in value) {
                    _loop_1(key);
                }
                _this.doSendDataEvent(array);
                return;
            }
            console.warn('[topology] SendVarData value is not an object');
        };
    };
    Topology.prototype.doSendDataEvent = function (value) {
        var data = JSON.stringify(value);
        if (this.mqttClient && this.mqttClient.connected) {
            this.mqttClient.publish('event', data);
        }
        if (this.websocket && this.websocket.readyState === 1) {
            this.websocket.send(data);
        }
        if (this.store.data.http) {
            this.sendDatabyHttp(data);
        }
    };
    Topology.prototype.resize = function (width, height) {
        this.canvas.resize(width, height);
        this.render();
        this.store.emitter.emit('resize', { width: width, height: height });
        if (this.canvas.scroll && this.canvas.scroll.isShow) {
            this.canvas.scroll.init();
        }
    };
    /**
     *
     * @param emit 是否发送消息
     */
    Topology.prototype.addPen = function (pen, history, emit) {
        if (emit === void 0) { emit = true; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.canvas.addPen(pen, history, emit)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Topology.prototype.addPens = function (pens, history) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.canvas.addPens(pens, history)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Topology.prototype.render = function (patchFlags) {
        this.canvas.render(patchFlags);
    };
    Topology.prototype.setBackgroundImage = function (url) {
        var _this = this;
        this.store.data.bkImage = url;
        this.canvas.canvasImageBottom.canvas.style.backgroundImage = url
            ? "url(" + url + ")"
            : '';
        if (url) {
            var img_1 = new Image();
            img_1.src = url;
            img_1.onload = function () {
                // 用作 toPng 的绘制
                _this.store.bkImg = img_1;
            };
        }
        else {
            this.store.bkImg = null;
        }
    };
    Topology.prototype.setBackgroundColor = function (color) {
        if (color === void 0) { color = this.store.data.background; }
        this.store.data.background = color;
        this.store.patchFlagsBackground = true;
    };
    Topology.prototype.setGrid = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.grid, grid = _c === void 0 ? this.store.data.grid : _c, _d = _b.gridColor, gridColor = _d === void 0 ? this.store.data.gridColor : _d, _e = _b.gridSize, gridSize = _e === void 0 ? this.store.data.gridSize : _e, _f = _b.gridRotate, gridRotate = _f === void 0 ? this.store.data.gridRotate : _f;
        this.store.data.grid = grid;
        this.store.data.gridColor = gridColor;
        this.store.data.gridSize = gridSize;
        this.store.data.gridRotate = gridRotate;
        this.store.patchFlagsBackground = true;
    };
    Topology.prototype.setRule = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.rule, rule = _c === void 0 ? this.store.data.rule : _c, _d = _b.ruleColor, ruleColor = _d === void 0 ? this.store.data.ruleColor : _d;
        this.store.data.rule = rule;
        this.store.data.ruleColor = ruleColor;
        this.store.patchFlagsTop = true;
    };
    Topology.prototype.open = function (data) {
        var e_1, _a, e_2, _b;
        this.clear(false);
        if (data) {
            this.setBackgroundImage(data.bkImage);
            Object.assign(this.store.data, data);
            this.store.data.pens = [];
            try {
                // 第一遍赋初值
                for (var _c = __values(data.pens), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var pen = _d.value;
                    if (!pen.id) {
                        pen.id = s8();
                    }
                    !pen.calculative && (pen.calculative = { canvas: this.canvas });
                    this.store.pens[pen.id] = pen;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            try {
                for (var _e = __values(data.pens), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var pen = _f.value;
                    this.canvas.makePen(pen);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        this.initBindDatas();
        this.render();
        this.listenSocket();
        this.connectSocket();
        this.startAnimate();
        this.startVideo();
        this.doInitJS();
        this.store.emitter.emit('opened');
        if (this.canvas.scroll && this.canvas.scroll.isShow) {
            this.canvas.scroll.init();
        }
    };
    Topology.prototype.initBindDatas = function () {
        var _this = this;
        this.store.bindDatas = {};
        this.store.data.pens.forEach(function (pen) {
            var _a;
            (_a = pen.form) === null || _a === void 0 ? void 0 : _a.forEach(function (formItem) {
                var dataIds;
                if (formItem.dataIds) {
                    if (Array.isArray(formItem.dataIds)) {
                        dataIds = formItem.dataIds;
                    }
                    else {
                        dataIds = [formItem.dataIds];
                    }
                }
                dataIds === null || dataIds === void 0 ? void 0 : dataIds.forEach(function (item) {
                    if (!_this.store.bindDatas[item.dataId]) {
                        _this.store.bindDatas[item.dataId] = [];
                    }
                    _this.store.bindDatas[item.dataId].push({
                        id: pen.id,
                        formItem: formItem,
                    });
                });
            });
        });
    };
    Topology.prototype.connectSocket = function () {
        this.connectWebsocket();
        this.connectMqtt();
        this.connectHttp();
    };
    /**
     * open 后执行初始化 Js ，每个图纸可配置一个初始化 js
     */
    Topology.prototype.doInitJS = function () {
        var initJs = this.store.data.initJs;
        if (initJs && initJs.trim()) {
            try {
                var fn = new Function(initJs);
                fn();
            }
            catch (e) {
                console.warn('initJs error', e);
            }
        }
    };
    Topology.prototype.drawLine = function (lineName) {
        lineName && lockedError(this.store);
        this.canvas.drawingLineName = lineName;
    };
    Topology.prototype.drawingPencil = function () {
        this.canvas.drawingPencil();
    };
    Topology.prototype.stopPencil = function () {
        this.canvas.stopPencil();
    };
    Topology.prototype.lock = function (lock) {
        this.store.data.locked = lock;
        this.finishDrawLine(true);
        this.canvas.drawingLineName = '';
        this.stopPencil();
        if (lock === 0) {
            //恢复可选状态
            this.store.data.pens.forEach(function (pen) {
                if (pen.name === 'echarts') {
                    pen.onMove && pen.onMove(pen);
                }
            });
        }
    };
    // end  - 当前鼠标位置，是否作为终点
    Topology.prototype.finishDrawLine = function (end) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.canvas.finishDrawline(end)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Topology.prototype.finishPencil = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.canvas.finishPencil()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Topology.prototype.updateLineType = function (pen, lineName) {
        if (!pen || pen.name != 'line' || !lineName || !this.canvas[lineName]) {
            return;
        }
        pen.lineName = lineName;
        var from = getFromAnchor(pen);
        var to = getToAnchor(pen);
        from.prev = undefined;
        from.next = undefined;
        to.prev = undefined;
        to.next = undefined;
        pen.calculative.worldAnchors = [from, to];
        pen.calculative.activeAnchor = from;
        this.canvas[lineName](this.store, pen, to);
        if (pen.lineName === 'curve') {
            from.prev = {
                penId: from.penId,
                x: from.x - 50,
                y: from.y,
            };
            from.next = {
                penId: from.penId,
                x: from.x + 50,
                y: from.y,
            };
            to.prev = {
                penId: to.penId,
                x: to.x - 50,
                y: to.y,
            };
            to.next = {
                penId: to.penId,
                x: to.x + 50,
                y: to.y,
            };
        }
        pen.calculative.activeAnchor = undefined;
        this.canvas.initLineRect(pen);
        this.render();
    };
    Topology.prototype.addDrawLineFn = function (fnName, fn) {
        this.canvas[fnName] = fn;
        this.canvas.drawLineFns.push(fnName);
    };
    Topology.prototype.removeDrawLineFn = function (fnName) {
        var index = this.canvas.drawLineFns.indexOf(fnName);
        if (index > -1) {
            this.canvas.drawLineFns.splice(index, 1);
        }
    };
    Topology.prototype.showMagnifier = function () {
        this.canvas.showMagnifier();
    };
    Topology.prototype.hideMagnifier = function () {
        this.canvas.hideMagnifier();
    };
    Topology.prototype.toggleMagnifier = function () {
        this.canvas.toggleMagnifier();
    };
    /**
     * 擦除画布，释放 store 上的 pens
     * @param render 是否重绘
     */
    Topology.prototype.clear = function (render) {
        var e_3, _a;
        var _b;
        if (render === void 0) { render = true; }
        try {
            for (var _c = __values(this.store.data.pens), _d = _c.next(); !_d.done; _d = _c.next()) {
                var pen = _d.value;
                (_b = pen.onDestroy) === null || _b === void 0 ? void 0 : _b.call(pen, pen);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_3) throw e_3.error; }
        }
        clearStore(this.store);
        this.hideInput();
        this.canvas.tooltip.hide();
        this.canvas.clearCanvas();
        sessionStorage.removeItem('page');
        this.store.clipboard = undefined;
        // 非必要，为的是 open 时重绘 背景与网格
        this.store.patchFlagsBackground = true;
        this.store.patchFlagsTop = true;
        this.setBackgroundImage(undefined);
        render && this.render();
    };
    Topology.prototype.emit = function (eventType, data) {
        this.store.emitter.emit(eventType, data);
    };
    Topology.prototype.on = function (eventType, handler) {
        this.store.emitter.on(eventType, handler);
        return this;
    };
    Topology.prototype.off = function (eventType, handler) {
        this.store.emitter.off(eventType, handler);
        return this;
    };
    // customeDock = (store, rect, pens, offset) => {xDock, yDock}
    // customDock return:
    // {
    //   xDock: {x, y, step, prev, penId},
    //   yDock: {x, y, step, prev, penId},
    // }
    // xDock，yDock - 水平或垂直方向的参考线
    // prev - 参考线的起点
    // x,y - 参考线的终点
    // step - 自动吸附需要的偏移量
    // penId - 参考线的笔
    Topology.prototype.registerMoveDock = function (dock) {
        this.canvas.customMoveDock = dock;
    };
    /**
     * 参数同方法 registerMoveDock ，最后一个参数由 offset 偏移修改成了当前 resize 的点
     */
    Topology.prototype.registerResizeDock = function (dock) {
        this.canvas.customResizeDock = dock;
    };
    Topology.prototype.find = function (idOrTag) {
        return this.canvas.find(idOrTag);
    };
    Topology.prototype.findOne = function (idOrTag) {
        return this.canvas.findOne(idOrTag);
    };
    Topology.prototype.getPenRect = function (pen) {
        return this.canvas.getPenRect(pen);
    };
    Topology.prototype.setPenRect = function (pen, rect, render) {
        if (render === void 0) { render = true; }
        this.canvas.setPenRect(pen, rect, render);
    };
    Topology.prototype.startAnimate = function (idOrTagOrPens) {
        var _this = this;
        var pens;
        if (!idOrTagOrPens) {
            pens = this.store.data.pens.filter(function (pen) {
                return (pen.type || pen.frames) && pen.autoPlay;
            });
        }
        else if (typeof idOrTagOrPens === 'string') {
            pens = this.find(idOrTagOrPens);
        }
        else {
            pens = idOrTagOrPens;
        }
        pens.forEach(function (pen) {
            if (pen.calculative.pause) {
                var d = Date.now() - pen.calculative.pause;
                pen.calculative.pause = undefined;
                pen.calculative.frameStart += d;
                pen.calculative.frameEnd += d;
            }
            else {
                _this.store.animates.add(pen);
            }
        });
        this.canvas.canvasImage.init();
        this.canvas.canvasImageBottom.init();
        this.canvas.animate(this);
    };
    Topology.prototype.pauseAnimate = function (idOrTagOrPens) {
        var pens = [];
        if (!idOrTagOrPens) {
            this.store.animates.forEach(function (pen) {
                pens.push(pen);
            });
        }
        else if (typeof idOrTagOrPens === 'string') {
            pens = this.find(idOrTagOrPens);
        }
        else {
            pens = idOrTagOrPens;
        }
        pens.forEach(function (pen) {
            if (!pen.calculative.pause) {
                pen.calculative.pause = Date.now();
            }
        });
    };
    Topology.prototype.stopAnimate = function (idOrTagOrPens) {
        var _this = this;
        var pens = [];
        if (!idOrTagOrPens) {
            this.store.animates.forEach(function (pen) {
                pens.push(pen);
            });
        }
        else if (typeof idOrTagOrPens === 'string') {
            pens = this.find(idOrTagOrPens);
        }
        else {
            pens = idOrTagOrPens;
        }
        pens.forEach(function (pen) {
            pen.calculative.pause = undefined;
            pen.calculative.start = undefined;
            pen.calculative.duration = undefined;
            pen.calculative.animatePos = 0;
            _this.store.animates.delete(pen);
            _this.canvas.restoreNodeAnimate(pen);
        });
        this.initImageCanvas(pens);
        setTimeout(function () {
            _this.canvas.calcActiveRect();
            _this.render();
        }, 20);
    };
    Topology.prototype.startVideo = function (idOrTagOrPens) {
        var pens;
        if (!idOrTagOrPens) {
            pens = this.store.data.pens.filter(function (pen) {
                return (pen.video || pen.audio) && pen.autoPlay;
            });
        }
        else if (typeof idOrTagOrPens === 'string') {
            pens = this.find(idOrTagOrPens);
        }
        else {
            pens = idOrTagOrPens;
        }
        pens.forEach(function (pen) {
            var _a, _b;
            (_a = pen.calculative.media) === null || _a === void 0 ? void 0 : _a.play();
            (_b = pen.onStartVideo) === null || _b === void 0 ? void 0 : _b.call(pen, pen);
        });
    };
    Topology.prototype.pauseVideo = function (idOrTagOrPens) {
        var pens = [];
        if (!idOrTagOrPens) {
            //TODO 寻找所有 而不是正在播放的
            pens = this.store.data.pens.filter(function (pen) {
                return (pen.video || pen.audio) && pen.autoPlay;
            });
        }
        else if (typeof idOrTagOrPens === 'string') {
            pens = this.find(idOrTagOrPens);
        }
        else {
            pens = idOrTagOrPens;
        }
        pens.forEach(function (pen) {
            var _a, _b;
            (_a = pen.calculative.media) === null || _a === void 0 ? void 0 : _a.pause();
            (_b = pen.onPauseVideo) === null || _b === void 0 ? void 0 : _b.call(pen, pen);
        });
    };
    Topology.prototype.stopVideo = function (idOrTagOrPens) {
        var pens = [];
        if (!idOrTagOrPens) {
            pens = this.store.data.pens.filter(function (pen) {
                return (pen.video || pen.audio) && pen.autoPlay;
            });
        }
        else if (typeof idOrTagOrPens === 'string') {
            pens = this.find(idOrTagOrPens);
        }
        else {
            pens = idOrTagOrPens;
        }
        pens.forEach(function (pen) {
            var _a;
            if (pen.calculative.media) {
                pen.calculative.media.currentTime = 0;
                pen.calculative.media.pause();
            }
            (_a = pen.onStopVideo) === null || _a === void 0 ? void 0 : _a.call(pen, pen);
        });
    };
    Topology.prototype.calcAnimateDuration = function (pen) {
        return pen.frames.reduce(function (prev, frame) { return prev + frame.duration; }, 0);
    };
    /**
     * 组合
     * @param pens 组合的画笔们
     * @param showChild 组合后展示第几个孩子
     */
    Topology.prototype.combine = function (pens, showChild) {
        if (pens === void 0) { pens = this.store.active; }
        if (!pens || !pens.length) {
            return;
        }
        var initPens = deepClone(pens);
        if (pens.length === 1 && pens[0].type) {
            pens[0].type = PenType.Node;
            this.canvas.active(pens);
            this.pushHistory({
                type: EditType.Update,
                initPens: initPens,
                pens: deepClone(pens, true),
            });
            this.render();
            return;
        }
        var rect = getRect(pens);
        var parent = __assign(__assign({ id: s8(), name: 'combine' }, rect), { children: [], showChild: showChild });
        // const p = pens.find((pen) => {
        //   // TODO: js 计算误差，可能导致包含着其它的 pens 的最大 pen 无法计算出来
        //   return pen.width === rect.width && pen.height === rect.height;
        // });
        // // 其中一个认为是父节点
        // const oneIsParent = p && showChild == undefined;
        // if (oneIsParent) {
        //   if (!p.children) {
        //     p.children = [];
        //   }
        //   parent = p;
        // } else {
        // 若组合为状态，那么 parent 一定是 combine
        this.canvas.makePen(parent);
        // }
        pens.forEach(function (pen) {
            var _a;
            if (pen === parent || pen.parentId === parent.id) {
                return;
            }
            // pen 来自于 store.active ，不存在有 parentId 的情况
            parent.children.push(pen.id);
            pen.parentId = parent.id;
            var childRect = calcRelativeRect(pen.calculative.worldRect, rect);
            Object.assign(pen, childRect);
            pen.locked = (_a = pen.lockedOnCombine) !== null && _a !== void 0 ? _a : LockState.DisableMove;
        });
        this.canvas.active([parent]);
        var step = 1;
        // if (!oneIsParent) {
        //   step = 2;
        //   this.pushHistory({
        //     type: EditType.Add,
        //     pens: [parent],
        //     step,
        //   });
        //   this.store.emitter.emit('add', [parent]);
        // }
        this.pushHistory({
            type: EditType.Update,
            initPens: initPens,
            pens: pens,
            step: step,
        });
        if (showChild != undefined) {
            pens.forEach(function (pen) {
                calcInView(pen, true);
            });
            this.initImageCanvas([parent]);
        }
        this.render();
    };
    Topology.prototype.uncombine = function (pen) {
        var _this = this;
        if (!pen && this.store.active) {
            pen = this.store.active[0];
        }
        if (!pen || !pen.children) {
            return;
        }
        var children = pen.children.map(function (childId) { return _this.store.pens[childId]; });
        var initPens = deepClone(children);
        children.forEach(function (child) {
            child.parentId = undefined;
            child.x = child.calculative.worldRect.x;
            child.y = child.calculative.worldRect.y;
            child.width = child.calculative.worldRect.width;
            child.height = child.calculative.worldRect.height;
            child.locked = LockState.None;
            child.calculative.active = undefined;
            child.calculative.hover = false;
            _this.setVisible(child, true); // 子节点的 visible 属性已经改变，需要恢复
        });
        var step = this.isCombine(pen) ? 3 : 2;
        this.pushHistory({
            type: EditType.Update,
            initPens: initPens,
            pens: children,
            step: step,
        });
        initPens = [deepClone(pen)];
        pen.children = undefined;
        // 保存修改 children 的历史记录
        this.pushHistory({
            type: EditType.Update,
            initPens: initPens,
            pens: [pen],
            step: step,
        });
        if (this.isCombine(pen)) {
            this.delete([pen]);
            // delete 会记录 history , 更改 step 即可
            this.store.histories[this.store.histories.length - 1].step = step;
        }
        this.inactive();
    };
    Topology.prototype.isCombine = function (pen) {
        if (pen.name === 'combine') {
            return true;
        }
        if (pen.children && pen.children.length > 0) {
            return true;
        }
        return false;
    };
    Topology.prototype.active = function (pens, emit) {
        if (emit === void 0) { emit = true; }
        this.canvas.active(pens, emit);
    };
    Topology.prototype.inactive = function () {
        this.canvas.inactive();
    };
    /**
     * 删除画笔
     * @param pens 需要删除的画笔们
     * @param canDelLocked 是否删除已经锁住的画笔
     */
    Topology.prototype.delete = function (pens, canDelLocked, history) {
        if (canDelLocked === void 0) { canDelLocked = false; }
        if (history === void 0) { history = true; }
        this.canvas.delete(pens, canDelLocked, history);
    };
    Topology.prototype.scale = function (scale, center) {
        if (center === void 0) { center = { x: 0, y: 0 }; }
        this.canvas.scale(scale, center);
    };
    Topology.prototype.translate = function (x, y) {
        this.canvas.translate(x, y);
    };
    Topology.prototype.translatePens = function (pens, x, y) {
        this.canvas.translatePens(pens, x, y);
    };
    Topology.prototype.getParent = function (pen, root) {
        return getParent(pen, root);
    };
    Topology.prototype.data = function () {
        var data = deepClone(this.store.data);
        var _a = this.store.data, pens = _a.pens, paths = _a.paths;
        data.version = pkg.version;
        // TODO: 未在 delete 时清除，避免撤销等操作。
        // 清除一些未使用到的 paths
        data.paths = {};
        var _loop_2 = function (pathId) {
            if (Object.prototype.hasOwnProperty.call(paths, pathId)) {
                if (pens.find(function (pen) { return pen.pathId === pathId; })) {
                    data.paths[pathId] = paths[pathId];
                }
            }
        };
        for (var pathId in paths) {
            _loop_2(pathId);
        }
        return data;
    };
    Topology.prototype.copy = function (pens) {
        this.canvas.copy(pens);
    };
    Topology.prototype.cut = function (pens) {
        this.canvas.cut(pens);
    };
    Topology.prototype.paste = function () {
        this.canvas.paste();
    };
    Topology.prototype.undo = function () {
        this.canvas.undo();
    };
    Topology.prototype.redo = function () {
        this.canvas.redo();
    };
    Topology.prototype.listenSocket = function () {
        try {
            var socketFn = void 0;
            var socketCbJs = this.store.data.socketCbJs;
            if (socketCbJs) {
                socketFn = new Function('e', 'topic', socketCbJs);
            }
            if (!socketFn) {
                return false;
            }
            this.socketFn = socketFn;
        }
        catch (e) {
            console.error('Create the function for socket:', e);
            return false;
        }
        return true;
    };
    Topology.prototype.connectWebsocket = function (websocket) {
        var _this = this;
        this.closeWebsocket();
        if (websocket) {
            this.store.data.websocket = websocket;
        }
        if (this.store.data.websocket) {
            this.websocket = new WebSocket(this.store.data.websocket);
            this.websocket.onmessage = function (e) {
                _this.socketCallback(e.data);
            };
            this.websocket.onclose = function () {
                console.info('Canvas websocket closed and reconneting...');
                _this.connectWebsocket();
            };
        }
    };
    Topology.prototype.closeWebsocket = function () {
        if (this.websocket) {
            this.websocket.onclose = undefined;
            this.websocket.close();
            this.websocket = undefined;
        }
    };
    Topology.prototype.connectMqtt = function (params) {
        var _this = this;
        this.closeMqtt();
        if (params) {
            this.store.data.mqtt = params.mqtt;
            this.store.data.mqttTopics = params.mqttTopics;
            this.store.data.mqttOptions = params.mqttOptions;
        }
        if (this.store.data.mqtt) {
            if (this.store.data.mqttOptions.clientId &&
                !this.store.data.mqttOptions.customClientId) {
                this.store.data.mqttOptions.clientId = s8();
            }
            this.mqttClient = mqtt.connect(this.store.data.mqtt, this.store.data.mqttOptions);
            this.mqttClient.on('message', function (topic, message) {
                _this.socketCallback(message.toString(), topic);
            });
            if (this.store.data.mqttTopics) {
                this.mqttClient.subscribe(this.store.data.mqttTopics.split(','));
            }
        }
    };
    Topology.prototype.closeMqtt = function () {
        var _a;
        (_a = this.mqttClient) === null || _a === void 0 ? void 0 : _a.end();
    };
    Topology.prototype.connectHttp = function () {
        var _this = this;
        this.closeHttp();
        var _a = this.store.data, http = _a.http, httpTimeInterval = _a.httpTimeInterval;
        if (http) {
            this.httpTimer = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                var res, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch(http)];
                        case 1:
                            res = _a.sent();
                            if (!res.ok) return [3 /*break*/, 3];
                            return [4 /*yield*/, res.text()];
                        case 2:
                            data = _a.sent();
                            this.socketCallback(data);
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); }, httpTimeInterval || 1000);
        }
    };
    Topology.prototype.sendDatabyHttp = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, http, httpHeaders, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.store.data, http = _a.http, httpHeaders = _a.httpHeaders;
                        if (!http) return [3 /*break*/, 2];
                        return [4 /*yield*/, fetch(http, {
                                method: 'post',
                                body: data,
                                headers: httpHeaders,
                            })];
                    case 1:
                        res = _b.sent();
                        if (res.ok) {
                            console.info('http消息发送成功');
                        }
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Topology.prototype.closeHttp = function () {
        clearInterval(this.httpTimer);
        this.httpTimer = undefined;
    };
    Topology.prototype.socketCallback = function (message, topic) {
        var _this = this;
        if (topic === void 0) { topic = ''; }
        this.store.emitter.emit('socket', { message: message, topic: topic });
        if (this.socketFn) {
            this.socketFn(message, topic);
            return;
        }
        var data;
        if (message.constructor === Object || message.constructor === Array) {
            data = message;
        }
        else if (typeof message === 'string') {
            try {
                data = JSON.parse(message);
            }
            catch (error) {
                console.warn('Invalid socket data:', data, error);
            }
        }
        else {
            return;
        }
        if (!data) {
            return;
        }
        if (!Array.isArray(data)) {
            data = [data];
        }
        if (data[0].dataId) {
            this.setDatas(data);
        }
        else {
            data.forEach(function (_data) {
                _this.setValue(_data);
            });
        }
    };
    // 绑定变量方式更新组件数据
    Topology.prototype.setDatas = function (datas, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.render, render = _c === void 0 ? true : _c, _d = _b.doEvent, doEvent = _d === void 0 ? true : _d, history = _b.history;
        // 把{dataId: string; value: any}转成setValue格式数据
        var penValues = new Map();
        datas.forEach(function (v) {
            var _a;
            (_a = _this.store.bindDatas[v.dataId]) === null || _a === void 0 ? void 0 : _a.forEach(function (p) {
                var _a;
                var pen = _this.store.pens[p.id];
                if (!pen) {
                    return;
                }
                var penValue = penValues.get(pen);
                if (typeof pen.onBinds === 'function') {
                    // 已经计算了
                    if (penValue) {
                        return;
                    }
                    penValues.set(pen, pen.onBinds(pen, datas, p.formItem));
                    return;
                }
                if (penValue) {
                    penValue[p.formItem.key] = v.value;
                }
                else {
                    penValue = (_a = {
                            id: p.id
                        },
                        _a[p.formItem.key] = v.value,
                        _a);
                    penValues.set(pen, penValue);
                }
            });
        });
        var initPens;
        var pens;
        if (history) {
            initPens = [];
        }
        penValues.forEach(function (value, pen) {
            _this.setValue(value, { render: false, doEvent: doEvent, history: false });
            if (history) {
                initPens.push(deepClone(pen, true));
                pens.push(pen);
            }
        });
        render && this.render();
        if (history) {
            this.pushHistory({
                type: EditType.Update,
                initPens: initPens,
                pens: pens,
            });
        }
    };
    Topology.prototype.setValue = function (data, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.render, render = _c === void 0 ? true : _c, _d = _b.doEvent, doEvent = _d === void 0 ? true : _d, history = _b.history;
        var pens = [];
        if (data.id) {
            var pen = this.store.pens[data.id];
            pen && (pens = [pen]);
        }
        else if (data.dataId) {
            pens = [];
            this.setDatas([data], {
                render: render,
                doEvent: doEvent,
                history: history,
            });
            return;
        }
        else if (data.tag) {
            pens = this.find(data.tag);
        }
        else {
            return;
        }
        history = history && !this.store.data.locked;
        var initPens;
        if (history) {
            initPens = deepClone(pens);
        }
        pens.forEach(function (pen) {
            
            var _a;
            var afterData = pen.onBeforeValue
                ? pen.onBeforeValue(pen, data)
                : data;
            if (data.frames) {
                _this.stopAnimate([pen]);
               
                if (!data.showDuration) {
                    data.showDuration = data.frames.reduce(function (total, item) {
                        return total + item.duration;
                    }, 0);
                    
                }
            }
            setChildValue(pen, afterData);
            _this.canvas.updateValue(pen, afterData);
            (_a = pen.onValue) === null || _a === void 0 ? void 0 : _a.call(pen, pen);
        });
        if (!this.store.data.locked &&
            this.store.active.length &&
            !this.canvas.movingPens) {
            // 移动过程中，不重算 activeRect
            this.canvas.calcActiveRect();
        }
        if (history) {
            this.pushHistory({
                type: EditType.Update,
                initPens: initPens,
                pens: pens,
            });
        }
        doEvent &&
            pens.forEach(function (pen) {
                _this.store.emitter.emit('valueUpdate', pen);
            });
        render && this.render();
    };
    /**
     * @deprecated 改用 setValue
     */
    Topology.prototype._setValue = function (data, history) {
        if (history === void 0) { history = false; }
        this.setValue(data, { history: history, render: false, doEvent: false });
    };
    Topology.prototype.pushHistory = function (action) {
        this.canvas.pushHistory(action);
    };
    Topology.prototype.showInput = function (pen, rect) {
        this.canvas.showInput(pen, rect);
    };
    Topology.prototype.hideInput = function () {
        this.canvas.hideInput();
    };
    Topology.prototype.clearDropdownList = function () {
        this.canvas.clearDropdownList();
    };
    Topology.prototype.pushChildren = function (parent, children) {
        var _this = this;
        var initUpdatePens = [deepClone(parent, true)];
        var addPens = [];
        if (!parent.children) {
            parent.children = [];
        }
        var updatePens = [];
        children.forEach(function (pen) {
            var _a;
            var oldPen = deepClone(pen, true);
            if (!pen.id || !_this.store.pens[pen.id]) {
                // 不存在于 store 中
                _this.canvas.makePen(pen);
                oldPen = null; // 添加操作
            }
            if (pen.parentId) {
                var oldParent = _this.store.pens[pen.parentId];
                var i = oldParent.children.findIndex(function (id) { return id === pen.id; });
                initUpdatePens.push(deepClone(oldParent, true));
                oldParent.children.splice(i, 1);
                updatePens.push(deepClone(oldParent, true));
            }
            parent.children.push(pen.id);
            pen.parentId = parent.id;
            var childRect = calcRelativeRect(pen.calculative.worldRect, parent.calculative.worldRect);
            Object.assign(pen, childRect);
            pen.locked = (_a = pen.lockedOnCombine) !== null && _a !== void 0 ? _a : LockState.DisableMove;
            if (!oldPen) {
                addPens.push(deepClone(pen, true));
            }
            else {
                initUpdatePens.push(oldPen);
                updatePens.push(deepClone(pen, true));
            }
        });
        updatePens.push(deepClone(parent, true));
        var step = 1;
        if (addPens.length) {
            step = 2;
            this.pushHistory({
                type: EditType.Add,
                pens: addPens,
                step: step,
            });
        }
        this.pushHistory({
            type: EditType.Update,
            initPens: initUpdatePens,
            pens: updatePens,
            step: step,
        });
    };
    Topology.prototype.toPng = function (padding, callback, containBkImg) {
        if (containBkImg === void 0) { containBkImg = false; }
        return this.canvas.toPng(padding, callback, containBkImg);
    };
    /**
     * 下载 png
     * @param name 传入参数自带文件后缀名 例如：'test.png'
     * @param padding 上右下左的内边距
     */
    Topology.prototype.downloadPng = function (name, padding) {
        var a = document.createElement('a');
        a.setAttribute('download', name || 'le5le.topology.png');
        a.setAttribute('href', this.toPng(padding, undefined, true));
        var evt = document.createEvent('MouseEvents');
        evt.initEvent('click', true, true);
        a.dispatchEvent(evt);
    };
    Topology.prototype.getRect = function (pens) {
        if (pens === void 0) { pens = this.store.data.pens; }
        return getRect(pens);
    };
    /**
     * 放大到屏幕尺寸，并居中
     * @param fit true，填满但完整展示；false，填满，但长边可能截取（即显示不完整）
     */
    Topology.prototype.fitView = function (fit, viewPadding) {
        if (fit === void 0) { fit = true; }
        if (viewPadding === void 0) { viewPadding = 10; }
        // 默认垂直填充，两边留白
        if (!this.hasView())
            return;
        // 1. 重置画布尺寸为容器尺寸
        var canvas = this.canvas.canvas;
        var width = canvas.offsetWidth, height = canvas.offsetHeight;
        this.resize(width, height);
        // 2. 获取设置的留白值
        var padding = formatPadding(viewPadding);
        // 3. 获取图形尺寸
        var rect = this.getRect();
        // 4. 计算缩放比例
        var w = (width - padding[1] - padding[3]) / rect.width;
        var h = (height - padding[0] - padding[2]) / rect.height;
        var ratio = w;
        if (fit) {
            // 完整显示取小的
            ratio = w > h ? h : w;
        }
        else {
            ratio = w > h ? w : h;
        }
        // 该方法直接更改画布的 scale 属性，所以比率应该乘以当前 scale
        this.scale(ratio * this.store.data.scale);
        // 5. 居中
        this.centerView();
    };
    Topology.prototype.centerView = function () {
        if (!this.hasView())
            return;
        var rect = this.getRect();
        var viewCenter = this.getViewCenter();
        var pensRect = this.getPenRect(rect);
        calcCenter(pensRect);
        var center = pensRect.center;
        var _a = this.store.data, scale = _a.scale, origin = _a.origin, dataX = _a.x, dataY = _a.y;
        // center 的值，在缩放和拖拽画布过程中不发生变化，是相对值
        // viewCenter 是一个绝对值，需要根据 origin 的值，来计算出相对的值
        // store.data.x 是画布偏移值，在 translate 方法中与 scale 相关，这里也需要计算
        this.translate((viewCenter.x - origin.x) / scale - center.x - dataX / scale, (viewCenter.y - origin.y) / scale - center.y - dataY / scale);
        var canvas = this.canvas.canvas;
        var x = (canvas.scrollWidth - canvas.offsetWidth) / 2;
        var y = (canvas.scrollHeight - canvas.offsetHeight) / 2;
        canvas.scrollTo(x, y);
    };
    /**
     * 画布是否有 画笔
     * RuleLine 不算
     */
    Topology.prototype.hasView = function () {
        return !!this.store.data.pens.filter(function (pen) { return !pen.isRuleLine; }).length;
    };
    Topology.prototype.getViewCenter = function () {
        var _a = this.canvas, width = _a.width, height = _a.height;
        return {
            x: width / 2,
            y: height / 2,
        };
    };
    /**
     * 大小相同
     * @param pens 画笔们
     */
    Topology.prototype.beSameByFirst = function (pens, attribute) {
        if (pens === void 0) { pens = this.store.data.pens; }
        var initPens = deepClone(pens); // 原 pens ，深拷贝一下
        // 1. 得到第一个画笔的 宽高 字体大小
        var firstPen = pens[0];
        var _a = this.getPenRect(firstPen), width = _a.width, height = _a.height;
        for (var i = 1; i < pens.length; i++) {
            var pen = pens[i];
            if (attribute === 'width') {
                this.setValue({ id: pen.id, width: width }, { render: false, doEvent: false });
            }
            else if (attribute === 'height') {
                this.setValue({ id: pen.id, height: height }, { render: false, doEvent: false });
            }
            else {
                this.setValue({ id: pen.id, width: width, height: height }, { render: false, doEvent: false });
            }
        }
        this.render();
        this.pushHistory({
            type: EditType.Update,
            initPens: initPens,
            pens: pens,
        });
    };
    /**
     * 格式刷（样式相同，大小无需一致。）
     * @param pens 画笔们
     */
    Topology.prototype.formatPainterByFirst = function (pens) {
        if (pens === void 0) { pens = this.store.data.pens; }
        var initPens = deepClone(pens); // 原 pens ，深拷贝一下
        var firstPen = pens[0];
        // 格式刷修改的属性，除开宽高
        var attrs = {};
        formatAttrs.forEach(function (attr) {
            attrs[attr] = firstPen[attr];
        });
        for (var i = 1; i < pens.length; i++) {
            var pen = pens[i];
            this.setValue(__assign({ id: pen.id }, attrs), { render: false, doEvent: false });
        }
        this.render();
        this.pushHistory({
            type: EditType.Update,
            initPens: initPens,
            pens: pens,
        });
    };
    Topology.prototype.alignNodes = function (align, pens, rect) {
        var e_4, _a;
        if (pens === void 0) { pens = this.store.data.pens; }
        !rect && (rect = this.getPenRect(this.getRect(pens)));
        var initPens = deepClone(pens); // 原 pens ，深拷贝一下
        try {
            for (var pens_1 = __values(pens), pens_1_1 = pens_1.next(); !pens_1_1.done; pens_1_1 = pens_1.next()) {
                var item = pens_1_1.value;
                this.alignPen(align, item, rect);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (pens_1_1 && !pens_1_1.done && (_a = pens_1.return)) _a.call(pens_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        this.render();
        this.pushHistory({
            type: EditType.Update,
            initPens: initPens,
            pens: pens,
        });
    };
    /**
     * 对齐画笔，基于第一个画笔
     * @param align 左对齐，右对齐，上对齐，下对齐，居中对齐
     * @param pens
     */
    Topology.prototype.alignNodesByFirst = function (align, pens) {
        if (pens === void 0) { pens = this.store.data.pens; }
        var initPens = deepClone(pens); // 原 pens ，深拷贝一下
        var firstPen = pens[0];
        var rect = this.getPenRect(firstPen);
        for (var i = 1; i < pens.length; i++) {
            var pen = pens[i];
            this.alignPen(align, pen, rect);
        }
        this.render();
        this.pushHistory({
            type: EditType.Update,
            initPens: initPens,
            pens: pens,
        });
    };
    /**
     * 将画笔参照 rect 进行 align 对齐
     * @param align 左对齐，右对齐，上对齐，下对齐，居中对齐
     * @param pen 当前需要对齐的画笔
     * @param rect 参照矩形
     * @returns
     */
    Topology.prototype.alignPen = function (align, pen, rect) {
        var penRect = this.getPenRect(pen);
        switch (align) {
            case 'left':
                penRect.x = rect.x;
                break;
            case 'right':
                penRect.x = rect.x + rect.width - penRect.width;
                break;
            case 'top':
                penRect.y = rect.y;
                break;
            case 'bottom':
                penRect.y = rect.y + rect.height - penRect.height;
                break;
            case 'center':
                penRect.x = rect.x + rect.width / 2 - penRect.width / 2;
                break;
            case 'middle':
                penRect.y = rect.y + rect.height / 2 - penRect.height / 2;
                break;
        }
        this.setValue(__assign({ id: pen.id }, penRect), { render: false, doEvent: false });
    };
    /**
     * 水平或垂直方向的均分
     * @param direction 方向，width 说明水平方向间距相同
     * @param pens 节点们，默认全部的
     * @param distance 总的宽 or 高
     */
    Topology.prototype.spaceBetweenByDirection = function (direction, pens, distance) {
        var e_5, _a;
        var _this = this;
        if (pens === void 0) { pens = this.store.data.pens; }
        !distance && (distance = this.getPenRect(this.getRect(pens))[direction]);
        // 过滤出非父节点
        pens = pens.filter(function (item) { return !item.parentId; });
        if (pens.length <= 2) {
            return;
        }
        var initPens = deepClone(pens); // 原 pens ，深拷贝一下
        // 计算间距
        var allDistance = pens.reduce(function (distance, currentPen) {
            var currentPenRect = _this.getPenRect(currentPen);
            return distance + currentPenRect[direction];
        }, 0);
        var space = (distance - allDistance) / (pens.length - 1);
        // 按照大小顺序排列画笔
        pens = pens.sort(function (a, b) {
            if (direction === 'width') {
                return a.x - b.x;
            }
            return a.y - b.y;
        });
        var pen0Rect = this.getPenRect(pens[0]);
        var left = direction === 'width' ? pen0Rect.x : pen0Rect.y;
        try {
            for (var pens_2 = __values(pens), pens_2_1 = pens_2.next(); !pens_2_1.done; pens_2_1 = pens_2.next()) {
                var pen = pens_2_1.value;
                var penRect = this.getPenRect(pen);
                direction === 'width' ? (penRect.x = left) : (penRect.y = left);
                left += penRect[direction] + space;
                this.setValue(__assign({ id: pen.id }, penRect), { render: false, doEvent: false });
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (pens_2_1 && !pens_2_1.done && (_a = pens_2.return)) _a.call(pens_2);
            }
            finally { if (e_5) throw e_5.error; }
        }
        this.render();
        this.pushHistory({
            type: EditType.Update,
            initPens: initPens,
            pens: pens,
        });
    };
    Topology.prototype.spaceBetween = function (pens, width) {
        this.spaceBetweenByDirection('width', pens, width);
    };
    Topology.prototype.spaceBetweenColumn = function (pens, height) {
        this.spaceBetweenByDirection('height', pens, height);
    };
    Topology.prototype.layout = function (pens, width, space) {
        var _this = this;
        if (pens === void 0) { pens = this.store.data.pens; }
        if (space === void 0) { space = 30; }
        var rect = this.getPenRect(getRect(pens));
        !width && (width = rect.width);
        // 1. 拿到全部节点中最大的高
        pens = pens.filter(function (item) { return !item.type && !item.parentId; });
        var initPens = deepClone(pens); // 原 pens ，深拷贝一下
        var maxHeight = 0;
        pens.forEach(function (pen) {
            var penRect = _this.getPenRect(pen);
            penRect.height > maxHeight && (maxHeight = penRect.height);
        });
        // 2. 遍历节点调整位置
        var currentX = rect.x;
        var currentY = rect.y;
        pens.forEach(function (pen, index) {
            var penRect = _this.getPenRect(pen);
            penRect.x = currentX;
            penRect.y = currentY + maxHeight / 2 - penRect.height / 2;
            _this.setValue(__assign({ id: pen.id }, penRect), { render: false, doEvent: false });
            if (index === pens.length - 1) {
                return;
            }
            var currentWidth = currentX + penRect.width - rect.x;
            var nextPenRect = _this.getPenRect(pens[index + 1]);
            if (Math.round(width - currentWidth) >=
                Math.round(nextPenRect.width + space))
                // 当前行
                currentX += penRect.width + space;
            else {
                // 换行
                currentX = rect.x;
                currentY += maxHeight + space;
            }
        });
        this.render();
        this.pushHistory({
            type: EditType.Update,
            initPens: initPens,
            pens: pens,
        });
    };
    Topology.prototype.gotoView = function (pen) {
        var center = this.getViewCenter();
        var x = center.x -
            pen.calculative.worldRect.x -
            pen.calculative.worldRect.width / 2;
        var y = center.y -
            pen.calculative.worldRect.y -
            pen.calculative.worldRect.height / 2;
        if (this.canvas.scroll && this.canvas.scroll.isShow) {
            this.canvas.scroll.translate(x - this.store.data.x, y - this.store.data.y);
        }
        this.store.data.x = x;
        this.store.data.y = y;
        this.canvas.canvasImage.init();
        this.canvas.canvasImageBottom.init();
        this.render();
    };
    Topology.prototype.showMap = function () {
        if (!this.map) {
            this.map = new ViewMap(this.canvas);
        }
        this.map.show();
    };
    Topology.prototype.hideMap = function () {
        this.map.hide();
    };
    Topology.prototype.onSizeUpdate = function () {
        var _this = this;
        if (this.mapTimer) {
            clearTimeout(this.mapTimer);
            this.mapTimer = undefined;
        }
        this.mapTimer = setTimeout(function () {
            if (_this.map && _this.map.isShow) {
                _this.map.show();
            }
            if (_this.canvas.scroll && _this.canvas.scroll.isShow) {
                _this.canvas.scroll.resize();
            }
        }, 500);
    };
    Topology.prototype.toggleAnchorMode = function () {
        this.canvas.toggleAnchorMode();
    };
    Topology.prototype.addAnchorHand = function () {
        this.canvas.addAnchorHand();
    };
    Topology.prototype.removeAnchorHand = function () {
        this.canvas.removeAnchorHand();
    };
    Topology.prototype.toggleAnchorHand = function () {
        this.canvas.toggleAnchorHand();
    };
    /**
     * 将该画笔置顶，即放到数组最后，最后绘制即在顶部
     * @param pen pen 置顶的画笔
     * @param pens 画笔们，注意 pen 必须在该数组内才有效
     */
    Topology.prototype.top = function (pen, pens) {
        var _this = this;
        if (pens === void 0) { pens = this.store.data.pens; }
        // 获取它包含它的子节点
        var allIds = __spreadArray(__spreadArray([], __read(getAllChildren(pen, this.store)), false), [pen], false).map(function (p) { return p.id; });
        var allPens = pens.filter(function (p) { return allIds.includes(p.id); });
        allPens.forEach(function (pen) {
            var index = pens.findIndex(function (p) { return p.id === pen.id; });
            if (index > -1) {
                pens.push(pens[index]);
                pens.splice(index, 1);
                _this.initImageCanvas([pen]);
            }
        });
    };
    /**
     * 若本次改变的画笔存在图片，并且在上层 or 下层，需要擦除上层 or 下层
     * 子节点中包含图片，也需要重绘
     * @param pens 本次改变的 pens
     */
    Topology.prototype.initImageCanvas = function (pens) {
        this.canvas.initImageCanvas(pens);
    };
    /**
     * 该画笔置底，即放到数组最前，最后绘制即在底部
     * @param pens 画笔们，注意 pen 必须在该数组内才有效
     */
    Topology.prototype.bottom = function (pen, pens) {
        if (pens === void 0) { pens = this.store.data.pens; }
        var allIds = __spreadArray(__spreadArray([], __read(getAllChildren(pen, this.store)), false), [pen], false).map(function (p) { return p.id; });
        var allPens = pens.filter(function (p) { return allIds.includes(p.id); });
        var _loop_3 = function (i) {
            var pen_1 = allPens[i];
            var index = pens.findIndex(function (p) { return p.id === pen_1.id; });
            if (index > -1) {
                pens.unshift(pens[index]);
                pens.splice(index + 1, 1);
                this_1.initImageCanvas([pen_1]);
            }
        };
        var this_1 = this;
        // 从后往前，保证 allPens 顺序不变
        for (var i = allPens.length - 1; i >= 0; i--) {
            _loop_3(i);
        }
    };
    /**
     * 该画笔上移，即把该画笔在数组中的位置向后移动一个
     * @param pens 画笔们，注意 pen 必须在该数组内才有效
     */
    Topology.prototype.up = function (pen, pens) {
        if (pens === void 0) { pens = this.store.data.pens; }
        var index = pens.findIndex(function (p) { return p.id === pen.id; });
        if (index > -1 && index !== pens.length - 1) {
            pens.splice(index + 2, 0, pens[index]);
            pens.splice(index, 1);
            this.initImageCanvas([pen]);
        }
    };
    /**
     * 该画笔下移，即把该画笔在该数组中的位置前移一个
     * @param pens 画笔们，注意 pen 必须在该数组内才有效
     */
    Topology.prototype.down = function (pen, pens) {
        if (pens === void 0) { pens = this.store.data.pens; }
        var index = pens.findIndex(function (p) { return p.id === pen.id; });
        if (index > -1 && index !== 0) {
            pens.splice(index - 1, 0, pens[index]);
            pens.splice(index + 1, 1);
            this.initImageCanvas([pen]);
        }
    };
    Topology.prototype.setLayer = function (pen, toIndex, pens) {
        if (pens === void 0) { pens = this.store.data.pens; }
        var index = pens.findIndex(function (p) { return p.id === pen.id; });
        if (index > -1) {
            if (index > toIndex) {
                // 原位置在后，新位置在前
                pens.splice(toIndex, 0, pens[index]);
                pens.splice(index + 1, 1);
            }
            else if (index < toIndex) {
                // 新位置在后
                pens.splice(toIndex, 0, pens[index]);
                pens.splice(index, 1);
            }
        }
    };
    Topology.prototype.changePenId = function (oldId, newId) {
        this.canvas.changePenId(oldId, newId);
    };
    /**
     * 得到与当前节点连接的线
     * @param node 节点，非连线
     * @param type 类型，全部的连接线/入线/出线
     */
    Topology.prototype.getLines = function (node, type) {
        var _this = this;
        var _a;
        if (type === void 0) { type = 'all'; }
        if (node.type === PenType.Line) {
            return [];
        }
        var lines = [];
        (_a = node.connectedLines) === null || _a === void 0 ? void 0 : _a.forEach(function (_a) {
            var lineId = _a.lineId;
            var line = _this.store.pens[lineId];
            if (!line) {
                console.warn(node, 'node contain a error connectedLine');
                return;
            }
            switch (type) {
                case 'all':
                    lines.push(line);
                    break;
                case 'in':
                    // 进入该节点的线，即 线锚点的最后一个 connectTo 对应该节点
                    getToAnchor(line).connectTo === node.id && lines.push(line);
                    break;
                case 'out':
                    // 从该节点出去的线，即 线锚点的第一个 connectTo 对应该节点
                    getFromAnchor(line).connectTo === node.id && lines.push(line);
                    break;
            }
        });
        return lines;
    };
    /**
     * 得到当前节点的下一个节点，即出口节点数组
     * 得到当前连线的出口节点
     * @param pen 节点或连线
     */
    Topology.prototype.nextNode = function (pen) {
        var _this = this;
        if (pen.type === PenType.Line) {
            var nextNode = this.store.pens[getToAnchor(pen).connectTo];
            return nextNode ? [nextNode] : [];
        }
        else {
            // 1. 得到所有的出线
            var lines = this.getLines(pen, 'out');
            var nextNodes_1 = [];
            // 2. 遍历出线的 nextNode
            lines.forEach(function (line) {
                var e_6, _a;
                var lineNextNode = _this.nextNode(line);
                var _loop_4 = function (node) {
                    var have = nextNodes_1.find(function (next) { return next.id === node.id; });
                    // 3. 不重复的才加进去
                    !have && nextNodes_1.push(node);
                };
                try {
                    for (var lineNextNode_1 = __values(lineNextNode), lineNextNode_1_1 = lineNextNode_1.next(); !lineNextNode_1_1.done; lineNextNode_1_1 = lineNextNode_1.next()) {
                        var node = lineNextNode_1_1.value;
                        _loop_4(node);
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (lineNextNode_1_1 && !lineNextNode_1_1.done && (_a = lineNextNode_1.return)) _a.call(lineNextNode_1);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            });
            return nextNodes_1;
        }
    };
    /**
     * 得到当前节点的上一个节点，即入口节点数组
     * 得到当前连线的入口节点
     * @param pen 节点或连线
     */
    Topology.prototype.previousNode = function (pen) {
        var _this = this;
        if (pen.type === PenType.Line) {
            var preNode = this.store.pens[getFromAnchor(pen).connectTo];
            return preNode ? [preNode] : [];
        }
        else {
            // 1. 得到所有的入线
            var lines = this.getLines(pen, 'in');
            var preNodes_1 = [];
            // 2. 遍历入线的 preNode
            lines.forEach(function (line) {
                var e_7, _a;
                var linePreNode = _this.previousNode(line);
                var _loop_5 = function (node) {
                    var have = preNodes_1.find(function (pre) { return pre.id === node.id; });
                    // 3. 不重复的才加进去
                    !have && preNodes_1.push(node);
                };
                try {
                    for (var linePreNode_1 = __values(linePreNode), linePreNode_1_1 = linePreNode_1.next(); !linePreNode_1_1.done; linePreNode_1_1 = linePreNode_1.next()) {
                        var node = linePreNode_1_1.value;
                        _loop_5(node);
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (linePreNode_1_1 && !linePreNode_1_1.done && (_a = linePreNode_1.return)) _a.call(linePreNode_1);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
            });
            return preNodes_1;
        }
    };
    /**
     * 获取节点所有的下一个连接关系
     * @param pen
     *
     */
    Topology.prototype.getNext = function (pen) {
        var _this = this;
        var _a;
        if (pen.type === PenType.Line) {
            console.warn('非连线节点');
            return;
        }
        var next = [];
        (_a = pen.connectedLines) === null || _a === void 0 ? void 0 : _a.forEach(function (_a) {
            var _b, _c;
            var lineId = _a.lineId, anchor = _a.anchor;
            var fromAnchor = (_b = pen.anchors) === null || _b === void 0 ? void 0 : _b.filter(function (_anchor) { return _anchor.id === anchor; })[0];
            var line = _this.findOne(lineId);
            if (line.anchors[0].connectTo == pen.id) {
                //from
                var connectTo = line.anchors[line.anchors.length - 1].connectTo;
                if (connectTo) {
                    var _next = _this.findOne(connectTo);
                    var connectedLine_1 = (_c = _next.connectedLines) === null || _c === void 0 ? void 0 : _c.filter(function (item) { return item.lineId === line.id; })[0];
                    var penAnchor = _next.anchors.filter(function (_anchor) { return _anchor.id === connectedLine_1.anchor; })[0];
                    next.push({
                        from: pen,
                        fromAnchor: fromAnchor,
                        line: line,
                        to: _next,
                        toAnchor: penAnchor,
                    });
                }
            }
        });
        return next;
    };
    /**
     * 为画布添加锚点
     * @param pen 画笔
     * @param anchor 待添加锚点
     * @param index 连线类型 添加锚点到哪个位置
     */
    Topology.prototype.addAnchor = function (pen, anchor, index) {
        if (!pen) {
            return;
        }
        if (!pen.anchors) {
            pen.anchors = [];
        }
        if (!pen.calculative.worldAnchors) {
            pen.calculative.worldAnchors = [];
        }
        if (pen.type === PenType.Line) {
            if (index < 0) {
                index = pen.anchors.length + 1 + index;
            }
            if (index > pen.anchors.length) {
                index = pen.anchors.length;
            }
            if (index < 0) {
                index = 0;
            }
            if ((index == 0 && pen.anchors[0].connectTo) ||
                (index == pen.anchors.length && pen.anchors[index - 1].connectTo)) {
                console.warn('端点存在连接关系');
                return;
            }
        }
        var _anchor = null;
        var _worldAnchor = null;
        if (anchor.x <= 1 && anchor.x >= 0 && anchor.y <= 1 && anchor.y >= 0) {
            //relative
            _worldAnchor = {
                id: anchor.id || s8(),
                penId: pen.id,
                x: pen.calculative.worldRect.x +
                    pen.calculative.worldRect.width * anchor.x,
                y: pen.calculative.worldRect.y +
                    pen.calculative.worldRect.height * anchor.y,
            };
            if (pen.calculative.worldRect) {
                if (pen.rotate % 360) {
                    rotatePoint(_worldAnchor, pen.rotate, pen.calculative.worldRect.center);
                }
            }
            _anchor = {
                id: _worldAnchor.id,
                penId: pen.id,
                x: anchor.x,
                y: anchor.y,
            };
        }
        else {
            //absolute
            _worldAnchor = {
                id: anchor.id || s8(),
                penId: pen.id,
                x: anchor.x,
                y: anchor.y,
            };
            if (pen.calculative.worldRect) {
                if (pen.rotate % 360) {
                    rotatePoint(anchor, -pen.rotate, pen.calculative.worldRect.center);
                }
                _anchor = {
                    id: _worldAnchor.id,
                    penId: pen.id,
                    x: (anchor.x - pen.calculative.worldRect.x) /
                        pen.calculative.worldRect.width,
                    y: (anchor.y - pen.calculative.worldRect.y) /
                        pen.calculative.worldRect.height,
                };
            }
        }
        if (pen.type === PenType.Line) {
            //Line
            pen.calculative.worldAnchors.splice(index, 0, _worldAnchor);
            pen.anchors.splice(index, 0, _anchor);
            this.canvas.updateLines(pen);
            this.canvas.initLineRect(pen);
            this.render();
        }
        else {
            //Node
            pen.calculative.worldAnchors.push(_worldAnchor);
            pen.anchors.push(_anchor);
        }
    };
    /**
     *
     * @param from 连接节点
     * @param fromAnchor 连接节点锚点
     * @param to 被连接节点
     * @param toAnchor 被连接节点锚点
     */
    Topology.prototype.connectLine = function (from, to, fromAnchor, toAnchor, render) {
        if (render === void 0) { render = true; }
        if (!fromAnchor) {
            var _worldRect = to.calculative.worldRect;
            fromAnchor = nearestAnchor(from, {
                x: _worldRect.x + _worldRect.width / 2,
                y: _worldRect.y + _worldRect.height / 2,
            });
        }
        if (!toAnchor) {
            var _worldRect = from.calculative.worldRect;
            toAnchor = nearestAnchor(to, {
                x: _worldRect.x + _worldRect.width / 2,
                y: _worldRect.y + _worldRect.height / 2,
            });
        }
        var absWidth = Math.abs(fromAnchor.x - toAnchor.x);
        var absHeight = Math.abs(fromAnchor.y - toAnchor.y);
        var line = {
            height: absHeight,
            lineName: 'line',
            lineWidth: 1,
            name: 'line',
            type: 1,
            width: absWidth,
            x: Math.min(fromAnchor.x, toAnchor.x),
            y: Math.min(fromAnchor.y, toAnchor.y),
            anchors: [
                {
                    x: fromAnchor.x > toAnchor.x ? 1 : 0,
                    y: fromAnchor.y > toAnchor.y ? 1 : 0,
                    id: s8(),
                },
                {
                    x: fromAnchor.x > toAnchor.x ? 0 : 1,
                    y: fromAnchor.x > toAnchor.x ? 0 : 1,
                    id: s8(),
                },
            ],
        };
        this.addPens([line]);
        connectLine(from, fromAnchor, line, line.calculative.worldAnchors[0]);
        connectLine(to, toAnchor, line, line.calculative.worldAnchors[1]);
        line.calculative.active = false;
        this.canvas.updateLines(line);
        this.canvas.updateLines(from);
        this.canvas.updateLines(to);
        this.canvas.initLineRect(line);
        if (render) {
            this.render();
        }
        return line;
    };
    /**
     * 生成一个拷贝组合后的 画笔数组（组合图形），不影响原画布画笔，常用作 二次复用的组件
     * @param pens 画笔数组
     * @param showChild 是否作为状态复用（参考 combine showChild）
     * @returns 组合图形
     */
    Topology.prototype.toComponent = function (pens, showChild) {
        if (pens === void 0) { pens = this.store.data.pens; }
        if (pens.length === 1) {
            var pen = deepClone(pens[0]);
            pen.type = PenType.Node;
            pen.id = undefined;
            return [pen];
        }
        var components = deepClone(pens, true);
        var rect = getRect(components);
        var parent = __assign(__assign({ id: s8(), name: 'combine' }, rect), { children: [], showChild: showChild });
        var p = components.find(function (pen) {
            return pen.width === rect.width && pen.height === rect.height;
        });
        var oneIsParent = p && showChild === undefined;
        if (oneIsParent) {
            if (!p.children) {
                p.children = [];
            }
            parent = p;
        }
        else {
            // 不影响画布数据，生成一个组合图形便于二次复用
            // this.canvas.makePen(parent);
        }
        components.forEach(function (pen) {
            var _a;
            if (pen === parent || pen.parentId === parent.id) {
                return;
            }
            if (pen.parentId) {
                // 已经是其它节点的子节点，x,y,w,h 已经是百分比了
                return;
            }
            parent.children.push(pen.id);
            pen.parentId = parent.id;
            var childRect = calcRelativeRect(pen.calculative.worldRect, rect);
            Object.assign(pen, childRect);
            pen.locked = (_a = pen.lockedOnCombine) !== null && _a !== void 0 ? _a : LockState.DisableMove;
            // pen.type = PenType.Node;
        });
        return oneIsParent
            ? deepClone(components)
            : deepClone(__spreadArray([parent], __read(components), false));
    };
    Topology.prototype.setVisible = function (pen, visible, render) {
        var e_8, _a;
        if (render === void 0) { render = true; }
        this.onSizeUpdate();
        this.setValue({ id: pen.id, visible: visible }, { render: false, doEvent: false });
        if (pen.children) {
            try {
                for (var _b = __values(pen.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var childId = _c.value;
                    var child = this.store.pens[childId];
                    child && this.setVisible(child, visible, false);
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_8) throw e_8.error; }
            }
        }
        render && this.render();
    };
    Topology.prototype.clearHover = function () {
        this.canvas.clearHover();
    };
    Topology.prototype.closeSocket = function () {
        this.closeWebsocket();
        this.closeMqtt();
        this.closeHttp();
    };
    Topology.prototype.destroy = function (onlyData) {
        this.clear(false);
        this.closeSocket();
        this.store.emitter.all.clear(); // 内存释放
        this.canvas.destroy();
        this.canvas = undefined;
        globalStore[this.store.id] = undefined;
        if (!onlyData) {
            for (var k in globalStore) {
                delete globalStore[k];
            }
            globalStore.path2dDraws = {};
            globalStore.canvasDraws = {};
            globalStore.anchors = {};
            globalStore.htmlElements = {};
        }
    };
    return Topology;
}());
export { Topology };
//# sourceMappingURL=core.js.map