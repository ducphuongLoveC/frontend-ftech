import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useState } from 'react';
// ui
import { useTheme } from '@mui/material';
import { Box, Grid, CardMedia, styled, Typography, TablePagination } from '@mui/material';
// api
import { getCoursesProgressWithUser } from '@/api/userApi';
import WrapperCard from '../Home/WrapperCard';
import Progress from '@/components/Progress';
import { Link } from 'react-router-dom';
const CustomCardMedia = styled(CardMedia)({
    height: '160px',
    overflow: 'hidden',
    objectFit: 'cover',
});
const MyCourses = () => {
    const user = useSelector((state) => state.authReducer.user);
    console.log(user);
    const theme = useTheme();
    const { data: coursesWithProgress, isLoading } = useQuery({
        queryKey: ['coursesWithProgress'],
        queryFn: () => getCoursesProgressWithUser(user._id),
    });
    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8); // Default to 8 courses per page
    const handleChangePage = (_event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page when rows per page changes
    };
    if (isLoading)
        return _jsx("div", { children: "Loading..." });
    // Slice the courses data based on current page and rows per page
    const offset = page * rowsPerPage;
    const currentCourses = coursesWithProgress?.courses.slice(offset, offset + rowsPerPage);
    return (_jsxs(Box, { mt: 3, children: [_jsx(Typography, { variant: "h2", children: "Kh\u00F3a h\u1ECDc c\u1EE7a t\u00F4i" }), _jsx(Typography, { my: 2, variant: "body1", children: "C\u00E1c kh\u00F3a h\u1ECDc b\u1EA1n \u0111\u0103ng k\u00FD s\u1EBD \u0111\u01B0\u1EE3c hi\u1EC7n th\u1ECB \u1EDF \u0111\u00E2y" }), _jsx(Grid, { container: true, spacing: 2, children: currentCourses?.map((c) => (_jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, lg: 3, children: _jsx(Link, { to: `/learning/${c._id}`, children: _jsxs(WrapperCard, { children: [_jsx(CustomCardMedia, { image: c.thumbnail }), _jsxs(Box, { sx: {
                                        padding: 1,
                                        backgroundColor: theme.palette.background.paper2,
                                        height: '140px',
                                    }, children: [_jsx(Typography, { variant: "h4", mb: 1, children: c.title }), _jsxs(Typography, { variant: "h5", mt: 1, children: ["Ho\u00E0n th\u00E0nh ch\u01B0\u01A1ng: ", `${c.completedModules} / ${c.totalModules}`, ' ', c.completedModules === c.totalModules ? (_jsx(Typography, { color: 'green', component: 'span', children: "Ho\u00E0n th\u00E0nh" })) : null] }), _jsxs(Typography, { variant: "h5", mt: 1, children: ["Ho\u00E0n th\u00E0nh b\u00E0i h\u1ECDc: ", ` ${c.completedResources} / ${c.totalResources}`, ' ', c.completedResources === c.totalResources ? (_jsx(Typography, { color: 'green', component: 'span', children: "Ho\u00E0n th\u00E0nh" })) : null] }), _jsx(Progress, { sx: { mt: 3 }, textProgress: false, value: c.progress })] })] }) }) }, c._id))) }), _jsx(Box, { mt: 3, display: "flex", justifyContent: "center", children: _jsx(TablePagination, { rowsPerPageOptions: [8, 16, 24], component: "div", count: coursesWithProgress?.courses.length || 0, rowsPerPage: rowsPerPage, page: page, onPageChange: handleChangePage, onRowsPerPageChange: handleChangeRowsPerPage, labelRowsPerPage: "S\u1ED1 kh\u00F3a h\u1ECDc m\u1ED7i trang" }) })] }));
};
export default MyCourses;
