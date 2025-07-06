import { Class, Params } from "_interfaces/class.interface";
import ClassModal from "components/upsertModal/upsertModalClass";
import { HeaderClass } from "data/table/Class";
import useClassManagement from "hooks/class/useClassManagement";
import TableLayout from "layout/table";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const classRouteName = "/class";
export default function ClassPage(): React.ReactElement {
  const [selectedColumn, setSelectedColumn] = useState<string[]>([]);
  const location = useLocation();

  const {
    listData,
    searchParams,
    setSearchParams,
    isDeletePopupOpen,
    handleClosePopUp,
    handleDeletePopUp,
    isFetchLoading,
    handleModalUpsert,
    modalUpsert,
    refetch,
    handleCreateStart,
    handleUpdateStart,
    selectedId,
    type,
  } = useClassManagement();

  useEffect(() => {
    if (location.state?.shouldRefetch) {
      refetch(); // Trigger the refetch
    }
  }, [location.state]);

  return (
    <>
      <TableLayout<Class, Params>
        title="Class"
        data={listData?.data ?? []}
        params={{ value: searchParams, setValue: setSearchParams }}
        headerTable={HeaderClass}
        handleCreate={handleCreateStart} // Memanggil handler untuk membuat data baru
        setSelectedId={setSelectedColumn}
        remove={{
          isOpen: isDeletePopupOpen,
          handlerClose: handleClosePopUp,
          handler: handleDeletePopUp,
        }}
        handleEdit={handleUpdateStart} // Memanggil handler untuk memulai update data
        loading={isFetchLoading}
        modal={
          <ClassModal
            handler={handleModalUpsert}
            isOpen={modalUpsert}
            type={type}
            id={selectedId}
          />
        }
      />
    </>
  );
}
