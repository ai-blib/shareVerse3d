import { event } from "@lincode/events";
import { keyboardDefaults, keyboardSchema } from "../interface/IKeyboard";
import { createEffect } from "@lincode/reactivity";
import { onKeyClear } from "../events/onKeyClear";
import { onBeforeRender } from "../events/onBeforeRender";
import { getEditorMounted } from "../states/useEditorMounted";
import { getCameraRendered } from "../states/useCameraRendered";
import mainCamera from "../engine/mainCamera";
import { appendableRoot } from "./core/collections";
import { getEditorPlay } from "../states/useEditorPlay";
import Appendable from "./core/Appendable";
const [emitDown, onDown] = event();
const [emitUp, onUp] = event();
const [emitPress, onPress] = event();
export const isPressed = new Set();
const processKey = (str) => {
    str = str.length === 1 ? str.toLocaleLowerCase() : str;
    if (str === " ")
        str = "Space";
    return str;
};
createEffect(() => {
    if (!getEditorPlay() ||
        (getEditorMounted() && getCameraRendered() === mainCamera))
        return;
    const handle = onBeforeRender(() => isPressed.size > 0 && emitPress());
    const handleKeyDown = (e) => {
        const key = processKey(e.key);
        isPressed.add(key);
        emitDown(key);
    };
    const handleKeyUp = (e) => {
        const key = processKey(e.key);
        isPressed.delete(key);
        emitUp(key);
        !isPressed.size && emitPress();
    };
    handle.watch(onKeyClear(() => {
        if (!isPressed.size)
            return;
        const pressed = [...isPressed];
        isPressed.clear();
        for (const key of pressed)
            emitUp(key);
    }));
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
        handle.cancel();
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
    };
}, [getEditorPlay, getEditorMounted, getCameraRendered]);
export class Keyboard extends Appendable {
    static componentName = "keyboard";
    static defaults = keyboardDefaults;
    static schema = keyboardSchema;
    onKeyPress;
    onKeyUp;
    onKeyDown;
    constructor() {
        super();
        this.watch(
        // @ts-ignore
        onPress(() => {
            if (!this.onKeyPress)
                return;
            if (!isPressed.size) {
                this.onKeyPress("", isPressed);
                return;
            }
            for (const key of isPressed)
                this.onKeyPress(key, isPressed);
        }));
        // @ts-ignore
        this.watch(onUp((key) => this.onKeyUp?.(key, isPressed)));
        // @ts-ignore
        this.watch(onDown((key) => this.onKeyDown?.(key, isPressed)));
    }
}
const keyboard = new Keyboard();
appendableRoot.delete(keyboard);
export default keyboard;
//# sourceMappingURL=keyboard.js.map