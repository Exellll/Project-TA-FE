import { Api } from "_services/api";
import { TeacherCreatePayload, TeacherFormI, TeacherI, TeacherReqI, TeacherResI, TeacherUpdatePayload } from "_interfaces/teachers.interfaces";

export const teacherApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getListTeacher: build.query<TeacherResI, TeacherReqI>({
      query: (param) =>
        `https://auth-ta.duckdns.org/school/school/teacher?page=${param.page}&limit=${param.limit}&search=${param.search}`,
      keepUnusedDataFor: 0,
    }),
    getTeacherById: build.query<TeacherI, string>({
      query: (id) => `https://auth-ta.duckdns.org/school/school/teacher/${id}`,
      keepUnusedDataFor: 0,
    }),
    createTeacher: build.mutation<{ success: boolean }, TeacherCreatePayload>({
      query(body) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/teacher`,
          method: "POST",
          body,
        };
      },
    }),
    updateTeacher: build.mutation<{ success: boolean }, TeacherUpdatePayload>({
      query(body) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/teacher/${body.id}`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteTeacher: build.mutation<{ success: boolean }, string>({
      query(id) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/teacher/${id}`,
          method: "DELETE",
        };
      }
    }),
  }),
});

export const {
  useGetListTeacherQuery,
  useGetTeacherByIdQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} = teacherApi;