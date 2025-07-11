import { Api } from "_services/api";
import { BulkGradePayload, GradeRes } from "_interfaces/grade.interfaces";

export const gradeApi = Api.injectEndpoints({
  endpoints: (build) => ({
    bulkCreateGrade: build.mutation<any, BulkGradePayload>({
      query: (body) => ({
        url: "http://localhost:3003/school/bulk-grades",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Grade"],
    }),
    getGradesByClass: build.query<GradeRes[], { class_id: string }>({
      query: ({ class_id }) => ({
        url: `http://localhost:3003/school/grades/class/${class_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useBulkCreateGradeMutation, useGetGradesByClassQuery } = gradeApi;
