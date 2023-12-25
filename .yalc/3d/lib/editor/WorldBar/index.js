import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import AppBar from "../component/bars/AppBar";
import CloseableTab from "../component/tabs/CloseableTab";
import useInitCSS from "../hooks/useInitCSS";
import useSyncState from "../hooks/useSyncState";
import { getFileCurrent } from "../../states/useFileCurrent";
import Controls from "./Controls";
const Tabs = () => {
    useInitCSS();
    const fileCurrent = useSyncState(getFileCurrent);
    const title = fileCurrent?.name ?? "untitled";
    return (_jsx("div", { className: "lingo3d-ui lingo3d-bg lingo3d-tabs", style: { width: "100%" }, children: _jsxs(AppBar, { children: [_jsx(CloseableTab, { selected: true, children: title }, title), _jsx("div", { style: { flexGrow: 1, minWidth: 4 } }), _jsx(Controls, {})] }) }));
};
export default Tabs;
//# sourceMappingURL=index.js.map