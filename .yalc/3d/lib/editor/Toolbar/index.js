import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import TranslateIcon from "./icons/TranslateIcon";
import RotateIcon from "./icons/RotateIcon";
import ScaleIcon from "./icons/ScaleIcon";
import AbsoluteIcon from "./icons/AbsoluteIcon";
import RelativeIcon from "./icons/RelativeIcon";
import ToolbarButton from "./ToolbarButton";
import CursorIcon from "./icons/CursorIcon";
import OpenIcon from "./icons/OpenIcont";
import ReactIcon from "./icons/ReactIcon";
import VueIcon from "./icons/VueIcon";
import exportReact from "../../api/files/exportReact";
import exportVue from "../../api/files/exportVue";
import openJSON from "../../api/files/openJSON";
import Section from "./Section";
import { setTransformControlsSpace } from "../../states/useTransformControlsSpace";
import { isPositionedItem } from "../../api/core/PositionedItem";
import SimpleObjectManager from "../../display/core/SimpleObjectManager";
import PlayIcon from "./icons/PlayIcon";
import PathIcon from "./icons/PathIcon";
import FolderIcon from "./icons/FolderIcon";
import SaveIcon from "./icons/SaveIcon";
import saveJSON from "../../api/files/saveJSON";
import openFolder from "../../api/files/openFolder";
import exportJSON from "../../api/files/exportJSON";
import JSONIcon from "./icons/JSONIcon";
import useInitCSS from "../hooks/useInitCSS";
import useClickable from "../hooks/useClickable";
import { setEditorMode } from "../../states/useEditorMode";
import useSyncState from "../hooks/useSyncState";
import { getSelectionTarget } from "../../states/useSelectionTarget";
import { getEditorModeComputed } from "../../states/useEditorModeComputed";
import { getTransformControlsSpaceComputed } from "../../states/useTransformControlsSpaceComputed";
const Toolbar = () => {
    useInitCSS();
    const elRef = useClickable();
    const mode = useSyncState(getEditorModeComputed);
    const space = useSyncState(getTransformControlsSpaceComputed);
    const target = useSyncState(getSelectionTarget);
    const selectOnly = target && !isPositionedItem(target);
    const translateOnly = target &&
        isPositionedItem(target) &&
        !(target instanceof SimpleObjectManager);
    return (_jsx("div", { ref: elRef, className: "lingo3d-ui lingo3d-bg lingo3d-toolbar", style: {
            width: 50,
            height: "100%",
            overflowY: "scroll"
        }, children: _jsxs("div", { style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                opacity: 0.75,
                paddingTop: 12
            }, children: [_jsxs(Section, { children: [_jsx(ToolbarButton, { active: mode === "select", onClick: () => setEditorMode("select"), children: _jsx(CursorIcon, {}) }), _jsx(ToolbarButton, { active: mode === "translate", onClick: () => setEditorMode("translate"), disabled: selectOnly, children: _jsx(TranslateIcon, {}) }), _jsx(ToolbarButton, { active: mode === "rotate", disabled: translateOnly || selectOnly, onClick: () => setEditorMode("rotate"), children: _jsx(RotateIcon, {}) }), _jsx(ToolbarButton, { active: mode === "scale", disabled: translateOnly || selectOnly, onClick: () => setEditorMode("scale"), children: _jsx(ScaleIcon, {}) })] }), _jsxs(Section, { children: [_jsx(ToolbarButton, { active: space === "world", onClick: () => setTransformControlsSpace("world"), disabled: mode !== "translate" && mode !== "rotate", children: _jsx(AbsoluteIcon, {}) }), _jsx(ToolbarButton, { active: space === "local", onClick: () => setTransformControlsSpace("local"), disabled: mode !== "translate" &&
                                mode !== "rotate" &&
                                mode !== "scale", children: _jsx(RelativeIcon, {}) })] }), _jsxs(Section, { children: [_jsx(ToolbarButton, { active: mode === "curve", onClick: () => setEditorMode("curve"), children: _jsx(PathIcon, {}) }), _jsx(ToolbarButton, { active: mode === "play", onClick: () => setEditorMode("play"), children: _jsx(PlayIcon, {}) })] }), _jsxs(Section, { children: [_jsx(ToolbarButton, { onClick: openFolder, children: _jsx(FolderIcon, {}) }), _jsx(ToolbarButton, { onClick: openJSON, children: _jsx(OpenIcon, {}) }), _jsx(ToolbarButton, { onClick: saveJSON, children: _jsx(SaveIcon, {}) })] }), _jsxs(Section, { children: [_jsx(ToolbarButton, { onClick: exportJSON, children: _jsx(JSONIcon, {}) }), _jsx(ToolbarButton, { onClick: exportReact, children: _jsx(ReactIcon, {}) }), _jsx(ToolbarButton, { onClick: exportVue, children: _jsx(VueIcon, {}) })] })] }) }));
};
export default Toolbar;
//# sourceMappingURL=index.js.map