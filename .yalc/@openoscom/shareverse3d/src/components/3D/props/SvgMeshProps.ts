import ISvgMesh from "../loader_package/interface/ISvgMesh"
import React from "react"

export type SvgMeshProps = Partial<ISvgMesh> & {
  children?: React.ReactNode
}
