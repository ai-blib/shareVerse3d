import ISpawnPoint from "../loader_package/interface/ISpawnPoint"
import React from "react"

export type SpawnPointProps = Partial<ISpawnPoint> & {
  children?: React.ReactNode
}
