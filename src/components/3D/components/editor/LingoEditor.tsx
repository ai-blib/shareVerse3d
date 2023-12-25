import React from "react"
import LingoEditor from "../../loader_package/editor/LingoEditor"
import useEditor from "../../hooks/useEditor"

const Editor: React.FC = () => {
  const divRef = useEditor(LingoEditor, { embedded: true })

  return <div ref={divRef} style={{ height: "100%" }} />
}

export default Editor
