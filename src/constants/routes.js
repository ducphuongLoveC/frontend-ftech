const path = {
    admin: {
        dashboards: '/dashboards',
        courses: '/courses',
        newCourse: '/courses/new',
        listCategory: '/category',
        listContent: '/content',
        addContent: '/content/add',
        updateCourse: (id) => `/courses/${id}/update`,
        LearningPathList: '/learning-path',
        newLearningPath: '/learning-path/new',
        posts: '/posts',
        newPosts: '/posts/new',
        transaction: '/transaction',
        transactionHistory: '/transaction/history',
        statistics: '/statistics',
        profiles: '/profiles',
        profile: '/profile',
        hr: '/hr',
        studentList: '/student-list',
        categorys: '/categorys',
        Articlecategorys: '/categorys/article',
        usersDetail: (id) => `/user-detail/${id}`,
        reviewList: '/reviewList',
        commentList: '/commentList',
        coupon: '/coupon',
        courseStatistics: (id) => `/course-statistics/${id}`,
        carousel: '/carousel',
    },
    client: {
        auth: {
            login: '/auth/login',
            register: '/auth/register',
        },
        learning: '/learning/:id/',
        learningId: (id) => `/learning/${id}`,
        myCourses: '/my-courses',
        learningPath: '/learning-path',
        learningPathDetail: '/learning-path-detail',
        courses: '/courses/:id',
        logAuth: 'log-auth',
        news: '/news',
        newsDetail: '/news-detail',
        contact: '/contact',
        profile: (id) => `/profile${id}`,
        setting: '/setting',
        newPost: '/new-post',
        myPost: '/my-post',
        bookmark: '/me/bookmark',
        checkCertificate: '/certificate/check',
        forgetPass: '/forget-password',
    },
};
export default path;