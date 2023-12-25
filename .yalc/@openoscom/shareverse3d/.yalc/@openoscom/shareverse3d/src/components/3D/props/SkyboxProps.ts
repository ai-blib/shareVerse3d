import ISkybox from "../loader_package/interface/ISkybox"
import React from "react"

export type SkyboxProps = Partial<ISkybox> & {
  children?: React.ReactNode
}
