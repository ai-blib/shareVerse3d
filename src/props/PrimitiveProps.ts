import IPrimitive from "../package/interface/IPrimitive"
import React from "react"

export type PrimitiveProps = Partial<IPrimitive> & {
  children?: React.ReactNode
}
