declare class DBUtil {
    db: any;
    get(url: any, blob?: Blob, version?: string): Promise<{
        blob: Blob | string | undefined;
        version: string | undefined;
    }>;
    put(url: string, blob?: Blob, version?: string, isUpdate?: boolean): Promise<unknown>;
    initDataBase(): Promise<unknown> | undefined;
}
declare const _default: DBUtil;
export default _default;
