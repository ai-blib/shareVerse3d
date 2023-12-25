import { applyMixins } from "@lincode/utils";
import { Mesh } from "three";
import TexturedBasicMixin from "./mixins/TexturedBasicMixin";
import TexturedStandardMixin from "./mixins/TexturedStandardMixin";
import { primitiveDefaults, primitiveSchema } from "../../interface/IPrimitive";
import { standardMaterial } from "../utils/reusables";
import VisibleObjectManager from "./VisibleObjectManager";
class Primitive extends VisibleObjectManager {
    static defaults = primitiveDefaults;
    static schema = primitiveSchema;
    constructor(geometry) {
        const mesh = new Mesh(geometry, standardMaterial);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        super(mesh);
    }
}
applyMixins(Primitive, [TexturedStandardMixin, TexturedBasicMixin]);
export default Primitive;
//# sourceMappingURL=Primitive.js.map