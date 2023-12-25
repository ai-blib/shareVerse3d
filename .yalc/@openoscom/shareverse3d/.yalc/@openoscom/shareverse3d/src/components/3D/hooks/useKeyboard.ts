import { useCurrentRef } from "@lincode/hooks"
import { Keyboard } from "../loader_package"
import { isPressed } from "../loader_package/api/keyboard"
import { useLayoutEffect, useState } from "react"

export default (cb?: (key: string) => void) => {
  const [keys, setKeys] = useState("")
  const cbCurrentRef = useCurrentRef(cb)

  useLayoutEffect(() => {
    const keyboard = new Keyboard()
    let latestKey = ""

    keyboard.onKeyDown = (k) => {
      if (latestKey === k) return
      latestKey = k
      setKeys([...isPressed].join(" "))
    }

    keyboard.onKeyUp = () => {
      latestKey = ""
      setKeys([...isPressed].join(" "))
    }

    keyboard.onKeyPress = (k) => cbCurrentRef.current?.(k)

    return () => {
      keyboard.dispose()
    }
  }, [])

  return keys
}
