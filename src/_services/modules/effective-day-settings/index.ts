import { Api } from "_services/api";
import { EdsI, PayloadEdsI } from "_interfaces/effective-day-settings.interface";
import { get } from "cookies";
import Condition from "yup/lib/Condition";

export const LeaveRequestApi = Api.injectEndpoints({
    endpoints: (build) => ({
        getEffectiveDaySettings: build.query<EdsI, void>({
            query: () => `http://localhost:3004/attendance/school/effective-day-settings`,
            keepUnusedDataFor: 0,
        }),
        updateEffectiveDaySettings: build.mutation<{id: string}, PayloadEdsI>({
            query: (body) => ({
                url: `http://localhost:3004/attendance/school/effective-day-settings/${body.id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
});

export const { useGetEffectiveDaySettingsQuery, useUpdateEffectiveDaySettingsMutation } = LeaveRequestApi;