import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography, Paper, TableRow, TableCell, IconButton, Tooltip, Collapse, TableContainer, Table, TableHead, TableBody, Backdrop, CircularProgress } from '@mui/material';
import axiosInstance from '@/api/axiosInstance';
import Dialog from '@/components/Dialog';
import HeaderTitle from '../Title';
import Carousel from '@/components/Carousel';
import TabsCustom from '@/components/TabsCustom';
import { Delete, Edit, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { colors } from '@/api/color';
const CarouselManager = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedColor, setSelectedColor] = useState('');
    const [isIndexOpens, setIsIndexOpens] = useState([]);
    const [newCarousel, setNewCarousel] = useState({
        path: '',
        image: '',
        background: '',
        title: '',
        description: '',
    });
    const [carousels, setCarousels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [_, setError] = useState(null);
    const [carouselToDelete, setCarouselToDelete] = useState(null);
    const [editCarouselId, setEditCarouselId] = useState(null); // For editing
    const handleToggler = (index) => {
        if (isIndexOpens.includes(index)) {
            setIsIndexOpens(isIndexOpens.filter((i) => i !== index));
        }
        else {
            setIsIndexOpens((pre) => [...pre, index]);
        }
    };
    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };
    const handleCloseDialog = () => {
        // Reset form khi đóng Dialog
        setNewCarousel({ path: '', image: '', background: '', title: '', description: '' });
        setSelectedColor('');
        setEditCarouselId(null); // Reset editCarouselId khi đóng Dialog
        setError(null); // Xóa lỗi
        setOpenDialog(false);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCarousel((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async () => {
        if (!newCarousel.path || !newCarousel.title || !newCarousel.description) {
            setError('Vui lòng điền đầy đủ thông tin bắt buộc.');
            return;
        }
        if (!newCarousel.image && !editCarouselId) {
            setError('Vui lòng chọn hình ảnh.');
            return;
        }
        setIsLoading(true); // Bắt đầu loading
        try {
            const formData = new FormData();
            if (newCarousel.path)
                formData.append('path', newCarousel.path);
            // Nếu đang chỉnh sửa và không thay đổi ảnh, gửi URL hiện tại
            if (editCarouselId && typeof newCarousel.image === 'string') {
                formData.append('image', newCarousel.image); // URL ảnh hiện tại
            }
            // Nếu ảnh là file mới được chọn
            else if (newCarousel.image instanceof File) {
                formData.append('image', newCarousel.image);
            }
            else if (!editCarouselId) {
                setError('Hình ảnh không hợp lệ.');
                return;
            }
            if (selectedColor)
                formData.append('background', selectedColor);
            if (newCarousel.title)
                formData.append('title', newCarousel.title);
            if (newCarousel.description)
                formData.append('description', newCarousel.description);
            let response;
            if (editCarouselId) {
                response = await axiosInstance.put(`/api/carousel/${editCarouselId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
            else {
                response = await axiosInstance.post('/api/carousel', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
            if (response.data.success) {
                // Update state for carousel list
                if (editCarouselId) {
                    setCarousels((prevCarousels) => prevCarousels.map((carousel) => carousel._id === editCarouselId ? response.data.data : carousel));
                    alert('Carousel đã được sửa thành công!');
                }
                else {
                    setCarousels((prevCarousels) => [...prevCarousels, response.data.data]);
                    alert('Carousel đã được tạo thành công!');
                }
                // Reset form data and states
                setNewCarousel({ path: '', image: '', background: '', title: '', description: '' });
                setSelectedColor('');
                setEditCarouselId(null);
                setError(null);
                setOpenDialog(false);
            }
            else {
                // Kiểm tra thông điệp lỗi từ backend
                if (response.data.message === "Đã đạt giới hạn 10 carousel, không thể tạo thêm") {
                    setError('Đã đạt giới hạn 10 carousel, không thể tạo thêm');
                    alert('Không thể tạo thêm carousel, đã đạt giới hạn!');
                }
                else {
                    setError('Không thể tạo/sửa carousel');
                    alert('Không thể tạo/sửa carousel');
                }
            }
        }
        catch (error) {
            console.error('Error creating/updating carousel:', error);
            setError('Lỗi khi tạo/sửa carousel');
            alert('Đã có lỗi xảy ra khi tạo/sửa carousel hoặc vượt quá 10 carousel!');
        }
        finally {
            setIsLoading(false); // Tắt loading
        }
    };
    const handleDelete = async () => {
        if (!carouselToDelete)
            return;
        try {
            const response = await axiosInstance.delete(`/api/carousel/${carouselToDelete}`);
            if (response.data.success) {
                setCarousels((prevCarousels) => prevCarousels.filter((carousel) => carousel._id !== carouselToDelete));
                alert('Carousel đã được xóa thành công!');
                setError(null);
            }
            else {
                setError('Không thể xóa carousel');
                alert('Không thể xóa carousel');
            }
        }
        catch (error) {
            setError('Lỗi khi xóa carousel');
            console.error(error);
            alert('Đã có lỗi xảy ra khi xóa carousel!');
        }
    };
    const fetchCarousels = async () => {
        try {
            const response = await axiosInstance.get('/api/carousel');
            if (response.data.success) {
                setCarousels(response.data.data);
            }
            else {
                setError('Không có carousel nào');
            }
        }
        catch (error) {
            setError('Lỗi khi tải dữ liệu');
        }
        finally {
            setLoading(false);
        }
    };
    const handleEdit = (carousel) => {
        setNewCarousel({
            path: carousel.path,
            image: carousel.image,
            background: carousel.background,
            title: carousel.title,
            description: carousel.description,
        });
        setSelectedColor(carousel.background);
        setEditCarouselId(carousel._id); // Set the carousel ID for editing
        setOpenDialog(true);
    };
    useEffect(() => {
        fetchCarousels();
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(HeaderTitle, { des: "Qu\u1EA3n l\u00FD banner", titleButton: "T\u1EA1o carousel", onClick: () => setOpenDialog(true) }), _jsx(Box, { component: Paper, sx: { padding: '20px' }, children: _jsx(TabsCustom, { onChange: () => { }, labels: ['Xem trước', 'Dữ liệu'], contents: [
                        _jsx(Carousel, { dot: true, sliders: carousels.length > 0 ? carousels : [] }),
                        _jsx(TableContainer, { sx: { borderRadius: '0' }, children: _jsxs(Table, { "aria-label": "learning paths table", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, {}), _jsx(TableCell, { children: "T\u00EAn" }), _jsx(TableCell, { children: "\u0110\u01B0\u1EDDng d\u1EABn" }), _jsx(TableCell, { align: "right", children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsx(TableBody, { children: loading ? (_jsx(Typography, { children: "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u..." })) : (carousels.map((carousel) => (_jsxs(_Fragment, { children: [_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsx(IconButton, { onClick: () => handleToggler(carousel._id), size: "small", children: isIndexOpens.includes(carousel._id) ? _jsx(KeyboardArrowUp, {}) : _jsx(KeyboardArrowDown, {}) }) }), _jsx(TableCell, { children: carousel.title }), _jsx(TableCell, { children: carousel.path }), _jsxs(TableCell, { align: "right", children: [_jsx(Tooltip, { title: "S\u1EEDa", children: _jsx(IconButton, { color: "primary", onClick: () => handleEdit(carousel), children: _jsx(Edit, {}) }) }), _jsx(Tooltip, { title: "X\u00F3a", children: _jsx(IconButton, { color: "error", onClick: () => {
                                                                            setCarouselToDelete(carousel._id);
                                                                            handleDelete();
                                                                        }, children: _jsx(Delete, {}) }) })] })] }, carousel._id), _jsx(TableRow, { children: _jsx(TableCell, { colSpan: 4, style: { paddingBottom: 0, paddingTop: 0 }, children: _jsx(Collapse, { in: isIndexOpens.includes(carousel._id), timeout: "auto", unmountOnExit: true, children: _jsxs(Box, { sx: {
                                                                    width: '100%',
                                                                    height: '250px',
                                                                    background: carousel.background,
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    padding: '20px 10px 0 50px',
                                                                    borderRadius: '10px',
                                                                }, children: [_jsxs(Box, { sx: {
                                                                            flex: 1,
                                                                            color: 'white',
                                                                            display: 'flex',
                                                                            justifyContent: 'space-between',
                                                                            flexDirection: 'column',
                                                                        }, children: [_jsxs(Box, { children: [_jsx(Typography, { sx: { color: 'white', marginBottom: '10px' }, variant: "h1", component: "h1", children: carousel.title }), _jsx(Typography, { sx: { lineHeight: '25px' }, variant: "body1", component: "p", children: carousel.description })] }), _jsx(Box, { children: _jsx(Link, { to: carousel.path, children: _jsx(Button, { sx: {
                                                                                            backgroundColor: 'transparent',
                                                                                            color: 'white',
                                                                                            border: `2px solid white`,
                                                                                            marginBottom: '35px',
                                                                                            padding: '3px 20px',
                                                                                            borderRadius: 'var(--main-border-radius)',
                                                                                            fontWeight: '600',
                                                                                            transition: 'background-color 0.3s, color 0.3s',
                                                                                            '&:hover': {
                                                                                                backgroundColor: 'white',
                                                                                                color: 'black',
                                                                                            },
                                                                                        }, children: "H\u1ECDc ngay n\u00E0o" }) }) })] }), _jsx(Box, { sx: {
                                                                            display: { xs: 'none', sm: 'flex' },
                                                                            justifyContent: 'center',
                                                                            alignItems: 'center',
                                                                            flex: 1,
                                                                            padding: '10px',
                                                                        }, children: _jsx("img", { src: carousel.image, alt: carousel.title, style: { height: '100%', objectFit: 'contain' } }) })] }) }) }) })] })))) })] }) })
                    ] }) }), _jsx(Dialog, { open: openDialog, title: editCarouselId ? 'Sửa carousel' : 'Tạo carousel', onClose: handleCloseDialog, children: _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { label: "T\u00EAn Carousel", name: "title", fullWidth: true, value: newCarousel.title, onChange: handleChange }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { label: "\u0110\u01B0\u1EDDng d\u1EABn", name: "path", fullWidth: true, value: newCarousel.path, onChange: handleChange }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { label: "M\u00F4 t\u1EA3", name: "description", fullWidth: true, value: newCarousel.description, onChange: handleChange }) }), _jsxs(Grid, { item: true, xs: 12, children: [_jsx(Typography, { children: "Ch\u1ECDn m\u00E0u n\u1EC1n" }), _jsx(Grid, { container: true, spacing: 1, children: colors.map((color, index) => (_jsx(Grid, { item: true, xs: 1, children: _jsx(Box, { sx: {
                                                width: '60px',
                                                height: '60px',
                                                background: color,
                                                cursor: 'pointer',
                                                border: selectedColor === color ? '10px solid #fff' : '1px solid transparent',
                                            }, onClick: () => handleColorSelect(color) }) }, index))) })] }), _jsxs(Grid, { item: true, xs: 12, children: [newCarousel.image && typeof newCarousel.image === 'string' && (_jsxs(Box, { sx: { marginBottom: 2 }, children: [_jsx(Typography, { children: "H\u00ECnh \u1EA3nh hi\u1EC7n t\u1EA1i:" }), _jsx(Box, { component: "img", src: newCarousel.image, alt: "H\u00ECnh \u1EA3nh hi\u1EC7n t\u1EA1i", sx: { width: '100%', maxWidth: '200px', borderRadius: '8px' } })] })), _jsx(Typography, { children: "T\u1EA3i l\u00EAn h\u00ECnh \u1EA3nh m\u1EDBi:" }), _jsx("input", { type: "file", accept: "image/*", onChange: (e) => setNewCarousel({ ...newCarousel, image: e.target.files[0] }) })] }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Button, { disabled: isLoading, onClick: handleSubmit, variant: "contained", color: "primary", fullWidth: true, children: editCarouselId ? 'Cập nhật' : 'Tạo' }) })] }) }), _jsx(Backdrop, { sx: { color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }, open: isLoading, children: _jsx(CircularProgress, { color: "inherit" }) })] }));
};
export default CarouselManager;
