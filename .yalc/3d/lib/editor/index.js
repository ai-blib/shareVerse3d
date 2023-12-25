import { jsx as _jsx } from "preact/jsx-runtime";
import "./Editor";
import "./SceneGraph";
import "./Toolbar";
import "./Library";
import "./HUD";
import LingoEditor from "./LingoEditor";
import { Disposable } from "@lincode/promiselikes";
import { render } from "preact";
import PreactTweakPane from "./TweakPane";
import PaneInput from "./TweakPane/PaneInput";
import { Reactive } from "@lincode/reactivity";
export default class extends Disposable {
    constructor() {
        super();
        const el = document.createElement("div");
        document.body.appendChild(el);
        render(_jsx(LingoEditor, {}), el);
        this.then(() => {
            el.remove();
            render(undefined, el);
        });
    }
}
export class TweakPane extends Disposable {
    constructor() {
        super();
        const el = document.createElement("div");
        document.body.appendChild(el);
        this.watch(
        // @ts-ignore
        this.inputState.get(() => render(_jsx(PreactTweakPane, { children: this.inputState.get().map((option) => (_jsx(PaneInput, { ...option }))) }), el)));
        this.then(() => {
            el.remove();
            render(undefined, el);
        });
    }
    inputState = new Reactive([]);
    addInput(options) {
        this.inputState.set([...this.inputState.get(), options]);
        return this;
    }
}
//# sourceMappingURL=index.js.map