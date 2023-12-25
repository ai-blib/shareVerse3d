import { forceGet } from "@lincode/utils";
import loadTexture from "./loadTexture";
import { decreaseLoadingUnpkgCount, increaseLoadingUnpkgCount } from "../../../states/useLoadingUnpkgCount";
const cache = new Map();
export default (url) => forceGet(cache, url, () => new Promise((resolve) => {
    const unpkg = url.startsWith("https://unpkg.com/");
    unpkg && increaseLoadingUnpkgCount();
    const texture = loadTexture(url, () => {
        unpkg && decreaseLoadingUnpkgCount();
        resolve(texture);
    });
}));
//# sourceMappingURL=loadTexturePromise.js.map