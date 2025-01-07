import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Paper, Typography, Box, TablePagination, TextField, } from '@mui/material';
import useUsersAdmin from '@/api/useUserAdmin';
import HeaderTitle from '../Title';
const HR = () => {
    const { rows, loading, error } = useUsersAdmin();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    if (loading) {
        return (_jsx(Box, { sx: { display: 'flex', justifyContent: 'center', padding: '20px' }, children: _jsx(Typography, { children: "Loading..." }) }));
    }
    if (error) {
        return (_jsx(Box, { children: _jsxs(Typography, { children: ["Error: ", error] }) }));
    }
    // Lọc người dùng theo tên
    const filteredRows = rows.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()));
    // Phân trang danh sách đã lọc
    const paginatedRows = filteredRows.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    // Hàm xử lý thay đổi từ khóa tìm kiếm
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    return (_jsxs(Box, { children: [_jsx(HeaderTitle, { des: "\u0110\u00E2y l\u00E0 trang danh s\u00E1ch admin" }), _jsx(Box, { sx: { mb: 2, p: 2 }, component: Paper, children: _jsx(TextField, { label: "T\u00ECm ki\u1EBFm theo t\u00EAn", variant: "outlined", fullWidth: true, value: searchQuery, onChange: handleSearchChange, sx: { marginBottom: 2 } }) }), _jsx(TableContainer, { component: Paper, sx: { borderRadius: 0 }, children: _jsxs(Table, { sx: { minWidth: 650 }, "aria-label": "user table", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Avatar" }), _jsx(TableCell, { align: "center", children: "T\u00EAn" }), _jsx(TableCell, { align: "center", children: "Email" }), _jsx(TableCell, { align: "center", children: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i" }), _jsx(TableCell, { align: "center", children: "Quy\u1EC1n Qu\u1EA3n Tr\u1ECB" })] }) }), _jsx(TableBody, { children: paginatedRows.map((user) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsx(Avatar, { src: user._id }) }), _jsx(TableCell, { align: "center", children: user.name }), _jsx(TableCell, { align: "center", children: user.email }), _jsx(TableCell, { align: "center", children: user.phone }), _jsx(TableCell, { align: "center", children: user.role })] }, user._id))) })] }) }), _jsx(TablePagination, { rowsPerPageOptions: [5, 10, 25], component: "div", count: filteredRows.length, rowsPerPage: rowsPerPage, page: page, onPageChange: (_, newPage) => setPage(newPage), onRowsPerPageChange: (event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                } })] }));
};
export default HR;
