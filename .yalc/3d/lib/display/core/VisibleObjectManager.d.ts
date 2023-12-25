import { Object3D } from "three";
import IVisibleObjectManager from "../../interface/IVisibleObjectManager";
import VisibleMixin from "./mixins/VisibleMixin";
import ObjectManager from "./ObjectManager";
declare abstract class VisibleObjectManager<T extends Object3D = Object3D> extends ObjectManager<T> implements IVisibleObjectManager {
}
interface VisibleObjectManager<T extends Object3D = Object3D> extends ObjectManager<T>, VisibleMixin<T> {
}
export default VisibleObjectManager;
