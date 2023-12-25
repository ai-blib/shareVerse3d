import IJoystick from "../loader_package/interface/IJoystick"
import React from "react"

export type JoystickProps = Partial<IJoystick> & {
  children?: React.ReactNode
}
