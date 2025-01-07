import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
// toast
import { toast, ToastContainer } from 'react-toastify';
// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
// api
import VerifyEmail from '../authentication/password-forget/VerifyEmail';
import { createOtpForResetPassword, verifyOtp } from '@/api/otpApi';
import { Box, FormHelperText } from '@mui/material';
// ================================|| AUTH3 - LOGIN ||================================ //
import OTPInput from '@/components/OtpInput';
import ChangePassword from '../authentication/password-forget/ResetPassword';
import { resetPassword } from '@/api/userApi';
import path from '@/constants/routes';
import sleep from '@/utils/sleep';
const ForgetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpError, setOtpError] = useState('');
    const [stepOtp, setStepOtp] = useState('send');
    const theme = useTheme();
    const downMD = useMediaQuery(theme.breakpoints.down('md')); // Kiểm tra màn hình nhỏ hơn md
    const { mutate: mttCreateOtp, isPending: isPendingCreateOtp } = useMutation({
        mutationKey: ['create_otp'],
        mutationFn: createOtpForResetPassword,
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
            setStepOtp('change');
            setOtpVerified(true);
            setOtpError('');
        },
        onError: () => {
            setOtpError('Otp không đúng vui lòng nhập lại');
        },
    });
    const { mutate: mttResetPassword, isPending: isPendingResetPassword } = useMutation({
        mutationKey: ['reset_password'],
        mutationFn: (data) => resetPassword({ email: email, ...data }),
        onSuccess: async ({ data }) => {
            toast.success(data.message);
            await sleep(1000);
            navigate(path.client.auth.login);
        },
        onError: (error) => {
            console.log(error);
            toast.success(error.response.data.message);
        },
    });
    const RenderStep = () => {
        switch (stepOtp) {
            case 'send':
                return (_jsx(VerifyEmail, { isLoading: isPendingCreateOtp, onSubmit: ({ email }) => {
                        setEmail(email);
                        mttCreateOtp(email);
                    } }));
            case 'verify':
                return (_jsxs(Box, { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', children: [_jsx(OTPInput, { onComplete: (otp) => {
                                const payload = {
                                    email: email,
                                    otp,
                                };
                                mttVerifyOtp(payload);
                            } }), otpError && _jsx(FormHelperText, { error: true, children: otpError }), otpVerified && _jsx(FormHelperText, { sx: { color: 'success.main' }, children: "\u0110\u00E3 x\u00E1c th\u1EF1c OTP!" })] }));
            case 'change':
                return _jsx(ChangePassword, { isLoading: isPendingResetPassword, onSubmit: mttResetPassword });
        }
    };
    return (_jsxs(Box, { children: [_jsxs(Grid, { container: true, display: 'flex', alignItems: 'center', children: [!downMD && ( // Ẩn banner khi nhỏ hơn MD
                    _jsx(Grid, { item: true, md: 6, children: _jsx("img", { width: "80%", src: "/images/banauth.webp", alt: "Banner" }) })), _jsx(Grid, { item: true, xs: 12, md: 5, children: _jsxs(Grid, { container: true, children: [_jsx(Grid, { item: true, xs: 12, children: _jsx(Grid, { container: true, direction: {
                                            xs: 'column-reverse',
                                            md: 'row',
                                        }, alignItems: "center", justifyContent: "center", children: _jsx(Grid, { item: true, children: _jsx(Stack, { alignItems: "center", justifyContent: "center", spacing: 1, marginBottom: '20px', children: _jsx(Typography, { sx: {
                                                        background: 'var(--color-primary)',
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent',
                                                    }, gutterBottom: true, variant: downMD ? 'h3' : 'h2', children: stepOtp === 'send'
                                                        ? 'Đổi mật khẩu'
                                                        : stepOtp === 'verify'
                                                            ? 'Xác nhận OTP'
                                                            : 'Thay đổi mật khẩu' }) }) }) }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(RenderStep, {}) })] }) })] }), _jsx(ToastContainer, {})] }));
};
export default ForgetPassword;
