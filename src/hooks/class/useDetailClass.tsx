import { yupResolver } from "@hookform/resolvers/yup";
import { ListClassReqI, CreateClassReqI } from "_interfaces/class.interface";
import { useAddHomeroomMutation, useCreateClassMutation, useDeleteHomeroomMutation, useGetClassByIdQuery, useListClassQuery, useUpdatedClassMutation } from "_services/modules/class";
import { useDeleteStaffMutation } from "_services/modules/staff";
import { CustomShowToast } from "components/toasts/custom_toast";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const useDetailClass = (idClass?: string | '') => {
    // State untuk mengelola modal dan proses delete
    const [idDelete, setIdDelete] = useState('');
    const { data : dataClass , refetch: refetchClass} = useGetClassByIdQuery({ id: idClass ?? '??' });
    const { refetch: listClassRefetch } = useListClassQuery({ limit: 10, page: 1, search: "" });
    const [] = useAddHomeroomMutation();
    const [] = useDeleteHomeroomMutation();
    const [modalUpsert, setUpsertModal] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState<string[]>([]);

    // Query untuk mengambil data kelas
    const [searchParams, setSearchParams] = useState<ListClassReqI>({
        search: "",
        limit: 10,
        page: 1,
        status: "",
        type: "",
        year: ""
    });
    const { data: listData, isLoading: isFetchLoading } = useListClassQuery(searchParams);

    // Query untuk mengambil data detail kelas berdasarkan id
    const { data: selectedData } = useGetClassByIdQuery({ id: idClass ?? '??' });

    // Schema validasi untuk form
    const schemaSubject = yup.object().shape({
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
        resolver: yupResolver(schemaSubject),
    });

    return {
        listData,
        searchParams,
        setSearchParams,
        setSelectedColumn,
        dataClass,
        register,
        refetchClass,
        listClassRefetch
    };
}

export default useDetailClass;
