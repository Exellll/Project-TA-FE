import { Meta } from "./shared.interfaces";

export interface ContentLibraryResI {
  contentLibrary: ContentLibraryI[];
  meta: Meta;
}

export interface ContentLibraryReqI {
  search: string;
  limit: number;
  page: number;
}

export interface ContentLibraryI {
    id: string
    name: string
    file_url: string
    type: string
    parent: string
    owner: string
    createdAt: string
    updatedAt: string
    deletedAt: any
}

export interface ContentLibraryFormI {
    id?: string
    name: string
    file_url?: File
    type: string
    parent?: string
    owner: string
}

export interface ContentLibraryPayloadI {
    name: string
    file_url?: string
    type: string
    parent?: string
    owner: string
}