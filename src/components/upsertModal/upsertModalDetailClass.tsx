import { Button, Modal } from "react-daisyui";
import { Radio } from "@material-tailwind/react";
import CDropdown from "components/input/CDropDown";
import { OptionConverter } from "_helper/optionConverter";
import React, { useEffect } from "react";
import CDropDown from "components/input/CDropDown";
import useDetailClass from "hooks/class/useDetailClass";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddHomeroomMutation } from "_services/modules/class";
import { AddHomeroomReqI } from "_interfaces/class.interface";
import { education_level } from "data/dummy/Staff";
import { Staff } from "_interfaces/staff.interfaces";
import { useListStaffQuery } from "_services/modules/staff";
import { toast } from "react-toastify";

interface Props {
    id?: string;
    isOpen: boolean;
    type: "create" | "update";
    handler: () => void;
    staff?: Staff;
    refetch: () => void;
}
export default function DetailClassModal({
    isOpen,
    type,
    handler,
    id,
    refetch,
}: Props): React.ReactElement {
    const [addHomeRoom, { isLoading: addHomeRoomLoading }] = useAddHomeroomMutation();
    const { data: dataStaff } = useListStaffQuery(
        {
            search: "",
            limit: 10,
            page: 1
        }
    );
    // Schema validasi untuk form
    const schema = yup.object().shape({
        staffId: yup.string().required("kelas wajib diisi"),
    }).required();
    // Mengambil data dan handler dari hook useClassManagement
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        setValue,
        getValues
    } = useForm<AddHomeroomReqI>(
        { resolver: yupResolver(schema) },
    );

    const handleAddHomeRoom = async () => {
        try {
            const staffId = getValues("staffId");
            if (id && staffId) {
                const response = await addHomeRoom({ classId: id, staffId: staffId }).unwrap();
                toast.success('Berhasil Menambahkan wali kelas');
                await refetch();
            } else {
                toast.error('Staff ID not found');
            }
        } catch (e) {
            toast.error('Gagal Menambahkan wali kelas');
            console.error(e);
        } finally {
            handler();
            reset({
                staffId: "",
            });
        }
    }

    const handleCreate = handleSubmit(handleAddHomeRoom);

    return (
        <Modal
            open={isOpen}
            backdrop={false}
            className="flex flex-col bg-white lg:min-w-[700px]"
        >
            <form onSubmit={handleCreate}>
                <Modal.Body className="flex flex-col justify-start items-start">
                    <p className="text-xl font-semibold text-start">
                        {type === "create" ? "Form Create" : "Edit"} Mata Pelajaran
                    </p>
                    <div className="flex flex-col gap-2 w-full pt-4">
                        <CDropdown
                            label="Pendidikan Terakhir"
                            name="staffId"
                            options={OptionConverter({ data: dataStaff?.data ?? [], labelName: "name", valueName: "id" })}
                            placeholder="Pilih salah satu..."
                            defaultValue=""
                            control={control}
                            saveValueAsLabel={false}
                        />
                    </div>
                </Modal.Body>
                <Modal.Actions className="flex w-full justify-end items-center mt-16">
                    <Button
                        className="w-[30%] lg:w-[20%] rounded-xl hover:text-[#3A3B3C] bg-[#3A3B3C] text-white hover:bg-white/90 hover:border-[#3A3B3C]"
                        type="button"
                        onClick={() => {
                            handler();
                            reset({
                                staffId: "",
                                classId: "",
                            });
                        }}
                    >
                        Keluar
                    </Button>
                    <Button
                        type="submit"
                        className="w-[30%] lg:w-[20%] rounded-xl hover:text-blue-ribbon bg-blue-ribbon text-white hover:bg-white/90 hover:border-blue-ribbon"
                        loading={addHomeRoomLoading}
                    >
                        Simpan
                    </Button>
                </Modal.Actions>
            </form>
        </Modal>
    );
}
