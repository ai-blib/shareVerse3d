import IWater from "../loader_package/interface/IWater"
import React from "react"

export type WaterProps = Partial<IWater> & {
  children?: React.ReactNode
}
