import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "preact/jsx-runtime";
import Separator from "./Separator";
const Section = ({ children }) => {
    if (!Array.isArray(children) || !children.length)
        return null;
    return (_jsxs(_Fragment, { children: [children, _jsx(Separator, {})] }));
};
export default Section;
//# sourceMappingURL=Section.js.map