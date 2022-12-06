import { Rect } from '../../rect';
export interface SvgCommand {
    key: string;
    values: number[];
    relative?: boolean;
    worldPoints?: number[];
}
export interface SvgPath {
    commands: SvgCommand[];
}
export declare function parseSvgPath(path: string): SvgPath;
export declare function getRect(path: SvgPath): Rect;
export declare function translatePath(path: SvgPath, x: number, y?: number): void;
export declare function scalePath(path: SvgPath, x: number, y?: number): void;
export declare function pathToString(path: SvgPath): string;
