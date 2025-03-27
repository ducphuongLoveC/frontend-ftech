import { lazy } from 'react';
// layout
import MainLayout from '@/layout/admin/MainLayout';

import Loadable from '@/ui-component/Loadable';
import HasAccessAdmin from '@/middlewares/HasAccessAdmin';

// route admin
const Dashboard = Loadable(lazy(() => import('../views/pages/admin/Home')));
const LearningPathList = Loadable(lazy(() => import('../views/pages/admin/LearningPath/LearningPathList')));
const CoursesList = Loadable(lazy(() => import('../views/pages/admin/Courses/CourseList')));
const NewCourses = Loadable(lazy(() => import('../views/pages/admin/Courses/NewCourse')));
const UpdateCourse = Loadable(lazy(() => import('../views/pages/admin/Courses/UpdateCourse')));
const CategoryList = Loadable(lazy(() => import('../views/pages/admin/ListCategory')));
const ContentList = Loadable(lazy(() => import('../views/pages/admin/Content')));
const AddContent = Loadable(lazy(() => import('../views/pages/admin/Content/AddContent')));

const TransactionHistory = Loadable(lazy(() => import('@/views/pages/admin/Transactions/transactionHistory')));
const Profile = Loadable(lazy(() => import('@/views/pages/admin/Profile/Profile')));

const StudentList = Loadable(lazy(() => import('../views/pages/admin/StudentList')));

const HR = Loadable(lazy(() => import('../views/pages/admin/HR')));

const Category = Loadable(lazy(() => import('../views/pages/admin/Category/Category')));

const Articlecategory = Loadable(lazy(() => import('../views/pages/admin/Category/Articlecategory')));

const UserDetails = Loadable(lazy(() => import('../views/pages/admin/StudentList/UserDetail')));

const ReviewList = Loadable(lazy(() => import('../views/pages/admin/Review/index')));

const Comments = Loadable(lazy(() => import('../views/pages/admin/Comments/index')));

const Coupon = Loadable(lazy(() => import('../views/pages/admin/Coupon/index')));

const CourseStatistics = Loadable(lazy(() => import('../views/pages/admin/Courses/CourseStatistics')));
const CarouselManager = Loadable(lazy(() => import('../views/pages/admin/CarouselManager')));

const privateRoutes = [
  {
    element: (
      <HasAccessAdmin>
        <MainLayout />
      </HasAccessAdmin>
    ),
    path: '/admin',
    children: [
      { path: 'dashboards', element: <Dashboard /> },
      { path: '', element: <Dashboard /> },
      { path: 'learning-path', element: <LearningPathList /> },
      {
        path: 'courses',
        children: [
          { path: '', element: <CoursesList /> },
          { path: 'new', element: <NewCourses /> },
          { path: ':id/update', element: <UpdateCourse /> },
          { path: 'statistics/:id', element: <CourseStatistics /> },
        ],
      },
      { path: 'coupon', element: <Coupon /> },
      { path: 'category', element: <CategoryList /> },
      { path: 'content', element: <ContentList /> },
      { path: 'content/add', element: <AddContent /> },
      { path: 'profile', element: <Profile /> },
      { path: 'transaction/history', element: <TransactionHistory /> },
      { path: 'student-list', element: <StudentList /> },
      { path: 'hr', element: <HR /> },
      { path: 'categorys', element: <Category /> },
      { path: 'categorys/article', element: <Articlecategory /> },
      { path: 'user-detail/:id', element: <UserDetails /> },
      { path: 'reviewList', element: <ReviewList /> },
      { path: 'commentList', element: <Comments /> },
      { path: 'carousel', element: <CarouselManager /> },
    ],
  },
];

export default privateRoutes;
