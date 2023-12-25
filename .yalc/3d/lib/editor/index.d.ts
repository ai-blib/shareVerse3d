import "./Editor";
import "./SceneGraph";
import "./Toolbar";
import "./Library";
import "./HUD";
import { Disposable } from "@lincode/promiselikes";
import { PaneInputProps } from "./TweakPane/PaneInput";
export default class extends Disposable {
    constructor();
}
export declare class TweakPane extends Disposable {
    constructor();
    private inputState;
    addInput(options: PaneInputProps): this;
}
