import { TextureLoader, DataTexture } from "three";
import { forceGet } from "@lincode/utils";
import { handleProgress } from "./bytesLoaded";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import Events from "@lincode/events";
import { decreaseLoadingUnpkgCount, increaseLoadingUnpkgCount } from "../../../states/useLoadingUnpkgCount";
import * as THREE from "three";
const cache = new Map();
const textureLoader = new TextureLoader();
const rgbeLoader = new RGBELoader();
const loaded = new Events();
export default (url, onLoad) => {
    onLoad && loaded.once(url, () => queueMicrotask(onLoad));
    const texture = forceGet(cache, url, () => {
        const unpkg = url.startsWith("https://unpkg.com/");
        unpkg && increaseLoadingUnpkgCount();
        const hdr = url.toLowerCase().endsWith(".hdr");
        const loader = hdr ? rgbeLoader : textureLoader;
        return loader.load(url, (texture) => {
            texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
            ;
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
//# sourceMappingURL=loadTexture.js.map