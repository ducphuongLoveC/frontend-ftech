import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCourseStatistics } from '@/api/courseApi';
import HeaderTitle from '../../Title';
import TabsCustom from '@/components/TabsCustom';
import StudentList from './StudentList';
import CourseDetail from './CourseDetail';
import useDebounce from '@/hooks/useDebounce';
const CourseStatistics = () => {
    const [params, setParams] = useState({
        search: '',
    });
    const navigate = useNavigate();
    const { id } = useParams();
    // Debounce the search parameter before making an API call
    const debouncedSearch = useDebounce(params.search, 500);
    const { data: course, isLoading: isLoadingCourse } = useQuery({
        queryKey: ['course', id, debouncedSearch],
        queryFn: () => getCourseStatistics(id || '', { search: debouncedSearch }),
        enabled: !!id,
    });
    if (isLoadingCourse)
        return _jsx("div", { children: "Loading..." });
    return (_jsxs(Box, { children: [_jsx(HeaderTitle, { des: "Th\u00F4ng k\u00EA chi ti\u1EBFt v\u1EC1 c\u1EE5 th\u1EC3 c\u1EE7a kh\u00F3a h\u1ECDc", onClick: () => navigate(-1), titleButton: "Quay l\u1EA1i" }), _jsx(Box, { component: Paper, children: _jsx(TabsCustom, { labels: ['Học viên tham gia', 'Thông tin khóa học'], contents: [
                        _jsx(StudentList, { valueSearch: debouncedSearch, onSearch: (search) => setParams((prev) => ({ ...prev, search })), users: course?.enrolled_users }),
                        _jsx(CourseDetail, { course: course }),
                    ], onChange: () => { } }) })] }));
};
export default CourseStatistics;
