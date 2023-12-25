import { Reactive } from "@lincode/reactivity";
import Appendable from "../api/core/Appendable";
import { uiContainer } from "../engine/renderLoop/renderSetup";
import { TEXTURES_URL } from "../globals";
import { reticleDefaults, reticleSchema } from "../interface/IReticle";
import createElement from "../utils/createElement";
export default class Reticle extends Appendable {
    static componentName = "reticle";
    static defaults = reticleDefaults;
    static schema = reticleSchema;
    constructor() {
        super();
        this.createEffect(() => {
            const variant = this.variantState.get();
            const imageElement = createElement(`
                <img
                  src="${TEXTURES_URL}reticle${variant}.png"
                  style="position: absolute; left: 50%; top: -1%; transform: translate(-50%, -50%); pointer-events: none; user-select: none; width: 20px;"
                ></img>
            `);
            uiContainer.appendChild(imageElement);
            return () => {
                imageElement.remove();
            };
        }, [this.variantState.get]);
    }
    variantState = new Reactive(1);
    get variant() {
        return this.variantState.get();
    }
    set variant(value) {
        this.variantState.set(value);
    }
}
//# sourceMappingURL=Reticle.js.map