import { User } from "./user.interface";

export interface NotifyMeReq {
  subscriber_id: string;
  publisher_id: string;
}

export interface Notification {
  id: string;
  title: string;
  data: {
    content: string;
    post_id: string;
    event_id: string;
  };
  user_id: string;
  read: boolean;
  type: string;
  user: User;
  created_at: string;
}

export interface Meta {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface NotificationListRes {
  data: Notification[];
  meta: Meta;
}

export interface NotificationListReq {
  page: number;
  limit: number;
  search: string;
}
