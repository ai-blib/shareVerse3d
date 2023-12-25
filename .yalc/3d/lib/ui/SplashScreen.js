import Appendable from "../api/core/Appendable";
import { uiContainer } from "../engine/renderLoop/renderSetup";
import { splashScreenDefaults, splashScreenSchema } from "../interface/ISplashScreen";
import createElement from "../utils/createElement";
import getPrivateValue from "../utils/getPrivateValue";
let initialized = false;
const initCSS = () => {
    if (initialized)
        return;
    initialized = true;
    const style = createElement(`
        <style>
            .lingo3d-splashscreen {
                position: absolute;
                top: 0px;
                left: 0px;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                background: black;
            }
        </style>
    `);
    document.head.appendChild(style);
};
export default class SplashScreen extends Appendable {
    static componentName = "splashScreen";
    static defaults = splashScreenDefaults;
    static schema = splashScreenSchema;
    splashScreen = createElement(`<div class="lingo3d-splashscreen" style="opacity: 1"></div>`);
    textContainer = document.createElement("div");
    constructor() {
        super();
        initCSS();
        uiContainer.appendChild(this.splashScreen);
        this.splashScreen.appendChild(this.textContainer);
        this.then(() => this.splashScreen.remove());
    }
    get opacity() {
        return Number(this.splashScreen.style.opacity);
    }
    set opacity(value) {
        this.splashScreen.style.opacity = value + "";
    }
    get textCenter() {
        return this.textContainer.style.textAlign === "center";
    }
    set textCenter(value) {
        this.textContainer.style.textAlign = value ? "center" : "";
    }
    append(child) {
        this._append(child);
        this.textContainer.appendChild(getPrivateValue(child, "el"));
    }
    attach(child) {
        this.append(child);
    }
}
//# sourceMappingURL=SplashScreen.js.map