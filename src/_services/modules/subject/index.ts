import { Api } from "_services/api";
import {
  SubjectReqI,
  SubjectResI,
  SubjectsI,
  SubjectReqID,
  SubjectsFormsI,
} from "_interfaces/subject.interfaces";
import { StaffSubjectI, SubjectI } from "_interfaces/class-subject.interface";

export const subjectApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getListSubject: build.query<SubjectResI, SubjectReqI>({
      query: (param) =>
        `https://auth-ta.duckdns.org/school/school/subject?page=${param.page}&limit=${param.limit}`,
      keepUnusedDataFor: 0,
    }),
    getListSubjectSocket: build.query<SubjectI[], {}>({
      query: (param) =>
        `https://auth-ta.duckdns.org/school/school/subject-socket`,
      keepUnusedDataFor: 0,
    }),
    getListStaffSubject: build.query<StaffSubjectI[], {}>({
      query: (param) => `https://auth-ta.duckdns.org/school/school/staff_subject`,
      keepUnusedDataFor: 0,
    }),
    getSubjectById: build.query<SubjectsI, string>({
      query: (id) => `https://auth-ta.duckdns.org/school/school/subject/${id}`,
      keepUnusedDataFor: 0,
    }),
    createSubject: build.mutation<{ success: boolean }, SubjectsI>({
      query(body) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/subject`,
          method: "POST",
          body,
        };
      },
    }),
    updateSubject: build.mutation<{ success: boolean }, SubjectsI>({
      query(body) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/subject/${body.id}`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteSubject: build.mutation<{ success: boolean }, string>({
      query(id) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/subject/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetListSubjectQuery,
  useGetSubjectByIdQuery,
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
  useGetListStaffSubjectQuery,
  useGetListSubjectSocketQuery
} = subjectApi;
