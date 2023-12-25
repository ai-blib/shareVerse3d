import { Reactive } from "@lincode/reactivity";
import { range } from "@lincode/utils";
import { buildingDefaults, buildingSchema } from "../../interface/IBuilding";
import VisibleObjectManager from "../core/VisibleObjectManager";
import Floor from "./Floor";
export default class Building extends VisibleObjectManager {
    static componentName = "building";
    static defaults = buildingDefaults;
    static schema = buildingSchema;
    constructor() {
        super();
        this.scale = 10;
        this.createEffect(() => {
            const preset = this.presetState.get();
            const repeatX = this.repeatXState.get();
            const repeatZ = this.repeatZState.get();
            const repeatY = Math.max(Math.floor(this.repeatYState.get()), 1);
            const floors = range(repeatY).map((y) => {
                const floor = new Floor(this);
                floor.preset = preset;
                floor.repeatX = repeatX;
                floor.repeatZ = repeatZ;
                floor.y = y * 100;
                return floor;
            });
            return () => {
                for (const floor of floors)
                    floor.dispose();
            };
        }, [
            this.presetState.get,
            this.repeatXState.get,
            this.repeatZState.get,
            this.repeatYState.get
        ]);
    }
    presetState = new Reactive("industrial0");
    get preset() {
        return this.presetState.get();
    }
    set preset(val) {
        this.presetState.set(val);
    }
    repeatXState = new Reactive(1);
    get repeatX() {
        return this.repeatXState.get();
    }
    set repeatX(val) {
        this.repeatXState.set(val);
    }
    repeatZState = new Reactive(1);
    get repeatZ() {
        return this.repeatZState.get();
    }
    set repeatZ(val) {
        this.repeatZState.set(val);
    }
    repeatYState = new Reactive(1);
    get repeatY() {
        return this.repeatYState.get();
    }
    set repeatY(val) {
        this.repeatYState.set(val);
    }
}
//# sourceMappingURL=index.js.map