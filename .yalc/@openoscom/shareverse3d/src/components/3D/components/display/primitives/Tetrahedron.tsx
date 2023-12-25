import React from "react"
import { Tetrahedron as GameTetrahedron } from "../../../loader_package"
import useManager, { ParentContext } from "../../../hooks/useManager"
import { PrimitiveProps } from "../../../props/PrimitiveProps"

const Tetrahedron = React.forwardRef<GameTetrahedron, PrimitiveProps>(
  (p, ref) => {
    const manager = useManager(p, ref, GameTetrahedron)
    return (
      <ParentContext.Provider value={manager}>
        {p.children}
      </ParentContext.Provider>
    )
  }
)

export default Tetrahedron
