import React from "react"
import { DirectionalLight as GameDirectionalLight } from "../../../package"
import useManager, { ParentContext } from "../../../hooks/useManager"
import { DirectionalLightProps } from "../../../props/DirectionalLightProps"

const DirectionalLight = React.forwardRef<
  GameDirectionalLight,
  DirectionalLightProps
>((p, ref) => {
  const manager = useManager(p, ref, GameDirectionalLight)
  return (
    <ParentContext.Provider value={manager}>
      {p.children}
    </ParentContext.Provider>
  )
})

export default DirectionalLight
