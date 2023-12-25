import { omit } from "@lincode/utils";
import createObject from "./createObject";
import Loaded from "../../display/core/Loaded";
import nonSerializedProperties from "./nonSerializedProperties";
const nodeToObjectManager = (node, loadedResolvables) => {
    if (node.type === "lingo3d")
        return;
    const object = createObject(node.type);
    loadedResolvables &&
        object instanceof Loaded &&
        loadedResolvables.push(object.loaded);
    Object.assign(object, omit(node, nonSerializedProperties));
    node.children
        ?.map((n) => nodeToObjectManager(n, loadedResolvables))
        .forEach((c) => c && object.append(c));
    return object;
};
export default (graph, loadedResolvables) => graph.map((n) => nodeToObjectManager(n, loadedResolvables));
//# sourceMappingURL=deserialize.js.map