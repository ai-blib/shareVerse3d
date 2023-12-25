import store, { createEffect } from '@lincode/reactivity';
import { VignetteEffect, ShaderPass } from 'postprocessing';
import { getCameraRendered } from '../../../states/useCameraRendered';
import { getVignette } from '../../../states/useVignette';

const [setVignetteEffect, getVignetteEffect] = store<VignetteEffect | undefined>(undefined);
export { getVignetteEffect };

createEffect(() => {
	if (!getVignette()) return;

	const effect = new VignetteEffect({
		eskil: true,
		offset: 0.35,
		darkness: 0.5
	});
	setVignetteEffect(effect);

	return () => {
		setVignetteEffect(undefined);
		effect.dispose();
	};
}, [getVignette, getCameraRendered]);
