import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Box, MenuItem, Select, FormControl, InputLabel, } from '@mui/material';
import axiosInstance from '@/api/axiosInstance';
import HeaderTitle from '../Title';
const DEFAULT_IMAGE = '/placeholder-image.jpg';
const columns = [
    {
        id: '_id',
        label: 'ID Đơn Hàng',
        minWidth: 150,
    },
    {
        id: 'user_id',
        label: 'Người Mua',
        minWidth: 150,
        format: (value) => {
            if (!value || typeof value !== 'object')
                return 'N/A';
            return (_jsxs("div", { children: [_jsx("div", { children: value.name || 'Không có tên' }), _jsx("div", { style: { fontSize: '0.8em', color: '#666' }, children: value.email || 'Không có email' })] }));
        },
    },
    {
        id: 'course_id',
        label: 'Khóa Học Mua',
        minWidth: 200,
        format: (value) => {
            if (!value || typeof value !== 'object')
                return 'N/A';
            return (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '10px' }, children: [_jsx("img", { src: value.thumbnail || DEFAULT_IMAGE, alt: value.title || 'Khóa học', style: { width: '50px', objectFit: 'cover', borderRadius: 4 }, onError: (e) => {
                            const target = e.target;
                            target.src = DEFAULT_IMAGE;
                        } }), _jsx("span", { children: value.title || 'Không có tiêu đề' })] }));
        },
    },
    {
        id: 'purchaseDate',
        label: 'Ngày Mua',
        minWidth: 120,
        format: (value) => {
            if (!value)
                return 'N/A';
            try {
                return new Date(value).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                });
            }
            catch {
                return 'Ngày không hợp lệ';
            }
        },
    },
    {
        id: 'status',
        label: 'Trạng Thái',
        minWidth: 120,
        format: (value) => {
            if (!value)
                return 'N/A';
            const statusStyles = {
                pending: { color: '#f59e0b', background: '#fef3c7' },
                completed: { color: '#10b981', background: '#d1fae5' },
                failed: { color: '#ef4444', background: '#fee2e2' },
            };
            const statusText = {
                pending: 'Chưa thanh toán',
                completed: 'Đã thanh toán',
                failed: 'Thánh toán thất bại',
            };
            const style = statusStyles[value] || { color: '#666', background: '#f3f4f6' };
            const text = statusText[value] || value;
            return (_jsx("span", { style: {
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    ...style,
                }, children: text }));
        },
    },
    {
        id: 'payment_method',
        label: 'Phương Thức Thanh Toán',
        minWidth: 150,
        format: (value) => {
            if (!value)
                return 'N/A';
            const methodText = {
                bank_transfer: 'Chuyển khoản ngân hàng',
                momo: 'Ví MoMo',
                vnpay: 'VNPay',
                cash: 'Tiền mặt',
            };
            return methodText[value] || value;
        },
    },
    {
        id: 'amount',
        label: 'Tổng Tiền',
        minWidth: 120,
        align: 'right',
        format: (value) => {
            if (typeof value !== 'number')
                return '0 ₫';
            try {
                return value.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                });
            }
            catch {
                return `${value.toLocaleString()} ₫`;
            }
        },
    },
];
const TransactionHistory = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [orders, setOrders] = useState([]);
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        sortPrice: '',
        searchId: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);
            const params = new URLSearchParams();
            if (filters.minPrice)
                params.append('minPrice', filters.minPrice);
            if (filters.maxPrice)
                params.append('maxPrice', filters.maxPrice);
            if (filters.sortPrice)
                params.append('sortPrice', filters.sortPrice);
            if (filters.searchId)
                params.append('searchId', filters.searchId);
            const response = await axiosInstance.get(`/api/order/transactionhistory?${params.toString()}`);
            if (response.data && Array.isArray(response.data.data)) {
                setOrders(response.data.data);
            }
            else {
                setOrders([]);
                setError('Định dạng dữ liệu không hợp lệ');
            }
        }
        catch (error) {
            console.error('Error fetching orders:', error);
            setError('Có lỗi xảy ra khi tải dữ liệu');
            setOrders([]);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchOrders();
    }, [filters]);
    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };
    return (_jsxs(Box, { children: [_jsx(HeaderTitle, { des: "\u0110\u00E2y l\u00E0 trang l\u1ECBch s\u1EED giao d\u1ECBch" }), _jsxs(Paper, { sx: { width: '100%', overflow: 'hidden' }, children: [_jsxs(Box, { sx: { p: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }, children: [_jsx(TextField, { label: "T\u00ECm ki\u1EBFm ID \u0110\u01A1n H\u00E0ng", name: "searchId", value: filters.searchId, onChange: handleFilterChange, size: "small" }), _jsx(TextField, { label: "Gi\u00E1 t\u1ED1i thi\u1EC3u", name: "minPrice", value: filters.minPrice, onChange: handleFilterChange, size: "small" }), _jsx(TextField, { label: "Gi\u00E1 t\u1ED1i \u0111a", name: "maxPrice", value: filters.maxPrice, onChange: handleFilterChange, size: "small" }), _jsxs(FormControl, { size: "small", sx: { minWidth: 120 }, children: [_jsx(InputLabel, { id: "sortPriceLabel", children: "S\u1EAFp x\u1EBFp gi\u00E1" }), _jsxs(Select, { labelId: "sortPriceLabel", label: "S\u1EAFp x\u1EBFp gi\u00E1", name: "sortPrice", value: filters.sortPrice, onChange: handleFilterChange, children: [_jsx(MenuItem, { value: "", children: "Kh\u00F4ng" }), _jsx(MenuItem, { value: "asc", children: "T\u0103ng d\u1EA7n" }), _jsx(MenuItem, { value: "desc", children: "Gi\u1EA3m d\u1EA7n" })] })] })] }), loading ? (_jsx("div", { children: "\u0110ang t\u1EA3i..." })) : error ? (_jsx("div", { children: error })) : (_jsx(TableContainer, { sx: { maxHeight: 440 }, children: _jsxs(Table, { stickyHeader: true, "aria-label": "sticky table", children: [_jsx(TableHead, { children: _jsx(TableRow, { children: columns.map((column) => (_jsx(TableCell, { style: { minWidth: column.minWidth }, children: column.label }, column.id))) }) }), _jsx(TableBody, { children: orders
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((order) => {
                                        return (_jsx(TableRow, { hover: true, role: "checkbox", tabIndex: -1, children: columns.map((column) => {
                                                const value = order[column.id];
                                                return (_jsx(TableCell, { children: column.format ? column.format(value) : value }, column.id));
                                            }) }, order._id));
                                    }) })] }) })), _jsx(TablePagination, { rowsPerPageOptions: [10, 25, 100], component: "div", count: orders.length, rowsPerPage: rowsPerPage, page: page, onPageChange: handleChangePage, onRowsPerPageChange: handleChangeRowsPerPage })] })] }));
};
export default TransactionHistory;
