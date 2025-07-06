import { Meta } from "./shared.interfaces";

export interface StudentAchievementResI {
  studentAchievement: StudentAchievementI[];
  meta: Meta;
}

export interface StudentAchievementReqI {
  search: string;
  limit: number;
  page: number;
}

export interface StudentAchievementI {
  id?: string;
  student_id?: string;
  achievement_type: string;
  achievement_level: string;
  name: string;
  organizer: string;
  year: string;
  rank: string;
  deletedAt?: any;
}

export interface StudentAchievementPayloadI {
  student_id?: string;
  achievement_type: string;
  achievement_level: string;
  name: string;
  organizer: string;
  year: string;
  rank: string;
}

export interface StudentAchievementFormI {
  achievements: StudentAchievementPayloadI[];
}
