import ICamera from "../package/interface/ICamera"
import React from "react"

export type CameraProps = Partial<ICamera> & {
  children?: React.ReactNode
}
