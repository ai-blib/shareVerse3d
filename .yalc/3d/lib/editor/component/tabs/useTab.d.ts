import { Signal } from "@preact/signals";
export declare const TabContext: import("preact").Context<{
    selectedSignal: Signal<string | undefined>;
    tabs: Array<string>;
}>;
declare const _default: (children?: string, selected?: boolean, disabled?: boolean) => {
    selectedSignal: Signal<string | undefined>;
    tabs: string[];
};
export default _default;
