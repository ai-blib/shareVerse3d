import IEnvironment from "../package/interface/IEnvironment"
import React from "react"

export type EnvironmentProps = Partial<IEnvironment> & {
  children?: React.ReactNode
}
