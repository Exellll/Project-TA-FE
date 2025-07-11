interface HeaderMenu {
  title: string;
  path: string;
}
const HeaderName: HeaderMenu[] = [
  {
    title: "Dashboard",
    path: "dashboard",
  },
  {
    title: "Data Staff",
    path: "staff",
  },
  {
    title: "Mata Pelajaran",
    path: "subject",
  },
  {
    title: "Siswa",
    path: "student",
  },
  { title: "Kelas", path: "class" },
  { title: "Jadwal", path: "schedule" },
  { title: "Alumni", path: "alumni" },
  { title: "SPP", path: "spp" },
  { title: "Aset", path: "asset" },
  { title: "Jadwal Guru", path: "teacher-schedule" },
  { title: "Bank Materi", path: "materials" },
  { title: "Absensi", path: "absence" },
  { title: "Penilaian", path: "assessment" },
  { title: "Jadwal KBM", path: "kbm-schedule" },
  { title: "Mading Online", path: "mading" },
  { title: "LMS", path: "lms" },
  { title: "Digital Produk", path: "digital-product" },
  { title: "PPDB", path: "ppdb" },
  { title: "Pengumuman Sekolah", path: "announcement" },
  { title: "Pembimbing Ekskul", path: "pembimbing-ekskul" },
  { title: "Ekskul", path: "ekskul" },
  { title: "Effective Day Settings", path: "effective-day-settings" },
  { title: "Tagihan Ekskul", path: "bill/ekstrakulikuler" },
  { title: "Tagihan SPP", path: "bill/spp" },
  { title: "Tagihan Siswa", path: "bill" },
  { title: "Nilai", path: "grade" },
  { title: "Guru", path: "teacher" },
];

export { HeaderName };
