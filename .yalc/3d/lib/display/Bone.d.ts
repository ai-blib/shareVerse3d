import { Object3D } from "three";
import Octahedron from "./primitives/Octahedron";
export default class Bone extends Octahedron {
    constructor(target: Object3D, child: Object3D);
}
