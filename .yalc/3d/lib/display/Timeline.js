import { Reactive } from "@lincode/reactivity";
import { PropertyBinding } from "three";
import { uuidMap } from "../api/core/collections";
import { timelineDefaults, timelineSchema } from "../interface/ITimeline";
import AnimationManager from "./core/AnimatedObjectManager/AnimationManager";
const findNode = PropertyBinding.findNode;
PropertyBinding.findNode = (root, nodeName) => {
    if (uuidMap.has(nodeName))
        return uuidMap.get(nodeName);
    return findNode(root, nodeName);
};
export default class Timeline extends AnimationManager {
    static componentName = "timeline";
    static defaults = timelineDefaults;
    static schema = timelineSchema;
    constructor() {
        super("", undefined, {}, new Reactive(0), new Reactive(undefined), undefined, true);
    }
}
//# sourceMappingURL=Timeline.js.map