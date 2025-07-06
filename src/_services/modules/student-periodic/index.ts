import { Api } from "_services/api";
import {
  StudentPeriodicI,
  StudentPeriodicReqI,
  StudentPeriodicResI,
} from "_interfaces/student-periodic.interface";

export const studentPeriodicApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getStudentPeriodic: build.query<StudentPeriodicResI, StudentPeriodicReqI>({
      query: (param) =>
        `http://localhost:3003/school/student-periodic?page=${param.page}&limit=${param.limit}`,
      keepUnusedDataFor: 0,
    }),
    getStudentPeriodicById: build.query<StudentPeriodicI, string>({
      query: (id) => `http://localhost:3003/school/student-periodic/${id}`,
      keepUnusedDataFor: 0,
    }),
    createStudentPeriodic: build.mutation<
      { success: boolean },
      StudentPeriodicI
    >({
      query(body) {
        return {
          url: `http://localhost:3003/school/student-periodic`,
          method: "POST",
          body,
        };
      },
    }),
    updateStudentPeriodic: build.mutation<
      { success: boolean },
      StudentPeriodicI
    >({
      query(body) {
        return {
          url: `http://localhost:3003/school/student-periodic/${body.id}`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteStudentPeriodic: build.mutation<{ success: boolean }, string>({
      query(id) {
        return {
          url: `http://localhost:3003/school/student-periodic/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetStudentPeriodicQuery,
  useGetStudentPeriodicByIdQuery,
  useCreateStudentPeriodicMutation,
  useUpdateStudentPeriodicMutation,
  useDeleteStudentPeriodicMutation,
} = studentPeriodicApi;
