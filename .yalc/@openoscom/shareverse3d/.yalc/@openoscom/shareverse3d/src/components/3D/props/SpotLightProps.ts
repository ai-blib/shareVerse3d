import ISpotLight from "../loader_package/interface/ISpotLight"
import React from "react"

export type SpotLightProps = Partial<ISpotLight> & {
  children?: React.ReactNode
}
