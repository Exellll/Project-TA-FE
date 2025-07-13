import { Api } from '_services/api';
import { AnnouncementCreatePayload, AnnouncementI, AnnouncementReqI, AnnouncementResI, AnnouncementUpdatePayload } from '_interfaces/announcement.interfaces';

export const announcementApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getListAnnouncement: build.query<AnnouncementResI, AnnouncementReqI>({
      query: (param) =>
        `http://128.199.217.100:4001/school/announcement?page=${param.page}&limit=${param.limit}&search=${param.search}`,
      keepUnusedDataFor: 0,
    }),
    getAnnouncementById: build.query<AnnouncementI, string>({
      query: (id) => `http://128.199.217.100:4001/school/announcement/${id}`,
      keepUnusedDataFor: 0,
    }),
    createAnnouncement: build.mutation<{ success: boolean }, AnnouncementCreatePayload>({
      query(body) {
        return {
          url: `http://128.199.217.100:4001/school/announcement`,
          method: 'POST',
          body,
        };
      },
    }),
    updateAnnouncement: build.mutation<{ success: boolean }, AnnouncementUpdatePayload>({
      query(body) {
        return {
          url: `http://128.199.217.100:4001/school/announcement/${body.id}`,
          method: 'PUT',
          body,
        };
      },
    }),
    deleteAnnouncement: build.mutation<{ success: boolean }, string>({
      query(id) {
        return {
          url: `http://128.199.217.100:4001/school/announcement/${id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useGetListAnnouncementQuery,
  useGetAnnouncementByIdQuery,
  useCreateAnnouncementMutation,
  useUpdateAnnouncementMutation,
  useDeleteAnnouncementMutation,
} = announcementApi;