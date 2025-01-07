import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Paper, Typography, Box, Tooltip, IconButton, TablePagination, TextField, } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useUsers from '../../../../api/useUsers';
import { useNavigate } from 'react-router-dom';
import HeaderTitle from '../Title';
const StudentList = () => {
    const { rows, loading, error } = useUsers();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const handleViewDetails = (user) => {
        const userId = user?.id || user?._id;
        if (userId) {
            navigate(`/user-detail/${userId}`);
        }
        else {
            console.error('Không tìm thấy id của người dùng.');
        }
    };
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const filteredRows = rows.filter((row) => row.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (loading)
        return _jsx(Typography, { children: "Loading..." });
    if (error)
        return _jsxs(Typography, { children: ["Error: ", error] });
    const paginatedRows = filteredRows.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    return (_jsxs(Box, { children: [_jsx(HeaderTitle, { des: "\u0110\u00E2y l\u00E0 trang chi danh s\u00E1ch ng\u01B0\u1EDDi d\u00F9ng" }), _jsx(Box, { sx: { mb: 2, p: 2 }, component: Paper, children: _jsx(TextField, { label: "T\u00ECm ki\u1EBFm theo t\u00EAn", variant: "outlined", fullWidth: true, value: searchQuery, onChange: handleSearchChange, sx: { marginBottom: 2 } }) }), _jsx(TableContainer, { component: Paper, sx: { borderRadius: 0 }, children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Avatar" }), _jsx(TableCell, { align: "center", children: "T\u00EAn" }), _jsx(TableCell, { align: "center", children: "\u0110\u1ECBa ch\u1EC9 Email" }), _jsx(TableCell, { align: "center", children: "S\u1ED1 \u0110i\u1EC7n tho\u1EA1i" }), _jsx(TableCell, { align: "center", children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsx(TableBody, { children: paginatedRows.map((row) => (_jsxs(TableRow, { sx: { '&:last-child td, &:last-child th': { border: 0 } }, children: [_jsx(TableCell, { children: _jsx(Avatar, { alt: row.name }) }), _jsx(TableCell, { align: "center", children: row.name || 'N/A' }), _jsx(TableCell, { align: "center", children: row.email || 'N/A' }), _jsx(TableCell, { align: "center", children: row.phone || 'N/A' }), _jsx(TableCell, { align: "center", children: _jsx(Tooltip, { title: "Xem chi ti\u1EBFt", children: _jsx(IconButton, { onClick: () => handleViewDetails(row), color: "primary", children: _jsx(VisibilityIcon, {}) }) }) })] }, row.id || row._id))) })] }) }), _jsx(TablePagination, { rowsPerPageOptions: [5, 10, 25], component: "div", count: filteredRows.length, rowsPerPage: rowsPerPage, page: page, onPageChange: (_, newPage) => setPage(newPage), onRowsPerPageChange: (event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                } })] }));
};
export default StudentList;
