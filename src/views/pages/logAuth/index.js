import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMutation } from '@tanstack/react-query';
// redux
import { useDispatch } from 'react-redux';
// mui
import { useTheme } from '@mui/material';
import { Grid } from '@mui/material';
//toast
import { toast, ToastContainer } from 'react-toastify';
import { TypeAnimation } from 'react-type-animation';
// my pj
import * as actionTypes from '@/store/actions';
import AuthLogin from '../authentication/auth-forms/AuthLogin';
import { login } from '@/api/authApi';
// Thêm import cho js-cookie
const adminRoles = ['admin'];
const LogAuth = () => {
    const dispatch = useDispatch();
    const mutation = useMutation({
        mutationKey: ['admin'],
        mutationFn: login,
        onSuccess: ({ data }) => {
            if (data.user.role.includes(adminRoles)) {
                dispatch({ type: actionTypes.SET_ACCESS_TOKEN, payload: data.accessToken });
                dispatch({ type: actionTypes.SET_USER, payload: data.user });
                window.location.href =
                    import.meta.env.VITE_URL_ADMIN +
                        `?accessToken=${JSON.stringify(encodeURIComponent(data.accessToken))}&info=${encodeURIComponent(JSON.stringify(data.user))}`;
            }
            else {
                toast.warn('Tài khoản không đủ quyền hạn!');
            }
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });
    const theme = useTheme();
    const handleLoginAddmin = (data) => {
        mutation.mutate(data);
    };
    return (_jsxs(Grid, { container: true, alignItems: "center", justifyContent: 'center', sx: {
            height: '100vh',
            backgroundColor: theme.palette.background.paper,
        }, children: [_jsx(Grid, { p: 5, children: _jsx(TypeAnimation, { sequence: ['Đăng nhập vào admin', 1000], wrapper: "span", speed: 50, style: {
                        fontSize: '2em',
                        display: 'block',
                    } }) }), _jsx(Grid, { p: 5, children: _jsx(AuthLogin, { onSubmit: handleLoginAddmin }) }), _jsx(ToastContainer, {})] }));
};
export default LogAuth;
