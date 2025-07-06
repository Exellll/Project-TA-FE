import React, { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import ContentContainer from "components/container";
import CInputText from "components/input/CInputText";
import CInputDatePicker from "components/input/CInputDatePicker";
import CDropdown from "components/input/CDropDown";
import CUploadFile from "components/input/CInputFile";
import CInputNumber from "components/input/CInputNumber";
import { roles, genders, employee_status, education_level } from "data/dummy/Staff";
import { OptionConverter } from "_helper/optionConverter";
import { ToListStringConverter } from "_helper/toListStringConverter";
import ButtonLoading from "components/button/button_loading";
import useUpdateStaffForm from "hooks/staff/useUpdateStaffForm";
import { useParams } from "react-router-dom";
import _ from "lodash";
import Spinner from "components/spinner";
import subjects from "data/dummy/Subject";
import DynamicInputList from "components/input/DynamicInputList";

export const updateStaffRouteName = "update/:id";

const UpdateStaffPage = (): React.ReactElement => {
    const { id } = useParams();
    const {
        handleSubmit,
        register,
        control,
        errors,
        setValue,
        getValues,
        onSubmit,
        handleFileChange,
        getStaffLoading,
        updateStaffLoading,
        data,
        defaultLoading,
        methods,
        clickedButton
    } = useUpdateStaffForm(id ?? "");

    return (
        <>
            {(defaultLoading || getStaffLoading) ? (
                <div className="fixed top-1/2 left-[60%]">
                    <Spinner />
                </div>
            ) : (
                <ContentContainer>
                    <div className="px-16 py-8 mb-[5rem]">
                        <h2 className="font-bold text-2xl mb-8 text-start">Form Update Data Guru</h2>
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
                                            label="NIP"
                                            placeholder="Masukkan NIP"
                                            register={register("nip")}
                                            errors={errors.nip?.message}
                                        />
                                        <CDropdown
                                            label="Pendidikan Terakhir"
                                            name="education_level"
                                            defaultValue={data?.education_level}
                                            options={OptionConverter({ data: education_level, labelName: "name", valueName: "id" })}
                                            placeholder="Pilih salah satu..."
                                            saveValueAsLabel={true}
                                            control={control}
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
                                            defaultValue={data?.major}
                                            saveValueAsLabel={true}
                                            options={OptionConverter({ data: subjects, labelName: "name", valueName: "id" })}
                                            placeholder="Pilih salah satu..."
                                            control={control}
                                            errors={errors.major?.message}
                                        />
                                        <DynamicInputList
                                            control={control}
                                            name="roles"
                                            label="Tugas Tambahan"
                                            options={OptionConverter({ data: roles, labelName: "name", valueName: "id" })}
                                            type="dropdown"
                                            saveValueAsLabel={false}
                                            defaultIdList={ToListStringConverter({ data: data?.staff_role ?? [], keyPath: "role_id" })}
                                            placeholder="Pilih Mata Pelajaran"
                                            className="max-h-[300px] overflow-y-auto" // Atur tinggi maksimal dan overflow
                                        />
                                        <DynamicInputList
                                            control={control}
                                            name="subjects"
                                            label="Subjects"
                                            saveValueAsLabel={false}
                                            defaultIdList={ToListStringConverter({ data: data?.staff_subject ?? [], keyPath: "subject.id" })}
                                            options={OptionConverter({ data: subjects, labelName: "name", valueName: "id" })}
                                            type="dropdown"
                                            placeholder="Pilih Mata Pelajaran"
                                            className="max-h-[300px] overflow-y-auto" // Atur tinggi maksimal dan overflow
                                        />
                                        <CDropdown
                                            label="Gender"
                                            name="gender"
                                            defaultValue={data?.gender}
                                            options={OptionConverter({ data: genders, labelName: "name", valueName: "id" })}
                                            placeholder="Pilih Gender"
                                            saveValueAsLabel={true}
                                            control={control}
                                            errors={errors.gender?.message}
                                        />
                                        <CDropdown
                                            label="Status Guru"
                                            name="employment_status"
                                            defaultValue={data?.employment_status}
                                            saveValueAsLabel={true}
                                            options={OptionConverter({ data: employee_status, labelName: "name", valueName: "id" })}
                                            placeholder="Pilih Employee Status"
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
                                                defaultFileName={getValues('ktp')?.name}
                                            />
                                            <CUploadFile
                                                label="Upload KK"
                                                onChange={handleFileChange}
                                                register={register("kk")}
                                                id="kk"
                                                errors={errors.kk?.message}
                                                defaultFileName={getValues('kk')?.name}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <CUploadFile
                                                label="Upload Ijazah"
                                                onChange={handleFileChange}
                                                register={register("ijazah")}
                                                id="ijazah"
                                                errors={errors.ijazah?.message}
                                                defaultFileName={getValues('ijazah')?.name}
                                            />
                                            <CUploadFile
                                                label="Upload Transkrip Nilai"
                                                onChange={handleFileChange}
                                                register={register("transcript")}
                                                id="transcript"
                                                errors={errors.transcript?.message}
                                                defaultFileName={getValues('transcript')?.name}
                                            />
                                        </div>
                                        <CUploadFile
                                            label="Upload Foto"
                                            onChange={handleFileChange}
                                            register={register("avatar")}
                                            id="avatar"
                                            errors={errors.avatar?.message}
                                            defaultFileName={getValues('avatar')?.name}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end ">
                                    <ButtonLoading
                                        children="Submit"
                                        className="w-[250px]"
                                        onClick={() => { }}
                                        disabled={clickedButton}
                                        isLoading={updateStaffLoading}
                                    ></ButtonLoading>
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </ContentContainer>
            )}
        </>
    );
};

export default UpdateStaffPage;
