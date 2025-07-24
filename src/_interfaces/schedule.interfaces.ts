export type ScheduleDay = "senin" | "selasa" | "rabu" | "kamis" | "jumat" | "sabtu";

export interface ScheduleRes {
  schedule: ScheduleI[];
}

export interface ScheduleI {
  id: string;
  day: string;
  start_time: string;
  end_time: string;
  school_year: string;
  semester: number;
  deletedAt: any;
  createdAt: string;
  updatedAt: string;
  subject: Subject;
  class: Class;
}

export interface ScheduleClassRes{
  schedules: ScheduleById[];
  schedule_config: {
    start_time: string;
    end_time: string;
    duration: number;
    break_duration: number;
    break_time: string;
  };
}

export interface ScheduleStudentRes{
  schedules: ScheduleById[];
  schedule_config: {
    start_time: string;
    end_time: string;
    duration: number;
    break_duration: number;
    break_time: string;
  };
}

export interface ScheduleById{
  id: string;
  day: ScheduleDay;
  start_time: string;
  end_time: string;
  school_year: string;
  semester: number;
  subject: Subject;
  class: Class;
}

export interface SchedulePayload {
  id?: string;
  subject_id: string;
  class_id: string
  day: ScheduleDay;
  start_time: string;
  end_time: string;
  duration?: number;
  break_duration?: number;
  break_time?: string;
}

export interface Teacher {
  id: string;
  name: string;
}

export interface Subject {
  id: string;
  title: string;
  teacher: Teacher[];
}

export interface Class {
  id: string;
  name: string;
}

export interface ScheduleConfigPayload {
  start_time: string;
  end_time: string;
  duration: number;
  break_duration: number;
  break_time: string;
}

export interface CreateScheduleWithConfigDto {
  schedules: SchedulePayload[];
  config: ScheduleConfigPayload;
}

