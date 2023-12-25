export const downPtr: boolean[];
export class BladeApi {
    constructor(controller: any);
    controller_: any;
    get element(): any;
    set disabled(arg: any);
    get disabled(): any;
    set hidden(arg: any);
    get hidden(): any;
    dispose(): void;
}
export class ButtonApi extends BladeApi {
    set label(arg: any);
    get label(): any;
    set title(arg: any);
    get title(): any;
    on(eventName: any, handler: any): ButtonApi;
}
export class FolderApi extends RackLikeApi {
    emitter_: Emitter;
    set expanded(arg: any);
    get expanded(): any;
    set title(arg: any);
    get title(): any;
    get children(): any;
    addInput(object: any, key: any, opt_params: any): any;
    addMonitor(object: any, key: any, opt_params: any): any;
    addFolder(params: any): any;
    addButton(params: any): any;
    addSeparator(opt_params: any): any;
    addTab(params: any): any;
    add(api: any, opt_index: any): any;
    remove(api: any): void;
    addBlade(params: any): any;
    on(eventName: any, handler: any): FolderApi;
}
export class InputBindingApi extends BladeApi {
    onBindingChange_(ev: any): void;
    emitter_: Emitter;
    set label(arg: any);
    get label(): any;
    on(eventName: any, handler: any): InputBindingApi;
    refresh(): void;
}
export class ListApi extends BladeApi {
    emitter_: Emitter;
    set label(arg: any);
    get label(): any;
    set options(arg: any);
    get options(): any;
    set value(arg: any);
    get value(): any;
    on(eventName: any, handler: any): ListApi;
}
export class MonitorBindingApi extends BladeApi {
    onBindingUpdate_(ev: any): void;
    emitter_: Emitter;
    set label(arg: any);
    get label(): any;
    on(eventName: any, handler: any): MonitorBindingApi;
    refresh(): void;
}
/**
 * The root pane of Tweakpane.
 */
export class Pane extends RootApi {
    constructor(opt_config: any);
    pool_: PluginPool;
    containerElem_: any;
    doc_: any;
    usesDefaultWrapper_: boolean;
    get document(): any;
    registerPlugin(bundle: any): void;
    embedPluginStyle_(plugin: any): void;
    setUpDefaultPlugins_(): void;
}
export class SeparatorApi extends BladeApi {
}
export class SliderApi extends BladeApi {
    emitter_: Emitter;
    set label(arg: any);
    get label(): any;
    set maxValue(arg: any);
    get maxValue(): any;
    set minValue(arg: any);
    get minValue(): any;
    set value(arg: any);
    get value(): any;
    on(eventName: any, handler: any): SliderApi;
}
export class TabApi extends RackLikeApi {
    onPageAdd_(ev: any): void;
    onPageRemove_(ev: any): void;
    onSelect_(ev: any): void;
    emitter_: Emitter;
    pageApiMap_: Map<any, any>;
    get pages(): any;
    addPage(params: any): any;
    removePage(index: any): void;
    on(eventName: any, handler: any): TabApi;
    setUpPageApi_(pc: any): void;
}
export class TabPageApi {
    constructor(controller: any, contentRackApi: any);
    controller_: any;
    rackApi_: any;
    set title(arg: any);
    get title(): any;
    set selected(arg: any);
    get selected(): any;
    get children(): any;
    addButton(params: any): any;
    addFolder(params: any): any;
    addSeparator(opt_params: any): any;
    addTab(params: any): any;
    add(api: any, opt_index: any): void;
    remove(api: any): void;
    addInput(object: any, key: any, opt_params: any): any;
    addMonitor(object: any, key: any, opt_params: any): any;
    addBlade(params: any): any;
}
export class TextApi extends BladeApi {
    emitter_: Emitter;
    set label(arg: any);
    get label(): any;
    set formatter(arg: any);
    get formatter(): any;
    set value(arg: any);
    get value(): any;
    on(eventName: any, handler: any): TextApi;
}
export class TpChangeEvent extends TpEvent {
    constructor(target: any, value: any, presetKey: any, last: any);
    value: any;
    presetKey: any;
    last: any;
}
export const VERSION: Semver;
declare class RackLikeApi extends BladeApi {
    constructor(controller: any, rackApi: any);
    rackApi_: any;
}
declare class Emitter {
    observers_: {};
    on(eventName: any, handler: any): Emitter;
    off(eventName: any, handler: any): Emitter;
    emit(eventName: any, event: any): void;
}
declare class RootApi extends FolderApi {
    /**
     * Imports a preset of all inputs.
     * @param preset The preset object to import.
     */
    importPreset(preset: any): void;
    /**
     * Exports a preset of all inputs.
     * @return An exported preset object.
     */
    exportPreset(): any;
    /**
     * Refreshes all bindings of the pane.
     */
    refresh(): void;
}
declare class PluginPool {
    pluginsMap_: {
        blades: never[];
        inputs: never[];
        monitors: never[];
    };
    getAll(): never[];
    register(r: any): void;
    createInput(document: any, target: any, params: any): any;
    createMonitor(document: any, target: any, params: any): any;
    createBlade(document: any, params: any): never;
    createBladeApi(bc: any): InputBindingApi | MonitorBindingApi | RackApi;
}
declare class TpEvent {
    constructor(target: any);
    target: any;
}
/***
 * A simple semantic versioning perser.
 */
declare class Semver {
    /**
     * @hidden
     */
    constructor(text: any);
    major: number;
    minor: number;
    patch: number;
    prerelease: any;
    toString(): string;
}
declare class RackApi extends BladeApi {
    constructor(controller: any, pool: any);
    onRackAdd_(ev: any): void;
    onRackRemove_(ev: any): void;
    onRackInputChange_(ev: any): void;
    onRackMonitorUpdate_(ev: any): void;
    emitter_: Emitter;
    apiSet_: NestedOrderedSet;
    pool_: any;
    get children(): any;
    addInput(object: any, key: any, opt_params: any): any;
    addMonitor(object: any, key: any, opt_params: any): any;
    addFolder(params: any): any;
    addButton(params: any): any;
    addSeparator(opt_params: any): any;
    addTab(params: any): any;
    add(api: any, opt_index: any): any;
    remove(api: any): void;
    addBlade(params: any): any;
    on(eventName: any, handler: any): RackApi;
    setUpApi_(bc: any): void;
}
declare class NestedOrderedSet {
    constructor(extract: any);
    emitter: Emitter;
    items_: any[];
    cache_: Set<any>;
    onSubListAdd_(ev: any): void;
    onSubListRemove_(ev: any): void;
    extract_: any;
    get items(): any[];
    allItems(): any[];
    find(callback: any): any;
    includes(item: any): boolean;
    add(item: any, opt_index: any): void;
    remove(item: any): void;
}
export {};
