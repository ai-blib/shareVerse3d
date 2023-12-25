import { texturedBasicSchema } from "../../../interface/ITexturedBasic";
import { attachBasicMaterialManager } from "../../material/attachMaterialManager";
class TexturedBasicMixin {
}
Object.assign(TexturedBasicMixin.prototype, {
    getMaterial() {
        return attachBasicMaterialManager(this.nativeObject3d, this)[0];
    }
});
for (const name of Object.keys(texturedBasicSchema))
    Object.defineProperty(TexturedBasicMixin.prototype, name, {
        get() {
            return this.getMaterial()?.[name];
        },
        set(val) {
            const material = this.getMaterial();
            if (!material)
                return;
            material[name] = val;
        }
    });
export default TexturedBasicMixin;
//# sourceMappingURL=TexturedBasicMixin.js.map