import { Staff } from '_interfaces/staff.interfaces';
import { useAddHomeroomMutation, useDeleteHomeroomMutation } from '_services/modules/class';
import DeletePopUp from 'components/modal/other/Delete';
import DetailClassModal from 'components/upsertModal/upsertModalDetailClass';
import React, { useState, useEffect } from 'react';
import { FiUserPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

interface ClassTeacherProfileProps {
    staff?: Staff;
    classId: string;
    refetch?: () => void;
}

export const ClassTeacherProfile: React.FC<ClassTeacherProfileProps> = ({ staff, classId, refetch }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [remove, setRemove] = useState(false); // Control state for DeletePopUp
    const [isLoading, setIsLoading] = useState(true); // State for loading
    const [deleteHomeroom, { data }] = useDeleteHomeroomMutation();
    const [addHomeRoom] = useAddHomeroomMutation();

    useEffect(() => {
        if (staff !== undefined) {
            setIsLoading(false);
        }
    }, [staff]);

    // Fungsi untuk membuka dan menutup modal tambah wali kelas
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    // Fungsi untuk membuka dan menutup DeletePopUp
    const handleOpenDeletePopUp = () => setRemove(true);
    const handleCloseDeletePopUp = () => setRemove(false);

    const handleDeleteStaff = async () => {
        try {
            if (classId) {
                const response = await deleteHomeroom({ id: classId });
            } else {
                toast.error('Staff ID not found');
            }
            toast.success('Berhasil menghapus wali kelas');
            if (refetch) {
                refetch();
            }
        } catch (e) {
            toast.error('Gagal menghapus wali kelas');
            console.error(e);
        } finally {
            handleCloseDeletePopUp();
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-between w-full h-[400px]">
            <h2 className="text-xl font-bold mb-4">Wali Kelas</h2>

            {isLoading ? (
                // Tampilkan skeleton loading ketika data sedang dimuat
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <div className="w-3/4 h-[200px] mb-4 bg-gray-200 animate-pulse rounded-lg"></div>
                    <div className="w-1/2 h-6 bg-gray-200 animate-pulse rounded"></div>
                    <div className="w-1/4 h-8 bg-gray-300 animate-pulse rounded mt-4"></div>
                </div>
            ) : staff ? (
                // Jika ada staff, tampilkan informasi dan avatar
                <>
                    {staff.avatar ? (
                        <img
                            src={staff.avatar}
                            alt={staff.name}
                            className=" w-3/4 h-[200px] mb-4 object-cover shadow-md rounded-lg"
                        />
                    ) : (
                        <div className="w-[80%] h-[200px] rounded-3xl bg-gray-200 mb-4"></div>
                    )}
                    <h3 className="text-lg font-semibold mb-2 text-center">{staff.name}</h3>
                    <button
                        onClick={handleOpenDeletePopUp} // Membuka DeletePopUp
                        className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all duration-200"
                    >
                        Hapus
                    </button>
                </>
            ) : (
                // Jika tidak ada staff, tampilkan tombol dan informasi penanda
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <FiUserPlus size={48} className="text-gray-400" />
                    <p className="text-gray-500 text-sm">
                        Belum ada wali kelas terdaftar untuk kelas ini.
                    </p>
                    <button
                        onClick={handleOpenModal}
                        className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-all duration-200"
                    >
                        Tambah Wali Kelas
                    </button>
                </div>
            )}

            {/* Modal untuk menambahkan wali kelas */}
            <DetailClassModal
                isOpen={isModalOpen}
                type="create"
                handler={handleCloseModal}
                id={classId ?? ''}
                refetch={ refetch!}
            />

            {/* DeletePopUp untuk konfirmasi penghapusan wali kelas */}
            <DeletePopUp
                isOpen={remove}
                data={`${staff?.name} From This Class `}
                onClose={handleCloseDeletePopUp} // Menutup DeletePopUp
                onEdit={handleDeleteStaff}
                menu={'Wali Kelas'}
            />
        </div>
    );
};
