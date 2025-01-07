import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '@/api/axiosInstance';
import { useTheme } from '@mui/material';
import { Box, Typography, Button } from '@mui/material';
import TabsCustom from '@/components/TabsCustom';
import UserInfo from './UserInfo';
import CoursesInfo from './CoursesInfo';
import HeaderTitle from '../../Title';
const UserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userError, setUserError] = useState(null);
    const [coursesError, setCoursesError] = useState(null);
    const theme = useTheme();
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                setLoading(true);
                console.log('Fetching user details for userId:', id);
                // Gọi API lấy thông tin người dùng
                const userResponse = await axiosInstance.get(`/api/user/${id}`);
                console.log('User response:', userResponse);
                if (userResponse.data.success) {
                    setUser(userResponse.data.data);
                }
                else {
                    setUserError('Không tìm thấy thông tin người dùng.');
                }
                // Gọi API lấy danh sách khóa học
                const coursesResponse = await axiosInstance.get(`/api/user/${id}/courses`);
                console.log('Courses response:', coursesResponse);
                // Kiểm tra nếu khóa học rỗng, không trả về lỗi 404
                if (coursesResponse.status === 200) {
                    setCourses(coursesResponse.data.courses || []); // Lấy khóa học từ response
                    setCoursesError(null); // Đảm bảo không hiển thị lỗi nếu không có khóa học
                }
                else {
                    setCourses([]); // Đảm bảo trả về mảng rỗng nếu không có khóa học
                    setCoursesError('Tài khoản này chưa đăng ký khóa học nào.');
                }
            }
            catch (err) {
                console.error('Error fetching data:', err);
                setUserError('Lỗi khi lấy thông tin người dùng.');
                setCoursesError('Lỗi khi lấy danh sách khóa học.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchUserDetails();
    }, [id]);
    if (loading)
        return _jsx("div", { children: "\u0110ang t\u1EA3i..." });
    if (userError || coursesError) {
        return (_jsxs(Box, { children: [userError && _jsx(Typography, { color: "error", children: userError }), coursesError && _jsx(Typography, { color: "error", children: coursesError }), _jsx(Button, { variant: "contained", onClick: () => window.history.back(), sx: { marginTop: '20px' }, children: "Quay l\u1EA1i" })] }));
    }
    const userInfoContent = user ? (_jsx(UserInfo, { user: user })) : (_jsx(Typography, { color: "error", children: "Kh\u00F4ng t\u00ECm th\u1EA5y th\u00F4ng tin ng\u01B0\u1EDDi d\u00F9ng" }));
    const coursesInfoContent = courses.length > 0 ? (_jsx(CoursesInfo, { courses: courses })) : (_jsx(Typography, { children: "T\u00E0i kho\u1EA3n n\u00E0y ch\u01B0a \u0111\u0103ng k\u00FD kh\u00F3a h\u1ECDc n\u00E0o." }));
    return (_jsxs(Box, { children: [_jsx(HeaderTitle, { des: "\u0110\u00E2y l\u00E0 trang chi ti\u1EBFt ng\u01B0\u1EDDi d\u00F9ng", onClick: () => navigate(-1), titleButton: "Quay l\u1EA1i" }), _jsx(Box, { sx: { backgroundColor: theme.palette.background.paper }, children: _jsx(TabsCustom, { onChange: () => { }, labels: ['Thông tin người dùng', 'Khóa học tham gia'], contents: [userInfoContent, coursesInfoContent] }) })] }));
};
export default UserDetails;
