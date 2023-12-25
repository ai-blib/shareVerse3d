import ITrigger from "../loader_package/interface/ITrigger"
import React from "react"

export type TriggerProps = Partial<ITrigger> & {
  children?: React.ReactNode
}
