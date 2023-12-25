import React from "react"
import { Joystick as GameJoystick } from "../../loader_package"
import useManager, { ParentContext } from "../../hooks/useManager"
import { JoystickProps } from "../../props/JoystickProps"

const Joystick = React.forwardRef<GameJoystick, JoystickProps>((p, ref) => {
  const manager = useManager(p, ref, GameJoystick)
  return <ParentContext.Provider value={manager} />
})

export default Joystick
