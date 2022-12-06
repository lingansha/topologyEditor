/**
 * 拷贝一个对象
 * @param o - object to clone
 * @param keepCalc 是否保留计算属性， false, 不保留， true, 保留（但 calculative.canvas 属性仍不保存）
 * @returns 拷贝后的对象
 */
export function deepClone(o, keepCalc) {
    if (keepCalc === void 0) { keepCalc = false; }
    if (Array.isArray(o)) {
        var arr_1 = [];
        o.forEach(function (item) {
            arr_1.push(deepClone(item, keepCalc));
        });
        return arr_1;
    }
    else if (typeof o === 'object') {
        if (o === null) {
            return null;
        }
        else if (o.constructor === RegExp) {
            return o;
        }
        var _o = {};
        for (var key in o) {
            if (['canvas', 'lastFrame'].includes(key) ||
                o[key] instanceof HTMLImageElement ||
                o[key] instanceof HTMLMediaElement) {
                continue;
            }
            else if (key === 'calculative' && !keepCalc) {
                continue;
            }
            else if (key === 'singleton') {
                if (keepCalc) {
                    _o[key] = {};
                }
                else {
                    _o[key] = o[key];
                }
                continue;
            }
            _o[key] = deepClone(o[key], keepCalc);
        }
        return _o;
    }
    return o;
}
export function deepSetValue(o, keyWords, value) {
    if (Array.isArray(o)) {
        var arr_2 = [];
        o.forEach(function (item) {
            arr_2.push(deepSetValue(item, keyWords, value));
        });
        return arr_2;
    }
    else if (typeof o === 'object') {
        if (o === null) {
            return null;
        }
        // const _o = {} as any;
        for (var key in o) {
            if (key === keyWords) {
                o[key] = Number(o[key]) * value;
            }
            else {
                o[key] = deepSetValue(o[key], keyWords, value);
            }
        }
        return o;
    }
    return o;
}
//# sourceMappingURL=clone.js.map