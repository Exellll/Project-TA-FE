
export interface CreateStaffReqI {
  name: string;
  nip: string;
  nik: string;
  education_level: string;
  birth_place: string;
  birth_date: string;
  graduationYear: string;
  gender: string;
  major: string;
  address: string;
  roles: string[];
  subjects?: string[];
  phone_number: string;
  bidang_studi: string;
  join_date: string;
  email: string;
  ktp: string;
  kk: string;
  ijazah: string;
  transcript: string;
  avatar: string;
  employment_status: string;
}

export interface CreateStaffFormI {
  name: string;
  nip: string;
  nik: string;
  education_level: string;
  birth_place: string;
  birth_date: string;
  graduationYear: string;
  gender: string;
  major: string;
  address: string;
  roles: string[];
  subjects?: string[];
  phone_number: string;
  bidang_studi: string;
  join_date: string;
  email: string;
  ktp?: File | null;
  kk?: File | null;
  ijazah?: File | null;
  transcript?: File | null;
  avatar?: File | null;
  employment_status: string;
}

export interface CreateStaffResI {
  success: boolean;
  message: string;
}

export interface UpdateStaffReqI {
  id: string;
  name: string;
  nip: string;
  nik: string;
  birth_place: string;
  birth_date: string;
  graduationYear: string;
  education_level: string;
  gender: string;
  major: string;
  address: string;
  roles: string[];
  subjects?: string[];
  phone_number: string;
  bidang_studi: string;
  join_date: string;
  email: string;
  ktp?: string;
  kk?: string;
  ijazah?: string;
  transcript?: string;
  avatar?: string;
  employment_status: string;
}

export interface UpdateStaffFormI {
  id: string;
  name: string;
  nip: string;
  nik: string;
  education_level: string;  
  birth_place: string;
  birth_date: string;
  graduationYear: string;
  gender: string;
  major: string;
  address: string;
  roles: string[];
  subjects: string[];
  phone_number: string;
  bidang_studi: string;
  join_date: string;
  email: string;
  ktp?: File | null;
  kk?: File | null;
  ijazah?: File | null;
  transcript?: File | null;
  avatar?: File | null;
  employment_status: string;
}

export interface ListStaffReqI {
  page: number;
  limit: number;
  search: string;
  education_level?: string;
  employee_status?: string;
  role?: string;
  join_date?: string;
  homeroom_teacher?: string;
}

export interface GetStaffResI {
  data: Staff;
  success: boolean;
}

export interface ListStaffResI {
  data: Staff[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface Data {

}

export interface GetStaffByIdResI {
  success: boolean;
  status: number;
  data : Staff;
}

export interface Staff {
  id: string
  staff_id: string
  name: string
  education_level: string
  employment_status: string
  major: string
  gender: string
  nik: string
  nip: string
  address: string
  birth_place: string
  birth_date: string
  ktp: string
  kk: string
  ijazah: string
  transcript: string
  avatar: string
  phone_number: string
  join_date: string
  createdAt: string
  createdById: string
  updateById: any
  updatedAt: any
  deletedAt: any
  staff_role: Role[]
  staff_subject: StaffSubject[]
}

export interface Role {
  id: string
  role_id: string
  createdAt: string
  createdById: string
  updateById: any
  updatedAt: any
  deletedAt: any
}

export interface StaffSubject {
  id: string
  deletedAt: any
  subject: Subject
}

export interface Subject {
  id: string
  title: string
  group: string
  status: boolean
  deletedAt: any
}

export interface Gender {
  id: string
  name: string
}

export interface Education_Level {
  id: string,
  name: string
}

