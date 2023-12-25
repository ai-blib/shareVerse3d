import ISkybox from "../package/interface/ISkybox"
import React from "react"

export type SkyboxProps = Partial<ISkybox> & {
  children?: React.ReactNode
}
