import { Api } from "_services/api";
import {
  StudentContactI,
  StudentContactReqI,
  StudentContactResI,
} from "_interfaces/student-contact.interface";

export const studentContactApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getStudentContact: build.query<StudentContactResI, StudentContactReqI>({
      query: (param) =>
        `https://auth-ta.duckdns.org/school/school/student-contact?page=${param.page}&limit=${param.limit}`,
      keepUnusedDataFor: 0,
    }),
    getStudentContactById: build.query<StudentContactI, string>({
      query: (id) => `https://auth-ta.duckdns.org/school/school/student-contact/${id}`,
      keepUnusedDataFor: 0,
    }),
    createStudentContact: build.mutation<{ success: boolean }, StudentContactI>(
      {
        query(body) {
          return {
            url: `https://auth-ta.duckdns.org/school/school/student-contact`,
            method: "POST",
            body,
          };
        },
      }
    ),
    updateStudentContact: build.mutation<{ success: boolean }, StudentContactI>(
      {
        query(body) {
          return {
            url: `https://auth-ta.duckdns.org/school/school/student-contact/${body.id}`,
            method: "PUT",
            body,
          };
        },
      }
    ),
    deleteStudentContact: build.mutation<{ success: boolean }, string>({
      query(id) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/student-contact/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetStudentContactQuery,
  useGetStudentContactByIdQuery,
  useCreateStudentContactMutation,
  useUpdateStudentContactMutation,
  useDeleteStudentContactMutation,
} = studentContactApi;
