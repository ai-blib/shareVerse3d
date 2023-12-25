import { Reactive } from "@lincode/reactivity";
import { container } from "../../engine/renderLoop/renderSetup";
import { orbitCameraDefaults, orbitCameraSchema } from "../../interface/IOrbitCamera";
import { getTransformControlsDragging } from "../../states/useTransformControlsDragging";
import { onKeyClear } from "../../events/onKeyClear";
import { getCameraRendered } from "../../states/useCameraRendered";
import { onBeforeRender } from "../../events/onBeforeRender";
import { Cancellable } from "@lincode/promiselikes";
import { PerspectiveCamera } from "three";
import OrbitCameraBase from "../core/OrbitCameraBase";
import { vec2Point } from "../utils/vec2Point";
import getWorldPosition from "../utils/getWorldPosition";
import getCenter from "../utils/getCenter";
import { FAR, NEAR } from "../../globals";
export default class OrbitCamera extends OrbitCameraBase {
    static componentName = "orbitCamera";
    static defaults = orbitCameraDefaults;
    static schema = orbitCameraSchema;
    constructor(camera = new PerspectiveCamera(75, 1, NEAR, FAR)) {
        super(camera);
        this.innerZ = 500;
        this.orbitMode = true;
        this.mouseControl = "drag";
        this.camera.rotation.y = 0;
        this.createEffect(() => {
            const found = this.foundState.get();
            if (!found)
                return;
            const handle = onBeforeRender(() => {
                this.placeAt(vec2Point(getCenter(found.nativeObject3d)));
            });
            return () => {
                handle.cancel();
            };
        }, [this.foundState.get]);
        this.createEffect(() => {
            const autoRotate = this.autoRotateState.get();
            if (getCameraRendered() !== camera || !autoRotate)
                return;
            const speed = typeof autoRotate === "number" ? autoRotate : 2;
            const handle = onBeforeRender(() => {
                this.gyrate(speed, 0, true);
            });
            return () => {
                handle.cancel();
            };
        }, [getCameraRendered, this.autoRotateState.get]);
        this.createEffect(() => {
            if (getTransformControlsDragging() ||
                getCameraRendered() !== camera ||
                !this.mouseControlState.get())
                return;
            const handle = new Cancellable();
            if (this.enableZoomState.get()) {
                const cb = (e) => {
                    e.preventDefault();
                    this.innerZ += e.deltaY;
                    console.log(this.innerZ, 'this.innerZ');
                    // if (this.innerZ < 0) this.innerZ = 0
                };
                container.addEventListener("wheel", cb);
                handle.then(() => container.removeEventListener("wheel", cb));
            }
            if (this.enableFlyState.get()) {
                const downSet = new Set();
                handle.watch(
                // @ts-ignore
                onBeforeRender(() => {
                    if (downSet.has("Meta") || downSet.has("Control"))
                        return;
                    const speed = downSet.has("Shift") ? 50 : 10;
                    if (downSet.has("w"))
                        this.translateZ(-speed);
                    else if (downSet.has("s"))
                        this.translateZ(speed);
                    if (downSet.has("a") || downSet.has("ArrowLeft"))
                        this.moveRight(-speed);
                    else if (downSet.has("d") || downSet.has("ArrowRight"))
                        this.moveRight(speed);
                    if (downSet.has("w") ||
                        downSet.has("s") ||
                        downSet.has("a") ||
                        downSet.has("d")) {
                        const worldPos = vec2Point(getWorldPosition(this.object3d));
                        this.innerZ = 0;
                        this.placeAt(worldPos);
                    }
                    if (downSet.has("Meta") || downSet.has("Control"))
                        return;
                    if (downSet.has("ArrowDown"))
                        this.y -= speed;
                    else if (downSet.has("ArrowUp"))
                        this.y += speed;
                }));
                const handleKeyDown = (e) => {
                    downSet.add(e.key.length === 1 ? e.key.toLocaleLowerCase() : e.key);
                };
                const handleKeyUp = (e) => {
                    downSet.delete(e.key.length === 1 ? e.key.toLocaleLowerCase() : e.key);
                };
                document.addEventListener("keydown", handleKeyDown);
                document.addEventListener("keyup", handleKeyUp);
                handle.watch(onKeyClear(() => downSet.clear()));
                handle.then(() => {
                    document.removeEventListener("keydown", handleKeyDown);
                    document.removeEventListener("keyup", handleKeyUp);
                });
            }
            return () => {
                handle.cancel();
            };
        }, [
            getCameraRendered,
            getTransformControlsDragging,
            this.enableZoomState.get,
            this.enableFlyState.get,
            this.mouseControlState.get
        ]);
    }
    enableZoomState = new Reactive(false);
    get enableZoom() {
        return this.enableZoomState.get();
    }
    set enableZoom(val) {
        this.enableZoomState.set(val);
    }
    enableFlyState = new Reactive(false);
    get enableFly() {
        return this.enableFlyState.get();
    }
    set enableFly(val) {
        this.enableFlyState.set(val);
    }
    autoRotateState = new Reactive(false);
    get autoRotate() {
        return this.autoRotateState.get();
    }
    set autoRotate(val) {
        this.autoRotateState.set(val);
    }
}
//# sourceMappingURL=OrbitCamera.js.map