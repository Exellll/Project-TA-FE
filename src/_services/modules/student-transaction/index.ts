import { Api } from "_services/api";
import { StudentTransactionI, StudentTransactionListRes, StudentTransactionReq, StudentTransactionRes } from "_interfaces/student-transaction.interfaces";

export const studentTransactionApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getListStudentTransaction: build.query<StudentTransactionRes, StudentTransactionReq>({
      query: (param) =>
        `http://localhost:3003/school/student-transaction?page=${param.page}&limit=${param.limit}&search=${param.search}&type=${param.type}`,
      keepUnusedDataFor: 0,
    }),
    getStudentTransactionById: build.query<StudentTransactionI, string>({
      query: (id) => `http://localhost:3003/school/student-transaction/${id}`,
      keepUnusedDataFor: 0,
    }),
    getStudentTransactionByStudentId: build.query<StudentTransactionListRes, string>({
      query: (id) => `http://localhost:3003/school/student-transaction/student/${id}`,
      keepUnusedDataFor: 0,
    }),
    createStudentTransaction: build.mutation<{ success: boolean }, StudentTransactionI>({
      query(body) {
        return {
          url: `http://localhost:3003/school/student-transaction`,
          method: "POST",
          body,
        };
      },
    }),
    updateStudentTransaction: build.mutation<{ success: boolean }, StudentTransactionI>({
      query(body) {
        return {
          url: `http://localhost:3003/school/student-transaction/${body.id}`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteStudentTransaction: build.mutation<{ success: boolean }, string>({
      query(id) {
        return {
          url: `http://localhost:3003/school/student-transaction/${id}`,
          method: "DELETE",
        };
      }
    }),
  }),
});

export const {
  useGetListStudentTransactionQuery,
  useGetStudentTransactionByIdQuery,
  useGetStudentTransactionByStudentIdQuery,
  useCreateStudentTransactionMutation,
  useUpdateStudentTransactionMutation,
  useDeleteStudentTransactionMutation,
} = studentTransactionApi;