import React from "react"
import LingoEditor from "../../package/editor/LingoEditor"
import useEditor from "../../hooks/useEditor"

const Editor: React.FC = () => {
  const divRef = useEditor(LingoEditor, { embedded: true })

  return <div ref={divRef} style={{ height: "100%" }} />
}

export default Editor
