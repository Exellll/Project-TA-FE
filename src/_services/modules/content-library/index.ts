import { Api } from "_services/api";
import {
  ContentLibraryI,
  ContentLibraryResI,
  ContentLibraryReqI,
  ContentLibraryFormI,
  ContentLibraryPayloadI,
} from "_interfaces/content-library.interfaces";

export const contentLibraryApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getContentLibrary: build.query<ContentLibraryResI, ContentLibraryReqI>({
      query: (param) =>
        `/school/school/content-library?page=${param.page}&limit=${param.limit}`,
      keepUnusedDataFor: 0,
    }),
    getContentLibraryById: build.query<ContentLibraryI, string>({
      query: (id) => `/school/school/content-library/${id}`,
      keepUnusedDataFor: 0,
    }),
    getContentLibraryByParent: build.query<ContentLibraryI[], string>({
      query: (id) => `/school/school/content-library-parent/${id}`,
      keepUnusedDataFor: 0,
    }),
    createContentLibrary: build.mutation<
      { success: boolean },
      ContentLibraryPayloadI
    >({
      query(body) {
        return {
          url: `/school/school/content-library`,
          method: "POST",
          body,
        };
      },
    }),
    updateContentLibrary: build.mutation<
      { success: boolean },
      ContentLibraryFormI
    >({
      query(body) {
        return {
          url: `school/school/content-library/${body.id}`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteContentLibrary: build.mutation<{ success: boolean }, string>({
      query(id) {
        return {
          url: `/school/school/content-library/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetContentLibraryQuery,
  useGetContentLibraryByIdQuery,
  useGetContentLibraryByParentQuery,
  useCreateContentLibraryMutation,
  useUpdateContentLibraryMutation,
  useDeleteContentLibraryMutation,
} = contentLibraryApi;
