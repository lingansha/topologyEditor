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
export function abs(num, percent) {
    if (+percent) {
        return +percent;
    }
    if (!percent || percent[percent.length - 1] !== '%') {
        return 0;
    }
    percent = percent.substr(0, percent.length - 1);
    return (num * +percent) / 100;
}
/**
 * 实际值是否在范围中, 数学上的开闭
 * @param realValue 实际值
 * @param collection 集合规范，与数学上相同，如[0, 100]，前闭后闭；如[0, 100)，前闭后开；
 * @returns undefined 说明参数不规范 ，true 说明在范围内，false 说明不在范围内
 */
export function valueInRange(realValue, collection) {
    if (isNaN(realValue)) {
        console.warn("realValue not number");
        return;
    }
    if (typeof collection !== 'string') {
        console.warn('collection must be string');
        return;
    }
    var _a = __read([collection[0], collection[collection.length - 1]], 2), start = _a[0], end = _a[1];
    if (!['[', '('].includes(start)) {
        console.warn('collection must start with "[" or "("');
        return;
    }
    if (![']', ')'].includes(end)) {
        console.warn('collection must end with "]" or ")"');
        return;
    }
    var nums = collection.substring(1, collection.length - 1).split(',');
    if (nums.length !== 2) {
        console.warn('collection must have 2 numbers');
        return;
    }
    var _b = __read([+nums[0], +nums[1]], 2), startNum = _b[0], endNum = _b[1];
    if (startNum >= endNum) {
        console.warn('startNum must less than endNum');
        return;
    }
    // 大于 startNum 左肯定成立
    var left = realValue > startNum || (start === '[' && realValue === startNum)
        ? true
        : false;
    if (!left) {
        return false;
    }
    // 执行到这，左边已经是true了，判断右边
    var right = realValue < endNum || (end === ']' && realValue === endNum) ? true : false;
    return right;
}
/**
 * 实际值是否在数组中，即是否属于
 * 例如: [1,2,3] 只有 1 2 3 是属于 collection 的
 * .. 范围值 30..50 等于 闭区间的 [30,50] ，即范围值
 * [1,20,30..50,65] 只有 1 20 30..50 65 是属于 collection 的
 * @param realValue 实际值
 * @param collection 集合
 * @returns undefined 说明参数不规范 ，true 说明在范围内，false 说明不在范围内
 */
export function valueInArray(realValue, collection) {
    var e_1, _a;
    if (isNaN(realValue)) {
        console.warn("realValue not number");
        return;
    }
    if (typeof collection !== 'string') {
        console.warn('collection must be string');
        return;
    }
    var _b = __read([collection[0], collection[collection.length - 1]], 2), start = _b[0], end = _b[1];
    if (start !== '[' || end !== ']') {
        console.warn('collection must start with "[" and end with "]"');
        return;
    }
    var numStrs = collection.substring(1, collection.length - 1).split(',');
    try {
        for (var numStrs_1 = __values(numStrs), numStrs_1_1 = numStrs_1.next(); !numStrs_1_1.done; numStrs_1_1 = numStrs_1.next()) {
            var numStr = numStrs_1_1.value;
            if (numStr.includes('..')) {
                // 范围值
                var _c = __read(numStr.split('..'), 2), start_1 = _c[0], end_1 = _c[1];
                var _d = __read([+start_1, +end_1], 2), startNum = _d[0], endNum = _d[1];
                if (startNum >= endNum) {
                    console.warn('startNum must less than endNum');
                    return;
                }
                if (realValue >= startNum && realValue <= endNum) {
                    return true;
                }
            }
            else {
                // 单个值
                var num = +numStr;
                if (realValue === num) {
                    return true;
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (numStrs_1_1 && !numStrs_1_1.done && (_a = numStrs_1.return)) _a.call(numStrs_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return false;
}
//# sourceMappingURL=math.js.map