import {
  AbsenceMenuSVG,
  AlumniMenuSVG,
  AnnouncementMenuSVG,
  AssessmentMenuSVG,
  AssetMenuSVG,
  ClassMenuSVG,
  DashboardSVG,
  DigitalProductMenuSVG,
  EkskulMenuSVG,
  LMSMenuSVG,
  LearningMaterialMenuSVG,
  MadingMenuSVG,
  PPDBMenuSVG,
  SPPMenuSVG,
  ScheduleMenuSVG,
  StaffMenuSVG,
  StudentMenuSVG,
  SubjectMenuSVG,
  TagihanMenuSVG,
  TeacherMenuSVG,
} from "assets/images";
import { SVGIcon } from "components/icon/SVGIcon";

interface SubMenuItem {
  name: string;
  path: string;
}
interface MenuItem {
  name: string;
  path: string;
  activeIcon: JSX.Element;
  icon: JSX.Element;
  child?: SubMenuItem[];
  expand?: boolean;
}

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    activeIcon: <SVGIcon svg={DashboardSVG} className="bg-white" />,
    icon: <SVGIcon svg={DashboardSVG} className="bg-[#ACACAC]" />,
  },
  {
    name: "Data Staff",
    path: "/staff",
    activeIcon: <SVGIcon svg={StaffMenuSVG} className="bg-white" />,
    icon: <SVGIcon svg={StaffMenuSVG} className="bg-[#ACACAC]" />,
  },
  {
    name: "Mata Pelajaran",
    path: "/subject",
    activeIcon: <SVGIcon svg={SubjectMenuSVG} className="bg-white" />,
    icon: <SVGIcon svg={SubjectMenuSVG} className="bg-[#ACACAC]" />,
  },
  
  {
    name: "Siswa",
    path: "/student",
    activeIcon: <SVGIcon svg={StudentMenuSVG} className="bg-white" />,
    icon: <SVGIcon svg={StudentMenuSVG} className="bg-[#ACACAC]" />,
  },
  {
    name: "Kelas",
    path: "/class",
    activeIcon: <SVGIcon svg={ClassMenuSVG} className="bg-white" />,
    icon: <SVGIcon svg={ClassMenuSVG} className="bg-[#ACACAC]" />,
  },
  {
    name: "Guru",
    path: "/teacher",
    activeIcon: <SVGIcon svg={TeacherMenuSVG} className="bg-white" />,
    icon: <SVGIcon svg={TeacherMenuSVG} className="bg-[#ACACAC]" />,
  },
  {
    name: "Jadwal",
    path: "/schedule",
    activeIcon: <SVGIcon svg={ScheduleMenuSVG} className="bg-white" />,
    icon: <SVGIcon svg={ScheduleMenuSVG} className="bg-[#ACACAC]" />,
  },
  {
    name: "Nilai",
    path: "/grade",
    activeIcon: <SVGIcon svg={ScheduleMenuSVG} className="bg-white" />,
    icon: <SVGIcon svg={ScheduleMenuSVG} className="bg-[#ACACAC]" />,
  },
  {
    name: "Ekskul",
    path: "/ekskul",
    activeIcon: <SVGIcon svg={EkskulMenuSVG} className="bg-white" />,
    icon: <SVGIcon svg={EkskulMenuSVG} className="bg-[#ACACAC]" />,
    child: [
      {
        name: "Pembimbing Ekskul",
        path: "/pembimbing-ekskul",
      }
    ]
  },
  {
    name: "Pengumuman Sekolah",
    path: "/announcement",
    activeIcon: <SVGIcon svg={AnnouncementMenuSVG} className="bg-white" />,
    icon: <SVGIcon svg={AnnouncementMenuSVG} className="bg-[#ACACAC]" />,
  },
  // {
  //   name: "Alumni",
  //   path: "/alumni",
  //   activeIcon: <SVGIcon svg={AlumniMenuSVG} className="bg-white" />,
  //   icon: <SVGIcon svg={AlumniMenuSVG} className="bg-[#ACACAC]" />,
  // },
  {
    name: "Tagihan Siswa",
    path: "/bill",
    activeIcon: <SVGIcon svg={TagihanMenuSVG} className="bg-white" />,
    icon: <SVGIcon svg={TagihanMenuSVG} className="bg-[#ACACAC]" />,
    child: [
      {
        name: "SPP",
        path: "/bill/spp",
      },
      {
        name: "Tagihan Ekskul",
        path: "/bill/ekstrakulikuler"
      }
    ]
  },
  // {
  //   name: "Aset",
  //   path: "/asset",
  //   activeIcon: <SVGIcon svg={AssetMenuSVG} className="bg-white" />,
  //   icon: <SVGIcon svg={AssetMenuSVG} className="bg-[#ACACAC]" />,
  // },
  // {
  //   name: "Jadwal Guru",
  //   path: "/teacher-schedule",
  //   activeIcon: <SVGIcon svg={ScheduleMenuSVG} className="bg-white" />,
  //   icon: <SVGIcon svg={ScheduleMenuSVG} className="bg-[#ACACAC]" />,
  // },
  {
    name: "Bank Materi",
    path: "/materials",
    activeIcon: <SVGIcon svg={LearningMaterialMenuSVG} className="bg-white" />,
    icon: <SVGIcon svg={LearningMaterialMenuSVG} className="bg-[#ACACAC]" />,
  },
  {
    name: "Absensi",
    path: "/presence",
    activeIcon: <SVGIcon svg={AbsenceMenuSVG} className="bg-white" />,
    icon: <SVGIcon svg={AbsenceMenuSVG} className="bg-[#ACACAC]" />,
  },
  // {
  //   name: "Penilaian",
  //   path: "/assessment",
  //   activeIcon: <SVGIcon svg={AssessmentMenuSVG} className="bg-white" />,
  //   icon: <SVGIcon svg={AssessmentMenuSVG} className="bg-[#ACACAC]" />,
  // },
  // {
  //   name: "Jadwal KBM",
  //   path: "/kbm-schedule",
  //   activeIcon: <SVGIcon svg={ScheduleMenuSVG} className="bg-white" />,
  //   icon: <SVGIcon svg={ScheduleMenuSVG} className="bg-[#ACACAC]" />,
  // },
  // {
  //   name: "Mading Online",
  //   path: "/mading",
  //   activeIcon: <SVGIcon svg={MadingMenuSVG} className="bg-white" />,
  //   icon: <SVGIcon svg={MadingMenuSVG} className="bg-[#ACACAC]" />,
  // },
  // {
  //   name: "LMS",
  //   path: "/lms",
  //   activeIcon: <SVGIcon svg={LMSMenuSVG} className="bg-white" />,
  //   icon: <SVGIcon svg={LMSMenuSVG} className="bg-[#ACACAC]" />,
  // },
  // {
  //   name: "Digital Produk",
  //   path: "/digital-product",
  //   activeIcon: <SVGIcon svg={DigitalProductMenuSVG} className="bg-white" />,
  //   icon: <SVGIcon svg={DigitalProductMenuSVG} className="bg-[#ACACAC]" />,
  // },
  // {
  //   name: "PPDB",
  //   path: "/ppdb",
  //   activeIcon: <SVGIcon svg={PPDBMenuSVG} className="bg-white" />,
  //   icon: <SVGIcon svg={PPDBMenuSVG} className="bg-[#ACACAC]" />,
  // },
  {
    name: "Perizinan",
    path: "/leave-request",
    activeIcon: <SVGIcon svg={PPDBMenuSVG} className="bg-white" />,
    icon: <SVGIcon svg={PPDBMenuSVG} className="bg-[#ACACAC]" />,
  },
  {
    name: "Setting Hari Efektif",
    path: "/effective-day-settings",
    activeIcon: <SVGIcon svg={PPDBMenuSVG} className="bg-white" />,
    icon: <SVGIcon svg={PPDBMenuSVG} className="bg-[#ACACAC]" />,
  },
];

export { menuItems };
export type { MenuItem };
