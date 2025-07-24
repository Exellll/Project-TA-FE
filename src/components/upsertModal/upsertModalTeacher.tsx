import { useGetListSubjectQuery, useGetSubjectByIdQuery } from "_services/modules/subject";
import CInput from "components/input";
import ValidationError from "components/validation/error";
import { DayList, GenderList } from "data/options";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-daisyui";
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Radio } from "@material-tailwind/react";
import useEkskulForm from "hooks/ekskul/useEkskulForm";
import { useGetEkskulByIdQuery } from "_services/modules/ekskul";
import { useGetTeacherByIdQuery } from "_services/modules/teacher";
import useTeacherForm from "hooks/teacher/useTeacherForm";

interface props {
    id?: string;
    isOpen: boolean;
    type: "create" | "update";
    handler: () => void;
}
export default function TeacherModal({
    isOpen,
    type,
    handler,
    id,
}: props): React.ReactElement {
    const { data: teacherById, refetch } = useGetTeacherByIdQuery(id!);

    const { data: subjectList } = useGetListSubjectQuery({
        page: 1,
        limit: 100,
        search: "",
    });


    useEffect(() => {
        if (teacherById) {
            reset({
                name: teacherById?.name,
                nip: teacherById?.nip,
                email: teacherById?.email,
                no_telepon: teacherById?.no_telepon,
                address: teacherById?.address,
                gender: teacherById?.gender,
                birth_date: teacherById?.birth_date,
                foto_url: teacherById?.foto_url,
                status: teacherById?.status ? "active" : "inactive",
                subject_ids: teacherById.subjects?.map((s) => s.id) || [],
            });
        }
    }, [teacherById]);

    const {
        register,
        handleCreate,
        handleUpdate,
        reset,
        isLoading,
        isLoadingUpdate,
        control,
        errors,
        setValue,
    } = useTeacherForm(
        {
            search: "",
            limit: 20,
            page: 1,
        },
        handler,
        id
    );

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    return (
        <Modal
            open={isOpen}
            backdrop={false}
            className="flex flex-col bg-white lg:min-w-[900px]"
        >
            <form onSubmit={type === "create" ? handleCreate : async (e?: React.BaseSyntheticEvent) => { await handleUpdate(e), refetch(); }}>
                <Modal.Body className="flex flex-col justify-start items-start">
                    <p className="text-xl font-semibold text-start">
                        {type === "create" ? "Form Create" : "Form Edit"} Guru
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
                        <label className="font-base">NIP</label>
                        <CInput
                            {...register("nip")}
                            error={errors.nip}
                            type="text"
                            className="w-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full pt-4">
                        <label className="font-base">Email</label>
                        <CInput
                            {...register("email")}
                            error={errors.email}
                            type="email"
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
                        <label className="font-base">Jenis Kelamin</label>
                        <Controller
                            control={control}
                            name="gender"
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
                                    options={GenderList}
                                    value={GenderList.find((item) => item.value === value)}
                                    onChange={(e) => onChange(e?.value)}
                                />
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full pt-4">
                        <label className="font-base">Tanggal Lahir</label>
                        <CInput
                            {...register("birth_date")}
                            error={errors.birth_date}
                            type="date"
                            className="w-full"
                        />
                        {/* <ValidationError error={errors.start_time} /> */}
                    </div>
                    <div className="flex flex-col gap-2 w-full pt-4">
                        <label className="font-base">Mata Pelajaran</label>
                        <Controller
                            control={control}
                            name="subject_ids"
                            render={({ field: { onChange, value } }) => (
                                <ReactSelect
                                    isMulti
                                    options={subjectList?.subjects.map((item) => ({
                                        value: item.id,
                                        label: item.title,
                                    }))}
                                    value={
                                        value?.map((val: string) => {
                                            const found = subjectList?.subjects.find((s) => s.id === val);
                                            return found ? { value: found.id, label: found.title } : null;
                                        }) || []
                                    }
                                    onChange={(selected) =>
                                        onChange(selected.map((option) => option?.value))
                                    }
                                    styles={{
                                        control: (baseStyle) => ({
                                            ...baseStyle,
                                            padding: 5,
                                            borderColor: "#BDBDBD",
                                            borderRadius: "0.5rem",
                                        }),
                                    }}
                                />
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full pt-4">
                        <label className="font-base">Lampiran (Gambar/File)</label>
                        <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setSelectedFile(file);
                                    setValue("file", file);
                                }
                            }}
                        />
                        {teacherById?.foto_url && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">File Sebelumnya:</p>
                                {/\.(jpg|jpeg|png|gif|svg)$/i.test(teacherById.foto_url) ? (
                                    <img
                                        src={teacherById.foto_url}
                                        alt="Lampiran"
                                        className="w-32 h-32 object-cover rounded border"
                                    />
                                ) : (
                                    <a
                                        href={teacherById.foto_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        View Existing File
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 w-full pt-1">
                        <label className="font-base">Status</label>
                        <div className="form-control">
                            <Radio
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                                {...register("status")}
                                value={"active"}
                                crossOrigin={""}
                                label={"Active"}
                            />
                        </div>
                        <div className="form-control">
                            <Radio
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                                {...register("status")}
                                value={"inactive"}
                                crossOrigin={""}
                                label={"Inactive"}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Actions className="flex w-full justify-end items-center mt-16">
                    <Button
                        className="w-[30%] lg:w-[20%] rounded-xl hover:text-[#3A3B3C] bg-[#3A3B3C] text-white hover:bg-white/90 hover:border-[#3A3B3C]"
                        type="button"
                        onClick={() => {
                            handler();
                            reset({ name: "", nip: "", email: "", no_telepon: "", address: "", gender: "", birth_date: "", foto_url: "", status: "active" });
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
