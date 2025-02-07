import { lazy } from "react";
// layout
import MainLayout from "@/layout/admin/MainLayout";

import Loadable from "@/ui-component/Loadable";
import path from "@/constants/routes";

// route admin
const Dashboard = Loadable(lazy(() => import("../views/pages/admin/Home")));
const LearningPathList = Loadable(
  lazy(() => import("../views/pages/admin/LearningPath/LearningPathList"))
);
const CoursesList = Loadable(
  lazy(() => import("../views/pages/admin/Courses/CourseList"))
);
const NewCourses = Loadable(
  lazy(() => import("../views/pages/admin/Courses/NewCourse"))
);
const UpdateCourse = Loadable(
  lazy(() => import("../views/pages/admin/Courses/UpdateCourse"))
);
const CategoryList = Loadable(
  lazy(() => import("../views/pages/admin/ListCategory"))
);
const ContentList = Loadable(
  lazy(() => import("../views/pages/admin/Content"))
);
const AddContent = Loadable(
  lazy(() => import("../views/pages/admin/Content/AddContent"))
);

const TransactionHistory = Loadable(
  lazy(() => import("@/views/pages/admin/Transactions/transactionHistory"))
);
const Profile = Loadable(
  lazy(() => import("@/views/pages/admin/Profile/Profile"))
);

const StudentList = Loadable(
  lazy(() => import("../views/pages/admin/StudentList"))
);

const HR = Loadable(lazy(() => import("../views/pages/admin/HR")));

const Category = Loadable(
  lazy(() => import("../views/pages/admin/Category/Category"))
);

const Articlecategory = Loadable(
  lazy(() => import("../views/pages/admin/Category/Articlecategory"))
);

const UserDetails = Loadable(
  lazy(() => import("../views/pages/admin/StudentList/UserDetail"))
);

const ReviewList = Loadable(
  lazy(() => import("../views/pages/admin/Review/index"))
);

const Comments = Loadable(
  lazy(() => import("../views/pages/admin/Comments/index"))
);

const Coupon = Loadable(
  lazy(() => import("../views/pages/admin/Coupon/index"))
);

const CourseStatistics = Loadable(
  lazy(() => import("../views/pages/admin/Courses/CourseStatistics"))
);
const CarouselManager = Loadable(
  lazy(() => import("../views/pages/admin/CarouselManager"))
);

const privateRoutes = [
  {
    element: <MainLayout />,
    path: "admin",
    children: [
      { path: path.admin.dashboards, element: <Dashboard /> },
      { path: "", element: <Dashboard /> },
      { path: path.admin.LearningPathList, element: <LearningPathList /> },
      { path: path.admin.courses, element: <CoursesList /> },
      { path: path.admin.updateCourse(":id"), element: <UpdateCourse /> },
      { path: path.admin.newCourse, element: <NewCourses /> },
      { path: path.admin.coupon, element: <Coupon /> },

      { path: path.admin.listCategory, element: <CategoryList /> },
      { path: path.admin.listContent, element: <ContentList /> },
      { path: path.admin.addContent, element: <AddContent /> },
      { path: path.admin.profile, element: <Profile /> },
      { path: path.admin.transactionHistory, element: <TransactionHistory /> },
      { path: path.admin.studentList, element: <StudentList /> },
      { path: path.admin.hr, element: <HR /> },
      { path: path.admin.categorys, element: <Category /> },
      { path: path.admin.Articlecategorys, element: <Articlecategory /> },
      { path: path.admin.usersDetail(":id"), element: <UserDetails /> },
      { path: path.admin.reviewList, element: <ReviewList /> },
      { path: path.admin.commentList, element: <Comments /> },
      {
        path: path.admin.courseStatistics(":id"),
        element: <CourseStatistics />,
      },
      { path: path.admin.carousel, element: <CarouselManager /> },
    ],
  },
];

export default privateRoutes;
