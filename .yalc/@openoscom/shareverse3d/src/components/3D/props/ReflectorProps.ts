import IReflector from "../loader_package/interface/IReflector"
import React from "react"

export type ReflectorProps = Partial<IReflector> & {
  children?: React.ReactNode
}
