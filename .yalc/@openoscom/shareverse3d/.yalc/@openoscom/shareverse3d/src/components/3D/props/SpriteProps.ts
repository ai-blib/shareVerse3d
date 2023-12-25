import ISprite from "../loader_package/interface/ISprite"
import React from "react"

export type SpriteProps = Partial<ISprite> & {
  children?: React.ReactNode
}
