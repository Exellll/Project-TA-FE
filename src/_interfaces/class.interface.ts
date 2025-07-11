import { Staff } from "./staff.interfaces"

export interface Class {
  id: string
  type: string
  name: string
  capacity: number
  status: string
  createdAt: string
  createdBy: string
  updatedAt: string
  updatedBy: any
  deletedAt: any
  class_subject: [
    {
      subject_id: string,
      title: string,
    }
  ]
  homeroom?: Staff
  class_student: [
    {
      student_id: string,
      name: string,
    }
  ]
}

export interface ClassSubject {
  id: string
  deletedAt: any
  subject: Subject
}

export interface Subject {
  id: string
  deletedAt: any
  subject: Subject2
  staff: Staff
}

export interface Subject {
  id: string
  deletedAt: any
  subject: Subject2
  staff: Staff
}

export interface Subject2 {
  id: string
  title: string
  group: string
  status: boolean
  deletedAt: any
}

export interface Params {
  search: string;
  limit: number;
  page: number;
}

export interface StudentParams {
  search: string;
  limit: number;
  page: number;
  is_draft: string;
}

export interface ListClassReqI {
  page: number;
  limit: number;
  search: string;
  type?: string;
  status?: string;
  year?: string;
}

export interface ListClassResI {
  data: Class[];
  success: boolean;
}

export interface CreateClassReqI {
  id?: string;
  kelas: string
  indexKelas: string
  capacity: number
}

export interface CreateClassResI {
  success: boolean
  statusCode: number
  data: Class
  timestamp: string
}

export interface UpdateClassResI {
  success: boolean
  statusCode: number
  data: Class
  timestamp: string
}

export interface AddHomeroomReqI {
  staffId: string
  classId: string
}

export interface AddSubjectReqI {
  classId: string
  staffSubjectId: string
}

export interface AddStudentReqI {
  classId: string
  studentId: string
}
