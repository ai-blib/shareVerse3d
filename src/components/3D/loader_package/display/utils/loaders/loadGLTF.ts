import { GLTFLoader } from './loaders/GLTFLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';

import { Bone, Light, sRGBEncoding } from 'three';
import { forceGet } from './utils/forceGet';
import cloneSkinnedMesh from '../cloneSkinnedMesh';
import { handleProgress } from './bytesLoaded';
import { getWasmPath } from '../../../states/useWasmPath';
import { decreaseLoadingUnpkgCount, increaseLoadingUnpkgCount } from '../../../states/useLoadingUnpkgCount';
import { getRenderer } from '../../../states/useRenderer';
import LoadModelCache from '../MetaverseModelFun';

const renderer = getRenderer();
// @ts-ignore
const ktx2Loader = new KTX2Loader().setTranscoderPath('/basis/').detectSupport(renderer);

const cache = new Map<string, Promise<[GLTF, boolean]>>();
const loader = new GLTFLoader();

const dracoLoader = new DRACOLoader();
getWasmPath(wasmPath => dracoLoader.setDecoderPath(wasmPath));
loader.setDRACOLoader(dracoLoader);
loader.setKTX2Loader(ktx2Loader);
export const gltfLoader = loader;
export default async (url: string, clone: boolean) => {
	let blobUrl = '';
	if (url && url.includes('json')) {
		blobUrl = await LoadModelCache.loaderChunkFile(url);
		const blobType = blobUrl.includes('blob');
		if (!blobType) {
			throw new Error('Unsupported file extension ');
		}
	}
	const [gltf, noBone] = await forceGet(
		cache,
		url,
		() =>
			new Promise<[GLTF, boolean]>((resolve, reject) => {
				const unpkg = url.startsWith('https://unpkg.com/');
				unpkg && increaseLoadingUnpkgCount();
				loader.load(
					blobUrl || url,
					(gltf: GLTF) => {
						const lights: Array<Light> = [];
						let noBone = true;
						// ExporterToZip(gltf)
						// window.models.push(gltf.scenes)
						for (const scene of gltf.scenes) {
							scene.position.set(0, 0, 0);
							scene.translateY(0);
							scene.traverse((child: any) => {
								if (child instanceof Light) lights.push(child);
								else if (noBone && child instanceof Bone) noBone = false;
								if (child.isMesh) {
									// child.castShadow = true;
									// child.receiveShadow = true;

									if (child.material.map) {
										child.material.map.encoding = sRGBEncoding;
										child.material.map.anisotropy = 16;
									}
									if (child.material.emissiveMap) {
										child.material.emissiveMap.encoding = sRGBEncoding;
										child.material.emissiveMap = child.material.map;
									}
									// if (child.material.emissive) {
									// 	child.material.emissive = child.material.color;
									// }
									if (child.material.map || child.material.emissiveMap) {
										child.material.needsUpdate = true;
									}
									child.material.envMapIntensity = 1;

									// if(envMap)
									// {
									//     child.material.envMap = envMap;
									//     child.material.envMapIntensity = 1;
									// }
								}
								child.castShadow = true;
								child.receiveShadow = true;
								// child.anisotropy = 16;
								// child.magFilter = THREE.LinearFilter;
								// child.minFilter = THREE.LinearMipMapLinearFilter;
							});
							for (const light of lights) light.parent?.remove(light);

							unpkg && decreaseLoadingUnpkgCount();
							resolve([gltf, noBone]);
						}
					},
					handleProgress(url),
					reject
				);
			})
	);
	if (clone) return cloneSkinnedMesh(gltf.scene, noBone, gltf.animations);

	return gltf.scene;
};
