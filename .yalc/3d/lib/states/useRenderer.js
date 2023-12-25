import store, { createEffect } from '@lincode/reactivity';
import { WebGLRenderer } from 'three';
import { getBackgroundColor } from './useBackgroundColor';
import { getLogarithmicDepth } from './useLogarithmicDepth';
import * as THREE from 'three';
const [setRenderer, getRenderer] = store(undefined);
export { getRenderer };
createEffect(() => {
    const renderer = new WebGLRenderer({
        powerPreference: 'high-performance',
        alpha: true,
        // logarithmicDepthBuffer:
        //     isChromium && !isMobile ? getLogarithmicDepth() : false,
        logarithmicDepthBuffer: true,
        antialias: true,
        precision: 'highp'
    });
    // renderer.outputEncoding = THREE.sRGBEncoding;
    // renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.physicallyCorrectLights = true;
    renderer.setPixelRatio(window.devicePixelRatio * 2);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.sortObjects = false;
    setRenderer(renderer);
    return () => {
        renderer.dispose();
    };
}, [getBackgroundColor, getLogarithmicDepth]);
//# sourceMappingURL=useRenderer.js.map