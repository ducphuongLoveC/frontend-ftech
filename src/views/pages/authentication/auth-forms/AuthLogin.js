import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useSelector } from 'react-redux';
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
// third-party
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// project imports
import AnimateButton from '@/ui-component/extended/AnimateButton';
// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Google from '@/assets/images/icons/social-google.svg';
import { Link } from 'react-router-dom';
import path from '@/constants/routes';
const MainInput = styled(OutlinedInput)(() => ({
    input: {
        color: 'black',
    },
}));
// Zod validation schema
const schema = z.object({
    email: z.string().email('Nhập đúng định dạng email').max(255, 'Email quá dài'),
    password: z.string().min(6, 'Mật khẩu đăng nhập phải hơn hoặc bằng 6 ký tự').max(255, 'Mật khẩu quá dài'),
});
const AuthLogin = ({ google = false, onSubmit, ...others }) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [checked, setChecked] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const googleHandler = async () => {
        console.error('Login');
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const { control, handleSubmit, formState: { errors, isSubmitting }, } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    return (_jsxs(_Fragment, { children: [google && (_jsxs(Grid, { container: true, direction: "column", justifyContent: "center", children: [_jsx(Grid, { item: true, xs: 12, children: _jsx(AnimateButton, { children: _jsxs(Button, { disableElevation: true, fullWidth: true, onClick: googleHandler, size: "large", variant: "outlined", children: [_jsx(Box, { sx: {
                                            mr: {
                                                xs: 1,
                                                sm: 2,
                                                width: 20,
                                            },
                                        }, children: _jsx("img", { src: Google, alt: "google", width: 16, height: 16, style: {
                                                marginRight: matchDownSM ? 8 : 16,
                                            } }) }), "\u0110\u0103ng nh\u1EADp v\u1EDBi google"] }) }) }), _jsx(Grid, { item: true, xs: 12, children: _jsxs(Box, { sx: {
                                alignItems: 'center',
                                display: 'flex',
                            }, children: [_jsx(Divider, { sx: {
                                        flexGrow: 1,
                                    }, orientation: "horizontal" }), _jsx(Button, { variant: "outlined", sx: {
                                        cursor: 'unset',
                                        m: 2,
                                        py: 0.5,
                                        px: 7,
                                        borderColor: `${theme.palette.grey[100]} !important`,
                                        color: `${theme.palette.grey[900]}!important`,
                                        fontWeight: 500,
                                        borderRadius: `${customization.borderRadius}px`,
                                    }, disableRipple: true, disabled: true, children: "Ho\u1EB7c" }), _jsx(Divider, { sx: {
                                        flexGrow: 1,
                                    }, orientation: "horizontal" })] }) }), _jsx(Grid, { item: true, xs: 12, container: true, alignItems: "center", justifyContent: "center", children: _jsx(Box, { sx: {
                                mb: 2,
                            }, children: _jsx(Typography, { variant: "subtitle1", children: "\u0110\u0103ng nh\u1EADp v\u1EDBi t\u00E0i kho\u1EA3n h\u1EC7 th\u1ED1ng" }) }) })] })), _jsxs("form", { noValidate: true, onSubmit: handleSubmit((data) => onSubmit && onSubmit(data)), ...others, children: [_jsxs(FormControl, { fullWidth: true, error: Boolean(errors.email), sx: {
                            ...theme.typography.customInput,
                        }, children: [_jsx(InputLabel, { htmlFor: "outlined-adornment-email-login", children: "Email Address / Username" }), _jsx(Controller, { name: "email", control: control, render: ({ field }) => (_jsx(MainInput, { ...field, id: "outlined-adornment-email-login", type: "email", label: "Email Address / Username", inputProps: {} })) }), errors.email && (_jsx(FormHelperText, { error: true, id: "standard-weight-helper-text-email-login", children: errors.email.message }))] }), _jsxs(FormControl, { fullWidth: true, error: Boolean(errors.password), sx: {
                            ...theme.typography.customInput,
                        }, children: [_jsx(InputLabel, { htmlFor: "outlined-adornment-password-login", children: "Password" }), _jsx(Controller, { name: "password", control: control, render: ({ field }) => (_jsx(MainInput, { ...field, id: "outlined-adornment-password-login", type: showPassword ? 'text' : 'password', endAdornment: _jsx(InputAdornment, { position: "end", children: _jsx(IconButton, { "aria-label": "toggle password visibility", onClick: handleClickShowPassword, onMouseDown: handleMouseDownPassword, edge: "end", size: "large", children: showPassword ? _jsx(Visibility, {}) : _jsx(VisibilityOff, {}) }) }), label: "Password", inputProps: {} })) }), errors.password && (_jsx(FormHelperText, { error: true, id: "standard-weight-helper-text-password-login", children: errors.password.message }))] }), _jsxs(Stack, { direction: "row", alignItems: "center", justifyContent: "space-between", spacing: 1, children: [_jsx(FormControlLabel, { control: _jsx(Checkbox, { checked: checked, onChange: (event) => setChecked(event.target.checked), name: "checked", color: "primary" }), label: "L\u01B0u cho l\u1EA7n \u0111\u0103ng nh\u1EADp sau" }), _jsx(Link, { to: path.client.forgetPass, children: _jsx(Typography, { variant: "subtitle1", color: "secondary", sx: {
                                        textDecoration: 'none',
                                        cursor: 'pointer',
                                    }, children: "Qu\u00EAn m\u1EADt kh\u1EA9u?" }) })] }), _jsx(Box, { sx: {
                            mt: 2,
                        }, children: _jsx(AnimateButton, { children: _jsx(Button, { disableElevation: true, disabled: isSubmitting, fullWidth: true, size: "large", type: "submit", variant: "contained", sx: {
                                    background: 'var(--color-primary)', // Sử dụng biến CSS đã sửa
                                    color: '#fff',
                                }, children: "\u0110\u0103ng nh\u1EADp" }) }) })] })] }));
};
export default AuthLogin;
