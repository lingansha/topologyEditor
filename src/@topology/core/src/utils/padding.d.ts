export declare type Padding = number | string | number[];
/**
 * turn padding into [top, right, bottom, left]
 * @param  {Number|Array} padding input padding
 * @return {array} output
 */
export declare const formatPadding: (padding: Padding) => number[];
