import { Cancellable, Disposable } from "@lincode/promiselikes";
import { createEffect } from "@lincode/reactivity";
import { nanoid } from "nanoid";
import { Object3D } from "three";
import { timer } from "../../engine/eventLoop";
import { onBeforeRender } from "../../events/onBeforeRender";
import { emitDispose } from "../../events/onDispose";
import { emitSceneGraphChange } from "../../events/onSceneGraphChange";
import unsafeSetValue from "../../utils/unsafeSetValue";
import { setManager } from "../utils/manager";
import { appendableRoot, uuidMap } from "./collections";
export default class Appendable extends Disposable {
    outerObject3d;
    nativeObject3d;
    constructor(outerObject3d = new Object3D()) {
        super();
        this.outerObject3d = outerObject3d;
        setManager(outerObject3d, this);
        this.nativeObject3d = outerObject3d;
        appendableRoot.add(this);
        emitSceneGraphChange();
    }
    parent;
    children;
    _append(child) {
        appendableRoot.delete(child);
        emitSceneGraphChange();
        child.parent?.children?.delete(child);
        child.parent = this;
        (this.children ??= new Set()).add(child);
    }
    append(child) {
        this._append(child);
        this.outerObject3d.add(child.outerObject3d);
    }
    attach(child) {
        this._append(child);
        this.outerObject3d.attach(child.outerObject3d);
    }
    dispose() {
        if (this.done)
            return this;
        super.dispose();
        this._uuid !== undefined && uuidMap.delete(this._uuid);
        if (this.handles)
            for (const handle of this.handles.values())
                handle.cancel();
        appendableRoot.delete(this);
        this.parent?.children?.delete(this);
        this.parent = undefined;
        emitSceneGraphChange();
        emitDispose(this);
        this.outerObject3d.parent?.remove(this.outerObject3d);
        if (this.children)
            for (const child of this.children)
                child.dispose();
        return this;
    }
    traverse(cb) {
        for (const child of this.children ?? []) {
            cb(child);
            child.traverse(cb);
        }
    }
    traverseSome(cb) {
        for (const child of this.children ?? []) {
            if (cb(child))
                return true;
            child.traverseSome(cb);
        }
        return false;
    }
    _uuid;
    get uuid() {
        if (this._uuid !== undefined)
            return this._uuid;
        const val = (this._uuid = nanoid());
        uuidMap.set(val, this);
        return val;
    }
    set uuid(val) {
        if (this._uuid !== undefined)
            return;
        this._uuid = val;
        uuidMap.set(val, this);
    }
    _proxy;
    get proxy() {
        return this._proxy;
    }
    set proxy(val) {
        this._proxy && unsafeSetValue(this._proxy, "__target", undefined);
        this._proxy = val;
        val && unsafeSetValue(val, "__target", this);
    }
    timer(time, repeat, cb) {
        return this.watch(timer(time, repeat, cb));
    }
    beforeRender(cb) {
        // @ts-ignore
        return this.watch(onBeforeRender(cb));
    }
    queueMicrotask(cb) {
        queueMicrotask(() => !this.done && cb());
    }
    cancellable(cb) {
        return this.watch(new Cancellable(cb));
    }
    createEffect(cb, getStates) {
        // @ts-ignore
        return this.watch(createEffect(cb, getStates));
    }
    handles;
    cancelHandle(name, lazyHandle) {
        const handles = (this.handles ??= new Map());
        handles.get(name)?.cancel();
        if (!lazyHandle)
            return;
        const handle = lazyHandle();
        handles.set(name, handle);
        return handle;
    }
    _onLoop;
    get onLoop() {
        return this._onLoop;
    }
    set onLoop(cb) {
        this._onLoop = cb;
        // @ts-ignore
        this.cancelHandle("onLoop", cb && (() => onBeforeRender(cb)));
    }
}
//# sourceMappingURL=Appendable.js.map