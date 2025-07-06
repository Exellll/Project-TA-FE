import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateStaffFormI, CreateStaffReqI } from "_interfaces/staff.interfaces";  // Pastikan import interface yang sesuai
import { useNavigate } from "react-router-dom";
import { useCreateStaffMutation, useListStaffQuery } from "_services/modules/staff";
import { uploadFile } from "_services/modules/file/index";
import { useState } from "react";
import { CustomShowToast } from "components/toasts/custom_toast";

const useCreateStaffForm = () => {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const { refetch } = useListStaffQuery({ search: "", limit: 10, page: 1 });
    const [createStaff, { isLoading, endpointName  }] = useCreateStaffMutation();
    //validasi file type
    const validFileExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif", "application/pdf"];
    const maxFileSize = 2 * 1024 * 1024;

    // Definisikan schema validasi menggunakan Yup
    const schema = yup
        .object().shape({
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
                .transform((value) => (value && value.value ? value.label : value)) // Ambil option.value
                .required("Pendidikan wajib dipilih"),

            birth_place: yup
                .string()
                .required("Tempat lahir wajib diisi"),

            birth_date: yup
                .date()
                .required("Tanggal lahir wajib diisi")
                .typeError("Format tanggal tidak valid"),

            graduationYear: yup
                .string()
                .matches(/^\d{4}$/, "Tahun lulus harus 4 karakter angka")
                .transform((value) => parseInt(value, 10))  // Mengubah ke number untuk validasi min/max
                .max(new Date().getFullYear(), "Tahun lulus tidak valid")
                .transform((value) => String(value))  // Mengubah kembali ke string setelah validasi
                .required("Tahun lulus wajib diisi"),

            gender: yup
                .string()
                .transform((value) => (value && value.value ? value.label : value)) // Ambil option.value
                .required("Jenis kelamin wajib dipilih"),

            phone_number: yup
                .string()
                .matches(/^[0-9]+$/, "Nomor telepon hanya boleh angka")
                .min(10, "Nomor telepon minimal 10 angka")
                .required("Nomor telepon wajib diisi"),

            email: yup
                .string()
                .email("Format email tidak valid")
                .required("Email wajib diisi"),

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

            address: yup
                .string()
                .required("Alamat wajib diisi"),

            join_date: yup
                .date()
                .required("Tanggal mulai bekerja wajib diisi")
                .typeError("Format tanggal tidak valid"),

            employment_status: yup
                .string()
                .transform((value) => (value && value.value ? value.label : value)) // Ambil option.value
                .required("Status pekerjaan wajib diisi"),

            major: yup
                .string()
                .transform((value) => (value && value.value ? value.label : value))
                .required(),

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
                    "Format file tidak valid, hanya mendukung jpeg, jpg, png,  gif, dan pdf",
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

    const onSubmit = async (data: CreateStaffFormI) => {
        let dataSubmit: CreateStaffReqI = {
            name: data.name,
            nip: data.nip,
            nik: data.nik,
            education_level: data.education_level,
            birth_place: data.birth_place,
            birth_date: data.birth_date,
            address: data.address,
            email: data.email,
            employment_status: data.employment_status,
            major: data.major,
            phone_number: data.phone_number,
            roles: data.roles,
            subjects: data.subjects,
            join_date: data.join_date,
            gender: data.gender,
            bidang_studi: data.bidang_studi,
            graduationYear: data.graduationYear,
            avatar: 'ds.jpg',
            ijazah: 'fdg.jpg',
            kk: 'sdf.jpg',
            ktp: 'haha.jpg',
            transcript: 'sfd.jpg'
        };

        // Buat array promises untuk upload file
        const fileUploadPromises = [
            data.avatar ? uploadFile('', data.avatar).then(fileName => dataSubmit.avatar = fileName) : Promise.resolve(),
            data.transcript ? uploadFile('', data.transcript).then(fileName => dataSubmit.transcript = fileName) : Promise.resolve(),
            data.kk ? uploadFile('', data.kk).then(fileName => dataSubmit.kk = fileName) : Promise.resolve(),
            data.ktp ? uploadFile('', data.ktp).then(fileName => dataSubmit.ktp = fileName) : Promise.resolve(),
            data.ijazah ? uploadFile('', data.ijazah).then(fileName => dataSubmit.ijazah = fileName) : Promise.resolve()
        ];

        try {
            // Tunggu semua file selesai diunggah
            await Promise.all(fileUploadPromises);
            // Kirim data ke server
            const response = await createStaff({ ...dataSubmit }).unwrap();
            CustomShowToast({ title: "Create Staff", description: "Berhasil", type: "success" });
            navigate(-1);
            await refetch();
        } catch (error) {
            CustomShowToast({ title: "Create Staff", description: "Gatal", type: "failed" });
        } finally {

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
    // Konfigurasi React Hook Form
    const methods = useForm<CreateStaffFormI>({
        mode: "onSubmit",
        resolver: yupResolver(schema),
        defaultValues: {
            ktp: null, // File masih diinisialisasi dengan null
            kk: null, // File masih diinisialisasi dengan null
            ijazah: null, // File masih diinisialisasi dengan null
            transcript: null, // File masih diinisialisasi dengan null
            avatar: null, // File masih diinisialisasi dengan null
            roles: []
        }
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
        register,
        watch,
        setValue,
        setError,
        clearErrors,
        getValues
    } = methods;

    return { methods, useForm, handleSubmit, register, errors, watch, setValue, handleGoBack, handleFileChange, onSubmit, control, isLoading, createStaff, showToast, toastMessage, setShowToast, getValues };
};

export default useCreateStaffForm;
