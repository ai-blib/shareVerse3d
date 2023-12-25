import { applyMixins, forceGet } from "@lincode/utils";
import { ExtrudeGeometry, Group, Mesh } from "three";
import Loaded from "./core/Loaded";
import TexturedBasicMixin from "./core/mixins/TexturedBasicMixin";
import TexturedStandardMixin from "./core/mixins/TexturedStandardMixin";
import fit from "./utils/fit";
import measure from "./utils/measure";
import { svgMeshDefaults, svgMeshSchema } from "../interface/ISvgMesh";
import { decreaseLoadingCount, increaseLoadingCount } from "../states/useLoadingCount";
import { standardMaterial } from "./utils/reusables";
import { attachStandardMaterialManager } from "./material/attachMaterialManager";
import toResolvable from "./utils/toResolvable";
const svgGeometryCache = new WeakMap();
class SvgMesh extends Loaded {
    static componentName = "svgMesh";
    static defaults = svgMeshDefaults;
    static schema = svgMeshSchema;
    _innerHTML;
    get innerHTML() {
        return this._innerHTML;
    }
    set innerHTML(val) {
        this._innerHTML = val;
        this.loaded.done && this.loadedGroup.clear();
        this.cancelHandle("src", val &&
            (() => toResolvable(new Promise((resolve) => {
                increaseLoadingCount();
                import("./utils/loaders/loadSVG").then(({ loader }) => {
                    decreaseLoadingCount();
                    resolve(loader.parse(val));
                });
            })).then((loaded) => {
                const loadedObject3d = this.resolveLoaded(loaded, val);
                this.loadedGroup.add(loadedObject3d);
                this.loaded.resolve(loadedObject3d);
                this.object3d.visible = !!this._boxVisible;
            })));
    }
    async load(url) {
        increaseLoadingCount();
        const module = await import("./utils/loaders/loadSVG");
        let result;
        try {
            result = await module.default(url);
        }
        catch {
            decreaseLoadingCount();
            throw new Error("Failed to load svg, check if src is correct");
        }
        decreaseLoadingCount();
        return result;
    }
    resolveLoaded(svgData, src) {
        const loadedObject3d = new Group();
        loadedObject3d.scale.y *= -1;
        const geometries = forceGet(svgGeometryCache, svgData, () => {
            const shapes = [];
            for (const path of svgData.paths)
                for (const shape of path.toShapes(true))
                    shapes.push(shape);
            if (!shapes.length)
                return [];
            const testGroup = new Group();
            for (const shape of shapes) {
                const geom = new ExtrudeGeometry(shape, {
                    depth: 0,
                    bevelEnabled: false
                });
                geom.dispose();
                testGroup.add(new Mesh(geom));
            }
            const measuredSize = measure(testGroup, src);
            const result = [];
            for (const shape of shapes)
                result.push(new ExtrudeGeometry(shape, {
                    depth: measuredSize.y,
                    bevelEnabled: false
                }));
            return result;
        });
        for (const geometry of geometries) {
            const mesh = new Mesh(geometry, this.getMaterial().nativeMaterial);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            loadedObject3d.add(mesh);
        }
        const measuredSize = fit(loadedObject3d, src);
        !this.widthSet && (this.object3d.scale.x = measuredSize.x);
        !this.heightSet && (this.object3d.scale.y = measuredSize.y);
        !this.depthSet && (this.object3d.scale.z = measuredSize.z);
        return loadedObject3d;
    }
    getMaterial() {
        return attachStandardMaterialManager(this.nativeObject3d, this, undefined, undefined, undefined, standardMaterial)[0];
    }
}
applyMixins(SvgMesh, [TexturedStandardMixin, TexturedBasicMixin]);
export default SvgMesh;
//# sourceMappingURL=SvgMesh.js.map