import IDirectionalLight from "../package/interface/IDirectionalLight"
import React from "react"

export type DirectionalLightProps = Partial<IDirectionalLight> & {
  children?: React.ReactNode
}
