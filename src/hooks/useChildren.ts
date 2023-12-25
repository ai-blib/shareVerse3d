import { Model } from "../package"
import FoundManager from "../package/display/core/FoundManager"
import Loaded from "../package/display/core/Loaded"
import ObjectManager from "../package/display/core/ObjectManager"
import React, { useEffect, useState } from "react"

type Parent = ObjectManager | Model | Loaded | undefined

export default (
  parent: Parent | React.MutableRefObject<Parent>,
  name?: string | RegExp
) => {
  const [found, setFound] = useState<Array<FoundManager>>([])
  const _parent = parent && "current" in parent ? parent.current : parent

  useEffect(() => {
    if (!_parent) return

    if ("loaded" in _parent) {
      const handle = _parent.loaded.then(() => {
        setFound(_parent.findAll(name))
      })
      return () => {
        handle.cancel()
      }
    }
    setFound(_parent.findAll(name))
  }, [_parent])

  return found
}
