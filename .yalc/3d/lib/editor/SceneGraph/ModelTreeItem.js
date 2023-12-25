import { jsx as _jsx } from "preact/jsx-runtime";
import { useEffect, useState } from "preact/hooks";
import TreeItem from "./TreeItem";
import NativeTreeItem from "./NativeTreeItem";
const ModelTreeItem = ({ appendable }) => {
    const [loadedObject3d, setLoadedObject3d] = useState();
    const { loaded } = appendable;
    useEffect(() => {
        setLoadedObject3d(undefined);
        const handle = loaded.then(() => {
            setLoadedObject3d(appendable.loadedGroup.children[0]);
        });
        return () => {
            handle.cancel();
        };
    }, [loaded]);
    return (_jsx(TreeItem, { appendable: appendable, expandable: !!loadedObject3d, children: loadedObject3d && (_jsx(NativeTreeItem, { appendable: appendable, object3d: loadedObject3d })) }));
};
export default ModelTreeItem;
//# sourceMappingURL=ModelTreeItem.js.map