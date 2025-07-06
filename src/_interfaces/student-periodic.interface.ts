import { Meta } from "./shared.interfaces";

export interface StudentPeriodicResI {
  studentPeriodic: StudentPeriodicI[];
  meta: Meta;
}

export interface StudentPeriodicReqI {
  search: string;
  limit: number;
  page: number;
}

export interface StudentPeriodicI {
  id?: string;
  student_id?: string;
  body_height: number;
  body_weight: number;
  kps_recipients_distance: string;
  travel_time_in_hour: number;
  travel_time_in_minutes: number;
  number_of_sibling: number;
  deletedAt?: any;
}
export interface StudentPeriodicFormI {
  body_height: number;
  body_weight: number;
  kps_recipients_distance: string;
  travel_time_in_hour: number;
  travel_time_in_minutes: number;
  number_of_sibling: number;
}
