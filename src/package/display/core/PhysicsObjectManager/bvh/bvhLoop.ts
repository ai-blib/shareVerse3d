import { createEffect } from "@lincode/reactivity"
import { forceGet } from "@lincode/utils"
import { Box3, Vector3 } from "three"
import { onBeforeRender } from "../../../../events/onBeforeRender"
import { getBVHMap } from "../../../../states/useBVHMap"
import { getCentripetal } from "../../../../states/useCentripetal"
import { getGravity } from "../../../../states/useGravity"
import { getRepulsion } from "../../../../states/useRepulsion"
import Events from "../../../../utils/Events"
import {
    box3,
    line3,
    vector3,
    vector3_,
    vector3_0,
    vector3__
} from "../../../utils/reusables"
import bvhContactMap from "./bvhContactMap"
import getWorldPosition from "../../../utils/getWorldPosition"
import { calBoundary } from "../../../utils/boundary"

import PhysicsObjectManager from ".."
import { bvhCharacterSet } from "./bvhCharacterSet"
import { bvhManagerMap } from "./bvhManagerMap"
import { fpsRatio } from "../../../../engine/eventLoop"
import { getFirstLoad } from "../../../../states/useFirstLoad"
import { getBVHComputing } from "../../../../states/useBVHComputingCount"
import { getEditorPlay } from "../../../../states/useEditorPlay"
import { global } from "../../../../utils/global"
import {
    emitFallEvent,
    listenerInitEvent,
    removeAll
} from "../../utils/bvhEvent"

const makeWeakSet = () => new WeakSet()

global.isFirstLoad = true

window.addEventListener("popstate", function (e) {
    global.isFirstLoad = true
    removeAll()
})

