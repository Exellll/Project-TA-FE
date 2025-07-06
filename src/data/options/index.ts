import { SelectOption } from "_interfaces/shared.interfaces";

const GroupSubjectsList: SelectOption[] = [
  {
    value: "A",
    label: "A",
  },
  {
    value: "B",
    label: "B",
  },
  {
    value: "C",
    label: "C",
  },
];

const GenderList: SelectOption[] = [
  {
    value: "male",
    label: "Laki-laki",
  },
  {
    value: "female",
    label: "Perempuan",
  },
];

const ReligionList: SelectOption[] = [
  {
    value: "islam",
    label: "Islam",
  },
  {
    value: "hindu",
    label: "Hindu",
  },
  {
    value: "budha",
    label: "Budha",
  },
  {
    value: "katholik",
    label: "Katholik",
  },
  {
    value: "kristen",
    label: "Kristen",
  },
  {
    value: "konghucu",
    label: "Konghucu",
  },
];

const SpecialNeedsList: SelectOption[] = [
  {
    value: "tidak",
    label: "Tidak",
  },
  {
    value: "netra",
    label: "Netra",
  },
  {
    value: "rungu",
    label: "Rungu",
  },
  {
    value: "grahita ringan",
    label: "Grahita Ringan",
  },
  {
    value: "grahita sedang",
    label: "Grahita Sedang",
  },
  {
    value: "daksa ringan",
    label: "Daksa Ringan",
  },
  {
    value: "daksa sedang",
    label: "Daksa Sedang",
  },
  {
    value: "laras",
    label: "Laras",
  },
  {
    value: "wicara",
    label: "Wicara",
  },
  {
    value: "tuna ganda",
    label: "Tuna Ganda",
  },
  {
    value: "hiperaktif",
    label: "Hiperaktif",
  },
  {
    value: "cerdas istimewa",
    label: "Cerdas Istimewa",
  },
  {
    value: "bakat istimewa",
    label: "Bakat Istimewa",
  },
  {
    value: "kesulitan belajar",
    label: "Kesulitan Belajar",
  },
  {
    value: "indigo",
    label: "Indigo",
  },
  {
    value: "down syndrome",
    label: "Down Syndrome",
  },
  {
    value: "autis",
    label: "Autis",
  },
];

const ResidenceList: SelectOption[] = [
  {
    value: "orang tua",
    label: "Bersama Orang Tua",
  },
  {
    value: "wali",
    label: "Wali",
  },
  {
    value: "kos",
    label: "Kos",
  },
  {
    value: "asrama",
    label: "Asrama",
  },
  {
    value: "panti asuhan",
    label: "Panti Asuhan",
  },
  {
    value: "lainnya",
    label: "Lainnya",
  },
];

const TransportationList: SelectOption[] = [
  {
    value: "jalan kaki",
    label: "Jalan kaki",
  },
  {
    value: "kendaraan pribadi",
    label: "Kendaraan pribadi",
  },
  {
    value: "kendaraan umum",
    label: "Kendaraan umum / angkot / pete-pete",
  },
  {
    value: "jemputan sekolah",
    label: "Jemputan sekolah",
  },
  {
    value: "kereta api",
    label: "Kereta Api",
  },
  {
    value: "ojek",
    label: "Ojek",
  },
  {
    value: "andong",
    label: "Andong / Bendi / Delman / Sado / Dokar / Beca",
  },
  {
    value: "perahu penyebrangan",
    label: "Perahu penyebrangan / Rakit / Getek",
  },
  {
    value: "lainnya",
    label: "Lainnya",
  },
];

const BooleanList: SelectOption[] = [
  {
    value: "true",
    label: "Ya",
  },
  {
    value: "false",
    label: "Tidak",
  },
];

const PIPList: SelectOption[] = [
  {
    value: "none",
    label: "None",
  },
  {
    value: "daerah konflik",
    label: "Daerah Konflik",
  },
  {
    value: "dampak bencana alam",
    label: "Dampak Bencana Alam",
  },
  {
    value: "kelainan fisik",
    label: "Kelainan Fisik",
  },
  {
    value: "pernah drop out",
    label: "Pernah Drop Out",
  },
  {
    value: "keluarga pidana",
    label: "Keluarga Pidana / Berada di LAPAS",
  },
  {
    value: "pemegang pkh",
    label: "Pemegang PKH/PKS/KKS",
  },
  {
    value: "siswa miskin",
    label: "Siswa Miskin / Rentan Miskin",
  },
  {
    value: "yatim piatu",
    label: "Yatim Piatu / Panti Asuhan / Panti Sosial",
  },
];

const EducationList: SelectOption[] = [
  {
    value: "uneducated",
    label: "Tidak Sekolah",
  },
  {
    value: "drop_out",
    label: "Putus Sekolah",
  },
  {
    value: "SD",
    label: "SD Sederajat",
  },
  {
    value: "SMP",
    label: "SMP Sederajat",
  },
  {
    value: "SMA",
    label: "SMA Sederajat",
  },
  {
    value: "D1",
    label: "D1",
  },
  {
    value: "D2",
    label: "D2",
  },
  {
    value: "D3",
    label: "D3",
  },
  {
    value: "D4",
    label: "D4",
  },
  {
    value: "S1",
    label: "S1",
  },
  {
    value: "S2",
    label: "S2",
  },
  {
    value: "S3",
    label: "S3",
  },
];

