import React from "react"
import { Setup as GameSetup } from "../../loader_package"
import useManager, { ParentContext } from "../../hooks/useManager"
import { SetupProps } from "../../props/SetupProps"

const Setup = React.forwardRef<GameSetup, SetupProps>((p, ref) => {
  const manager = useManager(p, ref, GameSetup)
  return <ParentContext.Provider value={manager} />
})

export default Setup
