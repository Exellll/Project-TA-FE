import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateStaffFormI, UpdateStaffFormI, UpdateStaffReqI } from "_interfaces/staff.interfaces";  // Pastikan import interface yang sesuai
import { useNavigate } from "react-router-dom";
import { useGetStaffByIdQuery, useListStaffQuery, useUpdatedStaffMutation } from "_services/modules/staff";
import { createFileFromUrl } from "_helper/createFileFromUrl";
import { uploadFile } from "_services/modules/file";
import { CustomShowToast } from "components/toasts/custom_toast";

const useUpdateStaffForm = (id: string) => {
    const navigate = useNavigate();
    const { data: data, isLoading: getStaffLoading, isError } = useGetStaffByIdQuery({ id });
    const [updateStaff, { isLoading: updateStaffLoading }] = useUpdatedStaffMutation();
    const [defaultLoading, setDefaultLoading] = useState(true);
    const validFileExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif", "application/pdf"];
    const maxFileSize = 2 * 1024 * 1024;
    const [clickedButton, setClickedButton] = useState(false);
    // Definisikan schema validasi menggunakan Yup
    const schema = yup
        .object({
            name: yup
                .string()
                .min(3, "Nama minimal 3 karakter")
                .required("Nama wajib diisi"),

            nip: yup
                .string()
                .min(5, "NIP minimal 5 karakter")
                .required("NIP wajib diisi"),

            nik: yup
                .string()
                .min(16, "NIK harus 16 karakter")
                .max(16, "NIK harus 16 karakter")
                .required("NIK wajib diisi"),

            education_level: yup
                .string()
                .transform((value) => (value && value.value ? value.label : value))
                .required("Pendidikan wajib dipilih"),

            birth_place: yup
                .string()
                .required("Tempat lahir wajib diisi"),

            birth_date: yup
                .date()
                .required("Tanggal lahir wajib diisi")
                .typeError("Format tanggal tidak valid"),

            graduationYear: yup
                .number()
                .min(1900, "Tahun lulus minimal 1900")
                .max(new Date().getFullYear(), "Tahun lulus tidak valid")
                .required("Tahun lulus wajib diisi")
                .typeError("Tahun lulus harus berupa angka"),

            gender: yup
                .string()
                .transform((value) => (value && value.value ? value.label : value))
                .oneOf(["Male", "Female"], "Jenis kelamin harus salah satu dari male atau female")
                .required("Jenis kelamin wajib dipilih"),

            phone_number: yup
                .string()
                .matches(/^[0-9]+$/, "Nomor telepon hanya boleh angka")
                .min(10, "Nomor telepon minimal 10 angka")
                .required("Nomor telepon wajib diisi"),

            address: yup
                .string()
                .required("Alamat wajib diisi"),

            join_date: yup
                .date()
                .required("Tanggal mulai bekerja wajib diisi")
                .typeError("Format tanggal tidak valid"),

            major: yup
                .string()
                .transform((value) => (value && value.value ? value.label : value))
                .required(),

            employment_status: yup
                .string()
                .oneOf(["Honor", "Tetap"], "Status pekerjaan harus salah satu dari active atau inactive")
                .transform((value) => (value && value.value ? value.value : value))
                .required("Status pekerjaan wajib diisi"),

            roles: yup
                .array()
                .of(yup.string())
                .transform((value) => (Array.isArray(value) ? value.map(item => item.value || item) : []))
                .min(1, "Setidaknya satu Jabatan harus dipilih")
                .required("Jabatan wajib dipilih")
                .test("roles-check", "Validasi roles gagal", (value) => {
                    return true; // Mengembalikan true agar tidak mempengaruhi validasi asli
                }),

            subjects: yup
                .array()
                .of(yup.string())
                .transform((value) => (Array.isArray(value) ? value.map(item => item.value || item) : []))
                .min(1, "Setidaknya satu Jabatan harus dipilih")
                .required("Jabatan wajib dipilih")
                .test("subjects-check", "Validasi  gagal", (value) => {
                    return true; // Mengembalikan true agar tidak mempengaruhi validasi asli
                }),

            avatar: yup
                .mixed<File>()
                .nullable()
                .required("Transkrip nilai wajib diisi")
                .test(
                    "fileType",
                    "Format file tidak valid, hanya mendukung jpeg, jpg, png, gif, dan pdf",
                    (value) => !value || (value && validFileExtensions.includes(value.type))
                ).test(
                    "fileSize",
                    "Ukuran file terlalu besar, maksimal 2MB",
                    (value) => !value || (value && value.size <= maxFileSize)
                ),
            ktp: yup
                .mixed<File>()
                .nullable()
                .required("Transkrip nilai wajib diisi")
                .test(
                    "fileType",
                    "Format file tidak valid, hanya mendukung jpeg, jpg, png, gif, dan pdf",
                    (value) => !value || (value && validFileExtensions.includes(value.type))
                ).test(
                    "fileSize",
                    "Ukuran file terlalu besar, maksimal 2MB",
                    (value) => !value || (value && value.size <= maxFileSize)
                ),

            kk: yup
                .mixed<File>()
                .nullable()
                .required("Transkrip nilai wajib diisi").
                test(
                    "fileType",
                    "Format file tidak valid, hanya mendukung jpeg, jpg, png, gif, dan pdf",
                    (value) => !value || (value && validFileExtensions.includes(value.type))
                ).test(
                    "fileSize",
                    "Ukuran file terlalu besar, maksimal 2MB",
                    (value) => !value || (value && value.size <= maxFileSize)
                ),
            ijazah: yup
                .mixed<File>()
                .nullable()
                .required("Transkrip nilai wajib diisi")
                .test(
                    "fileType",
                    "Format file tidak valid, hanya mendukung jpeg, jpg, png, gif, dan pdf",
                    (value) => !value || (value && validFileExtensions.includes(value.type))
                ).test(
                    "fileSize",
                    "Ukuran file terlalu besar, maksimal 2MB",
                    (value) => !value || (value && value.size <= maxFileSize)
                ),
            transcript: yup
                .mixed<File>()
                .nullable()
                .required("Transkrip nilai wajib diisi")
                .test(
                    "fileType",
                    "Format file tidak valid, hanya mendukung jpeg, jpg, png, gif, dan pdf",
                    (value) => !value || (value && validFileExtensions.includes(value.type))
                ).test(
                    "fileSize",
                    "Ukuran file terlalu besar, maksimal 2MB",
                    (value) => !value || (value && value.size <= maxFileSize)
                ),
        })
        .required();


    const onSubmit = async (dataOnSubmit: CreateStaffFormI) => {

        // Fungsi bantu untuk mengunggah file jika berbeda dan mendapatkan nama file di server
        const uploadIfDifferent = async (fileUrl: string | undefined, fileFromForm: File | null | undefined) => {
            const tempFile = await createFileFromUrl(fileUrl ?? '');
            if (tempFile?.name !== fileFromForm?.name && tempFile) {
                // Upload file jika nama file berbeda
                return await uploadFile('', fileFromForm!); // Simpan nama file yang sudah diunggah
            }
            return fileUrl; // Kembalikan URL asli jika tidak diunggah ulang
        };

        // Upload all files concurrently
        const uploadPromises = [
            uploadIfDifferent(data?.ktp, dataOnSubmit.ktp),
            uploadIfDifferent(data?.kk, dataOnSubmit.kk),
            uploadIfDifferent(data?.transcript, dataOnSubmit.transcript),
            uploadIfDifferent(data?.ijazah, dataOnSubmit.ijazah),
            uploadIfDifferent(data?.avatar, dataOnSubmit.avatar),
        ];

        const [ktp, kk, transcript, ijazah, avatar] = await Promise.all(uploadPromises);

        // Persiapan data untuk di-update
        const dataUpdate: UpdateStaffReqI = {
            id: id,
            name: dataOnSubmit.name,
            nip: dataOnSubmit.nip,
            nik: dataOnSubmit.nik,
            birth_place: dataOnSubmit.birth_place,
            birth_date: dataOnSubmit.birth_date,
            graduationYear: dataOnSubmit.graduationYear,
            address: dataOnSubmit.address,
            education_level: dataOnSubmit.education_level,
            email: dataOnSubmit.email,
            employment_status: dataOnSubmit.employment_status,
            gender: dataOnSubmit.gender,
            join_date: dataOnSubmit.join_date,
            major: dataOnSubmit.major,
            phone_number: dataOnSubmit.phone_number,
            roles: dataOnSubmit.roles,
            bidang_studi: "",
            // Mengonversi file ke URL jika perlu, atau menggunakan URL yang ada
            ktp: ktp,
            kk: kk,
            transcript: transcript,
            ijazah: ijazah,
            avatar: avatar,
            subjects: dataOnSubmit.subjects,
        };

        // Lakukan update dengan data yang sudah diolah\
        setClickedButton(true);
        try {
            const value = await updateStaff(dataUpdate).unwrap();
            CustomShowToast({ title: "Update Staff", description: "Berhasil", type: "success" });
            navigate(-1);

        } catch (err) {
            CustomShowToast({ title: "Update Staff", description: `Gagal : err${err}`, type: "failed" });
            console.error(err);
        } finally {
            setClickedButton(false);
        }
    };

    const handleFileChange = (key: string, file: File | null) => {
        const name = key as 'transcript' || 'kk' || 'ktp' || 'avatar' || 'ijazah';
        if (!file) {
            setError(name, { type: "manual", message: "File wajib diunggah" });
        } else if (file.size > maxFileSize) {
            setError(name, { type: "manual", message: "Ukuran file terlalu besar, maksimal 2MB" });
        } else if (!validFileExtensions.includes(file.type)) {
            setError(name, { type: "manual", message: "Format file tidak valid" });
        } else {
            clearErrors(name); // Clear any existing errors once the file is valid
        }
        setValue(name, file!);
    };

    const handleGoBack = () => {
        navigate(-1); // Mengarahkan pengguna ke halaman sebelumnya
    };

    const methods = useForm<UpdateStaffFormI>({
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
        register,
        watch,
        setError,
        getValues,
        setValue,
        clearErrors,
        reset
    } = methods;

    const getFileValues = async () => {
        const files: Array<keyof typeof urls> = ["ktp", "kk", "ijazah", "transcript", "avatar"];
        // URL dari data untuk setiap file
        const urls = {
            ktp: data?.ktp ?? '',
            kk: data?.kk ?? '',
            ijazah: data?.ijazah ?? '',
            transcript: data?.transcript ?? '',
            avatar: data?.avatar ?? '',
        };
        // Mengambil file untuk setiap item dalam files
        const filePromises = files.map(async (fieldName) => {
            const fileUrl = urls[fieldName]; // TypeScript sekarang mengenali fieldName sebagai kunci dari urls
            if (fileUrl) {
                const file = await createFileFromUrl(fileUrl);
                setValue(fieldName, file); // Menyimpan setiap file di field yang sesuai
                return file;
            }
            return null;
        });
        // Tunggu semua file selesai diambil
        const fileResults = await Promise.all(filePromises);
        setDefaultLoading(false);
    };

    useEffect(() => {
        getFileValues();
        if (data && !getStaffLoading && !isError) {
            reset({ ...data, ktp: null, kk: null, ijazah: null, transcript: null, avatar: null });
            setValue('graduationYear', '2000');
        }
        setDefaultLoading(true);
    }, [data, getStaffLoading, isError, setValue]);
    return { methods, useForm, clearErrors, setError, handleSubmit, register, getValues, defaultLoading, errors, watch, setValue, handleGoBack, handleFileChange, onSubmit, control, getStaffLoading, updateStaffLoading, data, clickedButton };
};

export default useUpdateStaffForm;

