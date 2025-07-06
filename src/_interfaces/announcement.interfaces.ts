import { Meta } from './shared.interfaces';

export interface AnnouncementResI {
  announcements: AnnouncementI[]
  meta: Meta
}

export interface AnnouncementReqI {
  search: string;
  limit: number;
  page: number;
}

export interface AnnouncementI {
  id: string
  title: string
  content: string
  type: string
  published_at: string
  attachment_url: string
  status: boolean
  createdAt: string
  updatedAt: string
  deletedAt: any
}

export interface AnnouncementFormsI {
  id: string
  title: string
  content: string
  type: string
  published_at: string
  attachment_url: string
  file?: File;
  status: "active" | "inactive"
}

export interface AnnouncementCreatePayload {
  title: string;
  content: string;
  type: string;
  attachment_url?: string;
  status: boolean;
}

export interface AnnouncementUpdatePayload {
  id: string;
  title: string;
  content: string;
  type: string;
  attachment_url?: string;
  status: boolean;
}