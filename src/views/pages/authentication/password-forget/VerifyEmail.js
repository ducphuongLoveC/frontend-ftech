import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
// third-party
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// project imports
import AnimateButton from '@/ui-component/extended/AnimateButton';
import { BeatLoader } from 'react-spinners';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRef, useState } from 'react';
import { verifyCaptcha } from '@/api/authApi';
const captchaSecret = import.meta.env.VITE_CAPTCHA_SECRET;
const MainInput = styled(OutlinedInput)(() => ({
    input: {
        color: 'black',
        width: '100%',
    },
}));
// Zod validation schema
const schema = z.object({
    email: z.string().email('Nhập đúng định dạng email').max(255, 'Email quá dài'),
});
const VerifyEmail = ({ isLoading, onSubmit, ...others }) => {
    const { control, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
        },
    });
    const theme = useTheme();
    const captchaRef = useRef(null);
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [captchaError, setCaptchaError] = useState('');
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
    console.log(captchaVerified);
    return (_jsxs("form", { noValidate: true, onSubmit: handleSubmit((data) => {
            if (captchaVerified) {
                setCaptchaError('');
                if (onSubmit) {
                    setCaptchaVerified(false);
                    captchaRef.current?.reset();
                    onSubmit(data);
                }
            }
            else {
                setCaptchaError('Vui lòng xác thực captcha.');
            }
        }), ...others, children: [_jsxs(FormControl, { sx: {
                    ...theme.typography.customInput,
                }, fullWidth: true, error: Boolean(errors.email), children: [_jsx(InputLabel, { htmlFor: "outlined-adornment-email-login", children: "Nh\u1EADp email" }), _jsx(Controller, { name: "email", control: control, render: ({ field }) => (_jsx(MainInput, { ...field, id: "outlined-adornment-email-login", type: "email", label: "Nh\u1EADp email", inputProps: {} })) }), errors.email && (_jsx(FormHelperText, { error: true, id: "standard-weight-helper-text-email-login", children: errors.email.message }))] }), _jsxs(Box, { children: [_jsx(ReCAPTCHA, { ref: captchaRef, sitekey: captchaSecret, onChange: handleCaptchaChange }), captchaError && _jsx(FormHelperText, { error: true, children: captchaError })] }), _jsx(Box, { sx: {
                    mt: 2,
                }, children: _jsx(AnimateButton, { children: _jsx(Button, { disableElevation: true, disabled: isLoading, fullWidth: true, size: "large", type: "submit", variant: "contained", sx: {
                            background: 'var(--color-primary)',
                            color: '#fff',
                        }, children: isLoading ? _jsx(BeatLoader, { style: { marginLeft: '3px' }, color: "white", size: 10 }) : 'Xác thực và nhận mã' }) }) })] }));
};
export default VerifyEmail;
