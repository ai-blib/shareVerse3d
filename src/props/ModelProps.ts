import IModel from "../package/interface/IModel"
import React from "react"

export type ModelProps = Partial<IModel> & {
  children?: React.ReactNode
}
