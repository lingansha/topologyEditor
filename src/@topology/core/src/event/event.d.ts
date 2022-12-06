import { IValue, Pen } from '../pen';
export declare type EventValue = string | IValue | undefined | null;
export declare type EventName = 'enter' | 'leave' | 'active' | 'inactive' | 'click' | 'mousedown' | 'mouseup' | 'dblclick' | 'valueUpdate';
export interface Event {
    name: EventName;
    action: EventAction;
    where?: Where;
    value?: EventValue;
    params?: string;
    fn?: (pen: Pen, params: string) => void;
}
export declare enum EventAction {
    Link = 0,
    SetProps = 1,
    StartAnimate = 2,
    PauseAnimate = 3,
    StopAnimate = 4,
    Function = 5,
    GlobalFn = 6,
    Emit = 7,
    StartVideo = 8,
    PauseVideo = 9,
    StopVideo = 10,
    SendPropData = 11,
    SendVarData = 12
}
export interface Where {
    type?: string | 'comparison';
    key?: string;
    comparison?: Comparison;
    value?: unknown;
    fn?: (pen: Pen) => boolean;
    fnJs?: string;
}
/**
 * 触发器中的符号
 */
export declare type Comparison = '=' | '==' | '!=' | '>' | '<' | '>=' | '<=' | '[)' | '![)'
/**
 * 属于，类似于 数组的 includes
 * .. 属于范围语法，30..50 等价于 介于的 [30, 50]
 * [1, 2, 3]  2 // true  1.5 // false
 * [1,20,30..50,65] 1 // true 20 // true 30 // true 30.1 // true
 */
 | '[]' | '![]';
