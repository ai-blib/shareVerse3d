import { Cancellable } from "@lincode/promiselikes";
import { createEffect } from "@lincode/reactivity";
import { getRetargetBones } from "../../states/useRetargetBones";
createEffect(() => {
    const dummy = getRetargetBones();
    if (!dummy)
        return;
    const handle = new Cancellable();
    handle.watch(dummy.loaded.then((loadedGroup) => {
        const bone = loadedGroup.getObjectByProperty("type", "Bone");
        bone.traverse((parent) => (parent.name = "mixamorig" + parent.name));
    }));
    return () => {
        handle.cancel();
    };
}, [getRetargetBones]);
//# sourceMappingURL=retargetBones.js.map