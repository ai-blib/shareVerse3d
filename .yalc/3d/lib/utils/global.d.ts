declare class Global {
    _fallToGround: boolean;
    constructor();
    set hove_model_uuid(e: string);
    get hove_model_uuid(): string;
    set isEditorMode(e: any);
    get isEditorMode(): any;
    get bvhOnGround(): any;
    set bvhOnGround(value: any);
    set isClickModel(val: boolean);
    get isClickModel(): boolean;
    set isFirstLoad(value: boolean);
    get isFirstLoad(): boolean;
}
export declare const global: Global;
export {};
