import { Meta } from "./shared.interfaces";

export interface ParentsResI {
  parents: ParentsI[];
  meta: Meta;
}

export interface ParentsReqI {
  search: string;
  limit: number;
  page: number;
}

export interface ParentsI {
  id?: string;
  student_id?: string;
  name: string;
  gender: string;
  nik: string;
  birth_date: Date;
  education: string;
  job: string;
  income: string;
  special_needs: string;
  type?: string;
  deletedAt?: any;
}

export interface ParentsFormI {
  name: string;
  gender: string;
  nik: string;
  birth_date: Date;
  education: string;
  job: string;
  income: string;
  special_needs: string;
}
