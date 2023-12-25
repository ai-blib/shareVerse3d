import IOrbitCamera from "../package/interface/IOrbitCamera"
import React from "react"

export type OrbitCameraProps = Partial<IOrbitCamera> & {
  children?: React.ReactNode
}
