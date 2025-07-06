import { Columns } from "components/table/table";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";
import { Button } from "react-daisyui";
import { StudentI } from "_interfaces/student.interfaces";
import moment from "moment";
import { useState } from "react";

export const HeaderStudent = (
  handleDeletePopUp: () => void,
  handleEdit: (id: string) => void
): Columns<StudentI>[] => {
  return [
    {
      fieldId: "checkbox",
      label: "checkbox",
    },
    {
      fieldId: "index",
      label: "No",
    },
    { fieldId: "nisn", label: "NISN" },
    { fieldId: "name", label: "Nama" },
    {
      fieldId: "createdAt",
      label: "Tahun Masuk",
      render: (data) => (
        <p className={`font-semibold`}>
          {moment(data?.createdAt).format("YYYY")}
        </p>
      ),
    },
    { fieldId: "gender", label: "Jenis Kelamin" },
    { fieldId: "", label: "Kelas" },

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
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <MenuItem
              placeholder={""}
              className="p-0"
              onClick={() => {
                handleEdit(data?.id!);
              }}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <label
                htmlFor="item-1"
                className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100"
              >
                <MdEdit className="mt-1 me-3 h-4 w-4" />
                Edit
              </label>
            </MenuItem>
            <MenuItem
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              placeholder={""}
              className="p-0"
              onClick={handleDeletePopUp}
            >
              <label
                htmlFor="item-1"
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

export const HeaderStudentDraft = (
  handleDeletePopUp: () => void,
  handleEdit: (id: string) => void
): Columns<StudentI>[] => {
  return [
    {
      fieldId: "checkbox",
      label: "checkbox",
    },
    {
      fieldId: "index",
      label: "No",
    },
    { fieldId: "nisn", label: "NISN" },
    { fieldId: "name", label: "Nama" },
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
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <MenuItem
              placeholder={""}
              className="p-0"
              onClick={() => {
                handleEdit(data?.id!);
              }}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <label
                htmlFor="item-1"
                className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100"
              >
                <MdEdit className="mt-1 me-3 h-4 w-4" />
                Draft
              </label>
            </MenuItem>
            <MenuItem
              placeholder={""}
              className="p-0"
              onClick={handleDeletePopUp}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <label
                htmlFor="item-1"
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
