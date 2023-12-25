import { ExtractProps } from "./utils/extractProps";
import IAppendable from "./IAppendable";
export default interface ISplashScreen extends IAppendable {
    opacity: number;
    textCenter: boolean;
}
export declare const splashScreenSchema: Required<ExtractProps<ISplashScreen>>;
export declare const splashScreenDefaults: Partial<import("./utils/Defaults").default<ISplashScreen>>;
