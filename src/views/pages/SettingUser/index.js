import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useTheme, IconButton, TextField, Button, Typography, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, updateAvatar } from '../../../store/actions';
import PasswordModal from './PasswordModal';
import AvatarUploadModal from './AvatarUploadModal';
import Section from './Section';
import axiosInstance from '@/api/axiosInstance';
const sections = [
    {
        field: 'Thông tin người dùng',
        section: 'personalInfo',
    },
    {
        field: 'Đổi mật khẩu',
        section: 'securitySettings',
    },
];
const SettingUser = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const user = useSelector((state) => state.authReducer.user);
    // Thay đổi cách lấy userId
    const userId = user?._id;
    const dispatch = useDispatch();
    const [activeSection, setActiveSection] = useState('personalInfo');
    const [loading, setLoading] = useState(false);
    const [openPasswordModal, setOpenPasswordModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // State cho các trường có thể chỉnh sửa
    const [editableFields, setEditableFields] = useState({
        name: { isEditing: false, value: user?.name || '' },
        phone: { isEditing: false, value: user?.phone || '' },
        referring: { isEditing: false, value: user?.referring || '' },
    });
    // State để lưu URL avatar hiện tại
    const [avatarUrl, setAvatarUrl] = useState(user?.profile_picture || 'default-avatar.png');
    // State để quản lý trạng thái loading khi upload
    const [isUploading, setIsUploading] = useState(false);
    // State để quản lý Snackbar
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });
    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };
    // console.log('User from Redux:', user);
    // console.log('UserId:', userId);
    useEffect(() => {
        if (user) {
            // Cập nhật editableFields khi user thay đổi
            setEditableFields({
                name: { isEditing: false, value: user.name || '' },
                phone: { isEditing: false, value: user.phone || '' },
                referring: { isEditing: false, value: user.referring || '' },
            });
            setAvatarUrl(user.profile_picture || 'default-avatar.png');
        }
    }, [user]);
    useEffect(() => {
        if (user?.profile_picture) {
            setAvatarUrl(user.profile_picture);
        }
    }, [user?.profile_picture]);
    // Handle section change
    const handleSectionChange = (section) => {
        setActiveSection(section);
    };
    // Bắt đầu chỉnh sửa trường
    const startEditing = (field) => {
        setEditableFields({
            ...editableFields,
            [field]: { ...editableFields[field], isEditing: true },
        });
    };
    // Hủy chỉnh sửa
    const cancelEditing = (field) => {
        setEditableFields({
            ...editableFields,
            [field]: {
                isEditing: false,
                value: user[field] || '',
            },
        });
    };
    // Lưu giá trị mới
    const saveField = async (field) => {
        if (!userId) {
            console.error('Không tìm thấy userId');
            return;
        }
        try {
            setLoading(true);
            console.log('Đang cập nhật field:', field, 'với giá trị:', editableFields[field].value);
            // Sửa lại endpoint theo router backend
            const response = await axiosInstance.put(`/api/user/${userId}`, {
                [field]: editableFields[field].value,
            });
            console.log('Kết quả API:', response.data);
            if (response.data.success) {
                // Dispatch action để cập nhật Redux store
                dispatch(updateUser({ [field]: editableFields[field].value }));
                setEditableFields({
                    ...editableFields,
                    [field]: {
                        ...editableFields[field],
                        isEditing: false,
                    },
                });
                // Hiển thị thông báo thành công
                setSnackbar({ open: true, message: 'Cập nhật thành công!' });
            }
            else {
                setSnackbar({ open: true, message: response.data.message });
                throw new Error(response.data.message);
            }
        }
        catch (error) {
            console.log(error);
            console.error('Lỗi khi cập nhật dữ liệu:', error);
            setSnackbar({ open: true, message: error.response.data.message });
        }
        finally {
            setLoading(false);
        }
    };
    // Cập nhật giá trị đang chỉnh sửa
    const handleFieldChange = (field, newValue) => {
        setEditableFields({
            ...editableFields,
            [field]: {
                ...editableFields[field],
                value: newValue,
            },
        });
    };
    // Handle password modal
    const handleOpenPasswordModal = () => {
        setOpenPasswordModal(true);
    };
    const handleClosePasswordModal = () => {
        setOpenPasswordModal(false);
    };
    const handleSavePassword = (newPassword) => {
        console.log(newPassword);
        handleClosePasswordModal();
    };
    // Xử lý lỗi ảnh
    const handleImageError = (e) => {
        e.currentTarget.src = '/default-avatar.png';
    };
    // Handle avatar click
    const handleAvatarClick = () => {
        setIsModalOpen(true);
    };
    // Xử lý upload avatar
    const handleAvatarUpload = async (file) => {
        if (!userId) {
            console.error('Không tìm thấy userId');
            return;
        }
        try {
            setIsUploading(true);
            const formData = new FormData();
            formData.append('file', file);
            const response = await axiosInstance.post('/api/media/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const responseUpdatePictureLink = await axiosInstance.put(`/api/user/${userId}`, {
                profile_picture: response.data.url,
            });
            if (response.data.success && responseUpdatePictureLink.data.success) {
                const newAvatarUrl = response.data.url;
                dispatch(updateAvatar(newAvatarUrl));
                setAvatarUrl(newAvatarUrl);
                setIsModalOpen(false);
                setSnackbar({ open: true, message: 'Cập nhật ảnh đại diện thành công!' });
                console.log(newAvatarUrl);
            }
            else {
                throw new Error(response.data.message || 'Upload failed');
            }
        }
        catch (error) {
            console.error('Error uploading avatar:', error);
            setSnackbar({ open: true, message: 'Có lỗi xảy ra khi tải ảnh lên. Vui lòng thử lại!' });
        }
        finally {
            setIsUploading(false);
        }
    };
    // Close page
    const handleClosePage = () => {
        navigate('/');
    };
    console.log(avatarUrl);
    // Render field với khả năng chỉnh sửa
    const renderEditableField = (field, label) => {
        const { isEditing, value } = editableFields[field];
        return (_jsxs("div", { className: "tw-border tw-border-gray-300 tw-rounded-md tw-p-4 hover:tw-shadow-md", children: [_jsx("span", { className: "", children: label }), isEditing ? (_jsxs("div", { className: "tw-mt-2", children: [_jsx(TextField, { fullWidth: true, value: value, onChange: (e) => handleFieldChange(field, e.target.value), size: "small", className: "tw-mb-2" }), _jsxs("div", { className: "tw-flex tw-gap-2", children: [_jsx(Button, { variant: "contained", color: "primary", size: "small", onClick: () => saveField(field), disabled: loading, children: "L\u01B0u" }), _jsx(Button, { variant: "outlined", color: "primary", size: "small", onClick: () => cancelEditing(field), disabled: loading, children: "H\u1EE7y" })] })] })) : (_jsx("div", { className: "tw-cursor-pointer", onClick: () => startEditing(field), children: _jsx("p", { className: "", children: user[field] || 'Chưa cập nhật' }) }))] }));
    };
    return (_jsxs("div", { className: "tw-w-full", style: { background: theme.palette.background.paper }, children: [_jsxs("div", { className: "tw-relative tw-flex tw-flex-col md:tw-flex-row tw-w-full tw-min-h-screen tw-bg-gray-100", children: [_jsx(IconButton, { onClick: handleClosePage, className: "tw-absolute tw-top-4 tw-right-[-20px] md:tw-right-[50px] tw-bg-gray-200 tw-p-2 tw-rounded-full hover:tw-bg-gray-300", "aria-label": "close", children: _jsx(CloseIcon, {}) }), _jsx(Section, { data: sections, onChange: (s) => handleSectionChange(s.section) }), _jsxs("div", { className: "tw-w-full md:tw-w-3/4 tw-p-8", style: { background: theme.palette.background.paper }, children: [activeSection === 'personalInfo' && (_jsxs(_Fragment, { children: [_jsx("h3", { className: "tw-text-2xl tw-mb-2 tw-font-bold", children: "Th\u00F4ng tin c\u00E1 nh\u00E2n" }), _jsx("p", { className: "tw-text-xs tw-mb-6 tw-text-gray-400", children: "Qu\u1EA3n l\u00FD th\u00F4ng tin c\u00E1 nh\u00E2n c\u1EE7a b\u1EA1n." }), _jsxs("div", { className: "tw-mb-12", children: [_jsx("h4", { className: "tw-text-lg tw-font-medium tw-mb-2", children: "Th\u00F4ng tin c\u01A1 b\u1EA3n" }), _jsx("p", { className: "tw-text-xs tw-mb-6 tw-text-gray-400", children: "Qu\u1EA3n l\u00FD t\u00EAn hi\u1EC3n th\u1ECB, t\u00EAn ng\u01B0\u1EDDi d\u00F9ng, bio v\u00E0 avatar c\u1EE7a b\u1EA1n" }), _jsxs("div", { className: "tw-grid tw-grid-cols-1 md:tw-max-w-[800px] tw-gap-6", children: [_jsx("div", { className: "tw-border tw-border-gray-300 tw-rounded-md tw-p-4 hover:tw-shadow-md tw-transition-shadow", children: _jsxs("div", { className: "tw-flex tw-items-start tw-gap-6", children: [_jsxs("div", { className: "tw-relative tw-group", children: [_jsxs("div", { className: "tw-w-32 tw-h-32 tw-rounded-full tw-overflow-hidden tw-border-4 tw-border-gray-100 tw-shadow-lg", children: [_jsx("img", { src: avatarUrl, onError: handleImageError, className: `tw-w-full tw-h-full tw-object-cover tw-transition-transform ${isUploading ? 'tw-opacity-50' : 'hover:tw-scale-105'}`, alt: user?.name || 'Avatar' }), isUploading && (_jsx("div", { className: "tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-black/50 tw-rounded-full", children: _jsx("span", { className: "tw-text-white", children: "\u0110ang t\u1EA3i..." }) }))] }), _jsx("button", { onClick: handleAvatarClick, className: "tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-black/0 hover:tw-bg-black/40 tw-rounded-full tw-transition-all tw-cursor-pointer", "aria-label": "Change avatar", children: _jsx("span", { className: "tw-text-white tw-opacity-0 group-hover:tw-opacity-100 tw-text-sm tw-font-medium", children: "Thay \u0111\u1ED5i \u1EA3nh" }) })] }), _jsxs("div", { className: "tw-flex-1", children: [_jsxs("div", { className: "tw-mb-4", children: [_jsx(Typography, { variant: "h6", className: "tw-font-medium", children: "\u1EA2nh h\u1ED3 s\u01A1" }), _jsx(Typography, { variant: "body2", color: "textSecondary", children: "\u1EA2nh \u0111\u1EA1i di\u1EC7n gi\u00FAp ng\u01B0\u1EDDi d\u00F9ng d\u1EC5 d\u00E0ng nh\u1EADn bi\u1EBFt b\u1EA1n h\u01A1n" })] }), _jsxs("div", { className: "tw-flex tw-gap-3", children: [_jsx(Button, { variant: "outlined", onClick: handleAvatarClick, startIcon: _jsx(AddPhotoAlternateIcon, {}), sx: {
                                                                                        borderColor: '#6fe0dc',
                                                                                        color: '#6fe0dc',
                                                                                        '&:hover': {
                                                                                            borderColor: '#58bcb9',
                                                                                            backgroundColor: '#f0fafa',
                                                                                        },
                                                                                    }, children: "T\u1EA3i \u1EA3nh l\u00EAn" }), _jsx(Typography, { variant: "caption", color: "textSecondary", className: "tw-self-center", children: "\u0110\u1ECBnh d\u1EA1ng: JPG, PNG (t\u1ED1i \u0111a 1MB)" })] })] })] }) }), renderEditableField('name', 'Họ và tên'), renderEditableField('phone', 'Số điện thoại'), renderEditableField('referring', 'Giới thiệu')] })] })] })), activeSection === 'securitySettings' && (_jsxs(_Fragment, { children: [_jsx("h3", { className: " tw-mb-2 tw-font-bold hover:tw-shadow-md", children: "M\u1EADt kh\u1EA9u v\u00E0 b\u1EA3o m\u1EADt" }), _jsx("p", { className: "tw-mb-10 tw-text-xs tw-text-gray-400", children: "C\u00E0i \u0111\u1EB7t b\u1EA3o m\u1EADt t\u00E0i kho\u1EA3n c\u1EE7a b\u1EA1n." }), _jsx("div", { className: "tw-space-y-4", children: _jsxs("div", { className: "tw-border tw-border-gray-300 hover:tw-shadow-md tw-rounded-md tw-p-4 cursor-pointer", onClick: handleOpenPasswordModal, children: [_jsx("span", { className: "", children: "\u0110\u1ED5i m\u1EADt kh\u1EA9u" }), _jsx("p", { className: "tw-text-xs tw-text-gray-400", children: "B\u1EA1n c\u00F3 mu\u1ED1n \u0111\u1ED5i m\u1EADt kh\u1EA9u ch\u1EE9" })] }) })] }))] })] }), _jsx(PasswordModal, { open: openPasswordModal, onClose: handleClosePasswordModal, onSave: handleSavePassword }), _jsx(AvatarUploadModal, { open: isModalOpen, onClose: () => setIsModalOpen(false), currentAvatarUrl: avatarUrl, onUpload: handleAvatarUpload }), _jsx(Snackbar, { open: snackbar.open, autoHideDuration: 1000, onClose: handleSnackbarClose, message: snackbar.message, anchorOrigin: { vertical: 'bottom', horizontal: 'center' } })] }));
};
export default SettingUser;
