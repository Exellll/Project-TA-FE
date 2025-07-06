import {
  BusinessInfoRes,
  CreateBusinessInfoReq,
  CreateBusinessInfoRes,
  CreatePortfolioReq,
  PortfolioRes,
  ProfileRes,
  UpdateAvatarReq,
  UpdateBannerReq,
  UpdateProfileInfoReq,
  UpdateProfileReq,
} from "_interfaces/user.interface";
import { Api } from "_services/api";

export const profileApi = Api.injectEndpoints({
  endpoints: (build) => ({
    GetProfile: build.query<ProfileRes, void>({
      query: () => {
        return {
          url: `auth/user/profile`,
        };
      },
      keepUnusedDataFor: 0,
    }),
    UpdateProfile: build.mutation<
      string,
      { id: string; body: UpdateProfileInfoReq }
    >({
      query({ id, body }) {
        return {
          url: `auth/user/profile`,
          method: "PUT",
          body,
        };
      },
    }),
    GetBusinessInfo: build.query<BusinessInfoRes, void>({
      query: () => {
        return {
          url: `auth/user/business-info`,
        };
      },
      keepUnusedDataFor: 0,
    }),
    CreateBusinessInfo: build.mutation<
      CreateBusinessInfoRes,
      CreateBusinessInfoReq
    >({
      query(body) {
        return {
          url: `auth/user/business-info`,
          method: "POST",
          body: {
            ...body,
          },
        };
      },
    }),
    UpdateBusinessInfo: build.mutation<
      string,
      { id: string; body: CreateBusinessInfoReq }
    >({
      query({ id, body }) {
        return {
          url: `auth/user/business-info/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
    DeleteBusinessInfo: build.mutation<string, { id: string }>({
      query(body) {
        return {
          url: `auth/user/business-info/${body.id}`,
          method: "DELETE",
        };
      },
    }),
    UpdateAvatarProfile: build.mutation<string, UpdateAvatarReq>({
      query(body) {
        return {
          url: `auth/user/profile-picture`,
          method: "PUT",
          body: {
            ...body,
          },
        };
      },
    }),
    UpdateBannerProfile: build.mutation<string, UpdateBannerReq>({
      query(body) {
        return {
          url: `auth/user/profile-banner`,
          method: "PUT",
          body: {
            ...body,
          },
        };
      },
    }),
    GetPortfolio: build.query<PortfolioRes, void>({
      query: () => {
        return {
          url: `auth/user/portfolio`,
        };
      },
      keepUnusedDataFor: 0,
    }),
    CreatePortfolio: build.mutation<string, CreatePortfolioReq>({
      query(body) {
        return {
          url: `auth/user/portfolio`,
          method: "POST",
          body: {
            ...body,
          },
        };
      },
    }),
    GetOtherProfile: build.query<ProfileRes, { id: string }>({
      query({ id }) {
        return {
          url: `auth/user/other-profile/${id}`,
        };
      },
      keepUnusedDataFor: 0,
    }),
    DeletePortfolio: build.mutation<string, { id: string }>({
      query(body) {
        return {
          url: `auth/user/portfolio/${body.id}`,
          method: "DELETE",
        };
      },
    }),
    GetOtherBusinessInfo: build.query<BusinessInfoRes, { id: string }>({
      query({ id }) {
        return {
          url: `auth/user/business-info/${id}`,
        };
      },
      keepUnusedDataFor: 0,
    }),
    UpdatePortfolio: build.mutation<
      string,
      { id: string; body: CreatePortfolioReq }
    >({
      query({ id, body }) {
        return {
          url: `auth/user/edit-portfolio/${id}`,
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
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetBusinessInfoQuery,
  useCreateBusinessInfoMutation,
  useUpdateBusinessInfoMutation,
  useDeleteBusinessInfoMutation,
  useUpdateAvatarProfileMutation,
  useUpdateBannerProfileMutation,
  useCreatePortfolioMutation,
  useGetPortfolioQuery,
  useGetOtherProfileQuery,
  useDeletePortfolioMutation,
  useGetOtherBusinessInfoQuery,
  useUpdatePortfolioMutation,
} = profileApi;
