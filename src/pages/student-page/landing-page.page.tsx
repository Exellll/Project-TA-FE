import useAnnouncementForm from "hooks/announcement/useAnnouncementForm";
import StudentContainer from "layout/container/index-student";
import { useAppSelector } from "store";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const getUsernameFromToken = (token: string): string | null => {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.username || null;
    } catch (error) {
        return null;
    }
};

const StudentLandingPage: React.FC = () => {
    const { accessToken } = useAppSelector((state) => state.auth);
    const username = accessToken ? getUsernameFromToken(accessToken) : "Siswa";
    const { announcements: announcementData } = useAnnouncementForm({
        page: 1,
        limit: 5,
        search: "",
    });

    const data = announcementData?.announcements || [];

    return (
        <StudentContainer className="p-4">
            <div className="max-w-7xl mx-auto mt-8 space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Selamat Datang, {username}
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Ini adalah halaman utama portal siswa. Di sini kamu bisa melihat pengumuman terbaru, jadwal pelajaran, nilai akademik, dan informasi lainnya.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pengumuman */}
                    {/* Pengumuman Terbaru (versi ringkas) */}
                    <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
                        <h2 className="text-xl font-semibold text-blue-800 mb-4">
                            Pengumuman Terbaru
                        </h2>
                        <div className="space-y-4">
                            {data?.length === 0 ? (
                                <p className="text-blue-700">Belum ada pengumuman hari ini.</p>
                            ) : (
                                data.slice(0, 2).map((item) => (
                                    <div key={item.id} className="bg-white rounded-lg shadow p-4">
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className="text-base font-semibold text-gray-800 line-clamp-1">
                                                {item.title}
                                            </h3>
                                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                                {item.type}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 mb-2">
                                            {format(new Date(item.published_at), "dd MMM yyyy", { locale: id })}
                                        </p>
                                        <p className="text-sm text-gray-700 line-clamp-2">{item.content}</p>
                                        {/* {item.attachment_url && (
                                            <img
                                                src={item.attachment_url}
                                                alt="Lampiran"
                                                className="mt-2 max-h-32 object-cover rounded-md border"
                                            />
                                        )} */}
                                    </div>
                                ))
                            )}
                        </div>
                        {data.length > 2 && (
                            <a
                                href="/student/announcement"
                                className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                            >
                                Lihat semua pengumuman →
                            </a>
                        )}
                    </div>

                    {/* Jadwal Hari Ini */}
                    <div className="bg-green-50 p-6 rounded-xl shadow-sm">
                        <h2 className="text-xl font-semibold text-green-800 mb-4">
                            Jadwal Hari Ini
                        </h2>
                        <p className="text-green-700">Belum ada data jadwal hari ini.</p>
                    </div>
                </div>

                {/* Konten tambahan tetap */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow text-center">
                        <img
                            src="https://source.unsplash.com/400x200/?school,classroom"
                            alt="Fasilitas"
                            className="rounded-lg mb-4 w-full h-32 object-cover"
                        />
                        <h3 className="font-semibold text-gray-800">Fasilitas Sekolah</h3>
                        <p className="text-sm text-gray-600">
                            Dilengkapi ruang kelas modern, lab komputer, dan perpustakaan.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow text-center">
                        <img
                            src="https://source.unsplash.com/400x200/?student,activity"
                            alt="Galeri"
                            className="rounded-lg mb-4 w-full h-32 object-cover"
                        />
                        <h3 className="font-semibold text-gray-800">Galeri Kegiatan</h3>
                        <p className="text-sm text-gray-600">
                            Lihat dokumentasi kegiatan ekstrakurikuler dan lomba.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow text-center">
                        <img
                            src="https://source.unsplash.com/400x200/?education,learning"
                            alt="Info Sekolah"
                            className="rounded-lg mb-4 w-full h-32 object-cover"
                        />
                        <h3 className="font-semibold text-gray-800">Info Sekolah</h3>
                        <p className="text-sm text-gray-600">
                            Dapatkan informasi seputar akademik, kalender, dan tata tertib.
                        </p>
                    </div>
                </div>
            </div>
        </StudentContainer>
    );
};

export default StudentLandingPage;
