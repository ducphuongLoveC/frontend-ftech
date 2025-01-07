import { jsx as _jsx } from "react/jsx-runtime";
import { TablePagination } from '@mui/material';
import { useState } from 'react';
const Page = ({ page, count, rowsPerPageOptions, onChange }) => {
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const handlePageChange = (_event, newPage) => {
        onChange(newPage, rowsPerPage);
    };
    const handleRowsPerPageChange = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        onChange(0, newRowsPerPage);
    };
    return (_jsx(TablePagination, { rowsPerPageOptions: rowsPerPageOptions, component: "div", count: count, rowsPerPage: rowsPerPage, page: page ? page - 1 : 0, onPageChange: handlePageChange, onRowsPerPageChange: handleRowsPerPageChange }));
};
export default Page;
