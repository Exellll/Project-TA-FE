import { StudentI } from "./student.interfaces";

export interface GetClassStudentI {
  students: StudentI[];
}

export interface ClassStudent {
  id: string;
  deletedAt: any;
  classes: Classes;
}

export interface Classes {
  id: string;
  type: string;
  name: string;
  capacity: number;
  status: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: any;
  deletedAt: any;
}

export interface StudentServerToClientEvents {
  join_room: (data: { students: StudentI[] }) => void; // Event "join_room" mengirimkan data dari server ke klien
  add: (data: { students: StudentI }) => void; // Event "add" mengirimkan data dari server ke klien
  delete: (data: { student_id: string }) => void; // Event "delete" mengirimkan data dari server ke klien
}

export interface StudentClientToServerEvents {
  join_room: (data: { class_id: string }) => void; // Event "join_room" dengan parameter class_id
  add: (data: { class_id: string; student_id: string }) => void; // Event "add" dengan parameter class_id dan staff_subject_id
  delete: (data: { class_id: string; student_id: string }) => void; // Event "delete" dengan parameter class_id dan staff_subject_id
}
