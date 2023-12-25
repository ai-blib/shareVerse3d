import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import JSZip from "jszip";
export const ExporterToZip = async (gltf, name) => {
    return new Promise(async (resolve, reject) => {
        if (gltf && gltf.scene) {
            const contentBuffer = await exporter(gltf);
            if (contentBuffer) {
                let fileBlob = new Blob([contentBuffer], { type: "application/octet-stream" });
                resolve(await zipToBlob(fileBlob, name));
            }
            else {
                resolve(contentBuffer);
            }
        }
        else if (gltf instanceof Blob) {
            resolve(await zipToBlob(gltf, name));
        }
    });
};
export const exporter = (gltf) => {
    return new Promise((resolve, reject) => {
        new GLTFExporter().parse(gltf.scene, async (contentBuffer) => {
            resolve(contentBuffer);
        }, (err) => {
            reject(err);
            console.log(err, "err");
            // @ts-ignore
        }, { binary: true });
    });
};
export const zipToBlob = (fileBlob, name) => {
    let zip = new JSZip();
    zip.file("modelZip", fileBlob);
    return zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: {
            level: 9 // 压缩等级1~9    1压缩速度最快，9最优压缩方式
        }
    }).then(async (zipBlob) => {
        console.log(zipBlob, "zipBlob");
        throw new Error('no method');
        // return await AwsUploadModel(new File([zipBlob], name || "mixverse"));
    });
};
export const ToBlob = (fileBlob, name, nameSpace) => {
    let zip = new JSZip();
    zip.file("modelZip", fileBlob);
    return zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: {
            level: 9
        }
    }).then(async (zipBlob) => {
        console.log(zipBlob, "zipBlob");
        // return await AwsUploadModel(new File([zipBlob], name || "mixverse"),nameSpace);
    });
};
//# sourceMappingURL=ExporterToZip.js.map