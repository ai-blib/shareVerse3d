import { fpsRatio } from "../../engine/eventLoop";
export default (alpha) => Math.min(alpha * fpsRatio[0], 1);
//# sourceMappingURL=fpsAlpha.js.map