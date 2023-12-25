import { onAfterRender } from "../events/onAfterRender";
import { getRenderer } from "../states/useRenderer";
export default {
    toBlob: async () => {
        return new Promise((resolve) => {
            onAfterRender(() => {
                getRenderer()?.domElement.toBlob((blob) => blob && resolve(blob));
            }, true);
        });
    },
    toDataURL: async (type, quality) => {
        return new Promise((resolve) => {
            onAfterRender(() => {
                const renderer = getRenderer();
                renderer &&
                    resolve(renderer.domElement.toDataURL(type, quality));
            }, true);
        });
    }
};
//# sourceMappingURL=screenshot.js.map