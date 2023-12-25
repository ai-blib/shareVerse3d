import IThirdPersonCamera from "../loader_package/interface/IThirdPersonCamera"
import React from "react"

export type ThirdPersonCameraProps = Partial<IThirdPersonCamera> & {
  children?: React.ReactNode
}
