import CInput from "components/input";
import { DayList } from "data/options";
import { useEffect } from "react";
import { Button, Modal } from "react-daisyui";
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Radio } from "@material-tailwind/react";
import { useGetPembimbingEkskulByIdQuery } from "_services/modules/pembimbing-ekskul";
import usePembimbingEkskulForm from "hooks/pembimbing-ekskul/usePembimbingEkskulForm";
import useEkskulForm from "hooks/ekskul/useEkskulForm";

interface props {
    id?: string;
    isOpen: boolean;
    type: "create" | "update";
    handler: () => void;
}
export default function PembimbingEkskulModal({
    isOpen,
    type,
    handler,
    id,
}: props): React.ReactElement {
    const { data: pembimbingById, refetch } = useGetPembimbingEkskulByIdQuery(id!);
    const { ekskul, isLoading: isEkskulLoading } = useEkskulForm({
        search: "",
        limit: 20,
        page: 1,
    });

    useEffect(() => {
        if (pembimbingById && ekskul?.ekskul) {
            reset({
                name: pembimbingById?.name,
                no_telepon: pembimbingById?.no_telepon,
                address: pembimbingById?.address,
                ekskul_id: pembimbingById?.ekskul?.id || "",
            });
        }

    }, [pembimbingById, ekskul]);

    const {
        register,
        handleCreate,
        handleUpdate,
        reset,
        isLoading,
        isLoadingUpdate,
        control,
        errors,
    } = usePembimbingEkskulForm(
        {
            search: "",
            limit: 20,
            page: 1,
        },
        handler,
        id
    );

    return (
        <Modal
            open={isOpen}
            backdrop={false}
            className="flex flex-col bg-white lg:min-w-[900px]"
        >
            <form onSubmit={type === "create" ? handleCreate : async (e?: React.BaseSyntheticEvent) => {await handleUpdate(e); refetch();}}>
                <Modal.Body className="flex flex-col justify-start items-start">
                    <p className="text-xl font-semibold text-start">
                        {type === "create" ? "Form Create" : "Edit"} Pembimbing Ekskul
                    </p>
                    <div className="flex flex-col gap-2 w-full pt-4">
                        <label className="font-base">Nama</label>
                        <CInput
                            {...register("name")}
                            error={errors.name}
                            type="text"
                            className="w-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full pt-4">
                        <label className="font-base">No Telepon</label>
                        <CInput
                            {...register("no_telepon")}
                            error={errors.no_telepon}
                            type="text"
                            className="w-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full pt-4">
                        <label className="font-base">Alamat</label>
                        <CInput
                            {...register("address")}
                            error={errors.address}
                            type="text"
                            className="w-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full pt-1">
                        <label className="font-base">Ekskul</label>
                        <Controller
                            control={control}
                            name="ekskul_id"
                            render={({
                                field: { value, onChange },
                            }: {
                                field: { value: string; onChange: (value: any) => void };
                            }) => (
                                <ReactSelect
                                    styles={{
                                        control: (baseStyle) => ({
                                            ...baseStyle,
                                            padding: 5,
                                            borderColor: "#BDBDBD",
                                            borderRadius: "0.5rem",
                                        }),
                                    }}
                                    isLoading={isEkskulLoading}
                                    options={(ekskul?.ekskul || []).filter((item) => item.status).map((ekskul) => ({
                                        label: ekskul.name,
                                        value: ekskul.id,
                                    }))}
                                    value={(ekskul?.ekskul || [])
                                        .filter((item) => item.status)
                                        .map((ekskul) => ({
                                            label: ekskul.name,
                                            value: ekskul.id,
                                        }))
                                        .find((opt) => opt.value === value)}
                                    key={value}
                                    onChange={(e) => onChange(e?.value)}
                                />
                            )}
                        />
                    </div>
                </Modal.Body>
                <Modal.Actions className="flex w-full justify-end items-center mt-16">
                    <Button
                        className="w-[30%] lg:w-[20%] rounded-xl hover:text-[#3A3B3C] bg-[#3A3B3C] text-white hover:bg-white/90 hover:border-[#3A3B3C]"
                        type="button"
                        onClick={() => {
                            handler();
                            reset({ name: "", no_telepon: "", address: "", ekskul_id: "" });
                        }}
                    >
                        Keluar
                    </Button>
                    <Button
                        type="submit"
                        className="w-[30%] lg:w-[20%] rounded-xl hover:text-blue-ribbon bg-blue-ribbon text-white hover:bg-white/90 hover:border-blue-ribbon"
                        loading={isLoading || isLoadingUpdate}
                    >
                        Simpan
                    </Button>
                </Modal.Actions>
            </form>
        </Modal>
    );
}
