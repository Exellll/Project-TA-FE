import CInput from "components/input";
import ValidationError from "components/validation/error";
import { Button, Modal } from "react-daisyui";
import { Radio } from "@material-tailwind/react";
import CDropdown from "components/input/CDropDown";
import { OptionConverter } from "_helper/optionConverter";
import CInputText from "components/input/CInputText";
import CInputNumber from "components/input/CInputNumber";
import useClassManagement from "hooks/class/useClassManagement";
import React from "react";
import { listKelas } from "data/dummy/Class";

interface Props {
    id?: string;
    isOpen: boolean;
    type: "create" | "update";
    handler: () => void;
}
export default function ClassModal({
    isOpen,
    type,
    handler,
    id,
}: Props): React.ReactElement {
    // Mengambil data dan handler dari hook useClassManagement
    const {
        register,
        reset,
        isLoadingCreate,
        isLoadingUpdate,
        control,
        errors,
        handleCreate,
        handleUpdate,
    } = useClassManagement(id, handler);

    return (
        <Modal
            open={isOpen}
            backdrop={false}
            className="flex flex-col bg-white lg:min-w-[700px]"
        >
            <form onSubmit={type === "create" ? handleCreate : handleUpdate}>
                <Modal.Body className="flex flex-col justify-start items-start">
                    <p className="text-xl font-semibold text-start">
                        {type === "create" ? "Form Create" : "Edit"} Mata Pelajaran
                    </p>

                    <div className="flex flex-col gap-2 w-full pt-1">
                        <CDropdown
                            label="Kelas"
                            name="kelas"
                            options={OptionConverter({
                                data: listKelas,
                                labelName: "name",
                                valueName: "id"
                            })}
                            placeholder="Pilih salah satu..."
                            control={control}
                            defaultValue=""
                            saveValueAsLabel={true}
                            errors={errors.kelas?.message}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full pt-4">
                        <CInputText
                            label="Index Kelas"
                            placeholder="Masukkan Index Kelas"
                            register={register("indexKelas")}
                            className="w-full"
                            errors={errors.indexKelas?.message}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full pt-1">
                        <CInputNumber
                            label="Capacity"
                            placeholder="Masukkan Capacity"
                            register={register("capacity")}
                            errors={errors.capacity?.message}
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
                                kelas: "",
                                indexKelas: "",
                                capacity: 0
                            });
                        }}
                    >
                        Keluar
                    </Button>
                    <Button
                        type="submit"
                        className="w-[30%] lg:w-[20%] rounded-xl hover:text-blue-ribbon bg-blue-ribbon text-white hover:bg-white/90 hover:border-blue-ribbon"
                        loading={isLoadingCreate || isLoadingUpdate}
                    >
                        Simpan
                    </Button>
                </Modal.Actions>
            </form>
        </Modal>
    );
}
