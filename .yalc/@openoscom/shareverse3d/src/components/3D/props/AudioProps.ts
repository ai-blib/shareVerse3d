import IAudio from "../loader_package/interface/IAudio"
import React from "react"

export type AudioProps = Partial<IAudio> & {
  children?: React.ReactNode
}
