import { SubjectI } from "./class-subject.interface";
import { Meta } from "./shared.interfaces";

export interface TeacherResI {
  teachers: TeacherI[];
  meta: Meta;
}

export interface TeacherReqI {
  page: number;
  limit: number;
  search: string;
}

export interface TeacherI {
  id: string;
  name: string;
  nip: string;
  email: string;
  no_telepon: string;
  address: string;
  gender: string;
  birth_date: string;
  foto_url: string;
  status: boolean;
  subjects: SubjectI[];
  deletedAt: any;
  createdAt: string;
  updatedAt: string;
}

export interface TeacherCreatePayload {
  name: string;
  nip: string;
  email: string;
  no_telepon: string;
  address: string;
  gender: string;
  birth_date: string;
  foto_url?: string;
  status: boolean;
  subject_ids: string[];
}

export interface TeacherUpdatePayload {
  id: string;
  name: string;
  nip: string;
  email: string;
  no_telepon: string;
  address: string;
  gender: string;
  birth_date: string;
  foto_url?: string;
  status: boolean;
  subject_ids: string[];
}

export interface TeacherFormI {
  id: string;
  name: string;
  nip: string;
  email: string;
  no_telepon: string;
  address: string;
  gender: string;
  birth_date: string;
  foto_url: string;
  file?: File;
  status: "active" | "inactive";
  subject_ids: string[];
}
