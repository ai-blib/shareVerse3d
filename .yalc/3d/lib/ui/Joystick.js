import nipplejs from 'nipplejs';
import { joystickDefaults, joystickSchema } from '../interface/IJoystick';
import { Point } from '@lincode/math';
import createElement from '../utils/createElement';
import { Cancellable } from '@lincode/promiselikes';
import store, { Reactive } from '@lincode/reactivity';
import { onBeforeRender } from '../events/onBeforeRender';
import Appendable from '../api/core/Appendable';
import { uiContainer } from '../engine/renderLoop/renderSetup';
export default class Joystick extends Appendable {
    static componentName = 'joystick';
    static defaults = joystickDefaults;
    static schema = joystickSchema;
    onMove;
    onMoveStart;
    onMoveEnd;
    onPressState = new Reactive(undefined);
    get onPress() {
        return this.onPressState.get();
    }
    set onPress(cb) {
        this.onPressState.set(cb);
    }
    constructor() {
        super();
        let pt = new Point(0, 0);
        const [setDown, getDown] = store(false);
        this.createEffect(() => {
            const cb = this.onPressState.get();
            if (!cb || !getDown())
                return;
            const handle = onBeforeRender(() => {
                cb(pt);
            });
            return () => {
                return handle.cancel();
            };
        }, [this.onPressState.get, getDown]);
        this.createEffect(() => {
            const zone = createElement(`
                <div style="width: 150px; height: 150px; transform: scale(3); position: absolute; bottom: 85px; left: 85px;"></div>
            `);
            uiContainer.appendChild(zone);
            const prevent = (e) => {
                e.preventDefault();
                e.stopPropagation();
            };
            zone.onmousedown = prevent;
            zone.ontouchstart = prevent;
            zone.onpointerdown = prevent;
            const handle = new Cancellable();
            setTimeout(() => {
                if (handle.done)
                    return;
                const manager = nipplejs.create({
                    zone,
                    mode: 'static',
                    position: { left: '75px', bottom: '75px' },
                    color: 'white'
                });
                handle.then(() => manager.destroy());
                manager.on('start', () => {
                    this.onMoveStart?.(new Point(0, 0));
                    setDown(true);
                });
                manager.on('move', (_, nipple) => {
                    this.onMove?.(nipple.vector);
                    pt = nipple.vector;
                });
                manager.on('end', () => {
                    this.onMoveEnd?.(new Point(0, 0));
                    pt = new Point(0, 0);
                    setDown(false);
                });
            });
            return () => {
                handle.cancel();
                zone.remove();
            };
        }, []);
    }
}
//# sourceMappingURL=Joystick.js.map