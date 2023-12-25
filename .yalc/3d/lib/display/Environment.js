import { pullEnvironmentStack, pushEnvironmentStack, refreshEnvironmentStack } from '../states/useEnvironmentStack';
import { environmentDefaults, environmentSchema } from '../interface/IEnvironment';
import PositionedItem from '../api/core/PositionedItem';
import { getCameraRendered } from '../states/useCameraRendered';
import mainCamera from '../engine/mainCamera';
import { Reactive } from '@lincode/reactivity';
import { addSelectionHelper } from './core/StaticObjectManager/raycast/selectionCandidates';
import HelperSprite from './core/utils/HelperSprite';
export default class Environment extends PositionedItem {
    static componentName = 'environment';
    static defaults = environmentDefaults;
    static schema = environmentSchema;
    constructor() {
        super();
        pushEnvironmentStack(this);
        this.createEffect(() => {
            if (getCameraRendered() !== mainCamera || !this.helperState.get())
                return;
            const handle = addSelectionHelper(new HelperSprite('light'), this);
            return () => {
                handle.cancel();
            };
        }, [getCameraRendered, this.helperState.get]);
    }
    dispose() {
        if (this.done)
            return this;
        super.dispose();
        pullEnvironmentStack(this);
        return this;
    }
    _texture = 'studio';
    get texture() {
        return this._texture;
    }
    set texture(value) {
        this._texture = value;
        refreshEnvironmentStack();
    }
    helperState = new Reactive(true);
    get helper() {
        return this.helperState.get();
    }
    set helper(val) {
        this.helperState.set(val);
    }
}
//# sourceMappingURL=Environment.js.map