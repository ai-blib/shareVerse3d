import ICamera from "../loader_package/interface/ICamera"
import React from "react"

export type CameraProps = Partial<ICamera> & {
  children?: React.ReactNode
}
