import { Meta } from "./shared.interfaces";

export interface LeaveRequestsResI {
  leave_request: LeaveRequestI[];
  meta: Meta;
}

export interface LeaveRequestsReqI {
  page: number;
  limit: number;
}

export interface LeaveRequestI {
  id: string;
  type: string;
  description: string;
  attachment: string;
  startedAt: string;
  endedAt: string;
  reason: string;
  status: string;
  student_id: string;
  school_id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
