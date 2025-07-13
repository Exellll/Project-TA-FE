import { Api } from "_services/api";
import { PembimbingEkskulRes, PembimbingEkskulReq, PembimbingI } from "_interfaces/pembimbing-ekskul.interfaces";

export const pembimbingEkskulApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getListPembimbingEkskul: build.query<PembimbingEkskulRes, PembimbingEkskulReq>({
      query: (param) =>
        `http://128.199.217.100:4001/school/pembimbing?page=${param.page}&limit=${param.limit}&search=${param.search}`,
      keepUnusedDataFor: 0,
    }),
    getPembimbingEkskulById: build.query<PembimbingI, string>({
      query: (id) => `http://128.199.217.100:4001/school/pembimbing/${id}`,
      keepUnusedDataFor: 0,
    }),
    createPembimbingEkskul: build.mutation<{ success: boolean }, PembimbingI>({
      query(body) {
        return {
          url: `http://128.199.217.100:4001/school/pembimbing`,
          method: "POST",
          body,
        };
      },
    }),
    updatePembimbingEkskul: build.mutation<{ success: boolean }, PembimbingI>({
      query(body) {
        return {
          url: `http://128.199.217.100:4001/school/pembimbing/${body.id}`,
          method: "PUT",
          body,
        };
      },
    }),
    deletePembimbingEkskul: build.mutation<{ success: boolean }, string>({
      query(id) {
        return {
          url: `http://128.199.217.100:4001/school/pembimbing/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetListPembimbingEkskulQuery,
  useGetPembimbingEkskulByIdQuery,
  useCreatePembimbingEkskulMutation,
  useUpdatePembimbingEkskulMutation,
  useDeletePembimbingEkskulMutation,
} = pembimbingEkskulApi;