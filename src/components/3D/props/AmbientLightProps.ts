import IAmbientLight from "../loader_package/interface/IAmbientLight"
import React from "react"

export type AmbientLightProps = Partial<IAmbientLight> & {
  children?: React.ReactNode
}
