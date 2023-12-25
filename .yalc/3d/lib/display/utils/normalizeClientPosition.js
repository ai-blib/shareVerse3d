import { containerBounds } from "../../engine/renderLoop/renderSetup";
export default (clientX, clientY) => {
    const rect = containerBounds[0];
    clientX -= rect.x;
    clientY -= rect.y;
    return [
        (clientX / rect.width) * 2 - 1,
        -(clientY / rect.height) * 2 + 1,
        clientX,
        clientY
    ];
};
//# sourceMappingURL=normalizeClientPosition.js.map