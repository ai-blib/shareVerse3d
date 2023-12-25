import React from "react"
import { Sprite as GameSprite } from "../../package"
import useManager, { ParentContext } from "../../hooks/useManager"
import { SpriteProps } from "../../props/SpriteProps"

const Sprite = React.forwardRef<GameSprite, SpriteProps>((p, ref) => {
  const manager = useManager(p, ref, GameSprite)
  return (
    <ParentContext.Provider value={manager}>
      {p.children}
    </ParentContext.Provider>
  )
})

export default Sprite
