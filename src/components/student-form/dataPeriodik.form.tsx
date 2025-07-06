import { StudentProps } from "_interfaces/student.interfaces";
import { useGetStudentPeriodicByIdQuery } from "_services/modules/student-periodic";
import CInput from "components/input";
import ValidationError from "components/validation/error";
import { KPSRecipientsDistanceList } from "data/options";
import useStudentPeriodicForm from "hooks/student-periodic/useStudentPeriodicForm";
import React, { useEffect } from "react";
import { Button, Timeline } from "react-daisyui";
import { Controller } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import ReactSelect from "react-select";

const DataPeriodik: React.FC<StudentProps> = ({
  step,
  setStep,
  stepStatic,
  setStepStatic,
  handleStep,
}) => {

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const {data} = useGetStudentPeriodicByIdQuery(userId!, {skip: !userId});

  const { handleCreate, handleUpdate, register, control, errors, isLoading, reset } =
    useStudentPeriodicForm(setStep, setStepStatic, userId!);

  useEffect(() => {
    if (data) {
      reset({
        ...data
      });
    }
  }, [data]);


  return (
    <Timeline.Item
      connect="both"
      endClassName={stepStatic < 6 && !userId ? "bg-gray-400" : "bg-[#1362fc]"}
      startClassName={stepStatic < 5 && !userId ? "bg-gray-400" : "bg-[#1362fc]"}
    >
      <Timeline.Middle
        className={
          stepStatic === 5 && !userId
            ? "text-yellow-800"
            : stepStatic < 6 && !userId
            ? "text-gray-500"
            : "text-blue-ribbon"
        }
      />
      <Timeline.End box={false}>
        <button
          onClick={() =>
            handleStep(6) && setStep((prevStep) => (prevStep === 6 ? 0 : 6))
          }
          className="font-black mx-1"
        >
          Data Periodik
        </button>
        <form
          onSubmit={!userId ? handleCreate : handleUpdate}
          className={`
                transition-all duration-[1250ms] ease-in-out
                ${
                  step === 6 || userId
                    ? "max-h-[2000px] opacity-100 transform translate-y-0"
                    : "max-h-0 opacity-0 transform -translate-y-4"
                }
              `}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-1">
            <div>
              <label>Tinggi Badan</label>
              <CInput
                {...register("body_height")}
                error={errors.body_height}
                type="text"
                className="w-full"
                placeholder="Tinggi Badan"
              />
            </div>
            <div>
              <label>Berat Badan</label>
              <CInput
                {...register("body_weight")}
                error={errors.body_weight}
                type="text"
                className="w-full"
                placeholder="Berat Badan"
              />
            </div>
            <div>
              <label>Jarak Penerima KPS/KPH ke Sekolah</label>
              <Controller
                control={control}
                name="kps_recipients_distance"
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
                    options={KPSRecipientsDistanceList}
                    value={KPSRecipientsDistanceList.find(
                      (item) => item.value === value
                    )}
                    onChange={(e) => onChange(e?.value)}
                  />
                )}
              />
              <ValidationError error={errors.kps_recipients_distance} />
            </div>
            <span className="mt-9 ml-14">Waktu Tempuh ke Sekolah</span>
            <div className="grid grid-cols-2 gap-6 mx-1">
              <div>
                <label>Jam</label>
                <CInput
                  {...register("travel_time_in_hour")}
                  error={errors.travel_time_in_hour}
                  type="text"
                  className="w-full"
                  placeholder="Jam"
                />
              </div>
              <div>
                <label>Menit</label>
                <CInput
                  {...register("travel_time_in_minutes")}
                  error={errors.travel_time_in_minutes}
                  type="text"
                  className="w-full"
                  placeholder="Menit"
                />
              </div>
            </div>
            <div>
              <label>Jumlah Saudara</label>
              <CInput
                {...register("number_of_sibling")}
                error={errors.number_of_sibling}
                type="text"
                className="w-full"
                placeholder="Jumlah Saudara"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
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

export default DataPeriodik;
