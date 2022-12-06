export declare enum HoverType {
    None = 0,
    LineAnchor = 1,
    NodeAnchor = 2,
    Line = 3,
    Node = 4,
    Resize = 5,
    Rotate = 6,
    LineAnchorPrev = 7,
    LineAnchorNext = 8
}
export declare enum HotkeyType {
    None = 0,
    Translate = 1,
    Select = 2,
    Resize = 3,
    AddAnchor = 4
}
export declare enum MouseRight {
    None = 0,
    Down = 1,
    Translate = 2
}
export declare enum Direction {
    None = -1,
    Up = 0,
    Right = 1,
    Bottom = 2,
    Left = 3
}
export declare const defaultCursors: readonly ["nw-resize", "ne-resize", "se-resize", "sw-resize"];
export declare const rotatedCursors: readonly ["n-resize", "e-resize", "s-resize", "w-resize"];
export declare const defaultDrawLineFns: string[];
export declare const inheritanceProps: string[];
