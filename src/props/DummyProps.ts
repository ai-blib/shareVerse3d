import IDummy from "../package/interface/IDummy"
import React from "react"

export type DummyProps = Partial<IDummy> & {
  children?: React.ReactNode
}
