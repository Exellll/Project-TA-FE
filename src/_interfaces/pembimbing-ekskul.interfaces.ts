import { Meta } from "./shared.interfaces";
import { EkskulI } from "./ekskul.interfaces";

export interface PembimbingEkskulRes {
  pembimbing: PembimbingI[]
  meta: Meta
}

export interface PembimbingEkskulReq {
    page?: number
    limit?: number
    search?: string
}

export interface PembimbingI {
  id: string
  name: string
  no_telepon: string
  address: string
  ekskul_id: string
  createdAt: string
  updatedAt: string
  deletedAt: any
  ekskul?: EkskulI
}
