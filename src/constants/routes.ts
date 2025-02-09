// const path = {
//   admin: {
//     dashboards: '/dashboards',
//     courses: '/courses',
//     newCourse: '/courses/new',
//     listCategory: '/category',
//     listContent: '/content',
//     addContent: '/content/add',
//     updateCourse: (id: string) => `/courses/${id}/update`,
//     LearningPathList: '/learning-path',
//     newLearningPath: '/learning-path/new',
//     posts: '/posts',
//     newPosts: '/posts/new',
//     transaction: '/transaction',
//     transactionHistory: '/transaction/history',
//     statistics: '/statistics',
//     profiles: '/profiles',
//     profile: '/profile',
//     hr: '/hr',
//     studentList: '/student-list',
//     categorys: '/categorys',
//     Articlecategorys: '/categorys/article',
//     usersDetail: (id: string) => `/user-detail/${id}`,
//     reviewList: '/reviewList',
//     commentList: '/commentList',
//     coupon: '/coupon',
//     courseStatistics: (id: string) => `/course-statistics/${id}`,
//     carousel: '/carousel',
//   },
//   client: {
//     auth: {
//       login: '/auth/login',
//       register: '/auth/register',
//     },
//     learning: '/learning/:id/',
//     learningId: (id: string) => `/learning/${id}`,
//     myCourses: '/my-courses',
//     learningPath: '/learning-path',
//     learningPathDetail: '/learning-path-detail',
//     courses: '/courses/:id',
//     logAuth: 'log-auth',
//     news: '/news',
//     newsDetail: '/news-detail',
//     contact: '/contact',
//     profile: (id:string) => `/profile${id}`,
//     setting: '/setting',
//     newPost: '/new-post',
//     myPost: '/my-post',
//     bookmark: '/me/bookmark',
//     checkCertificate: '/certificate/check',
//     forgetPass: '/forget-password',

//   },
// };
// export default path;









const path = {
  admin: {
    dashboards: "/admin/dashboards",
    courses: "/admin/courses",
    newCourse: "/admin/courses/new",
    listCategory: "/admin/category",
    listContent: "/admin/content",
    addContent: "/admin/content/add",
    updateCourse: (id: string) => `/admin/courses/${id}/update`,
    LearningPathList: "/admin/learning-path",
    newLearningPath: "/admin/learning-path/new",
    posts: "/admin/posts",
    newPosts: "/admin/posts/new",
    transaction: "/admin/transaction",
    transactionHistory: "/admin/transaction/history",
    statistics: "/admin/statistics",
    profiles: "/admin/profiles",
    profile: "/admin/profile",
    hr: "/admin/hr",
    studentList: "/admin/student-list",
    categorys: "/admin/categorys",
    Articlecategorys: "/admin/categorys/article",
    usersDetail: (id: string) => `/admin/user-detail/${id}`, 
    reviewList: "/admin/reviewList",
    commentList: "/admin/commentList",
    coupon: "/admin/coupon",
    courseStatistics: (id: string) => `/admin/course-statistics/${id}`, 
    carousel: "/admin/carousel",
  },

  client: {
    auth: {
      login: "/auth/login",
      register: "/auth/register",
      forgetPass: "/auth/forget-password",
      
    },
    learning: "/learning/:id/",
    learningId: (id: string) => `/learning/${id}`,
    myCourses: "/my-courses",
    learningPath: "/learning-path",
    learningPathDetail: "/learning-path-detail",
    courses: "/courses/:id",
    logAuth: "log-auth",
    news: "/news",
    newsDetail: "/news-detail",
    contact: "/contact",
    profile: (id: string) => `/profile/${id}`,
    setting: "/setting",
    newPost: "/new-post",
    myPost: "/my-post",
    bookmark: "/me/bookmark",
    checkCertificate: "/certificate/check",
   
  },
};

export default path;
