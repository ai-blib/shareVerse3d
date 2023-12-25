import JSZip from "jszip";
import * as THREE from "three";
import DBUtil from "./indexDB";
const new_zip = new JSZip();
export default class LoadModelCache {
    constructor() { }
    // @ts-ignore
    static async checkUrl(modelUrl) {
        if (modelUrl && modelUrl.includes("json")) {
            const blobUrl = await this.loaderChunkFile(modelUrl);
            const blobType = blobUrl.includes("blob");
            if (!blobType) {
                throw new Error("Unsupported file extension ");
            }
            return blobUrl;
        }
        return modelUrl;
    }
    // @ts-ignore
    static async loaderChunkFile(url) {
        return new Promise(async (resolve, reject) => {
            const { blob: File_Blob, version } = await DBUtil.get(url);
            if (File_Blob) {
                // @ts-ignore
                const modelUrl = window.URL.createObjectURL(File_Blob);
                resolve(modelUrl);
            }
            // 避免频繁调用
            await this.loaderMergeFile(url, version, File_Blob, resolve);
        });
    }
    static async loaderMergeFile(url, version, File_Blob, callBack) {
        const _baseDomain = "https://d1ktb2pux2fae3.cloudfront.net"; //url.split("/template/")[0];
        // const _baseDomain =url.split("/template/")[0];
        const _baseUrl = _baseDomain + "/template/";
        return new Promise((resolve, reject) => {
            const loader = new THREE.FileLoader();
            loader.setResponseType("json");
            loader.load(url + "?=" + new Date().getTime(), async ({ name, total, version: v }) => {
                if (v === version && File_Blob) {
                    return;
                }
                const promiseLoaderChunks = [];
                for (let i = 0; i < total; i++) {
                    const url = _baseUrl + name + i;
                    promiseLoaderChunks.push(this.loaderChunkBold(url + "?=" + new Date().getTime()));
                }
                const chunksBuffer = await Promise.all(promiseLoaderChunks);
                const fileBlob = new Blob(chunksBuffer, {
                    type: "application/octet-stream;charset=utf-8"
                }); //合并后的数组转成一个Blob对象。
                const modelUrl = window.URL.createObjectURL(fileBlob);
                const isUpdate = !fileBlob || v !== version;
                callBack(modelUrl);
                //
                const _url = url.split("?")[0];
                await DBUtil.put(_url, fileBlob, v, isUpdate);
                resolve(modelUrl);
                // resolve(modelUrl);
            });
        });
    }
    static loaderChunkBold(url) {
        return new Promise((resolve, reject) => {
            const loader = new THREE.FileLoader();
            loader.setResponseType("arraybuffer");
            loader.load(url, (resp) => {
                let files = new window.File([resp], "zipFile", { type: "zip" });
                // 解压缩文件对象
                new_zip
                    .loadAsync(files)
                    .then(function (result) {
                    // 压缩包的模型文件列表
                    let fileList = result.files;
                    for (let key in fileList) {
                        if (key) {
                            // 读取模型文件内容
                            // @ts-ignore
                            new_zip
                                .file(key)
                                .async("arraybuffer")
                                .then((content) => {
                                // Blob构造文件地址，通过url加载模型
                                let blob = new Blob([content]);
                                // let modelUrl = window.URL.createObjectURL(blob);
                                resolve(blob);
                            });
                        }
                    }
                })
                    .catch((err) => {
                    reject(err);
                });
            });
        });
    }
    static loaderBold(url) {
        return new Promise((resolve, reject) => {
            const loader = new THREE.FileLoader();
            loader.setResponseType("arraybuffer");
            loader.load(url, (resp) => {
                console.log(resp.data, "resp");
                let files = new window.File([resp], "zipFile", { type: "zip" });
                // 解压缩文件对象
                new_zip
                    .loadAsync(files)
                    .then(function (result) {
                    // 压缩包的模型文件列表
                    let fileList = result.files;
                    console.log(fileList, "fileList");
                    for (let key in fileList) {
                        console.log(key, "key");
                        if (key) {
                            // 读取模型文件内容
                            // @ts-ignore
                            new_zip
                                .file(key)
                                .async("arraybuffer")
                                .then((content) => {
                                // Blob构造文件地址，通过url加载模型
                                let blob = new Blob([content]);
                                let modelUrl = window.URL.createObjectURL(blob);
                                resolve(modelUrl);
                            });
                        }
                    }
                })
                    .catch((err) => {
                    reject(err);
                });
            });
        });
    }
}
//# sourceMappingURL=index.js.map