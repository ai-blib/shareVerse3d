import { createEffect } from "@lincode/reactivity";
import { emitBeforeCameraLoop } from "../../../../events/onBeforeCameraLoop";
import { onBeforeRender } from "../../../../events/onBeforeRender";
import { getBVHMap } from "../../../../states/useBVHMap";
import getWorldDirection from "../../../utils/getWorldDirection";
import { box3, line3, vector3, vector3_ } from "../../../utils/reusables";
import { bvhCameraSet } from "./bvhCameraSet";
createEffect(() => {
    const bvhArray = getBVHMap();
    if (!bvhArray.length) {
        const handle = onBeforeRender(emitBeforeCameraLoop);
        return () => {
            handle.cancel();
        };
    }
    const handle = onBeforeRender(() => {
        emitBeforeCameraLoop();
        for (const cam of bvhCameraSet) {
            const capsuleRadius = 0.5;
            cam.updateMatrixWorld();
            const direction = getWorldDirection(cam);
            const { start, end } = line3;
            end.copy(start.copy(cam.position));
            box3.makeEmpty();
            box3.expandByPoint(start);
            box3.min.addScalar(-capsuleRadius);
            box3.max.addScalar(capsuleRadius);
            const triPoint = vector3;
            const capsulePoint = vector3_;
            let distance = 0;
            let depth = 0;
            for (const boundsTree of bvhArray)
                boundsTree.shapecast({
                    intersectsBounds: (box) => box.intersectsBox(box3),
                    intersectsTriangle: (tri) => {
                        distance = tri.closestPointToSegment(line3, triPoint, capsulePoint);
                        if (distance < capsuleRadius) {
                            depth = capsuleRadius - distance;
                            start.addScaledVector(direction, depth);
                            end.addScaledVector(direction, depth);
                        }
                    }
                });
            const deltaVector = start.sub(cam.position);
            const offset = Math.max(0.0, deltaVector.length() - 1e-5);
            deltaVector.normalize().multiplyScalar(offset);
            cam.position.add(deltaVector);
        }
    });
    return () => {
        handle.cancel();
    };
}, [getBVHMap]);
//# sourceMappingURL=bvhCameraLoop.js.map