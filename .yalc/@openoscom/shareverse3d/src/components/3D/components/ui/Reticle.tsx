import React from "react"
import { Reticle as GameReticle } from "../../loader_package"
import useManager, { ParentContext } from "../../hooks/useManager"
import { ReticleProps } from "../../props/ReticleProps"

const Reticle = React.forwardRef<GameReticle, ReticleProps>((p, ref) => {
  const manager = useManager(p, ref, GameReticle)
  return <ParentContext.Provider value={manager} />
})

export default Reticle
