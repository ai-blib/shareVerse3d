import IPrimitive from "../loader_package/interface/IPrimitive"
import React from "react"

export type PrimitiveProps = Partial<IPrimitive> & {
  children?: React.ReactNode
}
