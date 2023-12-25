import IReticle from "../package/interface/IReticle"
import React from "react"

export type ReticleProps = Partial<IReticle> & {
  children?: React.ReactNode
}
