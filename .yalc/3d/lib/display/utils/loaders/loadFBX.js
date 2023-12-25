import { FBXLoader } from "./loaders/FBXLoader";
import { Bone, Light, sRGBEncoding } from "three";
import { forceGet } from "@lincode/utils";
import cloneSkinnedMesh from "../cloneSkinnedMesh";
import { handleProgress } from "./bytesLoaded";
import { decreaseLoadingUnpkgCount, increaseLoadingUnpkgCount } from "../../../states/useLoadingUnpkgCount";
const cache = new Map();
const loader = new FBXLoader();
export default async (url, clone) => {
    const [group, noBone] = await forceGet(cache, url, () => new Promise((resolve, reject) => {
        const unpkg = url.startsWith("https://unpkg.com/");
        unpkg && increaseLoadingUnpkgCount();
        loader.load(url, (group) => {
            const lights = [];
            let noBone = true;
            group.traverse((child) => {
                if (child instanceof Light)
                    lights.push(child);
                else if (noBone && child instanceof Bone)
                    noBone = false;
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    if (child.material.map) {
                        child.material.map.encoding = sRGBEncoding;
                        child.material.map.anisotropy = 1;
                    }
                    if (child.material.emissiveMap) {
                        child.material.emissiveMap.encoding = sRGBEncoding;
                        child.material.emissiveMap = child.material.map;
                    }
                    if (child.material.emissive) {
                        child.material.emissive = child.material.color;
                    }
                    if (child.material.map || child.material.emissiveMap) {
                        child.material.needsUpdate = true;
                    }
                    // if(envMap)
                    // {
                    //     child.material.envMap = envMap;
                    //     child.material.envMapIntensity = 1;
                    // }
                }
                child.castShadow = true;
                child.receiveShadow = true;
            });
            for (const light of lights)
                light.parent?.remove(light);
            unpkg && decreaseLoadingUnpkgCount();
            resolve([group, noBone]);
        }, handleProgress(url), reject);
    }));
    if (clone)
        return cloneSkinnedMesh(group, noBone);
    return group;
};
//# sourceMappingURL=loadFBX.js.map