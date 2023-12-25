import IKeyboard from "../loader_package/interface/IKeyboard"
import React from "react"

export type KeyboardProps = Partial<IKeyboard> & {
  children?: React.ReactNode
}
