import { Api } from "_services/api";
import {
  StudentRegistrationI,
  StudentRegistrationReqI,
  StudentRegistrationResI,
} from "_interfaces/student-registration.interface";

export const studentRegistrationApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getStudentRegistration: build.query<
      StudentRegistrationResI,
      StudentRegistrationReqI
    >({
      query: (param) =>
        `http://localhost:3003/school/student-registration?page=${param.page}&limit=${param.limit}`,
      keepUnusedDataFor: 0,
    }),
    getStudentRegistrationById: build.query<StudentRegistrationI, string>({
      query: (id) => `http://localhost:3003/school/student-registration/${id}`,
      keepUnusedDataFor: 0,
    }),
    createStudentRegistration: build.mutation<
      { success: boolean },
      StudentRegistrationI
    >({
      query(body) {
        return {
          url: `http://localhost:3003/school/student-registration`,
          method: "POST",
          body,
        };
      },
    }),
    updateStudentRegistration: build.mutation<
      { success: boolean },
      StudentRegistrationI
    >({
      query(body) {
        return {
          url: `http://localhost:3003/school/student-registration/${body.id}`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteStudentRegistration: build.mutation<{ success: boolean }, string>({
      query(id) {
        return {
          url: `http://localhost:3003/school/student-registration/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetStudentRegistrationQuery,
  useGetStudentRegistrationByIdQuery,
  useCreateStudentRegistrationMutation,
  useUpdateStudentRegistrationMutation,
  useDeleteStudentRegistrationMutation,
} = studentRegistrationApi;
