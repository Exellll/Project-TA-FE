import { Api } from "_services/api";
import { EkskulI, EkskulReqI, EkskulResI } from "_interfaces/ekskul.interfaces";

export const ekskulApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getListEkskul: build.query<EkskulResI, EkskulReqI>({
      query: (param) =>
        `https://auth-ta.duckdns.org/school/school/ekskul?page=${param.page}&limit=${param.limit}&search=${param.search}`,
      keepUnusedDataFor: 0,
    }),
    getEkskulById: build.query<EkskulI, string>({
      query: (id) => `https://auth-ta.duckdns.org/school/school/ekskul/${id}`,
      keepUnusedDataFor: 0,
    }),
    createEkskul: build.mutation<{ success: boolean }, EkskulI>({
      query(body) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/ekskul`,
          method: "POST",
          body,
        };
      },
    }),
    updateEkskul: build.mutation<{ success: boolean }, EkskulI>({
      query(body) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/ekskul/${body.id}`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteEkskul: build.mutation<{ success: boolean }, string>({
      query(id) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/ekskul/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetListEkskulQuery,
  useGetEkskulByIdQuery,
  useCreateEkskulMutation,
  useUpdateEkskulMutation,
  useDeleteEkskulMutation,
} = ekskulApi;
