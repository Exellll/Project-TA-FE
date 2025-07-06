import { Meta } from "./shared.interfaces";

export interface StudentRegistrationResI {
  studentRegistration: StudentRegistrationI[];
  meta: Meta;
}

export interface StudentRegistrationReqI {
  search: string;
  limit: number;
  page: number;
}

export interface StudentRegistrationI {
  id?: string;
  student_id?: string;
  registration_type: string;
  nis: string;
  join_date: string;
  previous_school: string;
  no_examinee: string;
  no_ijazah: string;
  no_skhus: string;
  skill_competency: string;
  deletedAt?: any;
}

export interface StudentRegistrationFormI {
  registration_type: string;
  nis: string;
  join_date: string;
  previous_school: string;
  no_examinee: string;
  no_ijazah: string;
  no_skhus: string;
  skill_competency: string;
}
