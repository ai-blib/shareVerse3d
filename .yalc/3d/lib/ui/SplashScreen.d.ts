import Appendable from "../api/core/Appendable";
import ISplashScreen from "../interface/ISplashScreen";
import Text from "./Text";
export default class SplashScreen extends Appendable implements ISplashScreen {
    static componentName: string;
    static defaults: Partial<import("../interface/utils/Defaults").default<ISplashScreen>>;
    static schema: Required<import("../interface/utils/extractProps").ExtractProps<ISplashScreen>>;
    private splashScreen;
    private textContainer;
    constructor();
    get opacity(): number;
    set opacity(value: number);
    get textCenter(): boolean;
    set textCenter(value: boolean);
    append(child: Text): void;
    attach(child: Text): void;
}
