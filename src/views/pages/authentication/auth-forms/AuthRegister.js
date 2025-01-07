import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTheme, styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AnimateButton from '@/ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from '@/utils/password-strength';
import { verifyCaptcha } from '@/api/authApi';
import OTPInput from '@/components/OtpInput';
import { createOtp, verifyOtp } from '@/api/otpApi';
const MainInput = styled(OutlinedInput)(() => ({
    input: {
        color: 'black',
    },
}));
const schema = z.object({
    fname: z.string().min(1, 'Họ là bắt buộc'), // First Name
    lname: z.string().min(1, 'Tên là bắt buộc'), // Last Name
    email: z.string().email('Email không hợp lệ').max(255, 'Email không được vượt quá 255 ký tự'), // Email
    isVerifyOtp: z.boolean().refine((val) => val === true, {
        message: 'Bạn cần xác nhận mã OTP trước khi tiếp tục',
    }), // Xác thực OTP
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').max(255, 'Mật khẩu không được vượt quá 255 ký tự'), // Password
});
const captchaSecret = import.meta.env.VITE_CAPTCHA_SECRET;
const AuthRegister = ({ onSubmit, ...others }) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [captchaError, setCaptchaError] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpError, setOtpError] = useState('');
    const [stepOtp, setStepOtp] = useState('send');
    const [showPassword, setShowPassword] = useState(false);
    const [, setStrength] = useState(0);
    const { control, handleSubmit, formState: { errors, isSubmitting }, getValues, setValue, } = useForm({
        resolver: zodResolver(schema),
    });
    const { mutate: mttCreateOtp, isPending: isPendingCreateOtp } = useMutation({
        mutationKey: ['create_otp'],
        mutationFn: createOtp,
        onSuccess: () => {
            setStepOtp('verify');
        },
        onMutate: () => {
            setOtpError('');
        },
        onError: (error) => {
            setOtpError(error);
        },
    });
    const { mutate: mttVerifyOtp } = useMutation({
        mutationKey: ['verify_otp'],
        mutationFn: verifyOtp,
        onSuccess: () => {
            setStepOtp('');
            setOtpVerified(true);
            setValue('isVerifyOtp', true, { shouldValidate: true });
            setOtpError('');
        },
        onError: () => {
            setValue('isVerifyOtp', false);
            setOtpError('Otp không đúng vui lòng nhập lại');
        },
    });
    const [level, setLevel] = useState();
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };
    const handleCaptchaChange = async (token) => {
        let result = await verifyCaptcha(token);
        setCaptchaVerified(result);
        if (!result) {
            setCaptchaError('Xác thực captcha thất bại');
        }
        else {
            setCaptchaError('');
        }
        console.log(result);
    };
    return (_jsxs(_Fragment, { children: [_jsx(Grid, { container: true, direction: "column", justifyContent: "center", spacing: 2 }), _jsxs("form", { noValidate: true, onSubmit: handleSubmit((data) => {
                    if (captchaVerified) {
                        setCaptchaError('');
                        onSubmit(data);
                    }
                    else {
                        setCaptchaError('Vui lòng xác thực captcha.');
                    }
                }), ...others, children: [_jsxs(Grid, { container: true, spacing: matchDownSM ? 0 : 2, children: [_jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(Controller, { name: "fname", control: control, render: ({ field }) => (_jsx(TextField, { ...field, fullWidth: true, label: "T\u00EAn \u0111\u1EC7m", margin: "normal", sx: {
                                            ...theme.typography.customInput,
                                            input: { color: 'black' },
                                        }, error: !!errors.fname, helperText: errors.fname ? String(errors.fname.message) : '' })) }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(Controller, { name: "lname", control: control, render: ({ field }) => (_jsx(TextField, { ...field, fullWidth: true, label: "T\u00EAn", margin: "normal", sx: {
                                            ...theme.typography.customInput,
                                            input: { color: 'black' },
                                        }, error: !!errors.lname, helperText: errors.lname ? String(errors.lname.message) : '' })) }) })] }), _jsxs(FormControl, { fullWidth: true, error: !!errors.email, sx: { ...theme.typography.customInput }, children: [_jsx(InputLabel, { htmlFor: "outlined-adornment-email-register", children: "Email" }), _jsx(Controller, { name: "email", control: control, render: ({ field }) => (_jsx(MainInput, { ...field, id: "outlined-adornment-email-register", type: "email", inputProps: {} })) }), errors.email && (_jsx(FormHelperText, { error: true, id: "standard-weight-helper-text--register", children: String(errors.email.message) }))] }), stepOtp === 'send' && (_jsx(Box, { children: isPendingCreateOtp ? ('Đang tạo mã OTP...') : (_jsx(Button, { onClick: () => {
                                mttCreateOtp(getValues('email'));
                            }, children: "L\u1EA5y m\u00E3 OTP" })) })), stepOtp == 'verify' && (_jsx(OTPInput, { onComplete: (otp) => {
                            const payload = {
                                email: getValues('email'),
                                otp,
                            };
                            mttVerifyOtp(payload);
                        } })), errors.isVerifyOtp && _jsx(FormHelperText, { error: true, children: errors.isVerifyOtp.message }), otpError && _jsx(FormHelperText, { error: true, children: otpError }), otpVerified && _jsx(FormHelperText, { sx: { color: 'success.main' }, children: "\u0110\u00E3 x\u00E1c th\u1EF1c OTP!" }), _jsxs(FormControl, { fullWidth: true, error: !!errors.password, sx: { ...theme.typography.customInput }, children: [_jsx(InputLabel, { htmlFor: "outlined-adornment-password-register", children: "M\u1EADt kh\u1EA9u" }), _jsx(Controller, { name: "password", control: control, render: ({ field }) => (_jsx(MainInput, { ...field, onChange: (e) => {
                                        field.onChange(e.target.value);
                                        changePassword(e.target.value);
                                    }, id: "outlined-adornment-password-register", type: showPassword ? 'text' : 'password', endAdornment: _jsx(InputAdornment, { position: "end", children: _jsx(IconButton, { "aria-label": "toggle password visibility", onClick: handleClickShowPassword, onMouseDown: handleMouseDownPassword, edge: "end", size: "large", children: showPassword ? _jsx(Visibility, {}) : _jsx(VisibilityOff, {}) }) }) })) }), errors.password && (_jsx(FormHelperText, { error: true, id: "standard-weight-helper-text-password-register", children: String(errors.password.message) }))] }), _jsx(FormControl, { fullWidth: true, children: _jsx(Box, { sx: { mb: 2 }, children: _jsxs(Grid, { container: true, spacing: 2, alignItems: "center", children: [_jsx(Grid, { item: true, children: _jsx(Box, { style: { backgroundColor: level?.color }, sx: { width: 85, height: 8, borderRadius: '7px' } }) }), _jsx(Grid, { item: true, children: _jsx(Typography, { variant: "subtitle1", fontSize: "0.75rem", children: level?.label }) })] }) }) }), _jsxs(Box, { children: [_jsx(ReCAPTCHA, { sitekey: captchaSecret, onChange: handleCaptchaChange }), captchaError && _jsx(FormHelperText, { error: true, children: captchaError })] }), _jsx(Box, { sx: { mt: 2 }, children: _jsx(AnimateButton, { children: _jsx(Button, { disableElevation: true, disabled: isSubmitting, fullWidth: true, size: "large", type: "submit", variant: "contained", sx: {
                                    background: 'var(--color-primary)', // Sử dụng biến CSS đã sửa
                                    color: '#fff',
                                }, children: "\u0110\u0103ng k\u00FD" }) }) })] })] }));
};
export default AuthRegister;
