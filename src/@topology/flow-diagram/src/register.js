import { flowComment, flowCommentAnchors } from './comment';
import { flowData } from './data';
import { flowDb } from './db';
import { flowDisplay } from './display';
import { flowDocument, flowDocumentAnchors } from './document';
import { flowExternStorage } from './externStorage';
import { flowInternalStorage } from './internalStorage';
import { flowManually, flowManuallyAnchors } from './manually';
import { flowParallel, flowParallelAnchors } from './parallel';
import { flowQueue } from './queue';
import { flowSubprocess } from './subprocess';
export function flowPens() {
    return {
        flowComment: flowComment,
        flowData: flowData,
        flowDb: flowDb,
        flowDisplay: flowDisplay,
        flowDocument: flowDocument,
        flowExternStorage: flowExternStorage,
        flowInternalStorage: flowInternalStorage,
        flowManually: flowManually,
        flowParallel: flowParallel,
        flowQueue: flowQueue,
        flowSubprocess: flowSubprocess,
    };
}
export function flowAnchors() {
    return {
        flowDocument: flowDocumentAnchors,
        flowManually: flowManuallyAnchors,
        flowParallel: flowParallelAnchors,
        flowComment: flowCommentAnchors,
    };
}
//# sourceMappingURL=register.js.map