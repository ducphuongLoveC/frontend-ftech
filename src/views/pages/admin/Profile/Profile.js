import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import s from './Profile.module.scss';
import axiosInstance from '@/api/axiosInstance';
import { SET_USER } from '@/store/actions';
import Cookies from 'js-cookie';
import { Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import Loading from '@/ui-component/Loading';
const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        profile_picture: user?.profile_picture || '', // Thêm giá trị mặc định
    });
    // State cho phần đổi mật khẩu
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    if (!user) {
        return _jsx("div", { children: "Loading..." });
    }
    useEffect(() => {
        const userFromCookies = Cookies.get('user');
        if (userFromCookies) {
            const userObj = JSON.parse(userFromCookies);
            dispatch({ type: SET_USER, payload: userObj });
            console.log('Đã lấy thông tin người dùng từ cookies: ', userObj);
        }
    }, [dispatch]);
    useEffect(() => {
        if (!isEditing) {
            console.log('Dữ liệu user được cập nhật: ', user);
            setFormData({
                name: user?.name || '',
                phone: user?.phone || '',
                profile_picture: user?.profile_picture || '',
            });
        }
    }, [user, isEditing]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handlePasswordFormChange = (e) => {
        const { name, value } = e.target;
        setPasswordForm((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Reset error when user starts typing
        setPasswordError(null);
    };
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordError(null);
        // Validate password
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            toast.error('Mật khẩu mới và xác nhận mật khẩu không khớp');
            return;
        }
        if (passwordForm.newPassword.length < 6) {
            toast.error('Mật khẩu mới phải có ít nhất 6 ký tự');
            return;
        }
        try {
            const response = await axiosInstance.put('/api/user/change-password', passwordForm);
            if (response.data.message) {
                toast.success(response.data.message);
                // Reset form sau khi đổi mật khẩu thành công
                setPasswordForm({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                });
                setIsChangingPassword(false);
            }
        }
        catch (error) {
            toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi đổi mật khẩu');
        }
    };
    const handleImageChange = async (e) => {
        const file = e.target.files?.[0];
        const userId = user?._id || user?.id;
        if (file && userId) {
            const formData = new FormData();
            formData.append('file', file);
            setLoading(true);
            const response = await axiosInstance.post('/api/media/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const responseUpdatePictureLink = await axiosInstance.put(`/api/user/${userId}`, {
                profile_picture: response.data.url,
            });
            if (response.data.success && responseUpdatePictureLink.data.success) {
                const uploadedImageUrl = response.data.url;
                // Cập nhật formData
                setFormData((prevData) => ({
                    ...prevData,
                    profile_picture: uploadedImageUrl,
                }));
                // Cập nhật user trong Redux và cookies
                const updatedUser = { ...user, profile_picture: uploadedImageUrl };
                dispatch({ type: SET_USER, payload: updatedUser });
                Cookies.set('user', JSON.stringify(updatedUser), {
                    domain: 'admin.localhost',
                    expires: 7,
                });
                setLoading(false);
            }
            else {
                throw new Error(response.data.message || 'Upload failed');
            }
            // axiosInstance.put(`/api/user/${userId}`, formDataToSend, {
            //     headers: {
            //       'Content-Type': 'multipart/form-data',
            //     },
            //   })
            //   .then((response) => {
            //     // toast.success
            //     if (response.data.success) {
            //       const uploadedImageUrl = response.data.data.profile_picture;
            //       // Cập nhật formData
            //       setFormData((prevData) => ({
            //         ...prevData,
            //         profile_picture: uploadedImageUrl,
            //       }));
            //       // Cập nhật user trong Redux và cookies
            //       const updatedUser = { ...user, profile_picture: uploadedImageUrl };
            //       dispatch({ type: SET_USER, payload: updatedUser });
            //       Cookies.set('user', JSON.stringify(updatedUser), {
            //         domain: 'admin.localhost',
            //         expires: 7,
            //       });
            //     }
            //   })
            //   .catch((error) => {
            //     console.error('Lỗi khi upload ảnh: ', error);
            //     toast.error('Có lỗi xảy ra khi upload ảnh!');
            //   });
        }
    };
    const handleSave = async () => {
        if (!user?._id && !user?.id) {
            setError('Không tìm thấy thông tin người dùng!');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const updatedData = {
                name: formData.name,
                phone: formData.phone,
                profile_picture: formData.profile_picture,
            };
            const response = await axiosInstance.put(`/api/user/${user._id || user.id}`, updatedData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.success) {
                const updatedUser = { ...user, ...response.data.data };
                dispatch({ type: SET_USER, payload: updatedUser });
                Cookies.set('user', JSON.stringify(updatedUser), {
                    domain: 'admin.localhost',
                    expires: 7,
                });
                setIsEditing(false);
                toast.success('Cập nhật thông tin thành công');
            }
        }
        catch (error) {
            console.error('Lỗi khi cập nhật:', error);
            setError('Có lỗi xảy ra, vui lòng thử lại!');
            toast.error(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "container", children: [_jsx("div", { className: "main-body", children: _jsxs("div", { className: "row gutters-sm", children: [_jsx("div", { className: "col-md-4 mb-3", children: _jsx("div", { className: "card", children: _jsx("div", { className: clsx(s['card-body-user']), children: _jsxs("div", { className: "d-flex flex-column align-items-center text-center", children: [_jsx("img", { src: formData.profile_picture || user.profile_picture, alt: "Admin", className: clsx(s['rounded-circle']), width: 150 }), _jsxs("div", { className: "mt-3", children: [_jsx("h4", { children: formData.name }), _jsx("p", { className: "mb-1", children: user.role })] })] }) }) }) }), _jsxs("div", { className: "col-md-8", children: [_jsx("div", { className: "card mb-3", children: _jsxs("div", { className: clsx(s['card-body']), children: [_jsxs("div", { className: "row align-items-center", children: [_jsx("div", { className: "col-sm-3", children: _jsx("h6", { className: "mb-10", children: "H\u1ECD v\u00E0 t\u00EAn:" }) }), _jsx("div", { className: "col-sm-9", children: isEditing ? (_jsx("input", { type: "text", name: "name", value: formData.name, onChange: handleInputChange, className: "form-control" })) : (_jsx("span", { children: formData.name })) })] }), _jsx("hr", {}), _jsxs("div", { className: "row align-items-center", children: [_jsx("div", { className: "col-sm-3", children: _jsx("h6", { className: "mb-10", children: "Phone:" }) }), _jsx("div", { className: "col-sm-9", children: isEditing ? (_jsx("input", { type: "text", name: "phone", value: formData.phone, onChange: handleInputChange, className: "form-control" })) : (_jsx("span", { children: formData.phone })) })] }), _jsx("hr", {}), _jsxs("div", { className: "row align-items-center", children: [_jsx("div", { className: "col-sm-3", children: _jsx("h6", { className: "mb-10", children: "Email:" }) }), _jsx("div", { className: "col-sm-9", children: _jsx("span", { children: user.email }) })] }), _jsx("hr", {}), _jsxs("div", { className: "row align-items-center", children: [_jsx("div", { className: "col-sm-3", children: _jsx("h6", { className: "mb-10", children: "\u1EA2nh \u0111\u1EA1i di\u1EC7n:" }) }), _jsx("div", { className: "col-sm-9", children: isEditing ? (_jsx("input", { type: "file", onChange: handleImageChange, className: "form-control" })) : (_jsx("span", { children: "\u1EA2nh hi\u1EC7n t\u1EA1i \u0111\u00E3 \u0111\u01B0\u1EE3c l\u01B0u" })) })] }), _jsx("hr", {}), error && _jsx("div", { className: "alert alert-danger", children: error }), isEditing ? (_jsx(Button, { color: "primary", variant: "outlined", className: clsx(s['button-edit-profile']), onClick: handleSave, disabled: loading, children: loading ? 'Đang lưu...' : 'Lưu' })) : (_jsx(Button, { color: "primary", variant: "outlined", className: clsx(s['button-edit-profile']), onClick: () => setIsEditing(true), children: "S\u1EEDa" }))] }) }), _jsx("div", { className: "card", children: _jsxs("div", { className: clsx(s['card-body']), children: [_jsxs("div", { className: "d-flex justify-content-between align-items-center mb-3", children: [_jsx("h6", { className: "mb-0", children: "\u0110\u1ED5i m\u1EADt kh\u1EA9u" }), _jsx(Button, { color: "primary", variant: "outlined", className: clsx(s['button-edit-profile']), onClick: () => {
                                                            setIsChangingPassword(!isChangingPassword);
                                                            setPasswordError(null);
                                                            setPasswordForm({
                                                                currentPassword: '',
                                                                newPassword: '',
                                                                confirmPassword: '',
                                                            });
                                                        }, children: isChangingPassword ? 'Hủy' : 'Đổi mật khẩu' })] }), isChangingPassword && (_jsxs("form", { onSubmit: handlePasswordChange, children: [_jsxs("div", { className: "form-group mb-3", children: [_jsx("label", { children: "M\u1EADt kh\u1EA9u hi\u1EC7n t\u1EA1i:" }), _jsx("input", { type: "password", name: "currentPassword", value: passwordForm.currentPassword, onChange: handlePasswordFormChange, className: "form-control", required: true })] }), _jsxs("div", { className: "form-group mb-3", children: [_jsx("label", { children: "M\u1EADt kh\u1EA9u m\u1EDBi:" }), _jsx("input", { type: "password", name: "newPassword", value: passwordForm.newPassword, onChange: handlePasswordFormChange, className: "form-control", required: true })] }), _jsxs("div", { className: "form-group mb-3", children: [_jsx("label", { children: "X\u00E1c nh\u1EADn m\u1EADt kh\u1EA9u m\u1EDBi:" }), _jsx("input", { type: "password", name: "confirmPassword", value: passwordForm.confirmPassword, onChange: handlePasswordFormChange, className: "form-control", required: true })] }), passwordError && _jsx("div", { className: "alert alert-danger", children: passwordError }), _jsx(Button, { variant: "outlined", type: "submit", className: clsx(s['button-edit-profile']), children: "X\u00E1c nh\u1EADn \u0111\u1ED5i m\u1EADt kh\u1EA9u" })] }))] }) })] })] }) }), loading && _jsx(Loading, {}), _jsx(ToastContainer, {})] }));
};
export default Profile;
