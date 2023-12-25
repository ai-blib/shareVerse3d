import { getRenderer } from "../loader_package/states/useRenderer"
import { useLayoutEffect, useState } from "react"

export default () => {
  const [renderer, setRenderer] = useState(() => getRenderer())

  useLayoutEffect(() => {
    const handle = getRenderer((value) => {
      setRenderer(value)
    })
    return () => {
      handle.cancel()
    }
  }, [])

  return renderer
}
