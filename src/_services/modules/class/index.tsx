import {
  AddHomeroomReqI,
  AddStudentReqI,
  AddSubjectReqI,
  Class,
  CreateClassReqI,
  CreateClassResI,
  ListClassReqI,
  ListClassResI,
} from "_interfaces/class.interface";
import { Api } from "_services/api";

export const ClassApi = Api.injectEndpoints({
  endpoints: (build) => ({
    listClass: build.query<ListClassResI, ListClassReqI>({
      keepUnusedDataFor: 0,
      query: (params) => {
        const page = Number(params.page);
        const limit = Number(params.limit);
        const search = params.search;
        return {
          url: `https://auth-ta.duckdns.org/school/school/classes`,
          params: { page, limit, search },
        };
      }, //
    }),
    getClassById: build.query<Class, { id: string }>({
      keepUnusedDataFor: 0,
      query(params) {
        const id = params.id;
        return {
          url: `https://auth-ta.duckdns.org/school/school/classes/${id}`,
        };
      },
    }),
    createClass: build.mutation<CreateClassResI, CreateClassReqI>({
      query(body) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/classes`,
          method: "POST",
          body,
        };
      },
    }),
    updatedClass: build.mutation<{ success: boolean }, CreateClassReqI>({
      query(body) {
        const id = body.id;
        return {
          url: `https://auth-ta.duckdns.org/school/school/classes/${id}`,
          method: "PATCH",
          body,
        };
      },
    }),
    deleteClass: build.mutation<{ success: boolean }, { id: string }>({
      query(body) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/classes/${body.id}`,
          method: "DELETE",
        };
      },
    }),
    addHomeroom: build.mutation<{ success: boolean }, AddHomeroomReqI>({
      query(body) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/classes/${body.classId}/homeroom`,
          body: body,
          method: "PUT",
        };
      },
    }),
    deleteHomeroom: build.mutation<{ success: boolean }, { id: string }>({
      query(body) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/classes/${body.id}/homeroom`,
          method: "DELETE",
        };
      },
    }),
    addSubject: build.mutation<{ success: boolean }, AddSubjectReqI>({
      query(body) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/classes/${body.classId}`,
          method: "POST",
        };
      },
    }),
    deleteSubject: build.mutation<{ success: boolean }, { id: string }>({
      query(body) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/classes/${body.id}`,
          method: "DELETE",
        };
      },
    }),
    addStudent: build.mutation<{ success: boolean }, AddStudentReqI>({
      query(body) {
        return {
          url: `http://localhost:3003/school/classes/${body.classId}`,
          method: "POST",
        };
      },
    }),
    deleteStudent: build.mutation<{ success: boolean }, { id: string }>({
      query(body) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/classes/${body.id}`,
          method: "DELETE",
        };
      },
    }),
  }),

  overrideExisting: false,
});

export const {
  useListClassQuery,
  useGetClassByIdQuery,
  useCreateClassMutation,
  useUpdatedClassMutation,
  useDeleteClassMutation,
  useAddHomeroomMutation,
  useDeleteHomeroomMutation,
  useAddStudentMutation,
  useAddSubjectMutation,
  useDeleteStudentMutation,
  useDeleteSubjectMutation,
} = ClassApi;
