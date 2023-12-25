import React from "react"
import { PointLight as GamePointLight } from "../../../loader_package"
import useManager, { ParentContext } from "../../../hooks/useManager"
import { PointLightProps } from "../../../props/PointLightProps"

const PointLight = React.forwardRef<GamePointLight, PointLightProps>(
  (p, ref) => {
    const manager = useManager(p, ref, GamePointLight)
    return (
      <ParentContext.Provider value={manager}>
        {p.children}
      </ParentContext.Provider>
    )
  }
)

export default PointLight
