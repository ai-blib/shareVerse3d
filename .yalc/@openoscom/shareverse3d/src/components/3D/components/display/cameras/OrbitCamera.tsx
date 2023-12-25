import React from "react"
import { OrbitCamera as GameOrbitCamera } from "../../../loader_package"
import useManager, { ParentContext } from "../../../hooks/useManager"
import { OrbitCameraProps } from "../../../props/OrbitCameraProps"

const OrbitCamera = React.forwardRef<GameOrbitCamera, OrbitCameraProps>(
  (p, ref) => {
    const manager = useManager(p, ref, GameOrbitCamera)
    return (
      <ParentContext.Provider value={manager}>
        {p.children}
      </ParentContext.Provider>
    )
  }
)

export default OrbitCamera
