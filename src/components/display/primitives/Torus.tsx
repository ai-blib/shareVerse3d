import React from "react"
import { Torus as GameTorus } from "../../../package"
import useManager, { ParentContext } from "../../../hooks/useManager"
import { PrimitiveProps } from "../../../props/PrimitiveProps"

const Torus = React.forwardRef<GameTorus, PrimitiveProps>((p, ref) => {
  const manager = useManager(p, ref, GameTorus)
  return (
    <ParentContext.Provider value={manager}>
      {p.children}
    </ParentContext.Provider>
  )
})

export default Torus
