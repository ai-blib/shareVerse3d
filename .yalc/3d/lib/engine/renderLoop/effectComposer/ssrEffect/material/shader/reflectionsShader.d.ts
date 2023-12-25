declare const _default: "varying vec2 vUv;\n\nuniform sampler2D inputTexture;\nuniform sampler2D accumulatedTexture;\nuniform sampler2D normalTexture;\nuniform sampler2D depthTexture;\nuniform sampler2D envMap;\n\nuniform mat4 _projectionMatrix;\nuniform mat4 _inverseProjectionMatrix;\nuniform mat4 cameraMatrixWorld;\nuniform float cameraNear;\nuniform float cameraFar;\n\nuniform float rayDistance;\nuniform float intensity;\nuniform float maxDepthDifference;\nuniform float roughnessFade;\nuniform float maxRoughness;\nuniform float fade;\nuniform float thickness;\nuniform float ior;\n\nuniform float samples;\n\nuniform float jitter;\nuniform float jitterRoughness;\n\n#define INVALID_RAY_COORDS vec2(-1.0);\n#define EARLY_OUT_COLOR    vec4(0.0, 0.0, 0.0, 1.0)\n#define FLOAT_EPSILON      0.00001\n\nfloat nearMinusFar;\nfloat nearMulFar;\nfloat farMinusNear;\n\n#include <packing>\n\n// helper functions\n#include <helperFunctions>\n\nvec2 RayMarch(vec3 dir, inout vec3 hitPos, inout float rayHitDepthDifference);\nvec2 BinarySearch(in vec3 dir, inout vec3 hitPos, inout float rayHitDepthDifference);\nfloat fastGetViewZ(const in float depth);\nvec3 getIBLRadiance(const in vec3 viewDir, const in vec3 normal, const in float roughness);\n\nvoid main() {\n    vec4 depthTexel = textureLod(depthTexture, vUv, 0.0);\n\n    // filter out sky\n    if (dot(depthTexel.rgb, depthTexel.rgb) < FLOAT_EPSILON) {\n        gl_FragColor = EARLY_OUT_COLOR;\n        return;\n    }\n\n    float unpackedDepth = unpackRGBAToDepth(depthTexel);\n\n    vec4 normalTexel = textureLod(normalTexture, vUv, 0.0);\n    float roughness = normalTexel.a;\n\n    float specular = 1.0 - roughness;\n\n    // pre-calculated variables for the \"fastGetViewZ\" function\n    nearMinusFar = cameraNear - cameraFar;\n    nearMulFar = cameraNear * cameraFar;\n    farMinusNear = cameraFar - cameraNear;\n\n    normalTexel.rgb = unpackRGBToNormal(normalTexel.rgb);\n\n    // view-space depth\n    float depth = fastGetViewZ(unpackedDepth);\n\n    // view-space position of the current texel\n    vec3 viewPos = getViewPosition(depth);\n    vec3 viewDir = normalize(viewPos);\n    vec3 viewNormal = normalTexel.xyz;\n\n    // world-space position of the current texel\n    vec3 worldPos = screenSpaceToWorldSpace(vUv, unpackedDepth);\n\n    // jitteriing\n    vec3 jitt = vec3(0.0);\n\n    if (jitterRoughness != 0.0 || jitter != 0.0) {\n        vec3 randomJitter = hash(50.0 * samples * worldPos) - 0.5;\n        float spread = ((2.0 - specular) + roughness * jitterRoughness);\n        float jitterMix = jitter * 0.25 + jitterRoughness * roughness;\n        if (jitterMix > 1.0) jitterMix = 1.0;\n        jitt = mix(vec3(0.0), randomJitter * spread, jitterMix);\n    }\n\n    viewNormal += jitt;\n\n    float fresnelFactor = fresnel_dielectric(viewDir, viewNormal, ior);\n\n    vec3 iblRadiance = getIBLRadiance(-viewDir, viewNormal, 0.) * fresnelFactor;\n\n    float lastFrameAlpha = textureLod(accumulatedTexture, vUv, 0.0).a;\n\n    if (roughness > maxRoughness || (roughness > 1.0 - FLOAT_EPSILON && roughnessFade > 1.0 - FLOAT_EPSILON)) {\n        gl_FragColor = vec4(iblRadiance, lastFrameAlpha);\n        return;\n    }\n\n    // view-space reflected ray\n    vec3 reflected = reflect(viewDir, viewNormal);\n\n    vec3 rayDir = reflected * -viewPos.z;\n\n    vec3 hitPos = viewPos;\n    float rayHitDepthDifference;\n\n    vec2 coords = RayMarch(rayDir, hitPos, rayHitDepthDifference);\n\n    if (coords.x == -1.0) {\n        gl_FragColor = vec4(iblRadiance, lastFrameAlpha);\n        return;\n    }\n\n    vec4 SSRTexel = textureLod(inputTexture, coords.xy, 0.0);\n    vec4 SSRTexelReflected = textureLod(accumulatedTexture, coords.xy, 0.0);\n\n    vec3 SSR = SSRTexel.rgb + SSRTexelReflected.rgb;\n\n    float roughnessFactor = mix(specular, 1.0, max(0.0, 1.0 - roughnessFade));\n\n    vec2 coordsNDC = (coords.xy * 2.0 - 1.0);\n    float screenFade = 0.1;\n    float maxDimension = min(1.0, max(abs(coordsNDC.x), abs(coordsNDC.y)));\n    float reflectionIntensity = 1.0 - (max(0.0, maxDimension - screenFade) / (1.0 - screenFade));\n    reflectionIntensity = max(0., reflectionIntensity);\n\n    vec3 finalSSR = mix(iblRadiance, SSR, reflectionIntensity) * roughnessFactor;\n\n    // vec2 dCoords = smoothstep(0.2, 0.6, abs(vec2(0.5, 0.5) - coords.xy));\n    // float screenEdgefactor = clamp(1.0 - (dCoords.x + dCoords.y), 0.0, 1.0);\n    // vec3 finalSSR = mix(iblRadiance, SSR * screenEdgefactor, screenEdgefactor) * roughnessFactor;\n\n    if (fade != 0.0) {\n        vec3 hitWorldPos = screenSpaceToWorldSpace(coords, rayHitDepthDifference);\n\n        // distance from the reflection point to what it's reflecting\n        float reflectionDistance = distance(hitWorldPos, worldPos) + 1.0;\n\n        float opacity = 1.0 / (reflectionDistance * fade * 0.1);\n        if (opacity > 1.0) opacity = 1.0;\n        finalSSR *= opacity;\n    }\n\n    finalSSR *= fresnelFactor * intensity;\n    finalSSR = min(vec3(1.0), finalSSR);\n\n    float alpha = hitPos.z == 1.0 ? 1.0 : SSRTexelReflected.a;\n    alpha = min(lastFrameAlpha, alpha);\n\n    gl_FragColor = vec4(finalSSR, alpha);\n}\n\nvec2 RayMarch(vec3 dir, inout vec3 hitPos, inout float rayHitDepthDifference) {\n    dir = normalize(dir);\n    dir *= rayDistance / float(steps);\n\n    float depth;\n    vec4 projectedCoord;\n    vec4 lastProjectedCoord;\n    float unpackedDepth;\n    vec4 depthTexel;\n\n    for (int i = 0; i < steps; i++) {\n        hitPos += dir;\n\n        projectedCoord = _projectionMatrix * vec4(hitPos, 1.0);\n        projectedCoord.xy /= projectedCoord.w;\n        // [-1, 1] --> [0, 1] (NDC to screen position)\n        projectedCoord.xy = projectedCoord.xy * 0.5 + 0.5;\n\n// the ray is outside the camera's frustum\n#ifndef missedRays\n        if (projectedCoord.x < 0.0 || projectedCoord.x > 1.0 || projectedCoord.y < 0.0 || projectedCoord.y > 1.0) {\n            return INVALID_RAY_COORDS;\n        }\n#endif\n\n        depthTexel = textureLod(depthTexture, projectedCoord.xy, 0.0);\n\n        unpackedDepth = unpackRGBAToDepth(depthTexel);\n\n        depth = fastGetViewZ(unpackedDepth);\n\n        rayHitDepthDifference = depth - hitPos.z;\n\n        if (rayHitDepthDifference >= 0.0 && rayHitDepthDifference < thickness) {\n#if refineSteps == 0\n            // filter out sky\n            if (dot(depthTexel.rgb, depthTexel.rgb) < FLOAT_EPSILON) return INVALID_RAY_COORDS;\n#else\n            return BinarySearch(dir, hitPos, rayHitDepthDifference);\n#endif\n        }\n\n#ifndef missedRays\n        // the ray is behind the camera\n        if (hitPos.z > 0.0) {\n            return INVALID_RAY_COORDS;\n        }\n#endif\n\n        lastProjectedCoord = projectedCoord;\n    }\n\n    // since hitPos isn't used anywhere we can use it to mark that this reflection would have been invalid\n    hitPos.z = 1.0;\n\n#ifndef missedRays\n    return INVALID_RAY_COORDS;\n#endif\n\n    rayHitDepthDifference = unpackedDepth;\n\n    return projectedCoord.xy;\n}\n\nvec2 BinarySearch(in vec3 dir, inout vec3 hitPos, inout float rayHitDepthDifference) {\n    float depth;\n    vec4 projectedCoord;\n    vec2 lastMinProjectedCoordXY;\n    float unpackedDepth;\n    vec4 depthTexel;\n\n    for (int i = 0; i < refineSteps; i++) {\n        projectedCoord = _projectionMatrix * vec4(hitPos, 1.0);\n        projectedCoord.xy /= projectedCoord.w;\n        projectedCoord.xy = projectedCoord.xy * 0.5 + 0.5;\n\n        depthTexel = textureLod(depthTexture, projectedCoord.xy, 0.0);\n\n        unpackedDepth = unpackRGBAToDepth(depthTexel);\n        depth = fastGetViewZ(unpackedDepth);\n\n        rayHitDepthDifference = depth - hitPos.z;\n\n        dir *= 0.5;\n\n        if (rayHitDepthDifference > 0.0) {\n            hitPos -= dir;\n        } else {\n            hitPos += dir;\n        }\n    }\n\n    // filter out sky\n    if (dot(depthTexel.rgb, depthTexel.rgb) < FLOAT_EPSILON) return INVALID_RAY_COORDS;\n\n    if (abs(rayHitDepthDifference) > maxDepthDifference) return INVALID_RAY_COORDS;\n\n    projectedCoord = _projectionMatrix * vec4(hitPos, 1.0);\n    projectedCoord.xy /= projectedCoord.w;\n    projectedCoord.xy = projectedCoord.xy * 0.5 + 0.5;\n\n    rayHitDepthDifference = unpackedDepth;\n\n    return projectedCoord.xy;\n}\n\n// source: https://github.com/mrdoob/three.js/blob/342946c8392639028da439b6dc0597e58209c696/examples/js/shaders/SAOShader.js#L123\nfloat fastGetViewZ(const in float depth) {\n#ifdef PERSPECTIVE_CAMERA\n    return nearMulFar / (farMinusNear * depth - cameraFar);\n#else\n    return depth * nearMinusFar - cameraNear;\n#endif\n}\n\n#include <common>\n#include <cube_uv_reflection_fragment>\n\n// from: https://github.com/mrdoob/three.js/blob/d5b82d2ca410e2e24ca2f7320212dfbee0fe8e89/src/renderers/shaders/ShaderChunk/envmap_physical_pars_fragment.glsl.js#L22\nvec3 getIBLRadiance(const in vec3 viewDir, const in vec3 normal, const in float roughness) {\n#if defined(ENVMAP_TYPE_CUBE_UV)\n    vec3 reflectVec = reflect(-viewDir, normal);\n\n    // Mixing the reflection with the normal is more accurate and keeps rough objects from gathering light from behind their tangent plane.\n    reflectVec = normalize(mix(reflectVec, normal, roughness * roughness));\n    reflectVec = inverseTransformDirection(reflectVec, viewMatrix);\n\n    vec4 envMapColor = textureCubeUV(envMap, reflectVec, roughness);\n    return envMapColor.rgb * intensity;\n#else\n    return vec3(0.0);\n#endif\n}";
export default _default;
