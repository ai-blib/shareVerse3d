import React from "react"
import { Circle as GameCircle } from "../../../loader_package"
import useManager, { ParentContext } from "../../../hooks/useManager"
import { PrimitiveProps } from "../../../props/PrimitiveProps"

const Circle = React.forwardRef<GameCircle, PrimitiveProps>((p, ref) => {
  const manager = useManager(p, ref, GameCircle)
  return (
    <ParentContext.Provider value={manager}>
      {p.children}
    </ParentContext.Provider>
  )
})

export default Circle
