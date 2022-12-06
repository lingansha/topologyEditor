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
import { setElemPosition } from '@topology/core';
export var lightningChartsList = {
    lightningChart: undefined,
};
export function lightningCharts(pen) {
    if (!pen.onDestroy) {
        pen.onDestroy = destory;
        pen.onMove = move;
        pen.onResize = resize;
        pen.onRotate = move;
        pen.onValue = value;
        pen.onChangeId = changeId;
    }
    var path = new Path2D();
    var worldRect = pen.calculative.worldRect;
    var lightningChart = lightningChartsList.lightningChart || globalThis.lcjs;
    if (!pen.lightningCharts || !lightningChart) {
        return;
    }
    if (typeof pen.lightningCharts === 'string') {
        try {
            pen.lightningCharts = JSON.parse(pen.lightningCharts);
        }
        catch (e) { }
    }
    if (!pen.lightningCharts) {
        return;
    }
    if (!lightningChartsList[pen.id] || !lightningChartsList[pen.id].div) {
        // 1. 创建父容器
        var div_1 = document.createElement('div');
        div_1.style.position = 'absolute';
        div_1.style.outline = 'none';
        div_1.style.left = '-9999px';
        div_1.style.top = '-9999px';
        div_1.style.width = worldRect.width + 'px';
        div_1.style.height = worldRect.height + 'px';
        div_1.id = pen.id;
        document.body.appendChild(div_1);
        // 2. 创建echart
        lightningChartsList[pen.id] = {
            div: div_1,
            chart: '',
        };
        // 3. 生产预览图
        // 初始化时，等待父div先渲染完成，避免初始图表控件太大。
        setTimeout(function () {
            setLightningCharts(pen);
        }, 100);
        // 4. 加载到div layer
        setTimeout(function () {
            pen.calculative.canvas.externalElements &&
                pen.calculative.canvas.externalElements.appendChild(div_1);
            setElemPosition(pen, div_1);
        }, 200);
    }
    path.rect(worldRect.x, worldRect.y, worldRect.width, worldRect.height);
    if (pen.calculative.patchFlags && lightningChartsList[pen.id]) {
        setElemPosition(pen, lightningChartsList[pen.id].div);
    }
    return path;
}
//将16进制格式和rgb格式转化为数字数组
function colorRgb(bcolor) {
    var color = bcolor.toLowerCase();
    var pattern = /^#([0-9|a-f]{3}|[0-9|a-f]{6})$/;
    var pattern2 = /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
    if (color && pattern.test(color)) {
        if (color.length == 4) {
            // 将三位转换为六位
            color =
                '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
        }
        //处理六位的颜色值
        var colorNew = [];
        for (var i = 1; i < 7; i += 2) {
            colorNew.push(parseInt('0x' + color.slice(i, i + 2)));
        }
        return colorNew; //.join(',');
    }
    else if (color && pattern2.test(color)) {
        var first = color.match(/\(([^)]*)\)/)[1];
        var arr = first.split(',').map(function (item) {
            return parseInt(item);
        });
        return arr;
    }
    return color;
}
function setLightningCharts(pen) {
    var lightningChart = lcjs.lightningChart, PieChartTypes = lcjs.PieChartTypes, LegendBoxBuilders = lcjs.LegendBoxBuilders, SliceLabelFormatters = lcjs.SliceLabelFormatters, Themes = lcjs.Themes, GaugeChartTypes = lcjs.GaugeChartTypes, SolidLine = lcjs.SolidLine, SolidFill = lcjs.SolidFill, ColorRGBA = lcjs.ColorRGBA, UIOrigins = lcjs.UIOrigins, emptyLine = lcjs.emptyLine, AutoCursorModes = lcjs.AutoCursorModes, AxisScrollStrategies = lcjs.AxisScrollStrategies, AxisTickStrategies = lcjs.AxisTickStrategies, UIElementBuilders = lcjs.UIElementBuilders;
    var data = pen.lightningCharts.option.data;
    var title = pen.lightningCharts.option.title || 'Title';
    var theme = Themes[pen.lightningCharts.option.theme || 'lightNew'];
    //   if (lightningChartsList[pen.id].chart) {
    //     lightningChartsList[pen.id].chart.dispose();
    //   }
    lightningChartsList[pen.id].chart = lightningChart();
    switch (pen.lightningCharts.option.type) {
        case 'line':
            var charts_1 = lightningChartsList[pen.id].chart
                .ChartXY({
                container: pen.id,
            })
                .setTitle(title);
            data.forEach(function (item) {
                charts_1.addLineSeries().setName(item.name).add(item.data);
            });
            //   lightningChartsList[pen.id].chart = charts;
            break;
        case 'bar':
            var lc_1 = lightningChartsList[pen.id].chart;
            var barChart = void 0;
            {
                barChart = function (options) {
                    var figureThickness = 10;
                    var figureGap = figureThickness * 0.25;
                    var groupGap = figureGap * 3.0;
                    var groups = [];
                    var categories = [];
                    var chart = lc_1
                        .ChartXY(options)
                        .setTitle(title)
                        .setAutoCursorMode(AutoCursorModes.onHover)
                        .setMouseInteractions(false)
                        .setPadding({ bottom: 30 });
                    var axisX = chart
                        .getDefaultAxisX()
                        .setMouseInteractions(false)
                        .setScrollStrategy(undefined)
                        .setTickStrategy(AxisTickStrategies.Empty);
                    var axisY = chart
                        .getDefaultAxisY()
                        .setMouseInteractions(false)
                        .setTitle(pen.lightningCharts.option.yTitle)
                        .setInterval(0, 70)
                        .setScrollStrategy(AxisScrollStrategies.fitting);
                    chart.setAutoCursor(function (cursor) {
                        return cursor
                            .disposePointMarker()
                            .disposeTickMarkerX()
                            .disposeTickMarkerY()
                            .setGridStrokeXStyle(emptyLine)
                            .setGridStrokeYStyle(emptyLine)
                            .setResultTable(function (table) {
                            table.setOrigin(UIOrigins.CenterBottom);
                        });
                    });
                    var createSeriesForCategory = function (category) {
                        var series = chart.addRectangleSeries();
                        series.setCursorResultTableFormatter(function (builder, series, figure) {
                            var entry = {
                                name: category.name,
                                value: category.data[category.figures.indexOf(figure)],
                            };
                            return builder
                                .addRow('Department:', entry.name)
                                .addRow('# of employees:', String(entry.value));
                        });
                        return series;
                    };
                    var legendBox = chart
                        .addLegendBox(LegendBoxBuilders.VerticalLegendBox)
                        .setAutoDispose({
                        type: 'max-width',
                        maxWidth: 0.2,
                    });
                    var redraw = function () {
                        var e_1, _a;
                        var x = 0;
                        for (var groupIndex = 0; groupIndex < groups.length; groupIndex++) {
                            var group = groups[groupIndex];
                            var xStart = x;
                            try {
                                for (var categories_1 = (e_1 = void 0, __values(categories)), categories_1_1 = categories_1.next(); !categories_1_1.done; categories_1_1 = categories_1.next()) {
                                    var category = categories_1_1.value;
                                    var value_1 = category.data[groupIndex];
                                    if (value_1 !== undefined) {
                                        var figure = category.figures[groupIndex];
                                        figure.setDimensions({
                                            x: x,
                                            y: 0,
                                            width: figureThickness,
                                            height: value_1,
                                        });
                                        x += figureThickness + figureGap;
                                    }
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (categories_1_1 && !categories_1_1.done && (_a = categories_1.return)) _a.call(categories_1);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                            group.tick.setValue((xStart + x - figureGap) / 2);
                            x += groupGap;
                        }
                        axisX.setInterval(-(groupGap + figureGap), x);
                    };
                    var addGroups = function (names) {
                        var e_2, _a;
                        var _loop_1 = function (name_1) {
                            groups.push({
                                name: name_1,
                                tick: axisX
                                    .addCustomTick(UIElementBuilders.AxisTick)
                                    .setGridStrokeLength(0)
                                    .setTextFormatter(function (_) { return name_1; }),
                            });
                        };
                        try {
                            for (var names_1 = __values(names), names_1_1 = names_1.next(); !names_1_1.done; names_1_1 = names_1.next()) {
                                var name_1 = names_1_1.value;
                                _loop_1(name_1);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (names_1_1 && !names_1_1.done && (_a = names_1.return)) _a.call(names_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    };
                    var addCategory = function (entry) {
                        var series = createSeriesForCategory(entry).setName(entry.name);
                        entry.figures = entry.data.map(function (value) {
                            return series.add({ x: 0, y: 0, width: 0, height: 0 });
                        });
                        legendBox.add(series);
                        categories.push(entry);
                        redraw();
                    };
                    return {
                        addCategory: addCategory,
                        addGroups: addGroups,
                    };
                };
            }
            var chart_1 = barChart({
                theme: theme,
                container: pen.id,
            });
            chart_1.addGroups(pen.lightningCharts.option.groups);
            var categories_2 = pen.lightningCharts.option.categories;
            data.forEach(function (data, i) {
                return chart_1.addCategory({
                    name: categories_2[i],
                    data: data,
                });
            });
            //   lightningChartsList[pen.id].chart = chart;
            break;
        case 'pie':
            var pie_1 = lightningChartsList[pen.id].chart
                .Pie({
                theme: theme,
                container: pen.id,
            })
                .setTitle(title)
                .setAnimationsEnabled(true)
                .setMultipleSliceExplosion(true);
            var slices = data.map(function (item) { return pie_1.addSlice(item.name, item.value); });
            pie_1
                .setInnerRadius(pen.lightningCharts.option.innerRadius || 0)
                .setLabelFormatter(SliceLabelFormatters.NamePlusRelativeValue);
            pie_1
                .addLegendBox(LegendBoxBuilders.VerticalLegendBox)
                .setAutoDispose({
                type: 'max-width',
                maxWidth: 0.3,
            })
                .add(pie_1);
            //   lightningChartsList[pen.id].chart = pie;
            break;
        case 'gauge':
            var gauge = lightningChartsList[pen.id].chart
                .Gauge({
                theme: theme,
                container: pen.id,
            })
                .setTitle(title)
                .setThickness(20)
                .setAngleInterval(pen.lightningCharts.option.startAngle || 225, pen.lightningCharts.option.endAngle || -45);
            var colorArry = colorRgb(pen.lightningCharts.option.background);
            var slice = gauge
                .getDefaultSlice()
                .setInterval(pen.lightningCharts.option.min || 0, pen.lightningCharts.option.max || 100)
                .setValue(data)
                .setFillStyle(new SolidFill({
                color: ColorRGBA(colorArry[0], colorArry[1], colorArry[2]),
            }));
            //   lightningChartsList[pen.id].chart = gauge;
            break;
    }
}
function destory(pen) {
    lightningChartsList[pen.id].div.remove();
    var lightningChart = lightningChartsList.lightningChart || globalThis.lcjs;
    //   lightningChartsList[pen.id].chart.dispose();
    // lightningCharts && lightningCharts.dispose(lightningChartsList[pen.id].chart);
    lightningChartsList[pen.id] = undefined;
}
function move(pen) {
    if (!lightningChartsList[pen.id]) {
        return;
    }
    setElemPosition(pen, lightningChartsList[pen.id].div);
}
function resize(pen) {
    if (!lightningChartsList[pen.id]) {
        return;
    }
    setElemPosition(pen, lightningChartsList[pen.id].div);
}
function value(pen) {
    if (!lightningChartsList[pen.id]) {
        return;
    }
    setLightningCharts(pen);
    setElemPosition(pen, lightningChartsList[pen.id].div);
}
function changeId(pen, oldId, newId) {
    if (!lightningChartsList[oldId]) {
        return;
    }
    lightningChartsList[oldId].div.id = newId;
    lightningChartsList[newId] = lightningChartsList[oldId];
    delete lightningChartsList[oldId];
}
//# sourceMappingURL=LightningChart.js.map