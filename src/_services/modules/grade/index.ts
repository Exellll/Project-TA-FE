import { Api } from "_services/api";
import {
  BulkGradePayload,
  GradeByStudentIdRes,
  GradeRes,
  RecommendationRes,
} from "_interfaces/grade.interfaces";

export const gradeApi = Api.injectEndpoints({
  endpoints: (build) => ({
    bulkCreateGrade: build.mutation<any, BulkGradePayload>({
      query: (body) => ({
        url: "https://auth-ta.duckdns.org/school/school/bulk-grades",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Grade"],
    }),
    getGradesByClass: build.query<GradeRes[], { class_id: string }>({
      query: ({ class_id }) => ({
        url: `https://auth-ta.duckdns.org/school/school/grades/class/${class_id}`,
        method: "GET",
      }),
    }),
    getGradesByStudent: build.query<
      GradeByStudentIdRes,
      { student_id: string }
    >({
      query: ({ student_id }) => ({
        url: `https://auth-ta.duckdns.org/school/school/grades/student/${student_id}`,
        method: "GET",
      }),
    }),
    getStudentRecommendation: build.query<
      RecommendationRes,
      { student_id: string }
    >({
      query: ({ student_id }) => ({
        url: `https://auth-ta.duckdns.org/school/school/student/${student_id}/recommendation`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useBulkCreateGradeMutation,
  useGetGradesByClassQuery,
  useGetGradesByStudentQuery,
  useGetStudentRecommendationQuery,
} = gradeApi;
