import {
  LoginReqI,
  LoginResI,
  RegisterReqI,
} from "_interfaces/auth-api.interfaces";
import { User } from "_interfaces/user.interface";
import { Api } from "_services/api";

export const userApi = Api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResI, LoginReqI>({
      query(body) {
        const userAgent = navigator.userAgent;
        let browserName = "Internet Explorer";
        if (userAgent.includes("Firefox")) {
          browserName = "Mozilla Firefox";
        } else if (userAgent.includes("Chrome")) {
          browserName = "Google Chrome";
        } else if (userAgent.includes("Safari")) {
          browserName = "Apple Safari";
        } else if (userAgent.includes("Edge")) {
          browserName = "Microsoft Edge";
        } else if (userAgent.includes("Opera")) {
          browserName = "Opera";
        } else if (
          userAgent.includes("Trident") ||
          userAgent.includes("MSIE")
        ) {
          browserName = "Internet Explorer";
        }
        return {
          url: "http://localhost:3001/login",
          method: "POST",
          body,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    register: build.mutation<{ success: boolean }, RegisterReqI>({
      query(body) {
        return {
          url: `localhost/auth/user/register`,
          method: "POST",
          body,
        };
      },
    }),
    profile: build.query<{ data: User }, void>({
      query: () => "auth/user/profile",
      keepUnusedDataFor: 0,
    }),
    activeUser: build.query<
      { data: { data: User[] } },
      { page: number; limit: number; search: string }
    >({
      query: (params) => ({ url: "/auth/user/active-user", params }),
      keepUnusedDataFor: 0,
    }),
    requestResetPassword: build.mutation<
      { success: boolean },
      { email: string }
    >({
      query(body) {
        return {
          url: `/auth/user/request-reset-password`,
          method: "POST",
          body,
        };
      },
    }),
    resetPassword: build.mutation<
      { success: boolean },
      { password: string; token: string }
    >({
      query(body) {
        return {
          url: `/auth/user/reset-password`,
          method: "POST",
          body: {
            password: body.password,
          },
          headers: {
            Authorization: `Bearer ${body.token}`,
          },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRequestResetPasswordMutation,
  useResetPasswordMutation,
  useProfileQuery,
  useLazyActiveUserQuery,
} = userApi;
