import TexturedBasicMixin from "../../display/core/mixins/TexturedBasicMixin";
import TexturedStandardMixin from "../../display/core/mixins/TexturedStandardMixin";
import ObjectManager from "../../display/core/ObjectManager";
declare const _default: <T>(onDrop: (draggingItem: T, hitManager?: ObjectManager | TexturedBasicMixin | TexturedStandardMixin) => ObjectManager | undefined) => (val: T | undefined) => T | undefined;
export default _default;
export declare const setDragImage: (e: DragEvent) => void;
