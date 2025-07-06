import { Api } from "_services/api";
import {
  ParentsI,
  ParentsReqI,
  ParentsResI,
} from "_interfaces/parent.interface";

export const parentsApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getListParents: build.query<ParentsResI, ParentsReqI>({
      query: (param) =>
        `http://localhost:3003/school/parent?page=${param.page}&limit=${param.limit}`,
      keepUnusedDataFor: 0,
    }),
    getParentById: build.query<ParentsI, string>({
      query: (id) => `http://localhost:3003/school/parents/${id}`,
      keepUnusedDataFor: 0,
    }),
    createParent: build.mutation<{ student_id: string }, ParentsI>({
      query(body) {
        return {
          url: `http://localhost:3003/school/parents`,
          method: "POST",
          body,
        };
      },
    }),
    updateParent: build.mutation<{ success: boolean }, ParentsI>({
      query(body) {
        return {
          url: `http://localhost:3003/school/parents/${body.id}`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteParent: build.mutation<{ success: boolean }, string>({
      query(id) {
        return {
          url: `http://localhost:3003/school/parents/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetListParentsQuery,
  useGetParentByIdQuery,
  useCreateParentMutation,
  useUpdateParentMutation,
  useDeleteParentMutation,
} = parentsApi;
