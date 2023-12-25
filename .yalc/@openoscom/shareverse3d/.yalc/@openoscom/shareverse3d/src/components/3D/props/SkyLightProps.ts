import ISkyLight from "../loader_package/interface/ISkyLight"
import React from "react"

export type SkyLightProps = Partial<ISkyLight> & {
  children?: React.ReactNode
}
