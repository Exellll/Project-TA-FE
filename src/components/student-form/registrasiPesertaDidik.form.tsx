import { StudentProps } from "_interfaces/student.interfaces";
import { useGetStudentRegistrationByIdQuery } from "_services/modules/student-registration";
import CInput from "components/input";
import ValidationError from "components/validation/error";
import { RegistrationTypeList } from "data/options";
import useStudentRegistrationForm from "hooks/student-registration/useStudentRegistrationForm";
import React, { useEffect } from "react";
import { Button, Timeline } from "react-daisyui";
import { Controller } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import ReactSelect from "react-select";

const RegistrasiPesertaDidik: React.FC<StudentProps> = ({
  step,
  setStep,
  stepStatic,
  setStepStatic,
  handleStep,
}) => {

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const {data} = useGetStudentRegistrationByIdQuery(userId!, {skip: !userId});

  const { handleCreate, handleUpdate, register, errors, control, isLoading, reset } =
    useStudentRegistrationForm(setStep, setStepStatic, userId!);

  useEffect(() => {
    if (data) {
      reset({
        ...data,
      });
    }
  }
  , [data]);
  return (
    <Timeline.Item
      connect="start"
      endClassName={stepStatic < 9 && !userId ? "bg-gray-400" : "bg-[#1362fc]"}
      startClassName={stepStatic < 8 && !userId ? "bg-gray-400" : "bg-[#1362fc]"}
    >
      <Timeline.Middle
        className={
          stepStatic === 8 && !userId
            ? "text-yellow-800"
            : stepStatic < 9 && !userId
            ? "text-gray-500"
            : "text-blue-ribbon"
        }
      />
      <Timeline.End box={false}>
        <button
          onClick={() =>
            handleStep(9) && setStep((prevStep) => (prevStep === 9 ? 0 : 9))
          }
          className="font-black mx-1"
        >
          Registrasi Peserta Didik
        </button>
        <form
          onSubmit={!userId ? handleCreate : handleUpdate}
          className={`
                transition-all duration-[1500ms] ease-in-out
                ${
                  step === 9 || userId
                    ? "max-h-[2000px] opacity-100 transform translate-y-0"
                    : "max-h-0 opacity-0 transform -translate-y-4"
                }
              `}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-1">
            <div>
              <label className="">Kompetensi Keahlian (SMK)</label>
              <CInput
                {...register("skill_competency")}
                error={errors.skill_competency}
                type="text"
                className="w-full"
                placeholder="Kompetensi Keahlian"
              />
            </div>
            <div>
              <label className="">Jenis Pendaftaran</label>
              <Controller
                control={control}
                name="registration_type"
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
                    options={RegistrationTypeList}
                    value={RegistrationTypeList.find(
                      (item) => item.value === value
                    )}
                    onChange={(e) => onChange(e?.value)}
                  />
                )}
              />
              <ValidationError error={errors.registration_type} />
            </div>
            <div>
              <label className="">NIS</label>
              <CInput
                {...register("nis")}
                error={errors.nis}
                type="text"
                className="w-full"
                placeholder="Nomor Induk Siswa"
              />
            </div>
            <div>
              <label className="">Tanggal Masuk Sekolah</label>
              <CInput
                {...register("join_date")}
                error={errors.join_date}
                type="date"
                className="w-full"
                placeholder="Tanggal Masuk Sekolah"
              />
            </div>
            <div>
              <label className="">Asal Sekolah</label>
              <CInput
                {...register("previous_school")}
                error={errors.previous_school}
                type="text"
                className="w-full"
                placeholder="Asal Sekolah"
              />
            </div>
            <div>
              <label className="">Nomor Peserta Ujian</label>
              <CInput
                {...register("no_examinee")}
                error={errors.no_examinee}
                type="text"
                className="w-full"
                placeholder="Nomor Peserta Ujian"
              />
            </div>
            <div>
              <label className="">No. Seri Ijazah</label>
              <CInput
                {...register("no_ijazah")}
                error={errors.no_ijazah}
                type="text"
                className="w-full"
                placeholder="No. Seri Ijazah"
              />
            </div>
            <div>
              <label className="">No. Seri SKHUS</label>
              <CInput
                {...register("no_skhus")}
                error={errors.no_skhus}
                type="text"
                className="w-full"
                placeholder="No. Seri SKHUS"
              />
            </div>
          </div>
          <div className="mt-6 mb-6 flex justify-end">
            <Button
              type="submit"
              className="bg-blue-ribbon text-white hover:bg-blue-ribbon/90 rounded-2xl font-medium"
            >
              <span className="mx-5">Lanjut</span>
            </Button>
          </div>
        </form>
      </Timeline.End>
    </Timeline.Item>
  );
};

export default RegistrasiPesertaDidik;
