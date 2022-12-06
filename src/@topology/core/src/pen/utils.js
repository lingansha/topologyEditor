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
import { s8 } from '@topology/core';
export function randomId(pen) {
    var e_1, _a;
    pen.id = s8();
    if (Array.isArray(pen.anchors)) {
        try {
            for (var _b = __values(pen.anchors), _c = _b.next(); !_c.done; _c = _b.next()) {
                var pt = _c.value;
                pen.type && (pt.id = s8());
                pt.penId = pen.id;
                if (pt.prev) {
                    pen.type && (pt.prev.id = s8());
                    pt.prev.penId = pen.id;
                }
                if (pt.next) {
                    pen.type && (pt.next.id = s8());
                    pt.next.penId = pen.id;
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
    }
}
//# sourceMappingURL=utils.js.map