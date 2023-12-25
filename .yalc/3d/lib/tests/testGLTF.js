import Model from "../display/Model";
const model = new Model();
model.src = "parrot.glb";
model.animationRepeat = 2;
model.onAnimationFinish = () => console.log("done");
//# sourceMappingURL=testGLTF.js.map