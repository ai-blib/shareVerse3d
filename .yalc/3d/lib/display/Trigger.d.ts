import ITrigger from '../interface/ITrigger';
import PositionedItem from '../api/core/PositionedItem';
import StaticObjectManager from './core/StaticObjectManager';
import MeshItem from './core/MeshItem';
export default class Trigger extends PositionedItem implements ITrigger {
    static componentName: string;
    static defaults: Partial<import("../interface/utils/Defaults").default<ITrigger>>;
    static schema: Required<import("../interface/utils/extractProps").ExtractProps<ITrigger>>;
    private refresh;
    onEnter: ((target: MeshItem) => void) | undefined;
    onExit: (() => void) | undefined;
    private _pad;
    get pad(): boolean;
    set pad(val: boolean);
    private _radius;
    get radius(): number;
    set radius(val: number);
    private _interval;
    get interval(): number;
    set interval(val: number);
    private _helper;
    get helper(): boolean;
    set helper(val: boolean);
    private _target?;
    get target(): string | string[] | StaticObjectManager<import("three").Object3D<import("three").Event>> | undefined;
    set target(val: string | string[] | StaticObjectManager<import("three").Object3D<import("three").Event>> | undefined);
    constructor();
}
