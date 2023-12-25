import React from "react"
import { SvgMesh as GameSvgMesh } from "../../loader_package"
import useManager, { ParentContext } from "../../hooks/useManager"
import { SvgMeshProps } from "../../props/SvgMeshProps"

const SvgMesh = React.forwardRef<GameSvgMesh, SvgMeshProps>((p, ref) => {
  const manager = useManager(p, ref, GameSvgMesh)
  return (
    <ParentContext.Provider value={manager}>
      {p.children}
    </ParentContext.Provider>
  )
})

export default SvgMesh
