import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LeaveRequestI } from "_interfaces/leave-requests.interface";
import { useGetEffectiveDaySettingsQuery, useUpdateEffectiveDaySettingsMutation } from "_services/modules/effective-day-settings";
import { EdsI, PayloadEdsI } from "_interfaces/effective-day-settings.interface";
import { errorHandler } from "_services/errorHandler";

const useEffectiveDaySettings = (id: string) => {

    const { data, isLoading, refetch } = useGetEffectiveDaySettingsQuery();
    const [update] = useUpdateEffectiveDaySettingsMutation();

    const schema = yup
        .object({
            effectiveDay: yup.array().of(yup.string()).required(),
            effectiveHour: yup.string().required(),
        }).required();

    const {
        handleSubmit,
        formState: { errors },
        register,
        watch,
        reset,
        control,
    } = useForm<EdsI>({
        mode: "onSubmit",
        resolver: yupResolver(schema),
        defaultValues: {
            id,
            effectiveDay: data?.effectiveDay || [],
            effectiveHour: data?.effectiveHour || "",
        },
    });

    const UpdateEds = async (data: PayloadEdsI) => {
        try {
            const res = await update({ ...data }).unwrap();
            if (res) {
                refetch();
            }
        } catch (error) {
            errorHandler(error);
        }
    };

    return { UpdateEds, register, errors, watch, reset, control, data, isLoading };
};

export default useEffectiveDaySettings;


