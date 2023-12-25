import { getExtensionType } from "@lincode/filetypes";
import { addLoadedBytesChangedEventListeners, removeLoadedBytesChangedEventListeners } from "../display/utils/loaders/bytesLoaded";
import loadTexturePromise from "../display/utils/loaders/loadTexturePromise";
import { getLoadingCount } from "../states/useLoadingCount";
const preloadModelPromise = (src) => new Promise(async (resolve) => {
    const { default: Model } = await import("../display/Model");
    const model = new Model(true);
    model.src = src;
    model.onLoad = resolve;
});
export default async (urls, total, onProgress) => {
    const promises = [];
    let totalBytes = 0;
    if (typeof total === "number")
        totalBytes = total;
    else {
        total = total.toLowerCase();
        if (total.endsWith("kb"))
            totalBytes = parseFloat(total) * 1024;
        else if (total.endsWith("mb"))
            totalBytes = parseFloat(total) * 1024 * 1024;
        else if (total.endsWith("gb"))
            totalBytes = parseFloat(total) * 1024 * 1024 * 1024;
        else
            throw new Error("Invalid preload total value: " + total);
    }
    const handleLoadedBytesChanged = (bytes) => {
        onProgress?.(totalBytes <= 0 ? 0 : Math.min((bytes / totalBytes) * 100, 99));
    };
    addLoadedBytesChangedEventListeners(handleLoadedBytesChanged);
    for (const src of urls) {
        const chunkFile = src.includes('json');
        const filetype = getExtensionType(src);
        if (filetype === "image")
            promises.push(loadTexturePromise(src));
        else if (filetype === "model" || chunkFile)
            promises.push(preloadModelPromise(src));
    }
    await Promise.all(promises);
    removeLoadedBytesChangedEventListeners(handleLoadedBytesChanged);
    await new Promise((resolve) => {
        getLoadingCount((count, handle) => {
            if (count > 0)
                return;
            handle.cancel();
            resolve();
        });
    });
    onProgress?.(100);
};
//# sourceMappingURL=preload.js.map