const DB_NAME = "mixverse";
const DB_VERSION = 1; // Use a long long for this value (don't use a float)
const DB_STORE_NAME = "model-file";
class DBUtil {
    db;
    // @ts-ignore
    async get(
    // @ts-ignore
    url, blob, version) {
        this.db = await this.initDataBase();
        let getRequest = this.db
            .transaction([DB_STORE_NAME], "readwrite")
            .objectStore(DB_STORE_NAME)
            .get(url);
        return new Promise((resolve, reject) => {
            // @ts-ignore
            getRequest.onsuccess = (event) => {
                let modelFile = event.target.result;
                // 假如已经有缓存了 直接用缓存
                if (modelFile) {
                    resolve(modelFile);
                }
                else {
                    resolve({ blob, version });
                    // 假如没有缓存 请求新的模型存入
                    this.put(url, blob, version).catch(() => {
                        reject();
                    });
                }
            };
            // @ts-ignore
            getRequest.onerror = function (event) {
                console.log("error", event);
                reject();
            };
        });
    }
    async put(url, blob, version, isUpdate) {
        if (!blob) {
            return Promise.reject(false);
        }
        let data = {
            ssn: url,
            version,
            blob: ""
        };
        data.blob = blob;
        const method = isUpdate ? "put" : "add";
        let inputRequest = this.db
            .transaction([DB_STORE_NAME], "readwrite")
            .objectStore(DB_STORE_NAME)[method](data);
        return new Promise((resolve, reject) => {
            inputRequest.onsuccess = function () {
                console.log("glb数据添加成功");
                resolve(data.blob);
            };
            inputRequest.onerror = function (evt) {
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
            request.onerror = function () {
                // console.log("error: create db error");
                reject();
            };
            request.onupgradeneeded = function (evt) {
                evt.currentTarget.result.createObjectStore(DB_STORE_NAME, {
                    keyPath: "ssn"
                });
            };
            request.onsuccess = function (evt) {
                console.log("onsuccess: create db success ");
                resolve(evt.target.result);
            };
        });
    }
}
export default new DBUtil();
//# sourceMappingURL=indexDB.js.map