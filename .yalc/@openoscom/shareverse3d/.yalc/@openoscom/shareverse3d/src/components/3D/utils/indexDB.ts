const DB_NAME = "mixverse";
const DB_VERSION = 1; // Use a long long for this value (don't use a float)
const DB_STORE_NAME = "model-file";

interface ObjProps {
    ssn: string,
    blob: Blob | string,
    version?: string
}

class DBUtil {
    db: any;

    async get(url, blob?: Blob, version?: string): Promise<{ blob: Blob | string | undefined, version: string | undefined }> {
        this.db = await this.initDataBase();
        let getRequest = this.db
            .transaction([DB_STORE_NAME], "readwrite").objectStore(DB_STORE_NAME).get(url);
        return new Promise((resolve, reject) => {
            getRequest.onsuccess = (event) => {
                let modelFile = event.target.result;
                // 假如已经有缓存了 直接用缓存
                if (modelFile) {
                    resolve(modelFile);
                } else {
                    resolve({ blob, version });
                    // 假如没有缓存 请求新的模型存入
                    this.put(url, blob, version).catch(() => {
                        reject();
                    });
                }
            };
            getRequest.onerror = function(event) {
                console.log("error", event);
                reject();
            };
        });
    }

    async put(url, blob?: Blob, version?: string, isUpdate?: boolean) {
        if (!blob) {
            return Promise.reject(false);
        }
        let data: ObjProps = {
            ssn: url,
            version,
            blob: ""
        };
        data.blob = blob;
        const method = isUpdate ? "put" : "add";
        let inputRequest = (this.db
            .transaction([DB_STORE_NAME], "readwrite")
            .objectStore(DB_STORE_NAME))[method](data);
        return new Promise((resolve, reject) => {
            inputRequest.onsuccess = function() {
                console.log("glb数据添加成功");
                resolve(data.blob);
            };
            inputRequest.onerror = function(evt) {
                console.log("glb数据添加失败", evt);
                reject();
            };
        });

    }

    initDataBase() {
        if (!window.indexedDB) {
            // console.log("Your browser doesn't support a stable version of IndexedDB.");
            return;
        }
        let request = indexedDB.open(DB_NAME, DB_VERSION);
        return new Promise((resolve, reject) => {
            request.onerror = function() {
                // console.log("error: create db error");
                reject();
            };
            request.onupgradeneeded = function(evt: any) {
                evt.currentTarget.result.createObjectStore(
                    DB_STORE_NAME, { keyPath: "ssn" });
            };
            request.onsuccess = function(evt: any) {
                console.log("onsuccess: create db success ");
                resolve(evt.target.result);
            };
        });
    }
}

export default new DBUtil();
