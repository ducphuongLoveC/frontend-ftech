import { TextFieldProps } from '@mui/material';
import React from 'react';
interface InputPrimaryProps extends Omit<TextFieldProps, 'variant'> {
    placeholder?: string;
    width?: string | number;
    height?: string | number;
}
declare const InputPrimary: React.FC<InputPrimaryProps>;
export default InputPrimary;
