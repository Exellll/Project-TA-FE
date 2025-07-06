import { useDeleteStaffMutation, useListStaffQuery } from "_services/modules/staff";
import { CustomShowToast } from "components/toasts/custom_toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ToastProps {
    isOpen : boolean;
    message: string;
    status: 'success' | 'error' | 'info' | 'warning';
    title?: string;
  }

const useShowDataStaff = () => {
    const navigate = useNavigate();
    const [useDelete, {isLoading: deletedLoading}] = useDeleteStaffMutation();
    const [idDelete, setIdDelete] = useState('');
    const [toastMessage, setToastMessage] = useState<ToastProps>();
    const [searchParams, setSearchParams] = useState({
        search: "",
        limit: 10,
        page: 1,
    });

    const { data, refetch, isLoading: fetchLoading } = useListStaffQuery(searchParams);

    const [selectedColumn, setSelectedColumn] = useState<string[]>([]);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const handleDeletePopUp = async (id?: string) => {
        if (id) {
            setIdDelete(id!);
        }
   
        if (isDeletePopupOpen) {
            await useDelete({ id: idDelete }).unwrap().then((response) => {
                CustomShowToast({ title: "Delete Staff", description: "Berhasil", type: "success" });
            }).catch((err) => {
                CustomShowToast({ title: "Delete Staff", description: "Gagal", type: "failed" });
            });
            await refetch();
        }
        setIsDeletePopupOpen(!isDeletePopupOpen);
    };

    const handleClosePopUp = () => {
        setIsDeletePopupOpen(!isDeletePopupOpen);
    }
    const handleCreateStaff = (): void => {
        void navigate("/staff/create");
    };

    const handleUpdateStaff = (id: string): void => {
        void navigate(`/staff/update/${id}`);
    };

    return { setSearchParams, data, refetch, handleCreateStaff, handleUpdateStaff, handleDeletePopUp, searchParams, setSelectedColumn, isDeletePopupOpen, fetchLoading, toastMessage, setToastMessage, deletedLoading, handleClosePopUp }
}

export default useShowDataStaff;