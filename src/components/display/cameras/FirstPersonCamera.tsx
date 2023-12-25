import React from "react"
import { FirstPersonCamera as GameFirstPersonCamera } from "../../../package"
import useManager, { ParentContext } from "../../../hooks/useManager"
import { FirstPersonCameraProps } from "../../../props/FirstPersonCameraProps"

const FirstPersonCamera = React.forwardRef<
  GameFirstPersonCamera,
  FirstPersonCameraProps
>((p, ref) => {
  const manager = useManager(p, ref, GameFirstPersonCamera)
  return (
    <ParentContext.Provider value={manager}>
      {p.children}
    </ParentContext.Provider>
  )
})

export default FirstPersonCamera
