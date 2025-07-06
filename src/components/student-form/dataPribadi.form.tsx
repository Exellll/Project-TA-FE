import { StudentProps } from "_interfaces/student.interfaces";
import { useGetStudentByIdQuery } from "_services/modules/students";
import CInput from "components/input";
import ValidationError from "components/validation/error";
import {
  BooleanList,
  GenderList,
  PIPList,
  ReligionList,
  ResidenceList,
  SpecialNeedsList,
  TransportationList,
} from "data/options";
import useStudentsForm from "hooks/student/useStudentsForm";
import React, { useEffect } from "react";
import { Button, Timeline } from "react-daisyui";
import { Controller } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import ReactSelect from "react-select";
import { useAppSelector } from "store";

const DataPribadi: React.FC<StudentProps> = ({
  step,
  setStep,
  stepStatic,
  setStepStatic,
  handleStep,
}) => {
  const {student_id} = useAppSelector(state => state.student);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const { handleCreate, handleUpdate, register, errors, control, isLoading, reset, watch } =
    useStudentsForm(
      {
        search: "",
        limit: 20,
        page: 1,
        is_draft: "true",
      },
      setStep,
      setStepStatic,
      userId!
    );

  const { data } = useGetStudentByIdQuery(userId!, {skip: !userId});

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        gender: data.gender,
        nisn: data.nisn,
        nik: data.nik,
        birth_place: data.birth_place,
        birth_date: new Date(data.birth_date),
        akta: data.akta,
        citizenship: data.citizenship,
        religion: data.religion,
        special_needs: data.special_needs,
        address: data.address,
        rt: data.rt,
        rw: data.rw,
        pos_code: data.pos_code,
        kelurahan: data.kelurahan,
        kecamatan: data.kecamatan,
        residence: data.residence,
        transportation: data.transportation,
        no_kks: data.no_kks,
        child_order: data.child_order,
        is_kps_recipients: data.is_kps_recipients,
        pip_feasible_reasons: data.pip_feasible_reasons,
        is_has_kip: data.is_has_kip,
        kip_name: data.kip_name,
        no_kip: data.no_kip,
        no_kps: data.no_kps,
      });
    }
  }, [data]);

  return (
    <Timeline.Item
      connect="end"
      endClassName={stepStatic < 1 && !userId ? "bg-gray-400" : "bg-[#1362fc]"}
      startClassName={stepStatic < 1 && !userId ? "bg-gray-400" : "bg-[#1362fc]"}
    >
      <Timeline.End box={false}>
        <button
          onClick={() =>
            handleStep(1) && setStep((prevStep) => (prevStep === 1 ? 0 : 1))
          }
          className="font-black mx-1"
        >
          Data Pribadi
        </button>
        <form
          onSubmit={!userId || !student_id ? handleCreate : handleUpdate}
          className={`
                transition-all duration-[2000ms] ease-in-out
                ${
                  step === 1
                    ? "max-h-[1500px] opacity-100 transform translate-y-0"
                    : "max-h-0 opacity-0 transform -translate-y-4"
                }
              `}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-1">
            <div>
              <label className="flex flex-wrap font-base">Nama Lengkap</label>
              <CInput
                {...register("name")}
                error={errors.name}
                type="text"
                className="w-full"
                placeholder="Nama Lengkap Siswa"
              />
            </div>
            <div>
              <label className="flex flex-wrap font-base">Jenis Kelamin</label>
              <Controller
                control={control}
                name="gender"
                render={({ field: { value, onChange } }) => (
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
              <ValidationError error={errors.gender} />
            </div>
            <div>
              <label className="flex flex-wrap font-base">NISN</label>
              <CInput
                {...register("nisn")}
                error={errors.nisn}
                type="text"
                className="w-full"
                placeholder="NISN"
              />
            </div>
            <div>
              <label className="flex flex-wrap font-base">NIK</label>
              <CInput
                {...register("nik")}
                error={errors.nik}
                type="text"
                className="w-full"
                placeholder="NIK"
              />
            </div>
            <div>
              <label className="flex flex-wrap font-base">Tempat Lahir</label>
              <CInput
                {...register("birth_place")}
                error={errors.birth_place}
                type="text"
                className="w-full"
                placeholder="Tempat Lahir"
              />
            </div>
            <div>
              <label className="flex flex-wrap font-base">Tanggal Lahir</label>
              <CInput
                {...register("birth_date")}
                error={errors.birth_date}
                type="date"
                className="w-full"
              />
            </div>
            <div>
              <label className="flex flex-wrap font-base">No Akta</label>
              <CInput
                {...register("akta")}
                error={errors.akta}
                type="text"
                className="w-full"
                placeholder="No Akta"
              />
            </div>
            <div>
              <label className="flex flex-wrap font-base">Agama</label>
              <Controller
                control={control}
                name="religion"
                render={({ field: { value, onChange } }) => (
                  <ReactSelect
                    styles={{
                      control: (baseStyle) => ({
                        ...baseStyle,
                        padding: 5,
                        borderColor: "#BDBDBD",
                        borderRadius: "0.5rem",
                      }),
                    }}
                    options={ReligionList}
                    value={ReligionList.find((item) => item.value === value)}
                    onChange={(e) => onChange(e?.value)}
                  />
                )}
              />
              <ValidationError error={errors.religion} />
            </div>
            <div>
              <label className="flex flex-wrap font-base">
                Kewarganegaraan
              </label>
              <CInput
                {...register("citizenship")}
                error={errors.citizenship}
                type="text"
                className="w-full"
                placeholder="Kewarganegaraan"
              />
            </div>
            <div>
              <label className="flex flex-wrap font-base">
                Kebutuhan Khusus
              </label>
              <Controller
                control={control}
                name="special_needs"
                render={({ field: { value, onChange } }) => (
                  <ReactSelect
                    styles={{
                      control: (baseStyle) => ({
                        ...baseStyle,
                        padding: 5,
                        borderColor: "#BDBDBD",
                        borderRadius: "0.5rem",
                      }),
                    }}
                    options={SpecialNeedsList}
                    value={SpecialNeedsList.find(
                      (item) => item.value === value
                    )}
                    onChange={(e) => onChange(e?.value)}
                  />
                )}
              />
              <ValidationError error={errors.special_needs} />
            </div>
            <div>
              <label className="flex flex-wrap font-base">Alamat</label>
              <CInput
                {...register("address")}
                error={errors.address}
                type="text"
                className="w-full"
                placeholder="Alamat"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="flex flex-wrap font-base">RT</label>
                <CInput
                  {...register("rt")}
                  error={errors.rt}
                  type="text"
                  className="w-full"
                  placeholder="RT"
                />
              </div>
              <div>
                <label className="flex flex-wrap font-base">RW</label>
                <CInput
                  {...register("rw")}
                  error={errors.rw}
                  type="text"
                  className="w-full"
                  placeholder="RW"
                />
              </div>
              <div>
                <label className="flex flex-wrap font-base">Kode Pos</label>
                <CInput
                  {...register("pos_code")}
                  error={errors.pos_code}
                  type="text"
                  className="w-full"
                  placeholder="Kode Pos"
                />
              </div>
            </div>
            <div>
              <label className="flex flex-wrap font-base">Kelurahan/Desa</label>
              <CInput
                {...register("kelurahan")}
                error={errors.kelurahan}
                type="text"
                className="w-full"
                placeholder="Kelurahan/Desa"
              />
            </div>
            <div>
              <label className="flex flex-wrap font-base">Kecamatan</label>
              <CInput
                {...register("kecamatan")}
                error={errors.kecamatan}
                type="text"
                className="w-full"
                placeholder="Kecamatan"
              />
            </div>
            <div>
              <label className="flex flex-wrap font-base">Tempat Tinggal</label>
              <Controller
                control={control}
                name="residence"
                render={({ field: { value, onChange } }) => (
                  <ReactSelect
                    styles={{
                      control: (baseStyle) => ({
                        ...baseStyle,
                        padding: 5,
                        borderColor: "#BDBDBD",
                        borderRadius: "0.5rem",
                      }),
                    }}
                    options={ResidenceList}
                    value={ResidenceList.find((item) => item.value === value)}
                    onChange={(e) => onChange(e?.value)}
                  />
                )}
              />
              <ValidationError error={errors.residence} />
            </div>
            <div>
              <label className="flex flex-wrap font-base">
                Mode Transportasi
              </label>
              <Controller
                control={control}
                name="transportation"
                render={({ field: { value, onChange } }) => (
                  <ReactSelect
                    styles={{
                      control: (baseStyle) => ({
                        ...baseStyle,
                        padding: 5,
                        borderColor: "#BDBDBD",
                        borderRadius: "0.5rem",
                      }),
                    }}
                    options={TransportationList}
                    value={TransportationList.find(
                      (item) => item.value === value
                    )}
                    onChange={(e) => onChange(e?.value)}
                  />
                )}
              />
              <ValidationError error={errors.transportation} />
            </div>
            <div>
              <label className="flex flex-wrap font-base">Nomor KKS</label>
              <CInput
                {...register("no_kks")}
                error={errors.no_kks}
                type="text"
                className="w-full"
                placeholder="Nomor KKS"
              />
            </div>
            <div>
              <label className="flex flex-wrap font-base">Anak-ke</label>
              <CInput
                {...register("child_order")}
                error={errors.child_order}
                type="text"
                className="w-full"
                placeholder="Anak-ke"
              />
            </div>
            <div>
              <label className="flex flex-wrap font-base">
                Penerima KPS/KPH
              </label>
              <Controller
                control={control}
                name="is_kps_recipients"
                render={({ field: { value, onChange } }) => (
                  <ReactSelect
                    styles={{
                      control: (baseStyle) => ({
                        ...baseStyle,
                        padding: 5,
                        borderColor: "#BDBDBD",
                        borderRadius: "0.5rem",
                      }),
                    }}
                    options={BooleanList}
                    value={BooleanList.find(
                      (item) => item.value === `${value}`
                    )}
                    onChange={(e) =>
                      onChange(e?.value === "true" ? true : false)
                    }
                  />
                )}
              />
              <ValidationError error={errors.is_kps_recipients} />
              {watch("is_kps_recipients") && (
                <div>
                  <label className="flex flex-wrap font-base">Nomor KPS</label>
                  <CInput
                    {...register("no_kps")}
                    error={errors.no_kps}
                    type="text"
                    className="w-full"
                    placeholder="Nomor KPS"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="flex flex-wrap font-base">
                Alasan layak PIP
              </label>
              <Controller
                control={control}
                name="pip_feasible_reasons"
                render={({ field: { value, onChange } }) => (
                  <ReactSelect
                    styles={{
                      control: (baseStyle) => ({
                        ...baseStyle,
                        padding: 5,
                        borderColor: "#BDBDBD",
                        borderRadius: "0.5rem",
                      }),
                    }}
                    menuPortalTarget={document.body}
                    options={PIPList}
                    value={PIPList.find((item) => item.value === value)}
                    onChange={(e) => onChange(e?.value)}
                  />
                )}
              />
              <ValidationError error={errors.pip_feasible_reasons} />
            </div>
            <div>
              <label className="flex flex-wrap font-base">
                Apakah punya KIP?
              </label>
              <Controller
                control={control}
                name="is_has_kip"
                render={({ field: { value, onChange } }) => (
                  <ReactSelect
                    styles={{
                      control: (baseStyle) => ({
                        ...baseStyle,
                        padding: 5,
                        borderColor: "#BDBDBD",
                        borderRadius: "0.5rem",
                      }),
                    }}
                    menuPortalTarget={document.body}
                    options={BooleanList}
                    value={BooleanList.find(
                      (item) => item.value === `${value}`
                    )}
                    onChange={(e) =>
                      onChange(e?.value === "true" ? true : false)
                    }
                  />
                )}
              />
              <ValidationError error={errors.is_has_kip} />
              {watch("is_has_kip") && (
                <div>
                  <div>
                    <label className="flex flex-wrap font-base">
                      Nomor KIP
                    </label>
                    <CInput
                      {...register("no_kip")}
                      error={errors.no_kip}
                      type="text"
                      className="w-full"
                      placeholder="Nomor KIP"
                    />
                  </div>
                  <div>
                    <label className="flex flex-wrap font-base">
                      Nama Tertera di KIP
                    </label>
                    <CInput
                      {...register("kip_name")}
                      error={errors.kip_name}
                      type="text"
                      className="w-full"
                      placeholder="Nama Tertera di KIP"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <Button
                type="submit"
                className="bg-blue-ribbon text-white hover:bg-blue-ribbon/90 rounded-2xl font-medium"
                loading={isLoading}
              >
                <span className="mx-5">Lanjut</span>
              </Button>
            </div>
          </div>
        </form>
      </Timeline.End>
      <Timeline.Middle
        className={
          stepStatic === 0 && !userId
            ? "text-yellow-800"
            : stepStatic < 1 && !userId
            ? "text-gray-500"
            : "text-blue-ribbon"
        }
      />
    </Timeline.Item>
  );
};

export default DataPribadi;
