import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Paper, Box, Tooltip, IconButton, TablePagination, MenuItem, Select, InputLabel, FormControl, } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import axiosInstance from '@/api/axiosInstance';
import HeaderTitle from '../Title';
import { toast, ToastContainer } from 'react-toastify';
const Comments = () => {
    const [comments, setComments] = useState([]);
    const [courses, setCourses] = useState([]); // Mảng khóa học
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [courseId, setCourseId] = useState('');
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Sửa URL để gọi đúng API lấy danh sách khóa học
                const response = await axiosInstance.get('/api/courses'); // Lấy danh sách khóa học từ API courses
                setCourses(response.data.data); // Cập nhật dữ liệu khóa học vào state
            }
            catch (error) {
                console.error('Lỗi khi lấy khóa học:', error);
            }
        };
        fetchCourses();
    }, []);
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axiosInstance.get('/api/comment', {
                    params: { courseId },
                });
                setComments(response.data);
            }
            catch (error) {
                console.error('Lỗi khi lấy bình luận:', error);
            }
        };
        fetchComments();
        const interval = setInterval(fetchComments, 5000);
        return () => clearInterval(interval);
    }, [rowsPerPage, courseId]);
    const handleDelete = async (commentId) => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa bình luận này không?');
        if (!confirmDelete)
            return;
        try {
            const response = await axiosInstance.delete(`/api/comment/${commentId}`);
            setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
            if (response.status === 200) {
                toast.success('Xóa bình luận thành công!');
            }
        }
        catch (error) {
            console.error('Lỗi khi xóa bình luận:', error);
            toast.success(error?.response?.data?.message || 'Lỗi khi xóa bình luận. Vui lòng thử lại.');
        }
    };
    return (_jsxs(Box, { children: [_jsx(HeaderTitle, { des: "\u0110\u00E2y l\u00E0 trang qu\u1EA3n l\u00FD b\u00ECnh lu\u1EADn" }), _jsx(Box, { sx: { mb: 2, p: 2 }, component: Paper, children: _jsxs(FormControl, { fullWidth: true, sx: { marginBottom: 2 }, children: [_jsx(InputLabel, { children: "Ch\u1ECDn kh\u00F3a h\u1ECDc" }), _jsxs(Select, { label: "Ch\u1ECDn kh\u00F3a h\u1ECDc", value: courseId, onChange: (e) => setCourseId(e.target.value), children: [_jsx(MenuItem, { value: "", children: "T\u1EA5t c\u1EA3 kh\u00F3a h\u1ECDc" }), courses.map((course) => (_jsx(MenuItem, { value: course._id, children: course.title }, course._id)))] })] }) }), _jsx(TableContainer, { component: Paper, sx: { borderRadius: 0 }, children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { align: "center", children: "Avatar" }), _jsx(TableCell, { align: "center", children: "T\u00EAn ng\u01B0\u1EDDi d\u00F9ng" }), _jsx(TableCell, { align: "center", children: "Kh\u00F3a h\u1ECDc b\u00ECnh lu\u1EADn" }), _jsx(TableCell, { align: "center", children: "N\u1ED9i dung" }), _jsx(TableCell, { align: "center", children: "Th\u1EDDi gian t\u1EA1o" }), _jsx(TableCell, { align: "center", children: "C\u00E1c h\u00E0nh \u0111\u1ED9ng" })] }) }), _jsx(TableBody, { children: comments.length > 0 ? (comments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((comment) => (_jsxs(TableRow, { children: [_jsx(TableCell, { align: "center", children: _jsx(Avatar, { src: comment.user.profile_picture, alt: "" }) }), _jsx(TableCell, { align: "center", children: comment.user.name }), _jsx(TableCell, { align: "center", children: comment.course ? comment.course.title : 'Không có khóa học' }), _jsx(TableCell, { align: "center", children: _jsx("span", { dangerouslySetInnerHTML: { __html: comment.content } }) }), _jsx(TableCell, { align: "center", children: new Date(comment.createdAt).toLocaleString() }), _jsx(TableCell, { align: "center", children: _jsx(Tooltip, { title: "X\u00F3a", children: _jsx(IconButton, { color: "secondary", onClick: () => handleDelete(comment._id), children: _jsx(DeleteIcon, {}) }) }) })] }, comment._id)))) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 6, align: "center", children: "Kh\u00F4ng c\u00F3 d\u1EEF li\u1EC7u." }) })) })] }) }), _jsx(TablePagination, { rowsPerPageOptions: [5, 10, 25], component: "div", count: comments.length, rowsPerPage: rowsPerPage, page: page, onPageChange: (_, newPage) => setPage(newPage), onRowsPerPageChange: (event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                } }), _jsx(ToastContainer, {})] }));
};
export default Comments;
