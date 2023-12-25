import { deg2Rad, rad2Deg } from "@lincode/math";
import { Reactive } from "@lincode/reactivity";
import { VideoTexture, RepeatWrapping, Vector2 } from "three";
import Appendable from "../../api/core/Appendable";
import { hiddenAppendables, nonSerializedAppendables } from "../../api/core/collections";
import { basicMaterialManagerDefaults, basicMaterialManagerSchema } from "../../interface/IBasicMaterialManager";
import queueDebounce from "../../utils/queueDebounce";
import loadTexture from "../utils/loaders/loadTexture";
import * as THREE from "three";
const mapNames = ["map", "alphaMap"];
const queueTextureRepeat = queueDebounce();
export default class BasicMaterialManager extends Appendable {
    nativeMaterial;
    static componentName = "basicMaterial";
    static defaults = basicMaterialManagerDefaults;
    static schema = basicMaterialManagerSchema;
    constructor(nativeMaterial) {
        super();
        this.nativeMaterial = nativeMaterial;
        nonSerializedAppendables.add(this);
        hiddenAppendables.add(this);
        // console.log(this.lightMapIntensity = 2, "super");
    }
    dispose() {
        if (this.done)
            return this;
        super.dispose();
        this.nativeMaterial.dispose();
        return this;
    }
    get color() {
        return "#" + this.nativeMaterial.color.getHexString();
    }
    set color(val) {
        this.nativeMaterial.color.set(val);
    }
    get opacity() {
        return this.nativeMaterial.opacity;
    }
    set opacity(val) {
        this.nativeMaterial.opacity = val;
        this.nativeMaterial.transparent = val <= 1;
        this.nativeMaterial.needsUpdate = true;
    }
    applyTexture(mapNames) {
        queueTextureRepeat(this, () => {
            const repeat = this._textureRepeat;
            const flipY = this._textureFlipY;
            const rotation = this._textureRotation;
            for (const name of mapNames) {
                //@ts-ignore
                const map = this.nativeMaterial[name];
                if (!map)
                    return;
                repeat !== undefined && (map.repeat = repeat);
                rotation !== undefined && (map.rotation = rotation * deg2Rad);
                if (flipY !== undefined && flipY !== map.flipY) {
                    map.flipY = flipY;
                    map.needsUpdate = true;
                }
                map.encoding = THREE.sRGBEncoding;
            }
        });
        this.nativeMaterial.needsUpdate = true;
    }
    videoTextureState;
    textureState;
    initTexture() {
        if (this.textureState)
            return;
        const videoTextureState = (this.videoTextureState = new Reactive(undefined));
        const textureState = (this.textureState = new Reactive(undefined));
        this.createEffect(() => {
            const url = textureState.get();
            const videoURL = videoTextureState.get();
            if (videoURL) {
                let video;
                if (typeof videoURL === "string") {
                    video = document.createElement("video");
                    video.crossOrigin = "anonymous";
                    video.src = videoURL;
                    video.loop = true;
                    video.autoplay = true;
                    video.muted = true;
                    video.playsInline = true;
                    video.play();
                }
                else
                    video = videoURL;
                const videoTexture = new VideoTexture(video, undefined, RepeatWrapping, RepeatWrapping);
                const { nativeMaterial: material } = this;
                const { map } = material;
                material.map = videoTexture;
                this.applyTexture(mapNames);
                return () => {
                    video.pause();
                    videoTexture.dispose();
                    material.map = map;
                };
            }
            if (!url)
                return;
            const { nativeMaterial: material } = this;
            const { map } = material;
            material.map = loadTexture(url);
            material.map.anisotropy = 200;
            // @ts-ignore
            // material.lightMapIntens;
            // material.map.magFilter = NearestFilter
            // material.map.minFilter = NearestFilter
            this.applyTexture(mapNames);
            return () => {
                material.map = map;
            };
        }, [videoTextureState.get, textureState.get]);
    }
    get videoTexture() {
        return this.videoTextureState?.get();
    }
    set videoTexture(url) {
        this.initTexture();
        this.videoTextureState.set(url);
    }
    get texture() {
        return this.textureState?.get();
    }
    set texture(url) {
        this.initTexture();
        this.textureState.set(url);
    }
    _alphaMap;
    get alphaMap() {
        return this._alphaMap;
    }
    set alphaMap(val) {
        this._alphaMap = val;
        this.nativeMaterial.alphaMap = val ? loadTexture(val) : null;
        this.applyTexture(mapNames);
    }
    _textureRepeat;
    get textureRepeat() {
        return this.nativeMaterial.map?.repeat ?? this._textureRepeat;
    }
    set textureRepeat(val) {
        typeof val === "number" && (val = new Vector2(val, val));
        this._textureRepeat = val;
        this.applyTexture(mapNames);
    }
    _textureFlipY;
    get textureFlipY() {
        return this.nativeMaterial.map?.flipY ?? this._textureFlipY;
    }
    set textureFlipY(val) {
        this._textureFlipY = val;
        this.applyTexture(mapNames);
    }
    _textureRotation;
    get textureRotation() {
        return this.nativeMaterial.map
            ? this.nativeMaterial.map.rotation * rad2Deg
            : this._textureRotation;
    }
    set textureRotation(val) {
        this._textureRotation = val;
        this.applyTexture(mapNames);
    }
}
//# sourceMappingURL=BasicMaterialManager.js.map