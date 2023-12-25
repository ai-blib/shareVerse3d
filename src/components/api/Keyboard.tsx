import React from "react"
import { Keyboard as GameKeyboard } from "../../package"
import useManager, { ParentContext } from "../../hooks/useManager"
import { KeyboardProps } from "../../props/KeyboardProps"

const Keyboard = React.forwardRef<GameKeyboard, KeyboardProps>((p, ref) => {
  const manager = useManager(p, ref, GameKeyboard)
  return <ParentContext.Provider value={manager} />
})
export default Keyboard
