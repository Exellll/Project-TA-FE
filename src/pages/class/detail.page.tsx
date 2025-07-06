import Container from "layout/container";
import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ClassTeacherProfile } from "./section/profile.section";
import { SubjectList } from "./section/subject.list.section";
import { StudentList } from "./section/student.list.section";
import ScheduleTable from "./section/schedule.table.section";
import { useParams, useNavigate } from "react-router-dom";
import useDetailClass from "hooks/class/useDetailClass";

const ClassTitle = () => (
  <h2 className="font-bold text-xl">Data Kelas 12 IPS 3</h2>
);

export const detailClassRouteName = "detail/:id";

const studentData = [
  { nis: "123456789", name: "Dionisius Aditya Nugraha" },
  { nis: "123456790", name: "Sobari Kustriadi" },
  { nis: "123456791", name: "Raihan" },
  { nis: "123456792", name: "Tyas Rahmani" },
]; // dummy siswa

export const DetailClassPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dataClass, refetchClass } = useDetailClass(id);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mx-auto p-8 border-2">
        <div className="grid grid-cols-10 gap-6">
          {/* Title */}
          <div className="col-span-10 mb-6">
            <ClassTitle />
          </div>
          {/* Teacher Profile */}
          <div className="col-span-2">
            <ClassTeacherProfile
              staff={dataClass?.homeroom}
              classId={id ?? ""}
              refetch={refetchClass}
            />
          </div>
          {/* Schedule */}
          <div className="col-span-8">
            <ScheduleTable initialSchedule={[]} />
          </div>
          {/* Subject List */}
          <div className="col-span-5">
            <SubjectList class_id={id ?? ""} />
          </div>
          {/* Student List */}
          <div className="col-span-5">
            <StudentList class_id={id ?? ""} />
          </div>
        </div>
        {/* Back Button */}
        <div className="flex justify-end">
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                refetchClass();
                navigate("/class", { state: { shouldRefetch: true } }); // Go back to the previous page
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 focus:outline-none"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};
