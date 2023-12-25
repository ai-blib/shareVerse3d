import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import JSZip from "jszip";
import { AwsUploadModel } from "../util/formate";

export const ExporterToZip = async (gltf: GLTF, name: string) => {
    return new Promise<string>(async (resolve, reject) => {
        if (gltf && gltf.scene) {
            const contentBuffer = await exporter(gltf);
            if (contentBuffer) {
                let fileBlob = new Blob([contentBuffer], { type: "application/octet-stream" });
                resolve(await zipToBlob(fileBlob, name));
            } else {
                resolve(contentBuffer);
            }
        } else if (gltf instanceof Blob) {
            resolve(await zipToBlob(gltf as any, name));
        }
    });

};

export const exporter = (gltf: GLTF) => {
    return new Promise<string>((resolve, reject) => {
        new GLTFExporter().parse(gltf.scene, async (contentBuffer: any) => {
            resolve(contentBuffer);
        }, (err) => {
            reject(err);
            console.log(err, "err");
            // @ts-ignore
        }, { binary: true });
    });

};
export const zipToBlob = (fileBlob: Blob, name: string) => {
    let zip = new JSZip();
    zip.file("modelZip", fileBlob);
    return zip.generateAsync({
        type: "blob",  // 压缩类型
        compression: "DEFLATE",      // STORE：默认不压缩 DEFLATE：需要压缩
        compressionOptions: {
            level: 9  // 压缩等级1~9    1压缩速度最快，9最优压缩方式
        }
    }).then(async (zipBlob: Blob) => { // 压缩的结果为blob类型（二进制流）,可用作文件上传
        console.log(zipBlob, "zipBlob");
        return await AwsUploadModel(new File([zipBlob], name || "mixverse"));
    });
};

export const ToBlob = (fileBlob: Blob, name: string,nameSpace?:string) => {
    let zip = new JSZip();
    zip.file("modelZip", fileBlob);
    return zip.generateAsync({
        type: "blob",  // 压缩类型
        compression: "DEFLATE",      // STORE：默认不压缩 DEFLATE：需要压缩
        compressionOptions: {
            level: 9  // 压缩等级1~9    1压缩速度最快，9最优压缩方式
        }
    }).then(async (zipBlob: Blob) => { // 压缩的结果为blob类型（二进制流）,可用作文件上传
        return await AwsUploadModel(new File([zipBlob], name || "mixverse"),nameSpace);
    });
};
