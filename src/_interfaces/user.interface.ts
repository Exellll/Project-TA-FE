export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  banner: string;
  gender: "l" | "p";
  company_address: string;
  about: string;
  created_at: string;
  dob: string;
  score: number;
  pinnedPost: string;
  status: "approve" | "pending" | "rejected";
}

export interface Admin {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface ProfileRes {
  data: User;
  success: boolean;
}

export interface UpdateProfileReq {
  name: string;
  gender: "l" | "p";
  company_address: string;
  about: string;
  dob: string;
  avatar: string;
  banner: string;
}

export interface UpdateProfileInfoReq {
  name: string;
  gender: "l" | "p";
  company_address: string;
  about: string;
  dob: string;
}

export interface UpdateProfileForm {
  name: string;
  gender: "l" | "p";
  company_address: string;
  about: string;
  dob: string;
  avatar: FileType;
  banner: FileType;
}

export interface CreateBusinessInfoForm {
  business_name: string;
  business_sector: string;
  business_scale: string;
  company_address: string;
  business_logo: FileType;
  description: string;
}

export interface CreateBusinessInfoReq {
  business_name: string;
  business_sector: string;
  business_scale: string;
  company_address: string;
  business_logo: string;
  description: string;
}

export interface FileType {
  file?: FileList;
  link?: string;
}


export interface CreateBusinessInfoRes {
  id: string;
  user: User;
  business_name: string;
  business_sector: string;
  business_scale: string;
  company_address: string;
  business_logo: string;
  description: string;
}

export interface UpdateAvatarForm {
  avatar: FileType;
}

export interface UpdateAvatarReq {
  avatar: string;
}

export interface UpdateBannerForm {
  banner: FileType;
}

export interface UpdateBannerReq {
  banner: string;
}

export interface BusinessInfo {
  id: string;
  userId: string;
  business_name: string;
  business_sector: string;
  business_scale: string;
  company_address: string;
  business_logo: string;
  description: string;
}

export interface BusinessInfoRes {
  data: BusinessInfo[];
  success: boolean;
}

export interface CreatePortfolioReq {
  bussinesId: string;
  client: string;
  project: string;
  address: string;
  description: string;
  start_date: string;
  end_date?: string | null;
}

export interface Portfolio {
  id: string;
  bussinesId: string;
  client: string;
  project: string;
  address: string;
  description: string;
  start_date: string;
  end_date?: string | null;
  created_at: string;
  updated_at: string;
}

export interface PortfolioRes {
  data: Portfolio[];
  success: boolean;
}
