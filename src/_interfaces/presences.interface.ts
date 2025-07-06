import { Meta } from "./shared.interfaces";

export interface PresencesResI {
  presences: PresencesI[];
  meta: Meta;
}

export interface PresencesReqI {
  page: number;
  limit: number;
}

export interface PresencesI {
  id: string;
  schedule: string;
  clockIn: any;
  lat: number;
  lng: number;
  picture: string;
  isValid: string;
  studentId: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  leave: Leave;
}

export interface Leave {
  id: string;
  type: string;
  description: string;
  attachment: string;
  startedAt: string;
  endedAt: string;
  reason: string;
  status: string;
  studentId: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}
