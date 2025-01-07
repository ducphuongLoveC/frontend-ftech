import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import moment from 'moment';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Box, Button, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip, Paper, Typography, Card, CardMedia, CardContent, TablePagination, Select, MenuItem, FormControl, InputLabel, } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import HeaderTitle from '../Title';
import Dialog from '@/components/Dialog';
import { getPaidCourses } from '@/api/courseApi';
import { createCoupon, deleteCoupon, getAllCoupon, updateCoupon } from '@/api/coupon';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';
// my pj
import FormCoupon from './FormCoupon';
const Coupon = () => {
    const theme = useTheme();
    const [openDialogCouponForm, setOpenDialogCouponForm] = useState(false);
    const [openApplyCourseMore, setOpenApplyCourseMore] = useState(false);
    const [applyCourseMoreData, setApplyCourseMoreData] = useState([]);
    const [editData, setEditData] = useState({});
    const [params, setParams] = useState({
        page: 1,
        limit: 5,
        order: 'asc',
    });
    const { data: courses, isLoading: isLoadingCourses } = useQuery({
        queryKey: ['courses'],
        queryFn: getPaidCourses,
    });
    const { data: coupons, isLoading: isLoadingCoupons, refetch: refetchCouponList, } = useQuery({
        queryKey: ['coupons', params],
        queryFn: () => getAllCoupon(params),
    });
    const mutationCreateCoupon = useMutation({
        mutationKey: ['createCoupon'],
        mutationFn: createCoupon,
        onSuccess: () => {
            refetchCouponList();
            toast.success('Tạo mã giảm giá thành công');
        },
        onError(error) {
            toast.error(error.response.data.message);
        },
    });
    const mutationUpdateCoupon = useMutation({
        mutationKey: ['updateCoupon'],
        mutationFn: updateCoupon,
        onSuccess: () => {
            setEditData({});
            refetchCouponList();
            toast.success('Cập nhật mã giảm giá thành công');
        },
        onError(error) {
            toast.error(error.response.data.message);
        },
    });
    const mutationDeleteCoupon = useMutation({
        mutationKey: ['deleteCoupon'],
        mutationFn: deleteCoupon,
        onSuccess: () => {
            refetchCouponList();
            toast.success('Xóa mã giảm giá thành công');
        },
        onError(error) {
            toast.error(error.response.data.message);
        },
    });
    const handleOpenCreateCoupon = () => {
        setOpenDialogCouponForm(true);
    };
    const handleCloseDialogCoupon = () => {
        setOpenDialogCouponForm(false);
        setEditData({});
    };
    const handleOpenApplyCourseMore = () => {
        setOpenApplyCourseMore(true);
    };
    const handleCloseApplyCourseMore = () => {
        setOpenApplyCourseMore(false);
        setApplyCourseMoreData([]);
    };
    const handleDeleteCoupon = (id) => {
        if (confirm('Xác nhận xóa')) {
            mutationDeleteCoupon.mutate(id);
        }
    };
    const onSubmit = (data) => {
        if (Object.keys(editData).length) {
            mutationUpdateCoupon.mutate({
                id: editData._id,
                data,
            });
        }
        else {
            mutationCreateCoupon.mutate(data);
        }
        handleCloseDialogCoupon();
    };
    if (isLoadingCourses || isLoadingCoupons)
        return _jsx("div", { children: "loading..." });
    return (_jsxs(Box, { children: [_jsx(HeaderTitle, { des: "Cho ph\u00E9p qu\u1EA3n tr\u1ECB t\u1EA1o ra c\u00E1c m\u00E3 gi\u1EA3m gi\u00E1 cho kh\u00F3a h\u1ECDc", titleButton: "T\u1EA1o m\u00E3", onClick: handleOpenCreateCoupon }), _jsx(Box, { sx: { mb: 2, p: 2 }, component: Paper, children: _jsxs(FormControl, { sx: { minWidth: '150px' }, children: [_jsx(InputLabel, { children: "S\u1EAFp x\u1EBFp theo gi\u00E1 tr\u1ECB gi\u1EA3m" }), _jsxs(Select, { value: params.order, onChange: (e) => setParams((pre) => ({ ...pre, order: e.target.value })), fullWidth: true, label: "S\u1EAFp x\u1EBFp theo gi\u00E1 tr\u1ECB gi\u1EA3m", children: [_jsx(MenuItem, { value: "asc", children: "T\u0103ng d\u1EA7n" }), _jsx(MenuItem, { value: "desc", children: "Gi\u1EA3m d\u1EA7n" })] })] }) }), _jsx(TableContainer, { component: Paper, sx: { borderRadius: 0 }, children: _jsxs(Table, { "aria-label": "learning paths table", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "M\u00E3" }), _jsx(TableCell, { children: "\u00C1p d\u1EE5ng kh\u00F3a h\u1ECDc" }), _jsx(TableCell, { children: "Lo\u1EA1i gi\u1EA3m gi\u00E1" }), _jsx(TableCell, { children: "Gi\u00E1 tr\u1ECB gi\u1EA3m" }), _jsx(TableCell, { children: "\u0110\u00E3 s\u1EED d\u1EE5ng" }), _jsx(TableCell, { children: "S\u1ED1 l\u01B0\u1EE3ng" }), _jsx(TableCell, { children: "Ng\u00E0y t\u1EA1o" }), _jsx(TableCell, { children: "Ng\u00E0y h\u1EBFt h\u1EA1n" }), _jsx(TableCell, { align: "right", children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsx(TableBody, { children: coupons?.data?.length > 0 ? (coupons.data.map((c) => (_jsxs(TableRow, { sx: { '&:last-child td, &:last-child th': { border: 0 } }, children: [_jsx(TableCell, { component: "th", scope: "row", children: c.code }), _jsx(TableCell, { children: c.courses.length > 0 && (_jsxs(_Fragment, { children: [c.courses.length, " kh\u00F3a h\u1ECDc", c.courses.map((course) => course.title).join(', ').length > 5 && (_jsx(Button, { onClick: () => {
                                                        setApplyCourseMoreData(c.courses);
                                                        handleOpenApplyCourseMore();
                                                    }, size: "small", sx: { ml: 1 }, children: "Xem" }))] })) }), _jsx(TableCell, { children: c.discount_type }), _jsxs(TableCell, { children: [c.discount_value, (() => {
                                                switch (c.discount_type) {
                                                    case 'percentage':
                                                        return '%';
                                                }
                                            })()] }), _jsx(TableCell, { children: c.used_count }), _jsx(TableCell, { children: c.max_uses }), _jsx(TableCell, { children: moment(c.start_date).format('HH:mm DD-MM-YYYY') }), _jsx(TableCell, { children: moment(c.end_date).format('HH:mm DD-MM-YYYY') }), _jsxs(TableCell, { align: "right", children: [_jsx(Tooltip, { title: "S\u1EEDa", children: _jsx(IconButton, { onClick: () => {
                                                        setEditData(c);
                                                        setOpenDialogCouponForm(true);
                                                    }, color: "primary", children: _jsx(EditIcon, {}) }) }), _jsx(Tooltip, { title: "X\u00F3a", children: _jsx(IconButton, { onClick: () => handleDeleteCoupon(c._id), color: "error", children: _jsx(DeleteIcon, {}) }) })] })] }, c._id)))) : (_jsx(Typography, { children: "Kh\u00F4ng c\u00F3 d\u1EEF li\u1EC7u" })) })] }) }), _jsx(TablePagination, { component: "div", rowsPerPageOptions: [5, 10, 25], count: coupons?.totalCoupons || 0, page: params.page - 1, rowsPerPage: params?.limit, onPageChange: (_event, newPage) => {
                    console.log(newPage);
                    setParams((pre) => ({ ...pre, page: newPage + 1 }));
                    // query.set('page', (newPage + 1).toString());
                }, onRowsPerPageChange: (event) => {
                    const newRowsPerPage = event.target.value;
                    setParams((pre) => ({ ...pre, page: 1, limit: newRowsPerPage }));
                    // query.set('limit', newRowsPerPage);
                    // query.set('page', '1');
                } }), _jsx(Dialog, { title: Object.keys(editData).length > 0 ? 'Cập nhật mã giảm giá' : 'Tạo mã giảm giá', open: openDialogCouponForm, onClose: handleCloseDialogCoupon, children: _jsx(FormCoupon, { textBtn: Object.keys(editData).length > 0 ? 'Cập nhật' : 'Tạo', values: Object.keys(editData).length > 0 && editData, onClose: handleCloseDialogCoupon, courses: courses, onSubmit: onSubmit }) }), _jsx(Dialog, { title: "\u00C1p d\u1EE5ng cho kh\u00F3a h\u1ECDc", open: openApplyCourseMore, onClose: handleCloseApplyCourseMore, children: _jsx(Grid, { container: true, spacing: 3, children: applyCourseMoreData.map((c) => (_jsx(Grid, { item: true, md: 4, children: _jsx(Link, { to: `/courses/${c._id}/update`, children: _jsxs(Card, { sx: { backgroundColor: theme.palette.background.paper2 }, children: [_jsx(CardMedia, { component: "img", alt: c.title, height: "140", image: c.thumbnail }), _jsx(CardContent, { sx: { p: 0 }, children: _jsx(Typography, { mt: 2, variant: "h4", gutterBottom: true, children: c.title }) })] }) }) }, c.id))) }) }), _jsx(ToastContainer, {})] }));
};
export default Coupon;
