import { Pane } from '../TweakPane/tweakpane';
import Defaults from '../../interface/utils/Defaults';
import { Cancellable } from '@lincode/promiselikes';
declare const _default: (handle: Cancellable, pane: Pane, title: string, target: Record<string, any>, defaults: Defaults<any>, params: Record<string, any>, prepend?: boolean) => Promise<{
    [k: string]: any;
}>;
export default _default;
