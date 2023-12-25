import IMouse from "../package/interface/IMouse"
import React from "react"

export type MouseProps = Partial<IMouse> & {
  children?: React.ReactNode
}
