import useAnnouncementForm from "hooks/announcement/useAnnouncementForm";

const StudentAnnouncementPage: React.FC = () => {
  const { announcements: announcementData } = useAnnouncementForm({ page: 1, limit: 10, search: "" });

  const data = announcementData?.announcements || [];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Semua Pengumuman</h1>
      <div className="space-y-6">
        {data?.length > 0 ? (
          data.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 p-5 rounded-xl bg-white shadow-sm"
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-1">{item.title}</h2>
              <p className="text-sm text-gray-500 italic mb-2">
                {new Date(item.published_at).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                · {item.type}
              </p>
              <p className="text-gray-700">{item.content}</p>
              {item.attachment_url?.match(/\.(jpeg|jpg|png|gif)$/i) && (
                <a
                  href={item.attachment_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={item.attachment_url}
                    alt="Lampiran"
                    className="mt-4 rounded-lg max-h-64 object-contain border"
                  />
                </a>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">Belum ada pengumuman.</p>
        )}
      </div>
    </div>
  );
};

export default StudentAnnouncementPage;
