import Appendable from "../core/Appendable";
import { SceneGraphNode } from "./types";
declare const _default: (versionStamp?: boolean, children?: Array<Appendable> | Set<Appendable> | Appendable, skipUUID?: boolean) => Promise<SceneGraphNode[]>;
export default _default;
