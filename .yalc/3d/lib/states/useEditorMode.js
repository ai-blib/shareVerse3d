import store, { createEffect } from "@lincode/reactivity";
import mainCamera from "../engine/mainCamera";
import { getCameraRendered } from "./useCameraRendered";
import { getEditorMounted } from "./useEditorMounted";
export const [setEditorMode, getEditorMode] = store("play");
createEffect(() => {
    setEditorMode(getCameraRendered() === mainCamera && getEditorMounted()
        ? "translate"
        : "play");
}, [getCameraRendered, getEditorMounted]);
//# sourceMappingURL=useEditorMode.js.map