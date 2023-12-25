import { SceneGraphNode } from "./types";
import Loaded from "../../display/core/Loaded";
import { Object3D } from "three";
import Reresolvable from "../../display/core/utils/Reresolvable";
declare const _default: (graph: Array<SceneGraphNode>, loadedResolvables?: Array<Reresolvable<Object3D>>) => (import("../..").Object<Object3D<import("three").Event>> | Loaded<any> | undefined)[];
export default _default;
