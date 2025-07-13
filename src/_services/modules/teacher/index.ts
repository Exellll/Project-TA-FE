import { Api } from "_services/api";
import { TeacherCreatePayload, TeacherFormI, TeacherI, TeacherReqI, TeacherResI, TeacherUpdatePayload } from "_interfaces/teachers.interfaces";

export const teacherApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getListTeacher: build.query<TeacherResI, TeacherReqI>({
      query: (param) =>
        `http://128.199.217.100:4001/school/teacher?page=${param.page}&limit=${param.limit}&search=${param.search}`,
      keepUnusedDataFor: 0,
    }),
    getTeacherById: build.query<TeacherI, string>({
      query: (id) => `http://128.199.217.100:4001/school/teacher/${id}`,
      keepUnusedDataFor: 0,
    }),
    createTeacher: build.mutation<{ success: boolean }, TeacherCreatePayload>({
      query(body) {
        return {
          url: `http://128.199.217.100:4001/school/teacher`,
          method: "POST",
          body,
        };
      },
    }),
    updateTeacher: build.mutation<{ success: boolean }, TeacherUpdatePayload>({
      query(body) {
        return {
          url: `http://128.199.217.100:4001/school/teacher/${body.id}`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteTeacher: build.mutation<{ success: boolean }, string>({
      query(id) {
        return {
          url: `http://128.199.217.100:4001/school/teacher/${id}`,
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