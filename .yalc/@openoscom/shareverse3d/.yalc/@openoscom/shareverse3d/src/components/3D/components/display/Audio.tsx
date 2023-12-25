import React from "react"
import { Audio as GameAudio } from "../../loader_package"
import useManager, { ParentContext } from "../../hooks/useManager"
import { AudioProps } from "../../props/AudioProps"

const Audio = React.forwardRef<GameAudio, AudioProps>((p, ref) => {
  const manager = useManager(p, ref, GameAudio)
  return <ParentContext.Provider value={manager} />
})

export default Audio
