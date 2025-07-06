import { Staff } from "_interfaces/staff.interfaces";
import { Columns } from "components/table/table";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { MdDelete, MdUpdate, MdVisibility } from "react-icons/md";
import { Button } from "react-daisyui";
export const HeaderStaff = (
  handleDeletePopUp: (id: string) => void,
  handleUpdate: (id: string) => void
): Columns<Staff>[] => {
  return [
    {
      fieldId: "checkbox",
      label: "checkbox",
    },
    {
      fieldId: "index",
      label: "No",
    },
    { fieldId: "name", label: "Nama" },
    { fieldId: "education_level", label: "Pendidikan" },
    { fieldId: "employment_status", label: "Status" },
    {
      fieldId: "role_id",
      label: "Tugas Tambahan",
      render: (data) => <p className="font-semibold">''</p>,
    },
    {
      fieldId: "id",
      label: "Tahun Kerja",
      render: (data) => <p className="font-semibold">{"2023"}</p>,
    },
    {
      fieldId: "school_id",
      label: "Wali Kelas",
      render: (data) => <p className="font-semibold">{data?.major}</p>,
    },
    {
      fieldId: "id",
      label: "",
      render: (data) => (
        <>
          <Menu>
            <MenuHandler>
              <Button
                size="sm"
                className="rounded text-center text-lg hover:bg-transparent text-san-juan border-none"
                onClick={() => {}}
              >
                ...
              </Button>
            </MenuHandler>
            <MenuList
              placeholder={""}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <MenuItem
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
                placeholder={""}
                className="p-0"
                onClick={() => {}}
              >
                <label
                  htmlFor="item-1"
                  className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100"
                >
                  <MdVisibility className="mt-1 me-3 h-4 w-4" />
                  View
                </label>
              </MenuItem>
              <MenuItem
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
                placeholder={""}
                className="p-0"
                onClick={() => {
                  handleUpdate(data!.id);
                }}
              >
                <label
                  htmlFor="item-2"
                  className="flex cursor-pointer items-center gap-2 p-2 text-red-800 hover:bg-gray-100"
                >
                  <MdUpdate className="mt-1 me-3 h-4 w-4" />
                  Edit
                </label>
              </MenuItem>
              <MenuItem
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
                placeholder={""}
                className="p-0"
                onClick={() => handleDeletePopUp(data!.id)}
              >
                <label
                  htmlFor="item-3"
                  className="flex cursor-pointer items-center gap-2 p-2 text-red-800 hover:bg-gray-100"
                >
                  <MdDelete className="mt-1 me-3 h-4 w-4" />
                  Delete
                </label>
              </MenuItem>
            </MenuList>
          </Menu>
        </>
      ),
    },
  ];
};
