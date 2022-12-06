/**
 * 拷贝一个对象
 * @param o - object to clone
 * @param keepCalc 是否保留计算属性， false, 不保留， true, 保留（但 calculative.canvas 属性仍不保存）
 * @returns 拷贝后的对象
 */
export declare function deepClone<T>(o: T, keepCalc?: boolean): T;
export declare function deepSetValue<T>(o: any, keyWords: string, value: number): T;
