import { Meta } from "./shared.interfaces";

export interface StudentContactResI {
  studentContact: StudentContactI[];
  meta: Meta;
}
export interface StudentContactReqI {
  search: string;
  limit: number;
  page: number;
}

export interface StudentContactI {
  id?: string;
  student_id?: string;
  home_phone_number: string;
  student_phone_number: string;
  email: string;
  parent_email: string;
  deletedAt?: any;
}

export interface StudentContactFormI {
  home_phone_number: string;
  student_phone_number: string;
  email: string;
  parent_email: string;
}
