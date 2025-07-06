import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button, Timeline } from "react-daisyui";
import Kontak from "components/student-form/kontak.form";
import DataPribadi from "components/student-form/dataPribadi.form";
import DataAyahKandung from "components/student-form/dataAyahKandung.form";
import DataIbuKandung from "components/student-form/dataIbuKandung.form";
import DataWali from "components/student-form/dataWali.form";
import DataPeriodik from "components/student-form/dataPeriodik.form";
import Prestasi from "components/student-form/prestasi.form";
import Beasiswa from "components/student-form/beasiswa.form";
import RegistrasiPesertaDidik from "components/student-form/registrasiPesertaDidik.form";
import { useAppDispatch, useAppSelector } from "store";
import { deleteStudentID } from "store/student";
import useStudentsForm from "hooks/student/useStudentsForm";

export const createStudentRouteName = "student/create";

export default function CreateStudentPage(): React.ReactElement {

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const dispatch = useAppDispatch();

  const [step, setStep] = useState(1);
  const [stepStatic, setStepStatic] = useState(0);

  const navigate = useNavigate();

  const { handleFinish } = useStudentsForm(
    {
      search: "",
      limit: 20,
      page: 1,
      is_draft: "false",
    }
  );

  useEffect(() => {
    return () => {
      dispatch(deleteStudentID());
    }
  }, []);

  const handleStep = (param: number) => {
    if (param < stepStatic + 2) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="container border border-gray-100 bg-white rounded-md flex p-5">
      <Timeline vertical compact snap className="max:md:timeline-compact">
        <DataPribadi
          step={step}
          stepStatic={stepStatic}
          setStep={setStep}
          setStepStatic={setStepStatic}
          handleStep={handleStep}
        />
        <DataAyahKandung
          step={step}
          stepStatic={stepStatic}
          setStep={setStep}
          setStepStatic={setStepStatic}
          handleStep={handleStep}
        />
        <DataIbuKandung
          step={step}
          stepStatic={stepStatic}
          setStep={setStep}
          setStepStatic={setStepStatic}
          handleStep={handleStep}
        />
        <DataWali
          step={step}
          stepStatic={stepStatic}
          setStep={setStep}
          setStepStatic={setStepStatic}
          handleStep={handleStep}
        />
        <Kontak
          step={step}
          stepStatic={stepStatic}
          setStep={setStep}
          setStepStatic={setStepStatic}
          handleStep={handleStep}
        />
        <DataPeriodik
          step={step}
          stepStatic={stepStatic}
          setStep={setStep}
          setStepStatic={setStepStatic}
          handleStep={handleStep}
        />
        <Prestasi
          step={step}
          stepStatic={stepStatic}
          setStep={setStep}
          setStepStatic={setStepStatic}
          handleStep={handleStep}
        />
        <Beasiswa
          step={step}
          stepStatic={stepStatic}
          setStep={setStep}
          setStepStatic={setStepStatic}
          handleStep={handleStep}
        />
        <RegistrasiPesertaDidik
          step={step}
          stepStatic={stepStatic}
          setStep={setStep}
          setStepStatic={setStepStatic}
          handleStep={handleStep}
        />

        {step === 10 || userId && (
          <div className="flex flex-wrap justify-between items-center">
            <span className="ml-5 my-3 ">
              Semua form sudah di isi. Silahkan perikasi kembali data yang sudah
              anda input atau click finish jika data sudah benar
            </span>
            <div className="ml-20 relative z-50">
              <Button
                type="button"
                onClick={handleFinish}
                className="bg-blue-ribbon text-white hover:bg-blue-ribbon/90 rounded-2xl font-medium"
              >
                <span className="mx-5">Finish</span>
              </Button>
            </div>
          </div>
        )}
      </Timeline>
    </div>
  );
}
