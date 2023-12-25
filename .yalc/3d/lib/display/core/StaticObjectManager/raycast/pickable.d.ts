import { Object3D, Intersection } from "three";
import StaticObjectManager from "..";
import { MouseEventName } from "../../../../api/mouse";
import { LingoMouseEvent } from "../../../../interface/IMouse";
export declare const raycast: (x: number, y: number, candidates: Set<Object3D>) => Intersection | undefined;
type Then = (obj: StaticObjectManager, e: LingoMouseEvent) => void;
declare const _default: (name: MouseEventName | Array<MouseEventName>, candidates: Set<Object3D>, then: Then) => any;
export default _default;
