import store, { pull, push } from "@lincode/reactivity";
import mainCamera from "../engine/mainCamera";
export const [setCameraStack, getCameraStack] = store([mainCamera]);
export const pushCameraStack = push(setCameraStack, getCameraStack);
export const pullCameraStack = pull(setCameraStack, getCameraStack);
//# sourceMappingURL=useCameraStack.js.map