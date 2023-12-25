export default class LoadModelCache {
    constructor();
    static checkUrl(modelUrl: string): Promise<string>;
    static loaderChunkFile(url: any): Promise<string>;
    static loaderMergeFile(url: string, version: undefined | string, File_Blob: any, callBack: (e: any) => void): Promise<unknown>;
    static loaderChunkBold(url: string): Promise<any>;
    static loaderBold(url: string): Promise<string>;
}
