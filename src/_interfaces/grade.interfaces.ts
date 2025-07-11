export interface GradePayload {
  student_id: string;
  subject_id: string;
  class_id: string;
  score: number;
}

export interface BulkGradePayload {
  data: GradePayload[];
}

export interface GradeRes {
  id: string;
  score: number;
  school_year: string;
  semester: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  student: {
    student_id: string;
    name: string;
  };
  subject: {
    id: string;
    title: string;
    group: string;
  };
  class: {
    id: string;
    type: string;
    name: string;
    capacity: number;
    status: string;
  };
}

