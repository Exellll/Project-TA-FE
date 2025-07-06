import {
  NotificationListReq,
  NotificationListRes,
  NotifyMeReq,
} from "_interfaces/notification.interface";
import { Api } from "_services/api";

export const notificationApi = Api.injectEndpoints({
  endpoints: (build) => ({
    Notification: build.query<NotificationListRes, NotificationListReq>({
      query: (params) => {
        return {
          url: `notification/member/notification`,
          params,
        };
      },
      keepUnusedDataFor: 0,
    }),
    NotificationCount: build.query<{ data: number }, void>({
      query: () => {
        return {
          url: `notification/member/notification-count`,
        };
      },
    }),
    ReadNotification: build.mutation<string, void>({
      query() {
        return {
          url: `notification/member/notification/read`,
          method: "POST",
        };
      },
    }),
    NotifyMe: build.mutation<string, NotifyMeReq>({
      query(body) {
        return {
          url: `notification/member/notifyMe`,
          method: "POST",
          body: {
            ...body,
          },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useNotificationQuery,
  useNotifyMeMutation,
  useReadNotificationMutation,
  useNotificationCountQuery,
} = notificationApi;
