import Appendable from "../api/core/Appendable";
import { ChangedProperties } from "../display/utils/getChangedProperties";
export type Changes = Array<readonly [Appendable, ChangedProperties]>;
export declare const emitEditorChanges: any, onEditorChanges: any;
