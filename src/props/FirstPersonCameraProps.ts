import ICharacterCamera from "../package/interface/ICharacterCamera"
import React from "react"

export type FirstPersonCameraProps = Partial<ICharacterCamera> & {
  children?: React.ReactNode
}
