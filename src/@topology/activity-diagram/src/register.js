import { rectangle } from '@topology/core/src/diagrams';
import { activityFinal } from './final';
import { swimlaneH } from './swimlaneH';
import { swimlaneV } from './swimlaneV';
export function activityDiagram() {
    return {
        forkV: rectangle,
        forkH: rectangle,
        swimlaneH: swimlaneH,
        swimlaneV: swimlaneV,
    };
}
export function activityDiagramByCtx() {
    return {
        activityFinal: activityFinal,
    };
}
//# sourceMappingURL=register.js.map