import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
// toast
import { toast, ToastContainer } from 'react-toastify';
// material-ui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
// project imports
import * as actionTypes from '@/store/actions';
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../authentication/auth-forms/AuthLogin';
// api
import { login } from '@/api/authApi';
import Cookies from 'js-cookie';
// ================================|| AUTH3 - LOGIN ||================================ //
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationKey: ['user'],
        mutationFn: login,
        onSuccess: (res) => {
            console.log(res.data);
            toast.success('Đăng nhập thành công!');
            Cookies.set('accessToken', res.data.accessToken || '');
            Cookies.set('user', JSON.stringify(res.data.user || {}));
            console.log(res.data.user);
            dispatch({ type: actionTypes.SET_ACCESS_TOKEN, payload: res.data.accessToken });
            dispatch({ type: actionTypes.SET_USER, payload: res.data.user });
            navigate('/');
        },
        onError: (error) => {
            toast.error('Mật khẩu hoặc tài khoản không đúng. Thử lại!');
            console.log(error);
        },
    });
    const theme = useTheme();
    const downMD = useMediaQuery(theme.breakpoints.down('md')); // Kiểm tra màn hình nhỏ hơn md
    const handleLogin = async (data) => {
        mutation.mutate(data);
    };
    return (_jsxs(AuthWrapper1, { children: [_jsx(Grid, { container: true, direction: "column", justifyContent: "flex-end", children: _jsx(Grid, { item: true, xs: 12, children: _jsxs(Grid, { container: true, justifyContent: "center", alignItems: "center", sx: {
                            background: theme.palette.background.paper,
                        }, children: [!downMD && ( // Ẩn banner khi nhỏ hơn MD
                            _jsx(Grid, { item: true, md: 6, children: _jsx("img", { width: "80%", src: "/images/banauth.webp", alt: "Banner" }) })), _jsx(Grid, { item: true, xs: 12, md: 6, container: true, justifyContent: "center", alignItems: "center", children: _jsx(AuthCardWrapper, { children: _jsxs(Grid, { children: [_jsx(Grid, { item: true, sx: { mb: 3 } }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Grid, { container: true, direction: {
                                                        xs: 'column-reverse',
                                                        md: 'row',
                                                    }, alignItems: "center", justifyContent: "center", children: _jsx(Grid, { item: true, children: _jsx(Stack, { alignItems: "center", justifyContent: "center", spacing: 1, marginBottom: '20px', children: _jsx(Typography, { sx: {
                                                                    background: 'var(--color-primary)',
                                                                    WebkitBackgroundClip: 'text',
                                                                    WebkitTextFillColor: 'transparent',
                                                                }, gutterBottom: true, variant: downMD ? 'h3' : 'h2', children: "\u0110\u0103ng nh\u1EADp" }) }) }) }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(AuthLogin, { onSubmit: handleLogin }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Divider, { sx: {
                                                        bgcolor: theme.palette.divider,
                                                    } }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Grid, { item: true, container: true, direction: "column", alignItems: "center", xs: 12, children: _jsx(Typography, { component: Link, to: "/auth/register", variant: "subtitle1", sx: {
                                                            textDecoration: 'none',
                                                            color: theme.palette.primary.main,
                                                        }, children: "B\u1EA1n ch\u01B0a c\u00F3 t\u00E0i kho\u1EA3n?" }) }) })] }) }) })] }) }) }), _jsx(ToastContainer, {})] }));
};
export default Login;
