import { Meta } from "./shared.interfaces";

export interface EkskulResI {
  ekskul: EkskulI[]
  meta: Meta
}

export interface EkskulReqI {
  search: string;
  limit: number;
  page: number;
}


export interface EkskulI {
  id: string
  name: string
  description: string
  day: string
  start_time: string
  end_time: string
  location: string
  capacity: string
  status: boolean;
  createdAt: string
  updatedAt: string
  deletedAt: any
}

export interface EkskulFormsI {
  id: string
  name: string
  description: string
  day: string
  start_time: string
  end_time: string
  location: string
  capacity: string
  status: "active" | "inactive";
  createdAt: string
  updatedAt: string
  deletedAt: any
}
