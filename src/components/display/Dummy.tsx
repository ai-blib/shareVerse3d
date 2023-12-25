import React from "react"
import { Dummy as GameDummy } from "../../package"
import useManager, { ParentContext } from "../../hooks/useManager"
import { DummyProps } from "../../props/DummyProps"

const Dummy = React.forwardRef<GameDummy, DummyProps>((p, ref) => {
  const manager = useManager(p, ref, GameDummy)
  return (
    <ParentContext.Provider value={manager}>
      {p.children}
    </ParentContext.Provider>
  )
})

export default Dummy
