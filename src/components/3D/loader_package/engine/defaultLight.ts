import { Cancellable } from '@lincode/promiselikes';
import { createEffect } from '@lincode/reactivity';
import { EquirectangularReflectionMapping } from 'three';
import Environment from '../display/Environment';
import loadTexture from '../display/utils/loaders/loadTexture';
import loadAsyncTexture from '../display/utils/loaders/loadAsyncTexture';

import { FAR, TEXTURES_URL } from '../globals';
import { environmentPreset } from '../interface/IEnvironment';
import { getDefaultShadow } from '../states/useDefaultShadow';
import { getCentripetal } from '../states/useCentripetal';
import { getDefaultLight } from '../states/useDefaultLight';
import { getEnvironment } from '../states/useEnvironment';
import { getEnvironmentStack } from '../states/useEnvironmentStack';
import { getRenderer } from '../states/useRenderer';
import scene from './scene';
import { appendableRoot } from '../api/core/collections';
import unsafeGetValue from '../utils/unsafeGetValue';
import * as THREE from 'three';

const defaultEnvironment = new Environment();
defaultEnvironment.texture = undefined;
defaultEnvironment.helper = false;
appendableRoot.delete(defaultEnvironment);

export const mapEnvironmentPreset = (value: string|any) =>
	value in environmentPreset ? TEXTURES_URL + unsafeGetValue(environmentPreset, value) : value;

createEffect(() => {
	const environment = getEnvironmentStack().at(-1);
	const renderer = getRenderer();

	if (!environment?.texture || !renderer || environment.texture === 'dynamic') return;

	let proceed = true;
	(async () => {
		const texture = await loadAsyncTexture(mapEnvironmentPreset(environment.texture), () => {
			if (proceed) {
				setTimeout(() => {
					const gen = new THREE.PMREMGenerator(renderer);
					texture.encoding = THREE.sRGBEncoding;
					let envMap = gen.fromEquirectangular(texture).texture;
					scene.environment = envMap;
					scene.background = envMap;
					texture.dispose();
					gen.dispose();
				}, 100);
			}
		});
		texture.encoding = THREE.sRGBEncoding;
	})();
	return () => {
		proceed = false;
		scene.environment = null;
	};
}, [getEnvironmentStack, getRenderer]);

createEffect(() => {
	const defaultLight = getDefaultLight();
	if (!defaultLight || typeof defaultLight === 'string') return;

	const handle = new Cancellable();
	import('../display/lights/SkyLight').then(module => {
		const SkyLight = module.default;
		const light = new SkyLight();
		light.helper = false;
		light.intensity = 0.5;
		light.y = FAR;
		light.z = FAR;
		appendableRoot.delete(light);
		handle.watch(getDefaultShadow(val => (light.castShadow = val)) as any);
		handle.then(() => light.dispose());
	});
	return () => {
		handle.cancel();
	};
}, [getDefaultLight, getCentripetal]);

createEffect(() => {
	const defaultLight = getDefaultLight();
	const environment = typeof defaultLight === 'string' ? defaultLight : getEnvironment();
	if (!environment) return;

	defaultEnvironment.texture = environment;
	return () => {
		defaultEnvironment.texture = undefined;
	};
}, [getEnvironment, getDefaultLight]);
