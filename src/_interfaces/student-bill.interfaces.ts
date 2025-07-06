import { Meta } from "./shared.interfaces";
import { StudentI } from "./student.interfaces";

export interface StudentBillResI {
  studentBills: StudentBillI[]
  meta: Meta
}

export interface StudentBillReqI {
  search: string
  limit: number
  page: number
}

export interface StudentBillI {
  id: string
  student_id: string
  type: string
  due_date: string
  bill_amount: string
  deletedAt: any
  createdAt: string
  updatedAt: string
  students: Students
}

export interface Students {
  name: string
}
