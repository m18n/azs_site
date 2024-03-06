import { Product } from "@/models/Product"
import type { Tank } from "@/models/Tank"
import { Trk } from "@/models/Trk"

import api from "@/services/providers/api"

interface Data {
  tanks: Tank[]
  tovars: Product[]
  trks: Trk[]
}

export const setAllSettings = async (data: Data): Promise<void> => {
  await api.post("/settings/set", data)
}
