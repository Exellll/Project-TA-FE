import { Api } from '_services/api';
import { AnnouncementCreatePayload, AnnouncementI, AnnouncementReqI, AnnouncementResI, AnnouncementUpdatePayload } from '_interfaces/announcement.interfaces';

export const announcementApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getListAnnouncement: build.query<AnnouncementResI, AnnouncementReqI>({
      query: (param) =>
        `https://auth-ta.duckdns.org/school/school/announcement?page=${param.page}&limit=${param.limit}&search=${param.search}`,
      keepUnusedDataFor: 0,
    }),
    getAnnouncementById: build.query<AnnouncementI, string>({
      query: (id) => `https://auth-ta.duckdns.org/school/school/announcement/${id}`,
      keepUnusedDataFor: 0,
    }),
    createAnnouncement: build.mutation<{ success: boolean }, AnnouncementCreatePayload>({
      query(body) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/announcement`,
          method: 'POST',
          body,
        };
      },
    }),
    updateAnnouncement: build.mutation<{ success: boolean }, AnnouncementUpdatePayload>({
      query(body) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/announcement/${body.id}`,
          method: 'PUT',
          body,
        };
      },
    }),
    deleteAnnouncement: build.mutation<{ success: boolean }, string>({
      query(id) {
        return {
          url: `https://auth-ta.duckdns.org/school/school/announcement/${id}`,
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