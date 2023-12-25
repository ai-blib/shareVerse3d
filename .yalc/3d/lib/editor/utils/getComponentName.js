import { upperFirst } from "@lincode/utils";
import unsafeGetValue from "../../utils/unsafeGetValue";
export default (appendable) => unsafeGetValue(appendable, "name") ||
    upperFirst(unsafeGetValue(appendable.constructor, "componentName"));
//# sourceMappingURL=getComponentName.js.map