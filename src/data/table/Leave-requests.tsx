import { Columns } from "components/table/table";
import {
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
} from "@material-tailwind/react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Button } from "react-daisyui";
import { LeaveRequestI } from "_interfaces/leave-requests.interface";

export const HeaderLeaveRequest = (
    handleRejectPopUp: (id: string) => void,
    handleApprovePopUp: (id: string) => void,
    handleModalUpsert?: (id: string) => void
): Columns<LeaveRequestI>[] => {
    return [
        {
            fieldId: "checkbox",
            label: "checkbox",
        },
        {
            fieldId: "index",
            label: "No",
        },
        { fieldId: "type", label: "Tipe Izin" },
        { fieldId: "description", label: "Deskripsi" },
        // { fieldId: "attachment", label: "Bukti" },
        { fieldId: "startedAt", label: "Tanggal Mulai" },
        { fieldId: "endedAt", label: "Tanggal Selesai" },
        { fieldId: "reason", label: "Alasan" },
        { fieldId: "status", label: "Status" },
        // {
        //   fieldId: "status",
        //   label: "Status",
        //   render: (data) => (
        //     <p
        //       className={`font-semibold ${
        //         data?.status === true ? "text-[#45BF43]" : "text-[#FF0000]"
        //       }`}
        //     >
        //       {data?.status === true ? "active" : "inactive"}
        //     </p>
        //   ),
        // },
        {
            fieldId: "id",
            label: "",
            render: (data) => (
                <Menu>
                    <MenuHandler>
                        <Button
                            size="sm"
                            className="rounded text-center text-lg hover:bg-transparent text-san-juan border-none"
                        >
                            ...
                        </Button>
                    </MenuHandler>
                    <MenuList
                        placeholder=""
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                    >
                        <MenuItem
                            className="p-0"
                            onClick={() => handleApprovePopUp(data?.id!)}
                            onPointerEnterCapture={() => { }}
                            onPointerLeaveCapture={() => { }}
                            placeholder={""}
                        >
                            <label
                                htmlFor="item-edit"
                                className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100 text-green-500"
                            >
                                {/* <MdEdit className="mt-1 me-3 h-4 w-4" /> */}
                                Approve
                            </label>
                        </MenuItem>
                        <MenuItem
                            className="p-0"
                            onClick={() => handleRejectPopUp(data?.id!)}
                            onPointerEnterCapture={() => { }}
                            onPointerLeaveCapture={() => { }}
                            placeholder={""}
                        >
                            <label
                                htmlFor="item-edit"
                                className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100 text-red-500"
                            >
                                {/* <MdEdit className="mt-1 me-3 h-4 w-4" /> */}
                                Reject
                            </label>
                        </MenuItem>
                        {/* <MenuItem
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
              placeholder={""}
              className="p-0"
              onClick={handleDeletePopUp}
            >
              <label
                htmlFor="item-delete"
                className="flex cursor-pointer items-center gap-2 p-2 text-red-800 hover:bg-gray-100"
              >
                <MdDelete className="mt-1 me-3 h-4 w-4" />
                Delete
              </label>
            </MenuItem> */}
                    </MenuList>
                </Menu>
            ),
        },
    ];
};
