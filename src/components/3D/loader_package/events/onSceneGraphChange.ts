import { event } from '@lincode/events';
import { throttleTrailing } from '@lincode/utils';

const [_emitSceneGraphChange, onSceneGraphChange] = event() as any;
export { onSceneGraphChange };

export const emitSceneGraphChange = throttleTrailing(_emitSceneGraphChange);
