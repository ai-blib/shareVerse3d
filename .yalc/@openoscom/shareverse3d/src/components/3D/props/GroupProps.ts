import IGroup from "../loader_package/interface/IGroup"
import React from "react"

export type GroupProps = Partial<IGroup> & { children?: React.ReactNode }
