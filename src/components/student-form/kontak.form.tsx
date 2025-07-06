import { StudentProps } from "_interfaces/student.interfaces";
import { useGetStudentContactByIdQuery } from "_services/modules/student-contact";
import CInput from "components/input";
import useStudentContactForm from "hooks/student-contact/useStudentContactForm";
import React, { useEffect } from "react";
import { Button, Timeline } from "react-daisyui";
import { useSearchParams } from "react-router-dom";

const Kontak: React.FC<StudentProps> = ({
  step,
  setStep,
  stepStatic,
  setStepStatic,
  handleStep,
}) => {

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const { data } = useGetStudentContactByIdQuery(userId!, {skip: !userId});

  const { handleCreate, handleUpdate, register, errors, isLoading, reset } = useStudentContactForm(
    setStep,
    setStepStatic,
    userId!
  );

  useEffect(() => {
    if (data) {
      reset({
        home_phone_number: data.home_phone_number,
        student_phone_number: data.student_phone_number,
        email: data.email,
        parent_email: data.parent_email,
      });
    }
  }, [data]);

  return (
    <Timeline.Item
      connect="both"
      endClassName={stepStatic < 5 && !userId ? "bg-gray-400" : "bg-[#1362fc]"}
      startClassName={stepStatic < 4 && !userId ? "bg-gray-400" : "bg-[#1362fc]"}
    >
      <Timeline.Middle
        className={
          stepStatic === 4 && !userId
            ? "text-yellow-800"
            : stepStatic < 5 && !userId
            ? "text-gray-500"
            : "text-blue-ribbon"
        }
      />
      <Timeline.End box={false}>
        <button
          onClick={() =>
            handleStep(5) && setStep((prevStep) => (prevStep === 5 ? 0 : 5))
          }
          className="font-black mx-1"
        >
          Kontak
        </button>
        <form
          onSubmit={!userId ? handleCreate : handleUpdate}
          className={`
                transition-all duration-[1250ms] ease-in-out
                ${
                  step === 5 || userId
                    ? "max-h-[2000px] opacity-100 transform translate-y-0"
                    : "max-h-0 opacity-0 transform -translate-y-4"
                }
              `}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-1">
            <div>
              <label>No Telepon Rumah</label>
              <CInput
                {...register("home_phone_number")}
                error={errors.home_phone_number}
                type="text"
                className="w-full"
                placeholder="No Telepon Rumah"
              />
            </div>
            <div>
              <label>No HP Anak</label>
              <CInput
                {...register("student_phone_number")}
                error={errors.student_phone_number}
                type="text"
                className="w-full"
                placeholder="No HP Anak"
              />
            </div>
            <div>
              <label>Email</label>
              <CInput
                {...register("email")}
                error={errors.email}
                type="email"
                className="w-full"
                placeholder="Email"
              />
            </div>
            <div>
              <label>Email Orang Tua / Wali</label>
              <CInput
                {...register("parent_email")}
                error={errors.parent_email}
                type="email"
                className="w-full"
                placeholder="Email Orang Tua / Wali"
              />
            </div>
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
        </form>
      </Timeline.End>
    </Timeline.Item>
  );
};

export default Kontak;
