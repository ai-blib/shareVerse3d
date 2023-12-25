import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import Toolbar from "../Toolbar";
import SceneGraph from "../SceneGraph";
import Editor from "../Editor";
import Library from "../Library";
import HUD from "../HUD";
import { useEffect, useRef } from "preact/hooks";
import settings from "../../api/settings";
import Stats from "../Stats";
import WorldBar from "../WorldBar";
import Panels from "../Panels";
import { DEBUG } from "../../globals";
import useSyncState from "../hooks/useSyncState";
import { getStats } from "../../states/useStats";
const LingoEditor = () => {
    const elRef = useRef(null);
    useEffect(() => {
        const el = elRef.current;
        if (el)
            settings.autoMount = el;
    }, []);
    const stats = useSyncState(getStats);
    return (_jsxs("div", { className: "lingo3d-ui lingo3d-lingoeditor lingo3d-absfull", onContextMenu: DEBUG ? undefined : (e) => e.preventDefault(), children: [_jsx(Toolbar, {}), _jsx(SceneGraph, {}), _jsx(Editor, {}), _jsx(Library, {}), _jsx(Panels, {}), _jsx(WorldBar, {}), _jsx("div", { className: "lingo3d-world", ref: elRef, style: { height: "100%", flexGrow: 1, position: "relative" } }), stats && _jsx(Stats, {}), _jsx(HUD, {})] }));
};
export default LingoEditor;
//# sourceMappingURL=index.js.map