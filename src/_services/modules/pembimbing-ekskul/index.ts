import { Api } from "_services/api";
import { PembimbingEkskulRes, PembimbingEkskulReq, PembimbingI } from "_interfaces/pembimbing-ekskul.interfaces";

export const pembimbingEkskulApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getListPembimbingEkskul: build.query<PembimbingEkskulRes, PembimbingEkskulReq>({
      query: (param) =>
        `https://auth-ta.duckdns.org/school/school/pembimbing?page=${param.page}&limit=${param.limit}&search=${param.search}`,
      keepUnusedDataFor: 0,
    }),
    getPembimbingEkskulById: build.query<PembimbingI, string>({
      query: (id) => `https://auth-ta.duckdns.org/school/school/pembimbing/${id}`,
      keepUnusedDataFor: 0,
    }),
    createPembimbingEkskul: build.mutation<{ success: boolean }, PembimbingI>({
      query(body) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/pembimbing`,
          method: "POST",
          body,
        };
      },
    }),
    updatePembimbingEkskul: build.mutation<{ success: boolean }, PembimbingI>({
      query(body) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/pembimbing/${body.id}`,
          method: "PUT",
          body,
        };
      },
    }),
    deletePembimbingEkskul: build.mutation<{ success: boolean }, string>({
      query(id) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/pembimbing/${id}`,
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