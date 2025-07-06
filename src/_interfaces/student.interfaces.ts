import { Meta } from "./shared.interfaces";

export interface Student {
  id: string;
  nisn: string;
  name: string;
  dob: string;
  gender: "Laki-Laki" | "Perempuan";
  grade: string;
  class: string;
  status: "active" | "inactive";
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export interface StudentResI {
  students: StudentI[]
  meta: Meta
}

export interface StudentReqI {
  search: string;
  limit: number;
  page: number;
  is_draft: string;
}

export interface StudentI {
  id?: string
  student_id?: string
  name: string
  gender: string
  nisn: string
  nik: string
  birth_place: string
  birth_date: string
  akta: string
  religion: string
  citizenship: string
  special_needs: string
  address: string
  rt: string
  rw: string
  pos_code: string
  kelurahan: string
  kecamatan: string
  residence: string
  transportation: string
  no_kks: string
  child_order: number
  is_kps_recipients: boolean
  no_kps: string
  is_has_kip: boolean
  no_kip: string
  kip_name: string
  pip_feasible_reasons: string
  is_draft: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

export interface StudentFormI {
  id?: string
  name: string
  gender: string
  nisn: string
  nik: string
  birth_place: string
  birth_date: Date
  akta: string
  religion: string
  citizenship: string
  special_needs: string
  address: string
  rt: string
  rw: string
  pos_code: string
  kelurahan: string
  kecamatan: string
  residence: string
  transportation: string
  no_kks: string
  child_order: number
  is_kps_recipients: boolean
  no_kps: string
  is_has_kip: boolean
  no_kip: string
  kip_name: string
  pip_feasible_reasons: string
  is_draft: boolean
}

export interface StudentProps {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
  stepStatic: number
  setStepStatic: React.Dispatch<React.SetStateAction<number>>
  handleStep: (step: number) => boolean
}
