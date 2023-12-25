import IDirectionalLight from "../loader_package/interface/IDirectionalLight"
import React from "react"

export type DirectionalLightProps = Partial<IDirectionalLight> & {
  children?: React.ReactNode
}
