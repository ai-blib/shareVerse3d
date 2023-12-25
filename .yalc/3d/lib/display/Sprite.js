import { applyMixins } from "@lincode/utils";
import { Sprite as ThreeSprite, SpriteMaterial } from "three";
import TexturedBasicMixin from "./core/mixins/TexturedBasicMixin";
import { spriteDefaults, spriteSchema } from "../interface/ISprite";
import VisibleObjectManager from "./core/VisibleObjectManager";
const material = new SpriteMaterial({ transparent: true });
class Sprite extends VisibleObjectManager {
    static componentName = "sprite";
    static defaults = spriteDefaults;
    static schema = spriteSchema;
    constructor() {
        super(new ThreeSprite(material));
    }
    get depth() {
        return 0;
    }
    set depth(_) { }
    get scaleZ() {
        return 0;
    }
    set scaleZ(_) { }
}
applyMixins(Sprite, [TexturedBasicMixin]);
export default Sprite;
//# sourceMappingURL=Sprite.js.map