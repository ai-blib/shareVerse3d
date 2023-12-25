import { MeshBVH } from "three-mesh-bvh";
declare const getBVHMap: import("@lincode/reactivity").GetGlobalState<MeshBVH[]>;
declare const pushBVHMap: (val: MeshBVH) => void;
declare const pullBVHMap: (val: MeshBVH) => void;
export { pushBVHMap, pullBVHMap, getBVHMap };
