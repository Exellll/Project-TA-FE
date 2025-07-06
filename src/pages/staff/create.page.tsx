import React, { useEffect } from "react";
import ContentContainer from "components/container";
import CInputText from "components/input/CInputText";
import CInputDatePicker from "components/input/CInputDatePicker";
import CDropdown from "components/input/CDropDown";
import DynamicInputList from "components/input/DynamicInputList";
import useCreateStaffForm from "hooks/staff/useCreateStaffForm";
import CUploadFile from "components/input/CInputFile";
import CInputNumber from "components/input/CInputNumber";
import { roles, genders, employee_status, education_level } from "data/dummy/Staff";
import { OptionConverter } from "_helper/optionConverter";
import ButtonLoading from "components/button/button_loading";
import { dataSubjects } from "data/dummy/Subject";
import { FormProvider } from "react-hook-form";
import { toast } from "react-toastify";

export const createStaffRouteName = "create";
const CreateStaffPage = (): React.ReactElement => {
    const { methods, handleSubmit, register, errors, setValue, onSubmit, handleFileChange, handleGoBack, control, isLoading, toastMessage, showToast, setShowToast, getValues } = useCreateStaffForm();
    // const { subjects } = useFetchData()
   
    return (
        <ContentContainer>
            <div className="px-16 py-8 mb-[5rem]">
                <h2 className="font-bold text-2xl mb-8 text-start">Form Pendaftaran Guru</h2>
                <FormProvider {...methods}>
                    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-2 gap-10 mb-[5rem]">
                            {/* Kolom kiri */}
                            <div className="space-y-6">
                                <CInputText
                                    label="Nama Lengkap"
                                    placeholder="Masukkan nama lengkap"
                                    register={register("name")}
                                    errors={errors.name?.message}
                                />
                                <CInputText
                                    label="NIK"
                                    placeholder="Masukkan NIK"
                                    register={register("nik")}
                                    errors={errors.nik?.message}
                                />
                                <div className="grid grid-cols-2 gap-6">
                                    <CInputText
                                        label="Tempat Lahir"
                                        placeholder="Masukkan Tempat Lahir"
                                        register={register("birth_place")}
                                        errors={errors.birth_place?.message}
                                    />
                                    <CInputDatePicker
                                        label="Tanggal Lahir"
                                        register={register("birth_date")}
                                        setValue={setValue}
                                        name="birth_date"
                                        errors={errors.birth_date?.message}
                                    />
                                </div>
                                <CInputText
                                    label="Alamat"
                                    placeholder="Masukkan Alamat"
                                    register={register("address")}
                                    errors={errors.address?.message}
                                />
                                <CInputText
                                    label="Nomor Handphone"
                                    placeholder="Masukkan Nomor Handphone"
                                    register={register("phone_number")}
                                    errors={errors.phone_number?.message}
                                />
                                <CInputText
                                    label="Email"
                                    placeholder="Masukkan Email"
                                    register={register("email")}
                                    errors={errors.email?.message}
                                />
                                <CInputText
                                    label="NIP"
                                    placeholder="Masukkan NIP"
                                    register={register("nip")}
                                    errors={errors.nip?.message}
                                />
                                <CDropdown
                                    label="Pendidikan Terakhir"
                                    name="education_level"
                                    options={OptionConverter({ data: education_level, labelName: "name", valueName: "id" })}
                                    placeholder="Pilih salah satu..."
                                    control={control}
                                    saveValueAsLabel={true}
                                    errors={errors.education_level?.message}
                                />
                                <CInputNumber
                                    label="Tahun Lulus"
                                    placeholder="Masukkan Tahun Lulus"
                                    register={register("graduationYear")}
                                    errors={errors.graduationYear?.message}
                                />
                            </div>
                            {/* Kolom kanan */}
                            <div className="space-y-6">
                                <CDropdown
                                    label="Bidang Studi"
                                    name="major"    
                                    options={OptionConverter({ data: dataSubjects, labelName: "name", valueName: "id" })}
                                    placeholder="Pilih salah satu..."
                                    control={control}
                                    saveValueAsLabel={true}
                                    errors={errors.major?.message}
                                />
                                <DynamicInputList
                                    control={control}
                                    name="roles"
                                    label="Tugas Tambahan"
                                    options={OptionConverter({ data: roles, labelName: "name", valueName: "id" })}
                                    type="dropdown"
                                    saveValueAsLabel={false}
                                    placeholder="Pilih Mata Pelajaran"
                                    className="max-h-[300px] overflow-y-auto" // Atur tinggi maksimal dan overflow
                                />
                                <DynamicInputList
                                    control={control}
                                    name="subjects"
                                    label="Subjects"
                                    saveValueAsLabel={false}
                                    options={OptionConverter({ data: dataSubjects, labelName: "name", valueName: "id" })}
                                    type="dropdown"
                                    placeholder="Pilih Mata Pelajaran"
                                    className="max-h-[300px] overflow-y-auto" // Atur tinggi maksimal dan overflow
                                />
                                <CDropdown
                                    label="Gender"
                                    name="gender"
                                    options={OptionConverter({ data: genders, labelName: "name", valueName: "id" })}
                                    placeholder="Pilih Gender"
                                    control={control}
                                    saveValueAsLabel={true}
                                    errors={errors.gender?.message}
                                />
                                <CDropdown
                                    label="Status Guru"
                                    name="employment_status"
                                    options={OptionConverter({ data: employee_status, labelName: "name", valueName: "id" })}
                                    placeholder="Pilih Employee Status"
                                    saveValueAsLabel={true}
                                    control={control}
                                    errors={errors.employment_status?.message}
                                />
                                <CInputDatePicker
                                    label="Mulai bekerja"
                                    register={register("join_date")}
                                    setValue={setValue}
                                    name="join_date"
                                    errors={errors.join_date?.message}
                                />
                                <div className="grid grid-cols-2 gap-6">
                                    <CUploadFile
                                        label="Upload KTP"
                                        onChange={handleFileChange}
                                        register={register("ktp")}
                                        id="ktp"
                                        errors={errors.ktp?.message}
                                    />
                                    <CUploadFile
                                        label="Upload KK"
                                        onChange={handleFileChange}
                                        register={register("kk")}
                                        id="kk"
                                        errors={errors.kk?.message}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <CUploadFile
                                        label="Upload Ijazah"
                                        onChange={handleFileChange}
                                        register={register("ijazah")}
                                        id="ijazah"
                                        errors={errors.ijazah?.message}
                                    />
                                    <CUploadFile
                                        label="Upload Transkrip Nilai"
                                        onChange={handleFileChange}
                                        register={register("transcript")}
                                        id="transcript"
                                        errors={errors.transcript?.message}
                                    />
                                </div>
                                <CUploadFile
                                    label="Upload Foto"
                                    onChange={handleFileChange}
                                    register={register("avatar")}
                                    id="avatar"
                                    errors={errors.avatar?.message}
                                />
                            </div>

                        </div>
                        <div className="flex justify-end ">
                            <ButtonLoading
                                children="Submit"
                                className="w-[250px]"
                                onClick={() => { }}
                                isLoading={isLoading}
                            ></ButtonLoading>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </ContentContainer>
    );
};

export default CreateStaffPage;
