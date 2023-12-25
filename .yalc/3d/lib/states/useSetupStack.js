import store, { push, pull, refresh } from '@lincode/reactivity';
import { throttleTrailing } from '@lincode/utils';
export const [setSetupStack, getSetupStack] = store([]);
export const pushSetupStack = push(setSetupStack, getSetupStack);
export const pullSetupStack = pull(setSetupStack, getSetupStack);
export const refreshSetupStack = throttleTrailing(refresh(setSetupStack, getSetupStack));
//# sourceMappingURL=useSetupStack.js.map