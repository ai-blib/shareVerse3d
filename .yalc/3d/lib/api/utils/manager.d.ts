import { Object3D } from "three";
import Appendable from "../core/Appendable";
export declare const getManager: <T extends Appendable<Object3D<import("three").Event>>>(target: Object3D) => T;
export declare const setManager: (target: Object3D, appendable: Appendable) => any;
