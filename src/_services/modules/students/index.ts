import {
  StudentFormI,
  StudentI,
  StudentReqI,
  StudentResI,
} from "_interfaces/student.interfaces";
import { Api } from "_services/api";

export const studentApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getStudents: build.query<StudentResI, StudentReqI>({
      query: (param) =>
        `https://auth-ta.duckdns.org/school/school/student?page=${param.page}&limit=${param.limit}&is_draft=${param.is_draft}`,
      keepUnusedDataFor: 0,
    }),
    getStudentById: build.query<StudentI, string>({
      query: (id) => `https://auth-ta.duckdns.org/school/school/student/${id}`,
      keepUnusedDataFor: 0,
    }),
    createStudent: build.mutation<{ student_id: string }, StudentFormI>({
      query(body) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/student`,
          method: "POST",
          body,
        };
      },
    }),
    updateStudent: build.mutation<{ success: boolean }, StudentFormI>({
      query(body) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/student/${body.id}`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteStudent: build.mutation<{ success: boolean }, string>({
      query(id) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/student/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;
