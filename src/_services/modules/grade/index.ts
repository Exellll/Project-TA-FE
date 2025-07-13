import { Api } from "_services/api";
import { BulkGradePayload, GradeByStudentIdRes, GradeRes } from "_interfaces/grade.interfaces";

export const gradeApi = Api.injectEndpoints({
  endpoints: (build) => ({
    bulkCreateGrade: build.mutation<any, BulkGradePayload>({
      query: (body) => ({
        url: "http://128.199.217.100:4001/school/bulk-grades",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Grade"],
    }),
    getGradesByClass: build.query<GradeRes[], { class_id: string }>({
      query: ({ class_id }) => ({
        url: `http://128.199.217.100:4001/school/grades/class/${class_id}`,
        method: "GET",
      }),
    }),
    getGradesByStudent: build.query<GradeByStudentIdRes, { student_id: string }>({
      query: ({ student_id }) => ({
        url: `http://128.199.217.100:4001/school/grades/student/${student_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useBulkCreateGradeMutation, useGetGradesByClassQuery, useGetGradesByStudentQuery } = gradeApi;
