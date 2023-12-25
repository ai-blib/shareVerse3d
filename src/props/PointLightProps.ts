import IPointLight from "../package/interface/IPointLight"
import React from "react"

export type PointLightProps = Partial<IPointLight> & {
  children?: React.ReactNode
}
