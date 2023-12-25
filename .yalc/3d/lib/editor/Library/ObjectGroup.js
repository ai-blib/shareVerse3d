import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import ObjectIcon from "./ObjectIcon";
const getIconName = (name) => {
    if (typeof name === "string") {
        if (name.endsWith("Camera"))
            return "camera";
        if (name.endsWith("Light"))
            return "light";
        return name;
    }
    return Object.values(name)[0];
};
const getName = (name) => (typeof name === "string" ? name : Object.keys(name)[0]);
const ObjectGroup = ({ names }) => {
    const groups = [];
    let latestGroup = [];
    let i = 0;
    for (const name of names) {
        if (i === 0)
            groups.push((latestGroup = []));
        latestGroup.push(name);
        if (++i === 2)
            i = 0;
    }
    return (_jsx(_Fragment, { children: groups.map(([name0, name1], i) => (_jsxs("div", { style: { display: "flex" }, children: [_jsx(ObjectIcon, { name: getName(name0), iconName: getIconName(name0) }), name1 && (_jsx(ObjectIcon, { name: getName(name1), iconName: getIconName(name1) }))] }, i))) }));
};
export default ObjectGroup;
//# sourceMappingURL=ObjectGroup.js.map