import { ExtractProps } from "./utils/extractProps";
export default interface IVisible {
    bloom: boolean;
    outline: boolean;
    visible: boolean;
    frustumCulled: boolean;
    castShadow: boolean;
    receiveShadow: boolean;
}
export declare const visibleSchema: Required<ExtractProps<IVisible>>;
export declare const visibleDefaults: Partial<import("./utils/Defaults").default<IVisible>>;
