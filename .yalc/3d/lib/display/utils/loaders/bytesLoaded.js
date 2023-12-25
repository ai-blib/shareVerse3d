const bytesLoaded = [0];
const loadedBytesMap = new Map();
const progressChangedEventListeners = new Set();
export const addLoadedBytesChangedEventListeners = (listener) => {
    progressChangedEventListeners.add(listener);
};
export const removeLoadedBytesChangedEventListeners = (listener) => {
    progressChangedEventListeners.delete(listener);
};
export default bytesLoaded;
export const handleProgress = (url) => (e) => {
    loadedBytesMap.set(url, e.loaded);
    bytesLoaded[0] = [...loadedBytesMap.values()].reduce((acc, cur) => acc + cur, 0);
    progressChangedEventListeners.forEach((listener) => {
        try {
            listener(bytesLoaded[0]);
        }
        finally {
        }
    });
};
//# sourceMappingURL=bytesLoaded.js.map