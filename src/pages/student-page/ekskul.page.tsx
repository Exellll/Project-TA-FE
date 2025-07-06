import usePembimbingEkskulForm from "hooks/pembimbing-ekskul/usePembimbingEkskulForm";
import StudentContainer from "layout/container/index-student";
import { FaMapMarkerAlt, FaUsers, FaChalkboardTeacher, FaClock, FaSpinner } from "react-icons/fa";

const StudentEkskulPage: React.FC = () => {
    // Ganti ini sesuai hook yang kamu pakai
    const { pembimbing: pembimbingData, isLoading } = usePembimbingEkskulForm({
        page: 1,
        limit: 10,
        search: "",
    });

    const ekskulList = pembimbingData?.pembimbing || [];

    return (
        <StudentContainer className="p-4">
            <div className="max-w-7xl mx-auto mt-8 space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Daftar Ekskul Sekolah
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Berikut adalah ekstrakurikuler yang tersedia dan bisa kamu ikuti sesuai minat dan bakat.
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <FaSpinner className="animate-spin text-blue-500 text-4xl" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ekskulList.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
                            >
                                <h2 className="text-xl font-semibold text-blue-700 mb-1">{item.ekskul?.name}</h2>
                                <p className="text-sm text-gray-600 mb-3">{item.ekskul?.description}</p>

                                <div className="text-sm text-gray-700 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <FaClock className="text-blue-500" />
                                        <span>
                                            {item.ekskul?.day} | {item.ekskul?.start_time} - {item.ekskul?.end_time}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-green-500" />
                                        <span>{item.ekskul?.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaUsers className="text-purple-500" />
                                        <span>Kapasitas: {item.ekskul?.capacity}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaChalkboardTeacher className="text-yellow-500" />
                                        <span>Pembimbing: {item.name}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </StudentContainer>
    );
};

export default StudentEkskulPage;
