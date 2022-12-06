export declare function abs(num: number, percent: number | string): number;
/**
 * 实际值是否在范围中, 数学上的开闭
 * @param realValue 实际值
 * @param collection 集合规范，与数学上相同，如[0, 100]，前闭后闭；如[0, 100)，前闭后开；
 * @returns undefined 说明参数不规范 ，true 说明在范围内，false 说明不在范围内
 */
export declare function valueInRange(realValue: number, collection: unknown): boolean;
/**
 * 实际值是否在数组中，即是否属于
 * 例如: [1,2,3] 只有 1 2 3 是属于 collection 的
 * .. 范围值 30..50 等于 闭区间的 [30,50] ，即范围值
 * [1,20,30..50,65] 只有 1 20 30..50 65 是属于 collection 的
 * @param realValue 实际值
 * @param collection 集合
 * @returns undefined 说明参数不规范 ，true 说明在范围内，false 说明不在范围内
 */
export declare function valueInArray(realValue: number, collection: unknown): boolean;
