import React from "react"
import { Plane as GamePlane } from "../../../package"
import useManager, { ParentContext } from "../../../hooks/useManager"
import { PrimitiveProps } from "../../../props/PrimitiveProps"

const Plane = React.forwardRef<GamePlane, PrimitiveProps>((p, ref) => {
  const manager = useManager(p, ref, GamePlane)
  return (
    <ParentContext.Provider value={manager}>
      {p.children}
    </ParentContext.Provider>
  )
})

export default Plane
