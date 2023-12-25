import { forceGet } from "@lincode/utils";
import { Sphere } from "../..";
import { unselectableSet } from "../core/StaticObjectManager/raycast/selectionCandidates";
const sphereMap = new Map();
export default (name, pt, properties) => {
    const sphere = forceGet(sphereMap, name, () => {
        const sphere = Object.assign(new Sphere(), properties);
        unselectableSet.add(sphere);
        return sphere;
    });
    sphere.placeAt(pt);
    return sphere;
};
//# sourceMappingURL=visualize.js.map