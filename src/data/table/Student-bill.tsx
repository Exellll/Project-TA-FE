import { Columns } from "components/table/table";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";
import { Button } from "react-daisyui";
import { StudentBillI } from "_interfaces/student-bill.interfaces";

export const HeaderStudentBill = (
  handleDeletePopUp: (id: string) => void,
  handleModalUpsert: (id: string) => void
): Columns<StudentBillI>[] => {
  return [
    {
      fieldId: "checkbox",
      label: "checkbox",
    },
    {
      fieldId: "index",
      label: "No",
    },
    { fieldId: "students.name", label: "Nama", render: (data) => (<p className="font-semibold">{data?.students?.name || '-'}</p>) },
    { fieldId: "type", label: "Tipe Tagihan" },
    { fieldId: "due_date", label: "Tanggal Jatuh Tempo" },
    {
      fieldId: "bill_amount",
      label: "Jumlah Tagihan",
      render: (data: any) => {
        const amount = Number(data?.bill_amount || 0);
        return (
          <p className="font-bold">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(amount)}
          </p>
        );
      },
    },
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
              onClick={() => handleModalUpsert(data?.id!)}
              onPointerEnterCapture={() => { }}
              onPointerLeaveCapture={() => { }}
              placeholder={""}
            >
              <label
                htmlFor="item-edit"
                className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100"
              >
                <MdEdit className="mt-1 me-3 h-4 w-4" />
                Edit
              </label>
            </MenuItem>
            <MenuItem
              onPointerEnterCapture={() => { }}
              onPointerLeaveCapture={() => { }}
              placeholder={""}
              className="p-0"
              onClick={() => handleDeletePopUp(data?.id!)}
            >
              <label
                htmlFor="item-delete"
                className="flex cursor-pointer items-center gap-2 p-2 text-red-800 hover:bg-gray-100"
              >
                <MdDelete className="mt-1 me-3 h-4 w-4" />
                Delete
              </label>
            </MenuItem>
          </MenuList>
        </Menu>
      ),
    },
  ];
};
