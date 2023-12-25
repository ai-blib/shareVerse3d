import CharacterCamera from "../core/CharacterCamera";
export default class FirstPersonCamera extends CharacterCamera {
    static componentName: string;
    constructor();
    private innerYSetState;
    get innerY(): number;
    set innerY(val: number);
}
