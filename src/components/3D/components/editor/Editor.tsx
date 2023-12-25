import React from "react"
import LingoEditor from "../../loader_package/editor/Editor"
import useEditor from "../../hooks/useEditor"

const Editor: React.FC = () => {
  const divRef = useEditor(LingoEditor)

  return <div ref={divRef} className="lingo3d-ui" style={{ height: "100%" }} />
}

export default Editor
