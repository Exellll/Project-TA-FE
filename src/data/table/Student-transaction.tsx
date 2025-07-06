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
import { StudentTransactionI } from "_interfaces/student-transaction.interfaces";

export const HeaderStudentTransactionSPP = (
  handleDeletePopUp: (id: string) => void,
  handleModalUpsert: (id: string) => void
): Columns<StudentTransactionI>[] => {
  return [
    {
      fieldId: "checkbox",
      label: "checkbox",
    },
    {
      fieldId: "index",
      label: "No",
    },
    { fieldId: "student_bill.students.name", label: "Nama", render: (data) => (
      <p className="font-semibold">{data?.student_bill?.students?.name || "-"}</p>
    )},
    { fieldId: "student_bill.type", label: "Tipe Tagihan", render: (data) => (
      <p className="font-semibold">{data?.student_bill?.type}</p>
    )},
    { fieldId: "student_bill.due_date", label: "Tanggal Jatuh Tempo", render: (data) => (<p>{data?.student_bill?.due_date}</p>) },
    {
      fieldId: "student_bill.bill_amount",
      label: "Jumlah Tagihan",
      render: (data) => {
        const amount = Number(data?.student_bill?.bill_amount || 0);
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
    {
      fieldId: "status",
      label: "Status",
      render: (data) => (
        <p
          className={`font-semibold ${
            data?.status === "pending" ? "text-[#FF0000]" : "text-[#45BF43]"
          }`}
        >
          {data?.status}
        </p>
      ),
    },
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

export const HeaderStudentTransactionEkskul = (
  handleDeletePopUp: (id: string) => void,
  handleModalUpsert: (id: string) => void
): Columns<StudentTransactionI>[] => {
  return [
    {
      fieldId: "checkbox",
      label: "checkbox",
    },
    {
      fieldId: "index",
      label: "No",
    },
    { fieldId: "student_bill.students.name", label: "Nama", render: (data) => (
      <p className="font-semibold">{data?.student_bill?.student_id}</p>
      )},
    { fieldId: "student_bill.type", label: "Tipe Tagihan", render: (data) => (
      <p className="font-semibold">{data?.student_bill?.type}</p>
      )},
    { fieldId: "student_bill.due_date", label: "Tanggal Jatuh Tempo", render: (data) => (<p>{data?.student_bill?.due_date}</p>) },
    {
      fieldId: "student_bill.bill_amount",
      label: "Jumlah Tagihan",
      render: (data) => {
        const amount = Number(data?.student_bill?.bill_amount || 0);
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
    {
      fieldId: "status",
      label: "Status",
      render: (data) => (
        <p
          className={`font-semibold ${
            data?.status === "pending" ? "text-[#FF0000]" : "text-[#45BF43]"
          }`}
        >
          {data?.status}
        </p>
      ),
    },
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
