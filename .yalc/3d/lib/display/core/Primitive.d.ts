import { Mesh, BufferGeometry } from "three";
import TexturedBasicMixin from "./mixins/TexturedBasicMixin";
import TexturedStandardMixin from "./mixins/TexturedStandardMixin";
import IPrimitive from "../../interface/IPrimitive";
import VisibleObjectManager from "./VisibleObjectManager";
declare abstract class Primitive extends VisibleObjectManager<Mesh> implements IPrimitive {
    static defaults: Partial<import("../../interface/utils/Defaults").default<IPrimitive>>;
    static schema: Required<import("../../interface/utils/extractProps").ExtractProps<IPrimitive>>;
    constructor(geometry: BufferGeometry);
}
interface Primitive extends VisibleObjectManager<Mesh>, TexturedBasicMixin, TexturedStandardMixin {
}
export default Primitive;
