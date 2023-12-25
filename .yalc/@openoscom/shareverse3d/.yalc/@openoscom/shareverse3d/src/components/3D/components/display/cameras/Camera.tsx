import React from "react"
import { Camera as GameCamera } from "../../../loader_package"
import useManager, { ParentContext } from "../../../hooks/useManager"
import { CameraProps } from "../../../props/CameraProps"

const Camera = React.forwardRef<GameCamera, CameraProps>((p, ref) => {
  const manager = useManager(p, ref, GameCamera)
  return (
    <ParentContext.Provider value={manager}>
      {p.children}
    </ParentContext.Provider>
  )
})

export default Camera
