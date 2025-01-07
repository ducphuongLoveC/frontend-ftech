import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import axiosInstance from '@/api/axiosInstance';
import { useUserCourses } from '@/api/useUserCourses';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './index.module.scss';
import { PersonPinCircleRounded } from '@mui/icons-material';
import Progress from '@/components/Progress';
import useQueryParams from '@/hooks/useQueryParams';
// icon
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const ProFile = () => {
    const query = useQueryParams();
    const userIdFromURL = query.get('id');
    console.log(userIdFromURL);
    const navigate = useNavigate();
    const { courses, coursesError } = useUserCourses(userIdFromURL);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    console.log('User ID from URL:', userIdFromURL);
    useEffect(() => {
        const fetchUserInfo = async () => {
            if (userIdFromURL) {
                try {
                    const response = await axiosInstance.get(`/api/user/${userIdFromURL}`);
                    // console.log(response.data)
                    if (response.status === 200) {
                        if (response.data.data) {
                            setUser(response.data.data);
                            setError(null);
                        }
                        else {
                            setError('Không tìm thấy người dùng với ID này.');
                        }
                    }
                    else {
                        setError('Không tìm thấy người dùng với ID này.');
                    }
                }
                catch (error) {
                    setError('Lỗi khi lấy thông tin người dùng.');
                }
            }
        };
        fetchUserInfo();
    }, [userIdFromURL]);
    useEffect(() => {
        console.log('Current user data:', user);
    }, [user]);
    useEffect(() => {
        if (error) {
            navigate('/notfound');
        }
    }, [error, navigate]);
    if (!userIdFromURL) {
        return _jsx("div", { children: "ID kh\u00F4ng h\u1EE3p l\u1EC7!" });
    }
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };
    return (_jsxs("div", { className: clsx(s['main-profileUser']), children: [_jsx("div", { className: clsx(s['banner-profileUser']), children: _jsx("img", { src: "/images/banner-user.png", alt: "Banner" }) }), _jsxs("div", { className: clsx(s['box-avatar-name']), children: [_jsx("div", { className: clsx(s['avatar-profileUser']), children: _jsx("img", { src: user?.profile_picture || 'default-avatar.png', alt: "Avatar" }) }), _jsxs("span", { className: clsx(s['name-profileProfile']), children: [user?.name || 'Tên người dùng', user?.role === 'admin' && _jsx(CheckCircleIcon, { sx: { fontSize: 'var(--medium-icon)', color: 'primary.main', ml: 1 } })] })] }), _jsxs("div", { className: clsx(s['container-profileUser']), children: [_jsxs("div", { className: clsx(s['column-left']), children: [_jsxs("div", { className: clsx(s['box-top']), children: [_jsx("h4", { className: clsx(s['h4-title']), children: "Gi\u1EDBi thi\u1EC7u" }), _jsxs("div", { className: clsx(s['box-icon-name']), children: [_jsxs("span", { children: ["Bi\u1EC7t danh: ", user?.referring] }), _jsx("br", {}), _jsx(PersonPinCircleRounded, {}), _jsxs("span", { children: ["Th\u00E0nh vi\u00EAn c\u1EE7a Ftech - Ng\u00E0y tham gia:", ' ', user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Chưa có thông tin'] })] })] }), _jsxs("div", { className: clsx(s['box-bottom']), children: [_jsx("h4", { className: clsx(s['h4-title']), children: "Ho\u1EA1t \u0111\u1ED9ng g\u1EA7n \u0111\u00E2y" }), _jsx("div", { className: clsx(s['box-icon-name']), children: "Ch\u01B0a c\u00F3 ho\u1EA1t \u0111\u1ED9ng g\u1EA7n \u0111\u00E2y" })] })] }), _jsxs("div", { className: clsx(s['column-right']), children: [_jsx("h6", { className: clsx(s['h5-title']), children: "C\u00E1c kh\u00F3a h\u1ECDc \u0111\u00E3 tham gia" }), coursesError && _jsx("div", { children: coursesError }), courses.length > 0 ? (courses.map((course, index) => (_jsxs("div", { className: clsx(s['box-small-right']), children: [_jsx("div", { className: clsx(s['thumbnail-img']), children: _jsx("img", { src: course.thumbnail, alt: course.title }) }), _jsxs("div", { className: clsx(s['div-Info']), children: [_jsx("h3", { className: clsx(s['info-title']), children: _jsx("a", { href: "#", children: course.title }) }), _jsx("p", { className: clsx(s['info-desc']), children: _jsx("p", { dangerouslySetInnerHTML: { __html: truncateText(course.description, 70) } }) }), _jsxs("p", { className: clsx(s['info-progress']), children: ["Ti\u1EBFn \u0111\u1ED9: ", course.progress, "%"] }), _jsx(Progress, { value: course.progress || 0 })] })] }, index)))) : (_jsx("div", { children: "Kh\u00F4ng c\u00F3 kh\u00F3a h\u1ECDc n\u00E0o" }))] })] })] }));
};
export default ProFile;
