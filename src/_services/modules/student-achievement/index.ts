import { Api } from "_services/api";
import {
  StudentAchievementResI,
  StudentAchievementReqI,
  StudentAchievementI,
  StudentAchievementPayloadI,
  StudentAchievementFormI,
} from "_interfaces/student-achievement.interface";

export const studentAchievementApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getStudentAchievement: build.query<
      StudentAchievementResI,
      StudentAchievementReqI
    >({
      query: (param) =>
        `http://localhost:3003/school/student-achievement?page=${param.page}&limit=${param.limit}`,
      keepUnusedDataFor: 0,
    }),
    getStudentAchievementById: build.query<
      StudentAchievementPayloadI[],
      string
    >({
      query: (id) => `http://localhost:3003/school/student-achievement/${id}`,
      keepUnusedDataFor: 0,
    }),
    createStudentAchievement: build.mutation<
      { success: boolean },
      StudentAchievementPayloadI
    >({
      query(body) {
        return {
          url: `http://localhost:3003/school/student-achievement`,
          method: "POST",
          body,
        };
      },
    }),
    updateStudentAchievement: build.mutation<
      { success: boolean },
      StudentAchievementI
    >({
      query(body) {
        return {
          url: `http://localhost:3003/school/student-achievement/${body.id}`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteStudentAchievement: build.mutation<{ success: boolean }, string>({
      query(id) {
        return {
          url: `http://localhost:3003/school/student-achievement/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetStudentAchievementQuery,
  useGetStudentAchievementByIdQuery,
  useCreateStudentAchievementMutation,
  useUpdateStudentAchievementMutation,
  useDeleteStudentAchievementMutation,
} = studentAchievementApi;
