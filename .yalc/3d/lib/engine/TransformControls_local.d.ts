export class TransformControls extends Object3D<import("three").Event> {
    constructor(camera: any, domElement: any);
    isTransformControls: boolean;
    domElement: any;
    _gizmo: TransformControlsGizmo;
    _plane: TransformControlsPlane;
    _offset: Vector3;
    _startNorm: Vector3;
    _endNorm: Vector3;
    _cameraScale: Vector3;
    _parentPosition: Vector3;
    _parentQuaternion: Quaternion;
    _parentQuaternionInv: Quaternion;
    _parentScale: Vector3;
    _worldScaleStart: Vector3;
    _worldQuaternionInv: Quaternion;
    _worldScale: Vector3;
    _positionStart: Vector3;
    _quaternionStart: Quaternion;
    _scaleStart: Vector3;
    _getPointer: typeof getPointer;
    _onPointerDown: typeof onPointerDown;
    _onPointerHover: typeof onPointerHover;
    _onPointerMove: typeof onPointerMove;
    _onPointerUp: typeof onPointerUp;
    updateMatrixWorld(): void;
    pointerHover(pointer: any): void;
    axis: any;
    pointerDown(pointer: any): void;
    dragging: boolean | undefined;
    pointerMove(pointer: any): void;
    rotationAngle: any;
    pointerUp(pointer: any): void;
    dispose(): void;
    attach(object: any): TransformControls;
    object: any;
    detach(): TransformControls;
    reset(): void;
    getRaycaster(): Raycaster;
    getMode(): any;
    setMode(mode: any): void;
    mode: any;
    setTranslationSnap(translationSnap: any): void;
    translationSnap: any;
    setRotationSnap(rotationSnap: any): void;
    rotationSnap: any;
    setScaleSnap(scaleSnap: any): void;
    scaleSnap: any;
    setSize(size: any): void;
    size: any;
    setSpace(space: any): void;
    space: any;
    update(): void;
}
export class TransformControlsGizmo extends Object3D<import("three").Event> {
    constructor();
    isTransformControlsGizmo: boolean;
    gizmo: {};
    picker: {};
    helper: {};
    updateMatrixWorld(force: any): void;
}
export class TransformControlsPlane extends Mesh<BufferGeometry, import("three").Material | import("three").Material[]> {
    constructor();
    isTransformControlsPlane: boolean;
    updateMatrixWorld(force: any): void;
}
import { Object3D } from "three/src/core/Object3D";
import { Vector3 } from "three/src/math/Vector3";
import { Quaternion } from "three/src/math/Quaternion";
declare function getPointer(event: any): {
    x: number;
    y: number;
    button: any;
};
declare function onPointerDown(event: any): void;
declare function onPointerHover(event: any): void;
declare function onPointerMove(event: any): void;
declare function onPointerUp(event: any): void;
import { Raycaster } from "three/src/core/Raycaster";
import { BufferGeometry } from "three/src/core/BufferGeometry";
import { Mesh } from "three/src/objects/Mesh";
export {};