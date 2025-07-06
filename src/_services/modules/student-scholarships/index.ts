import { Api } from "_services/api";
import {
  StudentScholarshipsI,
  StudentScholarshipsReqI,
  StudentScholarshipsResI,
} from "_interfaces/student-scholarships.interface";

export const studentScholarshipsApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getStudentScholarships: build.query<
      StudentScholarshipsResI,
      StudentScholarshipsReqI
    >({
      query: (param) =>
        `http://localhost:3003/school/student-scholarships?page=${param.page}&limit=${param.limit}`,
      keepUnusedDataFor: 0,
    }),
    getStudentScholarshipsById: build.query<StudentScholarshipsI, string>({
      query: (id) => `http://localhost:3003/school/student-scholarships/${id}`,
      keepUnusedDataFor: 0,
    }),
    createStudentScholarships: build.mutation<
      { success: boolean },
      StudentScholarshipsI
    >({
      query(body) {
        return {
          url: `http://localhost:3003/school/student-scholarships`,
          method: "POST",
          body,
        };
      },
    }),
    updateStudentScholarships: build.mutation<
      { success: boolean },
      StudentScholarshipsI
    >({
      query(body) {
        return {
          url: `http://localhost:3003/school/student-scholarships/${body.id}`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteStudentScholarships: build.mutation<{ success: boolean }, string>({
      query(id) {
        return {
          url: `http://localhost:3003/school/student-scholarships/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetStudentScholarshipsQuery,
  useGetStudentScholarshipsByIdQuery,
  useCreateStudentScholarshipsMutation,
  useUpdateStudentScholarshipsMutation,
  useDeleteStudentScholarshipsMutation,
} = studentScholarshipsApi;
