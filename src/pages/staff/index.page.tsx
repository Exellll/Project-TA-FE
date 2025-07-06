import { Params } from "_interfaces/class.interface";
import { Staff } from "_interfaces/staff.interfaces";
import { HeaderStaff } from "data/table/Staff";
import useShowDataStaff from "hooks/staff/useShowStaffForm";
import TableLayout from "layout/table";

export const staffRouteName = "staff";
export default function StaffPage(): React.ReactElement {
  const {
    setSearchParams,
    data,
    handleCreateStaff, 
    handleUpdateStaff, 
    handleDeletePopUp, 
    handleClosePopUp, 
    searchParams,
    setSelectedColumn, 
    isDeletePopupOpen, 
    fetchLoading,
  } = useShowDataStaff();
  return (
    <>
      <TableLayout<Staff, Params>
        title="Staff"
        data={data?.data ?? []}
        params={{ value: searchParams, setValue: setSearchParams }}
        headerTable={HeaderStaff}
        handleCreate={handleCreateStaff}
        setSelectedId={setSelectedColumn}
        remove={{ isOpen: isDeletePopupOpen, handlerClose: handleClosePopUp, handler: handleDeletePopUp }}
        handleEdit={handleUpdateStaff}
        loading={fetchLoading}
      />
    </>
  );
}
