import { MeshStandardMaterial, Object3D } from "three";
import Appendable from "../../api/core/Appendable";
import BasicMaterialManager from "./BasicMaterialManager";
import StandardMaterialManager from "./StandardMaterialManager";
export declare const attachStandardMaterialManager: (target: Object3D, manager: Appendable, recursive?: boolean, result?: Array<StandardMaterialManager>, recursiveClonedMap?: WeakMap<MeshStandardMaterial, MeshStandardMaterial>, material?: MeshStandardMaterial | undefined) => StandardMaterialManager[];
export declare const attachBasicMaterialManager: (target: Object3D, manager: Appendable) => BasicMaterialManager<any>[];
