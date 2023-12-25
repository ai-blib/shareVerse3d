import React from "react"
import { AreaLight as GameAreaLight } from "../../../package"
import useManager, { ParentContext } from "../../../hooks/useManager"
import { AreaLightProps } from "../../../props/AreaLightProps"

const AreaLight = React.forwardRef<GameAreaLight, AreaLightProps>((p, ref) => {
  const manager = useManager(p, ref, GameAreaLight)
  return (
    <ParentContext.Provider value={manager}>
      {p.children}
    </ParentContext.Provider>
  )
})

export default AreaLight
