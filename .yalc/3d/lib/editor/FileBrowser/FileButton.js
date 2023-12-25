import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
// @ts-nocheck
import { getExtensionType } from "@lincode/filetypes";
import { splitFileName } from "@lincode/utils";
import loadFile from "../../api/files/loadFile";
import { createObjectURL } from "../../display/core/utils/objectURL";
import Model from "../../display/Model";
import useSyncState from "../hooks/useSyncState";
import { getFileSelected, setFileSelected } from "../../states/useFileSelected";
import drag, { setDragImage } from "../utils/drag";
import FileIcon from "./icons/FileIcon";
const setDraggingItem = drag((draggingItem, hitManager) => {
    const filetype = getExtensionType(draggingItem.name);
    const [filename, extension] = splitFileName(draggingItem.name);
    const lazyObjectURL = () => createObjectURL(draggingItem, extension?.toLowerCase());
    if (filetype === "model") {
        const manager = new Model();
        manager.src = lazyObjectURL();
        return manager;
    }
    else if (filetype === "image" && hitManager && "texture" in hitManager) {
        const name = filename.toLowerCase();
        if ("roughness" in hitManager) {
            if (name.includes("rough"))
                hitManager.roughnessMap = lazyObjectURL();
            else if (name.includes("metal"))
                hitManager.metalnessMap = lazyObjectURL();
            else if (name.includes("normal"))
                hitManager.normalMap = lazyObjectURL();
            else if (name.includes("disp"))
                hitManager.displacementMap = lazyObjectURL();
            else
                hitManager.texture = lazyObjectURL();
        }
        else
            hitManager.texture = lazyObjectURL();
    }
});
const FileButton = ({ file }) => {
    const fileSelected = useSyncState(getFileSelected);
    return (_jsxs("div", { style: {
            width: 70,
            height: 90,
            background: fileSelected === file
                ? "rgba(255, 255, 255, 0.1)"
                : undefined
        }, draggable: true, onDragStart: (e) => {
            setDraggingItem(file);
            setDragImage(e);
        }, onDragEnd: () => setDraggingItem(undefined), onMouseDown: (e) => (e.stopPropagation(), setFileSelected(file)), onDblClick: () => loadFile(file), children: [_jsx("div", { className: "lingo3d-flexcenter", style: {
                    width: "100%",
                    paddingTop: 10,
                    paddingBottom: 4
                }, children: _jsx(FileIcon, {}) }), _jsx("div", { className: "lingo3d-flexcenter", style: {
                    width: "100%",
                    paddingLeft: 10,
                    paddingRight: 10
                }, children: _jsx("div", { style: {
                        wordBreak: "break-word",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        lineClamp: 2,
                        webkitLineClamp: 2,
                        webkitBoxOrient: "vertical"
                    }, children: file.name }) })] }));
};
export default FileButton;
//# sourceMappingURL=FileButton.js.map