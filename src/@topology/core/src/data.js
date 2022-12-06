export var HoverType;
(function (HoverType) {
    HoverType[HoverType["None"] = 0] = "None";
    HoverType[HoverType["LineAnchor"] = 1] = "LineAnchor";
    HoverType[HoverType["NodeAnchor"] = 2] = "NodeAnchor";
    HoverType[HoverType["Line"] = 3] = "Line";
    HoverType[HoverType["Node"] = 4] = "Node";
    HoverType[HoverType["Resize"] = 5] = "Resize";
    HoverType[HoverType["Rotate"] = 6] = "Rotate";
    HoverType[HoverType["LineAnchorPrev"] = 7] = "LineAnchorPrev";
    HoverType[HoverType["LineAnchorNext"] = 8] = "LineAnchorNext";
})(HoverType || (HoverType = {}));
export var HotkeyType;
(function (HotkeyType) {
    HotkeyType[HotkeyType["None"] = 0] = "None";
    HotkeyType[HotkeyType["Translate"] = 1] = "Translate";
    HotkeyType[HotkeyType["Select"] = 2] = "Select";
    HotkeyType[HotkeyType["Resize"] = 3] = "Resize";
    HotkeyType[HotkeyType["AddAnchor"] = 4] = "AddAnchor";
})(HotkeyType || (HotkeyType = {}));
export var MouseRight;
(function (MouseRight) {
    MouseRight[MouseRight["None"] = 0] = "None";
    MouseRight[MouseRight["Down"] = 1] = "Down";
    MouseRight[MouseRight["Translate"] = 2] = "Translate";
})(MouseRight || (MouseRight = {}));
export var Direction;
(function (Direction) {
    Direction[Direction["None"] = -1] = "None";
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Right"] = 1] = "Right";
    Direction[Direction["Bottom"] = 2] = "Bottom";
    Direction[Direction["Left"] = 3] = "Left";
})(Direction || (Direction = {}));
export var defaultCursors = [
    'nw-resize',
    'ne-resize',
    'se-resize',
    'sw-resize',
];
export var rotatedCursors = [
    'n-resize',
    'e-resize',
    's-resize',
    'w-resize',
];
export var defaultDrawLineFns = ['curve', 'polyline', 'line'];
export var inheritanceProps = [
    'dash',
    'lineWidth',
    'lineCap',
    'lineJoin',
    'strokeType',
    'color',
    'lineGradientFromColor',
    'lineGradientToColor',
    'lineGradientAngle',
    'globalAlpha',
    'bkType',
    'background',
    'gradientFromColor',
    'gradientToColor',
    'gradientAngle',
    'gradientRadius',
    'fontFamily',
    'fontSize',
    'textColor',
    'hoverTextColor',
    'activeTextColor',
    'textBackground',
    'fontStyle',
    'fontWeight',
    'textAlign',
    'textBaseline',
    'lineHeight',
    'whiteSpace',
    'textLeft',
    'textTop',
    'flipX',
    'flipY',
    'lineDash',
];
//# sourceMappingURL=data.js.map