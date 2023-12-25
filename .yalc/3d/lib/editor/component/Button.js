import { jsx as _jsx } from "preact/jsx-runtime";
const Button = ({ children, disabled, onClick }) => {
    return (_jsx("div", { className: "lingo3d-bg lingo3d-flexcenter", style: {
            opacity: disabled ? 0.1 : 1,
            marginLeft: 4,
            marginRight: 14,
            height: 20,
            display: "flex",
            gap: 4,
            cursor: disabled ? undefined : "pointer"
        }, onClick: disabled ? undefined : onClick, children: children }));
};
export default Button;
//# sourceMappingURL=Button.js.map