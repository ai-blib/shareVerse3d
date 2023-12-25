import { Reactive } from "@lincode/reactivity";
import { PerspectiveCamera } from "three";
import CameraBase from "./CameraBase";
import MeshItem from "./MeshItem";
import IOrbitCameraBase from "../../interface/IOrbitCameraBase";
export default class OrbitCameraBase extends CameraBase implements IOrbitCameraBase {
    private getChild;
    constructor(camera: PerspectiveCamera);
    private targetState;
    get target(): string | MeshItem | undefined;
    set target(value: string | MeshItem | undefined);
    protected foundState: Reactive<MeshItem | undefined>;
    private refresh;
    append(object: MeshItem): void;
    attach(object: MeshItem): void;
}
