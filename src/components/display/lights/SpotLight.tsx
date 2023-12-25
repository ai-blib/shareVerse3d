import React from "react"
import { SpotLight as GameSpotLight } from "../../../package"
import useManager, { ParentContext } from "../../../hooks/useManager"
import { SpotLightProps } from "../../../props/SpotLightProps"

const SpotLight = React.forwardRef<GameSpotLight, SpotLightProps>((p, ref) => {
  const manager = useManager(p, ref, GameSpotLight)
  return (
    <ParentContext.Provider value={manager}>
      {p.children}
    </ParentContext.Provider>
  )
})

export default SpotLight
