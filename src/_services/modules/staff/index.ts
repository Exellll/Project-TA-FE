import {
  CreateStaffReqI,
  CreateStaffResI,
  GetStaffByIdResI,
  GetStaffResI,
  ListStaffReqI,
  ListStaffResI,
  Staff,
  UpdateStaffReqI,
} from "_interfaces/staff.interfaces";
import { Api } from "_services/api";
import { error } from "console";

export const StaffApi = Api.injectEndpoints({
  endpoints: (build) => ({
    listStaff: build.query<ListStaffResI, ListStaffReqI>({
      keepUnusedDataFor: 0,
      query: (params) => {
        const page = Number(params.page);
        const limit = Number(params.limit);
        const search = params.search;
        return {
          url: `http://localhost:3001/school/staff`,
          params: { page, limit, search },
        };
      },
    }),
    getStaffById: build.query<Staff, { id: string }>({
      keepUnusedDataFor: 0,
      query(params) {
        const id = params.id;
        return {
          url: `http://localhost:3001/school/staff/${id}`,
        };
      },
    }),
    createStaff: build.mutation<CreateStaffResI, CreateStaffReqI>({
      query(body) {
        return {
          url: `http://localhost:3001/school/staff`,
          method: "POST",
          body,
        };
      },
    }),
    updatedStaff: build.mutation<{ success: boolean }, UpdateStaffReqI>({
      query(body) {
        return {
          url: `http://localhost:3001/school/staff/${body.id}`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteStaff: build.mutation<{ success: boolean }, { id: string }>({
      query(body) {
        return {
          url: `http://localhost:3001/school/staff/${body.id}`,
          method: "DELETE",
        };
      },
    }),
  }),

  overrideExisting: false,
});

export const {
  useListStaffQuery,
  useGetStaffByIdQuery,
  useCreateStaffMutation,
  useUpdatedStaffMutation,
  useDeleteStaffMutation,
} = StaffApi;
