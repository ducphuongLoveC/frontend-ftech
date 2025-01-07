import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Paper, Box, Rating, MenuItem, Select, InputLabel, FormControl, Typography, TablePagination } from '@mui/material';
import HeaderTitle from '../Title';
import axiosInstance from '@/api/axiosInstance';
import { useState, useEffect } from 'react';
const ReviewList = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [starsFilter, setStarsFilter] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const fetchReviews = async () => {
        try {
            const response = await axiosInstance.get('/api/rating/all', {
                params: { stars: starsFilter, page: page + 1, limit: rowsPerPage },
            });
            setReviews(response.data);
        }
        catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        setLoading(true);
        fetchReviews();
    }, [starsFilter, page, rowsPerPage]);
    if (loading)
        return _jsx(Box, { children: "Loading..." });
    if (error)
        return _jsxs(Box, { children: ["Error: ", error] });
    return (_jsxs(Box, { children: [_jsx(HeaderTitle, { des: "\u0110\u00E2y l\u00E0 trang qu\u1EA3n l\u00FD \u0111\u00E1nh gi\u00E1" }), _jsx(Box, { sx: { mb: 2, p: 2 }, component: Paper, children: _jsxs(FormControl, { fullWidth: true, sx: { mb: 2 }, children: [_jsx(InputLabel, { id: "stars-filter-label", children: "L\u1ECDc theo s\u1ED1 sao" }), _jsxs(Select, { labelId: "stars-filter-label", value: starsFilter, label: "L\u1ECDc theo s\u1ED1 sao", onChange: (e) => setStarsFilter(e.target.value), children: [_jsx(MenuItem, { value: "", children: "T\u1EA5t c\u1EA3" }), [1, 2, 3, 4, 5].map((star) => (_jsxs(MenuItem, { value: star, children: [star, " sao"] }, star)))] })] }) }), reviews.length === 0 ? (_jsx(Typography, { align: "center", color: "textSecondary", children: "Kh\u00F4ng c\u00F3 \u0111\u00E1nh gi\u00E1 n\u00E0o kh\u1EDBp v\u1EDBi b\u1ED9 l\u1ECDc s\u1ED1 sao b\u1EA1n ch\u1ECDn" })) : (_jsxs(_Fragment, { children: [_jsx(TableContainer, { component: Paper, sx: { borderRadius: 0 }, children: _jsxs(Table, { "aria-label": "review table", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { align: "center", sx: { display: "flex", justifyItems: "center", alignItems: "center" }, children: "Avatar" }), _jsx(TableCell, { align: "center", children: "T\u00EAn ng\u01B0\u1EDDi \u0111\u00E1nh gi\u00E1" }), _jsx(TableCell, { align: "center", children: "Kh\u00F3a h\u1ECDc \u0111\u00E1nh gi\u00E1" }), _jsx(TableCell, { align: "center", children: "N\u1ED9i dung \u0111\u00E1nh gi\u00E1" }), _jsx(TableCell, { align: "center", children: "\u0110\u00E1nh gi\u00E1" })] }) }), _jsx(TableBody, { children: reviews.map((review) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsx(Avatar, { src: review.user.profile_picture || undefined }) }), _jsx(TableCell, { align: "center", children: review.user.name }), _jsx(TableCell, { align: "center", children: review.course?.title || 'N/A' }), _jsx(TableCell, { align: "center", children: review.comment }), _jsx(TableCell, { align: "center", children: _jsx(Rating, { value: review.stars, readOnly: true }) })] }, review._id))) })] }) }), _jsx(TablePagination, { rowsPerPageOptions: [5, 10, 25], component: "div", count: reviews.length, rowsPerPage: rowsPerPage, page: page, onPageChange: (_, newPage) => setPage(newPage), onRowsPerPageChange: (event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            setPage(0);
                        } })] }))] }));
};
export default ReviewList;
