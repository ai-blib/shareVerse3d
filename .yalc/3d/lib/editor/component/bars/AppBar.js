import { jsx as _jsx } from "preact/jsx-runtime";
import { useEffect, useMemo } from "preact/compat";
import { APPBAR_HEIGHT } from "../../../globals";
import { TabContext } from "../tabs/useTab";
import { useSignal } from "@preact/signals";
const AppBar = ({ className, style, children, selectedSignal = useSignal(undefined), noPadding }) => {
    const tabs = useMemo(() => [], []);
    useEffect(() => {
        selectedSignal.value ??= tabs[0];
    }, []);
    return (_jsx("div", { className: className, style: {
            width: "100%",
            height: APPBAR_HEIGHT + 8,
            display: "flex",
            alignItems: "center",
            paddingRight: noPadding ? undefined : 4,
            paddingLeft: noPadding ? undefined : 4,
            flexShrink: 0,
            background: "rgb(16, 17, 20)",
            ...style
        }, children: _jsx(TabContext.Provider, { value: { selectedSignal, tabs }, children: children }) }));
};
export default AppBar;
//# sourceMappingURL=AppBar.js.map