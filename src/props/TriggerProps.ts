import ITrigger from "../package/interface/ITrigger"
import React from "react"

export type TriggerProps = Partial<ITrigger> & {
  children?: React.ReactNode
}
