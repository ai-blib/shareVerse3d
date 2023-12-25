import { preload } from "../loader_package"
import { useState } from "react"
import useLayoutEffectOnce from "./useLayoutEffectOnce"

export default (urls: Array<string>, total: string | number) => {
  const [progress, setProgress] = useState(0)

  useLayoutEffectOnce(() => {
    preload(urls, total, (val) => setProgress(val)).then(() => setProgress(100))
  }, [])

  return progress
}
