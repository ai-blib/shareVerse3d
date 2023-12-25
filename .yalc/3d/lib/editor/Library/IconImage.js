import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { useEffect, useMemo, useState } from "preact/hooks";
import { EDITOR_URL } from "../../globals";
import Spinner from "../component/Spinner";
const IconImage = ({ iconName }) => {
    const [loaded, setLoaded] = useState(false);
    const src = useMemo(() => `${EDITOR_URL}${iconName}.png`, [iconName]);
    useEffect(() => {
        const image = new Image();
        image.src = src;
        image.onload = () => setLoaded(true);
    }, []);
    return (_jsxs("div", { style: { width: 50, height: 50 }, children: [!loaded && (_jsx("div", { className: "lingo3d-flexcenter", style: { width: "100%", height: "100%" }, children: _jsx(Spinner, { color: "rgba(255, 255, 255, 0.1)" }) })), loaded && (_jsx("div", { className: "lingo3d-fadein", style: {
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${src})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                } }))] }));
};
export default IconImage;
//# sourceMappingURL=IconImage.js.map