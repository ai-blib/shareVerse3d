import Appendable from "../../api/core/Appendable";
import { FrameValue } from "../../interface/IAnimationManager";
export declare const saveProperties: (instance: Appendable) => void;
export type ChangedProperties = Array<[string, FrameValue, FrameValue]>;
declare const _default: (instance: Appendable) => ChangedProperties;
export default _default;
