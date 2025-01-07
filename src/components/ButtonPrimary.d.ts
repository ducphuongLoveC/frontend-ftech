import { ButtonProps } from '@mui/material';
import React from 'react';
interface ButtonPrimaryProps extends Omit<ButtonProps, 'variant'> {
    children: React.ReactNode;
    customVariant?: 'outlined' | 'primary';
}
declare const ButtonPrimary: React.FC<ButtonPrimaryProps>;
export default ButtonPrimary;
