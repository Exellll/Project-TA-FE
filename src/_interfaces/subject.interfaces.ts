import { Meta } from "./shared.interfaces";

export interface Subject {
  id: string;
  name: string;
  grade: string;
  status: "active" | "inactive";
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  
}

export interface SubjectReqI {
  search: string;
  limit: number;
  page: number;
}

export interface SubjectReqID {
  id: string;
}

export interface SubjectResI {
  subjects: SubjectsI[]
  meta: Meta;
}

export interface SubjectsI {
  id?: string
  title: string
  group: string
  status: boolean;
}

export interface SubjectsFormsI {
  title: string
  group: string
  status: "active" | "inactive";
}



