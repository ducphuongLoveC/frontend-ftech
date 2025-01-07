import { useState, useEffect } from 'react';
import axiosInstance from '@/api/axiosInstance';
export const useUserCourses = (userId) => {
    const [courses, setCourses] = useState([]);
    const [coursesError, setCoursesError] = useState(null);
    useEffect(() => {
        if (userId) {
            const fetchUserCourses = async () => {
                try {
                    const response = await axiosInstance.get(`/api/user/${userId}/courses`);
                    if (response.status === 200) {
                        setCourses(response.data.courses || []);
                        setCoursesError(null);
                    }
                    else {
                        setCoursesError("Người dùng này chưa đăng ký khóa học nào.");
                        setCourses([]);
                    }
                }
                catch (error) {
                    setCoursesError("Lỗi khi lấy danh sách khóa học.");
                }
            };
            fetchUserCourses();
        }
    }, [userId]);
    return { courses, coursesError };
};
