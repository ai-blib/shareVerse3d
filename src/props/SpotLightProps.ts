import ISpotLight from "../package/interface/ISpotLight"
import React from "react"

export type SpotLightProps = Partial<ISpotLight> & {
  children?: React.ReactNode
}
