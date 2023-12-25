import React from "react"
import { Water as GameWater } from "../../package"
import useManager, { ParentContext } from "../../hooks/useManager"
import { WaterProps } from "../../props/WaterProps"

const Water = React.forwardRef<GameWater, WaterProps>((p, ref) => {
  const manager = useManager(p, ref, GameWater)
  return (
    <ParentContext.Provider value={manager}>
      {p.children}
    </ParentContext.Provider>
  )
})

export default Water
