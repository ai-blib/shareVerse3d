import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { useMemo } from "preact/hooks";
import { get, set, traverse } from "@lincode/utils";
import FileButton from "./FileButton";
import FileTreeItem from "./FileTreeItem";
import pathMap from "./pathMap";
import useInitCSS from "../hooks/useInitCSS";
import { APPBAR_HEIGHT, PANELS_HEIGHT } from "../../globals";
import { setFileSelected } from "../../states/useFileSelected";
import useSyncState from "../hooks/useSyncState";
import { getFiles } from "../../states/useFiles";
import { getFileBrowserDir, setFileBrowserDir } from "../../states/useFileBrowserDir";
const FileBrowser = () => {
    useInitCSS();
    const files = useSyncState(getFiles);
    const fileBrowserDir = useSyncState(getFileBrowserDir);
    const [fileStructure, firstFolderName] = useMemo(() => {
        const fileStructure = {};
        let firstFolderName = "";
        if (files) {
            for (const file of files)
                set(fileStructure, file.webkitRelativePath.split("/"), file);
            firstFolderName = Object.keys(fileStructure)[0];
            traverse(fileStructure, (key, child, parent) => {
                let path = "";
                if (pathMap.has(parent))
                    path = pathMap.get(parent) + "/" + key;
                typeof child === "object" && pathMap.set(child, path);
            });
        }
        setFileBrowserDir(firstFolderName);
        return [fileStructure, firstFolderName];
    }, [files]);
    const filteredFiles = useMemo(() => {
        const currentFolder = get(fileStructure, fileBrowserDir.split("/"));
        const filteredFiles = currentFolder &&
            Object.values(currentFolder).filter((item) => item instanceof File && item.name[0] !== ".");
        return filteredFiles;
    }, [fileStructure, fileBrowserDir]);
    return (_jsxs("div", { className: "lingo3d-ui lingo3d-bg lingo3d-panels", style: {
            height: PANELS_HEIGHT - APPBAR_HEIGHT,
            width: "100%",
            display: "flex"
        }, children: [_jsx("div", { style: { overflow: "scroll", width: 200 }, children: _jsx(FileTreeItem, { fileStructure: fileStructure, firstFolderName: firstFolderName }) }), _jsx("div", { style: { flexGrow: 1 }, children: _jsx("div", { className: "lingo3d-absfull", style: {
                        overflow: "scroll",
                        display: "flex",
                        flexWrap: "wrap"
                    }, onMouseDown: () => setFileSelected(undefined), children: filteredFiles?.map((file) => (_jsx(FileButton, { file: file }, file.name))) }) })] }));
};
export default FileBrowser;
//# sourceMappingURL=index.js.map