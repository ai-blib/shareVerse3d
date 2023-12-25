import store from '@lincode/reactivity';
import { throttleTrailing } from '@lincode/utils';
import { getLoadingCount } from './useLoadingCount';
export const [setFirstLoad, getFirstLoad] = store(false);
const handle = getLoadingCount(throttleTrailing((loadingCount) => {
    if (loadingCount)
        return;
    handle.cancel();
    setFirstLoad(true);
}, 100));
//# sourceMappingURL=useFirstLoad.js.map