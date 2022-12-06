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
import { setElemPosition, } from '@topology/core';
export var ReplaceMode;
(function (ReplaceMode) {
    ReplaceMode[ReplaceMode["Add"] = 0] = "Add";
    ReplaceMode[ReplaceMode["Replace"] = 1] = "Replace";
    ReplaceMode[ReplaceMode["ReplaceAll"] = 2] = "ReplaceAll";
})(ReplaceMode || (ReplaceMode = {}));
export var echartsList = {
    echarts: undefined,
};
export function echarts(pen) {
    var _a;
    if (!pen.onDestroy) {
        pen.onDestroy = destory;
        pen.onMove = move;
        pen.onResize = resize;
        pen.onRotate = move;
        pen.onValue = value;
        pen.onBeforeValue = beforeValue;
        pen.onChangeId = changeId;
        pen.onBinds = binds;
        pen.onMouseEnter = move;
    }
    var path = new Path2D();
    var worldRect = pen.calculative.worldRect;
    var echarts = echartsList.echarts || globalThis.echarts;
    if (!pen.echarts || !echarts) {
        return;
    }
    if (typeof pen.echarts === 'string') {
        try {
            pen.echarts = JSON.parse(pen.echarts);
        }
        catch (e) { }
    }
    if (!pen.echarts) {
        return;
    }
    if (!echartsList[pen.id] || !echartsList[pen.id].div) {
        // 1. 创建父容器
        var div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.outline = 'none';
        div.style.left = '-9999px';
        div.style.top = '-9999px';
        div.style.width = worldRect.width + 'px';
        div.style.height = worldRect.height + 'px';
        document.body.appendChild(div);
        // 2. 创建echart
        echartsList[pen.id] = {
            div: div,
            chart: echarts.init(div, pen.echarts.theme),
        };
        // 3. 生产预览图
        // 初始化时，等待父div先渲染完成，避免初始图表控件太大。
        setTimeout(function () {
            echartsList[pen.id].chart.setOption(pen.echarts.option, true);
            echartsList[pen.id].chart.resize();
            setTimeout(function () {
                var img = new Image();
                img.src = echartsList[pen.id].chart.getDataURL({
                    pixelRatio: 2,
                });
                pen.calculative.img = img;
            }, 100);
        });
        // 4. 加载到div layer
        (_a = pen.calculative.canvas.externalElements) === null || _a === void 0 ? void 0 : _a.appendChild(div);
        setElemPosition(pen, div);
    }
    path.rect(worldRect.x, worldRect.y, worldRect.width, worldRect.height);
    if (pen.calculative.patchFlags && echartsList[pen.id]) {
        setElemPosition(pen, echartsList[pen.id].div);
    }
    return path;
}
function destory(pen) {
    echartsList[pen.id].div.remove();
    var echarts = echartsList.echarts || globalThis.echarts;
    echarts && echarts.dispose(echartsList[pen.id].chart);
    echartsList[pen.id] = undefined;
}
function move(pen) {
    if (!echartsList[pen.id]) {
        return;
    }
    setElemPosition(pen, echartsList[pen.id].div);
}
function resize(pen) {
    if (!echartsList[pen.id]) {
        return;
    }
    setElemPosition(pen, echartsList[pen.id].div);
    // TODO: resize 执行的过于频繁时会消耗性能
    echartsList[pen.id].chart.resize();
}
function value(pen) {
    if (!echartsList[pen.id]) {
        return;
    }
    setElemPosition(pen, echartsList[pen.id].div);
    echartsList[pen.id].chart.setOption(pen.echarts.option, true);
}
function beforeValue(pen, value) {
    if (value.echarts || (!value.dataX && !value.dataY)) {
        // 整体传参，不做处理
        return value;
    }
    // 1. 拿到老的 echarts
    var echarts = pen.echarts;
    var max = echarts.max, replaceMode = echarts.replaceMode;
    // 2. 特殊处理
    // x，y 需要判空, 此处不转换数组
    var x = value.dataX;
    var y = value.dataY;
    var series = echarts.option.series;
    // 确认有几条线，即多折线的场景
    var length = series.length;
    var _a = echarts.option, xAxis = _a.xAxis, yAxis = _a.yAxis;
    if (Array.isArray(xAxis) && xAxis.length > 1) {
        // 多 x 轴不考虑
        console.warn('echarts 只支持单 x 轴，多 x 轴将被忽略');
    }
    // 单 x 轴
    var oneXAxis = Array.isArray(xAxis) ? xAxis[0] : xAxis;
    var oneYAxis = Array.isArray(yAxis) ? yAxis[0] : yAxis;
    if (!replaceMode) {
        // 追加数据
        if (x) {
            // x 轴考虑只有一条
            !Array.isArray(x) && (x = [x]);
            // TODO: Y 轴是分类，x 轴是值，追加不考虑
            var xData = oneXAxis.data;
            xData.push.apply(xData, __spreadArray([], __read(x), false));
            // 删除开头的多余数据
            xData.splice(0, xData.length - max);
        }
        if (y) {
            if (length === 1) {
                !Array.isArray(y) && (y = [y]);
                var yData = series[0].data;
                yData.push.apply(yData, __spreadArray([], __read(y), false));
                // 删除开头的多余数据
                yData.splice(0, yData.length - max);
            }
            else {
                // 多条线
                series.forEach(function (serie, index) {
                    if (!Array.isArray(y[index])) {
                        y[index] = [y[index]];
                    }
                    var yData = serie.data;
                    yData.push.apply(yData, __spreadArray([], __read(y[index]), false));
                    // 删除开头的多余数据
                    yData.splice(0, yData.length - max);
                });
            }
        }
    }
    else if (replaceMode === ReplaceMode.Replace) {
        // 替换部分数据
        if (!oneXAxis && !oneYAxis) {
            /**
             * 饼图、仪表盘等
             */
            if (y) {
                if (length === 1) {
                    !Array.isArray(y) && (y = [y]);
                    // 单饼
                    y.forEach(function (yItem, index) {
                        var part = series[0].data.find(function (part) { return part.name === yItem.name; });
                        part && (part.value = yItem.value);
                    });
                }
                else {
                    // 多饼图
                    series.forEach(function (serie, index) {
                        if (!Array.isArray(y[index])) {
                            y[index] = [y[index]];
                        }
                        y[index].forEach(function (yItem, index) {
                            var part = serie.data.find(function (part) { return part.name === yItem.name; });
                            part && (part.value = yItem.value);
                        });
                    });
                }
            }
        }
        else if (oneXAxis.type === 'category' || oneYAxis.type === 'category') {
            /**
             * dataX 中传的值用来找到对应的 y 轴值
             */
            if (x && y) {
                var categoryData_1 = oneXAxis.type === 'category' ? oneXAxis.data : oneYAxis.data;
                !Array.isArray(x) && (x = [x]);
                !Array.isArray(y) && (y = [y]);
                if (length === 1) {
                    y.forEach(function (yItem, index) {
                        var xIndex = categoryData_1.indexOf(x[index]);
                        series[0].data[xIndex] = yItem;
                    });
                }
                else {
                    // 多条线
                    series.forEach(function (serie, index) {
                        y[index].forEach(function (yItem, index) {
                            var xIndex = categoryData_1.indexOf(x[index]);
                            serie.data[xIndex] = yItem;
                        });
                    });
                }
            }
        }
    }
    else if (replaceMode === ReplaceMode.ReplaceAll) {
        // 替换数据
        if (x) {
            // TODO: Y 轴是分类，x 轴是值，替换全部不考虑
            oneXAxis.data = x;
            oneXAxis.data.splice(0, oneXAxis.data.length - max);
        }
        if (y) {
            if (length === 1) {
                series[0].data = y;
                series[0].data.splice(0, series[0].data.length - max);
            }
            else {
                // 多条线
                series.forEach(function (serie, index) {
                    serie.data = y[index];
                    serie.data.splice(0, serie.data.length - max);
                });
            }
        }
    }
    // 3. 设置完后，清空
    delete value.dataX;
    delete value.dataY;
    return Object.assign(value, { echarts: echarts });
}
function changeId(pen, oldId, newId) {
    if (!echartsList[oldId]) {
        return;
    }
    echartsList[newId] = echartsList[oldId];
    delete echartsList[oldId];
}
function binds(pen, values, formItem) {
    if (formItem.key !== 'dataY') {
        return;
    }
    // 1. 拿到老的 echarts
    var echarts = pen.echarts;
    var _a = echarts.option, xAxis = _a.xAxis, yAxis = _a.yAxis;
    if (Array.isArray(xAxis) && xAxis.length > 1) {
        // 多 x 轴不考虑
        console.warn('echarts 只支持单 x 轴，多 x 轴将被忽略');
    }
    // 单 x 轴
    var oneXAxis = Array.isArray(xAxis) ? xAxis[0] : xAxis;
    var oneYAxis = Array.isArray(yAxis) ? yAxis[0] : yAxis;
    var series = echarts.option.series;
    if (!oneXAxis && !oneYAxis) {
        /**
         * 饼图、仪表盘等
         */
        var dataY_1 = [];
        // 单个饼
        if (Array.isArray(series) && series.length === 1) {
            series[0].data.forEach(function (item) {
                var id = formItem.dataIds.find(function (dataId) { return dataId.name === item.name; }).dataId;
                if (id) {
                    var value_1 = values.find(function (value) { return value.dataId === id; });
                    if (value_1) {
                        dataY_1.push({
                            name: item.name,
                            value: value_1.value,
                        });
                    }
                }
            });
            // console.log('单饼图 dataY', JSON.stringify(dataY));
            return {
                id: pen.id,
                dataY: dataY_1,
            };
        }
        else {
            // TODO: 多个饼待考虑
        }
    }
    else if (oneXAxis.type === 'category' || oneYAxis.type === 'category') {
        // 根据 x 轴的类型排序 dataY
        var dataY_2 = [], dataX_1 = [];
        var categoryData = oneXAxis.type === 'category' ? oneXAxis.data : oneYAxis.data;
        categoryData === null || categoryData === void 0 ? void 0 : categoryData.forEach(function (category) {
            var id = formItem.dataIds.find(function (dataId) { return dataId.name === category; }).dataId;
            if (id) {
                var value_2 = values.find(function (value) { return value.dataId === id; });
                if (value_2) {
                    dataX_1.push(category);
                    dataY_2.push(value_2.value);
                }
            }
        });
        // console.log('dataX', JSON.stringify(dataX), 'dataY', JSON.stringify(dataY));
        return {
            id: pen.id,
            dataY: dataY_2,
            dataX: dataX_1,
        };
    }
    else if (oneXAxis.type === 'time') {
        // TODO: Y 轴时间不考虑
        // x 轴时间
        var dataY_3 = [];
        var now_1 = +new Date();
        var hasValue_1 = false;
        series.forEach(function (serie, index) {
            var oneDataY = [];
            var id = formItem.dataIds.find(function (dataId) { return dataId.name === serie.name; }).dataId;
            if (id) {
                var value_3 = values.find(function (value) { return value.dataId === id; });
                if (value_3) {
                    oneDataY.push([now_1, value_3.value]);
                    hasValue_1 = true;
                }
            }
            dataY_3[index] = oneDataY;
        });
        if (hasValue_1) {
            // 说明有线有值，无值的线补充一个原值，保证每条线每个时间点都有值
            dataY_3.forEach(function (oneDataY, index) {
                if (!oneDataY || oneDataY.length === 0) {
                    var last = series[index].data[series[index].data.length - 1];
                    // series[index].data.at(-1) 92 版本 chrome 才支持
                    // 0 时间， 1 值
                    dataY_3[index] = [[now_1, last[1]]];
                }
            });
        }
        else {
            return;
        }
        // console.log(
        //   'series',
        //   JSON.stringify(series.map((serie) => serie.name)),
        //   'dataY',
        //   JSON.stringify(dataY)
        // );
        return {
            id: pen.id,
            dataY: dataY_3.length === 1 ? dataY_3[0] : dataY_3,
        };
    }
    return;
}
/**
 * 配置 echarts option, 并修改 replaceMode
 * @param pen 当前画笔
 * @param ids 绑定 id 数组
 * @param isTime 是否实时，用于折线图与柱状图，若实时多条线
 * @param isYCategory 是否 Y 轴为 category，用于折线图与柱状图
 */
