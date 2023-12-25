import { jsx as _jsx } from "preact/jsx-runtime";
import { createContext } from "preact";
export const TreeItemContext = createContext({});
const TreeItemContextProvider = ({ children }) => {
    return (_jsx(TreeItemContext.Provider, { value: {}, children: children }));
};
export default TreeItemContextProvider;
//# sourceMappingURL=TreeItemContextProviter.js.map