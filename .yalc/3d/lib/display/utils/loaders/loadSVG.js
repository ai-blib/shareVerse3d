import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { forceGet } from "@lincode/utils";
import { handleProgress } from "./bytesLoaded";
import { decreaseLoadingUnpkgCount, increaseLoadingUnpkgCount } from "../../../states/useLoadingUnpkgCount";
const cache = new Map();
export const loader = new SVGLoader();
export default (url) => forceGet(cache, url, () => new Promise((resolve, reject) => {
    const unpkg = url.startsWith("https://unpkg.com/");
    unpkg && increaseLoadingUnpkgCount();
    loader.load(url, (svg) => {
        unpkg && decreaseLoadingUnpkgCount();
        resolve(svg);
    }, handleProgress(url), reject);
}));
//# sourceMappingURL=loadSVG.js.map