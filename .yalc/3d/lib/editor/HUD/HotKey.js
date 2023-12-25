import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
export default ({ hotkey, description }) => {
    return (_jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            marginTop: 4,
            whiteSpace: "nowrap"
        }, children: [_jsx("div", { style: {
                    border: "1px solid white",
                    borderRadius: "4px",
                    padding: "2px 4px 2px 4px"
                }, children: _jsx("div", { className: "lingo3d-flexcenter", style: { minWidth: 10 }, children: hotkey }) }), hotkey && description && (_jsx("div", { style: { padding: "0 1px 0 1px" }, children: "\u00A0-\u00A0" })), _jsx("div", { style: { padding: "2px 0px 2px 0px" }, children: description })] }));
};
//# sourceMappingURL=HotKey.js.map