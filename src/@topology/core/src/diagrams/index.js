export * from './rectangle';
export * from './circle';
export * from './svgPath';
export * from './diamond';
export * from './triangle';
export * from './pentagon';
export * from './pentagram';
export * from './hexagon';
export * from './arrow';
export * from './message';
export * from './cloud';
export * from './file';
export * from './cube';
export * from './people';
export * from './line';
export * from './iframe';
export * from './video';
import { rectangle, square } from './rectangle';
import { circle } from './circle';
import { svgPath } from './svgPath';
import { diamond } from './diamond';
import { triangle, triangleAnchors } from './triangle';
import { pentagon, pentagonAnchors } from './pentagon';
import { pentagram, pentagramAnchors } from './pentagram';
import { hexagon } from './hexagon';
import { leftArrow, rightArrow, twowayArrow } from './arrow';
import { message } from './message';
import { cloud } from './cloud';
import { file } from './file';
import { people } from './people';
import { line } from './line';
import { iframe } from './iframe';
import { video } from './video';
import { gif } from './gif';
import { mindNode, mindNodeAnchors } from './mindNode';
import { mindLine, mindLineAnchors } from './mindLine';
export function commonPens() {
    return {
        rectangle: rectangle,
        square: square,
        circle: circle,
        svgPath: svgPath,
        diamond: diamond,
        triangle: triangle,
        pentagon: pentagon,
        pentagram: pentagram,
        hexagon: hexagon,
        leftArrow: leftArrow,
        rightArrow: rightArrow,
        twowayArrow: twowayArrow,
        message: message,
        cloud: cloud,
        file: file,
        people: people,
        line: line,
        iframe: iframe,
        video: video,
        gif: gif,
        mindNode: mindNode,
        mindLine: mindLine,
    };
}
export function commonAnchors() {
    return {
        triangle: triangleAnchors,
        pentagon: pentagonAnchors,
        pentagram: pentagramAnchors,
        mindNode: mindNodeAnchors,
        mindLine: mindLineAnchors,
    };
}
//# sourceMappingURL=index.js.map