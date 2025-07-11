export interface StaffSubjectI {
  id: string;
  deletedAt?: any;
  staff: Staff;
  subject: Subject;
  class_subject: ClasssubjectI[];
}

export interface SubjectI {
  id: string;
  title: string;
  group: string;
}

export interface GetStaffSubjectRes {
  id: string;
  deletedAt?: any;
  staff: Staff;
  subject: Subject;
  class_subject: ClasssubjectI[];
}

export interface ClasssubjectI {
  id: string;
  deletedAt?: any;
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
  updatedBy?: any;
  deletedAt?: any;
}
export interface Subject {
  id: string;
  title: string;
  group: string;
  status: boolean;
  deletedAt?: any;
}
export interface Staff {
  id: string;
  staff_id: string;
  name: string;
  education_level: string;
  employment_status: string;
  major: string;
  gender: string;
  nik: string;
  nip: string;
  address: string;
  birth_place: string;
  birth_date: string;
  ktp: string;
  kk: string;
  ijazah: string;
  transcript: string;
  avatar: string;
  phone_number: string;
  join_date: string;
  createdAt: string;
  createdById: string;
  updateById?: any;
  updatedAt?: any;
  deletedAt?: any;
}

export interface ClassServerToClientEvents {
  join_room: (data: { subjects: SubjectI[] }) => void; // Event "join_room" mengirimkan data dari server ke klien
  add: (data: { subject: SubjectI }) => void; // Event "add" mengirimkan data dari server ke klien
  delete: (data: { subject_id: string }) => void; // Event "delete" mengirimkan data dari server ke klien
}

export interface ClassClientToServerEvents {
  join_room: (data: { class_id: string }) => void; // Event "join_room" dengan parameter class_id
  add: (data: { class_id: string; subject_id: string }) => void; // Event "add" dengan parameter class_id dan staff_subject_id
  delete: (data: { class_id: string; subject_id: string }) => void; // Event "delete" dengan parameter class_id dan staff_subject_id
}
