import store, { push, pull } from "@lincode/reactivity";
export const [setSkyboxStack, getSkyboxStack] = store([]);
export const pushSkyboxStack = push(setSkyboxStack, getSkyboxStack);
export const pullSkyboxStack = pull(setSkyboxStack, getSkyboxStack);
//# sourceMappingURL=useSkyboxStack.js.map