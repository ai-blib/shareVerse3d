import store, { push, pull } from "@lincode/reactivity";
export const [setCameraList, getCameraList] = store([]);
export const pushCameraList = push(setCameraList, getCameraList);
export const pullCameraList = pull(setCameraList, getCameraList);
//# sourceMappingURL=useCameraList.js.map