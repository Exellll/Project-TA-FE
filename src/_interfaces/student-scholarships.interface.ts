import { Meta } from "./shared.interfaces";

export interface StudentScholarshipsResI {
  studentScholarships: StudentScholarshipsI[];
  meta: Meta;
}

export interface StudentScholarshipsReqI {
  search: string;
  limit: number;
  page: number;
}

export interface StudentScholarshipsI {
  id?: string;
  student_id?: string;
  scholarship_type: string;
  start_year: string;
  end_year: string;
  description: string;
  deletedAt?: any;
}

export interface StudentScholarshipsFormI {
  scholarship_type: string;
  start_year: string;
  end_year: string;
  description: string;
}
