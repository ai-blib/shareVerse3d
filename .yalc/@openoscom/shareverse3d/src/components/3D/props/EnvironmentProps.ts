import IEnvironment from "../loader_package/interface/IEnvironment"
import React from "react"

export type EnvironmentProps = Partial<IEnvironment> & {
  children?: React.ReactNode
}
