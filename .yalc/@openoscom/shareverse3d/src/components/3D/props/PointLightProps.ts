import IPointLight from "../loader_package/interface/IPointLight"
import React from "react"

export type PointLightProps = Partial<IPointLight> & {
  children?: React.ReactNode
}
