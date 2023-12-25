import IAreaLight from "../loader_package/interface/IAreaLight"
import React from "react"

export type AreaLightProps = Partial<IAreaLight> & {
  children?: React.ReactNode
}
