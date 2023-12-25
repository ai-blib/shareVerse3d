import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import AppBar from "./AppBar";
const TitleBar = ({ title, children }) => {
    return (_jsxs(AppBar, { style: { paddingLeft: 12, background: undefined }, children: [_jsx("div", { style: { marginTop: -2 }, children: title }), _jsx("div", { style: { flexGrow: 1, minWidth: 4 } }), children] }));
};
export default TitleBar;
//# sourceMappingURL=TitleBar.js.map