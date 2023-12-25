import IHTMLMesh from "../loader_package/interface/IHTMLMesh"
import React from "react"

export type HTMLMeshProps = Partial<IHTMLMesh> & {
  children?: React.ReactNode
}
