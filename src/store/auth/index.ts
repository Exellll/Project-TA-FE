import { LoginResI } from "_interfaces/auth-api.interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "_interfaces/user.interface";

export interface ProfileI {
  id: string;
  email: string;
  username: string;
  qatarID: string;
  createdAt?: Date;
  verifiedAt?: Date;
  updatedAt?: Date;
}

export interface AuthStateI {
  loading: boolean;
  accessToken?: string;
  expiresAt?: number;
  error?: string;
  success: boolean;
  user?: User;
}

const token = localStorage.getItem("access_token");
const user = localStorage.getItem("user");

const initialState: AuthStateI = {
  loading: false,
  accessToken: token || undefined,
  user: user ? JSON.parse(user) : undefined,
  expiresAt: undefined,
  error: undefined,
  success: false,
};

type LoginInfoPayload = {
  payload: LoginResI;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveTokenAuth: (state: AuthStateI, { payload }: LoginInfoPayload) => {
      state.accessToken = payload.data.token;
      state.user = payload.data.user;
      localStorage.setItem("access_token", payload.data.token);
      localStorage.setItem("user", JSON.stringify(payload.data.user));
    },
    deleteTokenAuth: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
    },
  },
});

export const { saveTokenAuth, deleteTokenAuth } = authSlice.actions;

export default authSlice.reducer;
