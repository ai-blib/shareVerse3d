import { preload } from "./loader_package"
import globalState from "./globalState"

export default (urls: Array<string>, total: string | number) => {
  const [useProgress, setProgress] = globalState(0)
  preload(urls, total, (val) => setProgress(val)).then(() => setProgress(100))
  return useProgress
}
