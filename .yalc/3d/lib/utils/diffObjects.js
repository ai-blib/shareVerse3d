import { get, has } from "@lincode/utils";
import traverseObject from "./traverseObject";
export default (objOld, obj) => {
    const changes = [];
    const deletes = [];
    traverseObject(obj, (k, v, _, path) => !(v && typeof v === "object") &&
        get(objOld, path) !== v &&
        changes.push([path, v]));
    traverseObject(objOld, (k, v, _, path) => !has(obj, path) && deletes.push(path));
    return { changes, deletes };
};
//# sourceMappingURL=diffObjects.js.map