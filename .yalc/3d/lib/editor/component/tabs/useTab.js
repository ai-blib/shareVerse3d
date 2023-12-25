import { pull } from "@lincode/utils";
import { createContext } from "preact";
import { useContext, useLayoutEffect } from "preact/hooks";
export const TabContext = createContext({});
export default (children, selected, disabled) => {
    const context = useContext(TabContext);
    const { selectedSignal, tabs } = context;
    useLayoutEffect(() => {
        if (!children)
            return;
        tabs.push(children);
        return () => {
            if (selectedSignal.value === children)
                selectedSignal.value = tabs[tabs.indexOf(children) - 1];
            pull(tabs, children);
        };
    }, []);
    useLayoutEffect(() => {
        if (!disabled || !children)
            return;
        if (selectedSignal.value === children)
            selectedSignal.value = tabs[tabs.indexOf(children) - 1];
    }, [disabled]);
    useLayoutEffect(() => {
        if (selected)
            selectedSignal.value = children;
    }, [selected]);
    return context;
};
//# sourceMappingURL=useTab.js.map