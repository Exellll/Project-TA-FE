import { yupResolver } from "@hookform/resolvers/yup";
import { ListClassReqI, CreateClassReqI } from "_interfaces/class.interface";
import { useCreateClassMutation, useDeleteClassMutation, useGetClassByIdQuery, useListClassQuery, useUpdatedClassMutation } from "_services/modules/class";
import { useDeleteStaffMutation } from "_services/modules/staff";
import { CustomShowToast } from "components/toasts/custom_toast";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const useClassManagement = (idClass?: string | '',handler?: () => void) => {
    // State untuk mengelola modal dan proses delete
    const [idDelete, setIdDelete] = useState('');
    const [modalUpsert, setUpsertModal] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState<string[]>([]);
    const [type, setType] = useState<"create" | "update"> ("create");
    const [selectedId, setSelectedId] = useState<string>("");
    // Query untuk mengambil data kelas
    const [searchParams, setSearchParams] = useState<ListClassReqI>({
        search: "",
        limit: 10,
        page: 1,
        status: "",
        type: "",
        year: ""
    });
    

    const { data: listData, refetch, isLoading: isFetchLoading } = useListClassQuery(searchParams);

    // Query untuk mengambil data detail kelas berdasarkan id
    const { data: selectedData } = useGetClassByIdQuery({ id: idClass ?? '??' });

    // Mutation untuk delete
    const [deleteClass, { isLoading: deletedLoading }] = useDeleteClassMutation();

    // Mutation untuk create dan update class
    const [createClass, { isLoading: isLoadingCreate }] = useCreateClassMutation();
    const [updateClass, { isLoading: isLoadingUpdate }] = useUpdatedClassMutation();

    // Schema validasi untuk form
    const schema = yup.object().shape({
        kelas: yup.string().max(5, "kelas minimal 1 karakter").required("kelas wajib diisi"),
        indexKelas: yup.string().max(1, "index kelas Max 1 karakter").required("index kelas wajib diisi"),
        capacity: yup.number().required("Nama wajib diisi")
    }).required();

    // react-hook-form untuk mengelola form create/update
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        setValue
    } = useForm<CreateClassReqI>({
        resolver: yupResolver(schema),
    });

    // Handle untuk mengelola modal upsert (create/update)
    const handleModalUpsert = () => {
        setUpsertModal(!modalUpsert);
    }

    // Handle untuk membuat data kelas baru
    const _CreateClass = async (data: CreateClassReqI) => {
        try {
            const response = await createClass({ ...data }).unwrap();
            await refetch();
            handler && handler();
            CustomShowToast({ title: "Create Class", description: "Berhasil", type: "success" });
        } catch (error) {
            CustomShowToast({ title: "Create Class", description: "Gagal", type: "failed" });
        } finally {
            handleModalUpsert();
        }
    }

    // Handle untuk mengupdate data kelas
    const _UpdateClass = async (data: CreateClassReqI) => {
        try {
            data.id = idClass;
            const response = await updateClass(data).unwrap();
            CustomShowToast({ title: "Update Class", description: "Berhasil", type: "success" });
            handler && handler();
            await refetch();
            handleModalUpsert();
        } catch (error) {
            CustomShowToast({ title: "Update Class", description: "Gagal", type: "failed" });
        }
    }

    // Handler form submission untuk create dan update
    const handleCreate = handleSubmit(_CreateClass);
    const handleUpdate = handleSubmit(_UpdateClass);

    // Handle untuk membuka/tutup modal delete
    const handleDeletePopUp = async (id?: string) => {
        if (id) {
            setIdDelete(id);
        }
        if (isDeletePopupOpen && idDelete) {
            try {
                await deleteClass({ id: idDelete }).unwrap();
                CustomShowToast({ title: "Delete Class", description: "Berhasil", type: "success" });
            } catch (err) {
                CustomShowToast({ title: "Delete Class", description: "Gagal", type: "failed" });
            }
            await refetch();
        }
        setIsDeletePopupOpen(!isDeletePopupOpen);
    };

    // Handle untuk menutup popup delete
    const handleClosePopUp = () => {
        setIsDeletePopupOpen(!isDeletePopupOpen);
    }

      // Handle untuk memulai update data
  const handleUpdateStart = async (id: string) => {
    setType("update");
    handleModalUpsert();
    setSelectedId(id);
  };

  // Handle untuk memulai create data baru
  const handleCreateStart = () => {
    setType("create");
    handleModalUpsert();
    setSelectedId("");
  };

    useEffect(() => {
        if (selectedData) {
            const input = selectedData.name ?? '-';
            const [kelas, indexKelas] = input.split('-');
            setValue("kelas", kelas);
            setValue("indexKelas", indexKelas);
            setValue("capacity", selectedData.capacity);
        }
    }, [selectedData]);

    return {
        listData,
        searchParams,
        setSearchParams,
        setSelectedColumn,
        isDeletePopupOpen,
        handleClosePopUp,
        handleDeletePopUp,
        isFetchLoading,
        handleModalUpsert,
        modalUpsert,
        refetch,
        selectedData,
        // Form props
        register,
        reset,
        isLoadingCreate,
        isLoadingUpdate,
        control,
        errors,
        handleCreateStart,
        handleUpdateStart,
        handleCreate,
        handleUpdate,
        selectedId,
        type
    };
}

export default useClassManagement;
