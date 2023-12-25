import store from "@lincode/reactivity";
import { getSelectionTarget } from "./useSelectionTarget";
export const [setSelectionNativeTarget, getSelectionNativeTarget] = store(undefined);
getSelectionTarget(() => setSelectionNativeTarget(undefined));
//# sourceMappingURL=useSelectionNativeTarget.js.map