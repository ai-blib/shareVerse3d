import ISetup from "../loader_package/interface/ISetup"
import React from "react"

export type SetupProps = Partial<ISetup> & {
  children?: React.ReactNode
}
