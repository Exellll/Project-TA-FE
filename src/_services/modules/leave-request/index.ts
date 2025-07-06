import { Api } from "_services/api";

import {
  LeaveRequestI,
  LeaveRequestsReqI,
  LeaveRequestsResI,
} from "_interfaces/leave-requests.interface";

export const LeaveRequestApi = Api.injectEndpoints({
    endpoints: (build) => ({
        getPendingLeaveRequest: build.query<LeaveRequestsResI, LeaveRequestsReqI>({
            query: (param) => `http://localhost:3004/attendance/school/leave-requests?page=${param.page}&limit=${param.limit}`,
            keepUnusedDataFor: 0,
        }),
        rejectLeaveRequest: build.mutation<void, { id: string }>({
            query: (body) => ({
                url: `http://localhost:3004/attendance/school/leave-requests/${body.id}/reject`,
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useGetPendingLeaveRequestQuery,
    useRejectLeaveRequestMutation,
} = LeaveRequestApi;