import getCenter from "./getCenter";
import measure from "./measure";
const cache = new Map();
export default (gltf, src) => {
    if (cache.has(src)) {
        const [ratio, center, result] = cache.get(src);
        gltf.scale.multiplyScalar(ratio);
        gltf.position.copy(center).multiplyScalar(-1);
        return result;
    }
    const measuredSize = measure(gltf, src).clone();
    const ratio = 1 / measuredSize.y;
    gltf.scale.multiplyScalar(ratio);
    const center = getCenter(gltf);
    gltf.position.copy(center).multiplyScalar(-1);
    measuredSize.multiplyScalar(ratio);
    cache.set(src, [ratio, center, measuredSize]);
    return measuredSize;
};
//# sourceMappingURL=fit.js.map