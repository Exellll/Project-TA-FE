import { Api } from "_services/api";
import { ScheduleClassRes, ScheduleI, SchedulePayload, ScheduleStudentRes } from "_interfaces/schedule.interfaces";

export const scheduleApi = Api.injectEndpoints({
  endpoints: (build) => ({
    createSchedulesBulk: build.mutation<SchedulePayload[], {}>({
      query: (data) => ({
        url: "http://localhost:3003/schedule/bulk",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Schedule"],
    }),
    getSchedulesByClass: build.query<ScheduleClassRes, { class_id: string }>({
      query: ({ class_id }) => ({
        url: `http://localhost:3003/schedule/class/${class_id}`,
        method: "GET",
      }),
    }),
    getSchedulesByStudent: build.query<ScheduleStudentRes, { student_id: string }>({
      query: ({ student_id }) => ({
        url: `http://localhost:3003/schedule/student/${student_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateSchedulesBulkMutation, useGetSchedulesByClassQuery, useGetSchedulesByStudentQuery } =
  scheduleApi;
