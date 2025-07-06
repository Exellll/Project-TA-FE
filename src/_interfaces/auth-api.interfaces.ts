import { User } from "./user.interface";

export interface LoginReqI {
  email: string;
  password: string;
}

export interface ResetPasswordForm {
  email: string;
  password: string;
  newPassword: string;
}

export interface RegisterReqI {
  email: string;
  password: string;
  name: string;
  gender: "p" | "l";
  company_address: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  newPassword: string;
  name: string;
  gender: "p" | "l";
  birthdate: string;
  business_name: string;
  business_scale: string;
  business_sector: string;
  company_address: string;
}
export interface LoginResI {
  data: {
    user: User;
    token: string;
  };
  success: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBranchReqI {
  email: string;
  name: string;
  operatingAreaId: string;
}

export interface BranchI {
  id: string;
  email: string;
  operatingAreaId: string;
  name: string;
  isOnline: boolean;
}

export interface OperatingAreaI {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
