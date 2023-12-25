export class HTMLMesh extends Mesh<import("three").BufferGeometry, import("three").Material | import("three").Material[]> {
    constructor(dom: any);
    dispose: () => void;
    update: () => void;
}
export class HTMLSprite extends Sprite {
    constructor(dom: any);
    dispose: () => void;
    update: () => void;
}
import { Mesh } from "three/src/objects/Mesh";
import { Sprite } from "three/src/objects/Sprite";
