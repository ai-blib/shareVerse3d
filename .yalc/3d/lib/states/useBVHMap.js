import store, { push, pull } from "@lincode/reactivity";
const [setBVHMap, getBVHMap] = store([]);
const pushBVHMap = push(setBVHMap, getBVHMap);
const pullBVHMap = pull(setBVHMap, getBVHMap);
export { pushBVHMap, pullBVHMap, getBVHMap };
//# sourceMappingURL=useBVHMap.js.map