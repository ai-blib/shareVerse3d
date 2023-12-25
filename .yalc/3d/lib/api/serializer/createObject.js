import Model from "../../display/Model";
import Dummy from "../../display/Dummy";
import Building from "../../display/Building";
import Tree from "../../display/Tree";
import SvgMesh from "../../display/SvgMesh";
import HTMLMesh from "../../display/HTMLMesh";
import Joystick from "../../ui/Joystick";
import Reticle from "../../ui/Reticle";
import SplashScreen from "../../ui/SplashScreen";
import Text from "../../ui/Text";
import Reflector from "../../display/Reflector";
import Water from "../../display/Water";
import Curve from "../../display/Curve";
import Sprite from "../../display/Sprite";
import Circle from "../../display/primitives/Circle";
import Cone from "../../display/primitives/Cone";
import Cube from "../../display/primitives/Cube";
import Cylinder from "../../display/primitives/Cylinder";
import Octahedron from "../../display/primitives/Octahedron";
import Plane from "../../display/primitives/Plane";
import Sphere from "../../display/primitives/Sphere";
import Tetrahedron from "../../display/primitives/Tetrahedron";
import Torus from "../../display/primitives/Torus";
import Camera from "../../display/cameras/Camera";
import AmbientLight from "../../display/lights/AmbientLight";
import AreaLight from "../../display/lights/AreaLight";
import DirectionalLight from "../../display/lights/DirectionalLight";
import SkyLight from "../../display/lights/SkyLight";
import PointLight from "../../display/lights/PointLight";
import SpotLight from "../../display/lights/SpotLight";
import Group from "../../display/Group";
import { type } from "@lincode/utils";
import ThirdPersonCamera from "../../display/cameras/ThirdPersonCamera";
import FirstPersonCamera from "../../display/cameras/FirstPersonCamera";
import OrbitCamera from "../../display/cameras/OrbitCamera";
import Skybox from "../../display/Skybox";
import Environment from "../../display/Environment";
import Setup from "../../display/Setup";
import Timeline from "../../display/Timeline";
import TimelineAudio from "../../display/TimelineAudio";
import Trigger from "../../display/Trigger";
import SpawnPoint from "../../display/SpawnPoint";
import Audio from "../../display/Audio";
const record = type({
    group: () => new Group(),
    model: () => new Model(),
    svgMesh: () => new SvgMesh(),
    htmlMesh: () => new HTMLMesh(),
    joystick: () => new Joystick(),
    reticle: () => new Reticle(),
    splashScreen: () => new SplashScreen(),
    text: () => new Text(),
    dummy: () => new Dummy(),
    building: () => new Building(),
    tree: () => new Tree(),
    reflector: () => new Reflector(),
    water: () => new Water(),
    curve: () => new Curve(),
    sprite: () => new Sprite(),
    trigger: () => new Trigger(),
    spawnPoint: () => new SpawnPoint(),
    audio: () => new Audio(),
    camera: () => new Camera(),
    thirdPersonCamera: () => new ThirdPersonCamera(),
    firstPersonCamera: () => new FirstPersonCamera(),
    orbitCamera: () => new OrbitCamera(),
    ambientLight: () => new AmbientLight(),
    areaLight: () => new AreaLight(),
    directionalLight: () => new DirectionalLight(),
    skyLight: () => new SkyLight(),
    pointLight: () => new PointLight(),
    spotLight: () => new SpotLight(),
    circle: () => new Circle(),
    cone: () => new Cone(),
    cube: () => new Cube(),
    cylinder: () => new Cylinder(),
    octahedron: () => new Octahedron(),
    plane: () => new Plane(),
    sphere: () => new Sphere(),
    tetrahedron: () => new Tetrahedron(),
    torus: () => new Torus(),
    skybox: () => new Skybox(),
    environment: () => new Environment(),
    setup: () => new Setup(),
    timeline: () => new Timeline(),
    timelineAudio: () => new TimelineAudio()
});
export default (type) => record[type]();
//# sourceMappingURL=createObject.js.map