import { TextureLoader, DataTexture } from "three";
import { forceGet } from "@lincode/utils";
import { handleProgress } from "./bytesLoaded";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import Events from "@lincode/events";
import { decreaseLoadingUnpkgCount, increaseLoadingUnpkgCount } from "../../../states/useLoadingUnpkgCount";
import * as THREE from "three";
import LoadModelCache from "../MetaverseModelFun";
const cache = new Map();
const textureLoader = new TextureLoader();
const rgbeLoader = new RGBELoader();
const loaded = new Events();
export default async (url, onLoad) => {
    onLoad && loaded.once(url, () => queueMicrotask(onLoad));
    // @ts-ignore
    const texture = await forceGet(cache, url, async () => {
        const unpkg = url.startsWith("https://unpkg.com/");
        unpkg && increaseLoadingUnpkgCount();
        const hdr = url.toLowerCase().endsWith(".hdr") ||
            url.toLowerCase().includes("hdr");
        const loader = hdr ? rgbeLoader : textureLoader;
        const blob = await LoadModelCache.checkUrl(url);
        debugger;
        console.log(blob, "blob");
        return loader.load(blob, (texture) => {
            console.log();
            texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
            texture.encoding = THREE.sRGBEncoding;
            texture.flipY = true;
            texture.magFilter = THREE.NearestFilter;
            texture.needsUpdate = true;
            texture.anisotropy = 20;
            texture.minFilter = THREE.NearestFilter;
            texture.generateMipmaps = false;
            loaded.setState(url);
            unpkg && decreaseLoadingUnpkgCount();
        }, handleProgress(url));
    });
    return texture.constructor === DataTexture ? texture : texture.clone();
};
//# sourceMappingURL=loadAsyncTexture.js.map