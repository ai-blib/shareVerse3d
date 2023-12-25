import scene from '../engine/scene';
import { BufferAttribute, BufferGeometry, Line, LineBasicMaterial } from 'three';
import getVecOnCurve from './utils/getVecOnCurve';
import { point2Vec } from './utils/vec2Point';
import { curveDefaults, curveSchema } from '../interface/ICurve';
import { createMemo, createNestedEffect, Reactive } from '@lincode/reactivity';
import { Cancellable } from '@lincode/promiselikes';
import { overrideSelectionCandidates } from './core/StaticObjectManager/raycast/selectionCandidates';
import HelperSphere from './core/utils/HelperSphere';
import { getCameraRendered } from '../states/useCameraRendered';
import mainCamera from '../engine/mainCamera';
import Appendable from '../api/core/Appendable';
const createFor = (dataList, create) => {
    const dataNewSet = new Set(dataList);
    const dataOldSet = createMemo(() => new Set(), []);
    const dataResultMap = createMemo(() => new Map(), []);
    const dataCleanupMap = createMemo(() => new Map(), []);
    for (const data of dataNewSet)
        if (!dataOldSet.has(data)) {
            const handle = new Cancellable();
            dataResultMap.set(data, create(data, handle));
            dataCleanupMap.set(data, handle);
        }
    for (const data of dataOldSet)
        if (!dataNewSet.has(data)) {
            dataCleanupMap.get(data).cancel();
            dataCleanupMap.delete(data);
            dataResultMap.delete(data);
        }
    createNestedEffect(() => {
        return () => {
            for (const handle of dataCleanupMap.values())
                handle.cancel();
        };
    }, []);
    dataOldSet.clear();
    for (const data of dataList)
        dataOldSet.add(data);
    return dataResultMap;
};
export default class Curve extends Appendable {
    static componentName = 'curve';
    static defaults = curveDefaults;
    static schema = curveSchema;
    constructor() {
        super();
        scene.add(this.outerObject3d);
        this.createEffect(() => {
            const segments = this._points.length * this._subdivide;
            const bufferAttribute = new BufferAttribute(new Float32Array(segments * 3), 3);
            const geometry = new BufferGeometry();
            geometry.setAttribute('position', bufferAttribute);
            const material = new LineBasicMaterial({ color: 0xff0000 });
            const curveMesh = new Line(geometry, material);
            curveMesh.frustumCulled = true;
            curveMesh.userData.unselectable = true;
            this.outerObject3d.add(curveMesh);
            if (this._points.length < 2)
                for (let i = 0; i < segments; ++i)
                    bufferAttribute.setXYZ(i, 0, 0, 0);
            else {
                const vecs = this._points.map(point2Vec);
                for (let i = 0; i < segments; ++i) {
                    const t = i / (segments - 1);
                    const vec = getVecOnCurve(vecs, t);
                    bufferAttribute.setXYZ(i, vec.x, vec.y, vec.z);
                }
            }
            return () => {
                geometry.dispose();
                material.dispose();
                this.outerObject3d.remove(curveMesh);
            };
        }, [this.refreshState.get]);
        let move = false;
        this.createEffect(() => {
            const helpers = createFor(this.helperState.get() && getCameraRendered() === mainCamera ? this._points : [], (pt, cleanup) => {
                const helper = new HelperSphere();
                this.append(helper);
                helper.scale = 0.1;
                overrideSelectionCandidates.add(helper.outerObject3d);
                helper.onMove = () => {
                    move = true;
                    Object.assign(pt, helper.getWorldPosition());
                    this.refreshState.set({});
                };
                cleanup.then(() => {
                    helper.dispose();
                    overrideSelectionCandidates.delete(helper.outerObject3d);
                });
                return helper;
            });
            if (move) {
                move = false;
                return;
            }
            for (const [point, helper] of helpers)
                Object.assign(helper, point);
        }, [this.helperState.get, this.refreshState.get, getCameraRendered]);
    }
    refreshState = new Reactive({});
    helperState = new Reactive(false);
    get helper() {
        return this.helperState.get();
    }
    set helper(val) {
        this.helperState.set(val);
    }
    _subdivide = 3;
    get subdivide() {
        return this._subdivide;
    }
    set subdivide(val) {
        this._subdivide = val;
        this.refreshState.set({});
    }
    _points = [];
    get points() {
        return this._points;
    }
    set points(val) {
        this._points = val;
        this.refreshState.set({});
    }
    addPoint(pt) {
        this._points.push(pt);
        this.refreshState.set({});
    }
}
//# sourceMappingURL=Curve.js.map