import React from "react"
import { Sphere as GameSphere } from "../../../package"
import useManager, { ParentContext } from "../../../hooks/useManager"
import { PrimitiveProps } from "../../../props/PrimitiveProps"

const Sphere = React.forwardRef<GameSphere, PrimitiveProps>((p, ref) => {
  const manager = useManager(p, ref, GameSphere)
  return (
    <ParentContext.Provider value={manager}>
      {p.children}
    </ParentContext.Provider>
  )
})

export default Sphere
