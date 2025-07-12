import { Navigate, RouteObject } from "react-router-dom";
import Login from "pages/login";
import AuthLayout from "layout/auth/AuthLayout";
import ForgotPassword from "pages/forgot-password";
import DashboardLayout from "layout/dashboard";
import StaffPage, { staffRouteName } from "pages/staff/index.page";
import SubjectPage, { subjectRouteName } from "pages/subject/index.page";
import StudentPage, { studentRouteName } from "pages/student/index.page";
import ClassPage, { classRouteName } from "pages/class/index.page";
import CreateStaffPage, { createStaffRouteName } from "pages/staff/create.page";
import UpdateStaffPage, { updateStaffRouteName } from "pages/staff/update.page";
import { DetailClassPage, detailClassRouteName } from "pages/class/detail.page";
import ContentLibraryPage from "pages/content-library/index.page";
import CreateStudentPage, { createStudentRouteName } from "pages/student/create-student.page";
import LeaveRequestPage, { leaveRequestRouteName } from "pages/leave-request/index.page";
import PresencePage from "pages/presence/index.page";
import EffectiveDaySettingsPage, { effectiveDaySettingsRouteName } from "pages/effective-day-settings/index.page";
import EkskulPage, { ekskulRouteName } from "pages/ekskul/index.page";
import PembimbingEkskulPage, { PembimbingEkskulRouteName } from "pages/pembimbing-ekskul/index.page";
import AnnouncementPage, { announcementRouteName } from "pages/announcement/index.page";
import StudentBillPage, { studentBillRouteName } from "pages/student-bill/index.page";
import StudentLayout from "layout/student";
import StudentLandingPage from "pages/student-page/landing-page.page";
import StudentAnnouncementPage from "pages/student-page/announcement.page";
import StudentEkskulPage from "pages/student-page/ekskul.page";
import StudentTransactionPage from "pages/student-page/student-bill.page";
import StudentTransactionSPPPage from "pages/student-bill/section/spp-st.page";
import StudentTransactionEkskulPage from "pages/student-bill/section/ekskul-st.page";
import GradePage, { gradeRouteName } from "pages/grade/index.page";
import GradeInputPage, { gradeInputRouteName } from "pages/grade/section/grade-input.page";
import ViewGradePage, { viewGradeRouteName } from "pages/grade/section/grade-view.page";
import TeacherPage, { teacherRouteName } from "pages/teacher/index.page";
import SchedulePage, { scheduleRouteName } from "pages/schedule/index.page";
import ScheduleInputPage, { scheduleInputRouteName } from "pages/schedule/section/schedule-input.page";
import StudentGradePage from "pages/student-page/grade.page";
import ScheduleViewPage, { scheduleViewRouteName } from "pages/schedule/section/schedule-view.page";


const protectedRoutes: RouteObject[] = [
  { path: "*", element: <Navigate to="/dashboard" /> },
  {
    path: "",
    element: <DashboardLayout />,
    children: [
      { path: "not-found", element: <>Page Not Found</> },
      { path: "dashboard", element: <>dashboard</> },
      {
        path: staffRouteName,
        children: [
          {
            path: "",
            element: <StaffPage />,
          },
          {
            path: createStaffRouteName,
            element: <CreateStaffPage />,
          },
          {
            path: updateStaffRouteName,
            element: <UpdateStaffPage />,
          },
        ],
      },
      { path: subjectRouteName, element: <SubjectPage /> },
      {
        path: studentRouteName,
        element: <StudentPage />,
      },
      {
        path: classRouteName,
        children: [
          {
            path: "",
            element: <ClassPage />,
          },
          {
            path: detailClassRouteName,
            element: <DetailClassPage />,
          },
        ],
      },
      { element: <CreateStudentPage/>, path: createStudentRouteName },
      { element: <>"Alumni"</>, path: "/alumni" },
      { 
        path: studentBillRouteName,
        children: [
          {
            path: "",
            element: <StudentBillPage />,
          },
          {
            path: "/bill/spp",
            element: <StudentTransactionSPPPage/>,
          },
          {
            path: "/bill/ekstrakulikuler",
            element: <StudentTransactionEkskulPage/>,
          },
        ]
      },
      { element: <>"Aset"</>, path: "/asset" },
      { element: <ContentLibraryPage />, path: "/materials" },
      { element: <PresencePage/>, path: "/presence" },
      { element: <>"Penilaian"</>, path: "/assessment" },
      // { element: <>"Jadwal KBM"</>, path: "/kbm-schedule" },
      { element: <>"Mading Online"</>, path: "/mading" },
      { element: <>"LMS"</>, path: "/lms" },
      { element: <>"Digital Produk"</>, path: "/digital-product" },
      { element: <>"PPDB"</>, path: "/ppdb" },
      { element: <LeaveRequestPage/>, path: leaveRequestRouteName },
      { element: <EffectiveDaySettingsPage/>, path: effectiveDaySettingsRouteName },
      //Halaman Guru
      { element: <TeacherPage/>, path: teacherRouteName },
      // Halaman Ekstrakurikuler
      { element: <EkskulPage/>, path: ekskulRouteName },
      { element: <PembimbingEkskulPage/>, path: PembimbingEkskulRouteName },
      // Halaman Pengumuman
      { element: <AnnouncementPage/>, path: announcementRouteName },
      // Halaman Nilai Siswa
      { element: <GradePage/>, path: gradeRouteName },
      { element: <GradeInputPage/>, path: gradeInputRouteName},
      { element: <ViewGradePage/>, path: viewGradeRouteName},
      // Halaman Jadwal
      { element: <SchedulePage/>, path: scheduleRouteName },
      { element: <ScheduleInputPage/>, path: scheduleInputRouteName },
      { element: <ScheduleViewPage/>, path: scheduleViewRouteName}
    ],
  },
];

const publicRoutes: RouteObject[] = [
  {
    path: "",
    element: <AuthLayout />,
    children: [
      { path: "", element: <Login /> },
      { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },
  {
    path: classRouteName,
    children: [
      {
        path: "",
        element: <ClassPage />,
      },
      {
        path: detailClassRouteName,
        element: <DetailClassPage />,
      },
    ],
  },
  { path: "404", element: <div>Not Found</div> },
  { path: "*", element: <Navigate to="/" /> },
];

const studentRoutes: RouteObject[] = [
  {
    path: "*",
    element: <Navigate to="/landingpage" />,
  },
  {
    path: "",
    element: <StudentLayout />, 
    children: [
      {
        path: "landingpage",
        element: <StudentLandingPage/>,
      },
      {
        path: "student/grades",
        element: <StudentGradePage/>,
      },
      {
        path: "student/schedule",
        element: <>Halaman Jadwal</>,
      },
      {
        path: "student/billing",
        element: <StudentTransactionPage/>,
      },
      {
        path: "student/announcement",
        element: <StudentAnnouncementPage/>,
      },
      {
        path: "student/ekstrakulikuler",
        element: <StudentEkskulPage/>,
      },
    ],
  },
];

export { publicRoutes, protectedRoutes, studentRoutes };
