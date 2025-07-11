import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "_services/errorHandler";
import { Params } from "_interfaces/class.interface";
import { useCreateAnnouncementMutation, useDeleteAnnouncementMutation, useGetListAnnouncementQuery, useUpdateAnnouncementMutation } from "_services/modules/announcement";
import { AnnouncementFormsI, AnnouncementI } from "_interfaces/announcement.interfaces";
import { title } from "process";
import { uploadFile, uploadFileLocal } from "_services/modules/file";
import { toast } from "react-toastify";


const useAnnouncementForm = (searchParams: Params, handler?: () => void, id?: string) => {
    const [create, { isLoading }] = useCreateAnnouncementMutation();
    const [update, { isLoading: isLoadingUpdate }] = useUpdateAnnouncementMutation();
    const [deleteAnnouncement, { isLoading: isLoadingDeleteAnnouncement }] = useDeleteAnnouncementMutation();

    const { data, refetch } = useGetListAnnouncementQuery(searchParams, { skip: !searchParams.page && !searchParams.limit });

    const navigate = useNavigate();

    const schema = yup
        .object({
            title: yup.string().required("Judul pengumuman harus diisi"),
            content: yup.string().required("Konten pengumuman harus diisi"),
            type: yup.string().required("Tipe pengumuman harus diisi"),
            status: yup.string().oneOf(["active", "inactive"]).required("Status harus diisi"),
        }).required();

    const {
        handleSubmit,
        formState: { errors },
        register,
        watch,
        reset,
        control,
        setValue,
    } = useForm<AnnouncementFormsI>({
        mode: "onSubmit",
        resolver: yupResolver(schema),
        defaultValues: {
            title: "",
            content: "",
            type: "",
            attachment_url: "",
            status: "active",
            file: undefined,
        }
    });

    const _CreateAnnouncement = async (data: AnnouncementFormsI) => {
        try {
            let attachment_url = '';
            if (data.file) {
                attachment_url = await uploadFileLocal(data.file); // simpan ke storage lokal
                console.log("Attachment URL:", attachment_url);
            }

            await create({
                title: data.title,
                content: data.content,
                type: data.type,
                attachment_url,
                status: data.status === "active" ? true : false
            }).unwrap();

            handler && handler();
            toast.success("Pengumuman berhasil dibuat");
            refetch();
            reset({});
        } catch (error) {
            errorHandler(error);
        }
    };

    const _UpdateAnnouncement = async (data: AnnouncementFormsI) => {
        try {
            let attachment_url = data.attachment_url || '';
            if (data.file && (!data.attachment_url || data.file instanceof File)) {
                attachment_url = await uploadFileLocal(data.file);
            }


            await update({
                id: id!,
                title: data.title,
                content: data.content,
                type: data.type,
                attachment_url,
                status: data.status === "active" ? true : false
            }).unwrap();

            handler && handler();
            toast.success("Pengumuman berhasil diperbarui");
            refetch();
            reset({});
        } catch (error) {
            errorHandler(error);
        }
    };

    // const _CreateAnnouncement = async (data: AnnouncementFormsI) => {
    //     try {
    //         const res = await create({ ...data, status: data.status === "active" ? true : false }).unwrap();
    //         if (res) {
    //             handler && handler();
    //             refetch();
    //             reset({});
    //         }
    //     } catch (error) {
    //         errorHandler(error);
    //     }
    // };

    // const _UpdateAnnouncement = async (data: AnnouncementFormsI) => {
    //     try {
    //         const res = await update({ ...data, id: id!, status: data.status === "active" ? true : false }).unwrap();
    //         if (res) {
    //             handler && handler();
    //             refetch();
    //             reset({});
    //         }
    //     } catch (error) {
    //         errorHandler(error);
    //     }
    // };

    const _DeleteAnnouncement = async (id: string) => {
        try {
            const res = await deleteAnnouncement(id).unwrap();
            if (res) {
                refetch();
                toast.success("Pengumuman berhasil dihapus");
            }
        } catch (error) {
            errorHandler(error);
        }
    }

    const handleCreate = handleSubmit(_CreateAnnouncement);
    const handleUpdate = handleSubmit(_UpdateAnnouncement);
    const handleDelete = (id: string) => {
        _DeleteAnnouncement(id);
    };

    return { handleCreate, handleUpdate, handleDelete, register, errors, watch, isLoading, isLoadingUpdate, announcements: data, reset, control, setValue };
};

export default useAnnouncementForm;


