import { Group, Mesh } from 'three';
import { boxGeometry } from '../primitives/Cube';
import { wireframeMaterial } from '../utils/reusables';
import Reresolvable from './utils/Reresolvable';
import { Cancellable } from '@lincode/promiselikes';
import toResolvable from '../utils/toResolvable';
import { addOutline, deleteOutline } from '../../engine/renderLoop/effectComposer/outlineEffect';
import { addSelectiveBloom, deleteSelectiveBloom } from '../../engine/renderLoop/effectComposer/selectiveBloomEffect';
import VisibleObjectManager from './VisibleObjectManager';
import { setManager } from '../../api/utils/manager';
export default class Loaded extends VisibleObjectManager {
    loadedGroup = new Group();
    constructor(unmounted) {
        super(new Mesh(boxGeometry, wireframeMaterial), unmounted);
        this.outerObject3d.add(this.loadedGroup);
    }
    loaded = new Reresolvable();
    _src;
    get src() {
        return this._src;
    }
    set src(val) {
        this._src = val;
        this.loaded.done && this.loadedGroup.clear();
        this.cancelHandle('src', val &&
            (() => toResolvable(this.load(val)).then(loaded => {
                const loadedObject3d = this.resolveLoaded(loaded, val);
                this.loadedGroup.add(loadedObject3d);
                this.loaded.resolve(loadedObject3d);
                this.object3d.visible = !!this._boxVisible;
            })));
    }
    _onLoad;
    get onLoad() {
        return this._onLoad;
    }
    set onLoad(cb) {
        this._onLoad = cb;
        this.cancelHandle('onLoad', cb && (() => this.loaded.then(() => void cb())));
    }
    widthSet;
    get width() {
        return super.width;
    }
    set width(val) {
        super.width = val;
        this.widthSet = true;
    }
    heightSet;
    get height() {
        return super.height;
    }
    set height(val) {
        super.height = val;
        this.heightSet = true;
    }
    depthSet;
    get depth() {
        return super.depth;
    }
    set depth(val) {
        super.depth = val;
        this.depthSet = true;
    }
    get innerRotationX() {
        return super.innerRotationX;
    }
    set innerRotationX(val) {
        super.innerRotationX = val;
        this.loadedGroup.rotation.x = this.object3d.rotation.x;
    }
    get innerRotationY() {
        return super.innerRotationY;
    }
    set innerRotationY(val) {
        super.innerRotationY = val;
        this.loadedGroup.rotation.y = this.object3d.rotation.y;
    }
    get innerRotationZ() {
        return super.innerRotationZ;
    }
    set innerRotationZ(val) {
        super.innerRotationZ = val;
        this.loadedGroup.rotation.z = this.object3d.rotation.z;
    }
    get innerX() {
        return super.innerX;
    }
    set innerX(val) {
        super.innerX = val;
        this.loadedGroup.position.x = this.object3d.position.x;
    }
    get innerY() {
        return super.innerY;
    }
    set innerY(val) {
        super.innerY = val;
        this.loadedGroup.position.y = this.object3d.position.y;
    }
    get firstInnerY() {
        return super.firstInnerY;
    }
    get playAllAnimation() {
        return super.playAllAnimation;
    }
    set playAllAnimation(val) {
        super.playAllAnimation = val;
    }
    set firstInnerY(val) {
        super.firstInnerY = val;
        // @ts-ignore
        this.outerObject3d.firstInnerY = val;
        this._firstInnerY = val;
    }
    get firstInnerZ() {
        return super.firstInnerZ;
    }
    set firstInnerZ(val) {
        super.firstInnerZ = val;
        // @ts-ignore
        this.outerObject3d.firstInnerZ = val;
        this._firstInnerZ = val;
    }
    get firstInnerX() {
        return super.firstInnerZ;
    }
    set firstInnerX(val) {
        super.firstInnerX = val;
        // @ts-ignore
        this.outerObject3d.firstInnerX = val;
        this._firstInnerX = val;
    }
    get innerZ() {
        return super.innerZ;
    }
    set innerZ(val) {
        super.innerZ = val;
        this.loadedGroup.position.z = this.object3d.position.z;
    }
    get innerVisible() {
        return this.loadedGroup.visible;
    }
    set innerVisible(val) {
        this.loadedGroup.visible = val;
    }
    get frustumCulled() {
        return super.frustumCulled;
    }
    set frustumCulled(val) {
        this.outerObject3d.frustumCulled = val;
        this.cancelHandle('frustumCulled', () => this.loaded.then(() => {
            super.frustumCulled = val;
        }));
    }
    get castShadow() {
        return super.castShadow;
    }
    set castShadow(val) {
        this._castShadow = val;
        this.cancelHandle('castShadow', () => this.loaded.then(() => {
            super.castShadow = val;
        }));
    }
    get receiveShadow() {
        return super.receiveShadow;
    }
    set receiveShadow(val) {
        this._receiveShadow = val;
        this.cancelHandle('receiveShadow', () => this.loaded.then(() => {
            super.receiveShadow = val;
        }));
    }
    _boxVisible;
    get boxVisible() {
        return this._boxVisible ?? this.object3d.visible;
    }
    set boxVisible(val) {
        this._boxVisible = val;
        this.object3d.visible = val;
    }
    get outline() {
        return super.outline;
    }
    set outline(val) {
        this._outline = val;
        this.cancelHandle('outline', () => this.loaded.then(loaded => {
            if (!val)
                return;
            addOutline(loaded);
            return () => {
                deleteOutline(loaded);
            };
        }));
    }
    get bloom() {
        return super.bloom;
    }
    set bloom(val) {
        this._bloom = val;
        this.cancelHandle('bloom', () => this.loaded.then(loaded => {
            if (!val)
                return;
            addSelectiveBloom(loaded);
            return () => {
                deleteSelectiveBloom(loaded);
            };
        }));
    }
    managerSet;
    addToRaycastSet(set) {
        const handle = new Cancellable();
        queueMicrotask(() => {
            if (handle.done)
                return;
            if (this._physics === 'map' || this._physics === 'map-debug')
                handle.watch(this.loaded.then(loaded => {
                    if (!this.managerSet) {
                        this.managerSet = true;
                        loaded.traverse(child => setManager(child, this));
                    }
                    set.add(loaded);
                    return () => {
                        set.delete(loaded);
                    };
                }));
            else
                handle.watch(super.addToRaycastSet(set));
        });
        return handle;
    }
    placeAt(object) {
        this.cancelHandle('placeAt', () => this.loaded.then(() => void super.placeAt(object)));
    }
    refreshPhysics() {
        this.cancelHandle('refreshPhysics', () => this.loaded.then(() => void super.refreshPhysics()));
    }
}
export const getLoadedObject = (item) => {
    if ('loadedGroup' in item)
        return item.loadedGroup;
    if ('object3d' in item)
        return item.object3d;
    return item.outerObject3d;
};
//# sourceMappingURL=Loaded.js.map