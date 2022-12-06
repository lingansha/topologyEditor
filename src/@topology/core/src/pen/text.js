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
import { calcRightBottom } from '../rect';
import { getFont } from './render';
export function calcTextRect(pen) {
    var _a = pen.calculative, paddingTop = _a.paddingTop, paddingBottom = _a.paddingBottom, paddingLeft = _a.paddingLeft, paddingRight = _a.paddingRight, worldRect = _a.worldRect, canvas = _a.canvas;
    var _b = pen.calculative, textLeft = _b.textLeft, textTop = _b.textTop, textWidth = _b.textWidth, textHeight = _b.textHeight;
    var x = paddingLeft;
    var y = paddingTop;
    if (textLeft && Math.abs(textLeft) < 1) {
        textLeft *= worldRect.width;
    }
    if (textTop && Math.abs(textTop) < 1) {
        textTop *= worldRect.height;
    }
    var width = worldRect.width - paddingLeft - paddingRight - (textLeft || 0);
    var height = worldRect.height - paddingTop - paddingBottom - (textTop || 0);
    if (textWidth && textWidth < 1) {
        textWidth *= worldRect.width;
    }
    if (textHeight && textHeight < 1) {
        textHeight *= worldRect.height;
    }
    if (textWidth < pen.calculative.fontSize) {
        textWidth = pen.calculative.fontSize;
    }
    // 默认居左，居上
    x += (textLeft || 0) + worldRect.x;
    y += (textTop || 0) + worldRect.y;
    var textAlign = pen.textAlign || canvas.store.options.textAlign;
    var textBaseline = pen.textBaseline || canvas.store.options.textBaseline;
    switch (textAlign) {
        case 'center':
            x += (width - (textWidth || width)) / 2;
            break;
        case 'right':
            x += width - (textWidth || width);
            break;
    }
    switch (textBaseline) {
        case 'middle':
            y += (height - (textHeight || height)) / 2;
            break;
        case 'bottom':
            y += height - (textHeight || height);
            break;
    }
    var rect = {
        x: x,
        y: y,
        width: textWidth || width,
        height: textHeight || height,
    };
    calcRightBottom(rect);
    pen.calculative.worldTextRect = rect;
    calcTextLines(pen);
    pen.calculative.textDrawRect = undefined;
}
export function calcTextDrawRect(ctx, pen) {
    // By default, the text is center aligned.
    var lineHeight = pen.calculative.fontSize * pen.calculative.lineHeight;
    var h = pen.calculative.textLines.length * lineHeight;
    var textWidth = calcTextAdaptionWidth(ctx, pen); // 多行文本最大宽度
    var rect = pen.calculative.worldTextRect;
    var x = rect.x + (rect.width - textWidth) / 2;
    var y = rect.y + (rect.height - h) / 2;
    var options = pen.calculative.canvas.store.options;
    var textAlign = pen.textAlign || options.textAlign;
    switch (textAlign) {
        case 'left':
            x = rect.x;
            break;
        case 'right':
            x = rect.x + rect.width - textWidth;
            break;
    }
    var textBaseline = pen.textBaseline || options.textBaseline;
    switch (textBaseline) {
        case 'top':
            y = rect.y;
            break;
        case 'bottom':
            y = rect.ey - h;
            break;
    }
    pen.calculative.textDrawRect = {
        x: x,
        y: y,
        width: textWidth,
        height: h,
    };
    calcRightBottom(pen.calculative.textDrawRect);
}
export function calcTextLines(pen, text) {
    var e_1, _a, e_2, _b;
    if (text === void 0) { text = pen.calculative.text; }
    if (text == undefined) {
        pen.calculative.textLines = [];
        return;
    }
    text = text.toString();
    var lines = [];
    var oneRowHeight = pen.calculative.fontSize * pen.calculative.lineHeight;
    var textHeight = pen.calculative.worldTextRect.height;
    var calcRows = Math.floor(textHeight / oneRowHeight);
    // 最小值为 1
    var maxRows = calcRows > 1 ? calcRows : 1;
    switch (pen.whiteSpace) {
        case 'nowrap':
            if (pen.ellipsis !== false) {
                var allLines = wrapLines(text.split(''), pen);
                if (allLines[0]) {
                    lines.push(allLines[0]);
                    if (allLines.length > 1) {
                        // 存在第二行，说明宽度超出
                        setEllipsisOnLastLine(lines);
                    }
                }
            }
            else {
                lines.push(text);
            }
            break;
        case 'pre-line':
            lines = text.split(/[\n]/g);
            if (pen.ellipsis !== false && lines.length > maxRows) {
                lines = lines.slice(0, maxRows);
                setEllipsisOnLastLine(lines);
            }
            break;
        case 'break-all':
        default:
            var paragraphs = text.split(/[\n]/g);
            var currentRow = 0;
            try {
                outer: for (var paragraphs_1 = __values(paragraphs), paragraphs_1_1 = paragraphs_1.next(); !paragraphs_1_1.done; paragraphs_1_1 = paragraphs_1.next()) {
                    var paragraph = paragraphs_1_1.value;
                    var words = pen.whiteSpace === 'break-all'
                        ? paragraph.split('')
                        : getWords(paragraph);
                    var items = wrapLines(words, pen);
                    // 空行换行的情况
                    if (items.length === 0)
                        items = [''];
                    if (pen.ellipsis != false) {
                        try {
                            for (var items_1 = (e_2 = void 0, __values(items)), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                                var l = items_1_1.value;
                                currentRow++;
                                if (currentRow > maxRows) {
                                    setEllipsisOnLastLine(lines);
                                    break outer;
                                }
                                else {
                                    lines.push(l);
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (items_1_1 && !items_1_1.done && (_b = items_1.return)) _b.call(items_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                    else {
                        lines.push.apply(lines, __spreadArray([], __read(items), false));
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (paragraphs_1_1 && !paragraphs_1_1.done && (_a = paragraphs_1.return)) _a.call(paragraphs_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            break;
    }
    var keepDecimal = pen.calculative.keepDecimal;
    if (keepDecimal != undefined) {
        lines.forEach(function (text, i) {
            var textNum = Number(text);
            if (!isNaN(textNum)) {
                lines[i] = textNum.toFixed(keepDecimal);
            }
        });
    }
    pen.calculative.textLines = lines;
    return lines;
}
export function getWords(txt) {
    if (txt === void 0) { txt = ''; }
    var words = [];
    var word = '';
    for (var i = 0; i < txt.length; ++i) {
        var ch = txt.charCodeAt(i);
        if (ch < 33 || ch > 126) {
            if (word) {
                words.push(word);
                word = '';
            }
            words.push(txt[i]);
        }
        else {
            word += txt[i];
        }
    }
    if (word) {
        words.push(word);
    }
    return words;
}
export function wrapLines(words, pen) {
    var canvas = pen.calculative.canvas;
    var ctx = canvas.offscreen.getContext('2d');
    var _a = pen.calculative, fontStyle = _a.fontStyle, fontWeight = _a.fontWeight, fontSize = _a.fontSize, fontFamily = _a.fontFamily, lineHeight = _a.lineHeight;
    ctx.save();
    var lines = [];
    var currentLine = words[0] || '';
    for (var i = 1; i < words.length; ++i) {
        var word = words[i] || '';
        var text = currentLine + word;
        var currentWidth = 0;
        if (canvas.store.options.measureTextWidth) {
            ctx.font = getFont({
                fontStyle: fontStyle,
                fontWeight: fontWeight,
                fontFamily: fontFamily || canvas.store.options.fontFamily,
                fontSize: fontSize,
                lineHeight: lineHeight,
            });
            currentWidth = ctx.measureText(text).width;
        }
        else {
            // 近似计算
            var chinese = text.match(/[^\x00-\xff]/g) || '';
            var chineseWidth = chinese.length * fontSize; // 中文占用的宽度
            var spaces = text.match(/\s/g) || '';
            var spaceWidth = spaces.length * fontSize * 0.3; // 空格占用的宽度
            var otherWidth = (text.length - chinese.length - spaces.length) * fontSize * 0.6; // 其他字符占用的宽度
            currentWidth = chineseWidth + spaceWidth + otherWidth;
        }
        var textWidth = pen.calculative.worldTextRect.width;
        if (currentWidth <= textWidth) {
            currentLine += word;
        }
        else {
            currentLine.length && lines.push(currentLine);
            currentLine = word;
        }
    }
    currentLine.length && lines.push(currentLine);
    ctx.restore();
    return lines;
}
export function calcTextAdaptionWidth(ctx, pen) {
    var maxWidth = 0;
    pen.calculative.textLineWidths = [];
    pen.calculative.textLines.forEach(function (text) {
        var width = ctx.measureText(text).width;
        pen.calculative.textLineWidths.push(width);
        maxWidth < width && (maxWidth = width);
    });
    return maxWidth;
}
/**
 * 副作用函数，会修改传入的参数
 * 把最后一行的最后变成 ...
 * TODO: 中文的三个字符宽度比 . 大，显示起来像是删多了
 * @param lines
 */
function setEllipsisOnLastLine(lines) {
    lines[lines.length - 1] = lines[lines.length - 1].slice(0, -3) + '...';
}
//# sourceMappingURL=text.js.map