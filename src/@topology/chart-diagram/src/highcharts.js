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
import { setElemPosition } from '@topology/core';
// TODO: 只引入 Chart 作为类型，开发时使用，上传需注释
// import { Chart } from 'highcharts';
export var highchartsList = {
    Highcharts: undefined,
};
export function highcharts(pen) {
    var _a;
    if (!pen.onDestroy) {
        pen.onDestroy = destory;
        pen.onMove = move;
        pen.onResize = resize;
        pen.onRotate = move;
        pen.onValue = value;
        pen.onChangeId = changeId;
        pen.onBeforeValue = beforeValue;
    }
    var Highcharts = highchartsList.Highcharts || globalThis.Highcharts;
    if (!pen.highcharts || !Highcharts) {
        return;
    }
    var path = new Path2D();
    var worldRect = pen.calculative.worldRect;
    if (typeof pen.highcharts === 'string') {
        try {
            pen.highcharts = JSON.parse(pen.highcharts.option);
        }
        catch (e) { }
    }
    if (!pen.highcharts) {
        return;
    }
    if (!highchartsList[pen.id] || !highchartsList[pen.id].div) {
        // 1. 创建父容器
        var div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.outline = 'none';
        div.style.left = '-9999px';
        div.style.top = '-9999px';
        div.style.width = worldRect.width + 'px';
        div.style.height = worldRect.height + 'px';
        div.style.minWidth = '100px';
        div.style.minHeight = '100px';
        div.id = pen.id;
        document.body.appendChild(div);
        highchartsList[pen.id] = {
            div: div,
            chart: undefined,
        };
        setTimeout(function () {
            highchartsList[pen.id].chart = Highcharts.chart(pen.id, pen.highcharts.option);
        });
        // 4. 加载到div layer
        (_a = pen.calculative.canvas.externalElements) === null || _a === void 0 ? void 0 : _a.appendChild(div);
        setElemPosition(pen, div);
    }
    path.rect(worldRect.x, worldRect.y, worldRect.width, worldRect.height);
    if (pen.calculative.patchFlags && highchartsList[pen.id]) {
        setElemPosition(pen, highchartsList[pen.id].div);
    }
    return path;
}
function destory(pen) {
    highchartsList[pen.id].div.remove();
    var chart = highchartsList[pen.id].chart;
    chart.destroy();
    highchartsList[pen.id] = undefined;
}
function move(pen) {
    if (!highchartsList[pen.id]) {
        return;
    }
    setElemPosition(pen, highchartsList[pen.id].div);
}
function resize(pen) {
    if (!highchartsList[pen.id]) {
        return;
    }
    setElemPosition(pen, highchartsList[pen.id].div);
    setTimeout(function () {
        highchartsList[pen.id].chart.reflow();
    }, 100);
}
function value(pen) {
    if (!highchartsList[pen.id]) {
        return;
    }
    setElemPosition(pen, highchartsList[pen.id].div);
}
function changeId(pen, oldId, newId) {
    if (!highchartsList[oldId]) {
        return;
    }
    highchartsList[oldId].div.id = newId;
    highchartsList[newId] = highchartsList[oldId];
    delete highchartsList[oldId];
}
function beforeValue(pen, value) {
    if (value.highcharts) {
        var chart = highchartsList[pen.id].chart;
        chart.update(value.highcharts.option);
        return value;
    }
    else if (!value.dataX && !value.dataY) {
        return value;
    }
    // 1. 拿到老的 echarts
    var highcharts = pen.highcharts;
    var max = highcharts.max; // 特殊处理，值不超过 max
    // 2. 特殊处理
    var x = value.dataX;
    var y = value.dataY;
    // 确认有几条线，即多折线的场景
    var length = highcharts.option.series.length;
    if (!value.overwrite) {
        // 追加数据
        // xs ys 适用与 addPoint
        var xs_1 = [];
        // // [0] 是第一条线； [1] 是第二条线
        var ys_1 = null;
        var isCategory_1 = false;
        if (x) {
            // x 轴考虑只有一条
            if (!Array.isArray(x)) {
                x = [x];
            }
            // xAxis 存在数组的情况，只考虑 单 x 轴的情况
            var xAxis = highcharts.option.xAxis;
            var xData = Array.isArray(xAxis)
                ? xAxis[0].categories
                : xAxis.categories;
            if (xData) {
                // categories 存在，手动添加 category
                // 只更改数据，不更新视图
                xData.push.apply(xData, __spreadArray([], __read(x), false));
                // 删除开头的多余数据
                xData.splice(0, xData.length - max);
                isCategory_1 = true;
            }
            // 记录 x ，后续用来更新视图
            xs_1 = __spreadArray([], __read(x), false);
        }
        if (y) {
            if (length === 1) {
                if (!Array.isArray(y)) {
                    y = [y];
                }
                ys_1 = [y];
            }
            else {
                // 多条线
                ys_1 = [];
                highcharts.option.series.forEach(function (serie, index) {
                    if (!Array.isArray(y[index])) {
                        y[index] = [y[index]];
                    }
                    ys_1.push(y[index]);
                });
            }
        }
        if (ys_1) {
            var chart = highchartsList[pen.id].chart;
            chart.series.forEach(function (serie, index) {
                ys_1[index].forEach(function (y, index2) {
                    var shift = false; // 是否扔掉第一个
                    if (max && serie.data.length >= max) {
                        shift = true;
                    }
                    var point = isCategory_1 || xs_1[index2] == undefined ? y : [xs_1[index2], y];
                    serie.addPoint(point, true, shift);
                });
            });
        }
    }
    else {
        // 替换数据
        if (x) {
            highcharts.option.xAxis.categories = x;
            highcharts.option.xAxis.categories.splice(0, highcharts.option.xAxis.categories.length - max);
        }
        if (y) {
            if (length === 1) {
                highcharts.option.series[0].data = y;
                highcharts.option.series[0].data.splice(0, highcharts.option.series[0].data.length - max);
            }
            else {
                // 多条线
                highcharts.option.series.forEach(function (serie, index) {
                    serie.data = y[index];
                    serie.data.splice(0, serie.data.length - max);
                });
            }
        }
        // 更新视图
        var chart = highchartsList[pen.id].chart;
        chart.update(highcharts.option);
    }
    // 3. 设置完后，清空
    delete value.dataX;
    delete value.dataY;
    delete value.overwrite;
    return Object.assign(value, { highcharts: highcharts });
}
//# sourceMappingURL=highcharts.js.map