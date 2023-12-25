import IKeyboard from "../package/interface/IKeyboard"
import React from "react"

export type KeyboardProps = Partial<IKeyboard> & {
  children?: React.ReactNode
}
