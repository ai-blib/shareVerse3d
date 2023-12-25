import { createEffect } from '@lincode/reactivity';
import { EffectComposer, EffectPass, RenderPass } from 'postprocessing';
// import { EffectComposer  } from 'three/examples/jsm/postprocessing/ShaderPass';
import { HalfFloatType } from 'three';
import { getCameraRendered } from '../../../states/useCameraRendered';
import { getRenderer } from '../../../states/useRenderer';
import { getResolution } from '../../../states/useResolution';
import scene from '../../scene';
import { getBloomEffect } from './bloomEffect';
import { getBokehEffect } from './bokehEffect';
import { getNormalPass } from './normalPass';
import { getOutlineEffect } from './outlineEffect';
import { getSelectiveBloomEffect } from './selectiveBloomEffect';
import { getSSAOEffect } from './ssaoEffect';
import { getSSREffect } from './ssrEffect';
import { getVignetteEffect } from './vignetteEffect';
const effectComposer = new EffectComposer(undefined, {
    frameBufferType: HalfFloatType
});
export default effectComposer;
effectComposer.multisampling = 4;
getRenderer(renderer => renderer && effectComposer.setRenderer(renderer));
createEffect(() => {
    const renderPass = new RenderPass(scene, getCameraRendered());
    // let fxaaPass = new ShaderPass(FXAAShader);
    // const render = getRenderer();
    // if (!render) {
    // 	return;
    // }
    // const pixelRatio = render.getPixelRatio();
    // fxaaPass.material['uniforms'].resolution.value.x = 1 / (window.innerWidth * pixelRatio);
    // fxaaPass.material['uniforms'].resolution.value.y = 1 / (window.innerHeight * pixelRatio);
    effectComposer.addPass(renderPass, 0);
    // @ts-ignore
    // effectComposer.addPass(fxaaPass, 0);
    return () => {
        effectComposer.removePass(renderPass);
        renderPass.dispose();
    };
}, [getCameraRendered, getRenderer]);
createEffect(() => {
    if (!getRenderer())
        return;
    const [w, h] = getResolution();
    effectComposer.setSize(w, h);
}, [getRenderer, getResolution]);
createEffect(() => {
    if (!getRenderer())
        return;
    const normalPass = getNormalPass();
    normalPass && effectComposer.addPass(normalPass);
    const effectPass = new EffectPass(getCameraRendered(), ...[
        getBloomEffect(),
        getSelectiveBloomEffect(),
        getSSREffect(),
        getSSAOEffect(),
        getOutlineEffect(),
        getBokehEffect(),
        getVignetteEffect()
    ].filter(Boolean));
    effectComposer.addPass(effectPass);
    return () => {
        effectComposer.removePass(effectPass);
        normalPass && effectComposer.removePass(normalPass);
        effectPass.dispose();
    };
}, [
    getCameraRendered,
    getRenderer,
    getBloomEffect,
    getSelectiveBloomEffect,
    getSSREffect,
    getSSAOEffect,
    getOutlineEffect,
    getBokehEffect,
    getVignetteEffect,
    getNormalPass
]);
//# sourceMappingURL=index.js.map