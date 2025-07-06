import { Api } from "_services/api";
import { StudentBillI, StudentBillReqI, StudentBillResI } from "_interfaces/student-bill.interfaces";

export const studentBillApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getListStudentBill: build.query<StudentBillResI, StudentBillReqI>({
      query: (param) =>
        `http://localhost:3003/school/student-bill?page=${param.page}&limit=${param.limit}&search=${param.search}`,
      keepUnusedDataFor: 0,
    }),
    getStudentBillById: build.query<StudentBillI, string>({
      query: (id) => `http://localhost:3003/school/student-bill/${id}`,
      keepUnusedDataFor: 0,
    }),
    createStudentBill: build.mutation<{ success: boolean }, StudentBillI>({
      query(body) {
        return {
          url: `http://localhost:3003/school/student-bill`,
          method: "POST",
          body,
        };
      },
    }),
    updateStudentBill: build.mutation<{ success: boolean }, StudentBillI>({
      query(body) {
        return {
          url: `http://localhost:3003/school/student-bill/${body.id}`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteStudentBill: build.mutation<{ success: boolean }, string>({
      query(id) {
        return {
          url: `http://localhost:3003/school/student-bill/${id}`,
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
  useUpdateStudentBillMutation,
  useDeleteStudentBillMutation,
} = studentBillApi;