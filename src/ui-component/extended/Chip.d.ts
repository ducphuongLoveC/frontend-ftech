import React from 'react';
import { SxProps, Theme } from '@mui/material/styles';
interface ChipProps {
    chipcolor?: 'primary' | 'secondary' | 'success' | 'error' | 'orange' | 'warning';
    variant?: 'contained' | 'outlined';
    disabled?: boolean;
    sx?: SxProps<Theme>;
    [key: string]: any;
}
declare const Chip: React.FC<ChipProps>;
export default Chip;
