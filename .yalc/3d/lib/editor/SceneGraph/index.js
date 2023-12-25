import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "preact/jsx-runtime";
import { emitSelectionTarget } from "../../events/onSelectionTarget";
import SceneGraphContextMenu from "./SceneGraphContextMenu";
import "./retargetBones";
import useInitCSS from "../hooks/useInitCSS";
import useClickable from "../hooks/useClickable";
import AccordionSceneGraph from "./AccordionSceneGraph";
const SceneGraph = () => {
    useInitCSS();
    const elRef = useClickable();
    return (_jsxs(_Fragment, { children: [_jsx("div", { ref: elRef, className: "lingo3d-ui lingo3d-bg lingo3d-scenegraph", onClick: () => emitSelectionTarget(undefined), onContextMenu: (el) => {
                    el.preventDefault();
                    emitSelectionTarget(undefined, true);
                }, style: {
                    width: 200,
                    height: "100%",
                    display: "grid",
                    gridTemplateRows: "1fr auto"
                }, children: _jsx(AccordionSceneGraph, {}) }), _jsx(SceneGraphContextMenu, {})] }));
};
export default SceneGraph;
//# sourceMappingURL=index.js.map