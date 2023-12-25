import { Reactive } from '@lincode/reactivity';
import getActualScale from './utils/getActualScale';
import getWorldPosition from './utils/getWorldPosition';
import { scaleDown } from '../engine/constants';
import { timer } from '../engine/eventLoop';
import mainCamera from '../engine/mainCamera';
import { triggerDefaults, triggerSchema } from '../interface/ITrigger';
import PositionedItem from '../api/core/PositionedItem';
import { getCameraRendered } from '../states/useCameraRendered';
import { getMeshItemSets } from './core/StaticObjectManager';
import { addSelectionHelper } from './core/StaticObjectManager/raycast/selectionCandidates';
import HelperCylinder from './core/utils/HelperCylinder';
import HelperSphere from './core/utils/HelperSphere';
export default class Trigger extends PositionedItem {
    static componentName = 'trigger';
    static defaults = triggerDefaults;
    static schema = triggerSchema;
    refresh = new Reactive({});
    onEnter;
    onExit;
    _pad = false;
    get pad() {
        return this._pad;
    }
    set pad(val) {
        this._pad = val;
        this.refresh.set({});
    }
    _radius = 50;
    get radius() {
        return this._radius;
    }
    set radius(val) {
        this._radius = val;
        this.refresh.set({});
    }
    _interval = 300;
    get interval() {
        return this._interval;
    }
    set interval(val) {
        this._interval = val;
        this.refresh.set({});
    }
    _helper = true;
    get helper() {
        return this._helper;
    }
    set helper(val) {
        this._helper = val;
        this.refresh.set({});
    }
    _target;
    get target() {
        return this._target;
    }
    set target(val) {
        this._target = val;
        this.refresh.set({});
    }
    constructor() {
        super();
        let helper;
        this.createEffect(() => {
            const { _radius, _interval, _target, _pad } = this;
            if (!_target)
                return;
            const targetSets = getMeshItemSets(_target);
            const r = _radius * scaleDown;
            const pr = r * 0.2;
            let hitOld = false;
            const handle = timer(_interval, -1, () => {
                const { x, y, z } = getWorldPosition(this.outerObject3d);
                let hit = false;
                let targetHit;
                for (const targetSet of targetSets)
                    for (const target of targetSet) {
                        const { x: tx, y: ty, z: tz } = getWorldPosition(target.nativeObject3d);
                        if (_pad) {
                            const { y: sy } = getActualScale(target);
                            hit = Math.abs(x - tx) < r && Math.abs(y - (ty - sy * 0.5)) < pr && Math.abs(z - tz) < r;
                        }
                        else
                            hit = Math.abs(x - tx) < r && Math.abs(y - ty) < r && Math.abs(z - tz) < r;
                        if (hit) {
                            targetHit = target;
                            break;
                        }
                    }
                if (hitOld !== hit)
                    if (hit && targetHit) {
                        this.onEnter?.(targetHit);
                        helper && (helper.color = 'blue');
                    }
                    else {
                        this.onExit?.();
                        helper && (helper.color = 'white');
                    }
                hitOld = hit;
            });
            return () => {
                handle.cancel();
            };
        }, [this.refresh.get]);
        this.createEffect(() => {
            const { _radius, _helper, _pad } = this;
            if (!_helper || getCameraRendered() !== mainCamera)
                return;
            helper = _pad ? new HelperCylinder() : new HelperSphere();
            const handle = addSelectionHelper(helper, this);
            helper.scale = _radius * scaleDown * 2;
            helper.height = _pad ? 10 : 100;
            return () => {
                helper.dispose();
                helper = undefined;
                handle.cancel();
            };
        }, [this.refresh.get, getCameraRendered]);
    }
}
//# sourceMappingURL=Trigger.js.map