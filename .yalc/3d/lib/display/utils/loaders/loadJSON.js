import { assert, forceGet } from "@lincode/utils";
import { FileLoader } from "three";
import { decreaseLoadingUnpkgCount, increaseLoadingUnpkgCount } from "../../../states/useLoadingUnpkgCount";
import { handleProgress } from "./bytesLoaded";
const cache = new Map();
const loader = new FileLoader();
export default (url) => forceGet(cache, url, () => new Promise((resolve, reject) => {
    const unpkg = url.startsWith("https://unpkg.com/");
    unpkg && increaseLoadingUnpkgCount();
    loader.load(url, (data) => {
        try {
            assert(typeof data === "string");
            const parsed = JSON.parse(data);
            unpkg && decreaseLoadingUnpkgCount();
            resolve(parsed);
        }
        catch { }
    }, handleProgress(url), reject);
}));
//# sourceMappingURL=loadJSON.js.map