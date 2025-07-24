import { useParams } from "react-router-dom";
import { useGetClassByIdQuery } from "_services/modules/class";
import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";

export const classRaporPageRouteName = '/grade/rapor/:id'
export default function ClassRaporPage(): React.ReactElement {
    const { id: selectedClassId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: selectedClass, isLoading: isLoadingSelected } =
        useGetClassByIdQuery({ id: selectedClassId! }, { skip: !selectedClassId });

    if (isLoadingSelected) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Cetak Rapor Kelas {selectedClass?.name}</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="text-center">
                            <th>No</th>
                            <th>Nama Siswa</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {selectedClass?.class_student.map((studentData, index: number) => (
                            <tr key={studentData.student_id}>
                                <td>{index + 1}</td>
                                <td>{studentData.name}</td>
                                <td>
                                    <Button
                                        className="w-[40%] lg:w-[40%] rounded-xl hover:text-blue-ribbon bg-blue-ribbon text-white hover:bg-white/90 hover:border-blue-ribbon"
                                        size="sm"
                                        onClick={() =>
                                            navigate(`/grade/rapor/${selectedClassId}/student/${studentData.student_id}`)
                                        }
                                    >
                                        Cetak Rapor
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
