type FileTreeItemProps = {
    fileStructure: any;
    firstFolderName: string;
    folderName?: string;
    myPath?: string;
};
declare const FileTreeItem: ({ fileStructure, firstFolderName, folderName, myPath }: FileTreeItemProps) => import("preact").JSX.Element;
export default FileTreeItem;
