import { Api } from "_services/api";
import {
  CreateStudentBillByClassI,
  StudentBillFormI,
  StudentBillI,
  StudentBillReqI,
  StudentBillResI,
} from "_interfaces/student-bill.interfaces";

export const studentBillApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getListStudentBill: build.query<StudentBillResI, StudentBillReqI>({
      query: (param) =>
        `https://auth-ta.duckdns.org/school/school/student-bill?page=${param.page}&limit=${param.limit}&search=${param.search}`,
      keepUnusedDataFor: 0,
    }),
    getStudentBillById: build.query<StudentBillI, string>({
      query: (id) => `https://auth-ta.duckdns.org/school/school/student-bill/${id}`,
      keepUnusedDataFor: 0,
    }),
    createStudentBill: build.mutation<{ success: boolean }, StudentBillFormI>({
      query(body) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/student-bill`,
          method: "POST",
          body,
        };
      },
    }),
    createBillsByClassId: build.mutation<
      { message: string },
      CreateStudentBillByClassI
    >({
      query({ class_id, ...payload }) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/student-bill/class/${class_id}`,
          method: "POST",
          body: payload,
        };
      },
    }),
    updateStudentBill: build.mutation<{ success: boolean }, StudentBillFormI>({
      query(body) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/student-bill/${body.id}`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteStudentBill: build.mutation<{ success: boolean }, string>({
      query(id) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/student-bill/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetListStudentBillQuery,
  useGetStudentBillByIdQuery,
  useCreateStudentBillMutation,
  useCreateBillsByClassIdMutation,
  useUpdateStudentBillMutation,
  useDeleteStudentBillMutation,
} = studentBillApi;
