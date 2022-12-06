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
import { default as mitt } from 'mitt';
import { defaultOptions } from '../options';
import { globalStore } from './global';
export var EditType;
(function (EditType) {
    EditType[EditType["Add"] = 0] = "Add";
    EditType[EditType["Update"] = 1] = "Update";
    EditType[EditType["Delete"] = 2] = "Delete";
})(EditType || (EditType = {}));
export var createStore = function () {
    return {
        data: {
            x: 0,
            y: 0,
            scale: 1,
            pens: [],
            origin: { x: 0, y: 0 },
            center: { x: 0, y: 0 },
            paths: {},
        },
        histories: [],
        pens: {},
        path2dMap: new WeakMap(),
        active: [],
        animates: new Set(),
        options: __assign({}, defaultOptions),
        emitter: mitt(),
        bindDatas: {},
    };
};
// Return a data store, if not exists will create a store.
export var useStore = function (id) {
    if (id === void 0) { id = 'default'; }
    if (!globalStore[id]) {
        globalStore[id] = createStore();
        globalStore[id].id = id;
    }
    return globalStore[id];
};
export var clearStore = function (store) {
    store.data = {
        x: 0,
        y: 0,
        scale: 1,
        pens: [],
        origin: { x: 0, y: 0 },
        center: { x: 0, y: 0 },
        paths: {},
    };
    store.pens = {};
    store.histories = [];
    store.historyIndex = null;
    store.path2dMap = new WeakMap();
    store.bindDatas = {};
    store.active = [];
    store.hover = undefined;
    store.lastHover = undefined;
    store.animates.clear();
};
//# sourceMappingURL=store.js.map