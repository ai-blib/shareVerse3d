import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
// @ts-nocheck
import { upperFirst } from "@lincode/utils";
import createObject from "../../api/serializer/createObject";
import SpotLight from "../../display/lights/SpotLight";
import drag, { setDragImage } from "../utils/drag";
import IconImage from "./IconImage";
const setDraggingItem = drag((val) => {
    const result = createObject(val);
    if (result instanceof SpotLight) {
        queueMicrotask(() => {
            result.targetX = result.x;
            result.targetY = result.y - 100;
            result.targetZ = result.z;
        });
    }
    return result;
});
const ObjectIcon = ({ name, iconName = name }) => {
    return (_jsxs("div", { draggable: true, onDragStart: (e) => {
            setDraggingItem(name);
            setDragImage(e);
        }, onDragEnd: () => setDraggingItem(undefined), style: {
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 20,
            paddingBottom: 20
        }, children: [_jsx(IconImage, { iconName: iconName }), _jsx("div", { style: {
                    marginTop: 6,
                    opacity: 0.75,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%"
                }, children: upperFirst(name) })] }));
};
export default ObjectIcon;
//# sourceMappingURL=ObjectIcon.js.map