import { Vector3 } from "three";
import { box3 } from "./reusables";
const cache = new Map();
export default (gltf, src) => {
    if (cache.has(src))
        return cache.get(src);
    const measuredSize = new Vector3();
    box3.setFromObject(gltf).getSize(measuredSize);
    cache.set(src, measuredSize);
    return measuredSize;
};
//# sourceMappingURL=measure.js.map