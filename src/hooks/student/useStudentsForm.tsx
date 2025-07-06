import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "_services/errorHandler";
import { Params, StudentParams } from "_interfaces/class.interface";
import {
  useCreateStudentMutation,
  useGetStudentsQuery,
  useUpdateStudentMutation,
} from "_services/modules/students";
import { StudentFormI, StudentI } from "_interfaces/student.interfaces";
import { useAppDispatch } from "store";
import { saveStudentID } from "store/student";

const useStudentsForm = (
  searchParams: StudentParams,
  setStep?: Dispatch<SetStateAction<number>>,
  setStepStatic?: Dispatch<SetStateAction<number>>,
  id?: string
) => {
  const {
    data,
    refetch,
    isLoading: loadingGetData,
    isFetching,
  } = useGetStudentsQuery(searchParams);
  const [create, createState] = useCreateStudentMutation();
  const [update, updateState] = useUpdateStudentMutation();

  const dispatch = useAppDispatch();

  const isLoading =
    createState.isLoading ||
    updateState.isLoading ||
    loadingGetData ||
    isFetching;

  const navigate = useNavigate();

  const schema = yup
    .object({
      name: yup.string().required("Nama harus diisi"),
      gender: yup.string().oneOf(["male", "female"]).required(),
      nisn: yup.string().required("NISN harus diisi"),
      nik: yup.string().required().length(16, "NIK must be 16 characters"),
      birth_place: yup.string().required(),
      birth_date: yup
        .date()
        .typeError("Tanggal Lahir harus berupa tanggal yang valid")
        .required(),
      akta: yup.string().required("Nomor Akta Kelahiran harus diisi"),
      religion: yup
        .string()
        .oneOf(["islam", "hindu", "budha", "katholik", "kristen", "konghucu"])
        .required(),
      citizenship: yup.string().required("Kewarganegaraan harus diisi"),
      special_needs: yup.string().required("Kebutuhan Khusus harus diisi"),
      address: yup.string().required("Alamat harus diisi"),
      rt: yup.string().required().length(3, "RT must be 3 characters"),
      rw: yup.string().required().length(3, "RW must be 3 characters"),
      pos_code: yup.string().required("Kode Pos harus diisi"),
      kelurahan: yup.string().required("Kelurahan harus diisi"),
      kecamatan: yup.string().required("Kecamatan harus diisi"),
      residence: yup.string().required("Tempat Tinggal harus diisi"),
      transportation: yup.string().required("Alat Transportasi harus diisi"),
      child_order: yup.number().typeError("Form harus diisi").required(),
      is_kps_recipients: yup.boolean().typeError("Form harus diisi").required(),
      is_has_kip: yup.boolean().typeError("Form harus diisi").required(),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    reset,
    control,
  } = useForm<StudentFormI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      name: "Test Draft",
      gender: "male",
      nisn: "0056437890",
      nik: "3201234567890001",
      birth_place: "Bandung",
      birth_date: new Date("2000-01-01"),
      akta: "1234567890",
      religion: "islam",
      citizenship: "Indonesia",
      special_needs: "tidak",
      address: "Jl. Merdeka No.45",
      rt: "002",
      rw: "003",
      pos_code: "40123",
      kelurahan: "Cikutra",
      kecamatan: "Cibeunying Kidul",
      residence: "orang tua",
      transportation: "kendaraan pribadi",
      child_order: 1,
      is_kps_recipients: false,
      is_has_kip: false,
      pip_feasible_reasons: "none",
      no_kks: "-",
      no_kps: "-",
      no_kip: "-",
      kip_name: "-",
    },
  });

  const _CreateStudent = async (data: StudentFormI) => {
    try {
      const res = await create(data).unwrap();
      if (res) {
        if (setStep && setStepStatic) {
          setStep((prev) => prev + 1);
          setStepStatic((prev) => prev + 1);
        }
        refetch();
        reset();
        dispatch(saveStudentID({ student_id: res.student_id }));
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const _UpdateStudent = async (data: StudentFormI) => {
    try {
      const res = await update({ id, ...data }).unwrap();
      if (res) {
        refetch();
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const _FinishStudent = async (data: StudentFormI) => {
    if (id) {
      try {
        await update({ id, ...data, is_draft: false }).unwrap();
        navigate("/student");
      } catch (error) {
        errorHandler(error);
      }
    } else {
      navigate("/student");
    }
  };

  const handleCreate = handleSubmit(_CreateStudent);
  const handleUpdate = handleSubmit(_UpdateStudent);
  const handleFinish = handleSubmit(_FinishStudent);

  return {
    students: data,
    handleCreate,
    handleUpdate,
    handleFinish,
    register,
    errors,
    watch,
    isLoading,
    reset,
    control,
  };
};

export default useStudentsForm;
