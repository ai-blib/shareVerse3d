import React from "react"
import LingoSceneGraph from "../../loader_package/editor/SceneGraph"
import useEditor from "../../hooks/useEditor"

const SceneGraph: React.FC = () => {
  const divRef = useEditor(LingoSceneGraph)

  return <div ref={divRef} className="lingo3d-ui" style={{ height: "100%" }} />
}

export default SceneGraph
