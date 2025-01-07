import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, TextField } from '@mui/material';
const OTPInput = ({ length = 6, onComplete, }) => {
    const [otp, setOtp] = useState(Array(length).fill(''));
    const handleChange = (value, index) => {
        // Chỉ cho phép nhập nếu tất cả các ô trước đó đã được điền
        if (index > 0 && !otp[index - 1]) {
            return;
        }
        const updatedOtp = [...otp];
        updatedOtp[index] = value.slice(-1); // Chỉ nhận ký tự cuối
        setOtp(updatedOtp);
        // Tự động gửi OTP khi đã nhập đủ
        if (index === length - 1 && value) {
            onComplete(updatedOtp.join(''));
            return;
        }
        // Tự động chuyển sang ô tiếp theo
        if (value && index < length - 1) {
            const nextInput = document.getElementById(`otp-input-${index + 1}`);
            if (nextInput) {
                nextInput.focus();
            }
        }
    };
    const handleKeyDown = (event, index) => {
        // Chỉ cho phép quay lại nếu tất cả các ô trước đó đã được điền
        if (event.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-input-${index - 1}`);
            if (prevInput) {
                prevInput.focus();
            }
        }
    };
    return (_jsx(Box, { display: "flex", gap: 0.5, children: Array.from({ length }).map((_, index) => (_jsx(TextField, { id: `otp-input-${index}`, value: otp[index], onChange: (e) => handleChange(e.target.value, index), onKeyDown: (e) => handleKeyDown(e, index), inputProps: {
                maxLength: 1,
                style: {
                    fontSize: '1rem', // Giảm kích thước font
                    width: '1.5rem', // Kích thước ô
                    height: '1.5rem',
                    textAlign: 'center',
                },
            }, variant: "outlined" }, index))) }));
};
export default OTPInput;
