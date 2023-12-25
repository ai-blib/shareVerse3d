declare const _default: "varying vec2 vUv;\n\nvoid main() {\n    vUv = position.xy * 0.5 + 0.5;\n    gl_Position = vec4(position.xy, 1.0, 1.0);\n}";
export default _default;