export function setEchartsOption(pen, ids, isTime, isYCategory) {
    if (isTime === void 0) { isTime = false; }
    if (isYCategory === void 0) { isYCategory = false; }
    if (pen.name !== 'echarts') {
        console.warn('当前画笔不是 echarts');
        return;
    }
    // 该画笔类型是 echarts
    var echarts = pen.echarts;
    var _a = echarts.option, xAxis = _a.xAxis, yAxis = _a.yAxis;
    // 单 x 轴
    var oneXAxis = Array.isArray(xAxis) ? xAxis[0] : xAxis;
    var oneYAxis = Array.isArray(yAxis) ? yAxis[0] : yAxis;
    var series = echarts.option.series;
    if (!oneXAxis && !oneYAxis) {
        /**
         * 饼图、仪表盘等
         */
        // 单饼图
        echarts.option.legend = {};
        series[0].data = ids.map(function (id) {
            return {
                name: id.name,
                value: 100, // TODO: 该值为初始值
            };
        });
    }
    else {
        if (isTime) {
            // TODO: 时间类型，只可以 x 轴是时间
            // x 轴时间
            var yType_1 = series[0].type; // 类型，折线或柱状
            var now_2 = +new Date();
            // x 轴时间，若选择多个，即为多线图
            oneXAxis.type = 'time';
            oneXAxis.data = [];
            oneYAxis.type = 'value';
            oneYAxis.data = [];
            echarts.option.legend = {};
            echarts.option.series = ids.map(function (id) {
                return {
                    name: id.name,
                    type: yType_1,
                    data: [[now_2, 0]], // TODO: 初始值
                };
            });
            echarts.replaceMode = ReplaceMode.Add; // 追加
        }
        else {
            // x 轴分类，或 y 轴分类
            var _b = __read(isYCategory
                ? [oneYAxis, oneXAxis]
                : [oneXAxis, oneYAxis], 2), categoryAxis = _b[0], valueAxis = _b[1];
            categoryAxis.type = 'category';
            categoryAxis.data = ids.map(function (id) { return id.name; });
            valueAxis.type = 'value';
            valueAxis.data = [];
            series.length = 1;
            series[0].data.length = ids.length;
            echarts.replaceMode = ReplaceMode.Replace; // 替换
        }
    }
    var topology = pen.calculative.canvas.parent;
    topology.setValue({ id: pen.id, echarts: echarts }, { render: false, doEvent: false });
}
//# sourceMappingURL=echarts.js.map