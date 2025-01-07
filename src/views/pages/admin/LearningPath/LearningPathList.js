import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
// ui frw
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination, Button, TextField, Tooltip, Typography, } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
//icon
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
// my pj
import TextEditor from '@/components/TextEditor';
import LearningPathSkeletonList from '@/ui-component/cards/Skeleton/LearningPathListSkl';
import Dialog from '@/components/Dialog';
import { deleteLearningPath, fetchLearningPaths, newLearningPath, updateLearningPath } from '@/api/learningPathApi';
import HeaderTitle from '../Title';
import useDebounce from '@/hooks/useDebounce';
export default function LearningPathList() {
    const [params, setParams] = useState({
        search: '',
    });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentPath, setCurrentPath] = useState(null);
    const [editMode, setEditMode] = useState('');
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['learningPath', params],
        queryFn: () => fetchLearningPaths(params),
    });
    const refInput = useRef(null);
    const mutationCreate = useMutation({
        mutationKey: ['learningPath'],
        mutationFn: newLearningPath,
        onSuccess: () => {
            refetch();
            toast.success('Tạo thành công');
            reset();
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });
    const mutationUpdate = useMutation({
        mutationKey: ['learningPath'],
        mutationFn: ({ _id, updateData }) => updateLearningPath(_id, updateData),
        onSuccess: () => {
            toast.success('Cập nhật thành công.');
            handleCloseDialog();
            refetch();
        },
        onError: (error) => {
            toast.error('Cập nhật thất bại!');
            console.log(error);
        },
    });
    const mutationDelete = useMutation({
        mutationKey: ['learningPath'],
        mutationFn: deleteLearningPath,
        onSuccess: () => {
            toast.success('Xóa thành công');
            refetch();
        },
        onError: () => {
            toast.success('xóa thất bại');
        },
    });
    const { control, handleSubmit, reset, setValue, getValues } = useForm({
        defaultValues: {
            title: '',
            description: '',
        },
    });
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchValue = useDebounce(searchTerm, 500);
    useEffect(() => {
        setParams((pre) => ({ ...pre, search: debouncedSearchValue }));
    }, [debouncedSearchValue]);
    useEffect(() => {
        console.log(refInput);
        refInput.current?.focus();
    }, [data, debouncedSearchValue]);
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const openCreate = () => {
        reset({
            title: '',
            description: '',
        });
        setEditMode('create');
        setOpenDialog(true);
    };
    const openEdit = (path) => {
        setCurrentPath(path);
        setEditMode('update');
        setOpenDialog(true);
        reset({
            title: path.title,
            description: path.description,
        });
    };
    const openView = (path) => {
        setCurrentPath(path);
        setEditMode('detail');
        setOpenDialog(true);
        reset({
            title: path.title,
            description: path.description,
        });
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCurrentPath(null);
        setEditMode('');
    };
    const onSubmit = (data) => {
        console.log('Saving changes:', data);
        switch (editMode) {
            case 'create':
                handleCreate(data);
                break;
            case 'update':
                handleEdit(data);
                break;
        }
    };
    const handleCreate = (data) => {
        mutationCreate.mutate(data);
        setOpenDialog(false);
    };
    const handleEdit = (data) => {
        if (currentPath?._id) {
            mutationUpdate.mutate({
                _id: currentPath?._id,
                updateData: data,
            });
        }
        setOpenDialog(false);
    };
    const handleDelete = (id) => {
        if (confirm('Bạn có muốn xóa không?')) {
            mutationDelete.mutate(id);
        }
    };
    if (isLoading)
        return _jsx(LearningPathSkeletonList, {});
    if (isError)
        return _jsx("div", { children: "Error..." });
    return (_jsxs(_Fragment, { children: [_jsx(HeaderTitle, { des: 'Ch\u1EE9c n\u0103ng "danh m\u1EE5c kh\u00F3a h\u1ECDc" gi\u00FAp qu\u1EA3n tr\u1ECB vi\u00EAn c\u00F3 \r\n        c\u00E1i nh\u00ECn tr\u1EF1c quan v\u1EC1 t\u1ED5ng th\u1EC3 c\u00E1c danh m\u1EE5c. G\u1ED3m c\u00E1c ch\u1EE9c n\u0103ng Chi ti\u1EBFt, S\u1EEDa, X\u00F3a', onClick: openCreate, titleButton: "T\u1EA1o l\u1ED9 tr\u00ECnh h\u1ECDc" }), _jsx(Box, { sx: { mb: 2, p: 2 }, component: Paper, children: _jsx(TextField, { inputRef: refInput, placeholder: "T\u00ECm ki\u1EBFm...", variant: "outlined", value: searchTerm, onChange: handleSearch, sx: { maxWidth: 300 } }) }), _jsxs(Box, { sx: { width: '100%' }, children: [_jsx(TableContainer, { component: Paper, sx: { borderRadius: 0 }, children: _jsxs(Table, { sx: { minWidth: 650 }, "aria-label": "learning paths table", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "T\u00EAn danh m\u1EE5c" }), _jsx(TableCell, { children: "M\u00F4 t\u1EA3" }), _jsx(TableCell, { align: "right", children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsx(TableBody, { children: data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((path) => (_jsxs(TableRow, { sx: { '&:last-child td, &:last-child th': { border: 0 } }, children: [_jsx(TableCell, { component: "th", scope: "row", children: path.title }), _jsx(TableCell, { children: _jsx(Typography, { dangerouslySetInnerHTML: {
                                                        __html: path.description.substring(0, 100),
                                                    } }) }), _jsxs(TableCell, { align: "right", children: [_jsx(Tooltip, { title: "Xem chi ti\u1EBFt", children: _jsx(IconButton, { onClick: () => openView(path), color: "primary", children: _jsx(VisibilityIcon, {}) }) }), _jsx(Tooltip, { title: "S\u1EEDa", children: _jsx(IconButton, { onClick: () => openEdit(path), color: "primary", children: _jsx(EditIcon, {}) }) }), _jsx(Tooltip, { title: "X\u00F3a", children: _jsx(IconButton, { onClick: () => handleDelete(path._id), color: "error", children: _jsx(DeleteIcon, {}) }) })] })] }, path._id))) })] }) }), _jsx(TablePagination, { rowsPerPageOptions: [5, 10, 25], component: "div", count: data.length, rowsPerPage: rowsPerPage, page: page, onPageChange: handleChangePage, onRowsPerPageChange: handleChangeRowsPerPage })] }), _jsx(Dialog, { open: openDialog, onClose: handleCloseDialog, title: editMode === 'create' ? 'Thêm learning path' : editMode === 'update' ? 'Sửa learning path' : 'Xem chi tiết', children: _jsxs(Box, { sx: { pt: 2 }, component: "form", onSubmit: handleSubmit(onSubmit), children: [_jsx(Controller, { name: "title", control: control, render: ({ field }) => (_jsx(TextField, { fullWidth: true, label: "Title", ...field, disabled: editMode === 'detail', margin: "normal" })) }), _jsx(TextEditor, { initialValue: getValues('description'), onChange: (content) => setValue('description', content), mode: "advanced", disabled: !editMode, initialHeight: "300px" }), _jsxs(Box, { mt: 2, children: [_jsx(Button, { onClick: handleCloseDialog, color: "primary", children: editMode ? 'Hủy' : 'Đóng' }), editMode !== 'detail' && (_jsx(Button, { type: "submit", color: "primary", variant: "outlined", children: mutationCreate.isPending || mutationUpdate.isPending ? 'Đang lưu...' : 'Lưu' }))] })] }) }), _jsx(ToastContainer, {})] }));
}
