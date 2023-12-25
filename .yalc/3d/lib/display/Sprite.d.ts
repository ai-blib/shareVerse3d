import { Sprite as ThreeSprite } from "three";
import TexturedBasicMixin from "./core/mixins/TexturedBasicMixin";
import ISprite from "../interface/ISprite";
import VisibleObjectManager from "./core/VisibleObjectManager";
declare class Sprite extends VisibleObjectManager<ThreeSprite> implements ISprite {
    static componentName: string;
    static defaults: Partial<import("../interface/utils/Defaults").default<ISprite>>;
    static schema: Required<import("../interface/utils/extractProps").ExtractProps<ISprite>>;
    constructor();
    get depth(): number;
    set depth(_: number);
    get scaleZ(): number;
    set scaleZ(_: number);
}
interface Sprite extends VisibleObjectManager<ThreeSprite>, TexturedBasicMixin {
}
export default Sprite;
