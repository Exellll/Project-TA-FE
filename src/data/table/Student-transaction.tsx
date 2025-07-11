import { Columns } from "components/table/table";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { MdDelete, MdEdit, MdVerified, MdVisibility } from "react-icons/md";
import { Button } from "react-daisyui";
import { StudentBillI } from "_interfaces/student-bill.interfaces";
import { StudentTransactionI } from "_interfaces/student-transaction.interfaces";

export const HeaderStudentTransactionSPP = (
  handleDeletePopUp: (id: string) => void,
  setSelectedId: (id: string) => void,
  handleModalUpsert: () => void
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
    {
      fieldId: "student_bill.students.name", label: "Nama", render: (data) => (
        <p className="font-semibold">{data?.student_bill?.students?.name || "-"}</p>
      )
    },
    {
      fieldId: "student_bill.type", label: "Tipe Tagihan", render: (data) => (
        <p className="font-semibold">{data?.student_bill?.type}</p>
      )
    },
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
          className={`font-semibold ${data?.status === "pending" ? "text-yellow-600" : data?.status === "paid" ? "text-[#45BF43]" : data?.status === "not_paid" ? "text-gray-600" : "text-red-600"
            }`}
        >
          {data?.status == "pending"
            ? "Menunggu Verifikasi" : data?.status == "paid"
              ? "Lunas" : data?.status == "not_paid"
                ? "Belum Dibayar" : "Telat Bayar"}
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
              onClick={() => {
                setSelectedId(data?.id!);
                handleModalUpsert();
              }}
              onPointerEnterCapture={() => { }}
              onPointerLeaveCapture={() => { }}
              placeholder={""}
            >
              <label
                htmlFor="item-edit"
                className="flex cursor-pointer items-center gap-2 p-2 text-green-500 hover:bg-gray-100"
              >
                <MdVerified className="mt-1 me-3 h-4 w-4" />
                Verifikasi
              </label>
            </MenuItem>
          </MenuList>
        </Menu>
      ),
    },
  ];
};

export const HeaderStudentTransactionSPPPaid = (): Columns<StudentTransactionI>[] => {
  return [
    {
      fieldId: "checkbox",
      label: "checkbox",
    },
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "student_bill.students.name", label: "Nama", render: (data) => (
        <p className="font-semibold">{data?.student_bill?.students?.name || "-"}</p>
      )
    },
    {
      fieldId: "student_bill.type", label: "Tipe Tagihan", render: (data) => (
        <p className="font-semibold">{data?.student_bill?.type}</p>
      )
    },
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
          className={`font-semibold ${data?.status === "pending" ? "text-yellow-600" : data?.status === "paid" ? "text-[#45BF43]" : data?.status === "not_paid" ? "text-gray-600" : "text-red-600"
            }`}
        >
          {data?.status == "pending"
            ? "Menunggu Verifikasi" : data?.status == "paid"
              ? "Lunas" : data?.status == "not_paid"
                ? "Belum Dibayar" : "Telat Bayar"}
        </p>
      ),
    },
  ];
};

export const HeaderStudentTransactionEkskul = (
  handleDeletePopUp: (id: string) => void,
  setSelectedId: (id: string) => void,
  handleModalUpsert: () => void
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
    {
      fieldId: "student_bill.students.name", label: "Nama", render: (data) => (
        <p className="font-semibold">{data?.student_bill?.students.name}</p>
      )
    },
    {
      fieldId: "student_bill.type", label: "Tipe Tagihan", render: (data) => (
        <p className="font-semibold">{data?.student_bill?.type}</p>
      )
    },
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
          className={`font-semibold ${data?.status === "pending" ? "text-yellow-600" : data?.status === "paid" ? "text-[#45BF43]" : data?.status === "not_paid" ? "text-gray-600" : "text-red-600"
            }`}
        >
          {data?.status == "pending"
            ? "Menunggu Verifikasi" : data?.status == "paid"
              ? "Lunas" : data?.status == "not_paid"
                ? "Belum Dibayar" : "Telat Bayar"}
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
              onClick={() => {
                setSelectedId(data?.id!);
                handleModalUpsert();
              }}
              onPointerEnterCapture={() => { }}
              onPointerLeaveCapture={() => { }}
              placeholder={""}
            >
              <label
                htmlFor="item-edit"
                className="flex cursor-pointer items-center gap-2 p-2 text-green-500 hover:bg-gray-100"
              >
                <MdVerified className="mt-1 me-3 h-4 w-4" />
                Verifikasi
              </label>
            </MenuItem>            
          </MenuList>
        </Menu>
      ),
    },
  ];
};

export const HeaderStudentTransactionEkskulPaid = (): Columns<StudentTransactionI>[] => {
  return [
    {
      fieldId: "checkbox",
      label: "checkbox",
    },
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "student_bill.students.name", label: "Nama", render: (data) => (
        <p className="font-semibold">{data?.student_bill?.students?.name || "-"}</p>
      )
    },
    {
      fieldId: "student_bill.type", label: "Tipe Tagihan", render: (data) => (
        <p className="font-semibold">{data?.student_bill?.type}</p>
      )
    },
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
          className={`font-semibold ${data?.status === "pending" ? "text-yellow-600" : data?.status === "paid" ? "text-[#45BF43]" : data?.status === "not_paid" ? "text-gray-600" : "text-red-600"
            }`}
        >
          {data?.status == "pending"
            ? "Menunggu Verifikasi" : data?.status == "paid"
              ? "Lunas" : data?.status == "not_paid"
                ? "Belum Dibayar" : "Telat Bayar"}
        </p>
      ),
    },
  ];
};
