import { Reactive } from "@lincode/reactivity";
import { Mesh } from "three";
import scene from "../../engine/scene";
import { onRender } from "../../events/onRender";
import { reflectorDefaults, reflectorSchema } from "../../interface/IReflector";
import { getCameraRendered } from "../../states/useCameraRendered";
import { getRenderer } from "../../states/useRenderer";
import VisibleObjectManager from "../core/VisibleObjectManager";
import { planeGeometry } from "../primitives/Plane";
export default class Reflector extends VisibleObjectManager {
    static componentName = "reflector";
    static defaults = reflectorDefaults;
    static schema = reflectorSchema;
    constructor() {
        const mesh = new Mesh(planeGeometry);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        super(mesh);
        this.rotationX = 270;
        import("./MeshReflectorMaterial").then(({ default: MeshReflectorMaterial }) => {
            this.createEffect(() => {
                const renderer = getRenderer();
                if (!renderer || this.done)
                    return;
                const camera = getCameraRendered();
                const mat = (mesh.material = new MeshReflectorMaterial(renderer, camera, scene, this.object3d, {
                    resolution: this.resolutionState.get(),
                    blur: [this.blurState.get(), this.blurState.get()],
                    mixBlur: 2.5,
                    mixContrast: this.contrastState.get(),
                    mirror: this.mirrorState.get(),
                    distortionMap: undefined,
                }));
                const handle = onRender(() => {
                    camera.updateWorldMatrix(true, false);
                    mat.update();
                });
                return () => {
                    mat.dispose();
                    handle.cancel();
                };
            }, [
                getRenderer,
                getCameraRendered,
                this.resolutionState.get,
                this.blurState.get,
                this.contrastState.get,
                this.mirrorState.get
            ]);
        });
    }
    resolutionState = new Reactive(256);
    get resolution() {
        return this.resolutionState.get();
    }
    set resolution(val) {
        this.resolutionState.set(val);
    }
    blurState = new Reactive(512);
    get blur() {
        return this.blurState.get();
    }
    set blur(val) {
        this.blurState.set(val);
    }
    contrastState = new Reactive(1.5);
    get contrast() {
        return this.contrastState.get();
    }
    set contrast(val) {
        this.contrastState.set(val);
    }
    mirrorState = new Reactive(1);
    get mirror() {
        return this.mirrorState.get();
    }
    set mirror(val) {
        this.mirrorState.set(val);
    }
}
//# sourceMappingURL=index.js.map