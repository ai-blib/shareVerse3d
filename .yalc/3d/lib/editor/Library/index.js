import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import ObjectGroup from "./ObjectGroup";
import { DEBUG } from "../../globals";
import useInitCSS from "../hooks/useInitCSS";
import useClickable from "../hooks/useClickable";
import AppBar from "../component/bars/AppBar";
import Tab from "../component/tabs/Tab";
const Library = () => {
    useInitCSS();
    const elRef = useClickable();
    return (_jsxs("div", { ref: elRef, className: "lingo3d-ui lingo3d-bg lingo3d-library", style: {
            width: 200,
            height: "100%",
            display: "flex",
            flexDirection: "column"
        }, children: [_jsxs(AppBar, { children: [_jsx(Tab, { half: true, children: "components" }), _jsx(Tab, { half: true, disabled: true, children: "materials" })] }), _jsx("div", { style: { padding: 10, overflowY: "scroll", flexGrow: 1 }, children: _jsx(ObjectGroup, { names: [
                        "model",
                        "dummy",
                        ...(DEBUG
                            ? [{ building: "cube" }, { tree: "cylinder" }]
                            : []),
                        "svgMesh",
                        "htmlMesh",
                        { joystick: "htmlMesh" },
                        // { reticle: "htmlMesh" },
                        { splashScreen: "htmlMesh" },
                        { text: "htmlMesh" },
                        "trigger",
                        "spawnPoint",
                        "audio",
                        "group",
                        "reflector",
                        "water",
                        { sprite: "plane" },
                        "cube",
                        "sphere",
                        "cone",
                        "cylinder",
                        "octahedron",
                        "tetrahedron",
                        "torus",
                        "plane",
                        "circle",
                        "areaLight",
                        "ambientLight",
                        "skyLight",
                        "directionalLight",
                        "pointLight",
                        "spotLight",
                        { environment: "light" },
                        "camera",
                        "thirdPersonCamera",
                        "firstPersonCamera",
                        "orbitCamera"
                    ] }) })] }));
};
export default Library;
//# sourceMappingURL=index.js.map