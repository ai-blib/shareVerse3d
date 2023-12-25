import IMouse from "../loader_package/interface/IMouse"
import React from "react"

export type MouseProps = Partial<IMouse> & {
  children?: React.ReactNode
}
