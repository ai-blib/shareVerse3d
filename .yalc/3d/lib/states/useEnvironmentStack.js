import store, { push, pull, refresh } from "@lincode/reactivity";
const [setEnvironmentStack, getEnvironmentStack] = store([]);
export { getEnvironmentStack };
export const pushEnvironmentStack = push(setEnvironmentStack, getEnvironmentStack);
export const pullEnvironmentStack = pull(setEnvironmentStack, getEnvironmentStack);
export const refreshEnvironmentStack = refresh(setEnvironmentStack, getEnvironmentStack);
//# sourceMappingURL=useEnvironmentStack.js.map