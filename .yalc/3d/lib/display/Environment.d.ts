import IEnvironment from '../interface/IEnvironment';
import PositionedItem from '../api/core/PositionedItem';
export default class Environment extends PositionedItem implements IEnvironment {
    static componentName: string;
    static defaults: Partial<import("../interface/utils/Defaults").default<IEnvironment>>;
    static schema: Required<import("../interface/utils/extractProps").ExtractProps<IEnvironment>>;
    constructor();
    dispose(): this;
    private _texture?;
    get texture(): string | undefined;
    set texture(value: string | undefined);
    private helperState;
    get helper(): boolean;
    set helper(val: boolean);
}
