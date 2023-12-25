import { CubeTextureLoader } from "three";
import { forceGet } from "@lincode/utils";
import { handleProgress } from "./bytesLoaded";
const cache = new Map();
const loader = new CubeTextureLoader();
export default (urls) => forceGet(cache, urls.join(","), () => loader.load(urls, undefined, handleProgress(urls.join(","))));
//# sourceMappingURL=loadCubeTexture.js.map