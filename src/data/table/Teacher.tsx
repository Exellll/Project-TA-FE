import { Columns } from "components/table/table";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";
import { Button } from "react-daisyui";
import { SubjectsI } from "_interfaces/subject.interfaces";
import { useGetSubjectByIdQuery } from "_services/modules/subject";
import { TeacherI } from "_interfaces/teachers.interfaces";

export const HeaderTeacher = (
  handleDeletePopUp: (id: string) => void,
  handleModalUpsert: (id: string) => void
): Columns<TeacherI>[] => {
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
    { fieldId: "nip", label: "NIP" },
    {
      fieldId: "subjects",
      label: "Mata Pelajaran",
      render: (data) => (
        <div className="flex flex-wrap gap-1">
          {data?.subjects?.length! > 0 ? (
            data?.subjects.map((item, i) => (
              <span
                key={i}
                className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded"
              >
                {item.title}
              </span>
            ))
          ) : (
            <span className="text-gray-500 italic text-sm">Tidak ada</span>
          )}
        </div>
      ),
    },
    { fieldId: "email", label: "Email" },
    { fieldId: "no_telepon", label: "No Telepon" },
    { fieldId: "address", label: "Alamat" },
    { fieldId: "gender", label: "Jenis Kelamin" },
    { fieldId: "birth_date", label: "Tanggal Lahir" },
    {
      fieldId: "foto_url",
      label: "Foto",
      render: (data) => (
        <img
          src={data?.foto_url || "/images/avatar.png"}
          alt="Foto Guru"
          className="h-10 w-10 rounded-full object-cover"
        />
      ),
    },
    {
      fieldId: "status",
      label: "Status",
      render: (data) => (
        <p
          className={`font-semibold ${data?.status === true ? "text-[#45BF43]" : "text-[#FF0000]"
            }`}
        >
          {data?.status === true ? "active" : "inactive"}
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
