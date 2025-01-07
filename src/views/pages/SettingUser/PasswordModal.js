import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../api/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import sleep from '@/utils/sleep';
const PasswordModal = ({ open, onClose, onSave }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.authReducer.user);
    const handleSave = async () => {
        // Kiểm tra user authentication
        if (!user || !user._id) {
            setError('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại');
            return;
        }
        // Validation trước khi gửi request
        if (!currentPassword) {
            setError('Vui lòng nhập mật khẩu hiện tại');
            return;
        }
        if (!newPassword) {
            setError('Vui lòng nhập mật khẩu mới');
            return;
        }
        if (!confirmPassword) {
            setError('Vui lòng xác nhận mật khẩu mới');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return;
        }
        if (newPassword.length < 6) {
            setError('Mật khẩu mới phải có ít nhất 6 ký tự');
            return;
        }
        try {
            setLoading(true);
            setError('');
            const response = await axiosInstance.put(`/api/user/change-password`, {
                currentPassword,
                newPassword,
                confirmPassword,
            });
            if (response.status === 200) {
                toast.success('Đổi mật khẩu thành công');
                await sleep(1000);
                onSave(newPassword);
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setError('');
                onClose();
            }
        }
        catch (err) {
            console.error('Error details:', err);
            if (err.response?.status === 401) {
                setError('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại');
            }
            else {
                const errorMessage = err.response?.data?.message || 'Đã có lỗi xảy ra, vui lòng thử lại';
                setError(errorMessage);
            }
        }
        finally {
            setLoading(false);
        }
    };
    const handleClose = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setError('');
        onClose();
    };
    return (_jsxs(Dialog, { open: open, onClose: handleClose, maxWidth: "sm", fullWidth: true, children: [_jsxs(DialogTitle, { children: ["\u0110\u1ED5i m\u1EADt kh\u1EA9u", _jsx(IconButton, { "aria-label": "close", onClick: handleClose, sx: { position: 'absolute', right: 8, top: 8 }, children: _jsx(CloseIcon, {}) })] }), _jsxs(DialogContent, { children: [_jsx(TextField, { autoFocus: true, margin: "dense", label: "M\u1EADt kh\u1EA9u hi\u1EC7n t\u1EA1i", type: "password", fullWidth: true, variant: "outlined", value: currentPassword, onChange: (e) => setCurrentPassword(e.target.value), error: !currentPassword && !!error, helperText: !currentPassword && !!error ? 'Vui lòng nhập mật khẩu hiện tại.' : '' }), _jsx(TextField, { margin: "dense", label: "M\u1EADt kh\u1EA9u m\u1EDBi", type: "password", fullWidth: true, variant: "outlined", value: newPassword, onChange: (e) => setNewPassword(e.target.value), error: !newPassword && !!error, helperText: !newPassword && !!error ? 'Vui lòng nhập mật khẩu mới.' : '' }), _jsx(TextField, { margin: "dense", label: "X\u00E1c nh\u1EADn m\u1EADt kh\u1EA9u", type: "password", fullWidth: true, variant: "outlined", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), error: newPassword !== confirmPassword && !!error, helperText: newPassword !== confirmPassword && !!error ? 'Mật khẩu xác nhận không khớp.' : '' }), error && (_jsx(Alert, { severity: "error", sx: { mt: 2 }, children: error }))] }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleClose, sx: { color: '#757575' }, disabled: loading, children: "H\u1EE7y" }), _jsx(Button, { onClick: handleSave, variant: "contained", sx: {
                            backgroundColor: '#36404D',
                            '&:hover': {
                                backgroundColor: '#38364d',
                            },
                        }, disabled: loading, children: loading ? 'Đang xử lý...' : 'Đổi mật khẩu' })] }), _jsx(ToastContainer, {})] }));
};
export default PasswordModal;
