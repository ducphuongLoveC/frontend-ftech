import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, TablePagination, TextField, Avatar, } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import moment from 'moment';
import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
moment.locale('vi');
const StudentList = ({ users, onSearch, valueSearch }) => {
    const [searchTerm, setSearchTerm] = useState(valueSearch);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    // Handle pagination change
    const handleChangePage = (_event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page
    };
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value); // Trigger the search callback
    };
    // Pagination logic
    const paginatedUsers = users?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    return (_jsxs(_Fragment, { children: [_jsx(TextField, { placeholder: "T\u00ECm ki\u1EBFm...", variant: "outlined", value: searchTerm, onChange: handleSearch, sx: { maxWidth: 300 } }), users?.length ? (_jsxs(_Fragment, { children: [_jsx(TableContainer, { component: Paper, sx: { borderRadius: 0 }, children: _jsxs(Table, { sx: { minWidth: 650 }, "aria-label": "learning paths table", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "\u1EA2nh \u0111\u1EA1i di\u1EC7n" }), _jsx(TableCell, { children: "H\u1ECD v\u00E0 t\u00EAn" }), _jsx(TableCell, { children: "Email" }), _jsx(TableCell, { children: "S\u1ED1 gi\u1EDD d\u00E0nh cho kh\u00F3a h\u1ECDc" }), _jsx(TableCell, { children: "L\u1EA7n h\u1ECDc g\u1EA7n \u0111\u00E2y" }), _jsx(TableCell, { align: "right", children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsx(TableBody, { children: paginatedUsers.map((user) => (_jsxs(TableRow, { sx: { '&:last-child td, &:last-child th': { border: 0 } }, children: [_jsx(TableCell, { component: "th", scope: "row", children: _jsx(Avatar, { src: user.profile_picture }) }), _jsx(TableCell, { children: user.name }), _jsx(TableCell, { children: user.email }), _jsx(TableCell, { children: moment.utc(user.stats.total_time * 1000).format('HH:mm:ss') }), _jsx(TableCell, { children: moment(user.stats.last_accessed).fromNow() }), _jsx(TableCell, { align: "right", children: _jsx(Tooltip, { title: "Xem chi ti\u1EBFt", children: _jsx(Link, { to: `/user-detail/${user.user_id}`, children: _jsx(IconButton, { color: "primary", children: _jsx(Visibility, {}) }) }) }) })] }, user._id))) })] }) }), _jsx(TablePagination, { rowsPerPageOptions: [5, 10, 25], component: "div", count: users.length, rowsPerPage: rowsPerPage, page: page, onPageChange: handleChangePage, onRowsPerPageChange: handleChangeRowsPerPage, labelRowsPerPage: "S\u1ED1 h\u00E0ng m\u1ED7i trang" })] })) : (_jsx(Typography, { children: "Ch\u01B0a c\u00F3 h\u1ECDc vi\u00EAn n\u00E0o tham gia kh\u00F3a h\u1ECDc n\u00E0y ho\u1EB7c kh\u00F4ng t\u00ECm th\u1EA5y" }))] }));
};
export default memo(StudentList);
