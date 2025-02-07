import { lazy } from "react";
// layout
import MainLayout from "@/layout/client/MainLayout";
import BannerLayout from "@/layout/client/BannerLayout";
import BasicLayout from "@/layout/client/BasicLayout";

import Loadable from "@/ui-component/Loadable";

// middlewares
import RedirectIfAuthenticated from "@/middlewares/RedirectIfAuthenticated";
import HasAccess from "@/middlewares/HasAccess";
import HasUser from "@/middlewares/HasUser";

// route components
const Home = Loadable(lazy(() => import("@/views/pages/Home")));
const SettingUser = Loadable(lazy(() => import("@/views/pages/SettingUser")));
const Profile = Loadable(lazy(() => import("@/views/pages/ProfileUser")));
const LearningPath = Loadable(
  lazy(() => import("@/views/pages/LearningPath/LearningPath"))
);
const LearningPathDetail = Loadable(
  lazy(() => import("@/views/pages/LearningPathDetail/LearningPathDetail"))
);
const Login = Loadable(
  lazy(() => import("@/views/pages/authentication3/Login3"))
);
const Register = Loadable(
  lazy(() => import("@/views/pages/authentication3/Register3"))
);
const Contact = Loadable(lazy(() => import("@/views/pages/Contact")));
const PostOverview = Loadable(lazy(() => import("@/views/pages/PostOverview")));
const PostDetail = Loadable(lazy(() => import("@/views/pages/PostDetail")));
const Learning = Loadable(lazy(() => import("@/views/pages/Learning")));
const CourseDetail = Loadable(lazy(() => import("@/views/pages/CourseDetail")));
const NewPost = Loadable(lazy(() => import("@/views/pages/Post/NewPost")));
const MyCourses = Loadable(lazy(() => import("@/views/pages/MyCourses")));
const CertificateCheck = Loadable(
  lazy(() => import("@/views/pages/CertificateCheck"))
);
const ForgetPassword = Loadable(
  lazy(() => import("@/views/pages/authentication3/ForgetPassword"))
);

const mainRoutes = [
  {
    path: "/",
    element: <BannerLayout />, 
    children: [{ path: "/", element: <Home /> }],
  },
  {
    path: "/learning/:id",
    element: (
      <HasAccess>
        <Learning />
      </HasAccess>
    ),
  },
  {
    path: "/",
    element: <MainLayout />, // Layout chính
    children: [
      { path: "courses/:id", element: <CourseDetail /> },
      { path: "contact", element: <Contact /> },
      { path: "news", element: <PostOverview /> },
      { path: "news/:id", element: <PostDetail /> },
      { path: "learning-path", element: <LearningPath /> },
      { path: "learning-path/:id", element: <LearningPathDetail /> },
      { path: "profile", element: <Profile /> },
      { path: "setting", element: <SettingUser /> },
      {
        path: "my-courses",
        element: (
          <HasUser>
            <MyCourses />
          </HasUser>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <BasicLayout />, 
    children: [
      {
        path: "login",
        element: (
          <RedirectIfAuthenticated>
            <Login />
          </RedirectIfAuthenticated>
        ),
      },
      {
        path: "register",
        element: (
          <RedirectIfAuthenticated>
            <Register />
          </RedirectIfAuthenticated>
        ),
      },
      { path: "forget-password", element: <ForgetPassword /> },
    ],
  },
  {
    path: "/",
    element: <BasicLayout />, // Layout cơ bản cho các trang khác
    children: [
      { path: "new-post", element: <NewPost /> },
      { path: "certificate/check", element: <CertificateCheck /> },
    ],
  },
];

export default mainRoutes;
