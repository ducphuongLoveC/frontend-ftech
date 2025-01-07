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
const MainInput = styled(OutlinedInput)(() => ({
    input: {
        color: 'black',
        width: '100%',
    },
}));
const schema = z
    .object({
    newPassword: z.string().min(6, 'Mật khẩu phải trên 6 ký tự'),
    confirmPassword: z.string().min(6, 'Mật khẩu phải trên 6 ký tự'),
})
    .refine((data) => data.confirmPassword === data.newPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
});
const ResetPassword = ({ isLoading, onSubmit, ...others }) => {
    const { control, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            newPassword: '',
            confirmPassword: '',
        },
    });
    const theme = useTheme();
    return (_jsxs("form", { noValidate: true, onSubmit: handleSubmit(onSubmit), ...others, children: [_jsxs(FormControl, { sx: {
                    ...theme.typography.customInput,
                }, fullWidth: true, error: Boolean(errors.newPassword), children: [_jsx(InputLabel, { htmlFor: "outlined-adornment-new-password", children: "Nh\u1EADp m\u1EADt kh\u1EA9u m\u1EDBi" }), _jsx(Controller, { name: "newPassword", control: control, render: ({ field }) => (_jsx(MainInput, { ...field, id: "outlined-adornment-new-password", type: "password", label: "Nh\u1EADp m\u1EADt kh\u1EA9u m\u1EDFi", inputProps: {} })) }), errors.newPassword && (_jsx(FormHelperText, { error: true, id: "standard-weight-helper-text-new-password", children: errors.newPassword.message }))] }), _jsxs(FormControl, { sx: {
                    ...theme.typography.customInput,
                }, fullWidth: true, error: Boolean(errors.confirmPassword), children: [_jsx(InputLabel, { htmlFor: "outlined-adornment-confirm-password", children: "X\u00E1c nh\u1EADn m\u1EADt kh\u1EA9u" }), _jsx(Controller, { name: "confirmPassword", control: control, render: ({ field }) => (_jsx(MainInput, { ...field, id: "outlined-adornment-confirm-password", type: "password", label: "X\u00E1c nh\u1EADn m\u1EADt kh\u1EA9u", inputProps: {} })) }), errors.confirmPassword && (_jsx(FormHelperText, { error: true, id: "standard-weight-helper-text-confirm-password", children: errors.confirmPassword.message }))] }), _jsx(Box, { sx: {
                    mt: 2,
                }, children: _jsx(AnimateButton, { children: _jsx(Button, { disableElevation: true, disabled: isLoading, fullWidth: true, size: "large", type: "submit", variant: "contained", sx: {
                            background: 'var(--color-primary)',
                            color: '#fff',
                        }, children: isLoading ? _jsx(BeatLoader, { style: { marginLeft: '3px' }, color: "white", size: 10 }) : 'Thay đổi mật khẩu' }) }) })] }));
};
export default ResetPassword;
