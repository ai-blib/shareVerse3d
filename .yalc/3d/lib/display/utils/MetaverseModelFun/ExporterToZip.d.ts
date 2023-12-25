import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
export declare const ExporterToZip: (gltf: GLTF, name: string) => Promise<string>;
export declare const exporter: (gltf: GLTF) => Promise<string>;
export declare const zipToBlob: (fileBlob: Blob, name: string) => Promise<never>;
export declare const ToBlob: (fileBlob: Blob, name: string, nameSpace?: string) => Promise<void>;
