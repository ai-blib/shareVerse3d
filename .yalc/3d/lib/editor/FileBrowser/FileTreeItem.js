import { jsx as _jsx, Fragment as _Fragment } from "preact/jsx-runtime";
import BaseTreeItem from "../component/treeItems/BaseTreeItem";
import useSyncState from "../hooks/useSyncState";
import { getFileBrowserDir, setFileBrowserDir } from "../../states/useFileBrowserDir";
import FolderIcon from "./icons/FolderIcon";
import pathMap from "./pathMap";
const FileTreeItem = ({ fileStructure, firstFolderName, folderName, myPath }) => {
    const fileEntries = Object.entries(fileStructure);
    const fileBrowserDir = useSyncState(getFileBrowserDir);
    const children = () => fileEntries.map(([name, fileOrFolder]) => fileOrFolder instanceof File ? null : (_jsx(FileTreeItem, { fileStructure: fileOrFolder, firstFolderName: firstFolderName, folderName: name, myPath: firstFolderName + pathMap.get(fileOrFolder) }, name)));
    if (!myPath)
        return _jsx(_Fragment, { children: children() });
    return (_jsx(BaseTreeItem, { label: folderName, expanded: true, selected: myPath === fileBrowserDir, onClick: () => setFileBrowserDir(myPath), IconComponent: FolderIcon, children: children }));
};
export default FileTreeItem;
//# sourceMappingURL=FileTreeItem.js.map