createEffect(
    function (this: PhysicsObjectManager) {
        if (!getEditorPlay() || !getFirstLoad() || getBVHComputing()) return
        // @ts-ignore
        window.boxBounds = {
            min: {
                y: undefined,
                z: undefined,
                x: undefined
            },
            max: {
                y: undefined,
                z: undefined,
                x: undefined
            }
        }
        const bvhArray = getBVHMap()
        if (!bvhArray.length) return

        const gravity = getGravity()
        const repulsion = getRepulsion()
        const delta = 0.02

        const centripetal = getCentripetal()
        let first = true
        let firstPositionY = 0
        let old_position
        const handle = onBeforeRender(() => {
            bvhContactMap.clear()
            // @ts-ignore
            window.firstFallToGround = false
            for (const characterManager of bvhCharacterSet) {
                const playerVelocity = characterManager.bvhVelocity!
                const player = characterManager.outerObject3d
                const capsuleHalfHeight = characterManager.bvhHalfHeight!
                // const capsuleRadius = centripetal ? capsuleHalfHeight : characterManager.bvhRadius!;

                const capsuleRadius = 0.8

                if (centripetal) {
                    playerVelocity.add(
                        characterManager.bvhOnGround ||
                            characterManager._gravity === false
                            ? vector3_0
                            : getWorldPosition(player)
                                  .normalize()
                                  .multiplyScalar(
                                      delta * -gravity * fpsRatio[0]
                                  )
                    )
                } else {
                    const updatePosition = characterManager.positionUpdate!
                    updatePosition.x && (playerVelocity.x = 0)
                    updatePosition.y && (playerVelocity.y = 0)
                    updatePosition.z && (playerVelocity.z = 0)
                    updatePosition.reset()

                    if (
                        // @ts-ignore
                        window.boxBounds.min.y &&
                        // @ts-ignore
                        player.position.y >= window.boxBounds.min.y
                    ) {
                        playerVelocity.y +=
                            characterManager.bvhOnGround ||
                            characterManager._gravity === false
                                ? 0
                                : delta * -gravity * fpsRatio[0]
                    }
                    // console.log(player.position, " player.position", playerVelocity,getWorldPosition(player));
                    player.position.addScaledVector(playerVelocity, delta)

                    player.updateMatrixWorld()

                    const { start, end } = line3
                    end.copy(start.copy(player.position))

                    const yOffset = Math.max(
                        capsuleHalfHeight - capsuleRadius,
                        0
                    )
                    end.y += yOffset
                    start.y -= yOffset

                    const startOld = start.clone()

                    box3.setFromCenterAndSize(
                        player.position,
                        vector3__.set(
                            capsuleRadius * 2,
                            capsuleHalfHeight * 2,
                            capsuleRadius * 2
                        )
                    )
                    const triPoint = vector3
                    const capsulePoint = vector3_
                    let distance = 0
                    let min_distance = 0
                    let direction: Vector3 | undefined

                    let contact = false
                    let intersect = false
                    let mapManager: PhysicsObjectManager | undefined

                    for (const boundsTree of bvhArray) {
                        mapManager = bvhManagerMap.get(boundsTree)
                        // @ts-ignore
                        calBoundary(
                            // @ts-ignore
                            window.boxBounds,
                            boundsTree.geometry.boundingBox
                        )

                        boundsTree.shapecast({
                            intersectsBounds: (box: Box3) =>
                                box.intersectsBox(box3),
                            intersectsTriangle: (tri) => {
                                distance = tri.closestPointToSegment(
                                    line3,
                                    triPoint,
                                    capsulePoint
                                )

                                if (distance < capsuleRadius) {
                                    if (distance < 0.7) {
                                        intersect = true
                                    }
                                    if (!intersect) {
                                        old_position = player.position.clone()
                                    }
                                    if (
                                        Math.abs(triPoint.y).toFixed(3) ===
                                            Math.abs(tri.a.y).toFixed(3) ||
                                        Math.abs(triPoint.y).toFixed(3) ===
                                            Math.abs(tri.b.y).toFixed(3) ||
                                        Math.abs(triPoint.y).toFixed(3) ===
                                            Math.abs(tri.c.y).toFixed(3)
                                    ) {
                                        contact = true
                                    } else {
                                        contact = false
                                    }
                                    direction = capsulePoint
                                        .sub(triPoint)
                                        .normalize()
                                        .multiplyScalar(
                                            capsuleRadius - distance
                                        )
                                    start.add(direction)
                                    end.add(direction)
                                }
                            }
                        })
                    }
                    if (contact && mapManager)
                        forceGet(
                            bvhContactMap,
                            characterManager,
                            makeWeakSet
                        ).add(mapManager)

                    const deltaVector = start.sub(startOld)
                    if (centripetal) characterManager.bvhOnGround = contact
                    else {
                        characterManager.bvhOnGround =
                            contact ||
                            deltaVector.y >
                                Math.abs(delta * playerVelocity.y * 0.25)

                        if (
                            repulsion &&
                            characterManager.bvhOnGround &&
                            Math.abs(
                                deltaVector.y /
                                    (deltaVector.x +
                                        deltaVector.z +
                                        Number.EPSILON)
                            ) < repulsion
                        )
                            characterManager.bvhOnGround = false
                    }

                    const offset = Math.max(0.0, deltaVector.length() - 1e-5)
                    deltaVector.normalize().multiplyScalar(offset)
                    if (characterManager.bvhOnGround && global.isFirstLoad) {
                        global.isFirstLoad = false
                        const { _firstInnerY, _firstInnerX, _firstInnerZ } =
                            characterManager as any
                        if (_firstInnerY || _firstInnerX || _firstInnerZ) {
                            const { x, y, z } = player.position
                            player.position.set(
                                _firstInnerX || x,
                                _firstInnerY || y,
                                _firstInnerZ || z
                            )
                        }

                        //emit value
                        emitFallEvent(player.position)
                        listenerInitEvent(() => {
                            const { _firstInnerY, _firstInnerX, _firstInnerZ } =
                                characterManager as any
                            player.position.set(
                                _firstInnerX || 0,
                                _firstInnerY || 0,
                                _firstInnerZ || 0
                            )
                        })
                        // Events.on('reset_position', () => {
                        //
                        // });
                        // window.firstFallToGround = player.position
                        first = false
                        firstPositionY = player.position.y
                        player.visible = true
                    }
                    // @ts-ignore
                    window.player_position = player.position
                    global.bvhOnGround = characterManager.bvhOnGround // @ts-ignore
                    if (window.boxBounds.min.x && window.boxBounds.max.x) {
                        // @ts-ignore
                        // player.position.set(_firstInnerX || 0, _firstInnerY || 0, _firstInnerZ || 0);
                        if (boxBounds.min.x > player.position.x) {
                            // @ts-ignore
                            player.position.setX(window.boxBounds.min.x)
                        }
                        // @ts-ignore
                        if (window.boxBounds.min.z > player.position.z) {
                            // @ts-ignore
                            player.position.setZ(window.boxBounds.min.z)
                        }
                        // @ts-ignore
                        if (window.boxBounds.max.x < player.position.x) {
                            // @ts-ignore
                            player.position.setX(window.boxBounds.max.x)
                        }
                        // @ts-ignore
                        if (window.boxBounds.max.z < player.position.z) {
                            // @ts-ignore
                            player.position.setZ(window.boxBounds.max.z)
                        }
                        // @ts-ignore
                        if (window.boxBounds.min.y > player.position.y) {
                            // @ts-ignore
                            const { _firstInnerY, _firstInnerX, _firstInnerZ } =
                                characterManager
                            player.position.set(
                                _firstInnerX || 0,
                                _firstInnerY || 0,
                                _firstInnerZ || 0
                            )
                            characterManager.bvhOnGround = true
                            // Events.emit("origin_position", player.position)
                        }
                        if (intersect) {
                            const { x, y, z } = old_position || player.position
                            // player.position.set(x, y, z);
                            // const { _firstInnerY, _firstInnerX, _firstInnerZ } = characterManager
                            // player.position.set(_firstInnerX || 0, _firstInnerY || 0, _firstInnerZ || 0)
                            // characterManager.bvhOnGround = true
                        }
                    }

                    // @ts-ignore
                    if (global.isFirstLoad) {
                        // @ts-ignore
                        const { _firstInnerY, _firstInnerX, _firstInnerZ } =
                            characterManager
                        if (_firstInnerY || _firstInnerX || _firstInnerZ) {
                            const { x, y, z } = player.position
                            // @ts-ignore
                            player.position.set(
                                _firstInnerX || x,
                                _firstInnerY || y,
                                _firstInnerZ || z
                            )
                            setTimeout(() => {
                                // Events.emit('firstFallToGround', player.position);
                                //emit value
                                emitFallEvent(player.position)
                            }, 0)
                        }
                    }
                    player.position.add(deltaVector)

                    if (!characterManager.bvhOnGround) {
                        deltaVector.normalize()
                        playerVelocity.addScaledVector(
                            deltaVector,
                            -deltaVector.dot(playerVelocity)
                        )
                    } else playerVelocity.set(0, 0, 0)
                }
            }
        })

        return () => {
            handle.cancel()
        }
    },
    [
        getBVHMap,
        getGravity,
        getRepulsion,
        getCentripetal,
        getEditorPlay,
        getFirstLoad,
        getBVHComputing
    ]
)
