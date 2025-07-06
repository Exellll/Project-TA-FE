import { Api } from "_services/api";
import { EkskulI, EkskulReqI, EkskulResI } from "_interfaces/ekskul.interfaces";

export const ekskulApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getListEkskul: build.query<EkskulResI, EkskulReqI>({
      query: (param) =>
        `http://localhost:3003/school/ekskul?page=${param.page}&limit=${param.limit}&search=${param.search}`,
      keepUnusedDataFor: 0,
    }),
    getEkskulById: build.query<EkskulI, string>({
      query: (id) => `http://localhost:3003/school/ekskul/${id}`,
      keepUnusedDataFor: 0,
    }),
    createEkskul: build.mutation<{ success: boolean }, EkskulI>({
      query(body) {
        return {
          url: `http://localhost:3003/school/ekskul`,
          method: "POST",
          body,
        };
      },
    }),
    updateEkskul: build.mutation<{ success: boolean }, EkskulI>({
      query(body) {
        return {
          url: `http://localhost:3003/school/ekskul/${body.id}`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteEkskul: build.mutation<{ success: boolean }, string>({
      query(id) {
        return {
          url: `http://localhost:3003/school/ekskul/${id}`,
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
