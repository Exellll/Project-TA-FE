import { Api } from "_services/api";
import { PresencesI, PresencesResI, PresencesReqI } from "_interfaces/presences.interface";

export const LeaveRequestApi = Api.injectEndpoints({
    endpoints: (build) => ({
        getPresencesToday: build.query<PresencesResI, PresencesReqI>({
            query: (param) => `http://localhost:3004/attendance/school/presences/today?page=${param.page}&limit=${param.limit}`,
            keepUnusedDataFor: 0,
        }),
    }),
});

export const {
    useGetPresencesTodayQuery,
} = LeaveRequestApi;