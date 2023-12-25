import store from "@lincode/reactivity";
import { HEIGHT, WIDTH } from "../globals";
const [_setResolution, getResolution] = store([WIDTH, HEIGHT]);
export { getResolution };
export const setResolution = ([w, h]) => _setResolution([Math.max(w, 1), Math.max(h, 1)]);
//# sourceMappingURL=useResolution.js.map