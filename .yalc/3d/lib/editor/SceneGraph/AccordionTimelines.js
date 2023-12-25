import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { APPBAR_HEIGHT } from "../../globals";
import { getSelectionTarget } from "../../states/useSelectionTarget";
import TitleBar from "../component/bars/TitleBar";
import IconButton from "../component/IconButton";
import deleteSelected from "../Editor/deleteSelected";
import useSyncState from "../hooks/useSyncState";
import DeleteIcon from "./icons/DeleteIcon";
const AccordionTimelines = () => {
    const selectionTarget = useSyncState(getSelectionTarget);
    return (_jsxs("div", { style: {
            maxHeight: 200 - APPBAR_HEIGHT,
            display: "flex",
            flexDirection: "column"
        }, children: [_jsx(TitleBar, { title: "timelines", children: _jsx(IconButton, { disabled: !selectionTarget, onClick: deleteSelected, children: _jsx(DeleteIcon, {}) }) }), _jsx("div", { style: { overflow: "scroll", flexGrow: 1 } })] }));
};
export default AccordionTimelines;
//# sourceMappingURL=AccordionTimelines.js.map