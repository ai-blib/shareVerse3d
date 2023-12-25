import { FOREST_URL } from "../../globals";
import { treeDefaults, treeSchema } from "../../interface/ITree";
import Model from "../Model";
export default class Tree extends Model {
    static componentName = "tree";
    static defaults = treeDefaults;
    static schema = treeSchema;
    constructor() {
        super();
        this.scale = 4;
        this.preset = "tree1";
    }
    _preset = "";
    get preset() {
        return this._preset;
    }
    set preset(val) {
        this.src = FOREST_URL + val + ".glb";
    }
}
//# sourceMappingURL=index.js.map