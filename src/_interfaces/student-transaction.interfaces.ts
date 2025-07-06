import { StudentBillI } from './student-bill.interfaces';
import { Meta } from './shared.interfaces';

export interface StudentTransactionRes {
  studentTransactions: StudentTransactionI[]
  meta: Meta
}

export interface StudentTransactionReq {
    page: number
    limit: number
    search: string
    type?: string;
}

export interface StudentTransactionI {
  id: string
  student_id: string
  student_bill_id?: string
  bukti_pembayaran: string
  payment_date: string
  status: string
  deletedAt: any
  createdAt: string
  updatedAt: string
  student_bill?: StudentBillI
}

export interface StudentTransactionFormsI {
  id: string
  student_id: string
  student_bill_id?: string
  bukti_pembayaran: string
  payment_date: string
  status: string
  file?: File
  deletedAt: any
  createdAt: string
  updatedAt: string
  student_bill?: StudentBillI
}

export interface StudentTransactionParams{
  search: string;
  limit: number;
  page: number;
  type?: string;
}

// Response interface for the list of student transactions

export interface StudentTransactionListRes {
  studentTransactions: StudentTransaction[]
}

export interface StudentTransaction {
  id: string
  student_id: string
  student_bill_id: string
  bukti_pembayaran: string
  payment_date: any
  status: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  student_bill: StudentBill
}

export interface StudentBill {
  id: string
  student_id: string
  type: string
  due_date: string
  bill_amount: string
  students: Students
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export interface Students {
  name: string
}