const ParentJobList: SelectOption[] = [
  {
    value: "tidak_bekerja",
    label: "Tidak Bekerja",
  },
  {
    value: "nelayan",
    label: "Nelayan",
  },
  {
    value: "petani",
    label: "Petani",
  },
  {
    value: "peternak",
    label: "Peternak",
  },
  {
    value: "pns_tni_polri",
    label: "PNS / TNI / Polri",
  },
  {
    value: "karyawan_swasta",
    label: "Karyawan Swasta",
  },
  {
    value: "pedagang_kecil",
    label: "Pedagang Kecil",
  },
  {
    value: "pedagang_besar",
    label: "Pedagang Besar",
  },
  {
    value: "wiraswasta",
    label: "Wiraswasta",
  },
  {
    value: "wirausaha",
    label: "Wirausaha",
  },
  {
    value: "buruh",
    label: "Buruh",
  },
  {
    value: "pensiunan",
    label: "Pensiunan",
  },
  {
    value: "tenaga_kerja_indonesia",
    label: "Tenaga Kerja Indonesia",
  },
  {
    value: "tidak_dapat_diterapkan",
    label: "Tidak Dapat Diterapkan",
  },
  {
    value: "sudah_meninggal",
    label: "Sudah Meninggal",
  },
  {
    value: "lainnya",
    label: "Lainnya",
  },
];

const IncomeList: SelectOption[] = [
  {
    value: "kurang_dari_500k",
    label: "Kurang dari Rp. 500.000",
  },
  {
    value: "500k_sampai_999k",
    label: "Rp. 500.000 - Rp. 999.999",
  },
  {
    value: "1juta_sampai_2juta",
    label: "Rp. 1.000.000 - Rp. 1.999.999",
  },
  {
    value: "2juta_sampai_5juta",
    label: "Rp. 2.000.000 - Rp. 4.999.999",
  },
  {
    value: "5juta_sampai_20juta",
    label: "Rp. 5.000.000 - Rp. 20.000.000",
  },
  {
    value: "lebih_dari_20juta",
    label: "Lebih dari Rp. 20.000.000",
  },
  {
    value: "tidak_berpenghasilan",
    label: "Tidak Berpenghasilan",
  },
];

const RegistrationTypeList: SelectOption[] = [
  {
    value: "new_comer",
    label: "Siswa Baru",
  },
  {
    value: "moving_student",
    label: "Pindahan",
  },
  {
    value: "back_to_school",
    label: "Kembali Bersekolah",
  },
];

const ScholarshipsTypeList: SelectOption[] = [
  {
    value: "anak_berprestasi",
    label: "Anak Berprestasi",
  },
  {
    value: "anak_kurang_mampu",
    label: "Anak Kurang Mampu",
  },
  {
    value: "pendidikan",
    label: "Pendidikan",
  },
  {
    value: "unggulan",
    label: "Unggulan",
  },
  {
    value: "lainnya",
    label: "Lainnya",
  },
];

const AchievementList: SelectOption[] = [
  {
    value: "sains",
    label: "Sains",
  },
  {
    value: "art",
    label: "Art",
  },
  {
    value: "sports",
    label: "Sports",
  },
  {
    value: "other",
    label: "Other",
  },
];

const KPSRecipientsDistanceList: SelectOption[] = [
  {
    value: "more",
    label: "More",
  },
  {
    value: "less",
    label: "Less",
  }
];

const DayList: SelectOption[] = [
  {
    value: "Senin",
    label: "Senin",
  },
  {
    value: "Selasa",
    label: "Selasa",
  },
  {
    value: "Rabu",
    label: "Rabu",
  },
  {
    value: "Kamis",
    label: "Kamis",
  },
  {
    value: "Jumat",
    label: "Jumat",
  },
  {
    value: "Sabtu",
    label: "Sabtu",
  },
];

const AnnouncementTypeList: SelectOption[] = [
  {
    value: "Pengumuman Sekolah",
    label: "Pengumuman Sekolah",
  },
  {
    value: "Berita",
    label: "Berita",
  },
  {
    value: "Event",
    label: "Event",
  },
];

const StudentBillTypeList: SelectOption[] = [
  {
    value: "SPP",
    label: "SPP",
  },
  {
    value: "Tagihan Ekskul",
    label: "Uang Ekskul",
  },
  // {
  //   value: "Uang Pangkal",
  //   label: "Uang Pangkal",
  // },
  // {
  //   value: "Sumbangan",
  //   label: "Sumbangan",
  // },
  // {
  //   value: "Lainnya",
  //   label: "Lainnya",
  // },
];

export {
  GroupSubjectsList,
  GenderList,
  ReligionList,
  SpecialNeedsList,
  ResidenceList,
  TransportationList,
  BooleanList,
  PIPList,
  RegistrationTypeList,
  ScholarshipsTypeList,
  EducationList,
  ParentJobList,
  IncomeList,
  AchievementList,
  KPSRecipientsDistanceList,
  DayList,
  AnnouncementTypeList,
  StudentBillTypeList,
};
