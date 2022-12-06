export function lockedError(store) {
    if (store.data.locked) {
        throw new Error('canvas is locked');
    }
}
//# sourceMappingURL=error.js.map