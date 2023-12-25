import React from "react"
import LingoHUD from "../../package/editor/HUD"
import useEditor from "../../hooks/useEditor"

const HUD: React.FC = () => {
  const divRef = useEditor(LingoHUD)

  return (
    <div ref={divRef} className="lingo3d-ui" style={{ overflow: "visible" }} />
  )
}

export default HUD
