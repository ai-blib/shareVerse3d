import { hiddenAppendables } from "../../../api/core/collections";
import { EDITOR_URL } from "../../../globals";
import Sprite from "../../Sprite";
export default class HelperSprite extends Sprite {
    constructor(type) {
        super();
        this.texture = `${EDITOR_URL}${type}Sprite.png`;
        this.scale = 0.5;
        this.castShadow = false;
        this.receiveShadow = false;
        hiddenAppendables.add(this);
    }
}
//# sourceMappingURL=HelperSprite.js.map