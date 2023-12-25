import Appendable from "../api/core/Appendable";
import { uiContainer } from "../engine/renderLoop/renderSetup";
import { textDefaults, textSchema } from "../interface/IText";
import createElement from "../utils/createElement";
export default class Text extends Appendable {
    static componentName = "text";
    static defaults = textDefaults;
    static schema = textSchema;
    el = createElement(`<div style="opacity: 1">text</div>`);
    constructor() {
        super();
        uiContainer.appendChild(this.el);
        this.then(() => this.el.remove());
    }
    get opacity() {
        return Number(this.el.style.opacity);
    }
    set opacity(value) {
        this.el.style.opacity = value + "";
    }
    get value() {
        return this.el.textContent ?? "";
    }
    set value(value) {
        this.el.textContent = value;
    }
}
//# sourceMappingURL=Text.js.map