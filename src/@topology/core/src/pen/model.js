export var PenType;
(function (PenType) {
    PenType[PenType["Node"] = 0] = "Node";
    PenType[PenType["Line"] = 1] = "Line";
})(PenType || (PenType = {}));
export var LockState;
(function (LockState) {
    LockState[LockState["None"] = 0] = "None";
    LockState[LockState["DisableEdit"] = 1] = "DisableEdit";
    LockState[LockState["DisableMove"] = 2] = "DisableMove";
    LockState[LockState["DisableScale"] = 3] = "DisableScale";
    LockState[LockState["DisableMoveScale"] = 4] = "DisableMoveScale";
    // DisableActive,
    LockState[LockState["Disable"] = 10] = "Disable";
})(LockState || (LockState = {}));
export var AnchorMode;
(function (AnchorMode) {
    AnchorMode[AnchorMode["Default"] = 0] = "Default";
    AnchorMode[AnchorMode["In"] = 1] = "In";
    AnchorMode[AnchorMode["Out"] = 2] = "Out";
})(AnchorMode || (AnchorMode = {}));
export var Gradient;
(function (Gradient) {
    Gradient[Gradient["None"] = 0] = "None";
    Gradient[Gradient["Linear"] = 1] = "Linear";
    Gradient[Gradient["Radial"] = 2] = "Radial";
})(Gradient || (Gradient = {}));
// export enum Flip {
//   None, // 正常
//   Horizontal, // 水平翻转
//   Vertical, // 垂直翻转
//   Both, // 全翻转
// }
// 修改哪些属性需要重现计算 textRect
export var needCalcTextRectProps = [
    'text',
    'textWidth',
    'textHeight',
    'textLeft',
    'textTop',
    'fontFamily',
    'fontSize',
    'lineHeight',
    'fontStyle',
    'fontWeight',
    'textAlign',
    'textBaseline',
    'whiteSpace',
    'ellipsis',
    'keepDecimal',
];
export var needSetPenProps = ['x', 'y', 'width', 'height'];
export var needPatchFlagsPenRectProps = [
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'flipX',
    'flipY',
    'visible',
    'showChild',
];
export var needCalcIconRectProps = ['iconLeft', 'iconTop', 'iconRotate'];
export var LineAnimateType;
(function (LineAnimateType) {
    LineAnimateType[LineAnimateType["Normal"] = 0] = "Normal";
    LineAnimateType[LineAnimateType["Beads"] = 1] = "Beads";
    LineAnimateType[LineAnimateType["Dot"] = 2] = "Dot";
})(LineAnimateType || (LineAnimateType = {}));
/**
 * dom 类型的 图形
 */
export var isDomShapes = [
    'gif',
    'iframe',
    'video',
    'echarts',
    'highcharts',
    'lightningCharts',
];
// 格式刷同步的属性
export var formatAttrs = new Set([
    'borderRadius',
    'rotate',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'paddingBottom',
    'progress',
    'progressColor',
    'verticalProgress',
    // 'flip',
    'flipX',
    'flipY',
    'input',
    'lineDash',
    'lineCap',
    'lineJoin',
    'strokeType',
    'lineGradientFromColor',
    'lineGradientToColor',
    'lineGradientAngle',
    'color',
    'hoverColor',
    'activeColor',
    'lineWidth',
    'bkType',
    'gradientFromColor',
    'gradientToColor',
    'gradientAngle',
    'gradientRadius',
    'hoverBackground',
    'activeBackground',
    'globalAlpha',
    'anchorColor',
    'anchorRadius',
    'shadowColor',
    'shadowBlur',
    'shadowOffsetX',
    'shadowOffsetY',
    'textHasShadow',
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
    'textWidth',
    'textHeight',
    'textLeft',
    'textTop',
    'ellipsis',
    'hiddenText',
    'keepDecimal',
    'borderWidth',
    'borderColor',
    'lineWidth',
    'lineAnimateType',
    'frames',
    'animateColor',
    'animateType',
    'animateReverse',
]);
/**
 * 清空 pen 的 生命周期
 */
export function clearLifeCycle(pen) {
    pen.onAdd = undefined;
    pen.onValue = undefined;
    pen.onBeforeValue = undefined;
    pen.onDestroy = undefined;
    pen.onMove = undefined;
    pen.onResize = undefined;
    pen.onRotate = undefined;
    pen.onClick = undefined;
    pen.onMouseEnter = undefined;
    pen.onMouseLeave = undefined;
    pen.onMouseDown = undefined;
    pen.onMouseMove = undefined;
    pen.onMouseUp = undefined;
    pen.onShowInput = undefined;
    pen.onInput = undefined;
    pen.onChangeId = undefined;
    pen.onBinds = undefined;
}
//# sourceMappingURL=model.js.map