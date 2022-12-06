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
// This logic is shamelessly borrowed from Yqnn/svg-path-editor
// https://github.com/Yqnn/svg-path-editor
var commandRegex = /^[\t\n\f\r ]*([MLHVZCSQTAmlhvzcsqta])[\t\n\f\r ]*/;
var flagRegex = /^[01]/;
var numberRegex = /^[+-]?(([0-9]*\.[0-9]+)|([0-9]+\.)|([0-9]+))([eE][+-]?[0-9]+)?/;
var commaWsp = /^(([\t\n\f\r ]+,?[\t\n\f\r ]*)|(,[\t\n\f\r ]*))/;
var grammar = {
    M: [numberRegex, numberRegex],
    L: [numberRegex, numberRegex],
    H: [numberRegex],
    V: [numberRegex],
    Z: [],
    C: [
        numberRegex,
        numberRegex,
        numberRegex,
        numberRegex,
        numberRegex,
        numberRegex,
    ],
    S: [numberRegex, numberRegex, numberRegex, numberRegex],
    Q: [numberRegex, numberRegex, numberRegex, numberRegex],
    T: [numberRegex, numberRegex],
    A: [
        numberRegex,
        numberRegex,
        numberRegex,
        flagRegex,
        flagRegex,
        numberRegex,
        numberRegex,
    ],
};
export function parseSvgPath(path) {
    var cursor = 0;
    var commands = [];
    while (cursor < path.length) {
        var match = path.slice(cursor).match(commandRegex);
        if (match !== null) {
            var command = match[1];
            cursor += match[0].length;
            var parser = parseCommands(command, path, cursor);
            cursor = parser.cursor;
            commands.push.apply(commands, __spreadArray([], __read(parser.commands), false));
        }
        else {
            throw new Error('malformed path (first error at ' + cursor + ')');
        }
    }
    return { commands: commands };
}
export function getRect(path) {
    var x = Infinity;
    var y = Infinity;
    var ex = -Infinity;
    var ey = -Infinity;
    calcWorldPositions(path);
    path.commands.forEach(function (item) {
        item.worldPoints.forEach(function (num, index) {
            if (index % 2 === 0) {
                if (num < x) {
                    x = num;
                }
                if (num > ex) {
                    ex = num;
                }
            }
            else {
                if (num < y) {
                    y = num;
                }
                if (num > ey) {
                    ey = num;
                }
            }
        });
    });
    --x;
    --y;
    return {
        x: x,
        y: y,
        ex: ex,
        ey: ey,
        width: ex - x + 1,
        height: ey - y + 1,
    };
}
export function translatePath(path, x, y) {
    if (y == null) {
        y = x;
    }
    path.commands.forEach(function (item, index) {
        if (item.relative && index) {
            return;
        }
        switch (item.key) {
            case 'A':
            case 'a':
                item.values[5] += x;
                item.values[6] += y;
                break;
            case 'V':
            case 'v':
                item.values[0] += y;
                break;
            default:
                item.values.forEach(function (val, i) {
                    item.values[i] = val + (i % 2 === 0 ? x : y);
                });
                break;
        }
    });
}
export function scalePath(path, x, y) {
    if (y == null) {
        y = x;
    }
    path.commands.forEach(function (item) {
        switch (item.key) {
            case 'A':
            case 'a':
                var a = item.values[0];
                var b = item.values[1];
                var angle = (Math.PI * item.values[2]) / 180;
                var cos = Math.cos(angle);
                var sin = Math.sin(angle);
                var A = b * b * y * y * cos * cos + a * a * y * y * sin * sin;
                var B = 2 * x * y * cos * sin * (b * b - a * a);
                var C = a * a * x * x * cos * cos + b * b * x * x * sin * sin;
                var F = -(a * a * b * b * x * x * y * y);
                var det = B * B - 4 * A * C;
                var val1 = Math.sqrt((A - C) * (A - C) + B * B);
                // New rotation:
                item.values[2] =
                    B !== 0
                        ? (Math.atan((C - A - val1) / B) * 180) / Math.PI
                        : A < C
                            ? 0
                            : 90;
                // New radius-x, radius-y
                item.values[0] = -Math.sqrt(2 * det * F * (A + C + val1)) / det;
                item.values[1] = -Math.sqrt(2 * det * F * (A + C - val1)) / det;
                // New target
                item.values[5] *= x;
                item.values[6] *= y;
                // New sweep flag
                item.values[4] = x * y >= 0 ? item.values[4] : 1 - item.values[4];
                break;
            case 'V':
            case 'v':
                item.values[0] *= y;
                break;
            default:
                item.values.forEach(function (val, index) {
                    item.values[index] = val * (index % 2 === 0 ? x : y);
                });
                break;
        }
    });
}
export function pathToString(path) {
    var text = '';
    path.commands.forEach(function (item) {
        text += item.key + ' ';
        item.values.forEach(function (num) {
            text += num + ' ';
        });
    });
    return text;
}
function parseCommands(type, path, cursor) {
    var e_1, _a;
    var expectedRegexList = grammar[type.toUpperCase()];
    var commands = [];
    while (cursor <= path.length) {
        var command = { key: type, values: [] };
        try {
            for (var expectedRegexList_1 = (e_1 = void 0, __values(expectedRegexList)), expectedRegexList_1_1 = expectedRegexList_1.next(); !expectedRegexList_1_1.done; expectedRegexList_1_1 = expectedRegexList_1.next()) {
                var regex = expectedRegexList_1_1.value;
                var match = path.slice(cursor).match(regex);
                if (match !== null) {
                    command.values.push(+match[0]);
                    cursor += match[0].length;
                    var ws = path.slice(cursor).match(commaWsp);
                    if (ws !== null) {
                        cursor += ws[0].length;
                    }
                }
                else if (command.values.length === 0) {
                    return { cursor: cursor, commands: commands };
                }
                else {
                    throw new Error('malformed path (first error at ' + cursor + ')');
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (expectedRegexList_1_1 && !expectedRegexList_1_1.done && (_a = expectedRegexList_1.return)) _a.call(expectedRegexList_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        command.relative = command.key.toUpperCase() !== command.key;
        commands.push(command);
        if (expectedRegexList.length === 0) {
            return { cursor: cursor, commands: commands };
        }
        if (type === 'm') {
            type = 'l';
        }
        if (type === 'M') {
            type = 'L';
        }
    }
    throw new Error('malformed path (first error at ' + cursor + ')');
}
function calcWorldPoints(command, previous) {
    var worldPoints = [];
    var current = command.relative && previous
        ? {
            x: previous.worldPoints[previous.worldPoints.length - 2],
            y: previous.worldPoints[previous.worldPoints.length - 1],
        }
        : { x: 0, y: 0 };
    for (var i = 0; i < command.values.length - 1; i += 2) {
        worldPoints.push(current.x + command.values[i]);
        worldPoints.push(current.y + command.values[i + 1]);
    }
    command.worldPoints = worldPoints;
}
function calcWorldPositions(path) {
    var previous;
    var x = 0;
    var y = 0;
    path.commands.forEach(function (item) {
        switch (item.key) {
            case 'Z':
            case 'z':
                item.worldPoints = [x, y];
                break;
            case 'H':
                item.worldPoints = [
                    item.values[0],
                    previous.worldPoints[previous.worldPoints.length - 1],
                ];
                break;
            case 'h':
                item.worldPoints = [
                    item.values[0] +
                        previous.worldPoints[previous.worldPoints.length - 2],
                    previous.worldPoints[previous.worldPoints.length - 1],
                ];
                break;
            case 'V':
                item.worldPoints = [
                    previous.worldPoints[previous.worldPoints.length - 2],
                    item.values[0],
                ];
                break;
            case 'v':
                item.worldPoints = [
                    previous.worldPoints[previous.worldPoints.length - 2],
                    item.values[0] +
                        previous.worldPoints[previous.worldPoints.length - 1],
                ];
                break;
            case 'A':
                item.worldPoints = [
                    previous.worldPoints[previous.worldPoints.length - 2],
                    item.values[0] +
                        previous.worldPoints[previous.worldPoints.length - 1],
                ];
                break;
            default:
                calcWorldPoints(item, previous);
                break;
        }
        if (item.key === 'M' ||
            item.key === 'm' ||
            item.key === 'Z' ||
            item.key === 'z') {
            x = item.worldPoints[item.worldPoints.length - 2];
            y = item.worldPoints[item.worldPoints.length - 1];
        }
        previous = item;
    });
}
//# sourceMappingURL=parse.js.map