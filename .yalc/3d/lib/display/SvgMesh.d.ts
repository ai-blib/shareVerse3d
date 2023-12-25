import { Group } from "three";
import type { SVGResult } from "three/examples/jsm/loaders/SVGLoader";
import Loaded from "./core/Loaded";
import TexturedBasicMixin from "./core/mixins/TexturedBasicMixin";
import TexturedStandardMixin from "./core/mixins/TexturedStandardMixin";
import ISvgMesh from "../interface/ISvgMesh";
declare class SvgMesh extends Loaded<SVGResult> implements ISvgMesh {
    static componentName: string;
    static defaults: Partial<import("../interface/utils/Defaults").default<ISvgMesh>>;
    static schema: Required<import("../interface/utils/extractProps").ExtractProps<ISvgMesh>>;
    private _innerHTML?;
    get innerHTML(): string | undefined;
    set innerHTML(val: string | undefined);
    protected load(url: string): Promise<SVGResult>;
    protected resolveLoaded(svgData: SVGResult, src: string): Group;
    protected getMaterial(): import("./material/StandardMaterialManager").default;
}
interface SvgMesh extends Loaded<SVGResult>, TexturedBasicMixin, TexturedStandardMixin {
}
export default SvgMesh;
