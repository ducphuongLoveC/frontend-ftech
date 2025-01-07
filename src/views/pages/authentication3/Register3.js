import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
// material-ui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';
//toast
import { toast, ToastContainer } from 'react-toastify';
// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthRegister from '../authentication/auth-forms/AuthRegister';
import { registerUser } from '@/api/authApi';
import sleep from '@/utils/sleep';
// ===============================|| AUTH3 - REGISTER ||=============================== //
const Register = () => {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationKey: ['user'],
        mutationFn: registerUser,
        onSuccess: async (data) => {
            toast.success('Đăng ký thành công!');
            await sleep(2000);
            navigate('/auth/login');
            console.log(data);
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại!';
            toast.error(`Đăng ký thất bại. ${errorMessage}`);
            console.log(error);
        },
    });
    const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const theme = useTheme();
    const handleRegisterUser = (data) => {
        const fullName = `${data.fname} ${data.lname}`;
        const fData = {
            name: fullName,
            email: data.email,
            password: data.password,
        };
        mutation.mutate(fData);
    };
    return (_jsxs(AuthWrapper1, { children: [_jsx(Grid, { container: true, direction: "column", justifyContent: "flex-end", children: _jsx(Grid, { item: true, xs: 12, children: _jsxs(Grid, { container: true, justifyContent: "center", alignItems: "center", sx: {
                            background: theme.palette.background.paper,
                        }, children: [_jsx(Grid, { item: true, md: 6, xs: 12, container: true, justifyContent: "center", alignItems: "center", children: _jsx(AuthCardWrapper, { children: _jsxs(Grid, { children: [_jsx(Grid, { item: true, sx: {
                                                    mb: 3,
                                                }, children: _jsx(Link, { to: "#", "aria-label": "theme logo" }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Grid, { container: true, direction: {
                                                        xs: 'column-reverse',
                                                        md: 'row',
                                                    }, alignItems: "center", justifyContent: "center", children: _jsx(Grid, { item: true, children: _jsx(Stack, { alignItems: "center", justifyContent: "center", spacing: 1, marginBottom: '20px', children: _jsx(Typography, { sx: {
                                                                    background: 'var(--color-primary)',
                                                                    WebkitBackgroundClip: 'text',
                                                                    WebkitTextFillColor: 'transparent',
                                                                }, gutterBottom: true, variant: downMD ? 'h3' : 'h2', children: "\u0110\u0103ng k\u00FD" }) }) }) }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(AuthRegister, { onSubmit: handleRegisterUser }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Divider, {}) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Grid, { item: true, container: true, direction: "column", alignItems: "center", xs: 12, children: _jsx(Typography, { component: Link, to: "/auth/login", variant: "subtitle1", sx: {
                                                            textDecoration: 'none',
                                                            color: theme.palette.primary.main,
                                                        }, children: "B\u1EA1n \u0111\u00E3 c\u00F3 t\u00E0i kho\u1EA3n?" }) }) })] }) }) }), !downMD && (_jsx(Grid, { item: true, md: 6, children: _jsx("img", { width: '80%', src: "/images/banauth.webp", alt: "" }) }))] }) }) }), _jsx(ToastContainer, {})] }));
};
export default Register;
