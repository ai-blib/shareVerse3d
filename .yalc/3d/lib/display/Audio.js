import store, { createEffect, Reactive } from "@lincode/reactivity";
import { AudioListener, PositionalAudio } from "three";
import PositionedItem from "../api/core/PositionedItem";
import mainCamera from "../engine/mainCamera";
import { audioDefaults, audioSchema } from "../interface/IAudio";
import { getCameraRendered } from "../states/useCameraRendered";
import { addSelectionHelper } from "./core/StaticObjectManager/raycast/selectionCandidates";
import HelperSprite from "./core/utils/HelperSprite";
import loadAudio from "./utils/loaders/loadAudio";
const [setAudioListener, getAudioListener] = store(undefined);
createEffect(() => {
    const audioListener = getAudioListener();
    if (!audioListener)
        return;
    const cam = getCameraRendered();
    cam.add(audioListener);
    return () => {
        cam.remove(audioListener);
    };
}, [getCameraRendered, getAudioListener]);
export default class Audio extends PositionedItem {
    static componentName = "audio";
    static defaults = audioDefaults;
    static schema = audioSchema;
    constructor() {
        !getAudioListener() && setAudioListener(new AudioListener());
        const sound = new PositionalAudio(getAudioListener());
        super(sound);
        this.createEffect(() => {
            if (getCameraRendered() !== mainCamera)
                return;
            const handle = addSelectionHelper(new HelperSprite("audio"), this);
            return () => {
                handle.cancel();
            };
        }, [getCameraRendered]);
        const [setReady, getReady] = store(false);
        this.createEffect(() => {
            const src = this.srcState.get();
            if (!src)
                return;
            let proceed = true;
            loadAudio(src).then((buffer) => {
                if (!proceed)
                    return;
                sound.setBuffer(buffer);
                setReady(true);
            });
            return () => {
                proceed = false;
                setReady(false);
            };
        }, [this.srcState.get]);
        this.createEffect(() => {
            if (!getReady() ||
                !this.autoplayState.get() ||
                this.pausedState.get() ||
                this.stoppedState.get())
                return;
            sound.play();
            return () => {
                this.stoppedState.get() ? sound.stop() : sound.pause();
            };
        }, [
            getReady,
            this.autoplayState.get,
            this.pausedState.get,
            this.stoppedState.get
        ]);
    }
    dispose() {
        if (this.done)
            return this;
        super.dispose();
        this.outerObject3d.buffer && this.outerObject3d.disconnect();
        return this;
    }
    play() {
        this.autoplay = true;
        this.paused = false;
        this.stopped = false;
    }
    pause() {
        this.paused = true;
    }
    stop() {
        this.stopped = true;
    }
    srcState = new Reactive(undefined);
    get src() {
        return this.srcState.get();
    }
    set src(val) {
        this.srcState.set(val);
    }
    autoplayState = new Reactive(false);
    get autoplay() {
        return this.autoplayState.get();
    }
    set autoplay(val) {
        this.autoplayState.set(val);
    }
    pausedState = new Reactive(false);
    get paused() {
        return this.pausedState.get();
    }
    set paused(val) {
        this.pausedState.set(val);
    }
    stoppedState = new Reactive(false);
    get stopped() {
        return this.stoppedState.get();
    }
    set stopped(val) {
        this.stoppedState.set(val);
    }
    get loop() {
        return this.outerObject3d.loop;
    }
    set loop(val) {
        this.outerObject3d.loop = val;
    }
    get volume() {
        return this.outerObject3d.getVolume();
    }
    set volume(val) {
        this.outerObject3d.setVolume(val);
    }
    get playbackRate() {
        return this.outerObject3d.playbackRate;
    }
    set playbackRate(val) {
        this.outerObject3d.playbackRate = val;
    }
    get distance() {
        return this.outerObject3d.getRefDistance();
    }
    set distance(val) {
        this.outerObject3d.setRefDistance(val);
    }
    get distanceModel() {
        return this.outerObject3d.getDistanceModel();
    }
    set distanceModel(val) {
        this.outerObject3d.setDistanceModel(val);
    }
    get maxDistance() {
        return this.outerObject3d.getMaxDistance();
    }
    set maxDistance(val) {
        this.outerObject3d.setMaxDistance(val);
    }
    get rolloffFactor() {
        return this.outerObject3d.getRolloffFactor();
    }
    set rolloffFactor(val) {
        this.outerObject3d.setRolloffFactor(val);
    }
}
//# sourceMappingURL=Audio.js.map