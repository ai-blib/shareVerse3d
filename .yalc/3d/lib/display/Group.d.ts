import { Group as ThreeGroup } from "three";
import IGroup from "../interface/IGroup";
import VisibleObjectManager from "./core/VisibleObjectManager";
export default class Group extends VisibleObjectManager<ThreeGroup> implements IGroup {
    static componentName: string;
    static defaults: Partial<import("../interface/utils/Defaults").default<IGroup>>;
    static schema: Required<import("../interface/utils/extractProps").ExtractProps<IGroup>>;
    constructor();
}
