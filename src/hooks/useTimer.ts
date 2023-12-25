import { useLayoutEffect } from "react"
import { timer } from "../package"
import { useCurrentRef } from "@lincode/hooks"

export default (
  duration: number,
  repeat: number,
  cb: () => void,
  play = true
) => {
  const cbCurrentRef = useCurrentRef(cb)

  useLayoutEffect(() => {
    if (!play) return

    const handle = timer(duration, repeat, () => cbCurrentRef.current())

    return () => {
      handle.cancel()
    }
  }, [play, duration, repeat])
}
