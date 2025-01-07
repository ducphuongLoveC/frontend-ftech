import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, styled, TablePagination, Typography, useTheme, List, ListItem } from '@mui/material';
import { More } from '@mui/icons-material';
import moment from 'moment';
// import * as _ from 'lodash';
import HeadlessTippy from '@tippyjs/react/headless';
// my pj
import CourseListSkl from '@/ui-component/cards/Skeleton/CourseListSkl';
import HeaderTitle from '../Title';
import path from '@/constants/routes';
import FilterComponent from '@/components/Filter';
import { getCourseList } from '@/api/courseApi';
import { useState } from 'react';
import { fetchLearningPaths } from '@/api/learningPathApi';
import Wrapper from '@/components/Wrapper';
const BoxBetween = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '25px',
}));
const CourseList = () => {
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [params, setParams] = useState({});
    const queries = useQueries({
        queries: [
            {
                queryKey: ['courses', params],
                queryFn: () => getCourseList(params),
            },
            {
                queryKey: ['learning_paths'],
                queryFn: fetchLearningPaths,
            },
        ],
    });
    const { data: courses, isLoading: isLoadingCourses } = queries[0];
    const learningPaths = queries[1];
    ``;
    const filterLearningPathList = useMemo(() => {
        return learningPaths?.data?.map((l) => ({ display: l.title, value: l._id }));
    }, [learningPaths]);
    if (isLoadingCourses)
        return _jsx(CourseListSkl, {});
    const handleSetParams = (params) => {
        const { search, ...rest } = params;
        const transform = Object.entries(rest).reduce((acc, [key, values]) => {
            acc[key] = values.map(({ value }) => value).join(',');
            return acc;
        }, {});
        setParams({ ...transform, search });
    };
    const handleChangePage = (_event, newPage) => {
        setPage(newPage);
        setParams((pre) => {
            return { ...pre, page: newPage };
        });
    };
    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
        setParams((pre) => {
            return { ...pre, limit: newRowsPerPage };
        });
    };
    const CourseDuration = (course) => {
        const totalDuration = course.modules.reduce((moduleAcc, module) => {
            return (moduleAcc +
                module.resources.reduce((resourceAcc, resource) => {
                    return resourceAcc + resource.duration;
                }, 0));
        }, 0);
        return _jsx("div", { children: moment.utc(totalDuration * 1000).format('HH:mm:ss') });
    };
    const CourseResourceTotal = (course) => {
        const resourceTotal = course.modules.reduce((moduleAcc, module) => {
            return moduleAcc + module.resources.length;
        }, 0);
        return resourceTotal;
    };
    return (_jsxs(Box, { children: [_jsx(HeaderTitle, { des: 'Ch\u1EE9c n\u0103ng "Danh s\u00E1ch kh\u00F3a h\u1ECDc" gi\u00FAp cho qu\u1EA3n tr\u1ECB c\u00F3 c\u00E1i\r\n        nh\u00ECn t\u1ED5ng quan v\u1EC1 c\u00E1c kh\u00F3a h\u1ECDc trong h\u1EC7 th\u1ED1ng, v\u00E0 c\u00F3 th\u1EC3 thao t\u00E1c v\u1EDBi nh\u1EEFng ngu\u1ED3n t\u00E0i nguy\u00EAn \u0111\u00F3.', titleButton: "T\u1EA1o kh\u00F3a h\u1ECDc", link: path.admin.newCourse }), _jsx(FilterComponent, { filters: [
                    {
                        displayName: 'Danh mục',
                        name: 'learning_paths',
                        values: filterLearningPathList,
                    },
                    {
                        displayName: 'Loại khóa học',
                        name: 'types',
                        values: [
                            { display: 'Tính phí', value: false },
                            { display: 'Miễn phí', value: true },
                        ],
                    },
                ], onFilter: handleSetParams }), _jsx(Grid, { container: true, spacing: 2, children: courses?.data?.length ? (courses?.data?.map((course) => (_jsx(Grid, { item: true, sm: 12, md: 6, children: _jsxs(Box, { sx: { backgroundColor: theme.palette.background.paper }, p: 2, children: [_jsxs(BoxBetween, { children: [_jsx(Typography, { variant: "h3", children: course.title }), _jsx(HeadlessTippy, { placement: "bottom-end", trigger: "click", interactive: true, allowHTML: true, render: ({ attrs }) => (_jsx(Wrapper, { sx: { p: 0 }, ...attrs, children: _jsx(List, { sx: { p: 0 }, children: _jsx(ListItem, { children: _jsx(Link, { to: path.admin.courseStatistics(course._id), children: "Xem chi ti\u1EBFt" }) }) }) })), children: _jsx(More, { sx: { cursor: 'pointer' } }) })] }), _jsxs(Grid, { container: true, spacing: 3, children: [_jsx(Grid, { item: true, lg: 6, children: _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, children: course.thumbnail && _jsx("img", { src: typeof course.thumbnail === 'string' ? course.thumbnail : '' }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Button, { fullWidth: true, component: Link, to: `/courses/${course._id}/update`, variant: "outlined", children: "Xem v\u00E0 s\u1EEDa kh\u00F3a h\u1ECDc" }) })] }) }), _jsxs(Grid, { item: true, lg: 6, children: [_jsxs(BoxBetween, { children: [_jsx(Typography, { children: "T\u1ED5ng th\u1EDDi gian" }), _jsx(Typography, { children: CourseDuration(course) })] }), _jsxs(BoxBetween, { children: [_jsx(Box, { children: "S\u1ED1 l\u01B0\u1EE3ng ch\u01B0\u01A1ng" }), _jsx(Box, { children: course.modules.length })] }), _jsxs(BoxBetween, { children: [_jsx(Box, { children: "S\u1ED1 l\u01B0\u1EE3ng t\u00E0i li\u1EC7u" }), _jsx(Box, { children: CourseResourceTotal(course) })] }), _jsxs(BoxBetween, { children: [_jsx(Box, { children: "Lo\u1EA1i kh\u00F3a h\u1ECDc" }), _jsx(Box, { children: course.isFree ? 'Miễn phí' : 'Tính phí' })] })] })] })] }) }, course._id)))) : (_jsx(Grid, { item: true, xs: 12, sx: { display: 'flex', alignItems: 'center' }, justifyContent: 'center', children: _jsx(Typography, { children: "Hong t\u00ECm th\u1EA5y kh\u00F3a h\u1ECDc" }) })) }), _jsx(TablePagination, { rowsPerPageOptions: [4, 8, 20], component: "div", count: courses.pagination.totalItems, rowsPerPage: rowsPerPage, page: page, onPageChange: handleChangePage, onRowsPerPageChange: handleChangeRowsPerPage })] }));
};
export default CourseList;
