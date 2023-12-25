import { container } from "../../engine/renderLoop/renderSetup";
import { setEditorDragEvent } from "../../states/useEditorDragEvent";
container.addEventListener("dragenter", (e) => e.preventDefault());
container.addEventListener("dragover", (e) => e.preventDefault());
container.addEventListener("dragleave", (e) => e.preventDefault());
container.addEventListener("drop", (e) => e.preventDefault());
document.addEventListener("drop", (e) => e.preventDefault());
export default (onDrop) => {
    let draggingItem;
    container.addEventListener("dragover", (e) => draggingItem && setEditorDragEvent(e));
    container.addEventListener("dragleave", () => setEditorDragEvent(undefined));
    container.addEventListener("drop", () => draggingItem &&
        setEditorDragEvent((hitManager) => onDrop(draggingItem, hitManager)));
    return (val) => (draggingItem = val);
};
const dragImage = document.createElement("img");
dragImage.src =
    "data:image/basis;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
dragImage.width = 0;
dragImage.height = 0;
export const setDragImage = (e) => e.dataTransfer.setDragImage(dragImage, 0, 0);
//# sourceMappingURL=drag.js.map